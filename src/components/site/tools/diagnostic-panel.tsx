"use client";

import { useMemo } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/content";
import { diagnosticQuestions, type SingleQuestionId } from "@/lib/ai-diagnostic-questions";
import { scoreDiagnostic, type Answers } from "@/lib/ai-diagnostic-score";
import { diagnosticContent, diagnosticSummary } from "@/lib/ai-diagnostic-content";
import { DiagnosticProfile } from "@/components/site/ai-diagnostic/diagnostic-profile";
import { DiagnosticRecommendations } from "@/components/site/ai-diagnostic/diagnostic-recommendations";
import { SegmentedField } from "./controls";

/**
 * Le diagnostic du potentiel IA, en outil et non plus en questionnaire.
 *
 * L'ancienne version posait une question à la fois et ne livrait le
 * résultat qu'à la fin. Ici tous les réglages sont visibles ensemble à
 * gauche et le diagnostic se recalcule à droite à chaque changement : on
 * voit ce qui déplace quoi, ce qu'un questionnaire séquentiel ne montre
 * jamais.
 *
 * Le CALCUL ne change pas. Les questions, les pondérations et les textes
 * restent ceux de `ai-diagnostic-*`, et chaque réponse vaut toujours sa
 * position dans sa liste. Seule la présentation est nouvelle.
 *
 * Rien n'est prérempli. Les six questions partent vides et la colonne de
 * droite n'annonce aucun potentiel tant qu'elles ne sont pas toutes
 * répondues : afficher un niveau sur des réponses partielles reviendrait à
 * qualifier un processus qu'on n'a pas fini de décrire.
 *
 * Rien n'est envoyé ni enregistré : aucun appel réseau, aucun compte,
 * aucune adresse email demandée pour voir le résultat.
 */

export function DiagnosticPanel({
  locale,
  answers,
  onAnswersChange,
  onContinue,
}: {
  locale: Locale;
  answers: Answers;
  onAnswersChange: (answers: Answers) => void;
  /* Absent sur la page dédiée, où il n'y a pas d'étape suivante. */
  onContinue?: () => void;
}) {
  const c = diagnosticContent(locale);
  const questions = diagnosticQuestions(locale);

  const result = useMemo(() => scoreDiagnostic(locale, answers), [locale, answers]);

  const total = questions.length;
  const done = Object.keys(answers.single).length;
  const complete = done === total;

  const setSingle = (id: SingleQuestionId, optionId: string) =>
    onAnswersChange({ ...answers, single: { ...answers.single, [id]: optionId } });

  return (
    <div className="tool-panel">
      <div className="tool-params">
        <h3 className="tool-params-title">{c.processLabel}</h3>
        {questions.map((question) => (
          <SegmentedField
            key={question.id}
            label={question.label}
            help={question.help}
            value={answers.single[question.id] ?? ""}
            options={question.options.map((o) => ({ id: o.id, label: o.label }))}
            onChange={(id) => setSingle(question.id, id)}
          />
        ))}
      </div>

      {/* `aria-live="polite"` sans `atomic` : seules les parties qui
          changent sont annoncées, et jamais pendant que l'on manipule un
          contrôle. Relire tout le panneau à chaque clic le rendrait
          inutilisable au lecteur d'écran. */}
      <div className="tool-readout" aria-live="polite">
        {!complete ? (
          <div className="tool-readout-empty">
            <span className="tool-readout-label">{c.resultTitle}</span>
            <p>{c.emptyHint}</p>
            <span className="tool-readout-progress">{c.emptyProgress(done, total)}</span>
          </div>
        ) : (
          <>
            <div className="tool-readout-head">
              <span className="tool-readout-label">{c.resultTitle}</span>
              <p className="tool-readout-level" data-level={result.level}>{c.levels[result.level]}</p>
              <p className="tool-readout-summary">{diagnosticSummary(locale, result)}</p>
            </div>

            {result.observations.length > 0 && (
              <section className="tool-observations" aria-label={c.observationsTitle}>
                <h4>{c.observationsTitle}</h4>
                <ul>
                  {result.observations.map((id) => (
                    <li key={id}><Check aria-hidden />{c.observations[id]}</li>
                  ))}
                </ul>
              </section>
            )}

            <DiagnosticProfile locale={locale} scores={result.scores} />
            <DiagnosticRecommendations locale={locale} approaches={result.approaches} />

            {/* Le relais vers l'étape 3. Il n'apparaît qu'une fois le
                diagnostic complet : proposer de préparer un brief sur des
                réponses partielles produirait un brief à trous. */}
            {onContinue && (
              <button type="button" className="btn btn--primary" onClick={onContinue}>
                {c.toBrief}<ArrowRight aria-hidden />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
