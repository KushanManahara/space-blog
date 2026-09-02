import type { Metadata } from "next";

import { site } from "@/lib/content";

/**
 * Page metadata helpers.
 *
 * Next merges `metadata` a key at a time, so a page that declares `alternates`
 * or `openGraph` replaces the root's entire object rather than extending it.
 * Every page here sets a canonical, which silently dropped the root's RSS
 * autodiscovery link from all of them, and every page with social tags dropped
 * `siteName` and `locale` the same way. These rebuild the shared parts so a
 * page only has to say what is genuinely its own.
 */

/** Canonical URL for a page, keeping feed autodiscovery attached. */
export function alternates(canonical: string): Metadata["alternates"] {
  return {
    canonical,
    types: { "application/rss+xml": "/rss.xml" },
  };
}

/** Open Graph for a page, keeping the publication's identity attached. */
export function openGraph(
  fields: NonNullable<Metadata["openGraph"]>,
): NonNullable<Metadata["openGraph"]> {
  return {
    siteName: site.name,
    locale: "en_US",
    ...fields,
  };
}
