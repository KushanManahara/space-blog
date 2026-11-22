#!/usr/bin/env python3
"""Scan a Space article in src/lib/content/posts.ts for editorial and schema issues.

Usage:
    python3 .agents/skills/space-article-writing/scripts/scan_post.py <slug>
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

WATCH_RE = re.compile(
    r"\b("
    r"delve|pivotal|testament|tapestry|landscape|realm|underscore[sd]?|"
    r"showcas\w*|intricate|multifaceted|seamless\w*|robust|leverag\w*|"
    r"foster\w*|crucial|game-?changing|revolutioni[sz]e\w*|unlock\w*|"
    r"in today's|it's worth noting|it is important to note|let's dive|"
    r"in conclusion|in summary|not just [^.!?\n]{1,60}(?:it's|but)"
    r")\b",
    re.I,
)

KEY_VALUE_BULLET_RE = re.compile(r'^\s*"\*\*[^*]+:?\*\*:?')

SKIP_KEYS = {
    "code",
    "tex",
    "href",
    "src",
    "slug",
    "id",
    "filename",
    "xKey",
    "key",
    "coverImage",
    "youtubeId",
    "publishedAt",
    "topic",
    "variant",
    "kind",
}

PLAIN_TEXT_KEYS = {"caption", "note", "xLabel", "yLabel", "label", "source"}


def find_frontend_root() -> Path:
    cwd = Path.cwd()
    if (cwd / "src/lib/content/posts.ts").exists():
        return cwd
    if (cwd / "frontend/src/lib/content/posts.ts").exists():
        return cwd / "frontend"
    # Fallback relative to this script: frontend/.agents/skills/space-article-writing/scripts/scan_post.py
    return Path(__file__).resolve().parents[4]


def extract_post(posts_text: str, slug: str) -> str:
    marker = f'slug: "{slug}"'
    try:
        start = posts_text.index(marker)
    except ValueError:
        raise SystemExit(f"Error: slug {slug!r} not found in src/lib/content/posts.ts")
    nxt = re.search(r'^\s{2,4}slug:\s*"', posts_text[start + len(marker) :], re.M)
    return posts_text[start : start + len(marker) + nxt.start()] if nxt else posts_text[start:]


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python3 scan_post.py <slug>", file=sys.stderr)
        return 2

    slug = sys.argv[1]
    root = find_frontend_root()
    posts_path = root / "src/lib/content/posts.ts"
    post = extract_post(posts_path.read_text(encoding="utf-8"), slug)

    # Strip template-literal code/mermaid blocks before scanning prose strings.
    post_no_templates = re.sub(r"(code|tex):\s*`[\s\S]*?`", r"\1: ''", post)
    post_no_templates = re.sub(r'tex:\s*String\.raw`[\s\S]*?`', "tex: ''", post_no_templates)

    field_pat = re.compile(
        r'(\w+):\s*("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\')'
        r'|^\s*("(?:[^"\\]|\\.)*"),?\s*$',
        re.M,
    )

    prose_lines: list[str] = []
    plain_md_hits: list[str] = []
    kv_bullets: list[str] = []

    for m in field_pat.finditer(post_no_templates):
        key = m.group(1)
        raw_val = m.group(2) or m.group(3)
        if not raw_val:
            continue
        val = raw_val[1:-1]
        if key in SKIP_KEYS:
            continue
        prose_lines.append(val)

        if key in PLAIN_TEXT_KEYS and ("**" in val or "`" in val):
            plain_md_hits.append(f"{key}: {val[:90]}")

        if key is None and KEY_VALUE_BULLET_RE.match(m.group(0)):
            kv_bullets.append(val[:90])

    # Check heading Markdown (TOC renders plain text) and duplicate heading IDs.
    heading_ids = re.findall(r'kind:\s*"heading"[\s\S]{0,160}?id:\s*"([^"]+)"', post)
    dup_ids = sorted({hid for hid in heading_ids if heading_ids.count(hid) > 1})
    heading_texts = re.findall(r'kind:\s*"heading"[\s\S]{0,200}?text:\s*"([^"]+)"', post)
    heading_md = [t for t in heading_texts if "**" in t or "`" in t]

    # Check local image assets exist under public/.
    local_srcs = re.findall(r'(?:coverImage|src):\s*"(/[^"]+)"', post)
    missing_assets = [s for s in local_srcs if not (root / "public" / s.lstrip("/")).exists()]

    body = "\n".join(prose_lines)
    em_dashes = body.count("—")
    semicolons = body.count(";")

    print(f"=== Space Editorial Scan: {slug} ===")
    print(f"em dashes in prose:      {em_dashes}")
    print(f"semicolons in prose:     {semicolons}")
    print(f"markdown in plain fields:{len(plain_md_hits)}")
    for hit in plain_md_hits:
        print(f"  [plain-md] {hit}")
    print(f"markdown in headings:    {len(heading_md)}")
    for hit in heading_md:
        print(f"  [heading-md] {hit}")
    print(f"duplicate heading ids:   {dup_ids}")
    print(f"missing public assets:   {missing_assets}")
    print(f"key-value bold bullets:  {len(kv_bullets)}")
    for hit in kv_bullets:
        print(f"  [kv-bullet] {hit}")

    watch_hits = 0
    for line in prose_lines:
        for hit in WATCH_RE.finditer(line):
            watch_hits += 1
            ctx = line[max(0, hit.start() - 35) : hit.end() + 35]
            print(f"  [watch] {hit.group(0)!r} | ...{ctx}...")
    if watch_hits == 0:
        print("watch-list hits:         0")
    else:
        print(f"watch-list hits (review): {watch_hits}")

    hard_failures = em_dashes + semicolons + len(plain_md_hits) + len(heading_md) + len(dup_ids) + len(missing_assets)
    return 1 if hard_failures > 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
