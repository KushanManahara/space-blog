import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { Reveal } from "@/components/motion/reveal";
import { DiscoverModal } from "@/components/nav/discover-modal";
import { FilterChips } from "@/components/nav/filter-chips";
import { SortToggle } from "@/components/nav/sort-toggle";
import { PostCard } from "@/components/post/post-card";
import { TopicHeader } from "@/components/topic/topic-header";
import {
  getPostsByTopic,
  getTopicBySlug,
  isSortOrder,
  listTags,
  sortLabels,
  topics,
} from "@/lib/content";
import { buildHref } from "@/lib/url";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

/**
 * No `loading.tsx` in this segment, deliberately.
 *
 * This route renders dynamically (it reads `searchParams` for the sort order),
 * so `dynamicParams` cannot gate it the way it does for articles. A
 * `loading.tsx` here opened a Suspense boundary, which flushed 200 headers
 * before `notFound()` could run — every unknown topic answered 200 with
 * not-found content. The page only reads in-memory content, so there was
 * little for the loading state to cover.
 */

export async function generateMetadata({ params }: PageProps<"/topics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};

  return {
    title: topic.name,
    description: topic.description,
    alternates: { canonical: `/topics/${topic.slug}` },
    openGraph: {
      type: "website",
      title: topic.name,
      description: topic.description,
      url: `/topics/${topic.slug}`,
    },
  };
}

export default async function TopicPage({ params, searchParams }: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const { sort: sortParam } = await searchParams;

  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const requestedSort = typeof sortParam === "string" ? sortParam : undefined;
  const sort = isSortOrder(requestedSort) ? requestedSort : "recent";
  const posts = getPostsByTopic(topic, sort);
  const pathname = `/topics/${topic.slug}`;

  return (
    <>
      <TopicHeader topic={topic} />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(36px,4.5vw,56px)] pb-tail">
        <Reveal className="mb-5 flex flex-wrap items-center gap-2.5">
          <DiscoverModal kind="topics" topics={topics} />
          <DiscoverModal kind="tags" tags={listTags().slice(0, 24)} />
        </Reveal>

        <Reveal className="mb-6.5 flex flex-wrap items-center justify-between gap-4">
          <FilterChips
            label="Jump to another topic"
            size="sm"
            options={topics.slice(0, 5).map((option) => ({
              label: option.name,
              href: buildHref(`/topics/${option.slug}`, {}, { sort }),
              active: option.slug === topic.slug,
            }))}
          />
          <SortToggle
            value={sort}
            href={buildHref(pathname, {}, { sort: sort === "recent" ? "views" : "recent" })}
          />
        </Reveal>

        <ViewTransition key={sort} enter="content-swap" exit="content-swap">
          {posts.length === 0 ? (
            <p className="rounded-lg border border-line-1 bg-bg-2 p-8 text-[15px] text-fg-2">
              Nothing published under {topic.name} yet. It&rsquo;s next on the list.
            </p>
          ) : (
            <div className="grid items-stretch gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} index={index} className="h-full">
                  <PostCard post={post} showMetrics={false} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}
        </ViewTransition>

        <p className="sr-only">Sorted by {sortLabels[sort].toLowerCase()}.</p>
      </section>
    </>
  );
}
