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

/** Stacked placeholder matching PostRow, for list surfaces. */
export function PostRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div aria-hidden className="flex [animation:fade-in_.3s_var(--ease-expo)] flex-col">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex gap-5 border-b border-line-1 py-6">
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <Skeleton className="h-[11px] w-[30%]" />
            <Skeleton className="h-5 w-[85%]" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-[55%]" />
          </div>
          <Skeleton className="hidden aspect-[4/3] w-[132px] shrink-0 sm:block" />
        </div>
      ))}
    </div>
  );
}

/** Placeholder for a single article while its live stats resolve. */
export function ArticleSkeleton() {
  return (
    <div
      aria-hidden
      className="mx-auto w-full max-w-page [animation:fade-in_.3s_var(--ease-expo)] px-gutter pt-[clamp(32px,5vw,64px)]"
    >
      <div className="flex max-w-[780px] flex-col gap-4">
        <Skeleton className="h-[26px] w-[128px] rounded-full" />
        <Skeleton className="h-[42px] w-[92%]" />
        <Skeleton className="h-[42px] w-[64%]" />
        <Skeleton className="mt-2 h-5 w-[80%]" />
        <Skeleton className="mt-5 h-[64px] w-full rounded-lg" />
      </div>
      <Skeleton className="mt-9 aspect-[21/9] w-full rounded-2xl md:rounded-3xl" />
    </div>
  );
}
