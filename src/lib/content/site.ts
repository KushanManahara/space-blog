import {
  authorSchema,
  tagSchema,
  timelineEntrySchema,
  topicSchema,
  type Author,
  type Comment,
  type Series,
  type Tag,
  type TimelineEntry,
  type Topic,
} from "./schemas";

/** Absolute origin, used for canonicals, OG tags, the feed and the sitemap. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://space.gimhara.com";

export const site = {
  name: "Space",
  tagline: "Writing on AI systems & Software Engineering",
  issue: 40,
  description:
    "A single-author engineering publication on AI systems, machine learning, and software architecture by Kushan Manahara.",
  seriesCount: 0,
  correctionCount: 0,
  subscriberCount: 0,
  archivePageCount: 1,
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

export const topics: Topic[] = topicSchema.array().parse([
  {
    name: "Systems",
    slug: "systems",
    description:
      "Kernels, schedulers, operating systems, and protocols: deep dives into how systems operate under the hood.",
    postCount: 9,
  },
  {
    name: "Engineering",
    slug: "engineering",
    description:
      "The practical craftsmanship of shipping software: backend frameworks, package managers, container tooling, and the plumbing that agents run on.",
    postCount: 12,
  },
  {
    name: "Findings",
    slug: "findings",
    description:
      "Personal engineering journeys, certifications, career milestones, and unexpected lessons learned along the way.",
    postCount: 6,
  },
  {
    name: "Research",
    slug: "research",
    description:
      "Explorations into LLM reasoning, explainable AI, Apple Intelligence, and machine learning foundations.",
    postCount: 6,
  },
  {
    name: "Inference",
    slug: "inference",
    description:
      "Latency, throughput, and hardware acceleration: LPUs, GPUs, and high-performance inference microservices.",
    postCount: 3,
  },
  {
    name: "Evaluation",
    slug: "evaluation",
    description:
      "Retrieval architectures, caching strategies, and what happens when real-time crisis data meets a language model.",
    postCount: 2,
  },
  {
    name: "Experiments",
    slug: "experiments",
    description:
      "Hands-on experiments in LLM fine-tuning, rocket recovery physics, and performance benchmarking.",
    postCount: 2,
  },
]);

export const seriesList: Series[] = [];

export const tags: Tag[] = tagSchema.array().parse([
  { name: "#machine-learning", postCount: 3 },
  { name: "#llm", postCount: 6 },
  { name: "#ai-agents", postCount: 3 },
  { name: "#mcp", postCount: 3 },
  { name: "#rag", postCount: 3 },
  { name: "#inference", postCount: 3 },
  { name: "#deep-learning", postCount: 2 },
  { name: "#pytorch", postCount: 2 },
  { name: "#python", postCount: 3 },
  { name: "#distributed-systems", postCount: 2 },
  { name: "#kafka", postCount: 1 },
  { name: "#kubernetes", postCount: 1 },
  { name: "#linux", postCount: 7 },
  { name: "#cloud", postCount: 2 },
  { name: "#mlops", postCount: 1 },
  { name: "#llmops", postCount: 1 },
  { name: "#devtools", postCount: 3 },
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
  unsubscribe: "/unsubscribe",
  studio: "/studio",
  editor: "/studio/editor",
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
      { label: "Topics", href: routes.topics },
      { label: "Search", href: routes.search },
      { label: "About", href: routes.about },
      { label: "Contact", href: routes.contact },
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
