"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/content";
import { diagnosticQuestions, type FrictionId, type SingleQuestionId } from "@/lib/ai-diagnostic-questions";
import { EMPTY_ANSWERS, scoreDiagnostic, type Answers } from "@/lib/ai-diagnostic-score";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";
import { DiagnosticProgress } from "./diagnostic-progress";
import { DiagnosticQuestion } from "./diagnostic-question";
import { DiagnosticResultView } from "./diagnostic-result";

/**
 * Le pilote du diagnostic.
 *
 * Seul morceau client de l'outil : il tient l'état des réponses, l'étape
 * courante, et rien d'autre. Le calcul est importé, les textes aussi, donc
 * ils ne partent pas deux fois dans le paquet JavaScript.
 *
 * Les réponses ne quittent jamais le navigateur : aucun appel réseau, aucun
 * enregistrement serveur. Elles ne sont pas non plus persistées côté client.
 * Restaurer depuis `sessionStorage` demandait d'écrire l'état dans un effet,
 * ce que la règle React du projet refuse, et créait un écart entre le rendu
 * serveur et le rendu client. Quitter la page relance donc le diagnostic.
 *
 * Une question à la fois, et le résultat seulement à la fin : le visiteur
 * n'a ni compte à créer, ni email à donner, ni formulaire à remplir avant de
 * le voir.
 */
type Stage = "intro" | "questions" | "result";

export function DiagnosticWizard({ locale }: { locale: Locale }) {
  const c = diagnosticContent(locale);
  const questions = diagnosticQuestions(locale);

  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);

  const question = questions[index];
  const selected = useMemo(() => {
    if (!question) return [];
    if (question.kind === "multiple") return answers.frictions;
    const value = answers.single[question.id as SingleQuestionId];
    return value ? [value] : [];
  }, [question, answers]);

  const result = useMemo(() => scoreDiagnostic(locale, answers), [locale, answers]);

  const toggle = (optionId: string) => {
    setTouched(false);
    setAnswers((previous) => {
      if (question.kind === "multiple") {
        const id = optionId as FrictionId;
        const next = previous.frictions.includes(id)
          ? previous.frictions.filter((f) => f !== id)
          : [...previous.frictions, id];
        return { ...previous, frictions: next };
      }
      return { ...previous, single: { ...previous.single, [question.id as SingleQuestionId]: optionId } };
    });
  };

  const goNext = () => {
    if (selected.length === 0) {
      setTouched(true);
      return;
    }
    setTouched(false);
    if (index + 1 < questions.length) setIndex(index + 1);
    else setStage("result");
  };

  const restart = () => {
    setAnswers(EMPTY_ANSWERS);
    setIndex(0);
    setTouched(false);
    setStage("intro");
  };

  if (stage === "result") {
    return <DiagnosticResultView locale={locale} answers={answers} result={result} onRestart={restart} />;
  }

  if (stage === "intro") {
    const ready = answers.process.trim().length > 1;
    return (
      <div className="diag-panel diag-intro">
        <label className="diag-field">
          <span className="diag-field-label">{c.processLabel}</span>
          <input
            type="text"
            value={answers.process}
            placeholder={c.processPlaceholder}
            onChange={(event) => setAnswers({ ...answers, process: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === "Enter" && ready) setStage("questions");
            }}
          />
          <span className="diag-field-help">{c.processHelp}</span>
        </label>
        <button type="button" className="btn btn--primary" disabled={!ready} onClick={() => setStage("questions")}>
          {c.start}<ArrowRight aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div className="diag-panel">
      <DiagnosticProgress locale={locale} current={index + 1} total={questions.length} />
      <p className="diag-subject"><span>{c.stepOf}</span>{answers.process}</p>
      <DiagnosticQuestion question={question} selected={selected} onToggle={toggle} />
      {touched && (
        <p className="diag-error" role="alert">
          {question.kind === "multiple" ? c.requiredMultiple : c.required}
        </p>
      )}
      <div className="diag-actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setTouched(false);
            if (index === 0) setStage("intro");
            else setIndex(index - 1);
          }}
        >
          <ArrowLeft aria-hidden />{c.previous}
        </button>
        <button type="button" className="btn btn--primary" onClick={goNext}>
          {index + 1 === questions.length ? c.finish : c.next}
          <ArrowRight aria-hidden />
        </button>
      </div>
    </div>
  );
}
