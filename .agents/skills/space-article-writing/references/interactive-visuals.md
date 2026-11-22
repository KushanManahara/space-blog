# Visuals and interactivity

A visual earns its place when it teaches something prose can't do as well. Interactivity earns its place when a reader learns more by changing something than by reading about it. Decoration earns nothing.

## What Space can render today

Use these first. Full fields and examples are in [`docs/authoring/components.md`](../../../../docs/authoring/components.md).

| The reader needs to see                             | Use                                                              |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| How parts connect, a process, a data flow           | `mermaid` (flowchart, rendered in a hand-drawn style)            |
| How one quantity changes with another               | `figure`, `line` or `area` (hover values, legend toggles)        |
| A few values compared                               | `figure`, `bar`                                                  |
| Options compared on the same attributes             | `table`                                                          |
| "Change this value and see" for an algorithm        | `code` with `runnable: true` (Python in the browser via Pyodide) |
| The equation everything rests on                    | `formula` (KaTeX)                                                |
| A caveat nobody should miss                         | `callout`                                                        |
| A screenshot, illustration or hand-made SVG diagram | `image`                                                          |
| A spoken walkthrough exists                         | `video`                                                          |

**Not available yet:** sliders, parameter-driven simulations, steppers, in-body toggles, and embeds other than YouTube. Don't describe them as present in an article until they exist.

## Placing and explaining a visual

- **At the point of introduction.** Put each concept's diagram or curve right where the concept is first explained, not in a later comparison section. A later side-by-side chart can still synthesise.
- **Say what to look for before it and what it showed after it.** The visual supports the prose. It doesn't replace it.
- **Labels, units and data provenance.** Say in the note or caption whether data is measured, computed or illustrative, and cite it.
- **The default view must tell the story.** Many readers never hover or click.
- **Captions are plain text on Space** and are read aloud by audio narration. Write them as sentences that make sense spoken.
- **Two or three strong visuals beat eight decorative ones.**

## Building a new interactive block

When an article genuinely needs something Space can't render, add it as a new block kind in its own PR before the article uses it. The steps are in [`docs/authoring/ai-agents.md`](../../../../docs/authoring/ai-agents.md#adding-a-new-block-kind). Before building:

1. Check that no existing block does the job with its current fields.
2. Check existing dependencies (Recharts is already present for charts) before adding a library. Never add a second library for the same problem.
3. Write this spec first, and give it to the user instead if you can't implement it:

```
Purpose:      what the reader should discover by interacting
Inputs:       name · range · step · default · unit (one row per control)
Model:        the exact formula or rules computing the output
Output:       chart type, axes, units, highlighted values
Data label:   computed | illustrative | simulated | measured (+ source)
Default view: the state that already tells the story with zero interaction
Annotations:  thresholds, critical values, the point the reader should notice
Fallback:     what renders without JavaScript (server-rendered default or a table)
A11y:         keyboard behaviour, labels, aria-valuetext with units, live-region summary
```

Good candidates: learning-rate divergence, transfer time against bandwidth, cache hit rate against size, latency against batch size, any formula with two or more meaningful inputs.

## Rules for interactive elements

- **Show the model.** State the formula or assumptions beside the control. Never present a toy model as measured reality.
- **Ranges that matter.** Bounds cover realistic values plus the interesting failure region.
- **Readable without JavaScript.** Server-render the default state.
- **Accessible.** Native range inputs or an accessible primitive, visible labels, keyboard arrows, `aria-valuetext` with units, a polite live-region summary of the result, visible focus, contrast in both themes, `prefers-reduced-motion` honoured.
- **Responsive.** Controls stack on narrow screens. Wide content scrolls inside its own container.
- **Cheap to compute** on every drag. Debounce anything expensive.
- **Theme tokens** for colours, never hard-coded hex.
- **Lazy-loaded** with `next/dynamic` so posts that don't use it don't pay for it.
- **Verified.** Render it, drag the controls, test the extremes and the keyboard. Never claim an interaction works without exercising it.

## Explaining an interactive element in prose

1. Before it: the intuition and what to try ("drag the gap from 3 mm to 10 mm and watch the power").
2. The element, with a caption naming the model and the data provenance.
3. After it: what the reader should have seen, and why it happens.
