import type { MetadataRoute } from "next";

import {
  getPostsByTag,
  getPostsByTopic,
  getSeriesParts,
  lastCorrectedAt,
  listPosts,
  listTags,
  routes,
  seriesList,
  siteUrl,
  type Post,
  topics,
} from "@/lib/content";

/** Public surfaces only. The studio is noindex and stays out of the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    routes.home,
    routes.articles,
    routes.topics,
    routes.tags,
    routes.series,
    routes.paths,
    routes.corrections,
    routes.about,
    routes.contact,
    routes.privacy,
  ] as const;

  // When a post last changed: its correction date if it has one, else its
  // publication date.
  const changedAt = (post: Post) =>
    new Date(`${lastCorrectedAt(post) ?? post.publishedAt}T00:00:00Z`);

  /** A listing page is exactly as fresh as the newest post it lists. */
  const newestIn = (items: Post[]) =>
    items.reduce<Date>((latest, post) => {
      const changed = changedAt(post);
      return changed > latest ? changed : latest;
    }, new Date(0));

  const latestChange = newestIn(listPosts());

  return [
    // These list or summarise the archive, so the newest post is the honest
    // answer for when they last changed. Without any `lastModified` a crawler
    // has nothing to schedule against.
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: latestChange,
      changeFrequency: (path === routes.home ? "daily" : "monthly") as "daily" | "monthly",
      priority: path === routes.home ? 1 : 0.7,
    })),
    ...topics.map((topic) => ({
      url: `${siteUrl}${routes.topics}/${topic.slug}`,
      lastModified: newestIn(getPostsByTopic(topic)),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    // Series detail pages are prerendered routes that were missing here, so the
    // only way in was an internal link.
    ...seriesList.map((series) => ({
      url: `${siteUrl}${routes.series}/${series.slug}`,
      lastModified: newestIn(getSeriesParts(series.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...listTags().map((tag) => ({
      url: `${siteUrl}${routes.tags}/${tag.slug}`,
      lastModified: newestIn(getPostsByTag(tag.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...listPosts().map((post) => ({
      url: `${siteUrl}${routes.articles}/${post.slug}`,
      // A correction is the only edit a published post gets, so it is what
      // "last modified" means here.
      lastModified: changedAt(post),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
