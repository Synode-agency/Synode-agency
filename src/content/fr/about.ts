/**
 * LA PAGE À PROPOS (brief de la refonte, 6.4) : les fondateurs, trois
 * valeurs et la méthode détaillée. C'est le seul endroit du site où les
 * trois étapes sont détaillées (leurs titres sont dans `common.ts`).
 */
export const about = {
  metaTitle: "À propos · Synode, agence à Bruxelles",
  metaDescription: "Deux développeurs fondateurs, un seul interlocuteur. Découvrez notre façon de travailler.",

  hero: {
    eyebrow: "À propos",
    title: "Deux développeurs, un seul interlocuteur",
    accents: ["un seul interlocuteur"],
    text: "Synode est une agence de développement logiciel et d’IA à Bruxelles, fondée par Antonino Lo Bianco et Killian Schoebben. Nous concevons, construisons et maintenons nous-mêmes chaque solution.",
  },

  founders: {
    title: "Les fondateurs",
    /* [À COMPLÉTER] parcours, années d'expérience, ce qu'ils aiment
       construire ; photos professionnelles, même fond, même cadrage. */
    people: [
      {
        first: "Antonino", last: "Lo Bianco", photo: "/equipe/AntoEquipe.webp", role: "Cofondateur · Agents IA, intégrations & logiciels",
        text: "Antonino conçoit les agents IA, connecte vos outils entre eux et développe les logiciels dont vos équipes ont besoin. Il part de vos processus pour livrer une solution intégrée à votre environnement.",
      },
      {
        first: "Killian", last: "Schoebben", photo: "/equipe/KillianEquipe.webp", role: "Cofondateur · Agents IA, automatisations & data",
        text: "Killian conçoit les agents IA, automatise les tâches répétitives et exploite vos données pour en tirer des tableaux de bord utiles. Il transforme le besoin cadré en une solution testée et adaptée à votre activité.",
      },
    ],
  },

  values: {
    title: "Notre façon de travailler",
    items: [
      { strong: "On part de l’existant.", rest: " Vos outils restent au centre." },
      { strong: "Vous gardez la main.", rest: " Vous décidez ce que l’IA fait seule." },
      { strong: "On reste là après.", rest: " Documentation, formation et suivi." },
    ],
  },

  method: {
    title: "Comment nous travaillons, étape par étape",
    /* Le détail des trois étapes de `common.ts`, dans le même ordre. */
    details: [
      "Vous nous décrivez la tâche, les outils et les personnes concernées. Nous vous disons honnêtement si nous pouvons aider, et comment.",
      "Nous étudions vos outils, vos données et vos règles. Vous recevez un document qui fixe ce que nous construisons, le délai et le prix, à valider avant de commencer.",
      "Nous installons la solution dans vos outils, formons votre équipe et remettons la documentation. Ensuite, nous restons joignables, et le suivi peut continuer par contrat.",
    ],
  },
} as const;
