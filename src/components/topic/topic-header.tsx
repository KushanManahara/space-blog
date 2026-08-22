import { Share, Sparkles } from "lucide-react";

import { CoverRings, PostCover } from "@/components/post/post-cover";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { Topic } from "@/lib/content";

/** Topic masthead: artwork, description and the follow controls. */
export function TopicHeader({ topic }: { topic: Topic }) {
  return (
    <section className="relative mx-auto max-w-page px-gutter pt-[clamp(28px,4.5vw,52px)]">
      <Reveal className="flex flex-wrap items-center gap-[clamp(20px,3vw,32px)] rounded-xl border border-line-1 bg-bg-2/85 p-[clamp(24px,3vw,34px)] shadow-md backdrop-blur-md">
        <PostCover
          topic={topic.name}
          zoom={false}
          className="size-33 shrink-0 rounded-lg shadow-md"
        >
          <CoverRings sizes={[150]} className="[&>div]:top-[60%]" />
        </PostCover>

        <div className="min-w-65 flex-1">
          <span className="rounded-full bg-tint-cornflower px-3 py-1.5 text-[11.5px] font-semibold text-fg-link">
            Topic
          </span>
          <h1 className="mt-3.5 text-h4 text-fg-1">{topic.name}</h1>
          <p className="mt-3 max-w-[620px] text-[15.5px] leading-[1.65] text-fg-2">
            {topic.description}
          </p>
          <p className="mt-3.5 flex items-center gap-2 text-[13.5px] text-fg-3">
            <Sparkles className="size-[15px]" strokeWidth={1.75} />
            {topic.postCount} posts · updated weekly
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="dark" size="md" className="px-5.5 py-3">
            Follow topic
          </Button>
          <Button variant="subtle" size="icon-lg" aria-label={`Share the ${topic.name} topic`}>
            <Share className="size-4" strokeWidth={1.75} />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
