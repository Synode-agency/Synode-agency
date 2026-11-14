"use client";

import { useRef, type ReactNode } from "react";
import { jakarta } from "../font";
import styles from "../illustrations.module.css";
import { useFitScale } from "../use-fit-scale";
import { useLoopClock } from "../use-loop-clock";
import { computeFrame, type PlancheFrame } from "./timeline";

/**
 * LE CADRE COMMUN DES ILLUSTRATIONS ILL-04 À ILL-08 (dossier de passation
 * `COORY_DESIGN_TO_CODE_HANDOFF`, planche « Coory ILL-04-08 Planche »).
 *
 * Dans la planche, chaque illustration est un cadre fixe de 560 px de large
 * (400 ou 480 de haut), `overflow: hidden`, où l'écran est posé en absolu et
 * déborde volontairement : c'est ce cadre qui le coupe. On garde ce cadre tel
 * quel et on le réduit d'un bloc (`transform: scale(largeur / 560)`) dans une
 * enveloppe au même rapport : la composition ne change jamais, de l'ordinateur
 * au téléphone (voir `10_RESPONSIVE_SPECIFICATIONS.md`).
 *
 * L'horloge est celle de la planche : un pas toutes les 60 ms, borné à
 * 0,2 s, figée à t = 6 s sous `prefers-reduced-motion`. Deux différences
 * voulues, demandées par le dossier (15_PERFORMANCE_AND_ACCESSIBILITY) :
 *  - chaque illustration a sa propre horloge, en pause hors écran ;
 *  - elle boucle sur sa propre durée et non sur 1000 s. Le calcul ne lit le
 *    temps qu'à travers son modulo (`T % 8`…), donc rien ne change à
 *    l'image, sauf qu'on évite le petit saut que la planche faisait toutes
 *    les 1000 s.
 *
 * Décorative : la racine porte `aria-hidden`. `debugT` fige l'image.
 */

const W = 560;

export function PlancheFrame({
  height,
  loop,
  debugT,
  children,
}: {
  /** La hauteur du cadre d'origine : 400 ou 480. */
  height: 400 | 480;
  /** La durée de la boucle de cette illustration, en secondes. */
  loop: number;
  debugT?: number;
  children: (v: PlancheFrame) => ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scale = useFitScale(rootRef, W);
  const t = useLoopClock(rootRef, { kind: "interval", length: loop, reducedT: 6, everyMs: 60, maxDt: 0.2 }, debugT);
  const v = computeFrame(t);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles.planche} ${jakarta.variable}`}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", aspectRatio: `${W} / ${height}`, overflow: "hidden" }}
    >
      <div style={{ position: "relative", width: `${W}px`, height: `${height}px`, overflow: "hidden", transformOrigin: "0 0", transform: `scale(${scale})` }}>
        {children(v)}
      </div>
    </div>
  );
}
