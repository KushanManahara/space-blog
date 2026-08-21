import { cn } from "@/lib/utils";

/** Section title + subtitle, with an optional action rail on the right. */
export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-5",
        action ? "gap-y-4" : undefined,
        className,
      )}
    >
      <div>
        <h2 className="text-h2 text-fg-1">{title}</h2>
        {subtitle ? <p className="mt-2.5 text-[16.5px] text-fg-2">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

/** Uppercase eyebrow used above page titles. */
export function Overline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("text-[12px] font-semibold tracking-[0.16em] text-brand uppercase", className)}
    >
      {children}
    </p>
  );
}
