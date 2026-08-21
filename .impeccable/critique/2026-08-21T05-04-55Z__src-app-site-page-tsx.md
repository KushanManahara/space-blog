---
target: homepage (src/app/(site)/page.tsx)
total_score: 23
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 2
timestamp: 2026-08-21T05-04-55Z
slug: src-app-site-page-tsx
---

Method: dual-agent (A: af78450cd015f323c · B: a3e9901070dc0e814)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                                                                                             |
| --------- | ------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Reveal/skeleton states present, tab/carousel state clear.                                                                                                             |
| 2         | Match System / Real World       | 3         | Technical vocabulary accurate and audience-appropriate.                                                                                                               |
| 3         | User Control and Freedom        | 3         | Carousels have prev/next; no undo needed at this depth.                                                                                                               |
| 4         | Consistency and Standards       | 2         | Three near-identical "top ranked posts" modules (Most Viewed, Best of Month, Most Read this year) use different UI conventions for the same underlying ranking logic. |
| 5         | Error Prevention                | 3         | Newsletter form has required/type=email but no client-side preview before submit.                                                                                     |
| 6         | Recognition Rather Than Recall  | 2         | Five sections all surface overlapping "popular posts" with no visible differentiator.                                                                                 |
| 7         | Flexibility and Efficiency      | 2         | ⌘K exists, but it's the only efficiency path; no other shortcuts or keyboard nav on carousels observed.                                                               |
| 8         | Aesthetic and Minimalist Design | 2         | Page repeats "more popular posts" four times before reaching genuinely differentiated content.                                                                        |
| 9         | Error Recovery                  | 3         | Newsletter shows inline aria-live error/success text.                                                                                                                 |
| 10        | Help and Documentation          | n/a       | Blog homepage in Read mode doesn't need help docs — genuinely inapplicable.                                                                                           |
| **Total** |                                 | **23/36** | **Acceptable (64%)**                                                                                                                                                  |

## Design Specificity Verdict

**LLM assessment**: Mixed, leaning generic-template. Copy is genuinely specific (real post titles, topic descriptions, "measured, not vibes" language, correction-count stat) but the visual system is interchangeable SaaS-blog boilerplate — every cover across every section (hero, Most Viewed, Editor's Pick, newsletter) is the same purple/violet radial-gradient blob with concentric rings, regardless of topic or claim. A blog whose entire value prop is verifiable evidence ships zero evidence-shaped imagery (no chart, trace, terminal, diagram thumbnail) anywhere on the homepage. The newsletter block ships a literal `"Illustration — drop artwork here"` placeholder label live in production.

**Deterministic scan**: CLI static scan on the four target source paths found 2 confirmed findings, both `ai-color-palette` (severity: warning) — `hero.tsx:122` and `most-viewed.tsx:104`, both `group-hover:text-violet-600` on headline hover. Both verified real, not false positives.

The live-DOM browser scan (full rendered page, not just the four source paths) found 134 anti-patterns: low-contrast (57), ai-color-palette (52), bounce-easing (24), gradient-text (3), clipped-overflow-container (3), radial-spotlight-glow (2), layout-transition (2), heading-rhythm (2), gpt-thin-border-wide-shadow (2), tiny-text (1), tight-leading (1), kicker-above-heading (1), all-caps-body (1). Manual spot-check of primary body copy (hero dek: ~6.05:1 contrast) passes AA; the low-contrast findings concentrate on smaller/secondary text (sample: `#837da6` on `#efedfa` = 3.3:1, need 4.5:1). Sample findings for `ai-color-palette`/`radial-spotlight-glow` corroborate Assessment A's "purple gradient everywhere" verdict independently — the detector and the LLM review converged on the same root issue from two different methods.

**Visual overlays**: Live browser injection was available and used, but ran through the temporary critique server (already stopped) rather than a persistent [Human]-tab overlay — no standing overlay remains in your browser to view; the counts and sample lines above are the full evidence captured.

No console errors on load; no horizontal overflow at 390px; 0 `<img>` elements (covers are CSS gradients, so no alt-text gap); focus-visible outlines present and consistent (2px solid) on sampled interactive elements.

## Overall Impression

The homepage's copy and information architecture know exactly what this blog is; the visual system doesn't. Every "here are good posts" module wears the identical purple gradient, so nothing on the page visually signals evidence, rigor, or topic difference — the strongest asset (measured claims, published traces, appended corrections) is entirely textual. The single biggest opportunity: differentiate covers/imagery by topic or evidence type, and cut the redundant ranking modules so the page reads as curated rather than padded. The single most urgent fix is unrelated to visuals: the primary nav disappears entirely on mobile with no menu trigger, which blocks the core task for any phone visitor.

## What's Working

- **Correction-count as a hero stat** — "7 · corrections" as a headline-level number is a concrete, unusual trust signal tied directly to the stated positioning; it's specific, not decorative.
- **URL-driven filtering** (`?topic=` on Latest Writing via `buildHref`) — works pre-hydration, matches the stated architecture, and is the right call for a Read-mode surface where deep-linking matters.
- **Collapse-on-scroll header** — restrained motion that doesn't fight reading, and focus-visible states are consistently present across sampled interactive elements.

## Priority Issues

- **[P0] Mobile primary navigation is unreachable.** `site-header.tsx` wraps the primary nav in `hidden ... md:block` with no mobile menu trigger. At 390px only Space / ⌘K / Studio render; Home, Articles, Topics, About, Contact have no access path. This blocks the primary task (find content) for any mobile visitor — ⌘K search is not a substitute for browsing.
  Why it matters: this is the core "find/decide what to read" job failing outright on the device class most casual readers arrive on.
  Fix: add a mobile menu trigger (hamburger/sheet) that surfaces the same nav items below `md`.
  Suggested command: `/impeccable adapt`

- **[P1] Redundant "popular posts" modules dilute the homepage.** Most Viewed, Best of Month, Editor's Pick, and Most Read this year all re-rank the same ~8-post pool with different UI chrome but no stated rationale for why one ranking should be trusted over another.
  Why it matters: cognitive-load checklist failed 4/8 items, largely from this repetition — a reader has to parse ~15 individually-presented "best" posts before reaching the actual filter tool (Latest Writing).
  Fix: consolidate to 1–2 modules, or give each remaining module a distinct, load-bearing purpose stated in its copy (e.g., "most-viewed" vs. "editor's pick" need different visible reasons to exist).
  Suggested command: `/impeccable distill`

- **[P1] Generic per-topic cover art undermines the evidence-first premise.** Every cover across every section is the identical purple radial-ring gradient (`PostCover`/`CoverRings`), regardless of topic (Inference vs. Systems vs. Evaluation). Detector corroborates independently: `ai-color-palette` (52 live instances) and `radial-spotlight-glow` findings concentrate on exactly these elements.
  Why it matters: on a blog whose selling point is verifiable traces, homepage imagery should differentiate by evidence type or topic, not by decorative palette repeated identically everywhere — this is the single biggest reason the design-specificity verdict leans generic.
  Fix: vary cover treatment by topic (already has topic-visuals.ts per-topic tokens) or introduce evidence-shaped imagery (chart/trace/terminal snippets) instead of a uniform gradient blob.
  Suggested command: `/impeccable colorize`

- **[P2] Unfinished placeholder shipped live.** `newsletter-block.tsx` renders the literal text "Illustration — drop artwork here" in production.
  Why it matters: reads as broken/unfinished to a credibility-sensitive technical audience — directly undercuts the "measured, not vibes" positioning.
  Fix: replace with real artwork or remove the empty slot.
  Suggested command: `/impeccable harden`

- **[P3] "Studio" link occupies prime header real estate on every viewport**, including the scarce 390px mobile header, despite being an authoring-only surface irrelevant to reader traffic (per the stated single-author, separate-surface architecture).
  Why it matters: minor, but it's mobile header space taken from the P0 nav fix by a link 100% of Read-mode visitors don't need.
  Fix: move Studio access behind a less prominent affordance, or gate it (e.g., dev-only visibility).
  Suggested command: `/impeccable layout`

## Persona Red Flags

**Casey (distracted mobile user)**: Opens on phone wanting to browse topics. Header shows only logo, search icon, and a black "Studio" pill — no way to reach Topics/Articles without discovering ⌘K. Most distracted mobile users bounce rather than scroll the entire homepage hunting for navigation.

**Alex (impatient power user)**: Wants "the best stuff" fast. Hits Most Viewed, then Best of Month, then Editor's Pick — three visually similar "best of" carousels before Latest Writing's actual filter tool appears, with no signal for which ranking is authoritative. Likely abandons the visual page and falls back to ⌘K, meaning the homepage adds friction rather than shortcuts for this persona.

**Sam (accessibility-dependent user)**: Landmark order is reasonable (nav → h1 → sections) and Save buttons carry descriptive aria-labels — a genuine strength. But the same missing-mobile-nav P0 blocks Sam's screen reader from reaching non-homepage sections through a landmark on mobile, identical to Casey's blocker.

## Minor Observations

- Editor's Pick and Best of Month carousels share a `CarouselButton` component but live in visually distant regions with no shared mental-model cue.
- `MostViewedHero`'s cover ring position uses a manual one-off offset (`[&>div]:top-[74%] [&>div]:left-[58%]`) worth flagging against the project's "avoid one-off styles" standard.
- Newsletter benefit copy ("Traces and datasets when I can publish them") is strong and specific — a good template for the rest of the page's visual/copy specificity.
- `bounce-easing` (24 live instances) and `layout-transition`/`heading-rhythm` findings from the detector are worth a follow-up pass but weren't independently verified line-by-line in this run.

## Questions to Consider

- If every section's job is "surface popular/good posts," what does a first-time reader lose if three of the four modules are deleted?
- The homepage's strongest credibility signal (corrections, traces) is textual/numeric — why is none of that represented visually, when the newsletter block already has an empty illustration slot waiting?
- Is "Studio" ever meant to be visible to a reader at all, or is its header presence a development convenience that shipped by accident?
