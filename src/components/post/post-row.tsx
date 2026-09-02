import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthorByline } from "@/components/author/author-byline";
import { MetricRow } from "@/components/post/metric-row";
import { PostCover } from "@/components/post/post-cover";
import { CorrectedBadge } from "@/components/post/corrected-badge";
import { TopicBadge } from "@/components/post/topic-badge";
import type { PostSummary } from "@/lib/content";
import { formatCount, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type PostRowVariant = "list" | "card" | "mini";

/**
 * Horizontal post entry. `list` is the archive row, `card` the elevated row
 * beside the most-viewed hero, `mini` the sidebar item.
 */
export function PostRow({
  post,
  variant = "list",
  showMetrics = true,
  className,
}: {
  post: PostSummary;
  variant?: PostRowVariant;
  showMetrics?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className={cn(
        "group grid items-center",
        variant === "list" &&
          "grid-cols-[1fr_96px] gap-4 border-b border-line-1 py-5 sm:grid-cols-[1fr_168px] sm:gap-6 sm:py-6.5",
        variant === "card" &&
          "grid-cols-[1fr_88px] gap-3.5 rounded-lg border border-line-1 bg-bg-2 p-3.5 shadow-xs transition-[transform,box-shadow] duration-500 ease-bounce hover:-translate-y-1 hover:shadow-card-hover-md active:scale-[0.98] active:duration-150 active:ease-out sm:grid-cols-[1fr_104px] sm:gap-[18px] sm:p-[18px]",
        variant === "mini" && "grid-cols-[1fr_54px] gap-3.5 border-t border-line-1 py-3.5",
        className,
      )}
    >
      <div className="min-w-0">
        {variant === "list" ? (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <TopicBadge topic={post.topic} />
            <span className="text-[12.5px] text-fg-3">
              {formatDate(post.publishedAt)} · {post.readingMinutes} min read
            </span>
            {post.correctedAt ? <CorrectedBadge date={post.correctedAt} /> : null}
          </div>
        ) : null}

        {variant === "card" ? (
          <div className="flex flex-wrap items-center gap-2">
            <TopicBadge topic={post.topic} className="px-[11px] py-[5px]" />
            {post.correctedAt ? <CorrectedBadge date={post.correctedAt} /> : null}
          </div>
        ) : null}

        <h3
          className={cn(
            "font-bold text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong",
            variant === "list" && "mt-3.5 text-[22px] leading-[1.24] tracking-[-0.02em]",
            variant === "card" && "mt-3 text-[17px] leading-[1.28] tracking-[-0.015em]",
            variant === "mini" && "text-[13.5px] leading-[1.35] font-semibold",
          )}
        >
          {post.title}
        </h3>

        {variant === "list" ? (
          <p className="mt-2.5 max-w-[560px] text-[15px] leading-[1.6] text-fg-2">{post.dek}</p>
        ) : null}

        {variant === "card" ? (
          <AuthorByline date={post.publishedAt} size="xs" className="mt-3" />
        ) : null}

        {variant === "mini" ? (
          <p className="mt-1 text-[12px] text-fg-3">{formatCount(post.views)} views</p>
        ) : null}

        {showMetrics && variant === "list" ? (
          <MetricRow
            post={post}
            metrics={["likes", "comments", "views"]}
            bordered={false}
            className="mt-3.5"
          />
        ) : null}
        {showMetrics && variant === "card" ? (
          <MetricRow
            post={post}
            metrics={["likes", "views"]}
            bordered={false}
            className="mt-[13px] text-[12px]"
          />
        ) : null}
      </div>

      <PostCover
        topic={post.topic}
        image={post.coverImage}
        pattern={false}
        className={cn(
          variant === "list" && "aspect-[4/3] rounded-md",
          variant === "card" && "aspect-square rounded-md",
          variant === "mini" && "aspect-square rounded-sm",
        )}
      />
    </Link>
  );
}

/** Numbered “most read” entry — no artwork, just rank, title and an arrow. */
export function RankedPostRow({ post, rank }: { post: PostSummary; rank: number }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-line-1 px-1 py-4 transition-[padding,background-color] duration-500 ease-expo hover:bg-bg-2 hover:px-4 sm:grid-cols-[42px_1fr_auto] sm:gap-[18px] sm:px-1.5 sm:py-5"
    >
      <span className="font-display text-[20px] font-light text-fg-faint sm:text-[24px]">
        {String(rank).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="block text-[16.5px] font-semibold tracking-[-0.01em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
          {post.title}
        </span>
        <span className="mt-[5px] block text-[13px] text-fg-3">
          {post.topic} · {formatCount(post.views)} views
        </span>
      </span>
      <ArrowRight className="size-[17px] text-fg-faint" strokeWidth={1.75} />
    </Link>
  );
}
