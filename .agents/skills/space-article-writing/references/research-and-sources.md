# Research and sources

Research makes an article accurate and deeper than the reader could get from one documentation page. It must not turn the article into a paraphrase of that documentation.

## When to research

Research any claim that is:

- **Current or version-specific** (APIs, defaults, limits, pricing, model capabilities).
- **Specialised** enough that a knowledgeable reader might doubt it.
- **Disputed**, or where sources disagree.
- **Central to the argument.** If the article falls apart when this claim is wrong, verify it.

If the topic postdates your training data, rely only on the material the user provided and sources you verified during this task, and say so where it matters.

## Where to look, in order of trust

1. **Primary sources.** Official documentation, specifications and RFCs, source code, the original paper, the original dataset, the vendor's own release notes.
2. **Peer-reviewed or well-documented secondary work.** Survey papers, textbooks, reputable engineering blogs that show their method.
3. **Reputable journalism**, for events and context, not technical detail.
4. **Forums, Q&A sites, social posts**, only as leads to verify elsewhere, never as the cited source for a technical claim.

## Verifying

- **Read the part you cite.** An abstract isn't the paper, and a search snippet isn't the page.
- **Check that the source supports the exact claim**, at the strength you state it. "Associated with" is not "causes". "Up to 2×" is not "2×".
- **Check dates, versions and terminology.** A 2022 default may not be today's.
- **Cross-check** important numbers against a second independent source when one exists.
- **When sources conflict,** say so and explain which you trust and why.
- **If you can't verify a claim,** qualify it, find evidence, or cut it. Never imply you consulted a source you didn't.

## Never fabricate

Not a URL, DOI, title, author, date, quote, statistic, benchmark or result. A missing citation is a gap. A fabricated one is a falsehood that readers will find.

## Citing

- **Inline links** next to the claim they support, in plain sentences: "the [PyTorch autograd notes](https://…) describe how the graph is freed". Link text says what the reader will find, never "here".
- **A References section** at the end whenever sources were used. Give the organisation or author, title, venue or publisher, date when available, and a direct URL or DOI. Separate evidence from optional further reading.
- **Your own calculations** are labelled as yours in the text, not cited.
- **If browsing isn't available,** say so to the user and ask for sources rather than citing from memory.

On Space, references use the `references` block. Its fields are plain text, and Markdown inside them shows literally. See [`docs/authoring/components.md`](../../../../docs/authoring/components.md#references).

## Research is input, not output

Synthesise. Explain what the sources mean together, where they agree, and what the reader should do with it. A paragraph per source in source order means the work isn't finished.

---

## The research behind these guidelines

[editorial-guidelines.md](editorial-guidelines.md) draws on these sources. The findings are summarised as reported by the authors. Where a source only supports part of a claim, the guideline says so.

| Source                                                                                                                                                                                                                  | What it found that matters here                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reinhart, Markey, Laudenbach, Pantusen, Yurko, Weinberg, Brown. "Do LLMs write like humans? Variation in grammatical and rhetorical styles." _PNAS_ 122 (2025). [arXiv:2410.16107](https://arxiv.org/abs/2410.16107)    | Compared about 8,000 parallel human and model texts on 66 grammatical features. Instruction-tuned models used present participial clauses at 2 to 5 times the human rate and nominalisations at 1.5 to 2 times. GPT-4o used the agentless passive at about half the human rate, and words such as "tapestry", "palpable", "intricate" and "camaraderie" at over 100 times the human rate. The authors attribute the differences mainly to instruction tuning, not model size. |
| Kobak, González-Márquez, Horvát, Lause. "Delving into LLM-assisted writing in biomedical publications through excess vocabulary." _Science Advances_ 11(27), 2025. [arXiv:2406.07016](https://arxiv.org/abs/2406.07016) | Across more than 15 million PubMed abstracts, an abrupt rise in certain style words after LLMs appeared. Estimated at least 13.5% of 2024 abstracts were processed with LLMs, up to 40% in some subcorpora.                                                                                                                                                                                                                                                                   |
| Liang et al. "Mapping the Increasing Use of LLMs in Scientific Papers." 2024. [arXiv:2404.01268](https://arxiv.org/abs/2404.01268)                                                                                      | Across about 950,000 papers, LLM-modified content grew fastest in computer science (up to 17.5%).                                                                                                                                                                                                                                                                                                                                                                             |
| Liang et al. "Monitoring AI-Modified Content at Scale: A Case Study on the Impact of ChatGPT on AI Conference Peer Reviews." ICML 2024. [arXiv:2403.07183](https://arxiv.org/abs/2403.07183)                            | Estimated 6.5% to 16.9% of peer-review text at major ML conferences was substantially modified by LLMs. Notes that corpus-level trends can be too subtle to detect in individual documents.                                                                                                                                                                                                                                                                                   |
| Juzek and Ward. "Why Does ChatGPT 'Delve' So Much? Exploring the Sources of Lexical Overrepresentation in Large Language Models." COLING 2025. [arXiv:2412.11385](https://arxiv.org/abs/2412.11385)                     | Identified 21 words such as "delve", "intricate" and "underscore" that rose sharply in scientific abstracts. Found evidence consistent with preference tuning (RLHF) contributing, but called the cause unsettled.                                                                                                                                                                                                                                                            |
| Guo et al. "How Close is ChatGPT to Human Experts? Comparison Corpus, Evaluation, and Detection." 2023. [arXiv:2301.07597](https://arxiv.org/abs/2301.07597)                                                            | ChatGPT answers were longer (about 198 versus 143 words), less lexically diverse and less emotional than human answers. Volunteers noted a habit of defining the core concept, explaining step by step, then summarising, plus connectives such as "In general" and "On the other hand".                                                                                                                                                                                      |
| Liang, Yuksekgonul, Mao, Wu, Zou. "GPT detectors are biased against non-native English writers." _Patterns_, 2023. [arXiv:2304.02819](https://arxiv.org/abs/2304.02819)                                                 | Seven detectors flagged non-native English essays as AI-written 61% of the time on average. The authors warn against judging authorship from these signals. This is why the guidelines are editorial advice, never authorship tests.                                                                                                                                                                                                                                          |
| Wikipedia WikiProject AI Cleanup. ["Wikipedia:Signs of AI writing."](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)                                                                                       | Practical editors' field guide. Catalogues inflated-significance vocabulary, copula avoidance, negative parallelism, the rule of three, em-dash overuse, title-case headings, overused bold, inline-header lists, vague attribution, summary endings and assistant voice. Stresses these are not proof of AI use and that some, such as transition words in isolation, are ineffective indicators.                                                                            |
