import { Skeleton } from "@/components/ui/skeleton";

/** Grid placeholder shown while a filter change is in flight. */
export function PostSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-hidden
      className="grid [animation:fade-in_.3s_var(--ease-expo)] gap-5.5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-line-1 bg-bg-2">
          <Skeleton className="aspect-[16/10] rounded-none" />
          <div className="flex flex-col gap-[11px] p-5">
            <Skeleton className="h-[11px] w-[42%]" />
            <Skeleton className="h-4 w-[92%]" />
            <Skeleton className="h-4 w-[64%]" />
            <Skeleton className="mt-1.5 h-3 w-full" />
            <Skeleton className="h-3 w-[78%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
