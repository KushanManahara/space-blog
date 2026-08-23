import type { TopicName } from "@/lib/content";
import { cn } from "@/lib/utils";

import { getTopicVisual } from "./topic-visuals";

type TopicBadgeTone = "soft" | "onImage" | "frosted" | "dark";

/**
 * `soft` sits on a light surface, `onImage` on cover artwork, `frosted` is the
 * heavier glass treatment used on the large hero covers, `dark` is the
 * monochrome ink chip used for the bottom-left pill on the overlap-panel
 * cards — one tone regardless of topic, so it stays legible over any cover
 * gradient rather than needing a per-topic tint.
 */
export function TopicBadge({
  topic,
  tone = "soft",
  icon = false,
  className,
}: {
  topic: TopicName;
  tone?: TopicBadgeTone;
  /** Prefixes the topic's glyph from topic-visuals. Only wired for `dark` so far. */
  icon?: boolean;
  className?: string;
}) {
  const visual = getTopicVisual(topic);
  const TopicIcon = visual.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold",
        tone === "soft" && visual.badge,
        tone === "onImage" && cn("bg-white/95 shadow-xs", visual.ink),
        tone === "frosted" &&
          cn(
            "border border-white/70 bg-white/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] backdrop-blur-[16px] backdrop-saturate-[160%]",
            visual.ink,
          ),
        tone === "dark" &&
          "border border-white/10 bg-ink/90 px-3.5 py-2 text-on-ink backdrop-blur-[14px] backdrop-saturate-[140%]",
        className,
      )}
    >
      {icon ? <TopicIcon className="size-3.5" strokeWidth={1.75} /> : null}
      {topic}
    </span>
  );
}
