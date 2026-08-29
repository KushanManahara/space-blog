"use client";

import * as React from "react";
import {
  FastForward,
  Headphones,
  LocateFixed,
  Pause,
  Play,
  Rewind,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

import { useArticleAudio, type CharRange } from "@/components/article/article-audio-provider";
import { formatAudioTime } from "@/lib/audio/article-narrator";
import { cn } from "@/lib/utils";

const PLAYBACK_RATES = [0.75, 1.0, 1.25, 1.5, 2.0];

/**
 * Renders spoken text with the currently active word illuminated in real time.
 */
function HighlightedSpokenText({
  text,
  charRange,
  enabled,
}: {
  text: string;
  charRange: CharRange | null;
  enabled: boolean;
}) {
  if (!enabled || !charRange || charRange.start < 0 || charRange.start >= text.length) {
    return <span className="truncate">{text}</span>;
  }

  const start = Math.max(0, charRange.start);
  const end = Math.min(text.length, start + charRange.length);

  const before = text.slice(0, start);
  const word = text.slice(start, end);
  const after = text.slice(end);

  return (
    <span className="truncate">
      <span>{before}</span>
      <mark className="mx-0.5 rounded bg-brand/30 px-1 py-0.5 font-bold text-brand shadow-xs dark:bg-brand/40 dark:text-brand-strong">
        {word}
      </mark>
      <span>{after}</span>
    </span>
  );
}

/**
 * Floating, high-fidelity audio player bar for article narration with:
 * - Real-time spoken word highlighting
 * - "Jump to Line in Article" auto-scroll navigation
 * - Speed switcher (0.75x - 2.0x)
 * - Interactive scrubber and media transport
 */
export function ArticleAudioPlayer() {
  const audio = useArticleAudio();
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  if (!audio || !audio.isSupported || !audio.isAudioActive) {
    return null;
  }

  const {
    isPlaying,
    currentSegment,
    currentCharRange,
    isWordHighlightEnabled,
    rate,
    progress,
    elapsedSec,
    totalSec,
    audioData,
    togglePlayPause,
    skipForward,
    skipBackward,
    seekToProgress,
    setRate,
    toggleWordHighlight,
    scrollToCurrentSegment,
    closePlayer,
  } = audio;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    seekToProgress(fraction);
  };

  const nextRate = () => {
    const currentIndex = PLAYBACK_RATES.indexOf(rate);
    const nextIdx = (currentIndex + 1) % PLAYBACK_RATES.length;
    const chosenRate = PLAYBACK_RATES[nextIdx];
    if (chosenRate !== undefined) {
      setRate(chosenRate);
    }
  };

  return (
    <aside
      aria-label="Article Audio Narrator"
      className="fixed inset-x-0 bottom-4 z-[120] mx-auto w-[calc(100%-1.5rem)] max-w-2xl px-2 sm:bottom-6 print:hidden"
    >
      <div className="relative overflow-hidden rounded-2xl border border-line-1/80 bg-bg-1/95 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-300 dark:border-white/12 dark:bg-bg-2/95 dark:shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
        {/* Scrubber Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleProgressClick}
          role="slider"
          aria-label="Audio progress scrubber"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          className="group relative h-1.5 w-full cursor-pointer bg-line-1 transition-[height] hover:h-2.5 dark:bg-white/10"
        >
          <div
            className="h-full bg-brand transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(1, progress * 100)}%` }}
          />
          {/* Scrubber thumb */}
          <div
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-0 shadow-md ring-2 ring-white transition-opacity group-hover:opacity-100 dark:ring-black"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        {/* Main Controls Layout */}
        <div className="flex items-center justify-between gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
          {/* Left: Indicator & Spoken Segment Text */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            {/* Animated Equalizer or Headphone Icon */}
            <div className="relative flex size-8.5 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand dark:bg-brand/20">
              {isPlaying ? (
                <div className="flex h-3.5 items-end gap-0.5">
                  <span
                    className="w-0.5 animate-[pulse_0.6s_ease-in-out_infinite] rounded-full bg-brand"
                    style={{ height: "60%" }}
                  />
                  <span
                    className="w-0.5 animate-[pulse_0.9s_ease-in-out_infinite] rounded-full bg-brand"
                    style={{ height: "100%" }}
                  />
                  <span
                    className="w-0.5 animate-[pulse_0.7s_ease-in-out_infinite] rounded-full bg-brand"
                    style={{ height: "40%" }}
                  />
                  <span
                    className="w-0.5 animate-[pulse_0.8s_ease-in-out_infinite] rounded-full bg-brand"
                    style={{ height: "80%" }}
                  />
                </div>
              ) : (
                <Headphones className="size-4" strokeWidth={2} />
              )}
            </div>

            {/* Clickable Subtitle / Live Spoken Line (Click to Jump in Article) */}
            <button
              type="button"
              onClick={scrollToCurrentSegment}
              title="Click to jump to this line in article"
              aria-label="Click to jump to currently spoken line in article"
              className="min-w-0 flex-1 cursor-pointer text-left transition-opacity hover:opacity-80 active:scale-[0.99]"
            >
              <p className="truncate text-[13px] leading-snug font-semibold text-fg-1">
                {currentSegment?.text ? (
                  <HighlightedSpokenText
                    text={currentSegment.text}
                    charRange={currentCharRange}
                    enabled={isWordHighlightEnabled}
                  />
                ) : (
                  audioData.title
                )}
              </p>
              <p className="flex items-center gap-1.5 truncate text-[11px] font-medium text-fg-3">
                <span>{currentSegment?.label ?? "Reading aloud"}</span>
                <span className="opacity-40">·</span>
                <span className="text-brand hover:underline">Jump to line ↗</span>
              </p>
            </button>
          </div>

          {/* Center: Audio Transport Controls */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            {/* Skip Backward 10s */}
            <button
              type="button"
              onClick={skipBackward}
              title="Previous section"
              aria-label="Previous section"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-black/5 hover:text-fg-1 active:scale-95 dark:hover:bg-white/10"
            >
              <Rewind className="size-3.5" strokeWidth={2} />
            </button>

            {/* Main Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlayPause}
              title={isPlaying ? "Pause Narration" : "Play Narration"}
              aria-label={isPlaying ? "Pause Narration" : "Play Narration"}
              className="inline-flex size-9.5 cursor-pointer items-center justify-center rounded-full bg-brand text-on-brand shadow-md shadow-brand/25 transition-[transform,background-color] duration-200 ease-expo hover:bg-brand-strong active:scale-95"
            >
              {isPlaying ? (
                <Pause className="size-4.5 fill-current" />
              ) : (
                <Play className="size-4.5 translate-x-0.5 fill-current" />
              )}
            </button>

            {/* Skip Forward 10s */}
            <button
              type="button"
              onClick={skipForward}
              title="Next section"
              aria-label="Next section"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-black/5 hover:text-fg-1 active:scale-95 dark:hover:bg-white/10"
            >
              <FastForward className="size-3.5" strokeWidth={2} />
            </button>
          </div>

          {/* Right: Jump to Line Button, Word Highlight Toggle, Speed & Close */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            {/* Jump to currently reading line in article button */}
            <button
              type="button"
              onClick={scrollToCurrentSegment}
              title="Jump to current line in article"
              aria-label="Jump to current line in article"
              className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-2 transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand active:scale-95 dark:border-white/10"
            >
              <LocateFixed className="size-3.5" strokeWidth={2} />
            </button>

            {/* Toggle Word Highlighting */}
            <button
              type="button"
              onClick={toggleWordHighlight}
              title={isWordHighlightEnabled ? "Word highlight enabled" : "Word highlight disabled"}
              aria-label={
                isWordHighlightEnabled ? "Disable word highlighting" : "Enable word highlighting"
              }
              className={cn(
                "hidden size-7.5 cursor-pointer items-center justify-center rounded-full border transition-colors active:scale-95 sm:inline-flex",
                isWordHighlightEnabled
                  ? "border-brand/50 bg-brand/15 text-brand dark:border-brand/40 dark:bg-brand/20"
                  : "border-line-1 bg-bg-2 text-fg-3 hover:text-fg-1 dark:border-white/10",
              )}
            >
              <Sparkles className="size-3.5" strokeWidth={1.75} />
            </button>

            {/* Reading Speed Switcher */}
            <button
              type="button"
              onClick={nextRate}
              title="Change reading speed"
              aria-label={`Reading speed: ${rate}x`}
              className="inline-flex h-7.5 cursor-pointer items-center justify-center rounded-full border border-line-1 bg-bg-2 px-2 font-mono text-[11px] font-semibold text-fg-2 transition-colors hover:border-line-2 hover:text-fg-1 active:scale-95 dark:border-white/10"
            >
              {rate}x
            </button>

            {/* Close / Dismiss */}
            <button
              type="button"
              onClick={closePlayer}
              title="Close audio player"
              aria-label="Close audio player"
              className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-full text-fg-3 transition-colors hover:bg-black/5 hover:text-fg-1 active:scale-95 dark:hover:bg-white/10"
            >
              <X className="size-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
