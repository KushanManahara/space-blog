/**
 * Client-safe site configuration: plain constants, no zod and no post data.
 *
 * `site.ts` derives counts from `posts.ts`, so importing anything from it —
 * even `routes` — pulled every article body and the zod runtime into the
 * browser bundle of whichever client component asked: ~530 KB of JavaScript on
 * every page. Client components import from here; `site.ts` re-exports these
 * and adds the derived, validated values for the server.
 */

/** Absolute origin, used for canonicals, OG tags, the feed and the sitemap. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://space.gimhara.com";

export const siteIdentity = {
  name: "Space",
  tagline: "AI Systems & Software Engineering by Kushan Manahara",
  description:
    "An engineering publication by Kushan Manahara exploring AI systems, machine learning, agents, and software architecture.",
  subscriberCount: 0,
} as const;

/** Validated against `authorSchema` in `site.ts`, which exports the result as `author`. */
export const authorConfig = {
  name: "Kushan Manahara",
  initials: "KM",
  avatar: "/images/kushan.png",
  role: "Machine Learning Engineer",
  bio: "Machine learning engineer at H2O.ai working on production AI/ML systems, agentic architectures, and the infrastructure underneath them.",
  longBio:
    "Machine Learning Engineer working across production AI/ML systems, LLMs, AI agents, and software engineering. I write here to take things apart, follow the reasoning all the way down, and understand what's really happening under the abstractions.",
  email: "hi@gimhara.com",
  handle: "@kushanmanahara",
  location: "Colombo, Sri Lanka",
  timezoneNote: "GMT+5:30. Replies land overnight for the US",
  github: "https://github.com/KushanManahara",
  linkedin: "https://www.linkedin.com/in/kushan-manahara",
  twitter: "https://x.com/Kushan_Manahara",
} as const;

export const routes = {
  home: "/",
  articles: "/articles",
  topics: "/topics",
  search: "/search",
  about: "/about",
  contact: "/contact",
  tags: "/tags",
  series: "/series",
  paths: "/paths",
  corrections: "/corrections",
  privacy: "/privacy",
  saved: "/saved",
  unsubscribe: "/unsubscribe",
  // Not routed while Studio is parked in `src/app/_studio/`; kept so that code
  // still typechecks and the paths are in one place when it comes back.
  studio: "/studio",
  editor: "/studio/editor",
} as const;

export const primaryNav = [
  { label: "Home", href: routes.home },
  { label: "Articles", href: routes.articles },
  { label: "Series", href: routes.series },
  { label: "Topics", href: routes.topics },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

export const newsletterBenefits = [
  "New posts, and corrections to old ones",
  "The occasional note on something I got wrong",
] as const;

export const searchSuggestions = ["linux", "python", "ai agents", "rag", "docker"] as const;

export const contactTopics = ["A correction", "A question", "Consulting"] as const;

/**
 * Topic names, in display order. `site.ts` holds each topic's copy and fails the
 * build if its list drifts from this one; `next.config.ts` reads it to route
 * `/?topic=` without a hand-maintained duplicate.
 */
export const topicNames = [
  "Systems",
  "Engineering",
  "Career",
  "Research",
  "Inference",
  "Evaluation",
  "Experiments",
] as const;

/** `#machine-learning` and `machine-learning` both address the same tag. */
export function tagSlug(tag: string): string {
  return tag.replace(/^#/, "").toLowerCase();
}
