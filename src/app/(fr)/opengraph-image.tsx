import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogAlt, ogCard, ogContentType, ogSize } from "@/lib/og-card";

/**
 * L'image de partage de TOUTES les pages de cette langue.
 *
 * Posée au niveau du layout, elle sert de repli à chaque route du groupe :
 * une page qui veut la sienne n'a qu'à déposer son propre fichier à côté de
 * son `page.tsx`. Next l'ajoute aux métadonnées `openGraph` et `twitter`
 * sans qu'on ait à déclarer d'URL, et la génère une fois au build.
 */
export const alt = ogAlt("fr");
export const size = ogSize;
export const contentType = ogContentType;

/* Lu une fois au build, pas à chaque requête : la route est statique. */
const mark = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/synode-mark.png")).toString("base64")}`;

export default function Image() {
  return new ImageResponse(ogCard("fr", mark), size);
}
