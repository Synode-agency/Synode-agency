import type { Metadata } from "next";
import { NotFoundPage } from "@/components/site/simple-pages";

/* La 404 anglaise. Sans elle, une page introuvable sous `/en` — une
   solution ou une réalisation qui n'existe pas — tombait sur la page par
   défaut de Next, dans le layout anglais mais sans le site autour. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage locale="en" />;
}
