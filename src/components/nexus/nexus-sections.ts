import type { Locale } from "@/lib/content";
import type { WorkItem } from "@/lib/work";
import type { ContextContent } from "./context-section";
import type { GoalsContent } from "./goals-section";

/**
 * LE CONTENU DES DEUX SECTIONS DE LA PAGE NEXUS.
 *
 * ⚠ Les textes du projet ne sont PAS recopiés ici : ils sont lus dans
 * `work.ts` et seulement découpés. Le paragraphe de contexte se coupe à la
 * phrase « Nexus reste un outil interne », et le rôle de l'IA laisse sa
 * dernière phrase à l'encadré au bouclier. Recopier ces textes créerait deux
 * sources de vérité pour la même phrase.
 *
 * Les seuls textes écrits ici sont ceux que la maquette ajoute : les deux
 * pastilles, les descriptions des cinq étapes, la mention « objectif » et le
 * pied de la carte des objectifs.
 */

const NEW = {
  fr: {
    stepsTitle: "Parcours de prospection avec Nexus",
    stepTexts: [
      "Repérer les entreprises de Bruxelles et de Belgique à partir de sources professionnelles publiques.",
      "Synthétiser l’activité, les outils et les besoins potentiels de chaque entreprise.",
      "Évaluer la pertinence d’une prise de contact pour concentrer l’effort au bon endroit.",
      "Rassembler les éléments utiles à un message personnalisé, validé par une personne.",
      "Organiser les échanges et garder une trace claire de chaque entreprise contactée.",
    ],
    goalLabel: "objectif",
    goalsFoot: "● Mesure en conditions réelles · à venir",
    /* Le découpage des textes du projet. */
    tailFrom: "Nexus reste un outil interne",
    tailStrong: "une solution similaire peut être conçue sur mesure",
    noteFrom: "La décision de contacter une entreprise",
  },
  en: {
    stepsTitle: "How prospecting runs with Nexus",
    stepTexts: [
      "Spot companies in Brussels and Belgium from public professional sources.",
      "Summarise each company’s activity, tools and likely needs.",
      "Judge whether an approach is worth making, so the effort goes to the right place.",
      "Gather what a personalised message needs, with a person approving it.",
      "Keep the exchanges organised and a clear trace of every company contacted.",
    ],
    goalLabel: "goal",
    goalsFoot: "● Measurement in real conditions · to come",
    tailFrom: "Nexus remains an internal tool",
    tailStrong: "a similar solution can be designed",
    noteFrom: "The decision to contact a company",
  },
} as const;

/** Les titres des deux sections, coupés à l'endroit où le bleu commence. */
const TITLES = {
  fr: {
    context: { before: "Le contexte de\nnotre ", accent: "prospection B2B" },
    goals: { before: "Ce que nous cherchons\nà obtenir avec ", accent: "Nexus" },
  },
  en: {
    context: { before: "The context of\nour ", accent: "B2B prospecting" },
    goals: { before: "What we aim to achieve\nwith ", accent: "Nexus" },
  },
} as const;

export function nexusSections(
  locale: Locale,
  item: WorkItem,
  detail: { doesTitle: string; aiTitle: string; goalsNote: string; limitsTitle: string },
): { context: ContextContent; goals: GoalsContent } {
  const n = NEW[locale === "fr" ? "fr" : "en"];
  const t = TITLES[locale === "fr" ? "fr" : "en"];

  /* Le contexte se coupe en deux paragraphes, et la partie mise en avant est
     isolée dans le second. */
  const cut = item.context.indexOf(n.tailFrom);
  const lead = cut > 0 ? item.context.slice(0, cut).trim() : item.context;
  const tail = cut > 0 ? item.context.slice(cut) : "";
  const strongAt = tail.indexOf(n.tailStrong);
  const tailBefore = strongAt >= 0 ? tail.slice(0, strongAt) : tail;
  const tailStrong = strongAt >= 0 ? n.tailStrong : "";
  const tailAfter = strongAt >= 0 ? tail.slice(strongAt + n.tailStrong.length) : "";

  /* La dernière phrase du rôle de l'IA part dans l'encadré au bouclier. */
  const noteAt = item.aiRole.indexOf(n.noteFrom);
  const aiText = noteAt > 0 ? item.aiRole.slice(0, noteAt).trim() : item.aiRole;
  const aiNote = noteAt > 0 ? item.aiRole.slice(noteAt).trim() : "";

  return {
    context: {
      title: t.context,
      lead,
      tailBefore,
      tailStrong,
      tailAfter,
      stepsTitle: n.stepsTitle,
      steps: item.journey.map((name, i) => ({ name, text: n.stepTexts[i] ?? "" })),
      doesTitle: detail.doesTitle,
      does: item.does,
      aiTitle: detail.aiTitle,
      aiText,
      aiNote,
    },
    goals: {
      title: t.goals,
      lead: detail.goalsNote,
      goals: item.goals,
      goalLabel: n.goalLabel,
      goalsFoot: n.goalsFoot,
      limitsTitle: detail.limitsTitle,
      limits: item.limits,
    },
  };
}
