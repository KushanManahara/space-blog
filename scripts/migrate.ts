import { createClient } from "@libsql/client";

/**
 * Additive schema changes, applied by the production build.
 *
 * Schema changes used to be a manual `pnpm db:push`, and one that was missed
 * took newsletter signup down on production: the code shipped, the column did
 * not. Running here means the two ship together, and the build fails rather
 * than deploying code against a schema it cannot use.
 *
 * Only add steps a running older deployment can tolerate (new tables, new
 * columns with defaults). Each is checked first, so re-running changes nothing.
 * `drizzle-kit push` is deliberately not used: it can prompt, and it can drop.
 */
const COLUMNS: { table: string; column: string; ddl: string; backfill?: string }[] = [
  {
    table: "newsletter_subscribers",
    column: "confirmed",
    // Default 1: every existing row predates double opt-in and stays subscribed.
    ddl: "ALTER TABLE newsletter_subscribers ADD COLUMN confirmed integer DEFAULT 1 NOT NULL",
  },
  {
    table: "newsletter_subscribers",
    column: "confirm_sent_at",
    ddl: "ALTER TABLE newsletter_subscribers ADD COLUMN confirm_sent_at integer",
    // Unconfirmed rows from before the queue existed already had their email
    // attempt; without this the first queue run would mail all of them again.
    backfill:
      "UPDATE newsletter_subscribers SET confirm_sent_at = CAST(strftime('%s', created_at) AS integer) WHERE confirmed = 0",
  },
  {
    table: "newsletter_subscribers",
    column: "confirm_attempts",
    ddl: "ALTER TABLE newsletter_subscribers ADD COLUMN confirm_attempts integer DEFAULT 0 NOT NULL",
  },
  {
    table: "newsletter_subscribers",
    column: "welcome_pending",
    ddl: "ALTER TABLE newsletter_subscribers ADD COLUMN welcome_pending integer DEFAULT 0 NOT NULL",
  },
];

const TABLES = [
  "CREATE TABLE IF NOT EXISTS email_usage (period text PRIMARY KEY NOT NULL, count integer DEFAULT 0 NOT NULL)",
  "CREATE TABLE IF NOT EXISTS broadcasts (slug text PRIMARY KEY NOT NULL, started_at text NOT NULL, completed_at text)",
  "CREATE TABLE IF NOT EXISTS broadcast_deliveries (slug text NOT NULL, email text NOT NULL, sent_at integer NOT NULL, PRIMARY KEY (slug, email))",
  "CREATE TABLE IF NOT EXISTS reviews (id text PRIMARY KEY NOT NULL, display_name text NOT NULL, rating integer NOT NULL, body text NOT NULL, email text, status text DEFAULT 'pending' NOT NULL, featured integer DEFAULT 0 NOT NULL, body_hash text NOT NULL UNIQUE, created_at text DEFAULT CURRENT_TIMESTAMP, moderated_at text)",
  "CREATE INDEX IF NOT EXISTS reviews_status_idx ON reviews (status, featured, created_at)",
];

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("migrate: skipped, not a production build");
    return;
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  for (const ddl of TABLES) await client.execute(ddl);

  for (const { table, column, ddl, backfill } of COLUMNS) {
    const existing = await client.execute(`PRAGMA table_info(${table})`);
    if (existing.rows.some((row) => row.name === column)) {
      console.log(`migrate: ${table}.${column} already present`);
      continue;
    }
    await client.execute(ddl);
    if (backfill) await client.execute(backfill);
    console.log(`migrate: added ${table}.${column}`);
  }
}

main().catch((error) => {
  console.error("migrate: failed", error);
  process.exit(1);
});
