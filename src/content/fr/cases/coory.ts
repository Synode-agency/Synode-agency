import type { CaseStudy } from "../../types";

/** COORY, la plateforme de coaching sportif. [À COMPLÉTER] un résultat ou
 *  le retour d'un utilisateur, quand il existera. */
export const coory = {
  slug: "coory",
  name: "Coory",
  status: "beta",
  summary: "Une plateforme de coaching avec un assistant IA dont le coach valide chaque action.",
  note: "",
  metaTitle: "Coory · Réalisations · Synode",
  metaDescription: "Coory, conçu par Synode, réunit les sportifs, les programmes, l’agenda et les paiements d’un coach sportif, avec un assistant IA validé par le coach.",
  sector: "Coaching sportif",
  year: "2026",
  problem:
    "Un coach sportif à Bruxelles préparait ses programmes dans des tableurs, recopiait à la main exercices, dates et charges, puis exportait chaque programme en PDF. Ses sportifs, ses séances et ses paiements vivaient dans des outils séparés.",
  built:
    "Coory réunit dans une seule application les sportifs, les programmes (musculation, running, Hyrox, hybride), l’agenda et le suivi des paiements. Un assistant IA prépare les actions courantes ; le coach valide chacune avant qu’elle soit enregistrée.",
  results: [
    "L’espace coach est opérationnel ; l’espace sportif est en préparation.",
    "Coory est conçu et testé avec un coach en activité.",
    "Les programmes sont mis en page et remis en PDF depuis l’application.",
  ],
  quote: { text: "", author: "" },
  tech: "Next.js · Supabase (hébergement dans l’UE) · Vercel · IA : Claude (Anthropic)",
} satisfies CaseStudy;
