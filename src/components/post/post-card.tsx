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
 * The blog's workhorse card. `grid` is a two-block overlap layout: the cover
 * is its own rounded surface, a second rounded panel overlaps its bottom
 * edge by 22px, and the metric row sits outside both, directly on the page
 * background — the depth reads from the overlap, not a shadow. `search` and
 * `compact` stay single-surface cards; they run too dense for a panel to
 * read as its own block.
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

  if (variant === "grid") {
    return (
      <Link
        href={`/articles/${post.slug}`}
        className={cn(
          "group block transition-transform duration-550 ease-bounce active:scale-[0.98] active:duration-150 active:ease-out",
          className,
        )}
      >
        <div className="transition-transform duration-550 ease-bounce group-hover:-translate-y-1.5">
          <PostCover
            topic={post.topic}
            image={post.coverImage}
            alt={post.title}
            notch
            className={cn(coverRatio.grid, "rounded-xl")}
          >
            <TopicBadge
              topic={post.topic}
              tone="dark"
              icon
              className="absolute top-3.5 right-3.5"
            />
          </PostCover>

          <div className="relative z-10 mx-4 -mt-[48px] overflow-hidden rounded-xl transition-shadow duration-500 ease-expo group-hover:shadow-card-hover-lg">
            <div className="overlap-panel bg-bg-2 px-6 pt-[46px] pb-5">
              <p className="text-[12.5px] text-fg-3">
                {formatDate(post.publishedAt)} · {post.readingMinutes} min read
              </p>
              <h3 className="mt-2 text-[18.5px] leading-tight font-bold tracking-[-0.015em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
                {post.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.55] text-fg-2">{post.dek}</p>
            </div>
          </div>
        </div>

        {showMetrics ? <MetricRow post={post} bordered={false} className="mt-4.5" /> : null}
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-line-1 transition-[transform,box-shadow] duration-550 ease-bounce hover:-translate-y-1.5 hover:shadow-card-hover-lg active:scale-[0.98] active:duration-150 active:ease-out",
        "bg-bg-2 shadow-sm",
        variant === "compact" && "bg-bg-1 shadow-none",
        className,
      )}
    >
      <PostCover
        topic={post.topic}
        image={post.coverImage}
        alt={post.title}
        notch={variant === "search"}
        className={coverRatio[variant]}
      >
        {variant === "search" ? (
          <TopicBadge topic={post.topic} tone="onImage" className="absolute top-3.5 right-3.5" />
        ) : null}
      </PostCover>

      <div
        className={cn(
          "flex flex-1 flex-col gap-2.5",
          variant === "search" && "p-[18px]",
          variant === "compact" && "p-[18px]",
        )}
      >
        {variant === "search" ? (
          <p className="text-[12.5px] text-fg-3">
            {formatDate(post.publishedAt)} · {post.readingMinutes} min
          </p>
        ) : null}

        {variant === "compact" ? (
          <p className={cn("text-[11.5px] font-semibold", visual.label)}>{post.topic}</p>
        ) : null}

        <h3
          className={cn(
            "leading-tight font-bold tracking-[-0.015em] text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong",
            variant === "search" && "text-[16.5px]",
            variant === "compact" && "text-[16px]",
          )}
        >
          {post.title}
        </h3>

        {variant === "compact" ? (
          <p className="text-[12.5px] text-fg-3">
            {formatDate(post.publishedAt)} · {post.readingMinutes} min read
          </p>
        ) : null}

        {showMetrics && variant === "search" ? <MetricRow post={post} metrics={["likes"]} /> : null}
      </div>
    </Link>
  );
}
