# Technical writing

How to explain technical subjects so a reader actually understands them, without losing depth or accuracy.

## Know the reader

Decide the reader before writing, and write for that person consistently.

- **State the assumed knowledge** to yourself. "Knows Python and basic linear algebra, has never trained a network" is a usable target. "Developers" is not.
- **Explain everything the reader doesn't know**, and nothing they do. This resolves the tension between "no black boxes" and "don't over-explain". The answer depends on the reader.
- **Series and house standards win.** If series notes set a beginner-friendly bar (for example, the Deep Learning series explains every symbol and API call), follow them even when that means explaining things an expert would skip.
- **Name prerequisites** for advanced pieces and link one good background source rather than re-teaching it.

## Build explanations progressively

Introduce one new idea at a time, and connect each to what came just before. For a concept, this order works well. It's a sequence of moves, not a required outline.

1. **The problem.** What breaks, or what question has no answer, without this idea?
2. **Intuition.** Plain language or a realistic analogy. Keep the analogy only as long as it's accurate, and say where it stops working.
3. **The mechanism.** The real definition, data structure, algorithm or protocol.
4. **Step by step.** Trace it with real values.
5. **Show it.** Code, an equation, a diagram or a chart, right where the concept is first explained.
6. **Limits.** Trade-offs, edge cases, failure modes, common misunderstandings.

Define a term before you depend on it. If a term needs a paragraph of definition, it gets that paragraph before the sentence that uses it.

## Explain why, not just what

Every non-obvious statement should come with its reason, or with the step that makes it true. "ReLU avoids vanishing gradients" is a fact to memorise. "ReLU's slope is exactly 1 for positive inputs, so multiplying slopes across ten layers leaves the gradient at full strength" is something the reader now understands.

## Worked numbers

Concrete numbers make abstract ideas stick and let readers check your reasoning.

- Use small, real values the reader can verify by hand.
- Keep one running example through the article where possible, and reuse it across a series.
- **Label your own calculations.** "The source says X" and "the arithmetic gives Y" must stay visibly separate. State the assumptions behind Y.
- Re-run every calculation before publishing. A wrong number in a worked example teaches the wrong thing.

## Code

- **Correct and relevant.** Every line should serve the lesson. Remove setup noise unless the setup is the lesson.
- **Runnable when feasible**, with versions stated when behaviour depends on them. Never claim code was run or tested unless it was. Only print expected output you actually produced.
- **Explain the decisions**, not each line. Why this approach, what assumption it makes, which edge case it skips.
- **Safe defaults.** Parameterised queries, no hard-coded secrets, `weights_only=True` when loading PyTorch checkpoints, timeouts on network calls.
- **Realistic names and scenarios.** `orders`, `invoice_total`, `support_ticket`, rather than `foo` and `bar`, unless the abstraction is the point.
- **Placeholders for anything personal**, and say they're placeholders.

On Space, `runnable: true` is only for Python that runs in the browser through Pyodide, with no network access and no unavailable packages. See [`docs/authoring/components.md`](../../../../docs/authoring/components.md#code).

## Maths

- Explain the idea in words before the formula, then every symbol after it.
- Connect the equation to what it means in practice: "so doubling the batch halves the noise in the gradient estimate".
- Check dimensions and units. State conventions (for example, whether FLOPs count a multiply-add as one or two operations).
- Keep LaTeX exact. Prose punctuation rules never apply inside formulas.

## Trade-offs, limits and edge cases

An explanation without limits is an advertisement. Cover:

- When the technique doesn't help, or makes things worse.
- What it costs (latency, memory, money, complexity, operational burden).
- Common misunderstandings, with the correction.
- Version-specific behaviour, with the version.

## Facts, recommendations and interpretations

Keep three kinds of statement visibly distinct.

- **Established fact,** with a source where a reader might doubt it.
- **Recommendation,** framed as one, with the reasoning: "Use X when…, because…".
- **Interpretation or opinion,** attributed honestly. The author's opinion only when their material shows it. Otherwise frame it as reasoning the reader can evaluate.

## Domain notes

What readers in each area usually need, beyond the general rules above.

**Machine learning and deep learning.** Tensor shapes at every step. What is learned versus fixed. Training versus inference behaviour. Small numerical traces (a forward pass by hand, a gradient for one weight). Data assumptions and failure modes such as leakage, imbalance and distribution shift. Which numbers are illustrative and which are measured.

**LLMs, RAG and agents.** Exactly what goes into the context window, in what order, at what token cost. Where errors enter (retrieval misses, chunking, tool failures, prompt injection). Evaluation, meaning how you would know it works. Dates and model versions, because this field changes monthly. Never state a model's capabilities from memory as current fact.

**Software engineering and architecture.** The constraint driving the design. What each component owns. Data flow as a diagram. The failure modes and the trade-off accepted. Alternatives considered.

**Backend and frontend.** Request and render lifecycles, where state lives, what runs on the server versus the client, concrete performance numbers with how they were measured, accessibility for UI topics.

**Cloud and distributed systems.** Consistency and failure semantics (what happens on timeout, retry, partition). Latency and cost with units. Limits and quotas. Region and version specifics.

**DevOps, MLOps, LLMOps.** The pipeline as a diagram. What triggers each step. Rollback. Observability (what you'd see when it breaks). Exact commands with flags explained, and placeholders for anything environment-specific.

**Languages, frameworks and infrastructure tools.** Version numbers. Behaviour that differs from the reader's likely mental model. Links to the official docs for the exact API.
