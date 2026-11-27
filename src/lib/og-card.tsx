/**
 * L'IMAGE DE PARTAGE : son format et son texte alternatif.
 *
 * C'est ce qui s'affiche quand on colle un lien du site dans LinkedIn,
 * WhatsApp, Slack ou un message. Sans elle, le lien sort nu : un titre, une
 * adresse, et un grand vide à la place de l'aperçu. L'image elle-même est
 * dans `public/og/` (voir `@/lib/og-image`).
 *
 * 1200 × 630 est le format attendu par les aperçus de LinkedIn, Facebook,
 * X, Slack et WhatsApp. En dessous de 1200 de large, LinkedIn rétrograde
 * l'aperçu en vignette carrée.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/jpeg";

const ALT = {
  fr: "Synode, agence de développement logiciel et d’IA à Bruxelles : on développe vos logiciels, l’IA les rend intelligents.",
  en: "Synode, software development and AI agency in Brussels: we build your software, AI makes it intelligent.",
} as const;

export const ogAlt = (locale: "fr" | "en") => ALT[locale];
