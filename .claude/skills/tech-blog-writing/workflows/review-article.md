# Workflow: review an article

Use when the user wants feedback on a draft without you changing it, or as the quality gate before publishing. The output is a list of findings the author can act on.

## Steps

1. **Read the whole article once as the intended reader**, without making notes. Then note your overall impression. Was the central idea clear? Where did you lose interest or get confused?
2. **Check substance** against [article-structure.md](../references/article-structure.md) and [technical-writing.md](../references/technical-writing.md). Look at the opening, the structure, whether the topic is finished for its reader, and the ending.
3. **Check accuracy.** Verify claims, numbers, code and references (see [research-and-sources.md](../references/research-and-sources.md)). Flag anything fabricated or unsupported as the most serious finding.
4. **Check language and style** against [editorial-guidelines.md](../references/editorial-guidelines.md). Run the [mechanical scan](../references/editorial-checklist.md#mechanical-scan), then read for the patterns a scan can't find, such as uniform rhythm, template structure and superficial analysis.
5. **For Space,** check the component rules in [space-publication.md](../references/space-publication.md) (plain-text captions, heading ids, Markdown-free headings) and render the page if you can.
6. **Walk the [editorial checklist](../references/editorial-checklist.md)** and turn each failure into a finding.

## Severity

| Level       | Meaning                       | Examples                                                                                                                             |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Blocker** | Must fix before publishing    | Factual error, fabricated content, broken code, fake or unsupporting reference, private data, a component that won't render          |
| **Major**   | Seriously weakens the article | Unclear central idea, missing explanation the reader needs, template structure, generic opening or summary ending, repeated sections |
| **Minor**   | Polish                        | Individual stock phrases, a stray em dash, one generic heading, an overlong paragraph                                                |

## Writing the findings

For each finding give:

- **Where**: the heading, the paragraph, or a short quote of the first words.
- **What's wrong**, in one sentence.
- **Why it matters** to the reader, when that isn't obvious.
- **A concrete fix**, ideally a rewritten version of the passage that keeps the author's meaning.

Order findings by severity, then by position. Group repeated instances of a pattern into one finding with a count and two or three examples.

Say what works, too, briefly and specifically, so the author knows what to keep.

## Rules

- Don't judge or speculate about whether the text was AI-written. Review the writing.
- Don't rewrite the author's conclusions or opinions. Point out where they're unsupported.
- Don't pad the review. If the article is good, say so and list the few things that would make it better.
