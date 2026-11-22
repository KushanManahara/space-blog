---
name: tech-blog-writing
description: Write, rewrite or review technically accurate blog articles that read like a thoughtful human wrote them, then publish them on Space. Use for any article work in this repo, such as drafting a post from notes, research, code, logs or a bare topic, writing a series part, rewriting or polishing an existing post, reviewing a draft's prose, adding diagrams, charts or runnable code to a post, choosing its topic and tags, writing its references, or producing its cover image prompt.
---

# Human-first technical blog writing

Write like a knowledgeable person who understands the subject and wants the reader to understand it too. That one sentence is the standard. Everything below either helps you meet it or helps you check that you did.

The goal is writing a careful human editor would be glad to publish: specific, accurate, easy to follow, and recognisably written by someone with a point of view. The goal is not to fool AI detectors. Never add deliberate mistakes, awkward grammar or fake personal touches to seem human. Detectors are unreliable, and the fix for generic prose is better thinking, not disguise.

This skill is self-contained. It works without any user-level skill, and it lives in the repo so every contributor and agent gets the same rules.

## Which instructions win

When two sources disagree, use this order and say which way you resolved it.

1. **The user's explicit request** for this article.
2. **Space's technical contract.** The schema, the renderers and the publish pipeline decide what is possible. Source of truth: `src/lib/content/schemas.ts`, then [`docs/authoring/`](../../../docs/authoring/ARTICLE_AUTHORING_GUIDE.md).
3. **Series notes**, when the article belongs to a series (for example [`docs/authoring/deep-learning-series-memory.md`](../../../docs/authoring/deep-learning-series-memory.md)). They fix terminology, running examples and continuity.
4. **This skill's editorial rules.**
5. **The house style of existing posts.** Match it where it does not conflict with the rules above. Do not copy patterns this skill identifies as weak, even when older posts use them.

## Mandatory rules

These apply to every article. The reference files explain each one.

- **Accuracy beats style.** Never trade a correct statement for a smoother one. Verify claims, code, maths and version details.
- **Never fabricate.** No invented experiences, incidents, results, benchmarks, quotes, opinions or references. Use "I" only for things the author actually did or thinks, as shown by the material they gave you.
- **Keep sources and your own reasoning apart.** Label numbers you derived as your calculation and state the assumptions.
- **Write prose, not templates.** Let the structure come from the subject. No stock sections, no forced triads, no key-value prose, no summary that repeats the article.
- **Plain, direct language.** Common words, real subjects doing real verbs, varied sentences, contractions where natural.
- **Punctuation defaults for prose.** Prefer full stops and commas. Keep em dashes out, semicolons out, and colons, parentheses and quotation marks to the minimum the sentence needs. Code, maths, URLs and quoted output keep their exact syntax.
- **Titles and headings name the actual idea.** Avoid the `Topic: Subtitle` pattern and generic headings such as "Key benefits" or "Final thoughts".
- **No private data.** Replace personal paths, accounts, hostnames, IDs and tokens with placeholders, and tell the reader they are placeholders.
- **Verify before you deliver.** Run the editorial checklist and, for Space, the publish pipeline and a render check.

## Choose a workflow

| The user wants                                                                                  | Workflow                                                                                  |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| A new article from notes, research, code or a topic                                             | [workflows/write-article.md](workflows/write-article.md)                                  |
| A deep technical explainer, tutorial or series part (ML, systems, architecture, infrastructure) | [workflows/technical-article.md](workflows/technical-article.md), on top of write-article |
| An existing draft or published post improved, shortened, restructured or de-AI'd                | [workflows/rewrite-article.md](workflows/rewrite-article.md)                              |
| Feedback on a draft without changing it, or a pre-publish quality gate                          | [workflows/review-article.md](workflows/review-article.md)                                |

Most technical posts use both write-article and technical-article.

## Reference files

Always read `human-writing-style.md` and `space-publication.md` before working on a Space article. Load the others as the task needs them. All paths are relative to this file.

| File                                                                     | Use it for                                                                                                                   |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| [references/human-writing-style.md](references/human-writing-style.md)   | What good human writing sounds like, the house voice, and how to produce it. Read this before writing anything.              |
| [references/editorial-guidelines.md](references/editorial-guidelines.md) | The researched catalogue of generic AI-style patterns, why each one reads as artificial, and before/after fixes.             |
| [references/article-structure.md](references/article-structure.md)       | Shapes for articles, openings, headings, lists vs paragraphs, endings, titles and deks.                                      |
| [references/technical-writing.md](references/technical-writing.md)       | Explaining technical subjects progressively, code, maths, trade-offs, domain-specific guidance.                              |
| [references/research-and-sources.md](references/research-and-sources.md) | Research process, source hierarchy, verification, citations, and the studies behind this skill.                              |
| [references/editorial-checklist.md](references/editorial-checklist.md)   | The final pass every article must clear, plus a mechanical scan you can run.                                                 |
| [references/interactive-visuals.md](references/interactive-visuals.md)   | When a diagram, chart, runnable example or new interactive block earns its place.                                            |
| [references/hero-image-prompt.md](references/hero-image-prompt.md)       | Cover image direction and the generation prompt template.                                                                    |
| [references/space-publication.md](references/space-publication.md)       | How this skill plugs into Space: content model, gotchas, topics, series, publishing. Points to `docs/authoring/` for detail. |

## Delivering

A finished Space article is a record at the top of `src/lib/content/posts.ts` that passes the pipeline, renders correctly in `pnpm dev`, and clears [the checklist](references/editorial-checklist.md). Ship it the way [space-publication.md](references/space-publication.md) describes.

Outside the article, give the user a short note covering anything they need to decide or check. That includes claims you could not verify, conflicts you resolved, things you cut, and the cover prompt if one was requested. Never put process notes, disclaimers or remarks about these instructions inside the published article.

## Using this skill for another publication

Everything except `references/space-publication.md` and the Space section of `references/hero-image-prompt.md` is publication-neutral. To reuse the skill elsewhere, copy the directory and replace those two parts with the other publication's content model, conventions and publishing steps.

## Improving this skill

When an article teaches a lesson that applies to any article, add it to the relevant reference file here. Lessons about Space's code or components belong in `docs/authoring/`, and lessons about one series belong in that series' notes. Keep the three apart so none of them goes stale.
