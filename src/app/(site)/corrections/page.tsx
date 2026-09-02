import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, PencilLine } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { markdownToHtml } from "@/components/article/markdown";
import { Reveal } from "@/components/motion/reveal";
import { listCorrections, routes, site } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { alternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Corrections",
  description: `Every correction made to the ${site.issue} posts in this archive, dated, with the article it belongs to.`,
  alternates: alternates("/corrections"),
};

export default function CorrectionsPage() {
  const corrections = listCorrections();

  return (
    <>
      <PageMasthead
        eyebrow="Corrections"
        title={
          <>
            What I got wrong, <span className="text-brand">and when.</span>
          </>
        }
        description="Corrections are appended to the article they belong to and dated, never edited quietly into the original. Every one of them is listed here."
        media={<MastheadBadge icon={PencilLine} />}
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)] pb-tail">
        {corrections.length === 0 ? (
          <Reveal className="max-w-[640px] rounded-lg border border-dashed border-line-1 bg-bg-2 p-7 sm:p-9">
            <p className="text-[15.5px] leading-[1.7] text-fg-1">Nothing has been corrected yet.</p>
            <p className="mt-3 text-[15px] leading-[1.7] text-fg-2">
              That is a statement about the age of this archive, not about its accuracy. The
              mechanism is here and this page is the commitment: when something published here turns
              out to be wrong, the correction is written into the article at the point it applies,
              carries the date it was made, and shows up on this list. The original claim stays
              visible above it.
            </p>
            <Link
              href={routes.articles}
              className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition-colors duration-300 ease-expo hover:text-brand-strong"
            >
              Read the archive
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </Link>
          </Reveal>
        ) : (
          <Reveal className="flex flex-col">
            {corrections.map(({ post, correction }) => (
              <article
                key={`${post.slug}-${correction.date}-${correction.note.slice(0, 24)}`}
                className="grid gap-x-8 gap-y-3 border-b border-line-1 py-7 lg:grid-cols-[minmax(0,190px)_minmax(0,1fr)]"
              >
                <div>
                  <time
                    dateTime={correction.date}
                    className="block text-[13px] font-semibold text-fg-1"
                  >
                    {formatDate(correction.date)}
                  </time>
                  <Link
                    href={`${routes.articles}/${post.slug}`}
                    className="mt-1.5 inline-block text-[14px] leading-[1.45] font-semibold text-fg-1 transition-colors duration-300 ease-expo hover:text-brand"
                  >
                    {post.title}
                  </Link>
                </div>

                <div className="min-w-0">
                  {correction.was ? (
                    <p className="border-l-2 border-line-2 pl-3.5 text-[14.5px] leading-[1.6] text-fg-3 line-through">
                      {correction.was}
                    </p>
                  ) : null}
                  <p
                    className="mt-2 text-[15.5px] leading-[1.7] text-fg-prose"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(correction.note) }}
                  />
                </div>
              </article>
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
