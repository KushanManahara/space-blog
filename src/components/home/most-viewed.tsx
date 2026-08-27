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

const TABS: readonly TopicName[] = ["Inference", "Systems", "Evaluation", "Engineering"];

/**
 * “Most viewed”: a topic tab picks which posts lead, but the section always
 * fills to four so the layout never collapses on a thin topic.
 */
export function MostViewed({ posts }: { posts: PostSummary[] }) {
  const [activeTab, setActiveTab] = React.useState<TopicName>(TABS[0]);

  const ranked = [...posts].sort((a, b) => b.views - a.views);
  const [hero, ...rest] = [
    ...ranked.filter((post) => post.topic === activeTab),
    ...ranked.filter((post) => post.topic !== activeTab),
  ].slice(0, 4);

  return (
    <section className="mx-auto max-w-page px-gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(76px,9vw,132px)]">
      <Reveal>
        <h2 className="text-h2 text-fg-1">Most viewed articles</h2>
        <p className="mt-2.5 text-[16.5px] text-fg-2">What people actually read this year.</p>
      </Reveal>

      <Reveal className="mt-6.5 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Most viewed topics" className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={tab === activeTab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-[11px] text-[13.5px] font-semibold backdrop-blur-[14px] backdrop-saturate-[140%] transition-[background-color,color,transform] duration-300 ease-expo active:scale-[0.96] active:duration-150 active:ease-out",
                tab === activeTab
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

      <div className="mt-6.5 grid items-start gap-[clamp(20px,3vw,32px)] lg:grid-cols-[1.06fr_1fr]">
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
          alt={post.title}
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
