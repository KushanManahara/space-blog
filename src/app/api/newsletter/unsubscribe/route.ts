// src/app/api/newsletter/unsubscribe/route.ts

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, newsletterSubscribers } from "@/lib/db";
import { resend } from "@/lib/resend";

/**
 * HANDLES ONE-CLICK UNSUBSCRIBE (RFC 8058) AND DIRECT BROWSER CLICKS
 */
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return new NextResponse("MISSING EMAIL PARAMETER", { status: 400 });
  }

  try {
    // REMOVE SUBSCRIBER FROM LOCAL DATABASE
    await db
      .delete(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email.toLowerCase()));

    // UPDATE RESEND CONTACT STATUS
    await resend.contacts.update({
      email: email.toLowerCase(),
      unsubscribed: true,
    });

    // RETURN CLEAN HTML CONFIRMATION RESPONSE
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribed · Space</title>
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
    a {
      display: inline-block;
      background: #007AFF;
      color: #FFFFFF;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      padding: 12px 28px;
      border-radius: 9999px;
      transition: background 0.2s;
    }
    a:hover { background: #0062CC; }
  </style>
</head>
<body>
  <div class="card">
    <h1>You have been unsubscribed</h1>
    <p><strong>${email}</strong> has been removed from Space newsletter updates. You will no longer receive post notifications.</p>
    <a href="/">Return to Space</a>
  </div>
</body>
</html>`,
      {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  } catch (error) {
    console.error("UNSUBSCRIBE ROUTE ERROR:", error);
    return new NextResponse("FAILED TO PROCESS UNSUBSCRIBE REQUEST", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
