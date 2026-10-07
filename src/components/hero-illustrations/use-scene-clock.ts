"use client";

import { useEffect, useRef, type RefObject } from "react";

type Draw = (scene: SVGSVGElement, time: number, cycle: number) => void;

/** Une horloge rAF par scène, arrêtée hors écran et figée sur l'état final
 * quand l'utilisateur réduit les animations. */
export function useSceneClock(duration: number, finalTime: number, draw: Draw): RefObject<SVGSVGElement | null> {
  const ref = useRef<SVGSVGElement | null>(null);
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      drawRef.current(scene, finalTime, 0);
      return;
    }

    let elapsed = 0;
    let previous = performance.now();
    let raf = 0;
    let visible = false;

    const frame = (now: number) => {
      elapsed += Math.min(now - previous, 50);
      previous = now;
      const cycle = Math.floor(elapsed / duration);
      drawRef.current(scene, (elapsed % duration) / 1000, cycle);
      raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      if (visible) {
        previous = performance.now();
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.05 });

    observer.observe(scene);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration, finalTime]);

  return ref;
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const ease = (value: number) => {
  const t = clamp(value);
  return 1 - (1 - t) ** 3;
};
export const phase = (time: number, start: number, length: number) => clamp((time - start) / length);

export function setText(scene: SVGSVGElement, role: string, value: string) {
  const node = scene.querySelector<SVGTextElement>(`[data-role="${role}"]`);
  if (node && node.textContent !== value) node.textContent = value;
}

export function setShown(scene: SVGSVGElement, role: string, shown: boolean) {
  scene.querySelectorAll<SVGElement>(`[data-role="${role}"]`).forEach(node => {
    node.style.opacity = shown ? "1" : "0";
  });
}
