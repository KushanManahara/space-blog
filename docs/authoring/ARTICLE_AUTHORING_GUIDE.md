# Space article authoring guide

How to write, structure, enrich and publish an article on Space. Written for human authors and AI coding agents alike. Everything here describes behaviour that exists in the codebase today. Where a capability does not exist, the guide says so.

| Document                               | Read it when you need                                              |
| -------------------------------------- | ------------------------------------------------------------------ |
| This file                              | The model, the workflow, and the rules that matter most            |
| [components.md](components.md)         | Every body block: what it does, when to use it, a working example  |
| [publishing.md](publishing.md)         | Metadata, images, SEO, series, the publish pipeline, deploy checks |
| [best-practices.md](best-practices.md) | Writing, interactivity, accessibility, performance                 |
| [ai-agents.md](ai-agents.md)           | Operating instructions for Claude Code, Codex and other agents     |

Writing voice and editorial standards live in the user-level `tech-blog-writing` skill. This guide covers the Space side: what the app can render and how content ships.

## 1. How articles work

There is no Markdown file per article and no CMS. Every article is a typed object in one array:

```
src/lib/content/posts.ts      ← all articles, newest first
src/lib/content/schemas.ts    ← postSchema + articleBlockSchema (the contract)
src/lib/content/site.ts       ← topics, series, reading paths
src/components/article/       ← one renderer per block kind
```

`posts.ts` is parsed through the zod schemas when the module loads. A malformed article fails the build, it never reaches readers half-broken.

An article body is an array of **blocks**. Each block has a `kind` and the fields that kind requires:

```ts
body: [
  { kind: "paragraph", html: "Opening paragraph with **bold** and `code`." },
  { kind: "heading", id: "how-it-works", text: "How it works" },
  { kind: "figure", variant: "line", title: "…", xKey: "x", series: [...], data: [...] },
  { kind: "references", items: [...] },
]
```

The block kinds are: `paragraph`, `heading`, `list`, `code`, `formula`, `table`, `figure`, `chart`, `mermaid`, `image`, `video`, `callout`, `correction`, `footnotes`, `references`. See [components.md](components.md).

## 2. The ten rules that prevent most mistakes

1. **New articles go at the top of the array** in `posts.ts`.
2. **Keep `likes`, `views`, `commentCount` at `0`.** Live counts come from the database. Never seed them.
3. **Do not write `readingMinutes`.** It is derived from the body at 200 words a minute.
4. **Markdown renders in some fields only.** Paragraphs, headings, list items, table cells and callout title/body render inline Markdown. Captions (table, figure, formula, mermaid, image, video), figure notes and reference fields are plain text, so backticks and `**` appear literally there.
5. **Every heading needs a unique `id`.** It becomes the anchor and the table-of-contents entry.
6. **In a `figure`, `xKey` must not equal any series `key`.**
7. **Every table row must have as many cells as `headers`.** The schema rejects mismatches.
8. **`runnable: true` only on browser-safe Python** (no network, no API keys, no packages Pyodide lacks).
9. **No personal data.** Use placeholder paths, account names and hostnames, and tell the reader they are placeholders. Git history is public and permanent.
10. **Run the full pipeline before opening a PR:** `pnpm format && pnpm lint && pnpm typecheck && pnpm embeddings && pnpm build`.

## 3. Minimal complete article

```ts
{
  slug: "how-dns-caching-works",
  title: "How DNS Caching Works, One Resolver at a Time",
  dek: "Every lookup you make is answered from a cache somewhere. Here is where those caches live, how long they keep an answer, and why a changed record can take hours to reach you.",
  topic: "Systems",
  publishedAt: "2026-11-18",
  likes: 0,
  views: 0,
  commentCount: 0,
  tags: ["#dns", "#networking", "#caching"],
  coverImage: "/articles/how-dns-caching-works.png",
  body: [
    { kind: "paragraph", html: "You change a DNS record and nothing happens for an hour." },
    { kind: "heading", id: "where-caches-live", text: "Where the caches live" },
    { kind: "paragraph", html: "There are at least four, and each has its own clock." },
    {
      kind: "references",
      items: [
        {
          label: "RFC 1035: Domain names, implementation and specification",
          href: "https://www.rfc-editor.org/rfc/rfc1035",
          source: "IETF",
        },
      ],
    },
  ],
},
```

## 4. Authoring workflow

1. **Read the material.** Notes, research, code, logs. Note what the source claims and what you will calculate yourself.
2. **Choose the topic** by reading each topic's description in `site.ts`, not its name. See [publishing.md](publishing.md#topics).
3. **Outline in blocks.** Decide where a diagram, chart, table or runnable example will teach better than prose.
4. **Write** following [best-practices.md](best-practices.md) and the `tech-blog-writing` skill.
5. **Add the cover** at `public/articles/<slug>.png` (or `.svg`).
6. **Validate**: pipeline commands, then open the article in `pnpm dev` and check every visual renders.
7. **Ship**: branch, commit, PR. Merging to `main` deploys through Vercel. Then verify production. See [publishing.md](publishing.md#publish-pipeline).

## 5. What interactivity exists today

| Capability                           | Block                     | Interaction                                                                                      |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------ |
| Line, area and bar charts            | `figure`                  | Hover tooltips, click legend to toggle series                                                    |
| Diagrams                             | `mermaid`                 | Rendered as hand-drawn style SVG, copy and expand controls                                       |
| Runnable Python                      | `code` + `runnable: true` | Edit and run in the browser through Pyodide                                                      |
| Video                                | `video`                   | YouTube player loads only on play                                                                |
| Audio narration                      | automatic                 | "Listen" reads headings, paragraphs, lists, callouts, code labels, image/figure/mermaid captions |
| Reader mode, copy page, print, share | automatic                 | Provided by the article page                                                                     |

**Not available yet:** sliders, parameter-driven simulations, steppers, toggles inside the body, or embeds other than YouTube. If an article genuinely needs one, add a new block kind first (separate PR). The steps are in [ai-agents.md](ai-agents.md#adding-a-new-block-kind).
