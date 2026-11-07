"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";

import { YouTubeLogo } from "@/components/icons/social-icons";
import { teachingChannel } from "@/lib/content/config";
import { cn } from "@/lib/utils";

/**
 * A YouTube video inside an article.
 *
 * Until the reader presses play this is only a thumbnail and two links: no
 * YouTube script, cookie or iframe loads, so a post with a video is as light as
 * one without. Pressing play swaps in the youtube-nocookie player in place.
 * Without JavaScript the "Watch on YouTube" link still works.
 */
export function ArticleVideo({
  youtubeId,
  title,
  caption,
  variant,
}: {
  youtubeId: string;
  title: string;
  caption?: string;
  variant: "feature" | "compact";
}) {
  const [playing, setPlaying] = React.useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  const player = (
    <VideoFrame
      youtubeId={youtubeId}
      title={title}
      playing={playing}
      onPlay={() => setPlaying(true)}
    />
  );

  if (variant === "compact") {
    return (
      <aside
        aria-label="Video version of this article"
        className="my-8 overflow-hidden rounded-lg border border-line-1 bg-bg-2 shadow-sm"
      >
        {playing ? (
          player
        ) : (
          <div className="flex flex-col gap-4 p-3 sm:flex-row sm:items-center sm:gap-5">
            <div className="w-full shrink-0 sm:w-[200px]">{player}</div>
            <div className="min-w-0 px-1 pb-1 sm:px-0 sm:pb-0">
              <p className="flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.12em] text-fg-3 uppercase">
                <YouTubeLogo className="h-3 w-auto" />
                Prefer to watch?
              </p>
              <p className="mt-1.5 text-[16px] leading-snug font-semibold text-fg-1">{title}</p>
              {caption && <p className="mt-1 text-[14px] leading-relaxed text-fg-2">{caption}</p>}
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-fg-link hover:underline"
              >
                Open on YouTube
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        )}
      </aside>
    );
  }

  return (
    <figure className="my-10 overflow-hidden rounded-lg border border-white/10 bg-bg-inverse shadow-xl">
      {player}
      <figcaption className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.12em] text-white/60 uppercase">
            <YouTubeLogo className="h-3 w-auto" />
            {teachingChannel.name} on {teachingChannel.platform}
          </p>
          <p className="mt-1.5 text-[18px] leading-snug font-semibold text-white">{title}</p>
          {caption && (
            <p className="mt-1.5 max-w-[520px] text-[14.5px] leading-relaxed text-white/70">
              {caption}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-semibold text-n-900 transition-transform duration-300 ease-expo active:scale-[0.97]"
          >
            <YouTubeLogo className="h-3.5 w-auto" />
            Watch on YouTube
          </a>
          <a
            href={`${teachingChannel.url}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-1 text-[14px] font-semibold text-white/80 transition-colors duration-300 ease-expo hover:text-white"
          >
            Subscribe
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

function VideoFrame({
  youtubeId,
  title,
  playing,
  onPlay,
}: {
  youtubeId: string;
  title: string;
  playing: boolean;
  onPlay: () => void;
}) {
  if (playing) {
    return (
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-md bg-black"
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 780px) 780px, 100vw"
        className="object-cover opacity-90 transition-[opacity,transform] duration-500 ease-expo group-hover:scale-[1.02] group-hover:opacity-100"
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center rounded-full bg-youtube text-white shadow-lg transition-transform duration-300 ease-expo group-hover:scale-110 group-active:scale-[0.97]",
          "size-12 sm:size-16",
        )}
      >
        <Play className="ml-0.5 size-5 fill-current sm:size-7" />
      </span>
    </button>
  );
}
