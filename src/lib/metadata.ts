import type { Metadata } from "next";

import { author, site } from "@/lib/content";

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

/**
 * The site-wide 1200x630 card rendered by `app/opengraph-image.tsx`.
 *
 * Next only attaches that file to routes that declare no Open Graph images of
 * their own, and a page that sets `openGraph` at all replaces the inherited
 * images — so without this every topic, tag and series page shared with no
 * image whatsoever.
 */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

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
    type: "website",
    images: [defaultOgImage],
    ...fields,
  };
}

/**
 * The X account behind `author.twitter`. `author.handle` is the general byline
 * handle and is not the X username, so `twitter:creator` reads it off the URL.
 */
export const xHandle = `@${new URL(author.twitter).pathname.replace(/^\/+|\/+$/g, "")}`;

/**
 * X/Twitter card for a page.
 *
 * Without one a page inherits the root's card, so every link shared from the
 * archive previewed as the homepage — its title, its description.
 */
export function twitter(
  fields: NonNullable<Metadata["twitter"]>,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    creator: xHandle,
    images: [defaultOgImage.url],
    ...fields,
  } as NonNullable<Metadata["twitter"]>;
}

/**
 * Everything a plain page needs in one place: title, description, canonical,
 * and social cards that describe this page rather than the homepage.
 */
export function pageMetadata({
  title,
  description,
  path,
  ...rest
}: Metadata & { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: alternates(path),
    openGraph: openGraph({ title, description, url: path }),
    twitter: twitter({ title, description }),
    ...rest,
  };
}
