import fs from "fs";
import path from "path";

import type { ArticleBlock, Post } from "../src/lib/content/schemas";

// Clean unicode text & strip combining underline/low-line characters
function normalizeUnicodeText(text: string): string {
  let result = "";
  // Strip combining low line (U+0332), macron below (U+0331), etc.
  const cleaned = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

  for (const char of cleaned) {
    const code = char.codePointAt(0) || 0;
    // Math Bold Uppercase (𝗔-𝗭): 0x1D5D4 - 0x1D5ED
    if (code >= 0x1d5d4 && code <= 0x1d5ed) {
      result += String.fromCodePoint(code - 0x1d5d4 + 65);
    }
    // Math Bold Lowercase (𝗮-𝘇): 0x1D5EE - 0x1D607
    else if (code >= 0x1d5ee && code <= 0x1d607) {
      result += String.fromCodePoint(code - 0x1d5ee + 97);
    }
    // Math Sans-Serif Bold Uppercase
    else if (code >= 0x1d5a0 && code <= 0x1d5b9) {
      result += String.fromCodePoint(code - 0x1d5a0 + 65);
    } else if (code >= 0x1d5ba && code <= 0x1d5d3) {
      result += String.fromCodePoint(code - 0x1d5ba + 97);
    }
    // Math Italic
    else if (code >= 0x1d608 && code <= 0x1d621) {
      result += String.fromCodePoint(code - 0x1d608 + 65);
    } else if (code >= 0x1d622 && code <= 0x1d63b) {
      result += String.fromCodePoint(code - 0x1d622 + 97);
    }
    // Math Serif Bold
    else if (code >= 0x1d400 && code <= 0x1d419) {
      result += String.fromCodePoint(code - 0x1d400 + 65);
    } else if (code >= 0x1d41a && code <= 0x1d433) {
      result += String.fromCodePoint(code - 0x1d41a + 97);
    }
    // Bullets
    else if (
      char === "・" ||
      char === "•" ||
      char === "●" ||
      char === "▪" ||
      char === "➔" ||
      char === "👉"
    ) {
      result += "- ";
    } else {
      result += char;
    }
  }
  return result;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type TopicName =
  "Inference" | "Systems" | "Evaluation" | "Engineering" | "Experiments" | "Research" | "Findings";

// Curated folder metadata to ensure perfect titles, topics, and deks
const FOLDER_METADATA: Record<string, { title: string; topic: TopicName; tags: string[] }> = {
  " Programing Environment-OS": {
    title: "Choosing the Best Programming Operating System for Development",
    topic: "Systems",
    tags: ["#os", "#linux", "#macos", "#windows"],
  },
  "Django and Python web development": {
    title: "Introduction to Django and Python Web Development",
    topic: "Engineering",
    tags: ["#python", "#django", "#webdev", "#backend"],
  },
  "Install my-sql in Kali Linux": {
    title: "How to Install and Configure MySQL in Kali Linux",
    topic: "Systems",
    tags: ["#kalilinux", "#mysql", "#database", "#linux"],
  },
  "Intro to Linux": {
    title: "Why Linux? The Essential Operating System for Developers",
    topic: "Systems",
    tags: ["#linux", "#opensource", "#operating-systems"],
  },
  "Kali Linux Update Warninig": {
    title: "Fixing the MySQL APT Repository Update Warning in Kali Linux",
    topic: "Systems",
    tags: ["#kali", "#apt", "#troubleshooting", "#linux"],
  },
  "Stop Conda from automatically activating the base environment": {
    title: "How to Disable Conda Base Environment Auto-Activation",
    topic: "Engineering",
    tags: ["#conda", "#python", "#cli", "#environment"],
  },
  "anthrpic project glasswing": {
    title: "Anthropic Project Glasswing: Progress Report & Mythos Preview",
    topic: "Research",
    tags: ["#anthropic", "#claude", "#security", "#cybersecurity"],
  },
  "apple gen ai sub domain": {
    title: "Apple Registers genai.apple.com Ahead of WWDC",
    topic: "Research",
    tags: ["#apple", "#apple-intelligence", "#genai", "#wwdc"],
  },
  "aws-bedrock": {
    title: "AWS Unveils Amazon Bedrock Studio for Generative AI Development",
    topic: "Engineering",
    tags: ["#aws", "#bedrock", "#genai", "#cloud"],
  },
  "c++": {
    title: "Why C++ Still Matters in Modern High-Performance Programming",
    topic: "Systems",
    tags: ["#cpp", "#performance", "#systems", "#programming"],
  },
  "cag vs rag": {
    title: "CAG Over RAG: Speed and Cache-Augmented Generation",
    topic: "Inference",
    tags: ["#cag", "#rag", "#llm", "#inference"],
  },
  "crewai agents": {
    title: "Multi-Agent Automation Workflows with CrewAI",
    topic: "Engineering",
    tags: ["#crewai", "#aiagents", "#automation", "#python"],
  },
  "docker-mcp": {
    title: "Docker Just Solved the Biggest Problem with Model Context Protocol",
    topic: "Systems",
    tags: ["#docker", "#mcp", "#containers", "#devtools"],
  },
  "engineering council sri lanka": {
    title: "Milestone: Registration with the Engineering Council Sri Lanka",
    topic: "Findings",
    tags: ["#engineering", "#career", "#milestones"],
  },
  "explaiable ai": {
    title: "Explainable AI (XAI): Demystifying Model Decisions",
    topic: "Research",
    tags: ["#xai", "#interpretability", "#machine-learning"],
  },
  fyp: {
    title: "Final Year Project: Engineering Reflections & Architecture",
    topic: "Findings",
    tags: ["#fyp", "#engineering", "#computer-engineering"],
  },
  "gamini api": {
    title: "Exploring Google Gemini 1.5 Pro AI API for Developers",
    topic: "Engineering",
    tags: ["#gemini", "#google", "#api", "#llm"],
  },
  "gemini vector database": {
    title: "AI-Powered Document Understanding with Vector Databases",
    topic: "Evaluation",
    tags: ["#vectordatabase", "#embeddings", "#rag", "#gemini"],
  },
  go: {
    title: "The Future of Go: Golang's Rising Popularity in Modern Systems",
    topic: "Engineering",
    tags: ["#golang", "#backend", "#cloud", "#systems"],
  },
  "how rag works": {
    title: "How Retrieval-Augmented Generation (RAG) Works Under the Hood",
    topic: "Evaluation",
    tags: ["#rag", "#embeddings", "#llm", "#retrieval"],
  },
  "industry visit": {
    title: "Industry Visit & Software Engineering Insights with Creative Software",
    topic: "Findings",
    tags: ["#industry", "#software-engineering", "#insights"],
  },
  "la fires vs chatpgt": {
    title: "The LA Fires vs ChatGPT: Real-Time Crisis Information & Model Limits",
    topic: "Evaluation",
    tags: ["#chatgpt", "#realtime", "#evaluation", "#ai"],
  },
  "linear regression": {
    title: "Demystifying Linear Regression: Mathematics and Core Intuition",
    topic: "Research",
    tags: ["#machine-learning", "#statistics", "#datascience"],
  },
  "llm finetuning": {
    title: "Fine-Tuning Large Language Models: Adapting Models for Specialized Tasks",
    topic: "Experiments",
    tags: ["#finetuning", "#llm", "#training", "#huggingface"],
  },
  "llm+hg": {
    title: "Unleashing LLM Power with Hugging Face Transformers",
    topic: "Engineering",
    tags: ["#huggingface", "#transformers", "#opensource", "#llm"],
  },
  "llm-think": {
    title: "Are LLMs Actually Thinking? Reasoning, Synthesis, and Limitations",
    topic: "Research",
    tags: ["#reasoning", "#llm", "#cognition", "#ai"],
  },
  "logistic regression": {
    title: "Logistic Regression Explained: Probabilistic Classification Fundamentals",
    topic: "Research",
    tags: ["#machine-learning", "#classification", "#statistics"],
  },
  "lpu vs gpu": {
    title: "LPUs vs. GPUs: The Architecture Powering Ultra-Fast LLM Inference",
    topic: "Inference",
    tags: ["#lpu", "#gpu", "#hardware", "#inference"],
  },
  "mcp vs acp": {
    title: "Why You’ll Use Both MCP and A2A/ACP in Your 2026 Agent Stack",
    topic: "Systems",
    tags: ["#mcp", "#acp", "#aiagents", "#protocols"],
  },
  "multi agentic course certification": {
    title: "Certified in Practical Multi AI Agents & Advanced Use Cases with CrewAI",
    topic: "Findings",
    tags: ["#certification", "#deeplearningai", "#crewai", "#agents"],
  },
  "my journey": {
    title: "My Self-Learning Journey Starting with a Pentium III PC",
    topic: "Findings",
    tags: ["#journey", "#self-learning", "#origins", "#tech"],
  },
  "my-graduate": {
    title: "Graduating with B.Sc (Hons) in Computer Engineering from University of Peradeniya",
    topic: "Findings",
    tags: ["#graduation", "#university", "#computer-engineering"],
  },
  "my-mcp": {
    title: "Building Custom Model Context Protocol (MCP) Servers for Personal Tools",
    topic: "Systems",
    tags: ["#mcp", "#claude", "#tools", "#devtools"],
  },
  "npm vs yarn vs pnpm": {
    title: "Package Manager Shootout: Comparing npm, Yarn, and pnpm",
    topic: "Engineering",
    tags: ["#pnpm", "#npm", "#yarn", "#javascript"],
  },
  "nvidia nim": {
    title: "Accelerated Enterprise AI Deployment with NVIDIA NIM Microservices",
    topic: "Inference",
    tags: ["#nvidia", "#nim", "#inference", "#microservices"],
  },
  "openai own chip": {
    title: "OpenAI Designing Custom AI Silicon: The Economics of Specialized Chips",
    topic: "Systems",
    tags: ["#openai", "#hardware", "#silicon", "#chips"],
  },
  "pip install pipenv-Issue (Solved)": {
    title: "Solving Pipenv Installation Errors in Python 3.11",
    topic: "Engineering",
    tags: ["#python", "#pipenv", "#troubleshooting", "#packaging"],
  },
  "sir don bradman": {
    title: "Sir Don Bradman's Strategy: Dominance and Consistency Without Sixes",
    topic: "Findings",
    tags: ["#strategy", "#discipline", "#performance"],
  },
  "spacex-reverse rocket": {
    title: "SpaceX Rocket Recovery Engineering: Physics of the Reverse Boost",
    topic: "Experiments",
    tags: ["#spacex", "#aerospace", "#engineering", "#physics"],
  },
  "windows vs linux": {
    title: "Windows vs. Linux: An Engineer’s Perspective on Developer Workflows",
    topic: "Systems",
    tags: ["#windows", "#linux", "#developer-experience", "#os"],
  },
  "xcode+ai": {
    title: "Apple Xcode AI Coding Assistant: Next-Gen Developer Productivity",
    topic: "Engineering",
    tags: ["#xcode", "#apple", "#swift", "#copilot"],
  },
};

/**
 * Small deterministic PRNG (mulberry32 over an FNV-1a hash of the seed), so a
 * given slug always produces the same sequence. Not for anything that needs
 * real randomness; this only exists to keep generated mock stats stable.
 */
function seededRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let x = state;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function countWords(value: string): number {
  return value.split(/\s+/).filter(Boolean).length;
}

function parseMarkdownToBlocks(
  rawMarkdown: string,
  defaultTitle: string,
): { dek: string; blocks: ArticleBlock[] } {
  const normalized = normalizeUnicodeText(rawMarkdown);
  const rawLines = normalized.split("\n");

  const blocks: ArticleBlock[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({
        kind: "list",
        items: [...currentList],
      });
      currentList = [];
    }
  };

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeFilename = "snippet.sh";

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (
      line.startsWith("hashtag#") ||
      (line.startsWith("#") && line.split(" ").every((w) => w.startsWith("#")))
    ) {
      continue;
    }

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushList();
        blocks.push({
          kind: "code",
          filename: codeFilename,
          code: codeBuffer.join("\n"),
        });
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
        const lang = line.slice(3).trim();
        codeFilename = lang ? `script.${lang}` : "terminal.sh";
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLines[i]);
      continue;
    }

    if (!line) {
      flushList();
      continue;
    }

    // Check if line is header
    if (line.startsWith("## ") || line.startsWith("### ")) {
      flushList();
      const headingText = line.replace(/^#+\s*/, "").trim();
      blocks.push({
        kind: "heading",
        id: slugify(headingText) || `heading-${blocks.length}`,
        text: headingText,
      });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ") || /^\d+\.\s/.test(line)) {
      const itemText = line.replace(/^[-*]\s+|\d+\.\s+/, "").trim();
      if (itemText) {
        currentList.push(itemText);
      }
      continue;
    }

    if (
      line.startsWith("sudo ") ||
      line.startsWith("conda ") ||
      line.startsWith("pip ") ||
      line.startsWith("npm ") ||
      line.startsWith("docker ")
    ) {
      flushList();
      blocks.push({
        kind: "code",
        filename: "terminal.sh",
        code: line,
      });
      continue;
    }

    // Labelled paragraph.
    //
    // These posts carry no markdown structure: no headings, no bullets, no
    // bold. What they do have is a recurring shape where a short line ending
    // in a colon labels the paragraph beneath it ("Open source:", "macOS:").
    // Emitted as two plain paragraphs that reads as an undifferentiated wall
    // of text, because the label is the same size and weight as the prose.
    //
    // Fold the pair into one paragraph with the label bolded, which is how
    // this is set in print. Costs no schema change (paragraph already takes
    // html) and roughly halves the block count on these posts.
    const isLabel =
      line.endsWith(":") && line.length <= 48 && !line.includes(". ") && countWords(line) <= 6;
    if (isLabel) {
      const next = (rawLines[i + 1] ?? "").trim();
      const nextIsProse =
        next.length > 0 &&
        !next.endsWith(":") &&
        !next.startsWith("#") &&
        !next.startsWith("- ") &&
        !next.startsWith("* ") &&
        !/^\d+\.\s/.test(next) &&
        !next.startsWith("```");

      if (nextIsProse) {
        flushList();
        blocks.push({
          kind: "paragraph",
          html: `<strong>${escapeHtml(line)}</strong> ${escapeHtml(next)}`,
        });
        i += 1; // the prose line is consumed by the label above it
        continue;
      }
    }

    // Paragraph
    flushList();
    blocks.push({
      kind: "paragraph",
      html: escapeHtml(line),
    });
  }

  flushList();

  if (inCodeBlock && codeBuffer.length > 0) {
    blocks.push({
      kind: "code",
      filename: codeFilename,
      code: codeBuffer.join("\n"),
    });
  }

  // Generate Dek
  let dek = "";
  const firstParagraph = blocks.find((b) => b.kind === "paragraph");
  if (firstParagraph && firstParagraph.html) {
    dek = firstParagraph.html.replace(/<[^>]*>/g, "").slice(0, 160);
    if (firstParagraph.html.length > 160) dek += "...";
  } else {
    dek = defaultTitle;
  }

  return { dek, blocks };
}

async function main() {
  const baseDir = path.resolve(process.cwd(), "../docs/data/posts");
  const publicArticlesDir = path.resolve(process.cwd(), "public/articles");
  const postsOutputFile = path.resolve(process.cwd(), "src/lib/content/posts.ts");

  if (!fs.existsSync(baseDir)) {
    console.error("Base directory does not exist:", baseDir);
    process.exit(1);
  }

  fs.mkdirSync(publicArticlesDir, { recursive: true });

  const folders = fs.readdirSync(baseDir).filter((f) => {
    const full = path.join(baseDir, f);
    return fs.statSync(full).isDirectory();
  });

  console.log(`Found ${folders.length} post folders.`);

  const generatedPosts: Post[] = [];
  let postIndex = 0;

  const baseDate = new Date("2026-08-20");

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    const files = fs.readdirSync(folderPath);
    const mdFile = files.find((f) => f.endsWith(".md"));

    if (!mdFile) {
      console.warn(`No markdown file in ${folder}, skipping.`);
      continue;
    }

    const rawContent = fs.readFileSync(path.join(folderPath, mdFile), "utf-8");
    const meta = FOLDER_METADATA[folder] || {
      title: folder.trim(),
      topic: "Engineering",
      tags: ["#engineering"],
    };

    const title = meta.title;
    const slug = slugify(folder);
    const topic = meta.topic;
    const tags = meta.tags;

    const { dek, blocks } = parseMarkdownToBlocks(rawContent, title);

    const wordCount = rawContent.split(/\s+/).length;
    const readingMinutes = Math.max(2, Math.ceil(wordCount / 180));

    const postDate = new Date(baseDate);
    postDate.setDate(baseDate.getDate() - postIndex * 2);
    const publishedAt = postDate.toISOString().split("T")[0];

    // Find image in folder or assests/
    let coverImagePath: string | undefined = undefined;
    let localImage: string | undefined = undefined;

    const directImage = files.find(
      (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
    );
    if (directImage) {
      localImage = path.join(folderPath, directImage);
    } else if (
      files.includes("assests") &&
      fs.statSync(path.join(folderPath, "assests")).isDirectory()
    ) {
      const assetFiles = fs.readdirSync(path.join(folderPath, "assests"));
      const assetImg = assetFiles.find(
        (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
      );
      if (assetImg) {
        localImage = path.join(folderPath, "assests", assetImg);
      }
    }

    if (localImage && fs.existsSync(localImage)) {
      const targetFileName = `${slug}.png`;
      const targetPath = path.join(publicArticlesDir, targetFileName);
      fs.copyFileSync(localImage, targetPath);
      coverImagePath = `/articles/${targetFileName}`;
    } else {
      const existingInPublic = path.join(publicArticlesDir, `${slug}.png`);
      if (fs.existsSync(existingInPublic)) {
        coverImagePath = `/articles/${slug}.png`;
      }
    }

    // Realistic likes and views.
    //
    // Seeded from the slug rather than Math.random(): this file is generated
    // and committed, so an unseeded source meant every re-import rewrote the
    // engagement numbers for all 41 posts and buried real content changes in
    // a few hundred lines of churn. Same slug now always yields same numbers.
    const rand = seededRandom(slug);
    const likes = Math.floor(220 + rand() * 350);
    const views = Math.floor(likes * (35 + rand() * 25));
    const commentCount = Math.floor(12 + rand() * 32);

    generatedPosts.push({
      slug,
      title,
      dek,
      topic,
      publishedAt,
      readingMinutes,
      likes,
      views,
      commentCount,
      tags,
      coverImage: coverImagePath,
      body: blocks,
    });

    postIndex++;
    console.log(
      `✓ [${postIndex}/${folders.length}] ${title} (${topic}) -> ${coverImagePath || "Gradient Cover"}`,
    );
  }

  // Generate the TypeScript file
  const tsContent = `// Automatically generated from docs/data/posts by scripts/import-local-posts.ts
import { postSchema, type Post } from "./schemas";

export const posts: Post[] = postSchema.array().parse(${JSON.stringify(generatedPosts, null, 2)});
`;

  fs.writeFileSync(postsOutputFile, tsContent, "utf-8");
  console.log(`\n🎉 Successfully generated ${generatedPosts.length} posts in ${postsOutputFile}`);
}

main().catch(console.error);
