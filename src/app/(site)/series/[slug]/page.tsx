import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { HeaderAtmosphere } from "@/components/layout/header-atmosphere";
import { Reveal } from "@/components/motion/reveal";
import { PostCover } from "@/components/post/post-cover";
import { PostRow } from "@/components/post/post-row";
import { TopicBadge } from "@/components/post/topic-badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getSeriesSummary, routes, seriesList } from "@/lib/content";
import { getAllLivePostStatsMap } from "@/lib/db/queries";
import { formatCount, formatDate } from "@/lib/format";

/**
 * These pages are prerendered but read live engagement counts, so without a
 * revalidate they would keep their build-time numbers forever while the same
 * post showed live ones on its own page.
 */
export const revalidate = 300;

export function generateStaticParams() {
  return seriesList.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: PageProps<"/series/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesSummary(slug);
  if (!series) return {};

  return {
    title: series.title,
    description: series.dek,
    alternates: { canonical: `/series/${series.slug}` },
    openGraph: {
      type: "website",
      title: series.title,
      description: series.dek,
      url: `/series/${series.slug}`,
    },
  };
}

export default async function SeriesDetailPage({ params }: PageProps<"/series/[slug]">) {
  const { slug } = await params;
  const series = getSeriesSummary(slug);
  if (!series) notFound();

  // Live engagement, so the parts show the same counts they do anywhere else.
  const liveStats = await getAllLivePostStatsMap();
  const parts = series.posts.map((post) => {
    const live = liveStats.get(post.slug);
    return live
      ? { ...post, likes: live.likes, views: live.views, commentCount: live.comments }
      : post;
  });

  return (
    <>
      <section className="relative">
        <HeaderAtmosphere />

        <div className="mx-auto max-w-page px-gutter pt-[clamp(28px,4vw,52px)] pb-[clamp(24px,3vw,40px)]">
          <Reveal>
            <Link
              href={routes.series}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-fg-3 transition-colors duration-300 ease-expo hover:text-brand"
            >
              All series
            </Link>

            <div className="mt-5 flex flex-wrap items-start gap-x-7 gap-y-5 sm:flex-nowrap">
              <PostCover
                topic={series.coverTopic}
                image={series.cover}
                alt={series.title}
                zoom={false}
                priority
                className="size-[96px] shrink-0 rounded-lg sm:size-[124px]"
              />

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-fg-3 uppercase">
                  Series · {series.partCount} parts
                </p>
                <h1 className="mt-3 text-[clamp(26px,4vw,46px)] leading-[1.12] font-bold tracking-[-0.03em] text-fg-1">
                  {series.title}
                </h1>
                <p className="mt-3.5 max-w-[62ch] text-[16.5px] leading-[1.65] text-fg-2">
                  {series.dek}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {series.topics.map((name) => (
                    <TopicBadge key={name} topic={name} />
                  ))}
                </div>

                <p className="mt-3.5 text-[13px] text-fg-3">
                  {formatDate(series.firstPublished)} – {formatDate(series.lastPublished)} ·{" "}
                  {series.minutes} min to read the lot · {formatCount(series.views)} views
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <InteractiveHoverButton
                    href={`${routes.articles}/${series.posts[0].slug}`}
                    className="px-[22px] py-[11px] text-[14px]"
                  >
                    Start with part one
                  </InteractiveHoverButton>
                  <Link
                    href={`${routes.articles}?series=${series.slug}`}
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition-colors duration-300 ease-expo hover:text-brand-strong"
                  >
                    See them in the archive
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-page px-gutter pb-tail">
        <Reveal className="border-t border-line-1 pt-7">
          <h2 className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
            The parts, in order
          </h2>
        </Reveal>

        <Reveal>
          {parts.map((post, index) => (
            <div key={post.slug} className="flex gap-4 sm:gap-6">
              <span
                aria-hidden
                className="mt-7 hidden font-mono text-[13px] font-bold text-fg-faint sm:block"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <PostRow post={post} />
              </div>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
