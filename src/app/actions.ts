// src/app/actions.ts
"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { callerFingerprint, firstTimeInWindow, isHoneypotTripped, underLimit } from "@/lib/abuse";
import { contactMessages, comments, db, newsletterSubscribers, postStats } from "@/lib/db";
import type { FormState } from "@/lib/form-state";
import { getPostBySlug } from "@/lib/content";
import {
  broadcastArticleNotification,
  sendContactNotification,
  sendWelcomeEmail,
  syncResendContact,
} from "@/lib/newsletter";
import { getResend } from "@/lib/resend";

const subscribeSchema = z.object({
  email: z.string().email("Enter an email address we can actually reach."),
});

const contactSchema = z.object({
  name: z.string().min(1, "Tell me who you are."),
  email: z.string().email("Enter an email address we can actually reach."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(10, "A little more detail helps: ten characters at least."),
});

const commentSchema = z.object({
  postSlug: z.string().min(1),
  name: z.string().min(1, "Name is required."),
  role: z.string().min(1, "Role / headline is required (e.g. Software Engineer)."),
  email: z.string().email("A valid email address is required."),
  body: z.string().min(2, "Comment must be at least 2 characters."),
  /** Set when answering an existing comment. */
  parentId: z.string().min(1).optional(),
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

/**
 * NEWSLETTER UNSUBSCRIBE SERVER ACTION
 * REMOVES SUBSCRIBER FROM TURSO DATABASE AND SYNCS UNSUBSCRIBED STATUS TO RESEND
 */
export async function unsubscribeAction(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = subscribeSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const email = parsed.data.email.trim().toLowerCase();

  try {
    // 1. REMOVE FROM LOCAL TURSO DATABASE
    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));

    // 2. UPDATE RESEND CONTACT STATUS
    await getResend().contacts.update({
      email,
      unsubscribed: true,
    });

    return {
      status: "success",
      message: `You have been successfully unsubscribed (${email}). You will not receive future emails.`,
    };
  } catch (error) {
    console.error("NEWSLETTER UNSUBSCRIBE ERROR:", error);
    // If contact update fails (e.g. contact did not exist in Resend), confirmation is still returned
    return {
      status: "success",
      message: `You have been successfully unsubscribed (${email}).`,
    };
  }
}

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
 */
export async function likePostAction(slug: string, increment: boolean = true) {
  // The client also tracks this in localStorage, but that is a UI convenience,
  // not a guard — clearing it must not let the counter be driven up.
  const caller = await callerFingerprint();
  if (!(await underLimit(`like:${slug}`, caller, 4, 86_400))) {
    return { success: false };
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

    revalidatePath(`/articles/${slug}`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Like post error:", error);
    return { success: false };
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
 * SERVER ACTION TO BROADCAST AN ARTICLE NOTIFICATION EMAIL TO ALL ACTIVE SUBSCRIBERS
 */
export async function broadcastArticleAction(
  postSlug: string,
): Promise<{ success: boolean; count?: number; error?: string }> {
  const post = getPostBySlug(postSlug);
  if (!post) {
    return { success: false, error: `ARTICLE WITH SLUG "${postSlug}" NOT FOUND` };
  }

  return await broadcastArticleNotification(post);
}
