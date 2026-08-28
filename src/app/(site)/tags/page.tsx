import type { Metadata } from "next";
import Link from "next/link";
import { Hash } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { listTags, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tags",
  description: `Every subject tag across the ${site.issue} posts in this archive.`,
  alternates: { canonical: "/tags" },
};

export default function TagsPage() {
  const tags = listTags();

  return (
    <>
      <PageMasthead
        eyebrow="Tags"
        title={
          <>
            Every thread running <span className="text-brand">through the archive.</span>
          </>
        }
        description={`${tags.length} tags across ${site.issue} posts, ordered by how often each one comes up.`}
        media={<MastheadBadge icon={Hash} />}
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)] pb-tail">
        <Reveal className="flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-1 bg-bg-2 px-4 py-2.5 text-[14px] text-fg-2 transition-[color,border-color,transform] duration-300 ease-expo hover:-translate-y-0.5 hover:border-line-brand hover:text-brand"
            >
              {tag.name}
              <span className="text-[12.5px] text-fg-3 tabular-nums">{tag.postCount}</span>
            </Link>
          ))}
        </Reveal>
      </section>
    </>
  );
}
