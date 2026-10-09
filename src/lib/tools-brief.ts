import type { Locale } from "@/lib/content";
import { diagnosticQuestions, type SingleQuestionId } from "@/lib/ai-diagnostic-questions";
import type { Answers } from "@/lib/ai-diagnostic-score";

/**
 * Le passage de relais entre les trois outils.
 *
 * Les étapes 1 et 2 ont déjà fait dire au visiteur ce qui le freine, quel
 * processus mérite d'être examiné, avec combien d'outils il travaille et ce
 * qui doit rester validé par un humain. Lui redemander tout cela à l'étape 3
 * serait lui faire perdre son temps et, surtout, le ferait abandonner.
 *
 * Ce module ne fait donc que RECOPIER ce qui a été dit, en clair. Il
 * n'invente rien : les champs qu'aucune étape précédente ne couvre, les
 * personnes concernées et le résultat attendu, restent vides, parce qu'eux
 * seuls peuvent venir du visiteur.
 *
 * La clé de transport est `sessionStorage` et non l'URL : un brief fait
 * plusieurs centaines de caractères, le mettre en paramètre produirait une
 * adresse illisible et tronquée par certains navigateurs. `sessionStorage`
 * meurt avec l'onglet, ce qui est exactement la durée de vie souhaitée.
 */

export const BRIEF_HANDOFF_KEY = "synode:brief";

export type BriefFields = {
  problem: string;
  process: string;
  users: string;
  tools: string;
  data: string;
  control: string;
  outcome: string;
};

/** Le libellé choisi pour une question du diagnostic, ou `undefined`. */
function answerLabel(locale: Locale, answers: Answers, id: SingleQuestionId): string | undefined {
  const question = diagnosticQuestions(locale).find((q) => q.id === id);
  const chosen = answers.single[id];
  if (!question || !chosen) return undefined;
  return question.options.find((o) => o.id === chosen)?.label;
}

export function composeBrief(
  locale: Locale,
  input: { pains: readonly string[]; process?: string; answers: Answers },
): Partial<BriefFields> {
  const fr = locale === "fr";
  const out: Partial<BriefFields> = {};

  if (input.pains.length > 0) {
    const list = input.pains.map((p) => p.toLowerCase()).join(", ");
    out.problem = fr
      ? `Nos équipes rencontrent régulièrement : ${list}.`
      : `Our teams regularly face: ${list}.`;
  }

  if (input.process) out.process = input.process;

  const tools = answerLabel(locale, input.answers, "tools");
  const reentry = answerLabel(locale, input.answers, "reentry");
  if (tools || reentry) {
    const parts = [
      tools && (fr ? `Outils utilisés : ${tools.toLowerCase()}` : `Tools in use: ${tools.toLowerCase()}`),
      reentry && (fr ? `ressaisie entre outils : ${reentry.toLowerCase()}` : `re-entry between tools: ${reentry.toLowerCase()}`),
    ].filter(Boolean);
    out.tools = `${parts.join(" ; ")}.`;
  }

  const data = answerLabel(locale, input.answers, "dataAvailability");
  const documents = answerLabel(locale, input.answers, "documents");
  if (data || documents) {
    const parts = [
      data && (fr ? `Données disponibles : ${data.toLowerCase()}` : `Data available: ${data.toLowerCase()}`),
      documents && (fr ? `documents et échanges écrits : ${documents.toLowerCase()}` : `documents and written exchanges: ${documents.toLowerCase()}`),
    ].filter(Boolean);
    out.data = `${parts.join(" ; ")}.`;
  }

  const control = answerLabel(locale, input.answers, "humanApproval");
  if (control) {
    out.control = fr
      ? `Validation humaine nécessaire : ${control.toLowerCase()}.`
      : `Human approval required: ${control.toLowerCase()}.`;
  }

  return out;
}
