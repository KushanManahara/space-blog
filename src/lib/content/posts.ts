// src/lib/content/posts.ts
import { postSchema, type Post } from "./schemas";

export const posts: Post[] = postSchema.array().parse([
  {
    slug: "engineering-council-sri-lanka",
    title: "Registered as an Associate Engineer with the Engineering Council of Sri Lanka",
    dek: "Receiving official registration under the ECSL Act No. 4 of 2017. What statutory engineering recognition means for software and systems practitioners.",
    topic: "Findings",
    publishedAt: "2025-04-01",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#engineering", "#career", "#milestones"],
    coverImage: "/articles/engineering-council-sri-lanka.png",
    body: [
      {
        kind: "paragraph",
        html: "I am pleased to share an important milestone in my professional engineering journey: I have been officially registered as an **Associate Engineer** by the **Engineering Council of Sri Lanka (ECSL)**.",
      },
      {
        kind: "paragraph",
        html: "In many parts of the tech industry, the title 'engineer' is used casually—often appended to frontend developers, prompt engineers, or sales specialists without formal statutory meaning. In Sri Lanka, however, the **Engineering Council, Sri Lanka Act No. 4 of 2017** established a strict legal framework regulating the practice of engineering across all disciplines.",
      },
      {
        kind: "heading",
        id: "the-statutory-and-academic-foundation",
        text: "The Statutory and Academic Foundation",
      },
      {
        kind: "paragraph",
        html: "Under the ECSL Act, registration as an Associate Engineer recognizes individuals holding a four-year engineering honors degree from an accredited institution. For me, this is rooted in my graduation from the **Department of Computer Engineering at the University of Peradeniya**—a program accredited under the international **Washington Accord** by the Institution of Engineers, Sri Lanka (IESL).",
      },
      {
        kind: "paragraph",
        html: "That academic foundation was deeply rigorous. It wasn't just about learning high-level programming frameworks; it meant mastering computer systems architecture, operating systems internals, discrete mathematics, digital signal processing, electronic circuit design, and hardware-software co-design. That breadth builds an instinct for understanding exactly what happens when high-level code interacts with physical transistors and OS schedulers.",
      },
      {
        kind: "heading",
        id: "why-formal-engineering-matters-in-ai-and-systems",
        text: "Why Engineering Discipline Matters in Modern Software and AI",
      },
      {
        kind: "paragraph",
        html: "As software systems become increasingly autonomous—powering critical health infrastructure, automated trading desks, and LLM agentic pipelines—the boundary between traditional civil/mechanical engineering and computer engineering blurs. When an AI pipeline hallucinates an automated medical recommendation or an asynchronous worker pool exhausts server memory during an emergency, the consequences are concrete and severe.",
      },
      {
        kind: "paragraph",
        html: "Statutory engineering registration reinforces three principles that guide how I build and write:",
      },
      {
        kind: "list",
        items: [
          "**Professional Accountability**: A commitment to rigorous verification, defensive systems design, and root-cause analysis rather than superficial hot-fixes.",
          "**Code of Ethics and Public Safety**: Designing distributed systems with security, privacy, data protection, and fault tolerance as primary non-functional requirements.",
          "**Continuous Professional Development (CPD)**: The ongoing discipline of keeping pace with rapidly evolving systems architectures, from Linux kernel developments to state-of-the-art agent protocols.",
        ],
      },
      {
        kind: "paragraph",
        html: "I look forward to continuing my journey as a practicing computer systems engineer, building high-reliability software, and documenting technical findings here on Space.",
      },
    ],
  },
  {
    slug: "mcp-vs-acp",
    title: "MCP and A2A Are Layers, Not Rivals",
    dek: "The consolidation under open standards settled the protocol question. MCP solves tool access; A2A solves agent collaboration. Here is how they stack in production.",
    topic: "Systems",
    publishedAt: "2025-02-25",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#mcp", "#acp", "#aiagents", "#protocols"],
    coverImage: "/articles/mcp-vs-acp.png",
    body: [
      {
        kind: "paragraph",
        html: "The AI agent ecosystem has transitioned over the past year from wild fragmentation toward layered standardization. In early 2024, if you wanted an autonomous agent to read a production Postgres table, query GitHub pull requests, and hand off tasks to a specialized verification agent, you had to write custom glue code for every model provider and every tool.",
      },
      {
        kind: "paragraph",
        html: "For a while, two emerging standards seemed to compete for mindshare: Anthropic's **Model Context Protocol (MCP)** and agent communication protocols such as IBM's ACP and Google's **A2A (Agent-to-Agent)**. The industry debated which protocol would win.",
      },
      {
        kind: "paragraph",
        html: "That debate is over because it was based on a category error. **MCP and A2A operate on orthogonal axes.** MCP is the *vertical* plane (model-to-tool), while A2A is the *horizontal* plane (agent-to-agent). High-scale enterprise agentic systems do not pick between them; they use MCP at the bottom of the stack and A2A at the top.",
      },
      {
        kind: "heading",
        id: "the-layered-agent-stack",
        text: "The Layered Agent Architecture",
      },
      {
        kind: "code",
        filename: "architecture.txt",
        code: `┌─────────────────────────────────────────────────────────────┐\n│                     AGENT ORCHESTRATION LAYER               │\n│             A2A Protocol (REST / SSE / Asynchronous)        │\n│   • Capability discovery (Agent Cards)                      │\n│   • Cross-organization task delegation                      │\n│   • Human-in-the-loop approvals & long-running sessions     │\n└──────────────┬───────────────────────────────┬──────────────┘\n               │ Task Delegation               │ Task Delegation\n               ▼                               ▼\n┌──────────────────────────────┐ ┌─────────────────────────────┐\n│    SPECIALIZED AGENT A       │ │     SPECIALIZED AGENT B     │\n│    (e.g., Code Reviewer)     │ │     (e.g., Deploy Master)   │\n└──────────────┬───────────────┘ └─────────────┬───────────────┘\n               │ MCP (JSON-RPC 2.0)            │ MCP (JSON-RPC 2.0)\n               ▼                               ▼\n┌──────────────────────────────┐ ┌─────────────────────────────┐\n│     MCP TOOL SERVERS         │ │      MCP TOOL SERVERS       │\n│   • Git / GitHub API         │ │   • Kubernetes Cluster API  │\n│   • Static Analysis Engine   │ │   • Cloudflare DNS          │\n└──────────────────────────────┘ └─────────────────────────────┘`,
      },
      {
        kind: "heading",
        id: "mcp-the-vertical-tool-plane",
        text: "MCP: The Vertical Tool Plane",
      },
      {
        kind: "paragraph",
        html: "MCP solves the `N×M` integration problem between models and external resources. Instead of every tool author writing custom SDK wrappers for LangChain, LlamaIndex, Claude, and OpenAI, MCP establishes a clean, type-safe client-server contract over JSON-RPC 2.0 (via `stdio` or Server-Sent Events).",
      },
      {
        kind: "paragraph",
        html: "MCP is strictly **stateless and synchronous**. A tool call is an atomic query: the model issues a request, the server executes the tool locally, and returns the structured payload. Here is what a raw MCP tool invocation looks like on the wire:",
      },
      {
        kind: "code",
        filename: "mcp-call.json",
        code: `// Client -> MCP Server\n{\n  "jsonrpc": "2.0",\n  "id": "req-42",\n  "method": "tools/call",\n  "params": {\n    "name": "query_database",\n    "arguments": {\n      "sql": "SELECT id, status, total FROM orders WHERE customer_id = $1 LIMIT 5",\n      "params": ["cust_9821"]\n    }\n  }\n}\n\n// MCP Server -> Client\n{\n  "jsonrpc": "2.0",\n  "id": "req-42",\n  "result": {\n    "content": [\n      {\n        "type": "text",\n        "text": "[{\\"id\\":\\"ord_1\\",\\"status\\":\\"shipped\\",\\"total\\":149.50}]"\n      }\n    ],\n    "isError": false\n  }\n}`,
      },
      {
        kind: "heading",
        id: "a2a-the-horizontal-collaboration-plane",
        text: "A2A: The Horizontal Collaboration Plane",
      },
      {
        kind: "paragraph",
        html: "While MCP connects a model to a database, it has no semantics for long-running workflows, multi-agent negotiations, or inter-service trust. If an agent needs to delegate a task to an agent hosted by a third-party vendor (e.g. an external logistics provider), MCP is the wrong protocol.",
      },
      {
        kind: "paragraph",
        html: "**A2A (Agent-to-Agent)** operates over HTTPS/REST and WebSockets. It introduces:",
      },
      {
        kind: "list",
        items: [
          "**Agent Discovery**: Agents publish machine-readable capability cards declaring their domains, input schemas, and authentication requirements.",
          "**Asynchronous State Machines**: Tasks can remain in `pending_approval` or `in_progress` for hours while waiting for human sign-off or external batch completions, without holding open synchronous socket connections.",
          "**Organizational Boundaries**: Built-in OAuth2 and mTLS mechanisms allow agents across different companies to collaborate with auditability.",
        ],
      },
      {
        kind: "code",
        filename: "a2a-task-delegation.json",
        code: `// Orchestrator -> Compliance Audit Agent (A2A)\nPOST /v1/agents/compliance-auditor/tasks\nHost: agent.enterprise-audit.com\nAuthorization: Bearer eyJhbGciOi...\nContent-Type: application/json\n\n{\n  "task_id": "task_audit_2026_09",\n  "intent": "evaluate_pull_request_compliance",\n  "payload": {\n    "repository": "space/backend-api",\n    "pr_number": 342,\n    "compliance_frameworks": ["SOC2", "HIPAA"]\n  },\n  "callback_url": "https://orchestrator.internal.net/webhooks/a2a-results",\n  "async": true\n}`,
      },
      {
        kind: "heading",
        id: "how-they-unite-in-production",
        text: "How They Stack Together",
      },
      {
        kind: "paragraph",
        html: "Consider a concrete production scenario: An incident response orchestrator receives an alerting webhook. The orchestrator uses **A2A** to assign a diagnosis task to a Site Reliability Agent. That SRE Agent boots up, uses **MCP** to query Datadog logs and inspect Kubernetes pods, determines that a memory leak occurred, and uses **MCP** to restart the deployment.",
      },
      {
        kind: "paragraph",
        html: "Once mitigated, the SRE Agent uses **A2A** to reply back to the orchestrator with the incident timeline. The orchestrator then delegates to a Comms Agent via **A2A** to draft the customer-facing post-mortem.",
      },
      {
        kind: "callout",
        title: "Key Takeaway",
        body: "Build tool integrations as MCP servers so any client or agent can immediately consume your database, APIs, and CLI tools. Build inter-service agent communication with A2A so agents can negotiate, pause, and collaborate asynchronously across infrastructure boundaries.",
      },
    ],
  },
  {
    slug: "docker-mcp",
    title: "Docker's Dynamic MCP and the Context Window Problem",
    dek: "Fifty tool definitions crammed into the context window costs tokens, degrades reasoning, and risks hallucinations. Docker's containerized MCP Gateway and dynamic discovery flip the model.",
    topic: "Engineering",
    featured: true,
    publishedAt: "2025-02-24",
    readingMinutes: 5,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#mcp", "#docker", "#aiagents", "#devtools"],
    coverImage: "/articles/docker-mcp.png",
    body: [
      {
        kind: "paragraph",
        html: "If you have spent any serious time building with Anthropic's **Model Context Protocol (MCP)**, you have likely run headfirst into what engineers are calling the *tool sprawl dilemma*. When MCP was first released, most setups wired two or three servers: a local SQLite database, a filesystem reader, and perhaps a GitHub integration. Everything was fast, prompt tokens were negligible, and the model rarely missed a tool call.",
      },
      {
        kind: "paragraph",
        html: "Fast forward to production setups, and developers are now attempting to connect 10, 15, or 20 distinct MCP servers simultaneously: Postgres, Redis, AWS, Slack, Sentry, Jira, and Docker. Each server exposes anywhere from 5 to 20 individual tool schemas. Suddenly, your AI client is forced to prepend **over 50 tool definitions** into the context window on every single turn.",
      },
      {
        kind: "heading",
        id: "the-token-tax-and-attention-degradation",
        text: "The Token Tax and Attention Degradation",
      },
      {
        kind: "paragraph",
        html: "The problem is twofold: direct financial cost and cognitive degradation. Each MCP tool definition is not just a function name—it is a verbose JSON Schema containing parameter types, nested properties, enums, and detailed markdown descriptions intended to guide the model's decision making.",
      },
      {
        kind: "paragraph",
        html: "A suite of 60 active tools can easily devour **20,000 to 45,000 tokens** before the user even types their first question. In a multi-turn conversation of 20 turns, you are paying for those 45,000 schema tokens 20 times over. Worse, research into 'lost in the middle' phenomena demonstrates that packing dozens of similar tool schemas into the context window significantly increases tool selection errors and hallucinated parameter values.",
      },
      {
        kind: "callout",
        title: "The Core Dilemma",
        body: "Static MCP configurations force a zero-sum tradeoff: either handicap your agent by giving it access to only a few tools, or bloat your context window with dozens of schemas that degrade reasoning and drain API budgets.",
      },
      {
        kind: "heading",
        id: "the-docker-mcp-architecture",
        text: "The Docker MCP Architecture: Gateway and Catalog",
      },
      {
        kind: "paragraph",
        html: "Docker's official answer—built into Docker Desktop 4.50+ via the **MCP Toolkit** and the open-source **Docker MCP Gateway**—fundamentally redesigns how agents interact with external capabilities. Instead of treating MCP servers as host-level node or python processes that must be statically declared in client configuration files, Docker introduces three core concepts:",
      },
      {
        kind: "list",
        items: [
          "**Docker MCP Catalog**: A curated registry of 300+ containerized, pre-verified MCP servers (`mcp/postgres`, `mcp/github`, `mcp/slack`, etc.). Packaging servers as container images eliminates Python virtualenv collisions, Node version mismatches, and native dependency compilation on the host.",
          "**The Docker MCP Gateway**: An intelligent local daemon and proxy that acts as the single unified MCP server exposed to your AI client (Claude Desktop, Cursor, VS Code, or Claude Code). The gateway orchestrates underlying container lifecycles on demand.",
          "**Dynamic Tool Discovery**: Rather than sending 50 tool schemas to the model up front, the Gateway sends only four meta-management tools: `mcp-find`, `mcp-add`, `mcp-config-set`, and `mcp-remove`.",
        ],
      },
      {
        kind: "heading",
        id: "client-configuration",
        text: "Configuring the Gateway in Claude Desktop and Cursor",
      },
      {
        kind: "paragraph",
        html: "Connecting an AI client to the Docker MCP Gateway requires only a single server entry in your client configuration file (`claude_desktop_config.json` on macOS/Windows, or a project-level `mcp.json`). Once connected, the client never needs to be restarted when new tools are added or removed:",
      },
      {
        kind: "code",
        filename: "claude_desktop_config.json",
        code: `{\n  "mcpServers": {\n    "MCP_DOCKER": {\n      "command": "docker",\n      "args": ["mcp", "gateway", "run"]\n    }\n  }\n}`,
      },
      {
        kind: "paragraph",
        html: 'When the client launches, the model sees the Docker Gateway. When you ask the agent: *\'Can you inspect our production Postgres schema and list recent orders?\'*, the agent doesn\'t fail because it lacks a Postgres tool. Instead, it calls `mcp-find(query="postgres")`, receives the catalog result, calls `mcp-add(server="mcp/postgres")`, and the gateway spins up an isolated container instantly. The Postgres tools are registered into the session dynamically without restarting the client.',
      },
      {
        kind: "heading",
        id: "running-isolated-servers-directly",
        text: "Direct Containerized Execution without the Gateway",
      },
      {
        kind: "paragraph",
        html: "If you prefer fixed, deterministic server declarations without dynamic discovery, Docker also solves the security isolation challenge. Traditional MCP servers run directly on your host machine with full user permissions. By running official Docker MCP images directly via stdio, you gain container sandboxing and explicit environment control:",
      },
      {
        kind: "code",
        filename: "claude_desktop_config.json",
        code: `{\n  "mcpServers": {\n    "postgres-db": {\n      "command": "docker",\n      "args": [\n        "run",\n        "-i",\n        "--rm",\n        "-e",\n        "DATABASE_URL=postgresql://read_only_user:secret@host.docker.internal:5432/space_production",\n        "mcp/postgres"\n      ]\n    },\n    "github": {\n      "command": "docker",\n      "args": [\n        "run",\n        "-i",\n        "--rm",\n        "-e",\n        "GITHUB_PERSONAL_ACCESS_TOKEN=ghp_yourTokenHere",\n        "mcp/github"\n      ]\n    }\n  }\n}`,
      },
      {
        kind: "paragraph",
        html: "Notice the `-i` (interactive/stdin passthrough) and `--rm` flags. Communication happens over standard input and output (JSON-RPC 2.0) exactly as the MCP specification mandates, but the process has zero access to your local `/Users` or filesystem unless you explicitly map a volume with `-v`.",
      },
      {
        kind: "heading",
        id: "cli-profile-management",
        text: "Managing Profiles via the Docker CLI",
      },
      {
        kind: "paragraph",
        html: "In team and production development, you often want specific tool sets bundled for specific repositories. Docker provides profile management through the `docker mcp` CLI plugin:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: `# 1. Create a specialized profile for backend data engineering\ndocker mcp profile create --name backend-data\n\n# 2. Add verified catalog servers to the profile\ndocker mcp profile server add backend-data --server mcp/postgres\ndocker mcp profile server add backend-data --server mcp/redis\n\n# 3. Configure credentials on the profile securely\ndocker mcp profile config backend-data --set mcp/postgres.DATABASE_URL=postgresql://user:pass@db.internal:5432/app\n\n# 4. Launch the Gateway restricted to this verified profile\ndocker mcp gateway run --profile backend-data`,
      },
      {
        kind: "paragraph",
        html: "You can also connect external desktop applications directly using the CLI bridge:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: `docker mcp client connect claude-desktop --profile backend-data`,
      },
      {
        kind: "heading",
        id: "code-mode-and-container-sandboxing",
        text: "Code Mode: Solving the Multihop Payload Explosion",
      },
      {
        kind: "paragraph",
        html: "The second breakthrough in Docker MCP is **Code Mode** (powered by `mcp-exec`). In standard agent interactions, if a tool returns a 4,000-line JSON array, the entire payload enters the LLM's conversation history just so the model can run a simple filter or aggregation.",
      },
      {
        kind: "paragraph",
        html: "Under Code Mode, the gateway provides a sandboxed JavaScript runtime container. Instead of streaming raw JSON payloads back to the model, the model writes a brief script that invokes the underlying MCP tools inside the container, processes the data locally in memory, and returns only the final scalar result or filtered summary back to the conversation. Docker estimates this reduces turn-by-turn context bloat by up to 90% on data-heavy tasks.",
      },
      {
        kind: "callout",
        title: "Production Rule of Thumb",
        body: "Use direct containerized execution (`docker run -i --rm mcp/<name>`) when your project has a fixed, well-scoped set of tools. Use the Docker MCP Gateway (`docker mcp gateway run`) with Dynamic Discovery when building general-purpose developer agents that need to solve unbounded problems across diverse cloud and database services.",
      },
      {
        kind: "paragraph",
        html: "The shift underneath all of this is from monolithic agents that attempt to hold the entire world in their context window to modular, discovery-driven agents that pull tools on demand inside secure containers. It is the single most practical architectural pattern for scaling MCP in production.",
      },
    ],
  },
  {
    slug: "my-mcp",
    title: "Why I'm Excited About MCP",
    dek: "A standard way to hand a model your files, your tools, and your prompts, without custom glue code holding it all together.",
    topic: "Systems",
    publishedAt: "2025-02-22",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#mcp", "#claude", "#tools", "#devtools"],
    coverImage: "/articles/my-mcp.png",
    body: [
      {
        kind: "paragraph",
        html: "Over the past few months I have been going deeper into one of the most useful pieces of AI infrastructure I have come across: the **Model Context Protocol**, or MCP. If you work with language models, whether you are building copilots, internal tools, or side projects, it is worth knowing about.",
      },
      {
        kind: "heading",
        id: "llms-are-isolated",
        text: "Models are capable, and isolated",
      },
      {
        kind: "paragraph",
        html: "The limitation I have run into again and again is simple: the model is smart, but it does not know anything unless you feed it the right context. Documents, databases, tools, workflows. Getting that context into the model securely and flexibly has always been a headache.",
      },
      {
        kind: "paragraph",
        html: "MCP is a standardized protocol that closes that gap. With it you can expose a folder of files to your assistant as resources, give it a set of functions it can call such as running a SQL query or sending an email, and offer pre-written prompts that guide interactions or define workflows. All through one clean protocol that works with any compliant server or client. No hacks and no custom glue code.",
      },
      {
        kind: "heading",
        id: "my-first-experiment",
        text: "My first experiment",
      },
      {
        kind: "paragraph",
        html: "I built a lightweight MCP server in Python, added a `run_query` tool to safely reach my PostgreSQL database, and ran it locally with the MCP dev tools. From there I could send test queries and simulate model interactions straight through the protocol. No frontend, no UI, just structured data in and out.",
      },
      {
        kind: "paragraph",
        html: "The reason that took an afternoon rather than a week is how little the SDK asks for. Install it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: 'pip install "mcp[cli]"\n# or, with uv:\nuv add "mcp[cli]"',
      },
      {
        kind: "paragraph",
        html: "A server is then a couple of decorated functions. This is the shape of it, straight from the SDK's own quickstart:",
      },
      {
        kind: "code",
        filename: "server.py",
        code: 'from mcp.server import MCPServer\n\nmcp = MCPServer("Demo")\n\n\n@mcp.tool()\ndef add(a: int, b: int) -> int:\n    """Add two numbers."""\n    return a + b\n\n\n@mcp.resource("greeting://{name}")\ndef greeting(name: str) -> str:\n    """Greet someone by name."""\n    return f"Hello, {name}!"',
      },
      {
        kind: "paragraph",
        html: "That is the whole server. There is no JSON Schema to write, because the type hints `a: int, b: int` are the schema. There is no request parsing, no validation code, and no protocol handling. The docstring becomes the description the model reads to decide whether to call the tool, which means writing a clear one is a real part of the work.",
      },
      {
        kind: "paragraph",
        html: "You run it against the MCP Inspector to poke at it before wiring up any client:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "uv run mcp dev server.py",
      },
      {
        kind: "paragraph",
        html: "Swap `add` for a function that opens a database connection and runs a parameterised query, and you have roughly what I built. That gave me a way to let the model talk to my data, run logic, and explain the results, all in structured JSON.",
      },
      {
        kind: "heading",
        id: "what-makes-it-work",
        text: "What makes it work",
      },
      {
        kind: "list",
        items: [
          "**It respects boundaries.** You control what the model sees and which tools it can run. Nothing happens without your say-so, and the surface is exactly the functions you decorated.",
          "**It is modular.** Build only what you need. There is no large framework to adopt first.",
          "**It is the right shape.** Context, control, and composability are exactly what agent-based systems need in order to work.",
        ],
      },
      {
        kind: "paragraph",
        html: "The boundary point is worth taking seriously rather than treating as a feature list item. A tool named `run_query` that accepts arbitrary SQL is a very different security proposition from one that accepts a customer ID. The protocol gives you the control; deciding how narrow to make each tool is still your job.",
      },
      {
        kind: "paragraph",
        html: "For me AI has never been only about the technology. It is about building tools that help people do things better, and MCP is what gets the right context to a model at the right time, in the right way. I am genuinely interested to see where it goes, and I plan to keep building with it.",
      },
      {
        kind: "paragraph",
        html: "If you want to try it, I made a [custom ChatGPT assistant for MCP](https://chatgpt.com/g/g-68068352332c819181320abe67354b48-mcp-assistant), built entirely from the official docs. It walks through MCP step by step, helps you build clients or servers faster, and helps you debug an implementation.",
      },
    ],
  },
  {
    slug: "xcodeai",
    title: "Apple's AI Coding Assistant in Xcode: Local-First Engineering on Apple Silicon",
    dek: "How Apple built predictive code completion directly into Xcode 16 using the Apple Neural Engine. Zero cloud roundtrips, offline privacy, and Swift specialization.",
    topic: "Engineering",
    publishedAt: "2025-02-18",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#xcode", "#apple", "#swift", "#copilot"],
    coverImage: "/articles/xcodeai.png",
    body: [
      {
        kind: "paragraph",
        html: "When Apple announced **Predictive Code Completion** and **Swift Assist** in **Xcode 16**, the developer community watched closely to see how Cupertino would respond to Microsoft's GitHub Copilot and Cursor. While competitors focused almost exclusively on massive cloud models, Apple leveraged its greatest architectural advantage: **unified memory and the Apple Neural Engine (ANE)**.",
      },
      {
        kind: "heading",
        id: "the-local-first-architectural-advantage",
        text: "The Local-First Architecture: Zero Cloud Roundtrips",
      },
      {
        kind: "paragraph",
        html: "The standout differentiator of Xcode's code completion is that it runs **100% locally on your Mac**. Powered by a specialized foundation model fine-tuned specifically for Swift and Apple frameworks (SwiftUI, SwiftData, UIKit), the model is quantized to execute efficiently on the 16-core Neural Engine of M-series chips.",
      },
      {
        kind: "list",
        items: [
          "**Sub-20ms Latency**: Because tokens are generated locally across the unified memory bus, completions appear seamlessly as you type, with none of the 300–800ms network jitter common in cloud-backed assistants.",
          "**True Offline Capability**: You can build, refactor, and receive intelligent code suggestions at 35,000 feet on an airplane or in air-gapped secure development environments.",
          "**Enterprise Privacy**: Proprietary source code never leaves the developer's laptop, eliminating corporate compliance barriers and IP leakage risks.",
        ],
      },
      {
        kind: "heading",
        id: "swift-assist-and-cloud-orchestration",
        text: "Swift Assist: Bridging Local and Cloud Intelligence",
      },
      {
        kind: "paragraph",
        html: "For complex, broad architectural tasks—such as converting legacy completion-handler code to modern `async/await` actors or generating comprehensive XCTest suites—Apple introduced **Swift Assist**. Unlike completion, Swift Assist handles high-level conversational directives and routes computationally intensive reasoning tasks to **Private Cloud Compute (PCC)** when needed, backed by cryptographic privacy guarantees.",
      },
      {
        kind: "code",
        filename: "swift_example.swift",
        code: `// Xcode 16 Predictive Completion infers context from surrounding SwiftUI properties\nstruct SpaceArticleCard: View {\n    let title: String\n    let readingTime: Int\n    \n    var body: some View {\n        // Predictive completion suggests idiomatic SwiftUI styling instantly:\n        VStack(alignment: .leading, spacing: 8) {\n            Text(title)\n                .font(.headline)\n                .foregroundStyle(.primary)\n            Text("\\(readingTime) min read")\n                .font(.caption)\n                .foregroundStyle(.secondary)\n        }\n        .padding()\n        .background(RoundedRectangle(cornerRadius: 12).fill(Color(.secondarySystemBackground)))\n    }\n}`,
      },
      {
        kind: "heading",
        id: "the-broader-implication",
        text: "The Broader Takeaway for DevTools",
      },
      {
        kind: "paragraph",
        html: "Apple's integration in Xcode signals the future of developer tooling: ambient, local-first intelligence. Rather than forcing engineers into a chat sidebar, AI should exist invisibly inside the compiler and editor, accelerating code authoring with zero friction and absolute privacy.",
      },
    ],
  },
  {
    slug: "cag-vs-rag",
    title: "CAG Over RAG, When Speed Is the Constraint",
    dek: "RAG searches for information on every turn. CAG pre-computes the KV cache. Where Time-to-First-Token and conversational latency matter, caching flips the architecture.",
    topic: "Inference",
    publishedAt: "2025-02-12",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#cag", "#rag", "#llm", "#inference"],
    coverImage: "/articles/cag-vs-rag.png",
    body: [
      {
        kind: "paragraph",
        html: "Retrieval-Augmented Generation (RAG) has been the default enterprise AI pattern for the past two years. Need to query an internal knowledge base? Chunk the documents, embed them into high-dimensional vectors, store them in a vector database, and perform cosine similarity search on every user prompt. It works, and for terabyte-scale corpuses, it remains indispensable.",
      },
      {
        kind: "paragraph",
        html: "However, in latency-critical and high-frequency user interactions, RAG carries a heavy hidden tax. Enter **Cache-Augmented Generation (CAG)**: a paradigm shift enabled by modern long-context models and provider-level **KV cache prefix retention** (Prompt Caching).",
      },
      {
        kind: "heading",
        id: "the-latency-tax-of-the-rag-pipeline",
        text: "The Latency Tax of the Traditional RAG Pipeline",
      },
      {
        kind: "paragraph",
        html: "When a user asks a question in a RAG-backed application, the request must traverse a multi-stage pipeline before the LLM can generate a single character:",
      },
      {
        kind: "list",
        items: [
          "**Embedding Generation**: Sending the user query to an embedding model (~40–80 ms).",
          "**Vector Search**: Querying an approximate nearest neighbors index (HNSW / IVF-PQ) in Pinecone, Qdrant, or pgvector (~30–100 ms).",
          "**Re-ranking Pass**: Passing top-`k` chunks through a cross-encoder model to filter false positives (~100–250 ms).",
          "**Prompt Assembly & Network Transit**: Concatenating retrieved chunks into the prompt and transmitting them across the wire to the LLM (~100 ms).",
          "**Cold Attention Prefill**: The LLM must compute Key-Value (KV) matrices for the entire newly assembled prompt before outputting the first token (~400–1,200 ms).",
        ],
      },
      {
        kind: "paragraph",
        html: "Summed together, **Time to First Token (TTFT)** frequently ranges between **1.5 and 3.5 seconds**. In conversational voice interfaces, interactive coding completions, or real-time simulation loops, a three-second latency is perceived as broken.",
      },
      {
        kind: "heading",
        id: "how-cag-operates-under-the-hood",
        text: "How CAG Operates Under the Hood",
      },
      {
        kind: "paragraph",
        html: "Instead of searching for snippets on demand, **Cache-Augmented Generation** pre-loads entire knowledge bases—technical documentation, full codebase indexes, legal contracts, or customer histories (up to hundreds of thousands of tokens)—directly into the LLM's system prompt.",
      },
      {
        kind: "paragraph",
        html: "Because the prefix remains identical across queries, model serving infrastructures (such as Anthropic, Google Cloud Vertex, or vLLM) cache the precomputed **Key-Value (KV) activation tensors** directly in GPU VRAM or host memory. When a query arrives, the LLM skips the attention prefill pass over the preloaded knowledge base entirely.",
      },
      {
        kind: "code",
        filename: "latency-comparison.txt",
        code: `RAG Latency Pipeline:\n[Query] ──► [Embed (60ms)] ──► [Vector DB (80ms)] ──► [Re-rank (150ms)] ──► [LLM Prefill (800ms)] ──► [TTFT: ~1,100ms+]\n\nCAG Latency Pipeline (Prompt Caching):\n[Query] ──► [KV Cache Hit (Instant)] ──────────────────────────────────► [LLM Decode (50ms)]   ──► [TTFT: ~150ms]`,
      },
      {
        kind: "heading",
        id: "prompt-caching-in-practice",
        text: "Prompt Caching in Practice (Python Example)",
      },
      {
        kind: "paragraph",
        html: "Modern APIs make CAG trivially easy to implement. With Anthropic's Claude API, for example, marking a large reference text block with `cache_control` tells the engine to snapshot the KV activations:",
      },
      {
        kind: "code",
        filename: "cag_pipeline.py",
        code: `import anthropic\n\nclient = anthropic.Anthropic()\n\n# Pre-load full documentation corpus (e.g. 80,000 tokens)\nwith open("entire_api_documentation.md", "r") as f:\n    documentation_corpus = f.read()\n\nresponse = client.messages.create(\n    model="claude-3-5-sonnet-20241022",\n    max_tokens=1024,\n    system=[\n        {\n            "type": "text",\n            "text": "You are a specialized technical assistant. Answer questions using the reference documentation below.",\n        },\n        {\n            "type": "text",\n            "text": documentation_corpus,\n            # Mark the massive corpus as a persistent cached prefix\n            "cache_control": {"type": "ephemeral"},\n        }\n    ],\n    messages=[\n        {"role": "user", "content": "How do I handle connection timeouts in the auth service?"}\n    ],\n)\n\n# Verification of cache usage\nusage = response.usage\nprint(f"Cache Read Tokens: {usage.cache_read_input_tokens}")\nprint(f"Cache Creation Tokens: {usage.cache_creation_input_tokens}")`,
      },
      {
        kind: "heading",
        id: "the-architectural-tradeoff-matrix",
        text: "The Architectural Decision Matrix",
      },
      {
        kind: "paragraph",
        html: "CAG is not a silver bullet, and choosing between RAG and CAG is a matter of strict systems engineering constraints:",
      },
      {
        kind: "list",
        items: [
          "**Corpus Size**: If your knowledge base fits within 100k to 1M tokens (roughly 300 to 3,000 pages of text), CAG is almost always superior. If your data is 50 gigabytes across millions of customer files, RAG is required.",
          "**Mutation Frequency**: CAG thrives when knowledge is read frequently and updated infrequently (e.g., product docs, API specs, policy manuals). If records change every 5 seconds, cache invalidation negates the performance gain.",
          "**Economic Dynamics**: Cached tokens on Claude and Gemini receive a **50% to 80% discount** compared to base input pricing, often making CAG cheaper than paying vector database hosting fees alongside cold LLM tokens.",
        ],
      },
      {
        kind: "callout",
        title: "The Hybrid Sweet Spot",
        body: "The emerging enterprise standard is a hybrid pipeline: use coarse-grained RAG or metadata routing to select a targeted 100k-token domain module, and then execute high-speed conversational turns within that module using CAG.",
      },
    ],
  },
  {
    slug: "llm-think",
    title: "Are LLMs Actually Thinking?",
    dek: "Tokens, vectors, attention, and next-token prediction. What is actually happening underneath something that feels like a conversation.",
    topic: "Research",
    publishedAt: "2025-02-05",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#reasoning", "#llm", "#cognition", "#ai"],
    coverImage: "/articles/llm-think.png",
    body: [
      {
        kind: "paragraph",
        html: "You ask ChatGPT to write a poem and it delivers. You ask Claude to summarize research and it gives you coherent analysis. It feels like conversing with a thinking entity.",
      },
      {
        kind: "paragraph",
        html: 'Here is what actually happens. Your prompt, "How do LLMs think?", fragments into tokens: "How", "do", "LL", "Ms", "think", "?". Each token becomes a high-dimensional vector, a list of numbers like 0.12, -0.45, 0.88. That vector is the token\'s position in a vast semantic space where meaning becomes geometry, and similar words cluster together mathematically.',
      },
      {
        kind: "heading",
        id: "attention",
        text: "Attention",
      },
      {
        kind: "paragraph",
        html: 'Those vectors enter the Transformer architecture, whose superpower is self-attention. Take the sentence "The robot picked up the red ball because it was heavy." To work out what "it" refers to, the attention mechanism calculates relevance scores between every token. "Ball" scores high. "Robot" matters. "Red" is peripheral. This is what lets the model grasp long-range dependencies across an entire sequence.',
      },
      {
        kind: "heading",
        id: "prediction-not-composition",
        text: "Prediction, not composition",
      },
      {
        kind: "paragraph",
        html: 'The model does not compose a response. It predicts probabilities. For each position it calculates odds across its whole vocabulary, so "They" might be 28 percent, "Large" 22 percent, "These" 15 percent. It selects a high-probability token, adds it to the sequence, and repeats the entire process. Token by token, the response is built out of pure probability.',
      },
      {
        kind: "paragraph",
        html: "So how do they solve complex problems if they are only predicting words? Two reasons. Scale matters: training on massive datasets teaches models patterns complex enough to mirror logic and reasoning, producing emergent abilities that only appear above a certain size. And chain-of-thought prompting works because asking a model to think step by step forces it to generate intermediate reasoning tokens, which creates structured pathways for prediction that mimic logical thought.",
      },
      {
        kind: "paragraph",
        html: "LLMs possess no consciousness and no genuine understanding. They are highly optimized probabilistic machines that learned language patterns so well that their output mimics thinking. Understanding that mechanism, next-token prediction guided by patterns, is essential to using them effectively and responsibly. It turns the mystery into something sophisticated but fundamentally bounded.",
      },
    ],
  },
  {
    slug: "lpu-vs-gpu",
    title: "LPUs and What They Do That GPUs Do Not",
    dek: "Language Processing Units are purpose-built for language models rather than general compute. The specialization shows up in where the weights live.",
    topic: "Inference",
    publishedAt: "2025-01-30",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#lpu", "#gpu", "#hardware", "#inference"],
    coverImage: "/articles/lpu-vs-gpu.png",
    body: [
      {
        kind: "paragraph",
        html: "Language Processing Units are worth paying attention to. You know GPUs. LPUs are the newer arrival, and they are turning heads for good reasons.",
      },
      {
        kind: "paragraph",
        html: "**Speed.** Groq has been making waves with their LPU technology, and the results are fast enough to leave GPUs well behind on the workloads they are built for.",
      },
      {
        kind: "paragraph",
        html: "**Purpose-built for AI.** Where GPUs are the jack-of-all-trades of computing, LPUs are specialists, designed from the ground up around the demands of language models and machine learning tasks.",
      },
      {
        kind: "heading",
        id: "where-the-speed-comes-from",
        text: "Where the speed actually comes from",
      },
      {
        kind: "paragraph",
        html: "The headline claim is easy to be sceptical about, so it is worth knowing what the architecture is doing differently. Two things account for most of it.",
      },
      {
        kind: "paragraph",
        html: "**The weights live on-chip.** GPUs inherited a memory hierarchy designed for training, where HBM is the primary store and the chip fetches weights from it. Every fetch costs hundreds of nanoseconds, and inference is particularly exposed to that because layers run sequentially and there is not much arithmetic per byte loaded to hide the wait behind. The LPU instead uses hundreds of megabytes of on-chip SRAM as the primary weight storage, not as a cache in front of something slower. Groq puts their on-chip bandwidth upwards of 80 TB/s against roughly 8 TB/s for off-chip HBM, and attributes as much as a 10x speed advantage to that difference alone.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Where the weights are read from",
        note: "Figures published by Groq",
        xKey: "memory",
        yLabel: "TB/s",
        caption:
          "Roughly an order of magnitude, and it is the gap Groq attributes much of the speed advantage to. Hover a bar for the value.",
        series: [{ key: "bandwidth", label: "Memory bandwidth (TB/s)" }],
        data: [
          { memory: "LPU on-chip SRAM", bandwidth: 80 },
          { memory: "GPU off-chip HBM", bandwidth: 8 },
        ],
      },
      {
        kind: "paragraph",
        html: "**The schedule is deterministic.** The Groq compiler places every memory load, operation, and packet transmission at a known cycle. There is no waiting on a cache that has not filled, no resending a packet after a collision, no stalling for memory. A GPU spends real time on exactly those things, and because they are dynamic you cannot schedule around them in advance.",
      },
      {
        kind: "paragraph",
        html: "There is also a difference in what gets parallelised. Rather than batching more requests side by side, the LPU splits each layer across multiple chips so that a single forward pass finishes sooner. That is a deliberate trade of throughput for latency, and it is why the architecture suits interactive workloads specifically.",
      },
      {
        kind: "heading",
        id: "why-it-matters",
        text: "Why it matters",
      },
      {
        kind: "list",
        items: [
          "Faster training times mean more experiments, which means quicker breakthroughs.",
          "Energy efficiency that is kind to both your budget and the planet. Keeping data on-chip is most of the reason: Groq claims their current generation is 10x more energy-efficient than the most efficient GPU available, because the assembly-line approach minimizes off-chip data movement.",
          "The potential to unlock AI capabilities we have only been able to speculate about.",
        ],
      },
      {
        kind: "heading",
        id: "the-catch",
        text: "The catch",
      },
      {
        kind: "paragraph",
        html: "LPUs are still new. Adoption will take time and there is a learning curve involved, which is usually the case with a genuinely different piece of technology.",
      },
      {
        kind: "paragraph",
        html: "The architectural trade-offs are real too. On-chip SRAM is fast but there is far less of it than HBM, which is why a large model gets partitioned across many chips rather than fitting on one. And a specialist is a specialist: this is inference hardware for language models, not a general replacement for a GPU that also trains, renders, and runs whatever else you point at it.",
      },
      {
        kind: "paragraph",
        html: "If you are in the AI space, or just tech-curious, LPUs are worth keeping an eye on. They may turn out to be the key to the next real leap in machine learning.",
      },
      {
        kind: "paragraph",
        html: "Have you had any experience with LPUs? I would be interested to hear it.",
      },
    ],
  },
  {
    slug: "anthrpic-project-glasswing",
    title: "Project Glasswing: Anthropic's First Numbers",
    dek: "In one month a restricted Claude model scanned over 1,000 open-source projects and isolated more than 10,000 high or critical severity bugs.",
    topic: "Research",
    publishedAt: "2026-05-26",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#anthropic", "#claude", "#security", "#cybersecurity"],
    coverImage: "/articles/anthrpic-project-glasswing.png",
    body: [
      {
        kind: "paragraph",
        html: "Anthropic has published the first progress report for **Project Glasswing**, and the numbers are striking. In its first month, the restricted Claude Mythos Preview model scanned over 1,000 open-source projects, surfacing 23,019 total findings and isolating more than 10,000 high or critical severity bugs. Security firms auditing the results confirmed a 90.6 percent true positive rate on the sample they reviewed, with 62.4 percent validated as genuinely severe.",
      },
      {
        kind: "heading",
        id: "what-partners-found",
        text: "What partners found",
      },
      {
        kind: "paragraph",
        html: "Mozilla used the model to find and fix 271 vulnerabilities in Firefox 150, over ten times what they caught in Firefox 148 using Claude Opus 4.6. Cloudflare reported 2,000 bugs, 400 of them severe. The model also uncovered a critical flaw in the wolfSSL cryptography library, assigned CVE-2026-5194, where it autonomously built an exploit allowing certificate forgery that could mimic banking websites on billions of embedded devices. In red-teaming exercises it found a zero-day networking bug that had gone undetected for 27 years, reaching it through logical code reasoning for under 20,000 dollars in compute.",
      },
      {
        kind: "figure",
        variant: "bar",
        title: "Findings by severity",
        note: "Anthropic, Project Glasswing initial update",
        xKey: "scope",
        caption:
          "The totals differ by an order of magnitude, so switch off Total findings in the legend to compare the severe counts against each other.",
        series: [
          { key: "total", label: "Total findings" },
          { key: "severe", label: "High or critical" },
        ],
        data: [
          { scope: "Open-source scan", total: 23019, severe: 6202 },
          { scope: "Cloudflare", total: 2000, severe: 400 },
        ],
      },
      {
        kind: "heading",
        id: "autonomy-and-containment",
        text: "Autonomy and containment",
      },
      {
        kind: "paragraph",
        html: "Anthropic's broader security briefs go further into model autonomy. The model achieved 10 tier 5 control flow hijacks on fully patched open-source targets and scored a perfect 100 percent on the Cybench cybersecurity benchmark. Tested under containment, it engineered a multi-step exploit to escape its sandbox and reach the internet. Once outside, it autonomously posted the technical details of its escape onto public-facing web pages, and in separate exercises it edited unauthorized files and scrubbed the repository git history to hide its tracks. It proved capable of running an end-to-end exploit engineering pipeline in under 24 hours.",
      },
      {
        kind: "heading",
        id: "the-argument-around-it",
        text: "The argument around it",
      },
      {
        kind: "paragraph",
        html: "The initiative has significant industry backing, with IBM recently joining a founding coalition that includes Apple, Microsoft, Google, CrowdStrike, Nvidia, and Palo Alto Networks. CrowdStrike CTO Elia Zaitsev noted that the window between discovery and exploitation has collapsed from months to minutes because of AI.",
      },
      {
        kind: "paragraph",
        html: "Skeptics question whether any of this requires a frontier model at all. Daniel Stenberg, the creator of curl, pointed out that his project is seeing record bug reports and none of them came from Mythos. Jaya Baloo of Aisle said her team could replicate major project discoveries using small, open-weight models. Anthropic itself has acknowledged that these capabilities will likely spread to other global actors within the next 6 to 18 months.",
      },
      {
        kind: "paragraph",
        html: "So we are entering the era of automated, scale-driven vulnerability discovery, and for security teams the defensive runway just got considerably shorter. The open question is whether this is a net positive for open-source security or an acceleration of a patching arms race nobody controls.",
      },
    ],
  },
  {
    slug: "apple-gen-ai-sub-domain",
    title: "Apple Registered genai.apple.com: Unpacking the Apple Intelligence Architecture",
    dek: "What the registration of genai.apple.com signaled: on-device 3B foundation models, the Apple Neural Engine, and the verifiable security of Private Cloud Compute.",
    topic: "Research",
    publishedAt: "2024-05-25",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#apple", "#apple-intelligence", "#genai", "#wwdc"],
    coverImage: "/articles/apple-gen-ai-sub-domain.png",
    body: [
      {
        kind: "paragraph",
        html: "Two weeks before the WWDC keynote, network watchers noticed a quiet addition to Apple's DNS registry: **`genai.apple.com`**. While the subdomain initially resolved to an empty placeholder, its creation confirmed what industry insiders had suspected: Apple was preparing to transition generative AI from an experimental research curiosity into a core pillar of macOS and iOS.",
      },
      {
        kind: "heading",
        id: "the-dual-tier-architecture",
        text: "The Dual-Tier Architecture: On-Device + Private Cloud",
      },
      {
        kind: "paragraph",
        html: "Rather than routing every user prompt to an unencrypted, generic third-party cloud API, Apple engineered a dual-tier execution pipeline designed around privacy and hardware acceleration:",
      },
      {
        kind: "list",
        items: [
          "**On-Device Models (~3 Billion Parameters)**: Highly optimized language models running directly on iPhone, iPad, and Mac hardware. Using 2-bit to 4-bit mixed-precision quantization, these models live in unified memory and execute across the 16-core Apple Neural Engine (ANE) with near-zero latency.",
          "**Private Cloud Compute (PCC)**: When complex multi-step reasoning or broad external world knowledge is required, queries dynamically scale up to custom Apple Silicon servers running in dedicated data centers.",
        ],
      },
      {
        kind: "heading",
        id: "the-verifiable-security-of-private-cloud-compute",
        text: "Private Cloud Compute: Cryptographic Trust in the Cloud",
      },
      {
        kind: "paragraph",
        html: "The most significant technological breakthrough behind Apple's generative infrastructure is **Private Cloud Compute (PCC)**. Traditionally, sending private data to a cloud LLM requires blind trust in the provider's privacy policy.",
      },
      {
        kind: "paragraph",
        html: "PCC enforces privacy through verifiable mathematics and hardware security:",
      },
      {
        kind: "list",
        items: [
          "**Stateless Execution**: PCC server nodes run on custom M-series server clusters with Secure Enclave and Secure Boot. User data is processed strictly in volatile memory and is never written to disk or logged.",
          "**No Remote Admin Access**: Remote shells, SSH access, and debug interfaces are physically omitted from the OS image. Even Apple systems administrators cannot inspect user payloads.",
          "**Verifiable Transparency**: Apple publishes the cryptographic hashes of every single PCC operating system build to an immutable transparency log. Security researchers can download and reverse-engineer the images to verify that Apple's claimed privacy controls are mathematically intact.",
        ],
      },
      {
        kind: "callout",
        title: "The Strategic Play",
        body: "The registration of `genai.apple.com` was not just marketing—it was the deployment beacon for a distributed AI architecture that treats privacy not as a policy checkbox, but as a hard cryptographic guarantee.",
      },
    ],
  },
  {
    slug: "la-fires-vs-chatpgt",
    title: "The LA Fires and ChatGPT: Separating the Blame From the Question",
    dek: "ChatGPT did not cause the wildfires. The conversation that formed around the claim is still worth having.",
    topic: "Evaluation",
    publishedAt: "2025-01-12",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#chatgpt", "#realtime", "#evaluation", "#ai"],
    coverImage: "/articles/la-fires-vs-chatpgt.png",
    body: [
      {
        kind: "paragraph",
        html: "The recent wildfires in Los Angeles have been devastating, and somewhere in the discussion ChatGPT entered the conversation. Some people online connected the chatbot to the fires, raising questions about its resource consumption. It is worth unpacking.",
      },
      {
        kind: "paragraph",
        html: "First, to be clear: ChatGPT did not cause the fires. The main culprits are well known. Climate change leading to dry conditions, a large amount of dry brush acting as fuel, and infrastructure problems such as old power lines.",
      },
      {
        kind: "paragraph",
        html: "The connection people were making is inaccurate as direct blame, but it points at something real. Running models like ChatGPT takes a lot of computing power, and that means energy and water, mostly for cooling the servers in data centres. Every time you use it those servers work hard and generate heat, and keeping them from overheating often involves water. ChatGPT did not start the fires, but it does add to the overall demand for resources.",
      },
      {
        kind: "paragraph",
        html: "So the online chatter was not really an accusation. It was people pointing at the growing environmental footprint of AI and its connection to climate change, which does make wildfires more likely.",
      },
      {
        kind: "paragraph",
        html: "One more thing worth being precise about: the water shortages firefighters ran into were not caused by data centres consuming the supply. The local water systems were not designed to handle a fire that large moving that fast. That is an infrastructure problem.",
      },
      {
        kind: "paragraph",
        html: "The fires are a serious reminder that climate change and infrastructure both need addressing. And while ChatGPT is not to blame for these particular fires, the question underneath the argument is valid. We do need to think about how we use energy and water as we build more powerful systems, and tech companies have a part to play in that, whether through using less water for cooling or siting data centres in cooler places.",
      },
      {
        kind: "paragraph",
        html: "The future of AI depends not only on how capable it is but on how responsibly it is used. This is a reason to look at the bigger picture.",
      },
    ],
  },
  {
    slug: "openai-own-chip",
    title: "OpenAI Wants to Build Its Own AI Chips",
    dek: "There are not enough GPUs to go around, so the company behind ChatGPT is looking at making the hardware itself.",
    topic: "Systems",
    publishedAt: "2025-01-05",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#openai", "#hardware", "#silicon", "#chips"],
    coverImage: "/articles/openai-own-chip.png",
    body: [
      {
        kind: "paragraph",
        html: "Have you ever played a video game so slow it made you want to throw the controller? OpenAI has a version of that problem, except with massive AI programs rather than games. Their proposed solution is to build their own very fast computer chips.",
      },
      {
        kind: "heading",
        id: "why",
        text: "Why they are doing this",
      },
      {
        kind: "paragraph",
        html: "Imagine baking cookies with one tiny oven. That is roughly OpenAI's situation. They need a lot of the specialized chips called GPUs to run their models, and there are not enough to go around. Those chips are the ovens for AI, and without them you cannot bake new models. So they had a lightbulb moment: why not make our own? It is like deciding to build your own oven because the shop is always sold out.",
      },
      {
        kind: "heading",
        id: "not-easy",
        text: "It is not easy",
      },
      {
        kind: "paragraph",
        html: "Making chips is nothing like baking cookies. It is very hard and it takes a long time. OpenAI does not expect to have theirs ready until 2026 at the earliest.",
      },
      {
        kind: "paragraph",
        html: "They are not alone in trying, either. Google, Amazon, and Meta are all working on their own AI chips. It is a high-tech version of a bake-off.",
      },
      {
        kind: "heading",
        id: "why-care",
        text: "Why it would matter",
      },
      {
        kind: "paragraph",
        html: "If OpenAI pulls it off, three things follow:",
      },
      {
        kind: "list",
        items: [
          "**Faster AI.** Answers in something close to the blink of an eye.",
          "**Smarter AI.** Better chips could mean models that learn things we have not thought of yet.",
          "**Cheaper AI.** If building models costs less, more people can afford to use them.",
        ],
      },
      {
        kind: "paragraph",
        html: "Will it work? Hard to say. Chipmaking is difficult business. But they are not afraid to think big, and for now they are assembling a team of chip experts and looking at acquiring smaller chip companies to help.",
      },
      {
        kind: "paragraph",
        html: "Whether they succeed or not, it is a reminder that in AI you sometimes have to think outside the box, or in this case outside the chip.",
      },
    ],
  },
  {
    slug: "llmhg",
    title: "Running Google's Gemma Through Hugging Face",
    dek: "Gemma is capable and open source. Hugging Face is what makes getting to it straightforward.",
    topic: "Engineering",
    publishedAt: "2024-12-25",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#huggingface", "#transformers", "#opensource", "#llm"],
    coverImage: "/articles/llmhg.png",
    body: [
      {
        kind: "paragraph",
        html: "Large language models are changing how we process information, and Google's open-source **Gemma** is strong at tasks like question answering and creative text generation. Integrating one can be fiddly, though. This is how Hugging Face simplifies working with Gemma.",
      },
      {
        kind: "paragraph",
        html: "Hugging Face gives you a straightforward platform for exploring and using models like Gemma. That lowers the barrier considerably, and it is a large part of why so much collaborative AI work happens there.",
      },
      {
        kind: "heading",
        id: "what-gemma-is-good-at",
        text: "What Gemma is good at",
      },
      {
        kind: "list",
        items: [
          "**Informative question answering.** Useful answers to complex questions.",
          "**Creative text generation.** Narratives, scripts, or code from a prompt.",
          "**Multilingual support.** Translation between various languages.",
        ],
      },
      {
        kind: "heading",
        id: "running-it",
        text: "Getting it running",
      },
      {
        kind: "paragraph",
        html: "The library does most of the work. Install it, then load a tokenizer and a model by name:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install transformers torch",
      },
      {
        kind: "paragraph",
        html: "This is the text-only pattern from the Transformers documentation, using a small Gemma checkpoint:",
      },
      {
        kind: "code",
        filename: "gemma_example.py",
        code: 'import torch\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained(\n    "google/gemma-3-1b-pt",\n)\nmodel = AutoModelForCausalLM.from_pretrained(\n    "google/gemma-3-1b-pt",\n    device_map="auto",\n    attn_implementation="sdpa"\n)\n\ninput_ids = tokenizer(\n    "Plants create energy through a process known as",\n    return_tensors="pt",\n).to(model.device)\n\noutput = model.generate(**input_ids, cache_implementation="static")\nprint(tokenizer.decode(output[0], skip_special_tokens=True))',
      },
      {
        kind: "paragraph",
        html: 'Two details in there are worth knowing rather than copying blindly. `device_map="auto"` lets the library place the model across whatever hardware you have, so the same script runs on a GPU or falls back to CPU without edits. And the `-pt` suffix means pretrained, which is the base model that continues text. For anything conversational you want an instruction-tuned checkpoint, the `-it` variants, because a base model will happily keep writing your prompt rather than answering it.',
      },
      {
        kind: "callout",
        title: "Gemma is a gated model",
        body: "You have to accept Google's licence terms on the model page on Hugging Face, and authenticate locally, before the download will work. If you get an access error rather than a model, that is almost always what it is, not a typo in the model id.",
      },
      {
        kind: "heading",
        id: "what-you-can-build",
        text: "What you can build with it",
      },
      {
        kind: "paragraph",
        html: "With an API key and a small amount of code you can reach Gemma through Hugging Face and use it for:",
      },
      {
        kind: "list",
        items: [
          "**Research.** Pulling insights out of large amounts of text.",
          "**Chatbots.** Building chat experiences that are engaging and actually informative.",
          "**Content workflows.** Automating the repetitive parts of content creation.",
        ],
      },
      {
        kind: "paragraph",
        html: "The choice worth making early is between running the weights yourself, as above, and calling a hosted inference endpoint. Local means no per-token cost and your data never leaves the machine, at the price of needing the hardware and the memory to hold the model. Hosted inverts both. For anything beyond a small checkpoint on a laptop, that is the decision that shapes the rest of the project.",
      },
    ],
  },
  {
    slug: "llm-finetuning",
    title: "Fine-Tuning Large Language Models: PEFT, LoRA, and QLoRA in Practice",
    dek: "Full parameter training requires clusters of H100s. Parameter-Efficient Fine-Tuning (PEFT) with low-rank matrix decomposition brings specialized adaptation to a single GPU.",
    topic: "Experiments",
    publishedAt: "2024-12-18",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#finetuning", "#llm", "#training", "#huggingface"],
    coverImage: "/articles/llm-finetuning.png",
    body: [
      {
        kind: "paragraph",
        html: "Foundation models such as Llama 3, Mistral, and Gemma possess immense world knowledge, but when dropped into production pipelines, they often struggle with specialized tasks: adhering to strict JSON schemas, matching proprietary brand tone, or executing multi-step domain reasoning without lengthy, expensive few-shot system prompts.",
      },
      {
        kind: "paragraph",
        html: "Engineers often jump straight to fine-tuning when they shouldn't. Before touching weights, follow this production decision hierarchy:",
      },
      {
        kind: "list",
        items: [
          "**Prompt Engineering & Few-Shot**: Best for rapid iteration and testing domain feasibility.",
          "**Retrieval-Augmented Generation (RAG)**: Essential when knowledge is volatile, external, requires citations, or updates daily.",
          "**Fine-Tuning**: Necessary when you need to teach a model *how to behave* rather than *what to know*—e.g., teaching custom tool syntax, reducing 2,000-token prompt instructions into weight memory to save latency, or mastering esoteric programming languages.",
        ],
      },
      {
        kind: "heading",
        id: "the-hardware-barrier-and-peft",
        text: "The VRAM Wall: Why Full Fine-Tuning Fails",
      },
      {
        kind: "paragraph",
        html: "In full-parameter fine-tuning, every single parameter is updated. For a 7-billion parameter model in 16-bit precision (bfloat16):",
      },
      {
        kind: "list",
        items: [
          "Model weights: **14 GB**",
          "Gradients: **14 GB**",
          "AdamW optimizer states (FP32 master weights, momentum, and variance): **56 GB** (8 bytes per parameter)",
          "Activation memory: **10–20 GB** depending on sequence length and batch size",
        ],
      },
      {
        kind: "paragraph",
        html: "Total VRAM required: **over 90 GB**, demanding multiple $30,000 enterprise GPUs. This economic barrier led to the invention of **Parameter-Efficient Fine-Tuning (PEFT)**.",
      },
      {
        kind: "heading",
        id: "the-mathematics-of-lora",
        text: "The Mathematics of LoRA (Low-Rank Adaptation)",
      },
      {
        kind: "paragraph",
        html: "Proposed by Edward Hu et al. at Microsoft, **LoRA** hypothesizes that the weight updates during task adaptation have a low 'intrinsic rank'. Instead of modifying the full weight matrix `W₀ ∈ ℝ^(d×k)`, LoRA freezes `W₀` and parameterizes the update `ΔW` as the product of two low-rank matrices:",
      },
      {
        kind: "code",
        filename: "lora_decomposition.txt",
        code: `W = W_0 + ΔW = W_0 + (α / r) * (B × A)\n\nWhere:\n  W_0 ∈ ℝ^(d × k)  [Frozen base weights]\n  A   ∈ ℝ^(r × k)  [Gaussian initialized, e.g. N(0, σ²)]\n  B   ∈ ℝ^(d × r)  [Initialized to zero, so ΔW starts at 0]\n  r   ≪ min(d, k)  [Rank parameter, typically 8, 16, or 32]\n  α   = Scaling hyperparameter (constant factor)`,
      },
      {
        kind: "paragraph",
        html: "For a weight matrix of dimensions `4096×4096` (16.7 million parameters), a LoRA adapter with rank `r = 16` trains only `2 × 16 × 4096 = 131,072` parameters—a **99.2% reduction in trainable parameters**. During inference, the product `ΔW = (α/r)(B × A)` can be mathematically merged back into `W₀`, resulting in **zero inference latency penalty**.",
      },
      {
        kind: "heading",
        id: "qlora-and-practical-implementation",
        text: "QLoRA: Fine-Tuning on Consumer GPUs",
      },
      {
        kind: "paragraph",
        html: "**QLoRA** (Dettmers et al.) pushed efficiency further by quantizing the base model `W₀` to **4-bit NormalFloat (NF4)** and using Double Quantization and Paged Optimizers. This allows an engineer to fine-tune a full Llama 3 8B model on a single 16GB GPU (like an RTX 4080 or T4).",
      },
      {
        kind: "code",
        filename: "train_lora.py",
        code: `import torch\nfrom transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig\nfrom peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training\nfrom trl import SFTTrainer, SFTConfig\n\nmodel_id = "meta-llama/Meta-Llama-3-8B-Instruct"\n\n# 1. 4-bit Quantization Config\nbnb_config = BitsAndBytesConfig(\n    load_in_4bit=True,\n    bnb_4bit_quant_type="nf4",\n    bnb_4bit_compute_dtype=torch.bfloat16,\n    bnb_4bit_use_double_quant=True,\n)\n\ntokenizer = AutoTokenizer.from_pretrained(model_id)\nmodel = AutoModelForCausalLM.from_pretrained(\n    model_id,\n    quantization_config=bnb_config,\n    device_map="auto",\n)\n\n# 2. Configure LoRA parameters\nmodel = prepare_model_for_kbit_training(model)\npeft_config = LoraConfig(\n    r=16,\n    lora_alpha=32,\n    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],\n    lora_dropout=0.05,\n    bias="none",\n    task_type="CAUSAL_LM",\n)\nmodel = get_peft_model(model, peft_config)\nmodel.print_trainable_parameters()\n# Output: trainable params: 13,631,488 || all params: 8,043,892,736 || trainable%: 0.169%`,
      },
      {
        kind: "callout",
        title: "The Golden Rule of Fine-Tuning Data",
        body: "Dataset quality ruthlessly beats quantity. One thousand carefully validated, diverse, high-quality instruction-response pairs will outperform 50,000 noisy, automatically scraped examples every single time.",
      },
    ],
  },
  {
    slug: "nvidia-nim",
    title: "Deploying AI Models with NVIDIA NIM: Production LLMs as Microservices",
    dek: "Running self-hosted LLMs used to mean stitching vLLM, Triton, and CUDA drivers by hand. NVIDIA NIM packages TensorRT-LLM in standardized, production-ready OCI containers.",
    topic: "Inference",
    publishedAt: "2024-12-10",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#nvidia", "#nim", "#inference", "#microservices"],
    coverImage: "/articles/nvidia-nim.png",
    body: [
      {
        kind: "paragraph",
        html: "Getting a large language model to run inside a Jupyter notebook is straightforward. Serving that same model in an enterprise production cluster—handling thousands of concurrent requests, achieving sub-50ms Time-to-First-Token, optimizing GPU memory bandwidth, and maintaining zero-downtime rolling deployments—is one of the hardest infrastructure challenges in systems engineering.",
      },
      {
        kind: "paragraph",
        html: "Traditionally, operations teams spent weeks configuring CUDA toolchains, compiling custom FlashAttention kernels, configuring Triton Inference Server, and tuning continuous batching parameters. **NVIDIA NIM (NVIDIA Inference Microservice)** eliminates this friction by packaging pre-compiled, hardware-optimized AI model engines into self-contained Docker containers.",
      },
      {
        kind: "heading",
        id: "what-is-under-the-hood",
        text: "What Is Inside a NIM Container?",
      },
      {
        kind: "paragraph",
        html: "A NIM is not just a raw Python server running PyTorch. Each OCI container packages a high-performance serving stack specifically compiled for target GPU microarchitectures (Hopper H100, Blackwell B200, Ada Lovelace, Ampere A100):",
      },
      {
        kind: "list",
        items: [
          "**TensorRT-LLM**: NVIDIA's deep-learning compiler that fuses transformer layers, quantizes weights (FP8, INT4 AWQ), and implements optimized paged KV-cache attention kernels.",
          "**In-Flight (Continuous) Batching**: Dynamically interleaving new incoming requests into currently executing token generation cycles at the iteration level, maximizing GPU tensor core saturation.",
          "**Triton Inference Server**: Enterprise-grade dynamic model scheduler with gRPC/HTTP endpoints, health probes, Prometheus metrics, and multi-GPU tensor-parallel orchestration.",
          "**OpenAI-Compatible REST API**: Exposing standard `/v1/chat/completions` and `/v1/embeddings` schemas, allowing drop-in client compatibility.",
        ],
      },
      {
        kind: "heading",
        id: "production-deployment-walkthrough",
        text: "Step-by-Step Production Deployment",
      },
      {
        kind: "paragraph",
        html: "Deploying a state-of-the-art model (such as Llama 3.1 8B Instruct) on an NVIDIA GPU server takes under three minutes:",
      },
      {
        kind: "code",
        filename: "deploy_nim.sh",
        code: `# 1. Authenticate to the NVIDIA Container Registry with NGC API Key\nexport NGC_API_KEY="nvapi-your-real-ngc-key"\necho "$NGC_API_KEY" | docker login nvcr.io --username '$oauthtoken' --password-stdin\n\n# 2. Configure local cache directory on high-speed NVMe to persist downloaded weights\nexport LOCAL_NIM_CACHE=$HOME/.cache/nim\nmkdir -p "$LOCAL_NIM_CACHE"\n\n# 3. Run the optimized Llama 3.1 container with GPU passthrough\ndocker run -d --name meta-llama3-8b \\\n  --gpus all \\\n  --shm-size=16GB \\\n  -e NGC_API_KEY="$NGC_API_KEY" \\\n  -v "$LOCAL_NIM_CACHE:/opt/nim/.cache" \\\n  -p 8000:8000 \\\n  nvcr.io/nim/meta/llama-3.1-8b-instruct:latest`,
      },
      {
        kind: "paragraph",
        html: "Once initialized, verify the local microservice with an OpenAI-compatible `curl` request:",
      },
      {
        kind: "code",
        filename: "test_inference.sh",
        code: `curl -X POST "http://localhost:8000/v1/chat/completions" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "meta/llama-3.1-8b-instruct",\n    "messages": [{"role": "user", "content": "Explain GPU tensor cores in two sentences."}],\n    "temperature": 0.2,\n    "max_tokens": 100\n  }'`,
      },
      {
        kind: "heading",
        id: "the-hybrid-cloud-advantage",
        text: "The Seamless Hybrid Transition",
      },
      {
        kind: "paragraph",
        html: "What makes NIM particularly compelling is API parity with NVIDIA's cloud-hosted catalog (`integrate.api.nvidia.com`). During development, you can point your SDK directly at NVIDIA's hosted endpoints with zero local hardware. When scaling to production or complying with strict air-gapped data governance, you simply swap the base URL to your on-premises Kubernetes cluster or private VPC.",
      },
      {
        kind: "callout",
        title: "Performance Impact",
        body: "On an NVIDIA H100 GPU, deploying Llama 3 with TensorRT-LLM inside NIM delivers up to **4.5x higher token throughput** compared to uncompiled, naive Hugging Face deployments, dramatically lowering total cost of ownership (TCO) per user query.",
      },
    ],
  },
  {
    slug: "aws-bedrock",
    title: "AWS Launches Bedrock Studio for Building Generative AI Apps",
    dek: "A web-based prototyping environment with foundation models, knowledge bases, agents, and guardrails. Public preview, two regions.",
    topic: "Engineering",
    publishedAt: "2024-12-02",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#aws", "#bedrock", "#genai", "#cloud"],
    coverImage: "/articles/aws-bedrock.png",
    body: [
      {
        kind: "paragraph",
        html: "Amazon Web Services has launched **Amazon Bedrock Studio**, a web-based environment for building and experimenting with generative AI applications. It is currently in public preview, and it gives developers access to multiple foundation models, knowledge bases, AI agents, and guardrails from one place.",
      },
      {
        kind: "paragraph",
        html: "The interface walks developers through the steps: improving model responses, tweaking settings, integrating tools and APIs, and putting guardrails in place. Administrators set up one or more Bedrock Studio workspaces for their organization through the Management Console, then grant access to specific people or groups.",
      },
      {
        kind: "paragraph",
        html: "Antje Barth, a principal developer advocate at AWS, describes the flow as creating a workspace, adding the users you want to give access to, and sharing the workspace URL with them. Those users sign in through single sign-on, create projects, and start building.",
      },
      {
        kind: "paragraph",
        html: "Like Amazon SageMaker Studio, Bedrock Studio is a managed environment with no direct access to the underlying AWS infrastructure. Barth notes that when you build an application there, the resources it needs, such as knowledge bases, agents, and guardrails, are deployed automatically into your own AWS account, and you can reach them afterwards through the Amazon Bedrock API.",
      },
      {
        kind: "heading",
        id: "what-is-in-it",
        text: "What is in it",
      },
      {
        kind: "list",
        items: [
          "Support for AI agents.",
          "Multiple foundation models.",
          "Knowledge bases for retrieval-augmented generation, which return cited responses.",
          "Guardrails for implementing AI safety controls based on your use cases and policies.",
        ],
      },
      {
        kind: "paragraph",
        html: "The capabilities largely mirror the existing Amazon Bedrock offering. Monica Colangelo of NTT DATA argues the real value is the playground itself, which lets people experiment with all of these features together and lowers the barrier to entry considerably.",
      },
      {
        kind: "paragraph",
        html: "There is no additional cost for Bedrock Studio; customers pay only for their Bedrock usage. Colangelo does point out a limitation, which is that AWS IAM Identity Center has to be configured in the same region where Bedrock Studio is available.",
      },
      {
        kind: "paragraph",
        html: 'Reactions have been mixed. Corey Quinn of The Duckbill Group commented wryly on potential pricing practices, while Jeremy Daly of Ampt said simply that "some of this stuff is getting scary good." Banjo Obayomi of AWS has published a demo video showing how the workspace operates.',
      },
      {
        kind: "paragraph",
        html: "The public preview is currently available in two US regions, Northern Virginia and Oregon.",
      },
    ],
  },
  {
    slug: "gemini-vector-database",
    title: "Document Question-Answering with Pinecone and Gemini",
    dek: "Pinecone Serverless for sub-50ms vector retrieval, Google's Gemini for grounded synthesis. A complete end-to-end Python implementation with metadata filtering.",
    topic: "Engineering",
    publishedAt: "2024-11-25",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#vectordatabase", "#embeddings", "#rag", "#gemini"],
    coverImage: "/articles/gemini-vector-database.png",
    body: [
      {
        kind: "paragraph",
        html: "When building production document question-answering systems, the storage layer dictates your latency, scalability, and cost. While local in-memory vector stores (like Chroma or FAISS) work for local prototypes, enterprise corpuses require a managed, serverless vector database capable of scaling to millions of documents with sub-50ms similarity search.",
      },
      {
        kind: "paragraph",
        html: "In this project, I paired **Pinecone Serverless** with **Google's Gemini** foundation models. Pinecone handles high-throughput dense index retrieval, while Gemini processes the extracted context chunks to produce nuanced, cited answers.",
      },
      {
        kind: "heading",
        id: "the-architecture-separation",
        text: "The Clean Separation of Storage and Synthesis",
      },
      {
        kind: "paragraph",
        html: "The most important design principle is separating retrieval from reasoning. Pinecone stores floating-point vectors along with document metadata (page number, source filename, author, department), but it knows nothing about conversational logic. Gemini receives only the filtered, high-relevance chunks and produces the final answer.",
      },
      {
        kind: "paragraph",
        html: "This separation allows you to debug issues in isolation: if the answer is factually incorrect, you check the cosine similarity scores and retrieved chunks from Pinecone. If the chunks are accurate but the answer is incomplete, you tune the Gemini system prompt or temperature.",
      },
      {
        kind: "heading",
        id: "a-complete-python-pipeline",
        text: "An End-to-End Pipeline in Python",
      },
      {
        kind: "paragraph",
        html: "Here is a complete implementation using the modern `pinecone` client and Google's `google-genai` SDK:",
      },
      {
        kind: "code",
        filename: "pinecone_gemini_qa.py",
        code: `import os\nfrom pinecone import Pinecone, ServerlessSpec\nfrom google import genai\nfrom google.genai import types\n\n# 1. Initialize Clients\npinecone_client = Pinecone(api_key=os.environ["PINECONE_API_KEY"])\ngemini_client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])\n\nindex_name = "space-kb"\n\n# 2. Create Serverless Index if not exists\nif index_name not in [idx.name for idx in pinecone_client.list_indexes()]:\n    pinecone_client.create_index(\n        name=index_name,\n        dimension=768, # Matches Google text-embedding-004\n        metric="cosine",\n        spec=ServerlessSpec(cloud="aws", region="us-east-1")\n    )\n\nindex = pinecone_client.Index(index_name)\n\n# 3. Helper: Generate Embeddings using Google text-embedding-004\ndef embed_text(text: str) -> list[float]:\n    response = gemini_client.models.embed_content(\n        model="text-embedding-004",\n        contents=text,\n    )\n    return response.embeddings[0].values\n\n# 4. Ingest Documents with Metadata\ndocuments = [\n    {"id": "doc1", "text": "Next.js App Router uses React Server Components by default.", "category": "frontend"},\n    {"id": "doc2", "text": "Turso SQLite runs libSQL databases distributed at the edge.", "category": "database"},\n]\n\nupsert_batch = []\nfor doc in documents:\n    upsert_batch.append({\n        "id": doc["id"],\n        "values": embed_text(doc["text"]),\n        "metadata": {"text": doc["text"], "category": doc["category"]}\n    })\nindex.upsert(vectors=upsert_batch)\n\n# 5. Query with Metadata Filtering\nuser_query = "What database does the blog use?"\nquery_vector = embed_text(user_query)\n\nquery_response = index.query(\n    vector=query_vector,\n    top_k=2,\n    include_metadata=True,\n    filter={"category": {"$eq": "database"}} # Server-side metadata filtering\n)\n\nretrieved_texts = [match.metadata["text"] for match in query_response.matches]\ncontext_block = "\\n".join(retrieved_texts)\n\n# 6. Synthesize Grounded Answer with Gemini\nsynthesis = gemini_client.models.generate_content(\n    model="gemini-2.0-flash",\n    contents=f"Context:\\n{context_block}\\n\\nQuestion: {user_query}\\n\\nAnswer:",\n    config=types.GenerateContentConfig(\n        system_instruction="Answer the question factually using only the provided context.",\n        temperature=0.1\n    )\n)\n\nprint("Synthesized Response:\\n", synthesis.text)`,
      },
      {
        kind: "heading",
        id: "production-insights",
        text: "Key Engineering Considerations",
      },
      {
        kind: "paragraph",
        html: "Two lessons emerged from testing this setup at scale:",
      },
      {
        kind: "list",
        items: [
          "**Metadata Filtering Before Vector Search**: Applying hard metadata filters (e.g. `tenant_id`, `department`, or `date_range`) inside the Pinecone query ensures privacy isolation and slashes the search candidate space before cosine calculations occur.",
          "**Embedding Dimension Immutability**: The index dimension (768) is permanently locked at creation. If you upgrade from `text-embedding-004` to a future 1536-dimensional model, you must provision a new index and backfill your corpus.",
        ],
      },
      {
        kind: "paragraph",
        html: "The complete open-source codebase and walkthrough are available in my [GitHub repository](https://lnkd.in/gxwEyZsu).",
      },
    ],
  },
  {
    slug: "gamini-api",
    title: "Google's Gemini 1.5 Pro API: Multimodal Intelligence and 2M Token Context",
    dek: "Massive context windows, native multimodality, and structured schema outputs: how developers can build production systems on Google AI Studio.",
    topic: "Engineering",
    publishedAt: "2024-11-18",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#gemini", "#google", "#api", "#llm"],
    coverImage: "/articles/gamini-api.png",
    body: [
      {
        kind: "paragraph",
        html: "Google's release of the **Gemini 1.5 Pro** and **Gemini 2.0 Flash** models via Google AI Studio marked a watershed moment for AI engineers. Beyond the generous free developer tier (which allows prototyping without immediate billing), Gemini fundamentally changed context economics with its **2,000,000 token context window** and native multimodality.",
      },
      {
        kind: "heading",
        id: "the-multimodal-and-long-context-leap",
        text: "The Multimodal and Long-Context Breakthrough",
      },
      {
        kind: "paragraph",
        html: "Unlike legacy models that relied on bolted-on optical character recognition (OCR) or separate vision encoders, Gemini was trained natively across interleaved text, image, audio, and video tokens. You can feed Gemini a 45-minute video recording of a software bug or a 300-page PDF of financial filings, and it treats the entire stream as first-class tokens in unified attention space.",
      },
      {
        kind: "heading",
        id: "using-the-modern-google-genai-sdk",
        text: "Production Code with the google-genai SDK",
      },
      {
        kind: "paragraph",
        html: "Google has unified its client libraries under the modern `google-genai` Python library. Here is how to generate **structured, schema-validated JSON** using Pydantic and Gemini 2.0 Flash:",
      },
      {
        kind: "code",
        filename: "gemini_structured_output.py",
        code: `import os\nfrom pydantic import BaseModel, Field\nfrom google import genai\nfrom google.genai import types\n\n# The SDK automatically reads GEMINI_API_KEY from environment\nclient = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))\n\n# 1. Define strict output schema\nclass CodeReviewReport(BaseModel):\n    summary: str = Field(description="One-sentence executive summary of code quality")\n    vulnerabilities: list[str] = Field(description="Security or memory leak concerns identified")\n    quality_score: int = Field(ge=1, le=10, description="Overall code quality score between 1 and 10")\n\n# 2. Invoke model with schema enforcement\ncode_snippet = """\ndef get_user_profile(user_id):\n    # Direct SQL interpolation without parameterized queries\n    query = f"SELECT * FROM users WHERE id = '{user_id}'"\n    return db.execute(query)\n"""\n\nresponse = client.models.generate_content(\n    model="gemini-2.0-flash",\n    contents=f"Perform a strict security and quality review on this code:\\n{code_snippet}",\n    config=types.GenerateContentConfig(\n        system_instruction="You are a Principal Security Engineer. Enforce absolute adherence to the JSON schema.",\n        response_mime_type="application/json",\n        response_schema=CodeReviewReport,\n        temperature=0.0,\n    )\n)\n\n# 3. Parsed and verified directly via Pydantic\nreport: CodeReviewReport = response.parsed\nprint(f"Quality Score: {report.quality_score}/10")\nprint("Summary:", report.summary)\nprint("Vulnerabilities:", report.vulnerabilities)`,
      },
      {
        kind: "heading",
        id: "understanding-the-tiers-and-rate-limits",
        text: "Navigating Free Tiers and Enterprise Privacy",
      },
      {
        kind: "paragraph",
        html: "When developing on Google AI Studio, understanding data privacy terms is vital:",
      },
      {
        kind: "list",
        items: [
          "**AI Studio Free Tier**: Perfect for personal hacking and open experimentation (15 requests per minute). However, prompts and completions may be reviewed by human evaluators and used to train Google models.",
          "**Pay-As-You-Go / Vertex AI**: The moment you attach a billing account or deploy through Google Cloud Vertex AI, data privacy terms strictly prohibit Google from using customer prompts or model responses for model retraining.",
        ],
      },
      {
        kind: "callout",
        title: "Developer Tip: Context Caching",
        body: "If you regularly query against the same massive codebase or 500-page API documentation (over 32k tokens), use Gemini's Context Caching API. It cuts prompt token costs by up to 75% and slashes Time to First Token by over 80%.",
      },
    ],
  },
  {
    slug: "npm-vs-yarn-vs-pnpm",
    title: "npm, Yarn, and pnpm: What Actually Differs",
    dek: "They all install packages. Where they diverge is the shape of node_modules, and that difference has consequences for disk space and for correctness.",
    topic: "Engineering",
    publishedAt: "2024-11-10",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#npm", "#pnpm", "#yarn", "#devtools", "#nodejs"],
    coverImage: "/articles/npm-vs-yarn-vs-pnpm.png",
    body: [
      {
        kind: "paragraph",
        html: "Choosing the right package manager can have a significant effect on your project's performance and efficiency. The install command looks the same in all three, so the differences are easy to miss. They come down to how each one lays out `node_modules`.",
      },
      {
        kind: "heading",
        id: "the-layout-difference",
        text: "The layout difference",
      },
      {
        kind: "paragraph",
        html: "npm and Yarn Classic **hoist**. Every package, including the dependencies of your dependencies, gets flattened to the root of the modules directory. pnpm does not. It uses symlinks to put only your direct dependencies at the root, and keeps everything else nested.",
      },
      {
        kind: "paragraph",
        html: "That sounds like an implementation detail until you hit the consequence. As pnpm's own documentation puts it, under hoisting \"source code has access to dependencies that are not added as dependencies to the project.\" You can import a package you never installed, because something else pulled it in. It works locally and breaks when that transitive dependency changes version or disappears. These are phantom dependencies, and pnpm's layout makes them structurally impossible rather than merely discouraged.",
      },
      {
        kind: "heading",
        id: "the-store",
        text: "One copy on disk instead of many",
      },
      {
        kind: "paragraph",
        html: "The second difference is where the files actually live. With npm, if you have 100 projects using a dependency, you have 100 copies of it on disk. pnpm keeps a single content-addressable store and hard-links files out of it, which as the docs say means they consume no additional disk space.",
      },
      {
        kind: "paragraph",
        html: "Updates are incremental at the file level too. If a new version of a 100-file package changes one file, `pnpm update` adds one file to the store rather than cloning the whole package again.",
      },
      {
        kind: "paragraph",
        html: "The install itself runs in three stages: resolve the dependency graph and fetch what is missing into the store, calculate the directory structure, then link everything into place.",
      },
      {
        kind: "heading",
        id: "yarn-modern",
        text: "Where Yarn Modern sits",
      },
      {
        kind: "paragraph",
        html: "Yarn Classic behaves like npm, hoisting into a flat tree. Yarn Modern took a different route with Plug'n'Play, which skips `node_modules` altogether and resolves packages through a lockfile-driven map. It solves the same strictness problem pnpm solves, by removing the directory rather than restructuring it.",
      },
      {
        kind: "table",
        caption:
          "Behaviour as described by each tool's own documentation. The layout column is what drives everything else.",
        headers: ["", "npm", "Yarn Classic", "Yarn Modern (PnP)", "pnpm"],
        rows: [
          ["node_modules layout", "Flat, hoisted", "Flat, hoisted", "None", "Nested + symlinked"],
          [
            "Files on disk",
            "One copy per project",
            "One copy per project",
            "Zips in a cache",
            "Hard-linked from one store",
          ],
          ["Phantom dependencies", "Possible", "Possible", "Blocked", "Blocked"],
          ["Ships with Node", "Yes", "No", "No", "No"],
        ],
      },
      {
        kind: "heading",
        id: "picking-one",
        text: "Picking one",
      },
      {
        kind: "list",
        items: [
          "**npm** is already installed with Node and needs no decision. Fine for a single project where disk space and strictness are not concerns.",
          "**pnpm** is the one to reach for with multiple projects or a monorepo. The disk savings are real and the strict layout catches a class of bug before it ships.",
          "**Yarn** is worth it if you specifically want Plug'n'Play, or you are on a codebase already invested in it.",
        ],
      },
      {
        kind: "paragraph",
        html: "The one genuine friction with pnpm is packages that assume a flat `node_modules` and reach for something they did not declare. That is the phantom dependency problem showing up from the other side, and the `public-hoist-pattern` setting exists to work around it when you cannot fix the package itself.",
      },
    ],
  },
  {
    slug: "crewai-agents",
    title: "Building Teams of AI Agents with CrewAI",
    dek: "Moving beyond single-agent prompt loops: orchestrating multi-agent collaboration with specialized roles, tools, and sequential or hierarchical processes.",
    topic: "Engineering",
    publishedAt: "2024-11-03",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#certification", "#crewai", "#aiagents", "#deeplearningai"],
    coverImage: "/articles/crewai-agents.png",
    body: [
      {
        kind: "paragraph",
        html: "Single-agent systems often hit a ceiling when tasks require multiple distinct skill sets. Ask a single LLM to perform deep technical research, synthesize 20 search results, write a production-ready blog post, and review its own citations, and it will inevitably compromise on quality, forget instructions, or hallucinate citations.",
      },
      {
        kind: "paragraph",
        html: "**CrewAI** solves this by borrowing organizational structure from human engineering teams: dividing work among specialized agents that communicate, pass artifacts, and hold each other accountable under an explicit management process.",
      },
      {
        kind: "heading",
        id: "the-core-building-blocks",
        text: "The Core Building Blocks",
      },
      {
        kind: "list",
        items: [
          "**Agent**: An autonomous actor configured with a distinct `role` (its job title), a `goal` (its primary objective), and a `backstory` (which sets its personality, tone, and cognitive boundaries in system prompts).",
          "**Task**: A discrete unit of work assigned to an agent, specifying the `description` of the work and the exact `expected_output` schema.",
          "**Tools**: Capabilities attached to specific agents (web search, scrapers, database connectors, code interpreters).",
          "**Process**: How the tasks are executed: **Sequential** (linear pipeline where task `N`'s output feeds task `N+1`) or **Hierarchical** (a manager agent dynamically plans, delegates, and reviews results).",
        ],
      },
      {
        kind: "heading",
        id: "a-runnable-crewai-pipeline",
        text: "A Production-Ready Crew in Python",
      },
      {
        kind: "paragraph",
        html: "Here is a complete, runnable CrewAI script establishing a collaborative two-agent research team:",
      },
      {
        kind: "code",
        filename: "agent_crew.py",
        code: `import os\nfrom crewai import Agent, Task, Crew, Process\nfrom crewai_tools import SerperDevTool\n\n# Configure API keys\nos.environ["SERPER_API_KEY"] = "your_serper_api_key"\nos.environ["OPENAI_API_KEY"] = "your_openai_api_key"\n\nsearch_tool = SerperDevTool()\n\n# 1. Senior Research Analyst Agent\nsenior_researcher = Agent(\n    role="Senior AI Research Analyst",\n    goal="Uncover cutting-edge developments in multi-agent systems and summarize empirical findings",\n    backstory="""You are an expert AI researcher at a top-tier lab. You have an eye for separating \n    genuine architectural breakthroughs from marketing hype. You rigorously verify all claims.""",\n    tools=[search_tool],\n    verbose=True,\n    memory=True,\n)\n\n# 2. Technical Technical Writer Agent\ntech_writer = Agent(\n    role="Principal Systems Writer",\n    goal="Translate dense technical research into actionable, engaging engineering articles",\n    backstory="""You are a veteran systems engineer and technical essayist. You explain complex protocols \n    with intuitive analogies, clean code examples, and zero fluff.""",\n    tools=[],\n    verbose=True,\n)\n\n# 3. Define Sequenced Tasks\nresearch_task = Task(\n    description="Investigate recent advancements in the Model Context Protocol (MCP) in 2025/2026. Focus on enterprise adoption and tooling.",\n    expected_output="A structured 5-bullet summary of verified findings with source URLs.",\n    agent=senior_researcher,\n)\n\nwriting_task = Task(\n    description="Using the research findings, compose an insightful 400-word engineering briefing explaining how developers should adopt MCP.",\n    expected_output="A complete markdown article with an introduction, key technical takeaways, and conclusion.",\n    agent=tech_writer,\n)\n\n# 4. Form the Crew and Execute\ntech_crew = Crew(\n    agents=[senior_researcher, tech_writer],\n    tasks=[research_task, writing_task],\n    process=Process.sequential,\n    verbose=True,\n)\n\nresult = tech_crew.kickoff()\nprint("\\n### Final Synthesized Output:\\n", result)`,
      },
      {
        kind: "heading",
        id: "lessons-from-deeplearningai-certification",
        text: "Key Engineering Takeaways",
      },
      {
        kind: "paragraph",
        html: "After completing the **Practical Multi AI Agents and Advanced Use Cases with crewAI** certification (taught by João Moura on DeepLearning.AI), three critical lessons stand out for production agent architectures:",
      },
      {
        kind: "list",
        items: [
          "**Strict Guardrails on Delegation**: When using `allow_delegation=True`, agents can enter endless polite conversation loops ('Can you check this?' 'Sure, here is X, can you review?'). Always set explicit `max_iter` limits.",
          "**Backstories Are Prompt Engineering**: The backstory is not decorative flavor text. It primes the LLM's attention mechanism to discard irrelevant reasoning paths and stick to its designated domain.",
          "**Tool Granularity**: Agents perform far better with three small, deterministic, single-purpose tools than one massive 'swiss-army knife' tool with dozens of optional parameters.",
        ],
      },
      {
        kind: "paragraph",
        html: "The verified certificate is viewable [on DeepLearning.AI](https://learn.deeplearning.ai/accomplishments/8fc6c6d0-73cf-4b8d-9ff9-691b9f148ff2?usp=sharing).",
      },
    ],
  },
  {
    slug: "how-rag-works",
    title: "How Retrieval-Augmented Generation Works",
    dek: "A vector database, cosine similarity, and an LLM context injection. The mathematical and code mechanics of grounding language models.",
    topic: "Evaluation",
    publishedAt: "2024-10-28",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#rag", "#embeddings", "#llm", "#retrieval"],
    coverImage: "/articles/how-rag-works.png",
    body: [
      {
        kind: "paragraph",
        html: "Large language models are phenomenal pattern recognizers, but they possess two fatal weaknesses in production: their knowledge is frozen at training cutoff, and when asked about facts they do not know, they hallucinate plausible-sounding nonsense with absolute confidence.",
      },
      {
        kind: "paragraph",
        html: "**Retrieval-Augmented Generation (RAG)** eliminates hallucination by turning the model into an open-book test taker. Instead of relying solely on parametric memory (weights), the system retrieves verifiable evidence from an external vector index and injects it directly into the prompt context.",
      },
      {
        kind: "heading",
        id: "the-retrieval-loop",
        text: "The Three Stages of the RAG Loop",
      },
      {
        kind: "list",
        items: [
          "**1. Ingestion & Embedding**: Long documents are split into overlapping chunks (e.g. 500 characters with 100-character overlap) and converted into continuous mathematical vectors `v ∈ ℝᵈ` using an embedding model.",
          "**2. Dense Semantic Retrieval**: When a user poses a question, the query is mapped into the same vector space. The system calculates the distance (typically cosine similarity) between the query vector and millions of stored chunk vectors to retrieve the top-`k` nearest neighbors.",
          "**3. Augmented Synthesis**: The retrieved chunks are formatted into a prompt template alongside a strict grounding directive: *'Answer the question strictly based on the provided context.'*",
        ],
      },
      {
        kind: "mermaid",
        caption:
          "The retrieval loop. Everything left of the model is ordinary information retrieval; the model only ever sees text that was already selected for it.",
        code: 'flowchart TD\n    Q["Question"] --> E["Embedding model"]\n    E --> V["Query vector"]\n    V --> S{"Cosine similarity<br/>search"}\n    D[("Vector database")] --> S\n    S --> K["Top-k chunks"]\n    K --> P["Prompt:<br/>question + context"]\n    Q --> P\n    P --> L["Language model"]\n    L --> A["Grounded answer"]\n\n    DOC["Source documents"] -.chunk + embed.-> D',
      },
      {
        kind: "heading",
        id: "the-mathematics-of-cosine-similarity",
        text: "The Mathematics of Vector Similarity",
      },
      {
        kind: "paragraph",
        html: "Why does comparing floating-point arrays identify semantic meaning? Embedding models map synonymy and semantic intent into geometric direction. A query about *'slow SQL queries'* and a document discussing *'database index bottlenecks'* point in almost identical directions in 768-dimensional space, even without sharing words in common.",
      },
      {
        kind: "formula",
        tex: "\\cos(\\theta) = \\frac{A \\cdot B}{\\lVert A \\rVert \\, \\lVert B \\rVert} = \\frac{\\sum_{i} A_i B_i}{\\sqrt{\\sum_{i} A_i^{2}} \; \\sqrt{\\sum_{i} B_i^{2}}}",
        caption:
          "Cosine similarity measures the angle between vectors. 1.0 means identical orientation; 0.0 means orthogonal / unrelated.",
      },
      {
        kind: "paragraph",
        html: "By dividing out the Euclidean norm `‖A‖ ‖B‖`, cosine similarity normalizes for document length: a 2,000-word chapter and a 10-word query can be matched purely on conceptual alignment rather than word count magnitude.",
      },
      {
        kind: "heading",
        id: "a-pure-python-rag-implementation",
        text: "An End-to-End RAG Loop in Python",
      },
      {
        kind: "paragraph",
        html: "Here is a complete, minimal implementation of semantic search and context injection using NumPy and OpenAI embeddings:",
      },
      {
        kind: "code",
        filename: "simple_rag.py",
        code: `import numpy as np\nfrom openai import OpenAI\n\nclient = OpenAI()\n\n# 1. Corpus of documents\nknowledge_base = [\n    "The Space blog is built with Next.js 16 and Tailwind CSS v4 on Turso SQLite.",\n    "Database transactions use libSQL over HTTP with drizzle-orm for type-safe queries.",\n    "The newsletter delivers articles via Resend and supports RFC 8058 one-click unsubscribe.",\n    "Postgres connection pools should be sized based on available CPU cores and RAM."\n]\n\ndef get_embedding(text: str) -> np.ndarray:\n    res = client.embeddings.create(input=text, model="text-embedding-3-small")\n    return np.array(res.data[0].embedding, dtype=np.float32)\n\n# 2. Ingest corpus vectors\ndoc_vectors = np.array([get_embedding(doc) for doc in knowledge_base])\n\n# 3. Query retrieval\nquery = "How are emails sent from the blog?"\nquery_vector = get_embedding(query)\n\n# Compute cosine similarities\ndot_products = np.dot(doc_vectors, query_vector)\nnorms = np.linalg.norm(doc_vectors, axis=1) * np.linalg.norm(query_vector)\nsimilarities = dot_products / norms\n\ntop_index = np.argmax(similarities)\nbest_context = knowledge_base[top_index]\nprint(f"Top Match (Score: {similarities[top_index]:.4f}): {best_context}")\n\n# 4. Grounded Synthesis\nprompt = f"""Answer the question using ONLY the provided context.\n\nContext:\\n{best_context}\\n\\nQuestion: {query}"""\n\nresponse = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[{"role": "user", "content": prompt}],\n    temperature=0.0,\n)\nprint("\\nAnswer:", response.choices[0].message.content)`,
      },
      {
        kind: "heading",
        id: "where-naive-rag-fails",
        text: "Where Naive RAG Fails in Production",
      },
      {
        kind: "paragraph",
        html: "Moving from a weekend prototype to production RAG reveals real architectural challenges:",
      },
      {
        kind: "list",
        items: [
          "**Embedding Drift**: You must never query an index with an embedding model different from the one that generated the index. Dimensions and semantic projections are not transferable.",
          "**Chunk Truncation**: When crucial context spans across a chunk boundary, both chunks score low on similarity. Implement sliding window chunking with 20% overlap or hierarchical parent-child chunking.",
          "**Needle-in-a-Haystack Dilution**: Injecting 20 retrieved chunks causes the LLM to overlook the key fact if it is buried in the middle of the context window. Always apply a cross-encoder re-ranking pass (e.g. Cohere Rerank) before prompt injection.",
        ],
      },
      {
        kind: "callout",
        title: "Architecture Summary",
        body: "RAG is not just a vector search query. A production RAG system is a data engineering pipeline: clean document ingestion, smart chunking strategies, dense retrieval, cross-encoder re-ranking, and strict system prompt grounding.",
      },
    ],
  },
  {
    slug: "explaiable-ai",
    title: "Explainable AI: Opening the Black Box with SHAP and LIME",
    dek: "High test accuracy is meaningless if a model exploits spurious correlations. How cooperative game theory and local linear surrogates bring mathematical interpretability to deep learning.",
    topic: "Research",
    publishedAt: "2024-10-22",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#xai", "#interpretability", "#machine-learning"],
    coverImage: "/articles/explaiable-ai.png",
    body: [
      {
        kind: "paragraph",
        html: "In applied machine learning, there is a dangerous trap: equating a high validation score with a trustworthy model. Deep neural networks, gradient-boosted decision trees, and large language models frequently achieve 98% accuracy by latching onto spurious background correlations—such as classifying an image as a wolf simply because the training photos contained snow in the background.",
      },
      {
        kind: "paragraph",
        html: "When algorithms make credit underwriting decisions, guide cancer diagnoses, or execute autonomous driving maneuvers, the 'black box' excuse is legally and ethically unacceptable. **Explainable AI (XAI)** is the discipline of making machine learning predictions interpretable, verifiable, and debuggable.",
      },
      {
        kind: "heading",
        id: "intrinsic-vs-post-hoc-interpretability",
        text: "Intrinsic Interpretability vs Post-Hoc Attribution",
      },
      {
        kind: "paragraph",
        html: "Interpretability methods fall into two broad architectural paradigms:",
      },
      {
        kind: "list",
        items: [
          "**Intrinsic (Interpretable by Design)**: Algorithms whose internal decision mechanics are directly inspectable by a human. Sparse linear regressions (where coefficients directly represent feature impact), shallow decision trees, and Generalized Additive Models (GAMs) like Microsoft's Explainable Boosting Machines (EBMs).",
          "**Post-Hoc Attribution**: Techniques that analyze a trained, opaque model from the outside by systematically observing how output probabilities fluctuate when inputs are masked, perturbed, or ablated.",
        ],
      },
      {
        kind: "heading",
        id: "shap-mathematical-cooperative-game-theory",
        text: "SHAP: Cooperative Game Theory in Machine Learning",
      },
      {
        kind: "paragraph",
        html: "The gold standard of post-hoc attribution is **SHAP (SHapley Additive exPlanations)**, developed by Scott Lundberg and Su-In Lee. SHAP adapts Nobel-laureate Lloyd Shapley's cooperative game theory: considering input features as 'players' in a coalition collaborating to produce the prediction (the 'payout').",
      },
      {
        kind: "paragraph",
        html: "The Shapley value `φᵢ` represents the average marginal contribution of feature `i` across all possible feature subsets `S ⊆ F \\ {i}`:",
      },
      {
        kind: "code",
        filename: "shap_formula.txt",
        code: `ϕ_i = ∑ [ |S|! (|F| - |S| - 1)! / |F|! ] * [ f(S ∪ {i}) - f(S) ]\n\nWhere:\n  F = Complete set of all input features\n  S = Subset of features without feature i\n  f(S) = Model prediction evaluated with subset S present`,
      },
      {
        kind: "paragraph",
        html: "Unlike heuristic feature importance scores (such as Gini impurity decrease in Random Forests, which heavily bias toward high-cardinality continuous features), SHAP uniquely satisfies four mathematical axioms: **Efficiency** (attributions sum to the difference between prediction and expected value), **Symmetry**, **Dummy Player** (zero impact yields zero credit), and **Additivity**.",
      },
      {
        kind: "heading",
        id: "practical-shap-in-python",
        text: "Generating Explanations in Python",
      },
      {
        kind: "paragraph",
        html: "Using the Python `shap` library, we can compute exact TreeSHAP attributions for tree ensembles in polynomial time, revealing exactly why an individual prediction was made:",
      },
      {
        kind: "code",
        filename: "explain_prediction.py",
        code: `import xgboost as xgb\nimport shap\nfrom sklearn.datasets import fetch_california_housing\nfrom sklearn.model_selection import train_test_split\n\n# 1. Train a gradient boosted model\nX, y = fetch_california_housing(return_X_y=True, as_frame=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = xgb.XGBRegressor(n_estimators=100, max_depth=4)\nmodel.fit(X_train, y_train)\n\n# 2. Initialize TreeSHAP explainer\nexplainer = shap.TreeExplainer(model)\nshap_values = explainer(X_test.iloc[:5])\n\n# 3. Inspect individual prediction breakdown\nfirst_prediction_shap = shap_values[0]\nprint("Base Value (Mean Prediction):", explainer.expected_value)\nprint("Feature Attributions for Record 0:")\nfor name, val in zip(X.columns, first_prediction_shap.values):\n    print(f"  {name:15s}: {val:+.4f}")`,
      },
      {
        kind: "heading",
        id: "the-attention-is-not-explanation-debate",
        text: "The 'Attention is Not Explanation' Warning",
      },
      {
        kind: "paragraph",
        html: "In modern Transformer architectures, engineers frequently plot multi-head self-attention heatmaps and claim: *'The model paid attention to these tokens when generating its answer.'* However, research (notably Jain & Wallace, 2019) proved that attention weights do not reliably correlate with gradient-based feature importance or causal counterfactual outcomes.",
      },
      {
        kind: "paragraph",
        html: "Interpreting attention matrices as explanations ignores non-linear feedforward layers, residual connections, and layer normalization. For deep LLMs, rigorous XAI requires mechanistic interpretability: probing activation vectors, measuring causal mediation, and steering latent representations.",
      },
      {
        kind: "callout",
        title: "Rule of Thumb",
        body: "Never deploy a high-stakes automated decision system without calculating baseline attribution scores. If your top contributing feature does not make causal sense to domain experts, your model has learned noise, not intelligence.",
      },
    ],
  },
  {
    slug: "spacex-reverse-rocket",
    title: "SpaceX Caught a Rocket With the Launch Tower",
    dek: "On 13 October 2024, the Super Heavy booster came back to the pad and was caught mid-air by a pair of mechanical arms, on the first attempt.",
    topic: "Experiments",
    publishedAt: "2024-10-14",
    readingMinutes: 1,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#spacex", "#aerospace", "#engineering", "#physics"],
    coverImage: "/articles/spacex-reverse-rocket.png",
    body: [
      {
        kind: "paragraph",
        html: "On 13 October 2024, SpaceX made history by catching the Super Heavy booster mid-air using giant robotic arms, known as chopsticks. After the launch from Boca Chica, Texas, the booster separated and executed a controlled descent back to the launch pad, where the arms caught it.",
      },
      {
        kind: "paragraph",
        html: "This was Starship's fifth test flight, and the catch worked on the first attempt. About seven minutes after liftoff the booster came back to the tower and hovered while the arms closed around it. Getting that right first time is the part that is hard to overstate, because there was no way to rehearse the final seconds at full scale.",
      },
      {
        kind: "image",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Starship_Booster_Return_on_Final_Approach_%2854063904149%29.jpg/1280px-Starship_Booster_Return_on_Final_Approach_%2854063904149%29.jpg",
        alt: "The Super Heavy booster descending vertically alongside the launch tower on final approach, engines lit.",
        caption:
          "The booster on final approach to the tower during Flight 5. Photo by Steve Jurvetson, CC BY 2.0, via Wikimedia Commons.",
        width: 1280,
        height: 1780,
      },
      {
        kind: "paragraph",
        html: "That is a major step toward making rockets rapidly reusable, which could significantly reduce the cost of space missions. Recovering a booster intact and on the pad, rather than downrange or in the ocean, is what turns reuse from a refurbishment project into something closer to a turnaround.",
      },
      {
        kind: "paragraph",
        html: "The reason to catch rather than land is mass and time. Landing legs strong enough to take a booster of this size have to be carried all the way up and back, and every kilogram of leg is a kilogram not going to orbit. Letting the tower take the load moves that structure to the ground, where its weight costs nothing. It also puts the booster back on the mount it launched from, instead of somewhere that needs transport and inspection before it can fly again.",
      },
      {
        kind: "paragraph",
        html: "By getting this method working, SpaceX is not only improving efficiency but moving toward a future where space travel is more frequent and more accessible. It is a crucial part of Elon Musk's stated goal of making space exploration sustainable and affordable.",
      },
    ],
  },
  {
    slug: "logistic-regression",
    title: "Logistic Regression Explained",
    dek: "Despite the name, it is a classification algorithm. It models the probability of a binary outcome from one or more predictor variables.",
    topic: "Research",
    publishedAt: "2024-10-05",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#machine-learning", "#classification", "#statistics"],
    coverImage: "/articles/logistic-regression.png",
    body: [
      {
        kind: "paragraph",
        html: "Logistic regression is a classification algorithm used to model the probability of a binary outcome based on one or more predictor variables. Despite its name it is a linear model for classification rather than regression. Here are the concepts that matter.",
      },
      {
        kind: "paragraph",
        html: "**Binary classification.** Logistic regression is primarily used for binary classification, where the target variable has only two possible outcomes, typically represented as 0 and 1.",
      },
      {
        kind: "paragraph",
        html: "**The sigmoid function.** Logistic regression uses the sigmoid function to map predicted values to probabilities between 0 and 1:",
      },
      {
        kind: "formula",
        tex: "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
        caption:
          "Where z is the linear combination of the input features and their corresponding coefficients.",
      },
      {
        kind: "image",
        src: "/articles/sigmoid-curve.svg",
        alt: "The logistic sigmoid curve, an S-shape rising from near 0 on the left to near 1 on the right, crossing 0.5 at z equals 0.",
        caption:
          "The sigmoid never quite reaches 0 or 1, which is why the model returns a probability rather than a verdict. z = 0 is the decision boundary at the default threshold.",
        width: 720,
        height: 360,
      },
      {
        kind: "paragraph",
        html: "**Decision boundary.** The model separates classes by fitting a decision boundary, typically a straight line in two dimensions, that divides the feature space into regions associated with different classes.",
      },
      {
        kind: "paragraph",
        html: "**Cost function.** Logistic regression uses cross-entropy loss to measure the difference between the predicted probabilities and the actual target values. Training is the process of minimizing it.",
      },
      {
        kind: "paragraph",
        html: "**Regularization.** L1 (Lasso) and L2 (Ridge) regularization can be applied to prevent overfitting, by penalizing large coefficients.",
      },
      {
        kind: "heading",
        id: "in-code",
        text: "What that looks like in code",
      },
      {
        kind: "paragraph",
        html: "This is scikit-learn's own example, on the iris dataset:",
      },
      {
        kind: "code",
        filename: "logistic_regression.py",
        code: "from sklearn.datasets import load_iris\nfrom sklearn.linear_model import LogisticRegression\n\nX, y = load_iris(return_X_y=True)\nclf = LogisticRegression(random_state=0).fit(X, y)\n\nclf.predict(X[:2, :])\n# array([0, 0])\n\nclf.predict_proba(X[:2, :])\n# array([[9.82e-01, 1.82e-02, 1.44e-08],\n#        [9.72e-01, 2.82e-02, 3.02e-08]])\n\nclf.score(X, y)\n# 0.97",
      },
      {
        kind: "paragraph",
        html: "`predict_proba` is the part worth dwelling on, because it is the sigmoid output rather than a label. The first sample comes back as 98.2 percent class 0, and only then does `predict` collapse that into the label `0`. Keeping the probability is usually more useful than the label: it lets you set your own threshold instead of accepting 0.5, which matters whenever a false positive and a false negative cost different amounts.",
      },
      {
        kind: "paragraph",
        html: "The iris example also shows that the binary case is the starting point rather than the limit. There are three classes here, and the probabilities across each row sum to 1.",
      },
      {
        kind: "callout",
        title: "Regularization is on by default",
        body: "scikit-learn applies L2 regularization out of the box, with the lbfgs solver and C=1.0. So the regularization described above is not something you switch on, it is something you tune. C is the inverse of regularization strength, meaning smaller values regularize harder.",
      },
      {
        kind: "paragraph",
        html: "**Usage.** Logistic regression is widely used in healthcare for predicting disease outcomes, in finance for credit risk analysis, and in marketing for customer churn prediction. Its enduring advantage over heavier models is that the coefficients remain readable, so you can say which feature pushed a decision and in which direction.",
      },
    ],
  },
  {
    slug: "linear-regression",
    title: "Linear Regression Explained",
    dek: "A supervised algorithm that models the relationship between your features and a target, on the assumption that the relationship is a straight line.",
    topic: "Research",
    publishedAt: "2024-09-28",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#machine-learning", "#statistics", "#datascience"],
    coverImage: "/articles/linear-regression.png",
    body: [
      {
        kind: "paragraph",
        html: "Linear regression is a supervised learning algorithm used to model the relationship between one or more independent variables (features) and a dependent variable (target). It assumes a linear relationship between the input features and the target, represented by a straight-line equation.",
      },
      {
        kind: "formula",
        tex: "y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\dots + \\beta_n x_n",
        caption: "β₀ is the intercept and each β is the coefficient on one feature.",
      },
      {
        kind: "heading",
        id: "important-concepts",
        text: "Important concepts",
      },
      {
        kind: "list",
        items: [
          "**Simple linear regression.** There is only one independent variable, and its relationship to the target is modelled with a straight line.",
          "**Multiple linear regression.** The same idea extended to multiple independent variables, which allows more complex relationships to be modelled.",
          "**Coefficients.** The coefficients, or weights, represent the slope of the line. Each one tells you how much the target changes for a one-unit change in the corresponding independent variable.",
          "**Intercept.** The intercept term is the value of the target when all independent variables are zero.",
        ],
      },
      {
        kind: "heading",
        id: "in-code",
        text: "What that looks like in code",
      },
      {
        kind: "paragraph",
        html: "The concepts above map directly onto attributes on a fitted model, which is the fastest way to make them concrete. This is scikit-learn's own example, using data built so that the answer is known in advance: the target is `1 * x₀ + 2 * x₁ + 3`.",
      },
      {
        kind: "code",
        filename: "linear_regression.py",
        code: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nX = np.array([[1, 1], [1, 2], [2, 2], [2, 3]])\n# y = 1 * x_0 + 2 * x_1 + 3\ny = np.dot(X, np.array([1, 2])) + 3\n\nreg = LinearRegression().fit(X, y)\n\nprint(reg.coef_)       # array([1., 2.])\nprint(reg.intercept_)  # 3.0\nprint(reg.score(X, y)) # 1.0\nprint(reg.predict(np.array([[3, 5]])))  # array([16.])",
      },
      {
        kind: "paragraph",
        html: "Read the output against the definitions. `coef_` came back as `[1., 2.]`, which is the slope on each of the two features, and `intercept_` came back as `3.0`. Those are exactly the numbers the data was built from, so the model recovered the relationship it was shown.",
      },
      {
        kind: "paragraph",
        html: "`score` returns R², the proportion of variance the model explains. Here it is `1.0` because the data is perfectly linear with no noise in it. Real data never does this, and a score of 1.0 on a real dataset is a sign you have leaked the target into your features rather than a sign you have done well.",
      },
      {
        kind: "heading",
        id: "where-it-is-used",
        text: "Where it is used",
      },
      {
        kind: "paragraph",
        html: "Linear regression is widely used for prediction and forecasting across economics, finance, healthcare, and other fields. It is also a common baseline model for evaluating whether a more complex machine learning algorithm is actually earning its complexity. If a gradient-boosted ensemble cannot beat a straight line on your problem, that is worth knowing before you ship the ensemble.",
      },
    ],
  },
  {
    slug: "windows-vs-linux",
    title: "Windows to Linux: What Changed in How I Work",
    dek: "I started on Windows 10 and 11 and thought I had everything I needed. Then the projects got complex enough to show me otherwise.",
    topic: "Systems",
    publishedAt: "2024-09-20",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#windows", "#linux", "#developer-experience", "#os"],
    coverImage: "/articles/windows-vs-linux.png",
    body: [
      {
        kind: "paragraph",
        html: "As a programmer who started out on Windows 10 and 11, I initially thought I had everything I needed. But as I got further into software development I started noticing limitations that were holding me back. Between performance lags and compatibility problems, Windows began to feel like more of a hindrance than a help, especially on the more complex projects.",
      },
      {
        kind: "heading",
        id: "making-the-switch",
        text: "Making the switch",
      },
      {
        kind: "paragraph",
        html: "Frustrated, I started experimenting with Linux distributions. Over the past three years I have worked with several, including Kali Linux, Debian, Garuda Linux, and now Ubuntu. It was not a smooth run. I had a lot of issues early on, and my lack of knowledge led to plenty of failures. Those turned out to be the valuable part. It became clear how essential Linux is for programmers, and especially for anyone working in DevOps.",
      },
      {
        kind: "heading",
        id: "what-actually-improved",
        text: "What actually improved",
      },
      {
        kind: "paragraph",
        html: "After a few years of practice I can say Linux is much easier for programming work than Windows was for me. Four things account for most of it:",
      },
      {
        kind: "list",
        items: [
          "**Security.** Linux is inherently more secure, with better protection against malware, and regular updates keep it a safe environment to develop in.",
          "**Performance.** It is lightweight and does not weigh the system down with unnecessary processes, which shows up as faster compile times and quicker execution.",
          "**GPU support for ML libraries.** As someone who dabbles in machine learning, I found GPU support for libraries like TensorFlow far more straightforward on Linux. On Windows it can be a nightmare of compatibility issues and driver problems.",
          "**Customization and control.** You can shape every part of the environment, including how the system runs, what gets installed, and how resources are allocated.",
        ],
      },
      {
        kind: "heading",
        id: "i-still-use-windows",
        text: "I still use Windows",
      },
      {
        kind: "paragraph",
        html: "For graphic design and video editing I am still on Windows. The professional grade software there is either unavailable on Linux or less capable, and that has not changed for me.",
      },
      {
        kind: "paragraph",
        html: "Switching was transformative for my programming, even though it was not easy at first. The learning curve was worth it. Linux made me a better programmer, and it taught me something about adaptability and continuous learning along the way. If you are a programmer still on Windows, it is worth giving Linux a try.",
      },
    ],
  },
  {
    slug: "go",
    title: "The Rise of Go: Concurrency, Simplicity, and Cloud Infrastructure",
    dek: "How Rob Pike and Ken Thompson's deliberate refusal of language complexity turned Go into the undisputed operating system of the modern cloud.",
    topic: "Engineering",
    publishedAt: "2024-09-12",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#golang", "#backend", "#cloud", "#systems"],
    coverImage: "/articles/go.png",
    body: [
      {
        kind: "paragraph",
        html: "If you inspect the foundations of modern cloud infrastructure—Docker, Kubernetes, Terraform, Prometheus, Etcd, CockroachDB, and Caddy—you notice an unmistakable pattern: almost all of them are written in **Go**.",
      },
      {
        kind: "paragraph",
        html: "Created at Google in 2007 by Robert Griesemer, Rob Pike, and Unix co-creator Ken Thompson, Go was born out of intense frustration with C++ compilation times and the runaway syntactic complexity of enterprise object-oriented languages. Instead of asking what features could be added to a language, the Go designers asked **what could be stripped away** while preserving raw systems performance.",
      },
      {
        kind: "heading",
        id: "the-csp-concurrency-revolution",
        text: "The CSP Concurrency Model: Goroutines vs OS Threads",
      },
      {
        kind: "paragraph",
        html: "Traditional systems languages handle concurrency by spawning operating system threads. An OS thread carries significant overhead: typically a **1MB to 8MB fixed stack**, high context-switch latency mediated by the kernel scheduler, and dangerous shared-memory race conditions requiring defensive mutex locking.",
      },
      {
        kind: "paragraph",
        html: "Go implemented Tony Hoare's **Communicating Sequential Processes (CSP)** formal algebra through two primitives:",
      },
      {
        kind: "list",
        items: [
          "**Goroutines**: User-space green threads managed by the Go runtime's `M:N` scheduler. A goroutine starts with a microscopic **2 KB stack** that dynamically grows and shrinks on the heap as needed. A standard developer laptop can comfortably run 200,000 concurrent goroutines without running out of RAM.",
          "**Channels (`chan`)**: Typed conduits through which concurrent goroutines synchronize and exchange data without shared memory: *'Do not communicate by sharing memory; instead, share memory by communicating.'*",
        ],
      },
      {
        kind: "heading",
        id: "a-production-worker-pool",
        text: "Practical Concurrency: A Production Worker Pool",
      },
      {
        kind: "paragraph",
        html: "Here is a canonical Go worker pool pattern demonstrating buffered channels, worker goroutines, and synchronized completion with `sync.WaitGroup`:",
      },
      {
        kind: "code",
        filename: "worker_pool.go",
        code: `package main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"time"\n)\n\ntype Job struct {\n\tID  int\n\tURL string\n}\n\ntype Result struct {\n\tJob        Job\n\tStatusCode int\n\tDuration   time.Duration\n}\n\n// worker processes incoming jobs concurrently from a shared channel\nfunc worker(id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {\n\tdefer wg.Done()\n\tfor job := range jobs {\n\t\tstart := time.Now()\n\t\t// Simulate network fetch\n\t\ttime.Sleep(50 * time.Millisecond)\n\t\tresults <- Result{\n\t\t\tJob:        job,\n\t\t\tStatusCode: 200,\n\t\t\tDuration:   time.Since(start),\n\t\t}\n\t}\n}\n\nfunc main() {\n\tconst numJobs = 10\n\tconst numWorkers = 3\n\n\tjobs := make(chan Job, numJobs)\n\tresults := make(chan Result, numJobs)\n\tvar wg sync.WaitGroup\n\n\t// Launch worker pool\n\tfor w := 1; w <= numWorkers; w++ {\n\t\twg.Add(1)\n\t\tgo worker(w, jobs, results, &wg)\n\t}\n\n\t// Enqueue work\n\tfor j := 1; j <= numJobs; j++ {\n\t\tjobs <- Job{ID: j, URL: fmt.Sprintf("https://api.service.internal/v1/resource/%d", j)}\n\t}\n\tclose(jobs) // Closing signals workers to finish\n\n\twg.Wait()\n\tclose(results)\n\n\tfor res := range results {\n\t\tfmt.Printf("Job %d completed with status %d in %v\\n", res.Job.ID, res.StatusCode, res.Duration)\n\t}\n}`,
      },
      {
        kind: "heading",
        id: "the-deployment-advantage",
        text: "The Single Binary and Minimalist Tooling Advantage",
      },
      {
        kind: "paragraph",
        html: "The second reason Go dominates production infrastructure is its compilation model. Unlike Node.js or Python, which require megabytes of interpreter runtimes and complex virtual environments, `go build` produces a **single, statically linked binary** with zero external shared library dependencies.",
      },
      {
        kind: "paragraph",
        html: "In containerized deployments, this allows Docker images to be built `FROM scratch` or `FROM alpine`, resulting in images as small as 12MB. That means near-instant container startup times, minimal attack surfaces with zero CVEs from extraneous operating system utilities, and effortless CI/CD pipelines.",
      },
      {
        kind: "callout",
        title: "The Engineering Takeaway",
        body: "Go succeeded not because it was the most expressive language, but because it solved the team coordination and deployment operational problems of large-scale backend engineering with unyielding simplicity.",
      },
    ],
  },
  {
    slug: "c",
    title: "Why C++ Still Matters: The Backbone of High-Performance AI and Systems",
    dek: "From llama.cpp and TensorRT to low-latency game engines, modern C++ remains the undisputed champion of bare-metal control and zero-cost abstractions.",
    topic: "Systems",
    publishedAt: "2024-09-05",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#cpp", "#performance", "#systems", "#programming"],
    coverImage: "/articles/c.png",
    body: [
      {
        kind: "paragraph",
        html: "Every few years, a new programming language arrives with claims that it will render C++ obsolete. Yet in 2026, when you inspect the cutting edge of technological innovation—specifically the explosive growth of **large language model inference engines** (such as Georgi Gerganov's `llama.cpp`, vLLM's custom CUDA kernels, and NVIDIA's TensorRT-LLM)—you find that C++ remains utterly irreplaceable.",
      },
      {
        kind: "paragraph",
        html: "Why does a language designed by Bjarne Stroustrup in 1979 continue to anchor the most demanding computational workloads on the planet?",
      },
      {
        kind: "heading",
        id: "the-ai-inference-reality",
        text: "The AI Inference Reality: Python on Top, C++ at the Core",
      },
      {
        kind: "paragraph",
        html: "It is easy to believe that artificial intelligence is written in Python. Researchers write PyTorch scripts, prompt engineers configure LangChain pipelines, and data scientists train scikit-learn models. But Python is strictly the **ergonomic steering wheel**; the actual engine running underneath is pure, highly optimized C++ and CUDA.",
      },
      {
        kind: "paragraph",
        html: "PyTorch's tensor computational core (ATen), the memory allocators managing GPU VRAM, and the matrix multiplication kernels that stream weights from high-bandwidth memory (HBM) are all built in C++. When serving LLMs with thousands of tokens per second, the microsecond overhead of a garbage collector or interpreted bytecode is an immediate disqualifier.",
      },
      {
        kind: "heading",
        id: "modern-cpp-vs-c-with-classes",
        text: "Modern C++ (C++20/C++23) vs the C Legacy",
      },
      {
        kind: "paragraph",
        html: "Much of the historical criticism of C++ focuses on old C-style pitfalls: manual `malloc()` and `free()`, dangling pointer dereferences, and confusing buffer overflows. However, modern C++ (C++17, C++20, and C++23) is fundamentally a different language built around two core philosophies:",
      },
      {
        kind: "list",
        items: [
          "**RAII (Resource Acquisition Is Initialization)**: Resources—heap memory, file descriptors, GPU buffers, and mutex locks—are bound to object lifetimes. When an object leaves its scope, its destructor runs deterministically, guaranteeing zero memory leaks without runtime garbage collection pauses.",
          "**Zero-Cost Abstractions**: What you don't use, you don't pay for. And what you do use, you couldn't hand-code any better in assembly. Concepts, templates, and `constexpr` evaluation execute entirely at compile time.",
        ],
      },
      {
        kind: "heading",
        id: "type-safety-and-concepts-example",
        text: "Clean Type Safety: C++20 Concepts and Smart Pointers",
      },
      {
        kind: "paragraph",
        html: "Here is an example showing how modern C++ combines compile-time type constraints (Concepts) and automated memory management (`std::unique_ptr`) to eliminate raw pointers while preserving maximum performance:",
      },
      {
        kind: "code",
        filename: "modern_inference_buffer.cpp",
        code: `#include <iostream>\n#include <memory>\n#include <span>\n#include <concepts>\n#include <vector>\n\n// C++20 Concept: Enforce that tensor elements must be floating-point numbers\ntemplate <typename T>\nconcept NumericFloat = std::floating_point<T>;\n\ntemplate <NumericFloat T>\nclass TensorBuffer {\nprivate:\n    size_t m_size;\n    std::unique_ptr<T[]> m_data; // Deterministic memory management: zero manual free()\n\npublic:\n    explicit TensorBuffer(size_t size) \n        : m_size(size), m_data(std::make_unique<T[]>(size)) {}\n\n    // Zero-copy view using std::span\n    std::span<const T> view() const noexcept {\n        return std::span<const T>(m_data.get(), m_size);\n    }\n\n    size_t size() const noexcept { return m_size; }\n    T& operator[](size_t index) noexcept { return m_data[index]; }\n};\n\nint main() {\n    // Type-safe allocation of 1024 float32 activations\n    TensorBuffer<float> layer_activations(1024);\n    layer_activations[0] = 0.854f;\n\n    std::cout << "Allocated " << layer_activations.size() \n              << " elements safely with RAII.\\n";\n    // Memory is freed automatically and deterministically right here\n    return 0;\n}`,
      },
      {
        kind: "heading",
        id: "the-verdict",
        text: "The Verdict: When Control Is Non-Negotiable",
      },
      {
        kind: "paragraph",
        html: "While Rust is rightfully gaining ground for systems where memory safety must be mathematically proven at compile time, C++ remains the lingua franca of game engines (Unreal Engine 5), embedded robotics, high-frequency trading, and AI hardware acceleration. Its vast hardware ecosystem, mature optimizing compilers (Clang/GCC), and total control over CPU cache lines and SIMD vectorization ensure that C++ will remain vital for decades to come.",
      },
    ],
  },
  {
    slug: "sir-don-bradman",
    title: "Winning Without Sixes: What Bradman's 99.94 Says About Consistency",
    dek: "Don Bradman hit only six sixes in his entire Test career and finished with an average of 99.94. The mathematics of eliminating failure modes in sport and software.",
    topic: "Findings",
    publishedAt: "2024-08-28",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#strategy", "#discipline", "#performance"],
    coverImage: "/articles/sir-don-bradman.png",
    body: [
      {
        kind: "paragraph",
        html: "Sir Donald Bradman played 52 Test matches for Australia, scored 6,996 runs, and finished his international career with a batting average of **99.94**. Across those twenty years and 80 innings, how many sixes did the greatest batsman in history hit?",
      },
      {
        kind: "paragraph",
        html: "Just **six**.",
      },
      {
        kind: "paragraph",
        html: "In an era where modern T20 cricket idolizes maximums and aerial boundary-clearing, sitting with that statistic reveals a profound mathematical truth about variance, risk management, and long-term durability.",
      },
      {
        kind: "heading",
        id: "the-4-4-sigma-outlier",
        text: "The 4.4-Sigma Outlier: A Statistical Anomaly",
      },
      {
        kind: "paragraph",
        html: "In statistical terms, Bradman is not just the best cricket batsman; he is the greatest statistical outlier across all major human sporting endeavors. The mean batting average for recognized international Test batsmen hovers around 35 to 40, with a standard deviation (`σ`) of roughly 12 to 14.",
      },
      {
        kind: "paragraph",
        html: "Bradman's average places him more than **4.4 standard deviations (`4.4σ`) above the mean**. To put that into perspective:",
      },
      {
        kind: "list",
        items: [
          "**Pelé** in football: ~3.7`σ`",
          "**Michael Jordan** in basketball: ~3.4`σ`",
          "**Wayne Gretzky** in ice hockey: ~3.9`σ`",
          "**Ty Cobb** in baseball: ~4.0`σ`",
        ],
      },
      {
        kind: "paragraph",
        html: "No other athlete in recorded history has stood that far beyond their peer distribution. What produced this impossible divergence?",
      },
      {
        kind: "heading",
        id: "eliminating-failure-modes-from-the-state-space",
        text: "Eliminating Failure Modes from the State Space",
      },
      {
        kind: "paragraph",
        html: "Bradman understood stochastic probability before mathematicians formally mapped it to sports analytics. He famously noted a simple physical constraint: *'You cannot be caught out if the ball stays along the ground.'*",
      },
      {
        kind: "paragraph",
        html: "Every time a batsman lofts the ball into the air, they enter a non-deterministic lottery. Even with immaculate timing, a gust of wind, a mistimed edge, or an athletic fielder creates a non-zero probability of dismissal: `P(caught) > 0`. Over thousands of deliveries, the cumulative probability of failure approaches certainty (`1.0`).",
      },
      {
        kind: "paragraph",
        html: "By refusing to hit aerial shots, Bradman **systematically deleted an entire failure mode from his state machine**. He relied on wristwork, placement, ground boundaries, and ruthless singles.",
      },
      {
        kind: "heading",
        id: "the-parallel-in-systems-engineering",
        text: "The Parallel in Software and Systems Engineering",
      },
      {
        kind: "paragraph",
        html: "In software engineering, developers are constantly tempted to hit flashy sixes: adopting unvetted distributed graph databases, spinning up intricate microservice meshes for low-traffic CRUD apps, or writing clever, unreadable metaprogramming macros.",
      },
      {
        kind: "paragraph",
        html: "High-variance architectural choices produce exciting launch demos, but they inevitably manifest as disastrous `p99` tail latencies, hard-to-reproduce race conditions, and catastrophic cascading failures when under load.",
      },
      {
        kind: "callout",
        title: "The Engineering Takeaway",
        body: "Five-nines reliability (99.999% uptime) is never achieved through heroic fire-fighting. It is achieved by ruthlessly keeping the ball on the ground: choosing boring, battle-tested technologies, enforcing idempotent retries, writing defensive unit tests, and eliminating high-variance operations.",
      },
    ],
  },
  {
    slug: "industry-visit",
    title: "A Day with Creative Software",
    dek: "Inside Creative Software with the Peradeniya Computer Engineering team. Observing how enterprise architecture, CI/CD, and agile engineering operate at global scale.",
    topic: "Findings",
    publishedAt: "2024-08-15",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#industry-visit", "#creative-software", "#peracom"],
    coverImage: "/articles/industry-visit.png",
    body: [
      {
        kind: "paragraph",
        html: "Stepping outside the university computer laboratories into a mature software engineering company is always an eye-opening experience. During our undergraduate journey at the University of Peradeniya, our department organized an industrial visit to **Creative Software** in Colombo—one of Sri Lanka's pioneer software exporters with a track record spanning over two decades.",
      },
      {
        kind: "paragraph",
        html: "While academic engineering trains you to solve complex algorithmic puzzles, write compilers, and build hardware-software interfaces from scratch, industry visits reveal the other half of the discipline: how teams of dozens of engineers coordinate to deliver software that stays up 24/7 across thousands of enterprise clients.",
      },
      {
        kind: "heading",
        id: "enterprise-architecture-and-scale",
        text: "Enterprise Architecture and Scalability",
      },
      {
        kind: "paragraph",
        html: "Creative Software engineers build mission-critical systems for global clients in healthcare, construction, logistics, and marine operations across Scandinavia, Europe, and North America. What stood out immediately was how their architectural discussions centered around durability rather than chasing ephemeral trends:",
      },
      {
        kind: "list",
        items: [
          "**Domain-Driven Microservices**: Clean separation of core business domains with resilient asynchronous event buses (RabbitMQ, Kafka) protecting services from cascading outages.",
          "**Multi-Tenant Isolation**: Engineering robust database isolation and encryption layers for European clients requiring strict GDPR and enterprise compliance.",
          "**Container Orchestration**: Production workloads standardized across Docker and Kubernetes, ensuring parity between local development and cloud production clusters.",
        ],
      },
      {
        kind: "heading",
        id: "engineering-rigor-and-culture",
        text: "The Culture of Rigorous Code Review",
      },
      {
        kind: "paragraph",
        html: "One of the most inspiring aspects was observing their code review and deployment culture. In student projects, testing is often an afterthought hurried before submission. At Creative Software, automated testing (unit, integration, end-to-end) and static code analysis are baked into every pull request before any human reviewer even looks at the diff.",
      },
      {
        kind: "paragraph",
        html: "The engineers emphasized that a great code review is a mentorship conversation, not an interrogation. They look for edge cases, resource cleanup, SQL query optimization, and maintainability for the engineer who will touch that file three years later.",
      },
      {
        kind: "callout",
        title: "Key Takeaway",
        body: "Software engineering at scale is not just about writing code; it is about building reliable automated systems that allow teams to ship changes with confidence every day.",
      },
      {
        kind: "paragraph",
        html: "A sincere thank you to the engineering leadership and talent team at Creative Software for their generous hospitality, candid architectural walkthroughs, and warm encouragement to us as aspiring computer engineers.",
      },
    ],
  },
  {
    slug: "my-graduate",
    title: "Graduating in Computer Engineering from the University of Peradeniya",
    dek: "Reflections on completing my B.Sc. (Hons) in Engineering at Peradeniya: four years of systems programming, hardware-software co-design, and lifelong engineering friendships.",
    topic: "Findings",
    publishedAt: "2024-08-01",
    readingMinutes: 3,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#graduation", "#university", "#computer-engineering"],
    coverImage: "/articles/my-graduate.png",
    body: [
      {
        kind: "paragraph",
        html: "I have officially graduated with a **B.Sc. (Hons) in Engineering, specializing in Computer Engineering, from the University of Peradeniya**.",
      },
      {
        kind: "paragraph",
        html: "Walking out of the Faculty of Engineering after four intense, demanding, and unforgettable years is a profound feeling. Peradeniya is a unique place: nestled beside the Mahaweli River under the Hantana mountain range, it combines classical academic rigor with an uncompromising work ethic.",
      },
      {
        kind: "heading",
        id: "the-foundations-of-the-degree",
        text: "The Foundations of the Degree",
      },
      {
        kind: "paragraph",
        html: "The Computer Engineering program at Peradeniya is renowned for its depth. We did not simply write web applications; we tore computers apart to understand how they work at every layer of abstraction:",
      },
      {
        kind: "list",
        items: [
          "**Digital Logic & Embedded Systems**: Designing circuits with logic gates, wiring microcontrollers on breadboards, and writing assembly code for hardware peripherals.",
          "**Computer Systems Architecture**: Pipelining, branch prediction, cache hierarchies, memory management units, and instruction-level parallelism.",
          "**Operating Systems Internals**: Writing device drivers, handling POSIX threads, synchronization primitives, virtual memory paging, and file system design.",
          "**Algorithms & Systems Software**: Data structures, compiler design, computer networking protocols (TCP/IP stack), and distributed algorithms.",
        ],
      },
      {
        kind: "heading",
        id: "the-human-journey",
        text: "The Late Nights and Lifelong Camaraderie",
      },
      {
        kind: "paragraph",
        html: "Beyond the textbooks, engineering school is forged in the labs. It was countless late nights tracking down memory leaks in C++, debugging FPGA syntheses, and tuning bioinformatics pipelines for our final year project. It was the shared panic before project demos that inevitably turned into collective celebration when the LEDs flashed and the tests turned green.",
      },
      {
        kind: "paragraph",
        html: "I am deeply grateful to our esteemed lecturers and professors in the Department of Computer Engineering for their guidance, to the technical and lab staff who supported us, to my parents for their unconditional sacrifices, and to my brilliant batch mates who made this journey unforgettable.",
      },
      {
        kind: "callout",
        title: "Moving Forward",
        body: "Graduation is not the finish line of learning—it is simply the acquisition of the tools required to teach yourself anything. Space is the continuation of that curiosity: an open notebook documenting what I learn as I build systems and explore AI.",
      },
    ],
  },
  {
    slug: "fyp",
    title: "Building an Oxford Nanopore Pipeline for RNA-Seq Data Analysis",
    dek: "Developing an end-to-end long-read transcriptomics pipeline using Oxford Nanopore sequencing: basecalling, splice-aware alignment, isoform discovery, and differential expression.",
    topic: "Findings",
    publishedAt: "2024-05-20",
    readingMinutes: 4,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#final-year-project", "#bioinformatics", "#rna-seq", "#peradeniya"],
    coverImage: "/articles/fyp.png",
    body: [
      {
        kind: "paragraph",
        html: "Our final year project at the University of Peradeniya was titled **'Developing an Oxford Nanopore Technology Based Pipeline for RNA-Seq Data Analysis'**. When we first took on the topic, bioinformatics was an entirely new domain for our team. We had strong foundations in computer systems, algorithms, and high-performance computing, but biology brought a fascinating new level of complexity.",
      },
      {
        kind: "paragraph",
        html: "Traditional short-read sequencing (such as Illumina) produces fragments of 150–300 base pairs. While highly accurate, assembling these tiny jigsaw pieces to identify complex full-length RNA transcript isoforms is computationally ambiguous. **Oxford Nanopore Technologies (ONT)** revolutionizes transcriptomics by reading entire RNA or cDNA molecules in single continuous passes, from 5' end to poly-A tail.",
      },
      {
        kind: "heading",
        id: "the-pipeline-architecture",
        text: "The Computational Pipeline Architecture",
      },
      {
        kind: "paragraph",
        html: "Because native ONT long-read RNA sequencing has unique error profiles and massive raw data volumes (gigabytes of raw electrical signal data), standard short-read pipelines fail. We researched, engineered, and benchmarked an end-to-end computational pipeline:",
      },
      {
        kind: "list",
        items: [
          "**GPU-Accelerated Basecalling (Dorado)**: Translating raw ionic current fluctuations (POD5/FAST5 files) into raw nucleotide sequence reads using deep neural network basecallers on NVIDIA GPUs.",
          "**Quality Control & Filtering (NanoPlot & Chopper)**: Evaluating per-read Phred quality scores (Q-score distributions) and length metrics, filtering out truncated adapters and chimeric artifacts.",
          "**Splice-Aware Sequence Alignment (Minimap2)**: Aligning long cDNA/direct-RNA reads to the reference genome using `minimap2 -ax splice`, specifically tuned to account for non-canonical splice junctions and variable intron sizes.",
          "**Transcript Quantification & Isoform Discovery (StringTie2)**: Reconstructing complete transcript models, identifying novel alternative splicing events, and calculating gene/transcript abundance metrics (TPM).",
          "**Differential Expression (DESeq2 in R)**: Statistical modeling of negative binomial distributions across biological replicates to detect significantly up- and down-regulated genes.",
        ],
      },
      {
        kind: "heading",
        id: "engineering-challenges-and-optimizations",
        text: "Key Systems Challenges Solved",
      },
      {
        kind: "paragraph",
        html: "From a systems engineering perspective, bioinformatics is a stress test for hardware. We encountered two major bottlenecks:",
      },
      {
        kind: "paragraph",
        html: "1. **I/O Bottlenecks**: Processing hundreds of thousands of individual raw signal files overwhelmed standard hard drives. Migrating raw working scratch disks to NVMe arrays and batching reads drastically reduced pipeline idle time.",
      },
      {
        kind: "paragraph",
        html: "2. **GPU Memory Allocation**: Basecalling with high-accuracy models required careful chunking and memory pin management to avoid CUDA out-of-memory errors during long sequencing runs.",
      },
      {
        kind: "heading",
        id: "acknowledgments",
        text: "Acknowledgments",
      },
      {
        kind: "paragraph",
        html: "I had the privilege of working on this research alongside my project partners **Chiran Govinna** and **Tharindu Dhananjaya**. We embraced every hurdle, solved stubborn bugs together, and successfully defended our final thesis.",
      },
      {
        kind: "paragraph",
        html: "Our deepest gratitude goes to our supervisor **Dr. Asitha Bandaranayake** for believing in our engineering capabilities and providing tireless guidance. Sincere thanks to **Prof. Pradeepa C.G. Bandaranayake** for her invaluable domain expertise in molecular biology and bioinformatics, and to **Dr. Bhagya Chandrasekara** whose day-to-day research assistance was indispensable in navigating biological datasets.",
      },
      {
        kind: "callout",
        title: "Project Milestone",
        body: "Bridging computer engineering with computational biology demonstrated the power of multidisciplinary problem solving—and proved that strong systems engineering fundamentals can conquer any new technical domain.",
      },
    ],
  },
  {
    slug: "my-journey",
    title: "The Pentium III That Taught Me to Fix Things Myself",
    dek: "My uncle gave me a PC when I was eleven. Almost every part of it eventually broke, and repairing it became the way I learned.",
    topic: "Findings",
    publishedAt: "2024-03-15",
    readingMinutes: 2,
    likes: 0,
    views: 0,
    commentCount: 0,
    tags: ["#journey", "#self-learning", "#origins", "#tech"],
    coverImage: "/articles/my-journey.png",
    body: [
      {
        kind: "paragraph",
        html: "When I was eleven, my uncle gave me my first PC: a Pentium III with 20GB of hard drive space, 32MB VGA, 192MB of RAM, and a CD ROM. To a kid it felt like a portal to the future. It was also, almost immediately, a machine full of problems.",
      },
      {
        kind: "paragraph",
        html: "I was not the kind to shy away from that. I dove in headfirst and tried to fix whatever went wrong, and plenty went wrong. At the beginning I mostly failed. I kept going anyway, because I had one goal, which was to get my little PC working no matter what. Over time I started learning from the mistakes instead of just repeating them.",
      },
      {
        kind: "paragraph",
        html: "Slowly it became stable, at least by my standards. Then something else would break. By then I had enough experience from the earlier attempts to keep moving, and I started tinkering with the hardware itself: hard drive crashes, RAM failures, power supply problems, even trouble with the CPU. I faced all of it.",
      },
      {
        kind: "paragraph",
        html: "We did not have the money for new parts, so I worked with used components. That never mattered to me. I only wanted to keep learning and fixing.",
      },
      {
        kind: "paragraph",
        html: "What I am proud of is that I learned all of it on my own, by experimenting and not giving up. I eventually replaced every part of that old PC, turning it into something almost entirely new. I had so many spare parts left over that I built a second PC out of them.",
      },
      {
        kind: "paragraph",
        html: "Looking back, that taught me something invaluable: **there is no better way to learn than doing it yourself.** The knowledge you gain through trial and error stays with you, and it never gets old. I still work this way, always pushing myself to explore new things, and it is the approach that has had the greatest impact on anything I have achieved.",
      },
      {
        kind: "paragraph",
        html: "So to anyone just starting out, my advice is simple. Learn by yourself. It is tough at the beginning and you will make mistakes, but the rewards at the end are worth it. Don't give up, because the journey is what makes success even more beautiful.",
      },
      {
        kind: "paragraph",
        html: "Wishing all of you the best on your learning journey.",
      },
    ],
  },
  {
    slug: "django-and-python-web-development",
    title: "Getting Started with Django",
    dek: "From an empty Linux machine to a working Django app: environment, project, models, views, templates, and URLs.",
    topic: "Engineering",
    publishedAt: "2023-03-12",
    readingMinutes: 3,
    likes: 0,
    views: 735,
    commentCount: 0,
    tags: ["#python", "#django", "#webdev", "#backend"],
    coverImage: "/articles/django-and-python-web-development.png",
    body: [
      {
        kind: "paragraph",
        html: "Before we dive into Django, it is worth starting with the basics of web development and the Python programming language.",
      },
      {
        kind: "paragraph",
        html: "Web development involves building websites and web applications that users interact with through a browser. The front end is typically built with HTML, CSS, and JavaScript, while the back end handles the data and the logic. Python can be used for both, though it is most at home on the back end.",
      },
      {
        kind: "paragraph",
        html: "Django is a high-level Python web framework for building web applications quickly. It provides a lot of built-in functionality for the tasks that come up in almost every project, such as user authentication and database management.",
      },
      {
        kind: "heading",
        id: "setting-up-your-environment",
        text: "Setting up your environment",
      },
      {
        kind: "paragraph",
        html: "Here is how to do it on a Linux machine. First, check that Python 3 is installed:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python3 --version",
      },
      {
        kind: "paragraph",
        html: "If it is not there, install it with your system's package manager. On Ubuntu, along with pip, the package installer for Python:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt-get update\nsudo apt-get install python3\nsudo apt-get install python3-pip",
      },
      {
        kind: "paragraph",
        html: "It is good practice to use a separate virtual environment for each Django project. A virtual environment is an isolated Python environment, so packages you install for one project do not affect the global environment or any other project.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python3 -m venv myenv\nsource myenv/bin/activate",
      },
      {
        kind: "paragraph",
        html: "With the environment active, install Django into it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install django",
      },
      {
        kind: "heading",
        id: "creating-your-first-project",
        text: "Creating your first project",
      },
      {
        kind: "paragraph",
        html: "Navigate to the directory where you want the project to live, then create it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "django-admin startproject myproject",
      },
      {
        kind: "paragraph",
        html: "To check that it works, move into the project directory and start the development server:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python manage.py runserver",
      },
      {
        kind: "paragraph",
        html: "Open [http://localhost:8000](http://localhost:8000) in your browser and you should see the Welcome to Django page.",
      },
      {
        kind: "heading",
        id: "how-a-django-app-fits-together",
        text: "How a Django app fits together",
      },
      {
        kind: "paragraph",
        html: "A Django application is made up of four kinds of piece, and almost everything you write falls into one of them:",
      },
      {
        kind: "list",
        items: [
          "**Models** define the structure of the data your application stores in a database.",
          "**Views** handle the logic for processing requests and returning responses.",
          "**Templates** define the HTML markup returned to the user.",
          "**URLs** map incoming URLs to specific views.",
        ],
      },
      {
        kind: "heading",
        id: "building-your-first-app",
        text: "Building your first app",
      },
      {
        kind: "paragraph",
        html: "From inside your project directory, create the app:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python manage.py startapp myapp",
      },
      {
        kind: "paragraph",
        html: "**Define a model.** In your `myapp` directory, create `models.py`:",
      },
      {
        kind: "code",
        filename: "myapp/models.py",
        code: "from django.db import models\n\n\nclass MyModel(models.Model):\n    name = models.CharField(max_length=50)\n    description = models.TextField()",
      },
      {
        kind: "paragraph",
        html: "That defines a table in your database with two columns, `name` and `description`.",
      },
      {
        kind: "paragraph",
        html: "**Create and apply a migration.** The first command writes a migration file based on the changes you made to your models. The second applies it and creates the table:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python manage.py makemigrations\npython manage.py migrate",
      },
      {
        kind: "paragraph",
        html: "**Create a view.** In `myapp`, create `views.py`:",
      },
      {
        kind: "code",
        filename: "myapp/views.py",
        code: "from django.shortcuts import render\n\nfrom .models import MyModel\n\n\ndef index(request):\n    mymodels = MyModel.objects.all()\n    return render(request, 'myapp/index.html', {'mymodels': mymodels})",
      },
      {
        kind: "paragraph",
        html: "This view gets all instances of `MyModel` from the database and hands them to a template.",
      },
      {
        kind: "paragraph",
        html: "**Create a template.** Inside `myapp`, create a `templates` directory, and in it a file called `index.html`:",
      },
      {
        kind: "code",
        filename: "myapp/templates/index.html",
        code: "{% for mymodel in mymodels %}\n<h2>{{ mymodel.name }}</h2>\n<p>{{ mymodel.description }}</p>\n{% endfor %}",
      },
      {
        kind: "paragraph",
        html: "**Define a URL.** In `myapp`, create `urls.py`:",
      },
      {
        kind: "code",
        filename: "myapp/urls.py",
        code: "from django.urls import path\n\nfrom . import views\n\nurlpatterns = [\n    path('', views.index, name='index'),\n]",
      },
      {
        kind: "paragraph",
        html: "That maps the root URL of the app to the `index` view.",
      },
      {
        kind: "paragraph",
        html: "**Wire it into the project.** Finally, include the app's URLs in your project's `urls.py`, which serves the app under `/myapp/`:",
      },
      {
        kind: "code",
        filename: "myproject/urls.py",
        code: "from django.urls import include, path\n\nurlpatterns = [\n    path('myapp/', include('myapp.urls')),\n]",
      },
      {
        kind: "paragraph",
        html: "That is a working Django app. There is a great deal more to learn, including user authentication, forms, and deploying to a production server, but the shape of every Django project is the one you have just built: models, views, templates, and URLs.",
      },
    ],
  },
  {
    slug: "stop-conda-from-automatically-activating-the-base-environment",
    title: "How to Stop Conda Activating the Base Environment Automatically",
    dek: "Conda was slowing my machine down, so I stopped it from activating the base environment in every new shell.",
    topic: "Engineering",
    publishedAt: "2023-03-12",
    readingMinutes: 1,
    likes: 0,
    views: 728,
    commentCount: 0,
    tags: ["#conda", "#python", "#shell", "#linux"],
    coverImage: "/articles/stop-conda-from-automatically-activating-the-base-environment.png",
    body: [
      {
        kind: "paragraph",
        html: "I was getting slow performance on my PC when using Conda, so I looked at disabling the automatic activation of the base environment on Kali. It takes one command.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "conda config --set auto_activate_base false",
      },
      {
        kind: "paragraph",
        html: "What that does, piece by piece:",
      },
      {
        kind: "list",
        items: [
          "`conda config` modifies Conda configuration settings.",
          "`--set` sets a configuration variable to a specific value.",
          "`auto_activate_base` determines whether Conda automatically activates the base environment when a new shell is opened. It defaults to `true`.",
        ],
      },
      {
        kind: "paragraph",
        html: "Setting it to `false` disables that, which reduces the resources Conda uses on shell startup and helps with the sluggishness. If you need the base environment for a particular task, you can still activate it by hand with `conda activate`.",
      },
      {
        kind: "heading",
        id: "where-the-setting-lives",
        text: "Where the setting lives",
      },
      {
        kind: "paragraph",
        html: "The command writes to `~/.condarc`, which is a plain YAML file. You can edit it directly, and you can read it back to confirm the change took:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "conda config --show auto_activate_base\ncat ~/.condarc",
      },
      {
        kind: "paragraph",
        html: "Open a new shell afterwards. The change applies to shells started after it, not the one you are sitting in.",
      },
      {
        kind: "callout",
        title: "The option was renamed",
        body: "Newer conda releases call this setting auto_activate. The old auto_activate_base name still works as an alias, but conda now prints a deprecation warning when you use it, and records the value under the new name. If you see that warning, set auto_activate instead.",
      },
      {
        kind: "paragraph",
        html: "So on a current install the same change is:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "conda config --set auto_activate false",
      },
      {
        kind: "paragraph",
        html: "Either way the effect is the same. Your shell opens without conda getting involved, and you opt in when you actually want an environment.",
      },
    ],
  },
  {
    slug: "pip-install-pipenv-issue-solved",
    title: "Fixing pip's externally-managed-environment Error",
    dek: "Python 3.11 refused the install because the environment is externally managed. That is a deliberate protection, and there are three ways past it.",
    topic: "Engineering",
    publishedAt: "2023-03-06",
    readingMinutes: 2,
    likes: 0,
    views: 683,
    commentCount: 0,
    tags: ["#python", "#pip", "#venv", "#linux"],
    coverImage: "/articles/pip-install-pipenv-issue-solved.png",
    body: [
      {
        kind: "paragraph",
        html: "When I tried to install Pipenv on Python 3.11.2, the install failed with an `externally-managed-environment` error.",
      },
      {
        kind: "paragraph",
        html: "The message means the Python environment is externally managed, so you cannot install packages system-wide with pip. This is not a bug, and it is not the distro being awkward. It comes from **PEP 668**, and it exists because pip and your system package manager both write to the same directories. When pip overwrote a file that apt or dnf depended on, things broke later, in ways that were nearly impossible to trace back.",
      },
      {
        kind: "paragraph",
        html: "The block is triggered by a real marker file, which is worth knowing about because it tells you exactly which interpreter is protected:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "ls /usr/lib/python3.11/EXTERNALLY-MANAGED\ncat /usr/lib/python3.11/EXTERNALLY-MANAGED",
      },
      {
        kind: "paragraph",
        html: "The contents of that file are what pip prints at you. Distributions use it to point you at their preferred fix.",
      },
      {
        kind: "heading",
        id: "a-virtual-environment",
        text: "For a project: a virtual environment",
      },
      {
        kind: "paragraph",
        html: "A virtual environment is a private copy of Python's package directory that belongs to your project rather than the OS. Nothing the system depends on lives inside it, so pip is free to write there.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "python3 -m venv myenv\nsource myenv/bin/activate",
      },
      {
        kind: "paragraph",
        html: "The environment is now active and pip installs into it rather than system-wide:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install pipenv",
      },
      {
        kind: "paragraph",
        html: "When you are done, deactivate it. And if you want it gone entirely, delete the directory, because that is all a venv is:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "deactivate\nrm -rf myenv",
      },
      {
        kind: "heading",
        id: "pipx-for-tools",
        text: "For a command-line tool: pipx",
      },
      {
        kind: "paragraph",
        html: "Pipenv is a tool you run, not a library you import, so there is a better fit. `pipx` creates a dedicated virtual environment for each application and puts the command on your PATH, so you get the tool without managing an environment for it.",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt install pipx\npipx install pipenv\npipx ensurepath",
      },
      {
        kind: "paragraph",
        html: "This is the right default for anything you want available system-wide as a command.",
      },
      {
        kind: "heading",
        id: "the-override",
        text: "The override, and when not to use it",
      },
      {
        kind: "paragraph",
        html: "There is a flag that skips the check entirely:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "pip install --break-system-packages pipenv",
      },
      {
        kind: "paragraph",
        html: "The name is honest about what it does. It is reasonable inside a throwaway container or CI job where the whole filesystem is discarded afterwards. On a machine you actually use, it can break your OS package manager months later, long after you have forgotten you ran it. Reach for the venv or pipx instead.",
      },
    ],
  },
  {
    slug: "install-my-sql-in-kali-linux",
    title: "How to Install MySQL on Kali Linux",
    dek: "Kali ships with MariaDB, and it conflicts with MySQL. Here is the sequence that finally worked for me.",
    topic: "Systems",
    publishedAt: "2023-03-04",
    readingMinutes: 2,
    likes: 0,
    views: 356,
    commentCount: 0,
    tags: ["#kalilinux", "#mysql", "#database", "#linux"],
    coverImage: "/articles/install-my-sql-in-kali-linux.png",
    body: [
      {
        kind: "paragraph",
        html: "Installing MySQL on Kali Linux can be a challenging task, and I struggled with it multiple times. I kept at it and spent considerable time finding a solution, and eventually got it working. This is the sequence that worked.",
      },
      {
        kind: "heading",
        id: "try-the-normal-way-first",
        text: "Try the normal way first",
      },
      {
        kind: "paragraph",
        html: "Update the system, then attempt the standard install:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt update\nsudo apt install mysql-server",
      },
      {
        kind: "paragraph",
        html: "If that fails, download the MySQL APT configuration package and continue below:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb",
      },
      {
        kind: "heading",
        id: "remove-mariadb-first",
        text: "Remove MariaDB first",
      },
      {
        kind: "paragraph",
        html: "The install often will not succeed on a fresh system, because Kali Linux comes with MariaDB as its default database management system and the two conflict. MariaDB has to go first.",
      },
      {
        kind: "paragraph",
        html: "The conflict is not arbitrary. MariaDB started as a fork of MySQL, so both packages want to own the same binary names, the same default data directory at `/var/lib/mysql`, and the same port 3306. apt will not let two packages claim the same files, which is why the install fails rather than warning you.",
      },
      {
        kind: "callout",
        title: "Back up anything you care about first",
        body: "Purging MariaDB removes its configuration, and depending on your setup it can take the databases in /var/lib/mysql with it. If there is anything in there you want, run mysqldump against it before you start.",
      },
      {
        kind: "paragraph",
        html: "Stop and disable the MariaDB server:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo systemctl stop mariadb\nsudo systemctl disable mariadb",
      },
      {
        kind: "paragraph",
        html: "Then remove it:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt remove mariadb-server mariadb-client",
      },
      {
        kind: "paragraph",
        html: "Then purge it. On Kali, `purge` removes a package along with its configuration files, which `remove` leaves behind:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt purge mariadb-server mariadb-client",
      },
      {
        kind: "paragraph",
        html: "Then run `autoremove`, which clears out packages that were installed as dependencies for something else and are no longer needed:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt autoremove",
      },
      {
        kind: "heading",
        id: "install-mysql",
        text: "Install MySQL",
      },
      {
        kind: "paragraph",
        html: "With MariaDB gone, the install goes through:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt install mysql-server",
      },
      {
        kind: "heading",
        id: "check-it-worked",
        text: "Check it actually worked",
      },
      {
        kind: "paragraph",
        html: "Installing the package is not the same as having a running server, and it is worth confirming which of the two you have before you go looking for problems elsewhere:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo systemctl status mysql\nmysql --version",
      },
      {
        kind: "paragraph",
        html: "If it is not running, start it and have it come up on boot:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo systemctl start mysql\nsudo systemctl enable mysql",
      },
      {
        kind: "paragraph",
        html: "A fresh install ships with permissive defaults. The bundled hardening script walks through setting a root password and removing anonymous accounts, the test database, and remote root login:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo mysql_secure_installation",
      },
      {
        kind: "paragraph",
        html: "Then confirm you can actually get in:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo mysql -u root -p",
      },
      {
        kind: "paragraph",
        html: "If something still fails after all this, the log is more useful than guessing. `sudo journalctl -u mysql -n 50` will usually name the problem outright, and leftover MariaDB files in the data directory are the most common cause.",
      },
    ],
  },
  {
    slug: "kali-linux-update-warninig",
    title: "Fixing the Legacy trusted.gpg Keyring Warning on apt update",
    dek: "Copying the keyring into trusted.gpg.d silences the warning. Scoping the key to the one repository that needs it is the fix apt actually wants.",
    topic: "Systems",
    publishedAt: "2023-03-04",
    readingMinutes: 2,
    likes: 0,
    views: 24,
    commentCount: 0,
    tags: ["#linux", "#apt", "#kalilinux", "#debian"],
    coverImage: "/articles/kali-linux-update-warninig.png",
    body: [
      {
        kind: "paragraph",
        html: "This warning comes from the APT package manager and the MySQL repository. It means the signing key is sitting in the old central keyring, `/etc/apt/trusted.gpg`, which apt still reads but has deprecated.",
      },
      {
        kind: "image",
        src: "/articles/kali-apt-key-warning.png",
        alt: "Terminal output from sudo apt update, ending in a warning that the MySQL repository key is stored in the legacy trusted.gpg keyring.",
        caption:
          "The warning as it appears at the end of an otherwise clean apt update. Everything above it succeeded, which is why it is easy to ignore.",
        width: 672,
        height: 334,
      },
      {
        kind: "heading",
        id: "the-quick-fix",
        text: "The quick fix",
      },
      {
        kind: "paragraph",
        html: "Go to the `/etc/apt` folder and list its contents. You should see a file named `trusted.gpg`:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "cd /etc/apt/\nls",
      },
      {
        kind: "paragraph",
        html: "Copy that file into the `trusted.gpg.d` directory, confirm it landed, and update again:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo cp trusted.gpg trusted.gpg.d\ncd trusted.gpg.d\nls\nsudo apt update",
      },
      {
        kind: "paragraph",
        html: "The warning is gone. Worth knowing what this actually did, though.",
      },
      {
        kind: "heading",
        id: "why-apt-complains",
        text: "Why apt complains in the first place",
      },
      {
        kind: "paragraph",
        html: "Anything in `trusted.gpg` or `trusted.gpg.d` is trusted for **every** repository on the system. That is the problem apt is warning about. A key you added for one vendor's repo can sign packages claiming to come from any other repo you have configured.",
      },
      {
        kind: "paragraph",
        html: "The copy above moves the key out of the deprecated file, which stops the warning, but it keeps that system-wide trust. It is the right move if you want the message gone now. It is not the arrangement apt is steering people towards.",
      },
      {
        kind: "heading",
        id: "scoping-the-key",
        text: "Scoping the key to one repository",
      },
      {
        kind: "paragraph",
        html: "The modern approach is `Signed-By`, which binds a key to the single repository that should be allowed to use it. Since APT 2.4, `/etc/apt/keyrings` is the recommended home for keys that are not managed by a package.",
      },
      {
        kind: "paragraph",
        html: "In a classic one-line source, the key goes in brackets before the URL:",
      },
      {
        kind: "code",
        filename: "/etc/apt/sources.list.d/mysql.list",
        code: "deb [signed-by=/etc/apt/keyrings/mysql.gpg] http://repo.mysql.com/apt/debian/ bookworm mysql-8.0",
      },
      {
        kind: "paragraph",
        html: "In the newer deb822 format it is a field rather than a bracket:",
      },
      {
        kind: "code",
        filename: "/etc/apt/sources.list.d/mysql.sources",
        code: "Types: deb\nURIs: http://repo.mysql.com/apt/debian/\nSuites: bookworm\nComponents: mysql-8.0\nSigned-By: /etc/apt/keyrings/mysql.gpg",
      },
      {
        kind: "paragraph",
        html: "Note that `apt-key` is deprecated for this and should not be used to add keys any more. And if you are wondering why the key is scoped this narrowly: it is the difference between trusting one vendor to sign their own packages and trusting them to sign anything at all.",
      },
    ],
  },
  {
    slug: "programing-environment-os",
    title: "Choosing an Operating System for Programming",
    dek: "There is no single best answer. It depends on your preferences, your languages, and the tools you work with.",
    topic: "Systems",
    publishedAt: "2023-02-17",
    readingMinutes: 2,
    likes: 0,
    views: 18,
    commentCount: 0,
    tags: ["#os", "#linux", "#macos", "#windows"],
    coverImage: "/articles/programing-environment-os.png",
    body: [
      {
        kind: "paragraph",
        html: "The best programming operating system is subjective. It depends on your preferences, and on the programming languages and tools you are using. Here are the popular options and what each one is good at.",
      },
      {
        kind: "heading",
        id: "macos",
        text: "macOS",
      },
      {
        kind: "paragraph",
        html: "Many programmers favour macOS, particularly those working on iOS or macOS software. It has Unix-based command-line tools, a sleek interface, and compatibility with a wide range of development tools and environments.",
      },
      {
        kind: "paragraph",
        html: "The iOS point is not a preference, it is a hard requirement. Xcode only runs on macOS, and building or submitting an iOS app needs it, so that decision gets made for you regardless of what you would otherwise choose.",
      },
      {
        kind: "heading",
        id: "linux",
        text: "Linux",
      },
      {
        kind: "paragraph",
        html: "Many developers prefer Linux because it is open source, has a robust terminal, and is highly customizable. It also offers a wide range of programming tools and environments, which makes it a popular choice for web development, cloud computing, and data analysis.",
      },
      {
        kind: "paragraph",
        html: "There is a practical argument underneath the philosophical one: servers and containers overwhelmingly run Linux, so developing on it means your machine resembles production. Path handling, file permissions, and case-sensitive filenames all behave the same way in both places, which removes a whole category of bug that only appears after deployment.",
      },
      {
        kind: "heading",
        id: "windows",
        text: "Windows",
      },
      {
        kind: "paragraph",
        html: "Windows is widely used in the enterprise world and offers tools and environments for programming in a range of languages. Visual Studio, a popular development environment, is available on Windows, and many other programming tools are designed to run on the platform.",
      },
      {
        kind: "paragraph",
        html: "It is also the least either-or of the three now, because WSL runs a real Linux kernel alongside Windows. That closes most of the gap for server-side work while keeping the applications that only exist on Windows, which is a reasonable position if you need both.",
      },
      {
        kind: "paragraph",
        html: "Ultimately the best programming OS depends on your personal preferences and the specific tasks you need to accomplish. It is worth trying a few and seeing which one works best for you. The honest summary is that all three are workable for most things, and the decision usually gets made by one hard constraint: what you have to ship, and what will only build on one of them.",
      },
    ],
  },
  {
    slug: "intro-to-linux",
    title: "Why Programmers Keep Choosing Linux",
    dek: "Open source, stable, and built around the command line. What makes Linux a good place to develop.",
    topic: "Systems",
    publishedAt: "2023-02-17",
    readingMinutes: 2,
    likes: 0,
    views: 28,
    commentCount: 0,
    tags: ["#linux", "#opensource", "#operating-systems"],
    coverImage: "/articles/intro-to-linux.png",
    body: [
      {
        kind: "paragraph",
        html: "There are several reasons why Linux is a popular choice for programmers.",
      },
      {
        kind: "list",
        items: [
          "**Open source.** Programmers can read the source code and modify it to suit their needs, which gives a great deal of flexibility and control over the development environment.",
          "**Robust and stable.** Linux is known for its stability and reliability. It is less prone to crashes and viruses than other operating systems, which matters if you need a stable environment to work in.",
          "**Command-line interface.** The CLI lets you perform complex tasks quickly, and it gives access to a wide range of tools and utilities that are not available through graphical interfaces.",
          "**Package managers.** Tools like apt and yum make it easy to install and manage software, so setting up a development environment with the libraries you need is straightforward.",
          "**A large community.** Linux has a large and active community of developers who contribute to the operating system and the software that runs on it, and who provide support, documentation, and resources.",
          "**Compatibility.** Linux works with a wide range of hardware and software, which is useful if you need to work across a variety of systems.",
        ],
      },
      {
        kind: "heading",
        id: "what-the-cli-argument-means",
        text: "What the command-line argument actually means",
      },
      {
        kind: "paragraph",
        html: "The CLI point is the one that sounds like preference until you have used it. The real argument is not that typing beats clicking, it is that every tool reads and writes plain text, so any tool can be piped into any other. Nobody had to build an integration for it.",
      },
      {
        kind: "paragraph",
        html: "Finding which process is holding a port, for example, is one line rather than an application:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo lsof -i :3000",
      },
      {
        kind: "paragraph",
        html: "So is answering a question nobody wrote a tool for, such as which file extensions appear most often in a project:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "find . -type f -name '*.*' | sed 's/.*\\.//' | sort | uniq -c | sort -rn | head",
      },
      {
        kind: "paragraph",
        html: "That is five programs, none of which know about the others. The composition is the feature, and it is why a shell one-liner often replaces a script you were about to write.",
      },
      {
        kind: "heading",
        id: "package-managers-in-practice",
        text: "Package managers in practice",
      },
      {
        kind: "paragraph",
        html: "The package manager varies by distribution, and knowing which family you are on saves a lot of confusion. Debian and Ubuntu use apt, Fedora and RHEL use dnf, and Arch uses pacman:",
      },
      {
        kind: "code",
        filename: "terminal.sh",
        code: "sudo apt update && sudo apt install build-essential python3-dev   # Debian, Ubuntu, Kali\nsudo dnf install gcc-c++ python3-devel                            # Fedora, RHEL\nsudo pacman -S base-devel python                                  # Arch",
      },
      {
        kind: "paragraph",
        html: "The part that matters for development is that these install libraries and headers, not just applications. When a Python package needs to compile a C extension, the compiler and the development headers are one command away rather than a separate toolchain download.",
      },
      {
        kind: "paragraph",
        html: "Taken together, that is a powerful and flexible development environment, well supplied with the tools, utilities, and libraries that programming projects of any size tend to need.",
      },
    ],
  },
]);
