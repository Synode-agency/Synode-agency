"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import styles from "./hero-directory.module.css";

/**
 * LA CARD « ANNUAIRE D'ÉQUIPE », DANS LE HERO DE LA PAGE ÉQUIPE.
 *
 * Deux fiches, et un pied qui dit qui est l'interlocuteur selon le sujet.
 * Toutes les 2,4s le sujet change : la fiche de l'associé concerné s'allume,
 * l'autre revient au repos, et le pied suit.
 *
 * ── Ce que ce bloc dit ──────────────────────────────────────────────────
 * Le propos est la promesse de la page : un interlocuteur identifié par
 * sujet. Les deux rôles et les six tags viennent de ce que chacun fait
 * réellement, et les silhouettes ne sont pas des portraits : les vraies
 * photos sont plus bas dans la page.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Seules les couleurs changent pendant le cycle, et le pied garde sa ligne
 * unique : la hauteur de la card ne bouge pas.
 *
 * Décoratif : le conteneur porte `aria-hidden`. Tout ce qu'il raconte est
 * écrit en clair dans les deux sections suivantes.
 */

/** Le sujet change toutes les 2,4s. */
const TURN_MS = 2400;

/** Les quatre sujets, et l'associé qui les porte. */
const SUBJECTS: { who: 0 | 1 }[] = [{ who: 0 }, { who: 0 }, { who: 1 }, { who: 1 }];

const COPY = {
  fr: {
    head: "synode / équipe",
    live: "2 associés · Bruxelles",
    role: "Co-fondateur · Développeur & Expert IA",
    free: "disponible",
    busy: "sur votre sujet",
    foot: "Interlocuteur pour",
    names: ["Antonino", "Killian"],
    tags: [
      ["Processus", "Workflows", "Agents IA"],
      ["Applications", "Logiciels", "Intégrations"],
    ],
    subjects: ["vos processus métier", "vos agents IA", "votre application", "vos intégrations"],
  },
  en: {
    head: "synode / team",
    live: "2 partners · Brussels",
    role: "Co-founder · Developer & AI Expert",
    free: "available",
    busy: "on your subject",
    foot: "Your contact for",
    names: ["Antonino", "Killian"],
    tags: [
      ["Processes", "Workflows", "AI agents"],
      ["Applications", "Software", "Integrations"],
    ],
    subjects: ["your business processes", "your AI agents", "your application", "your integrations"],
  },
} as const;

/** La silhouette : une place, pas un portrait. */
function Figure() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden>
      <circle cx={60} cy={42} r={22} />
      <path d="M18 116c0-26 19-44 42-44s42 18 42 44z" />
    </svg>
  );
}

export function HeroDirectory({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);

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
      const next = Math.floor((now - t0) / TURN_MS) % SUBJECTS.length;
      setStep(prev => (prev === next ? prev : next));
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  const at = still ? 0 : step;
  const who = SUBJECTS[at].who;

  return (
    <div className={styles.card} ref={root} aria-hidden>
      {/* ---- L'en-tête ---- */}
      <div className={styles.head}>
        <span className={styles.brand}>
          <Image className={styles.logo} src="/synode-mark.png" alt="" width={44} height={44} />
          <em>{c.head}</em>
        </span>
        <span className={styles.live}><i />{c.live}</span>
      </div>

      {/* ---- Les deux fiches ---- */}
      <div className={styles.people}>
        {c.names.map((name, i) => {
          const on = i === who;
          return (
            <div key={name} className={on ? `${styles.person} ${styles.personOn}` : styles.person}>
              <span className={styles.avatar}><Figure /></span>
              <span className={styles.body}>
                <span className={styles.line}>
                  <strong>{name}</strong>
                  <em className={on ? `${styles.state} ${styles.stateOn}` : styles.state}>
                    <i />{on ? c.busy : c.free}
                  </em>
                </span>
                <em className={styles.role}>{c.role}</em>
                <span className={styles.tags}>
                  {c.tags[i].map(tag => <i key={tag}>{tag}</i>)}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* ---- Le pied ---- */}
      <div className={styles.foot}>
        <span className={styles.subject}>
          <em>{c.foot}</em> <strong>{c.subjects[at]}</strong>
        </span>
        <span className={styles.pick}>{c.names[who]} →</span>
      </div>
    </div>
  );
}
