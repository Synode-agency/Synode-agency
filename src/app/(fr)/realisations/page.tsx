import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const title = "Réalisations IA, projets et démonstrateurs";
const description = "Découvrez les réalisations IA de Synode : Nexus, logiciel de prospection B2B, et un démonstrateur d’agent IA, d’automatisation et de validation humaine.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/realisations", languages: { fr: "/realisations", en: "/en/realisations" } },
  openGraph: { title, description, url: "/realisations", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <WorkPage locale="fr" />;
}
