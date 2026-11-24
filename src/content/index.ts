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
import type { CaseStudy, SiteContent } from "./types";
import type { LegalTexts } from "./legal-shared";
import { fr } from "./fr";
import { en } from "./en";
import { legalTexts as legalFr } from "./fr/legal";
import { legalTexts as legalEn } from "./en/legal";
import { nexus as nexusFr } from "./fr/cases/nexus";
import { coory as cooryFr } from "./fr/cases/coory";
import { nexus as nexusEn } from "./en/cases/nexus";
import { coory as cooryEn } from "./en/cases/coory";

export { ANCHORS, ROUTES, bookingAnchor, bookingHref, homePath, includedAnchor, localePrefix, locales, path, serviceAnchor, serviceHref, switchLocalePath, translateHash } from "@/lib/routes";
export type { Locale, ServiceKey } from "@/lib/routes";
export type { CaseCard, CaseStatus, CaseStudy, SiteContent } from "./types";
export type { LegalBlock, LegalSection, LegalTexts } from "./legal-shared";
export { SMART_ACTIVITY_NUMBER } from "./legal-shared";

export const content: Record<Locale, SiteContent> = { fr, en };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

/** Le texte des pages légales, par langue. */
export const LEGAL: Record<Locale, LegalTexts> = { fr: legalFr, en: legalEn };

/**
 * Les réalisations, dans l'ordre de leurs cartes. Le premier cas client
 * avec un résultat chiffré viendra ici, quand il existera (brief, 6.1).
 */
export const CASES: Record<Locale, readonly CaseStudy[]> = {
  fr: [nexusFr, cooryFr],
  en: [nexusEn, cooryEn],
};

/** Une réalisation par son adresse, ou rien. */
export function findCase(locale: Locale, slug: string) {
  return CASES[locale].find((c) => c.slug === slug);
}

/**
 * Les seuls textes dont la barre et les deux menus ont besoin. `Shell`, un
 * composant serveur, les calcule et les passe en props : les composants
 * interactifs n'importent jamais ce dossier (K9).
 */
export function headerCopy(locale: Locale) {
  return { site: getContent(locale).site };
}
export type HeaderCopy = ReturnType<typeof headerCopy>;
export type BookingCopy = SiteContent["contact"]["booking"];
export type ContactFormCopy = SiteContent["contact"]["form"];
