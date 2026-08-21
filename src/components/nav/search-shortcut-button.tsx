"use client";

import { useCommandMenu } from "@/components/nav/command-menu";

/** Opens the ⌘K palette from anywhere that needs a visible entry point. */
export function SearchShortcutButton() {
  const commandMenu = useCommandMenu();

  return (
    <button
      type="button"
      onClick={commandMenu.open}
      className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-line-2 bg-veil/70 px-6 py-3.5 text-[15px] font-semibold text-fg-1 transition-[transform,box-shadow] duration-[350ms] ease-bounce hover:-translate-y-0.5 hover:shadow-md active:scale-[0.96] active:duration-150 active:ease-out"
    >
      Search
      <span className="rounded-[7px] border border-line-1 bg-bg-3 px-[7px] py-1 text-[11.5px] font-semibold text-fg-3">
        ⌘K
      </span>
    </button>
  );
}
