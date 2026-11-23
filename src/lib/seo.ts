/**
 * Le nom du site et le socle commun des métadonnées : titres des pages et
 * cartes de partage (l'aperçu qui s'affiche quand on envoie un lien par
 * WhatsApp, par message, sur LinkedIn…).
 *
 * Décision du 23/11/2026 : « Synode » est la MARQUE, « Synode agency » le
 * NOM COMPLET. C'est lui que portent les titres des pages, le nom du site
 * dans les cartes de partage et les données structurées : c'est aussi ce
 * que les gens tapent dans Google.
 */
export const SITE_NAME = "Synode agency";

/** Le titre d'une page : son sujet, puis le nom complet. */
export const withBrand = (title: string) => `${title} - ${SITE_NAME}`;

/**
 * Ce que chaque carte de partage doit porter.
 *
 * ⚠ Une page qui déclare son propre `openGraph` REMPLACE celui du layout,
 * sans fusion : sans ce socle, le nom du site et la langue disparaissaient
 * de la carte de toutes ces pages.
 */
export const ogBase = (locale: "fr" | "en") => ({
  siteName: SITE_NAME,
  locale: locale === "fr" ? "fr_BE" : "en_BE",
  type: "website" as const,
});
