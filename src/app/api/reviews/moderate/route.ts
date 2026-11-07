import { NextRequest, NextResponse } from "next/server";

import { reportError } from "@/lib/monitoring";
import { escapeHtml, page } from "@/lib/newsletter-page";
import {
  getReview,
  isModerationAction,
  moderateReview,
  refreshReviewPages,
  verifyModerationLink,
  type ModerationAction,
} from "@/lib/reviews";

/**
 * Moderation from the signed links in the owner's notification email.
 *
 * No login: the HMAC in the link is the credential, bound to one review, one
 * action and an issue time (valid 30 days). `GET` only shows the review and a
 * confirm button, because mail scanners fetch every link in an email; `POST`
 * applies the decision. Responses are `noindex` and never cached.
 */

const labels: Record<ModerationAction, string> = {
  approve: "Approve and publish",
  feature: "Approve and feature",
  hide: "Hide from the site",
  reject: "Reject",
};

function readLink(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id") ?? "";
  const action = params.get("a");
  const issuedAt = Number(params.get("at"));
  const token = params.get("t");
  if (!id || id.length > 64 || !isModerationAction(action)) return null;
  if (!verifyModerationLink(id, action, issuedAt, token)) return null;
  return { id, action, issuedAt, token: token ?? "" };
}

function invalid(): NextResponse {
  return withHeaders(
    new NextResponse(
      page(
        "Link not valid",
        "That moderation link isn't valid",
        "It may have expired (links last 30 days) or been cut short by your mail client. Use <code>pnpm reviews</code> instead.",
      ).body,
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    ),
  );
}

function withHeaders(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}

/** Shows the review and what will happen. Never mutates. */
export async function GET(request: NextRequest) {
  const link = readLink(request);
  if (!link) return invalid();

  const review = await getReview(link.id);
  if (!review) return invalid();

  const action = `/api/reviews/moderate?id=${encodeURIComponent(link.id)}&a=${link.action}&at=${link.issuedAt}&t=${encodeURIComponent(link.token)}`;
  return withHeaders(
    page(
      "Moderate review",
      labels[link.action],
      `<strong>${escapeHtml(review.displayName)}</strong> · ${review.rating}/5 · currently <strong>${escapeHtml(review.status)}</strong>${review.featured ? " (featured)" : ""}<br><br>${escapeHtml(review.body).replace(/\n/g, "<br>")}`,
      `<form method="post" action="${escapeHtml(action)}">
         <button class="btn" type="submit">${escapeHtml(labels[link.action])}</button>
       </form>`,
    ),
  );
}

/** Applies the decision. Safe to repeat: the same action sets the same state. */
export async function POST(request: NextRequest) {
  const link = readLink(request);
  if (!link) return invalid();

  try {
    if (!(await moderateReview(link.id, link.action))) return invalid();
    refreshReviewPages();
    const done: Record<ModerationAction, string> = {
      approve: "The review is approved and will appear on the site shortly.",
      feature: "The review is approved and featured at the top of the list.",
      hide: "The review is hidden. It can be approved again later.",
      reject: "The review is rejected and won't be published.",
    };
    return withHeaders(page("Done", "Done", done[link.action]));
  } catch (error) {
    await reportError("review moderation", error);
    return withHeaders(new NextResponse("Failed to update the review.", { status: 500 }));
  }
}
