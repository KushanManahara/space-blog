"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

import { AuthorByline } from "@/components/author/author-byline";
import { Reveal } from "@/components/motion/reveal";
import { MetricRow } from "@/components/post/metric-row";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { PostRow } from "@/components/post/post-row";
import { TopicBadge } from "@/components/post/topic-badge";
import { routes, type PostSummary, type TopicName } from "@/lib/content";
import { formatCount } from "@/lib/format";
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

        <Link
          href={routes.articles}
          className="glass inline-flex items-center gap-2 rounded-full px-5 py-[11px] text-[14px] font-semibold text-fg-1 transition-[transform,box-shadow] duration-[350ms] ease-bounce hover:-translate-y-0.5 hover:shadow-md active:scale-[0.96] active:duration-150 active:ease-out"
        >
          View all
          <ArrowRight className="size-[15px]" strokeWidth={1.75} />
        </Link>
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
      className="group block transition-transform duration-150 ease-out active:scale-[0.98]"
    >
      <PostCover
        topic={post.topic}
        image={post.coverImage}
        alt={post.title}
        pattern={false}
        className="aspect-[16/11] rounded-lg shadow-md transition-[transform,box-shadow] duration-[550ms] ease-bounce group-hover:-translate-y-1.5 group-hover:shadow-card-hover-lg"
      >
        {!post.coverImage ? (
          <CoverRings sizes={[560, 340]} className="[&>div]:top-[74%] [&>div]:left-[58%]" />
        ) : null}
        <TopicBadge topic={post.topic} tone="frosted" className="absolute top-4 left-4" />
        <span className="glass-on-cover absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold">
          <Eye className="size-[13px] text-brand" strokeWidth={1.75} />
          {formatCount(post.views)} views
        </span>
      </PostCover>

      <AuthorByline date={post.publishedAt} className="mt-5" />

      <h3 className="mt-3.5 text-[24px] leading-[1.2] font-bold tracking-[-0.02em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
        {post.title}
      </h3>
      <p className="mt-2.5 text-[15.5px] leading-[1.6] text-fg-2">{post.dek}</p>

      <MetricRow post={post} className="mt-4.5" />
    </Link>
  );
}
