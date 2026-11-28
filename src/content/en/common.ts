import { ROUTES } from "@/lib/routes";
import { ctaLabel } from "../cta";
import { services } from "./services";
import type { SiteContent } from "../types";

const nav = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.services, label: "Services" },
  { href: ROUTES.work, label: "Work" },
  { href: ROUTES.about, label: "About" },
] as const;

const footerNav = [...nav, { href: ROUTES.contact, label: "Contact" }] as const;

/** Le socle commun : nom, contact, menu, bouton, pied de page et appel final. */
/* La phrase d'un service (celle de la page Services), pour le menu
   « Services » de la barre, où elle apparaît au survol (28/11/2026). Le
   retour à la ligne voulu pour la page Services n'y a pas sa place. */
const phraseDe = (key: string) => services.items.find((item) => item.key === key)?.sentence.replace(/\n/g, " ") ?? "";

export const site = {
  name: "Synode",
  email: "contact@synode-agency.com",
  agency: "Software development & AI agency in Brussels",
  nav,
  footerNav,
  footerTagline: "Software · AI · Systems · Web",
  location: "Brussels, Belgium",
  cta: ctaLabel.en,
  contactLabel: "Contact",
  menuServices: [
    { key: "software", title: "Software development", text: "Desktop, web and SaaS software", image: "/images/services/service-logiciel.webp", focus: "50% 55%", phrase: phraseDe("software") },
    { key: "ai", title: "Artificial intelligence & automation", text: "Automations, AI assistants", image: "/images/services/service-ia.webp", focus: "55% 38%", phrase: phraseDe("ai") },
    { key: "connect", title: "Integration & connected systems", text: "CRM, ERP, invoicing, APIs", image: "/images/services/service-integration.webp", focus: "62% 52%", phrase: phraseDe("connect") },
    { key: "web", title: "Websites & mobile apps", text: "Websites, iPhone and Android", image: "/images/services/service-web.webp", focus: "45% 42%", phrase: phraseDe("web") },
  ] as const,
  menuOpen: "Open menu",
  servicesToggle: "Show services",
  servicesAll: "See all our services",
  menuClose: "Close menu",
  menuDialog: "Menu",
  homeLabel: "Synode, back to home",
  skip: "Skip to content",
  langLabel: "Language",
  navLabel: "Main navigation",
  footerNavLabel: "Navigation",
  legalLabel: "Legal",
  legalLinks: { notice: "Legal notice", privacy: "Privacy" },
  copyright: "Synode",
  steps: {
    items: [
      { title: "A 30-min call.", text: "Tell us about one task that wastes your time." },
      { title: "A written scope.", text: "What we’ll build, how long it takes, what it costs." },
      { title: "Delivery and support.", text: "We set it up, train your team and stay available." },
    ],
  },
  caseStatus: { live: "Live", beta: "Beta", demo: "Demo" },
  caseLink: "Explore the project",
  finalCta: {
    title: "Is one task eating your time?",
    text: "Let’s talk for 30 minutes. One process to improve is enough to start.",
  },
} as const satisfies SiteContent["site"];
