/**
 * LA PAGE CONTACT (brief de la refonte, 6.5) : le calendrier d'abord, puis
 * l'e-mail et un formulaire à trois champs, puis ce qui se passe ensuite.
 * « Gratuit et sans engagement » n'est écrit qu'une fois, dans le hero.
 */
export const contact = {
  metaTitle: "Contact · Réserver un appel · Synode",
  metaDescription: "Réservez un appel gratuit de 30 minutes pour parler de votre projet.",

  hero: {
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    accents: ["votre projet"],
    text: "30 minutes en visio pour comprendre votre besoin et voir si nous pouvons vous aider. Gratuit et sans engagement.",
  },

  booking: {
    title: "Réserver un appel de 30 minutes",
    text: "30 minutes en visio pour comprendre votre besoin.",
    openLabel: "Ouvrir le calendrier",
    closedTitle: "Choisissez votre créneau",
    closedText: "30 minutes en visio.",
    /* La phrase qui fait du clic un choix éclairé : voir `Booking`. */
    closedNote: "L’agenda est fourni par Cal.com. Il n’est chargé qu’à l’ouverture et peut alors utiliser ses propres cookies.",
    closedNoteLink: "En savoir plus",
    /* La phrase écrite dans l'appel final de l'accueil, rappelée ici et
       transmise à Cal.com (26/11/2026). */
    projetLabel: "Votre projet",
  },

  write: {
    title: "Vous préférez écrire ?",
    text: "Écrivez-nous à",
    or: "ou laissez-nous un message ici.",
    /* [À COMPLÉTER] le délai de réponse, par exemple « 24 h ouvrées ».
       Vide, la phrase ne s'affiche pas : on ne promet pas un délai qu'on
       ne sait pas tenir. */
    replyDelay: "",
  },

  next: {
    title: "Ce qui se passe ensuite",
    items: [
      "On écoute votre besoin.",
      "On vous dit honnêtement si on peut aider.",
      "Si oui, on vous propose un cadrage.",
    ],
  },

  /* Trois champs (brief, 6.5) : nom, e-mail, message. */
  form: {
    fields: {
      name: { label: "Nom", placeholder: "Votre nom" },
      email: { label: "E-mail", placeholder: "vous@exemple.com" },
      need: {
        label: "Votre message",
        placeholder: "Décrivez la tâche qui vous fait perdre du temps, ou les logiciels que vous aimeriez relier.",
        hint: "Un exemple concret vaut mieux qu’une description générale.",
      },
    },
    submit: "Envoyer mon message",
    sending: "Envoi en cours…",
    privacyNote: "Vos informations servent uniquement à traiter votre demande et sont conservées 12 mois après le dernier échange. Responsables : Antonino Lo Bianco et Killian Schoebben (Synode). Pas de newsletter, pas de revente.",
    privacyLink: "Comment nous traitons vos données",
    errors: {
      name: "Indiquez votre nom.",
      email: "Indiquez une adresse e-mail.",
      emailInvalid: "Cette adresse e-mail semble incorrecte.",
      need: "Décrivez votre besoin en quelques mots (10 caractères minimum).",
      tooLong: "Ce champ est trop long.",
      rateLimited: "Vous venez d’envoyer une demande. Patientez un instant avant de recommencer.",
      server: "Nous n’avons pas pu enregistrer votre demande. Votre texte est conservé : réessayez dans un instant.",
      notConfigured:
        "L’envoi de messages n’est pas encore activé sur cette version du site. Votre texte est conservé ci-dessous ; écrivez-nous directement à contact@synode-agency.com en attendant.",
    },
  },
} as const;
