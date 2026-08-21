"use client";

import * as React from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/lib/content";
import { cn } from "@/lib/utils";

const toneStyles = {
  violet: "bg-tint-violet text-brand-strong",
  cornflower: "bg-tint-cornflower text-fg-link",
  orchid: "bg-tint-orchid text-accent-orchid",
} as const;

/** Response thread. Posting is local-only until a comments backend exists. */
export function CommentThread({ comments, total }: { comments: Comment[]; total: number }) {
  const [draft, setDraft] = React.useState("");
  const [posted, setPosted] = React.useState<Comment[]>([]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;

    setPosted((current) => [
      {
        id: `local-${current.length}`,
        name: "You",
        initials: "YO",
        postedAgo: "just now",
        likes: 0,
        tone: "cornflower",
        body,
      },
      ...current,
    ]);
    setDraft("");
  };

  return (
    <section className="mt-11">
      <h2 className="text-[22px] font-bold tracking-[-0.015em] text-fg-1">
        Responses ({total + posted.length})
      </h2>

      <form onSubmit={submit} className="mt-4.5 rounded-lg border border-line-1 bg-bg-2 p-4.5">
        <label htmlFor="comment-body" className="sr-only">
          Add to the discussion
        </label>
        <Textarea
          id="comment-body"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add to the discussion"
          className="min-h-21 resize-y rounded-none border-0 bg-transparent p-1 focus-visible:ring-0"
        />
        <div className="mt-2.5 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setDraft("")}
            className="cursor-pointer px-4 py-2.5 text-[13.5px] font-semibold text-fg-3"
          >
            Cancel
          </button>
          <Button type="submit" variant="dark" size="sm" disabled={draft.trim().length === 0}>
            Post
          </Button>
        </div>
      </form>

      <div className="mt-5 flex flex-col gap-3.5">
        {[...posted, ...comments].map((comment) => (
          <article key={comment.id} className="flex gap-3.5">
            <span
              className={cn(
                "inline-flex size-9.5 shrink-0 items-center justify-center rounded-full text-[13px] font-bold",
                toneStyles[comment.tone],
              )}
            >
              {comment.initials}
            </span>
            <div className="flex-1 rounded-md border border-line-1 bg-bg-2 px-4.5 py-4">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-bold text-fg-1">{comment.name}</p>
                <p className="text-[12.5px] text-fg-3">· {comment.postedAgo}</p>
              </div>
              <p className="mt-2 text-[14.5px] leading-[1.65] text-fg-2">{comment.body}</p>
              <div className="mt-3 flex items-center gap-3.5 text-[12.5px] text-fg-3">
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="size-[13px]" strokeWidth={1.75} />
                  {comment.likes}
                </span>
                <button type="button" className="cursor-pointer font-semibold hover:text-fg-1">
                  Reply
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 text-center">
        <Button variant="secondary" size="lg" className="text-[14px]">
          View all {total} responses
        </Button>
      </div>
    </section>
  );
}
