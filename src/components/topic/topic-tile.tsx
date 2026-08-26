import Link from "next/link";

import { PostCover } from "@/components/post/post-cover";
import { getTopicVisual } from "@/components/post/topic-visuals";
import type { Topic } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Square topic tile used on the home page and the topic directory. */
export function TopicTile({ topic, rank }: { topic: Topic; rank?: number }) {
  const visual = getTopicVisual(topic.name);

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group block transition-[transform,box-shadow] duration-500 ease-bounce hover:-translate-y-1 active:scale-[0.97] active:duration-150 active:ease-out"
    >
      <PostCover
        topic={topic.name}
        image={visual.image}
        alt={topic.name}
        className="aspect-square rounded-2xl border border-line-1/80 shadow-xs md:rounded-3xl"
      >
        {rank ? (
          <span
            className={cn(
              "absolute top-2.5 left-2.5 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold shadow-xs backdrop-blur-[14px] backdrop-saturate-150",
              visual.ink,
            )}
          >
            #{rank}
          </span>
        ) : null}
      </PostCover>

      <div className="mt-3 flex items-center gap-[9px]">
        <span className={cn("size-2.5 shrink-0 rounded-full", visual.dot)} />
        <div>
          <p className="text-[14.5px] font-semibold text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
            {topic.name}
          </p>
          <p className="text-[12.5px] text-fg-3">{topic.postCount} posts</p>
        </div>
      </div>
    </Link>
  );
}

/** Wide topic row used in search results and the discover sheet. */
export function TopicCard({ topic }: { topic: Topic }) {
  const visual = getTopicVisual(topic.name);

  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="group flex items-center gap-3.5 rounded-xl border border-line-1 bg-bg-2 p-[18px] transition-[transform,box-shadow,border-color] duration-500 ease-bounce hover:-translate-y-1 hover:border-line-2 hover:shadow-card-hover-md active:scale-[0.98] active:duration-150 active:ease-out"
    >
      <PostCover
        topic={topic.name}
        image={visual.image}
        alt={topic.name}
        pattern={false}
        className="size-14 shrink-0 rounded-xl border border-line-1/80 shadow-xs"
      />
      <div>
        <p className="text-[15.5px] font-bold text-fg-1 transition-colors duration-300 ease-expo group-hover:text-brand-strong">
          {topic.name}
        </p>
        <p className="mt-[3px] text-[13px] text-fg-3">{topic.postCount} posts</p>
      </div>
    </Link>
  );
}
