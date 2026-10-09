"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Scaled } from "./frame";
import { RelancesCard } from "./relances-card";
import { AgendaCard } from "./agenda-card";
import { DemandesCard } from "./demandes-card";

/**
 * LA PILE DES TROIS CARTES DU HERO.
 *
 * Relances, puis Agenda, puis Demandes clients, 7,4s chacune, en boucle. Les
 * cartes de derrière dépassent par le haut et restent visibles : on comprend
 * qu'il y en a d'autres avant même que la première ait fini.
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. Les trois cartes sont TOUJOURS montées. Seule celle de devant reçoit
 *    `active`, donc elle seule arme une horloge ; les deux autres affichent
 *    leur état de départ, sans animation. Les démonter et remonter ferait
 *    sauter la transition de position.
 * 2. `transform-origin: 50% 0` : la pile se soulève par le haut. Avec une
 *    origine au centre, les cartes de derrière sortiraient par le bas.
 * 3. `prefers-reduced-motion` n'arme aucune horloge : la carte Relances
 *    reste devant, dans son état final.
 * ────────────────────────────────────────────────────────────────────────
 */

/** La durée d'une carte, celle de ses propres séquences. */
const CARD_MS = 7400;

export function HeroCardStack({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Une seule horloge pour la pile : elle fait tourner les cartes et remplit
     le trait de celle qui joue. */
  useEffect(() => {
    if (still || !visible) return;
    let raf = 0;
    let t0 = 0;
    let last = 0;
    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;
      const i = Math.floor(t / CARD_MS) % 3;
      if (i !== last) { last = i; setActive(i); }
      const p = (t % CARD_MS) / CARD_MS;
      bars.current.forEach((bar, k) => {
        if (bar) bar.style.transform = `scaleX(${k === i ? p.toFixed(4) : 0})`;
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [still, visible]);

  const cards = [RelancesCard, AgendaCard, DemandesCard];
  const current = still ? 0 : active;

  return (
    <div className="hc-stack" ref={root}>
      <div className="hc-pile">
        {cards.map((CardView, i) => {
          /* 0 devant, 1 juste derrière, 2 au fond. Le modulo renvoie la carte
             qui vient de jouer tout au fond plutôt que de la faire
             disparaître : c'est lui qui fait qu'on voit toujours les trois. */
          const rank = (i - current + 3) % 3;
          return (
            <div key={i} className="hc-slot-card" data-rank={rank} style={{ zIndex: 3 - rank }}>
              <Scaled>
                <CardView locale={locale} active={!still && i === current} />
              </Scaled>
            </div>
          );
        })}
      </div>
      <div className="hc-dots" aria-hidden>
        {cards.map((_, i) => (
          <span key={i} className={i === current ? "hc-dot is-on" : "hc-dot"}>
            <i ref={node => { bars.current[i] = node; }} />
          </span>
        ))}
      </div>
    </div>
  );
}
