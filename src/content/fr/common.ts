import { ROUTES } from "@/lib/routes";
import { ctaLabel } from "../cta";

/* Le menu du haut : l'accueil et trois pages, le bouton mène à Contact
   (brief, 4.2). « Accueil » ajouté le 25/11/2026 (demande d'Antonino) : au
   défilement, le logo part dans le bouton ☰, et le menu doit permettre de
   revenir à l'accueil. Même liste pour la barre, le menu ☰ et le pied. */
const nav = [
  { href: ROUTES.home, label: "Accueil" },
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
  /* Sous le logo du pied de page (25/11/2026, demande d'Antonino) : les
     quatre métiers, sans répéter le nom que le logo porte déjà. La ville
     passe dans la colonne de contact (`location`), comme sur le site en
     production. */
  footerTagline: "Logiciel · IA · Systèmes · Web",
  location: "Bruxelles, Belgique",
  cta: ctaLabel.fr,
  /* Le bouton de la barre (maquette du 24/11/2026) : « Contact », vers la
     page Contact. Le bouton principal reste dans les pages. */
  contactLabel: "Contact",
  /* LES MENUS (25/11/2026, fiche d'Antonino) : le méga-menu « Services » de
     la barre et les deux menus plein écran du bouton ☰ (ordinateur et
     téléphone). Les quatre services y sont les mêmes, avec leur photo (celle
     des cartes de l'accueil) et son cadrage (`focus`). */
  menuServices: [
    { key: "software", title: "Développement logiciel", text: "Logiciels de bureau, web et SaaS", image: "/images/services/service-logiciel.webp", focus: "50% 55%" },
    { key: "ai", title: "Intelligence artificielle & automatisation", text: "Automatisations, assistants IA", image: "/images/services/service-ia.webp", focus: "55% 38%" },
    { key: "connect", title: "Intégration & systèmes connectés", text: "CRM, ERP, facturation, API", image: "/images/services/service-integration.webp", focus: "62% 52%" },
    { key: "web", title: "Sites web & applications mobiles", text: "Sites, iPhone et Android", image: "/images/services/service-web.webp", focus: "45% 42%" },
  ] as const,
  menuOpen: "Ouvrir le menu",
  /* La petite flèche à côté de « Services » : ouvre la liste des services
     (le mot, lui, mène à la page Services). */
  servicesToggle: "Afficher les services",
  /* Le lien vers la page Services, sous les quatre cartes du menu ☰ de
     téléphone, où toucher « Services » déplie les cartes (28/11/2026). */
  servicesAll: "Voir tous nos services",
  menuClose: "Fermer le menu",
  menuDialog: "Menu",
  homeLabel: "Synode, retour à l’accueil",
  skip: "Aller au contenu",
  langLabel: "Langue",
  navLabel: "Navigation principale",
  /* Le titre de la colonne des liens du pied de page, comme en
     production ; il nomme aussi cette navigation pour les lecteurs
     d'écran. */
  footerNavLabel: "Navigation",
  legalLabel: "Informations légales",
  legalLinks: { notice: "Mentions légales", privacy: "Confidentialité" },
  copyright: "Synode",
  /* LES TROIS ÉTAPES, les mêmes partout (brief, 6.1 et 6.4) : courtes sur
     l'accueil, détaillées sur À propos. « Gratuit » n'est pas répété ici :
     il est sous le bouton du hero (décision du 24/11/2026). */
  steps: {
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
