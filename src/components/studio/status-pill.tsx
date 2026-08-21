import type { StudioPost } from "@/lib/content";
import { cn } from "@/lib/utils";

const statusStyles: Record<StudioPost["status"], string> = {
  Published: "bg-tint-indigo text-accent-indigo",
  Draft: "bg-bg-3 text-fg-2",
  Corrected: "bg-tint-orchid text-accent-orchid",
};

export function StatusPill({ status }: { status: StudioPost["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1.5 text-[11.5px] font-semibold whitespace-nowrap",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
