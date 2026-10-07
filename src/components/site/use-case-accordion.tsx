"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BusinessUseCase } from "@/lib/business-use-cases";
import type { Locale } from "@/lib/content";

/**
 * Les cas d'usage, en accordéons.
 *
 * Le même composant pour les quatre de l'accueil et les douze de la page
 * Cas d'usage. `rich` ne change que la respiration : la page dédiée ouvre
 * plus large, l'accueil reste compact.
 *
 * ── Un point à ne pas défaire ───────────────────────────────────────────
 * Le titre, la catégorie et le numéro vivent dans l'EN-TÊTE, et nulle part
 * ailleurs. La partie ouverte commence directement par l'explication. La
 * version précédente les répétait dans son panneau de droite, et on lisait
 * deux fois la même ligne à deux centimètres d'intervalle.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Un second ──────────────────────────────────────────────────────────
 * L'ouverture est animée par `grid-template-rows: 0fr → 1fr`, pas par une
 * hauteur mesurée en JavaScript. La transition s'ajuste donc d'elle-même à
 * la longueur du texte, et une traduction plus longue ne la casse pas.
 * ────────────────────────────────────────────────────────────────────────
 */

export function UseCaseAccordion({
  items,
  locale,
  rich = false,
  anchors = false,
}: {
  items: readonly BusinessUseCase[];
  locale: Locale;
  rich?: boolean;
  anchors?: boolean;
}) {
  const fr = locale === "fr";
  const base = useId();
  /* Un seul ouvert à la fois. Le premier l'est au chargement : une section
     entièrement fermée se lit comme une liste de titres sans contenu. */
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={rich ? "uca uca--rich" : "uca"}>
      {items.map((item, i) => {
        const on = i === open;
        return (
          <div
            key={item.slug}
            id={anchors ? item.slug : undefined}
            className={on ? "uca-item is-on" : "uca-item"}
          >
            <h3 className="uca-head">
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(on ? null : i)}
              >
                <em aria-hidden>{String(i + 1).padStart(2, "0")}</em>
                <span className="uca-titles">
                  <small>{item.domain}</small>
                  <strong>{item.title}</strong>
                </span>
                <ChevronDown className="uca-chevron" aria-hidden />
              </button>
            </h3>

            <div className="uca-panel" id={`${base}-p${i}`} role="region" aria-hidden={!on}>
              <div className="uca-panel-in">
                <p className="uca-text">{item.description}</p>
                {item.example && (
                  <div className="uca-example">
                    <span>{fr ? "Exemple de solution IA" : "Example of an AI solution"}</span>
                    <p>{item.example}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
