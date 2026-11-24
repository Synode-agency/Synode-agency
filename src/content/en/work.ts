import type { SiteContent } from "../types";

export const work = {
  metaTitle: "Our work · Synode",
  metaDescription: "Tools in production built by Synode: B2B prospecting, AI-assisted coaching…",
  hero: {
    eyebrow: "Work",
    title: "Our work",
    subtitle: "Tools in production, built for real use.",
  },
  detail: {
    sector: "Sector",
    status: "Status",
    year: "Year",
    problem: "The problem",
    built: "What we built",
    result: "The result",
    tech: "Technology",
    back: "All our work",
    screens: "The screens",
  },
  demo: {
    title: "Try Coory",
    text: "A demo account with sample data reset every night. Coory is available in French only.",
    link: "Open the demo",
    email: "Email",
    password: "Password",
  },
} as const satisfies SiteContent["work"];
