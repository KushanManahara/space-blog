import { cn } from "@/lib/utils";

/** Shimmering placeholder — the loading state used by the post grids. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "[animation:shimmer_1.25s_linear_infinite] rounded-xs bg-[linear-gradient(90deg,var(--color-n-100)_0%,var(--color-n-50)_40%,var(--color-n-100)_80%)] bg-[length:420px_100%]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
