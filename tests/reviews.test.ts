import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, test } from "node:test";

import { createClient } from "@libsql/client";

/**
 * Reader reviews: input validation, spam checks, moderation links and the
 * public read path, against a throwaway SQLite file.
 */

const dir = mkdtempSync(join(tmpdir(), "space-reviews-"));
const url = `file:${join(dir, "test.db")}`;
Object.assign(process.env, {
  TURSO_DATABASE_URL: url,
  NEWSLETTER_SECRET: "test-newsletter-secret",
  RESEND_API_KEY: "",
});
const raw = createClient({ url });

type Reviews = typeof import("@/lib/reviews");
let lib: Reviews;

const valid = {
  displayName: "  Ada   Rehman ",
  rating: "5",
  body: "The Git internals article finally made branches click for me.",
  email: "",
};

before(async () => {
  await raw.execute(
    "CREATE TABLE reviews (id text PRIMARY KEY NOT NULL, display_name text NOT NULL, rating integer NOT NULL, body text NOT NULL, email text, status text DEFAULT 'pending' NOT NULL, featured integer DEFAULT 0 NOT NULL, body_hash text NOT NULL UNIQUE, created_at text DEFAULT CURRENT_TIMESTAMP, moderated_at text)",
  );
  lib = await import("@/lib/reviews");
});

after(() => raw.close());

describe("validation", () => {
  test("accepts a normal review and cleans whitespace", () => {
    const parsed = lib.reviewInputSchema.parse(valid);
    assert.equal(parsed.displayName, "Ada Rehman");
    assert.equal(parsed.rating, 5);
    assert.equal(parsed.email, null);
  });

  const rejects: Array<[string, Partial<typeof valid>]> = [
    ["rating 0", { rating: "0" }],
    ["rating 6", { rating: "6" }],
    ["rating 3.5", { rating: "3.5" }],
    ["missing rating", { rating: "" }],
    ["one-letter name", { displayName: "A" }],
    ["61-character name", { displayName: "a".repeat(61) }],
    ["link in name", { displayName: "visit www.spam.example" }],
    ["short review", { body: "Great!" }],
    ["1001-character review", { body: "a".repeat(1001) }],
    ["http link", { body: "Great blog, also see https://spam.example for deals today" }],
    ["www link", { body: "Great blog, also see www.spam.example for cheap deals" }],
    ["markdown link", { body: "Great blog, see [this](spam) for cheap deals and more" }],
    ["HTML", { body: "<script>alert(1)</script> nice blog post honestly" }],
    ["invalid email", { email: "not-an-email" }],
  ];
  for (const [name, change] of rejects) {
    test(`rejects ${name}`, () => {
      assert.equal(lib.reviewInputSchema.safeParse({ ...valid, ...change }).success, false);
    });
  }

  test("strips control and bidi-override characters", () => {
    const parsed = lib.reviewInputSchema.parse({
      ...valid,
      body: "Helpful‮ article\u0007 about internals and hashing.",
    });
    assert.equal(parsed.body, "Helpful article about internals and hashing.");
  });

  test("keeps an optional email, lowercased", () => {
    assert.equal(
      lib.reviewInputSchema.parse({ ...valid, email: " Ada@Example.COM " }).email,
      "ada@example.com",
    );
  });
});

describe("storage", () => {
  test("stores new reviews as pending", async () => {
    const result = await lib.createReview(lib.reviewInputSchema.parse(valid));
    assert.equal(result.status, "created");
    const { rows } = await raw.execute("SELECT status, featured FROM reviews");
    assert.deepEqual([rows[0].status, rows[0].featured], ["pending", 0]);
  });

  test("refuses the same text again, even reformatted", async () => {
    const again = await lib.createReview(
      lib.reviewInputSchema.parse({
        ...valid,
        body: valid.body.toUpperCase().replace(/ /g, "  ") + "!!",
      }),
    );
    assert.equal(again.status, "duplicate");
  });

  test("lists approved reviews only, featured first, without emails", async () => {
    const make = async (body: string, email = "") =>
      lib.createReview(lib.reviewInputSchema.parse({ ...valid, body, email }));
    const a = await make("Second review, approved but not featured at all.");
    const b = await make("Third review, approved and featured at the top.", "hidden@example.com");
    const c = await make("Fourth review, rejected so it must never appear.");
    assert.ok(a.status === "created" && b.status === "created" && c.status === "created");
    await lib.moderateReview(a.id, "approve");
    await lib.moderateReview(b.id, "feature");
    await lib.moderateReview(c.id, "reject");

    const page = await lib.readApprovedReviews(1);
    assert.equal(page.total, 2);
    assert.deepEqual(
      page.items.map((item) => item.id),
      [b.id, a.id],
    );
    assert.ok(page.items[0].featured);
    assert.ok(
      !JSON.stringify(page).includes("hidden@example.com"),
      "email never leaves the database",
    );

    await lib.moderateReview(b.id, "hide");
    assert.equal((await lib.readApprovedReviews(1)).total, 1);
  });

  test("paginates and clamps out-of-range pages", async () => {
    for (let i = 0; i < 4; i++) {
      const r = await lib.createReview(
        lib.reviewInputSchema.parse({
          ...valid,
          body: `Pagination review number ${i} with enough text.`,
        }),
      );
      if (r.status === "created") await lib.moderateReview(r.id, "approve");
    }
    const first = await lib.readApprovedReviews(1, 2);
    assert.equal(first.pageCount, 3);
    assert.equal(first.items.length, 2);
    const beyond = await lib.readApprovedReviews(99, 2);
    assert.equal(beyond.page, 3);
    assert.equal(beyond.items.length, 1);
  });

  test("moderating an unknown review reports it", async () => {
    assert.equal(await lib.moderateReview("missing", "approve"), false);
  });
});

describe("moderation links", () => {
  const link = () => new URL(lib.moderationLink("https://space.test", "abc-123", "approve"));
  const parts = (u: URL) => ({
    id: u.searchParams.get("id") ?? "",
    at: Number(u.searchParams.get("at")),
    t: u.searchParams.get("t"),
  });

  test("a fresh link verifies for its own review and action", () => {
    const { id, at, t } = parts(link());
    assert.equal(lib.verifyModerationLink(id, "approve", at, t), true);
  });

  test("the token can't be reused for another action or review", () => {
    const { id, at, t } = parts(link());
    assert.equal(lib.verifyModerationLink(id, "feature", at, t), false);
    assert.equal(lib.verifyModerationLink("abc-124", "approve", at, t), false);
    assert.equal(lib.verifyModerationLink(id, "approve", at + 1, t), false);
    assert.equal(lib.verifyModerationLink(id, "approve", at, null), false);
  });

  test("expires after 30 days", () => {
    const old = Math.floor(Date.now() / 1000) - 31 * 86_400;
    const signed = new URL(lib.moderationLink("https://space.test", "abc-123", "approve"));
    assert.equal(
      lib.verifyModerationLink("abc-123", "approve", old, signed.searchParams.get("t")),
      false,
    );
  });
});

describe("Turnstile", () => {
  const realFetch = globalThis.fetch;
  const respond = (body: unknown) => {
    globalThis.fetch = async () => new Response(JSON.stringify(body));
  };
  after(() => {
    globalThis.fetch = realFetch;
  });

  test("passes only on success: true", async () => {
    respond({ success: true });
    assert.equal(await lib.verifyTurnstile("token"), true);
    respond({ success: false, "error-codes": ["invalid-input-response"] });
    assert.equal(await lib.verifyTurnstile("token"), false);
    respond({ ok: true });
    assert.equal(await lib.verifyTurnstile("token"), false);
  });

  test("fails closed on a missing or oversized token and on network errors", async () => {
    respond({ success: true });
    assert.equal(await lib.verifyTurnstile(null), false);
    assert.equal(await lib.verifyTurnstile("x".repeat(2049)), false);
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    assert.equal(await lib.verifyTurnstile("token"), false);
  });

  test("refuses everything in production without a secret", async () => {
    respond({ success: true });
    process.env.VERCEL_ENV = "production";
    delete process.env.TURNSTILE_SECRET_KEY;
    try {
      assert.equal(await lib.verifyTurnstile("token"), false);
    } finally {
      delete process.env.VERCEL_ENV;
    }
  });
});
