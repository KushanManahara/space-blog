"use client";

import * as React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { AuthorAvatar } from "@/components/author/author-byline";
import { BrandMark } from "@/components/layout/brand-mark";
import { author, routes, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const TABS = ["Posts", "Settings", "Subscription", "Billing"] as const;

/** Studio chrome. Only the Posts tab has a screen behind it today. */
export function StudioHeader() {
  const [activeTab, setActiveTab] = React.useState<(typeof TABS)[number]>("Posts");

  return (
    <header className="sticky top-0 z-50 border-b border-line-1 bg-bg-2">
      <div className="mx-auto flex max-w-page items-center gap-6.5 px-gutter">
        <Link href={routes.home} className="flex items-center gap-2.5 py-4.5">
          <BrandMark size={22} glow={false} />
          <span className="font-display text-[16px] font-bold tracking-[-0.02em] text-fg-1">
            {site.name}
          </span>
          <span className="rounded-full bg-bg-3 px-2.5 py-1 text-[12px] font-semibold text-fg-3">
            Studio
          </span>
        </Link>

        <nav aria-label="Studio sections" className="ml-2 hidden gap-1 sm:flex">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-current={tab === activeTab ? "page" : undefined}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "cursor-pointer border-b-2 px-3 pt-4.5 pb-4 text-[14px] transition-[color,border-color] duration-300 ease-expo",
                tab === activeTab
                  ? "border-ink font-semibold text-fg-1"
                  : "border-transparent font-medium text-fg-3 hover:text-fg-1",
              )}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Link
            href={routes.editor}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4.5 py-2.5 text-[13.5px] font-semibold text-on-ink transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-md active:scale-[0.96] active:duration-150 active:ease-out"
          >
            <Plus className="size-3.5" strokeWidth={2} />
            New post
          </Link>
          <Link
            href={routes.home}
            className="hidden text-[13.5px] font-semibold text-fg-3 transition-colors duration-300 ease-expo hover:text-fg-1 sm:inline"
          >
            Exit to site
          </Link>
          <Link
            href={routes.about}
            title={author.name}
            className="flex items-center transition-transform duration-300 ease-bounce hover:scale-105 active:scale-95"
          >
            <AuthorAvatar className="size-8 shadow-xs" />
          </Link>
        </div>
      </div>
    </header>
  );
}
