/**
 * Reader review moderation from the terminal.
 *
 * Reviews are stored `pending` and stay off the site until approved, either
 * from the signed links in the notification email or here:
 *
 *   pnpm reviews                   list everything awaiting review
 *   pnpm reviews --all             list every review with its status
 *   pnpm reviews approve <id>      publish (id prefix is enough)
 *   pnpm reviews feature <id>      publish and pin to the top
 *   pnpm reviews hide <id>         take a published review down
 *   pnpm reviews reject <id>       refuse it (kept, so it can't be resubmitted)
 *
 * Needs TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for production in .env.local.
 * Pages pick the change up within a minute (their cache window).
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error("TURSO_DATABASE_URL is not set. Check .env.local.");
  process.exit(1);
}
const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const changes = {
  approve: "status = 'approved', featured = 0",
  feature: "status = 'approved', featured = 1",
  hide: "status = 'hidden', featured = 0",
  reject: "status = 'rejected', featured = 0",
} as const;

const [command, target] = process.argv.slice(2);
const isAction = (value: string): value is keyof typeof changes => value in changes;

async function list(all: boolean) {
  const { rows } = await client.execute(
    all
      ? "SELECT * FROM reviews ORDER BY created_at DESC"
      : "SELECT * FROM reviews WHERE status = 'pending' ORDER BY created_at DESC",
  );
  if (rows.length === 0) {
    console.log(all ? "No reviews yet." : "Nothing awaiting review.");
    return;
  }
  for (const r of rows) {
    console.log("─".repeat(72));
    console.log(
      `  id      ${String(r.id).slice(0, 8)}   ${String(r.status).toUpperCase()}${r.featured ? " · FEATURED" : ""}`,
    );
    console.log(`  from    ${r.display_name}${r.email ? ` <${r.email}>` : ""}`);
    console.log(`  rating  ${"★".repeat(Number(r.rating))}${"☆".repeat(5 - Number(r.rating))}`);
    console.log(`  sent    ${r.created_at}\n`);
    console.log(
      String(r.body)
        .split("\n")
        .map((line) => `    ${line}`)
        .join("\n"),
    );
    console.log();
  }
  console.log("─".repeat(72));
}

async function moderate(action: keyof typeof changes) {
  if (!target || target.length < 4) {
    console.error(`Give at least 4 characters of a review id: pnpm reviews ${action} <id>`);
    process.exit(1);
  }
  const { rows } = await client.execute({
    sql: "SELECT id FROM reviews WHERE id LIKE ?",
    args: [`${target}%`],
  });
  if (rows.length !== 1) {
    console.error(
      rows.length
        ? "That prefix matches several reviews. Use more of the id."
        : "No review with that id.",
    );
    process.exit(1);
  }
  await client.execute({
    sql: `UPDATE reviews SET ${changes[action]}, moderated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    args: [rows[0].id],
  });
  console.log(`Done: ${action} ${String(rows[0].id).slice(0, 8)}. Pages update within a minute.`);
}

async function main() {
  if (!command || command === "--all") return list(command === "--all");
  if (isAction(command)) return moderate(command);
  console.error(`Unknown command "${command}". Use approve, feature, hide or reject.`);
  process.exit(1);
}

main();
