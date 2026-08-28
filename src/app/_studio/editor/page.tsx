import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Editor",
  robots: { index: false },
};

/**
 * Editor is temporarily disabled from public access.
 */
export default function EditorPage() {
  notFound();
}
