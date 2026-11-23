"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * L'HORLOGE DES ILLUSTRATIONS ANIMÉES : un temps `t`, en secondes, qui boucle.
 *
 * Tout l'état visuel d'une illustration est une fonction pure de `t` (voir
 * `timeline.ts`). Ce crochet ne fait donc qu'une chose : faire avancer `t`,
 * exactement comme l'horloge d'origine.
 *
 * Deux moteurs, parce que les deux originaux n'avancent pas de la même façon :
 *  - `raf` (CooryDesktopMobile) : requestAnimationFrame, pas borné à 0,1 s,
 *    nouvel état peint au plus toutes les `paintMs` (30 ms, ≈ 33 images/s) ;
 *  - `interval` (les planches Coory, `planche-frame`) : setInterval toutes
 *    les `everyMs`, pas borné à `maxDt`. Les déplacements fluides viennent des
 *    transitions CSS.
 *
 * Les trois comportements de l'original sont gardés :
 *  1. l'horloge s'arrête quand l'illustration sort de l'écran
 *     (IntersectionObserver) et repart là où elle s'était arrêtée ;
 *  2. sous `prefers-reduced-motion`, `t` reste figé sur `reducedT` ;
 *  3. tout est arrêté au démontage : image demandée, minuteur, observateur.
 *
 * `debugT` fige l'horloge sur un instant donné, pour comparer une image
 * précise avec l'original. Rien ne tourne alors.
 */

export type LoopClock =
  | { kind: "raf"; length: number; reducedT: number; paintMs: number; maxDt: number }
  | { kind: "interval"; length: number; reducedT: number; everyMs: number; maxDt: number };

export function useLoopClock(ref: RefObject<HTMLElement | null>, clock: LoopClock, debugT?: number) {
  const [t, setT] = useState(0);
  const { kind, length, reducedT, maxDt } = clock;
  const step = clock.kind === "raf" ? clock.paintMs : clock.everyMs;

  useEffect(() => {
    if (debugT !== undefined) return;
    const el = ref.current;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setT(reducedT));
      return;
    }

    /* Hors écran, la boucle est ARRÊTÉE, pas seulement muette : avant le
       23/11/2026, elle demandait une image à chaque rafraîchissement sans rien
       peindre (K17 de l'audit), et vidait la batterie d'un téléphone pour
       rien. Elle repart là où elle s'était arrêtée. */
    let value = 0;
    let last = performance.now();
    let lastPaint = 0;
    let raf = 0;
    let id = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, maxDt);
      last = now;
      value = (value + dt) % length;
      if (now - lastPaint > step) {
        lastPaint = now;
        setT(value);
      }
      raf = requestAnimationFrame(loop);
    };
    const tick = () => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      value = (value + Math.min(dt, maxDt)) % length;
      setT(value);
    };
    const start = () => {
      /* Le temps passé hors écran ne compte pas. */
      last = performance.now();
      if (kind === "raf") { if (!raf) raf = requestAnimationFrame(loop); }
      else if (!id) id = window.setInterval(tick, step);
    };
    const stop = () => {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (id) { window.clearInterval(id); id = 0; }
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    if (el) io.observe(el);
    else start();
    return () => { stop(); io.disconnect(); };
  }, [ref, kind, length, reducedT, maxDt, step, debugT]);

  return debugT ?? t;
}
