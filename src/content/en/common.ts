import { ROUTES } from "@/lib/routes";
import type { SiteContent } from "../types";

const nav = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.solutions, label: "Solutions" },
  { href: ROUTES.useCases, label: "Use cases" },
  { href: ROUTES.work, label: "Work" },
  { href: ROUTES.team, label: "Team" },
  { href: ROUTES.contact, label: "Contact" },
] as const;

/** Le socle commun : nom, contact, menu, boutons et libellés de la barre et du pied de page. */
export const site = {
  name: "Synode",
  email: "contact@synode-agency.com",
  location: "Brussels, Belgium",
  tagline:
    "Custom solutions, with built-in AI: connected systems and business software, built around how you work.",
  nav,
  cta: "Book a free call",
  ctaShort: "Book a call",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  homeLabel: "Synode, back to home",
  skip: "Skip to content",
  langLabel: "Language",
  footerNav: "Navigation",
  footerLegal: "Legal",
  copyright: "Synode agency",
} as const satisfies SiteContent["site"];
