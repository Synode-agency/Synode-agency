import type { Metadata } from "next";
import { FaqPage } from "@/components/site/faq-page";

export const metadata: Metadata = {
  title: { absolute: "Frequently asked — Synode" },
  description:
    "Timelines, pricing, existing tools, data: what we get asked before signing, and our answers.",
  alternates: {
    canonical: "/en/faq",
    languages: { fr: "/faq", en: "/en/faq" },
  },
};

export default function FaqEn() {
  return <FaqPage locale="en" />;
}
