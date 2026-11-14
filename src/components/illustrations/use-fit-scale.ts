"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/**
 * L'ÉCHELLE D'UNE SCÈNE À TAILLE FIXE : largeur réelle ÷ largeur d'origine.
 *
 * Les illustrations sont dessinées en pixels absolus sur une scène fixe
 * (800 × 500, 1600 × 900). On ne les recompose jamais : on les réduit d'un
 * bloc, avec `transform: scale(...)` depuis le coin haut gauche. La hauteur,
 * elle, vient de l'`aspect-ratio` de l'enveloppe.
 *
 * Mesure par ResizeObserver ET par l'écouteur `resize`, comme l'original.
 * Différence voulue avec l'original : l'écouteur `resize` est retiré au
 * démontage (l'original l'oubliait, petite fuite).
 *
 * `useLayoutEffect` plutôt que `useEffect` : la première mesure tombe avant
 * que le navigateur ne peigne, donc on ne voit jamais la scène à l'échelle 1.
 */
export function useFitScale(ref: RefObject<HTMLElement | null>, canvasWidth: number) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const s = el.clientWidth / canvasWidth;
      if (s) setScale(prev => (Math.abs(s - prev) > 0.001 ? s : prev));
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref, canvasWidth]);

  return scale;
}
