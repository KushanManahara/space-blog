import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The editor and its list are working surfaces, not content, and the
      // API routes return JSON for the site's own scripts.
      disallow: ["/studio", "/studio/editor", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
