import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";

import type { TopicName } from "@/lib/content";

/** Standard Open Graph card size. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

/**
 * Bump whenever the article OG card layout changes so social crawlers
 * (LinkedIn, Facebook, WhatsApp, X) and CDN edge caches never hold onto a
 * stale `card.png` from an earlier design.
 */
export const OG_CARD_VERSION = "2";

/**
 * Topic gradients, mirroring `topicVisuals` in the app.
 *
 * They are duplicated rather than imported because `topic-visuals.ts` pulls in
 * lucide icon components, and dragging React components into an edge-rendered
 * image route is a lot of weight for what is really just seven colour ramps.
 * If a topic gradient changes there, change it here too.
 */
export const OG_TOPIC_GRADIENT: Record<TopicName, string> = {
  Inference: "linear-gradient(145deg, #60A5FA 0%, #007AFF 52%, #004DA8 100%)",
  Systems: "linear-gradient(150deg, #93C5FD 0%, #2563EB 55%, #0F172A 100%)",
  Evaluation: "linear-gradient(155deg, #7DD3FC 0%, #0284C7 55%, #0369A1 100%)",
  Engineering: "linear-gradient(150deg, #BAE6FD 0%, #0EA5E9 50%, #0062D2 100%)",
  Experiments: "linear-gradient(150deg, #93C5FD 0%, #007AFF 50%, #1E3A8A 100%)",
  Research: "linear-gradient(155deg, #38BDF8 0%, #1D4ED8 55%, #0B192C 100%)",
  Career: "linear-gradient(150deg, #BFDBFE 0%, #3B82F6 50%, #1E40AF 100%)",
};

/**
 * The site's display face, loaded from disk so cards use real Space typography
 * rather than a generic fallback. Read once per module instance.
 *
 * These are the only two `.ttf` files left in the repo, and they are here for
 * this function alone: satori (behind `ImageResponse`) cannot parse WOFF2, so
 * the browser faces were converted to WOFF2 for the render-blocking download
 * while the card renderer keeps TrueType. Nothing ships these to a reader —
 * they are read at build time and never served.
 */
export async function loadOgFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/Louis_George_Cafe.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/Louis_George_Cafe_Bold.ttf")),
  ]);

  return [
    { name: "Louis George Cafe", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Louis George Cafe", data: bold, style: "normal" as const, weight: 700 as const },
  ];
}

/**
 * Long titles have to stay inside three or four lines so they never collide
 * with the accent rule or excerpt. Split-layout cards (with a cover image on
 * the right) have a narrower text column and step down one notch earlier.
 */
export function titleSize(title: string, hasCover = false): number {
  if (hasCover) {
    if (title.length > 80) return 38;
    if (title.length > 56) return 44;
    if (title.length > 36) return 52;
    return 58;
  }
  if (title.length > 92) return 50;
  if (title.length > 64) return 58;
  return 66;
}

/**
 * Trim an article dek cleanly for OG cards without dangling trailing articles
 * or conjunctions ("and a…", "The…"). Prefers a complete first sentence when
 * it fits within the budget.
 */
export function formatOgExcerpt(dek: string, maxChars = 116): string {
  const clean = dek.trim().replace(/\s+/g, " ");
  if (clean.length <= maxChars) return clean;

  // Prefer the first complete sentence if it is neither too short nor too long.
  const sentenceEnd = clean.search(/[.!?](?:\s|$)/);
  if (sentenceEnd >= 48 && sentenceEnd + 1 <= maxChars + 38) {
    return clean.slice(0, sentenceEnd + 1);
  }

  let cut = clean.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 40) cut = cut.slice(0, lastSpace);

  // Drop trailing punctuation or weak hanging words before appending an ellipsis.
  cut = cut.replace(/[,;:\-–—]+$/, "").trim();
  const hanging = /\s+(?:and|or|but|with|for|of|in|on|at|to|by|from|the|a|an)$/i;
  while (hanging.test(cut) && cut.length > 40) {
    cut = cut
      .replace(hanging, "")
      .replace(/[,;:\-–—]+$/, "")
      .trim();
  }

  return `${cut}…`;
}

/** The brandmark, inlined as a data URI — ImageResponse cannot fetch by path. */
export async function loadOgLogo(): Promise<string> {
  const file = await readFile(join(process.cwd(), "public/logo.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export interface OgCoverAsset {
  dataUri: string;
  mime: string;
  width?: number;
  height?: number;
}

/** Detect real image MIME type from file magic bytes rather than trusting extensions. */
function sniffImageMime(buffer: Buffer): string | null {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (buffer.length >= 6) {
    const header = buffer.toString("ascii", 0, 6);
    if (header === "GIF87a" || header === "GIF89a") return "image/gif";
  }
  const head = buffer.toString("utf8", 0, Math.min(buffer.length, 512)).trimStart();
  if (head.startsWith("<svg") || (head.startsWith("<?xml") && head.includes("<svg"))) {
    return "image/svg+xml";
  }
  return null;
}

/** Read intrinsic pixel dimensions from PNG IHDR, JPEG SOF, GIF, or SVG viewBox. */
function readCoverDimensions(buffer: Buffer, mime: string): { width?: number; height?: number } {
  if (mime === "image/png" && buffer.length >= 24 && buffer.toString("ascii", 12, 16) === "IHDR") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (mime === "image/jpeg") {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      offset += 2;
      // Standalone markers without length
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 2 > buffer.length) break;
      const segmentLength = buffer.readUInt16BE(offset);
      // SOF0..SOF3, SOF5..SOF7, SOF9..SOF11, SOF13..SOF15 carry height & width
      const isSof =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSof && offset + 7 < buffer.length) {
        return {
          height: buffer.readUInt16BE(offset + 3),
          width: buffer.readUInt16BE(offset + 5),
        };
      }
      if (segmentLength < 2) break;
      offset += segmentLength;
    }
  }
  if (mime === "image/gif" && buffer.length >= 10) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (mime === "image/svg+xml") {
    const head = buffer.toString("utf8", 0, Math.min(buffer.length, 1024));
    const vb = head.match(/viewBox=["'][\d.\s-]+?([\d.]+)\s+([\d.]+)["']/i);
    if (vb) {
      const width = Number(vb[1]);
      const height = Number(vb[2]);
      if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
        return { width, height };
      }
    }
  }
  return {};
}

/** Resolve a local `/…` public asset path safely, returning `null` on traversal. */
function resolvePublicAssetPath(assetPath?: string): string | null {
  if (!assetPath || !assetPath.startsWith("/")) return null;
  const publicDir = resolve(process.cwd(), "public");
  const target = resolve(publicDir, assetPath.slice(1));
  if (!target.startsWith(`${publicDir}${sep}`)) return null;
  return target;
}

/**
 * Load an article's local cover image from `public/` as an inline data URI for
 * `ImageResponse` (satori). Sniffs real magic bytes (so a JPEG saved with a
 * `.png` extension still renders cleanly), blocks path traversal, and returns
 * `null` for missing or unsupported files so the card falls back gracefully.
 */
export async function loadOgCoverImage(coverImage?: string): Promise<OgCoverAsset | null> {
  const target = resolvePublicAssetPath(coverImage);
  if (!target) return null;

  try {
    const file = await readFile(target);
    const mime = sniffImageMime(file);
    if (!mime) return null;

    const { width, height } = readCoverDimensions(file, mime);
    return {
      dataUri: `data:${mime};base64,${file.toString("base64")}`,
      mime,
      width,
      height,
    };
  } catch {
    return null;
  }
}

/**
 * Deterministic 8-character content fingerprint for an article's `card.png` URL
 * (`?v=<hash>`). Rotates automatically whenever the card layout version,
 * article title/dek/topic, or the underlying cover image file bytes change,
 * preventing social crawlers like LinkedIn from reusing stale cached previews.
 */
export async function articleOgCardVersion(post: {
  title: string;
  dek: string;
  topic: TopicName;
  coverImage?: string;
}): Promise<string> {
  const hash = createHash("sha256");
  hash.update(
    `${OG_CARD_VERSION}\0${post.title}\0${post.dek}\0${post.topic}\0${post.coverImage ?? ""}`,
  );

  const target = resolvePublicAssetPath(post.coverImage);
  if (target) {
    try {
      hash.update(await readFile(target));
    } catch {
      // Missing cover falls back to topic gradient; metadata fields still hash cleanly.
    }
  }

  return hash.digest("hex").slice(0, 8);
}
