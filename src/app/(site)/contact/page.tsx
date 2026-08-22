import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { GitHubIcon, RssIcon, XIcon } from "@/components/icons/social-icons";
import { PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { author } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Corrections and reproductions get answered first. Everything else, within a week.",
  alternates: { canonical: "/contact" },
};

const socials = [
  { label: "GitHub", href: "https://github.com", icon: GitHubIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "RSS", href: "/rss.xml", icon: RssIcon },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Contact"
        title="Get in touch."
        description="Corrections and reproductions get answered first. Everything else, within a week."
      />

      <section className="mx-auto max-w-page px-gutter pt-[clamp(28px,4vw,44px)] pb-[clamp(76px,9vw,132px)]">
        <div className="grid items-start gap-[clamp(32px,6vw,88px)] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${author.email}`}
                  className="mt-2 block font-mono text-[15px] text-fg-1 transition-colors duration-300 ease-expo hover:text-brand"
                >
                  {author.email}
                </a>
              </div>

              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
                  Based in
                </p>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-fg-1">
                  {author.location}
                  <br />
                  <span className="text-fg-3">{author.timezoneNote}</span>
                </p>
              </div>

              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.14em] text-fg-3 uppercase">
                  Elsewhere
                </p>
                <div className="mt-3 flex gap-2.5">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-line-1 bg-bg-2 text-fg-2 transition-[transform,box-shadow] duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <Icon className="size-[17px]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
