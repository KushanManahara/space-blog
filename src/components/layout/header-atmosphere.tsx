import { cn } from "@/lib/utils";

/**
 * The light that falls across a page header.
 *
 * Absolutely positioned inside a `relative` header, so it inherits that
 * header's height: a short masthead gets a short wash, a taller one carrying
 * artwork or extra metadata gets a taller one, and nobody sets a number. That
 * is the whole reason this belongs to the header rather than to the page.
 *
 * Reaches `--nav-bleed` above its container so the wash sits behind the
 * floating nav too, and breaks out to the full viewport width so it never
 * reads as a panel with vertical edges. The breakout is why `main` carries
 * `overflow-x-clip`: 100vw counts the scrollbar, and without the clip the wash
 * would widen the page by its width.
 *
 * The fade itself lives in `--header-atmosphere` (globals.css), so all three
 * header types share one curve rather than each tuning its own.
 */
export function HeaderAtmosphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 -z-10 sm:inset-x-[calc(50%-50vw)]",
        "top-[calc(-1*var(--nav-bleed))]",
        className,
      )}
      style={{ backgroundImage: "var(--header-atmosphere)" }}
    />
  );
}
