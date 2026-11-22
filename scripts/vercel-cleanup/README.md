# Automated Vercel Deployment Cleanup

Count-based automated deployment retention for Vercel projects, designed to control **Deployment Storage** usage on the Vercel Hobby (free) plan without affecting live traffic or rollback safety.

The cleanup system runs independently from the application's deployment pipeline (`ci.yml` and Vercel Git deploys). It defaults to **dry-run mode** and never deletes deployments unless deletion is explicitly enabled.

---

## Architecture & Execution Flow

### Components

| File                                              | Responsibility                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `scripts/vercel-cleanup/cli.ts`                   | CLI entry point, `.env.local`/`.env` loading, exit codes                                               |
| `scripts/vercel-cleanup/config.ts`                | Environment & CLI flag parsing, multi-project configuration, strict dry-run gating                     |
| `scripts/vercel-cleanup/schemas.ts`               | Zod v4 runtime schemas validating all Vercel REST API payloads and JSON config                         |
| `scripts/vercel-cleanup/client.ts`                | Typed Vercel REST API client with cursor pagination, retries, rate-limit handling, and token redaction |
| `scripts/vercel-cleanup/retention.ts`             | Pure, deterministic retention & safety classification engine                                           |
| `scripts/vercel-cleanup/runner.ts`                | End-to-end orchestrator (discover → plan → pre-delete re-verification → idempotent delete)             |
| `scripts/vercel-cleanup/reporter.ts`              | Structured console logging and GitHub Actions `$GITHUB_STEP_SUMMARY` Markdown tables                   |
| `.github/workflows/vercel-deployment-cleanup.yml` | Scheduled (every 30 minutes) + manual `workflow_dispatch` workflow with concurrency guard              |

### Execution Flow (Per Project)

```
1. Discovery (fail-closed — any API/schema/pagination failure aborts the project with 0 deletions)
   ├── GET /v9/projects/{idOrName}            Resolve canonical project ID, targets.production, productionBranch, customEnvironments
   ├── GET /v9/projects/{projectId}/domains   Paginated list of configured production, branch, and custom-env domains
   ├── GET /v4/aliases?projectId={projectId}  Paginated list of live aliases mapped to deployment IDs
   └── GET /v6/deployments?projectId={id}     Paginated list of all deployments (deduplicated & sorted newest-first)

2. Deterministic Safety & Retention Classification
   ├── Hard-protect: active production target (`project.targets.production.id`) & any other named target
   ├── Hard-protect: deployments serving production domains, custom domains, configured project domains,
   │                 production branch aliases, or manually assigned `.vercel.app` aliases
   ├── Hard-protect: in-progress builds (`BUILDING`, `INITIALIZING`, `QUEUED`)
   ├── Hard-protect: unverifiable records (missing timestamp, unknown state, unknown target)
   ├── Fallback guard: if Vercel returned no explicit active production match, protect newest READY production
   ├── Rollback guard: protect at least `MIN_PRODUCTION_DEPLOYMENTS` (default 2) healthy READY production
   │                   deployments (preferring `isRollbackCandidate !== false` older than active production)
   ├── Retention window: retain up to `KEEP_LAST_N` (default 5) healthy READY deployments total
   │                     (failed `ERROR` / `CANCELED` builds never crowd out healthy READY builds)
   └── Candidates: remaining terminal deployments outside the retention window (optionally capped oldest-first)

3. Pre-Delete Verification & Idempotent Deletion (live mode only; skipped in dry-run)
   ├── Re-fetch GET /v9/projects/{projectId} to catch any promotion/rollback during discovery
   ├── For each candidate (oldest first):
   │   ├── GET /v13/deployments/{uid}          Confirm live state is still terminal (404 → already-deleted)
   │   ├── GET /v2/deployments/{uid}/aliases   Confirm no protected alias was attached (404 → already-deleted)
   │   └── DELETE /v13/deployments/{uid}       Delete verified deployment (404 → idempotent already-deleted)
   └── Any verification failure preserves the deployment (`skipped-unsafe`) rather than risking a live outage
```

### Why the Newest 5 Are Not Always the Safest 5

A naive "keep newest 5, delete the rest" rule breaks in common real-world scenarios:

- **Burst of failed builds:** Five consecutive `ERROR` or `CANCELED` builds would evict every healthy deployment. Here, failed builds do not consume `KEEP_LAST_N` healthy slots.
- **Burst of preview PR builds:** Six preview deployments would push production and its instant-rollback target out of the top 5. Here, active production and `MIN_PRODUCTION_DEPLOYMENTS` (default `2`) healthy production deployments are always protected first.
- **Active rollback:** If production was rolled back to deployment #8, deployment #8 is protected via `targets.production.id` and its live production domain aliases, and an older healthy production deployment is preserved as its rollback target.
- **Race conditions:** Re-verifying each candidate via `GET /v13/deployments/{uid}` and `GET /v2/deployments/{uid}/aliases` immediately before `DELETE` prevents deleting a deployment that was just promoted or assigned a domain.

---

## Configuration: Environment Variables & GitHub Secrets

### GitHub Actions Secrets (`Settings → Secrets and variables → Actions → Secrets`)

| Secret                 | Required   | Description                                                                                                                                                  |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VERCEL_TOKEN`         | **Yes**    | Vercel API access token (create in Vercel Dashboard → Account Settings → Tokens). Scope it to the smallest account/team needed.                              |
| `VERCEL_PROJECT_IDS`   | **Yes**\*  | Comma-separated Vercel project IDs (e.g. `prj_abc123,prj_def456`) or project names.                                                                          |
| `VERCEL_PROJECTS_JSON` | Optional\* | JSON array for per-project overrides (takes precedence over `VERCEL_PROJECT_IDS` when set). \*Provide either `VERCEL_PROJECT_IDS` or `VERCEL_PROJECTS_JSON`. |
| `VERCEL_TEAM_ID`       | Optional   | Default Vercel Team ID (e.g. `team_...`). Omit for personal Hobby accounts.                                                                                  |

### GitHub Actions Variables (`Settings → Secrets and variables → Actions → Variables`)

Non-sensitive operational settings are best stored as Repository Variables (the workflow also falls back to Secrets of the same name for `KEEP_LAST_N` and `VERCEL_CLEANUP_ENABLE_DELETION`):

| Variable                                   | Default       | Description                                                                                                                                   |
| ------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `VERCEL_CLEANUP_ENABLE_DELETION`           | `false`       | **Master opt-in switch.** Must be set to `true` before any actual `DELETE` requests are made.                                                 |
| `VERCEL_CLEANUP_DRY_RUN`                   | `false`       | Emergency override. Set to `true` to force dry-run mode without removing `VERCEL_CLEANUP_ENABLE_DELETION`.                                    |
| `KEEP_LAST_N`                              | `5`           | Number of healthy (`READY`) deployments to retain per project.                                                                                |
| `VERCEL_MIN_PRODUCTION_DEPLOYMENTS`        | `2`           | Minimum healthy `READY` production deployments to protect per project (active production + rollback target).                                  |
| `VERCEL_CLEANUP_MIN_AGE_MINUTES`           | `0`           | Optional cooldown window (in minutes) protecting brand-new deployments from deletion.                                                         |
| `VERCEL_CLEANUP_PROTECT_ALL_ALIASES`       | `false`       | If `true`, protects every deployment with _any_ Vercel alias, including auto-generated feature-branch preview aliases (`*-git-*.vercel.app`). |
| `VERCEL_CLEANUP_MAX_DELETIONS_PER_PROJECT` | _(unlimited)_ | Optional per-run cap on deletions per project (oldest candidates are deleted first).                                                          |

### Local Environment Variables

When running locally via `pnpm vercel:cleanup`, the script reads `.env.local`, `.env`, and shell environment variables:

| Environment Variable         | Default                         | Description                                                     |
| ---------------------------- | ------------------------------- | --------------------------------------------------------------- |
| `VERCEL_TOKEN`               | _(required)_                    | Vercel API bearer token                                         |
| `VERCEL_PROJECT_IDS`         | _(one project config required)_ | Comma-separated project IDs or names                            |
| `VERCEL_PROJECT_ID`          | _(fallback)_                    | Single project ID or name                                       |
| `VERCEL_PROJECTS_JSON`       | _(optional)_                    | JSON array with per-project `id`, `teamId`, `keepLastN`, etc.   |
| `VERCEL_TEAM_ID`             | _(unset)_                       | Default Vercel Team ID                                          |
| `KEEP_LAST_N`                | `5`                             | Healthy deployments to retain per project                       |
| `MIN_PRODUCTION_DEPLOYMENTS` | `2`                             | Minimum healthy production deployments to protect               |
| `MIN_AGE_MINUTES`            | `0`                             | Optional minimum deployment age before deletion                 |
| `PROTECT_ALL_ALIASES`        | `false`                         | Protect all aliased deployments including feature branches      |
| `MAX_DELETIONS_PER_PROJECT`  | _(unlimited)_                   | Optional max deletions per project per run                      |
| `ENABLE_DELETION`            | `false`                         | Must be `true` to enable actual deletion                        |
| `DRY_RUN`                    | _(unset; dry-run by default)_   | Set `true` to force dry-run regardless of `ENABLE_DELETION`     |
| `VERCEL_REQUEST_TIMEOUT_MS`  | `30000`                         | HTTP timeout per Vercel API call (ms)                           |
| `VERCEL_MAX_RETRIES`         | `4`                             | Max retry attempts on `429`, `5xx`, or transient network errors |
| `DELETE_DELAY_MS`            | `250`                           | Delay between consecutive `DELETE` calls (ms)                   |

---

## Configuring Multiple Projects

### Option 1: Simple Comma-Separated List (`VERCEL_PROJECT_IDS`)

Best when all projects share the same `KEEP_LAST_N` and team scope:

```bash
VERCEL_PROJECT_IDS="prj_spaceBlog123,prj_portfolio456,prj_docs789"
KEEP_LAST_N=5
```

Find each project's ID in **Vercel Dashboard → Project → Settings → General → Project ID** (using `prj_...` IDs is more resilient than project names if a project is ever renamed).

### Option 2: Per-Project Overrides (`VERCEL_PROJECTS_JSON`)

Use `VERCEL_PROJECTS_JSON` when projects need different retention counts, rollback floors, or team IDs:

```json
[
  { "id": "prj_spaceBlog123", "keepLastN": 5, "minProductionDeployments": 2 },
  { "id": "prj_portfolio456", "keepLastN": 3, "minAgeMinutes": 60 },
  { "id": "prj_teamApp789", "teamId": "team_abc123", "keepLastN": 5, "maxDeletionsPerRun": 10 }
]
```

Every field except `id` is optional and inherits the global default.

---

## Running Locally

1. Install dependencies (from the `frontend` repository root):

   ```bash
   pnpm install
   ```

2. Run a **dry-run preview** (safe default — makes only read-only `GET` requests):

   ```bash
   VERCEL_TOKEN="your_token" \
   VERCEL_PROJECT_IDS="prj_your_project_id" \
   pnpm vercel:cleanup
   ```

   You can also inspect CLI options anytime:

   ```bash
   pnpm vercel:cleanup --help
   ```

3. Test with custom retention count or project override on the CLI:

   ```bash
   VERCEL_TOKEN="your_token" \
   pnpm vercel:cleanup --dry-run --keep=5 --projects="prj_one,prj_two"
   ```

4. Execute actual verified deletions locally (only after reviewing dry-run output):

   ```bash
   VERCEL_TOKEN="your_token" \
   VERCEL_PROJECT_IDS="prj_your_project_id" \
   ENABLE_DELETION=true \
   pnpm vercel:cleanup
   ```

   Or pass the explicit `--delete` flag (note: `--dry-run` or `DRY_RUN=true` always takes precedence):

   ```bash
   VERCEL_TOKEN="your_token" \
   VERCEL_PROJECT_IDS="prj_your_project_id" \
   pnpm vercel:cleanup --delete
   ```

---

## Enabling Actual Deletion in GitHub Actions

By design, merging the workflow runs **dry-run only** until you explicitly opt in:

1. Add GitHub Secrets (`Settings → Secrets and variables → Actions → Secrets`):
   - `VERCEL_TOKEN`
   - `VERCEL_PROJECT_IDS` (or `VERCEL_PROJECTS_JSON`)
   - `VERCEL_TEAM_ID` (only if using a Vercel Team)
2. Trigger a manual run first (see below) with **Force dry-run mode** checked (`true`) and review the retained list and deletion candidates in the logs.
3. Once verified, add a Repository Variable (`Settings → Secrets and variables → Actions → Variables`):
   - Name: `VERCEL_CLEANUP_ENABLE_DELETION`
   - Value: `true`
4. To pause deletions temporarily at any time without removing secrets, set Repository Variable `VERCEL_CLEANUP_DRY_RUN` to `true` (or change `VERCEL_CLEANUP_ENABLE_DELETION` back to `false`).

---

## Manually Triggering the GitHub Action

1. Open the repository on GitHub and go to the **Actions** tab.
2. Select **Vercel Deployment Cleanup** in the left sidebar.
3. Click **Run workflow**.
4. Configure inputs:
   - **Force dry-run mode** (`dry_run`): checked (`true`) by default for safe previews. Uncheck (`false`) to allow actual deletions (still requires `VERCEL_CLEANUP_ENABLE_DELETION=true`).
   - **Override `KEEP_LAST_N`**: optional integer override for this run only.
   - **Override `project_ids`**: optional comma-separated project IDs/names to target specific project(s) for this run only.
5. Click **Run workflow**.

Concurrency protection (`group: vercel-deployment-cleanup`, `cancel-in-progress: false`) ensures a manual trigger will wait cleanly if a scheduled run is already executing instead of overlapping or interrupting it.

---

## Inspecting Cleanup Logs

Each GitHub Actions run produces two complementary views (neither ever prints `VERCEL_TOKEN`):

1. **Job Summary (fast overview):**
   Open any **Vercel Deployment Cleanup** workflow run → scroll to the **Summary** tab. You will see a Markdown table per project showing:
   - Mode (`Dry-run` vs `Live deletion`)
   - `Keep N`, `Discovered`, `Retained`, `Candidates`, `Deleted`, `Already Deleted`, `Skipped (Unsafe)`, `Failed`, and overall `Status`
   - Any project errors or safety warnings

2. **Detailed Step Logs (deployment-by-deployment audit trail):**
   Click the `cleanup` job → expand **Run Vercel deployment cleanup**. The log prints:
   - Every retained deployment with its `uid`, ISO timestamp, target, state, protection/retention `reasons`, and attached aliases (`[KEEP]`)
   - Every deletion candidate or outcome (`[DRY-RUN]`, `[DELETED]`, `[ALREADY-DELETED]`, `[SKIPPED-UNSAFE]`, `[FAILED]`) with its reason
   - Any rate-limit backoffs or transient retry warnings (`[vercel-cleanup] WARN: ...`)
