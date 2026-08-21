import type { TopicName } from "@/lib/content";

export type TopicVisual = {
  /** Cover artwork gradient — stands in for the photography slot. */
  cover: string;
  /** Overlaid line/dot pattern that gives each topic its own texture. */
  pattern: string;
  patternSize: string;
  /** Soft badge: brand-tinted background with matching ink. */
  badge: string;
  /** Ink for the white plates that float on cover artwork. Never flips. */
  ink: string;
  /** Ink for topic labels printed straight onto a page surface. Flips. */
  label: string;
  /** Solid dot used in the topic directory. */
  dot: string;
};

export const topicVisuals: Record<TopicName, TopicVisual> = {
  Inference: {
    cover: "linear-gradient(145deg, #60A5FA 0%, #007AFF 52%, #004DA8 100%)",
    pattern:
      "repeating-radial-gradient(circle at 62% 74%, rgba(255,255,255,.20) 0 1px, rgba(255,255,255,0) 1px 34px)",
    patternSize: "auto",
    badge: "bg-tint-violet text-brand-strong",
    ink: "text-violet-600",
    label: "text-brand-strong",
    dot: "bg-violet-600",
  },
  Systems: {
    cover: "linear-gradient(150deg, #93C5FD 0%, #2563EB 55%, #0F172A 100%)",
    pattern:
      "linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
    patternSize: "34px 34px, 34px 34px",
    badge: "bg-tint-indigo text-accent-indigo",
    ink: "text-indigo-600",
    label: "text-accent-indigo",
    dot: "bg-indigo-600",
  },
  Evaluation: {
    cover: "linear-gradient(155deg, #7DD3FC 0%, #0284C7 55%, #0369A1 100%)",
    pattern: "radial-gradient(rgba(255,255,255,.30) 1.6px, transparent 1.6px)",
    patternSize: "22px 22px",
    badge: "bg-tint-cornflower text-fg-link",
    ink: "text-cornflower-600",
    label: "text-fg-link",
    dot: "bg-cornflower-600",
  },
  Engineering: {
    cover: "linear-gradient(150deg, #BAE6FD 0%, #0EA5E9 50%, #0062D2 100%)",
    pattern:
      "repeating-linear-gradient(58deg, rgba(255,255,255,.15) 0 1px, rgba(255,255,255,0) 1px 16px)",
    patternSize: "auto",
    badge: "bg-tint-orchid text-accent-orchid",
    ink: "text-orchid-600",
    label: "text-accent-orchid",
    dot: "bg-orchid-600",
  },
  Experiments: {
    cover: "linear-gradient(150deg, #93C5FD 0%, #007AFF 50%, #1E3A8A 100%)",
    pattern:
      "repeating-radial-gradient(circle at 22% 18%, rgba(255,255,255,.18) 0 1px, rgba(255,255,255,0) 1px 15px)",
    patternSize: "auto",
    badge: "bg-tint-violet text-brand-strong",
    ink: "text-violet-700",
    label: "text-brand-strong",
    dot: "bg-violet-700",
  },
  Research: {
    cover: "linear-gradient(155deg, #38BDF8 0%, #1D4ED8 55%, #0B192C 100%)",
    pattern:
      "repeating-linear-gradient(45deg, rgba(255,255,255,.13) 0 1px, rgba(255,255,255,0) 1px 18px), repeating-linear-gradient(-45deg, rgba(255,255,255,.13) 0 1px, rgba(255,255,255,0) 1px 18px)",
    patternSize: "auto",
    badge: "bg-tint-indigo text-accent-indigo",
    ink: "text-indigo-500",
    label: "text-accent-indigo",
    dot: "bg-indigo-500",
  },
  Findings: {
    cover: "linear-gradient(150deg, #BFDBFE 0%, #3B82F6 50%, #1E40AF 100%)",
    pattern: "repeating-linear-gradient(rgba(255,255,255,.16) 0 1px, rgba(255,255,255,0) 1px 13px)",
    patternSize: "auto",
    badge: "bg-tint-cornflower text-fg-link",
    ink: "text-cornflower-600",
    label: "text-fg-link",
    dot: "bg-cornflower-600",
  },
};

export function getTopicVisual(topic: TopicName): TopicVisual {
  return topicVisuals[topic];
}
