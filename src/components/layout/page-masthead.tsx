import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The card masthead every page title sits in. Extracted from TopicHeader,
 * which was the only page using the treatment.
 *
 * Every slot is optional except the title, so a page takes only the parts it
 * has: the topic page gets artwork and follow controls, the archive gets an
 * eyebrow and a line of copy, search puts its form in `children`. The card
 * itself, its radius, padding, translucency and blur stay identical across
 * all of them, which is the point.
 */
export function PageMasthead({
  eyebrow,
  title,
  description,
  meta,
  media,
  actions,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative mx-auto max-w-page px-gutter pt-[clamp(28px,4.5vw,52px)]", className)}
    >
      <Reveal className="flex flex-wrap items-center gap-[clamp(20px,3vw,32px)] rounded-xl border border-line-1 bg-bg-2/85 p-[clamp(24px,3vw,34px)] shadow-md backdrop-blur-md">
        {media}

        <div className="min-w-65 flex-1">
          {eyebrow ? (
            <span className="inline-block rounded-full bg-tint-cornflower px-3 py-1.5 text-[11.5px] font-semibold text-fg-link">
              {eyebrow}
            </span>
          ) : null}

          <h1 className={cn("text-h4 text-fg-1", eyebrow && "mt-3.5")}>{title}</h1>

          {description ? (
            <p className="mt-3 max-w-[620px] text-[15.5px] leading-[1.65] text-fg-2">
              {description}
            </p>
          ) : null}

          {meta ? (
            <p className="mt-3.5 flex items-center gap-2 text-[13.5px] text-fg-3">{meta}</p>
          ) : null}

          {children}
        </div>

        {actions ? <div className="flex items-center gap-2.5">{actions}</div> : null}
      </Reveal>
    </section>
  );
}
