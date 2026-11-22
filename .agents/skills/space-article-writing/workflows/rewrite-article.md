# Workflow: rewrite or polish an existing article

Use when improving, tightening, restructuring, adding inline visuals to, or polishing an existing draft or published Space post.

## Core rule

**Improve the expression; preserve the author's meaning.** Keep the author's conclusions, opinions, technical decisions, and real experiences intact unless the user explicitly asks to change them or a claim is factually wrong.

## Steps

1. **Read the entire post first** with `read_file` and identify its central idea, intended reader, and claims.
2. **Diagnose structure before sentences:** Run `scripts/scan_post.py <slug>` and list structural, accuracy, and visual gaps by severity. Fix ordering, missing inline visuals, and redundant sections before polishing wording.
3. **Rewrite weak passages from meaning:** State plainly what the passage is trying to say and write that cleanly using [human-writing-style.md](../references/human-writing-style.md) and [editorial-guidelines.md](../references/editorial-guidelines.md).
4. **Verify any touched facts or code:** Re-check numbers, URLs, and runnable Python whenever wording changes precision.
5. **Clear the checklist and Space pipeline:** Re-run `scripts/scan_post.py <slug>`, `prettier`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm embeddings`, and live light/dark `browser` subagent verification.

## Rules for already-published Space posts

- **Never change the `slug` or existing heading `id`s** (URLs, anchors, comments, and view counts depend on them).
- **Keep the existing title** unless the user asks for a new title.
- **Factual errors use a dated `correction` block** at the relevant spot rather than a silent edit. Clarity, visual additions, and style edits happen in place.
- **Always rebuild `public/embeddings.json`** (`pnpm embeddings`) after text edits.
- **Preserve verified chart, table, and code data** unless correcting an error.

## Bulk sweeps across multiple posts

When running a punctuation or style sweep across multiple articles:

- Rewrite each occurrence by hand (choosing comma, full stop, or parentheses for that specific sentence) rather than blind global regex replacement.
- Leave code, KaTeX, Mermaid source, URLs, and quoted output untouched.
- Report exact before/after counts and any factual or schema issues spotted along the way.
