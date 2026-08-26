import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local first, fallback to .env
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { createClient } from "@libsql/client";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";

import { posts } from "../src/lib/content/posts";
import { postStats } from "../src/lib/db/schema";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("❌ Error: TURSO_DATABASE_URL is not defined in .env.local");
  process.exit(1);
}

const client = createClient({ url, authToken });
const db = drizzle(client);

const isForce = process.argv.includes("--force") || process.argv.includes("-f");

async function sync() {
  console.log(`\n🚀 Starting database sync with Turso...`);
  console.log(`📡 Database URL: ${url}`);
  console.log(
    `⚙️  Mode: ${isForce ? "Force Overwrite (Hard reset)" : "Safe Sync (Preserves live user activity)"}\n`,
  );

  // Ensure tables exist
  console.log("🛠️  Ensuring database tables exist...");
  await client.execute(`
    CREATE TABLE IF NOT EXISTS post_stats (
      slug TEXT PRIMARY KEY,
      likes INTEGER NOT NULL DEFAULT 0,
      views INTEGER NOT NULL DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      post_slug TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_initials TEXT NOT NULL,
      tone TEXT NOT NULL DEFAULT 'cornflower',
      body TEXT NOT NULL,
      likes INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("  ✓ All tables verified.\n");

  let postsSynced = 0;

  // 1. Sync Post Stats (Likes & Views)
  console.log("📦 Syncing articles & metadata...");
  for (const post of posts) {
    if (isForce) {
      await db
        .insert(postStats)
        .values({
          slug: post.slug,
          likes: post.likes,
          views: post.views,
        })
        .onConflictDoUpdate({
          target: postStats.slug,
          set: {
            likes: post.likes,
            views: post.views,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          },
        });
    } else {
      // Safe sync: keep whichever is higher (local baseline vs live user interactions)
      await db
        .insert(postStats)
        .values({
          slug: post.slug,
          likes: post.likes,
          views: post.views,
        })
        .onConflictDoUpdate({
          target: postStats.slug,
          set: {
            likes: sql`MAX(${postStats.likes}, ${post.likes})`,
            views: sql`MAX(${postStats.views}, ${post.views})`,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          },
        });
    }
    postsSynced++;
    console.log(
      `  ✓ Synced: [${post.topic}] ${post.slug} (${post.likes} likes, ${post.views} views)`,
    );
  }

  // 2. Clean up synthetic comments and deprecated slugs
  console.log("\n🧹 Purging synthetic placeholder comments & deprecated slugs...");
  await client.execute(`
    DELETE FROM comments WHERE id IN ('maya-krishnan', 'tomas-silveira', 'ada-rehman');
  `);
  await client.execute(`
    DELETE FROM post_stats WHERE slug = 'multi-agentic-course-certification';
  `);
  console.log("  ✓ Purged placeholder comments & duplicate slugs from database.");

  console.log(`\n🎉 Sync complete!`);
  console.log(`   • Articles synced: ${postsSynced}\n`);
}

sync()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Sync failed:", err);
    process.exit(1);
  });
