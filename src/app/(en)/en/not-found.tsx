import type { Metadata } from "next";
import { NotFoundPage } from "@/components/site/simple-pages";

/* Filet de sécurité : servie seulement si une page anglaise appelle
   `notFound()`. Les adresses inconnues sous /en reçoivent la 404 globale,
   qui porte une ligne en anglais (voir `global-not-found.tsx`). */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage locale="en" />;
}
