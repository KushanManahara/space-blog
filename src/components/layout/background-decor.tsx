import { cn } from "@/lib/utils";

/**
 * The page's background, painted from tokens in `globals.css` so the whole
 * atmosphere lives in one place. Three flat layers, bottom to top:
 *
 * `horizon` is the ground: azure at the top of the viewport, blending through
 * a faint lilac around the middle, settling into a warm off-white by the
 * bottom edge. It is `fixed` and sized to `100dvh`, not the document, so the
 * split always sits behind whatever is near the top of the screen (the
 * masthead card) instead of stretching thinner as a page gets longer. On a
 * 6000px homepage the old document-height version put the lilac stop past
 * the third screen; this keeps it where it reads. Content scrolls over a
 * layer that itself does not move, matching `edges` below rather than `flow`.
 *
 * `flow` is document-height and carries the hue variation that evolves as you
 * scroll, weighted to the margins.
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
      <div
        className="fixed inset-0 -z-10 h-dvh"
        style={{ backgroundImage: "var(--page-horizon)" }}
      />
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--ambient-flow)" }} />
      <div className="fixed inset-0 -z-10" style={{ backgroundImage: "var(--ambient-edges)" }} />
    </div>
  );
}
