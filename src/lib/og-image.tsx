import { readFileSync } from "node:fs";
import { join } from "node:path";

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
 *
 * L'IMAGE ELLE-MÊME (27/11/2026, écart du design system) : le titre du
 * hero, sur son fond bleu nuit texturé, avec le logo recomposé, en Manrope
 * et Instrument Serif (`public/og/synode-fr.jpg`, `synode-en.jpg`). Le
 * moteur de dessin de Next (`next/og`) ne sait ni lire ces polices ni
 * faire le grain : elle est dessinée par le navigateur, à partir de la page
 * du site (`docs/design-system/generer-apercus.mjs`, à relancer quand le
 * titre change), et servie telle quelle.
 */

const images: Partial<Record<"fr" | "en", Buffer>> = {};

export function ogImage(locale: "fr" | "en") {
  /* Lue une seule fois par processus, au premier rendu. */
  const image = (images[locale] ??= readFileSync(join(process.cwd(), `public/og/synode-${locale}.jpg`)));
  return new Response(new Uint8Array(image), { headers: { "Content-Type": "image/jpeg" } });
}
