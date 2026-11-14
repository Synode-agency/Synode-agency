import type { Locale } from "@/lib/content";
import type { WorkItem } from "@/lib/work";
import type { ContextContent } from "@/components/nexus/context-section";
import type { GoalsContent } from "@/components/nexus/goals-section";

/**
 * LE CONTENU DES DEUX SECTIONS DE LA PAGE COORY.
 *
 * Même principe que `components/nexus/nexus-sections` : les textes du projet
 * ne sont PAS recopiés ici, ils sont lus dans `work.ts` et seulement
 * découpés. Le contexte se coupe à la phrase « Coory est conçu et testé »,
 * et le rôle de l'IA laisse sa dernière phrase à l'encadré au bouclier.
 *
 * Les seuls textes écrits ici sont ceux propres à la page : les titres, les
 * descriptions des cinq étapes, la mention « objectif », le pied de la carte
 * des objectifs.
 */

const NEW = {
  fr: {
    stepsTitle: "Le parcours d’un programme avec Coory",
    stepTexts: [
      "Rassembler les objectifs, les disponibilités et les repères de chaque sportif : allures, charges, échéances.",
      "Construire le programme semaine par semaine à partir de modèles, avec des allures et des charges propres à chaque sportif.",
      "Placer les séances dans l’agenda du coach, à côté des rendez-vous et des séances de groupe.",
      "Remettre au sportif un PDF clair de son programme, issu de la version validée par le coach.",
      "Suivre les paiements reçus, les sommes à encaisser et les tâches du jour, sans changer d’outil.",
    ],
    doesTitle: "Ce que Coory fait aujourd’hui",
    aiTitle: "Comment l’IA assiste le coach au quotidien",
    goalLabel: "objectif",
    goalsFoot: "● Mesure en conditions réelles · à venir",
    /* Le découpage des textes du projet. */
    tailFrom: "Coory est conçu et testé",
    tailStrong: "une plateforme similaire peut être conçue sur mesure",
    noteFrom: "Chaque action préparée par l’assistant",
  },
  en: {
    stepsTitle: "How a programme runs through Coory",
    stepTexts: [
      "Gather each athlete’s goals, availability and benchmarks: paces, loads, target dates.",
      "Build the programme week by week from templates, with paces and loads specific to each athlete.",
      "Place sessions in the coach’s schedule, alongside appointments and group sessions.",
      "Give the athlete a clear PDF of the programme, generated from the version the coach approved.",
      "Track payments received, amounts to collect and the day’s tasks without switching tools.",
    ],
    doesTitle: "What Coory does today",
    aiTitle: "How AI supports the coach day to day",
    goalLabel: "goal",
    goalsFoot: "● Measurement in real conditions · to come",
    tailFrom: "Coory is designed and tested",
    tailStrong: "a similar platform can be designed",
    noteFrom: "Every action prepared by the assistant",
  },
} as const;

/** Les titres des deux sections, coupés à l'endroit où le bleu commence. */
const TITLES = {
  fr: {
    context: { before: "Le contexte de\nnotre application ", accent: "Coory" },
    goals: { before: "Ce que nous cherchons\nà obtenir avec ", accent: "Coory" },
  },
  en: {
    context: { before: "The context of\nour application ", accent: "Coory" },
    goals: { before: "What we aim to achieve\nwith ", accent: "Coory" },
  },
} as const;

export function cooryContent(
  locale: Locale,
  item: WorkItem,
  detail: { goalsNote: string; limitsTitle: string },
): { context: ContextContent; goals: GoalsContent } {
  const n = NEW[locale === "fr" ? "fr" : "en"];
  const t = TITLES[locale === "fr" ? "fr" : "en"];

  const cut = item.context.indexOf(n.tailFrom);
  const lead = cut > 0 ? item.context.slice(0, cut).trim() : item.context;
  const tail = cut > 0 ? item.context.slice(cut) : "";
  const strongAt = tail.indexOf(n.tailStrong);
  const tailBefore = strongAt >= 0 ? tail.slice(0, strongAt) : tail;
  const tailStrong = strongAt >= 0 ? n.tailStrong : "";
  const tailAfter = strongAt >= 0 ? tail.slice(strongAt + n.tailStrong.length) : "";

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
      doesTitle: n.doesTitle,
      does: item.does,
      aiTitle: n.aiTitle,
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
