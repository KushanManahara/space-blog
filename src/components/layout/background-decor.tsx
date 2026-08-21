import { cn } from "@/lib/utils";

/**
 * The page's ambient background. Two flat layers, both painted from tokens
 * defined in `globals.css` so the whole atmosphere lives in one place.
 *
 * `flow` is absolutely positioned inside `body`, so it is as tall as the
 * document and scrolls with it. That is what makes the tone evolve from hero
 * to footer instead of sitting still in the viewport.
 *
 * `edges` is fixed to the viewport and weighted to the outer margins, so
 * colour gathers in the whitespace beside the content column rather than
 * behind the text.
 *
 * Deliberately no `blur()`, no `border-radius`, no repeating pattern and no
 * discrete shapes: the softness comes from very wide radial stops at very low
 * alpha, which costs one paint instead of a filter pass over a large surface.
 */
export function BackgroundDecor({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--ambient-flow)" }} />
      <div className="fixed inset-0 -z-10" style={{ backgroundImage: "var(--ambient-edges)" }} />
    </div>
  );
}
