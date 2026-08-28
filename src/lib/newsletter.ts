// src/lib/newsletter.ts

import fs from "fs";
import path from "path";
import { emailEnabled, getResend, SENDER_EMAIL } from "@/lib/resend";
import { db, newsletterSubscribers } from "@/lib/db";
import { WelcomeEmail, getWelcomeEmailText } from "@/emails/welcome";
import {
  ArticleNotificationEmail,
  getArticleNotificationText,
} from "@/emails/article-notification";
import {
  ContactNotificationEmail,
  getContactNotificationText,
} from "@/emails/contact-notification";
import type { Post } from "@/lib/content";

// BASE PRODUCTION DOMAIN FOR LINK GENERATION
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://space.gimhara.com";

/**
 * GENERATES COMPLIANCE HEADERS FOR DELIVERABILITY AND ONE-CLICK UNSUBSCRIBE (RFC 8058)
 */
function getComplianceHeaders(email: string) {
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
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

/**
 * SENDS TRANSACTIONAL WELCOME EMAIL VIA RESEND WITH MULTIPART PLAIN-TEXT FALLBACK
 */
export async function sendWelcomeEmail(email: string) {
  if (!emailEnabled) return { success: false, error: "Email is not configured." };

  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;

  try {
    const { data, error } = await getResend().emails.send({
      from: SENDER_EMAIL,
      to: email,
      subject: "Welcome to Space",
      headers: getComplianceHeaders(email),
      text: getWelcomeEmailText({
        subscriberEmail: email,
        siteUrl: SITE_URL,
        unsubscribeUrl,
      }),
      react: WelcomeEmail({
        subscriberEmail: email,
        siteUrl: SITE_URL,
        unsubscribeUrl,
      }),
    });

    if (error) {
      console.error("RESEND WELCOME EMAIL ERROR:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("RESEND WELCOME EMAIL EXCEPTION:", error);
    return { success: false, error };
  }
}

/**
 * BROADCASTS A NEW ARTICLE NOTIFICATION EMAIL TO ALL ACTIVE SUBSCRIBERS
 * IMPLEMENTS INLINE CID IMAGE EMBEDDING (SO IMAGES DISPLAY EVEN BEFORE SITE DEPLOYMENT),
 * MULTIPART PLAIN TEXT, COMPLIANCE HEADERS, AND RESEND BATCHING
 */
export async function broadcastArticleNotification(post: Post) {
  if (!emailEnabled) return { success: false, error: "Email is not configured." };

  try {
    // FETCH ALL ACTIVE REGISTERED SUBSCRIBERS FROM DATABASE
    const subscribers = await db
      .select({ email: newsletterSubscribers.email })
      .from(newsletterSubscribers);

    if (!subscribers.length) {
      return { success: true, count: 0, message: "NO SUBSCRIBERS FOUND IN DATABASE" };
    }

    // RESOLVE IMAGE ATTACHMENT FOR INLINE CID EMBEDDING
    // THIS GUARANTEES THE IMAGE SHOWS IN GMAIL/OUTLOOK REGARDLESS OF DEPLOYMENT STATUS
    let emailCoverImage = post.coverImage;
    let attachments:
      Array<{ filename: string; content: Buffer; cid: string; contentType?: string }> | undefined =
      undefined;

    if (post.coverImage && !post.coverImage.startsWith("http")) {
      const cleanPath = post.coverImage.startsWith("/")
        ? post.coverImage.slice(1)
        : post.coverImage;
      const diskPath = path.join(process.cwd(), "public", cleanPath);

      if (fs.existsSync(diskPath)) {
        const buffer = fs.readFileSync(diskPath);
        const filename = path.basename(diskPath);
        emailCoverImage = "cid:post-cover";
        attachments = [
          {
            filename,
            content: buffer,
            cid: "post-cover",
            contentType: filename.endsWith(".png") ? "image/png" : "image/jpeg",
          },
        ];
      } else {
        emailCoverImage = `${SITE_URL}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`;
      }
    }

    const emailPayloads = subscribers.map((sub) => {
      const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(sub.email)}`;

      return {
        from: SENDER_EMAIL,
        to: sub.email,
        subject: `New on Space: ${post.title}`,
        headers: getComplianceHeaders(sub.email),
        attachments,
        text: getArticleNotificationText({
          title: post.title,
          dek: post.dek,
          slug: post.slug,
          topic: post.topic,
          readingMinutes: post.readingMinutes,
          coverImage: emailCoverImage,
          siteUrl: SITE_URL,
          unsubscribeUrl,
        }),
        react: ArticleNotificationEmail({
          title: post.title,
          dek: post.dek,
          slug: post.slug,
          topic: post.topic,
          readingMinutes: post.readingMinutes,
          coverImage: emailCoverImage,
          siteUrl: SITE_URL,
          unsubscribeUrl,
        }),
      };
    });

    // RESEND BATCH API ACCEPTS UP TO 100 EMAILS PER BATCH CALL
    const BATCH_SIZE = 100;
    let dispatched = 0;

    for (let i = 0; i < emailPayloads.length; i += BATCH_SIZE) {
      const batch = emailPayloads.slice(i, i + BATCH_SIZE);
      const { data, error } = await getResend().batch.send(batch);

      if (error) {
        console.error(`RESEND BATCH CHUNK ERROR (OFFSET ${i}):`, error);
      } else {
        dispatched += data?.data ? data.data.length : batch.length;
      }

      // RESPECT RATE LIMITS BETWEEN LARGE BATCHES
      if (i + BATCH_SIZE < emailPayloads.length) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    return { success: true, count: dispatched };
  } catch (error) {
    console.error("ARTICLE BROADCAST EXCEPTION:", error);
    return {
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
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
      console.error("RESEND CONTACT NOTIFICATION ERROR:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("RESEND CONTACT NOTIFICATION EXCEPTION:", error);
    return { success: false, error };
  }
}
