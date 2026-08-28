"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ListFilter, Tag as TagIcon } from "lucide-react";

import { PostCover } from "@/components/post/post-cover";
import { getTopicVisual } from "@/components/post/topic-visuals";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { tagSlug, type Tag, type Topic } from "@/lib/content";

type DiscoverModalProps = { kind: "topics"; topics: Topic[] } | { kind: "tags"; tags: Tag[] };

/** “Discover other topics / tags” sheet used above the topic archives. */
export function DiscoverModal(props: DiscoverModalProps) {
  const [open, setOpen] = React.useState(false);
  const isTopics = props.kind === "topics";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-[9px] rounded-full border border-line-1 bg-bg-2 px-4.5 py-[11px] text-[13.5px] font-semibold text-fg-1 transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out"
      >
        {isTopics ? (
          <ListFilter className="size-[15px]" strokeWidth={1.75} />
        ) : (
          <TagIcon className="size-[15px]" strokeWidth={1.75} />
        )}
        {isTopics ? "Categories" : "Tags"}
        <ChevronDown className="size-[13px] text-fg-3" strokeWidth={2} />
      </button>

      <DialogContent
        className={isTopics ? "max-w-[820px] p-4.5 sm:p-6.5" : "max-w-[700px] p-4.5 sm:p-6.5"}
      >
        <DialogTitle className="border-b border-line-1 pb-4.5">
          {isTopics ? "Discover other topics" : "Discover other tags"}
        </DialogTitle>

        {isTopics ? (
          <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {props.topics.map((topic) => {
              const visual = getTopicVisual(topic.name);
              return (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-[13px] rounded-md p-2.5 transition-[background-color,transform] duration-300 ease-bounce hover:-translate-y-0.5 hover:bg-veil/75"
                >
                  <PostCover
                    topic={topic.name}
                    image={visual.image}
                    alt={topic.name}
                    zoom={false}
                    className="size-11 shrink-0 rounded-[12px] border border-line-1/80 shadow-2xs"
                  />
                  <span>
                    <span className="block text-[14.5px] font-bold text-fg-1">{topic.name}</span>
                    <span className="mt-0.5 block text-[12.5px] text-fg-3">
                      {topic.postCount} posts
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {props.tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${tagSlug(tag.name)}`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-[15px] py-2.5 text-[13.5px] font-medium text-fg-2 transition-[color,border-color,transform] duration-300 ease-bounce hover:-translate-y-0.5 hover:border-line-brand hover:text-brand"
              >
                {tag.name}
                <span className="text-[11.5px] font-semibold text-fg-3">{tag.postCount}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse justify-end gap-2.5 sm:flex-row sm:gap-3">
          <DialogClose className="cursor-pointer px-4.5 py-2.5 text-center text-[14px] font-semibold text-fg-3 sm:py-3">
            Cancel
          </DialogClose>
          <DialogClose asChild>
            <Button variant="dark" size="md" className="w-full px-6.5 py-3 text-[14px] sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
