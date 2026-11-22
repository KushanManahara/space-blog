import { appendFileSync } from "node:fs";
import type { CleanupRunReport, DeletionOutcomeStatus, ProjectRunReport } from "./types";

function formatTimestamp(ms: number | undefined): string {
  if (ms === undefined || !Number.isFinite(ms)) return "unknown-time";
  return new Date(ms).toISOString();
}

function countByStatus(report: ProjectRunReport): Record<DeletionOutcomeStatus, number> {
  const counts: Record<DeletionOutcomeStatus, number> = {
    "dry-run": 0,
    deleted: 0,
    "already-deleted": 0,
    "skipped-unsafe": 0,
    failed: 0,
  };
  for (const item of report.deletions) {
    counts[item.status] += 1;
  }
  return counts;
}

/**
 * Formats a detailed, human-readable console report without leaking credentials.
 */
export function formatConsoleReport(report: CleanupRunReport): string {
  const lines: string[] = [];
  const modeLabel = report.dryRun ? "DRY-RUN (no deployments deleted)" : "LIVE DELETION";

  lines.push("======================================================================");
  lines.push(`Vercel Deployment Cleanup — ${modeLabel}`);
  lines.push(`Started: ${report.startedAt} | Duration: ${report.durationMs}ms`);
  lines.push(`Projects configured: ${report.projects.length}`);
  lines.push("======================================================================");

  for (const project of report.projects) {
    const label = project.projectName
      ? `${project.projectName} (${project.projectId})`
      : project.configuredProject;

    lines.push("");
    lines.push(
      `Project: ${label} | keepLastN=${project.keepLastN} | status=${project.status.toUpperCase()} | ${project.durationMs}ms`,
    );

    if (project.error) {
      lines.push(`  ERROR (fail-closed, 0 deleted): ${project.error}`);
      continue;
    }

    const plan = project.plan;
    if (!plan) continue;

    for (const warning of plan.warnings) {
      lines.push(`  WARNING: ${warning}`);
    }

    const counts = countByStatus(project);
    lines.push(
      `  Summary: discovered=${plan.totalDiscovered}, retained=${plan.retained.length}, candidates=${plan.deletionCandidates.length}, deferredByCap=${plan.deferredByCap.length}`,
    );

    if (project.dryRun) {
      lines.push(`  Dry-run preview: would verify and delete ${counts["dry-run"]} deployment(s).`);
    } else {
      lines.push(
        `  Deletion results: deleted=${counts.deleted}, alreadyDeleted=${counts["already-deleted"]}, skippedUnsafe=${counts["skipped-unsafe"]}, failed=${counts.failed}`,
      );
    }

    if (plan.retained.length > 0) {
      lines.push("  Retained deployments:");
      for (const item of plan.retained) {
        const aliasSuffix =
          item.aliases.length > 0 ? ` | aliases=[${item.aliases.join(", ")}]` : "";
        lines.push(
          `    [KEEP] ${item.deployment.uid} | ${formatTimestamp(item.createdAt)} | target=${item.normalizedTarget} | state=${item.effectiveState ?? "UNKNOWN"} | reasons=[${item.reasons.join(", ")}]${aliasSuffix}`,
        );
      }
    }

    if (project.deletions.length > 0) {
      lines.push(project.dryRun ? "  Deletion candidates (dry-run):" : "  Deletion results:");
      for (const item of project.deletions) {
        const tag = item.status.toUpperCase();
        const detail = item.reason ? ` | ${item.reason}` : "";
        lines.push(
          `    [${tag}] ${item.uid} | ${formatTimestamp(item.createdAt)} | target=${item.target} | state=${item.state ?? "UNKNOWN"}${detail}`,
        );
      }
    } else {
      lines.push("  Deletion candidates: none.");
    }
  }

  lines.push("");
  lines.push("======================================================================");
  lines.push(
    report.hasFailures
      ? "Run finished WITH FAILURES. Review errors above."
      : report.dryRun
        ? "Dry-run completed cleanly. Set ENABLE_DELETION=true (with DRY_RUN=false) to delete eligible deployments."
        : "Cleanup completed cleanly.",
  );
  lines.push("======================================================================");

  return lines.join("\n");
}

function escapeMarkdownCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

/**
 * Formats a concise Markdown report suitable for GitHub Actions `$GITHUB_STEP_SUMMARY`.
 */
export function formatMarkdownSummary(report: CleanupRunReport): string {
  const lines: string[] = [];
  const modeBadge = report.dryRun ? "Dry-run (no deletions)" : "Live deletion";

  lines.push("## Vercel Deployment Cleanup Summary");
  lines.push("");
  lines.push(`- **Mode:** ${modeBadge}`);
  lines.push(`- **Started:** \`${report.startedAt}\``);
  lines.push(`- **Duration:** ${report.durationMs}ms`);
  lines.push(`- **Overall status:** ${report.hasFailures ? "Failed / Partial Failure" : "OK"}`);
  lines.push("");
  lines.push(
    "| Project | Keep N | Discovered | Retained | Candidates | Deleted | Already Deleted | Skipped (Unsafe) | Failed | Status |",
  );
  lines.push("| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |");

  for (const project of report.projects) {
    const label = project.projectName
      ? `${project.projectName} (\`${project.projectId}\`)`
      : `\`${project.configuredProject}\``;
    const counts = countByStatus(project);
    const discovered = project.plan?.totalDiscovered ?? 0;
    const retained = project.plan?.retained.length ?? 0;
    const candidates = project.plan?.deletionCandidates.length ?? 0;

    lines.push(
      `| ${escapeMarkdownCell(label)} | ${project.keepLastN} | ${discovered} | ${retained} | ${candidates} | ${counts.deleted} | ${counts["already-deleted"]} | ${counts["skipped-unsafe"]} | ${counts.failed} | ${project.status} |`,
    );
  }

  const errorProjects = report.projects.filter((project) => project.error);
  if (errorProjects.length > 0) {
    lines.push("");
    lines.push("### Project Errors");
    for (const project of errorProjects) {
      lines.push(
        `- \`${project.configuredProject}\`: ${escapeMarkdownCell(project.error ?? "Unknown error")}`,
      );
    }
  }

  const warnings = report.projects.flatMap((project) =>
    (project.plan?.warnings ?? []).map((warning) => ({
      project: project.projectName ?? project.configuredProject,
      warning,
    })),
  );
  if (warnings.length > 0) {
    lines.push("");
    lines.push("### Warnings");
    for (const item of warnings) {
      lines.push(`- **${escapeMarkdownCell(item.project)}**: ${escapeMarkdownCell(item.warning)}`);
    }
  }

  lines.push("");
  return lines.join("\n");
}

export function writeGitHubStepSummary(report: CleanupRunReport, summaryPath?: string): void {
  if (!summaryPath) return;
  appendFileSync(summaryPath, `${formatMarkdownSummary(report)}\n`, "utf8");
}
