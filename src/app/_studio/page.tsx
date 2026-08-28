import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false },
};

/**
 * Studio is temporarily disabled from public access.
 */
export default function StudioPage() {
  notFound();
}
