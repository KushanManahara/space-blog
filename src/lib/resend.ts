// src/lib/resend.ts

import { Resend } from "resend";

/**
 * Whether outbound email is configured at all.
 *
 * Callers check this before sending so a missing key degrades to "no email was
 * sent" rather than an exception.
 *
 * `NEWSLETTER_SECRET` counts as configuration too: without it, unsubscribe
 * links cannot be signed, and the route rejects unsigned ones. Sending mail
 * whose unsubscribe link is guaranteed to fail is worse than not sending.
 */
export const emailEnabled = Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_SECRET);

/*
 * Announce the misconfiguration once, in development only.
 *
 * This ran at module scope on every cold start, so in production it added a
 * warning line to the logs of every serverless instance that happened to import
 * the module — noise that says nothing a deploy-time check would not.
 */
if (!emailEnabled && process.env.NODE_ENV !== "production") {
  const missing = [
    process.env.RESEND_API_KEY ? null : "RESEND_API_KEY",
    process.env.NEWSLETTER_SECRET ? null : "NEWSLETTER_SECRET",
  ].filter(Boolean);
  console.warn(`Outbound email is disabled — not set: ${missing.join(", ")}.`);
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
