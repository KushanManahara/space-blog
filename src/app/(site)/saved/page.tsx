import type { Metadata } from "next";
import { Bookmark } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { SavedList } from "@/components/saved/saved-list";
import { listPosts, toSummaries } from "@/lib/content";
import { alternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Saved",
  description: "Articles you have bookmarked to read later.",
  alternates: alternates("/saved"),
  // The list only exists in the reader's browser; there is nothing here to index.
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  // Ordered newest-first here so the client only has to filter, not sort.
  const summaries = toSummaries(listPosts({ sort: "recent" }));

  return (
    <>
      <PageMasthead
        eyebrow="Saved"
        title={
          <>
            Your reading <span className="text-brand">list.</span>
          </>
        }
        description="Bookmarks live in this browser only. Nothing is uploaded, and there is no account to create."
        media={<MastheadBadge icon={Bookmark} />}
        className="pb-[clamp(28px,4vw,44px)]"
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(20px,3vw,32px)] pb-tail">
        <Reveal>
          <SavedList posts={summaries} />
        </Reveal>
      </section>
    </>
  );
}
