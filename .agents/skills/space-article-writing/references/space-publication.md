# Writing and publishing for Space (Antigravity guide)

How `space-article-writing` connects to the Space codebase (`frontend/`). Detailed code-checked documentation lives in [`docs/authoring/`](../../../../docs/authoring/ARTICLE_AUTHORING_GUIDE.md). If docs and code ever disagree, `src/lib/content/schemas.ts` wins.

## Read before writing

| Read                                                                                                                            | For                                                               |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`ARTICLE_AUTHORING_GUIDE.md`](../../../../docs/authoring/ARTICLE_AUTHORING_GUIDE.md)                                           | Storage layout, core rules, minimal complete post                 |
| [`components.md`](../../../../docs/authoring/components.md)                                                                     | Every block kind, required fields, Markdown vs. plain-text fields |
| [`publishing.md`](../../../../docs/authoring/publishing.md)                                                                     | Post fields, topics, series, covers, SEO, newsletter timing       |
| [`best-practices.md`](../../../../docs/authoring/best-practices.md)                                                             | Visual placement, accessibility, performance, pre-publish checks  |
| [`ai-agents.md`](../../../../docs/authoring/ai-agents.md)                                                                       | Safe `posts.ts` editing, Mermaid validation, adding a block kind  |
| Series memory notes (for example [`deep-learning-series-memory.md`](../../../../docs/authoring/deep-learning-series-memory.md)) | Running examples, notation, counting conventions, series bridges  |
| Top 2–3 posts in `src/lib/content/posts.ts`                                                                                     | Live reference for voice and block composition                    |

## Space technical contract (most common traps)

- **Location & engagement fields:** Insert new posts at the **top** of `parsedPosts` in `src/lib/content/posts.ts`. Always keep `likes: 0`, `views: 0`, `commentCount: 0`, and never set `readingMinutes` (derived automatically).
- **Markdown renders in:** `paragraph.html`, `list.items`, `table.headers` and `rows`, `callout.title` and `body`, `footnotes.items`, and `correction.note`.
- **Plain text only in:** every `caption`, `figure.title`/`note`/`xLabel`/`yLabel`, and `references` `label`/`source`/`note`. Backticks or `**` render literally there.
- **Headings:** Every heading needs a unique `id` (schema rejects duplicates) and plain text with no Markdown (the sidebar table of contents prints plain text).
- **Figures:** `xKey` must differ from every `series[].key` (schema rejects collisions). Keep X-axis tick labels concise so Recharts does not auto-skip ticks on desktop.
- **Emphasis & links:** Use `**bold**` and `*italic*`, never `__` or `_`. Link URLs support underscores and balanced parentheses.
- **Mermaid:** Pinned to `12.3.0` via `@excalidraw/mermaid-to-excalidraw`. HTML tags (`<b>`, `<i>`) are stripped. Keep `flowchart TD` compact (2–3 branches wide, <= 520px tall) so diagrams fit comfortably inside the 656px card without overflow.
- **Runnable Python (`runnable: true`):** Only for pure-Python snippets that execute cleanly in-browser via Pyodide with zero network access and only stdlib/Pyodide-bundled packages.
- **Images:** Set intrinsic `width` and `height` on `image` blocks. For hand-crafted inline SVGs, preview via `qlmanage` + `read_file` before wiring in. For covers (`public/articles/<slug>.png`), activate **`space-editorial-covers`**.
- **Open Graph share cards:** `/articles/<slug>/card.png` renders dynamically (`1200 × 630`) from `opengraph-image.tsx` using `post.coverImage`, and `generateMetadata` automatically appends a content-hash `?v=<hash>` via `articleOgCardVersion()` so LinkedIn/Facebook/WhatsApp caches stay fresh.

## Space editorial conventions

- **House punctuation:** Zero em dashes (`—`) and zero semicolons (`;`) in article prose, deks, captions, callouts, and notes. Code, KaTeX, URLs, and quoted output keep their exact syntax.
- **Topic selection:** Match against each topic's `description` in `src/lib/content/site.ts`, not its label alone. Ask via `ask_question` before adding a new topic.
- **Tags:** Reuse existing tags from `posts.ts` where accurate rather than creating single-post orphan tags.
- **Series continuity:** Update the series memory doc (`docs/authoring/deep-learning-series-memory.md` or equivalent) and link the previous part's closing paragraph forward to the new part.
- **Corrections:** Published factual mistakes use a dated `correction` block, never a silent rewrite. Never change published slugs or heading `id`s.

## Antigravity verification and publish pipeline

Run from `frontend/`:

1. **Automated editorial & asset scan:**
   ```bash
   python3 .agents/skills/space-article-writing/scripts/scan_post.py <slug>
   ```
2. **Format, lint, typecheck, tests, embeddings, build:**
   ```bash
   pnpm exec prettier --write src docs tests scripts && \
   pnpm exec prettier --check src docs tests scripts && \
   pnpm lint && pnpm typecheck && pnpm test && pnpm embeddings && pnpm build
   ```
   _(If `TURSO_DATABASE_URL` is unset in `.env.local`, report the exact page-data collection error honestly without touching `.env.local` or bypassing `src/lib/db/index.ts`.)_
3. **Live visual & interactive verification (`browser` subagent, `Model: "flash"`):**
   - Start `pnpm dev` (`IsDaemon: true`) if not running, then delegate to the `browser` subagent on `http://localhost:3000` at `1280 × 900` in **both light and dark modes**.
   - Confirm `/articles` top card (4:3 crop), `/topics/<topic>`, and `/articles/<slug>`: hero cover sharpness (`w=1200&q=90`), Mermaid fit (`scrollWidth <= clientWidth`), every inline SVG and Recharts figure (all X-axis labels visible), KaTeX equations (zero horizontal scrollbars), tables, callouts, YouTube cards, and zero console/HTTP 4xx–5xx errors.
   - Click **Run** on every `runnable: true` Python block and verify Pyodide stdout matches the prose.
   - Fetch `http://localhost:3000/articles/<slug>/card.png` via `curl` and inspect it with `read_file` to verify the `1200 × 630` OG share card.
4. **Ship only when requested:** Branch from `main` (`feat/<slug>-article`), commit cleanly with atomic commits, open a PR into `main`, watch CI, and merge only when the user asks.
