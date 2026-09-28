import { getContent, type Locale } from "@/lib/content";

/**
 * LE SCHÉMA D'ARCHITECTURE.
 *
 * Il répond au reproche le plus juste qu'on puisse faire à ce site : après
 * le hero, tout était typographique. Or pour une maison qui vend des
 * systèmes, un schéma n'est pas de la décoration — c'est le produit.
 *
 * Trois étages : ce que l'entreprise possède déjà, ce que nous construisons
 * entre les deux, et ce qui en sort. C'est exactement l'argument de la page
 * et il se lit en deux secondes, là où le paragraphe demande dix.
 *
 * EN HTML ET NON EN SVG, pour une raison : tous les libellés sont du texte
 * réel. Ils se traduisent, se sélectionnent, se lisent à la voix et se
 * recomposent en colonne sur téléphone. Un SVG aurait figé la largeur et
 * transformé chaque mot en tracé.
 *
 * Les traits de liaison sont décoratifs et masqués aux technologies
 * d'assistance : la structure est déjà portée par les trois groupes.
 */
export function Architecture({ locale }: { locale: Locale }) {
  const { home } = getContent(locale);
  const a = home.architecture;

  return (
    <figure className="arch">
      <figcaption className="arch-caption">{a.caption}</figcaption>

      {/* Étage 1 — ce que vous avez déjà */}
      <div className="arch-tier">
        <span className="arch-label">{a.toolsLabel}</span>
        <ul className="arch-chips">
          {a.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <span aria-hidden className="arch-flow" />

      {/* Étage 2 — ce que nous construisons. Le seul encadré plein. */}
      <div className="arch-core">
        <span className="arch-core-label">{a.coreLabel}</span>
        <ul className="arch-core-list">
          {a.core.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <span aria-hidden className="arch-flow" />

      {/* Étage 3 — ce qui en sort, et qui garde la main */}
      <div className="arch-tier">
        <span className="arch-label">{a.outLabel}</span>
        <ul className="arch-chips">
          {a.out.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <span className="arch-human">{a.humanLabel}</span>
      </div>
    </figure>
  );
}

/**
 * LE FLUX D'UN CAS D'USAGE.
 *
 * Les trois temps d'un cas, dessinés plutôt qu'énumérés. Une liste à puces
 * décrit un enchaînement ; un flux le montre, et c'est la différence entre
 * lire et comprendre.
 *
 * La numérotation est conservée dans le balisage (`<ol>`) : l'ordre est la
 * seule information que le dessin ajoute, il ne doit pas se perdre pour qui
 * n'a pas accès au dessin.
 */
export function Flow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flow">
      {steps.map((step, i) => (
        <li key={step} className="flow-step">
          <span aria-hidden className="flow-rank">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flow-text">{step}</span>
        </li>
      ))}
    </ol>
  );
}
