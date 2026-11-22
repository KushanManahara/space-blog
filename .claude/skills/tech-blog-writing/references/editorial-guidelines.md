# Editorial guidelines: patterns that make prose sound generic

This catalogue lists the habits that make writing read as machine-produced or template-driven. Each entry covers what the pattern looks like, why it reads badly, how to avoid it, and a before/after example. The research behind it is summarised in [research-and-sources.md](research-and-sources.md#the-research-behind-these-guidelines).

## How to use this file

**These are editorial signals, not proof of anything.** Every pattern here also appears in good human writing. Automated detectors make frequent errors, and one study found they flagged essays by non-native English writers as AI-written 61% of the time on average. Human judges vary widely too. So:

- Never judge authorship by these patterns, and never optimise for a detector.
- Treat a pattern as a problem only when it makes the writing vaguer, longer or less honest than it needs to be. One "crucial" in an article is fine. Five, each carrying no information, is the problem.
- Fix the thinking, then the sentence. Swapping "delve" for "explore" keeps the empty sentence. Ask what the sentence is trying to say and say that.
- Never introduce errors, clumsiness or fake personal detail to seem human.

**Strength labels.** Each entry is marked:

- **Strong:** avoid unless there is a specific reason. Fix in every draft.
- **Default:** a house preference. Follow it unless a sentence is clearly better the other way.
- **Optional:** taste. Apply when it improves the passage.

---

## Vocabulary and phrasing

### 1. Inflated significance words · Strong

**Looks like:** pivotal, crucial, vital, testament, tapestry, landscape, realm, delve, underscore, showcase, intricate, multifaceted, robust, seamless, leverage, foster, navigate (the complexities of), "plays a key role", "marks a significant moment", "setting the stage for".

**Why it reads badly:** These words claim importance without saying what is important or why. Corpus studies found words like these rising sharply in scientific abstracts after ChatGPT's release, and some appear in GPT-4o output at over 100 times the human rate. Readers who have seen a lot of generated text now notice them, and they carry little information either way.

**How to avoid:** Replace the claim of importance with the fact that makes it important. If you can't name the fact, cut the sentence.

> **Before:** Attention plays a pivotal role in the transformer architecture, underscoring its importance in modern NLP.
>
> **After:** Attention is the only place in a transformer where tokens exchange information. Remove it and each token is processed alone.

### 2. Avoiding plain "is" and "has" · Default

**Looks like:** serves as, stands as, functions as, acts as, represents, boasts, features, offers.

**Why:** Plain copulas are clear. The substitutes add a hint of ceremony and often hide that the sentence says very little.

> **Before:** Redis serves as an in-memory data store that boasts sub-millisecond latency.
>
> **After:** Redis is an in-memory store. Most reads come back in well under a millisecond.

### 3. Stock openers and filler · Strong

**Looks like:** "In today's rapidly evolving…", "In the world of…", "Let's dive in", "It's worth noting that", "It is important to note that", "This highlights the importance of", "When it comes to", "At the end of the day".

**Why:** They delay the content and could open any article on any topic. A sentence that fits everywhere tells the reader nothing about this one.

**How to avoid:** Delete the phrase and check whether the sentence still works. It almost always does. "It's worth noting that X" becomes "X".

> **Before:** It's worth noting that Postgres doesn't reclaim space immediately after a DELETE.
>
> **After:** Postgres doesn't reclaim space immediately after a DELETE.

### 4. Promotional tone and artificial enthusiasm · Strong

**Looks like:** powerful, game-changing, revolutionary, cutting-edge, unlock the full potential, supercharge, effortless, a breeze, vibrant, exciting.

**Why:** It reads as marketing and makes careful readers distrust the technical claims next to it.

**How to avoid:** State capabilities as facts with limits. Let the reader decide whether they're excited.

> **Before:** This game-changing library makes state management effortless.
>
> **After:** The library stores state in one place and re-renders only the components that read the changed value. You still decide how to split that state.

### 5. Assistant voice leaking into the article · Strong

**Looks like:** "Certainly!", "Great question", "I hope this helps", "Feel free to…", "Here's a comprehensive guide", "As an AI…", "Would you like me to…", knowledge-cutoff disclaimers.

**Why:** These belong in a chat reply, not an article. They are among the clearest signs that text was pasted from a conversation.

**How to avoid:** Never write to the person who asked for the article. Write to the reader. Put any notes for the author in your reply, outside the article.

### 6. Vague attribution · Strong

**Looks like:** "Experts say", "Studies show", "Many developers believe", "Industry reports suggest", "It is widely accepted".

**Why:** It borrows authority without letting the reader check it. Wikipedia's AI-cleanup editors flag it as a common pattern in generated text.

**How to avoid:** Name the source and link it, or state the claim as your own reasoning, or cut it.

> **Before:** Studies show that most outages are caused by configuration changes.
>
> **After:** In Google's SRE book, the authors estimate that around 70% of their outages came from changes to a live system. (Link the chapter.)

Only write the second version if you have verified the source says that.

### 7. Elegant variation · Default

**Looks like:** calling the same thing "the model", "the network", "the architecture" and "the system" in consecutive paragraphs.

**Why:** In technical writing, a new word signals a new thing. Synonym-cycling makes readers wonder whether you mean four different objects.

**How to avoid:** Pick one term per concept and keep it. Repetition of the right word is clarity, not clumsiness.

---

## Sentence construction

### 8. Trailing "-ing" commentary clauses · Strong

**Looks like:** "…, highlighting the importance of X", "…, reflecting a broader shift toward Y", "…, ensuring Z", "…, showcasing its versatility".

**Why:** Measured in one study at about five times the human rate in GPT-4o output. The tacked-on clause usually adds an interpretation nobody asked for, and it's often unsupported.

**How to avoid:** Either cut the clause or make it a real sentence that does work.

> **Before:** The team moved to gRPC, highlighting the growing importance of performance in microservice architectures.
>
> **After:** The team moved to gRPC. Its binary encoding cut the payload size for their largest messages by roughly two thirds.

### 9. Noun-heavy sentences · Default

**Looks like:** "perform an optimisation of", "the implementation of caching", "provides a reduction in latency".

**Why:** Nominalisations (verbs turned into nouns) were measured at about twice the human rate in instruction-tuned model output. They bury the action and remove the actor.

> **Before:** The implementation of request batching resulted in a reduction of inference cost.
>
> **After:** Batching requests cut the inference cost.

### 10. Negative parallelism · Strong

**Looks like:** "It's not just X, it's Y", "This isn't about X, it's about Y", "Not only X, but also Y", "Y rather than X" used as a dramatic reveal.

**Why:** It sets up a claim nobody made in order to knock it down, which reads as manufactured insight. Used once for a real misconception it can work. As a habit, it's one of the most recognisable patterns in generated prose.

**How to avoid:** State Y directly. Mention X only if readers genuinely believe X.

> **Before:** Kubernetes isn't just a container orchestrator, it's a platform for building platforms.
>
> **After:** Kubernetes schedules containers, but most of its value comes from its API. Teams extend it with their own resource types and controllers.

### 11. Forced groups of three · Strong

**Looks like:** "fast, reliable, and scalable", "clarity, consistency, and confidence", three bullet points every time, three examples whether or not three exist.

**Why:** Triads feel complete, so generated text reaches for them reflexively. The third item is often filler added to finish the rhythm.

**How to avoid:** Use as many items as actually exist. Two is fine. One is often best.

> **Before:** The new index makes queries faster, more efficient, and more scalable.
>
> **After:** The new index turns a full table scan into a lookup, so the query stays fast as the table grows.

### 12. Uniform rhythm and repeated openings · Default

**Looks like:** every sentence 15 to 25 words, every paragraph three or four sentences, several sentences in a row starting "This…" or "The…", paragraphs that each open with a topic sentence and close with a mini-summary.

**Why:** Human writing varies because ideas vary. Machine-regular rhythm feels flat even when every sentence is fine on its own.

**How to avoid:** Read the paragraph aloud. Merge sentences that share one idea, split the one carrying two, and vary openings by starting with the subject that matters most. Don't randomise length artificially.

### 13. Artificial transitions · Default

**Looks like:** Additionally, Furthermore, Moreover, Consequently, In addition, On the other hand, In general, That being said, With that in mind, at the start of most paragraphs.

**Why:** If the logic connects, the reader feels it without a signpost. A stack of connectives often papers over paragraphs that don't actually connect. Note that transition words alone are not a reliable sign of AI text. The problem is reflexive use.

**How to avoid:** Delete the transition and check that the paragraph still follows. If it doesn't, the order or the argument needs fixing, not a stronger connective. Use "but", "so" and "because" when you need a link. They're plain and they carry real logic.

### 14. Rhetorical questions as engagement · Default

**Looks like:** "But what does this mean for developers?", "So, why should you care?", "Ever wondered how…?".

**Why:** It manufactures curiosity instead of creating it. One genuine question that the article then answers is fine.

> **Before:** So, why does this matter? Let's find out.
>
> **After:** This matters when the table is larger than memory, which is where the next section starts.

### 15. Over-hedging and over-explaining · Strong

**Looks like:** "may potentially", "can help to", "in some cases it might be possible", re-explaining a concept the previous paragraph already covered, defining terms the audience certainly knows.

**Why:** Generated answers are measurably longer than human ones for the same question. Padding and repeated explanation make readers skim, and then they miss the parts that matter.

**How to avoid:** Hedge only real uncertainty, once, with its reason. Explain each idea once, at the point it's needed. Decide who the reader is (see [technical-writing.md](technical-writing.md#know-the-reader)) and skip what they already know.

---

## Punctuation

The house default for article prose is full stops and commas. Everything else is used when the sentence genuinely needs it. Code, maths, URLs, file paths, configuration, quoted terminal output and proper titles keep their exact punctuation always.

### 16. Em dashes · Strong (house rule)

**Looks like:** "The fix — which took a week — was one line." Often spaced, often several per paragraph.

**Why:** Em-dash density became one of the most noticed signs of 2023 to 2025 model output. Apart from that, heavy dash use lets a writer avoid deciding how two ideas relate.

**How to avoid:** Decide the relationship. Use a comma for an aside, a full stop for a new point, parentheses for a true aside the sentence could lose.

> **Before:** The fix — after a week of debugging — was one line.
>
> **After:** After a week of debugging, the fix was one line.

### 17. Semicolons · Strong (house rule)

**Why:** In ordinary blog prose, a semicolon usually joins two sentences that would read more easily apart.

> **Before:** The first run failed; the second succeeded.
>
> **After:** The first run failed. The second succeeded.

Allowed in code, of course, and in a complex list whose items already contain commas, though a table or real list is usually better there.

### 18. Colons in prose · Default

**Looks like:** "The answer is simple: caching." "Here's the thing: it doesn't scale." A colon in every other sentence.

**Why:** The colon-reveal is a dramatic beat. Repeated, it becomes a tic. It also drives the key-value pattern below.

**How to avoid:** Write the sentence straight. "The answer is caching." Keep colons where they are the clearest choice, such as introducing a code block, a formula or a genuine list.

### 19. Parentheses, quotation marks, arrows · Default

- **Parentheses:** one aside per paragraph at most. If the aside matters, give it a sentence. If it doesn't, cut it.
- **Scare quotes:** don't wrap ordinary words in quotation marks for emphasis or irony. Quote only actual quotations, UI strings and terms being introduced.
- **Arrows** (→, ->) in prose: write the relationship in words. "The request goes to the gateway, then to the service" not "request → gateway → service". Arrows are fine inside diagrams, code and tables.
- **Exclamation marks and emoji:** none in technical prose.

---

## Titles, headings and structure

### 20. Colon titles · Strong

**Looks like:** `Kubernetes: A Complete Guide`, `RAG: Understanding the Fundamentals`, `Project X: What I Learned`.

**Why:** It's the default shape of generated titles, and it pushes the actual idea after the colon where it's easiest to skip. It also tends to promise completeness ("complete guide", "everything you need to know") the article can't deliver.

**How to avoid:** Write the title as the article's actual claim, question or finding.

> **Before:** Activation Functions: Why ReLU Replaced Sigmoid
>
> **After:** Why ReLU Replaced Sigmoid in Deep Networks
>
> **Before:** Database Indexing: A Complete Guide
>
> **After:** How a B-tree Index Turns a Scan into Three Page Reads

A colon is acceptable when both halves carry specific information and no shorter form works, or when quoting a proper title. Existing Space posts that use colon titles keep their titles. Don't retitle published work unless asked.

### 21. Generic headings · Strong

**Looks like:** Introduction, Overview, Key Benefits, Why It Matters, Challenges, Best Practices, Use Cases, Future Outlook, Final Thoughts, Conclusion. Also "Challenges and future directions" style sections that generated text adds to almost anything.

**Why:** They describe a template, not the article. A reader scanning the table of contents learns nothing.

**How to avoid:** Each heading names what that section actually says. Sentence case.

> **Before:** Key Benefits
>
> **After:** Why batching cuts cost but raises tail latency

### 22. Key-value prose · Strong

**Looks like:** paragraphs or bullets shaped as `**Concept:** explanation`, such as "**Scalability:** The system scales horizontally." "**Security:** Data is encrypted."

**Why:** It looks organised but breaks reasoning into labelled fragments with no connection between them. Wikipedia's AI-cleanup editors list "inline-header vertical lists" as a typical pattern.

**How to avoid:** Write connected sentences that say how the ideas relate. Use a real table when the reader truly needs to compare items across the same attributes.

> **Before:**
>
> - **Latency:** Lower with caching.
> - **Consistency:** Can be stale.
> - **Cost:** Reduced database load.
>
> **After:** A cache lowers latency and database load, but readers can see stale data until the entry expires. How stale is acceptable decides the TTL.

A glossary or a reference list of options is a legitimate exception, sparingly.

### 23. Over-formatting · Strong

**Looks like:** bullets for everything, numbered lists for things with no order, bold on several phrases per paragraph, a heading every two paragraphs, title case headings.

**Why:** Formatting chops reasoning into pieces. It reads as a slide deck, not an explanation.

**How to avoid:** Paragraphs for connected ideas. Lists only for genuinely parallel, separable items or real steps. Numbers only when order matters. Bold rarely. Sentence-case headings, only as many as navigation needs.

### 24. Template structure · Strong

**Looks like:** define the concept, list its benefits, list its challenges, list use cases, then conclude. Or define, explain step by step, then summarise, which one study found ChatGPT doing by habit.

**Why:** The same skeleton under every topic signals that nothing was decided about this one.

**How to avoid:** Plan from the reader's questions. See [article-structure.md](article-structure.md).

### 25. Summary endings · Strong

**Looks like:** "In conclusion,", "In summary,", "Overall,", "To wrap up,", a last section restating each heading, or a motivational close ("The future is bright…").

**Why:** The reader just read the article. A recap tells them nothing, and a generic uplift sounds hollow.

**How to avoid:** End with something new: an implication, a limit, a practical rule, an open question, the next step. Or simply stop after the last real point. See [article-structure.md](article-structure.md#endings).

---

## Content and honesty

### 26. Superficial analysis · Strong

**Looks like:** sentences that comment on the significance of a fact instead of explaining it. "This reflects a broader trend toward…", "This demonstrates the power of…".

**Why:** It sounds analytical but adds no analysis.

**How to avoid:** Replace the commentary with the mechanism, the consequence or the number.

### 27. Fabricated texture · Strong

**Looks like:** invented anecdotes ("Last week a colleague asked me…"), invented incidents, invented metrics, invented quotes, an "I" that never did the thing described.

**Why:** It's dishonest, it's the fastest way to lose a technical reader's trust, and it's exactly what this skill must never do.

**How to avoid:** Use only experience the author's material shows. Without it, write in the second person or about the system itself. A clear explanation needs no fake story.
