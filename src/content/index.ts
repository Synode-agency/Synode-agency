/**
 * Le contenu du site, en français et en anglais.
 *
 * Un dossier par langue (`fr/`, `en/`), un fichier par page, plus
 * `common.ts` pour ce que toutes les pages partagent. Les deux langues ont la
 * même forme, vérifiée à la compilation (`types.ts`).
 *
 * L'anglais n'est PAS une traduction mot à mot : c'est la même substance
 * écrite dans le registre d'un lecteur anglophone. Le positionnement, l'offre
 * et les cibles sont identiques, parce qu'inventer une stratégie anglophone
 * dont personne n'a décidé serait du contenu fabriqué.
 *
 * Règle de fond, tenue partout dans ces fichiers : aucun client, témoignage,
 * chiffre de performance, certification, délai garanti, adresse ni numéro
 * légal n'est inventé. Ce qui manque est marqué par un emplacement réservé
 * visible, ou n'est pas affiché.
 *
 * ⚠ Les composants interactifs (menu, formulaire, calendrier…) n'importent
 * de ce dossier que des TYPES : une valeur importée ici ferait partir tous
 * les textes des deux langues dans le navigateur, sur chaque page (constat
 * K9 de l'audit). Les langues et les adresses vivent dans `@/lib/routes`.
 */

import type { Locale } from "@/lib/routes";
import type { SiteContent, WorkContent } from "./types";
import type { LegalTexts } from "./legal-shared";
import { fr } from "./fr";
import { en } from "./en";
import { legalTexts as legalFr } from "./fr/legal";
import { legalTexts as legalEn } from "./en/legal";
import { work as workFr } from "./fr/work";
import { work as workEn } from "./en/work";

export { ANCHORS, ROUTES, homePath, localePrefix, locales, path } from "@/lib/routes";
export type { Locale } from "@/lib/routes";
export type { SiteContent, WorkContent, WorkItem, WorkKind } from "./types";
export type { LegalBlock, LegalSection, LegalTexts } from "./legal-shared";
export { SMART_ACTIVITY_NUMBER } from "./legal-shared";

export const content: Record<Locale, SiteContent> = { fr, en };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

/** Le texte des pages légales, par langue. */
export const LEGAL: Record<Locale, LegalTexts> = { fr: legalFr, en: legalEn };

/** La page Réalisations et ses fiches, par langue. */
export const WORK: Record<Locale, WorkContent> = { fr: workFr, en: workEn };

/**
 * Les seuls textes dont la barre et les deux menus ont besoin. `Shell`, un
 * composant serveur, les calcule et les passe en props : les composants
 * interactifs n'importent jamais ce dossier (K9).
 */
export function headerCopy(locale: Locale) {
  const c = getContent(locale);
  return {
    site: c.site,
    bricks: c.solutions.bricks.map(({ slug, title, benefit, visual }) => ({ slug, title, benefit, visual })),
  };
}
export type HeaderCopy = ReturnType<typeof headerCopy>;
export type BookingCopy = SiteContent["contact"]["booking"];
export type ContactFormCopy = SiteContent["contact"]["form"];
