// src/lib/newsletter.ts

import { emailEnabled, getResend, SENDER_EMAIL } from "@/lib/resend";
import { and, asc, eq, isNull, lt, lte, notInArray, sql } from "drizzle-orm";
import type { CreateEmailOptions } from "resend";

import { broadcastDeliveries, broadcasts, db, newsletterSubscribers } from "@/lib/db";
import {
  CONFIRMATION_RESERVE,
  isQuotaError,
  markExhausted,
  recordSent,
  remainingQuota,
} from "@/lib/email-quota";
import { WelcomeEmail, getWelcomeEmailText } from "@/emails/welcome";
import {
  ArticleNotificationEmail,
  getArticleNotificationText,
} from "@/emails/article-notification";
import {
  ContactNotificationEmail,
  getContactNotificationText,
} from "@/emails/contact-notification";
import { signConfirm, signUnsubscribe } from "@/lib/newsletter-token";
import {
  ConfirmSubscriptionEmail,
  getConfirmSubscriptionText,
} from "@/emails/confirm-subscription";
import type { Post } from "@/lib/content";
import { reportError } from "@/lib/monitoring";

// BASE PRODUCTION DOMAIN FOR LINK GENERATION
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://space.gimhara.com";

/**
 * A signed unsubscribe link for one address.
 *
 * The token is what stops a URL being edited to unsubscribe somebody else, and
 * what lets the route refuse anything that did not come from an email we sent.
 */
function unsubscribeLink(email: string): string {
  const address = email.trim().toLowerCase();
  const token = signUnsubscribe(address);
  return `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(address)}&t=${encodeURIComponent(token)}`;
}

/**
 * GENERATES COMPLIANCE HEADERS FOR DELIVERABILITY AND ONE-CLICK UNSUBSCRIBE (RFC 8058)
 */
function getComplianceHeaders(email: string) {
  const unsubscribeUrl = unsubscribeLink(email);
  return {
    "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:newsletter.space@gimhara.com?subject=unsubscribe>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

/**
 * SYNCS A SUBSCRIBER EMAIL TO RESEND CONTACTS (UNIFIED API)
 */
export async function syncResendContact(email: string) {
  if (!emailEnabled) return { success: false, error: "Email is not configured." };

  try {
    const { data, error } = await getResend().contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("RESEND CONTACT SYNC WARNING:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("RESEND CONTACT SYNC EXCEPTION:", error);
    return { success: false, error };
  }
}

type SendResult =
  { success: true; id?: string } | { success: false; quota: boolean; error: unknown };

/** Resend refused: quota is expected and queued, anything else is alerted. */
async function sendFailed(where: string, error: unknown): Promise<SendResult> {
  if (isQuotaError(error)) {
    console.warn(`[${where}] Resend quota reached, queued for later`, error);
    await markExhausted(error);
    return { success: false, quota: true, error };
  }
  await reportError(where, error);
  return { success: false, quota: false, error };
}

/**
 * One counted send. `keep` is how much of today's budget must be left after
 * it, so lower-priority mail stops before it eats the confirmations' share.
 */
async function sendCounted(
  where: string,
  payload: CreateEmailOptions,
  keep = 0,
): Promise<SendResult> {
  if (!emailEnabled) return { success: false, quota: false, error: "Email is not configured." };
  if ((await remainingQuota()) <= keep) {
    return { success: false, quota: true, error: "Daily email budget used." };
  }

  try {
    const { data, error } = await getResend().emails.send(payload);
    if (error) return await sendFailed(where, error);
    await recordSent(1);
    return { success: true, id: data?.id };
  } catch (error) {
    return await sendFailed(where, error);
  }
}

/**
 * Sends the double opt-in email. Nothing else happens for a new signup until
 * its link is followed — no Resend contact, no welcome email, no broadcasts.
 *
 * Records the outcome on the subscriber row: a sent time on success, a failed
 * attempt otherwise. A row left without a sent time is picked up by the queue.
 */
export async function sendConfirmationEmail(email: string): Promise<SendResult> {
  const address = email.trim().toLowerCase();
  const issuedAt = Math.floor(Date.now() / 1000);
  const token = signConfirm(address, issuedAt);
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?email=${encodeURIComponent(address)}&at=${issuedAt}&t=${encodeURIComponent(token)}`;

  const result = await sendCounted("email: confirmation", {
    from: SENDER_EMAIL,
    to: address,
    subject: "Confirm your Space subscription",
    text: getConfirmSubscriptionText({ subscriberEmail: address, confirmUrl }),
    react: ConfirmSubscriptionEmail({ subscriberEmail: address, confirmUrl }),
  });

  await db
    .update(newsletterSubscribers)
    .set(
      result.success
        ? { confirmSentAt: issuedAt }
        : // A quota refusal is not the address's fault, so it does not count
          // towards giving up on it.
          {
            confirmAttempts: sql`${newsletterSubscribers.confirmAttempts} + ${result.quota ? 0 : 1}`,
          },
    )
    .where(eq(newsletterSubscribers.email, address));

  return result;
}

/**
 * SENDS TRANSACTIONAL WELCOME EMAIL VIA RESEND WITH MULTIPART PLAIN-TEXT FALLBACK
 *
 * Lowest priority mail: it leaves the confirmation reserve alone, and a send
 * that does not happen is flagged for the queue instead of lost.
 */
export async function sendWelcomeEmail(email: string): Promise<SendResult> {
  const unsubscribeUrl = unsubscribeLink(email);
  const props = { subscriberEmail: email, siteUrl: SITE_URL, unsubscribeUrl };

  const result = await sendCounted(
    "email: welcome",
    {
      from: SENDER_EMAIL,
      to: email,
      subject: "Welcome to Space",
      headers: getComplianceHeaders(email),
      text: getWelcomeEmailText(props),
      react: WelcomeEmail(props),
    },
    CONFIRMATION_RESERVE,
  );

  await db
    .update(newsletterSubscribers)
    .set({ welcomePending: result.success ? 0 : 1 })
    .where(eq(newsletterSubscribers.email, email));

  return result;
}

function articlePayload(post: Post, email: string): CreateEmailOptions {
  // USE FULL PUBLIC HTTPS URL (e.g. https://space.gimhara.com/articles/slug.png)
  // GUARANTEES GMAIL AND APPLE MAIL IMAGE PROXIES RENDER THE IMAGE DIRECTLY
  const coverImage = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${SITE_URL}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`
    : undefined;
  const props = {
    title: post.title,
    dek: post.dek,
    slug: post.slug,
    topic: post.topic,
    readingMinutes: post.readingMinutes,
    coverImage,
    siteUrl: SITE_URL,
    unsubscribeUrl: unsubscribeLink(email),
  };

  return {
    from: SENDER_EMAIL,
    to: email,
    subject: `New on Space: ${post.title}`,
    headers: getComplianceHeaders(email),
    text: getArticleNotificationText(props),
    react: ArticleNotificationEmail(props),
  };
}

// RESEND BATCH API ACCEPTS UP TO 100 EMAILS PER BATCH CALL
const BATCH_SIZE = 100;

type BroadcastResult =
  | { success: true; count: number; remaining: number }
  | { success: false; count: number; remaining?: number; error: string };

/**
 * BROADCASTS A NEW ARTICLE NOTIFICATION EMAIL TO ALL CONFIRMED SUBSCRIBERS
 *
 * With `recipients` it is a test send: mailed directly and not recorded.
 * Otherwise the broadcast is recorded and sent as far as today's budget goes;
 * the queue job finishes it on later days. Running it again for the same post
 * only continues it — nobody gets the same post twice.
 */
export async function broadcastArticleNotification(
  post: Post,
  recipients?: string[],
): Promise<BroadcastResult> {
  if (!emailEnabled) return { success: false, count: 0, error: "Email is not configured." };

  try {
    if (recipients && recipients.length > 0) {
      const { error } = await getResend().batch.send(
        recipients.map((email) => articlePayload(post, email)),
      );
      if (error) return { success: false, count: 0, error: error.message };
      await recordSent(recipients.length);
      return { success: true, count: recipients.length, remaining: 0 };
    }

    await db
      .insert(broadcasts)
      .values({ slug: post.slug, startedAt: sqliteNow() })
      .onConflictDoNothing({ target: broadcasts.slug });

    return await continueBroadcast(post);
  } catch (error) {
    await reportError("email: broadcast", error);
    return {
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/** Same text format as SQLite's CURRENT_TIMESTAMP, so the two compare directly. */
const sqliteNow = () => new Date().toISOString().replace("T", " ").slice(0, 19);

/**
 * Sends a recorded broadcast to everyone who has not had it yet, within
 * today's budget. Only subscribers who signed up before the broadcast started
 * are included: someone joining a week later should not get a week-old post.
 */
async function continueBroadcast(post: Post): Promise<BroadcastResult> {
  const [broadcast] = await db.select().from(broadcasts).where(eq(broadcasts.slug, post.slug));
  if (!broadcast || broadcast.completedAt) return { success: true, count: 0, remaining: 0 };

  const pending = await db
    .select({ email: newsletterSubscribers.email })
    .from(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.confirmed, 1),
        lte(newsletterSubscribers.createdAt, broadcast.startedAt),
        notInArray(
          newsletterSubscribers.email,
          db
            .select({ email: broadcastDeliveries.email })
            .from(broadcastDeliveries)
            .where(eq(broadcastDeliveries.slug, post.slug)),
        ),
      ),
    );

  const budget = Math.max(0, (await remainingQuota()) - CONFIRMATION_RESERVE);
  const toSend = pending.slice(0, budget);
  let sent = 0;

  for (let i = 0; i < toSend.length; i += BATCH_SIZE) {
    const batch = toSend.slice(i, i + BATCH_SIZE);
    const { error } = await getResend().batch.send(
      batch.map(({ email }) => articlePayload(post, email)),
    );

    if (error) {
      if (isQuotaError(error)) {
        console.warn(`[email: broadcast] Resend quota reached, ${post.slug} continues later`);
        await markExhausted(error);
      } else {
        await reportError("email: broadcast", error);
      }
      break;
    }

    const sentAt = Math.floor(Date.now() / 1000);
    await db
      .insert(broadcastDeliveries)
      .values(batch.map(({ email }) => ({ slug: post.slug, email, sentAt })))
      .onConflictDoNothing();
    await recordSent(batch.length);
    sent += batch.length;

    // RESPECT RATE LIMITS BETWEEN LARGE BATCHES
    if (i + BATCH_SIZE < toSend.length) await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const remaining = pending.length - sent;
  if (remaining === 0) {
    await db
      .update(broadcasts)
      .set({ completedAt: sqliteNow() })
      .where(eq(broadcasts.slug, post.slug));
  }
  return { success: true, count: sent, remaining };
}

/** A confirmation that failed this many times for non-quota reasons is dropped. */
const MAX_CONFIRM_ATTEMPTS = 5;
/** Unconfirmed signups older than this are deleted; the link only lasts 7 days. */
const PENDING_TTL_DAYS = 14;

/**
 * Posts dated before this went out before automatic sending existed (some by
 * hand), so they are never mailed automatically.
 */
export const AUTO_BROADCAST_FROM = "2026-11-07";
/** A post dated further back than this is treated as old, not new, and skipped. */
const AUTO_BROADCAST_WINDOW_DAYS = 14;

/** YYYY-MM-DD in the author's timezone, the same form as `publishedAt`. */
const colomboDate = (time: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo" }).format(new Date(time));

/**
 * Records a broadcast for every newly published post, so publishing is all
 * the author does: the queue sends it like any other unfinished broadcast.
 *
 * A post qualifies when it is dated on or after `AUTO_BROADCAST_FROM`, within
 * the last two weeks, and not in the future (a future date means scheduled).
 * A post that already has a broadcast row, sent by hand with `pnpm broadcast`
 * or started on an earlier run, is left alone, so nothing goes out twice.
 *
 * Returns the slugs started on this run.
 */
async function startNewBroadcasts(posts: Post[]): Promise<string[]> {
  const today = colomboDate(Date.now());
  const oldest = colomboDate(Date.now() - AUTO_BROADCAST_WINDOW_DAYS * 86_400_000);
  const due = posts.filter(
    ({ publishedAt }) =>
      publishedAt >= AUTO_BROADCAST_FROM && publishedAt >= oldest && publishedAt <= today,
  );
  if (due.length === 0) return [];

  const started = await db
    .insert(broadcasts)
    .values(due.map(({ slug }) => ({ slug, startedAt: sqliteNow() })))
    .onConflictDoNothing({ target: broadcasts.slug })
    .returning({ slug: broadcasts.slug });
  return started.map(({ slug }) => slug);
}

/**
 * The daily run: starts broadcasts for newly published posts, then sends
 * everything owed in priority order: confirmations, then broadcasts (new and
 * unfinished), then welcome emails. Each stage stops at the first quota
 * refusal; the next run carries on.
 */
export async function processEmailQueue(posts: Post[]) {
  const summary = {
    expired: 0,
    started: [] as string[],
    confirmations: 0,
    broadcast: 0,
    welcomes: 0,
  };
  const getPost = (slug: string) => posts.find((post) => post.slug === slug);

  const expired = await db
    .delete(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.confirmed, 0),
        lt(newsletterSubscribers.createdAt, sql`datetime('now', ${`-${PENDING_TTL_DAYS} days`})`),
      ),
    );
  summary.expired = expired.rowsAffected;

  if (!emailEnabled) return summary;

  summary.started = await startNewBroadcasts(posts);

  const owed = await db
    .select({ email: newsletterSubscribers.email })
    .from(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.confirmed, 0),
        isNull(newsletterSubscribers.confirmSentAt),
        lt(newsletterSubscribers.confirmAttempts, MAX_CONFIRM_ATTEMPTS),
      ),
    )
    .orderBy(asc(newsletterSubscribers.createdAt))
    .limit(BATCH_SIZE);
  for (const { email } of owed) {
    const result = await sendConfirmationEmail(email);
    if (result.success) summary.confirmations++;
    else if (result.quota) return summary;
  }

  const open = await db.select().from(broadcasts).where(isNull(broadcasts.completedAt));
  for (const { slug } of open) {
    const post = getPost(slug);
    if (!post) continue;
    const result = await continueBroadcast(post);
    summary.broadcast += result.count;
    if (result.remaining) return summary;
  }

  const welcomes = await db
    .select({ email: newsletterSubscribers.email })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.welcomePending, 1))
    .limit(BATCH_SIZE);
  for (const { email } of welcomes) {
    const result = await sendWelcomeEmail(email);
    if (result.success) summary.welcomes++;
    else if (result.quota) break;
  }

  return summary;
}

/**
 * SENDS A CONTACT FORM SUBMISSION TO THE SITE OWNER.
 *
 * `from` must stay on the Resend-verified domain, so the visitor's address goes
 * in replyTo instead: hitting reply in the inbox reaches them directly.
 */
export async function sendContactNotification(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!emailEnabled) {
    console.warn("Email is not configured — contact message saved but not emailed.");
    return { success: false, error: "Email is not configured." };
  }

  const to = process.env.CONTACT_TO_EMAIL;

  if (!to) {
    console.warn(
      "CONTACT_TO_EMAIL IS NOT SET — contact message saved to the database but no email was sent.",
    );
    return { success: false, skipped: true as const };
  }

  try {
    const { data, error } = await getResend().emails.send({
      from: process.env.CONTACT_FROM_EMAIL || SENDER_EMAIL,
      to,
      replyTo: input.email,
      subject: `[Space contact] ${input.subject}`,
      text: getContactNotificationText(input),
      react: ContactNotificationEmail(input),
    });

    if (error) {
      await reportError("email: contact notification", error);
      return { success: false, error };
    }

    await recordSent(1);
    return { success: true, id: data?.id };
  } catch (error) {
    await reportError("email: contact notification", error);
    return { success: false, error };
  }
}

/**
 * Tells the site owner a review is waiting, with signed one-click moderation
 * links. Each link opens a confirmation page (GET never changes anything, so
 * mail scanners can't approve by visiting it) and the button there applies it.
 * Best effort: the review is already stored, and `pnpm reviews` moderates
 * without email.
 */
export async function sendReviewModerationEmail(review: {
  id: string;
  displayName: string;
  rating: number;
  body: string;
  email: string | null;
}) {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!emailEnabled || !to) return { success: false as const };

  const { moderationLink } = await import("@/lib/reviews");
  const link = (action: "approve" | "feature" | "reject" | "hide") =>
    moderationLink(SITE_URL, review.id, action);
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  const result = await sendCounted("email: review moderation", {
    from: SENDER_EMAIL,
    to,
    subject: `[Space review] ${stars} from ${review.displayName}`.slice(0, 120),
    text: `A new reader review is waiting for approval. Nothing is published until you approve it.

${stars} (${review.rating}/5) from ${review.displayName}${review.email ? ` <${review.email}>` : ""}

${review.body}

Approve:            ${link("approve")}
Approve and feature: ${link("feature")}
Reject:             ${link("reject")}
Hide (if approved): ${link("hide")}

Links work for 30 days. Later changes: pnpm reviews (id ${review.id.slice(0, 8)}).`,
  });
  return result;
}
