import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hash } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { PostRow } from "@/components/post/post-row";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getPostsByTag, listTags, routes, toSummaries } from "@/lib/content";
import { getAllLivePostStatsMap } from "@/lib/db/queries";

export function generateStaticParams() {
  return listTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) return {};

  const description = `${posts.length} ${posts.length === 1 ? "article" : "articles"} tagged #${tag}.`;

  return {
    title: `#${tag}`,
    description,
    alternates: { canonical: `/tags/${tag}` },
    openGraph: { type: "website", title: `#${tag}`, description, url: `/tags/${tag}` },
  };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const matching = getPostsByTag(tag);
  if (matching.length === 0) notFound();

  const liveStatsMap = await getAllLivePostStatsMap();
  const summaries = toSummaries(
    matching.map((post) => {
      const live = liveStatsMap.get(post.slug);
      return live
        ? { ...post, likes: live.likes, views: live.views, commentCount: live.comments }
        : post;
    }),
  );

  return (
    <>
      <PageMasthead
        eyebrow="Tag"
        title={
          <>
            Everything tagged <span className="text-brand">#{tag}</span>
          </>
        }
        description={`${matching.length} ${matching.length === 1 ? "article" : "articles"}, newest first.`}
        media={<MastheadBadge icon={Hash} />}
        actions={
          <InteractiveHoverButton
            href={routes.tags}
            variant="secondary"
            className="px-[22px] py-[11px] text-[14px]"
          >
            All tags
          </InteractiveHoverButton>
        }
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)] pb-tail">
        <Reveal>
          {summaries.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </Reveal>
      </section>
    </>
  );
}
