# What good human writing sounds like

Avoiding bad patterns only gets you to bland. This file is about the other half: what thoughtful technical writing actually does, so you can do it on purpose.

## The voice

Picture an experienced engineer explaining something to a capable colleague from a neighbouring team. They know the subject well enough to be relaxed about it. They don't perform expertise, they use it.

| The voice is                     | Which means in practice                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Knowledgeable but approachable   | Precise terms, defined the first time. No showing off.                                                     |
| Professional but conversational  | Contractions, plain verbs, the occasional short sentence. No slang, no jokes for their own sake.           |
| Confident without exaggeration   | State what is true plainly. Qualify only what is actually uncertain, and say why.                          |
| Clear without being simplistic   | Keep the real mechanism, the real numbers and the real caveats. Remove only the noise.                     |
| Technical without being academic | Explain the idea before the notation. Prefer "we" or "you" over impersonal passive constructions.          |
| Engaging without enthusiasm      | Interest comes from the ideas and the discoveries, never from adjectives like "fascinating" or "powerful". |

This voice is a target, not a costume. If the author's own notes have a distinct voice, keep theirs and use this table only to clean up what isn't working.

## Ten habits of writers people enjoy reading

### 1. They start with the thing itself

Good writers open on the problem, the number, the surprising fact or the question. They don't warm up.

> **Generic:** In the world of machine learning, choosing the right activation function is an important decision that can significantly impact model performance.
>
> **Human:** Stack ten sigmoid layers and the gradient reaching the first one is at most 0.25 to the tenth power. That is about one in a million, which is why early deep networks barely trained.

### 2. They use concrete nouns and real numbers

Abstract nouns ("performance", "efficiency", "scalability") hide what actually changed. Name the thing, give the number, state the unit.

> **Generic:** This approach offers significant performance improvements.
>
> **Human:** Batching 32 requests together took p50 latency from 180 ms to 95 ms on the same GPU.

If you don't have a real number, don't invent one. Describe the mechanism instead: "Each request now waits for the batch to fill, so latency rises at low traffic and falls at high traffic."

### 3. They give sentences real subjects and real verbs

Who did what to what. Avoid hiding the actor in a nominalisation ("the implementation of caching was performed") and avoid the "serves as" family.

> **Generic:** The cache serves as a crucial component that facilitates the reduction of database load.
>
> **Human:** The cache absorbs about 80% of reads, so the database only sees writes and cache misses.

### 4. They use plain "is" and "has"

"X is Y" and "X has Z" are clear. LLM prose avoids them in favour of "serves as", "stands as", "boasts", "features". Prefer the plain verb.

### 5. They vary rhythm because the content varies

Long sentences carry reasoning. Short ones land a point. Don't alternate mechanically. Let each sentence be as long as its idea.

> The gradient passes back through every layer, multiplied at each step by that layer's local slope. With sigmoid, that slope never exceeds 0.25. So it shrinks. Fast.

### 6. They keep one name for one thing

Fiction varies words to avoid repetition. Technical writing must not. If you call it "the request queue" in one paragraph, don't call it "the backlog", "the buffer" and "the pending list" later. Readers will assume four different things.

### 7. They show the reasoning, not just the conclusion

Readers trust a claim they can follow. Walk through the step that makes it true, ideally with numbers.

> **Asserted:** Mixed precision roughly halves memory use.
>
> **Shown:** A float32 weight takes 4 bytes and a bfloat16 weight takes 2, so the activations and weights that move to bfloat16 need half the memory. The optimizer state usually stays in float32, which is why the real saving is smaller than half.

### 8. They have a point of view, and earn it

Good technical writing takes positions: "use X here", "this claim doesn't hold", "the docs undersell this". Every position is backed by the evidence or reasoning right next to it. A position the author never stated is not yours to invent. When you add one, make it a recommendation grounded in the material and label it as such.

### 9. They are honest about uncertainty, precisely

Not "it may potentially be possible that". Say exactly what is unknown and why.

> **Generic hedge:** Results may vary depending on various factors.
>
> **Precise:** I only measured this on one GPU model. The batch size where throughput levels off depends on memory bandwidth, so expect a different knee on other hardware.

### 10. They stop when they're done

The last paragraph says something new: an implication, a limit, the next question. It does not tell the reader what they just read.

## Using "I" and "you"

- **"You"** for the reader doing something: "If you run this twice, you'll see…". It keeps explanations active.
- **"We"** for walking through reasoning together: "Now we can compute the gradient." Use sparingly.
- **"I"** only for what the author actually did, measured, decided or believes, as evidenced by their notes, code, logs or explicit request. Never invent an "I tried this last week" to sound human. If the author's experience isn't in the material, write the article without it.

## Contractions

Use them where a person would say them: "don't", "isn't", "you'll", "that's". Keep the full form when it adds emphasis ("This does not hold") or in a formal definition. Don't force contractions into every sentence.

## Emphasis

Bold is for the one phrase a skimming reader must not miss, a handful of times per article at most. If everything is bold, nothing is. Never bold a word just because it's a technical term. Introduce it in plain text and define it.

## A full rewrite, to calibrate

**Before (typical model output):**

> In today's rapidly evolving AI landscape, Retrieval-Augmented Generation (RAG) has emerged as a pivotal technique. It's not just about retrieving documents, it's about grounding responses in real knowledge. RAG offers three key benefits: accuracy, freshness, and transparency. Let's dive into how it works and why it matters.
>
> **Retrieval:** The system searches a vector database for relevant chunks.
> **Generation:** The LLM uses these chunks to craft a response.
>
> In conclusion, RAG represents a powerful paradigm that empowers organizations to unlock the full potential of their data.

**After:**

> A language model can only answer from what it saw during training, and that stops at a cutoff date. Ask it about your company's refund policy and it will guess. Retrieval-augmented generation fixes this in a simple way. Before the model answers, you search your own documents for the passages most similar to the question and paste them into the prompt.
>
> The search usually works on embeddings, which are vectors that place passages with similar meaning close together. The question gets embedded the same way, and the nearest few passages go into the prompt. The model then answers from text it can see rather than text it half remembers.
>
> That moves most of the quality problem out of the model and into retrieval. If the right passage isn't in the top results, the model can't use it, however good it is.

What changed: the opening states the real problem, the jargon is defined as it appears, the key-value lines became connected prose, the triad and the slogan ending disappeared, and the closing paragraph says something new.
