import { AuthorAvatar } from "@/components/author/author-byline";
import { author } from "@/lib/content";

/** “Written by” card that closes out an article. */
export function AuthorCard() {
  return (
    <section className="mt-10 flex items-center gap-4.5 rounded-xl border border-line-1 bg-bg-2 p-5 shadow-xs">
      <AuthorAvatar className="size-12 text-[16px]" />
      <div>
        <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
          Written by
        </p>
        <p className="mt-0.5 text-[17px] font-bold text-fg-1">{author.name}</p>
      </div>
    </section>
  );
}
