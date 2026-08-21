import { posts } from "./posts";
import type { Post, PostSummary, StudioPost, Topic } from "./schemas";
import { seriesList, topics } from "./site";

export type SortOrder = "recent" | "views";

export const sortLabels: Record<SortOrder, string> = {
  recent: "Most recent",
  views: "Most viewed",
};

/** Topic chips shown above the post grids — "All" plus the busiest topics. */
export const topicFilters = ["All", ...topics.slice(0, 5).map((topic) => topic.name)] as const;

export type TopicFilter = (typeof topicFilters)[number];

export function isTopicFilter(value: string | undefined): value is TopicFilter {
  return value !== undefined && (topicFilters as readonly string[]).includes(value);
}

export function isSortOrder(value: string | undefined): value is SortOrder {
  return value === "recent" || value === "views";
}

function byRecency(a: Post, b: Post): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

function byViews(a: Post, b: Post): number {
  return b.views - a.views;
}

export function listPosts(
  options: { topic?: TopicFilter; series?: string; sort?: SortOrder; limit?: number } = {},
): Post[] {
  const { topic = "All", series, sort = "recent", limit } = options;
  const filtered = posts.filter(
    (post) =>
      (topic === "All" || post.topic === topic) && (!series || post.series?.slug === series),
  );
  const sorted = [...filtered].sort(sort === "views" ? byViews : byRecency);
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

export function getFeaturedPost(): Post {
  return [...posts].sort(byRecency)[0];
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPopularPosts(limit: number): Post[] {
  return [...posts].sort(byViews).slice(0, limit);
}

/** Same topic first, then the next most-read posts, never the post itself. */
export function getRelatedPosts(post: Post, limit: number): Post[] {
  const sameTopic = posts.filter((item) => item.slug !== post.slug && item.topic === post.topic);
  const rest = posts.filter((item) => item.slug !== post.slug && item.topic !== post.topic);
  return [...sameTopic, ...[...rest].sort(byViews)].slice(0, limit);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getPostsByTopic(topic: Topic, sort: SortOrder = "recent"): Post[] {
  return [...posts]
    .filter((post) => post.topic === topic.name)
    .sort(sort === "views" ? byViews : byRecency);
}

export function searchPosts(query: string, sort: SortOrder = "recent"): Post[] {
  const needle = query.trim().toLowerCase();
  const sorted = [...posts].sort(sort === "views" ? byViews : byRecency);
  if (!needle) return sorted;
  return sorted.filter((post) =>
    [post.title, post.dek, post.topic, ...post.tags].join(" ").toLowerCase().includes(needle),
  );
}

export function getSeriesBySlug(slug: string) {
  return seriesList.find((series) => series.slug === slug);
}

/** Studio rows: the newest post is an unpublished draft, one older post carries a correction. */
export function getStudioPosts(): Array<StudioPost & { post: Post }> {
  return listPosts({ limit: 10 }).map((post, index) => ({
    slug: post.slug,
    status: index === 0 ? "Draft" : index === 3 ? "Corrected" : "Published",
    post,
  }));
}

/** Drops the article body so client components ship a small payload. */
export function toSummary({ body, ...summary }: Post): PostSummary {
  return summary;
}

export function toSummaries(items: Post[]): PostSummary[] {
  return items.map(toSummary);
}
