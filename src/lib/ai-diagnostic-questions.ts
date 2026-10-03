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

export type SingleQuestionId =
  | "frequency"
  | "people"
  | "tools"
  | "reentry"
  | "search"
  | "rules"
  | "dataAvailability"
  | "documents"
  | "humanApproval";

export type QuestionId = SingleQuestionId | "frictions";

export type FrictionId =
  | "manual"
  | "disconnected"
  | "searching"
  | "errors"
  | "handovers"
  | "documents"
  | "dataUse"
  | "reporting"
  | "prioritising"
  | "other";

export type Question = {
  id: QuestionId;
  kind: "single" | "multiple";
  label: string;
  help?: string;
  options: readonly { id: string; label: string }[];
};

/** Les frictions ne suivent pas d'échelle : chacune pointe vers des dimensions. */
export const FRICTION_DIMENSIONS: Record<FrictionId, readonly DimensionKey[]> = {
  manual: ["automation"],
  disconnected: ["integration"],
  searching: ["agents"],
  errors: ["automation", "human"],
  handovers: ["integration", "automation"],
  documents: ["agents"],
  dataUse: ["data"],
  reporting: ["data"],
  prioritising: ["data"],
  other: [],
};

const fr: readonly Question[] = [
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
    id: "people",
    kind: "single",
    label: "Combien de personnes interviennent généralement dans ce processus ?",
    options: [
      { id: "one", label: "1" },
      { id: "two", label: "2 à 3" },
      { id: "four", label: "4 à 6" },
      { id: "many", label: "Plus de 6" },
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
    id: "search",
    kind: "single",
    label: "Vos équipes doivent-elles chercher des informations dans plusieurs sources avant de pouvoir agir ?",
    help: "Emails, documents, CRM, Drive, SharePoint, dossiers clients, bases de données.",
    options: [
      { id: "never", label: "Jamais" },
      { id: "rarely", label: "Rarement" },
      { id: "sometimes", label: "Parfois" },
      { id: "often", label: "Souvent" },
      { id: "always", label: "Très souvent" },
    ],
  },
  {
    id: "rules",
    kind: "single",
    label: "Une partie du processus repose-t-elle sur des règles, critères ou conditions clairement identifiables ?",
    options: [
      { id: "no", label: "Non" },
      { id: "few", label: "Très peu" },
      { id: "partly", label: "Partiellement" },
      { id: "mostly", label: "Oui, en grande partie" },
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
  {
    id: "frictions",
    kind: "multiple",
    label: "Quel est aujourd’hui le principal problème de ce processus ?",
    help: "Plusieurs réponses possibles.",
    options: [
      { id: "manual", label: "Trop de tâches manuelles" },
      { id: "disconnected", label: "Outils mal connectés" },
      { id: "searching", label: "Temps perdu à chercher l’information" },
      { id: "errors", label: "Erreurs ou oublis" },
      { id: "handovers", label: "Trop de passages entre différentes équipes" },
      { id: "documents", label: "Trop de documents ou emails à traiter" },
      { id: "dataUse", label: "Difficulté à exploiter les données" },
      { id: "reporting", label: "Manque de visibilité / reporting" },
      { id: "prioritising", label: "Difficulté à prioriser" },
      { id: "other", label: "Autre" },
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
    id: "people",
    kind: "single",
    label: "How many people are usually involved in this process?",
    options: [
      { id: "one", label: "1" },
      { id: "two", label: "2 to 3" },
      { id: "four", label: "4 to 6" },
      { id: "many", label: "More than 6" },
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
    id: "search",
    kind: "single",
    label: "Do your teams have to look for information across several sources before they can act?",
    help: "Emails, documents, CRM, Drive, SharePoint, client files, databases.",
    options: [
      { id: "never", label: "Never" },
      { id: "rarely", label: "Rarely" },
      { id: "sometimes", label: "Sometimes" },
      { id: "often", label: "Often" },
      { id: "always", label: "Very often" },
    ],
  },
  {
    id: "rules",
    kind: "single",
    label: "Does part of the process rely on rules, criteria or conditions that can be clearly identified?",
    options: [
      { id: "no", label: "No" },
      { id: "few", label: "Very little" },
      { id: "partly", label: "Partly" },
      { id: "mostly", label: "Yes, for the most part" },
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
  {
    id: "frictions",
    kind: "multiple",
    label: "What is the main problem with this process today?",
    help: "Several answers possible.",
    options: [
      { id: "manual", label: "Too many manual tasks" },
      { id: "disconnected", label: "Poorly connected tools" },
      { id: "searching", label: "Time lost looking for information" },
      { id: "errors", label: "Errors or omissions" },
      { id: "handovers", label: "Too many handovers between teams" },
      { id: "documents", label: "Too many documents or emails to process" },
      { id: "dataUse", label: "Difficulty making use of the data" },
      { id: "reporting", label: "Lack of visibility or reporting" },
      { id: "prioritising", label: "Difficulty prioritising" },
      { id: "other", label: "Other" },
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
