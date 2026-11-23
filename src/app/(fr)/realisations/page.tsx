import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { WorkPage } from "@/components/site/work-page";

const title = "Réalisations : IA et logiciels métier";
const description = "Les projets de Synode : Nexus, logiciel de prospection commerciale avec IA, et Coory, plateforme de coaching sportif, conçus et développés par nos soins.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/realisations", languages: { fr: "/realisations", en: "/en/realisations", "x-default": "/realisations" } },
  openGraph: { ...ogBase("fr"), title: withBrand(title), description, url: "/realisations", type: "website" },
  twitter: { card: "summary_large_image", title: withBrand(title), description },
};

export default function Page() {
  return <WorkPage locale="fr" />;
}
