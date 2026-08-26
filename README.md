# Space — AI Systems & Software Engineering

> An engineering publication by **Kushan Manahara** exploring AI systems, machine learning, autonomous agents, and production software engineering.
>
> 🌐 **Live Site**: [https://space.gimhara.com](https://space.gimhara.com)

---

## 📖 About Space

Space is an independent engineering publication dedicated to what is actually happening underneath the abstractions — from mathematical foundations and model training to neural networks, inference, fine-tuning, and modern LLM systems:

* **Machine Learning & AI**: Neural network architectures, inference latency/throughput, fine-tuning, and modern LLM systems.
* **AI Agents & Systems**: Tool calling, Model Context Protocol (MCP), RAG, agent architectures, orchestration, evaluation, and protocols connecting models to real tools and data.
* **The Engineering Underneath**: Linux internals, Python, TypeScript, distributed systems, cloud infrastructure, containers, Kubernetes, Kafka, APIs, databases, and tooling for production AI prototypes.
* **Milestones & Lessons**: Field notes from the journey across software engineering, AI research, and applied machine learning systems.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16.3.1](https://nextjs.org/) (App Router + Turbopack + React 19) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), Radix UI primitives, Lucide Icons |
| **Typography** | Louis George Café (Custom variable font) |
| **Database** | [Turso](https://turso.tech/) (Serverless libSQL / SQLite in AWS Mumbai `ap-south-1`) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) with automated migrations |
| **Email Service** | [Resend](https://resend.com/) Unified Contacts API & React Email templates |
| **Content Engine** | Fully typed, build-time Zod schema validation (`src/lib/content/`) |
| **Hosting & DNS** | [Vercel](https://vercel.com/) Global Edge Network + [Cloudflare](https://cloudflare.com/) DNS |

---

## ✨ Key Features

* 👓 **Distraction-Free Reader Mode**: Dedicated reading canvas with keyboard shortcut (`R`), customizable fonts, column widths, and reading themes (Clean, Warm, Sepia, Night).
* 📱 **Mobile-First Usability & Ergonomics**: Full-app audit across 12 routes with zero horizontal overflow, iOS Safari auto-zoom prevention (`text-[16px]` inputs), and accessible touch targets (≥ 36px–44px).
* 💬 **Verified Peer Discussions**: Real-time reader discussion threads with verified author credentials (name, role, and email).
* 📬 **Newsletter & Broadcast Pipeline**: Automated subscriber synchronization, RFC 8058 One-Click Unsubscribe headers, web-based `/unsubscribe` interface, and an author `/studio` broadcast engine.
* 🔍 **Multi-Facet Search & Tagging**: Instant search with deep keyword indexing across articles, topics, and reading durations.
* 🌐 **Rich Social Graph & SEO**: High-resolution OpenGraph previews (512×512 branding), structured JSON-LD schemas, RSS 2.0 feed (`/rss.xml`), and dynamic sitemaps.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js**: `20.x` or higher
* **Package Manager**: `pnpm` (v10+ recommended)

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

# Resend Email Delivery
RESEND_API_KEY=re_your_api_key
RESEND_AUDIENCE_ID=your-resend-audience-id
RESEND_FROM_EMAIL=newsletter.space@gimhara.com

# Studio Security & Unsubscribe Secret
STUDIO_SECRET=your-studio-passphrase
UNSUBSCRIBE_SECRET=your-unsubscribe-token-secret
```

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
pnpm build           # Production build (compiles all 65 pre-rendered routes)
pnpm typecheck       # TypeScript type checking
pnpm lint            # Run ESLint checks
pnpm format          # Format codebase with Prettier

# Database Operations (Drizzle ORM + Turso)
pnpm db:push         # Push schema changes from schema.ts to Turso Cloud
pnpm db:sync         # Safe sync local articles & baseline metrics to database
pnpm db:sync:force   # Reset and overwrite database baselines from local content
pnpm db:studio       # Launch visual Drizzle database GUI

# Newsletter Verification
npx tsx scripts/verify-newsletter-pipeline.ts   # Comprehensive subscription & broadcast test
npx tsx scripts/test-newsletter.ts              # Send test email to verify headers and inbox rendering
```

---

## 👤 Author

**Kushan Manahara**
* Machine Learning Engineer at H2O.ai
* Website: [https://space.gimhara.com](https://space.gimhara.com)
* GitHub: [@KushanManahara](https://github.com/KushanManahara)
* LinkedIn: [/in/kushan-manahara](https://www.linkedin.com/in/kushan-manahara)
* X (Twitter): [@Kushan_Manahara](https://x.com/Kushan_Manahara)
* Email: [hi@gimhara.com](mailto:hi@gimhara.com)

---

## 📄 License

This project is licensed under the MIT License. Copyright © 2026 Kushan Manahara. All rights reserved.

