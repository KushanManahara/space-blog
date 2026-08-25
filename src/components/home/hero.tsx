import Link from "next/link";
import { ArrowRight, ListOrdered } from "lucide-react";

import { HeaderAtmosphere } from "@/components/layout/header-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { MetricRow } from "@/components/post/metric-row";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { TopicBadge } from "@/components/post/topic-badge";
import { Button } from "@/components/ui/button";
import { getSeriesBySlug, routes, site, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function Hero({ featured }: { featured: Post }) {
  return (
    <section className="relative mx-auto max-w-page px-gutter pt-[clamp(40px,6vw,84px)] pb-[clamp(56px,7vw,104px)]">
      <HeaderAtmosphere />

      <div className="relative z-1 grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <h1 className="mt-6 max-w-[15ch] text-[clamp(40px,5.4vw,68px)] leading-[1.04] font-light tracking-[-0.03em] text-balance text-fg-1">
            Notes from building machine learning{" "}
            <span className="text-gradient font-bold">that has to work.</span>
          </h1>

          <p className="mt-6 max-w-115 text-[19px] leading-[1.6] text-fg-2">
            Inference economics, evaluation that survives contact with production, and the
            occasional weekend experiment. Written in the open, one post at a time.
          </p>

          <div className="mt-8.5 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={`/articles/${featured.slug}`}>
                Read the latest
                <ArrowRight className="size-4" strokeWidth={1.75} />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={routes.articles}>Browse all {site.issue} posts</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <FeaturedCard post={featured} />
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  const partCount = post.series ? getSeriesBySlug(post.series.slug)?.partCount : undefined;

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
          priority
          pattern={false}
          notch
          className="aspect-[16/10] rounded-2xl [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)] md:rounded-3xl"
        >
          {!post.coverImage ? <CoverRings sizes={[520, 340, 180]} /> : null}
          {/* One cluster rather than two absolutes fighting for the same corner. */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <TopicBadge topic={post.topic} tone="dark" icon />
            <span className="glass-on-cover rounded-full px-3.5 py-[7px] text-[12px] font-semibold">
              Featured
            </span>
          </div>
        </PostCover>

        <div className="relative z-10 mx-4 -mt-[54px]">
          <svg
            viewBox="0 0 400 32"
            preserveAspectRatio="none"
            className="-mb-[1px] block h-8 w-full fill-bg-2"
            aria-hidden
          >
            <path d="M 0 32 L 0 16 Q 0 8 12 7 L 386 0 Q 400 0 400 12 L 400 32 Z" />
          </svg>
          <div className="rounded-b-2xl bg-bg-2 px-6.5 pt-2 pb-6 shadow-sm transition-shadow duration-500 ease-expo group-hover:shadow-card-hover-lg md:rounded-b-[22px]">
            <p className="text-[13px] text-fg-3">
              {formatDate(post.publishedAt)} · {post.readingMinutes} min read
            </p>

            {post.series && partCount ? (
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-strong">
                <ListOrdered className="size-3.5" strokeWidth={1.75} />
                Part {post.series.part} of {partCount} · {post.series.title}
              </p>
            ) : null}

            <h2 className="mt-3 text-[26px] leading-[1.18] font-bold tracking-[-0.02em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
              {post.title}
            </h2>
            <p className="mt-3 text-[15.5px] leading-[1.6] text-fg-2">{post.dek}</p>
          </div>
        </div>
      </div>

      <MetricRow post={post} bordered={false} className="mt-3.5 px-1" />
    </Link>
  );
}
