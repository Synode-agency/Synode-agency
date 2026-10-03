import Link from "next/link";
import { ArrowRight, Check, Info, RotateCcw } from "lucide-react";
import type { Locale } from "@/lib/content";
import { ANCHORS, ROUTES, path } from "@/lib/content";
import type { Answers, DiagnosticResult as Result } from "@/lib/ai-diagnostic-score";
import { diagnosticContent, diagnosticSummary } from "@/lib/ai-diagnostic-content";
import { DiagnosticProfile } from "./diagnostic-profile";
import { DiagnosticRecommendations } from "./diagnostic-recommendations";

/** Le résultat : ce qui a été analysé, le niveau, les constats, les approches. */
export function DiagnosticResultView({
  locale,
  answers,
  result,
  onRestart,
}: {
  locale: Locale;
  answers: Answers;
  result: Result;
  onRestart: () => void;
}) {
  const c = diagnosticContent(locale);

  return (
    <div className="diag-result">
      <header className="diag-result-head">
        <span className="diag-result-label">{c.stepOf}</span>
        <h2>{answers.process}</h2>
        <span className="diag-result-label">{c.resultTitle}</span>
        <p className="diag-result-level" data-level={result.level}>{c.levels[result.level]}</p>
        <p className="diag-result-summary">{diagnosticSummary(locale, result)}</p>
      </header>

      <div className="diag-result-grid">
        {result.observations.length > 0 && (
          <section className="diag-observations" aria-labelledby="diag-observations-title">
            <h3 id="diag-observations-title">{c.observationsTitle}</h3>
            <ul>
              {result.observations.map((id) => (
                <li key={id}><Check aria-hidden />{c.observations[id]}</li>
              ))}
            </ul>
          </section>
        )}
        <DiagnosticProfile locale={locale} scores={result.scores} />
      </div>

      <DiagnosticRecommendations locale={locale} approaches={result.approaches} />

      <p className="diag-disclaimer"><Info aria-hidden />{c.disclaimer}</p>

      <div className="diag-result-cta">
        <span className="eyebrow">{c.ctaKicker}</span>
        <h3>{c.ctaTitle}</h3>
        <p>{c.ctaText}</p>
        <div className="btn-row">
          <Link className="btn btn--primary" href={`${path(locale, ROUTES.contact)}#${ANCHORS.form}`}>
            {c.ctaPrimary}<ArrowRight aria-hidden />
          </Link>
          <Link className="btn btn--ghost" href={path(locale, ROUTES.solutions)}>{c.ctaSecondary}</Link>
        </div>
      </div>

      <button type="button" className="diag-restart" onClick={onRestart}>
        <RotateCcw aria-hidden />{c.restart}
      </button>
    </div>
  );
}
