import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { TopicName } from "@/lib/content";

/** Standard Open Graph card size. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = "image/png";

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
  Findings: "linear-gradient(150deg, #BFDBFE 0%, #3B82F6 50%, #1E40AF 100%)",
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
 * Long titles have to stay inside two or three lines at 60px, so the font size
 * steps down rather than letting the card overflow.
 */
export function titleSize(title: string): number {
  if (title.length > 92) return 50;
  if (title.length > 64) return 58;
  return 66;
}

/** The brandmark, inlined as a data URI — ImageResponse cannot fetch by path. */
export async function loadOgLogo(): Promise<string> {
  const file = await readFile(join(process.cwd(), "public/logo.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}
