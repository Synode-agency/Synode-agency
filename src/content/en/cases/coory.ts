import type { CaseStudy } from "../../types";

export const coory = {
  slug: "coory",
  name: "Coory",
  status: "beta",
  summary: "A coaching platform with an AI assistant whose every action the coach approves.",
  /* Coory n'existe qu'en français : le lecteur anglophone doit le savoir
     avant de cliquer (lot 8 de l'audit du 23/11/2026). */
  note: "Available in French only",
  metaTitle: "Coory · Our work · Synode",
  metaDescription: "Coory, built by Synode, brings together a sports coach’s athletes, programmes, schedule and payments, with an AI assistant the coach approves.",
  sector: "Sports coaching",
  year: "2026",
  problem:
    "A sports coach in Brussels built his programmes in spreadsheets, re-typed exercises, dates and loads by hand, then exported each programme to PDF. His athletes, sessions and payments lived in separate tools.",
  built:
    "Coory brings athletes, programmes (strength, running, Hyrox, hybrid), the schedule and payment tracking into one application. An AI assistant prepares everyday actions; the coach approves each one before it is saved.",
  results: [
    "The coach workspace is live; the athlete workspace is in preparation.",
    "Coory is designed and tested with a working coach.",
    "Programmes are laid out and delivered as PDF from the application.",
  ],
  quote: { text: "", author: "" },
  tech: "Next.js · Supabase (EU hosting) · Vercel · AI: Claude (Anthropic)",
} satisfies CaseStudy;
