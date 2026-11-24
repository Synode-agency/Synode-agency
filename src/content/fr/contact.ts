/** La page Contact : calendrier et formulaire. */
export const contact = {
  metaTitle: "Parlons de votre projet",
  metaDescription:
    "Réservez un échange gratuit de 30 minutes avec Synode, agence technologique à Bruxelles, ou décrivez votre besoin par écrit. Sans engagement.",
  kicker: "Contact",
  title: "Parlons de\n^votre projet",
  text: "Un premier échange gratuit et sans engagement. Nous cherchons à comprendre votre situation et à identifier une première piste. Ce n’est pas un audit technique complet.",

  booking: {
    title: "Réserver un échange de 30 minutes",
    text: "Un premier échange gratuit et sans engagement. Nous cherchons à comprendre votre situation et à identifier une première piste. Ce n’est pas un audit technique complet.",
    openLabel: "Ouvrir le calendrier",
    closedTitle: "Choisissez votre créneau",
    closedText: "30 minutes en visio, gratuit et sans engagement.",
    /* La phrase qui fait du clic un choix éclairé : voir `Booking`. */
    closedNote: "L’agenda est fourni par Cal.com. Il n’est chargé qu’à l’ouverture et peut alors utiliser ses propres cookies.",
    closedNoteLink: "En savoir plus",
  },

  form: {
    title: "Décrire votre besoin par écrit",
    text: "Si vous préférez écrire, ou si aucun créneau ne vous convient.",
    fields: {
      name: { label: "Nom", placeholder: "Votre nom" },
      email: { label: "E-mail de contact", placeholder: "vous@exemple.com" },
      company: { label: "Entreprise ou activité", placeholder: "Facultatif", optional: "Facultatif" },
      need: { label: "Que souhaitez-vous améliorer aujourd’hui ?", placeholder: "Décrivez la tâche qui vous coûte le plus de temps, ou les logiciels que vous aimeriez relier.", hint: "Un exemple concret vaut mieux qu’une description générale." },
      phone: { label: "Téléphone", placeholder: "Facultatif", optional: "Facultatif" },
      website: { label: "Site internet", placeholder: "Facultatif", optional: "Facultatif" },
      timeline: { label: "Échéance envisagée", optional: "Facultatif" },
      budget: { label: "Budget envisagé", optional: "Facultatif" },
    },
    timelineOptions: ["À définir", "Dès que possible", "Dans 1 à 3 mois", "Dans 3 à 6 mois", "Plus tard"],
    budgetOptions: ["À définir", "Moins de 5 000 €", "5 000 à 15 000 €", "15 000 à 40 000 €", "Plus de 40 000 €"],
    submit: "Envoyer mon message",
    sending: "Envoi en cours…",
    privacyNote: "Vos informations servent uniquement à traiter votre demande et sont conservées 12 mois après le dernier échange. Responsables : Antonino Lo Bianco et Killian Schoebben (Synode). Pas de newsletter, pas de revente.",
    privacyLink: "Comment nous traitons vos données",
    errors: {
      name: "Indiquez votre nom.",
      email: "Indiquez une adresse e-mail.",
      emailInvalid: "Cette adresse email semble incorrecte.",
      need: "Décrivez votre besoin en quelques mots (10 caractères minimum).",
      website: "Cette adresse de site semble incorrecte.",
      tooLong: "Ce champ est trop long.",
      rateLimited: "Vous venez d’envoyer une demande. Patientez un instant avant de recommencer.",
      server: "Nous n’avons pas pu enregistrer votre demande. Votre texte est conservé : réessayez dans un instant.",
      notConfigured:
        "L’envoi de messages n’est pas encore activé sur cette version du site. Votre texte est conservé ci-dessous ; écrivez-nous directement à contact@synode-agency.com en attendant.",
    },
  },
} as const;
