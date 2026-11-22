---
name: space-article-writing
description: >-
  Write, rewrite, polish, or review human-first technical blog articles for
  Space (`frontend/src/lib/content/posts.ts`). Use when drafting a new article
  from notes, research, videos, code, or a topic; writing a series part (such as
  Deep Learning); rewriting or de-AI'ing an existing post; reviewing a draft;
  adding inline visuals (Mermaid diagrams, Recharts figures, inline SVGs,
  runnable Pyodide Python); or verifying and publishing an article on Space.
---

# Human-first technical blog writing for Space

Write like a knowledgeable engineer explaining a subject to a capable colleague from a neighbouring team. Clear beats clever, accuracy beats smoothness, and every visual or code block earns its place by teaching something prose alone cannot.

The goal is writing a careful human editor would publish: specific, verified, easy to follow, and recognisably written with a clear point of view. Never add deliberate typos, awkward grammar, or fabricated personal stories to "sound human."

## Priority when instructions conflict

When two sources disagree, resolve in this order and note how you resolved it:

1. **The user's explicit request** for this article.
2. **Space's code contract** (`src/lib/content/schemas.ts` and component renderers, documented in [docs/authoring/ARTICLE_AUTHORING_GUIDE.md](../../../docs/authoring/ARTICLE_AUTHORING_GUIDE.md)).
3. **Series continuity notes** when the post belongs to a series (for example [deep-learning-series-memory.md](../../../docs/authoring/deep-learning-series-memory.md)).
4. **This skill's editorial rules.**
5. **Older published posts.** Match house style where it agrees with the rules above; never copy weak legacy habits (such as em-dash stacks, colon titles, or summary endings).

## Non-negotiable rules

- **Verify before claiming.** Use `search_web` for current facts, versions, and primary sources; run calculations and Python code via `run_command` before quoting numbers or output.
- **Never fabricate.** Zero invented incidents, quotes, benchmarks, metrics, or URLs. Use "I" only for experiences or opinions directly grounded in the user's source material.
- **Separate sources from derivations.** Label numbers you computed yourself and state the assumptions.
- **Inline visuals at point of introduction.** Place each concept's primary curve, diagram, or illustration right where the concept is first introduced, not deferred to a later comparison section.
- **No black boxes.** Define terms, symbols, tensor shapes, and API contracts before relying on them.
- **House punctuation for prose.** Prefer full stops and commas. Zero em dashes (`—`) and zero semicolons (`;`) in article prose, deks, captions, callouts, and notes. Keep colons, parentheses, and quotation marks minimal. Code, KaTeX, URLs, and quoted output keep their exact syntax.
- **Plain text in non-Markdown fields.** Never put `**` or backticks inside captions, figure titles/notes/axis labels, or reference fields. Keep Markdown out of heading text too (the sidebar TOC renders plain text).
- **Specific titles and headings.** Avoid `Topic: Subtitle` colon titles and generic headings ("Introduction", "Key benefits", "Final thoughts") on new posts. Never change slugs or heading `id`s of already-published posts.
- **Privacy.** Replace personal paths, accounts, hostnames, and identifiers with placeholders and tell the reader they are placeholders.

## Antigravity tool map

| Task                                                                           | Antigravity tool / subagent                                            |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Read source notes, code, and Space authoring docs                              | `read_file`                                                            |
| Research current facts, primary docs, and HTTP 200 URLs                        | `search_web` + `run_command` (`curl`)                                  |
| Clarify genuine ambiguity (audience, series placement)                         | `ask_question` (at most one focused pass)                              |
| Run derivations, prose scan, and Space build/test pipeline                     | `run_command` ([scripts/scan_post.py](./scripts/scan_post.py), `pnpm`) |
| Generate editorial cover artwork                                               | `image-generator` subagent (activate `space-editorial-covers`)         |
| Verify rendered layout, light/dark themes, SVGs, charts, and Pyodide labs live | `browser` subagent (`Model: "flash"`) against `http://localhost:3000`  |

## Choose a workflow

| Request                                                            | Workflow                                                                                        |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| New article from notes, research, video, code, or a topic          | [workflows/write-article.md](./workflows/write-article.md)                                      |
| Deep technical explainer, tutorial, or series part                 | [workflows/technical-article.md](./workflows/technical-article.md) on top of `write-article.md` |
| Improve, shorten, restructure, or polish an existing draft or post | [workflows/rewrite-article.md](./workflows/rewrite-article.md)                                  |
| Review a draft without editing it, or run a pre-publish gate       | [workflows/review-article.md](./workflows/review-article.md)                                    |

## References (load as needed)

Always read `human-writing-style.md` and `space-publication.md` before drafting or editing a Space post. Load the others progressively as needed.

- [references/human-writing-style.md](./references/human-writing-style.md) — House voice, ten habits of strong technical writers, contractions, bold restraint, and before/after calibration.
- [references/editorial-guidelines.md](./references/editorial-guidelines.md) — 27 researched generic/AI-style prose patterns with strength ratings (`Strong`, `Default`, `Optional`) and rewrites.
- [references/article-structure.md](./references/article-structure.md) — Question-led outlines, article shapes, openings, headings, paragraphs vs. lists, endings, titles, and deks.
- [references/technical-writing.md](./references/technical-writing.md) — Progressive explanation, worked numbers, code, maths, trade-offs, and domain-specific notes.
- [references/research-and-sources.md](./references/research-and-sources.md) — Source hierarchy, verification rules, citations, and research bibliography.
- [references/interactive-visuals.md](./references/interactive-visuals.md) — Choosing Space blocks, inline concept visuals, Mermaid/Recharts/Pyodide rules, and specs for new interactive blocks.
- [references/space-publication.md](./references/space-publication.md) — Space content model, gotchas, publishing pipeline, OG share card awareness, and live browser QA.
- [references/editorial-checklist.md](./references/editorial-checklist.md) — Complete pre-delivery quality gate paired with [scripts/scan_post.py](./scripts/scan_post.py).

For cover image direction, generation prompts, and Open Graph share card checks, also load the companion **`space-editorial-covers`** skill.

## Delivering

A Space article is ready only after it clears [scripts/scan_post.py](./scripts/scan_post.py), the `pnpm` checks (`prettier`, `lint`, `typecheck`, `test`, `embeddings`, `build`), live browser inspection in light and dark modes (including running any Pyodide lab), and [references/editorial-checklist.md](./references/editorial-checklist.md). Keep process notes, caveats, and verification summaries in your reply, never inside the published article.
