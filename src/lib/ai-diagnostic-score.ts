import {
  FRICTION_DIMENSIONS,
  diagnosticQuestions,
  type DimensionKey,
  type FrictionId,
  type SingleQuestionId,
} from "@/lib/ai-diagnostic-questions";
import type { Locale } from "@/lib/content";

/**
 * Le calcul du diagnostic.
 *
 * Entièrement DÉTERMINISTE : mêmes réponses, même résultat, sans appel
 * réseau ni aléatoire. Rien n'est envoyé ni stocké côté serveur.
 *
 * Il n'y a pas UN score mais cinq dimensions, parce qu'un score unique
 * dirait seulement « plus ou moins d'IA » là où la vraie question est
 * « laquelle ». Quatre dimensions nourrissent le potentiel global ; la
 * cinquième, le contrôle humain, en est tenue à l'écart.
 *
 *   automation   fréquence, règles métier, ressaisie, nombre d'intervenants
 *   integration  nombre d'outils, ressaisie, intervenants, fréquence
 *   agents       documents et recherche d'information, modulés par le volume
 *   data         disponibilité des données, modulée par le volume
 *   human        besoin de validation, et erreurs signalées
 *
 * Deux dimensions sont MULTIPLICATIVES et non additives, et c'est un choix
 * métier : sans documents ni recherche d'information, un agent n'a rien à
 * faire ; sans données, il n'y a pas d'exploitation de données. Une formule
 * additive leur aurait donné un score de fond que rien ne justifie.
 *
 * Le contrôle humain n'est JAMAIS retranché du potentiel global. Un
 * processus très encadré n'est pas moins automatisable : il appelle une
 * architecture avec validation, ce que le résultat dit explicitement.
 */

export type Answers = {
  process: string;
  single: Partial<Record<SingleQuestionId, string>>;
  frictions: FrictionId[];
};

export type Scores = Record<DimensionKey, number>;

export type PotentialLevel = "limited" | "moderate" | "high" | "veryHigh";

export type DiagnosticResult = {
  scores: Scores;
  /** 0 à 100. */
  global: number;
  level: PotentialLevel;
  observations: ObservationId[];
  approaches: ApproachId[];
};

export type ObservationId =
  | "manyTools"
  | "reentry"
  | "searching"
  | "documents"
  | "rules"
  | "data"
  | "approvals"
  | "repetition"
  | "reporting"
  | "handovers";

export type ApproachId = "automation" | "agents" | "integration" | "data" | "software" | "human";

export const EMPTY_ANSWERS: Answers = { process: "", single: {}, frictions: [] };

/** Position de la réponse dans sa liste, ramenée entre 0 et 1. */
function value(locale: Locale, answers: Answers, id: SingleQuestionId): number {
  const question = diagnosticQuestions(locale).find((q) => q.id === id);
  const chosen = answers.single[id];
  if (!question || !chosen) return 0;
  const index = question.options.findIndex((o) => o.id === chosen);
  if (index < 0 || question.options.length < 2) return 0;
  return index / (question.options.length - 1);
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const pct = (n: number) => Math.round(clamp01(n) * 100);

/** Les frictions ajoutent au plus 0,15 à une dimension : elles appuient, elles ne décident pas. */
function frictionBoost(answers: Answers, dimension: DimensionKey): number {
  const hits = answers.frictions.filter((f) => FRICTION_DIMENSIONS[f].includes(dimension)).length;
  return Math.min(0.15, hits * 0.075);
}

export function scoreDiagnostic(locale: Locale, answers: Answers): DiagnosticResult {
  const v = (id: SingleQuestionId) => value(locale, answers, id);

  const frequency = v("frequency");
  const people = v("people");
  const tools = v("tools");
  const reentry = v("reentry");
  const search = v("search");
  const rules = v("rules");
  const dataAvailability = v("dataAvailability");
  const documents = v("documents");
  const humanApproval = v("humanApproval");

  /* Le volume : à quel point le processus pèse dans une semaine de travail. */
  const volume = (frequency + people) / 2;

  const automation = clamp01(
    0.32 * frequency + 0.3 * rules + 0.22 * reentry + 0.16 * people + frictionBoost(answers, "automation"),
  );
  const integration = clamp01(
    0.38 * tools + 0.34 * reentry + 0.16 * people + 0.12 * frequency + frictionBoost(answers, "integration"),
  );
  const agents = clamp01(
    (0.5 * documents + 0.5 * search) * (0.8 + 0.2 * volume) + frictionBoost(answers, "agents"),
  );
  const data = clamp01(dataAvailability * (0.75 + 0.25 * volume) + frictionBoost(answers, "data"));
  const human = clamp01(0.7 * humanApproval + frictionBoost(answers, "human") * 2);

  /* Automatisation 25, intégration 25, agents 20, data 20, et 10 pour le
     volume, qui dit si le processus pèse assez pour qu'un projet se tienne. */
  const global = pct(0.25 * automation + 0.25 * integration + 0.2 * agents + 0.2 * data + 0.1 * volume);

  const scores: Scores = {
    automation: pct(automation),
    integration: pct(integration),
    agents: pct(agents),
    data: pct(data),
    human: pct(human),
  };

  return {
    scores,
    global,
    level: level(global),
    observations: observations({ tools, reentry, search, documents, rules, dataAvailability, humanApproval, frequency, people, frictions: answers.frictions }),
    approaches: approaches(scores, tools, global),
  };
}

function level(global: number): PotentialLevel {
  if (global >= 75) return "veryHigh";
  if (global >= 50) return "high";
  if (global >= 25) return "moderate";
  return "limited";
}

/**
 * Les constats.
 *
 * Chacun est conditionné à une réponse précise : rien ne s'affiche qui ne
 * soit dans ce que le visiteur a répondu. Les cinq premiers de la liste
 * sortent, dans cet ordre de priorité.
 */
function observations(a: {
  tools: number; reentry: number; search: number; documents: number; rules: number;
  dataAvailability: number; humanApproval: number; frequency: number; people: number;
  frictions: FrictionId[];
}): ObservationId[] {
  const found: ObservationId[] = [];
  if (a.tools >= 0.66) found.push("manyTools");
  if (a.reentry >= 0.5) found.push("reentry");
  if (a.search >= 0.5) found.push("searching");
  if (a.documents >= 0.66) found.push("documents");
  if (a.rules >= 0.9) found.push("rules");
  if (a.dataAvailability >= 0.5) found.push("data");
  if (a.frequency >= 0.75) found.push("repetition");
  if (a.humanApproval >= 0.66) found.push("approvals");
  if (a.people >= 0.66 || a.frictions.includes("handovers")) found.push("handovers");
  if (a.frictions.includes("reporting") || a.frictions.includes("prioritising")) found.push("reporting");
  return found.slice(0, 5);
}

/**
 * Les approches.
 *
 * Une famille n'apparaît qu'au-dessus de 45 : en dessous, la proposer
 * reviendrait à vendre ce dont le processus n'a pas besoin. Le logiciel
 * métier demande que plusieurs dimensions soient fortes en même temps, et
 * le contrôle humain apparaît dès qu'une validation est réellement attendue.
 */
function approaches(scores: Scores, tools: number, global: number): ApproachId[] {
  const out: ApproachId[] = [];
  if (scores.automation >= 45) out.push("automation");
  if (scores.agents >= 45) out.push("agents");
  if (scores.integration >= 45) out.push("integration");
  if (scores.data >= 45) out.push("data");

  const strong = [scores.automation, scores.integration, scores.agents, scores.data].filter((s) => s >= 55).length;
  if ((strong >= 3 && global >= 55) || (tools >= 0.66 && global >= 65)) out.push("software");
  if (scores.human >= 40) out.push("human");
  return out;
}
