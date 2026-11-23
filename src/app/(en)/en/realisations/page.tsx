import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { WorkPage } from "@/components/site/work-page";

const title = "Work: business software and AI projects";
const description = "Synode’s projects: Nexus, AI-assisted sales prospecting software, and Coory, a sports coaching platform, both designed and built by us.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/realisations", languages: { fr: "/realisations", en: "/en/realisations", "x-default": "/realisations" } },
  openGraph: { ...ogBase("en"), title: withBrand(title), description, url: "/en/realisations", type: "website" },
  twitter: { card: "summary_large_image", title: withBrand(title), description },
};

export default function Page() {
  return <WorkPage locale="en" />;
}
