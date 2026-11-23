/**
 * Les langues et les adresses du site.
 *
 * Séparées de `content.ts` le 23/11/2026 (constat K9 de l'audit) : les
 * composants interactifs (menu, formulaire, calendrier…) en ont besoin, et
 * en les important depuis `content.ts` ils faisaient partir TOUS les textes
 * français et anglais dans le navigateur, sur chaque page. `content.ts` les
 * réexporte : le code serveur n'a rien à changer.
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

/** Le français est la langue par défaut et vit à la racine. */
export const localePrefix = (locale: Locale) => (locale === "fr" ? "" : "/en");

/** path("en", "/contact") -> "/en/contact" */
export const path = (locale: Locale, sub = "/") => {
  const prefix = localePrefix(locale);
  if (sub === "/") return prefix || "/";
  return `${prefix}${sub}`;
};

export const homePath = (locale: Locale) => (locale === "fr" ? "/" : "/en");

/**
 * Les adresses sont les mêmes dans les deux langues : le sélecteur ne fait
 * que remplacer le préfixe `/en`. Traduire les URL casserait ce mécanisme et
 * obligerait à maintenir deux tables de correspondance.
 */
export const ROUTES = {
  home: "/",
  solutions: "/solutions",
  useCases: "/cas-usage",
  work: "/realisations",
  team: "/equipe",
  contact: "/contact",
  thanks: "/merci",
  legalNotice: "/mentions-legales",
  privacy: "/confidentialite",
} as const;

/** Les ancres de la page Contact, citées depuis toute la navigation. */
export const ANCHORS = {
  booking: "reservation",
  form: "formulaire",
} as const;
