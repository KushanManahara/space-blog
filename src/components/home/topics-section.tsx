import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

import { Reveal } from "@/components/motion/reveal";
import { TopicTile } from "@/components/topic/topic-tile";
import { routes, topics } from "@/lib/content";

export function TopicsSection() {
  return (
    <section className="mx-auto max-w-page px-gutter py-band">
      <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 className="text-h2 text-fg-1">Topics</h2>
          <p className="mt-2.5 text-[16.5px] text-fg-2">Things I keep coming back to.</p>
        </div>
        <InteractiveHoverButton
          href={routes.topics}
          variant="secondary"
          className="px-5 py-[11px] text-[14px]"
        >
          All topics
        </InteractiveHoverButton>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {topics.map((topic, index) => (
          <Reveal key={topic.slug} index={index}>
            <TopicTile topic={topic} rank={index < 3 ? index + 1 : undefined} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
