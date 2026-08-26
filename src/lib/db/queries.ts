import { desc, eq } from "drizzle-orm";

import type { Comment } from "@/lib/content";
import { comments, db, postStats } from "./index";

const TONES: ("violet" | "cornflower" | "orchid")[] = ["violet", "cornflower", "orchid"];

/**
 * Fetch all live post stats (likes, views) as a map keyed by slug.
 */
export async function getAllLivePostStatsMap(): Promise<
  Map<string, { likes: number; views: number }>
> {
  const map = new Map<string, { likes: number; views: number }>();
  try {
    const rows = await db.select().from(postStats);
    for (const row of rows) {
      map.set(row.slug, { likes: row.likes, views: row.views });
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
export async function getLiveComments(slug: string): Promise<Comment[]> {
  try {
    const rows = await db
      .select()
      .from(comments)
      .where(eq(comments.postSlug, slug))
      .orderBy(desc(comments.createdAt));

    return rows.map((row, index) => ({
      id: row.id,
      name: row.authorName,
      role: row.authorRole ?? undefined,
      initials: row.authorInitials || "AN",
      postedAgo: formatTimeAgo(row.createdAt),
      likes: row.likes,
      body: row.body,
      tone: TONES[index % TONES.length],
    }));
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
