/** La page affichée après l'envoi du formulaire (`/merci`, hors index). */
export const thanks = {
  metaTitle: "Message bien reçu",
  title: "Votre message\n^a bien été reçu",
  text: "Nous l’avons enregistré et nous revenons vers vous. Si votre demande est urgente, réservez directement un créneau : c’est le chemin le plus rapide.",
  /* On ne promet pas de délai : la référence l'interdit tant qu'il n'est
     pas tenable. */
  notBooked: "Ce message n’est pas un rendez-vous. Pour en fixer un, passez par le calendrier.",
  bookCta: "Réserver un échange gratuit",
  homeCta: "Revenir à l’accueil",
} as const;
