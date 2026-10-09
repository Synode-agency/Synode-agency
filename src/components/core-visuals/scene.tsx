"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * LE SOCLE DES CINQ VISUELS DE LA BANDE BLEU NUIT DES PAGES SERVICES.
 *
 * Les cinq scènes partagent le même repère, la même horloge et les mêmes
 * outils de tracé. Ce qui change d'un visuel à l'autre, c'est ce qu'on y
 * dessine, et rien d'autre.
 *
 * ── Le piège de géométrie, à ne pas défaire ─────────────────────────────
 * Les formes sont tracées dans un SVG en `viewBox="0 0 480 320"` et les
 * pastilles, encadrés et textes sont des éléments HTML posés en
 * POURCENTAGE du même repère. Les deux ne se superposent que parce que la
 * scène porte `aspect-ratio: 480 / 320`. Sans ce rapport, le SVG se
 * centrerait dans sa boîte avec des bandes vides et tout le HTML tomberait
 * à côté des formes.
 *
 * Les textes sont en HTML et non en `<text>` SVG : un `<text>` n'hérite pas
 * de la police du site, ne s'ellipse pas et se rend différemment d'un
 * navigateur à l'autre. Leur corps est en `cqw`, pourcentage de la largeur
 * de la scène, donc tout rétrécit ensemble.
 *
 * Aucun de ces visuels n'a de carte de fond : il est posé à même le fond de
 * la bande. Ne pas lui en redonner une.
 * ────────────────────────────────────────────────────────────────────────
 */

export const W = 480;
export const H = 320;

/** Une position dans le repère, en pourcentage de la scène. */
export const px = (v: number) => `${((v / W) * 100).toFixed(3)}%`;
export const py = (v: number) => `${((v / H) * 100).toFixed(3)}%`;
/** Un corps de texte proportionnel : 4,8 unités du repère par cqw. */
export const fs = (v: number) => `${(v / 4.8).toFixed(3)}cqw`;

/** Une liaison, horizontale en entrée comme en sortie. */
export function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(24, Math.abs(x2 - x1)) * 0.5;
  return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}
/** Le point d'une liaison, pour y poser le point qui circule. */
export function onCurve(x1: number, y1: number, x2: number, y2: number, p: number) {
  const dx = Math.max(24, Math.abs(x2 - x1)) * 0.5;
  const q = 1 - p;
  return {
    x: q * q * q * x1 + 3 * q * q * p * (x1 + dx) + 3 * q * p * p * (x2 - dx) + p * p * p * x2,
    y: q * q * q * y1 + 3 * q * q * p * y1 + 3 * q * p * p * y2 + p * p * p * y2,
  };
}

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
/** Ralenti en début et en fin de course. */
export const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
/** Une progression bornée entre deux instants. */
export const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from), 0, 1);

/**
 * Un trajet en segments droits, pour les visuels qui longent des rails.
 * Il donne la longueur totale, le point à une distance donnée, et le `d`
 * du tracé : le même trajet sert donc au point et à la ligne qui se trace.
 */
export function polyline(points: [number, number][]) {
  const seg = points.slice(1).map(([x, y], i) => {
    const [a, b] = points[i];
    return Math.hypot(x - a, y - b);
  });
  const length = seg.reduce((s, v) => s + v, 0);
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const at = (p: number) => {
    let left = clamp(p, 0, 1) * length;
    for (let i = 0; i < seg.length; i++) {
      if (left <= seg[i] || i === seg.length - 1) {
        const q = seg[i] ? clamp(left / seg[i], 0, 1) : 0;
        const [x1, y1] = points[i];
        const [x2, y2] = points[i + 1];
        return { x: x1 + (x2 - x1) * q, y: y1 + (y2 - y1) * q, seg: i };
      }
      left -= seg[i];
    }
    const [x, y] = points[points.length - 1];
    return { x, y, seg: seg.length - 1 };
  };
  return { length, d, at };
}

/**
 * L'horloge commune. Elle ne tourne que lorsque la scène est à l'écran, et
 * `prefers-reduced-motion` ne l'arme pas du tout : le visuel rend alors son
 * état final, que chaque composant décide par `still`.
 *
 * `onFrame` reçoit le temps écoulé dans la boucle. Tout ce qui bouge à
 * chaque image y est écrit DIRECTEMENT dans le DOM par des refs : aucun
 * `setState` par image, seulement aux changements d'étape.
 */
export function useSceneClock(loop: number, onFrame: (t: number) => void) {
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
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [loop]);

  return { root, still };
}

/** L'enveloppe commune : la scène, son rapport, son SVG et son HTML. */
export function Scene({
  rootRef,
  sceneRef,
  label,
  shapes,
  children,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  /** La scène, pour les visuels qui s'effacent en fin de boucle : le fondu
   *  porte sur elle, donc sur le SVG et le HTML ensemble. Ce n'est pas
   *  `rootRef`, que la règle d'immutabilité du projet interdit d'écrire
   *  depuis la fonction d'image. */
  sceneRef?: (node: HTMLDivElement | null) => void;
  label: string;
  shapes: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="cv" ref={rootRef}>
      <div className="cv-scene" ref={sceneRef} role="img" aria-label={label}>
        <svg className="cv-shapes" viewBox={`0 0 ${W} ${H}`} aria-hidden>
          {shapes}
        </svg>
        {children}
      </div>
    </div>
  );
}

/** Un bloc posé sur la scène : une pastille, un encadré, une jauge. */
export function Box({
  x,
  y,
  w,
  h,
  size,
  className,
  style,
  nodeRef,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  size?: number;
  className?: string;
  style?: CSSProperties;
  nodeRef?: (node: HTMLSpanElement | null) => void;
  children?: ReactNode;
}) {
  return (
    <span
      ref={nodeRef}
      className={className ? `cv-box ${className}` : "cv-box"}
      style={{
        left: px(x),
        top: py(y),
        ...(w === undefined ? null : { width: px(w) }),
        ...(h === undefined ? null : { height: py(h) }),
        ...(size === undefined ? null : { fontSize: fs(size) }),
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Un texte posé sur la scène. `at` dit comment il s'aligne sur son point. */
export function T({
  x,
  y,
  size,
  at = "start",
  className,
  style,
  nodeRef,
  children,
}: {
  x: number;
  y: number;
  size: number;
  at?: "start" | "center" | "end";
  className?: string;
  style?: CSSProperties;
  nodeRef?: (node: HTMLSpanElement | null) => void;
  children: ReactNode;
}) {
  const shift = at === "center" ? "-50%" : at === "end" ? "-100%" : "0";
  return (
    <span
      ref={nodeRef}
      className={className ? `cv-t ${className}` : "cv-t"}
      style={{ left: px(x), top: py(y), fontSize: fs(size), transform: `translate(${shift}, -50%)`, ...style }}
    >
      {children}
    </span>
  );
}

/** Le point qui circule, et son halo. */
export function Dot({ nodeRef, tone }: { nodeRef: (node: SVGGElement | null) => void; tone?: "grey" | "green" }) {
  const cls = tone === "grey" ? "cv-dot--grey" : tone === "green" ? "cv-dot--green" : "";
  return (
    <g ref={nodeRef} className={cls} opacity={0}>
      <circle className="cv-dot-halo" r={9} />
      <circle className="cv-dot" r={4} />
    </g>
  );
}
