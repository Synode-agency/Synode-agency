import type { Metadata } from "next";
import { ExpertisePage } from "@/components/site/expertise-page";

const title = "Expertise : agents IA, automatisation, intégrations";
const description = "Les capacités avec lesquelles nous construisons nos systèmes : agents IA, automatisation, intégrations, logiciels métier, données et connaissance.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/expertise",
    languages: { fr: "/expertise", en: "/en/expertise" },
  },
  openGraph: { title, description, url: "/expertise", type: "website", locale: "fr_BE", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <ExpertisePage locale="fr" />;
}
