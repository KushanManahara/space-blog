import { timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";

import { pruneRateLimits, underLimit } from "@/lib/abuse";
import { posts } from "@/lib/content";
import { db, rateLimits } from "@/lib/db";
import { reportError } from "@/lib/monitoring";
import { processEmailQueue } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

const LOCK = { action: "email-queue-lock", subject: "run" };
/** Longer than any run can last (functions time out at 300s), so a crashed run cannot hold it. */
const LOCK_SECONDS = 600;
/** Execution IDs are remembered this long; Vercel's late deliveries arrive well within it. */
const DEDUPE_SECONDS = 2 * 86_400;

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });

function authorised(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const wanted = Buffer.from(`Bearer ${secret ?? ""}`);
  return Boolean(secret) && given.length === wanted.length && timingSafeEqual(given, wanted);
}

/**
 * Daily email run: sends newly published posts to subscribers, and catches
 * up on email held back by Resend's quota. Also prunes expired rate-limit rows.
 *
 * Called by the `email-queue` Vercel Schedule (see vercel.json), which sends
 * `Authorization: Bearer $CRON_SECRET` on path targets, exactly as Cron Jobs
 * did. Without the secret set, it refuses everything: sending mail is not
 * something a stranger should be able to trigger.
 *
 * Schedules can deliver a run more than once and runs can overlap, so:
 * - a repeated execution ID (`ce-id`, the same on every delivery of a run) is
 *   acknowledged and skipped;
 * - a lock keeps a manual run and a scheduled one from working at once.
 * The queue itself is idempotent too (sent rows are marked), so these stop
 * wasted work and double-counted quota rather than double emails.
 */
export async function GET(request: Request): Promise<Response> {
  if (!authorised(request)) return new Response("Unauthorized", { status: 401 });

  // Preview schedules start inactive, but a manual run on a preview branch
  // would still mail real subscribers from a preview deployment.
  if (process.env.VERCEL_ENV !== "production") {
    return json({ skipped: "not production" });
  }

  const executionId = request.headers.get("ce-id");
  if (executionId && !(await underLimit("schedule-run", executionId, 1, DEDUPE_SECONDS))) {
    return json({ skipped: "duplicate delivery", executionId });
  }

  if (!(await underLimit(LOCK.action, LOCK.subject, 1, LOCK_SECONDS))) {
    return json({ skipped: "another run in progress" }, 409);
  }

  try {
    const summary = await processEmailQueue(posts);
    // Daily housekeeping: drop rate-limit rows whose window closed more than
    // two days ago. Nothing else removes them, and a failure here only logs.
    const pruned = await pruneRateLimits();
    console.log("[email queue]", { executionId, ...summary, pruned });
    return json({ ...summary, pruned });
  } catch (error) {
    await reportError("email queue", error);
    return new Response("Email queue failed", { status: 500 });
  } finally {
    await db
      .delete(rateLimits)
      .where(eq(rateLimits.key, `${LOCK.action}:${LOCK.subject}`))
      .catch((error: unknown) => console.error("[email queue] could not release lock", error));
  }
}
