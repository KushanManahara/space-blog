# Workflow: rewrite or polish an existing article

Use when the user wants an existing draft or published post improved, shortened, restructured, made more natural, or brought in line with these guidelines.

## The rule for rewrites

**Change the expression, keep the meaning.** The author's conclusions, claims, technical decisions, opinions and experiences stay exactly as they are unless the user asks otherwise or one is factually wrong. Improving how something is said is your job. Changing what is said is not.

## Steps

1. **Read the whole piece** before touching anything. Note its central idea, intended reader, and the claims it makes.
2. **Diagnose first.** Run the [review workflow](review-article.md) mentally or for real and list the problems by severity. Fix structure before sentences. Polishing paragraphs you're about to cut wastes effort.
3. **Fix structure** if needed: reorder to follow the reader's questions, merge sections that repeat, split a section doing two jobs, cut what doesn't serve the central idea. See [article-structure.md](../references/article-structure.md).
4. **Rewrite passages from their meaning.** For each weak passage, state in plain words what it's trying to say, then write that. Use [human-writing-style.md](../references/human-writing-style.md) as the target and [editorial-guidelines.md](../references/editorial-guidelines.md) to catch patterns.
5. **Check facts you touch.** If a rewrite changes how precisely a claim is stated, make sure the new wording is still true. Verify anything that looks wrong and fix errors openly (see below).
6. **Run the [editorial checklist](../references/editorial-checklist.md)** on the result.
7. **For Space**, run the pipeline and the render check in [space-publication.md](../references/space-publication.md#verify).

## Published Space articles

- **Never change the slug or heading `id`s.** Links, anchors, stats and comments depend on them.
- **Keep the title** unless the user asks for a new one. Titles that use the `Topic: Subtitle` pattern stay.
- **Factual errors get a dated `correction` block** at the point they apply, not a silent edit. Wording, clarity and style fixes can be edited in place.
- **Rebuild embeddings** (`pnpm embeddings`) after any text change.
- **Preserve every component's data** (chart values, table cells, code) unless you are correcting it.

## Bulk punctuation or pattern sweeps

When the task is a sweep across many posts (for example removing em dashes from the archive):

- Rewrite each occurrence by hand, choosing a comma, full stop or parentheses for that sentence. A regex can't make that choice.
- Make each edit an exact, unique match inside its own string, so nothing else moves.
- Leave code, Mermaid source, formulas, URLs and quoted output alone.
- Report the before and after counts, and list any content fixes found along the way.

## Reporting

Tell the user what kind of changes you made (structure, voice, accuracy), any facts you corrected and how, and anything you deliberately left alone. Keep it short, since the diff shows the details.
