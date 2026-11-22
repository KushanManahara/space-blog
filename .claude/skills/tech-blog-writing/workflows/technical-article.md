# Workflow: deep technical articles

Use this together with [write-article.md](write-article.md) for explainers, tutorials, analyses of technical claims, and series parts. It adds the depth and verification steps technical readers need. Reference: [technical-writing.md](../references/technical-writing.md).

## Before writing

1. **Fix the reader.** Write one line describing what they know. If the article is part of a series, the series notes set the level. Follow them.
2. **Fix the running example.** Choose one concrete example (a model, a request, a dataset, a ticket) to carry through the whole article. In a series, reuse the established one and its numbers.
3. **Separate source claims from your derivations.** List the source's numbers and the numbers you'll compute. Plan to label the second kind as your calculation.
4. **Check versions.** Note the version of every library, model, API or tool whose behaviour you describe.

## While writing

For each new concept, in order:

1. The problem that makes the concept necessary.
2. Intuition in plain words.
3. The real mechanism.
4. A trace with real numbers from the running example.
5. The visual, placed here at the point of introduction, or code the reader can run.
6. Where it breaks, what it costs, and the common misunderstanding.

Keep the order flexible. The point is that none of these is skipped where the reader needs it.

- Define every symbol, shape and term before using it.
- Explain why, not only what.
- Keep facts, recommendations and interpretations visibly distinct.
- Name one term for one concept and keep it.

## Verification, beyond the general workflow

- **Arithmetic:** recompute everything independently, ideally with a short script, and check the results match the prose, the tables and the charts.
- **Code:** run it with the stated versions. For Space runnable blocks, check it runs under Pyodide with no network access.
- **Shapes and units:** check them at every step of any traced computation.
- **Claims about tools and models:** check against current official docs, not memory.
- **Analyses of someone else's claims:** check each claim, classify it (confirmed, their figure, questionable, unverifiable), and say which and why.

## Series parts

- Read the series notes first. Keep notation, conventions, running examples and established numbers.
- Recap the prerequisite facts briefly so a reader arriving mid-series can follow, and link the earlier part.
- Never contradict an earlier part silently. If an earlier part was wrong, add a dated `correction` block there.
- End on the bridge to the next part when one is planned.
- After publishing, update the series notes with the part's slug, the concepts it established and its closing bridge.
