import { and, desc, eq, sql } from "drizzle-orm";

import { author, type Comment, type CommentNode } from "@/lib/content";
import { comments, db, postStats } from "./index";

const TONES: ("violet" | "cornflower" | "orchid")[] = ["violet", "cornflower", "orchid"];

/**
 * Fetch all live post stats (likes, views, comments) as a map keyed by slug.
 */
export async function getAllLivePostStatsMap(): Promise<
  Map<string, { likes: number; views: number; comments: number }>
> {
  const map = new Map<string, { likes: number; views: number; comments: number }>();
  try {
    const rows = await db.select().from(postStats);
    for (const row of rows) {
      map.set(row.slug, { likes: row.likes, views: row.views, comments: 0 });
    }

    const commentRows = await db
      .select({
        postSlug: comments.postSlug,
        count: sql<number>`count(*)`,
      })
      .from(comments)
      // Counts on cards must match what a reader can actually open.
      .where(eq(comments.published, 1))
      .groupBy(comments.postSlug);

    for (const row of commentRows) {
      const existing = map.get(row.postSlug);
      if (existing) {
        existing.comments = Number(row.count);
      } else {
        map.set(row.postSlug, { likes: 0, views: 0, comments: Number(row.count) });
      }
    }
  } catch (error) {
    console.error("Error fetching all live post stats:", error);
  }
  return map;
}

/**
 * Fetch live likes and view count for a specific article from Turso DB.
 */
export async function getLivePostStats(slug: string) {
  try {
    const [row] = await db.select().from(postStats).where(eq(postStats.slug, slug));
    return row ? { likes: row.likes, views: row.views } : null;
  } catch (error) {
    console.error("Error fetching live post stats:", error);
    return null;
  }
}

/**
 * Fetch live reader comments for a specific article from Turso DB.
 */
export async function getLiveComments(slug: string): Promise<CommentNode[]> {
  try {
    const rows = await db
      .select()
      .from(comments)
      // Unreviewed comments exist in the table but never reach the article.
      .where(and(eq(comments.postSlug, slug), eq(comments.published, 1)))
      .orderBy(desc(comments.createdAt));

    const toComment = (row: (typeof rows)[number], index: number): Comment => ({
      id: row.id,
      name: row.authorName,
      role: row.authorRole ?? undefined,
      initials: row.authorInitials || "AN",
      postedAgo: formatTimeAgo(row.createdAt),
      likes: row.likes,
      body: row.body,
      tone: TONES[index % TONES.length],
      parentId: row.parentId ?? undefined,
      isAuthor: row.authorEmail?.toLowerCase() === author.email.toLowerCase(),
    });

    const all = rows.map(toComment);
    const byId = new Map(all.map((comment) => [comment.id, comment]));

    // A reply whose parent is missing (unpublished, or deleted since) would
    // otherwise vanish from the thread entirely, so it is promoted to top level.
    const isOrphan = (comment: Comment) =>
      comment.parentId === undefined || !byId.has(comment.parentId);

    const roots = all.filter(isOrphan).map((comment) => ({ ...comment, replies: [] as Comment[] }));
    const rootsById = new Map(roots.map((root) => [root.id, root]));

    for (const comment of all) {
      if (isOrphan(comment)) continue;
      rootsById.get(comment.parentId!)?.replies.push(comment);
    }

    // Replies read as a conversation, so they run oldest first under a parent
    // that is itself listed newest first.
    for (const root of roots) root.replies.reverse();

    return roots;
  } catch (error) {
    console.error("Error fetching live comments:", error);
    return [];
  }
}

function formatTimeAgo(dateStr?: string | null): string {
  if (!dateStr) return "recently";
  const date = new Date(dateStr);
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}
