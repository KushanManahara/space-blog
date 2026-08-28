// src/lib/resend.ts

import { Resend } from "resend";

/**
 * Whether outbound email is configured at all.
 *
 * Callers check this before sending so a missing key degrades to "no email was
 * sent" rather than an exception.
 */
export const emailEnabled = Boolean(process.env.RESEND_API_KEY);

if (!emailEnabled) {
  console.warn("RESEND_API_KEY is not set — outbound email is disabled.");
}

/**
 * The Resend client, created lazily.
 *
 * `new Resend(undefined)` throws on construction, and this module is reachable
 * from a route's module scope, so building without a key used to fail the whole
 * build rather than just disabling email. Deferring construction keeps the app
 * buildable and runnable without mail configured — which is the normal state
 * locally — while still throwing at the point of an actual send.
 */
let client: Resend | null = null;

export function getResend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

// DEFAULT VERIFIED SENDER EMAIL ADDRESS ON GIMHARA.COM
export const SENDER_EMAIL =
  process.env.NEWSLETTER_FROM_EMAIL || "Space <newsletter.space@gimhara.com>";
