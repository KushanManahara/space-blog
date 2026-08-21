# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: engineers and researchers working on ML systems (inference performance, evaluation, training infra) who want claims they can verify — not another aggregator post. Secondary: Kushan Manahara himself, using the site as a durable record of his own measurements.

## Product Purpose

Space is Kushan Manahara's single-author technical blog on ML systems (inference, kernels/schedulers, evaluation harnesses, ML engineering, experiments), publishing since 2022. Purpose: keep notes he'd otherwise lose, in a form public enough that readers can check the work. Success is a reader trusting a number enough to act on it, not pageviews.

## Positioning

Measured, not vibes. Every performance or eval claim is backed by a trace or benchmark run on hardware Kushan has access to, and the trace is published alongside the claim when possible. Corrections are appended to posts, never silently edited — the archive stays honest over time. This is the mechanism a roundup blog or a company eng blog (writing to promote a product) cannot truthfully copy.

## Operating Context

Reading happens off deep technical posts (kernel walkthroughs, quantization/speculative-decoding analysis, eval-harness postmortems) with code blocks, footnotes, figures, and inline data tables. Posts are organized by topic (Inference, Systems, Evaluation, Engineering, Experiments, Research) and by series. A `/studio` surface exists for Kushan's own authoring/editing workflow, deliberately separate from the public reading chrome (own header, full-screen editor, no site nav).

## Capabilities and Constraints

- Content is centralized in a typed content layer (`src/lib/content/`), validated through zod schemas at build time — not scattered per-component.
- Filtering, sorting, and pagination on list surfaces (`?topic=`, `?sort=`, `?series=`, `?q=`, `?page=`) are URL state, built as plain links/forms so they work before hydration.
- Corrections are appended, never silently edited (tracked via `site.correctionCount`).
- Single author (Kushan Manahara, ML systems engineer, Colombo, Sri Lanka, GMT+5:30) — no multi-author or contributor workflow.
- Studio (`/studio`) is Kushan's own editing surface, not reader-facing product surface.

## Brand Commitments

- Name: Space. Tagline: "Writing on AI systems."
- Author identity: Kushan Manahara (initials KM), handle @kushanmanahara.
- Voice: direct, technical, evidence-first — no marketing gloss on benchmark claims.
- Fonts: Louis George Cafe (300/400/400-italic/700), wired via `next/font/local`.

## Evidence on Hand

Full mock post archive (48 posts across 6 topics, 4 series) already lives in `src/lib/content/posts.ts` and `article-body.ts`, written in Kushan's actual voice/topics — real content shape, not placeholder lorem ipsum, though the underlying benchmark numbers are illustrative rather than from live measurement runs.

## Product Principles

1. A claim without a published trace doesn't ship — the archive's credibility is the product.
2. Corrections are appended, never silently edited; the record stays honest over time.
3. Reading chrome serves deep technical content (code, figures, footnotes) first; anything decorative that competes with that loses.
4. Content lives in one typed layer — no per-component data scatter, no untyped runtime shape.
5. Studio (authoring) and the public site are deliberately separate surfaces with separate chrome.

## Accessibility & Inclusion

No product-specific requirement beyond standard practice — focus-visible states, semantic markup, and responsive/keyboard support already reflected in the codebase.
