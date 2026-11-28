/**
 * LA PAGE D'ERREUR (maquette « A », choisie par Antonino le 28/11/2026),
 * affichée quand une page plante (`error.tsx`).
 *
 * Hors de l'index des contenus, exprès : la page d'erreur est un composant
 * client, et l'index tirerait tout le contenu du site (les deux langues,
 * les textes légaux) dans le JavaScript de chaque page. Elle ne lit que ce
 * fichier et `common.ts`.
 *
 * Le texte s'arrête avant l'adresse e-mail, ajoutée en lien par la page.
 */
export const erreur = {
  documentTitle: "Problème technique",
  title: "Un problème technique est survenu.",
  accents: ["technique"],
  text: "La page n’a pas pu s’afficher. Réessayez dans un instant ; si le problème continue, écrivez-nous à",
  retry: "Réessayer",
  homeCta: "Revenir à l’accueil",
} as const;
