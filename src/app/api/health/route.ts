import {
  comments,
  contactMessages,
  db,
  newsletterSubscribers,
  postStats,
  rateLimits,
} from "@/lib/db";
import { reportError } from "@/lib/monitoring";
import { emailEnabled } from "@/lib/resend";

export const dynamic = "force-dynamic";

/**
 * Checked by the uptime workflow. Selecting every column of every table, not
 * just `SELECT 1`, is the point: a column the code expects but the database
 * lacks fails here, instead of waiting for a reader to hit that feature.
 * Answers with booleans only, so it exposes no data.
 */
export async function GET(): Promise<Response> {
  const headers = { "cache-control": "no-store" };

  try {
    await Promise.all(
      [postStats, comments, newsletterSubscribers, contactMessages, rateLimits].map((table) =>
        db.select().from(table).limit(1),
      ),
    );
    return Response.json({ ok: true, database: true, email: emailEnabled }, { headers });
  } catch (error) {
    await reportError("health check", error);
    return Response.json({ ok: false, database: false }, { status: 503, headers });
  }
}
