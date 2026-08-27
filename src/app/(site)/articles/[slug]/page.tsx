import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article/article-body";
import { ArticleHeader } from "@/components/article/article-header";
import { CommentThread } from "@/components/article/comment-thread";
import { ReaderModeProvider } from "@/components/article/reader-mode-provider";
import { ReaderModeView } from "@/components/article/reader-mode-view";
import { ReadingBar } from "@/components/article/reading-bar";
import { ReadingProgressBar, ReadingProgressProvider } from "@/components/article/reading-progress";
import { SeriesNav } from "@/components/article/series-nav";
import { TableOfContents } from "@/components/article/table-of-contents";
import { ViewTracker } from "@/components/article/view-tracker";
import { AuthorCard } from "@/components/author/author-card";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/post/post-card";
import { PostRow } from "@/components/post/post-row";
import {
  author,
  getPostBySlug,
  getRelatedPosts,
  getSeriesBySlug,
  posts,
  siteUrl,
  toSummary,
} from "@/lib/content";
import { getLiveComments, getLivePostStats } from "@/lib/db/queries";

const BODY_ID = "article-body";

/** Counters are read at render time, so the page needs a refresh window to show them moving. */
export const revalidate = 60;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      url: `/articles/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [author.name],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.dek },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Fetch live stats (likes, views) and real comments from Turso DB
  const [liveStats, liveDbComments] = await Promise.all([
    getLivePostStats(slug),
    getLiveComments(slug),
  ]);

  const livePost = {
    ...post,
    likes: liveStats !== null ? liveStats.likes : post.likes,
    views: liveStats !== null ? liveStats.views : post.views,
    commentCount: liveDbComments.length,
  };

  const summary = toSummary(livePost);
  const articleComments = liveDbComments;
  const related = getRelatedPosts(livePost, 3);
  const keepReading = getRelatedPosts(livePost, 4);
  const series = post.series ? getSeriesBySlug(post.series.slug) : undefined;
  const headings = post.body.flatMap((block) =>
    block.kind === "heading" ? [{ id: block.id, text: block.text }] : [],
  );

  return (
    <ReaderModeProvider>
      <ReadingProgressProvider bodyId={BODY_ID} headingIds={headings.map((heading) => heading.id)}>
        <ViewTracker slug={post.slug} />
        <ReadingProgressBar />
        <ReaderModeView post={post} />
        <script
          type="application/ld+json"
          // Serialised, not user input: every value comes from the content layer.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.dek,
              datePublished: post.publishedAt,
              keywords: post.tags,
              articleSection: post.topic,
              wordCount: post.readingMinutes * 200,
              mainEntityOfPage: `${siteUrl}/articles/${post.slug}`,
              author: { "@id": `${siteUrl}/#person` },
              publisher: { "@id": `${siteUrl}/#person` },
            }),
          }}
        />

        <article className="mx-auto w-full max-w-page min-w-0 px-gutter pt-[clamp(32px,4vw,60px)]">
          <ArticleHeader post={post} summary={summary} partCount={series?.partCount} />

          <div className="mt-[clamp(36px,4vw,56px)] grid w-full min-w-0 grid-cols-1 items-start gap-[clamp(32px,4.5vw,72px)] pb-[clamp(84px,10vw,150px)] lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="w-full max-w-full min-w-0">
              <ArticleBody id={BODY_ID} blocks={post.body} />

              <div className="mt-8.5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag.replace("#", ""))}`}
                    className="rounded-full border border-line-1 bg-bg-2 px-3.5 py-2 text-[13px] text-fg-2 transition-[color,border-color] duration-300 ease-expo hover:border-line-brand hover:text-brand"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {series && post.series ? (
                <nav aria-label="Series navigation" className="mt-9 grid gap-3.5 sm:grid-cols-2">
                  {series.parts[post.series.part - 2] ? (
                    <SeriesStep
                      href={`/articles?series=${series.slug}`}
                      label={`← Part ${post.series.part - 1}`}
                      title={series.parts[post.series.part - 2]}
                    />
                  ) : null}
                  {series.parts[post.series.part] ? (
                    <SeriesStep
                      href={`/articles?series=${series.slug}`}
                      label={`Part ${post.series.part + 1} →`}
                      title={series.parts[post.series.part]}
                      align="right"
                    />
                  ) : null}
                </nav>
              ) : null}

              <AuthorCard />

              <div id="responses" className="scroll-mt-28">
                <CommentThread
                  slug={post.slug}
                  comments={articleComments}
                  total={livePost.commentCount}
                />
              </div>
            </div>

            <aside className="flex w-full max-w-full min-w-0 flex-col gap-[18px] lg:sticky lg:top-[104px]">
              <TableOfContents headings={headings} />
              {series && post.series ? (
                <SeriesNav series={series} currentPart={post.series.part} />
              ) : null}
              <section className="rounded-lg border border-line-1 bg-bg-2 p-5.5">
                <h2 className="text-[15px] font-bold text-fg-1">Related</h2>
                <div className="mt-1.5">
                  {related.map((item) => (
                    <PostRow key={item.slug} post={item} variant="mini" />
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </article>

        <section>
          <div className="mx-auto max-w-page px-gutter py-band">
            <Reveal>
              <h2 className="mb-6.5 text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.025em] text-fg-1">
                Keep reading
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {keepReading.map((item) => (
                <PostCard key={item.slug} post={item} variant="compact" showMetrics={false} />
              ))}
            </div>
          </div>
        </section>

        <ReadingBar post={summary} next={toSummary(keepReading[0])} />
      </ReadingProgressProvider>
    </ReaderModeProvider>
  );
}

function SeriesStep({
  href,
  label,
  title,
  align = "left",
}: {
  href: string;
  label: string;
  title: string;
  align?: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={`group rounded-lg border border-line-1 bg-bg-2 p-5 transition-[transform,box-shadow] duration-500 ease-bounce hover:-translate-y-[3px] hover:shadow-card-hover-md active:scale-[0.98] active:duration-150 active:ease-out ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <p className="text-[12px] text-fg-3">{label}</p>
      <p className="mt-2 text-[16px] leading-[1.3] font-bold text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
        {title}
      </p>
    </Link>
  );
}
