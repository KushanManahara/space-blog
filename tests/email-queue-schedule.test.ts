import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, test } from "node:test";

import { createClient } from "@libsql/client";

/**
 * The email-queue schedule: its vercel.json entry and the route it calls.
 * Runs against a throwaway SQLite file with email disabled, so the queue does
 * its database work but never reaches Resend.
 */

const dir = mkdtempSync(join(tmpdir(), "space-schedule-"));
const url = `file:${join(dir, "test.db")}`;
Object.assign(process.env, {
  TURSO_DATABASE_URL: url,
  CRON_SECRET: "test-secret-0123456789",
  VERCEL_ENV: "production",
  RESEND_API_KEY: "",
  NEWSLETTER_SECRET: "",
});

const raw = createClient({ url });
type Route = typeof import("@/app/api/cron/email-queue/route");
let GET: Route["GET"];

const call = (headers: Record<string, string> = {}) =>
  GET(new Request("https://space.test/api/cron/email-queue", { headers }));
const scheduled = (executionId: string) =>
  call({ authorization: "Bearer test-secret-0123456789", "ce-id": executionId });
const lockRows = async () =>
  (await raw.execute("SELECT count(*) AS n FROM rate_limits WHERE key = 'email-queue-lock:run'"))
    .rows[0].n;

before(async () => {
  await raw.executeMultiple(`
    CREATE TABLE rate_limits (key text PRIMARY KEY, count integer DEFAULT 0 NOT NULL, window_start integer NOT NULL);
    CREATE TABLE newsletter_subscribers (
      id integer PRIMARY KEY AUTOINCREMENT, email text NOT NULL UNIQUE,
      created_at text DEFAULT CURRENT_TIMESTAMP, confirmed integer DEFAULT 1 NOT NULL,
      confirm_sent_at integer, confirm_attempts integer DEFAULT 0 NOT NULL,
      welcome_pending integer DEFAULT 0 NOT NULL);
  `);
  ({ GET } = await import("@/app/api/cron/email-queue/route"));
});

after(() => raw.close());

describe("vercel.json", () => {
  const config = JSON.parse(readFileSync("vercel.json", "utf8"));

  test("has no legacy crons, so the route cannot run twice per occurrence", () => {
    assert.equal(config.crons, undefined);
  });

  test("declares the email-queue schedule", () => {
    assert.deepEqual(config.schedules["email-queue"], {
      schedule: "15 0 * * *",
      timezone: "Asia/Colombo",
      path: "/api/cron/email-queue",
      requestMethod: "GET",
    });
  });
});

describe("GET /api/cron/email-queue", () => {
  test("rejects a missing or wrong secret", async () => {
    assert.equal((await call()).status, 401);
    assert.equal((await call({ authorization: "Bearer wrong" })).status, 401);
  });

  test("runs the queue for an authorised scheduled delivery", async () => {
    const response = await scheduled("schx_first");
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      expired: 0,
      started: [],
      confirmations: 0,
      broadcast: 0,
      welcomes: 0,
      pruned: 0,
    });
  });

  test("releases the lock after a run", async () => {
    assert.equal(await lockRows(), 0);
  });

  test("skips a repeated delivery of the same execution", async () => {
    const response = await scheduled("schx_first");
    assert.equal(response.status, 200);
    assert.equal((await response.json()).skipped, "duplicate delivery");
  });

  test("refuses to overlap a run already in progress", async () => {
    const now = Math.floor(Date.now() / 1000);
    await raw.execute({
      sql: "INSERT INTO rate_limits (key, count, window_start) VALUES ('email-queue-lock:run', 1, ?)",
      args: [now],
    });
    const response = await scheduled("schx_second");
    assert.equal(response.status, 409);
    await raw.execute("DELETE FROM rate_limits WHERE key = 'email-queue-lock:run'");
  });

  test("takes over a lock left by a crashed run once it expires", async () => {
    await raw.execute({
      sql: "INSERT INTO rate_limits (key, count, window_start) VALUES ('email-queue-lock:run', 1, ?)",
      args: [Math.floor(Date.now() / 1000) - 601],
    });
    assert.equal((await scheduled("schx_third")).status, 200);
  });

  test("still runs a manual call without an execution ID", async () => {
    assert.equal((await call({ authorization: "Bearer test-secret-0123456789" })).status, 200);
  });

  test("expires unconfirmed signups older than 14 days", async () => {
    await raw.execute(
      "INSERT INTO newsletter_subscribers (email, confirmed, created_at) VALUES ('old@x.test', 0, datetime('now', '-15 days'))",
    );
    const response = await scheduled("schx_fourth");
    assert.equal((await response.json()).expired, 1);
  });

  test("prunes rate-limit rows whose window closed over two days ago", async () => {
    const now = Math.floor(Date.now() / 1000);
    await raw.execute({
      sql: "INSERT INTO rate_limits (key, count, window_start) VALUES ('view:old', 1, ?), ('view:recent', 1, ?)",
      args: [now - 3 * 86_400, now - 3_600],
    });
    const response = await scheduled("schx_prune");
    assert.equal((await response.json()).pruned, 1);
    const keys = (await raw.execute("SELECT key FROM rate_limits")).rows.map((row) => row.key);
    assert.ok(!keys.includes("view:old"));
    assert.ok(keys.includes("view:recent"));
    assert.ok(keys.includes("schedule-run:schx_prune"), "today's dedupe record is kept");
  });

  test("does nothing outside production", async () => {
    process.env.VERCEL_ENV = "preview";
    try {
      const response = await scheduled("schx_preview");
      assert.equal((await response.json()).skipped, "not production");
    } finally {
      process.env.VERCEL_ENV = "production";
    }
  });
});
