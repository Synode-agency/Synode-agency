import { ogAlt, ogContentType, ogSize } from "@/lib/og-card";
import { ogImage } from "@/lib/og-image";

/**
 * L'image de partage de TOUTES les pages de cette langue.
 *
 * Posée au niveau du layout, elle sert de repli à chaque route du groupe :
 * une page qui déclare son propre `openGraph` doit en reposer une copie à
 * côté de son `page.tsx`, voir `@/lib/og-image`. Next l'ajoute aux
 * métadonnées `openGraph` et `twitter` sans qu'on ait à déclarer d'URL, et
 * la génère une fois au build.
 */
export const alt = ogAlt("fr");
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage("fr");
}
