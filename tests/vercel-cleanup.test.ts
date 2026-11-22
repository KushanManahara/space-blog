import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";

import {
  computeRetryDelayMs,
  sanitizeSecret,
  VercelApiError,
  VercelClient,
} from "../scripts/vercel-cleanup/client";
import { ConfigError, loadConfig } from "../scripts/vercel-cleanup/config";
import { formatConsoleReport, formatMarkdownSummary } from "../scripts/vercel-cleanup/reporter";
import { buildRetentionPlan } from "../scripts/vercel-cleanup/retention";
import { runCleanup } from "../scripts/vercel-cleanup/runner";
import type {
  CleanupConfig,
  ProtectionContext,
  VercelAliasRecord,
  VercelDeployment,
  VercelProjectDomain,
  VercelProjectInfo,
} from "../scripts/vercel-cleanup/types";

const BASE_TIME = Date.parse("2026-11-22T00:00:00.000Z");
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

function makeDeployment(uid: string, overrides: Partial<VercelDeployment> = {}): VercelDeployment {
  return {
    uid,
    name: "space-blog",
    url: `${uid}.vercel.app`,
    createdAt: BASE_TIME,
    readyState: "READY",
    state: "READY",
    target: null,
    isRollbackCandidate: true,
    ...overrides,
  };
}

function makeContext(
  overrides: {
    project?: Partial<VercelProjectInfo>;
    domains?: VercelProjectDomain[];
    aliases?: VercelAliasRecord[];
  } = {},
): ProtectionContext {
  const project: VercelProjectInfo = {
    id: "prj_space",
    name: "space-blog",
    productionBranch: "main",
    targets: {},
    projectAliases: [],
    customEnvironmentDomains: [],
    ...overrides.project,
  };
  return {
    project,
    domains: overrides.domains ?? [
      { name: "space.gimhara.com", verified: true, gitBranch: null, customEnvironmentId: null },
      { name: "space-blog.vercel.app", verified: true, gitBranch: null, customEnvironmentId: null },
    ],
    aliases: overrides.aliases ?? [],
  };
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

describe("config loading & dry-run safeguards", () => {
  test("defaults to dry-run and KEEP_LAST_N=5 with comma-separated projects", () => {
    const cfg = loadConfig({
      VERCEL_TOKEN: "tok_secret_123",
      VERCEL_PROJECT_IDS: "prj_one, prj_two , prj_one",
    });

    assert.equal(cfg.dryRun, true);
    assert.equal(cfg.enableDeletion, false);
    assert.equal(cfg.projects.length, 2);
    assert.deepEqual(
      cfg.projects.map((p) => p.id),
      ["prj_one", "prj_two"],
    );
    assert.equal(cfg.projects[0].keepLastN, 5);
    assert.equal(cfg.projects[0].minProductionDeployments, 2);
  });

  test("requires explicit ENABLE_DELETION=true and lets DRY_RUN=true or --dry-run win", () => {
    assert.equal(
      loadConfig({
        VERCEL_TOKEN: "tok",
        VERCEL_PROJECT_ID: "prj_1",
        DRY_RUN: "false",
      }).dryRun,
      true,
      "DRY_RUN=false alone must not enable deletion",
    );

    assert.equal(
      loadConfig({
        VERCEL_TOKEN: "tok",
        VERCEL_PROJECT_ID: "prj_1",
        ENABLE_DELETION: "true",
      }).dryRun,
      false,
      "ENABLE_DELETION=true opts into deletion",
    );

    assert.equal(
      loadConfig({
        VERCEL_TOKEN: "tok",
        VERCEL_PROJECT_ID: "prj_1",
        ENABLE_DELETION: "true",
        DRY_RUN: "true",
      }).dryRun,
      true,
      "DRY_RUN=true overrides ENABLE_DELETION=true",
    );

    assert.equal(
      loadConfig(
        {
          VERCEL_TOKEN: "tok",
          VERCEL_PROJECT_ID: "prj_1",
          ENABLE_DELETION: "true",
        },
        ["--dry-run"],
      ).dryRun,
      true,
      "--dry-run CLI flag overrides ENABLE_DELETION=true",
    );

    assert.equal(
      loadConfig({ VERCEL_TOKEN: "tok", VERCEL_PROJECT_ID: "prj_1" }, ["--delete"]).dryRun,
      false,
      "--delete CLI flag explicitly enables deletion",
    );
  });

  test("supports multi-project per-project overrides via VERCEL_PROJECTS_JSON", () => {
    const cfg = loadConfig({
      VERCEL_TOKEN: "tok",
      VERCEL_TEAM_ID: "team_default",
      KEEP_LAST_N: "5",
      VERCEL_PROJECTS_JSON: JSON.stringify([
        { id: "prj_a", keepLastN: 7 },
        {
          id: "prj_b",
          teamId: "team_other",
          keepLastN: 3,
          minAgeMinutes: 30,
          maxDeletionsPerRun: 4,
        },
      ]),
    });

    assert.equal(cfg.projects.length, 2);
    assert.equal(cfg.projects[0].teamId, "team_default");
    assert.equal(cfg.projects[0].keepLastN, 7);
    assert.equal(cfg.projects[1].teamId, "team_other");
    assert.equal(cfg.projects[1].keepLastN, 3);
    assert.equal(cfg.projects[1].minAgeMinutes, 30);
    assert.equal(cfg.projects[1].maxDeletionsPerRun, 4);
  });

  test("rejects missing token, missing projects, invalid KEEP_LAST_N, and bad JSON", () => {
    assert.throws(() => loadConfig({ VERCEL_PROJECT_IDS: "prj_1" }), ConfigError);
    assert.throws(() => loadConfig({ VERCEL_TOKEN: "tok" }), ConfigError);
    assert.throws(
      () => loadConfig({ VERCEL_TOKEN: "tok", VERCEL_PROJECT_IDS: "prj_1", KEEP_LAST_N: "0" }),
      ConfigError,
    );
    assert.throws(
      () => loadConfig({ VERCEL_TOKEN: "tok", VERCEL_PROJECTS_JSON: "{not-json" }),
      ConfigError,
    );
  });
});

describe("retention selection & safety rules", () => {
  test("sorts newest-first regardless of API order, deduplicates, and retains latest KEEP_LAST_N", () => {
    const deployments: VercelDeployment[] = [
      makeDeployment("dpl_3", { createdAt: BASE_TIME - 3 * HOUR }),
      makeDeployment("dpl_1", { createdAt: BASE_TIME - 1 * HOUR, target: "production" }),
      makeDeployment("dpl_7", { createdAt: BASE_TIME - 7 * HOUR }),
      makeDeployment("dpl_2", { createdAt: BASE_TIME - 2 * HOUR, target: "production" }),
      makeDeployment("dpl_1", { createdAt: BASE_TIME - 1 * HOUR, target: "production" }), // duplicate
      makeDeployment("dpl_5", { createdAt: BASE_TIME - 5 * HOUR }),
      makeDeployment("dpl_4", { createdAt: BASE_TIME - 4 * HOUR }),
      makeDeployment("dpl_6", { createdAt: BASE_TIME - 6 * HOUR }),
    ];

    const context = makeContext({
      project: {
        targets: {
          production: { id: "dpl_1", alias: ["space.gimhara.com"] },
        },
      },
      aliases: [
        { uid: "a1", alias: "space.gimhara.com", deploymentId: "dpl_1", projectId: "prj_space" },
      ],
    });

    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: 5,
      minProductionDeployments: 2,
      minAgeMinutes: 0,
      protectAllAliases: false,
      nowMs: BASE_TIME,
    });

    assert.equal(plan.totalDiscovered, 7);
    assert.deepEqual(
      plan.retained.map((item) => item.deployment.uid),
      ["dpl_1", "dpl_2", "dpl_3", "dpl_4", "dpl_5"],
    );
    assert.deepEqual(
      plan.deletionCandidates.map((item) => item.deployment.uid),
      ["dpl_6", "dpl_7"],
    );
    assert.ok(plan.retained[0].reasons.includes("active-production-target"));
    assert.ok(plan.retained[0].reasons.includes("active-production-alias"));
    assert.ok(plan.retained[1].reasons.includes("production-rollback-target"));
  });

  test("never deletes rolled-back active production or its older rollback target even when 6 newer previews exist", () => {
    const deployments: VercelDeployment[] = [
      // 6 brand-new preview deployments
      makeDeployment("dpl_prev_1", { createdAt: BASE_TIME - 1 * HOUR }),
      makeDeployment("dpl_prev_2", { createdAt: BASE_TIME - 2 * HOUR }),
      makeDeployment("dpl_prev_3", { createdAt: BASE_TIME - 3 * HOUR }),
      makeDeployment("dpl_prev_4", { createdAt: BASE_TIME - 4 * HOUR }),
      makeDeployment("dpl_prev_5", { createdAt: BASE_TIME - 5 * HOUR }),
      makeDeployment("dpl_prev_6", { createdAt: BASE_TIME - 6 * HOUR }),
      // Newer broken/superseded production build (rolled back from)
      makeDeployment("dpl_prod_newer", { createdAt: BASE_TIME - 7 * HOUR, target: "production" }),
      // Active rolled-back production deployment
      makeDeployment("dpl_prod_active", { createdAt: BASE_TIME - 8 * HOUR, target: "production" }),
      // Previous stable production deployment (rollback fallback for active prod)
      makeDeployment("dpl_prod_rollback", {
        createdAt: BASE_TIME - 9 * HOUR,
        target: "production",
      }),
      // Even older production deployment (eligible for deletion)
      makeDeployment("dpl_prod_ancient", {
        createdAt: BASE_TIME - 10 * HOUR,
        target: "production",
      }),
    ];

    const context = makeContext({
      project: {
        targets: {
          production: { id: "dpl_prod_active", alias: ["space.gimhara.com"] },
        },
      },
      aliases: [
        {
          uid: "a1",
          alias: "space.gimhara.com",
          deploymentId: "dpl_prod_active",
          projectId: "prj_space",
        },
      ],
    });

    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: 5,
      minProductionDeployments: 2,
      minAgeMinutes: 0,
      protectAllAliases: false,
      nowMs: BASE_TIME,
    });

    const retainedIds = new Set(plan.retained.map((r) => r.deployment.uid));
    const candidateIds = new Set(plan.deletionCandidates.map((c) => c.deployment.uid));

    // Active production + older rollback target + 3 newest previews = 5 retained total!
    assert.equal(plan.retained.length, 5);
    assert.ok(retainedIds.has("dpl_prod_active"), "active rolled-back production must be retained");
    assert.ok(retainedIds.has("dpl_prod_rollback"), "older rollback target must be retained");
    assert.ok(retainedIds.has("dpl_prev_1"));
    assert.ok(retainedIds.has("dpl_prev_2"));
    assert.ok(retainedIds.has("dpl_prev_3"));

    assert.ok(candidateIds.has("dpl_prod_ancient"));
    assert.ok(candidateIds.has("dpl_prev_4"));
    assert.ok(candidateIds.has("dpl_prev_5"));
    assert.ok(candidateIds.has("dpl_prev_6"));
    assert.ok(candidateIds.has("dpl_prod_newer"));
  });

  test("failed ERROR and CANCELED builds never crowd out healthy READY deployments", () => {
    const deployments: VercelDeployment[] = [
      makeDeployment("dpl_err_1", {
        createdAt: BASE_TIME - 1 * MINUTE,
        readyState: "ERROR",
        state: "ERROR",
      }),
      makeDeployment("dpl_err_2", {
        createdAt: BASE_TIME - 2 * MINUTE,
        readyState: "ERROR",
        state: "ERROR",
      }),
      makeDeployment("dpl_can_3", {
        createdAt: BASE_TIME - 3 * MINUTE,
        readyState: "CANCELED",
        state: "CANCELED",
      }),
      makeDeployment("dpl_err_4", {
        createdAt: BASE_TIME - 4 * MINUTE,
        readyState: "ERROR",
        state: "ERROR",
      }),
      makeDeployment("dpl_err_5", {
        createdAt: BASE_TIME - 5 * MINUTE,
        readyState: "ERROR",
        state: "ERROR",
      }),
      makeDeployment("dpl_ready_1", { createdAt: BASE_TIME - 1 * HOUR, target: "production" }),
      makeDeployment("dpl_ready_2", { createdAt: BASE_TIME - 2 * HOUR, target: "production" }),
      makeDeployment("dpl_ready_3", { createdAt: BASE_TIME - 3 * HOUR }),
      makeDeployment("dpl_ready_4", { createdAt: BASE_TIME - 4 * HOUR }),
      makeDeployment("dpl_ready_5", { createdAt: BASE_TIME - 5 * HOUR }),
      makeDeployment("dpl_ready_6", { createdAt: BASE_TIME - 6 * HOUR }),
    ];

    const context = makeContext({
      project: { targets: { production: { id: "dpl_ready_1", alias: ["space.gimhara.com"] } } },
    });

    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: 5,
      minProductionDeployments: 2,
      minAgeMinutes: 0,
      protectAllAliases: false,
      nowMs: BASE_TIME,
    });

    assert.deepEqual(
      plan.retained.map((r) => r.deployment.uid),
      ["dpl_ready_1", "dpl_ready_2", "dpl_ready_3", "dpl_ready_4", "dpl_ready_5"],
    );
    assert.deepEqual(
      plan.deletionCandidates.map((c) => c.deployment.uid),
      ["dpl_err_1", "dpl_err_2", "dpl_can_3", "dpl_err_4", "dpl_err_5", "dpl_ready_6"],
    );
  });

  test("preserves in-progress, unverifiable, custom-domain, and manually aliased deployments without evicting healthy slots", () => {
    const deployments: VercelDeployment[] = [
      makeDeployment("dpl_building", {
        createdAt: BASE_TIME - 1 * MINUTE,
        readyState: "BUILDING",
        state: "BUILDING",
      }),
      makeDeployment("dpl_queued", {
        createdAt: BASE_TIME - 2 * MINUTE,
        readyState: "QUEUED",
        state: "QUEUED",
      }),
      makeDeployment("dpl_unknown_state", {
        createdAt: BASE_TIME - 3 * MINUTE,
        readyState: "ARCHIVED_UNKNOWN",
        state: "ARCHIVED_UNKNOWN",
      }),
      makeDeployment("dpl_no_timestamp", { createdAt: undefined }),
      makeDeployment("dpl_unknown_target", {
        createdAt: BASE_TIME - 4 * MINUTE,
        target: "custom-canary",
      }),
      makeDeployment("dpl_ready_1", { createdAt: BASE_TIME - 1 * HOUR, target: "production" }),
      makeDeployment("dpl_ready_2", { createdAt: BASE_TIME - 2 * HOUR }),
      makeDeployment("dpl_ready_3", { createdAt: BASE_TIME - 3 * HOUR }),
      makeDeployment("dpl_custom_domain", { createdAt: BASE_TIME - 20 * HOUR }),
      makeDeployment("dpl_manual_alias", { createdAt: BASE_TIME - 21 * HOUR }),
      makeDeployment("dpl_stale_feature_branch", { createdAt: BASE_TIME - 22 * HOUR }),
    ];

    const context = makeContext({
      project: { targets: { production: { id: "dpl_ready_1", alias: ["space.gimhara.com"] } } },
      domains: [
        { name: "space.gimhara.com", verified: true },
        { name: "staging.gimhara.com", verified: true, gitBranch: "staging" },
      ],
      aliases: [
        {
          uid: "a1",
          alias: "staging.gimhara.com",
          deploymentId: "dpl_custom_domain",
          projectId: "prj_space",
        },
        {
          uid: "a2",
          alias: "space-blog-demo.vercel.app",
          deploymentId: "dpl_manual_alias",
          projectId: "prj_space",
        },
        {
          uid: "a3",
          alias: "space-blog-git-feat-old-pr-kushan.vercel.app",
          deploymentId: "dpl_stale_feature_branch",
          projectId: "prj_space",
        },
      ],
    });

    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: 3,
      minProductionDeployments: 1,
      minAgeMinutes: 0,
      protectAllAliases: false,
      nowMs: BASE_TIME,
    });

    const retainedIds = new Set(plan.retained.map((r) => r.deployment.uid));
    assert.ok(retainedIds.has("dpl_building"));
    assert.ok(retainedIds.has("dpl_queued"));
    assert.ok(retainedIds.has("dpl_unknown_state"));
    assert.ok(retainedIds.has("dpl_no_timestamp"));
    assert.ok(retainedIds.has("dpl_unknown_target"));
    assert.ok(retainedIds.has("dpl_ready_1"));
    assert.ok(retainedIds.has("dpl_custom_domain"), "configured staging domain must be protected");
    assert.ok(
      retainedIds.has("dpl_manual_alias"),
      "manually assigned .vercel.app alias must be protected",
    );

    // Stale auto-generated feature-branch preview alias is eligible for cleanup when outside KEEP_LAST_N.
    const candidateIds = new Set(plan.deletionCandidates.map((c) => c.deployment.uid));
    assert.ok(candidateIds.has("dpl_stale_feature_branch"));

    // With protectAllAliases=true, even the feature-branch preview alias is protected.
    const strictPlan = buildRetentionPlan(deployments, context, {
      keepLastN: 3,
      minProductionDeployments: 1,
      minAgeMinutes: 0,
      protectAllAliases: true,
      nowMs: BASE_TIME,
    });
    assert.ok(
      !strictPlan.deletionCandidates.some((c) => c.deployment.uid === "dpl_stale_feature_branch"),
    );
  });

  test("infers active production protection when Vercel omits targets.production and aliases", () => {
    const deployments: VercelDeployment[] = [
      makeDeployment("dpl_prev_1", { createdAt: BASE_TIME - 1 * HOUR }),
      makeDeployment("dpl_prev_2", { createdAt: BASE_TIME - 2 * HOUR }),
      makeDeployment("dpl_prod_1", { createdAt: BASE_TIME - 5 * HOUR, target: "production" }),
      makeDeployment("dpl_prod_2", { createdAt: BASE_TIME - 6 * HOUR, target: "production" }),
    ];

    const context = makeContext({ project: { targets: {} }, domains: [], aliases: [] });
    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: 2,
      minProductionDeployments: 2,
      minAgeMinutes: 0,
      protectAllAliases: false,
      nowMs: BASE_TIME,
    });

    const prod1 = plan.retained.find((r) => r.deployment.uid === "dpl_prod_1");
    assert.ok(prod1, "newest READY production must be inferred-protected");
    assert.ok(prod1.reasons.includes("inferred-active-production"));
    assert.ok(plan.warnings.length > 0);
  });

  test("honors minAgeMinutes cooldown and maxDeletionsPerRun (deleting oldest first)", () => {
    const deployments: VercelDeployment[] = [
      makeDeployment("dpl_1", { createdAt: BASE_TIME - 5 * MINUTE, target: "production" }),
      makeDeployment("dpl_2", {
        createdAt: BASE_TIME - 10 * MINUTE,
        readyState: "ERROR",
        state: "ERROR",
      }),
      makeDeployment("dpl_3", { createdAt: BASE_TIME - 120 * MINUTE }),
      makeDeployment("dpl_4", { createdAt: BASE_TIME - 180 * MINUTE }),
      makeDeployment("dpl_5", { createdAt: BASE_TIME - 240 * MINUTE }),
      makeDeployment("dpl_6", { createdAt: BASE_TIME - 300 * MINUTE }),
    ];

    const context = makeContext({
      project: { targets: { production: { id: "dpl_1", alias: ["space.gimhara.com"] } } },
    });

    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: 2,
      minProductionDeployments: 1,
      minAgeMinutes: 30,
      protectAllAliases: false,
      maxDeletionsPerRun: 2,
      nowMs: BASE_TIME,
    });

    // dpl_2 is ERROR but only 10m old (< 30m cooldown) -> retained!
    assert.ok(
      plan.retained.some(
        (r) => r.deployment.uid === "dpl_2" && r.reasons.includes("within-min-age"),
      ),
    );
    // Eligible beyond keepLastN=2 (dpl_1, dpl_3): dpl_4, dpl_5, dpl_6. Cap=2 deletes oldest 2 (dpl_5, dpl_6).
    assert.deepEqual(
      plan.deletionCandidates.map((c) => c.deployment.uid),
      ["dpl_5", "dpl_6"],
    );
    assert.deepEqual(
      plan.deferredByCap.map((c) => c.deployment.uid),
      ["dpl_4"],
    );
  });
});

describe("VercelClient pagination, retries, rate limits, and idempotency", () => {
  test("paginates deployments with until=pagination.next and deduplicates across pages", async () => {
    const requestedUrls: string[] = [];
    const client = new VercelClient({
      token: "tok_secret_value",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 2,
      sleepImpl: async () => {},
      fetchImpl: async (input) => {
        const url = String(input);
        requestedUrls.push(url);
        const parsed = new URL(url);
        const until = parsed.searchParams.get("until");

        if (!until) {
          return jsonResponse({
            deployments: [
              { uid: "dpl_1", createdAt: 3000, state: "READY" },
              { uid: "dpl_2", createdAt: 2000, state: "READY" },
            ],
            pagination: { count: 2, next: 2000, prev: 3000 },
          });
        }

        if (until === "2000") {
          return jsonResponse({
            deployments: [
              { uid: "dpl_2", createdAt: 2000, state: "READY" }, // boundary duplicate
              { uid: "dpl_3", createdAt: 1000, state: "READY" },
            ],
            pagination: { count: 2, next: null, prev: 2000 },
          });
        }

        return jsonResponse({ error: { message: "unexpected cursor" } }, 400);
      },
    });

    const deployments = await client.listDeployments("prj_123", "team_abc");
    assert.deepEqual(
      deployments.map((d) => d.uid),
      ["dpl_1", "dpl_2", "dpl_3"],
    );
    assert.equal(requestedUrls.length, 2);
    assert.ok(requestedUrls[0].includes("projectId=prj_123"));
    assert.ok(requestedUrls[0].includes("teamId=team_abc"));
    assert.ok(requestedUrls[1].includes("until=2000"));
  });

  test("fails closed on pagination loop or page limit overflow", async () => {
    const loopClient = new VercelClient({
      token: "tok",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 0,
      sleepImpl: async () => {},
      fetchImpl: async () =>
        jsonResponse({
          deployments: [{ uid: "dpl_1", createdAt: 1000, state: "READY" }],
          pagination: { count: 1, next: 1000 },
        }),
    });

    await assert.rejects(() => loopClient.listDeployments("prj_1"), /Pagination loop detected/);

    let cursor = 5000;
    const capClient = new VercelClient({
      token: "tok",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 0,
      maxPages: 2,
      sleepImpl: async () => {},
      fetchImpl: async () => {
        cursor -= 100;
        return jsonResponse({
          deployments: [{ uid: `dpl_${cursor}`, createdAt: cursor, state: "READY" }],
          pagination: { count: 1, next: cursor },
        });
      },
    });

    await assert.rejects(() => capClient.listDeployments("prj_1"), /exceeded safety limit/);
  });

  test("retries 429 using Retry-After and 503 with exponential backoff, and redacts token in errors", async () => {
    const sleeps: number[] = [];
    let attempts = 0;

    const client = new VercelClient({
      token: "super_secret_vercel_token",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 3,
      baseRetryDelayMs: 500,
      sleepImpl: async (ms) => {
        sleeps.push(ms);
      },
      fetchImpl: async () => {
        attempts += 1;
        if (attempts === 1) {
          return jsonResponse({ error: { code: "rate_limited" } }, 429, { "retry-after": "3" });
        }
        if (attempts === 2) {
          return jsonResponse({ error: { message: "temporary outage" } }, 503);
        }
        return jsonResponse({ uid: "dpl_old", state: "DELETED" }, 200);
      },
    });

    const result = await client.deleteDeployment("dpl_old");
    assert.deepEqual(result, { status: "deleted", uid: "dpl_old", state: "DELETED" });
    assert.deepEqual(sleeps, [3000, 1000]);

    // 404 on DELETE is idempotent.
    const idempotentClient = new VercelClient({
      token: "super_secret_vercel_token",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 1,
      sleepImpl: async () => {},
      fetchImpl: async () => jsonResponse({ error: { code: "not_found" } }, 404),
    });
    assert.deepEqual(await idempotentClient.deleteDeployment("dpl_gone"), {
      status: "already-deleted",
      uid: "dpl_gone",
    });

    // 401 is not retried and never echoes token.
    const authFailClient = new VercelClient({
      token: "super_secret_vercel_token",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 3,
      sleepImpl: async () => {},
      fetchImpl: async () =>
        jsonResponse({ error: { message: "Invalid token super_secret_vercel_token" } }, 401),
    });
    await assert.rejects(
      () => authFailClient.getProject("prj_1"),
      (err: unknown) => {
        assert.ok(err instanceof VercelApiError);
        assert.equal(err.status, 401);
        assert.ok(!err.message.includes("super_secret_vercel_token"));
        assert.ok(err.message.includes("[REDACTED]"));
        return true;
      },
    );
  });

  test("computeRetryDelayMs parses Retry-After HTTP-date and X-RateLimit-Reset", () => {
    const now = Date.parse("2026-11-22T10:00:00.000Z");

    const fromDate = computeRetryDelayMs({
      headers: new Headers({ "retry-after": "Sun, 22 Nov 2026 10:00:07 GMT" }),
      attempt: 0,
      nowMs: now,
      baseDelayMs: 1_000,
      maxDelayMs: 60_000,
    });
    assert.equal(fromDate, 7_000);

    const resetEpochSec = Math.floor(now / 1_000) + 5;
    const fromReset = computeRetryDelayMs({
      headers: new Headers({ "x-ratelimit-reset": String(resetEpochSec) }),
      attempt: 0,
      nowMs: now,
      baseDelayMs: 1_000,
      maxDelayMs: 60_000,
    });
    assert.equal(fromReset, 5_250);

    assert.equal(sanitizeSecret("Bearer tok_abc failed", "tok_abc"), "Bearer [REDACTED] failed");
  });
});

describe("end-to-end runner safeguards", () => {
  function baseConfig(overrides: Partial<CleanupConfig> = {}): CleanupConfig {
    return {
      token: "tok_live_secret",
      projects: [
        {
          id: "prj_space",
          keepLastN: 2,
          minProductionDeployments: 1,
          minAgeMinutes: 0,
          protectAllAliases: false,
        },
      ],
      dryRun: true,
      enableDeletion: false,
      requestTimeoutMs: 5_000,
      maxRetries: 0,
      deleteDelayMs: 0,
      baseUrl: "https://api.vercel.test",
      ...overrides,
    };
  }

  test("dry-run mode never issues any HTTP DELETE requests", async () => {
    const deleteCalls: string[] = [];
    const client = new VercelClient({
      token: "tok_live_secret",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 0,
      sleepImpl: async () => {},
      fetchImpl: async (input, init) => {
        const url = new URL(String(input));
        if (init?.method === "DELETE") {
          deleteCalls.push(url.pathname);
          return jsonResponse({ uid: "should-not-happen", state: "DELETED" });
        }
        if (url.pathname === "/v9/projects/prj_space") {
          return jsonResponse({
            id: "prj_space",
            name: "space-blog",
            targets: { production: { id: "dpl_1", alias: ["space.gimhara.com"] } },
          });
        }
        if (url.pathname === "/v9/projects/prj_space/domains") {
          return jsonResponse({ domains: [{ name: "space.gimhara.com", verified: true }] });
        }
        if (url.pathname === "/v4/aliases") {
          return jsonResponse({
            aliases: [
              {
                uid: "a1",
                alias: "space.gimhara.com",
                deploymentId: "dpl_1",
                projectId: "prj_space",
              },
            ],
          });
        }
        if (url.pathname === "/v6/deployments") {
          return jsonResponse({
            deployments: [
              {
                uid: "dpl_1",
                createdAt: BASE_TIME - 1 * HOUR,
                readyState: "READY",
                target: "production",
              },
              { uid: "dpl_2", createdAt: BASE_TIME - 2 * HOUR, readyState: "READY" },
              { uid: "dpl_3", createdAt: BASE_TIME - 3 * HOUR, readyState: "READY" },
            ],
            pagination: { count: 3, next: null },
          });
        }
        return jsonResponse({}, 404);
      },
    });

    const report = await runCleanup(baseConfig({ dryRun: true }), {
      client,
      sleepImpl: async () => {},
      nowImpl: () => BASE_TIME,
    });

    assert.equal(report.hasFailures, false);
    assert.equal(deleteCalls.length, 0);
    assert.equal(report.projects[0].deletions.length, 1);
    assert.equal(report.projects[0].deletions[0].status, "dry-run");
    assert.equal(report.projects[0].deletions[0].uid, "dpl_3");

    const consoleOut = formatConsoleReport(report);
    const mdOut = formatMarkdownSummary(report);
    assert.ok(consoleOut.includes("DRY-RUN"));
    assert.ok(!consoleOut.includes("tok_live_secret"));
    assert.ok(mdOut.includes("space-blog"));
  });

  test("live mode verifies every candidate before deleting, skips race-condition promotions, and handles 404 idempotently", async () => {
    const deletedOrder: string[] = [];

    const client = new VercelClient({
      token: "tok_live_secret",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 0,
      sleepImpl: async () => {},
      fetchImpl: async (input, init) => {
        const url = new URL(String(input));
        const method = init?.method ?? "GET";

        if (method === "GET" && url.pathname === "/v9/projects/prj_space") {
          return jsonResponse({
            id: "prj_space",
            name: "space-blog",
            targets: { production: { id: "dpl_1", alias: ["space.gimhara.com"] } },
          });
        }
        if (method === "GET" && url.pathname === "/v9/projects/prj_space/domains") {
          return jsonResponse({ domains: [{ name: "space.gimhara.com", verified: true }] });
        }
        if (method === "GET" && url.pathname === "/v4/aliases") {
          return jsonResponse({
            aliases: [
              {
                uid: "a1",
                alias: "space.gimhara.com",
                deploymentId: "dpl_1",
                projectId: "prj_space",
              },
            ],
          });
        }
        if (method === "GET" && url.pathname === "/v6/deployments") {
          return jsonResponse({
            deployments: [
              {
                uid: "dpl_1",
                createdAt: BASE_TIME - 1 * HOUR,
                readyState: "READY",
                target: "production",
              },
              { uid: "dpl_2", createdAt: BASE_TIME - 2 * HOUR, readyState: "READY" },
              {
                uid: "dpl_3_promoted_midrun",
                createdAt: BASE_TIME - 3 * HOUR,
                readyState: "READY",
              },
              { uid: "dpl_4_already_gone", createdAt: BASE_TIME - 4 * HOUR, readyState: "READY" },
              { uid: "dpl_5_safe_oldest", createdAt: BASE_TIME - 5 * HOUR, readyState: "READY" },
            ],
            pagination: { count: 5, next: null },
          });
        }

        // Pre-delete verification endpoints:
        if (method === "GET" && url.pathname === "/v13/deployments/dpl_3_promoted_midrun") {
          return jsonResponse({ id: "dpl_3_promoted_midrun", readyState: "READY", alias: [] });
        }
        if (method === "GET" && url.pathname === "/v2/deployments/dpl_3_promoted_midrun/aliases") {
          // Race condition: production domain was just assigned!
          return jsonResponse({ aliases: [{ uid: "a_race", alias: "space.gimhara.com" }] });
        }

        if (method === "GET" && url.pathname === "/v13/deployments/dpl_4_already_gone") {
          return jsonResponse({ error: { code: "not_found" } }, 404);
        }

        if (method === "GET" && url.pathname === "/v13/deployments/dpl_5_safe_oldest") {
          return jsonResponse({ id: "dpl_5_safe_oldest", readyState: "READY", alias: [] });
        }
        if (method === "GET" && url.pathname === "/v2/deployments/dpl_5_safe_oldest/aliases") {
          return jsonResponse({ aliases: [] });
        }

        if (method === "DELETE" && url.pathname.startsWith("/v13/deployments/")) {
          const uid = url.pathname.split("/").pop() ?? "";
          deletedOrder.push(uid);
          return jsonResponse({ uid, state: "DELETED" });
        }

        return jsonResponse({ error: { message: `unhandled ${method} ${url.pathname}` } }, 500);
      },
    });

    const report = await runCleanup(baseConfig({ dryRun: false, enableDeletion: true }), {
      client,
      sleepImpl: async () => {},
      nowImpl: () => BASE_TIME,
    });

    assert.equal(report.hasFailures, false);
    // Only dpl_5_safe_oldest should actually receive HTTP DELETE.
    assert.deepEqual(deletedOrder, ["dpl_5_safe_oldest"]);

    const byId = new Map(report.projects[0].deletions.map((d) => [d.uid, d]));
    assert.equal(byId.get("dpl_5_safe_oldest")?.status, "deleted");
    assert.equal(byId.get("dpl_4_already_gone")?.status, "already-deleted");
    assert.equal(byId.get("dpl_3_promoted_midrun")?.status, "skipped-unsafe");
  });

  test("discovery API failure fails closed for that project (0 deletions) without blocking other projects", async () => {
    const deleteCalls: string[] = [];

    const client = new VercelClient({
      token: "tok_live_secret",
      baseUrl: "https://api.vercel.test",
      requestTimeoutMs: 5_000,
      maxRetries: 0,
      sleepImpl: async () => {},
      fetchImpl: async (input, init) => {
        const url = new URL(String(input));
        const method = init?.method ?? "GET";

        if (method === "DELETE") {
          deleteCalls.push(url.pathname);
          return jsonResponse({ uid: url.pathname.split("/").pop() ?? "", state: "DELETED" });
        }

        // Project 1 fails on aliases endpoint -> must NOT delete anything in Project 1!
        if (url.pathname === "/v9/projects/prj_broken") {
          return jsonResponse({ id: "prj_broken", name: "broken-proj", targets: {} });
        }
        if (url.pathname === "/v9/projects/prj_broken/domains") {
          return jsonResponse({ domains: [] });
        }
        if (url.pathname === "/v4/aliases" && url.searchParams.get("projectId") === "prj_broken") {
          return jsonResponse({ error: { message: "upstream alias failure" } }, 500);
        }

        // Project 2 succeeds cleanly.
        if (url.pathname === "/v9/projects/prj_healthy") {
          return jsonResponse({
            id: "prj_healthy",
            name: "healthy-proj",
            targets: { production: { id: "dpl_h1", alias: ["healthy.example.com"] } },
          });
        }
        if (url.pathname === "/v9/projects/prj_healthy/domains") {
          return jsonResponse({ domains: [{ name: "healthy.example.com", verified: true }] });
        }
        if (url.pathname === "/v4/aliases" && url.searchParams.get("projectId") === "prj_healthy") {
          return jsonResponse({
            aliases: [
              {
                uid: "a1",
                alias: "healthy.example.com",
                deploymentId: "dpl_h1",
                projectId: "prj_healthy",
              },
            ],
          });
        }
        if (
          url.pathname === "/v6/deployments" &&
          url.searchParams.get("projectId") === "prj_healthy"
        ) {
          return jsonResponse({
            deployments: [
              {
                uid: "dpl_h1",
                createdAt: BASE_TIME - 1 * HOUR,
                readyState: "READY",
                target: "production",
              },
              { uid: "dpl_h2", createdAt: BASE_TIME - 2 * HOUR, readyState: "READY" },
            ],
            pagination: { count: 2, next: null },
          });
        }
        if (url.pathname === "/v13/deployments/dpl_h2") {
          return jsonResponse({ id: "dpl_h2", readyState: "READY", alias: [] });
        }
        if (url.pathname === "/v2/deployments/dpl_h2/aliases") {
          return jsonResponse({ aliases: [] });
        }
        return jsonResponse({ deployments: [], pagination: { count: 0, next: null } });
      },
    });

    const report = await runCleanup(
      baseConfig({
        dryRun: false,
        enableDeletion: true,
        projects: [
          {
            id: "prj_broken",
            keepLastN: 1,
            minProductionDeployments: 1,
            minAgeMinutes: 0,
            protectAllAliases: false,
          },
          {
            id: "prj_healthy",
            keepLastN: 1,
            minProductionDeployments: 1,
            minAgeMinutes: 0,
            protectAllAliases: false,
          },
        ],
      }),
      { client, sleepImpl: async () => {}, nowImpl: () => BASE_TIME },
    );

    assert.equal(report.hasFailures, true);
    assert.equal(report.projects[0].status, "failed");
    assert.equal(report.projects[0].deletions.length, 0);
    assert.equal(report.projects[1].status, "ok");
    assert.deepEqual(deleteCalls, ["/v13/deployments/dpl_h2"]);
  });
});

describe("GitHub Actions workflow configuration", () => {
  const workflow = readFileSync(".github/workflows/vercel-deployment-cleanup.yml", "utf8");

  test("schedules every 30 minutes, supports manual dispatch with dry-run default, and guards concurrency", () => {
    assert.match(workflow, /cron:\s*"13,43 \* \* \* \*"/);
    assert.match(workflow, /workflow_dispatch:/);
    assert.match(workflow, /dry_run:[\s\S]*default:\s*true/);
    assert.match(
      workflow,
      /concurrency:[\s\S]*group:\s*vercel-deployment-cleanup[\s\S]*cancel-in-progress:\s*false/,
    );
    assert.match(workflow, /permissions:[\s\S]*contents:\s*read/);
    assert.match(workflow, /VERCEL_TOKEN:\s*\$\{\{\s*secrets\.VERCEL_TOKEN\s*\}\}/);
    assert.match(workflow, /VERCEL_CLEANUP_ENABLE_DELETION/);
  });
});
