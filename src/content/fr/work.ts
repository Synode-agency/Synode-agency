/**
 * LA PAGE RÉALISATIONS ET LES LIBELLÉS DES FICHES (brief, 6.3). Le contenu
 * de chaque réalisation est dans `cases/`.
 */
export const work = {
  metaTitle: "Réalisations · Synode",
  metaDescription: "Des outils en production construits par Synode : prospection B2B, coaching avec IA…",
  hero: {
    eyebrow: "Réalisations",
    title: "Nos réalisations",
    subtitle: "Des outils en production, construits pour un vrai usage.",
  },
  /* Les libellés de la fiche détaillée, dans l'ordre du brief. */
  detail: {
    sector: "Secteur",
    status: "Statut",
    year: "Année",
    problem: "Le problème",
    built: "Ce qu’on a construit",
    result: "Le résultat",
    tech: "Technologies",
    back: "Toutes nos réalisations",
    screens: "Les écrans",
  },
  /* L'accès de démonstration de Coory (compte partagé, données fictives),
     affiché seulement si son adresse est configurée (`lib/coory-demo.ts`). */
  demo: {
    title: "Essayer Coory",
    text: "Un compte de démonstration, avec des données fictives remises à zéro chaque nuit.",
    link: "Ouvrir la démo",
    email: "E-mail",
    password: "Mot de passe",
  },
} as const;
