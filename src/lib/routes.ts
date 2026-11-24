/**
 * Les langues et les adresses du site.
 *
 * Séparées des textes le 23/11/2026 (constat K9 de l'audit) : les
 * composants interactifs (menu, formulaire, calendrier…) en ont besoin, et
 * en les important avec les textes ils faisaient partir TOUS les textes
 * français et anglais dans le navigateur, sur chaque page. `@/content` les
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
  /* La page Services de la refonte. Tant qu'elle n'existe pas (étape 5),
     `next.config.ts` redirige cette adresse vers `/solutions`, ancre
     comprise : les liens qui y mènent déjà marchent. */
  services: "/services",
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
  form: "formulaire",
} as const;

/**
 * L'ANCRE DU CALENDRIER, la seule traduite : `/contact#reserver` en
 * français, `/en/contact#book` en anglais (brief de la refonte, règle 1).
 * Le bouton principal du site y mène depuis toutes les pages.
 *
 * L'ancienne ancre `#reservation` (avant le 24/11/2026) ne casse rien :
 * le calendrier est en haut de la page Contact, on le voit en arrivant.
 */
const BOOKING_ANCHOR = { fr: "reserver", en: "book" } as const satisfies Record<Locale, string>;

export const bookingAnchor = (locale: Locale) => BOOKING_ANCHOR[locale];

/** bookingHref("en") -> "/en/contact#book" */
export const bookingHref = (locale: Locale) => `${path(locale, ROUTES.contact)}#${BOOKING_ANCHOR[locale]}`;

/**
 * LES TROIS SERVICES et leur ancre sur la page Services (brief, 4.1) :
 * `#connecter`, `#ia`, `#logiciel` en français, `#connect`, `#ai`,
 * `#software` en anglais.
 */
const SERVICE_ANCHORS = {
  connect: { fr: "connecter", en: "connect" },
  ai: { fr: "ia", en: "ai" },
  software: { fr: "logiciel", en: "software" },
} as const satisfies Record<string, Record<Locale, string>>;

export type ServiceKey = keyof typeof SERVICE_ANCHORS;

export const serviceAnchor = (locale: Locale, key: ServiceKey) => SERVICE_ANCHORS[key][locale];

/** serviceHref("fr", "ai") -> "/services#ia" */
export const serviceHref = (locale: Locale, key: ServiceKey) => `${path(locale, ROUTES.services)}#${SERVICE_ANCHORS[key][locale]}`;

/**
 * Les ancres qui changent de nom d'une langue à l'autre, par paires. Le
 * sélecteur de langue garde la section où l'on se trouve : il passe par
 * cette table pour que `/contact#reserver` mène à `/en/contact#book`.
 */
const ANCHOR_PAIRS: readonly Record<Locale, string>[] = [BOOKING_ANCHOR, ...Object.values(SERVICE_ANCHORS)];

/** translateHash("#reserver", "en") -> "#book" ; une ancre commune ne change pas. */
export function translateHash(hash: string, target: Locale) {
  const id = hash.replace(/^#/, "");
  const pair = ANCHOR_PAIRS.find((p) => Object.values(p).includes(id));
  return pair ? `#${pair[target]}` : hash;
}
