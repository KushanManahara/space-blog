"use client";

import * as React from "react";
import {
  AlignLeft,
  Bold,
  Code,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Plus,
  Quote,
  Redo2,
  Strikethrough,
  Superscript,
  Type,
  Underline,
  Undo2,
} from "lucide-react";

import { topics, type TopicName } from "@/lib/content";
import { cn } from "@/lib/utils";

const TOOLS = [
  { label: "Undo", icon: Undo2 },
  { label: "Redo", icon: Redo2 },
  { label: "Heading", icon: Type },
  { label: "Bullet list", icon: List },
  { label: "Numbered list", icon: ListOrdered },
  { label: "Bold", icon: Bold },
  { label: "Italic", icon: Italic },
  { label: "Strikethrough", icon: Strikethrough },
  { label: "Code", icon: Code },
  { label: "Underline", icon: Underline },
  { label: "Link", icon: Link2 },
  { label: "Superscript", icon: Superscript },
  { label: "Align left", icon: AlignLeft },
  { label: "Quote", icon: Quote },
] as const;

const MAX_TOPICS = 5;

/** Title, topic picker and formatting toolbar for the post composer. */
export function EditorComposer({ initialTitle = "" }: { initialTitle?: string }) {
  const [title, setTitle] = React.useState(initialTitle);
  const [selected, setSelected] = React.useState<TopicName[]>([]);

  const toggleTopic = (topic: TopicName) =>
    setSelected((current) => {
      if (current.includes(topic)) return current.filter((item) => item !== topic);
      return current.length < MAX_TOPICS ? [...current, topic] : current;
    });

  return (
    <>
      <div className="mx-auto max-w-[780px] px-[clamp(20px,5vw,32px)] pt-[clamp(28px,4vw,48px)]">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-line-1 bg-bg-1 px-4.5 py-2.5 text-[13.5px] font-semibold text-fg-2 transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out"
        >
          <ImageIcon className="size-[15px]" strokeWidth={1.75} />
          Add featured image
        </button>

        <label htmlFor="editor-title" className="sr-only">
          Post title
        </label>
        <input
          id="editor-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Write a title…"
          className="mt-5.5 w-full bg-transparent font-display text-[26px] leading-[1.1] font-bold tracking-[-0.03em] text-fg-1 outline-none placeholder:text-fg-faint sm:text-[clamp(32px,4.4vw,46px)]"
        />

        <div className="mt-5.5 flex flex-wrap gap-2">
          {topics.slice(0, 6).map((topic) => {
            const isSelected = selected.includes(topic.name);

            return (
              <button
                key={topic.slug}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleTopic(topic.name)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-[background-color,color,transform] duration-300 ease-expo active:scale-[0.96] active:duration-150 active:ease-out",
                  isSelected
                    ? "border-ink bg-ink text-on-ink"
                    : "border-line-1 bg-bg-2 text-fg-2 hover:border-line-2",
                )}
              >
                {topic.name}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-2.5 text-[12.5px] text-fg-3">
          Selected {selected.length} of {MAX_TOPICS} topics. Press backspace to remove the last one.
        </p>
      </div>

      <div className="sticky top-[63px] z-40 mt-6.5 border-y border-line-1 bg-veil/90 backdrop-blur-[18px] backdrop-saturate-[165%]">
        <div
          role="toolbar"
          aria-label="Formatting"
          className="no-scrollbar mx-auto flex max-w-[780px] items-center gap-1 overflow-x-auto px-[clamp(16px,5vw,32px)] py-2 text-fg-2 sm:flex-wrap sm:py-2.5"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.label}
                type="button"
                title={tool.label}
                aria-label={tool.label}
                className="inline-flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-[9px] text-fg-2 transition-[background-color,color] duration-250 ease-expo hover:bg-bg-3 hover:text-fg-1"
              >
                <Icon className="size-[17px]" strokeWidth={1.75} />
              </button>
            );
          })}

          <span aria-hidden className="mx-1.5 h-5.5 w-px shrink-0 bg-line-1" />

          <button
            type="button"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold text-fg-2 transition-colors duration-250 ease-expo hover:bg-bg-3"
          >
            <Plus className="size-3.5" strokeWidth={2} />
            Add block
          </button>
        </div>
      </div>
    </>
  );
}
