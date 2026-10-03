import type { Locale } from "@/lib/content";
import type { DimensionKey } from "@/lib/ai-diagnostic-questions";
import type { Scores } from "@/lib/ai-diagnostic-score";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";

/**
 * Le profil du processus.
 *
 * Cinq barres fines, pas de jauge circulaire, pas de compteur animé : ces
 * valeurs comparent des familles entre elles, elles ne mesurent ni un gain
 * ni une performance, et un affichage de score de jeu le ferait croire.
 *
 * Le contrôle humain est séparé par un filet : il ne participe pas au
 * potentiel global, il dit le niveau de validation à conserver.
 */
const ORDER: readonly DimensionKey[] = ["automation", "integration", "agents", "data"];

export function DiagnosticProfile({ locale, scores }: { locale: Locale; scores: Scores }) {
  const c = diagnosticContent(locale);

  return (
    <div className="diag-profile">
      <h3>{c.profileTitle}</h3>
      <dl>
        {ORDER.map((key) => (
          <div key={key}>
            <dt>{c.dimensions[key]}</dt>
            <dd>
              <span className="diag-bar" aria-hidden><i style={{ width: `${scores[key]}%` }} /></span>
              <b>{scores[key]}</b>
            </dd>
          </div>
        ))}
        <div className="diag-profile-human">
          <dt>{c.dimensions.human}</dt>
          <dd>
            <span className="diag-bar diag-bar--human" aria-hidden><i style={{ width: `${scores.human}%` }} /></span>
            <b>{scores.human}</b>
          </dd>
        </div>
      </dl>
      <p className="diag-profile-note">{c.humanNote} · {c.profileNote}</p>
    </div>
  );
}
