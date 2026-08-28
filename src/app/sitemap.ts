import type { MetadataRoute } from "next";

import { listPosts, listTags, routes, siteUrl, topics } from "@/lib/content";

/** Public surfaces only. The studio is noindex and stays out of the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    routes.home,
    routes.articles,
    routes.topics,
    routes.tags,
    routes.paths,
    routes.corrections,
    routes.about,
    routes.contact,
  ] as const;

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: (path === routes.home ? "daily" : "monthly") as "daily" | "monthly",
      priority: path === routes.home ? 1 : 0.7,
    })),
    ...topics.map((topic) => ({
      url: `${siteUrl}${routes.topics}/${topic.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...listTags().map((tag) => ({
      url: `${siteUrl}${routes.tags}/${tag.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...listPosts().map((post) => ({
      url: `${siteUrl}${routes.articles}/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
