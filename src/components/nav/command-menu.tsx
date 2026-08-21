"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { PostCover } from "@/components/post/post-cover";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { routes, type PostSummary } from "@/lib/content";

const NAVIGATE_ITEMS = [
  { label: "Go to Articles", hint: "G A", href: routes.articles },
  { label: "Go to Topics", hint: "G T", href: routes.topics },
  { label: "Search all posts", hint: "/", href: routes.search },
  { label: "About the author", hint: "G B", href: routes.about },
] as const;

type CommandMenuValue = { open: () => void };

const CommandMenuContext = React.createContext<CommandMenuValue | null>(null);

/** Owns ⌘K state so the header, the 404 page and the shortcut share one menu. */
export function CommandMenuProvider({
  posts,
  children,
}: {
  posts: PostSummary[];
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = React.useMemo<CommandMenuValue>(() => ({ open: () => setIsOpen(true) }), []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandMenuContext value={value}>
      {children}
      <CommandMenu posts={posts} open={isOpen} onOpenChange={setIsOpen} />
    </CommandMenuContext>
  );
}

export function useCommandMenu(): CommandMenuValue {
  const context = React.use(CommandMenuContext);
  if (!context) throw new Error("useCommandMenu must be used inside <CommandMenuProvider>");
  return context;
}

function CommandMenu({
  posts,
  open,
  onOpenChange,
}: {
  posts: PostSummary[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const results = posts
    .filter((post) => `${post.title} ${post.topic}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQuery("");
      }}
    >
      <DialogContent align="top" className="max-w-[620px] overflow-hidden p-0">
        <DialogTitle className="sr-only">Search posts and pages</DialogTitle>

        <div className="flex items-center gap-3 border-b border-line-1 p-4.5">
          <Search className="size-4.5 text-fg-3" strokeWidth={1.75} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts, topics, or jump to a page"
            aria-label="Search posts, topics, or jump to a page"
            className="flex-1 bg-transparent py-1 text-[16px] text-fg-1 outline-none placeholder:text-fg-3"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-[7px] border border-line-1 bg-bg-3 px-2 py-1.5 text-[11.5px] font-semibold text-fg-3"
          >
            esc
          </button>
        </div>

        <div className="max-h-[56vh] overflow-y-auto p-3">
          <p className="px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-fg-3 uppercase">
            Posts
          </p>
          {results.length === 0 ? (
            <p className="px-2.5 py-4 text-[14px] text-fg-2">
              No posts match “{query}”. Try a topic name, or press esc to close.
            </p>
          ) : (
            results.map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => go(`/articles/${post.slug}`)}
                className="flex w-full cursor-pointer items-center gap-3.5 rounded-sm p-2.5 text-left transition-colors duration-250 ease-expo hover:bg-veil/70"
              >
                <PostCover
                  topic={post.topic}
                  zoom={false}
                  className="size-[38px] shrink-0 rounded-[10px]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] leading-[1.35] font-semibold text-fg-1">
                    {post.title}
                  </span>
                  <span className="mt-1 block text-[12.5px] text-fg-3">
                    {post.topic} · {post.readingMinutes} min read
                  </span>
                </span>
                <ArrowRight className="size-[15px] text-fg-faint" strokeWidth={1.75} />
              </button>
            ))
          )}

          <p className="mt-2.5 border-t border-line-1 px-2.5 pt-3.5 pb-1.5 text-[11px] font-semibold tracking-[0.12em] text-fg-3 uppercase">
            Navigate
          </p>
          {NAVIGATE_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-sm p-2.5 transition-colors duration-250 ease-expo hover:bg-veil/70"
            >
              <span className="inline-flex size-6.5 shrink-0 items-center justify-center rounded-xs bg-tint-cornflower text-fg-link">
                <ArrowRight className="size-3.5" strokeWidth={1.75} />
              </span>
              <span className="flex-1 text-[14.5px] font-medium text-fg-1">{item.label}</span>
              <span className="rounded-md border border-line-1 bg-bg-3 px-[7px] py-1 text-[11.5px] font-semibold text-fg-3">
                {item.hint}
              </span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
