"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import styles from "./work-hero-stack.module.css";

/**
 * LA PILE DE CARTES DU HERO DE LA PAGE RÉALISATIONS.
 *
 * Cinq cartes de projet en éventail. Toutes les 3 secondes, chacune avance
 * d'un rang : celle de devant part au fond, la suivante arrive devant.
 *
 * ── Le piège, à ne pas défaire ──────────────────────────────────────────
 * La scène est dessinée sur une base FIXE de 560 × 460px, et les cartes sur
 * une base de 300 × 300. Rien n'y est en pourcentage de la colonne : tout
 * est posé au pixel. L'adaptation passe par une MISE À L'ÉCHELLE, jamais
 * par une mise en page qui se replie : la scène garde ses 560px et porte un
 * `transform: scale(largeur réelle / 560)`. L'ensemble rétrécit d'un bloc,
 * comme une image, donc à 375px rien n'est coupé, rien ne se réorganise et
 * aucun libellé ne passe sur deux lignes.
 *
 * Les cinq emplacements sont calculés pour qu'aucune carte ne sorte de la
 * scène, TOURNÉE COMPRISE : à 10° et à l'échelle 0,78, une carte déborde de
 * 20px de plus que sa boîte droite. Déplacer un emplacement sans refaire ce
 * calcul fait sortir une carte du cadre.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Ce que ce bloc n'est pas ────────────────────────────────────────────
 * Les cinq cartes sont ILLUSTRATIVES : elles disent les TYPES de projets que
 * Synode construit, pas des réalisations livrées. Aucun nom de client,
 * aucune capture, aucun chiffre. La page, juste en dessous, dit la vérité
 * sur l'état réel des projets.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Décoratif : le conteneur porte `aria-hidden`. Tout ce qu'il raconte est
 * écrit en clair dans le hero et dans la liste des réalisations.
 */

const W = 560;
/** La pile avance d'un rang toutes les 3 secondes. */
const TURN_MS = 3000;

type Status = "internal" | "demo" | "client";
type Kind = "table" | "bars" | "chat" | "flow" | "curve";

/** Les cinq emplacements, du premier plan au fond. */
const SLOTS = [
  { left: 130, top: 70, rotate: 0, scale: 1, z: 5, opacity: 1 },
  { left: 230, top: 40, rotate: 6, scale: 0.9, z: 4, opacity: 1 },
  { left: 30, top: 50, rotate: -6, scale: 0.9, z: 3, opacity: 1 },
  { left: 240, top: 120, rotate: 10, scale: 0.78, z: 2, opacity: 0.55 },
  { left: 20, top: 130, rotate: -10, scale: 0.78, z: 1, opacity: 0.55 },
] as const;

const KINDS: Kind[] = ["table", "bars", "chat", "flow", "curve"];
const STATUSES: Status[] = ["internal", "client", "demo", "demo", "client"];

/** Les six lignes de la vignette « tableau ». */
const ROW_MARKS = ["#0b6be6", "#7b5cf0", "#e0567a", "#e09a2d"];
const ROW_PILLS = ["#123a2a", "#16335a", "#3a2e17"];
/** Les six barres : hauteur de base en %, et couleur. */
const BARS = [
  { base: 40, colour: "#2f5fa8" },
  { base: 62, colour: "#4e8ff0" },
  { base: 48, colour: "#2f5fa8" },
  { base: 80, colour: "#8ec1ff" },
  { base: 66, colour: "#2f5fa8" },
  { base: 92, colour: "#4e8ff0" },
];
/** Les quatre bulles de la vignette « conversation ». */
const BUBBLES = [
  { side: "left", width: 62, colour: "#1e3352" },
  { side: "right", width: 54, colour: "#0a6cf0" },
  { side: "left", width: 44, colour: "#1e3352" },
] as const;

const COPY = {
  fr: {
    titles: ["Logiciel de prospection", "Tableau de bord commercial", "Agent de réponse client", "Traitement des factures", "Suivi de production"],
    categories: ["Logiciel métier", "Data", "Agent IA", "Automatisation", "Data"],
    statuses: { internal: "Projet interne", demo: "Démonstrateur", client: "Projet client" },
  },
  en: {
    titles: ["Prospecting software", "Sales dashboard", "Customer reply agent", "Invoice processing", "Production tracking"],
    categories: ["Business software", "Data", "AI agent", "Automation", "Data"],
    statuses: { internal: "Internal project", demo: "Demonstrator", client: "Client project" },
  },
} as const;

/** Une courbe lissée par les milieux : huit points, aucun angle. */
function smooth(points: [number, number][]) {
  let d = `M${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += ` Q${x.toFixed(2)} ${y.toFixed(2)} ${((x + nx) / 2).toFixed(2)} ${((y + ny) / 2).toFixed(2)}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L${lx.toFixed(2)} ${ly.toFixed(2)}`;
}

/** Les huit points de la courbe : une montée régulière, et une ondulation. */
const curvePoints = (t: number): [number, number][] =>
  Array.from({ length: 8 }, (_, i) => [
    (i * 100) / 7,
    34 - i * 3.4 + 2.2 * Math.sin(t / 1800 + i * 0.8),
  ]);

export function WorkHeroStack({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const box = useRef<HTMLDivElement | null>(null);
  const [k, setK] = useState(1);
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);

  /* Les micro-animations des vignettes sont écrites directement dans le DOM :
     une seule horloge, aucun rendu React par image. */
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const typing = useRef<(HTMLSpanElement | null)[]>([]);
  const flowDot = useRef<HTMLSpanElement | null>(null);
  const curve = useRef<SVGPathElement | null>(null);

  /* ---- La mise à l'échelle ---- */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setK(entry.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- La rotation de la pile, et les micro-animations ---- */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    let raf = 0;
    let timer: number | undefined;
    let t0 = 0;
    let running = false;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;

      /* Les barres ondulent de ±6 %, décalées d'une barre à l'autre. */
      bars.current.forEach((node, i) => {
        if (!node) return;
        const h = BARS[i].base + 6 * Math.sin((t / 4400) * Math.PI * 2 + i);
        node.style.height = `${h.toFixed(2)}%`;
      });
      /* Les trois points s'allument tour à tour. */
      const lit = Math.floor(t / 300) % 3;
      typing.current.forEach((node, i) => {
        if (node) node.style.opacity = i === lit ? "1" : "0.3";
      });
      /* Le point parcourt le trait du flux. */
      if (flowDot.current) {
        flowDot.current.style.left = `${(10 + 80 * ((t % 1400) / 1400)).toFixed(2)}%`;
      }
      /* La courbe ondule doucement. */
      if (curve.current) curve.current.setAttribute("d", smooth(curvePoints(t)));

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      t0 = 0;
      raf = requestAnimationFrame(frame);
      timer = window.setInterval(() => setStep(prev => (prev + 1) % SLOTS.length), TURN_MS);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  /* ---- Les cinq vignettes ---- */
  const vignette = (kind: Kind) => {
    if (kind === "table") {
      return (
        <span className={styles.table}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <span key={i} className={styles.tableRow}>
              <i className={styles.tableMark} style={{ background: ROW_MARKS[i % ROW_MARKS.length] }} />
              <i className={styles.tableLine} />
              <i className={styles.tablePill} style={{ background: ROW_PILLS[i % ROW_PILLS.length] }} />
            </span>
          ))}
        </span>
      );
    }
    if (kind === "bars") {
      return (
        <span className={styles.bars}>
          {BARS.map((bar, i) => (
            <i
              key={i}
              ref={node => { bars.current[i] = node; }}
              className={styles.bar}
              style={{ height: `${bar.base}%`, background: bar.colour }}
            />
          ))}
        </span>
      );
    }
    if (kind === "chat") {
      return (
        <span className={styles.chat}>
          {BUBBLES.map((bubble, i) => (
            <i
              key={i}
              className={bubble.side === "right" ? `${styles.bubble} ${styles.bubbleRight}` : styles.bubble}
              style={{ width: `${bubble.width}%`, background: bubble.colour }}
            />
          ))}
          <span className={styles.typing}>
            {[0, 1, 2].map(i => (
              <i key={i} ref={node => { typing.current[i] = node; }} style={{ opacity: i === 0 ? 1 : 0.3 }} />
            ))}
          </span>
        </span>
      );
    }
    if (kind === "flow") {
      return (
        <span className={styles.flow}>
          <i className={styles.flowLine} />
          <i ref={flowDot} className={styles.flowDot} style={{ left: "10%" }} />
          <i className={styles.flowBlock} />
          <i className={styles.flowBlock} />
          <i className={`${styles.flowBlock} ${styles.flowDone}`} />
        </span>
      );
    }
    return (
      <span className={styles.curve}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
          <path ref={curve} d={smooth(curvePoints(0))} />
        </svg>
        <span className={styles.tabs}>
          <i className={styles.tabOn} />
          <i />
          <i />
        </span>
      </span>
    );
  };

  return (
    <div className={styles.root} ref={box} aria-hidden>
      <div className={styles.scene} style={{ transform: `scale(${k})` }}>
        {KINDS.map((kind, i) => {
          /* Le rang d'une carte : 0 devant, 4 au fond. */
          const rank = still ? i : (i - step + SLOTS.length) % SLOTS.length;
          const slot = SLOTS[rank];
          const status = STATUSES[i];
          return (
            <article
              key={kind}
              className={rank === 0 ? `${styles.card} ${styles.cardFront}` : styles.card}
              style={{
                left: `${slot.left}px`,
                top: `${slot.top}px`,
                zIndex: slot.z,
                opacity: slot.opacity,
                transform: `rotate(${slot.rotate}deg) scale(${slot.scale})`,
              }}
            >
              <span className={styles.thumb}>{vignette(kind)}</span>
              <span className={styles.foot}>
                <span className={styles.meta}>
                  <em>{c.categories[i]}</em>
                  <b className={`${styles.status} ${styles[status]}`}><i />{c.statuses[status]}</b>
                </span>
                <strong className={styles.title}>{c.titles[i]}</strong>
              </span>
            </article>
          );
        })}

        <span className={styles.dots}>
          {KINDS.map((kind, i) => (
            <i key={kind} className={i === (still ? 0 : step) ? styles.dotOn : undefined} />
          ))}
        </span>
      </div>
    </div>
  );
}
