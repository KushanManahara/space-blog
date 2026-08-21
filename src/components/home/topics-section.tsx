import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { TopicTile } from "@/components/topic/topic-tile";
import { routes, topics } from "@/lib/content";

const VISIBLE_TOPICS = 6;

export function TopicsSection() {
  return (
    <section className="mx-auto max-w-page px-gutter py-band">
      <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 className="text-h2 text-fg-1">Topics</h2>
          <p className="mt-2.5 text-[16.5px] text-fg-2">Six things I keep coming back to.</p>
        </div>
        <Link
          href={routes.topics}
          className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-brand transition-opacity duration-300 ease-expo hover:opacity-70"
        >
          All topics
          <span className="inline-flex size-[38px] items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-2">
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </span>
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {topics.slice(0, VISIBLE_TOPICS).map((topic, index) => (
          <Reveal key={topic.slug} index={index}>
            <TopicTile topic={topic} rank={index < 3 ? index + 1 : undefined} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
