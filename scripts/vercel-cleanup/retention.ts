import type {
  ClassifiedDeployment,
  DeploymentInProgressState,
  DeploymentTerminalState,
  NormalizedTarget,
  ProtectionContext,
  RetentionPlan,
  RetentionReason,
  VercelDeployment,
} from "./types";

const TERMINAL_STATES = new Set<string>(["READY", "ERROR", "CANCELED"]);
const IN_PROGRESS_STATES = new Set<string>(["BUILDING", "INITIALIZING", "QUEUED"]);

export interface RetentionPolicyOptions {
  keepLastN: number;
  minProductionDeployments: number;
  minAgeMinutes: number;
  protectAllAliases: boolean;
  maxDeletionsPerRun?: number;
  nowMs?: number;
}

export interface AliasClassification {
  isProductionAlias: boolean;
  isProtectedDomainAlias: boolean;
  isAnyAlias: boolean;
}

export function isTerminalState(state: string | undefined): state is DeploymentTerminalState {
  return state !== undefined && TERMINAL_STATES.has(state);
}

export function isInProgressState(state: string | undefined): state is DeploymentInProgressState {
  return state !== undefined && IN_PROGRESS_STATES.has(state);
}

export function getEffectiveState(
  deployment: Pick<VercelDeployment, "readyState" | "state">,
): string | undefined {
  const raw = deployment.readyState ?? deployment.state;
  return raw ? raw.trim().toUpperCase() : undefined;
}

export function normalizeTarget(target: string | null | undefined): NormalizedTarget {
  if (target === null || target === undefined || target === "" || target === "preview") {
    return "preview";
  }
  const normalized = target.trim().toLowerCase();
  if (normalized === "production") return "production";
  if (normalized === "staging") return "staging";
  return "unknown";
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeHostname(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
}

/**
 * Builds normalized domain lookup sets from project metadata and `/v9/projects/{id}/domains`.
 */
export function buildDomainSets(context: ProtectionContext): {
  productionDomains: Set<string>;
  configuredDomains: Set<string>;
  autoBranchPreviewRegex: RegExp;
  productionBranchAliasPrefix: string | null;
} {
  const projectName = context.project.name.trim().toLowerCase();
  const productionDomains = new Set<string>();
  const configuredDomains = new Set<string>();

  if (projectName) {
    productionDomains.add(`${projectName}.vercel.app`);
    configuredDomains.add(`${projectName}.vercel.app`);
  }

  for (const alias of context.project.targets.production?.alias ?? []) {
    const host = normalizeHostname(alias);
    if (host) {
      productionDomains.add(host);
      configuredDomains.add(host);
    }
  }

  for (const alias of context.project.projectAliases) {
    const host = normalizeHostname(alias);
    if (host) {
      productionDomains.add(host);
      configuredDomains.add(host);
    }
  }

  for (const domain of context.project.customEnvironmentDomains) {
    const host = normalizeHostname(domain);
    if (host) configuredDomains.add(host);
  }

  for (const domain of context.domains) {
    const host = normalizeHostname(domain.name);
    if (!host) continue;
    configuredDomains.add(host);
    if (!domain.gitBranch && !domain.customEnvironmentId) {
      productionDomains.add(host);
    }
  }

  const autoBranchPreviewRegex = new RegExp(
    `^${escapeRegExp(projectName)}-git-.+\\.vercel\\.app$`,
    "i",
  );

  const sanitizedProdBranch = context.project.productionBranch
    ? context.project.productionBranch
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : null;

  const productionBranchAliasPrefix =
    projectName && sanitizedProdBranch ? `${projectName}-git-${sanitizedProdBranch}-` : null;

  return {
    productionDomains,
    configuredDomains,
    autoBranchPreviewRegex,
    productionBranchAliasPrefix,
  };
}

/**
 * Determines whether an active alias pointing to a deployment must protect that deployment.
 *
 * Protected aliases:
 * - Any configured production domain or `<project>.vercel.app`.
 * - Any configured project domain (custom domain, branch domain, custom environment domain).
 * - Any custom (non-`.vercel.app`) domain, even if omitted from project domains list.
 * - The auto-generated alias for the project's production Git branch (e.g. `<proj>-git-main-...vercel.app`).
 * - Any manually assigned `.vercel.app` alias that does NOT match `<proj>-git-<branch>-<scope>.vercel.app`.
 *
 * Non-protected by default (unless `protectAllAliases` is enabled):
 * - Auto-generated feature-branch preview aliases (`<proj>-git-<feature-branch>-<scope>.vercel.app`)
 *   that are not configured in project domains, so old merged PR preview deployments can be reclaimed.
 */
export function classifyAlias(
  rawAlias: string,
  domainSets: ReturnType<typeof buildDomainSets>,
): AliasClassification {
  const alias = normalizeHostname(rawAlias);
  if (!alias) {
    return { isProductionAlias: false, isProtectedDomainAlias: false, isAnyAlias: false };
  }

  if (domainSets.productionDomains.has(alias)) {
    return { isProductionAlias: true, isProtectedDomainAlias: true, isAnyAlias: true };
  }

  if (
    domainSets.productionBranchAliasPrefix &&
    alias.startsWith(domainSets.productionBranchAliasPrefix) &&
    alias.endsWith(".vercel.app")
  ) {
    return { isProductionAlias: true, isProtectedDomainAlias: true, isAnyAlias: true };
  }

  if (domainSets.configuredDomains.has(alias)) {
    return { isProductionAlias: false, isProtectedDomainAlias: true, isAnyAlias: true };
  }

  if (!alias.endsWith(".vercel.app")) {
    return { isProductionAlias: false, isProtectedDomainAlias: true, isAnyAlias: true };
  }

  // Manually assigned `.vercel.app` alias (not an automatic `-git-` branch alias).
  if (!domainSets.autoBranchPreviewRegex.test(alias)) {
    return { isProductionAlias: false, isProtectedDomainAlias: true, isAnyAlias: true };
  }

  return { isProductionAlias: false, isProtectedDomainAlias: false, isAnyAlias: true };
}

/**
 * Pure helper shared between planning and pre-deletion live verification to decide
 * whether a deployment's live aliases contain any protected alias.
 */
export function getProtectedAliasReasons(
  aliases: readonly string[],
  context: ProtectionContext,
  protectAllAliases: boolean,
): RetentionReason[] {
  const domainSets = buildDomainSets(context);
  const reasons = new Set<RetentionReason>();

  for (const alias of aliases) {
    const classification = classifyAlias(alias, domainSets);
    if (classification.isProductionAlias) {
      reasons.add("active-production-alias");
    } else if (classification.isProtectedDomainAlias) {
      reasons.add("active-domain-alias");
    } else if (protectAllAliases && classification.isAnyAlias) {
      reasons.add("active-alias");
    }
  }

  return Array.from(reasons);
}

/**
 * Sorts deployments newest-first by `createdAt`, with deterministic tie-breaking by `uid`.
 * Deployments missing a valid timestamp are sorted last (and always hard-protected).
 */
export function sortDeploymentsNewestFirst(
  deployments: readonly VercelDeployment[],
): VercelDeployment[] {
  const unique = new Map<string, VercelDeployment>();
  for (const deployment of deployments) {
    if (!unique.has(deployment.uid)) {
      unique.set(deployment.uid, deployment);
    }
  }

  return Array.from(unique.values()).sort((a, b) => {
    const aTime =
      typeof a.createdAt === "number" && Number.isFinite(a.createdAt) ? a.createdAt : -1;
    const bTime =
      typeof b.createdAt === "number" && Number.isFinite(b.createdAt) ? b.createdAt : -1;
    if (bTime !== aTime) return bTime - aTime;
    return b.uid.localeCompare(a.uid);
  });
}

/**
 * Pure, deterministic retention planner.
 *
 * Guarantees:
 * 1. Never marks the active production deployment or any active target deployment for deletion.
 * 2. Never marks any deployment serving a production, custom, or configured domain alias for deletion.
 * 3. Never marks in-progress (`BUILDING`/`INITIALIZING`/`QUEUED`) or unverifiable deployments for deletion.
 * 4. Preserves production rollback target(s) even when newer previews or failed builds exist.
 * 5. Retains `keepLastN` healthy (`READY`) deployments without letting failed/canceled builds crowd them out.
 * 6. Honors optional `minAgeMinutes` and `maxDeletionsPerRun` guardrails.
 */
export function buildRetentionPlan(
  deployments: readonly VercelDeployment[],
  context: ProtectionContext,
  policy: RetentionPolicyOptions,
): RetentionPlan {
  const nowMs = policy.nowMs ?? Date.now();
  const warnings: string[] = [];
  const sorted = sortDeploymentsNewestFirst(deployments);
  const domainSets = buildDomainSets(context);

  // Map deploymentId -> active aliases for this project.
  const aliasesByDeploymentId = new Map<string, Set<string>>();
  for (const record of context.aliases) {
    if (record.projectId && record.projectId !== context.project.id) continue;
    if (!record.deploymentId) continue;
    let set = aliasesByDeploymentId.get(record.deploymentId);
    if (!set) {
      set = new Set<string>();
      aliasesByDeploymentId.set(record.deploymentId, set);
    }
    set.add(normalizeHostname(record.alias));
  }

  // Also include aliases declared directly on project.targets[*].
  const activeProductionId = context.project.targets.production?.id ?? null;
  const activeTargetIds = new Map<string, string>();
  for (const [targetName, targetEntry] of Object.entries(context.project.targets)) {
    activeTargetIds.set(targetEntry.id, targetName);
    let set = aliasesByDeploymentId.get(targetEntry.id);
    if (!set) {
      set = new Set<string>();
      aliasesByDeploymentId.set(targetEntry.id, set);
    }
    for (const alias of targetEntry.alias) {
      set.add(normalizeHostname(alias));
    }
  }

  interface MutableRecord {
    deployment: VercelDeployment;
    effectiveState: string | undefined;
    normalizedTarget: NormalizedTarget;
    createdAt: number | undefined;
    aliases: string[];
    reasons: Set<RetentionReason>;
    hardProtected: boolean;
  }

  const records: MutableRecord[] = sorted.map((deployment) => {
    const effectiveState = getEffectiveState(deployment);
    const normalizedTarget = normalizeTarget(deployment.target);
    const createdAt =
      typeof deployment.createdAt === "number" &&
      Number.isFinite(deployment.createdAt) &&
      deployment.createdAt > 0
        ? deployment.createdAt
        : undefined;
    const aliases = Array.from(aliasesByDeploymentId.get(deployment.uid) ?? []).sort();
    const reasons = new Set<RetentionReason>();

    // 1. Metadata & state verifiability checks (fail-closed).
    if (!deployment.uid || createdAt === undefined) {
      reasons.add("unverifiable-state");
    }

    if (isInProgressState(effectiveState)) {
      reasons.add("in-progress");
    } else if (!isTerminalState(effectiveState)) {
      reasons.add("unverifiable-state");
    }

    if (normalizedTarget === "unknown") {
      reasons.add("unverifiable-target");
    }

    // 2. Active project targets (`project.targets.production`, etc.).
    const targetName = activeTargetIds.get(deployment.uid);
    if (targetName === "production") {
      reasons.add("active-production-target");
    } else if (targetName !== undefined) {
      reasons.add("active-target");
    }

    // 3. Active aliases serving traffic.
    for (const alias of aliases) {
      const classification = classifyAlias(alias, domainSets);
      if (classification.isProductionAlias) {
        reasons.add("active-production-alias");
      } else if (classification.isProtectedDomainAlias) {
        reasons.add("active-domain-alias");
      } else if (policy.protectAllAliases && classification.isAnyAlias) {
        reasons.add("active-alias");
      }
    }

    // 4. Optional minimum age cooldown.
    if (
      policy.minAgeMinutes > 0 &&
      createdAt !== undefined &&
      nowMs - createdAt < policy.minAgeMinutes * 60_000
    ) {
      reasons.add("within-min-age");
    }

    return {
      deployment,
      effectiveState,
      normalizedTarget,
      createdAt,
      aliases,
      reasons,
      hardProtected: reasons.size > 0,
    };
  });

  // Step 2: Inferred active production fallback when Vercel didn't expose `targets.production`
  // or no production alias matched any discovered deployment.
  const hasIdentifiedActiveProd = records.some(
    (record) =>
      record.reasons.has("active-production-target") ||
      record.reasons.has("active-production-alias"),
  );

  let inferredActiveProd: MutableRecord | undefined;
  if (!hasIdentifiedActiveProd) {
    inferredActiveProd = records.find(
      (record) => record.normalizedTarget === "production" && record.effectiveState === "READY",
    );
    if (inferredActiveProd) {
      inferredActiveProd.reasons.add("inferred-active-production");
      inferredActiveProd.hardProtected = true;
      warnings.push(
        `Project "${context.project.name}" had no explicit active production target/alias match; defensively protecting newest READY production deployment ${inferredActiveProd.deployment.uid}.`,
      );
    }
  }

  if (activeProductionId && !records.some((r) => r.deployment.uid === activeProductionId)) {
    warnings.push(
      `Active production target ${activeProductionId} was not found in the paginated deployments list; proceeding conservatively while protecting all production rollback candidates.`,
    );
  }

  // Step 3: Production rollback guard.
  // Protect active production plus at least (minProductionDeployments - 1) healthy READY
  // production deployments so instant rollback targets are never wiped out by bursts of
  // preview or failed deployments.
  const requiredProdDeployments = Math.min(
    Math.max(1, policy.minProductionDeployments),
    Math.max(1, policy.keepLastN),
  );

  const activeProdRecord =
    records.find((r) => r.reasons.has("active-production-target")) ??
    records.find(
      (r) => r.reasons.has("active-production-alias") && r.normalizedTarget === "production",
    ) ??
    inferredActiveProd;

  const activeProdTimestamp = activeProdRecord?.createdAt;

  const protectedReadyProdCount = () =>
    records.filter(
      (r) => r.hardProtected && r.normalizedTarget === "production" && r.effectiveState === "READY",
    ).length;

  if (protectedReadyProdCount() < requiredProdDeployments) {
    const unprotectedReadyProds = records.filter(
      (r) =>
        !r.hardProtected && r.normalizedTarget === "production" && r.effectiveState === "READY",
    );

    // Prefer true rollback targets: healthy production deployments created BEFORE active production
    // (with `isRollbackCandidate !== false`), then other eligible READY production deployments.
    const prioritizedRollbacks = [...unprotectedReadyProds].sort((a, b) => {
      const aIsOlderThanActive =
        activeProdTimestamp !== undefined &&
        a.createdAt !== undefined &&
        a.createdAt < activeProdTimestamp;
      const bIsOlderThanActive =
        activeProdTimestamp !== undefined &&
        b.createdAt !== undefined &&
        b.createdAt < activeProdTimestamp;
      if (aIsOlderThanActive !== bIsOlderThanActive) return aIsOlderThanActive ? -1 : 1;

      const aRollbackFlag = a.deployment.isRollbackCandidate !== false;
      const bRollbackFlag = b.deployment.isRollbackCandidate !== false;
      if (aRollbackFlag !== bRollbackFlag) return aRollbackFlag ? -1 : 1;

      return (b.createdAt ?? -1) - (a.createdAt ?? -1);
    });

    for (const candidate of prioritizedRollbacks) {
      if (protectedReadyProdCount() >= requiredProdDeployments) break;
      candidate.reasons.add("production-rollback-target");
      candidate.hardProtected = true;
    }
  }

  // Step 4: Count-based retention window (`KEEP_LAST_N`) for healthy READY deployments.
  // In-progress and unverifiable records stay protected without evicting healthy READY builds.
  const alreadyRetainedReadyCount = records.filter(
    (r) => r.hardProtected && r.effectiveState === "READY",
  ).length;
  let remainingReadySlots = Math.max(0, policy.keepLastN - alreadyRetainedReadyCount);

  const retained: ClassifiedDeployment[] = [];
  const eligibleForDeletion: ClassifiedDeployment[] = [];

  for (const record of records) {
    if (record.hardProtected) {
      retained.push({
        deployment: record.deployment,
        effectiveState: record.effectiveState,
        normalizedTarget: record.normalizedTarget,
        createdAt: record.createdAt,
        aliases: record.aliases,
        decision: "retain",
        hardProtected: true,
        reasons: Array.from(record.reasons),
      });
      continue;
    }

    if (record.effectiveState === "READY" && remainingReadySlots > 0) {
      remainingReadySlots -= 1;
      retained.push({
        deployment: record.deployment,
        effectiveState: record.effectiveState,
        normalizedTarget: record.normalizedTarget,
        createdAt: record.createdAt,
        aliases: record.aliases,
        decision: "retain",
        hardProtected: false,
        reasons: ["within-retention-window"],
      });
      continue;
    }

    eligibleForDeletion.push({
      deployment: record.deployment,
      effectiveState: record.effectiveState,
      normalizedTarget: record.normalizedTarget,
      createdAt: record.createdAt,
      aliases: record.aliases,
      decision: "delete",
      hardProtected: false,
      reasons: [],
    });
  }

  // Delete oldest deployments first when a per-run cap is configured, so the stalest
  // storage is reclaimed first while newer candidates wait for the next scheduled run.
  let deletionCandidates = eligibleForDeletion;
  const deferredByCap: ClassifiedDeployment[] = [];

  if (
    policy.maxDeletionsPerRun !== undefined &&
    eligibleForDeletion.length > policy.maxDeletionsPerRun
  ) {
    // `eligibleForDeletion` is sorted newest-first; keep the newest excess items deferred
    // and delete the oldest `maxDeletionsPerRun` items first.
    const splitIndex = eligibleForDeletion.length - policy.maxDeletionsPerRun;
    for (const deferred of eligibleForDeletion.slice(0, splitIndex)) {
      const updated: ClassifiedDeployment = {
        ...deferred,
        decision: "retain",
        reasons: ["max-deletions-cap"],
      };
      deferredByCap.push(updated);
      retained.push(updated);
    }
    deletionCandidates = eligibleForDeletion.slice(splitIndex);
  }

  return {
    projectId: context.project.id,
    projectName: context.project.name,
    totalDiscovered: records.length,
    retained,
    deletionCandidates,
    deferredByCap,
    warnings,
  };
}
