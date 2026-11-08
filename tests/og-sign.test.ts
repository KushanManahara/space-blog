import assert from "node:assert/strict";
import { before, describe, test } from "node:test";

/** Page names on the share card are only printed when we signed them. */

process.env.NEWSLETTER_SECRET = "test-newsletter-secret";
let og: typeof import("@/lib/og-sign");
before(async () => {
  og = await import("@/lib/og-sign");
});

const parts = (path: string) => {
  const url = new URL(path, "https://space.test");
  return [url.searchParams.get("label"), url.searchParams.get("s")] as const;
};

describe("share card labels", () => {
  test("a signed page name verifies", () => {
    const [label, sig] = parts(og.ogCardPath("Reader reviews"));
    assert.equal(og.verifiedLabel(label, sig), "Reader reviews");
  });

  test("no label gives the plain card", () => {
    assert.equal(og.ogCardPath(), "/og");
    assert.equal(og.ogCardPath("   "), "/og");
  });

  test("an edited label or a made-up signature is refused", () => {
    const [, sig] = parts(og.ogCardPath("Reader reviews"));
    assert.equal(og.verifiedLabel("Free money", sig), undefined);
    assert.equal(og.verifiedLabel("Reader reviews", "abc"), undefined);
    assert.equal(og.verifiedLabel("Reader reviews", null), undefined);
  });

  test("labels are capped at 60 characters", () => {
    const [label] = parts(og.ogCardPath("x".repeat(80)));
    assert.equal(label?.length, 60);
    assert.equal(og.verifiedLabel("x".repeat(61), "anything"), undefined);
  });

  test("without a secret nothing is signed or printed", () => {
    const saved = process.env.NEWSLETTER_SECRET;
    delete process.env.NEWSLETTER_SECRET;
    try {
      assert.equal(og.ogCardPath("Topics"), "/og");
      assert.equal(og.verifiedLabel("Topics", "abc"), undefined);
    } finally {
      process.env.NEWSLETTER_SECRET = saved;
    }
  });
});
