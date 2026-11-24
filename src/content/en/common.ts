import { ROUTES } from "@/lib/routes";
import { ctaLabel } from "../cta";
import type { SiteContent } from "../types";

const nav = [
  { href: ROUTES.services, label: "Services" },
  { href: ROUTES.work, label: "Work" },
  { href: ROUTES.about, label: "About" },
] as const;

const footerNav = [...nav, { href: ROUTES.contact, label: "Contact" }] as const;

/** Le socle commun : nom, contact, menu, bouton, pied de page et appel final. */
export const site = {
  name: "Synode",
  email: "contact@synode-agency.com",
  agency: "Software development & AI agency in Brussels",
  nav,
  footerNav,
  footerTagline: "Custom software, integrations and AI. Brussels.",
  cta: ctaLabel.en,
  ctaNote: "Free, no commitment.",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  menuDialog: "Menu",
  homeLabel: "Synode, back to home",
  skip: "Skip to content",
  langLabel: "Language",
  navLabel: "Navigation",
  legalLabel: "Legal",
  legalLinks: { notice: "Legal notice", privacy: "Privacy" },
  copyright: "Synode",
  steps: {
    title: "How it works",
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
