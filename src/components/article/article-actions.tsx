"use client";

import * as React from "react";
import { Eye, Heart, MessageSquare, Share } from "lucide-react";

import { ShareSheet } from "@/components/article/share-sheet";
import { useSavedPosts } from "@/components/providers/saved-posts-provider";
import { IconToggle } from "@/components/ui/icon-toggle";
import type { PostSummary } from "@/lib/content";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Like, comment count, views and share — the rail under the article byline. */
export function ArticleActions({ post }: { post: PostSummary }) {
  const { isLiked, toggleLiked } = useSavedPosts();
  const [shareOpen, setShareOpen] = React.useState(false);
  const liked = isLiked(post.slug);

  return (
    <div className="ml-auto flex items-center gap-2">
      <button
        type="button"
        aria-pressed={liked}
        onClick={() => toggleLiked(post.slug)}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-[background-color,color,transform] duration-300 ease-bounce active:scale-[0.96] active:duration-150 active:ease-out",
          liked
            ? "border-line-brand bg-tint-violet text-brand-strong"
            : "border-line-1 bg-bg-2 text-fg-2",
        )}
      >
        <IconToggle icon={Heart} active={liked} className="size-[15px]" />
        {post.likes + (liked ? 1 : 0)}
      </button>

      <a
        href="#responses"
        className="inline-flex items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-4 py-2.5 text-[13.5px] font-semibold text-fg-2 transition-shadow duration-300 ease-expo hover:shadow-sm"
      >
        <MessageSquare className="size-[15px]" strokeWidth={1.75} />
        {post.commentCount}
      </a>

      <span className="inline-flex items-center gap-2 px-1.5 py-2.5 text-[13.5px] text-fg-3">
        <Eye className="size-[15px]" strokeWidth={1.75} />
        {formatCount(post.views)}
      </span>

      <button
        type="button"
        onClick={() => setShareOpen(true)}
        aria-label="Share this post"
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-2 transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out"
      >
        <Share className="size-4" strokeWidth={1.75} />
      </button>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={post.title}
        url={`https://space.dev/articles/${post.slug}`}
      />
    </div>
  );
}
