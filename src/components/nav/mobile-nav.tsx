"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutGrid, Menu, X } from "lucide-react";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { primaryNav, routes } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The only way to reach the primary nav below `md`, where the header
 * collapses the link row entirely. Reuses the same Dialog primitive as the
 * command menu and share sheet rather than a one-off sheet component.
 */
export function MobileNav({ isActive }: { isActive: (href: string) => boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-3 transition-[transform,box-shadow,color] duration-300 ease-bounce hover:-translate-y-px hover:text-fg-2 hover:shadow-sm active:scale-[0.96] active:duration-150 active:ease-out md:hidden"
      >
        <Menu className="size-4.5" strokeWidth={1.75} />
      </button>

      <DialogContent align="top" className="max-w-[360px] p-5">
        <div className="flex items-center justify-between gap-3">
          <DialogTitle className="text-[16px]">Menu</DialogTitle>
          <DialogClose className="inline-flex size-7.5 cursor-pointer items-center justify-center rounded-full text-fg-3 transition-colors duration-300 ease-expo hover:bg-bg-3">
            <X className="size-[15px]" strokeWidth={2} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <nav aria-label="Primary" className="mt-3.5 flex flex-col gap-1">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3.5 py-3 text-[15px] font-medium transition-colors duration-300 ease-expo",
                isActive(item.href)
                  ? "bg-bg-3 text-fg-1"
                  : "text-fg-2 hover:bg-veil/70 hover:text-fg-1",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={routes.studio}
          onClick={() => setOpen(false)}
          className="mt-3.5 flex items-center justify-center gap-2 rounded-md bg-ink px-3.5 py-3 text-[14.5px] font-semibold text-on-ink transition-colors duration-300 ease-expo hover:bg-n-800"
        >
          <LayoutGrid className="size-[15px]" strokeWidth={1.75} />
          Studio
        </Link>
      </DialogContent>
    </Dialog>
  );
}
