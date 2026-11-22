---
name: space-editorial-covers
description: >-
  Art-direct, generate, convert, and visually verify PREMIUM EDITORIAL DESIGN
  article cover thumbnails (`public/articles/<slug>.png`) and 1200x630 Open
  Graph share cards (`/articles/<slug>/card.png`) for Space. Use whenever
  creating a new article cover, replacing or auditing an existing cover image,
  checking hero or card crops, or verifying rich social link previews.
---

# Editorial cover art and share cards for Space

Every cover on Space must feel like a professionally art-directed editorial magazine opener (Monocle, Quanta, Financial Times Weekend) with its own distinct visual identity. A cover expresses the article's central idea, not merely its literal subject.

## Core aesthetic and technical rules

1. **PREMIUM EDITORIAL DESIGN:** Use creative, topic-relevant compositions with varied backgrounds, environments, lighting, palettes, and visual arrangements across articles. Avoid repetitive dark-neon templates, glowing AI brains, robots, stock-photo clichés, and visual clutter.
2. **Central 60% safe zone:** Covers are served via Next/Image with `object-cover object-center` across four crops:
   - Article hero: `sm:aspect-[21/9]` (`~1100 × 471px`)
   - Homepage featured hero: `aspect-[16/10]`
   - Articles list row: `aspect-[4/3]` (`168 × 126px`)
   - Open Graph share card (`/articles/<slug>/card.png`): `1200 × 630` split-fade card (artwork centered in the right `800 × 630` canvas)
     Keep the primary subject prominent, visually balanced, and inside the **central 60% safe zone** with generous side and top/bottom margins so every crop survives cleanly.
3. **Minimal or no embedded text:** Never duplicate the article title inside the cover artwork, because Space renders the title beside or above it (and the OG share card overlays the title on the left).
4. **True PNG bytes (`public/articles/<slug>.png`):** Always convert generated JPEGs into genuine PNGs via `sips -s format png` so file magic bytes match `.png` and dimensions stay `>= 1200px` wide (typically `1376 × 768` at 16:9).
5. **Never fabricate real people's likenesses or brand marks** unless the user supplies an approved asset.
6. **Do not build a separate share card file:** `/articles/<slug>/card.png` is generated automatically by `src/app/(site)/articles/[slug]/opengraph-image.tsx` and automatically cache-busted via `articleOgCardVersion()` (`?v=<hash>`).

## Antigravity cover workflow

1. **Distill the visual thesis:** Write one sentence naming the physical or conceptual metaphor that communicates the article's angle at a glance. Consult [references/prompt-templates.md](./references/prompt-templates.md) for the structured prompt and negative-prompt baseline.
2. **Generate via `image-generator` subagent:** Invoke `invoke_subagent` with `TypeName: "image-generator"` and a brief specifying 16:9 horizontal format, central 60% safe zone, lighting, tactile materials, palette, and zero embedded text.
3. **Inspect before saving:** Open the returned image artifact with `read_file`. Check:
   - Subject centered inside the 60% safe zone with clean outer margins
   - Zero stray letters, garbled text, logos, or clutter
   - Distinct palette/environment from neighbouring articles on `/articles`
   - Factually faithful to the article
     If anything looks off, regenerate once with a sharper brief rather than shipping a weak cover.
4. **Convert and verify dimensions:**
   ```bash
   sips -s format png "<artifact-jpg-path>" --out "frontend/public/articles/<slug>.png"
   sips -g pixelWidth -g pixelHeight -g format "frontend/public/articles/<slug>.png"
   ```
5. **Wire in `posts.ts`:** Set `coverImage: "/articles/<slug>.png"`.
6. **Verify live in browser (`browser` subagent, `Model: "flash"`):**
   - Check `/articles` (`4:3` card crop), `/articles/<slug>` (`21:9` hero in light and dark modes), and confirm Next/Image serves native resolution (`w=1200&q=90` or `w=2048&q=90`).
   - Fetch `http://localhost:3000/articles/<slug>/card.png` via `curl` and inspect it with `read_file` to confirm the `1200 × 630` social share card blends seamlessly with zero clipping or dark banding.

For diagram-led technical posts, a crisp hand-authored SVG cover inside the central 60% safe zone is also permitted (`coverImage: "/articles/<slug>.svg"`).
