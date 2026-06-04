import type { Metadata } from "next";
import Credits from "@/components/credits";

export const metadata: Metadata = {
  title: "Credits & Tech Stack — Zilla_H3",
  description: "Learn about the artists, developers, tools, typography, and assets that powers the Zilla_H3 ecosystem.",
};

export default function CreditsPage() {
  return <Credits />;
}
