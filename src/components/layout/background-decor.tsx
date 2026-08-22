import { cn } from "@/lib/utils";

/**
 * The page's background, painted from tokens in `globals.css` so the whole
 * atmosphere lives in one place. Three flat layers, bottom to top:
 *
 * `horizon` is the ground: azure at the top of the document, blending through
 * a faint lilac across the middle, settling into a warm off-white at the foot.
 * It is document-height and sits behind everything, so any section can float on
 * it without owning a copy of it or breaking out to viewport width.
 *
 * `flow` is also document-height and carries the hue variation that evolves as
 * you scroll, weighted to the margins.
 *
 * `edges` is fixed to the viewport, so colour keeps gathering in the whitespace
 * beside the content column no matter how far down the page you are.
 *
 * Deliberately no `blur()`, no `border-radius`, no repeating pattern and no
 * discrete shapes: the softness comes from very wide stops at very low alpha,
 * which costs one paint instead of a filter pass over a large surface.
 */
export function BackgroundDecor({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none select-none", className)}>
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--page-horizon)" }} />
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--ambient-flow)" }} />
      <div className="fixed inset-0 -z-10" style={{ backgroundImage: "var(--ambient-edges)" }} />
    </div>
  );
}
