# Workflow: write a new article

Seven stages. Do not skip a stage because a piece looks straightforward. For deep technical explainers, tutorials, or series parts, layer [technical-article.md](./technical-article.md) on top.

## Stage 1: Understand

- Read **all** supplied material completely with `read_file` (notes, storyboards, narration scripts, code, logs, earlier drafts).
- Establish clearly before outlining:
  - the subject and **central idea** in one sentence,
  - the **intended reader** and assumed baseline knowledge,
  - what the reader should understand or be able to do afterward,
  - which claims come from the **source** vs. which you will **verify or derive**,
  - what is **personal** to the author (only use "I" for what the material actually shows),
  - any **private data** to replace with explicit placeholders.
- If the central idea, audience, or series placement is genuinely ambiguous, ask one concise question via `ask_question`. Otherwise state assumptions and proceed.

## Stage 2: Research

Follow [research-and-sources.md](../references/research-and-sources.md).

- Verify current, specialized, disputed, or central claims using `search_web`, prioritizing primary docs, papers, specs, and press releases.
- Confirm direct canonical reference URLs (resolve redirects and verify HTTP `200` via `curl` where possible) rather than citing search-snippet URLs.
- Flag anything unverifiable so you qualify or remove it.

## Stage 3: Plan

Follow [article-structure.md](../references/article-structure.md) and [interactive-visuals.md](../references/interactive-visuals.md).

- List the reader's questions in the order they arise; let that order drive your outline.
- Pick a natural article shape (mechanism, question, debugging story, comparison, analysis) rather than a boilerplate template.
- Plan visuals **at each concept's point of introduction** (inline SVG, Recharts `figure`, compact `mermaid`, `formula`, `table`, or `runnable: true` Pyodide Python).
- Choose `topic` from `src/lib/content/site.ts` descriptions, reuse existing `tags`, and load series memory notes if applicable.
- Draft title and dek now, then sharpen both after writing.

## Stage 4: Write and illustrate

Write from [human-writing-style.md](../references/human-writing-style.md) with [editorial-guidelines.md](../references/editorial-guidelines.md) in mind.

- Open directly on the concrete problem, number, or question.
- Introduce one new idea at a time, connected cleanly to the last.
- Author inline SVGs cleanly (preview with `qlmanage` + `read_file`), and generate the **PREMIUM EDITORIAL DESIGN** cover via the **`space-editorial-covers`** skill (`image-generator` subagent + `sips -s format png` + `read_file` check).
- Insert the finished post object at the **top** of `parsedPosts` in `frontend/src/lib/content/posts.ts` following `src/lib/content/schemas.ts`.

## Stage 5: Editorial review

- Run the automated scanner:
  ```bash
  python3 frontend/.agents/skills/space-article-writing/scripts/scan_post.py <slug>
  ```
- Review every prose block against [editorial-guidelines.md](../references/editorial-guidelines.md): remove inflated vocabulary, stock phrases, reflexive transitions, negative parallelisms, forced triads, em dashes, semicolons, colon reveals, key-value bold bullets, generic headings, and summary endings. Rewrite from meaning, not synonym swaps.

## Stage 6: Technical and visual verification

- Re-run every worked derivation and Python lab locally via `run_command`.
- Run the Space pipeline in `frontend/`: `prettier`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm embeddings`, and `pnpm build`.
- Verify live in the `browser` subagent (`Model: "flash"`) at `1280 × 900` in **light and dark modes**: check `/articles`, `/topics/<topic>`, `/articles/<slug>`, every inline visual and Recharts axis, Mermaid overflow, KaTeX overflow, live Pyodide execution, and `/articles/<slug>/card.png` OG share card via `curl` + `read_file`.

## Stage 7: Final readability pass and delivery

- Read the article top to bottom as the intended reader and clear [editorial-checklist.md](../references/editorial-checklist.md).
- Update series memory notes (if part of a series) and report clearly outside the article what was verified, any caveats, and any follow-up decisions.
