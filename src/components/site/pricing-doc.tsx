"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * La tarification, présentée comme un devis.
 *
 * Trois postes dans un seul document plutôt que trois cartes posées côte à
 * côte : c'est la forme qui porte le message, « votre devis sépare ces
 * trois lignes », et notamment que le coût d'exploitation est facturé à
 * part et jamais absorbé par Synode.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. La colonne 0 est active au premier rendu, côté serveur comme côté
 *    client. La tirer au montage provoquerait une différence d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE le défilement, il ne l'allonge pas.
 *    La colonne 01 reste active et le survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Aucun prix n'est affiché, et il ne doit jamais y en avoir : pas de
 * « à partir de », pas de fourchette. Le budget dépend du périmètre réel,
 * c'est ce que le bloc dit.
 */

const CYCLE_MS = 2800;

const POSTS = {
  fr: [
    { pill: "Avant le démarrage", title: "Développement sur devis", text: "Le prix de création dépend du périmètre, des fonctionnalités, des données et des intégrations nécessaires." },
    { pill: "Pendant l’exploitation", title: "Coûts d’exploitation", text: "L’hébergement, les API, les modèles IA, le monitoring et la maintenance sont estimés séparément." },
    { pill: "Au fil du temps", title: "Évolutions de la solution", text: "Toute fonctionnalité importante fait l’objet d’un nouveau cadrage et d’un chiffrage transparent." },
  ],
  en: [
    { pill: "Before we start", title: "Development, quoted", text: "The build price depends on the scope, the features, the data and the integrations it requires." },
    { pill: "While it runs", title: "Running costs", text: "Hosting, APIs, AI models, monitoring and maintenance are estimated separately." },
    { pill: "Over time", title: "Changes to the solution", text: "Any significant feature goes through a fresh scoping exercise and a transparent quote." },
  ],
} as const;

/**
 * Les trois mini-visuels : un paiement ponctuel, un paiement continu, des
 * paliers. Les `<i>` nus portent la forme, le CSS la dessine.
 */
function CostShape({ kind }: { kind: 0 | 1 | 2 }) {
  if (kind === 0) return <span className="pdoc-shape pdoc-shape--once" aria-hidden><i /><i /></span>;
  if (kind === 1) return <span className="pdoc-shape pdoc-shape--loop" aria-hidden><i /><i /></span>;
  return (
    <span className="pdoc-shape pdoc-shape--steps" aria-hidden>
      <i /><i /><i /><i /><i /><i />
    </span>
  );
}

export function PricingDoc({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const posts = POSTS[fr ? "fr" : "en"];

  const [auto, setAuto] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const active = held ?? auto;

  useEffect(() => {
    if (held !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAuto((n) => (n + 1) % posts.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [held, posts.length]);

  return (
    <div className="pdoc" onMouseLeave={() => setHeld(null)}>
      <div className="pdoc-head">
        <span>{fr ? "Structure de notre devis" : "How our quote is built"}</span>
        <em>{fr ? "3 postes distincts" : "3 separate lines"}</em>
      </div>

      {/* `gap: 1px` sur un fond de filet : les séparateurs verticaux sont
          dessinés par la grille, donc ils deviennent horizontaux tout seuls
          quand les colonnes se replient l'une sous l'autre. */}
      <div className="pdoc-cols">
        {posts.map((post, i) => (
          <article
            key={post.title}
            className={i === active ? "pdoc-col is-on" : "pdoc-col"}
            onMouseEnter={() => setHeld(i)}
          >
            <div className="pdoc-col-top">
              <em>{String(i + 1).padStart(2, "0")}</em>
              <span className="pdoc-pill"><i aria-hidden />{post.pill}</span>
            </div>
            <CostShape kind={i as 0 | 1 | 2} />
            <h3>{post.title}</h3>
            <p>{post.text}</p>
          </article>
        ))}
      </div>

      <div className="pdoc-foot">
        <span>{fr ? "Chaque poste est chiffré séparément dans votre devis." : "Each line is quoted separately in your proposal."}</span>
        <em>{fr ? "= budget total transparent" : "= a transparent total"}</em>
      </div>
    </div>
  );
}
