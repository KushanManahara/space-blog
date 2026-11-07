import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";

import { db, reviews } from "@/lib/db";
import { reportError } from "@/lib/monitoring";

/**
 * Reader reviews: validation, spam checks, moderation links and the public
 * read path. Every review is stored `pending`; only a moderator can publish.
 */

export const REVIEWS_TAG = "reviews";
export const REVIEWS_PAGE_SIZE = 9;
export const HOMEPAGE_REVIEWS = 6;

const NAME_MAX = 60;
const BODY_MIN = 20;
export const BODY_MAX = 1000;
const EMAIL_MAX = 254;

/** Control characters other than tab and newline. Never legitimate in a review. */
const CONTROL = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F​-‏‪-‮⁦-⁩]/g;
/** Reviews never need links or markup, and spam nearly always has one. */
const LINK = /(https?:\/\/|www\.|\[[^\]]*\]\([^)]*\))/i;
const MARKUP = /<\s*[a-z!/?]/i;

const cleanLine = (value: string) => value.replace(CONTROL, "").replace(/\s+/g, " ").trim();
const cleanText = (value: string) =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const reviewInputSchema = z.object({
  displayName: z
    .string()
    .transform(cleanLine)
    .pipe(
      z
        .string()
        .min(2, "Add a name to show with your review.")
        .max(NAME_MAX, "That name is too long. Sixty characters at most.")
        .refine((name) => !LINK.test(name) && !MARKUP.test(name), "Names can't contain links."),
    ),
  rating: z.coerce
    .number({ error: "Choose a rating from one to five stars." })
    .int("Choose a rating from one to five stars.")
    .min(1, "Choose a rating from one to five stars.")
    .max(5, "Choose a rating from one to five stars."),
  body: z
    .string()
    .transform(cleanText)
    .pipe(
      z
        .string()
        .min(BODY_MIN, "A little more detail helps: twenty characters at least.")
        .max(BODY_MAX, "That review is too long. A thousand characters at most.")
        .refine((body) => !LINK.test(body), "Links aren't allowed in reviews.")
        .refine((body) => !MARKUP.test(body), "Reviews are plain text. Remove the HTML tags."),
    ),
  email: z
    .string()
    .trim()
    .max(EMAIL_MAX)
    .transform((value) => value.toLowerCase())
    .pipe(z.union([z.literal(""), z.email("Enter a valid email, or leave it empty.")]))
    .transform((value) => value || null),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;

/**
 * Fingerprint of the text with case, spacing and punctuation removed, so the
 * same review pasted again (or lightly reformatted) counts as a duplicate.
 */
export function reviewFingerprint(body: string): string {
  const normalised = body.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  return createHash("sha256").update(normalised).digest("hex");
}

/** Cloudflare's documented always-pass test secret, for local development only. */
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

/**
 * Server-side Turnstile check. Fails closed: no secret in production, a
 * missing token, a network error or anything but `success: true` is a refusal.
 */
export async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.VERCEL_ENV === "production" ? undefined : TURNSTILE_TEST_SECRET);
  if (!secret || !token || token.length > 2048) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result: unknown = await response.json();
    return (
      typeof result === "object" &&
      result !== null &&
      "success" in result &&
      result.success === true
    );
  } catch (error) {
    console.error("TURNSTILE VERIFY FAILED:", error);
    return false;
  }
}

export type CreateResult = { status: "created"; id: string } | { status: "duplicate" };

/** Stores a validated review as pending. A duplicate text is refused by the unique fingerprint. */
export async function createReview(input: ReviewInput): Promise<CreateResult> {
  const id = randomUUID();
  const inserted = await db
    .insert(reviews)
    .values({
      id,
      displayName: input.displayName,
      rating: input.rating,
      body: input.body,
      email: input.email,
      bodyHash: reviewFingerprint(input.body),
    })
    .onConflictDoNothing({ target: reviews.bodyHash })
    .returning({ id: reviews.id });
  return inserted.length > 0 ? { status: "created", id } : { status: "duplicate" };
}

export const moderationActions = ["approve", "feature", "hide", "reject"] as const;
export type ModerationAction = (typeof moderationActions)[number];

export function isModerationAction(value: string | null): value is ModerationAction {
  return moderationActions.some((action) => action === value);
}

/** Applies a moderation decision. Returns false when the review doesn't exist. */
export async function moderateReview(id: string, action: ModerationAction): Promise<boolean> {
  const change = {
    approve: { status: "approved", featured: 0 },
    feature: { status: "approved", featured: 1 },
    hide: { status: "hidden", featured: 0 },
    reject: { status: "rejected", featured: 0 },
  } as const;
  const updated = await db
    .update(reviews)
    .set({ ...change[action], moderatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(reviews.id, id))
    .returning({ id: reviews.id });
  return updated.length > 0;
}

/** Drops cached review lists so a moderation change shows on the next request. */
export function refreshReviewPages() {
  revalidateTag(REVIEWS_TAG, "max");
  revalidatePath("/");
  revalidatePath("/reviews");
}

export async function getReview(id: string) {
  const [row] = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
  return row;
}

/** How long a moderation link in the notification email stays valid. */
const MODERATION_TTL_SECONDS = 30 * 86_400;

function moderationSignature(id: string, action: ModerationAction, issuedAt: number): string {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) throw new Error("NEWSLETTER_SECRET is not set — moderation links cannot be signed.");
  // Purpose prefix so a moderation token can never stand in for a newsletter one.
  return createHmac("sha256", secret)
    .update(`review-moderation:${id}:${action}:${issuedAt}`)
    .digest("base64url");
}

export function moderationLink(siteUrl: string, id: string, action: ModerationAction): string {
  const at = Math.floor(Date.now() / 1000);
  const t = moderationSignature(id, action, at);
  return `${siteUrl}/api/reviews/moderate?id=${encodeURIComponent(id)}&a=${action}&at=${at}&t=${encodeURIComponent(t)}`;
}

/** Constant-time check of a moderation link, including its age. */
export function verifyModerationLink(
  id: string,
  action: ModerationAction,
  issuedAt: number,
  token: string | null,
): boolean {
  if (!token || !Number.isInteger(issuedAt)) return false;
  const age = Math.floor(Date.now() / 1000) - issuedAt;
  if (age < 0 || age > MODERATION_TTL_SECONDS) return false;
  try {
    const expected = Buffer.from(moderationSignature(id, action, issuedAt));
    const given = Buffer.from(token);
    return expected.length === given.length && timingSafeEqual(expected, given);
  } catch {
    return false;
  }
}

export type PublicReview = {
  id: string;
  displayName: string;
  rating: number;
  body: string;
  createdAt: string;
  featured: boolean;
};

export type ReviewPage = {
  items: PublicReview[];
  total: number;
  average: number | null;
  page: number;
  pageCount: number;
};

/**
 * Approved reviews only, featured first, newest next. The email column is
 * never selected, so it cannot reach a page by accident.
 */
export async function readApprovedReviews(
  page: number,
  pageSize: number = REVIEWS_PAGE_SIZE,
): Promise<ReviewPage> {
  const empty = { items: [], total: 0, average: null, page: 1, pageCount: 1 };
  try {
    const approved = eq(reviews.status, "approved");
    const [stats] = await db
      .select({
        total: sql<number>`count(*)`,
        average: sql<number | null>`avg(${reviews.rating})`,
      })
      .from(reviews)
      .where(approved);
    const total = Number(stats?.total ?? 0);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(Math.max(1, page), pageCount);

    const rows = await db
      .select({
        id: reviews.id,
        displayName: reviews.displayName,
        rating: reviews.rating,
        body: reviews.body,
        createdAt: reviews.createdAt,
        featured: reviews.featured,
      })
      .from(reviews)
      .where(approved)
      .orderBy(desc(reviews.featured), desc(reviews.createdAt), desc(reviews.id))
      .limit(pageSize)
      .offset((current - 1) * pageSize);

    return {
      items: rows.map((row) => ({
        ...row,
        createdAt: row.createdAt ?? "",
        featured: row.featured === 1,
      })),
      total,
      average: stats?.average == null ? null : Math.round(Number(stats.average) * 10) / 10,
      page: current,
      pageCount,
    };
  } catch (error) {
    await reportError("reviews read", error);
    return empty;
  }
}

/** Cached for a minute and dropped early by `refreshReviewPages`. */
export const getApprovedReviews = unstable_cache(readApprovedReviews, ["approved-reviews"], {
  revalidate: 60,
  tags: [REVIEWS_TAG],
});
