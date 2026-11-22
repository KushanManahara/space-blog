import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { markdownToHtml, markdownToText } from "@/components/article/markdown";
import { formatArticleToHtml, formatArticleToMarkdown } from "@/lib/content/export-article";
import { articleBlockSchema, postSchema, type Post } from "@/lib/content/schemas";

const href = (html: string) => html.match(/href="([^"]*)"/)?.[1];

describe("markdownToHtml links", () => {
  test("underscores inside a link URL are left alone", () => {
    const html = markdownToHtml("[docs](https://example.com/foo_bar_baz/a__b__c)");
    assert.equal(href(html), "https://example.com/foo_bar_baz/a__b__c");
  });

  test("balanced parentheses inside a link URL are kept", () => {
    const html = markdownToHtml("[page](https://en.wikipedia.org/wiki/Pascal_(unit)) next");
    assert.equal(href(html), "https://en.wikipedia.org/wiki/Pascal_(unit)");
    assert.match(html, /<\/a> next$/);
  });

  test("emphasis outside and inside the label still works", () => {
    const html = markdownToHtml("**bold** and [*it*](https://a.com/x_y_z)");
    assert.match(html, /<strong[^>]*>bold<\/strong>/);
    assert.equal(href(html), "https://a.com/x_y_z");
  });

  test("two links in one block don't inject emphasis", () => {
    const html = markdownToHtml("See [a](https://a.com/x) and [b](https://b.com/y) here.");
    assert.doesNotMatch(html, /<em/);
    assert.equal((html.match(/target="_blank"/g) ?? []).length, 2);
  });

  test("raw HTML links keep their attributes intact", () => {
    const html = markdownToHtml(
      '<a href="https://a.com/x">a</a> and <a href="https://b.com/y">b</a>',
    );
    assert.doesNotMatch(html, /<em/);
  });

  test("emphasis next to two links still renders", () => {
    const html = markdownToHtml("*one* [a](https://a.com) _two_ [b](https://b.com)");
    assert.equal((html.match(/<em/g) ?? []).length, 2);
  });

  test("unsafe schemes are still blocked", () => {
    assert.equal(href(markdownToHtml("[x](javascript:alert(1))")), "#");
  });
});

describe("markdownToText", () => {
  test("strips inline markdown for plain-text surfaces", () => {
    assert.equal(
      markdownToText("Why **`sha1`** is *not* [enough](https://a.com) ~~yet~~"),
      "Why sha1 is not enough yet",
    );
  });
});

const basePost = (body: unknown[]): unknown => ({
  slug: "t",
  title: "T",
  dek: "D",
  topic: "Systems",
  publishedAt: "2026-01-01",
  likes: 0,
  views: 0,
  commentCount: 0,
  tags: [],
  body,
});

describe("schema conventions", () => {
  test("duplicate heading ids are rejected", () => {
    const result = postSchema.safeParse(
      basePost([
        { kind: "heading", id: "a", text: "A" },
        { kind: "heading", id: "a", text: "Again" },
      ]),
    );
    assert.equal(result.success, false);
  });

  test("a figure whose xKey is also a series key is rejected", () => {
    const result = articleBlockSchema.safeParse({
      kind: "figure",
      variant: "line",
      title: "t",
      xKey: "step",
      series: [{ key: "step", label: "s" }],
      data: [{ step: 1 }],
    });
    assert.equal(result.success, false);
  });

  test("a valid post still parses", () => {
    assert.equal(
      postSchema.safeParse(basePost([{ kind: "heading", id: "a", text: "A" }])).success,
      true,
    );
  });
});

describe("article export", () => {
  const post = postSchema.parse(
    basePost([
      { kind: "paragraph", html: "Some **bold** text" },
      {
        kind: "chart",
        title: "Bandwidth",
        note: "n",
        caption: "c",
        bars: [{ label: "SRAM", value: "80", heightPercent: 100, from: "#000", to: "#fff" }],
      },
    ]),
  ) as Post;

  test("markdown copy keeps legacy chart blocks", () => {
    assert.match(formatArticleToMarkdown(post), /Bandwidth/);
    assert.match(formatArticleToMarkdown(post), /SRAM: 80/);
  });

  test("rich-HTML copy converts inline markdown", () => {
    const html = formatArticleToHtml(post);
    assert.match(html, /<strong[^>]*>bold<\/strong>/);
    assert.doesNotMatch(html, /\*\*bold\*\*/);
  });
});
