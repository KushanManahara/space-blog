# Instructions for AI coding agents

For Claude Code, Codex and any other agent asked to write or edit a Space article. Read this file and [ARTICLE_AUTHORING_GUIDE.md](ARTICLE_AUTHORING_GUIDE.md) before editing content.

For the writing itself (voice, structure, research, and the write, rewrite and review workflows), follow the project skill at [`.claude/skills/tech-blog-writing/SKILL.md`](../../.claude/skills/tech-blog-writing/SKILL.md). Claude Code loads it automatically. Other agents should open that file and follow the workflow it selects.

## Source of truth

When this documentation and the code disagree, the code wins. Check these before writing:

| Question                                             | File                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Which block kinds and fields exist                   | `src/lib/content/schemas.ts` (`articleBlockSchema`, `postSchema`)         |
| How each block renders                               | `src/components/article/article-body.tsx` and the renderers it imports    |
| Which fields render Markdown                         | `src/components/article/markdown.ts` and where `markdownToHtml` is called |
| Topics and series                                    | `src/lib/content/site.ts`                                                 |
| Existing articles to match in tone and component use | top of `src/lib/content/posts.ts`                                         |
| `Deep Learning` series memory & continuity           | [deep-learning-series-memory.md](deep-learning-series-memory.md)          |

## Task recipe: write a new article

1. Read the source material completely. Note which claims come from the source and which you will derive. If writing a part in an ongoing series (such as `Deep Learning`), read its series memory doc first so explanations, notation, and running examples stay continuous.
2. Read two or three recent articles in `posts.ts` to match voice, structure and component use.
3. Choose `topic` from the descriptions in `site.ts`. If nothing fits, ask the owner. Do not create a topic on your own.
4. Create a branch from `main`.
5. Insert the post as the first element of the array in `posts.ts`. Use [components.md](components.md) for every block's fields. Build every explanation from first principles with no unexplained jargon, black boxes, or skipped derivation steps, and place relevant curves, diagrams, or illustrations right alongside each concept when it is first introduced rather than waiting for later comparison sections. When generating a cover thumbnail, follow the **PREMIUM EDITORIAL DESIGN** standard in [publishing.md](publishing.md#cover-images) (varied topic-relevant composition, palette, lighting, and environment; prominent subject inside the central `60%` safe zone with generous side margins; avoid clutter, generic AI clichés, and repetitive layouts; minimal or no embedded text).
6. Run `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm embeddings`, `pnpm build`.
7. Start `pnpm dev`, open `/articles/<slug>`, and confirm each visual renders. Scroll diagrams and charts into a visible viewport first, they render lazily.
8. If adding or advancing a series, update the series memory doc (`deep-learning-series-memory.md` or equivalent) so future articles retain established context.
9. Commit the post, any assets, updated docs/memory, and `public/embeddings.json`. Open a PR. Do not merge or deploy unless asked.
10. Report what you verified and what you could not.

## Hard rules

- Do not invent block kinds or fields. If the schema does not have it, it does not render.
- Do not invent facts, results, quotes or references. Every `references` URL must be real.
- Do not set `readingMinutes`. Keep `likes`, `views`, `commentCount` at `0`.
- Do not change existing slugs or heading ids.
- No Markdown in plain-text fields (table/figure/formula/mermaid/image/video captions, figure `note`, reference `label`/`source`/`note`).
- In `figure`, `xKey` must not equal a series `key`.
- Heading `id`s must be unique. The build rejects duplicates, and a `figure` `xKey` that equals a series key.
- No Markdown in heading text (the table of contents prints it as plain text), no `__`/`_` emphasis, and at most one Markdown link per text block.
- No `<b>`/`<i>` styling in Mermaid labels. The Excalidraw converter strips it.
- Only mark code `runnable: true` if it runs under Pyodide in the browser without network access.
- Keep personal data out. Use placeholders and say they are placeholders.
- Avoid em dashes and semicolons in prose. Code and formulas are exempt.
- Do not claim a visual or interaction works unless you rendered it.

## Editing safely in posts.ts

`posts.ts` is one large file. Make targeted edits:

- Anchor edits on the unique `slug: "<slug>"` line, then the specific block text.
- Escape correctly for the string delimiter you are inside (`\"` in double-quoted strings, `\\` for LaTeX backslashes).
- Use a template literal for multi-line Mermaid and never include backticks or `${` inside it.
- After editing, `pnpm typecheck` catches schema violations with the exact path.

## Validating Mermaid

Diagram conversion runs in the browser. To check new source without scrolling a page, run this in the dev page console, using the version from `package.json`:

```js
const m = (await import("https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs"))
  .default;
m.initialize({ startOnLoad: false });
await m.parse(source); // throws on syntax errors
const { svg } = await m.render("probe", source);
```

## Adding a new block kind

Only when an article genuinely needs it, as a separate PR before the article.

1. Add the shape to `articleBlockSchema` in `src/lib/content/schemas.ts`.
2. Handle it in the exhaustive switch in `src/lib/content/block-text.ts` (search and reading time).
3. Render it in `src/components/article/article-body.tsx`. Client-only renderers must be lazy-loaded with `next/dynamic` like `ArticleGraph`, so other posts do not pay for them.
4. Add a case in `src/lib/content/export-article.ts` (Markdown copy). It has a default, so this is optional but recommended.
5. Add a case in `src/lib/audio/article-narrator.ts` if the block should be read aloud.
6. Follow the design tokens in `src/app/globals.css`, support light and dark themes, keyboard use and reduced motion.
7. `pnpm typecheck` lists any switch you missed. Document the new kind in [components.md](components.md).

## Things that look broken but are not

- Charts and diagrams appear empty in a hidden or non-painting browser pane. They render on intersection and measured width. Scroll them into view in a visible window.
- Rendered diagrams contain no Mermaid `.node` classes, because they are converted to Excalidraw SVG.
- Next/Image serves an optimised derivative (`/_next/image?url=…`), not the original file.
