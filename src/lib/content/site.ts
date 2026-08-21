import {
  authorSchema,
  commentSchema,
  componentInventoryItemSchema,
  seriesSchema,
  tagSchema,
  timelineEntrySchema,
  topicSchema,
  type Author,
  type Comment,
  type ComponentInventoryItem,
  type Series,
  type Tag,
  type TimelineEntry,
  type Topic,
} from "./schemas";

/** Absolute origin, used for canonicals, OG tags, the feed and the sitemap. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://space.dev";

export const site = {
  name: "Space",
  tagline: "Writing on AI systems",
  issue: 48,
  description:
    "A single-author publication on machine learning systems, written by Kushan Manahara since 2022.",
  seriesCount: 4,
  correctionCount: 7,
  subscriberCount: 1240,
  archivePageCount: 16,
} as const;

export const author: Author = authorSchema.parse({
  name: "Kushan Manahara",
  initials: "KM",
  role: "ML systems engineer",
  bio: "I work on inference performance and evaluation. This is where I keep the notes I'd otherwise lose.",
  longBio:
    "I work on inference performance and evaluation. Everything here is measured on hardware I have access to, and I publish the traces when I can.",
  email: "hello@space.dev",
  handle: "@kushanmanahara",
  location: "Colombo, Sri Lanka",
  timezoneNote: "GMT+5:30. Replies land overnight for the US",
});

export const topics: Topic[] = topicSchema.array().parse([
  {
    name: "Inference",
    slug: "inference",
    description:
      "Latency, throughput and cost for models in production: batching, caching, quantization, speculative decoding, and the measurements behind each claim.",
    postCount: 14,
  },
  {
    name: "Systems",
    slug: "systems",
    description:
      "Kernels, schedulers and storage: what the hardware is really doing while the profiler says it is busy.",
    postCount: 11,
  },
  {
    name: "Evaluation",
    slug: "evaluation",
    description:
      "Harnesses that tell you bad news early: held-out slices, deterministic seeds, and the failure modes aggregate scores hide.",
    postCount: 9,
  },
  {
    name: "Engineering",
    slug: "engineering",
    description:
      "The unglamorous half of shipping models: databases, type systems, and the code around the model.",
    postCount: 8,
  },
  {
    name: "Experiments",
    slug: "experiments",
    description:
      "Weekend runs with a fixed budget, written up whether or not the result was the one I wanted.",
    postCount: 4,
  },
  {
    name: "Research",
    slug: "research",
    description:
      "Close readings of papers, reproductions, and the corrections that follow when a reproduction fails.",
    postCount: 2,
  },
  {
    name: "Findings",
    slug: "findings",
    description: "Short notes: edge cases, silent failures, and things that cost me a day.",
    postCount: 3,
  },
]);

export const seriesList: Series[] = seriesSchema.array().parse([
  {
    slug: "serving-llms-cheaply",
    title: "Serving LLMs cheaply",
    dek: "Four posts on making inference affordable without a rewrite.",
    partCount: 4,
    status: "Part 3 in progress",
    currentPart: 2,
    parts: [
      "What a token actually costs on an H100",
      "Speculative decoding, measured",
      "Prefix caching wins that nobody logs",
      "When to stop optimising and buy a GPU",
    ],
  },
  {
    slug: "evaluation-honestly",
    title: "Evaluation, honestly",
    dek: "How to build a harness that tells you bad news early.",
    partCount: 3,
    status: "Complete",
    currentPart: 3,
    parts: [
      "What a green dashboard hides",
      "Slices before averages",
      "The eval harness I actually trust",
    ],
  },
  {
    slug: "reading-kernels",
    title: "Reading kernels",
    dek: "Close readings of CUDA that changed how I write PyTorch.",
    partCount: 2,
    status: "Ongoing",
    currentPart: 1,
    parts: ["Reading the FlashAttention-3 kernel", "Warp specialisation, slowly"],
  },
]);

export const tags: Tag[] = tagSchema.array().parse([
  { name: "#inference", postCount: 14 },
  { name: "#benchmarks", postCount: 11 },
  { name: "#cuda", postCount: 8 },
  { name: "#evaluation", postCount: 9 },
  { name: "#postgres", postCount: 6 },
  { name: "#typescript", postCount: 4 },
  { name: "#quantization", postCount: 7 },
  { name: "#rag", postCount: 5 },
  { name: "#reproducibility", postCount: 3 },
  { name: "#serving", postCount: 10 },
  { name: "#tokenizers", postCount: 3 },
  { name: "#distillation", postCount: 4 },
]);

export const comments: Comment[] = commentSchema.array().parse([
  {
    id: "maya-krishnan",
    name: "Maya Krishnan",
    initials: "MK",
    postedAgo: "3 days ago",
    likes: 34,
    tone: "violet",
    body: "The occupancy framing is the part I keep repeating to my team. We were bucketing by nominal batch and getting nonsense curves.",
  },
  {
    id: "tomas-silveira",
    name: "Tomás Silveira",
    initials: "TS",
    postedAgo: "5 days ago",
    likes: 21,
    tone: "cornflower",
    body: "Did you try a tree-based draft? Curious whether the acceptance flatness holds once you branch, or if that's where the prompt-class variance shows up.",
  },
  {
    id: "ada-rehman",
    name: "Ada Rehman",
    initials: "AR",
    postedAgo: "1 week ago",
    likes: 18,
    tone: "orchid",
    body: "Thank you for publishing the trace schema. We reproduced Fig 1 on an A100 pair and landed within 6% of your numbers at every bucket.",
  },
]);

export const timeline: TimelineEntry[] = timelineEntrySchema.array().parse([
  {
    years: "2024 - now",
    role: "Staff engineer, inference",
    org: "Independent / consulting",
    note: "Serving-path performance for three teams shipping models into production. Most of what appears here starts as a client trace I was allowed to publish in the abstract.",
  },
  {
    years: "2022 - 2024",
    role: "ML systems engineer",
    org: "Mid-size platform company",
    note: "Owned the eval harness and the serving benchmark. Learned the hard way that a green dashboard is a hypothesis, not a result.",
  },
  {
    years: "2020 - 2022",
    role: "Backend engineer",
    org: "Data infrastructure team",
    note: "Postgres, queues, and the index bloat post that still gets the most search traffic on this site.",
  },
  {
    years: "2019",
    role: "Research assistant",
    org: "University lab",
    note: "Reproducibility work. Two of the four papers I tried to reproduce did not, which set the tone for everything since.",
  },
]);

export const componentInventory: ComponentInventoryItem[] = componentInventoryItemSchema
  .array()
  .parse([
    {
      name: "SiteHeader",
      path: "components/layout/site-header.tsx",
      props: "activeRoute",
      runtime: "Client",
    },
    {
      name: "PostCard",
      path: "components/post/post-card.tsx",
      props: "post, variant: grid | compact | featured, showMetrics",
      runtime: "Server",
    },
    {
      name: "PostRow",
      path: "components/post/post-row.tsx",
      props: "post, showMetrics",
      runtime: "Server",
    },
    {
      name: "PostCover",
      path: "components/post/post-cover.tsx",
      props: "topic, ratio, pattern",
      runtime: "Server",
    },
    {
      name: "TopicBadge",
      path: "components/post/topic-badge.tsx",
      props: "topic, tone: solid | soft | onImage",
      runtime: "Server",
    },
    {
      name: "MetricRow",
      path: "components/post/metric-row.tsx",
      props: "post, size, showSave",
      runtime: "Server",
    },
    {
      name: "SaveButton",
      path: "components/post/save-button.tsx",
      props: "slug, placement: row | onCover",
      runtime: "Client",
    },
    {
      name: "SectionHeader",
      path: "components/layout/section-header.tsx",
      props: "title, subtitle, action",
      runtime: "Server",
    },
    {
      name: "NewsletterBlock",
      path: "components/home/newsletter-block.tsx",
      props: "benefits, subscriberCount",
      runtime: "Client",
    },
    {
      name: "AuthorByline",
      path: "components/author/author-byline.tsx",
      props: "date, size: xs | sm | md",
      runtime: "Server",
    },
    {
      name: "FilterChips",
      path: "components/nav/filter-chips.tsx",
      props: "options, value, param",
      runtime: "Client",
    },
    {
      name: "SortToggle",
      path: "components/nav/sort-toggle.tsx",
      props: "value",
      runtime: "Client",
    },
    {
      name: "Pagination",
      path: "components/nav/pagination.tsx",
      props: "page, pages, hrefFor",
      runtime: "Server",
    },
    {
      name: "SearchHero",
      path: "components/search/search-hero.tsx",
      props: "query, resultCount, suggestions",
      runtime: "Client",
    },
    {
      name: "TopicHeader",
      path: "components/topic/topic-header.tsx",
      props: "topic",
      runtime: "Server",
    },
    {
      name: "ArticleHeader",
      path: "components/article/article-header.tsx",
      props: "post",
      runtime: "Server",
    },
    {
      name: "ArticleBody",
      path: "components/article/article-body.tsx",
      props: "blocks",
      runtime: "Server",
    },
    {
      name: "CodeBlock",
      path: "components/article/code-block.tsx",
      props: "code, filename",
      runtime: "Client",
    },
    {
      name: "TableOfContents",
      path: "components/article/table-of-contents.tsx",
      props: "headings",
      runtime: "Client",
    },
    {
      name: "SeriesNav",
      path: "components/article/series-nav.tsx",
      props: "series",
      runtime: "Server",
    },
    {
      name: "CommentThread",
      path: "components/article/comment-thread.tsx",
      props: "comments, total",
      runtime: "Client",
    },
    {
      name: "AuthorCard",
      path: "components/author/author-card.tsx",
      props: "variant: inline | sidebar",
      runtime: "Server",
    },
    {
      name: "CommandMenu",
      path: "components/nav/command-menu.tsx",
      props: "posts (⌘K)",
      runtime: "Client",
    },
    {
      name: "ShareSheet",
      path: "components/article/share-sheet.tsx",
      props: "targets, open",
      runtime: "Client",
    },
    {
      name: "ReadingBar",
      path: "components/article/reading-bar.tsx",
      props: "next, progress",
      runtime: "Client",
    },
    {
      name: "PostSkeleton",
      path: "components/post/post-skeleton.tsx",
      props: "count",
      runtime: "Server",
    },
    { name: "NotFound", path: "app/not-found.tsx", props: "popular", runtime: "Server" },
    {
      name: "ViewTransitionGuard",
      path: "components/motion/view-transition-guard.tsx",
      props: "none",
      runtime: "Client",
    },
    {
      name: "Reveal",
      path: "components/motion/reveal.tsx",
      props: "children, as",
      runtime: "Client",
    },
    {
      name: "ContactForm",
      path: "components/contact/contact-form.tsx",
      props: "topics",
      runtime: "Client",
    },
    {
      name: "DiscoverModal",
      path: "components/nav/discover-modal.tsx",
      props: "kind: topics | tags",
      runtime: "Client",
    },
    {
      name: "PostsTable",
      path: "components/studio/posts-table.tsx",
      props: "rows",
      runtime: "Client",
    },
    {
      name: "StatusPill",
      path: "components/studio/status-pill.tsx",
      props: "status",
      runtime: "Server",
    },
    { name: "EditorShell", path: "app/studio/editor/page.tsx", props: "post", runtime: "Client" },
    {
      name: "EditorComposer",
      path: "components/studio/editor-composer.tsx",
      props: "post (owns toolbar + topic picker)",
      runtime: "Client",
    },
    {
      name: "StudioHeader",
      path: "components/studio/studio-header.tsx",
      props: "activeTab",
      runtime: "Client",
    },
    {
      name: "PublicationStrip",
      path: "components/home/publication-strip.tsx",
      props: "none",
      runtime: "Server",
    },
    {
      name: "SiteFooter",
      path: "components/layout/site-footer.tsx",
      props: "none",
      runtime: "Server",
    },
  ]);

export const routes = {
  home: "/",
  articles: "/articles",
  topics: "/topics",
  search: "/search",
  about: "/about",
  contact: "/contact",
  studio: "/studio",
  editor: "/studio/editor",
  system: "/system",
} as const;

export const primaryNav = [
  { label: "Home", href: routes.home },
  { label: "Articles", href: routes.articles },
  { label: "Topics", href: routes.topics },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

export const newsletterBenefits = [
  "New posts, and corrections to old ones",
  "Traces and datasets when I can publish them",
] as const;

export const searchSuggestions = [
  "quantization",
  "eval harness",
  "cuda kernels",
  "postgres",
] as const;

export const contactTopics = ["A correction", "A question", "Consulting"] as const;

export const aboutSetup = [
  { label: "Editor", value: "Neovim" },
  { label: "Profiler", value: "Nsight Systems" },
  { label: "Notebook", value: "Marimo" },
  { label: "This site", value: "Next.js + MDX" },
] as const;

export const footerColumns = [
  {
    title: "Read",
    links: [
      { label: "All posts", href: routes.articles },
      { label: "Topics", href: routes.topics },
      { label: "Search", href: routes.search },
    ],
  },
  {
    title: "Series",
    links: seriesList.map((series) => ({
      label: series.title,
      href: `${routes.articles}?series=${series.slug}`,
    })),
  },
  {
    title: "Elsewhere",
    links: [
      { label: "About", href: routes.about },
      { label: "GitHub", href: "https://github.com" },
      { label: "Google Scholar", href: "https://scholar.google.com" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
] as const;
