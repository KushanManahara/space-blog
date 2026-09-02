// src/app/actions.ts
"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { callerFingerprint, firstTimeInWindow, isHoneypotTripped, underLimit } from "@/lib/abuse";
import { contactMessages, comments, db, newsletterSubscribers, postStats } from "@/lib/db";
import { POST_STATS_TAG } from "@/lib/db/queries";
import type { FormState } from "@/lib/form-state";
import { getPostBySlug } from "@/lib/content";
import {
  broadcastArticleNotification,
  sendContactNotification,
  sendWelcomeEmail,
  syncResendContact,
} from "@/lib/newsletter";

/**
 * Every public write path is unauthenticated, so each field carries a ceiling
 * as well as a floor. Without one a single request can write a multi-megabyte
 * row, and the rate limiter deliberately fails open during a database outage
 * (see `underLimit`) — so the schema is the only thing bounding what lands.
 * 254 is the RFC 5321 maximum length of an email address.
 */
const EMAIL_MAX = 254;

const subscribeSchema = z.object({
  email: z.string().email("Enter an email address we can actually reach.").max(EMAIL_MAX),
});

const contactSchema = z.object({
  name: z.string().min(1, "Tell me who you are.").max(80, "That name is too long."),
  email: z.string().email("Enter an email address we can actually reach.").max(EMAIL_MAX),
  subject: z.string().min(1, "Subject is required.").max(200, "That subject is too long."),
  message: z
    .string()
    .min(10, "A little more detail helps: ten characters at least.")
    .max(5000, "That message is too long. Five thousand characters at most."),
});

const commentSchema = z.object({
  // Checked against the archive, not just non-empty: an unknown slug can never
  // render, so accepting one only fills the table with comments nobody sees.
  postSlug: z
    .string()
    .min(1)
    .refine((slug) => Boolean(getPostBySlug(slug)), "That article does not exist."),
  name: z.string().min(1, "Name is required.").max(80, "That name is too long."),
  role: z
    .string()
    .min(1, "Role / headline is required (e.g. Software Engineer).")
    .max(120, "That role is too long."),
  email: z.string().email("A valid email address is required.").max(EMAIL_MAX),
  body: z
    .string()
    .min(2, "Comment must be at least 2 characters.")
    .max(4000, "Responses are capped at 4000 characters."),
  /** Set when answering an existing comment. */
  parentId: z.string().min(1).max(64).optional(),
});

/**
 * NEWSLETTER SUBSCRIPTION SERVER ACTION
 * PERSISTS SUBSCRIBER IN DATABASE, SYNCS RESEND CONTACT, AND SENDS WELCOME EMAIL
 */
export async function subscribeAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  // VALIDATE SUBSCRIBER EMAIL ADDRESS
  if (isHoneypotTripped(formData)) {
    // Silently accept so a bot cannot tell it was caught.
    return { status: "success", message: "You're on the list." };
  }

  const parsed = subscribeSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const email = parsed.data.email.trim().toLowerCase();

  if (!(await underLimit("subscribe", await callerFingerprint(), 5, 3600))) {
    return {
      status: "error",
      message: "That is a lot of signups from one place. Try again in an hour.",
    };
  }

  try {
    // 1. SAVE SUBSCRIBER TO DATABASE
    await db
      .insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing({ target: newsletterSubscribers.email });

    // 2. SYNC SUBSCRIBER TO RESEND CONTACTS (UNIFIED API)
    await syncResendContact(email);

    // 3. DISPATCH BRANDED WELCOME EMAIL VIA RESEND
    await sendWelcomeEmail(email);

    return {
      status: "success",
      message: `You're on the list. Confirmation sent to ${email}.`,
    };
  } catch (error) {
    console.error("NEWSLETTER SUBSCRIPTION ACTION ERROR:", error);
    return {
      status: "error",
      message: "Unable to save subscription right now. Please try again.",
    };
  }
}

/*
 * There is deliberately no unsubscribe action here.
 *
 * One used to exist and took a bare address, so anyone could unsubscribe
 * anyone by typing their email — the precise hole `newsletter-token.ts` was
 * written to close, reopened by a second door. Removal now happens only in
 * `app/api/newsletter/unsubscribe/route.ts`, which verifies an HMAC tied to
 * the address and mutates only on POST. `/unsubscribe` renders the
 * confirmation for a signed link and posts to that route.
 */

/**
 * Contact form. Saves the inquiry to Turso, then emails it to the site owner.
 * A delivery failure must not lose the message, so the send is best-effort and
 * the database write is what decides success.
 */
export async function contactAction(_previous: FormState, formData: FormData): Promise<FormState> {
  if (isHoneypotTripped(formData)) {
    return { status: "success", message: "Message received." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  if (!(await underLimit("contact", await callerFingerprint(), 3, 3600))) {
    return {
      status: "error",
      message: "You have sent a few messages already. Try again in an hour.",
    };
  }

  try {
    await db.insert(contactMessages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    await sendContactNotification(parsed.data);

    return {
      status: "success",
      message: "Message received. Corrections and reproductions get answered first.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "error",
      message: "Unable to send message right now. Please try again.",
    };
  }
}

/**
 * Toggle or increment like count for a post in Turso.
 *
 * Returns the stored count so the client can show the real number immediately.
 * It cannot wait for the page to re-render: article pages are statically
 * generated with a 60s revalidate, so `post.likes` keeps its build-time value
 * long after the write lands, and a purely optimistic count snaps back to the
 * old one the moment the transition settles.
 */
export async function likePostAction(slug: string, increment: boolean = true) {
  // The client also tracks this in localStorage, but that is a UI convenience,
  // not a guard — clearing it must not let the counter be driven up.
  //
  // Only likes are limited. An unlike can only lower the number, so it is not
  // an inflation vector, and counting it meant a reader who changed their mind
  // twice burned the whole daily budget and then silently could not like the
  // article at all. The ceiling is per article per caller per day.
  if (increment) {
    const caller = await callerFingerprint();
    if (!(await underLimit(`like:${slug}`, caller, 50, 86_400))) {
      return { success: false as const, likes: null, limited: true as const };
    }
  }

  try {
    const diff = increment ? 1 : -1;
    await db
      .insert(postStats)
      .values({
        slug,
        likes: Math.max(0, diff),
        views: 0,
      })
      .onConflictDoUpdate({
        target: postStats.slug,
        set: {
          likes: sql`MAX(0, ${postStats.likes} + ${diff})`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      });

    const [row] = await db
      .select({ likes: postStats.likes })
      .from(postStats)
      .where(eq(postStats.slug, slug))
      .limit(1);

    // The listing surfaces read a cached snapshot of the whole archive, so
    // the path revalidations alone would leave the old count on the cards.
    // "max" marks it stale rather than expiring it, so the next reader is
    // served instantly and the refresh happens behind them — the liker already
    // has their own number from the row returned below.
    revalidateTag(POST_STATS_TAG, "max");
    revalidatePath(`/articles/${slug}`);
    revalidatePath("/");
    return { success: true as const, likes: row?.likes ?? null, limited: false as const };
  } catch (error) {
    console.error("Like post error:", error);
    return { success: false as const, likes: null, limited: false as const };
  }
}

/**
 * Increment view count for a post in Turso.
 */
export async function recordViewAction(slug: string) {
  // Session storage de-duplicates in the browser; this makes the count mean
  // something even when that is bypassed.
  if (!(await firstTimeInWindow(`view:${slug}`, await callerFingerprint(), 86_400))) {
    return { success: true };
  }

  try {
    await db
      .insert(postStats)
      .values({
        slug,
        likes: 0,
        views: 1,
      })
      .onConflictDoUpdate({
        target: postStats.slug,
        set: {
          views: sql`${postStats.views} + 1`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      });

    return { success: true };
  } catch (error) {
    console.error("Record view error:", error);
    return { success: false };
  }
}

/**
 * Post a new comment to Turso.
 */
export async function addCommentAction(data: {
  postSlug: string;
  name: string;
  role: string;
  email: string;
  body: string;
  parentId?: string;
  /** Honeypot; always empty for a real reader. */
  website?: string;
}) {
  const parsed = commentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  if (data.website && data.website.trim().length > 0) {
    // Honeypot. Report success so a bot has nothing to tune against.
    return { success: true, id: "held" };
  }

  if (!(await underLimit("comment", await callerFingerprint(), 3, 3600))) {
    return { success: false, error: "Too many responses from here. Try again in an hour." };
  }

  const id = crypto.randomUUID();
  const initials =
    parsed.data.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AN";

  try {
    await db.insert(comments).values({
      id,
      postSlug: parsed.data.postSlug,
      authorName: parsed.data.name,
      authorRole: parsed.data.role,
      authorEmail: parsed.data.email,
      authorInitials: initials,
      body: parsed.data.body,
      parentId: parsed.data.parentId,
      // Held for review. Publishing is a deliberate act, not a side effect of
      // an anonymous form submission.
      published: 0,
    });

    try {
      revalidatePath(`/articles/${parsed.data.postSlug}`);
    } catch {
      // Ignored outside Next.js request context
    }
    return { success: true, id, held: true };
  } catch (error) {
    console.error("Add comment error:", error);
    return { success: false, error: "Failed to post comment." };
  }
}

/**
 * Broadcasts a new-article notification to every subscriber.
 *
 * This is the single most dangerous thing in the codebase: one call mails the
 * entire list, and a server action is a public HTTP endpoint the moment
 * anything in the route tree imports it. It is only reachable from Studio,
 * which is currently parked in `src/app/_studio/` and therefore unrouted — but
 * "unrouted" is a folder rename away from "public", so the shared secret is
 * checked here rather than left to the middleware that would have to be
 * re-enabled alongside it.
 *
 * Set STUDIO_SECRET in the environment to enable broadcasting at all. With it
 * unset the action refuses everything, which is the right default for a site
 * whose editor is out of service.
 */
export async function broadcastArticleAction(
  postSlug: string,
  secret: string,
): Promise<{ success: boolean; count?: number; error?: string }> {
  const expected = process.env.STUDIO_SECRET;
  if (!expected || secret !== expected) {
    // Deliberately does not say which of the two it was.
    return { success: false, error: "Not authorised to broadcast." };
  }

  const post = getPostBySlug(postSlug);
  if (!post) {
    return { success: false, error: `ARTICLE WITH SLUG "${postSlug}" NOT FOUND` };
  }

  return await broadcastArticleNotification(post);
}
