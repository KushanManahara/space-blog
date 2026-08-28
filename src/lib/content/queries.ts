import { blockText } from "./block-text";
import { posts } from "./posts";
import type { CorrectionBlock, Post, PostSummary, StudioPost, Tag, Topic } from "./schemas";
import { readingPaths, seriesList, topics } from "./site";

export type SortOrder = "recent" | "views";

export const sortLabels: Record<SortOrder, string> = {
  recent: "Most recent",
  views: "Most viewed",
};

/**
 * Topic chips shown above the post grids: "All" plus every topic.
 *
 * This used to be the five busiest, which left Evaluation and Experiments with
 * no chip anywhere and made `?topic=Experiments` fall back to All without
 * saying so — a filter you cannot reach and cannot tell has been ignored.
 */
export const topicFilters = ["All", ...topics.map((topic) => topic.name)] as const;

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
  options: {
    topic?: TopicFilter;
    series?: string;
    year?: string;
    sort?: SortOrder;
    limit?: number;
  } = {},
  sourcePosts: Post[] = posts,
): Post[] {
  const { topic = "All", series, year, sort = "recent", limit } = options;
  const filtered = sourcePosts.filter(
    (post) =>
      (topic === "All" || post.topic === topic) &&
      (!series || post.series?.slug === series) &&
      (!year || postYear(post) === year),
  );
  const sorted = [...filtered].sort(sort === "views" ? byViews : byRecency);
  return limit === undefined ? sorted : sorted.slice(0, limit);
}

export function postYear(post: Post): string {
  return post.publishedAt.slice(0, 4);
}

/**
 * The years the archive actually covers, newest first, with post counts.
 *
 * The archive runs from 2023 and sorted only by recency or views, so there was
 * no way to browse it as a record over time — the axis this publication is most
 * organised around. Derived, so a year appears the moment a post lands in it.
 */
export function listYears(): Array<{ year: string; count: number }> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const year = postYear(post);
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

export function isArchiveYear(value: string | undefined): value is string {
  return value !== undefined && listYears().some((entry) => entry.year === value);
}

/**
 * Every correction in the archive, newest first, with the post it belongs to.
 *
 * Derived from the bodies rather than tracked separately: a correction exists
 * because it is written into the article, so there is no second list to keep in
 * step and no way for the feed to claim a correction the article does not show.
 */
export function listCorrections(): Array<{ post: Post; correction: CorrectionBlock }> {
  return posts
    .flatMap((post) =>
      post.body
        .filter((block): block is CorrectionBlock => block.kind === "correction")
        .map((correction) => ({ post, correction })),
    )
    .sort((a, b) => b.correction.date.localeCompare(a.correction.date));
}

/** The corrections on one post, newest first. */
export function getCorrections(post: Post): CorrectionBlock[] {
  return post.body
    .filter((block): block is CorrectionBlock => block.kind === "correction")
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * The date a post was last corrected, or undefined if it never was.
 *
 * Lives on the summary so list surfaces can badge a corrected post without
 * pulling the whole body into the RSC payload.
 */
export function lastCorrectedAt(post: Post): string | undefined {
  return getCorrections(post)[0]?.date;
}

/**
 * A reading path with its steps resolved to real posts.
 *
 * A step naming a slug that does not exist throws at module load rather than
 * rendering a dead link, which is the same bargain the content schemas make.
 */
export function getReadingPath(slug: string) {
  const path = readingPaths.find((entry) => entry.slug === slug);
  if (!path) return undefined;

  return {
    ...path,
    steps: path.steps.map((step) => {
      const post = posts.find((entry) => entry.slug === step.slug);
      if (!post) {
        throw new Error(`Reading path "${path.slug}" points at unknown post "${step.slug}".`);
      }
      return { ...step, post };
    }),
  };
}

export function listReadingPaths() {
  return readingPaths.map((path) => getReadingPath(path.slug)!);
}

export function getFeaturedPost(sourcePosts: Post[] = posts): Post {
  const explicit = sourcePosts.find((post) => post.featured);
  if (explicit) return explicit;
  return [...sourcePosts].sort(byRecency)[0];
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPopularPosts(limit: number): Post[] {
  return [...posts].sort(byViews).slice(0, limit);
}

/** Same topic first, then the next most-read posts, never the post itself. */
/**
 * Related posts, scored rather than bucketed.
 *
 * The previous version took everything sharing a topic and padded with the
 * most-viewed leftovers, so two articles about the same subject were unrelated
 * whenever the topics differed — the RAG and CAG posts never pointed at each
 * other. Shared tags now dominate, with topic as a tiebreak and recency last.
 */
export function getRelatedPosts(post: Post, limit: number): Post[] {
  const ownTags = new Set(post.tags.map(tagSlug));

  return posts
    .filter((item) => item.slug !== post.slug)
    .map((item) => {
      const shared = item.tags.filter((tag) => ownTags.has(tagSlug(tag))).length;
      return {
        item,
        score: shared * 10 + (item.topic === post.topic ? 4 : 0),
      };
    })
    .sort((a, b) => b.score - a.score || byRecency(a.item, b.item))
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getPostsByTopic(topic: Topic, sort: SortOrder = "recent"): Post[] {
  return [...posts]
    .filter((post) => post.topic === topic.name)
    .sort(sort === "views" ? byViews : byRecency);
}

/** `#machine-learning` and `machine-learning` both address the same tag. */
export function tagSlug(tag: string): string {
  return tag.replace(/^#/, "").toLowerCase();
}

/**
 * Every tag across the archive with its post count, busiest first.
 *
 * Derived from the posts rather than hand-maintained: the previous curated list
 * carried invented counts and eight tags that matched no post at all, which is
 * survivable while a tag is only a search query and a dead end once it is a
 * route. Shaped like `Tag` so the existing chips keep reading `name`/`postCount`.
 */
export function listTags(): Array<Tag & { slug: string }> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const slug = tagSlug(tag);
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([slug, postCount]) => ({ slug, name: `#${slug}`, postCount }))
    .sort((a, b) => b.postCount - a.postCount || a.slug.localeCompare(b.slug));
}

export function getPostsByTag(slug: string, sort: SortOrder = "recent"): Post[] {
  const needle = tagSlug(slug);
  return [...posts]
    .filter((post) => post.tags.some((tag) => tagSlug(tag) === needle))
    .sort(sort === "views" ? byViews : byRecency);
}

/**
 * Search text per post, built once at module load.
 *
 * Titles and tags alone missed everything the articles are actually about —
 * a reader searching for a command, a formula or a diagram label found nothing
 * even though it was on the page. Strips markdown and HTML so `**bold**` and
 * `<strong>` do not swallow the words inside them.
 */
function normalize(text: string): string {
  return (
    text
      .replace(/<[^>]+>/g, " ")
      // Emphasis markers only. Underscores stay: they carry meaning in the
      // identifiers people actually search for, like `predict_proba`.
      .replace(/[*`~#]+/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
  );
}

const searchIndex = new Map<string, string>(
  posts.map((post) => [
    post.slug,
    normalize(
      [post.title, post.dek, post.topic, ...post.tags, ...post.body.map(blockText)].join(" "),
    ),
  ]),
);

export function searchPosts(query: string, sort: SortOrder = "recent"): Post[] {
  // The query goes through the same transform as the index, so whatever is
  // stripped from one is stripped from the other.
  const needle = normalize(query);
  const sorted = [...posts].sort(sort === "views" ? byViews : byRecency);
  if (!needle) return sorted;

  // Every whitespace-separated term must appear somewhere in the post, so
  // "kali mysql" narrows rather than returning everything matching either.
  const terms = needle.split(/\s+/).filter(Boolean);
  return sorted.filter((post) => {
    const haystack = searchIndex.get(post.slug) ?? "";
    return terms.every((term) => haystack.includes(term));
  });
}

export function getSeriesBySlug(slug: string) {
  return seriesList.find((series) => series.slug === slug);
}

/** The posts in a series, in reading order. */
export function getSeriesParts(slug: string): Post[] {
  return posts
    .filter((post) => post.series?.slug === slug)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));
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
export function toSummary(post: Post): PostSummary {
  const { body: _body, ...summary } = post;
  return { ...summary, correctedAt: lastCorrectedAt(post) };
}

export function toSummaries(items: Post[]): PostSummary[] {
  return items.map(toSummary);
}
