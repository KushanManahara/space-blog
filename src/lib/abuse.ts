import { createHash } from "crypto";
import { headers } from "next/headers";
import { eq, lt, sql } from "drizzle-orm";

import { db, rateLimits } from "@/lib/db";

/**
 * Abuse controls for the public write paths: comments, newsletter signup and
 * the contact form. All three are unauthenticated server actions, so this is
 * the only thing standing between them and the database.
 *
 * The goal is to make casual abuse uneconomic, not to defeat a determined
 * attacker — that would need a real challenge (Turnstile, BotID) in front.
 */

/** Field name shared by every protected form. Real users never fill it in. */
// Re-exported so existing server-side imports keep working.
export { HONEYPOT_FIELD } from "./honeypot";
import { HONEYPOT_FIELD } from "./honeypot";

/**
 * A bot that fills every input trips this; a human never sees it. Cheap, and
 * unlike a captcha it costs the reader nothing.
 */
export function isHoneypotTripped(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD);
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * The caller's address as the platform reports it.
 *
 * On Vercel these headers are set by the edge and a client-supplied value is
 * overwritten, so they can be trusted there. Self-hosted behind a proxy that
 * does not strip them, they are client-controlled — which is one reason these
 * limits are a speed bump rather than a security boundary.
 */
async function callerAddress(): Promise<{ ip: string; agent: string } | null> {
  try {
    const headerList = await headers();
    const ip =
      headerList.get("x-real-ip") ||
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    return { ip, agent: headerList.get("user-agent") ?? "" };
  } catch {
    return null;
  }
}

const digest = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 32);

/**
 * Caller identity for *rate limits*: the address alone, hashed.
 *
 * The user agent used to be part of this key, which made every limit optional —
 * a script that sent a different User-Agent per request got a fresh bucket each
 * time, so the comment, contact, signup (and its outbound welcome email) and
 * like ceilings did not hold against anything but a browser.
 */
export async function callerId(): Promise<string> {
  const caller = await callerAddress();
  return caller ? digest(caller.ip) : "anonymous";
}

/**
 * Caller identity for *de-duplication*: address plus user agent, hashed, so two
 * readers behind one office NAT still count as two views. Never use this as a
 * limit key — it is trivially varied. Only ever stored as a digest so the table
 * cannot be turned back into a list of who read what.
 */
export async function callerFingerprint(): Promise<string> {
  const caller = await callerAddress();
  return caller ? digest(`${caller.ip}|${caller.agent}`) : "anonymous";
}

/**
 * Fixed-window counter. Returns false once `limit` is exceeded inside
 * `windowSeconds`.
 *
 * Fails open: if the database is unreachable the form still works. A brief
 * window with no rate limiting beats a contact form that rejects everyone
 * during an outage.
 */
export async function underLimit(
  action: string,
  subject: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const key = `${action}:${subject}`;
  const now = Math.floor(Date.now() / 1000);

  try {
    const [row] = await db.select().from(rateLimits).where(eq(rateLimits.key, key));

    if (!row || now - row.windowStart >= windowSeconds) {
      await db
        .insert(rateLimits)
        .values({ key, count: 1, windowStart: now })
        .onConflictDoUpdate({
          target: rateLimits.key,
          set: { count: 1, windowStart: now },
        });
      return true;
    }

    if (row.count >= limit) return false;

    await db
      .update(rateLimits)
      .set({ count: sql`${rateLimits.count} + 1` })
      .where(eq(rateLimits.key, key));
    return true;
  } catch (error) {
    console.error("RATE LIMIT CHECK FAILED, ALLOWING REQUEST:", error);
    return true;
  }
}

/** How many times `action` was counted for `subject` in the current window. */
export async function countInWindow(
  action: string,
  subject: string,
  windowSeconds: number,
): Promise<number> {
  const now = Math.floor(Date.now() / 1000);
  try {
    const [row] = await db
      .select()
      .from(rateLimits)
      .where(eq(rateLimits.key, `${action}:${subject}`));
    return row && now - row.windowStart < windowSeconds ? row.count : 0;
  } catch (error) {
    console.error("RATE LIMIT READ FAILED:", error);
    return 0;
  }
}

/**
 * Delete counter rows whose window closed more than `olderThanSeconds` ago.
 *
 * Nothing removed these, so the table grew forever: `recordViewAction` writes a
 * `view:<slug>` row per reader per post per day, which is 40 rows per daily
 * reader accumulating with no ceiling. A closed window is dead weight — the
 * next request for that key overwrites it anyway — so dropping old rows cannot
 * affect any live limit.
 *
 * The default keeps two days, comfortably past the longest window in use (the
 * 24h like/view budget).
 *
 * Returns the number of rows removed, or null if the delete failed.
 */
export async function pruneRateLimits(olderThanSeconds = 172_800): Promise<number | null> {
  const cutoff = Math.floor(Date.now() / 1000) - olderThanSeconds;

  try {
    const result = await db.delete(rateLimits).where(lt(rateLimits.windowStart, cutoff));
    return result.rowsAffected ?? 0;
  } catch (error) {
    console.error("RATE LIMIT PRUNE FAILED:", error);
    return null;
  }
}

/**
 * True the first time this caller performs `action` on `subject` within the
 * window, false afterwards. Used so a like or a view counts once per person
 * rather than once per click.
 */
export async function firstTimeInWindow(
  action: string,
  subject: string,
  windowSeconds: number,
): Promise<boolean> {
  return underLimit(action, subject, 1, windowSeconds);
}
