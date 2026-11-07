import { Star } from "lucide-react";

import { formatDate } from "@/lib/format";
import type { PublicReview } from "@/lib/reviews";
import { cn } from "@/lib/utils";

/** Read-only star row. The rating is also given as text for screen readers. */
export function StarRow({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <span className="sr-only">{rating} out of 5 stars</span>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn(
            "size-4",
            index < rating ? "fill-star text-star" : "fill-transparent text-line-2",
          )}
        />
      ))}
    </span>
  );
}

/**
 * One approved review. The text is rendered as plain text (React escapes it),
 * never as HTML, so nothing a visitor typed can become markup on the page.
 */
export function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-lg border bg-bg-2 p-5 shadow-sm sm:p-6",
        review.featured ? "border-brand/40 shadow-glow-sm" : "border-line-1",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <StarRow rating={review.rating} />
        {review.featured && (
          <span className="rounded-full bg-tint-violet px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-brand-strong uppercase">
            Featured
          </span>
        )}
      </div>
      <blockquote className="mt-4 flex-1 text-[15.5px] leading-[1.7] break-words whitespace-pre-line text-fg-1">
        {review.body}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line-1 pt-4">
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-tint-cornflower text-[13px] font-bold text-fg-link"
        >
          {review.displayName.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14.5px] font-semibold text-fg-1">
            {review.displayName}
          </span>
          {review.createdAt && (
            <span className="block text-[13px] text-fg-3">
              {formatDate(review.createdAt.slice(0, 10))}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
