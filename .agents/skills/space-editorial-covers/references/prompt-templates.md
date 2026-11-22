# Cover image prompt templates and QA checks

Use this reference when briefing Antigravity's `image-generator` subagent or giving the user an external cover prompt.

## Visual thesis first

Move from topic to concrete editorial metaphor before writing a prompt:

- Weak subject: "A neural network"
- Strong thesis: "Three translucent fluted glass planes bending parallel light beams into a single focal point on warm travertine"
- Weak subject: "Loss functions"
- Strong thesis: "Precision brushed-brass balance scale in pale stone daylight comparing logarithmic glass spheres against uniform blocks"

## Prompt structure for `image-generator`

```text
Generate a 16:9 horizontal PREMIUM EDITORIAL DESIGN cover illustration for a technical magazine feature on [topic].
- SUBJECT: [concrete visual thesis, specific tactile objects or architectural scene].
- DETAIL: [physical or technical elements that make the metaphor accurate].
- COMPOSITION: Place the primary subject prominently inside the CENTRAL 60% SAFE ZONE with generous clean negative space on all four margins so 21:9 hero, 4:3 card, 16:10 grid, and right-aligned 1200x630 OG card crops all frame cleanly.
- LIGHTING & PALETTE: [distinct environment, natural or studio light direction, cohesive colour palette with one restrained accent].
- STYLE: Art-directed editorial photography or architectural still life (Monocle, Quanta Magazine, Financial Times Weekend). Restrained, tactile materials, crisp depth of field.
- CONSTRAINTS: ZERO text, ZERO letters, ZERO numbers, ZERO logos, ZERO watermarks, ZERO human faces, ZERO generic neon cyberpunk grids or glowing AI brains.
```

## Negative-prompt guardrails (include topic-specific blockers)

Always block both the baseline clichés and the single wrong instinct for the article's topic:

- **Baseline:** text, letters, numbers, logos, watermarks, faces, busy clutter, stock-photo laptops, glowing brains, cartoon robots, generic blue-purple neon waves.
- **Topic-specific example:** for cold-gas thrusters, block fire and flames; for a database index article, block server-rack stock corridors; for a cultural essay on a game release, block copyrighted logos and character portraits unless supplied by the user.

## Series family resemblance

Within a multi-part series (such as `Deep Learning`), maintain an elevated editorial sensibility while deliberately varying the environment, lighting temperature, background material, and palette across parts so the archive grid feels curated rather than templated.

## Multi-surface verification checklist

1. `file public/articles/<slug>.png` reports real PNG (`PNG image data`) and width `>= 1200px`.
2. `/articles` `4:3` thumbnail keeps the main subject centered and unclipped.
3. `/articles/<slug>` `21:9` hero renders sharp (`q=90`, native width) in both light and dark modes.
4. `/articles/<slug>/card.png` (`1200 × 630` OG share card) blends cleanly across Space's left-to-right cobalt feather with the cover subject prominent on the right.
