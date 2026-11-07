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
const COLUMNS = [
  {
    table: "newsletter_subscribers",
    column: "confirmed",
    // Default 1: every existing row predates double opt-in and stays subscribed.
    ddl: "ALTER TABLE newsletter_subscribers ADD COLUMN confirmed integer DEFAULT 1 NOT NULL",
  },
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

  for (const { table, column, ddl } of COLUMNS) {
    const existing = await client.execute(`PRAGMA table_info(${table})`);
    if (existing.rows.some((row) => row.name === column)) {
      console.log(`migrate: ${table}.${column} already present`);
      continue;
    }
    await client.execute(ddl);
    console.log(`migrate: added ${table}.${column}`);
  }
}

main().catch((error) => {
  console.error("migrate: failed", error);
  process.exit(1);
});
