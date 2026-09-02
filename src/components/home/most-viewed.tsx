"use client";

import * as React from "react";
import Link from "next/link";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

import { AuthorByline } from "@/components/author/author-byline";
import { Reveal } from "@/components/motion/reveal";
import { MetricRow } from "@/components/post/metric-row";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { PostRow } from "@/components/post/post-row";
import { TopicBadge } from "@/components/post/topic-badge";
import { routes, type PostSummary, type TopicName } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The four topics with the most posts, so every tab can fill the layout.
 *
 * This used to be a hardcoded list left over from the mock data, which offered
 * Evaluation (2 posts) while omitting Findings and Research (6 each).
 */
const PANEL_ID = "most-viewed-panel";

function topicTabs(posts: PostSummary[]): TopicName[] {
  const counts = new Map<TopicName, number>();
  for (const post of posts) counts.set(post.topic, (counts.get(post.topic) ?? 0) + 1);

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 4)
    .map(([topic]) => topic);
}

/**
 * “Most viewed”, by topic.
 *
 * The tab is a real filter. It used to front-load the matching topic and then
 * pad the remaining slots with everything else, which put a one-view post at
 * the head of a section headed “Most viewed” above a 728-view post from a
 * topic the reader had just filtered away.
 */
export function MostViewed({ posts }: { posts: PostSummary[] }) {
  const tabs = topicTabs(posts);
  const [activeTab, setActiveTab] = React.useState<TopicName | null>(null);
  const topic = activeTab ?? tabs[0];
  const tabRefs = React.useRef<Partial<Record<TopicName, HTMLButtonElement | null>>>({});

  // See MostReadSection: with no views recorded, "most viewed" is really
  // "most recent", so the heading should not claim otherwise.
  const hasViewData = posts.some((post) => post.views > 0);

  /** Left/Right/Home/End across the tabs, as the WAI-ARIA tabs pattern requires. */
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = tabs.indexOf(topic);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    setActiveTab(tabs[next]);
    tabRefs.current[tabs[next]]?.focus();
  };

  const [hero, ...rest] = posts
    .filter((post) => post.topic === topic)
    .sort(
      (a, b) =>
        b.views - a.views || b.likes - a.likes || b.publishedAt.localeCompare(a.publishedAt),
    )
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-page px-gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(76px,9vw,132px)]">
      <Reveal>
        <h2 className="text-h2 text-fg-1">
          {hasViewData ? "Most viewed articles" : "Featured articles"}
        </h2>
        <p className="mt-2.5 text-[16.5px] text-fg-2">
          {hasViewData
            ? "What people actually read this year."
            : "A place to start in each of the busiest topics."}
        </p>
      </Reveal>

      <Reveal className="mt-6.5 flex flex-wrap items-center justify-between gap-4">
        {/*
          A real tablist: declaring `role="tab"` obliges the arrow-key contract
          and a labelled panel, and without them the roles told a screen-reader
          user to expect navigation that did not exist. Roving tabindex means
          the group is one tab stop and Left/Right move within it.
        */}
        <div
          role="tablist"
          aria-label="Most viewed topics"
          className="flex flex-wrap gap-2"
          onKeyDown={onTabKeyDown}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`most-viewed-tab-${tab}`}
              aria-selected={tab === topic}
              aria-controls={PANEL_ID}
              tabIndex={tab === topic ? 0 : -1}
              ref={(node) => {
                tabRefs.current[tab] = node;
              }}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-[11px] text-[13.5px] font-semibold backdrop-blur-[14px] backdrop-saturate-[140%] transition-[background-color,color,transform] duration-300 ease-expo active:scale-[0.96] active:duration-150 active:ease-out",
                tab === topic
                  ? "border-ink bg-ink text-on-ink"
                  : "border-line-1 bg-veil/70 text-fg-2",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <InteractiveHoverButton
          href={routes.articles}
          variant="glass"
          className="px-5 py-[11px] text-[14px]"
        >
          View all
        </InteractiveHoverButton>
      </Reveal>

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`most-viewed-tab-${topic}`}
        tabIndex={0}
        className="mt-6.5 grid items-start gap-[clamp(20px,3vw,32px)] lg:grid-cols-[1.06fr_1fr]"
      >
        {hero ? <MostViewedHero post={hero} /> : null}
        <div className="flex flex-col gap-4">
          {rest.map((post) => (
            <PostRow key={post.slug} post={post} variant="card" />
          ))}
        </div>
      </div>
    </section>
  );
}

function MostViewedHero({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group block transition-transform duration-550 ease-bounce active:scale-[0.98] active:duration-150 active:ease-out"
    >
      <div className="transition-transform duration-550 ease-bounce group-hover:-translate-y-1.5">
        <PostCover
          topic={post.topic}
          image={post.coverImage}
          pattern={false}
          notch
          className="aspect-[16/11] rounded-2xl [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)] md:rounded-3xl"
        >
          {!post.coverImage ? (
            <CoverRings sizes={[560, 340]} className="[&>div]:top-[74%] [&>div]:left-[58%]" />
          ) : null}
          <TopicBadge topic={post.topic} tone="dark" icon className="absolute top-4 right-4" />
        </PostCover>

        <div className="relative z-10 mx-2 -mt-[36px] sm:mx-4 sm:-mt-[44px]">
          <div className="rounded-2xl border border-line-1 bg-bg-2 p-4.5 shadow-lg transition-[box-shadow,border-color] duration-500 ease-expo group-hover:border-line-2 group-hover:shadow-card-hover-xl sm:p-6 md:rounded-[24px] md:p-6.5 md:shadow-xl">
            <AuthorByline date={post.publishedAt} />
            <h3 className="mt-3.5 text-[21px] leading-[1.2] font-bold tracking-[-0.02em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong sm:text-[24px]">
              {post.title}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-fg-2 sm:text-[15.5px]">
              {post.dek}
            </p>
          </div>
        </div>
      </div>

      <MetricRow
        post={post}
        metrics={["likes", "comments", "views"]}
        bordered={false}
        className="mt-3.5 px-1"
      />
    </Link>
  );
}
