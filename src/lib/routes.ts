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

/**
 * LES PAGES DU SITE, par leur adresse française (brief de la refonte, 4.1).
 * Tout le code écrit ces adresses-là ; `path()` donne celle de la langue.
 */
export const ROUTES = {
  home: "/",
  services: "/services",
  work: "/realisations",
  about: "/a-propos",
  contact: "/contact",
  thanks: "/merci",
  legalNotice: "/mentions-legales",
  privacy: "/confidentialite",
} as const;

/**
 * LES ADRESSES ANGLAISES TRADUITES (24/11/2026). Les autres pages gardent
 * la même adresse, préfixée de `/en` : `/en/services`, `/en/contact`. Une
 * sous-page suit sa page : `/realisations/nexus` devient `/en/work/nexus`.
 */
const EN_ROUTES: Record<string, string> = {
  [ROUTES.work]: "/work",
  [ROUTES.about]: "/about",
  [ROUTES.thanks]: "/thanks",
  [ROUTES.legalNotice]: "/legal-notice",
  [ROUTES.privacy]: "/privacy",
};

/* Remplace le début d'une adresse selon une table : `/realisations/nexus`
   avec `/realisations` → `/work` donne `/work/nexus`. */
function swapBase(sub: string, table: Record<string, string>) {
  for (const [from, to] of Object.entries(table)) {
    if (sub === from || sub.startsWith(`${from}/`) || sub.startsWith(`${from}#`)) return to + sub.slice(from.length);
  }
  return sub;
}

/** path("en", "/realisations/nexus") -> "/en/work/nexus" */
export const path = (locale: Locale, sub = "/") => {
  if (sub === "/") return locale === "fr" ? "/" : "/en";
  return locale === "fr" ? sub : `/en${swapBase(sub, EN_ROUTES)}`;
};

export const homePath = (locale: Locale) => (locale === "fr" ? "/" : "/en");

/**
 * La même page dans l'autre langue, pour le sélecteur. On retrouve d'abord
 * l'adresse française de la page affichée, puis on la traduit.
 */
export function switchLocalePath(pathname: string, target: Locale) {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const bare = isEn ? pathname.slice(3) || "/" : pathname;
  const frRoute = isEn ? swapBase(bare, Object.fromEntries(Object.entries(EN_ROUTES).map(([fr, en]) => [en, fr]))) : bare;
  return path(target, frRoute);
}

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
 * LES QUATRE SERVICES et leur ancre sur la page Services (brief, 4.1) :
 * `#connecter`, `#ia`, `#logiciel`, `#web` en français, `#connect`, `#ai`,
 * `#software`, `#web` en anglais.
 */
const SERVICE_ANCHORS = {
  connect: { fr: "connecter", en: "connect" },
  ai: { fr: "ia", en: "ai" },
  software: { fr: "logiciel", en: "software" },
  /* Le 4e service, sur la même page (25/11/2026, demande d'Antonino). */
  web: { fr: "web", en: "web" },
} as const satisfies Record<string, Record<Locale, string>>;

export type ServiceKey = keyof typeof SERVICE_ANCHORS;

/** Le bloc « Inclus dans chaque projet » de la page Services, où mène
 *  l'ancienne offre « Formation & adoption IA ». */
const INCLUDED_ANCHOR = { fr: "inclus", en: "included" } as const satisfies Record<Locale, string>;
export const includedAnchor = (locale: Locale) => INCLUDED_ANCHOR[locale];

export const serviceAnchor = (locale: Locale, key: ServiceKey) => SERVICE_ANCHORS[key][locale];

/** serviceHref("fr", "ai") -> "/services#ia" */
export const serviceHref = (locale: Locale, key: ServiceKey) => `${path(locale, ROUTES.services)}#${SERVICE_ANCHORS[key][locale]}`;

/**
 * Les ancres qui changent de nom d'une langue à l'autre, par paires. Le
 * sélecteur de langue garde la section où l'on se trouve : il passe par
 * cette table pour que `/contact#reserver` mène à `/en/contact#book`.
 */
const ANCHOR_PAIRS: readonly Record<Locale, string>[] = [BOOKING_ANCHOR, INCLUDED_ANCHOR, ...Object.values(SERVICE_ANCHORS)];

/** translateHash("#reserver", "en") -> "#book" ; une ancre commune ne change pas. */
export function translateHash(hash: string, target: Locale) {
  const id = hash.replace(/^#/, "");
  const pair = ANCHOR_PAIRS.find((p) => Object.values(p).includes(id));
  return pair ? `#${pair[target]}` : hash;
}
