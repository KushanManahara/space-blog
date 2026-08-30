import { createHash } from "crypto";
import { headers } from "next/headers";
import { eq, sql } from "drizzle-orm";

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
 * Caller identity, hashed. Only ever stored as a digest so the table cannot be
 * turned back into a list of who read what.
 */
export async function callerFingerprint(): Promise<string> {
  try {
    const headerList = await headers();
    // x-forwarded-for is a client-supplied header and can be spoofed; it is the
    // best signal available behind a proxy, which is why this is a speed bump
    // rather than a security boundary.
    const ip =
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headerList.get("x-real-ip") ||
      "unknown";
    const agent = headerList.get("user-agent") ?? "";

    return createHash("sha256").update(`${ip}|${agent}`).digest("hex").slice(0, 32);
  } catch {
    return "anonymous";
  }
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
