"use client";

import * as React from "react";
import { BookOpen, Share, Sparkles } from "lucide-react";

import { useReaderMode } from "@/components/article/reader-mode-provider";
import { useReadingProgress } from "@/components/article/reading-progress";
import { ShareSheet } from "@/components/article/share-sheet";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { PostCover } from "@/components/post/post-cover";
import { siteUrl, type PostSummary } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * True once the page footer is within 200px of entering the viewport. The
 * scroll-based `progress` value alone can't tell us this — it's derived from
 * the article body's own position and stays pinned near 1 for the entire
 * "Keep reading" + footer stretch below the body, which is exactly the
 * section this bar must never cover.
 */
function useFooterApproaching(): boolean {
  const [approaching, setApproaching] = React.useState(false);

  React.useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setApproaching(entry.isIntersecting), {
      rootMargin: "0px 0px 200px 0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return approaching;
}

/**
 * Detects whether the user has scrolled past the main article text and
 * moved into the author card, comments (#responses), or recommendations area.
 */
function useCommentsEntered(): boolean {
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    const responses = document.getElementById("responses");
    if (!responses) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Entered when the responses section top reaches the upper half of viewport
        setEntered(entry.boundingClientRect.top <= window.innerHeight * 0.7);
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    observer.observe(responses);
    return () => observer.disconnect();
  }, []);

  return entered;
}

/** Mini circular SVG progress indicator */
function ProgressRing({ progress }: { progress: number }) {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - Math.min(1, Math.max(0, progress)) * circumference;

  return (
    <div className="relative inline-flex size-4.5 items-center justify-center">
      <svg className="size-4.5 -rotate-90" viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.2"
          className="text-line-2"
          fill="none"
        />
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-brand transition-all duration-150 ease-out"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * High-visibility, dynamic floating reading dock.
 * When reading the article: shows both Active Reading Controls & Up Next pill.
 * When entering the comments area: current reading tools smoothly fade away, and
 * the Up Next recommendation cleanly centers in the page.
 */
export function ReadingBar({ post, next }: { post: PostSummary; next: PostSummary }) {
  const { toggleReaderMode } = useReaderMode();
  const { progress } = useReadingProgress();
  const [shareOpen, setShareOpen] = React.useState(false);
  const footerApproaching = useFooterApproaching();
  const commentsEntered = useCommentsEntered();

  const isPastArticle = progress >= 0.95 || commentsEntered;

  if (progress <= 0.04) return null;

  return (
    <aside
      aria-label="Reading toolbar"
      aria-hidden={footerApproaching}
      inert={footerApproaching}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-70 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.875rem)] transition-[opacity,translate] duration-300 ease-out sm:px-4 sm:pb-5",
        footerApproaching
          ? "translate-y-3 opacity-0"
          : "translate-y-0 [animation:bar-up_.4s_var(--ease-expo)] opacity-100",
      )}
    >
      <div className="flex w-full max-w-[840px] items-center justify-center transition-all duration-500 ease-expo">
        {/* POD 1: Current Reading Controls (Fades and slides away when reaching comments) */}
        <div
          className={cn(
            "flex items-center rounded-full border border-line-2/80 bg-bg-1/95 backdrop-blur-2xl transition-all duration-500 ease-expo dark:bg-bg-2/95",
            "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.16),0_6px_16px_-4px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.06)]",
            "dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_8px_20px_-6px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)]",
            isPastArticle
              ? "pointer-events-none mr-0 max-w-0 -translate-x-8 scale-90 overflow-hidden border-transparent px-0 py-0 opacity-0"
              : "pointer-events-auto mr-2.5 max-w-[340px] translate-x-0 scale-100 px-3 py-1.5 opacity-100 sm:mr-3 sm:px-3.5 sm:py-2",
          )}
        >
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Progress Indicator */}
            <div className="flex items-center gap-2 pr-1">
              <ProgressRing progress={progress} />
              <span className="font-mono text-[12px] font-bold tracking-tight text-fg-1">
                {Math.round(progress * 100)}%
              </span>
            </div>

            <div className="h-4 w-px bg-line-2" />

            {/* Reader Mode Trigger */}
            <button
              type="button"
              onClick={toggleReaderMode}
              title="Focus Reader Mode (Press R)"
              aria-label="Focus Reader Mode (Press R)"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold text-fg-2 transition-[background-color,color,transform] hover:bg-bg-3 hover:text-brand active:scale-95"
            >
              <BookOpen className="size-3.5" strokeWidth={1.8} />
              <span className="hidden md:inline">Focus mode</span>
            </button>

            {/* Share Trigger */}
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              title="Share this article"
              aria-label="Share this article"
              className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-full text-fg-2 transition-[background-color,color,transform] hover:bg-bg-3 hover:text-fg-1 active:scale-95"
            >
              <Share className="size-3.5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* POD 2: Up Next Recommendation (Expands and centers when Pod 1 disappears) */}
        <div
          className={cn(
            "pointer-events-auto flex min-w-0 items-center gap-2.5 rounded-full border border-line-2/80 bg-bg-1/95 backdrop-blur-2xl transition-all duration-500 ease-expo sm:gap-3 dark:bg-bg-2/95",
            "shadow-[0_16px_36px_-6px_rgba(0,0,0,0.16),0_6px_16px_-4px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.06)]",
            "dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_8px_20px_-6px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)]",
            isPastArticle
              ? "w-full max-w-[560px] py-2 pr-2 pl-4.5 shadow-2xl ring-2 ring-brand/20 sm:py-2.5 sm:pr-2.5 sm:pl-5"
              : "max-w-[440px] flex-1 py-1.5 pr-1.5 pl-3.5 sm:py-2 sm:pr-2 sm:pl-4",
          )}
        >
          <PostCover
            topic={next.topic}
            image={next.coverImage}
            alt={next.title}
            zoom={false}
            className={cn(
              "shrink-0 rounded-full border border-line-1/80 shadow-2xs sm:size-9",
              isPastArticle ? "block size-8.5" : "hidden size-8.5 sm:block",
            )}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              {isPastArticle ? <Sparkles className="size-3 shrink-0 text-brand" /> : null}
              <p className="text-[10px] leading-tight font-bold tracking-[0.14em] text-brand uppercase">
                {isPastArticle
                  ? next.series
                    ? "Completed · Next in series"
                    : "Finished reading · Up next"
                  : next.series
                    ? "Next in series"
                    : "Up next"}
              </p>
            </div>
            <p
              className={cn(
                "mt-0.5 truncate leading-tight font-semibold text-fg-1",
                isPastArticle ? "text-[14px]" : "text-[13px]",
              )}
            >
              {next.title}
            </p>
          </div>

          <InteractiveHoverButton
            href={`/articles/${next.slug}`}
            variant={isPastArticle ? "primary" : "ink"}
            className={cn(
              "shrink-0 shadow-xs",
              isPastArticle
                ? "px-4 py-2 text-[13px] sm:px-5 sm:py-2.5"
                : "px-3.5 py-1.5 text-[12.5px] sm:px-4 sm:py-2",
            )}
          >
            {isPastArticle ? "Read next article" : "Read"}
          </InteractiveHoverButton>
        </div>
      </div>

      <ShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={post.title}
        url={`${siteUrl}/articles/${post.slug}`}
      />
    </aside>
  );
}
