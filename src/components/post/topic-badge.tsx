import type { TopicName } from "@/lib/content";
import { cn } from "@/lib/utils";

import { getTopicVisual } from "./topic-visuals";

type TopicBadgeTone = "soft" | "onImage" | "frosted";

/**
 * `soft` sits on a light surface, `onImage` on cover artwork, `frosted` is the
 * heavier glass treatment used on the large hero covers.
 */
export function TopicBadge({
  topic,
  tone = "soft",
  className,
}: {
  topic: TopicName;
  tone?: TopicBadgeTone;
  className?: string;
}) {
  const visual = getTopicVisual(topic);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-[11.5px] font-semibold",
        tone === "soft" && visual.badge,
        tone === "onImage" && cn("bg-white/95 shadow-xs", visual.ink),
        tone === "frosted" &&
          cn(
            "border border-white/70 bg-white/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] backdrop-blur-[16px] backdrop-saturate-[160%]",
            visual.ink,
          ),
        className,
      )}
    >
      {topic}
    </span>
  );
}
