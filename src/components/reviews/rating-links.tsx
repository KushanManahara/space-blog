import Link from "next/link";
import { Star } from "lucide-react";

import { reviewHref } from "@/lib/review-invite";
import { cn } from "@/lib/utils";

/**
 * Five stars that each open the review form with that rating chosen. Plain
 * links, so they work without JavaScript. Hovering lights up the stars up to
 * the pointer (`peer` would only reach later siblings, so this uses the
 * group-hover trick on the reversed flex row).
 */
export function RatingLinks({
  size = "md",
  className,
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row-reverse justify-end", className)}>
      {[5, 4, 3, 2, 1].map((value) => (
        <Link
          key={value}
          href={reviewHref(value)}
          aria-label={`Rate ${value} out of 5`}
          className="group/star tap-target rounded-full p-0.5 focus-visible:ring-2 focus-visible:ring-ring [&:hover~a_svg]:fill-star [&:hover~a_svg]:text-star"
        >
          <Star
            aria-hidden
            className={cn(
              "fill-transparent text-line-2 transition-[color,fill,transform] duration-300 ease-expo group-hover/star:scale-110 group-hover/star:fill-star group-hover/star:text-star",
              size === "sm" ? "size-5" : "size-6",
            )}
          />
        </Link>
      ))}
    </div>
  );
}
