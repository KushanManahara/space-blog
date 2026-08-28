import { author, site, siteUrl, type ArticleBlock, type Post } from "@/lib/content";
import { formatDate } from "@/lib/format";

/**
 * Strips HTML tags while preserving basic markdown emphasis.
 */
function htmlToMarkdown(html: string): string {
  return html
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
    .replace(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/**
 * Converts a structured article block into formatted markdown.
 */
function blockToMarkdown(block: ArticleBlock): string {
  switch (block.kind) {
    case "paragraph":
      return htmlToMarkdown(block.html);

    case "heading":
      return `\n## ${block.text}\n`;

    case "list":
      return block.items.map((item) => `* ${htmlToMarkdown(item)}`).join("\n");

    case "callout":
      return `> **${block.title}**\n> ${htmlToMarkdown(block.body).replace(/\n/g, "\n> ")}`;

    case "code": {
      const ext = block.filename.split(".").pop() || "";
      return `\`\`\`${ext}\n// ${block.filename}\n${block.code}\n\`\`\``;
    }

    case "formula": {
      const tex = block.tex ?? htmlToMarkdown(block.html ?? "");
      const caption = block.caption ? `\n*${block.caption}*` : "";
      return `$$\n${tex}\n$$${caption}`;
    }

    case "mermaid": {
      const caption = block.caption ? `\n*Figure: ${block.caption}*` : "";
      return `\`\`\`mermaid\n${block.code}\n\`\`\`${caption}`;
    }

    case "image": {
      const caption = block.caption ? `\n*${block.caption}*` : "";
      const src = block.src.startsWith("http") ? block.src : `${siteUrl}${block.src}`;
      return `![${block.alt}](${src})${caption}`;
    }

    case "table": {
      const headerRow = `| ${block.headers.join(" | ")} |`;
      const dividerRow = `| ${block.headers.map(() => "---").join(" | ")} |`;
      const bodyRows = block.rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
      const caption = block.caption ? `\n*Table: ${block.caption}*` : "";
      return `${headerRow}\n${dividerRow}\n${bodyRows}${caption}`;
    }

    case "correction": {
      const was = block.was ? `\n> *Original statement:* ~${htmlToMarkdown(block.was)}~` : "";
      return `> **[Correction — ${formatDate(block.date)}]**\n> ${htmlToMarkdown(block.note)}${was}`;
    }

    case "figure": {
      const seriesList = block.series.map((s) => `- ${s.label}`).join("\n");
      const caption = block.caption ? `\n*${block.caption}*` : "";
      return `### ${block.title}\n${seriesList}${caption}`;
    }

    case "footnotes":
      return `\n---\n**Footnotes:**\n${block.items.map((item, i) => `[${i + 1}] ${htmlToMarkdown(item)}`).join("\n")}`;

    default:
      return "";
  }
}

/**
 * Generates the full article content in clean Markdown with top metadata
 * and footer copyright watermark.
 */
export function formatArticleToMarkdown(post: Post): string {
  const currentYear = new Date().getFullYear();
  const articleUrl = `${siteUrl}/articles/${post.slug}`;
  const formattedDate = formatDate(post.publishedAt, "long");

  const header = [
    `# ${post.title}`,
    ``,
    `> ${post.dek}`,
    ``,
    `**Author:** ${author.name} (${author.handle})`,
    `**Publication:** ${site.name} — ${site.tagline}`,
    `**URL:** ${articleUrl}`,
    `**Published:** ${formattedDate} | **Topic:** ${post.topic} | **Reading time:** ${post.readingMinutes} min`,
    post.tags.length > 0 ? `**Tags:** ${post.tags.join(", ")}` : "",
    ``,
    `---`,
    ``,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const body = post.body.map(blockToMarkdown).join("\n\n");

  const footer = [
    ``,
    `---`,
    ``,
    `### Copyright & Attribution Notice`,
    `© ${currentYear} ${author.name}. All rights reserved.`,
    ``,
    `Originally published on **${site.name}**: [${articleUrl}](${articleUrl})`,
    `Author: **${author.name}** · [${author.email}](mailto:${author.email}) · [GitHub](${author.github}) · [LinkedIn](${author.linkedin})`,
    ``,
    `*This material is the intellectual property of ${author.name}. Unauthorized commercial reproduction, redistribution, or modification without written permission is prohibited.*`,
  ].join("\n");

  return `${header}${body}\n${footer}`;
}

/**
 * Generates rich HTML with embedded CSS for pasting into rich text editors (Notion, Docs, Notes).
 */
export function formatArticleToHtml(post: Post): string {
  const currentYear = new Date().getFullYear();
  const articleUrl = `${siteUrl}/articles/${post.slug}`;
  const formattedDate = formatDate(post.publishedAt, "long");

  const blocksHtml = post.body
    .map((block) => {
      switch (block.kind) {
        case "paragraph":
          return `<p style="margin: 1em 0; line-height: 1.65; color: #1e293b;">${block.html}</p>`;
        case "heading":
          return `<h2 style="margin: 1.5em 0 0.5em; font-size: 1.5em; font-weight: 700; color: #0f172a;">${block.text}</h2>`;
        case "list":
          return `<ul style="margin: 1em 0; padding-left: 1.5em; color: #1e293b;">${block.items.map((i) => `<li style="margin-bottom: 0.35em;">${i}</li>`).join("")}</ul>`;
        case "code":
          return `<div style="margin: 1.5em 0; background: #0f172a; border-radius: 8px; padding: 1em; overflow-x: auto;"><div style="color: #94a3b8; font-size: 12px; margin-bottom: 0.5em; font-family: monospace;">// ${block.filename}</div><pre style="margin: 0; color: #f8fafc; font-family: monospace; font-size: 13.5px; line-height: 1.5;"><code>${escapeHtml(block.code)}</code></pre></div>`;
        case "callout":
          return `<blockquote style="margin: 1.5em 0; padding: 1em 1.25em; border-left: 4px solid #0062d2; background: #f0f7ff; color: #0f172a; border-radius: 0 8px 8px 0;"><strong style="color: #0062d2;">${block.title}</strong><p style="margin: 0.5em 0 0;">${block.body}</p></blockquote>`;
        case "correction":
          return `<div style="margin: 1.5em 0; padding: 1em; border: 1px solid #f59e0b; background: #fffbeb; border-radius: 8px; color: #92400e;"><strong>Correction (${block.date}):</strong> ${block.note}</div>`;
        case "table":
          return `<div style="margin: 1.5em 0; overflow-x: auto;"><table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;"><thead style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;"><tr>${block.headers.map((h) => `<th style="padding: 10px; font-weight: 600;">${h}</th>`).join("")}</tr></thead><tbody>${block.rows.map((row) => `<tr style="border-bottom: 1px solid #f1f5f9;">${row.map((cell) => `<td style="padding: 10px;">${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        default:
          return `<p style="margin: 1em 0; color: #1e293b;">${escapeHtml(blockToMarkdown(block))}</p>`;
      }
    })
    .join("\n");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #0f172a;">
      <header style="border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5em; margin-bottom: 2em;">
        <div style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${post.topic}</div>
        <h1 style="font-size: 2.25em; font-weight: 800; line-height: 1.2; margin: 0.4em 0 0.2em; color: #0f172a;">${post.title}</h1>
        <p style="font-size: 1.2em; line-height: 1.5; color: #475569; margin: 0.5em 0 1.2em;">${post.dek}</p>
        <div style="font-size: 14px; color: #64748b;">
          <strong>${author.name}</strong> · ${formattedDate} · ${post.readingMinutes} min read
          <br />
          <span style="font-size: 13px; color: #0062d2;">${articleUrl}</span>
        </div>
      </header>

      <main>
        ${blocksHtml}
      </main>

      <footer style="margin-top: 3em; padding-top: 1.5em; border-top: 2px solid #e2e8f0; font-size: 13px; color: #64748b; line-height: 1.6;">
        <p style="font-weight: 600; color: #0f172a; margin-bottom: 0.5em;">
          © ${currentYear} ${author.name}. All rights reserved.
        </p>
        <p style="margin: 0.25em 0;">
          Originally published on <strong>${site.name}</strong> (<a href="${articleUrl}" style="color: #0062d2; text-decoration: underline;">${articleUrl}</a>).
        </p>
        <p style="margin: 0.25em 0; font-style: italic; color: #94a3b8;">
          Authored by ${author.name} (${author.handle}) · ${site.tagline}
        </p>
      </footer>
    </div>
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Copies the full article to the clipboard as both Markdown and rich HTML,
 * complete with watermarks and copyright metadata.
 */
export async function copyArticleToClipboard(post: Post): Promise<boolean> {
  const markdown = formatArticleToMarkdown(post);
  const html = formatArticleToHtml(post);

  try {
    if (typeof window !== "undefined" && navigator.clipboard && window.ClipboardItem) {
      const textBlob = new Blob([markdown], { type: "text/plain" });
      const htmlBlob = new Blob([html], { type: "text/html" });
      const item = new ClipboardItem({
        "text/plain": textBlob,
        "text/html": htmlBlob,
      });
      await navigator.clipboard.write([item]);
      return true;
    }
  } catch (err) {
    console.warn("ClipboardItem write failed, trying text/plain fallback:", err);
  }

  // Text-only fallback via clipboard.writeText
  try {
    if (typeof window !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(markdown);
      return true;
    }
  } catch (err) {
    console.warn("navigator.clipboard.writeText failed:", err);
  }

  // Synchronous textarea fallback for legacy or restricted contexts
  try {
    if (typeof document !== "undefined") {
      const area = document.createElement("textarea");
      area.value = markdown;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    }
  } catch {
    // Ignore error
  }

  return false;
}
