/**
 * Domain types for automated Vercel deployment retention and cleanup.
 */

export type DeploymentTerminalState = "READY" | "ERROR" | "CANCELED";
export type DeploymentInProgressState = "BUILDING" | "INITIALIZING" | "QUEUED";
export type KnownDeploymentState = DeploymentTerminalState | DeploymentInProgressState;

export type NormalizedTarget = "production" | "staging" | "preview" | "unknown";

export type RetentionReason =
  | "active-production-target"
  | "active-target"
  | "active-production-alias"
  | "active-domain-alias"
  | "active-alias"
  | "inferred-active-production"
  | "production-rollback-target"
  | "in-progress"
  | "unverifiable-state"
  | "unverifiable-target"
  | "within-min-age"
  | "within-retention-window"
  | "max-deletions-cap";

export interface ProjectConfig {
  /** Vercel project ID (e.g. `prj_...`) or project name. */
  id: string;
  /** Optional team ID override for this project. */
  teamId?: string;
  /** Number of healthy eligible deployments to keep for this project. */
  keepLastN: number;
  /** Minimum number of healthy READY production deployments to preserve (active + rollback). */
  minProductionDeployments: number;
  /** Minimum age in minutes before a deployment can be considered for deletion. */
  minAgeMinutes: number;
  /** If true, protect every deployment currently referenced by any Vercel alias. */
  protectAllAliases: boolean;
  /** Optional hard cap on deletions per run for this project (undefined = unlimited). */
  maxDeletionsPerRun?: number;
}

export interface CleanupConfig {
  token: string;
  defaultTeamId?: string;
  projects: ProjectConfig[];
  /** True by default. Actual deletion only happens when explicitly enabled and not forced dry-run. */
  dryRun: boolean;
  enableDeletion: boolean;
  requestTimeoutMs: number;
  maxRetries: number;
  deleteDelayMs: number;
  baseUrl: string;
}

export interface VercelDeployment {
  uid: string;
  name?: string;
  url?: string;
  createdAt?: number;
  state?: string;
  readyState?: string;
  target?: string | null;
  aliasAssigned?: number | boolean | null;
  isRollbackCandidate?: boolean | null;
  inspectorUrl?: string | null;
  meta?: Record<string, unknown>;
}

export interface VercelAliasRecord {
  uid: string;
  alias: string;
  deploymentId?: string | null;
  projectId?: string | null;
  created?: string;
}

export interface VercelProjectDomain {
  name: string;
  gitBranch?: string | null;
  customEnvironmentId?: string | null;
  redirect?: string | null;
  verified?: boolean;
}

export interface VercelProjectTarget {
  id: string;
  alias: string[];
  readyState?: string;
}

export interface VercelProjectInfo {
  id: string;
  name: string;
  productionBranch?: string;
  targets: Record<string, VercelProjectTarget>;
  projectAliases: string[];
  customEnvironmentDomains: string[];
}

export interface ProtectionContext {
  project: VercelProjectInfo;
  domains: VercelProjectDomain[];
  aliases: VercelAliasRecord[];
}

export interface ClassifiedDeployment {
  deployment: VercelDeployment;
  effectiveState: string | undefined;
  normalizedTarget: NormalizedTarget;
  createdAt: number | undefined;
  aliases: string[];
  decision: "retain" | "delete";
  /** True when the deployment is protected by a hard safety rule (not merely count window). */
  hardProtected: boolean;
  reasons: RetentionReason[];
}

export interface RetentionPlan {
  projectId: string;
  projectName: string;
  totalDiscovered: number;
  retained: ClassifiedDeployment[];
  deletionCandidates: ClassifiedDeployment[];
  deferredByCap: ClassifiedDeployment[];
  warnings: string[];
}

export type DeletionOutcomeStatus =
  "dry-run" | "deleted" | "already-deleted" | "skipped-unsafe" | "failed";

export interface DeletionResult {
  uid: string;
  url?: string;
  target: NormalizedTarget;
  state: string | undefined;
  createdAt: number | undefined;
  status: DeletionOutcomeStatus;
  reason?: string;
}

export interface ProjectRunReport {
  configuredProject: string;
  projectId?: string;
  projectName?: string;
  teamId?: string;
  keepLastN: number;
  dryRun: boolean;
  status: "ok" | "partial-failure" | "failed";
  error?: string;
  plan?: RetentionPlan;
  deletions: DeletionResult[];
  durationMs: number;
}

export interface CleanupRunReport {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  dryRun: boolean;
  enableDeletion: boolean;
  projects: ProjectRunReport[];
  hasFailures: boolean;
}
