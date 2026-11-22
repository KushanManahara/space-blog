# Workflow: deep technical articles and series parts

Layer this workflow onto [write-article.md](./write-article.md) for deep technical explainers, tutorials, claim analyses, and multi-part series articles. Reference: [technical-writing.md](../references/technical-writing.md).

## Before writing

1. **Fix the intended reader:** State assumed knowledge in one line. When writing a series part, read the series memory doc first (for example `frontend/docs/authoring/deep-learning-series-memory.md`) and honor its baseline.
2. **Fix the running example:** Carry one concrete scenario (support ticket, tensor shape, model, request trace) through the article, reusing established series examples and numbers.
3. **Separate source numbers from derivations:** List source claims and your own calculations separately so every derived figure is labelled explicitly with its assumptions.
4. **Pin versions:** Record library, framework, hardware, or API versions wherever behavior depends on them.

## While writing each concept

Progress cleanly through these moves (flexibly, skipping none that the reader needs):

1. The problem that forced the concept to exist.
2. Plain-language intuition (stating where any analogy stops holding).
3. The real mechanism, formula, or architecture.
4. A worked numerical trace using the running example.
5. **Inline visual right here** (dedicated SVG, Recharts curve, Mermaid diagram, or runnable Pyodide Python) rather than waiting for a later summary chart.
6. Limits, costs, failure modes, and common misunderstandings.

Define every symbol, tensor dimension, unit, and API contract before depending on it. Keep facts, recommendations, and interpretations visibly distinct.

## Technical verification

- **Arithmetic:** Recompute every number with Python via `run_command` and verify prose, tables, charts, and SVGs match identically.
- **Code & Pyodide labs:** Run pure-Python `runnable: true` blocks locally AND click **Run** inside the `browser` subagent to confirm exact browser Pyodide stdout (including IEEE 754 `float32` edge cases and overflow-safe branches).
- **API & version claims:** Cross-check against official documentation via `search_web`, never memory alone.

## Series continuity

- Link and briefly recap prerequisite numbers from the previous part so mid-series readers stay grounded.
- Never silently contradict an earlier published part; add a dated `correction` block if an earlier claim was wrong.
- Update the previous part's closing bridge to link forward to the new slug when completing a sequence.
- Update the series memory document (`deep-learning-series-memory.md` or equivalent) with the new part's slug, concepts established, and next-part handoff.
