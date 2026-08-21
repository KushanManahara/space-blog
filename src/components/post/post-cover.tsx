import type { TopicName } from "@/lib/content";
import { cn } from "@/lib/utils";

import { getTopicVisual } from "./topic-visuals";

/**
 * Gradient cover artwork. `zoom` opts the image into the group hover scale used
 * by cards and rows; `pattern` adds the topic's texture overlay.
 */
export function PostCover({
  topic,
  className,
  pattern = true,
  zoom = true,
  children,
}: {
  topic: TopicName;
  className?: string;
  pattern?: boolean;
  zoom?: boolean;
  children?: React.ReactNode;
}) {
  const visual = getTopicVisual(topic);

  return (
    <div className={cn("relative overflow-hidden bg-bg-3", className)}>
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-[800ms] ease-expo",
          zoom && "group-hover:scale-[1.045]",
        )}
        style={{ background: visual.cover }}
      >
        <div className="cover-sheen absolute inset-0" />
        {pattern ? (
          <div
            className="absolute inset-0"
            style={{ backgroundImage: visual.pattern, backgroundSize: visual.patternSize }}
          />
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** Concentric rings — the hero and article covers only. */
export function CoverRings({ className, sizes }: { className?: string; sizes: readonly number[] }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {sizes.map((size, index) => (
        <div
          key={size}
          className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(255,255,255,${0.18 + index * 0.04})`,
          }}
        />
      ))}
    </div>
  );
}
