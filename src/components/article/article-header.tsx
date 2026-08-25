import Link from "next/link";

import { ArticleActions } from "@/components/article/article-actions";
import { AuthorAvatar } from "@/components/author/author-byline";
import { HeaderAtmosphere } from "@/components/layout/header-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { CoverRings, PostCover } from "@/components/post/post-cover";
import { getTopicVisual } from "@/components/post/topic-visuals";
import { author, type Post, type PostSummary } from "@/lib/content";
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
                href={`/search?q=${encodeURIComponent(secondaryTag.replace("#", ""))}`}
                className="rounded-full bg-tint-cornflower px-3.5 py-1.5 text-[12px] font-semibold text-fg-link"
              >
                {secondaryTag.replace("#", "").replace(/^./, (char) => char.toUpperCase())}
              </Link>
            ) : null}
            {post.series && partCount ? (
              <span className="text-[13px] text-fg-3">
                Part {post.series.part} of {partCount} · {post.series.title}
              </span>
            ) : null}
          </div>

          <h1 className="mt-5.5 text-[clamp(34px,4.4vw,56px)] leading-[1.08] font-bold tracking-[-0.03em] text-fg-1">
            {post.title}
          </h1>
          <p className="mt-5 text-[20px] leading-[1.55] text-fg-2">{post.dek}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-line-1 py-4.5">
            <AuthorAvatar className="size-11 text-[15px]" />
            <div>
              <p className="text-[14.5px] font-bold text-fg-1">{author.name}</p>
              <p className="text-[13px] text-fg-3">
                {formatDate(post.publishedAt, "long")} · {post.readingMinutes} min read
              </p>
            </div>
            <ArticleActions post={summary} />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-8">
        {/* TODO: article cover photograph, 2100x900 (21:9). Drop it in as a
            <next/image fill priority> layer above PostCover; the topic gradient
            below stays as the no-asset fallback. */}
        <PostCover
          topic={post.topic}
          image={post.coverImage}
          alt={post.title}
          priority
          pattern={false}
          zoom={false}
          notch
          className="aspect-[21/9] rounded-xl shadow-md [--notch-surface:var(--color-bg-1)]"
        >
          {!post.coverImage ? (
            <CoverRings sizes={[900, 620, 340]} className="[&>div]:top-[72%]" />
          ) : null}
        </PostCover>
      </Reveal>
    </>
  );
}
