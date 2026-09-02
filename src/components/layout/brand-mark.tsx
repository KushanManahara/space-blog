import Image from "next/image";

import { cn } from "@/lib/utils";

/** The Space logo: vibrant celestial orb brandmark. */
export function BrandMark({
  size = 28,
  glow = true,
  className,
}: {
  size?: number;
  glow?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center select-none",
        glow && "drop-shadow-[0_0_10px_rgba(0,122,255,0.4)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/*
        Eager, but deliberately not `priority`. The brandmark renders several
        times per page (header, footer, cards), and `priority` on each emitted a
        separate preload hint for a decorative 28px logo — four of them on an
        article page, competing with the images that actually matter. Eager
        still loads it straight away, without the preload.
      */}
      <Image
        src="/logo.png"
        alt="Space logo"
        width={size * 2}
        height={size * 2}
        loading="eager"
        className="size-full object-contain"
      />
    </span>
  );
}
