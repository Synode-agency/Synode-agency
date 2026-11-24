import type { SiteContent } from "../types";

export const about = {
  metaTitle: "About · Synode, Brussels agency",
  metaDescription: "Two founding developers, one point of contact. See how we work.",

  hero: {
    eyebrow: "About",
    title: "Two developers, one point of contact",
    accents: ["one point of contact"],
    text: "Synode is a software development and AI agency in Brussels, founded by Antonino Lo Bianco and Killian Schoebben. We design, build and maintain every solution ourselves.",
  },

  founders: {
    title: "The founders",
    people: [
      {
        first: "Antonino", last: "Lo Bianco", photo: "/equipe/AntoEquipe.webp", role: "Co-founder · AI agents, integrations & software",
        text: "Antonino designs AI agents, connects your tools and builds the software your teams need. He starts from your processes to deliver a solution that fits your environment.",
      },
      {
        first: "Killian", last: "Schoebben", photo: "/equipe/KillianEquipe.webp", role: "Co-founder · AI agents, automation & data",
        text: "Killian designs AI agents, automates repetitive tasks and puts your data to work in useful dashboards. He turns the scoped need into a tested solution suited to your business.",
      },
    ],
  },

  values: {
    title: "How we work",
    items: [
      { strong: "We start from what you have.", rest: " Your tools stay at the centre." },
      { strong: "You stay in control.", rest: " You decide what AI does on its own." },
      { strong: "We stay after launch.", rest: " Documentation, training and support." },
    ],
  },

  method: {
    title: "How we work, step by step",
    details: [
      "You tell us about the task, the tools and the people involved. We tell you honestly whether we can help, and how.",
      "We study your tools, your data and your rules. You get a document setting out what we’ll build, the timeline and the price, to approve before we start.",
      "We set the solution up in your tools, train your team and hand over the documentation. After that, we stay reachable, and support can continue on a contract.",
    ],
  },
} as const satisfies SiteContent["about"];
