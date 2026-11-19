/** Escapes the five characters that can break out of HTML text or an attribute. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Only schemes that are safe to put in an href.
 *
 * `[click](javascript:...)` used to pass straight through into the attribute.
 * Nothing user-submitted reaches this function today — article bodies are
 * committed to the repo and comments render as escaped JSX text — but this is a
 * string-to-HTML converter feeding `dangerouslySetInnerHTML`, and the distance
 * between "only trusted input" and "one new caller" is a single import.
 */
function safeHref(url: string): string {
  const trimmed = url.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return escapeHtml(trimmed);
  // Relative links: in-site paths and fragments.
  if (/^[/#?]/.test(trimmed)) return escapeHtml(trimmed);
  return "#";
}

/**
 * Converts markdown inline syntax (**bold**, *italic*, `code`, [link](url), ~~strike~~)
 * to valid HTML strings while preserving any existing HTML tags.
 */
export function markdownToHtml(raw: string): string {
  if (!raw) return "";

  // Code spans come out first and go back in last. Otherwise the emphasis rules
  // chew through their contents: `GOOGLE_API_KEY` would render as GOOGLE<em>API</em>KEY.
  const codeSpans: string[] = [];
  const withoutCode = raw.replace(/`([^`]+)`/g, (_, code: string) => {
    codeSpans.push(code);
    return `\u0000${codeSpans.length - 1}\u0000`;
  });

  // Link targets are held out of the emphasis passes the same way, so an
  // underscore in a URL (`foo_bar_baz`) is not turned into <em> inside href.
  // One level of balanced parentheses is allowed in the URL, as in
  // `wiki/Pascal_(unit)`.
  const hrefs: string[] = [];

  return (
    withoutCode
      // Links: [text](url). The href goes through a scheme allowlist and the
      // label is escaped, so neither can close the attribute nor open a tag.
      .replace(/\[([^\]]+)\]\(((?:[^()]|\([^()]*\))+)\)/g, (_, label: string, url: string) => {
        hrefs.push(safeHref(url));
        return `<a href="\u0001${hrefs.length - 1}\u0001" target="_blank" rel="noopener noreferrer" class="font-medium text-fg-link underline decoration-line-brand underline-offset-4 transition-colors hover:text-brand">${escapeHtml(label)}</a>`;
      })
      // Ensure raw HTML external links open in a new tab
      .replace(/<a\s+([^>]*href=["']https?:\/\/[^"']+["'][^>]*)>/gi, (match, attrs) => {
        if (/target\s*=/i.test(attrs)) return match;
        return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
      })
      // Bold: **text** or __text__
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-fg-1">$1</strong>')
      .replace(/__([^_]+)__/g, '<strong class="font-bold text-fg-1">$1</strong>')
      // Italic: *text* or _text_ (excluding inside HTML tags)
      .replace(/(^|[^\*])\*([^*]+)\*([^\*]|$)/g, '$1<em class="text-fg-prose italic">$2</em>$3')
      .replace(/(^|[^_])_([^_]+)_([^_]|$)/g, '$1<em class="text-fg-prose italic">$2</em>$3')
      // Strikethrough: ~~text~~
      .replace(/~~([^~]+)~~/g, '<del class="text-fg-3 line-through">$1</del>')
      // Inline code: restored verbatim
      .replace(
        /\u0000(\d+)\u0000/g,
        (_, index: string) =>
          `<code class="rounded border border-line-1 bg-bg-2 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-brand">${escapeHtml(codeSpans[Number(index)])}</code>`,
      )
      // Link targets: restored verbatim
      .replace(/\u0001(\d+)\u0001/g, (_, index: string) => hrefs[Number(index)])
  );
}

/**
 * Inline markdown reduced to its words, for surfaces that print text rather
 * than HTML (the table of contents, the header's section label).
 */
export function markdownToText(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\((?:[^()]|\([^()]*\))+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(\*\*|__|~~)(.+?)\1/g, "$2")
    .replace(/(^|[^\w*])[*_]([^*_]+)[*_](?=[^\w*]|$)/g, "$1$2")
    .trim();
}
