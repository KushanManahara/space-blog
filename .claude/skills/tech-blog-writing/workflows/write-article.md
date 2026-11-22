# Workflow: write a new article

Seven stages. Don't skip one because the article seems simple. For deep technical pieces, also follow [technical-article.md](technical-article.md).

## Stage 1: Understand

- Read **all** of the supplied material completely: notes, research, code, logs, links, earlier drafts. Large files get read in full, in chunks if necessary.
- Write down, for yourself:
  - the subject and the **central idea** in one sentence,
  - the **intended reader** and what they already know,
  - what the reader should be able to **understand or do** afterwards,
  - which claims come from the **source**, and which you'll need to **derive or verify**,
  - what is **personal** to the author (experiences, opinions, decisions), so you use it faithfully and invent nothing beyond it,
  - any **private data** to replace with placeholders.
- If the material leaves the central idea or the audience genuinely unclear, ask **one** concise question. Otherwise proceed on stated assumptions.

## Stage 2: Research

Follow [research-and-sources.md](../references/research-and-sources.md).

- Verify every claim that is current, specialised, disputed or central.
- Read primary sources: docs, specs, papers, source code.
- Collect the references you'll cite, with exact titles and URLs you've opened.
- Note anything you can't verify, so you can qualify it or cut it.
- Look for what the source material misses or gets wrong. If you add a correction or a caveat, verify it and mark it as yours.

## Stage 3: Plan

Follow [article-structure.md](../references/article-structure.md).

- List the reader's questions in the order they'll arise. That's the outline.
- Choose the shape that fits (mechanism, question, debugging story, comparison, analysis), not a template.
- Mark where a diagram, chart, table, formula or runnable example will teach better than prose, and where each concept is first introduced so its visual goes there. See [interactive-visuals.md](../references/interactive-visuals.md).
- For Space, pick the topic, tags and series from [space-publication.md](../references/space-publication.md), and read the series notes if there are any.
- Draft the title and dek now. Rewrite them at the end.

## Stage 4: Write

Write from [human-writing-style.md](../references/human-writing-style.md). Keep [editorial-guidelines.md](../references/editorial-guidelines.md) in mind, but don't write by avoiding a list. Write by explaining clearly to a real reader.

- Open on the real problem, number or question.
- One new idea at a time, each connected to the last.
- Paragraphs for reasoning, lists only for genuinely list-shaped content.
- Real numbers, labelled when they're your calculation.
- Stop when the last real point is made.

For Space, write directly as blocks in `posts.ts` following [`docs/authoring/components.md`](../../../../docs/authoring/components.md). Put plain text in caption, note and reference fields.

## Stage 5: Editorial review

Reread the whole draft against [editorial-guidelines.md](../references/editorial-guidelines.md) and run the [mechanical scan](../references/editorial-checklist.md#mechanical-scan). Look specifically for:

- generic or inflated vocabulary, stock phrases, promotional tone
- repetitive sentence openings and uniform rhythm
- reflexive transitions, negative parallelism, forced triads
- em dashes, semicolons, colon reveals, stray parentheses and arrows
- colon titles and generic headings
- key-value prose and unnecessary bullets or bold
- template structure, generic opening, summary ending
- repeated explanations and over-hedging

Rewrite each problem from its meaning. Ask what the sentence is trying to say, then say that. Swapping one word for a synonym leaves the problem.

## Stage 6: Technical review

- Re-run every calculation. Re-check every unit and dimension.
- Run the code. Confirm any output the article quotes.
- Open every reference and confirm it supports its claim.
- Check terminology is used consistently and correctly.
- For Space, run the pipeline and verify the rendered page as described in [space-publication.md](../references/space-publication.md#verify).

## Stage 7: Final readability review

Read the article top to bottom as the intended reader, without editing. Then:

- Cut anything a reader would skim past.
- Fix anywhere you had to reread a sentence to follow it.
- Check that the voice is the same at the end as at the start.
- Walk the full [editorial checklist](../references/editorial-checklist.md). Every item must pass.

Deliver only when it passes both the editorial and the technical standard. Then tell the user, outside the article, about anything unverified, any conflict you resolved, anything you cut, and anything they need to do (such as generating the cover from your prompt).
