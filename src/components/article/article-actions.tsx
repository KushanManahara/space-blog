"use client";

import * as React from "react";
import { BookOpen, Eye, Heart, MessageSquare, Share } from "lucide-react";

import { likePostAction } from "@/app/actions";
import { useReaderMode } from "@/components/article/reader-mode-provider";
import { ShareSheet } from "@/components/article/share-sheet";
import { useSavedPosts } from "@/components/providers/saved-posts-provider";
import { IconToggle } from "@/components/ui/icon-toggle";
import { siteUrl, type PostSummary } from "@/lib/content";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Like, comment count, views, reader mode and share — the rail under the article byline. */
export function ArticleActions({ post }: { post: PostSummary }) {
  const { toggleReaderMode } = useReaderMode();
  const { isLiked, toggleLiked } = useSavedPosts();
  const [shareOpen, setShareOpen] = React.useState(false);
  const liked = isLiked(post.slug);

  const [optimisticLikes, setOptimisticLikes] = React.useOptimistic(
    post.likes,
    (current: number, change: number) => Math.max(0, current + change),
  );

  const handleLike = () => {
    const willLike = !liked;
    toggleLiked(post.slug);
    React.startTransition(async () => {
      setOptimisticLikes(willLike ? 1 : -1);
      await likePostAction(post.slug, willLike);
    });
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:ml-auto sm:w-auto sm:justify-start">
      <button
        type="button"
        onClick={toggleReaderMode}
        title="Distraction-Free Reader Mode (Press R)"
        aria-label="Distraction-Free Reader Mode (Press R)"
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-3.5 py-2 text-[13.5px] font-semibold text-fg-2 transition-[transform,box-shadow,color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out"
      >
        <BookOpen className="size-4" strokeWidth={1.75} />
        <span className="hidden sm:inline">Read mode</span>
        <kbd className="hidden rounded border border-line-1 bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-fg-3 lg:inline-flex dark:bg-white/10">
          R
        </kbd>
      </button>
      <button
        type="button"
        aria-pressed={liked}
        onClick={handleLike}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-[background-color,color,transform,border-color] duration-300 ease-bounce active:scale-[0.96] active:duration-150 active:ease-out",
          liked
            ? "border-line-brand bg-tint-violet text-brand-strong"
            : "border-line-1 bg-bg-2 text-fg-2 hover:border-line-2",
        )}
      >
        <IconToggle icon={Heart} active={liked} className="size-[15px]" />
        <span>{optimisticLikes}</span>
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
        url={`${siteUrl}/articles/${post.slug}`}
      />
    </div>
  );
}
