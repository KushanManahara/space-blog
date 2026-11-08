import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed page names for the `/og` share card.
 *
 * The card prints its `label` on an image served from this domain, so an
 * unsigned label would let anyone generate "Space" cards saying anything.
 * Metadata signs the real page titles at build time; the route only prints a
 * label whose signature matches, and falls back to the plain card otherwise.
 * Uses NEWSLETTER_SECRET under its own purpose prefix.
 */

export const OG_LABEL_MAX = 60;

function signature(label: string): string | null {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(`og-label:${label}`).digest("base64url").slice(0, 22);
}

/** Path of the share card for a page, signed when it carries a label. */
export function ogCardPath(label?: string): string {
  const trimmed = label?.trim().slice(0, OG_LABEL_MAX);
  const sig = trimmed ? signature(trimmed) : null;
  if (!trimmed || !sig) return "/og";
  return `/og?label=${encodeURIComponent(trimmed)}&s=${sig}`;
}

/** The label to print, or undefined when it is missing or not signed by us. */
export function verifiedLabel(label: string | null, sig: string | null): string | undefined {
  if (!label || !sig || label.length > OG_LABEL_MAX) return undefined;
  const expected = signature(label);
  if (!expected) return undefined;
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b) ? label : undefined;
}
