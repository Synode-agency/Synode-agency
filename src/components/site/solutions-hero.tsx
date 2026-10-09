"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";

/**
 * ⚠ MIS DE CÔTÉ, PAS ABANDONNÉ ⚠
 *
 * Ce mur a occupé le bloc droit du hero de Solutions ; il a été remplacé
 * par `SolutionsDashboard`. Le fichier et son CSS (`.solutions-wall`,
 * `.solutions-brick*` dans `studio.css`) sont conservés intacts, à la
 * demande, pour pouvoir y revenir ou le poser ailleurs. Il n'a donc
 * aujourd'hui AUCUN appelant : ce n'est pas un oubli.
 *
 * ────────────────────────────────────────────────────────────────────────
 *
 * Les six briques d'une solution, dans le hero de Solutions.
 *
 * ── L'idée : un mur ─────────────────────────────────────────────────────
 * Six briques empilées en trois rangées de deux. La base porte Data et
 * Formation, c'est-à-dire ce sur quoi tout le reste s'appuie : les données
 * d'un côté, les gens qui s'en servent de l'autre. Au-dessus viennent les
 * intégrations et le logiciel métier, puis l'automatisation et l'agent.
 * L'ordre se lit donc de bas en haut, du socle vers ce qui agit.
 *
 * ── Le comportement : des tranches ──────────────────────────────────────
 * Une brique active s'élargit sur toute la largeur de sa rangée ; sa
 * voisine se réduit à une tranche de 56px où ne restent que le numéro et
 * le nom à la verticale. Sans survol, l'active change toutes les 2,6s ;
 * le survol fige le cycle et le relâche en sortant.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. L'index 0 est actif au premier rendu, côté serveur comme côté client.
 *    Démarrer le cycle sur une valeur tirée au montage provoquerait une
 *    différence d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE le cycle, il ne l'allonge pas. Une
 *    animation qui se répète indéfiniment est précisément ce que ce
 *    réglage demande de supprimer. La brique 01 reste alors ouverte, et le
 *    survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Les six briques suivent l'ordre des six familles de `content.ts`, donc
 * les liens restent justes si cet ordre change. Les numéros, les mentions
 * techniques et les libellés courts sont propres à l'illustration.
 */

type Visual = "lines" | "segments" | "window" | "ports" | "bars" | "rings";

const BRICKS: readonly { num: string; meta: string; visual: Visual }[] = [
  { num: "01", meta: "agent.run()", visual: "lines" },
  { num: "02", meta: "workflow.trigger", visual: "segments" },
  { num: "03", meta: "ui + logic", visual: "window" },
  { num: "04", meta: "crm · erp · api", visual: "ports" },
  { num: "05", meta: "index · query", visual: "bars" },
  { num: "06", meta: "team.onboard()", visual: "rings" },
];

/** Les rangées, de haut en bas. La dernière est la base du mur. */
const ROWS: readonly (readonly number[])[] = [
  [1, 0], // 02 Automatisation · 01 Agent IA
  [3, 2], // 04 Intégration · 03 Logiciel métier
  [4, 5], // 05 Data · 06 Formation
];

const CYCLE_MS = 2600;

/** Les mini-UI. Des `<i>` nus : la forme est entièrement portée par le CSS. */
function Visual({ kind }: { kind: Visual }): ReactNode {
  const parts: Record<Visual, number> = { lines: 3, segments: 4, window: 3, ports: 6, bars: 5, rings: 3 };
  return (
    <span className={`solutions-brick-visual solutions-brick-visual--${kind}`} aria-hidden>
      {Array.from({ length: parts[kind] }, (_, i) => <i key={i} />)}
    </span>
  );
}

export function SolutionsModules({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const labels = fr
    ? ["Agent IA", "Automatisation", "Logiciel métier", "Intégration", "Data", "Formation"]
    : ["AI agent", "Automation", "Business software", "Integration", "Data", "Training"];
  const families = getContent(locale).solutions.bricks;

  /** La brique tenue par le cycle, et celle tenue par le pointeur ou le clavier. */
  const [auto, setAuto] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const active = held ?? auto;

  useEffect(() => {
    if (held !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAuto((n) => (n + 1) % BRICKS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [held]);

  return (
    <div
      className="solutions-wall"
      aria-label={fr ? "Les briques combinées dans une solution Synode" : "The building blocks combined in a Synode solution"}
    >
      <p className="solutions-wall-head" aria-hidden>
        <code>solution.ia.build()</code>
        <code className="solutions-wall-meta">{BRICKS[active].meta}</code>
      </p>

      <div className="solutions-wall-rows">
        {ROWS.map((row) => {
          const openInRow = row.includes(active);
          return (
            <div className="solutions-wall-row" key={row.join("-")}>
              {row.map((i) => {
                const open = i === active;
                const family = families[i];
                return (
                  <Link
                    key={labels[i]}
                    className={`solutions-brick${open ? " is-open" : ""}${openInRow && !open ? " is-slice" : ""}`}
                    href={family ? `${path(locale, ROUTES.solutions)}/${family.slug}` : path(locale, ROUTES.solutions)}
                    onMouseEnter={() => setHeld(i)}
                    onMouseLeave={() => setHeld(null)}
                    onFocus={() => setHeld(i)}
                    onBlur={() => setHeld(null)}
                  >
                    <span className="solutions-brick-face">
                      <span className="solutions-brick-top">
                        <em className="solutions-brick-num">{BRICKS[i].num}</em>
                        <Visual kind={BRICKS[i].visual} />
                      </span>
                      <span className="solutions-brick-foot">
                        <strong>{labels[i]}</strong>
                        {/* Toujours présente, révélée seulement sur la brique
                            ouverte : réserver sa ligne évite que le nom saute
                            d'un cran pendant l'élargissement. */}
                        <code className="solutions-brick-meta">{BRICKS[i].meta}</code>
                      </span>
                    </span>
                    <span className="solutions-brick-slice" aria-hidden>
                      <em>{BRICKS[i].num}</em>
                      <span>{labels[i]}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
