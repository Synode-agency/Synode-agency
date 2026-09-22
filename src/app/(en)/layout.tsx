import type { Metadata } from "next";
import { SiteShell, siteUrl } from "../site-shell";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synode — Run your business without the busywork",
    template: "%s — Synode",
  },
  description:
    "Process automation, AI agents plugged into your data, and custom software and business tools. We measure the payoff before writing a line of code.",
  keywords: [
    "automation",
    "AI agents",
    "artificial intelligence",
    "custom software",
    "CRM",
    "SME",
    "freelancers",
    "process audit",
    "Belgium",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/en`,
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
    canonical: "/en",
    languages: { fr: "/", en: "/en" },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
