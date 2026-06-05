import type { Metadata } from "next";
import TermsCondition from "@/components/termsCondition";

export const metadata: Metadata = {
  title: "Terms of Service — Zilla_ZH3",
  description: "Terms and conditions for commissioning custom avatars and assets from Zilla_ZH3.",
};

export default function TermsConditionsPage() {
  return <TermsCondition />;
}
