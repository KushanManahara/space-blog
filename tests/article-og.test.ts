import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { generateMetadata } from "@/app/(site)/articles/[slug]/page";
import { getPostBySlug, siteUrl } from "@/lib/content";
import { articleOgCardVersion, formatOgExcerpt, loadOgCoverImage } from "@/lib/og";

describe("article OG cover loader", () => {
  test("sniffs real PNG covers and reads IHDR dimensions", async () => {
    const asset = await loadOgCoverImage(
      "/articles/why-loss-functions-use-the-log-and-kl-divergence.png",
    );
    assert.ok(asset);
    assert.equal(asset.mime, "image/png");
    assert.ok(asset.dataUri.startsWith("data:image/png;base64,"));
    assert.ok((asset.width ?? 0) >= 1200);
    assert.ok((asset.height ?? 0) >= 600);
  });

  test("sniffs real magic bytes even when a JPEG is saved with a .png extension", async () => {
    const asset = await loadOgCoverImage("/articles/gta-vi-records-engineering-and-lessons.png");
    assert.ok(asset);
    assert.equal(asset.mime, "image/jpeg");
    assert.ok(asset.dataUri.startsWith("data:image/jpeg;base64,"));
    assert.ok((asset.width ?? 0) >= 1200);
    assert.ok((asset.height ?? 0) >= 600);
  });

  test("loads SVG covers and reads viewBox dimensions", async () => {
    const asset = await loadOgCoverImage("/articles/pytorch-series-cover.svg");
    assert.ok(asset);
    assert.equal(asset.mime, "image/svg+xml");
    assert.equal(asset.width, 1200);
    assert.equal(asset.height, 800);
  });

  test("rejects traversal paths, remote URLs, and missing files cleanly", async () => {
    assert.equal(await loadOgCoverImage("/../package.json"), null);
    assert.equal(await loadOgCoverImage("https://example.com/cover.png"), null);
    assert.equal(await loadOgCoverImage("/articles/does-not-exist.png"), null);
    assert.equal(await loadOgCoverImage(undefined), null);
  });
});

describe("formatOgExcerpt", () => {
  test("keeps a complete first sentence when it fits the card cleanly", () => {
    const post = getPostBySlug("gta-vi-records-engineering-and-lessons");
    assert.ok(post);
    const excerpt = formatOgExcerpt(post.dek, 114);
    assert.ok(excerpt.endsWith("on consoles alone."));
    assert.ok(!excerpt.endsWith("…"));
  });

  test("avoids dangling trailing articles or conjunctions when truncating", () => {
    const excerpt = formatOgExcerpt(
      "A single very long opening clause describing distributed inference kernels and a really deep breakdown of cache lines",
      74,
    );
    assert.ok(excerpt.endsWith("…"));
    assert.doesNotMatch(excerpt, /\b(and|a|the|of|to)…$/i);
  });
});

describe("articleOgCardVersion", () => {
  test("produces a stable 8-char hex fingerprint that rotates on metadata or cover changes", async () => {
    const post = getPostBySlug("gta-vi-records-engineering-and-lessons");
    assert.ok(post);

    const v1 = await articleOgCardVersion(post);
    const v1Repeat = await articleOgCardVersion(post);
    const vTitleChanged = await articleOgCardVersion({ ...post, title: `${post.title} v2` });
    const vCoverChanged = await articleOgCardVersion({
      ...post,
      coverImage: "/articles/sir-don-bradman.png",
    });

    assert.match(v1, /^[0-9a-f]{8}$/);
    assert.equal(v1, v1Repeat);
    assert.notEqual(v1, vTitleChanged);
    assert.notEqual(v1, vCoverChanged);
  });
});

describe("article generateMetadata", () => {
  test("emits complete absolute Open Graph and Twitter Card tags per article", async () => {
    const slug = "gta-vi-records-engineering-and-lessons";
    const post = getPostBySlug(slug);
    assert.ok(post);

    const meta = await generateMetadata({
      params: Promise.resolve({ slug }),
      searchParams: Promise.resolve({}),
    });

    const og = meta.openGraph as Record<string, unknown>;
    const tw = meta.twitter as Record<string, unknown>;
    const expectedUrl = `${siteUrl}/articles/${slug}`;
    const expectedVersion = await articleOgCardVersion(post);
    const expectedImage = `${siteUrl}/articles/${slug}/card.png?v=${expectedVersion}`;

    assert.equal(og.type, "article");
    assert.equal(og.title, post.title);
    assert.equal(og.description, post.dek);
    assert.equal(og.url, expectedUrl);

    const ogImages = og.images as Array<Record<string, unknown>>;
    assert.equal(ogImages.length, 1);
    assert.equal(ogImages[0].url, expectedImage);
    assert.equal(ogImages[0].secureUrl, expectedImage);
    assert.equal(ogImages[0].width, 1200);
    assert.equal(ogImages[0].height, 630);
    assert.equal(ogImages[0].type, "image/png");

    assert.equal(tw.card, "summary_large_image");
    assert.equal(tw.title, post.title);
    assert.equal(tw.description, post.dek);
    const twImages = tw.images as Array<Record<string, unknown>>;
    assert.equal(twImages[0].url, expectedImage);
  });
});
