import { ogAlt, ogContentType, ogSize } from "@/lib/og-card";
import { ogImage } from "@/lib/og-image";

export { generateStaticParams } from "./page";

/* L'image de partage de la langue, reposée ici parce que la page déclare
   son propre `openGraph`, qui sinon l'effacerait. Voir `@/lib/og-image`. */
export const alt = ogAlt("fr");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("fr");
}
