import Link from "next/link";

import { AuthorAvatar } from "@/components/author/author-byline";
import { PostRow } from "@/components/post/post-row";
import { author, getPopularPosts, routes, tags } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Sticky rail used beside the archive listing. */
export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col gap-[18px] lg:sticky lg:top-[104px]", className)}>
      <AuthorCard />
      <TagsCard />
      <MostReadCard />
    </aside>
  );
}

function SidebarCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-lg border border-line-1 bg-bg-2 p-6", className)}>
      {children}
    </section>
  );
}

export function AuthorCard() {
  return (
    <SidebarCard>
      <div className="flex items-center gap-3.5">
        <AuthorAvatar className="size-12 text-[15px]" />
        <div>
          <p className="text-[15px] font-bold text-fg-1">{author.name}</p>
          <p className="text-[13px] text-fg-3">{author.role}</p>
        </div>
      </div>
      <p className="mt-3.5 text-[14.5px] leading-[1.65] text-fg-2">{author.bio}</p>
      <div className="mt-4 flex gap-2">
        <Link
          href={routes.about}
          className="flex-1 rounded-full bg-ink px-3.5 py-3 text-center text-[13.5px] font-semibold text-on-ink transition-transform duration-300 ease-bounce hover:-translate-y-0.5 active:scale-[0.96] active:duration-150 active:ease-out"
        >
          About
        </Link>
        <a
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-line-2 bg-bg-1 px-3.5 py-3 text-center text-[13.5px] font-semibold text-fg-1 transition-transform duration-300 ease-bounce hover:-translate-y-0.5 active:scale-[0.96] active:duration-150 active:ease-out"
        >
          RSS
        </a>
      </div>
    </SidebarCard>
  );
}

function TagsCard() {
  return (
    <SidebarCard>
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-fg-1">Tags</h2>
        <Link href={routes.topics} className="text-[12.5px] font-semibold text-brand">
          View all ↗
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.slice(0, 9).map((tag) => (
          <Link
            key={tag.name}
            href={`${routes.search}?q=${encodeURIComponent(tag.name.replace("#", ""))}`}
            className="rounded-full border border-line-1 bg-bg-1 px-3 py-[7px] text-[13px] text-fg-2 transition-[color,border-color] duration-300 ease-expo hover:border-line-brand hover:text-brand"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
}

function MostReadCard() {
  const popular = getPopularPosts(4);

  return (
    <SidebarCard>
      <h2 className="text-[16px] font-bold text-fg-1">Most read</h2>
      <div className="mt-1.5">
        {popular.map((post) => (
          <PostRow key={post.slug} post={post} variant="mini" />
        ))}
      </div>
    </SidebarCard>
  );
}
