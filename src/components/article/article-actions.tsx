"use client";

import * as React from "react";
import {
  BookOpen,
  Check,
  Copy,
  Eye,
  Headphones,
  Heart,
  MessageSquare,
  Pause,
  Printer,
  Share,
} from "lucide-react";

import { likePostAction } from "@/app/actions";
import { useArticleAudio } from "@/components/article/article-audio-provider";
import { useReaderMode } from "@/components/article/reader-mode-provider";
import { ShareSheet } from "@/components/article/share-sheet";
import { useSavedPosts } from "@/components/providers/saved-posts-provider";
import { IconToggle } from "@/components/ui/icon-toggle";
import {
  copyArticleToClipboard,
  getPostBySlug,
  siteUrl,
  type Post,
  type PostSummary,
} from "@/lib/content";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Like, comment count, views, reader mode, print, copy and share — the rail under the article byline. */
export function ArticleActions({ post }: { post: PostSummary | Post }) {
  const { toggleReaderMode } = useReaderMode();
  const audio = useArticleAudio();
  const { isLiked, toggleLiked } = useSavedPosts();
  const [shareOpen, setShareOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const liked = isLiked(post.slug);

  // `post.likes` is the build-time value: article pages are statically
  // generated with a 60s revalidate, so it does not change when the write
  // lands. `useOptimistic` therefore snapped the count back to the old number
  // as soon as the transition settled, and a like looked like it did nothing.
  // The server now returns the stored count and it is held here instead.
  const [storedLikes, setStoredLikes] = React.useState<number | null>(null);
  const [likeNotice, setLikeNotice] = React.useState<string | null>(null);
  const likes = storedLikes ?? post.likes;

  React.useEffect(() => {
    setStoredLikes(null);
  }, [post.slug]);

  const handleLike = () => {
    const willLike = !liked;
    const optimistic = Math.max(0, likes + (willLike ? 1 : -1));

    toggleLiked(post.slug);
    setStoredLikes(optimistic);
    setLikeNotice(null);

    React.startTransition(async () => {
      const result = await likePostAction(post.slug, willLike);

      if (!result.success) {
        // Put the button back rather than leaving a count the server never
        // accepted — and say why, because silently snapping back is
        // indistinguishable from the feature being broken.
        toggleLiked(post.slug);
        setStoredLikes(likes);
        setLikeNotice(
          result.limited
            ? "That is plenty of likes from here today."
            : "Could not save that just now.",
        );
        setTimeout(() => setLikeNotice(null), 4000);
        return;
      }

      if (typeof result.likes === "number") setStoredLikes(result.likes);
    });
  };

  const handleCopyPage = async () => {
    const fullPost = "body" in post ? (post as Post) : getPostBySlug(post.slug);
    if (!fullPost) return;

    const ok = await copyArticleToClipboard(fullPost);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:ml-auto sm:w-auto sm:justify-start">
      {/* 0. Listen / Audio Read */}
      {audio?.isSupported !== false ? (
        <button
          type="button"
          onClick={audio?.togglePlayPause}
          title={audio?.isPlaying ? "Pause narration" : "Listen to article audio"}
          aria-label={audio?.isPlaying ? "Pause article narration" : "Listen to article narration"}
          className={cn(
            "inline-flex size-10 cursor-pointer items-center justify-center gap-2 rounded-full border text-[13.5px] font-semibold transition-[background-color,transform,box-shadow,color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out sm:size-auto sm:px-3.5 sm:py-2",
            audio?.isPlaying
              ? "border-brand/50 bg-brand/10 text-brand dark:border-brand/40 dark:bg-brand/20"
              : "border-line-1 bg-bg-2 text-fg-2 hover:border-brand/40 hover:text-brand",
          )}
        >
          {audio?.isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Headphones className="size-4" strokeWidth={1.75} />
          )}
          <span className="hidden sm:inline">{audio?.isPlaying ? "Listening…" : "Listen"}</span>
        </button>
      ) : null}

      {/* 1. Focus Read Mode */}
      <button
        type="button"
        onClick={toggleReaderMode}
        title="Distraction-Free Reader Mode (Press R)"
        aria-label="Distraction-Free Reader Mode (Press R)"
        className="inline-flex size-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-line-1 bg-bg-2 text-[13.5px] font-semibold text-fg-2 transition-[transform,box-shadow,color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out sm:size-auto sm:px-3.5 sm:py-2"
      >
        <BookOpen className="size-4" strokeWidth={1.75} />
        <span className="hidden sm:inline">Read mode</span>
        <kbd className="hidden rounded border border-line-1 bg-black/5 px-1.5 py-0.5 font-mono text-[10px] text-fg-3 lg:inline-flex dark:bg-white/10">
          R
        </kbd>
      </button>

      {/* 2. Copy Page with Watermark */}
      <button
        type="button"
        onClick={handleCopyPage}
        title="Copy article with watermark & copyright notice"
        aria-label="Copy full article with watermark"
        className={cn(
          "inline-flex size-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border text-[13.5px] font-semibold transition-[background-color,transform,box-shadow,color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out sm:size-auto sm:px-3.5 sm:py-2",
          copied
            ? "border-emerald-500/50 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-300"
            : "border-line-1 bg-bg-2 text-fg-2 hover:border-line-2 hover:text-fg-1",
        )}
      >
        {copied ? (
          <>
            <Check className="size-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="size-4" strokeWidth={1.75} />
            <span className="hidden sm:inline">Copy page</span>
          </>
        )}
      </button>

      {/* 3. Print Article */}
      <button
        type="button"
        onClick={handlePrint}
        title="Print article (⌘P / Ctrl+P)"
        aria-label="Print this article"
        className="inline-flex size-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-line-1 bg-bg-2 text-[13.5px] font-semibold text-fg-2 transition-[transform,box-shadow,color,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:border-line-2 hover:text-fg-1 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out sm:size-auto sm:px-3.5 sm:py-2"
      >
        <Printer className="size-4" strokeWidth={1.75} />
        <span className="hidden sm:inline">Print</span>
      </button>

      {/* 4. Likes */}
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Unlike this article" : "Like this article"}
        onClick={handleLike}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-[background-color,color,transform,border-color] duration-300 ease-bounce active:scale-[0.96] active:duration-150 active:ease-out",
          liked
            ? "border-line-brand bg-tint-violet text-brand-strong"
            : "border-line-1 bg-bg-2 text-fg-2 hover:border-line-2",
        )}
      >
        <IconToggle icon={Heart} active={liked} className="size-[15px]" />
        <span>{likes}</span>
      </button>

      {likeNotice ? (
        <span role="status" className="text-[12.5px] text-fg-3">
          {likeNotice}
        </span>
      ) : null}

      {/* 5. Responses Link */}
      <a
        href="#responses"
        className="inline-flex items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-4 py-2.5 text-[13.5px] font-semibold text-fg-2 transition-shadow duration-300 ease-expo hover:shadow-sm"
      >
        <MessageSquare className="size-[15px]" strokeWidth={1.75} />
        {post.commentCount}
      </a>

      {/* 6. View Count */}
      <span className="inline-flex items-center gap-2 px-1.5 py-2.5 text-[13.5px] text-fg-3">
        <Eye className="size-[15px]" strokeWidth={1.75} />
        {formatCount(post.views)}
      </span>

      {/* 7. Share Modal */}
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
        slug={post.slug}
      />
    </div>
  );
}
