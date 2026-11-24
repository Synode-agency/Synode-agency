import { ROUTES } from "@/lib/routes";

const nav = [
  { href: ROUTES.home, label: "Accueil" },
  { href: ROUTES.solutions, label: "Solutions" },
  { href: ROUTES.useCases, label: "Cas d’usage" },
  { href: ROUTES.work, label: "Réalisations" },
  { href: ROUTES.team, label: "Équipe" },
  { href: ROUTES.contact, label: "Contact" },
] as const;

/** Le socle commun : nom, contact, menu, boutons et libellés de la barre et du pied de page. */
export const site = {
  name: "Synode",
  email: "contact@synode-agency.com",
  location: "Bruxelles, Belgique",
  tagline:
    "Solutions sur mesure, avec l’IA intégrée : systèmes connectés et logiciels métier, conçus autour de votre activité.",
  nav,
  cta: "Réserver un échange gratuit",
  ctaShort: "Réserver un échange",
  menuOpen: "Ouvrir le menu",
  menuClose: "Fermer le menu",
  homeLabel: "Synode, retour à l’accueil",
  skip: "Aller au contenu",
  langLabel: "Langue",
  footerNav: "Navigation",
  footerLegal: "Informations légales",
  copyright: "Synode agency",
} as const;
