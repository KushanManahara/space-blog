import { Suspense, ViewTransition } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

import { SectionHeader } from "@/components/layout/section-header";
import { Reveal } from "@/components/motion/reveal";
import { FilterChips } from "@/components/nav/filter-chips";
import { PostCard } from "@/components/post/post-card";
import { PostSkeletonGrid } from "@/components/post/post-skeleton";
import { listPosts, posts, routes, topicFilters, type TopicFilter } from "@/lib/content";
import { getAllLivePostStatsMap } from "@/lib/db/queries";
import { buildHref } from "@/lib/url";

/** Latest six posts, filtered by topic through the URL. */
export function LatestWriting({ topic }: { topic: TopicFilter }) {
  return (
    <section className="mx-auto max-w-page px-gutter pb-[clamp(76px,9vw,132px)]">
      <Reveal>
        <SectionHeader
          title="Latest writing"
          subtitle="Filter by what you came for."
          action={
            <InteractiveHoverButton
              href={routes.articles}
              variant="secondary"
              className="px-5 py-[11px] text-[14px]"
            >
              View all
            </InteractiveHoverButton>
          }
          className="mb-7"
        />
      </Reveal>

      <Reveal className="mb-6.5">
        <FilterChips
          label="Filter latest writing by topic"
          options={topicFilters.map((option) => ({
            label: option,
            href: buildHref(routes.home, {}, { topic: option === "All" ? undefined : option }),
            active: option === topic,
          }))}
        />
      </Reveal>

      {/* Keyed so switching topics swaps in the skeleton while the grid streams. */}
      <Suspense key={topic} fallback={<PostSkeletonGrid />}>
        <LatestGrid topic={topic} />
      </Suspense>
    </section>
  );
}

async function LatestGrid({ topic }: { topic: TopicFilter }) {
  const liveStatsMap = await getAllLivePostStatsMap();
  const livePosts = posts.map((p) => {
    const live = liveStatsMap.get(p.slug);
    return live ? { ...p, likes: live.likes, views: live.views, commentCount: live.comments } : p;
  });
  const visible = listPosts({ topic, limit: 6 }, livePosts);

  if (visible.length === 0) {
    return (
      <p className="rounded-lg border border-line-1 bg-bg-2 p-8 text-[15px] text-fg-2">
        Nothing published under this topic yet. Try another filter.
      </p>
    );
  }

  return (
    <ViewTransition key={topic} enter="content-swap" exit="content-swap">
      <div className="grid items-stretch gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, index) => (
          <Reveal key={post.slug} index={index} className="h-full">
            <PostCard post={post} className="h-full" />
          </Reveal>
        ))}
      </div>
    </ViewTransition>
  );
}
