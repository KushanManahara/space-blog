// src/lib/resend.ts

import { Resend } from "resend";

// VERIFY RESEND API KEY PRESENCE
if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY IS NOT DEFINED IN ENVIRONMENT VARIABLES");
}

// INITIALIZE THE RESEND CLIENT INSTANCE
export const resend = new Resend(process.env.RESEND_API_KEY);

// DEFAULT VERIFIED SENDER EMAIL ADDRESS ON GIMHARA.COM
export const SENDER_EMAIL =
  process.env.NEWSLETTER_FROM_EMAIL || "Space <newsletter.space@gimhara.com>";
