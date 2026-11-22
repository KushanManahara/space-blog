import { projectsJsonConfigSchema } from "./schemas";
import type { CleanupConfig, ProjectConfig } from "./types";

export const DEFAULT_KEEP_LAST_N = 5;
export const DEFAULT_MIN_PRODUCTION_DEPLOYMENTS = 2;
export const DEFAULT_MIN_AGE_MINUTES = 0;
export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;
export const DEFAULT_MAX_RETRIES = 4;
export const DEFAULT_DELETE_DELAY_MS = 250;
export const DEFAULT_VERCEL_API_BASE_URL = "https://api.vercel.com";

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

function parseOptionalBoolean(value: string | undefined, name: string): boolean | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes") return true;
  if (normalized === "false" || normalized === "0" || normalized === "no") return false;
  throw new ConfigError(`Invalid boolean for ${name}: "${value}". Expected "true" or "false".`);
}

function parsePositiveInt(
  value: string | undefined,
  name: string,
  fallback: number,
  options: { min?: number; max?: number } = {},
): number {
  const min = options.min ?? 1;
  const max = options.max ?? 1_000_000;
  if (value === undefined || value.trim() === "") return fallback;
  if (!/^\d+$/.test(value.trim())) {
    throw new ConfigError(`Invalid integer for ${name}: "${value}".`);
  }
  const parsed = Number.parseInt(value.trim(), 10);
  if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) {
    throw new ConfigError(`Value for ${name} must be between ${min} and ${max} (got ${parsed}).`);
  }
  return parsed;
}

function parseOptionalPositiveInt(
  value: string | undefined,
  name: string,
  options: { min?: number; max?: number } = {},
): number | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  return parsePositiveInt(value, name, 0, options);
}

interface ParsedCliFlags {
  forceDryRun: boolean;
  requestDelete: boolean;
  keepLastN?: string;
  projectIds?: string;
  showHelp: boolean;
}

export function parseCliArgs(argv: readonly string[]): ParsedCliFlags {
  const flags: ParsedCliFlags = {
    forceDryRun: false,
    requestDelete: false,
    showHelp: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      flags.showHelp = true;
    } else if (arg === "--dry-run") {
      flags.forceDryRun = true;
    } else if (arg === "--delete" || arg === "--execute") {
      flags.requestDelete = true;
    } else if (arg.startsWith("--keep=")) {
      flags.keepLastN = arg.slice("--keep=".length);
    } else if (arg === "--keep" && argv[i + 1] !== undefined) {
      flags.keepLastN = argv[++i];
    } else if (arg.startsWith("--projects=")) {
      flags.projectIds = arg.slice("--projects=".length);
    } else if (arg === "--projects" && argv[i + 1] !== undefined) {
      flags.projectIds = argv[++i];
    } else if (arg.startsWith("--")) {
      throw new ConfigError(`Unknown CLI option: "${arg}". Run with --help to see valid options.`);
    }
  }

  return flags;
}

function dedupeProjectConfigs(projects: ProjectConfig[]): ProjectConfig[] {
  const seen = new Set<string>();
  const deduped: ProjectConfig[] = [];
  for (const project of projects) {
    const key = `${project.teamId ?? ""}::${project.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(project);
    }
  }
  return deduped;
}

/**
 * Loads and strictly validates cleanup configuration from environment variables and CLI arguments.
 *
 * Deletion safety rules:
 * - Dry-run is ALWAYS the default.
 * - `--dry-run` or `DRY_RUN=true` always wins and forces dry-run mode.
 * - Actual deletion requires explicit opt-in via `ENABLE_DELETION=true` (or `--delete` on CLI)
 *   AND `DRY_RUN` not set to `true`.
 */
export function loadConfig(
  env: Readonly<Record<string, string | undefined>>,
  argv: readonly string[] = [],
): CleanupConfig {
  const flags = parseCliArgs(argv);

  const token = env.VERCEL_TOKEN?.trim();
  if (!token) {
    throw new ConfigError(
      "Missing required environment variable VERCEL_TOKEN. Create a Vercel access token and pass it via env or GitHub Secrets.",
    );
  }

  const defaultTeamId = env.VERCEL_TEAM_ID?.trim() || undefined;
  const keepLastN = parsePositiveInt(
    flags.keepLastN ?? env.KEEP_LAST_N,
    "KEEP_LAST_N",
    DEFAULT_KEEP_LAST_N,
    { min: 1, max: 1000 },
  );
  const minProductionDeployments = parsePositiveInt(
    env.MIN_PRODUCTION_DEPLOYMENTS,
    "MIN_PRODUCTION_DEPLOYMENTS",
    DEFAULT_MIN_PRODUCTION_DEPLOYMENTS,
    { min: 1, max: 100 },
  );
  const minAgeMinutes = parsePositiveInt(
    env.MIN_AGE_MINUTES,
    "MIN_AGE_MINUTES",
    DEFAULT_MIN_AGE_MINUTES,
    { min: 0, max: 525_600 },
  );
  const protectAllAliases =
    parseOptionalBoolean(env.PROTECT_ALL_ALIASES, "PROTECT_ALL_ALIASES") ?? false;
  const maxDeletionsPerRun = parseOptionalPositiveInt(
    env.MAX_DELETIONS_PER_PROJECT,
    "MAX_DELETIONS_PER_PROJECT",
    { min: 1, max: 1000 },
  );

  const envDryRun = parseOptionalBoolean(env.DRY_RUN, "DRY_RUN");
  const envEnableDeletion = parseOptionalBoolean(env.ENABLE_DELETION, "ENABLE_DELETION") ?? false;

  const enableDeletion = envEnableDeletion || flags.requestDelete;
  // Dry-run by default: any explicit dry-run signal wins; otherwise deletion requires explicit opt-in.
  const dryRun = flags.forceDryRun || envDryRun === true || !enableDeletion;

  const requestTimeoutMs = parsePositiveInt(
    env.VERCEL_REQUEST_TIMEOUT_MS,
    "VERCEL_REQUEST_TIMEOUT_MS",
    DEFAULT_REQUEST_TIMEOUT_MS,
    { min: 1_000, max: 120_000 },
  );
  const maxRetries = parsePositiveInt(
    env.VERCEL_MAX_RETRIES,
    "VERCEL_MAX_RETRIES",
    DEFAULT_MAX_RETRIES,
    { min: 0, max: 10 },
  );
  const deleteDelayMs = parsePositiveInt(
    env.DELETE_DELAY_MS,
    "DELETE_DELAY_MS",
    DEFAULT_DELETE_DELAY_MS,
    { min: 0, max: 10_000 },
  );

  const baseUrl = (env.VERCEL_API_BASE_URL?.trim() || DEFAULT_VERCEL_API_BASE_URL).replace(
    /\/+$/,
    "",
  );

  const projects = parseProjectsConfig({
    cliProjectIds: flags.projectIds,
    envProjectsJson: env.VERCEL_PROJECTS_JSON,
    envProjectIds: env.VERCEL_PROJECT_IDS,
    envProjectId: env.VERCEL_PROJECT_ID,
    defaults: {
      teamId: defaultTeamId,
      keepLastN,
      minProductionDeployments,
      minAgeMinutes,
      protectAllAliases,
      maxDeletionsPerRun,
    },
  });

  return {
    token,
    defaultTeamId,
    projects,
    dryRun,
    enableDeletion,
    requestTimeoutMs,
    maxRetries,
    deleteDelayMs,
    baseUrl,
  };
}

interface ParseProjectsInput {
  cliProjectIds?: string;
  envProjectsJson?: string;
  envProjectIds?: string;
  envProjectId?: string;
  defaults: Omit<ProjectConfig, "id">;
}

function parseProjectsConfig(input: ParseProjectsInput): ProjectConfig[] {
  const { cliProjectIds, envProjectsJson, envProjectIds, envProjectId, defaults } = input;

  // CLI `--projects` override takes precedence for ad-hoc targeted runs.
  if (cliProjectIds !== undefined && cliProjectIds.trim() !== "") {
    return parseCommaSeparatedProjects(cliProjectIds, defaults, "--projects");
  }

  if (envProjectsJson !== undefined && envProjectsJson.trim() !== "") {
    let rawJson: unknown;
    try {
      rawJson = JSON.parse(envProjectsJson);
    } catch (error) {
      throw new ConfigError(
        `VERCEL_PROJECTS_JSON is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    const parsed = projectsJsonConfigSchema.safeParse(rawJson);
    if (!parsed.success) {
      const details = parsed.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ");
      throw new ConfigError(`Invalid VERCEL_PROJECTS_JSON: ${details}`);
    }

    return dedupeProjectConfigs(
      parsed.data.map((entry) => ({
        id: entry.id,
        teamId: entry.teamId ?? defaults.teamId,
        keepLastN: entry.keepLastN ?? defaults.keepLastN,
        minProductionDeployments:
          entry.minProductionDeployments ?? defaults.minProductionDeployments,
        minAgeMinutes: entry.minAgeMinutes ?? defaults.minAgeMinutes,
        protectAllAliases: entry.protectAllAliases ?? defaults.protectAllAliases,
        maxDeletionsPerRun: entry.maxDeletionsPerRun ?? defaults.maxDeletionsPerRun,
      })),
    );
  }

  const rawList = envProjectIds?.trim() || envProjectId?.trim();
  if (!rawList) {
    throw new ConfigError(
      "Missing target Vercel project(s). Set VERCEL_PROJECT_IDS (comma-separated), VERCEL_PROJECT_ID, or VERCEL_PROJECTS_JSON.",
    );
  }

  return parseCommaSeparatedProjects(rawList, defaults, "VERCEL_PROJECT_IDS");
}

function parseCommaSeparatedProjects(
  raw: string,
  defaults: Omit<ProjectConfig, "id">,
  sourceName: string,
): ProjectConfig[] {
  const ids = raw
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

  if (ids.length === 0) {
    throw new ConfigError(`${sourceName} must contain at least one project ID or name.`);
  }

  return dedupeProjectConfigs(ids.map((id) => ({ id, ...defaults })));
}
