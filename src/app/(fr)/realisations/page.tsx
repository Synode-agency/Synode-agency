import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const title = "Réalisations et projets IA en développement";
const description = "Découvrez les projets IA de Synode : Nexus, logiciel de prospection B2B, et nos solutions en cours de conception autour de besoins métier concrets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/realisations", languages: { fr: "/realisations", en: "/en/realisations", "x-default": "/realisations" } },
  openGraph: { title, description, url: "/realisations", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <WorkPage locale="fr" />;
}
