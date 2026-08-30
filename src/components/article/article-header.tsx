import Link from "next/link";
import { PencilLine } from "lucide-react";

import { ArticleActions } from "@/components/article/article-actions";
import { AuthorAvatar } from "@/components/author/author-byline";
import { HeaderAtmosphere } from "@/components/layout/header-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { getTopicVisual } from "@/components/post/topic-visuals";
import { author, routes, tagSlug, type Post, type PostSummary } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ArticleHeader({
  post,
  summary,
  partCount,
}: {
  post: Post;
  summary: PostSummary;
  partCount?: number;
}) {
  const visual = getTopicVisual(post.topic);
  // The topic already has its own badge; show the first tag that adds something.
  const secondaryTag = post.tags.find((tag) => tag.replace("#", "") !== post.topic.toLowerCase());

  return (
    <>
      {/* Wraps the title block only. The cover image below is content, not
          header, so the wash should already be gone by the time it starts. */}
      <div className="relative">
        <HeaderAtmosphere />

        <Reveal className="max-w-[780px]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn("rounded-full px-3.5 py-1.5 text-[12px] font-semibold", visual.badge)}
            >
              {post.topic}
            </span>
            {secondaryTag ? (
              <Link
                href={`/tags/${tagSlug(secondaryTag)}`}
                className="rounded-full bg-tint-cornflower px-3.5 py-1.5 text-[12px] font-semibold text-fg-link"
              >
                {secondaryTag.replace("#", "").replace(/^./, (char) => char.toUpperCase())}
              </Link>
            ) : null}
            {summary.correctedAt ? (
              <Link
                href={routes.corrections}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3.5 py-1.5 text-[12px] font-semibold text-fg-1 transition-colors duration-300 ease-expo hover:border-fg-1"
              >
                <PencilLine className="size-3.5" strokeWidth={2} />
                Corrected {formatDate(summary.correctedAt)}
              </Link>
            ) : null}
            {post.series && partCount ? (
              <span className="text-[13px] text-fg-3">
                Part {post.series.part} of {partCount} · {post.series.title}
              </span>
            ) : null}
          </div>

          <div id="article-header-intro" className="rounded-xl transition-all duration-300">
            <h1 className="mt-5.5 text-[clamp(28px,4.4vw,56px)] leading-[1.12] font-bold tracking-[-0.03em] break-words text-fg-1 sm:leading-[1.08]">
              {post.title}
            </h1>
            <p className="mt-4 text-[17px] leading-[1.55] text-fg-2 sm:mt-5 sm:text-[20px]">
              {post.dek}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-line-1 py-4.5">
            <div className="flex items-center gap-3.5">
              <AuthorAvatar className="size-11 text-[15px]" />
              <div>
                <p className="text-[14.5px] font-bold text-fg-1">{author.name}</p>
                <p className="text-[13px] text-fg-3">
                  {formatDate(post.publishedAt, "long")} · {post.readingMinutes} min read
                </p>
              </div>
            </div>
            <div className="print:hidden">
              <ArticleActions post={summary} />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-8.5 md:mt-10">
        <div className="relative rounded-2xl shadow-[0_24px_54px_-12px_rgba(0,0,0,0.16),0_12px_24px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] transition-shadow duration-500 md:rounded-3xl dark:shadow-[0_28px_70px_-15px_rgba(0,0,0,0.88),0_12px_28px_-8px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.09)]">
          {/* Soft ambient underglow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-brand/20 via-brand/5 to-transparent opacity-70 blur-xl md:rounded-3xl dark:opacity-50 print:hidden"
          />
          <PostCover
            topic={post.topic}
            image={post.coverImage}
            alt={post.title}
            priority
            pattern={false}
            zoom={false}
            notch
            className="aspect-[16/9] rounded-2xl [--notch-surface:var(--color-bg-1)] sm:aspect-[21/9] md:rounded-3xl"
          >
            {!post.coverImage ? (
              <CoverRings sizes={[900, 620, 340]} className="[&>div]:top-[72%]" />
            ) : null}
          </PostCover>
        </div>
      </Reveal>
    </>
  );
}
