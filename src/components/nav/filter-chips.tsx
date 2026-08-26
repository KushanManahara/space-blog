import Link from "next/link";

import { cn } from "@/lib/utils";

export type FilterChipOption = { label: string; href: string; active: boolean };

/** Pill filters. Plain links, so filtering works before hydration. */
export function FilterChips({
  options,
  label,
  size = "md",
  className,
}: {
  options: FilterChipOption[];
  label: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Link
          key={option.label}
          href={option.href}
          scroll={false}
          aria-current={option.active ? "true" : undefined}
          className={cn(
            "cursor-pointer rounded-full border font-semibold transition-[background-color,color,transform,box-shadow,border-color] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-xs active:scale-[0.95] active:duration-150 active:ease-out",
            size === "sm" ? "px-4 py-[9px] text-[13px]" : "px-4.5 py-2.5 text-[13.5px]",
            option.active
              ? "border-ink bg-ink text-on-ink shadow-sm"
              : "border-line-1 bg-bg-2 text-fg-2 hover:border-line-2 hover:text-fg-1",
          )}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
