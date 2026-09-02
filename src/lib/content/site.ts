import { posts } from "./posts";
import {
  authorSchema,
  readingPathSchema,
  seriesSchema,
  timelineEntrySchema,
  topicSchema,
  type Author,
  type Comment,
  type ReadingPath,
  type Series,
  type TimelineEntry,
  type Topic,
} from "./schemas";

/** Absolute origin, used for canonicals, OG tags, the feed and the sitemap. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://space.gimhara.com";

export const site = {
  name: "Space",
  tagline: "AI Systems & Software Engineering by Kushan Manahara",
  /** Derived, so it cannot disagree with the archive it describes. */
  issue: posts.length,
  description:
    "An engineering publication by Kushan Manahara exploring AI systems, machine learning, agents, and software architecture.",
  subscriberCount: 0,
} as const;

export const author: Author = authorSchema.parse({
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
});

/**
 * Topic blurbs. Everything countable is derived below, not written here — this
 * was the only hand-maintained count left in the file, and a count that has to
 * be remembered is a count that eventually disagrees with the archive.
 */
const topicBlurbs: Array<Omit<Topic, "postCount">> = [
  {
    name: "Systems",
    slug: "systems",
    description:
      "Kernels, schedulers, operating systems, and protocols: deep dives into how systems operate under the hood.",
  },
  {
    name: "Engineering",
    slug: "engineering",
    description:
      "The practical craftsmanship of shipping software: backend frameworks, package managers, container tooling, and the plumbing that agents run on.",
  },
  {
    name: "Findings",
    slug: "findings",
    description:
      "Personal engineering journeys, certifications, career milestones, and unexpected lessons learned along the way.",
  },
  {
    name: "Research",
    slug: "research",
    description:
      "Explorations into LLM reasoning, explainable AI, Apple Intelligence, and machine learning foundations.",
  },
  {
    name: "Inference",
    slug: "inference",
    description:
      "Latency, throughput, and hardware acceleration: LPUs, GPUs, and high-performance inference microservices.",
  },
  {
    name: "Evaluation",
    slug: "evaluation",
    description:
      "Retrieval architectures, caching strategies, and what happens when real-time crisis data meets a language model.",
  },
  {
    name: "Experiments",
    slug: "experiments",
    description:
      "Hands-on experiments in LLM fine-tuning, rocket recovery physics, and performance benchmarking.",
  },
];

export const topics: Topic[] = topicSchema.array().parse(
  topicBlurbs.map((topic) => ({
    ...topic,
    postCount: posts.filter((post) => post.topic === topic.name).length,
  })),
);

/**
 * The blurb for each series. Everything countable — how many parts there are,
 * what they are called, what order they run in — is derived from the posts
 * below rather than restated here, so a series cannot drift out of step with
 * its own articles. A series exists here only if posts actually claim it.
 */
const seriesBlurbs: Record<string, { title: string; dek: string }> = {
  "linux-switch": {
    title: "Moving to Linux",
    dek: "Picking the OS, understanding why the tooling favours it, then fixing the things that break first.",
  },
  "regression-explained": {
    title: "Regression, Explained",
    dek: "The two models everything else is built on, worked through from the maths outward.",
  },
  mcp: {
    title: "The Model Context Protocol",
    dek: "What MCP solves, what happens to the context window at scale, and where it sits next to A2A.",
  },
};

/**
 * Series in the order their first part was published, each carrying its real
 * parts. `currentPart` is the number published: every part of every series here
 * is out, so the ladder reads as complete rather than implying a pending one.
 */
export const seriesList: Series[] = seriesSchema.array().parse(
  Object.entries(seriesBlurbs)
    .map(([slug, blurb]) => {
      const parts = posts
        .filter((post) => post.series?.slug === slug)
        .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));

      return {
        slug,
        ...blurb,
        status: "Read the series",
        partCount: parts.length,
        parts: parts.map((post) => post.title),
        currentPart: parts.length,
        firstPublished: parts[0]?.publishedAt ?? "",
      };
    })
    .sort((a, b) => a.firstPublished.localeCompare(b.firstPublished))
    .map(({ firstPublished: _firstPublished, ...series }) => series),
);

/**
 * Ways in, for someone who has not read any of this.
 *
 * Forty posts in reverse-chronological order is a record, not a route. These
 * cross topics and years on purpose — that is the thing the topic pages and the
 * series ladder cannot do. A post may appear in more than one path, and may
 * also belong to a series; the two answer different questions.
 */
export const readingPaths: ReadingPath[] = readingPathSchema.array().parse([
  {
    slug: "retrieval",
    title: "How retrieval actually works",
    dek: "Grounding a language model in documents it was never trained on, from the mechanics up to when not to bother.",
    forWho: "You have heard RAG described and want the machinery underneath it.",
    steps: [
      {
        slug: "llm-think",
        why: "Start with what the model is doing at all: tokens, vectors, attention.",
      },
      {
        slug: "how-rag-works",
        why: "The loop itself — embedding, cosine similarity, context injection.",
      },
      {
        slug: "gemini-vector-database",
        why: "The same loop as working code, against a real vector database.",
      },
      {
        slug: "cag-vs-rag",
        why: "Then the case against it, when latency is the constraint that matters.",
      },
    ],
  },
  {
    slug: "serving-models",
    title: "Getting a model into production",
    dek: "Open weights, the hardware they run on, adapting them to your problem, and packaging the result.",
    forWho: "You can call an API and now need to run the thing yourself.",
    steps: [
      { slug: "llmhg", why: "Get an open model running at all, with the least ceremony." },
      {
        slug: "llm-finetuning",
        why: "Adapt it on one GPU instead of a cluster — PEFT, LoRA, QLoRA.",
      },
      { slug: "nvidia-nim", why: "Package it as a service rather than a script." },
      { slug: "lpu-vs-gpu", why: "And the hardware question underneath all of it." },
    ],
  },
  {
    slug: "agents",
    title: "Agents and the protocol layer",
    dek: "How a model gets access to tools, why that breaks at scale, and where agent-to-agent sits next to it.",
    forWho: "You are wiring a model to real tools and want the standards, not the glue code.",
    steps: [
      { slug: "my-mcp", why: "The problem MCP exists to solve." },
      { slug: "docker-mcp", why: "What happens to the context window once you have fifty tools." },
      { slug: "mcp-vs-acp", why: "How MCP and A2A stack, rather than compete." },
      { slug: "crewai-agents", why: "And what you build on top: several agents with roles." },
    ],
  },
  {
    slug: "fundamentals",
    title: "The maths under the models",
    dek: "The two algorithms everything else is built on, and how to tell whether a model learned the right thing.",
    forWho: "You want the ground floor before the language models.",
    steps: [
      { slug: "linear-regression", why: "Fitting a straight line, worked through properly." },
      { slug: "logistic-regression", why: "The same machinery turned into a classifier." },
      { slug: "explaiable-ai", why: "Then how to check a model is right for the right reasons." },
    ],
  },
  {
    slug: "set-up",
    title: "Set up a machine you can work on",
    dek: "Choosing the operating system, living with the choice, and fixing the things that break first.",
    forWho: "You are early enough that the tooling is still in the way.",
    steps: [
      {
        slug: "programing-environment-os",
        why: "The choice itself, without a single right answer.",
      },
      { slug: "intro-to-linux", why: "Why the tooling keeps pointing one way." },
      { slug: "windows-vs-linux", why: "What actually changes day to day after switching." },
      {
        slug: "pip-install-pipenv-issue-solved",
        why: "The first error a fresh Python install throws at you.",
      },
      {
        slug: "django-and-python-web-development",
        why: "And something real, from empty machine to running app.",
      },
    ],
  },
]);

export const comments: Comment[] = [];

export const timeline: TimelineEntry[] = timelineEntrySchema.array().parse([
  {
    years: "2026",
    role: "Machine Learning Engineer",
    org: "H2O.ai",
    note: "Working on production AI and ML systems across LLM applications, agentic systems, predictive AI, AutoML, and the H2O ecosystem.",
  },
  {
    years: "2026",
    role: "Machine Learning Engineer",
    org: "CML Insight",
    note: "Worked on machine learning systems and applied ML engineering, bridging research ideas with practical production-oriented solutions.",
  },
  {
    years: "2025",
    role: "AI/ML Research Assistant",
    org: "University of Peradeniya",
    note: "Worked on AI/ML research while exploring problems at the intersection of machine learning, software engineering, and research.",
  },
  {
    years: "2024",
    role: "B.Sc. (Hons) in Engineering",
    org: "University of Peradeniya",
    note: "Graduated in Computer Engineering, building a foundation across software engineering, systems, mathematics, and artificial intelligence.",
  },
  {
    years: "2024",
    role: "Full-Stack Software Engineer Intern",
    org: "GTN Technologies",
    note: "Worked on full-stack software engineering in a production fintech environment, gaining practical experience across frontend, backend, APIs, databases, and application development.",
  },
  {
    years: "2024",
    role: "Final Year Project",
    org: "University of Peradeniya",
    note: "Developed an Oxford Nanopore Technology-based pipeline for RNA-Seq data analysis, working with Chiran Govinna and Tharindu Dhananjaya in a research area that was new to the team.",
  },
]);

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

export const aboutSetup = [
  { label: "OS", value: "Linux & macOS" },
  { label: "Distros", value: "Ubuntu, Debian, Kali" },
  { label: "Languages", value: "Python, TypeScript, JavaScript, Java, Go, SQL" },
  { label: "ML", value: "PyTorch, TensorFlow, scikit-learn" },
  { label: "AI", value: "LLMs, RAG, AI Agents, MCP, LangGraph" },
  { label: "Infrastructure", value: "Docker, Kubernetes, Kafka, AWS & Google Cloud" },
] as const;

export const footerColumns = [
  {
    title: "Read",
    links: [
      { label: "All articles", href: routes.articles },
      { label: "Where to start", href: routes.paths },
      { label: "Series", href: routes.series },
      { label: "Topics", href: routes.topics },
      { label: "Tags", href: routes.tags },
      { label: "Corrections", href: routes.corrections },
      { label: "Search", href: routes.search },
      { label: "Saved", href: routes.saved },
      { label: "About", href: routes.about },
      { label: "Contact", href: routes.contact },
      { label: "Privacy", href: routes.privacy },
    ],
  },
  {
    title: "Topics",
    links: [
      { label: "Engineering", href: "/topics/engineering" },
      { label: "Systems", href: "/topics/systems" },
      { label: "Research", href: "/topics/research" },
      { label: "Findings", href: "/topics/findings" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: author.github, external: true },
      { label: "LinkedIn", href: author.linkedin, external: true },
      { label: "X", href: author.twitter, external: true },
      { label: "RSS Feed", href: "/rss.xml", external: true },
    ],
  },
] as const;
