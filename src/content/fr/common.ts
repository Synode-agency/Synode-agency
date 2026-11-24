import { ROUTES } from "@/lib/routes";
import { ctaLabel } from "../cta";

/* Le menu du haut : trois pages. Le logo mène à l'accueil, le bouton à
   Contact (brief, 4.2). Les adresses pointent encore sur les pages
   actuelles : elles passent à /services et /a-propos quand ces pages
   existent (étapes 5 et 7 de la refonte). */
const nav = [
  { href: ROUTES.solutions, label: "Services" },
  { href: ROUTES.work, label: "Réalisations" },
  { href: ROUTES.team, label: "À propos" },
] as const;

/* Le pied de page : les mêmes, plus Contact (brief, 4.3). */
const footerNav = [...nav, { href: ROUTES.contact, label: "Contact" }] as const;

/** Le socle commun : nom, contact, menu, bouton, pied de page et appel final. */
export const site = {
  name: "Synode",
  email: "contact@synode-agency.com",
  /* Comment Synode se présente (décision d'Antonino du 24/11/2026). */
  agency: "Agence de développement logiciel & IA à Bruxelles",
  /* La description par défaut des pages, pour Google. Revue à l'étape 12
     de la refonte (SEO). */
  tagline:
    "Solutions sur mesure, avec l’IA intégrée : systèmes connectés et logiciels métier, conçus autour de votre activité.",
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
  navLabel: "Navigation",
  legalLabel: "Informations légales",
  legalLinks: { notice: "Mentions légales", privacy: "Confidentialité" },
  copyright: "Synode",
  /* L'appel de fin de page, le même partout (brief, 6.1 et 6.2). */
  finalCta: {
    title: "Une tâche vous fait perdre du temps ?",
    text: "Parlons-en 30 minutes. Un seul processus à améliorer suffit pour commencer.",
  },
} as const;
