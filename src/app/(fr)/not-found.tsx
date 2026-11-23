import type { Metadata } from "next";
import { NotFoundPage } from "@/components/site/simple-pages";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

/* Filet de sécurité : servie seulement si une page appelle `notFound()`.
   Depuis le 23/11/2026, aucune adresse inconnue n'y arrive : les pages
   [slug] ont `dynamicParams = false` et tout passe par
   `global-not-found.tsx`. */
export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
