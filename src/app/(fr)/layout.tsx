import type { Metadata } from "next";
import { SiteShell, siteUrl } from "../site-shell";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synode — Gérez votre entreprise sans le superflu",
    template: "%s — Synode",
  },
  description:
    "Automatisation des processus, agents IA branchés sur vos données, logiciels et outils métier sur mesure. Nous mesurons le gain avant d'écrire une ligne de code.",
  keywords: [
    "automatisation",
    "agents IA",
    "intelligence artificielle",
    "logiciel sur mesure",
    "CRM",
    "PME",
    "indépendants",
    "audit de processus",
    "Belgique",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Synode",
    title: "Synode — Gérez votre entreprise sans le superflu",
    description:
      "Automatisation, agents IA, logiciels et outils métier sur mesure pour PME. Deux offres, séparément ou combinées.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synode — Gérez votre entreprise sans le superflu",
    description:
      "Automatisation, agents IA et solutions sur mesure pour PME et indépendants.",
  },
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/en" },
  },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="fr">{children}</SiteShell>;
}
