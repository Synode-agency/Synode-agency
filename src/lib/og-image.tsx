import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogCard, ogSize } from "@/lib/og-card";

/**
 * L'image de partage d'une langue, prête à servir.
 *
 * Partagée par TOUS les fichiers `opengraph-image.tsx` du site. Il y en a un
 * à la racine de chaque langue, et un dans chaque dossier dont la page
 * déclare ses propres métadonnées `openGraph` : Solutions, Cas d'usage,
 * Réalisations, Équipe, Contact, les fiches solution et les fiches
 * réalisation.
 *
 * ⚠ POURQUOI AUTANT DE FICHIERS. Une page qui déclare `openGraph` REMPLACE
 * celui de son parent au lieu de le compléter, image comprise : c'est la
 * règle de fusion des métadonnées de Next. L'image posée à la racine de la
 * langue ne servait donc qu'aux pages sans `openGraph` propre (l'accueil,
 * les pages légales). Partagées sur LinkedIn ou WhatsApp, Solutions, Équipe
 * ou Contact sortaient sans aperçu. Un fichier image dans le dossier de la
 * page passe, lui, AVANT ses métadonnées : il rétablit l'image.
 */

let mark: string | null = null;

export function ogImage(locale: "fr" | "en") {
  /* Lu une seule fois par processus, au premier rendu. */
  mark ??= `data:image/png;base64,${readFileSync(join(process.cwd(), "public/synode-mark.png")).toString("base64")}`;
  return new ImageResponse(ogCard(locale, mark), ogSize);
}
