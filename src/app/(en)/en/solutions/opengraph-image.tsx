import { ogAlt, ogContentType, ogSize } from "@/lib/og-card";
import { ogImage } from "@/lib/og-image";

/* L'image de partage de la langue, reposée ici parce que la page déclare
   son propre `openGraph`, qui sinon l'effacerait. Voir `@/lib/og-image`. */
export const alt = ogAlt("en");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("en");
}
