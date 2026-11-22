# Editorial checklist

Run this before delivering any article, and before calling a rewrite or review finished. Fix every "no" before delivery. Rewrite from the meaning of the passage, not by swapping words.

## Reader and substance

- [ ] **Does the opening establish something meaningful immediately?** A real problem, number, question or idea, not a warm-up or an announcement.
- [ ] **Is the central idea clear,** and does every section serve it?
- [ ] **Does each paragraph move the explanation forward?** No paragraph only restates or comments on the one before.
- [ ] **Is anything explained twice?** Keep the better explanation, at the point it's needed.
- [ ] **Can the intended reader follow every step,** with every term defined before it's relied on?
- [ ] **Is the topic finished** for that reader: mechanism, worked example, limits, without leaving the page?

## Voice and language

- [ ] **Does it sound like a knowledgeable person talking,** not a brochure or an assistant?
- [ ] **Any inflated vocabulary or stock phrases** (pivotal, testament, landscape, delve, underscore, "it's worth noting", "in today's…")? Replace with the fact, or cut.
- [ ] **Any promotional words or artificial enthusiasm?**
- [ ] **Do sentences have real subjects and verbs,** and plain "is"/"has" where they fit?
- [ ] **Is sentence length and structure varied** because the content varies? No run of identical openings.
- [ ] **Any reflexive transitions** (Additionally, Furthermore, Moreover) that the logic doesn't need?
- [ ] **Any negative parallelism** ("not just X, it's Y") or forced triads?
- [ ] **Is one term used for one concept** throughout?
- [ ] **Is the voice consistent** from start to end?

## Punctuation and formatting

- [ ] **Em dashes in prose: zero** unless one is clearly the best choice.
- [ ] **Semicolons in prose: zero** unless genuinely needed.
- [ ] **Colons, parentheses, quotation marks** used only where the sentence needs them. No colon reveals.
- [ ] **No arrows** standing in for explanation in prose.
- [ ] **Bold** used a handful of times at most, for things a skimmer must not miss.
- [ ] **Lists and tables only where they help,** with no key-value prose and no `**Label:** text` bullets standing in for paragraphs.
- [ ] **Code, maths, URLs and quoted output untouched** by the punctuation rules.

## Titles and structure

- [ ] **Is the title specific** to this article's idea, and not `Topic: Subtitle` or "complete guide"?
- [ ] **Does the dek state the real payoff?**
- [ ] **Does every heading name what its section says?** No Introduction, Key benefits, Final thoughts and so on. Sentence case.
- [ ] **Did the structure come from the subject,** not a template?
- [ ] **Does the ending add something** (implication, limit, rule, next question) instead of recapping?

## Accuracy and honesty

- [ ] **Are claims technically accurate,** checked against authoritative sources, with versions where they matter?
- [ ] **Has anything been fabricated?** Experiences, incidents, results, numbers, quotes, opinions or references. If yes, remove it.
- [ ] **Is every "I"** backed by the author's own material?
- [ ] **Are your calculations labelled** as yours, with assumptions, and re-checked?
- [ ] **Do facts, recommendations and opinions read as what they are?**
- [ ] **Does every reference exist and support its claim?**
- [ ] **Has code been run** wherever the article implies it works, and is runnable code really runnable?
- [ ] **Is the article free of private data,** with placeholders explained?

## Visuals (when present)

- [ ] **Does each visual teach something** prose alone wouldn't, placed where its concept is introduced?
- [ ] **Are labels, units and data provenance** (measured, computed, illustrative) shown?
- [ ] **Does it render** in the real page? See [space-publication.md](space-publication.md#verify).

## Mechanical scan

Run this on a draft to catch what a read-through misses. It flags candidates for review. It doesn't decide anything.

For a plain-text or Markdown draft:

````bash
f=draft.md
prose=$(awk '/^[[:space:]]*```/{c=!c; next} !c' "$f" | sed 's/`[^`]*`//g')   # drop fenced and inline code
echo "em dashes: $(printf '%s' "$prose" | grep -o '—' | wc -l)"
echo "semicolons: $(printf '%s' "$prose" | grep -o ';' | wc -l)"
printf '%s\n' "$prose" | grep -noiE "\b(delve|pivotal|testament|tapestry|landscape|realm|underscore[sd]?|showcas(e|es|ing)|intricate|multifaceted|seamless(ly)?|robust|leverag(e|es|ing)|foster(s|ing)?|crucial|game-?changing|revolutioni[sz]e|unlock|in today's|it's worth noting|it is important to note|let's dive|in conclusion|in summary|not just .* (it's|but))\b" "$f"
printf '%s\n' "$prose" | grep -nE '^[[:space:]]*[-*] \*\*[^*]+:?\*\*:?'   # key-value bullets
````

For a Space post, which lives inside `src/lib/content/posts.ts`, extract that post's prose first. [space-publication.md](space-publication.md#scanning-a-space-post) has a script.

A hit is a question, not a verdict. "Robust" may be the precise statistical term, and a colon before a code block is correct.
