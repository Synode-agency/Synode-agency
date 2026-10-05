import type { Locale } from "@/lib/content";

/**
 * Les questions du diagnostic.
 *
 * Ce fichier ne contient QUE de la donnée : les énoncés, les réponses et,
 * pour les frictions, les dimensions que chaque réponse alimente. Le calcul
 * vit dans `ai-diagnostic-score.ts`, l'affichage dans les composants. Un
 * énoncé peut donc être réécrit sans toucher au score, et une pondération
 * sans toucher aux textes.
 *
 * Pour les questions à choix unique, la valeur numérique d'une réponse est
 * sa POSITION dans la liste, ramenée entre 0 et 1. Les options sont donc
 * écrites de la moins intense à la plus intense, toujours, et il n'y a aucun
 * poids à maintenir à la main en face de chaque ligne.
 */

export type DimensionKey = "automation" | "integration" | "agents" | "data" | "human";

/**
 * Six questions, pas dix.
 *
 * Le questionnaire en comptait dix et c'était trop long pour un outil posé
 * sur une page d'accueil. Les quatre retirées sont celles dont la charge
 * était déjà portée par une autre : `people` doublait `frequency` sur le
 * volume, `search` doublait `documents` sur les agents, `rules` et les
 * `frictions` nuançaient l'automatisation sans la décider.
 *
 * Les six restantes couvrent les cinq dimensions sans trou :
 * `dataAvailability` et `humanApproval` sont les seules sources de `data`
 * et de `human`, `documents` la seule source restante de `agents`, et
 * `frequency`, `reentry` et `tools` étaient les trois plus lourdes.
 */
export type SingleQuestionId =
  | "frequency"
  | "tools"
  | "reentry"
  | "dataAvailability"
  | "documents"
  | "humanApproval";

export type QuestionId = SingleQuestionId;

export type Question = {
  id: QuestionId;
  kind: "single";
  label: string;
  help?: string;
  options: readonly { id: string; label: string }[];
};

export const fr: readonly Question[] = [
  {
    id: "frequency",
    kind: "single",
    label: "À quelle fréquence ce processus est-il réalisé ?",
    options: [
      { id: "rare", label: "Rarement" },
      { id: "monthly", label: "Quelques fois par mois" },
      { id: "weekly", label: "Plusieurs fois par semaine" },
      { id: "daily", label: "Tous les jours" },
      { id: "hourly", label: "Plusieurs fois par jour" },
    ],
  },
  {
    id: "tools",
    kind: "single",
    label: "Combien d’outils ou logiciels sont utilisés pendant ce processus ?",
    help: "Email, CRM, ERP, Excel, Drive, logiciel métier, formulaires, bases de données…",
    options: [
      { id: "one", label: "1" },
      { id: "two", label: "2" },
      { id: "three", label: "3 à 4" },
      { id: "five", label: "5 ou plus" },
    ],
  },
  {
    id: "reentry",
    kind: "single",
    label: "Les mêmes informations sont-elles copiées ou ressaisies entre plusieurs outils ?",
    options: [
      { id: "never", label: "Jamais" },
      { id: "rarely", label: "Rarement" },
      { id: "sometimes", label: "Parfois" },
      { id: "often", label: "Souvent" },
      { id: "always", label: "Très souvent" },
    ],
  },
  {
    id: "dataAvailability",
    kind: "single",
    label: "Disposez-vous de données historiques ou structurées liées à ce processus ?",
    options: [
      { id: "no", label: "Non" },
      { id: "few", label: "Très peu" },
      { id: "scattered", label: "Oui, mais dispersées" },
      { id: "fair", label: "Oui, relativement structurées" },
      { id: "structured", label: "Oui, bien structurées" },
    ],
  },
  {
    id: "documents",
    kind: "single",
    label: "Le processus implique-t-il des emails, documents, demandes écrites ou autres contenus qu’il faut comprendre ou analyser ?",
    options: [
      { id: "few", label: "Très peu" },
      { id: "some", label: "Un peu" },
      { id: "regular", label: "Régulièrement" },
      { id: "core", label: "Une grande partie du processus" },
    ],
  },
  {
    id: "humanApproval",
    kind: "single",
    label: "Certaines étapes nécessitent-elles obligatoirement une validation humaine ?",
    help: "Un besoin élevé de validation n’est pas un défaut : il oriente la solution vers une architecture avec contrôle humain.",
    options: [
      { id: "no", label: "Non" },
      { id: "sometimes", label: "Occasionnellement" },
      { id: "regular", label: "Régulièrement" },
      { id: "critical", label: "Oui, sur les décisions importantes" },
    ],
  },
];

const en: readonly Question[] = [
  {
    id: "frequency",
    kind: "single",
    label: "How often is this process carried out?",
    options: [
      { id: "rare", label: "Rarely" },
      { id: "monthly", label: "A few times a month" },
      { id: "weekly", label: "Several times a week" },
      { id: "daily", label: "Every day" },
      { id: "hourly", label: "Several times a day" },
    ],
  },
  {
    id: "tools",
    kind: "single",
    label: "How many tools or applications are used during this process?",
    help: "Email, CRM, ERP, spreadsheets, Drive, business software, forms, databases…",
    options: [
      { id: "one", label: "1" },
      { id: "two", label: "2" },
      { id: "three", label: "3 to 4" },
      { id: "five", label: "5 or more" },
    ],
  },
  {
    id: "reentry",
    kind: "single",
    label: "Is the same information copied or re-entered between several tools?",
    options: [
      { id: "never", label: "Never" },
      { id: "rarely", label: "Rarely" },
      { id: "sometimes", label: "Sometimes" },
      { id: "often", label: "Often" },
      { id: "always", label: "Very often" },
    ],
  },
  {
    id: "dataAvailability",
    kind: "single",
    label: "Do you have historical or structured data related to this process?",
    options: [
      { id: "no", label: "No" },
      { id: "few", label: "Very little" },
      { id: "scattered", label: "Yes, but scattered" },
      { id: "fair", label: "Yes, reasonably structured" },
      { id: "structured", label: "Yes, well structured" },
    ],
  },
  {
    id: "documents",
    kind: "single",
    label: "Does the process involve emails, documents, written requests or other content that has to be understood or analysed?",
    options: [
      { id: "few", label: "Very little" },
      { id: "some", label: "A little" },
      { id: "regular", label: "Regularly" },
      { id: "core", label: "A large part of the process" },
    ],
  },
  {
    id: "humanApproval",
    kind: "single",
    label: "Do some steps require human approval?",
    help: "A high need for approval is not a drawback: it points the solution towards an architecture with human control.",
    options: [
      { id: "no", label: "No" },
      { id: "sometimes", label: "Occasionally" },
      { id: "regular", label: "Regularly" },
      { id: "critical", label: "Yes, on important decisions" },
    ],
  },
];

export function diagnosticQuestions(locale: Locale): readonly Question[] {
  return locale === "fr" ? fr : en;
}

/** Les deux listes doivent rester identiques en structure : le score est commun. */
export function assertDiagnosticParity() {
  if (fr.length !== en.length) throw new Error("ai-diagnostic: nombre de questions différent entre FR et EN");
  fr.forEach((q, i) => {
    const other = en[i];
    if (q.id !== other.id || q.kind !== other.kind || q.options.length !== other.options.length) {
      throw new Error(`ai-diagnostic: la question ${q.id} diverge entre FR et EN`);
    }
    q.options.forEach((o, j) => {
      if (o.id !== other.options[j].id) throw new Error(`ai-diagnostic: option ${o.id} absente de la version anglaise`);
    });
  });
}
