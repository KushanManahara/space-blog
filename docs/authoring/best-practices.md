# Authoring best practices

The full editorial standard lives in the project skill at [`.claude/skills/tech-blog-writing/`](../../.claude/skills/tech-blog-writing/SKILL.md). This page is the short version, plus the Space-specific parts.

## Writing

- Write like a knowledgeable person explaining something to a curious peer. Clear beats clever.
- Open with the concrete moment, number or question at the heart of the piece. Do not announce what the article will cover.
- Build from first principles with zero black boxes: explain why concepts exist, how mechanisms work internally, and every symbol or step in a derivation rather than assuming prior knowledge.
- Ensure self-contained completeness: finish the core topic thoroughly without leaving knowledge gaps or unexplained jumps. For series articles, preserve established terminology, running examples, and continuity documented in `deep-learning-series-memory.md` (or the relevant series notes).
- Keep the source's claims and your own calculations visibly separate. Label derived numbers as yours and state assumptions.
- Never invent experiences, results, quotes, benchmarks or references.
- House punctuation: avoid em dashes and semicolons in prose. Sentence-case headings. Bold sparingly.
- End on an insight, a limitation or a next step. No recap.

## Choosing visuals

Add a visual only when it teaches better than prose.

| Reader need                               | Block                        |
| ----------------------------------------- | ---------------------------- |
| How parts connect, a process, a data flow | `mermaid`                    |
| How one quantity changes with another     | `figure` (`line` or `area`)  |
| Comparing a few values                    | `figure` (`bar`)             |
| Comparing options on several criteria     | `table`                      |
| "Try it and see" for an algorithm         | `code` with `runnable: true` |
| The equation everything rests on          | `formula`                    |
| A caveat the reader must not miss         | `callout`                    |
| A screenshot or illustration              | `image`                      |
| A spoken walkthrough exists               | `video`                      |

For each visual:

- **Introduce visuals right where concepts first appear:** Put each concept's primary curve, diagram, or illustration directly alongside its first explanation rather than deferring visualization to a later multi-concept comparison section. For example, show `ReLU`'s own curve the moment `ReLU` is introduced instead of waiting for a later comparison plot.
- Put it right next to the text that explains it. Say before it what to look for and after it what it showed.
- Label axes, units and series. State whether data is measured, computed or illustrative.
- Keep the default view meaningful. Many readers never hover or click.
- Prefer purposeful concept visuals over decorative chrome: pair clear prose with meaningful curves, diagrams, or illustrations whenever visual intuition helps a learner see how a mechanism behaves.

## Interactivity

Today the interactive pieces are charts (hover, legend toggles), runnable Python and click-to-load video. Use runnable code where changing a value and re-running teaches something, such as a learning rate, a parameter count or a hash.

Sliders and simulations do not exist as blocks yet. If an article needs one, add a block kind first in its own PR (see [ai-agents.md](ai-agents.md#adding-a-new-block-kind)), then use it.

## Accessibility

- Every `image` needs real `alt` text.
- Captions are also read by audio narration, so write them as sentences that make sense aloud.
- Headings must form a real outline: level 2 for sections, level 3 only inside one.
- Do not convey meaning with colour alone. Name the series in labels and captions.
- Link text should say where it goes ("the PyTorch autograd notes"), not "here".
- Tables need a header row. Keep them narrow enough to scan.

## Performance

- Chart, formula and runnable-code renderers are lazy-loaded per block kind, so a post pays only for what it uses. Do not add a heavy block just for decoration.
- Set `width` and `height` on images to prevent layout shift.
- Prefer `figure` over large static chart images.
- Videos cost nothing until played. Prefer `video` over embedding a player another way.

## Maintainability

- Reuse existing tags and topics. Check `/tags` before inventing one.
- Keep slugs stable forever.
- Fix factual errors with a dated `correction` block, not a silent edit.
- Use placeholders for any personal path, account, host or identifier.
- Keep one article per object in `posts.ts`. Do not share body arrays between posts.

## Pre-publish checklist

- [ ] Title specific, dek states the payoff, topic matches its description, tags reused where possible
- [ ] Every heading has a unique `id`
- [ ] No Markdown inside captions, figure notes or reference fields
- [ ] `figure` `xKey` differs from every series key, tables have matching row lengths
- [ ] Runnable code actually runs
- [ ] Mermaid source validated, and every visual renders in `pnpm dev`
- [ ] References are real, primary where possible, and support their claims
- [ ] No personal data, no secrets in code samples
- [ ] Em dashes and semicolons removed from prose
- [ ] `pnpm format && pnpm lint && pnpm typecheck && pnpm embeddings && pnpm build` all pass
