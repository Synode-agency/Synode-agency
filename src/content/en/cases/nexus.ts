import type { CaseStudy } from "../../types";

export const nexus = {
  slug: "nexus",
  name: "Nexus",
  status: "live",
  summary: "A B2B prospecting tool that gathers data and ranks leads.",
  note: "Demo shown with sample data",
  metaTitle: "Nexus · Our work · Synode",
  metaDescription: "Nexus, Synode’s B2B prospecting tool: find companies, qualify them with AI and prepare a first approach.",
  sector: "Sales prospecting · internal tool",
  year: "2026",
  problem:
    "A sales team spends hours searching for companies, understanding what they do and deciding who to contact. That was us, for our own prospecting in Brussels and Belgium.",
  built:
    "Nexus finds companies from public sources, gathers the useful information and ranks them by priority. AI summarises each company and drafts a first message; a person reviews it and sends it.",
  results: [
    "Nexus is the software we use for our own prospecting.",
    "Research, qualification and message preparation happen in one place.",
    "No message goes out without a person reviewing it.",
  ],
  quote: { text: "", author: "" },
  tech: "AI: Claude (Anthropic) · Database: Supabase · Source: Google Maps",
} satisfies CaseStudy;
