import Link from "next/link";
import type { Metadata } from "next";
import { Layers } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { TopicCard } from "@/components/topic/topic-tile";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { routes, site, topics } from "@/lib/content";
import { alternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Topics",
  description: `The subjects the ${site.issue} posts in this archive keep returning to.`,
  alternates: alternates("/topics"),
};

export default function TopicsPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Topics"
        title={
          <>
            Everything I keep <span className="text-brand">coming back to.</span>
          </>
        }
        description="Each topic collects the posts that belong together."
        media={<MastheadBadge icon={Layers} />}
        actions={
          <>
            <InteractiveHoverButton
              href={routes.articles}
              className="px-[22px] py-[11px] text-[14px]"
            >
              Browse archive
            </InteractiveHoverButton>
            <Button asChild variant="subtle" size="md">
              <Link href={routes.about}>About author</Link>
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(28px,4vw,44px)] pb-tail">
        <div className="grid gap-4.5 sm:grid-cols-2 xl:grid-cols-4">
          {topics.map((topic, index) => (
            <Reveal key={topic.slug} index={index}>
              <TopicCard topic={topic} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
