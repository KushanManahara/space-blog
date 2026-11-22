import { z } from "zod";
import {
  deleteDeploymentResponseSchema,
  deploymentAliasesResponseSchema,
  getDeploymentResponseSchema,
  getProjectResponseSchema,
  listAliasesResponseSchema,
  listDeploymentsResponseSchema,
  listProjectDomainsResponseSchema,
} from "./schemas";
import type {
  VercelAliasRecord,
  VercelDeployment,
  VercelProjectDomain,
  VercelProjectInfo,
} from "./types";

const DEFAULT_PAGE_LIMIT = 100;
const DEFAULT_MAX_PAGES = 200;
const DEFAULT_BASE_RETRY_DELAY_MS = 1_000;
const DEFAULT_MAX_RETRY_DELAY_MS = 60_000;
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

export interface VercelClientOptions {
  token: string;
  baseUrl: string;
  requestTimeoutMs: number;
  maxRetries: number;
  maxPages?: number;
  pageLimit?: number;
  baseRetryDelayMs?: number;
  maxRetryDelayMs?: number;
  fetchImpl?: typeof fetch;
  sleepImpl?: (ms: number) => Promise<void>;
  nowImpl?: () => number;
  onWarning?: (message: string) => void;
}

export interface LiveDeploymentDetail {
  uid: string;
  url?: string;
  createdAt?: number;
  readyState?: string;
  target?: string | null;
  aliases: string[];
  aliasAssigned?: number | boolean | null;
  isRollbackCandidate?: boolean | null;
}

export type DeleteDeploymentResult =
  { status: "deleted"; uid: string; state: string } | { status: "already-deleted"; uid: string };

export class VercelApiError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly endpoint: string;

  constructor(message: string, options: { status?: number; code?: string; endpoint: string }) {
    super(message);
    this.name = "VercelApiError";
    this.status = options.status;
    this.code = options.code;
    this.endpoint = options.endpoint;
  }
}

export function sanitizeSecret(text: string, secret: string): string {
  if (!secret) return text;
  return text.split(secret).join("[REDACTED]");
}

/**
 * Computes wait duration in milliseconds from standard HTTP `Retry-After` and
 * Vercel `X-RateLimit-Reset` response headers, falling back to bounded exponential backoff.
 */
export function computeRetryDelayMs(params: {
  headers: Headers;
  attempt: number;
  nowMs: number;
  baseDelayMs: number;
  maxDelayMs: number;
}): number {
  const { headers, attempt, nowMs, baseDelayMs, maxDelayMs } = params;

  const retryAfter = headers.get("retry-after")?.trim();
  if (retryAfter) {
    if (/^\d+$/.test(retryAfter)) {
      const seconds = Number.parseInt(retryAfter, 10);
      return Math.min(Math.max(seconds * 1_000, 0), maxDelayMs);
    }
    const parsedDate = Date.parse(retryAfter);
    if (!Number.isNaN(parsedDate)) {
      const delta = parsedDate - nowMs;
      return Math.min(Math.max(delta, 0), maxDelayMs);
    }
  }

  const rateLimitReset = headers.get("x-ratelimit-reset")?.trim();
  if (rateLimitReset && /^\d+$/.test(rateLimitReset)) {
    const resetEpochSeconds = Number.parseInt(rateLimitReset, 10);
    // Guard against both Unix-seconds and Unix-milliseconds headers.
    const resetMs =
      resetEpochSeconds > 10_000_000_000 ? resetEpochSeconds : resetEpochSeconds * 1_000;
    const delta = resetMs - nowMs;
    if (delta > 0) {
      // Add a small 250ms buffer so the window has actually rolled over.
      return Math.min(delta + 250, maxDelayMs);
    }
  }

  const exponential = baseDelayMs * 2 ** attempt;
  return Math.min(exponential, maxDelayMs);
}

function defaultSleep(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function extractVercelErrorDetails(bodyText: string): { code?: string; message?: string } {
  if (!bodyText) return {};
  try {
    const parsed: unknown = JSON.parse(bodyText);
    if (parsed && typeof parsed === "object" && "error" in parsed) {
      const errObj = (parsed as { error?: unknown }).error;
      if (errObj && typeof errObj === "object") {
        const code =
          "code" in errObj && typeof (errObj as { code?: unknown }).code === "string"
            ? (errObj as { code: string }).code
            : undefined;
        const message =
          "message" in errObj && typeof (errObj as { message?: unknown }).message === "string"
            ? (errObj as { message: string }).message
            : undefined;
        return { code, message };
      }
    }
  } catch {
    // Ignore non-JSON error bodies.
  }
  return { message: bodyText.slice(0, 300) };
}

export class VercelClient {
  private readonly token: string;
  private readonly baseUrl: string;
  private readonly requestTimeoutMs: number;
  private readonly maxRetries: number;
  private readonly maxPages: number;
  private readonly pageLimit: number;
  private readonly baseRetryDelayMs: number;
  private readonly maxRetryDelayMs: number;
  private readonly fetchImpl: typeof fetch;
  private readonly sleepImpl: (ms: number) => Promise<void>;
  private readonly nowImpl: () => number;
  private readonly onWarning?: (message: string) => void;

  constructor(options: VercelClientOptions) {
    this.token = options.token;
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.requestTimeoutMs = options.requestTimeoutMs;
    this.maxRetries = options.maxRetries;
    this.maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
    this.pageLimit = options.pageLimit ?? DEFAULT_PAGE_LIMIT;
    this.baseRetryDelayMs = options.baseRetryDelayMs ?? DEFAULT_BASE_RETRY_DELAY_MS;
    this.maxRetryDelayMs = options.maxRetryDelayMs ?? DEFAULT_MAX_RETRY_DELAY_MS;
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch;
    this.sleepImpl = options.sleepImpl ?? defaultSleep;
    this.nowImpl = options.nowImpl ?? Date.now;
    this.onWarning = options.onWarning;
  }

  private buildUrl(path: string, query: Record<string, string | number | undefined>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }

  private async requestOptionalJson<TSchema extends z.ZodTypeAny>(params: {
    method: "GET" | "DELETE";
    path: string;
    query?: Record<string, string | number | undefined>;
    schema: TSchema;
    allowNotFound: boolean;
  }): Promise<{ notFound: true; data: null } | { notFound: false; data: z.infer<TSchema> }> {
    const { method, path, query = {}, schema, allowNotFound } = params;
    const url = this.buildUrl(path, query);
    const endpoint = `${method} ${path}`;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      let response: Response;
      try {
        response = await this.fetchImpl(url, {
          method,
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(this.requestTimeoutMs),
        });
      } catch (error) {
        const rawMessage = error instanceof Error ? error.message : String(error);
        const message = sanitizeSecret(rawMessage, this.token);
        if (attempt < this.maxRetries) {
          const delayMs = Math.min(this.baseRetryDelayMs * 2 ** attempt, this.maxRetryDelayMs);
          this.onWarning?.(
            `Transient network error on ${endpoint} (attempt ${attempt + 1}/${this.maxRetries + 1}): ${message}. Retrying in ${delayMs}ms.`,
          );
          await this.sleepImpl(delayMs);
          continue;
        }
        throw new VercelApiError(`Network error calling ${endpoint}: ${message}`, { endpoint });
      }

      if (response.status === 404 && allowNotFound) {
        return { notFound: true, data: null };
      }

      if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < this.maxRetries) {
        const delayMs = computeRetryDelayMs({
          headers: response.headers,
          attempt,
          nowMs: this.nowImpl(),
          baseDelayMs: this.baseRetryDelayMs,
          maxDelayMs: this.maxRetryDelayMs,
        });
        this.onWarning?.(
          `Vercel API returned HTTP ${response.status} for ${endpoint} (attempt ${attempt + 1}/${this.maxRetries + 1}). Waiting ${delayMs}ms before retry.`,
        );
        await this.sleepImpl(delayMs);
        continue;
      }

      const rawText = await response.text();
      if (!response.ok) {
        const details = extractVercelErrorDetails(rawText);
        const safeDetail = sanitizeSecret(details.message ?? response.statusText, this.token);
        throw new VercelApiError(
          `Vercel API request failed (${endpoint}): HTTP ${response.status}${details.code ? ` [${details.code}]` : ""} — ${safeDetail}`,
          { status: response.status, code: details.code, endpoint },
        );
      }

      // Proactive throttling if the rate-limit bucket is now completely exhausted.
      const remainingHeader = response.headers.get("x-ratelimit-remaining")?.trim();
      if (remainingHeader === "0") {
        const pauseMs = computeRetryDelayMs({
          headers: response.headers,
          attempt: 0,
          nowMs: this.nowImpl(),
          baseDelayMs: this.baseRetryDelayMs,
          maxDelayMs: this.maxRetryDelayMs,
        });
        if (pauseMs > 0) {
          this.onWarning?.(
            `Vercel rate-limit bucket exhausted after ${endpoint}. Pausing ${pauseMs}ms until reset.`,
          );
          await this.sleepImpl(pauseMs);
        }
      }

      let json: unknown;
      try {
        json = rawText ? JSON.parse(rawText) : {};
      } catch (error) {
        throw new VercelApiError(
          `Invalid JSON returned by ${endpoint}: ${error instanceof Error ? error.message : String(error)}`,
          { status: response.status, endpoint },
        );
      }

      const parsed = schema.safeParse(json);
      if (!parsed.success) {
        const summary = parsed.error.issues
          .slice(0, 5)
          .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
          .join("; ");
        throw new VercelApiError(`Unexpected Vercel API payload from ${endpoint}: ${summary}`, {
          status: response.status,
          endpoint,
        });
      }

      return { notFound: false, data: parsed.data };
    }

    throw new VercelApiError(`Exhausted retries calling ${endpoint}`, { endpoint });
  }

  private async requestRequiredJson<TSchema extends z.ZodTypeAny>(params: {
    method: "GET" | "DELETE";
    path: string;
    query?: Record<string, string | number | undefined>;
    schema: TSchema;
  }): Promise<z.infer<TSchema>> {
    const result = await this.requestOptionalJson({ ...params, allowNotFound: false });
    if (result.notFound) {
      throw new VercelApiError(`Unexpected 404 calling ${params.method} ${params.path}`, {
        status: 404,
        endpoint: `${params.method} ${params.path}`,
      });
    }
    return result.data;
  }

  private async paginate<TItem>(params: {
    endpointLabel: string;
    fetchPage: (until: string | undefined) => Promise<{ items: TItem[]; next: string | null }>;
    getKey: (item: TItem) => string;
  }): Promise<TItem[]> {
    const { endpointLabel, fetchPage, getKey } = params;
    const collected = new Map<string, TItem>();
    const seenCursors = new Set<string>();
    let cursor: string | undefined = undefined;
    let consecutiveEmptyPages = 0;

    for (let page = 1; page <= this.maxPages; page += 1) {
      const { items, next } = await fetchPage(cursor);

      for (const item of items) {
        const key = getKey(item);
        if (!collected.has(key)) {
          collected.set(key, item);
        }
      }

      if (next === null) {
        return Array.from(collected.values());
      }

      if (items.length === 0) {
        consecutiveEmptyPages += 1;
        if (consecutiveEmptyPages >= 2) {
          throw new VercelApiError(
            `Pagination stalled on ${endpointLabel}: consecutive empty pages while pagination.next remained non-null (${next}). Aborting to avoid incomplete discovery.`,
            { endpoint: endpointLabel },
          );
        }
      } else {
        consecutiveEmptyPages = 0;
      }

      if (seenCursors.has(next) || next === cursor) {
        throw new VercelApiError(
          `Pagination loop detected on ${endpointLabel}: repeated cursor "${next}". Aborting to avoid incomplete discovery.`,
          { endpoint: endpointLabel },
        );
      }
      seenCursors.add(next);
      cursor = next;
    }

    throw new VercelApiError(
      `Pagination exceeded safety limit of ${this.maxPages} pages on ${endpointLabel}. Aborting to avoid deleting from a truncated dataset.`,
      { endpoint: endpointLabel },
    );
  }

  /**
   * `GET /v9/projects/{idOrName}`
   */
  async getProject(projectIdOrName: string, teamId?: string): Promise<VercelProjectInfo> {
    const encoded = encodeURIComponent(projectIdOrName);
    return this.requestRequiredJson({
      method: "GET",
      path: `/v9/projects/${encoded}`,
      query: { teamId },
      schema: getProjectResponseSchema,
    });
  }

  /**
   * `GET /v9/projects/{projectId}/domains` (paginated)
   */
  async listProjectDomains(projectId: string, teamId?: string): Promise<VercelProjectDomain[]> {
    const encoded = encodeURIComponent(projectId);
    return this.paginate({
      endpointLabel: `GET /v9/projects/${encoded}/domains`,
      fetchPage: async (until) => {
        const data = await this.requestRequiredJson({
          method: "GET",
          path: `/v9/projects/${encoded}/domains`,
          query: { teamId, limit: this.pageLimit, until },
          schema: listProjectDomainsResponseSchema,
        });
        return {
          items: data.domains,
          next: data.pagination?.next ?? null,
        };
      },
      getKey: (domain) => domain.name,
    });
  }

  /**
   * `GET /v4/aliases?projectId={projectId}` (paginated)
   */
  async listProjectAliases(projectId: string, teamId?: string): Promise<VercelAliasRecord[]> {
    return this.paginate({
      endpointLabel: "GET /v4/aliases",
      fetchPage: async (until) => {
        const data = await this.requestRequiredJson({
          method: "GET",
          path: "/v4/aliases",
          query: { projectId, teamId, limit: this.pageLimit, until },
          schema: listAliasesResponseSchema,
        });
        return {
          items: data.aliases,
          next: data.pagination?.next ?? null,
        };
      },
      getKey: (alias) => `${alias.uid}:${alias.alias}`,
    });
  }

  /**
   * `GET /v6/deployments?projectId={projectId}` (paginated)
   */
  async listDeployments(projectId: string, teamId?: string): Promise<VercelDeployment[]> {
    return this.paginate({
      endpointLabel: "GET /v6/deployments",
      fetchPage: async (until) => {
        const data = await this.requestRequiredJson({
          method: "GET",
          path: "/v6/deployments",
          query: { projectId, teamId, limit: this.pageLimit, until },
          schema: listDeploymentsResponseSchema,
        });
        return {
          items: data.deployments,
          next: data.pagination?.next ?? null,
        };
      },
      getKey: (deployment) => deployment.uid,
    });
  }

  /**
   * `GET /v13/deployments/{id}` — returns null if deployment was already deleted (404).
   */
  async getDeployment(deploymentId: string, teamId?: string): Promise<LiveDeploymentDetail | null> {
    const encoded = encodeURIComponent(deploymentId);
    const result = await this.requestOptionalJson({
      method: "GET",
      path: `/v13/deployments/${encoded}`,
      query: { teamId },
      schema: getDeploymentResponseSchema,
      allowNotFound: true,
    });
    return result.notFound ? null : result.data;
  }

  /**
   * `GET /v2/deployments/{id}/aliases` — returns null if deployment was already deleted (404).
   */
  async listDeploymentAliases(deploymentId: string, teamId?: string): Promise<string[] | null> {
    const encoded = encodeURIComponent(deploymentId);
    const result = await this.requestOptionalJson({
      method: "GET",
      path: `/v2/deployments/${encoded}/aliases`,
      query: { teamId },
      schema: deploymentAliasesResponseSchema,
      allowNotFound: true,
    });
    if (result.notFound) return null;
    return result.data.aliases.map((entry) => entry.alias.toLowerCase());
  }

  /**
   * `DELETE /v13/deployments/{id}` — idempotent: HTTP 404 is treated as `already-deleted`.
   */
  async deleteDeployment(deploymentId: string, teamId?: string): Promise<DeleteDeploymentResult> {
    const encoded = encodeURIComponent(deploymentId);
    const result = await this.requestOptionalJson({
      method: "DELETE",
      path: `/v13/deployments/${encoded}`,
      query: { teamId },
      schema: deleteDeploymentResponseSchema,
      allowNotFound: true,
    });
    if (result.notFound) {
      return { status: "already-deleted", uid: deploymentId };
    }
    return {
      status: "deleted",
      uid: result.data.uid,
      state: result.data.state,
    };
  }
}
