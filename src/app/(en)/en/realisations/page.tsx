import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const title = "Work: business software and AI projects";
const description = "Explore Synode’s projects: Nexus, AI-assisted B2B prospecting software, and Coory, a sports coaching platform, two business applications we designed and built ourselves.";

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
