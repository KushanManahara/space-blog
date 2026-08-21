import { AuthorAvatar } from "@/components/author/author-byline";
import { Reveal } from "@/components/motion/reveal";
import { author, site } from "@/lib/content";

const stats = [
  { value: site.issue, label: "posts" },
  { value: site.seriesCount, label: "series" },
  { value: site.correctionCount, label: "corrections" },
] as const;

/**
 * Who writes this and how much of it there is. Both used to sit inside the
 * hero, which pushed it to six stacked text elements; they read better as
 * their own band directly under it.
 */
export function PublicationStrip() {
  return (
    <section className="mx-auto max-w-page px-gutter pb-[clamp(40px,5vw,72px)]">
      <Reveal className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-y border-line-1 py-6">
        <div className="flex items-center gap-3.5">
          <AuthorAvatar className="size-[42px] text-[15px] shadow-sm" />
          <div>
            <p className="text-[14.5px] font-semibold text-fg-1">{author.name}</p>
            <p className="text-[13px] text-fg-3">{author.role} · single-author publication</p>
          </div>
        </div>

        <dl className="flex flex-wrap items-baseline gap-x-7 gap-y-2.5">
          {stats.map((stat) => (
            <div key={stat.label} className="inline-flex items-baseline gap-[7px]">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-[19px] font-bold text-fg-1">{stat.value}</dd>
              <span aria-hidden className="text-[13px] text-fg-3">
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
