import { cn } from "@/lib/utils";

/**
 * Atmospheric background system that gives depth, subtle ambient lighting,
 * and a precision technical dot-matrix grid across both light and dark themes.
 *
 * Placed in the root layout behind all content (`-z-10`), with `pointer-events-none`
 * to ensure zero layout shift, optimal GPU compositing, and pristine readability.
 */
export function BackgroundDecor({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none",
        className,
      )}
    >
      {/* Top Horizon Light Sheen */}
      <div className="absolute -top-24 left-1/2 h-[280px] w-full max-w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgb(0_122_255/0.14),rgb(0_122_255/0))] dark:bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgb(0_122_255/0.24),rgb(0_122_255/0))]" />

      {/* Primary Ambient Aurora Orb (Top Left - Brand Blue #007AFF) */}
      <div className="absolute -top-[12%] -left-[10%] h-[720px] w-[720px] max-w-[90vw] rounded-full bg-[radial-gradient(circle_at_center,rgb(0_122_255/0.12),rgb(0_122_255/0)_70%)] blur-[96px] dark:bg-[radial-gradient(circle_at_center,rgb(0_122_255/0.18),rgb(0_122_255/0)_70%)]" />

      {/* Secondary Ambient Aurora Orb (Top Right - Sky Cyan #38BDF8) */}
      <div className="absolute -top-[6%] -right-[8%] h-[580px] w-[580px] max-w-[80vw] rounded-full bg-[radial-gradient(circle_at_center,rgb(56_189_248/0.09),rgb(56_189_248/0)_70%)] blur-[84px] dark:bg-[radial-gradient(circle_at_center,rgb(56_189_248/0.14),rgb(56_189_248/0)_70%)]" />

      {/* Tertiary Mid-page Soft Ambient Wash (Center Deep Indigo/Navy) */}
      <div className="absolute top-[42%] left-[15%] h-[680px] w-[680px] max-w-[85vw] rounded-full bg-[radial-gradient(circle_at_center,rgb(0_122_255/0.05),rgb(0_122_255/0)_70%)] blur-[120px] dark:bg-[radial-gradient(circle_at_center,rgb(0_122_255/0.09),rgb(0_122_255/0)_70%)]" />

      {/* Precision Technical Dot Matrix Grid with Organic Radial Vignette Fade */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full",
          "bg-[radial-gradient(rgb(0_122_255/0.11)_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(rgb(56_189_248/0.15)_1.25px,transparent_1.25px)]",
          "bg-[size:28px_28px]",
          "[mask-image:radial-gradient(ellipse_75%_60%_at_50%_12%,black_25%,transparent_82%)]",
          "[-webkit-mask-image:radial-gradient(ellipse_75%_60%_at_50%_12%,black_25%,transparent_82%)]",
        )}
      />

      {/* Subtle Bottom Horizon Sheen */}
      <div className="absolute -bottom-28 left-1/2 h-[320px] w-full max-w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,rgb(0_122_255/0.08),rgb(0_122_255/0))] dark:bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,rgb(0_122_255/0.14),rgb(0_122_255/0))]" />
    </div>
  );
}
