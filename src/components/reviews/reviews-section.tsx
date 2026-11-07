import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ReviewCard, StarRow } from "@/components/reviews/review-card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { routes } from "@/lib/content";
import { getApprovedReviews, HOMEPAGE_REVIEWS } from "@/lib/reviews";

/**
 * Homepage reader reviews: approved only, featured first. Reads through the
 * cached query, so the homepage stays static between revalidations.
 */
export async function ReviewsSection() {
  const { items, total, average } = await getApprovedReviews(1, HOMEPAGE_REVIEWS);

  return (
    <section aria-labelledby="reviews-heading" className="mx-auto max-w-page px-gutter pb-tail">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="reviews-heading"
            className="text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em] text-fg-1"
          >
            What readers say
          </h2>
          {average !== null ? (
            <p className="mt-2 flex items-center gap-2 text-[14.5px] text-fg-2">
              <StarRow rating={Math.round(average)} />
              <span>
                {average.toFixed(1)} from {total} review{total === 1 ? "" : "s"}
              </span>
            </p>
          ) : (
            <p className="mt-2 text-[15px] text-fg-2">
              No reviews yet. If something here helped you, you could be the first.
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {total > items.length && (
            <Link
              href={routes.reviews}
              className="tap-target inline-flex items-center gap-1.5 text-[14px] font-semibold text-fg-link hover:underline"
            >
              All reviews
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
          <InteractiveHoverButton href={`${routes.reviews}#write`} className="px-6 py-3">
            Write a review
          </InteractiveHoverButton>
        </div>
      </Reveal>

      {items.length > 0 && (
        <ul className="mt-7 grid gap-[clamp(14px,2vw,20px)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
