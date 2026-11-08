import type { Metadata } from "next";

import { author, site, siteUrl } from "@/lib/content";
import { ogCardPath } from "@/lib/og-sign";

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
 * Share card for a page, rendered by `app/og/route.tsx`: the Space card with
 * the page's name, or the plain card when there is none (homepage). Pages that
 * set no image of their own get one through `openGraph`, `twitter` and
 * `pageMetadata` below.
 */
export function ogImage(label?: string) {
  return {
    url: `${siteUrl}${ogCardPath(label)}`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: label
      ? `${label} on Space: the Space logo and wordmark on a soft blue glass card`
      : "The Space logo and wordmark on a soft blue glass card",
  };
}

/** The plain card, for pages that don't name themselves. */
export const defaultOgImage = ogImage();

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
    openGraph: openGraph({ title, description, url: path, images: [ogImage(title)] }),
    twitter: twitter({ title, description, images: [ogImage(title).url] }),
    ...rest,
  };
}
