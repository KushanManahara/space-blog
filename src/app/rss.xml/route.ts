import { author, listPosts, site, siteUrl as SITE_URL } from "@/lib/content";

/**
 * The feed is derived entirely from `posts.ts`, which is static, so there is
 * nothing per-request about it. Route handlers are dynamic by default.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

export function GET(): Response {
  const items = listPosts()
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/articles/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${post.slug}</guid>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.dek)}</description>
      <category>${escapeXml(post.topic)}</category>
    </item>`,
    )
    .join("\n");

  // Newest post date rather than "now": the feed is static, so a build-time
  // clock would claim the archive changed every time the site was redeployed.
  const latest = listPosts()[0]?.publishedAt;

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} - ${site.tagline}`)}</title>
    <link>${SITE_URL}</link>
    <!-- Required by the RSS Advisory Board profile and checked by the W3C
         validator: it tells an aggregator where the feed canonically lives. -->
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <!-- No <managingEditor>: it is an optional element whose only content is a
         bare email address in a public XML file. Attribution without the
         address does the same job for a reader. -->
    <copyright>${escapeXml(author.name)}</copyright>${
      latest
        ? `
    <lastBuildDate>${new Date(`${latest}T00:00:00Z`).toUTCString()}</lastBuildDate>`
        : ""
    }
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
