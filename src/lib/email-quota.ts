import { sql } from "drizzle-orm";

import { db, emailUsage } from "@/lib/db";

/**
 * Resend free plan: 100 emails a day, 3,000 a month.
 *
 * Counted here so sends can be held back before Resend refuses them, and so
 * the most important mail (confirmations) gets the last of the day's budget.
 * The count is advisory: Resend's quota error is what actually stops a send,
 * and `markExhausted` brings the local count in line when that happens.
 */
const DAILY_LIMIT = 100;
const MONTHLY_LIMIT = 3000;

/** Kept back from new-post and welcome emails so signups can still be confirmed. */
export const CONFIRMATION_RESERVE = 10;

const periods = () => {
  const day = new Date().toISOString().slice(0, 10);
  return { day, month: day.slice(0, 7) };
};

/** Resend's error for an exhausted daily or monthly quota. */
export function isQuotaError(error: unknown): boolean {
  if (!error || typeof error !== "object" || !("name" in error)) return false;
  return error.name === "daily_quota_exceeded" || error.name === "monthly_quota_exceeded";
}

/** Emails that can still go out today. Fails open: unknown usage counts as zero. */
export async function remainingQuota(): Promise<number> {
  const { day, month } = periods();
  try {
    const rows = await db
      .select()
      .from(emailUsage)
      .where(sql`${emailUsage.period} IN (${day}, ${month})`);
    const used = (period: string) => rows.find((row) => row.period === period)?.count ?? 0;
    return Math.max(0, Math.min(DAILY_LIMIT - used(day), MONTHLY_LIMIT - used(month)));
  } catch (error) {
    console.error("EMAIL QUOTA READ FAILED:", error);
    return DAILY_LIMIT;
  }
}

async function bump(period: string, by: number, floor = 0) {
  await db
    .insert(emailUsage)
    .values({ period, count: Math.max(by, floor) })
    .onConflictDoUpdate({
      target: emailUsage.period,
      set: { count: sql`MAX(${emailUsage.count} + ${by}, ${floor})` },
    });
}

/** Count emails Resend accepted. */
export async function recordSent(count: number): Promise<void> {
  if (count <= 0) return;
  const { day, month } = periods();
  try {
    await Promise.all([bump(day, count), bump(month, count)]);
  } catch (error) {
    console.error("EMAIL QUOTA WRITE FAILED:", error);
  }
}

/** Resend refused for quota: stop trying until the period rolls over. */
export async function markExhausted(error: unknown): Promise<void> {
  const { day, month } = periods();
  const monthly =
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "monthly_quota_exceeded";
  try {
    await (monthly ? bump(month, 0, MONTHLY_LIMIT) : bump(day, 0, DAILY_LIMIT));
  } catch (writeError) {
    console.error("EMAIL QUOTA WRITE FAILED:", writeError);
  }
}
