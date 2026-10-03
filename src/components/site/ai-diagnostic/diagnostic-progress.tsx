import type { Locale } from "@/lib/content";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";

/** La progression : une barre fine et un compteur, rien de plus. */
export function DiagnosticProgress({ locale, current, total }: { locale: Locale; current: number; total: number }) {
  const c = diagnosticContent(locale);
  const ratio = Math.min(1, Math.max(0, current / total));

  return (
    <div className="diag-progress">
      <span>{c.progress(current, total)}</span>
      <div
        className="diag-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={c.progress(current, total)}
      >
        <i style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  );
}
