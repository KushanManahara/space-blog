import Image from "next/image";

import type { TopicName } from "@/lib/content";
import { cn } from "@/lib/utils";

import { getTopicVisual } from "./topic-visuals";

/**
 * Gradient cover artwork or custom thumbnail image. `zoom` opts the image into the group hover scale used
 * by cards and rows; `pattern` adds the topic's texture overlay when no image is supplied.
 *
 * `notch` cuts the top-left corner out of the artwork and drops the topic's
 * glyph into the gap. It is opt-in because the small thumbnails (rows, command
 * menu, studio table) are barely wider than the notch itself.
 */
export function PostCover({
  topic,
  image,
  alt = "",
  priority = false,
  className,
  pattern = true,
  zoom = true,
  notch = false,
  children,
}: {
  topic: TopicName;
  image?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  pattern?: boolean;
  zoom?: boolean;
  notch?: boolean;
  children?: React.ReactNode;
}) {
  const visual = getTopicVisual(topic);
  const TopicIcon = visual.icon;

  return (
    <div className={cn("relative overflow-hidden bg-bg-3", className)}>
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-[800ms] ease-expo",
          zoom && "group-hover:scale-[1.045]",
        )}
        style={{ background: visual.cover }}
      >
        <div className="cover-sheen absolute inset-0 z-1" />
        {pattern && !image ? (
          <div
            className="absolute inset-0"
            style={{ backgroundImage: visual.pattern, backgroundSize: visual.patternSize }}
          />
        ) : null}
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
        ) : null}
      </div>
      {notch ? (
        /*
         * Not a badge sitting on the artwork: this is the card's own surface
         * carried into the corner, so the artwork reads as cut away around it.
         * It sits flush at 0,0 and takes the card's radius on the outer corner
         * so it nests into the card rather than floating on it. Surfaces that
         * are not bg-2 (the page itself, tinted cards) set --notch-surface.
         */
        <span
          aria-hidden
          className="absolute top-0 left-0 z-3 inline-flex size-11 items-center justify-center rounded-tl-lg rounded-br-md bg-[var(--notch-surface,var(--color-bg-2))]"
        >
          <TopicIcon className={cn("size-[17px]", visual.label)} strokeWidth={1.75} />
        </span>
      ) : null}
      <div className="relative z-2 h-full w-full">{children}</div>
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
