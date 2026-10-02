import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthorAvatar } from "@/components/author/author-byline";
import { author, routes } from "@/lib/content";

/**
 * “Written by” card that closes out an article.
 *
 * It used to be a name and nothing else — a dead end at the exact point a
 * reader who liked the piece wants to know who wrote it. Role, the short bio
 * and a way on to the About page make it a next step instead.
 */
export function AuthorCard() {
  return (
    <section
      aria-labelledby="author-card-name"
      className="mt-10 flex flex-col gap-4 rounded-xl border border-line-1 bg-bg-2 p-5 shadow-xs sm:flex-row sm:items-start sm:gap-4.5"
    >
      <AuthorAvatar className="size-12 shrink-0 text-[16px]" />
      <div className="min-w-0 flex-1">
        <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
          Written by
        </p>
        <p id="author-card-name" className="mt-0.5 text-[17px] font-bold text-fg-1">
          {author.name}
          <span className="ml-2 text-[13.5px] font-normal text-fg-3">{author.role}</span>
        </p>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-pretty text-fg-2">{author.bio}</p>
        <Link
          href={routes.about}
          className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand transition-colors duration-300 ease-expo hover:text-brand-strong"
        >
          More about {author.name.split(" ")[0]}
          <ArrowRight className="size-3.5" strokeWidth={1.75} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
