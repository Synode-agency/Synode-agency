import type { CaseStudy } from "../../types";

/**
 * NEXUS, notre logiciel de prospection. Les écrans montrés sur le site
 * utilisent des données fictives : aucun vrai prospect n'apparaît, ni dans
 * le texte ni dans les images (décision d'Antonino du 24/11/2026).
 */
export const nexus = {
  slug: "nexus",
  name: "Nexus",
  status: "live",
  summary: "Un outil de prospection B2B qui rassemble les données et priorise les prospects.",
  note: "Démo présentée avec des données fictives",
  metaTitle: "Nexus · Réalisations · Synode",
  metaDescription: "Nexus, l’outil de prospection B2B de Synode : rechercher des entreprises, les qualifier avec l’IA et préparer un premier contact.",
  sector: "Prospection commerciale · outil interne",
  year: "2026",
  problem:
    "Une équipe commerciale passe des heures à chercher des entreprises, à comprendre leur activité et à décider qui contacter. C’était notre cas pour notre propre prospection, à Bruxelles et en Belgique.",
  built:
    "Nexus recherche les entreprises à partir de sources publiques, rassemble les informations utiles et les classe par priorité. L’IA résume chaque entreprise et prépare un premier message ; une personne le relit et l’envoie.",
  /* Pas de chiffre mesuré : des constats honnêtes (brief, 6.3). */
  results: [
    "Nexus est le logiciel que nous utilisons pour notre propre prospection.",
    "La recherche, la qualification et la préparation des messages se font au même endroit.",
    "Aucun message ne part sans avoir été relu par une personne.",
  ],
  quote: { text: "", author: "" },
  tech: "IA : Claude (Anthropic) · Base de données : Supabase · Source : Google Maps",
} satisfies CaseStudy;
