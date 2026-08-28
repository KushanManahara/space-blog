import type { Post, ArticleBlock } from "@/lib/content";

export interface AudioSegment {
  id: number;
  text: string;
  label?: string;
  domId?: string;
  blockIndex?: number;
  wordCount: number;
  estimatedSec: number;
}

export interface ArticleAudioData {
  title: string;
  author: string;
  segments: AudioSegment[];
  totalWords: number;
  totalEstimatedSec: number;
}

/**
 * Strips HTML tags, Markdown syntax, and abnormal symbols for natural, fluent text-to-speech.
 * Ensures the synthesizer never says "hash", "asterisk", "backtick", or raw URLs.
 */
export function cleanTextForSpeech(input: string): string {
  if (!input) return "";

  let text = input;

  // 1. Strip raw HTML blocks like code/style/script
  text = text
    .replace(/<pre[\s\S]*?<\/pre>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ");

  // 2. Decode HTML entities
  text = text
    .replace(/&amp;/g, " and ")
    .replace(/&lt;/g, " less than ")
    .replace(/&gt;/g, " greater than ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  // 3. Strip Markdown images: ![alt](url) -> alt
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");

  // 4. Strip Markdown links: [text](url) -> text (removes the URL completely)
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  // 5. Strip Markdown header hashes anywhere in text: # Header, ## Header -> Header (removes "hash")
  text = text.replace(/(^|\s)#{1,6}\s+/gm, "$1");

  // 6. Strip Markdown bold & italic markers: **text**, __text__, *text*, _text_
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");

  // 7. Strip Markdown inline code backticks: `code` -> code
  text = text.replace(/`([^`]+)`/g, "$1");

  // 8. Strip Markdown blockquotes: > Quote -> Quote
  text = text.replace(/^\s*>\s+/gm, "");

  // 9. Strip Markdown horizontal rules: ---, ***, ___
  text = text.replace(/^[-*_]{3,}\s*$/gm, "");

  // 10. Strip leading bullet points / list numbers: - Item, * Item, 1. Item
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");

  // 11. Clean hashtag prefixes on tags: #mcp -> mcp, #docker -> docker
  text = text.replace(/#([a-zA-Z0-9_-]+)/g, "$1");

  // 12. Strip any remaining stray hash characters (#) so "hash" is never spoken
  text = text.replace(/#/g, " ");

  // 12. Clean LaTeX math delimiters: $E = mc^2$ -> E = mc^2
  text = text.replace(/\$\$?/g, "");

  // 13. Normalize whitespace & punctuation spacing
  text = text
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();

  return text;
}

/**
 * Estimates reading time in seconds given a word count and speech rate (default 150 wpm).
 */
export function estimateAudioDuration(words: number, rate = 1.0): number {
  const baseWpm = 150;
  const effectiveWpm = baseWpm * rate;
  return Math.max(1, Math.round((words / effectiveWpm) * 60));
}

/**
 * Formats seconds into MM:SS format.
 */
export function formatAudioTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/**
 * Extracts clean, sequential spoken segments from an article for audio playback,
 * mapping each segment to its DOM anchor ID and block index.
 */
export function extractArticleAudio(post: Post): ArticleAudioData {
  const segments: AudioSegment[] = [];
  let nextId = 0;

  // 1. Intro Segment: Clean Title and Dek
  const cleanTitle = cleanTextForSpeech(post.title);
  const cleanDek = post.dek ? cleanTextForSpeech(post.dek) : "";
  const introText = `${cleanTitle}. ${cleanDek}`.trim();
  const introWords = introText.split(/\s+/).filter(Boolean).length;

  segments.push({
    id: nextId++,
    text: introText,
    label: "Introduction",
    domId: "article-header-intro",
    wordCount: introWords,
    estimatedSec: estimateAudioDuration(introWords),
  });

  // 2. Iterate through body blocks
  post.body.forEach((block, blockIndex) => {
    switch (block.kind) {
      case "heading": {
        const text = cleanTextForSpeech(block.text);
        if (text) {
          const words = text.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text, // Speaks directly as title, without saying "Section:"
            label: text,
            domId: block.id || `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      case "paragraph": {
        const clean = cleanTextForSpeech(block.html);
        if (clean.length > 5) {
          const words = clean.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text: clean,
            domId: `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      case "list": {
        for (const item of block.items) {
          const clean = cleanTextForSpeech(item);
          if (clean.length > 3) {
            const words = clean.split(/\s+/).filter(Boolean).length;
            segments.push({
              id: nextId++,
              text: clean,
              domId: `article-block-${blockIndex}`,
              blockIndex,
              wordCount: words,
              estimatedSec: estimateAudioDuration(words),
            });
          }
        }
        break;
      }

      case "callout": {
        const cleanTitle = block.title ? cleanTextForSpeech(block.title) : "";
        const cleanBody = cleanTextForSpeech(block.body);
        const text = `${cleanTitle ? `${cleanTitle}. ` : ""}${cleanBody}`.trim();
        if (text) {
          const words = text.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text,
            label: cleanTitle || "Note",
            domId: `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      case "code": {
        if (block.filename) {
          const cleanName = cleanTextForSpeech(block.filename);
          const text = `Code example for ${cleanName}.`;
          const words = text.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text,
            label: cleanName,
            domId: `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      case "image": {
        if (block.caption) {
          const clean = cleanTextForSpeech(block.caption);
          const words = clean.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text: clean,
            label: "Figure caption",
            domId: `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      case "figure": {
        if (block.title || block.caption) {
          const cleanTitle = block.title ? cleanTextForSpeech(block.title) : "";
          const cleanCaption = block.caption ? cleanTextForSpeech(block.caption) : "";
          const text = `${cleanTitle}. ${cleanCaption}`.trim();
          const words = text.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text,
            label: cleanTitle || "Chart",
            domId: `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      case "mermaid": {
        if (block.caption) {
          const clean = cleanTextForSpeech(block.caption);
          const words = clean.split(/\s+/).filter(Boolean).length;
          segments.push({
            id: nextId++,
            text: clean,
            label: "Diagram",
            domId: `article-block-${blockIndex}`,
            blockIndex,
            wordCount: words,
            estimatedSec: estimateAudioDuration(words),
          });
        }
        break;
      }

      default:
        break;
    }
  });

  const totalWords = segments.reduce((sum, seg) => sum + seg.wordCount, 0);
  const totalEstimatedSec = segments.reduce((sum, seg) => sum + seg.estimatedSec, 0);

  return {
    title: post.title,
    author: "Kushan Manahara",
    segments,
    totalWords,
    totalEstimatedSec,
  };
}

/**
 * Selects the best available natural English voice from the browser's speech synthesis engine.
 */
export function getBestEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Prefer high-quality enhanced / natural voices on macOS, iOS, Windows, Android, Chrome
  const preferredVoiceNames = [
    "Samantha (Enhanced)",
    "Siri",
    "Ava (Enhanced)",
    "Daniel (Enhanced)",
    "Karen (Enhanced)",
    "Google US English",
    "Microsoft Jenny Online (Natural)",
    "Microsoft Guy Online (Natural)",
    "Microsoft Aria Online (Natural)",
    "Samantha",
    "Daniel",
    "Karen",
    "Alex",
  ];

  for (const name of preferredVoiceNames) {
    const found = voices.find(
      (v) => v.name.toLowerCase().includes(name.toLowerCase()) && v.lang.startsWith("en"),
    );
    if (found) return found;
  }

  // Fallback to any en-US or en voice
  return (
    voices.find((v) => v.lang === "en-US") ??
    voices.find((v) => v.lang.startsWith("en")) ??
    voices[0] ??
    null
  );
}
