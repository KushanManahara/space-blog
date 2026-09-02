import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { MastheadBadge, PageMasthead } from "@/components/layout/page-masthead";
import { Reveal } from "@/components/motion/reveal";
import { author, routes, site } from "@/lib/content";
import { alternates } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${site.name} collects, why, who it is shared with, and how to have it removed.`,
  alternates: alternates("/privacy"),
};

/**
 * Written from what the code actually does, not from a template.
 *
 * Each claim below maps to something real: the tables in `lib/db/schema.ts`,
 * the fingerprint in `lib/abuse.ts`, the storage keys in the reader-state
 * providers, and the two opt-in features that reach a CDN. Keep it in step when
 * any of those change — an inaccurate privacy notice is worse than none.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Privacy"
        title={
          <>
            What this site knows <span className="text-brand">about you.</span>
          </>
        }
        description="A short, specific account: no analytics, no tracking cookies, no advertising. Everything below is something the code actually does."
        media={<MastheadBadge icon={ShieldCheck} />}
      />

      <section className="mx-auto max-w-[760px] px-gutter pt-[clamp(28px,4vw,44px)] pb-[clamp(84px,10vw,150px)]">
        <Reveal>
          <p className="text-[13px] text-fg-3">Last updated 2 September 2026</p>
        </Reveal>

        <Section title="The short version">
          <P>
            There is no analytics package on this site, no advertising, and no tracking cookie. You
            can read every article without giving up anything beyond the request your browser has to
            make to load the page. The only personal data held is what you deliberately type into
            one of three forms.
          </P>
        </Section>

        <Section title="What is collected, and when">
          <SubHeading>If you subscribe to the newsletter</SubHeading>
          <P>
            Your email address is stored, and a matching contact is created at Resend, the service
            that sends the mail. Nothing else is recorded. Every email carries a one-click
            unsubscribe link tied to your address; using it deletes the stored row and marks the
            Resend contact unsubscribed.
          </P>

          <SubHeading>If you post a response</SubHeading>
          <P>
            The name, role and email you enter are stored with your comment. Your name, role and
            initials appear publicly once the comment is approved; your email address is never
            displayed and is used only to recognise replies from the author. Comments are held
            unpublished until reviewed by hand, so nothing you write appears on the site
            automatically.
          </P>

          <SubHeading>If you use the contact form</SubHeading>
          <P>
            Your name, email, subject and message are stored and forwarded to {author.email} so they
            can be answered.
          </P>

          <SubHeading>When anyone reads or likes an article</SubHeading>
          <P>
            Article view and like totals are counted per article, not per person — the stored number
            is an aggregate with nothing attached to it.
          </P>
          <P>
            To stop those counters being trivially inflated, a short identifier is derived from your
            IP address and browser user-agent by hashing them together with SHA-256 and keeping the
            first 32 characters. The IP address itself is never written down, and the hash cannot be
            turned back into one. It is still information derived from you, which is why it is
            described here rather than left unmentioned. These rows are deleted after two days.
          </P>
        </Section>

        <Section title="What stays in your browser">
          <P>
            Saved articles, which posts you have liked, your light or dark preference, the reading
            settings for the audio player, and the name and role you last used to comment are kept
            in your own browser&rsquo;s local storage. They are never sent anywhere. Clearing your
            browser data removes them. The relevant keys are <Code>space_saved_posts</Code>,{" "}
            <Code>space_liked_posts</Code>, <Code>theme</Code>,{" "}
            <Code>space_audio_highlight_word</Code> and <Code>space_commenter_profile</Code>.
          </P>
          <P>
            A per-tab marker (<Code>space:viewed:…</Code>) stops a single reading session counting
            the same article twice. It disappears when you close the tab.
          </P>
        </Section>

        <Section title="Who else is involved">
          <P>
            <Strong>Vercel</Strong> hosts the site and, like any web host, processes the requests
            your browser makes. <Strong>Turso</Strong> stores the database described above.{" "}
            <Strong>Resend</Strong> delivers newsletter and contact email and holds subscriber
            addresses.
          </P>
          <P>
            Two features reach a third party, and only if you choose to use them. Turning on
            semantic search downloads an embedding model, and pressing Run on a code block downloads
            a Python runtime — both from the jsDelivr CDN, with model files coming from Hugging
            Face. Those requests reveal your IP address to those services in the ordinary way any
            download does. Neither is fetched unless you ask for it, and neither sends them anything
            about you beyond the request itself; your search query is turned into a vector inside
            your own browser and never leaves it.
          </P>
        </Section>

        <Section title="How long things are kept">
          <P>
            Subscriber addresses are kept until you unsubscribe. Comments are kept as long as they
            are published. Contact messages are kept so the correspondence can be picked up again.
            Abuse-counter hashes are deleted after two days.
          </P>
        </Section>

        <Section title="Having your data removed">
          <P>
            Email {author.email} and ask. There is one person behind this publication and no process
            to navigate: say what you want removed and it will be, along with confirmation that it
            is done. The same address works for a copy of anything held about you, or a correction
            to it. To stop newsletter email immediately without writing to anybody, use the
            unsubscribe link at the bottom of any Space email.
          </P>
        </Section>

        <Section title="Changes">
          <P>
            If what is collected changes, this page changes with it and the date at the top moves.
            Material changes will be mentioned in the newsletter rather than made quietly.
          </P>
        </Section>

        <Reveal className="mt-12 border-t border-line-1 pt-6">
          <p className="text-[14.5px] leading-[1.7] text-fg-2">
            Questions about any of this are welcome —{" "}
            <Link
              href={routes.contact}
              className="font-medium text-fg-link underline decoration-line-brand underline-offset-4 transition-colors hover:text-brand"
            >
              get in touch
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="mt-11">
      <h2 className="text-[22px] font-bold tracking-[-0.02em] text-fg-1 sm:text-[25px]">{title}</h2>
      <div className="mt-3.5">{children}</div>
    </Reveal>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-2 text-[16px] font-bold text-fg-1">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[16px] leading-[1.75] text-fg-prose sm:text-[17px]">{children}</p>;
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-fg-1">{children}</strong>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded border border-line-1 bg-bg-2 px-1.5 py-0.5 font-mono text-[0.88em] font-medium text-brand">
      {children}
    </code>
  );
}
