# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Space` — a single-author technical blog UI built from the Claude Design project
"Technical blog UI mockups" (`Space Blog.dc.html`). The design's own handoff screen is
implemented at `/system` and lists the intended component inventory; keep it in sync when
components are added or renamed.

Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS v4,
shadcn/ui (radix base), zod, pnpm.

## Commands

```bash
pnpm dev          # dev server (Turbopack) on :3000
pnpm build        # production build — also runs the TypeScript check
pnpm start        # serve the production build
pnpm lint         # eslint (flat config, eslint-config-next)
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write . (tailwind class sorting via plugin)
pnpm format:check # prettier --check .
```

There is no test runner configured yet. If one is added, record the single-test invocation here.

## Architecture

### Content layer (`src/lib/content/`)

All copy and post data lives here, not in components.

- `schemas.ts` — zod schemas plus the inferred types (`Post`, `Topic`, `Series`, `ArticleBlock`, …).
  `PostSummary` is `Post` minus `body`; list surfaces and client components take summaries so the
  RSC payload stays small (`toSummary` / `toSummaries` in `queries.ts`).
- `posts.ts`, `site.ts` — the data, parsed through the schemas at module load, so bad content
  fails fast at build time.
- `article-body.ts` — long-form article content as a typed block union rendered by
  `components/article/article-body.tsx`. The mock dataset shares one body across posts; give a post
  its own body by replacing `body` on that record.
- `queries.ts` — every read goes through these selectors (`listPosts`, `getPostBySlug`,
  `getRelatedPosts`, `searchPosts`, …). Components never filter or sort raw arrays themselves.

### Routing

`src/app/(site)/` carries the public chrome (header + footer). `src/app/studio/` deliberately sits
outside that group: the studio list renders its own header and the editor is a full-screen surface
with no site or studio nav. `src/app/not-found.tsx` renders the chrome itself for the same reason.

Filtering, sorting and pagination are URL state (`?topic=`, `?sort=`, `?series=`, `?q=`, `?page=`),
parsed and validated in the page with the `is*` guards from the content layer, and built with
`buildHref` (`src/lib/url.ts`). Filter chips, the sort toggle, pagination and the search form are
plain links/forms, so they work before hydration.

### Server vs client

Server by default. Client components exist only for: the scroll-aware header (`useScrollDirection`
in `src/hooks/` drives the collapse-on-scroll-down / expand-on-scroll-up bar), ⌘K command menu,
save/like state, home carousels and tabs, article reading progress (one scroll listener shared via
`ReadingProgressProvider`), share sheet, comment composer, discover modals, forms and the studio
editor. Reader state (saved/liked posts) lives in `SavedPostsProvider`; there is no global store.

Form submissions go through the server actions in `src/app/actions.ts`, which own validation.

### Design system

`src/app/globals.css` is the single token layer — colours, radii, indigo-tinted shadows, easings,
and the `glass` / `glass-panel` / `text-gradient` / `cover-sheen` utilities — ported from the design
project's `colors_and_type.css`. Components use token utilities (`bg-bg-2`, `text-fg-2`,
`border-line-1`, `shadow-glow-sm`, `ease-expo`); no local hex values. Gradients and glows are CSS
variables applied via `style` because they are per-topic data.

Per-topic artwork (cover gradient, texture, badge classes) lives in
`src/components/post/topic-visuals.ts`. Tailwind class strings there must stay literal so the
compiler sees them.

Fonts: Louis George Cafe (300/400/400-italic/700) in `src/app/fonts/`, wired with `next/font/local`
in the root layout.

### Motion

Scroll reveals use `components/motion/reveal.tsx`, which only applies the hidden state after mount
(`data-reveal-ready` on `<html>`), so content is visible without JavaScript. Hover lift is −6px /
550ms, press is scale 0.97, all on `--ease-expo`; `prefers-reduced-motion` is honoured in
`globals.css`.

### Tailwind v4 gotcha

Quarter-step spacing utilities (`p-2.25`, `mt-1.75`) generate nothing — only halves are supported.
Use an arbitrary value (`p-[9px]`) for those.

## Coding standards

These are the standing rules for this codebase.

### Stack & structure

- Server Components by default; Client Components only when the feature genuinely requires them.
- Organize by clear responsibility. Keep business logic, UI logic, API logic, and utilities separated.
- Components stay small, focused, reusable, composable. No giant components, files, or functions.
- Prefer composition over duplication and sprawling conditional logic.

### Reuse before creating

- Before writing new code, check whether existing components, hooks, utilities, types, or logic can be
  reused or extended.
- Use shadcn/ui and existing design-system components rather than re-creating UI primitives.
- Reuse shared validation schemas and types.
- Follow DRY, but do not abstract prematurely — create an abstraction only when it names a genuinely
  reusable concept. Single-use code stays inline.

### TypeScript

- Strict. No `any`, no `@ts-ignore`, no unnecessary type assertions.
- Validate external/runtime data (API responses included) instead of trusting its shape.

### State & data

- Centralize data access in the content layer; do not scatter queries across components.
- Keep state minimal with a single source of truth. Local state over global state whenever it suffices.
- Keep server state separate from client/UI state.
- Use hooks intentionally — no reflexive `useEffect`, `useMemo`, or `useCallback`.

### UI

- Consistent loading, empty, error, and success states everywhere.
- Accessible and responsive.
- Keep Tailwind usage consistent; avoid one-off styles.
- Errors handled consistently, never leaking internal/sensitive detail to the UI.

### Hygiene

- Avoid unnecessary dependencies; never add two tools that solve the same problem.
- Remove unused code, imports, dependencies, and dead logic.
- Clear, meaningful naming. Comments only for non-obvious reasoning or constraints.
- Surgical changes only — no unrelated refactoring or rewrites.
- After meaningful changes, run format, lint, typecheck, and build.
  Never knowingly leave lint, type, or build errors unresolved.
- Prefer simple, clear, reusable, modular code over clever code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
