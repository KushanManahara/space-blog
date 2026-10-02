"use client";

import { Eye, Heart, MessageSquare } from "lucide-react";

import { useSavedPosts } from "@/components/providers/saved-posts-provider";
import { SaveButton } from "@/components/post/save-button";
import { IconToggle } from "@/components/ui/icon-toggle";
import type { PostSummary } from "@/lib/content";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

type Metric = "likes" | "comments" | "views";

/** Engagement strip shared by every card, row and list item. */
export function MetricRow({
  post,
  metrics = ["likes", "comments"],
  showSave = true,
  bordered = true,
  className,
}: {
  post: PostSummary;
  metrics?: readonly Metric[];
  showSave?: boolean;
  bordered?: boolean;
  className?: string;
}) {
  const { isLiked } = useSavedPosts();
  const liked = isLiked(post.slug);

  /*
   * Zero counts are left out rather than shown. A row of "♡ 0  💬 0  👁 0"
   * chips reads as an empty, unloved post, and it is also exactly what every
   * post shows when the live stats store is unreachable — so a zero here says
   * nothing a reader can use. A post the reader has liked always keeps its
   * heart, since that chip is also their own state.
   */
  const show = {
    likes: metrics.includes("likes") && (post.likes > 0 || liked),
    comments: metrics.includes("comments") && post.commentCount > 0,
    views: metrics.includes("views") && post.views > 0,
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[12.5px] text-fg-3",
        bordered && "mt-auto border-t border-line-1 pt-4",
        className,
      )}
    >
      {show.likes ? (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5",
            liked ? "bg-tint-violet text-brand-strong" : "bg-bg-3 text-fg-3",
          )}
        >
          <IconToggle icon={Heart} active={liked} className="size-3.5" />
          {post.likes}
        </span>
      ) : null}

      {show.comments ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-3 px-2.5 py-1.5">
          <MessageSquare className="size-3.5" strokeWidth={1.75} />
          {post.commentCount}
        </span>
      ) : null}

      {show.views ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-3 px-2.5 py-1.5">
          <Eye className="size-3.5" strokeWidth={1.75} />
          {formatCount(post.views)}
        </span>
      ) : null}

      <span className="ml-auto inline-flex items-center gap-2.5 whitespace-nowrap">
        <span>{post.readingMinutes} min read</span>
        {showSave ? <SaveButton slug={post.slug} title={post.title} /> : null}
      </span>
    </div>
  );
}
