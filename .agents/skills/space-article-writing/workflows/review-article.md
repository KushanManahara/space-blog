# Workflow: review an article

Use when the user wants an editorial and technical critique without modifying files, or as a pre-publish quality gate. Output concrete, severity-ranked findings the author can act on immediately.

## Steps

1. **Read top to bottom as the intended reader** without editing; note where clarity, momentum, or voice drops.
2. **Audit substance and structure** against [article-structure.md](../references/article-structure.md) and [technical-writing.md](../references/technical-writing.md): opening, central idea, progressive explanation, worked numbers, limits, and ending.
3. **Verify accuracy:** Cross-check key claims via `search_web`, verify calculations via `run_command`, check reference URLs, and flag any unsupported or fabricated detail as a Blocker.
4. **Audit prose and Space contract:** Run `python3 frontend/.agents/skills/space-article-writing/scripts/scan_post.py <slug>` (for posts in `posts.ts`), check [editorial-guidelines.md](../references/editorial-guidelines.md) for patterns regex cannot catch (uniform rhythm, template structure, superficial commentary), and verify [space-publication.md](../references/space-publication.md) rules.
5. **Check live rendering** via the `browser` subagent (`Model: "flash"`) when inspecting a live Space draft.
6. **Walk [editorial-checklist.md](../references/editorial-checklist.md)** and convert every failure into a finding.

## Severity levels

| Level       | Meaning                     | Examples                                                                                                                     |
| ----------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Blocker** | Must fix before publishing  | Factual error, fabricated detail, broken code/Pyodide, dead or non-supporting reference, private data, schema/render failure |
| **Major**   | Seriously weakens the piece | Unclear central idea, unexplained concept jump, missing inline visual, template structure, generic opening or summary ending |
| **Minor**   | Polish                      | Stray stock phrase, em dash or semicolon, overlong paragraph, minor caption tightening                                       |

## Output format

Order findings by **severity**, then by **position** in the article. For each finding give:

- **Where:** heading, paragraph, or opening words (with `file://` line link when in `posts.ts`).
- **What is wrong** in one sentence.
- **Why it matters** to the reader if non-obvious.
- **Concrete fix:** a rewritten passage preserving the author's meaning.

Group repeated patterns into one finding with a count and 2–3 examples. Include a brief note on what already works well so the author knows what to keep. Never speculate about whether text was AI-written; critique the writing itself.
