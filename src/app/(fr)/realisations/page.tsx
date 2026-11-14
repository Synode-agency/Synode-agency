import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const title = "Réalisations : logiciels métier et projets IA";
const description = "Découvrez les projets de Synode : Nexus, logiciel de prospection B2B avec IA, et Coory, plateforme de coaching sportif, deux logiciels métier conçus et développés par nos soins.";

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
