import type { Metadata } from "next";
import { SitePage } from "@/components/site/site-page";
import { HtmlLang } from "@/components/site/html-lang";

export const metadata: Metadata = {
  title: { absolute: "Synode — Run your business without the busywork" },
  description:
    "Process automation, AI agents plugged into your data, and custom software and business tools. We measure the payoff before writing a line of code.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://synode.com/en",
    siteName: "Synode",
    title: "Synode — Run your business without the busywork",
    description:
      "Automation, AI agents, custom software and business tools for SMEs. Two offers, on their own or combined.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synode — Run your business without the busywork",
    description:
      "Automation, AI agents and custom solutions for SMEs and independents.",
  },
  alternates: {
    canonical: "https://synode.com/en",
    languages: { fr: "https://synode.com/", en: "https://synode.com/en" },
  },
};

export default function HomeEn() {
  return (
    <>
      <HtmlLang lang="en" />
      <SitePage locale="en" />
    </>
  );
}
