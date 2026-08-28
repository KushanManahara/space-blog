import { PencilLine } from "lucide-react";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Marks a post that carries a dated correction.
 *
 * Deliberately not an apology or a warning colour: a corrected article is a
 * better article, and the badge is there to make that visible rather than to
 * flag a defect.
 */
export function CorrectedBadge({ date, className }: { date: string; className?: string }) {
  return (
    <span
      title={`Corrected ${formatDate(date)}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-line-2 px-2 py-0.5 text-[11.5px] font-semibold text-fg-1",
        className,
      )}
    >
      <PencilLine className="size-3" strokeWidth={2} />
      Corrected
    </span>
  );
}
