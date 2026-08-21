import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The editor and its list are working surfaces, not content.
      disallow: ["/studio", "/studio/editor"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
