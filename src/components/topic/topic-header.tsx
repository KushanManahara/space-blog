import { Share, Sparkles } from "lucide-react";

import { PageMasthead } from "@/components/layout/page-masthead";
import { PostCover } from "@/components/post/post-cover";
import { getTopicVisual } from "@/components/post/topic-visuals";
import { Button } from "@/components/ui/button";
import type { Topic } from "@/lib/content";

/** Topic masthead: artwork, description and the follow controls. */
export function TopicHeader({ topic }: { topic: Topic }) {
  const visual = getTopicVisual(topic.name);

  return (
    <PageMasthead
      eyebrow="Topic"
      title={topic.name}
      description={topic.description}
      meta={
        <>
          <Sparkles className="size-[15px]" strokeWidth={1.75} />
          {topic.postCount} posts · updated weekly
        </>
      }
      media={
        <PostCover
          topic={topic.name}
          image={visual.image}
          alt={topic.name}
          zoom={false}
          className="aspect-square rounded-2xl border border-line-1/80 shadow-md"
        />
      }
      actions={
        <>
          <Button variant="dark" size="md" className="px-5.5 py-3">
            Follow topic
          </Button>
          <Button variant="subtle" size="icon-lg" aria-label={`Share the ${topic.name} topic`}>
            <Share className="size-4" strokeWidth={1.75} />
          </Button>
        </>
      }
    />
  );
}
