import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { EditorComposer } from "@/components/studio/editor-composer";
import { Button } from "@/components/ui/button";
import { getPostBySlug, routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Editor",
  robots: { index: false },
};

export default async function EditorPage({ searchParams }: PageProps<"/studio/editor">) {
  const { post: postParam } = await searchParams;
  const slug = typeof postParam === "string" ? postParam : undefined;
  const post = slug ? getPostBySlug(slug) : undefined;

  return (
    <div className="min-h-screen bg-bg-2">
      <div className="sticky top-0 z-50 flex items-center gap-3.5 border-b border-line-1 bg-veil/86 px-[clamp(16px,4vw,28px)] py-3 backdrop-blur-[20px] backdrop-saturate-[170%]">
        <Link
          href={routes.studio}
          className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-fg-2 transition-colors duration-300 ease-expo hover:text-fg-1"
        >
          <ArrowLeft className="size-[15px]" strokeWidth={1.75} />
          Exit editor
        </Link>
        <span aria-hidden className="text-fg-faint">
          /
        </span>
        <BrandMark size={20} glow={false} />

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden text-[12.5px] text-fg-3 sm:inline">Saved 2 min ago</span>
          <Button variant="subtle" size="sm" className="px-4.5 py-2.5">
            Preview
          </Button>
          <Button variant="primary" size="sm" className="px-5.5 py-2.5">
            Publish
          </Button>
        </div>
      </div>

      <EditorComposer initialTitle={post?.title ?? ""} />

      <div className="mx-auto max-w-[780px] px-[clamp(20px,5vw,32px)] pt-[clamp(28px,4vw,44px)] pb-[clamp(76px,9vw,120px)]">
        <h2 className="text-[28px] font-bold tracking-[-0.02em] text-fg-1">
          Acceptance rate is not the story
        </h2>
        <p className="mt-4 text-[18px] leading-[1.75] text-fg-prose">
          Mean acceptance held at 0.71 across the whole window and barely moved between prompt
          classes. Throughput, meanwhile, ranged from <strong>1.3× to 3.1×</strong>. If acceptance
          were the dominant term, that spread would not exist.
        </p>

        <ul className="mt-4.5 flex list-disc flex-col gap-2.5 pl-5.5">
          <li className="text-[18px] leading-[1.7] text-fg-prose">
            Bucket by occupancy, not nominal batch size.
          </li>
          <li className="text-[18px] leading-[1.7] text-fg-prose">
            Log the draft length per step, not per request.
          </li>
        </ul>

        <div className="mt-6 overflow-hidden rounded-md">
          <pre className="overflow-x-auto bg-n-900 px-5.5 py-5">
            <code className="font-mono text-[13.5px] leading-[1.8] text-n-200">
              speedup = <span className="text-orchid-300">baseline_ms</span> / trace.total_ms()
            </code>
          </pre>
        </div>

        <blockquote className="mt-6.5 border-l-[3px] border-line-brand py-1 pl-5.5">
          <p className="text-[18px] leading-[1.7] text-fg-prose italic">
            “We reproduced Fig 1 on an A100 pair and landed within 6% at every bucket.”
          </p>
          <footer className="mt-2 text-[14.5px] text-fg-3">Ada Rehman</footer>
        </blockquote>

        <p className="mt-6.5 text-[18px] leading-[1.75] text-fg-faint">Keep writing…</p>
      </div>
    </div>
  );
}
