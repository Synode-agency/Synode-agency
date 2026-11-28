import { ctaLabel } from "../cta";

/**
 * La page affichée après l'envoi du formulaire (`/merci`, hors index),
 * maquette « B, la suite », choisie par Antonino le 28/11/2026 : le message
 * à gauche, les trois étapes qui suivent à droite.
 */
export const thanks = {
  metaTitle: "Message bien reçu",
  title: "Votre message a bien été reçu.",
  accents: ["message"],
  text: "Nous l’avons enregistré. Voici ce qui se passe maintenant.",
  /* On ne promet pas de délai : la référence l'interdit tant qu'il n'est
     pas tenable. L'accusé de réception part par Brevo après
     l'enregistrement (`sendAcknowledgement`). La dernière étape porte le
     bouton de l'appel. */
  steps: [
    {
      title: "Un accusé de réception",
      text: "Un e-mail de confirmation part à l’adresse que vous avez indiquée.",
    },
    {
      title: "Notre réponse",
      text: "Nous lisons votre demande et nous revenons vers vous par e-mail.",
    },
    {
      title: "Un appel, si c’est urgent",
      text: "Ce message n’est pas un rendez-vous. Pour en fixer un, réservez directement un appel.",
    },
  ],
  bookCta: ctaLabel.fr,
  homeCta: "Revenir à l’accueil",
} as const;
