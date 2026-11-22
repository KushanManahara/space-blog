/**
 * CLI entry point for automated Vercel deployment cleanup.
 *
 * Defaults to DRY-RUN mode so running it locally or in CI without explicit opt-in
 * never deletes deployments.
 *
 * Examples:
 *   pnpm vercel:cleanup                       # Dry-run preview (default)
 *   pnpm vercel:cleanup --dry-run             # Forced dry-run even if ENABLE_DELETION=true
 *   pnpm vercel:cleanup --delete              # Execute verified deletions locally
 *   ENABLE_DELETION=true pnpm vercel:cleanup  # Execute verified deletions via env
 */
import { config as loadDotenv } from "dotenv";
import { resolve } from "node:path";

import { ConfigError, loadConfig, parseCliArgs } from "./config";
import { formatConsoleReport, writeGitHubStepSummary } from "./reporter";
import { runCleanup } from "./runner";

const HELP_TEXT = `
Vercel Deployment Cleanup

Usage:
  pnpm vercel:cleanup [options]

Options:
  --dry-run               Force dry-run mode (overrides ENABLE_DELETION=true)
  --delete, --execute     Enable actual deletion (ignored if --dry-run or DRY_RUN=true)
  --keep=<N>              Override KEEP_LAST_N for this run (default: 5)
  --projects=<ids>        Override comma-separated project IDs/names for this run
  -h, --help              Show this help message

Environment variables:
  VERCEL_TOKEN                (required) Vercel API token
  VERCEL_PROJECT_IDS          Comma-separated project IDs or names
  VERCEL_PROJECT_ID           Single project ID or name (fallback)
  VERCEL_PROJECTS_JSON        JSON array for per-project retention/team overrides
  VERCEL_TEAM_ID              Optional default Vercel Team ID
  KEEP_LAST_N                 Healthy deployments to retain per project (default: 5)
  MIN_PRODUCTION_DEPLOYMENTS  Minimum READY production deployments to protect (default: 2)
  MIN_AGE_MINUTES             Minimum deployment age before deletion (default: 0)
  PROTECT_ALL_ALIASES         Protect every aliased deployment incl. branch previews (default: false)
  MAX_DELETIONS_PER_PROJECT   Optional max deletions per project per run
  ENABLE_DELETION             Must be "true" to perform deletions (default: false)
  DRY_RUN                     Set "true" to force dry-run regardless of ENABLE_DELETION
`.trim();

async function main(): Promise<void> {
  loadDotenv({ path: resolve(process.cwd(), ".env.local"), quiet: true });
  loadDotenv({ path: resolve(process.cwd(), ".env"), quiet: true });

  const argv = process.argv.slice(2);
  const flags = parseCliArgs(argv);
  if (flags.showHelp) {
    console.log(HELP_TEXT);
    return;
  }

  const config = loadConfig(process.env, argv);
  const report = await runCleanup(config, {
    onWarning: (message) => {
      console.warn(`[vercel-cleanup] WARN: ${message}`);
    },
  });

  console.log(formatConsoleReport(report));
  writeGitHubStepSummary(report, process.env.GITHUB_STEP_SUMMARY);

  if (report.hasFailures) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  if (error instanceof ConfigError) {
    console.error(`[vercel-cleanup] Configuration error: ${error.message}`);
  } else {
    console.error(
      `[vercel-cleanup] Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  process.exitCode = 1;
});
