import Link from "next/link";
import { ArrowRight, Bookmark, Heart, ListOrdered, MessageSquare } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { TopicBadge } from "@/components/post/topic-badge";
import { Button } from "@/components/ui/button";
import { getSeriesBySlug, routes, site, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function Hero({ featured }: { featured: Post }) {
  return (
    <section className="relative mx-auto max-w-page px-gutter pt-[clamp(40px,6vw,84px)] pb-[clamp(56px,7vw,104px)]">
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
      className="group relative block rounded-lg border border-line-1 bg-bg-2 shadow-lg transition-[transform,box-shadow] duration-550 ease-bounce before:absolute before:inset-y-4.5 before:-right-4.5 before:left-4.5 before:-z-1 before:translate-y-4.5 before:rounded-lg before:content-[''] hover:-translate-y-1.5 active:scale-[0.98] active:duration-150 active:ease-out"
    >
      <div className="overflow-hidden rounded-lg">
        {/* TODO: featured post cover photograph, 1600x1000 (16:10). Drop it in as a
            <next/image fill priority> layer above PostCover; the topic gradient
            below stays as the no-asset fallback. */}
        <PostCover topic={post.topic} pattern={false} className="aspect-[16/10]">
          <CoverRings sizes={[520, 340, 180]} />
          <span className="glass-on-cover absolute top-4 right-4 rounded-full px-3.5 py-[7px] text-[12px] font-semibold">
            Featured
          </span>
          {post.series && partCount ? (
            <span className="glass-on-cover absolute bottom-4 left-4 inline-flex items-center gap-[9px] rounded-full px-4 py-[9px] text-[12.5px] font-semibold">
              <ListOrdered className="size-3.5 text-brand" strokeWidth={1.75} />
              Part {post.series.part} of {partCount} · {post.series.title}
            </span>
          ) : null}
        </PostCover>

        <div className="p-6.5 pb-6">
          <div className="flex items-center gap-2.5">
            <TopicBadge topic={post.topic} className="text-[12px]" />
            <span className="text-[13px] text-fg-3">
              {formatDate(post.publishedAt)} · {post.readingMinutes} min read
            </span>
          </div>

          <h2 className="mt-4 text-[26px] leading-[1.18] font-bold tracking-[-0.02em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
            {post.title}
          </h2>
          <p className="mt-3 text-[15.5px] leading-[1.6] text-fg-2">{post.dek}</p>

          <div className="mt-5 flex items-center gap-4 border-t border-line-1 pt-4.5 text-[13px] text-fg-3">
            <span className="inline-flex items-center gap-1.5">
              <Heart className="size-[15px]" strokeWidth={1.75} />
              {post.likes}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageSquare className="size-[15px]" strokeWidth={1.75} />
              {post.commentCount}
            </span>
            <span className="ml-auto inline-flex items-center">
              <Bookmark className="size-3.5" strokeWidth={1.75} />
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
              Read
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
