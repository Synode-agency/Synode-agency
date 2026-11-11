import type { Metadata } from "next";
import { NotFoundPage } from "@/components/site/simple-pages";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

/* La 404 des pages françaises introuvables (une solution ou une réalisation
   qui n'existe pas). Les adresses qui ne correspondent à AUCUNE route
   passent par `global-not-found.tsx`, celles sous /en par `(en)/en/not-found.tsx`. */
export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
