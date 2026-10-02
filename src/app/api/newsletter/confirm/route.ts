// src/app/api/newsletter/confirm/route.ts

import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { db, newsletterSubscribers } from "@/lib/db";
import { syncResendContact, sendWelcomeEmail } from "@/lib/newsletter";
import { escapeHtml, page } from "@/lib/newsletter-page";
import { verifyConfirm } from "@/lib/newsletter-token";

/**
 * Double opt-in confirmation.
 *
 * Same shape as unsubscribe, for the same reason: `GET` never mutates, because
 * mail scanners and link previewers fetch every URL in an email and would
 * otherwise confirm addresses on their owners' behalf — which is exactly what
 * double opt-in exists to prevent. `GET` shows a button; `POST` confirms.
 */

function readLink(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const email = params.get("email")?.trim().toLowerCase() ?? "";
  const issuedAt = Number(params.get("at"));
  const token = params.get("t");
  return { email, issuedAt, token, valid: Boolean(email) && verifyConfirm(email, issuedAt, token) };
}

function invalidLink(): NextResponse {
  return new NextResponse(
    page(
      "Link expired",
      "That confirmation link is not valid",
      "It may have expired (links last 7 days) or been cut short by your mail client. " +
        "Subscribe again from the site and a fresh link will be sent.",
    ).body,
    { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

/** Shows what will happen. Never mutates — scanners land here. */
export function GET(request: NextRequest) {
  const { email, issuedAt, token, valid } = readLink(request);
  if (!valid) return invalidLink();

  const action = `/api/newsletter/confirm?email=${encodeURIComponent(email)}&at=${issuedAt}&t=${encodeURIComponent(token ?? "")}`;
  return page(
    "Confirm subscription",
    "Confirm your subscription",
    `<strong>${escapeHtml(email)}</strong> will get one email whenever a new Space post goes out.`,
    `<form method="post" action="${escapeHtml(action)}">
       <button class="btn" type="submit">Confirm subscription</button>
     </form>
     <a class="quiet" href="/">Not you? Close this page</a>`,
  );
}

/** Performs it. Safe to run twice: only the first confirmation sends the welcome. */
export async function POST(request: NextRequest) {
  const { email, valid } = readLink(request);
  if (!valid) return invalidLink();

  try {
    const updated = await db
      .update(newsletterSubscribers)
      .set({ confirmed: 1 })
      .where(and(eq(newsletterSubscribers.email, email), eq(newsletterSubscribers.confirmed, 0)))
      .returning({ email: newsletterSubscribers.email });

    // Only a row that was waiting gets the contact sync and the welcome. A
    // repeat click — or a link for an address that has since unsubscribed —
    // changes nothing and sends nothing.
    if (updated.length > 0) {
      await syncResendContact(email);
      await sendWelcomeEmail(email);
    } else {
      const [existing] = await db
        .select({ confirmed: newsletterSubscribers.confirmed })
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, email))
        .limit(1);
      // Unsubscribed since the link was sent: say so rather than claim success.
      if (!existing) return invalidLink();
    }

    return page(
      "Subscribed",
      "You're subscribed",
      `<strong>${escapeHtml(email)}</strong> will get an email whenever a new Space post goes out. ` +
        "Every one carries a one-click unsubscribe link.",
    );
  } catch (error) {
    console.error("NEWSLETTER CONFIRM ROUTE ERROR:", error);
    return new NextResponse("Failed to confirm the subscription.", { status: 500 });
  }
}
