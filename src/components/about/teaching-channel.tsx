import { ArrowUpRight } from "lucide-react";

import { YouTubeIcon } from "@/components/icons/social-icons";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { teachingChannel } from "@/lib/content";
import { cn } from "@/lib/utils";

const principleTone = [
  "bg-tint-cornflower text-fg-link",
  "bg-tint-violet text-brand-strong",
] as const;

/**
 * The teaching side of the work: Brain Link, on YouTube.
 *
 * Deliberately carries no subscriber or video counts. They would have to be
 * fetched or hand-maintained, and a stale number is worse than none.
 */
export function TeachingChannel() {
  const channel = teachingChannel;

  return (
    <MagicCard className="rounded-lg shadow-lg md:shadow-xl" surfaceClassName="bg-bg-2">
      <div className="p-5 sm:p-[clamp(28px,4vw,44px)]">
        <div className="flex items-center gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-tint-violet text-brand">
            <YouTubeIcon className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
              {channel.platform} channel
            </p>
            <h3 className="mt-0.5 text-[clamp(22px,2.6vw,28px)] leading-tight font-bold tracking-[-0.02em] text-fg-1">
              {channel.name}
            </h3>
          </div>
          <span className="ml-auto hidden font-mono text-[13px] text-fg-3 sm:block">
            {channel.handle}
          </span>
        </div>

        <p className="mt-6 font-mono text-[13.5px] font-semibold tracking-[0.02em] text-brand">
          {channel.tagline}
        </p>
        <p className="mt-3 max-w-[620px] text-[17px] leading-[1.7] text-fg-prose">
          {channel.summary}
        </p>
        <p className="mt-3 max-w-[620px] text-[15.5px] leading-[1.7] text-fg-2">
          Understanding, not memorizing. {channel.approach}
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {channel.principles.map((principle, index) => (
            <li key={principle} className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex size-[30px] shrink-0 items-center justify-center rounded-full font-mono text-[11.5px] font-bold",
                  principleTone[index % principleTone.length],
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-semibold text-fg-1">{principle}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-line-1 pt-6">
          <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
            What it covers
          </p>
          <ul className="mt-3.5 flex flex-wrap gap-2.5">
            {channel.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-line-1 bg-bg-1 px-3.5 py-2 text-[13px] text-fg-2"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="primary" size="md">
            <a href={channel.url} target="_blank" rel="noopener noreferrer">
              Watch on {channel.platform}
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </a>
          </Button>
          <p className="text-[13.5px] leading-[1.55] text-fg-3">{channel.audience}</p>
        </div>
      </div>
    </MagicCard>
  );
}
