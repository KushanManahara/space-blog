import type { Metadata } from "next";

import { Overline } from "@/components/layout/section-header";
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
    <section className="mx-auto max-w-page px-gutter pt-[clamp(44px,6vw,80px)] pb-tail">
      <Reveal className="mb-8.5 max-w-[620px]">
        <Overline>Topics</Overline>
        <h1 className="mt-4.5 text-h1 text-fg-1">
          Everything I keep
          <br />
          coming back to.
        </h1>
        <p className="mt-4.5 text-[17.5px] text-fg-2">
          Each topic collects the posts, corrections and traces that belong together.
        </p>
      </Reveal>

      <div className="grid gap-4.5 sm:grid-cols-2 xl:grid-cols-4">
        {topics.map((topic) => (
          <Reveal key={topic.slug}>
            <TopicCard topic={topic} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
