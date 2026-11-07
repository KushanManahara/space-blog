import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { type AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, test } from "node:test";

import { createClient } from "@libsql/client";

/**
 * Automatic new-post emails. Runs the daily queue against a throwaway SQLite
 * file and a local stand-in for the Resend API that records what was sent.
 */

const sent: string[] = [];
const resend: Server = createServer((request, response) => {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    const parsed: unknown = JSON.parse(body || "{}");
    const emails = (Array.isArray(parsed) ? parsed : [parsed]) as { to: string; subject: string }[];
    for (const email of emails) sent.push(`${email.to} | ${email.subject}`);
    response.setHeader("content-type", "application/json");
    response.end(
      JSON.stringify(
        Array.isArray(parsed) ? { data: emails.map((_, i) => ({ id: `b${i}` })) } : { id: "e" },
      ),
    );
  });
});

const dir = mkdtempSync(join(tmpdir(), "space-auto-broadcast-"));
const url = `file:${join(dir, "test.db")}`;
const raw = createClient({ url });

type Newsletter = typeof import("@/lib/newsletter");
type Content = typeof import("@/lib/content");
let processEmailQueue: Newsletter["processEmailQueue"];
let AUTO_BROADCAST_FROM: string;
let template: Content["posts"][number];

const daysAgo = (days: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo" }).format(
    new Date(Date.now() - days * 86_400_000),
  );
const post = (slug: string, publishedAt: string) => ({ ...template, slug, publishedAt });
const broadcastRows = async () =>
  (await raw.execute("SELECT slug FROM broadcasts ORDER BY slug")).rows.map((row) => row.slug);

before(async () => {
  await new Promise<void>((resolve) => resend.listen(0, resolve));
  Object.assign(process.env, {
    TURSO_DATABASE_URL: url,
    RESEND_API_KEY: "re_test",
    NEWSLETTER_SECRET: "test-newsletter-secret",
    RESEND_BASE_URL: `http://localhost:${(resend.address() as AddressInfo).port}`,
  });

  await raw.executeMultiple(`
    CREATE TABLE rate_limits (key text PRIMARY KEY, count integer DEFAULT 0 NOT NULL, window_start integer NOT NULL);
    CREATE TABLE newsletter_subscribers (
      id integer PRIMARY KEY AUTOINCREMENT, email text NOT NULL UNIQUE,
      created_at text DEFAULT CURRENT_TIMESTAMP, confirmed integer DEFAULT 1 NOT NULL,
      confirm_sent_at integer, confirm_attempts integer DEFAULT 0 NOT NULL,
      welcome_pending integer DEFAULT 0 NOT NULL);
    CREATE TABLE email_usage (period text PRIMARY KEY NOT NULL, count integer DEFAULT 0 NOT NULL);
    CREATE TABLE broadcasts (slug text PRIMARY KEY NOT NULL, started_at text NOT NULL, completed_at text);
    CREATE TABLE broadcast_deliveries (slug text NOT NULL, email text NOT NULL, sent_at integer NOT NULL, PRIMARY KEY (slug, email));
    INSERT INTO newsletter_subscribers (email, confirmed, created_at) VALUES
      ('reader-one@x.test', 1, datetime('now', '-1 day')),
      ('reader-two@x.test', 1, datetime('now', '-1 day')),
      ('unconfirmed@x.test', 0, datetime('now', '-1 day'));
    UPDATE newsletter_subscribers SET confirm_sent_at = 1 WHERE confirmed = 0;
  `);

  ({ processEmailQueue, AUTO_BROADCAST_FROM } = await import("@/lib/newsletter"));
  ({
    posts: [template],
  } = await import("@/lib/content"));
});

after(() => {
  resend.close();
  raw.close();
});

describe("automatic new-post emails", () => {
  test("never mails posts dated before automatic sending existed", async () => {
    const summary = await processEmailQueue([post("old-post", "2026-10-17")]);
    assert.deepEqual(summary.started, []);
    assert.deepEqual(sent, []);
  });

  test("sends a newly published post to confirmed subscribers only", async () => {
    const today = daysAgo(0);
    assert.ok(today >= AUTO_BROADCAST_FROM, "test assumes today is after the cutoff");

    const summary = await processEmailQueue([post("new-post", today)]);
    assert.deepEqual(summary.started, ["new-post"]);
    assert.equal(summary.broadcast, 2);
    assert.deepEqual(sent.map((line) => line.split(" | ")[0]).sort(), [
      "reader-one@x.test",
      "reader-two@x.test",
    ]);
  });

  test("does not send the same post again on the next run", async () => {
    sent.length = 0;
    const summary = await processEmailQueue([post("new-post", daysAgo(0))]);
    assert.deepEqual(summary.started, []);
    assert.equal(summary.broadcast, 0);
    assert.deepEqual(sent, []);
  });

  test("leaves a post already sent by hand alone", async () => {
    await raw.execute(
      "INSERT INTO broadcasts (slug, started_at, completed_at) VALUES ('manual-post', datetime('now'), datetime('now'))",
    );
    const summary = await processEmailQueue([post("manual-post", daysAgo(0))]);
    assert.deepEqual(summary.started, []);
    assert.deepEqual(sent, []);
  });

  test("waits for a post dated in the future", async () => {
    const summary = await processEmailQueue([post("scheduled-post", daysAgo(-2))]);
    assert.deepEqual(summary.started, []);
    assert.ok(!(await broadcastRows()).includes("scheduled-post"));
  });

  test("skips a post dated more than two weeks ago", async () => {
    const stale = daysAgo(15);
    if (stale < AUTO_BROADCAST_FROM) return; // covered by the cutoff test until then
    const summary = await processEmailQueue([post("stale-post", stale)]);
    assert.deepEqual(summary.started, []);
  });
});
