# Editorial checklist

Run this before delivering any article, rewrite, or review. Fix every failure by rewriting from the passage's meaning rather than swapping individual words.

## Mechanical scan (run first)

For any Space post in `src/lib/content/posts.ts`, run the bundled scanner from `frontend/` (or workspace root):

```bash
python3 frontend/.agents/skills/space-article-writing/scripts/scan_post.py <slug>
```

The script checks em dashes, semicolons, Markdown leaks inside plain-text fields and headings, duplicate heading `id`s, missing `public/` image assets, key-value bold bullets, and watch-list cliché terms. Every watch-list hit is a prompt to review, not an automatic ban (for example, "robust" may be the exact statistical term).

## Reader and substance

- [ ] Opening establishes a real problem, number, question, or concrete moment immediately.
- [ ] Central idea is clear in one sentence, and every section advances it.
- [ ] Every paragraph moves the explanation forward with no redundant restatements.
- [ ] Every term, symbol, shape, and API contract is defined before being relied on.
- [ ] The topic is finished for the intended reader: mechanism, worked numbers, and limits without leaving the page.

## Voice and language

- [ ] Sounds like a capable engineer explaining clearly to a peer, never a brochure or chat assistant.
- [ ] Free of inflated significance words (pivotal, testament, tapestry, landscape, delve, underscore) and promotional hype.
- [ ] Sentences use real subjects, plain verbs ("is", "has"), and natural rhythm driven by ideas.
- [ ] Zero reflexive transitions (Additionally, Furthermore, Moreover), negative parallelisms ("not just X, it's Y"), or forced triads.
- [ ] One consistent term per concept throughout.

## Punctuation and formatting

- [ ] Zero em dashes (`—`) and zero semicolons (`;`) in prose, deks, captions, callouts, and notes.
- [ ] Colons, parentheses, and quotation marks used sparingly; zero arrows (`->`, `→`) replacing prose explanation.
- [ ] Bold reserved for a handful of high-signal phrases; lists and tables used only when genuinely helpful; no `**Label:** text` bullet substitutes for paragraphs.
- [ ] Code, KaTeX formulas, URLs, and quoted output keep their exact syntax.

## Titles, headings, and structure

- [ ] Specific, honest title (avoid `Topic: Subtitle` on new posts; under 52 chars keeps `" · Space"` cleanly in search titles).
- [ ] Dek states the concrete payoff rather than announcing "In this post...".
- [ ] Sentence-case headings naming what each section actually says; zero Markdown in headings; unique heading `id`s.
- [ ] Ending adds an implication, limit, rule, or bridge rather than recapping.

## Accuracy, visuals, and verification

- [ ] Current claims verified via `search_web` against primary sources; all reference URLs checked and real.
- [ ] Zero fabricated anecdotes, quotes, benchmarks, or "I" claims unsupported by the user's material.
- [ ] Derived calculations labelled as yours with assumptions stated and verified via Python.
- [ ] Every visual sits right where its concept is introduced, has provenance/units, and passes live `browser` subagent checks in light and dark modes.
- [ ] Runnable Pyodide Python blocks executed live in the browser and stdout matches prose.
- [ ] No private paths, accounts, tokens, or personal identifiers; placeholders clearly labelled.
