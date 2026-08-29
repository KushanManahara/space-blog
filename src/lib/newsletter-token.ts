import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed unsubscribe links.
 *
 * The unsubscribe endpoint used to take a bare address and act on it, which
 * meant anyone could unsubscribe anyone by editing a URL. The likelier failure
 * was duller: corporate mail scanners (Outlook Safe Links, antivirus gateways,
 * link previewers) fetch every link in an email, so real subscribers were being
 * removed by software that was only checking whether the link was safe.
 *
 * A token ties the link to one address, and the route only mutates on POST —
 * scanners issue GETs. Together those are what RFC 8058 one-click unsubscribe
 * assumes.
 */
export const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET;

/** Addresses are compared and signed lowercased, so the token is stable. */
function normalize(email: string): string {
  return email.trim().toLowerCase();
}

export function signUnsubscribe(email: string): string {
  if (!NEWSLETTER_SECRET) {
    throw new Error("NEWSLETTER_SECRET is not set — unsubscribe links cannot be signed.");
  }
  return createHmac("sha256", NEWSLETTER_SECRET).update(normalize(email)).digest("base64url");
}

/**
 * Constant-time check. Returns false rather than throwing on a missing secret
 * or a malformed token: the caller's job is to refuse the request, not to
 * distinguish why.
 */
export function verifyUnsubscribe(email: string, token: string | null): boolean {
  if (!NEWSLETTER_SECRET || !token) return false;

  try {
    const expected = Buffer.from(signUnsubscribe(email));
    const given = Buffer.from(token);
    return expected.length === given.length && timingSafeEqual(expected, given);
  } catch {
    return false;
  }
}
