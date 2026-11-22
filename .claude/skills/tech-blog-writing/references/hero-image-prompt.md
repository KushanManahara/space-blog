# Cover images

A cover should express the article's central idea, not just its subject. "A car" is a subject. "A car held inverted by a pressure field nobody can see" is the idea.

## Space cover requirements

- **File:** `public/articles/<slug>.png` (SVG allowed), wired with `coverImage: "/articles/<slug>.png"`. Without one, the topic gradient is used.
- **Crop:** served through Next/Image with `object-cover`, centre-anchored. It appears as a wide band in the article hero and as a small 4:3 crop on cards. Keep the subject inside the **central 60%** with generous side margins.
- **No text** in the image. The title renders beside it.
- **Aesthetic:** premium editorial design, the look of a serious magazine feature opener. Vary environment, lighting, palette and composition between articles so covers don't look templated. Within a series, keep a family resemblance without repeating the layout.
- **The share card is separate** (`/articles/<slug>/card.png`, generated automatically). Don't make it.
- Existing covers are roughly 1.6 MB PNGs. Next/Image serves optimised derivatives, so source size only affects the repo.

## Process

1. **Find the visual thesis.** One sentence describing the single image that would make a reader understand the article's angle at a glance.
2. **Write the prompt** with the template below.
3. **Write a negative prompt** that blocks this topic's most likely wrong instinct. For example, fire for cold-gas thrusters, a stock photo of code for a debugging story, or a robot face for an ML article.
4. **When the image comes back, review it before wiring it in.** Check the subject is centred and survives the card crop, there's no text or logo, it doesn't contradict the article's facts, and it works on both light and dark page backgrounds. Tell the user about inaccuracies even when they don't block publishing.

## Prompt template

```
Editorial [illustration | photograph | technical render] for a technical magazine feature on [topic].
SUBJECT: [the visual thesis, concrete and specific].
DETAIL: [the physical or technical elements that make it accurate].
COMPOSITION: subject centred within the central 60%, [angle], generous negative space at the edges for wide and 4:3 crops.
LIGHT AND PALETTE: [specific lighting and environment], [palette], one restrained accent.
STYLE: premium editorial design, art-directed, restrained. Not an advertisement, not a stock image.
FORMAT: aspect ratio 16:9. No text, no logos, no watermarks, no lettering.
```

Negative prompt baseline, plus the topic-specific wrong instinct:

```
text, words, letters, numbers, logos, brand marks, watermark, signature, people's faces, crowd, busy background, cartoon, clip art, stock-photo cliché, glowing brain, robot, lens flare clutter
```

## Rules

- **Unbranded by default.** Generic forms rather than recognisable trademarked products, especially for critical or analytical pieces.
- **Factually faithful.** The image must not contradict the article.
- **No real people's likenesses** unless the user supplies an approved image.
- **Tell the user where to save the file** and the exact `coverImage` line to add.
- **For diagram-led articles,** a hand-authored SVG cover built from the article's own visual (a terminal, a chart, a diagram) can beat a generated image. Keep it inside the central safe zone.
