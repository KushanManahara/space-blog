import { posts } from "@/lib/content";

/**
 * The ⌘K catalog, fetched on first open.
 *
 * The command menu lives in the root layout, so passing it the archive as a
 * prop serialised all forty post summaries into the RSC payload of every single
 * page — including pages with nothing to do with the archive. Only five fields
 * are ever read, and only once somebody actually opens the menu.
 *
 * Static and immutable-ish: the catalog only changes when the site is rebuilt.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const index = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    topic: post.topic,
    coverImage: post.coverImage,
    readingMinutes: post.readingMinutes,
  }));

  return Response.json(index, {
    headers: { "cache-control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
