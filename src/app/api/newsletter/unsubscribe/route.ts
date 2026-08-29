// src/app/api/newsletter/unsubscribe/route.ts

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, newsletterSubscribers } from "@/lib/db";
import { verifyUnsubscribe } from "@/lib/newsletter-token";
import { emailEnabled, getResend } from "@/lib/resend";

/**
 * Unsubscribe, RFC 8058 style.
 *
 * `GET` never mutates — it renders a confirmation the reader has to submit.
 * That matters more than it sounds: mail scanners and link previewers fetch
 * every URL in an email, and when this route removed the row on GET they were
 * quietly unsubscribing real people.
 *
 * `POST` performs it, which is what mail clients send for one-click
 * unsubscribe. Both require a token tied to the address, so a URL cannot be
 * edited to act on somebody else.
 */

/** Everything interpolated into the responses below goes through this. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function page(title: string, heading: string, body: string, action?: string): NextResponse {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(title)} · Space</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0B0F19;
      color: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: #151C2C;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 40px;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
    }
    h1 { font-size: 24px; font-weight: 700; margin: 0 0 12px; color: #FFFFFF; }
    p { font-size: 15px; color: #94A3B8; line-height: 1.6; margin: 0 0 24px; }
    .btn {
      display: inline-block;
      background: #007AFF;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 28px;
      border-radius: 9999px;
      border: 0;
      cursor: pointer;
      font-family: inherit;
    }
    .btn:hover { background: #0062CC; }
    .quiet {
      display: inline-block;
      margin-top: 16px;
      color: #94A3B8;
      font-size: 13.5px;
      text-decoration: none;
    }
    .quiet:hover { color: #F8FAFC; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(heading)}</h1>
    <p>${body}</p>
    ${action ?? '<a class="btn" href="/">Return to Space</a>'}
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function invalidLink(): NextResponse {
  return new NextResponse(
    page(
      "Link expired",
      "That unsubscribe link is not valid",
      "The link may have been truncated by your mail client, or it may be from an older " +
        "message. Reply to any Space email and it will be handled by hand.",
    ).body,
    { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

/** Removes the subscriber. Safe to run twice. */
async function unsubscribe(email: string): Promise<void> {
  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));

  // Removing our own row is what actually stops the mail, so a missing Resend
  // key must not fail the unsubscribe.
  if (emailEnabled) {
    await getResend().contacts.update({ email, unsubscribed: true });
  }
}

/** Shows what will happen. Never mutates — scanners land here. */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("email");
  const token = request.nextUrl.searchParams.get("t");
  if (!raw) return invalidLink();

  const email = raw.trim().toLowerCase();
  if (!verifyUnsubscribe(email, token)) return invalidLink();

  const safeEmail = escapeHtml(email);
  const safeToken = escapeHtml(token ?? "");

  return page(
    "Unsubscribe",
    "Unsubscribe from Space?",
    `<strong>${safeEmail}</strong> will stop receiving post notifications. You can resubscribe at any time.`,
    `<form method="post" action="/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&t=${encodeURIComponent(safeToken)}">
       <button class="btn" type="submit">Confirm unsubscribe</button>
     </form>
     <a class="quiet" href="/">No, keep me subscribed</a>`,
  );
}

/** Performs it. Mail clients POST here directly for one-click unsubscribe. */
export async function POST(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("email");
  const token = request.nextUrl.searchParams.get("t");
  if (!raw) return invalidLink();

  const email = raw.trim().toLowerCase();
  if (!verifyUnsubscribe(email, token)) return invalidLink();

  try {
    await unsubscribe(email);
    return page(
      "Unsubscribed",
      "You have been unsubscribed",
      `<strong>${escapeHtml(email)}</strong> has been removed from Space newsletter updates. ` +
        "You will no longer receive post notifications.",
    );
  } catch (error) {
    console.error("UNSUBSCRIBE ROUTE ERROR:", error);
    return new NextResponse("Failed to process the unsubscribe request.", { status: 500 });
  }
}
