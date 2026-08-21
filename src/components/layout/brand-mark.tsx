import { cn } from "@/lib/utils";

/** The Space drop: a rotated teardrop filled with the brand gradient. */
export function BrandMark({ size = 26, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block -rotate-45 rounded-[999px_999px_999px_6px]",
        glow && "shadow-glow-sm",
      )}
      style={{ width: size, height: size, background: "var(--gradient-brand-diag)" }}
    />
  );
}
