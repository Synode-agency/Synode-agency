import { WORK, type Locale } from "@/content";
export type { WorkItem, WorkKind } from "@/content";

/**
 * Les réalisations.
 *
 * La page présente uniquement les projets dont l'état et le fonctionnement
 * peuvent être décrits honnêtement. Nexus est un outil interne opérationnel ;
 * Coory est une plateforme de coaching sportif dont l'espace coach est
 * terminé ; les futurs projets clients ne seront publiés qu'avec leur
 * autorisation.
 *
 * Pour ajouter une vraie réalisation : compléter l'entrée, poser `todo` à
 * `false`, puis la relier à un cas d'usage lorsqu'elle l'illustre.
 *
 * Les textes vivent dans `src/content/{fr,en}/work.ts` : ce fichier ne garde
 * que la logique.
 */

export function work(locale: Locale) {
  return WORK[locale];
}

export function workItems(locale: Locale) {
  return work(locale).items;
}

/** La carte de Coory, partagée entre l'accueil, la page Réalisations et
 * les données structurées de cette page. Ses textes : `cooryCard` dans
 * `src/content/{fr,en}/work.ts`. */
export function cooryCardCopy(locale: Locale) {
  return work(locale).cooryCard;
}

/**
 * L'accès de démonstration de Coory (compte partagé, données fictives remises
 * à zéro chaque nuit, Assistant IA inclus), décidé le 14/11/2026.
 *
 * Les valeurs viennent des variables Netlify, JAMAIS du code : on change le
 * mot de passe ou le code d'accès sans toucher au site.
 *   NEXT_PUBLIC_COORY_DEMO_URL       adresse de connexion (…/login)
 *   NEXT_PUBLIC_COORY_DEMO_EMAIL     adresse du compte de démo
 *   NEXT_PUBLIC_COORY_DEMO_PASSWORD  son mot de passe, public par nature
 *
 * Le code d'accès de la bêta (inscription libre) n'est PLUS affiché depuis le
 * 15/11/2026 : les visiteurs de Synode n'essaient Coory que par ce compte.
 *
 * ⚠ Sans adresse, le bouton « Essayer la démo » s'affiche désactivé, sans lien,
 * et l'encadré des accès n'apparaît pas.
 */
export const COORY_DEMO = {
  url: process.env.NEXT_PUBLIC_COORY_DEMO_URL ?? "",
  email: process.env.NEXT_PUBLIC_COORY_DEMO_EMAIL ?? "",
  password: process.env.NEXT_PUBLIC_COORY_DEMO_PASSWORD ?? "",
};
export const COORY_DEMO_URL = COORY_DEMO.url;

export function findWork(locale: Locale, slug: string) {
  return workItems(locale).find((w) => w.slug === slug);
}
