import type { Metadata } from "next";

import { Sparkles } from "lucide-react";

import { PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { TopicCard } from "@/components/topic/topic-tile";
import { site, topics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Topics",
  description: `The subjects the ${site.issue} posts in this archive keep returning to.`,
  alternates: { canonical: "/topics" },
};

export default function TopicsPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Topics"
        title="Everything I keep coming back to."
        description="Each topic collects the posts, corrections and traces that belong together."
        meta={
          <>
            <Sparkles className="size-[15px]" strokeWidth={1.75} />
            {topics.length} topics
          </>
        }
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(28px,4vw,44px)] pb-tail">
        <div className="grid gap-4.5 sm:grid-cols-2 xl:grid-cols-4">
          {topics.map((topic) => (
            <Reveal key={topic.slug}>
              <TopicCard topic={topic} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
