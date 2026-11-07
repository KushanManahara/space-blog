import { createHash } from "node:crypto";

import { underLimit } from "@/lib/abuse";
import { emailEnabled, getResend, SENDER_EMAIL } from "@/lib/resend";

/**
 * Production error reporting.
 *
 * Most failures here are caught on purpose so a visitor sees a friendly message,
 * which also makes them invisible: newsletter signup was broken on production
 * for weeks because its error went to a log nobody reads. Anything caught that
 * means "this feature is not working" goes through `reportError`, which logs it
 * and emails the site owner through the Resend account the site already uses.
 *
 * An outage produces the same error thousands of times, so alerts are limited
 * three ways: per instance in memory (which still works when the database is
 * the thing that is down), per error per hour, and overall per day.
 */
const INSTANCE_WINDOW_MS = 10 * 60 * 1000;
const lastSent = new Map<string, number>();

/**
 * One line of what went wrong. Drizzle's messages include the query's bound
 * parameters, which can be a visitor's address, so those never leave this file.
 */
function summarise(error: unknown): string {
  const text = (value: unknown) =>
    (value instanceof Error ? value.message : typeof value === "string" ? value : "Unknown error")
      .replace(/params:.*$/gim, "")
      .replace(/\s+/g, " ")
      .trim();
  const cause = error instanceof Error && error.cause ? ` (cause: ${text(error.cause)})` : "";

  return `${text(error)}${cause}`.slice(0, 500);
}

export async function reportError(where: string, error: unknown): Promise<void> {
  console.error(`[${where}]`, error);

  const to = process.env.CONTACT_TO_EMAIL;
  if (process.env.VERCEL_ENV !== "production" || !emailEnabled || !to) return;

  try {
    const summary = summarise(error);
    const signature = createHash("sha256").update(`${where}|${summary}`).digest("hex").slice(0, 32);

    const now = Date.now();
    if (now - (lastSent.get(signature) ?? 0) < INSTANCE_WINDOW_MS) return;
    lastSent.set(signature, now);

    if (!(await underLimit("alert", signature, 1, 3600))) return;
    if (!(await underLimit("alert-total", "all", 20, 86_400))) return;

    await getResend().emails.send({
      from: SENDER_EMAIL,
      to,
      subject: `[Space alert] ${where}`.slice(0, 120),
      text: `${where}\n\n${summary}\n\nTime: ${new Date(now).toISOString()}\nDeployment: ${process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown"}\n\nFull details are in the Vercel logs. The same error will not alert again for an hour.`,
    });
  } catch (alertError) {
    // Reporting must never become a second failure for the caller.
    console.error("[monitoring] could not send alert", alertError);
  }
}
