import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const title = "AI projects and work in development";
const description = "Explore Synode’s AI projects: Nexus, a B2B prospecting tool, and solutions in development around concrete business needs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/realisations", languages: { fr: "/realisations", en: "/en/realisations", "x-default": "/realisations" } },
  openGraph: { title, description, url: "/en/realisations", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <WorkPage locale="en" />;
}
