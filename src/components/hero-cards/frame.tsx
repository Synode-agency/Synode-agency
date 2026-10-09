"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * LE CHÂSSIS DES TROIS CARTES DU HERO.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * Chaque carte est dessinée sur une base FIXE de 580 × 330px, dans une scène
 * de 580 × 360 — les 30px du haut laissent voir les cartes de derrière. Rien
 * n'y est en pourcentage : tout est posé au pixel sur cette base.
 *
 * L'adaptation ne passe donc pas par une mise en page qui se replie, mais
 * par une MISE À L'ÉCHELLE : la scène garde ses 580px et porte un
 * `transform: scale(largeur réelle / 580)`. La composition rétrécit d'un
 * bloc, comme une image. C'est ce qui garantit qu'à 320px rien n'est coupé,
 * rien ne se réorganise et aucun libellé ne passe sur deux lignes.
 *
 * La largeur réelle est mesurée par un `ResizeObserver` sur l'enveloppe, et
 * non lue sur la fenêtre : la pile vit dans une colonne dont la largeur ne
 * suit pas celle de l'écran.
 * ────────────────────────────────────────────────────────────────────────
 */

export const W = 580;
export const H = 360;
/** La carte commence sous les 30px réservés aux cartes de derrière. */
export const TOP = 30;
export const CARD_H = H - TOP;

export type Tone = "blue" | "green" | "warm";

/** La pastille d'état, en haut à droite de l'en-tête. */
export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`hc-pill hc-pill--${tone}`}><i aria-hidden />{children}</span>;
}

/** L'enveloppe qui mesure, et la scène qui s'échelonne. */
export function Scaled({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement | null>(null);
  const [k, setK] = useState(1);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="hc-box" ref={box}>
      <div className="hc-scene" style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}

/** La carte elle-même : son cadre, son en-tête, son contenu. */
export function Card({ label, extra, pill, children }: { label: string; extra?: string; pill: ReactNode; children: ReactNode }) {
  return (
    <div className="hc-card">
      <div className="hc-head">
        <Image className="hc-logo" src="/synode-mark.png" alt="" width={48} height={48} />
        <span className="hc-label">{label}</span>
        {extra && <span className="hc-extra">{extra}</span>}
        <span className="hc-pill-slot">{pill}</span>
      </div>
      <div className="hc-body">{children}</div>
    </div>
  );
}

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const span = (t: number, a: number, b: number) => clamp((t - a) / (b - a), 0, 1);
/** Ralenti en fin de course, pour le tampon et les glissements. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * L'horloge d'une carte. Elle ne tourne que lorsque la carte est devant, et
 * `prefers-reduced-motion` ne l'arme pas : la carte rend alors son état
 * final, que chaque composant décide par `still`.
 *
 * `onFrame` écrit DIRECTEMENT dans le DOM. Les changements d'étape, eux,
 * passent par React — une poignée par cycle, pas soixante par seconde.
 */
export function useCardClock(active: boolean, loop: number, onFrame: (t: number) => void) {
  const [still, setStill] = useState(false);
  const cb = useRef(onFrame);
  useEffect(() => { cb.current = onFrame; }, [onFrame]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    if (!active) return;
    let raf = 0;
    let t0 = 0;
    const frame = (now: number) => {
      if (!t0) t0 = now;
      cb.current(Math.min(now - t0, loop));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, loop]);

  return still;
}
