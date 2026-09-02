import Image from "next/image";

import { author } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const sizes = {
  xs: { avatar: "size-[22px] text-[9px]", name: "text-[12px]", meta: "text-[12px]" },
  sm: { avatar: "size-[30px] text-[11px]", name: "text-[13.5px]", meta: "text-[13px]" },
  md: { avatar: "size-[34px] text-[12px]", name: "text-[13.5px]", meta: "text-[12.5px]" },
} as const;

/** Author avatar + name, with the publish date trailing on one line. */
export function AuthorByline({
  date,
  size = "sm",
  className,
}: {
  date: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const scale = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <AuthorAvatar className={scale.avatar} />
      <span className={cn("font-semibold text-fg-1", scale.name)}>{author.name}</span>
      <span className={cn("text-fg-3", scale.meta)}>· {formatDate(date)}</span>
    </div>
  );
}

export function AuthorAvatar({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold text-white shadow-xs select-none",
        className,
      )}
      style={{ background: "var(--gradient-brand-diag)" }}
    >
      <Image
        src={author.avatar}
        alt={author.name}
        width={96}
        height={96}
        preload={priority}
        className="size-full object-cover"
      />
    </span>
  );
}
