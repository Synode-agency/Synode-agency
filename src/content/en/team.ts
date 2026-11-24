import type { SiteContent } from "../types";

/** La page Équipe, qui devient À propos à l'étape 7 de la refonte. */
export const team = {
  metaTitle: "The Synode team: Antonino and Killian",
  metaDescription:
    "The Synode team, a technology agency in Brussels: Antonino (AI agents, integrations and software) and Killian (AI agents, automation and data).",
  kicker: "The team",
  title: "Why we are\n^building Synode",
  vision:
    "Synode is a Brussels-based technology agency founded by Antonino and Killian. We bring AI into organisations, connect their software and build custom business software, based on their processes, tools and data.",
  peopleTitle: "Two developers with complementary expertise",
  people: [
    {
      first: "Antonino", last: "Lo Bianco", photo: "/equipe/AntoEquipe.webp", role: "Co-founder · AI agents, integrations & software",
      text: "Antonino designs AI agents, connects your tools and builds the business software your teams need. He starts from your processes to deliver a solution that fits your environment.",
    },
    {
      first: "Killian", last: "Schoebben", photo: "/equipe/KillianEquipe.webp", role: "Co-founder · AI agents, automation & data",
      text: "Killian designs AI agents, automates repetitive tasks and puts your data to work in useful dashboards and indicators. He turns the scoped need into a tested solution suited to your business.",
    },
  ],
  complementTitle: "A complementary team,\nfrom AI to software",
  complementText: "Our team combines process analysis, AI agent design, automation, application development and software integration. These capabilities come together in a solution aligned with your organisation.",
  workingTitle: "How we support\nyour project",
  working: [
    "One named contact for your project, from initial scoping to go-live.",
    "An analysis of your processes, data and software connections before development starts.",
    "Visible stages, tests on real cases and human approvals defined with you.",
    "Clear documentation and maintenance terms agreed before deployment.",
  ],
  cta: "Let’s talk about your project",
  ctaText:
    "Antonino designs agents, connects your tools and builds software; Killian designs agents, automates your processes and puts your data to work. We built this site ourselves, and we design your custom solutions the same way: one named contact for your project, from scoping to go-live.",
} as const satisfies SiteContent["team"];
