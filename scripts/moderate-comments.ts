/**
 * Comment moderation queue.
 *
 * Comments are written with `published = 0` and stay invisible until approved
 * here. Studio is still a mock, so this is the review surface.
 *
 *   pnpm comments                 list everything awaiting review
 *   pnpm comments --all           include already-published comments
 *   pnpm comments approve <id>    publish one (id prefix is enough)
 *   pnpm comments approve --all   publish everything pending
 *   pnpm comments reject <id>     delete one permanently
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

const [command, target] = process.argv.slice(2);
const wantsAll = process.argv.includes("--all");

function line(char = "─") {
  console.log(char.repeat(72));
}

async function list() {
  const rows = await client.execute(
    wantsAll
      ? "SELECT * FROM comments ORDER BY created_at DESC"
      : "SELECT * FROM comments WHERE published = 0 ORDER BY created_at DESC",
  );

  if (rows.rows.length === 0) {
    console.log(wantsAll ? "No comments at all." : "Nothing awaiting review.");
    return;
  }

  console.log(`\n${rows.rows.length} comment(s)${wantsAll ? "" : " awaiting review"}:\n`);

  for (const r of rows.rows) {
    line();
    console.log(
      `  id       ${String(r.id).slice(0, 8)}   ${r.published ? "PUBLISHED" : "PENDING"}`,
    );
    console.log(`  article  ${r.post_slug}`);
    console.log(
      `  author   ${r.author_name} <${r.author_email ?? "no email"}> — ${r.author_role ?? "—"}`,
    );
    console.log(`  posted   ${r.created_at}`);
    console.log();
    console.log(
      String(r.body)
        .split("\n")
        .map((l) => `    ${l}`)
        .join("\n"),
    );
    console.log();
  }
  line();
  console.log(`\nApprove with:  pnpm comments approve ${String(rows.rows[0].id).slice(0, 8)}\n`);
}

async function approve() {
  if (wantsAll) {
    const res = await client.execute("UPDATE comments SET published = 1 WHERE published = 0");
    console.log(`Published ${res.rowsAffected} comment(s).`);
    return;
  }
  if (!target) {
    console.error("Give a comment id: pnpm comments approve <id>");
    process.exit(1);
  }
  const res = await client.execute({
    sql: "UPDATE comments SET published = 1 WHERE id LIKE ?",
    args: [`${target}%`],
  });
  console.log(
    res.rowsAffected
      ? `Published ${res.rowsAffected} comment(s). It is live on the article now.`
      : `No pending comment matching "${target}".`,
  );
}

async function reject() {
  if (!target) {
    console.error("Give a comment id: pnpm comments reject <id>");
    process.exit(1);
  }
  const res = await client.execute({
    sql: "DELETE FROM comments WHERE id LIKE ?",
    args: [`${target}%`],
  });
  console.log(
    res.rowsAffected
      ? `Deleted ${res.rowsAffected} comment(s).`
      : `No comment matching "${target}".`,
  );
}

async function main() {
  if (command === "approve") return approve();
  if (command === "reject") return reject();
  if (command && command !== "list") {
    console.error(`Unknown command "${command}". Use list, approve or reject.`);
    process.exit(1);
  }
  return list();
}

main().catch((error) => {
  console.error("Moderation failed:", error);
  process.exit(1);
});
