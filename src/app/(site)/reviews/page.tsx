import type { Metadata } from "next";
import { MessageSquareQuote } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { Pagination } from "@/components/nav/pagination";
import { ReviewCard, StarRow } from "@/components/reviews/review-card";
import { ReviewForm } from "@/components/reviews/review-form";
import { routes } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { getApprovedReviews } from "@/lib/reviews";
import { buildHref } from "@/lib/url";

export const metadata: Metadata = pageMetadata({
  title: "Reader reviews",
  description: "What readers say about Space, and a form to add your own.",
  path: routes.reviews,
});

function parsePage(value: string | string[] | undefined): number {
  const page = Number(typeof value === "string" ? value : 1);
  return Number.isInteger(page) && page > 0 && page < 10_000 ? page : 1;
}

export default async function ReviewsPage({ searchParams }: PageProps<"/reviews">) {
  const params = await searchParams;
  const { items, total, average, page, pageCount } = await getApprovedReviews(
    parsePage(params.page),
  );

  return (
    <>
      <PageMasthead
        eyebrow="Reviews"
        title={
          <>
            What readers say, <span className="text-brand">in their words.</span>
          </>
        }
        description="Every review is read before it appears here. Nothing is published automatically, and emails are never shown."
        media={<MastheadBadge icon={MessageSquareQuote} />}
        meta={
          average !== null ? (
            <span className="inline-flex items-center gap-2">
              <StarRow rating={Math.round(average)} />
              {average.toFixed(1)} average from {total} review{total === 1 ? "" : "s"}
            </span>
          ) : undefined
        }
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section
        aria-label="Approved reviews"
        className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)]"
      >
        {items.length === 0 ? (
          <Reveal className="max-w-[640px] rounded-lg border border-dashed border-line-1 bg-bg-2 p-7 sm:p-9">
            <p className="text-[15.5px] leading-[1.7] text-fg-1">No reviews yet.</p>
            <p className="mt-3 text-[15px] leading-[1.7] text-fg-2">
              If an article here helped you, the form below is the place to say so.
            </p>
          </Reveal>
        ) : (
          <>
            <ul className="grid gap-[clamp(14px,2vw,20px)] sm:grid-cols-2 lg:grid-cols-3">
              {items.map((review) => (
                <li key={review.id}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
            <Pagination
              page={page}
              total={pageCount}
              hrefFor={(next) =>
                buildHref(routes.reviews, {}, { page: next > 1 ? String(next) : undefined })
              }
              className="mt-8"
            />
          </>
        )}
      </section>

      <section
        id="write"
        aria-labelledby="write-heading"
        className="mx-auto max-w-[760px] scroll-mt-24 px-gutter pt-[clamp(48px,6vw,80px)] pb-tail"
      >
        <h2
          id="write-heading"
          className="text-[clamp(24px,2.6vw,30px)] font-bold tracking-[-0.02em] text-fg-1"
        >
          Write a review
        </h2>
        <p className="mt-2 mb-6 text-[15px] leading-[1.7] text-fg-2">
          No account needed. Tell other readers what you found useful.
        </p>
        <ReviewForm />
      </section>
    </>
  );
}
