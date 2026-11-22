import { sanitizeSecret, VercelClient } from "./client";
import {
  buildRetentionPlan,
  getEffectiveState,
  getProtectedAliasReasons,
  isInProgressState,
  isTerminalState,
} from "./retention";
import type {
  ClassifiedDeployment,
  CleanupConfig,
  CleanupRunReport,
  DeletionResult,
  ProjectConfig,
  ProjectRunReport,
  ProtectionContext,
} from "./types";

export interface RunnerDependencies {
  client?: VercelClient;
  sleepImpl?: (ms: number) => Promise<void>;
  nowImpl?: () => number;
  onWarning?: (message: string) => void;
}

function defaultSleep(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Re-verifies a candidate deployment immediately before issuing `DELETE /v13/deployments/{id}`.
 *
 * Protects against races between initial listing and deletion (e.g. a deployment that was
 * promoted to production, rolled back to, assigned a custom domain, or re-entered a non-terminal
 * state while the job was running). Fails closed on any verification error.
 */
async function verifyCandidateBeforeDelete(params: {
  client: VercelClient;
  candidate: ClassifiedDeployment;
  context: ProtectionContext;
  projectConfig: ProjectConfig;
  token: string;
}): Promise<
  { action: "delete" } | { action: "already-deleted" } | { action: "skip-unsafe"; reason: string }
> {
  const { client, candidate, context, projectConfig, token } = params;
  const uid = candidate.deployment.uid;

  // Defensive re-check against project targets before making network calls.
  if (context.project.targets.production?.id === uid) {
    return { action: "skip-unsafe", reason: "matches active production target" };
  }
  for (const [targetName, target] of Object.entries(context.project.targets)) {
    if (target.id === uid) {
      return { action: "skip-unsafe", reason: `matches active project target "${targetName}"` };
    }
  }

  let liveDetail;
  try {
    liveDetail = await client.getDeployment(uid, projectConfig.teamId);
  } catch (error) {
    const message = sanitizeSecret(error instanceof Error ? error.message : String(error), token);
    return {
      action: "skip-unsafe",
      reason: `pre-delete deployment verification failed (preserving): ${message}`,
    };
  }

  if (liveDetail === null) {
    return { action: "already-deleted" };
  }

  const liveState = getEffectiveState({ readyState: liveDetail.readyState });
  if (isInProgressState(liveState)) {
    return { action: "skip-unsafe", reason: `live state is in-progress (${liveState})` };
  }
  if (!isTerminalState(liveState)) {
    return {
      action: "skip-unsafe",
      reason: `live state is unverifiable (${liveState ?? "missing"})`,
    };
  }

  let liveAliases: string[] | null;
  try {
    liveAliases = await client.listDeploymentAliases(uid, projectConfig.teamId);
  } catch (error) {
    const message = sanitizeSecret(error instanceof Error ? error.message : String(error), token);
    return {
      action: "skip-unsafe",
      reason: `pre-delete alias verification failed (preserving): ${message}`,
    };
  }

  if (liveAliases === null) {
    return { action: "already-deleted" };
  }

  // Merge aliases from both `GET /v13/deployments/{id}` and `GET /v2/deployments/{id}/aliases`.
  const combinedAliases = Array.from(new Set([...liveDetail.aliases, ...liveAliases]));
  const protectedReasons = getProtectedAliasReasons(
    combinedAliases,
    context,
    projectConfig.protectAllAliases,
  );
  if (protectedReasons.length > 0) {
    return {
      action: "skip-unsafe",
      reason: `live aliases require protection (${protectedReasons.join(", ")}: ${combinedAliases.join(", ")})`,
    };
  }

  return { action: "delete" };
}

async function runProjectCleanup(params: {
  client: VercelClient;
  config: CleanupConfig;
  projectConfig: ProjectConfig;
  sleepImpl: (ms: number) => Promise<void>;
  nowImpl: () => number;
}): Promise<ProjectRunReport> {
  const { client, config, projectConfig, sleepImpl, nowImpl } = params;
  const projectStart = nowImpl();

  try {
    // 1. Discover project metadata first to resolve canonical project ID & production target.
    //    Any failure here aborts the project immediately (fail-closed, zero deletions).
    const project = await client.getProject(projectConfig.id, projectConfig.teamId);

    // 2. Discover configured domains, active aliases, and paginated deployments in full.
    //    All three must succeed before any retention decision is computed.
    const [domains, aliases, deployments] = await Promise.all([
      client.listProjectDomains(project.id, projectConfig.teamId),
      client.listProjectAliases(project.id, projectConfig.teamId),
      client.listDeployments(project.id, projectConfig.teamId),
    ]);

    const context: ProtectionContext = { project, domains, aliases };

    // 3. Compute deterministic retention plan.
    const plan = buildRetentionPlan(deployments, context, {
      keepLastN: projectConfig.keepLastN,
      minProductionDeployments: projectConfig.minProductionDeployments,
      minAgeMinutes: projectConfig.minAgeMinutes,
      protectAllAliases: projectConfig.protectAllAliases,
      maxDeletionsPerRun: projectConfig.maxDeletionsPerRun,
      nowMs: nowImpl(),
    });

    const deletions: DeletionResult[] = [];
    let hasDeleteErrors = false;

    if (config.dryRun) {
      for (const candidate of plan.deletionCandidates) {
        deletions.push({
          uid: candidate.deployment.uid,
          url: candidate.deployment.url,
          target: candidate.normalizedTarget,
          state: candidate.effectiveState,
          createdAt: candidate.createdAt,
          status: "dry-run",
          reason: "dry-run mode active (no API DELETE issued)",
        });
      }
    } else {
      // Refresh project target once right before entering the deletion phase so an active
      // promotion/rollback during discovery cannot be missed.
      const refreshedProject = await client.getProject(project.id, projectConfig.teamId);
      const refreshedContext: ProtectionContext = {
        ...context,
        project: refreshedProject,
      };

      // Delete oldest candidates first for safest rollback order.
      const candidatesOldestFirst = [...plan.deletionCandidates].reverse();

      for (let i = 0; i < candidatesOldestFirst.length; i += 1) {
        const candidate = candidatesOldestFirst[i];
        const baseResult = {
          uid: candidate.deployment.uid,
          url: candidate.deployment.url,
          target: candidate.normalizedTarget,
          state: candidate.effectiveState,
          createdAt: candidate.createdAt,
        };

        const verification = await verifyCandidateBeforeDelete({
          client,
          candidate,
          context: refreshedContext,
          projectConfig,
          token: config.token,
        });

        if (verification.action === "already-deleted") {
          deletions.push({
            ...baseResult,
            status: "already-deleted",
            reason: "deployment no longer exists during pre-delete verification",
          });
          continue;
        }

        if (verification.action === "skip-unsafe") {
          deletions.push({
            ...baseResult,
            status: "skipped-unsafe",
            reason: verification.reason,
          });
          continue;
        }

        try {
          const outcome = await client.deleteDeployment(
            candidate.deployment.uid,
            projectConfig.teamId,
          );
          if (outcome.status === "already-deleted") {
            deletions.push({
              ...baseResult,
              status: "already-deleted",
              reason: "HTTP 404 (idempotent)",
            });
          } else {
            deletions.push({
              ...baseResult,
              status: "deleted",
              reason: `state=${outcome.state}`,
            });
          }
        } catch (error) {
          hasDeleteErrors = true;
          const message = sanitizeSecret(
            error instanceof Error ? error.message : String(error),
            config.token,
          );
          deletions.push({
            ...baseResult,
            status: "failed",
            reason: message,
          });
        }

        if (config.deleteDelayMs > 0 && i < candidatesOldestFirst.length - 1) {
          await sleepImpl(config.deleteDelayMs);
        }
      }
    }

    return {
      configuredProject: projectConfig.id,
      projectId: project.id,
      projectName: project.name,
      teamId: projectConfig.teamId,
      keepLastN: projectConfig.keepLastN,
      dryRun: config.dryRun,
      status: hasDeleteErrors ? "partial-failure" : "ok",
      plan,
      deletions,
      durationMs: Math.max(0, nowImpl() - projectStart),
    };
  } catch (error) {
    const message = sanitizeSecret(
      error instanceof Error ? error.message : String(error),
      config.token,
    );
    return {
      configuredProject: projectConfig.id,
      teamId: projectConfig.teamId,
      keepLastN: projectConfig.keepLastN,
      dryRun: config.dryRun,
      status: "failed",
      error: message,
      deletions: [],
      durationMs: Math.max(0, nowImpl() - projectStart),
    };
  }
}

/**
 * Executes deployment cleanup across all configured Vercel projects sequentially
 * (predictable rate-limit usage and clean per-project failure isolation).
 */
export async function runCleanup(
  config: CleanupConfig,
  deps: RunnerDependencies = {},
): Promise<CleanupRunReport> {
  const nowImpl = deps.nowImpl ?? Date.now;
  const sleepImpl = deps.sleepImpl ?? defaultSleep;
  const startedMs = nowImpl();

  const client =
    deps.client ??
    new VercelClient({
      token: config.token,
      baseUrl: config.baseUrl,
      requestTimeoutMs: config.requestTimeoutMs,
      maxRetries: config.maxRetries,
      sleepImpl,
      nowImpl,
      onWarning: deps.onWarning,
    });

  const projectReports: ProjectRunReport[] = [];
  for (const projectConfig of config.projects) {
    const report = await runProjectCleanup({
      client,
      config,
      projectConfig,
      sleepImpl,
      nowImpl,
    });
    projectReports.push(report);
  }

  const finishedMs = nowImpl();
  const hasFailures = projectReports.some((report) => report.status !== "ok");

  return {
    startedAt: new Date(startedMs).toISOString(),
    finishedAt: new Date(finishedMs).toISOString(),
    durationMs: Math.max(0, finishedMs - startedMs),
    dryRun: config.dryRun,
    enableDeletion: config.enableDeletion,
    projects: projectReports,
    hasFailures,
  };
}
