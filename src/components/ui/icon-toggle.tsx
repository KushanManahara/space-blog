import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const TRANSITION = "transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]";

/**
 * Cross-fades an icon between its outline and filled state (save, like, and
 * similar toggles). Both variants stay mounted so the swap animates in both
 * directions — see better-ui's icon cross-fade recipe (no motion library).
 */
export function IconToggle({
  icon: Icon,
  active,
  className,
}: {
  icon: LucideIcon;
  active: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-flex size-4 shrink-0 items-center justify-center", className)}
    >
      <Icon
        aria-hidden
        className={cn(
          "absolute inset-0 size-full",
          TRANSITION,
          active ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]",
        )}
        fill="currentColor"
        strokeWidth={1.75}
      />
      <Icon
        aria-hidden
        className={cn(
          "size-full",
          TRANSITION,
          active ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none",
        )}
        fill="none"
        strokeWidth={1.75}
      />
    </span>
  );
}
