import { author, listPosts, site, siteUrl as SITE_URL } from "@/lib/content";

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
      <guid>${SITE_URL}/articles/${post.slug}</guid>
      <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.dek)}</description>
      <category>${escapeXml(post.topic)}</category>
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${site.name} - ${site.tagline}`)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <managingEditor>${author.email} (${escapeXml(author.name)})</managingEditor>
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
