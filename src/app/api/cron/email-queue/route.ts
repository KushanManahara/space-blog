import { timingSafeEqual } from "crypto";

import { getPostBySlug } from "@/lib/content";
import { reportError } from "@/lib/monitoring";
import { processEmailQueue } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

/**
 * Daily catch-up for email held back by Resend's quota (see vercel.json).
 *
 * Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`. Without
 * the secret set, it refuses everything: sending mail is not something a
 * stranger should be able to trigger.
 */
export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const wanted = Buffer.from(`Bearer ${secret ?? ""}`);
  if (!secret || given.length !== wanted.length || !timingSafeEqual(given, wanted)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const summary = await processEmailQueue(getPostBySlug);
    console.log("[email queue]", summary);
    return Response.json(summary, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    await reportError("email queue", error);
    return new Response("Email queue failed", { status: 500 });
  }
}
