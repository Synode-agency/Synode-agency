import { ROUTES } from "@/lib/routes";
import { ctaLabel } from "../cta";

/* Le menu du haut : trois pages. Le logo mène à l'accueil, le bouton à
   Contact (brief, 4.2). */
const nav = [
  { href: ROUTES.services, label: "Services" },
  { href: ROUTES.work, label: "Réalisations" },
  { href: ROUTES.about, label: "À propos" },
] as const;

/* Le pied de page : les mêmes, plus Contact (brief, 4.3). */
const footerNav = [...nav, { href: ROUTES.contact, label: "Contact" }] as const;

/** Le socle commun : nom, contact, menu, bouton, pied de page et appel final. */
export const site = {
  name: "Synode",
  email: "contact@synode-agency.com",
  /* Comment Synode se présente (décision d'Antonino du 24/11/2026). */
  agency: "Agence de développement logiciel & IA à Bruxelles",
  nav,
  footerNav,
  footerTagline: "Logiciels sur mesure, intégrations et IA. Bruxelles.",
  cta: ctaLabel.fr,
  /* La mention sous le bouton du menu de téléphone. */
  ctaNote: "Gratuit, sans engagement.",
  menuOpen: "Ouvrir le menu",
  menuClose: "Fermer le menu",
  menuDialog: "Menu",
  homeLabel: "Synode, retour à l’accueil",
  skip: "Aller au contenu",
  langLabel: "Langue",
  navLabel: "Navigation principale",
  footerNavLabel: "Plan du site",
  legalLabel: "Informations légales",
  legalLinks: { notice: "Mentions légales", privacy: "Confidentialité" },
  copyright: "Synode",
  /* LES TROIS ÉTAPES, les mêmes partout (brief, 6.1 et 6.4) : courtes sur
     l'accueil, détaillées sur À propos. « Gratuit » n'est pas répété ici :
     il est sous le bouton du hero (décision du 24/11/2026). */
  steps: {
    title: "Comment ça marche",
    items: [
      { title: "Un appel de 30 min.", text: "Vous nous décrivez une tâche qui vous fait perdre du temps." },
      { title: "Un cadrage écrit.", text: "Ce qu’on construit, en combien de temps, pour quel prix." },
      { title: "Livraison et suivi.", text: "On installe, on forme votre équipe, on reste disponibles." },
    ],
  },
  /* Les pastilles d'état des réalisations, et le lien de leurs cartes. */
  caseStatus: { live: "En production", beta: "Bêta", demo: "Démo" },
  caseLink: "Découvrir le projet",
  /* L'appel de fin de page, le même partout (brief, 6.1 et 6.2). */
  finalCta: {
    title: "Une tâche vous fait perdre du temps ?",
    text: "Parlons-en 30 minutes. Un seul processus à améliorer suffit pour commencer.",
  },
} as const;
