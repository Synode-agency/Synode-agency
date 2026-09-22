import type { Metadata } from "next";
import { RealisationsPage } from "@/components/site/realisations-page";

export const metadata: Metadata = {
  title: "Réalisations & démonstrateurs",
  description:
    "Quatre systèmes construits en interne pour démontrer précisément ce que nous livrons : automatisation, agents IA, tableaux de bord et outils métier.",
  alternates: {
    canonical: "/realisations",
    languages: { fr: "/realisations", en: "/en/realisations" },
  },
};

export default function Realisations() {
  return <RealisationsPage locale="fr" />;
}
