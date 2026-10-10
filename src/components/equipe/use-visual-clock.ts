"use client";

import { useEffect, useRef, useState } from "react";

/**
 * L'horloge commune aux visuels de la page Équipe.
 *
 * Une seule par visuel. Elle ne tourne que lorsque le visuel est à l'écran,
 * et `prefers-reduced-motion` ne l'arme pas du tout : le visuel rend alors
 * son état final, que chaque composant décide par `still`.
 *
 * `onFrame` reçoit le temps écoulé dans la boucle. Tout ce qui bouge à chaque
 * image doit y être écrit DIRECTEMENT dans le DOM par des refs ; seuls les
 * changements d'étape passent par React.
 */
export function useVisualClock(loop: number, onFrame: (t: number) => void) {
  const root = useRef<HTMLDivElement | null>(null);
  const [still, setStill] = useState(false);
  /* La fonction d'image est rangée dans une ref pour que l'effet n'ait pas à
     se relancer à chaque rendu. Elle y est écrite DANS un effet : la lire ou
     l'écrire pendant le rendu est refusé par la règle de lint du projet. */
  const cb = useRef(onFrame);
  useEffect(() => { cb.current = onFrame; }, [onFrame]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    let raf = 0;
    let t0 = 0;
    let running = false;
    const frame = (now: number) => {
      if (!t0) t0 = now;
      cb.current((now - t0) % loop);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [loop]);

  return { root, still };
}

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
/** Une progression bornée entre deux instants. */
export const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from), 0, 1);
