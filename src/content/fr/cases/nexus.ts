import type { CaseCard } from "../../types";

/** Nexus, sur l'accueil et la page Réalisations. La fiche détaillée suit à
 *  l'étape 6 de la refonte. */
export const nexus = {
  slug: "nexus",
  name: "Nexus",
  status: "live",
  summary: "Un outil de prospection B2B qui rassemble les données et priorise les prospects.",
  /* Obligatoire (brief, 6.1) : aucun vrai prospect n'apparaît sur le site. */
  note: "Démo présentée avec des données fictives",
} satisfies CaseCard;
