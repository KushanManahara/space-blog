import { AuthorAvatar } from "@/components/author/author-byline";
import { author } from "@/lib/content";

/** “Written by” card that closes out an article. */
export function AuthorCard() {
  return (
    <section className="mt-10 flex flex-wrap items-start gap-4.5 rounded-lg border border-line-1 bg-bg-2 p-6.5">
      <AuthorAvatar className="size-15 text-[19px]" />
      <div className="min-w-55 flex-1">
        <p className="text-[12px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
          Written by
        </p>
        <p className="mt-1.5 text-[18px] font-bold text-fg-1">{author.name}</p>
        <p className="mt-2 text-[14.5px] leading-[1.65] text-fg-2">{author.longBio}</p>
      </div>
    </section>
  );
}
