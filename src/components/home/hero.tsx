import Link from "next/link";
import { ListOrdered } from "lucide-react";

import { HeaderAtmosphere } from "@/components/layout/header-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { MetricRow } from "@/components/post/metric-row";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { TopicBadge } from "@/components/post/topic-badge";
import { Button } from "@/components/ui/button";
import { GlareHover } from "@/components/ui/glare-hover";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TextAnimate } from "@/components/ui/text-animate";
import { getSeriesBySlug, routes, site, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function Hero({ featured }: { featured: Post }) {
  return (
    <section className="relative mx-auto w-full max-w-page min-w-0 px-gutter pt-[clamp(40px,6vw,84px)] pb-[clamp(56px,7vw,104px)]">
      <HeaderAtmosphere />

      <div className="relative z-1 grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <h1 className="mt-6 max-w-[15ch] text-[clamp(40px,5.4vw,68px)] leading-[1.04] font-light tracking-[-0.03em] text-balance text-fg-1">
            <TextAnimate
              as="span"
              by="word"
              animation="blurInUp"
              startOnView={false}
              duration={0.5}
              className="inline"
            >
              Working notes on AI systems
            </TextAnimate>{" "}
            {/* One segment, and the gradient lives on the segment rather than the
                container: each animated segment is its own inline-block box, so a
                background-clip:text gradient on the parent never paints through. */}
            <TextAnimate
              as="span"
              by="text"
              animation="blurInUp"
              startOnView={false}
              delay={0.28}
              duration={0.5}
              className="inline font-bold"
              segmentClassName="text-gradient inline whitespace-normal"
            >
              and the software under them.
            </TextAnimate>
          </h1>

          <TextAnimate
            as="p"
            by="line"
            animation="fadeIn"
            startOnView={false}
            delay={0.55}
            className="mt-6 max-w-115 text-[19px] leading-[1.6] text-fg-2"
          >
            {`Language models, agents and the protocols wiring them to real tools. Linux, Python and the tooling underneath. Written up as I learn it, one post at a time.`}
          </TextAnimate>

          <div className="mt-8.5 flex w-full flex-wrap gap-3 sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">
            <InteractiveHoverButton
              href={`/articles/${featured.slug}`}
              className="px-[26px] py-[14px]"
            >
              Read the latest
            </InteractiveHoverButton>
            <Button asChild variant="secondary" size="lg">
              <Link href={routes.articles} className="justify-center">
                Browse all&nbsp;
                <NumberTicker value={site.issue} className="font-semibold" />
                &nbsp;posts
              </Link>
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
        <GlareHover className="rounded-2xl md:rounded-3xl">
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
        </GlareHover>

        <div className="relative z-10 mx-2 -mt-[36px] sm:mx-4 sm:-mt-[44px]">
          <div className="rounded-2xl border border-line-1 bg-bg-2 p-4.5 shadow-lg transition-[box-shadow,border-color] duration-500 ease-expo group-hover:border-line-2 group-hover:shadow-card-hover-xl sm:p-6 md:rounded-[24px] md:p-6.5 md:shadow-xl">
            <p className="text-[13px] text-fg-3">
              {formatDate(post.publishedAt)} · {post.readingMinutes} min read
            </p>

            {post.series && partCount ? (
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-strong">
                <ListOrdered className="size-3.5" strokeWidth={1.75} />
                Part {post.series.part} of {partCount} · {post.series.title}
              </p>
            ) : null}

            <h2 className="mt-3 text-[22px] leading-[1.18] font-bold tracking-[-0.02em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong sm:text-[26px]">
              {post.title}
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.6] text-fg-2 sm:text-[15.5px]">
              {post.dek}
            </p>
          </div>
        </div>
      </div>

      <MetricRow post={post} bordered={false} className="mt-3.5 px-1" />
    </Link>
  );
}
