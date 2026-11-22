# Article structure

There is no Space article template. Structure comes from the subject and the order in which a reader needs to understand it. This file gives you the tools to choose one.

## Plan from the reader's questions

Before outlining, write down in one or two sentences:

1. **Who is reading** and what they already know.
2. **The central idea** the article exists to deliver. If you can't state it in one sentence, you're not ready to outline.
3. **The questions a reader will ask, in order.** "Why does this exist?", "How does it work?", "What happens if…?", "When shouldn't I use it?"

The outline is those questions, answered in the order they arise. Headings usually fall out of them directly.

## Shapes that fit different articles

Pick the one that matches what the article is doing. Mix them when the topic needs it. None of these is a checklist of required sections.

| The article is                        | A shape that often works                                                                                 |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Explaining a mechanism                | Problem, intuition, mechanism, worked example, limits                                                    |
| Answering a question                  | Question, investigation, evidence, answer                                                                |
| Teaching a concept                    | Concept, why it exists, how it works step by step, a running example, where it breaks                    |
| Telling a debugging or incident story | Symptom, wrong turns that teach something, root cause, fix, what generalises                             |
| Making an argument                    | Claim, evidence, the strongest counterargument, where the claim holds                                    |
| Comparing options                     | The decision the reader faces, the criteria that matter, trade-offs, a recommendation for each situation |
| Analysing someone else's claims       | What was claimed, what can be checked, the checks, what holds and what doesn't                           |

## Openings

The first paragraph must give the reader something real: the problem, a surprising number, the question, the concrete moment, or the central idea itself. It should be impossible to move it to an article on a different topic.

Avoid:

- Announcing the article ("In this post we'll explore…").
- Setting a scene with no information ("In today's world of distributed systems…").
- Opening on a rhetorical question you then answer.
- A dictionary definition of the topic.

> **Weak:** Caching is an important technique in software engineering. In this article, we'll explore what caching is, why it matters, and how to use it effectively.
>
> **Strong:** The product page took 900 ms to render because it made the same four database queries for every visitor. The data changed twice a day.

The strong version uses a concrete scenario. Only present it as something that happened if it did. Otherwise frame it as an example ("Picture a product page that…") or open on the mechanism itself.

## Headings

- Name what the section actually says: "Why the second request is faster", not "Performance".
- Sentence case. No numbering unless the sections are genuine sequential steps.
- Only as many as navigation needs. A 1,500-word piece might need three or four. Don't add a heading every two paragraphs.
- Avoid the generic set: Introduction, Overview, Key benefits, Challenges, Best practices, Use cases, Final thoughts, Conclusion.
- On Space, keep Markdown out of heading text. The table of contents shows plain text. Use level 3 only inside a level 2 section.

## Paragraphs and lists

**Default to paragraphs.** Explanation is a chain of reasons, and paragraphs keep the chain intact.

**Use a list when** the items are genuinely parallel and separable, and a reader will scan or come back to them. Examples include prerequisites, a set of commands, or options with no reasoning between them.

**Use a numbered list when** order matters, such as real steps.

**Use a table when** the reader compares several items on the same attributes.

**Don't** turn an argument into bullets, end every section with a bullet summary, or use `**Label:** text` lines as a substitute for sentences.

Paragraph length should follow the idea. One sentence can be a paragraph when it lands a point. A long paragraph is fine if it is one connected thought.

## Length

Long enough to finish the topic for the intended reader, and no longer. Finishing means the reader gets the core mechanism, a worked example, and the main limits without leaving the page. It doesn't mean covering every adjacent topic. Cut anything that doesn't serve the central idea, even if it's true and interesting.

Never pad to reach a length, and never truncate the reasoning to hit one.

## Endings

End when the last real point is made. Good last paragraphs do one of these:

- State an implication the reader can act on.
- Name the limit of what was shown.
- Give the practical rule that falls out of the explanation.
- Pose the next question, which a later part of a series may answer.

Don't:

- Recap the headings.
- Start with "In conclusion", "In summary", "Overall", "To wrap up".
- Close on uplift ("With these tools, you're ready to…", "The future of X is bright").
- Add a "Conclusion" heading out of habit. Many articles need no separate closing section at all.

> **Weak:** In conclusion, caching is a powerful technique that can dramatically improve performance. By understanding TTLs, invalidation, and eviction, you'll be well-equipped to build faster applications.
>
> **Strong:** The hard part was never adding the cache. It was deciding how stale a price can be before a customer notices, and that's a product question, not an engineering one.

## Titles and deks

**Title.** Specific to this article's idea, finding or question. Accurate, never clickbait. Avoid the `Topic: Subtitle` pattern by default (see [editorial-guidelines.md](editorial-guidelines.md#20-colon-titles--strong)).

| Avoid                               | Prefer                                                          |
| ----------------------------------- | --------------------------------------------------------------- |
| Docker Networking: A Complete Guide | Why Two Containers Can't See Each Other Until You Add a Network |
| Understanding Transformers          | What Attention Actually Computes, One Matrix at a Time          |
| rclone: Lessons Learned             | rclone Said 100% Transferred. Nothing Had Moved.                |

Titles over 52 characters drop the " · Space" suffix in the browser tab, so the full title is what shows in search results. Keep the important words early.

**Dek** (the summary line under the title, also the meta description). One or two sentences that state the article's actual payoff. Concrete, not "In this post you'll learn…".
