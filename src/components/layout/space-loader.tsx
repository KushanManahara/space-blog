import { BrandMark } from "@/components/layout/brand-mark";
import { cn } from "@/lib/utils";

/**
 * Route loading state.
 *
 * The brandmark is a planet with a moon sitting in a crescent notch, so the
 * loader is that moon in transit: a satellite tracing a tilted orbit and
 * passing behind the planet on the far side. Nothing here reports real
 * progress, so it deliberately reads as "in motion" rather than as a bar that
 * implies a percentage it cannot know.
 *
 * `label` is per route — telling a reader what is being fetched beats a bare
 * spinner, and costs nothing.
 */
export function SpaceLoader({
  label = "Loading",
  size = 76,
  className,
}: {
  label?: string;
  size?: number;
  className?: string;
}) {
  // The orbit clears the planet's edge; the satellite is sized off the same
  // figure so the whole thing scales from one number.
  const orbit = Math.round(size * 1.72);
  const satellite = Math.max(8, Math.round(size * 0.15));

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center justify-center gap-7", className)}
    >
      {/* The scene, not just the plane, carries preserve-3d: the planet and the
          satellite have to be sorted against each other, and they are siblings. */}
      <div
        className="relative grid place-items-center [transform-style:preserve-3d]"
        style={{ width: orbit, height: orbit, perspective: `${orbit * 3}px` }}
      >
        {/* Orbit plane. Tilted, and the whole scene keeps its 3D context so the
            satellite can travel behind the planet rather than over it. */}
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center [transform-style:preserve-3d] motion-safe:[animation:orbit-spin_3.6s_linear_infinite]"
          style={{ transform: "rotateX(72deg)" }}
        >
          {/* The path itself, faint enough to read as a hint rather than a ring. */}
          <div
            className="absolute rounded-full border border-line-brand/70 dark:border-brand/25"
            style={{ width: orbit, height: orbit }}
          />

          {/* Parked at the *bottom* of the plane, which the tilt maps to the near
              side. That matters for reduced motion: the animation is frozen at
              its first frame there, and resting at the top would leave the
              satellite hidden behind the planet with nothing to see. */}
          <div
            className="absolute bottom-0 left-1/2 [transform-style:preserve-3d]"
            style={{ transform: "translateX(-50%)" }}
          >
            <span
              className="block rounded-full bg-brand shadow-[0_0_12px_2px_rgb(0_122_255_/_0.55)] motion-safe:[animation:orbit-satellite-face_3.6s_linear_infinite]"
              style={{ width: satellite, height: satellite }}
            />
          </div>
        </div>

        {/* Parked at z = 0, the plane's centre depth, and deliberately without a
            z-index: any z-index here would flatten the sort and put the planet
            permanently on top, which is exactly the bug this avoids. */}
        <BrandMark
          size={size}
          glow={false}
          className="[transform:translateZ(0)] motion-safe:[animation:planet-breathe_2.4s_var(--ease-expo)_infinite]"
        />
      </div>

      <p className="flex items-center gap-1 text-[13.5px] font-medium text-fg-2">
        {label}
        <span aria-hidden className="flex gap-[3px] pt-[3px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-[3px] rounded-full bg-fg-3 motion-safe:[animation:loader-dot_1.4s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </span>
      </p>
    </div>
  );
}

/** Full-height wrapper for route-level `loading.tsx` files. */
export function RouteLoader({ label }: { label?: string }) {
  return (
    <div className="mx-auto flex min-h-[58vh] w-full max-w-page items-center justify-center px-gutter py-[clamp(64px,10vw,120px)]">
      <SpaceLoader label={label} />
    </div>
  );
}
