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
      <Image
        src="/logo.png"
        alt="Space logo"
        width={size * 2}
        height={size * 2}
        priority
        className="size-full object-contain"
      />
    </span>
  );
}
