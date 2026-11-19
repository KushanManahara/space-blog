# My Writings | Kushan Manahara

> Ideas, lessons, and things I've learned while building with technology.
>
> 🌐 **Live Site**: [https://space.gimhara.com](https://space.gimhara.com)

---

## 📖 About Space

Space is an independent engineering publication dedicated to what is actually happening underneath the abstractions — from mathematical foundations and model training to neural networks, inference, fine-tuning, and modern LLM systems:

- **Machine Learning & AI**: Neural network architectures, inference latency/throughput, fine-tuning, and modern LLM systems.
- **AI Agents & Systems**: Tool calling, Model Context Protocol (MCP), RAG, agent architectures, orchestration, evaluation, and protocols connecting models to real tools and data.
- **The Engineering Underneath**: Linux internals, Python, TypeScript, distributed systems, cloud infrastructure, containers, Kubernetes, Kafka, APIs, databases, and tooling for production AI prototypes.
- **Milestones & Lessons**: Field notes from the journey across software engineering, AI research, and applied machine learning systems.

---

## 🛠️ Architecture & Tech Stack

| Layer              | Technologies                                                                                              |
| :----------------- | :-------------------------------------------------------------------------------------------------------- |
| **Framework**      | [Next.js 16.4](https://nextjs.org/) (App Router + Turbopack + React 19)                                   |
| **Styling & UI**   | [Tailwind CSS v4](https://tailwindcss.com/), Radix UI primitives, Lucide Icons                            |
| **Typography**     | Louis George Café (Custom variable font)                                                                  |
| **Database**       | [Turso](https://turso.tech/) (Serverless libSQL / SQLite in AWS Mumbai `ap-south-1`)                      |
| **ORM**            | [Drizzle ORM](https://orm.drizzle.team/) with automated migrations                                        |
| **Email Service**  | [Resend](https://resend.com/) Unified Contacts API & React Email templates                                |
| **Scheduling**     | Vercel schedule (`vercel.json`) for the daily new-article email queue                                     |
| **Spam Control**   | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) on reviews, honeypots, rate limits |
| **Content Engine** | Fully typed, build-time Zod schema validation (`src/lib/content/`)                                        |
| **Hosting & DNS**  | [Vercel](https://vercel.com/) Global Edge Network + [Cloudflare](https://cloudflare.com/) DNS             |

---

## ✨ Key Features

- 👓 **Distraction-Free Reader Mode**: Dedicated reading canvas with keyboard shortcut (`R`), customizable fonts, column widths, and reading themes (Clean, Warm, Sepia, Night).
- 📱 **Mobile-First Ergonomics & Native iOS Experience**: Edge-to-edge safe area rendering (`viewport-fit=cover`, translucent status bar), smart auto-collapsing sticky navbar on scroll down and expanding on scroll up, zero horizontal overflow, iOS auto-zoom elimination (`text-[16px]` inputs), and accessible touch targets (≥ 36px–44px).
- 💬 **Moderated Discussions & Reviews**: Reader comments and reviews are held for approval before they appear; reviews are protected by Cloudflare Turnstile and can be moderated from signed email links or the CLI.
- 📬 **Newsletter Pipeline**: Double opt-in confirmation, signed RFC 8058 one-click unsubscribe links, and a daily schedule that emails subscribers about new articles automatically (manual sends via `pnpm broadcast`).
- 🔍 **Keyword & Semantic Search**: Instant keyword search across articles, topics, and tags, plus opt-in semantic search that embeds the query in the browser.
- 🧪 **Interactive Articles**: Runnable Python (Pyodide), Mermaid diagrams, KaTeX formulas, interactive charts, and lazy-loaded YouTube embeds.
- 🎓 **Brain Link on YouTube**: The companion teaching channel is featured on the homepage and the About page.
- 🌐 **Rich Social Graph & SEO**: High-resolution OpenGraph previews (512×512 branding), structured JSON-LD schemas, RSS 2.0 feed (`/rss.xml`), and dynamic sitemaps.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `20.9` or higher (22 LTS recommended)
- **Package Manager**: `pnpm` (v10+ recommended)

### 1. Clone & Install Dependencies

```bash
git clone git@github.com:KushanManahara/space-blog.git
cd space-blog
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Fill in your configuration keys:

```env
# Canonical Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Turso Cloud SQLite Database
TURSO_DATABASE_URL=libsql://[your-database-name].turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token

# Resend Email Delivery & Newsletter Cryptographic HMAC Secret
RESEND_API_KEY=re_your_api_key
NEWSLETTER_SECRET=your-newsletter-hmac-secret
NEWSLETTER_FROM_EMAIL="Space <newsletter.space@gimhara.com>"

# Contact form delivery
CONTACT_TO_EMAIL=you@example.com

# Cloudflare Turnstile (reviews). Leave empty locally to use test keys.
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Protects the email-queue cron route
CRON_SECRET=
```

See `.env.example` for every variable and what it does.

### 3. Initialize the Database

Push schema definitions and synchronize baseline articles to Turso:

```bash
pnpm db:push
pnpm db:sync
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the blog.

---

## ⚡ Useful Scripts

```bash
# Quality Assurance
pnpm build           # Run DB migrations, then the production build
pnpm typecheck       # Generate route types, then TypeScript type checking
pnpm lint            # Run ESLint checks
pnpm format          # Format codebase with Prettier
pnpm test            # Run tests (Node test runner via tsx)
pnpm check           # format:check + lint + typecheck + build

# Database Operations (Drizzle ORM + Turso)
pnpm db:push         # Push schema changes from schema.ts to Turso Cloud
pnpm db:sync         # Safe sync local articles & baseline metrics to database
pnpm db:sync:force   # Reset and overwrite database baselines from local content
pnpm db:studio       # Launch visual Drizzle database GUI

# Article Newsletter Broadcasting
pnpm broadcast                       # List available article slugs
pnpm broadcast <slug>                # Dry-run (preview article details & subscriber count)
pnpm broadcast <slug> --test=<email> # Send a preview to one inbox (--to= also works)
pnpm broadcast <slug> --send         # Send to ALL subscribers now (the daily schedule then skips it)

# Moderation, Search & Maintenance
pnpm comments        # List, approve, or reject held reader comments
pnpm reviews         # List, approve, feature, hide, or reject reader reviews
pnpm embeddings      # Rebuild semantic search embeddings (run after editing article bodies)
pnpm prune:limits    # Delete expired rate-limit rows
```

---

## 👤 Author

**Kushan Manahara**

- Machine Learning Engineer at H2O.ai
- Website: [https://space.gimhara.com](https://space.gimhara.com)
- GitHub: [@KushanManahara](https://github.com/KushanManahara)
- LinkedIn: [/in/kushan-manahara](https://www.linkedin.com/in/kushan-manahara)
- X (Twitter): [@Kushan_Manahara](https://x.com/Kushan_Manahara)
- YouTube: [Brain Link (@Brain-Link-ai)](https://www.youtube.com/@Brain-Link-ai)
- Email: [hi@gimhara.com](mailto:hi@gimhara.com)

---

## 📄 License

This project is licensed under the MIT License. Copyright © 2026 Kushan Manahara. All rights reserved.
