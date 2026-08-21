import Link from "next/link";

import { MetricRow } from "@/components/post/metric-row";
import { PostCover } from "@/components/post/post-cover";
import { TopicBadge } from "@/components/post/topic-badge";
import { getTopicVisual } from "@/components/post/topic-visuals";
import type { PostSummary } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type PostCardVariant = "grid" | "search" | "compact";

const coverRatio: Record<PostCardVariant, string> = {
  grid: "aspect-[16/10]",
  search: "aspect-[3/2]",
  compact: "aspect-[3/2]",
};

/**
 * The blog's workhorse card. Variants change the cover ratio and how much
 * metadata is shown; the surface, hover lift and title treatment stay constant.
 */
export function PostCard({
  post,
  variant = "grid",
  showMetrics = true,
  className,
}: {
  post: PostSummary;
  variant?: PostCardVariant;
  showMetrics?: boolean;
  className?: string;
}) {
  const visual = getTopicVisual(post.topic);

  return (
    <Link
      href={`/articles/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-line-1 transition-[transform,box-shadow] duration-[550ms] ease-bounce hover:-translate-y-1.5 hover:shadow-card-hover-lg active:scale-[0.98] active:duration-150 active:ease-out",
        "bg-bg-2 shadow-sm",
        variant === "compact" && "bg-bg-1 shadow-none",
        className,
      )}
    >
      <PostCover
        topic={post.topic}
        image={post.coverImage}
        alt={post.title}
        className={coverRatio[variant]}
      >
        {variant !== "compact" ? (
          <TopicBadge topic={post.topic} tone="onImage" className="absolute top-3.5 left-3.5" />
        ) : null}
      </PostCover>

      <div
        className={cn(
          "flex flex-1 flex-col gap-2.5",
          variant === "grid" && "p-5 pb-[18px]",
          variant === "search" && "p-[18px]",
          variant === "compact" && "p-[18px]",
        )}
      >
        {variant === "grid" || variant === "search" ? (
          <p className="text-[12.5px] text-fg-3">
            {formatDate(post.publishedAt)} · {post.readingMinutes} min
            {variant === "grid" ? " read" : ""}
          </p>
        ) : null}

        {variant === "compact" ? (
          <p className={cn("text-[11.5px] font-semibold", visual.label)}>{post.topic}</p>
        ) : null}

        <h3
          className={cn(
            "leading-tight font-bold tracking-[-0.015em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong",
            variant === "grid" && "text-[18.5px]",
            variant === "search" && "text-[16.5px]",
            variant === "compact" && "text-[16px]",
          )}
        >
          {post.title}
        </h3>

        {variant === "grid" ? (
          <p className="text-[14.5px] leading-[1.55] text-fg-2">{post.dek}</p>
        ) : null}

        {variant === "compact" ? (
          <p className="text-[12.5px] text-fg-3">
            {formatDate(post.publishedAt)} · {post.readingMinutes} min read
          </p>
        ) : null}

        {showMetrics && variant === "grid" ? <MetricRow post={post} /> : null}
        {showMetrics && variant === "search" ? <MetricRow post={post} metrics={["likes"]} /> : null}
      </div>
    </Link>
  );
}
