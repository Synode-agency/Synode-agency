import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const title = "AI projects, work and demonstrations";
const description = "Explore Synode’s AI work: Nexus, a B2B prospecting tool, and an AI agent demonstration involving automation and human approval.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/realisations", languages: { fr: "/realisations", en: "/en/realisations" } },
  openGraph: { title, description, url: "/en/realisations", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <WorkPage locale="en" />;
}
