"use client";

import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/content";

export type PainId =
  | "emails"
  | "reentry"
  | "search"
  | "followup"
  | "documents"
  | "reporting"
  | "approvals"
  | "coordination";

type CandidateId = "customer" | "admin" | "sales" | "knowledge" | "data" | "operations";

const PAIN_CANDIDATES: Record<PainId, readonly CandidateId[]> = {
  emails: ["customer", "admin"],
  reentry: ["admin", "operations"],
  search: ["knowledge", "customer"],
  followup: ["sales", "customer"],
  documents: ["admin", "knowledge"],
  reporting: ["data", "operations"],
  approvals: ["operations", "admin"],
  coordination: ["operations", "customer"],
};

const content = {
  fr: {
    title: "Qu’est-ce qui ralentit le plus votre activité ?",
    help: "Sélectionnez les situations que vos équipes rencontrent régulièrement. Il ne s’agit pas encore de choisir une technologie.",
    pains: {
      emails: "Trop d’emails ou de demandes à traiter",
      reentry: "Informations recopiées entre plusieurs outils",
      search: "Informations internes difficiles à retrouver",
      followup: "Relances et suivi commercial chronophages",
      documents: "Documents à lire, classer ou contrôler",
      reporting: "Reporting et tableaux de bord préparés à la main",
      approvals: "Validations qui ralentissent les dossiers",
      coordination: "Passages de relais difficiles entre équipes",
    } satisfies Record<PainId, string>,
    result: "Processus à explorer en priorité",
    empty: "Choisissez au moins une difficulté pour faire apparaître les processus qui méritent d’être examinés.",
    note: "Ces pistes servent à choisir un point de départ. Leur faisabilité dépend ensuite de vos outils, de vos données et de vos règles métier.",
    next: "Vérifier la faisabilité",
    candidates: {
      customer: { title: "Traitement des demandes clients", text: "Qualifier les demandes, retrouver le contexte et préparer la prochaine action." },
      admin: { title: "Traitement administratif et documentaire", text: "Faire circuler les informations, contrôler les documents et réduire les ressaisies." },
      sales: { title: "Suivi commercial et prospection", text: "Structurer la recherche, les relances et la préparation des prises de contact." },
      knowledge: { title: "Accès à la connaissance interne", text: "Retrouver une information fiable dans les procédures, documents et outils de l’entreprise." },
      data: { title: "Pilotage et exploitation des données", text: "Centraliser les données utiles et rendre le reporting plus régulier et lisible." },
      operations: { title: "Coordination des opérations", text: "Orchestrer les étapes, les validations et les passages entre personnes et logiciels." },
    } satisfies Record<CandidateId, { title: string; text: string }>,
  },
  en: {
    title: "What slows your business down the most?",
    help: "Select the situations your teams face regularly. This is not yet about choosing a technology.",
    pains: {
      emails: "Too many emails or requests to process",
      reentry: "Information copied between several tools",
      search: "Internal information that is hard to find",
      followup: "Time-consuming sales follow-up",
      documents: "Documents to read, classify or check",
      reporting: "Reports and dashboards prepared by hand",
      approvals: "Approvals that slow work down",
      coordination: "Difficult handovers between teams",
    } satisfies Record<PainId, string>,
    result: "Processes to explore first",
    empty: "Select at least one difficulty to reveal the processes worth examining.",
    note: "These directions help select a starting point. Feasibility then depends on your tools, data and business rules.",
    next: "Check feasibility",
    candidates: {
      customer: { title: "Customer request handling", text: "Qualify requests, retrieve context and prepare the next action." },
      admin: { title: "Administrative and document processing", text: "Move information, check documents and reduce re-entry." },
      sales: { title: "Sales follow-up and prospecting", text: "Structure research, follow-ups and contact preparation." },
      knowledge: { title: "Access to internal knowledge", text: "Find reliable information in company procedures, documents and tools." },
      data: { title: "Data and business oversight", text: "Centralise useful data and make reporting more regular and readable." },
      operations: { title: "Operations coordination", text: "Orchestrate steps, approvals and handovers between people and software." },
    } satisfies Record<CandidateId, { title: string; text: string }>,
  },
};

/**
 * Ce que l'étape 1 transmet à la suite : les difficultés cochées, en clair,
 * et le processus arrivé en tête. Exporté ici plutôt que recalculé ailleurs,
 * pour que le classement n'existe qu'à un seul endroit.
 */
export function finderHandoff(locale: Locale, selected: readonly PainId[]) {
  const c = content[locale];
  const scores = (Object.keys(c.candidates) as CandidateId[]).map((id, order) => ({
    id,
    order,
    score: selected.filter((pain) => PAIN_CANDIDATES[pain].includes(id)).length,
  }));
  const top = scores
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)[0];
  return {
    pains: selected.map((id) => c.pains[id]),
    process: top ? c.candidates[top.id].title : undefined,
  };
}

export function OpportunityFinderPanel({
  locale,
  selected,
  onSelectedChange,
  onContinue,
}: {
  locale: Locale;
  selected: PainId[];
  onSelectedChange: (selected: PainId[]) => void;
  onContinue: () => void;
}) {
  const c = content[locale];
  const toggle = (id: PainId) => onSelectedChange(
    selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id],
  );

  const scores = (Object.keys(c.candidates) as CandidateId[]).map((id, order) => ({
    id,
    order,
    score: selected.filter((pain) => PAIN_CANDIDATES[pain].includes(id)).length,
  }));
  const candidates = scores
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 3);

  return (
    <div className="tool-panel">
      <div className="tool-params">
        <h3 className="tool-params-title">{c.title}</h3>
        <p className="tool-panel-intro">{c.help}</p>
        <div className="tool-choice-grid">
          {(Object.keys(c.pains) as PainId[]).map((id) => {
            const active = selected.includes(id);
            return (
              <button key={id} type="button" aria-pressed={active} onClick={() => toggle(id)}>
                <span aria-hidden>{active && <Check />}</span>{c.pains[id]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tool-readout" aria-live="polite">
        <span className="tool-readout-label">{c.result}</span>
        {candidates.length === 0 ? (
          <div className="tool-readout-empty"><p>{c.empty}</p></div>
        ) : (
          <>
            <ol className="tool-opportunities">
              {candidates.map(({ id }, index) => (
                <li key={id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{c.candidates[id].title}</strong><p>{c.candidates[id].text}</p></div>
                </li>
              ))}
            </ol>
            <p className="tool-readout-note">{c.note}</p>
            <button type="button" className="btn btn--primary" onClick={onContinue}>
              {c.next}<ArrowRight aria-hidden />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

