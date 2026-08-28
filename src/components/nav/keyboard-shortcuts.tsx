"use client";

import * as React from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/**
 * Every shortcut the site listens for, in one place.
 *
 * The bindings themselves stay where they are handled — `CommandMenuProvider`
 * owns ⌘K, `ReaderModeProvider` owns R — so this list is documentation, not a
 * second implementation. Keep it in step when a binding is added.
 */
const shortcuts: Array<{ keys: string[]; label: string; note?: string }> = [
  { keys: ["⌘", "K"], label: "Open search", note: "Ctrl K on Windows and Linux" },
  { keys: ["R"], label: "Toggle reader mode", note: "On an article page" },
  { keys: ["?"], label: "Show this list" },
  { keys: ["Esc"], label: "Close whatever is open" },
];

/**
 * The `?` shortcut sheet.
 *
 * Two of these bindings already worked but were never advertised anywhere, so
 * in practice only ⌘K was discoverable. `?` is the long-standing convention for
 * "what else can I press".
 */
export function KeyboardShortcuts() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "?" || event.metaKey || event.ctrlKey || event.altKey) return;

      // Never steal the key from someone writing a comment or a search query.
      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      event.preventDefault();
      setOpen((current) => !current);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[460px] p-4.5 sm:p-6.5">
        <DialogTitle className="border-b border-line-1 pb-4.5">Keyboard shortcuts</DialogTitle>

        <dl className="mt-5 flex flex-col gap-1">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.label}
              className="flex items-center justify-between gap-6 rounded-md px-2 py-2.5"
            >
              <dt>
                <span className="block text-[14.5px] text-fg-1">{shortcut.label}</span>
                {shortcut.note ? (
                  <span className="mt-0.5 block text-[12.5px] text-fg-3">{shortcut.note}</span>
                ) : null}
              </dt>
              <dd className="flex shrink-0 items-center gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="inline-flex min-w-[26px] items-center justify-center rounded-sm border border-line-1 bg-bg-3 px-1.5 py-1 font-mono text-[12px] font-semibold text-fg-2"
                  >
                    {key}
                  </kbd>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}
