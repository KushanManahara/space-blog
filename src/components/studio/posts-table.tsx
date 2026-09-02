// src/components/studio/posts-table.tsx

import Link from "next/link";

import { PostCover } from "@/components/post/post-cover";
import { getTopicVisual } from "@/components/post/topic-visuals";
import { BroadcastButton } from "@/components/studio/broadcast-button";
import { StatusPill } from "@/components/studio/status-pill";
import { routes, type Post, type StudioPost } from "@/lib/content";
import { formatCount, formatDate } from "@/lib/format";

// GRID COLUMN CONFIGURATION FOR STUDIO POST ROWS
const COLUMNS = "lg:grid-cols-[2.3fr_0.9fr_0.8fr_0.9fr_160px]";

export function PostsTable({ rows }: { rows: Array<StudioPost & { post: Post }> }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line-1 bg-bg-1">
      <div
        className={`hidden gap-4.5 border-b border-line-1 bg-bg-3 px-6 py-4 text-[11.5px] font-bold tracking-[0.1em] text-fg-3 uppercase lg:grid ${COLUMNS}`}
      >
        <span>Post</span>
        <span>Stats</span>
        <span>Status</span>
        <span>Date created</span>
        <span className="sr-only">Actions</span>
      </div>

      {rows.map(({ post, status }) => {
        const visual = getTopicVisual(post.topic);

        return (
          <div
            key={post.slug}
            className={`grid gap-3 border-b border-line-1 px-4 py-4 transition-colors duration-300 ease-expo last:border-b-0 hover:bg-bg-2 sm:px-6 lg:items-center lg:gap-4.5 ${COLUMNS}`}
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <PostCover
                topic={post.topic}
                image={post.coverImage}
                zoom={false}
                className="size-11 shrink-0 rounded-full"
              />
              <div className="min-w-0">
                <p className="truncate text-[14.5px] leading-[1.35] font-semibold text-fg-1">
                  {post.title}
                </p>
                <p className={`mt-1 text-[12.5px] ${visual.label}`}>{post.topic}</p>
              </div>
            </div>

            <p className="text-[13px] leading-[1.55] text-fg-2">
              {formatCount(post.views)} views
              <br />
              <span className="text-fg-3">{post.commentCount} comments</span>
            </p>

            <div>
              <StatusPill status={status} />
            </div>

            <p className="text-[13px] text-fg-3">{formatDate(post.publishedAt)}</p>

            <div className="flex items-center gap-2.5 lg:justify-end">
              <BroadcastButton postSlug={post.slug} postTitle={post.title} />
              <Link
                href={`${routes.editor}?post=${post.slug}`}
                className="text-[13px] font-semibold text-fg-1 underline decoration-n-300 underline-offset-[3px] transition-colors duration-300 ease-expo hover:text-brand"
              >
                Edit
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
