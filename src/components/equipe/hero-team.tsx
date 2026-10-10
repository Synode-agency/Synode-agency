"use client";

import type { Locale } from "@/lib/content";
import { span, useVisualClock } from "./use-visual-clock";
import { useRef, useState } from "react";
import styles from "./hero-team.module.css";

/**
 * LE VISUEL DU HERO DE LA PAGE ÉQUIPE : « l'équipe Synode et vous ».
 *
 * Deux associés à gauche, le client à droite, une liaison entre les deux.
 *
 * ── Ce que ce bloc dit, et ce qu'il ne dit pas ──────────────────────────
 * « Vous » est l'ENTREPRISE CLIENTE, pas un futur collègue : d'où la carte
 * blanche, son icône d'immeuble et son libellé « votre entreprise ». Les
 * deux silhouettes ne sont pas des portraits, ce sont des places. Les vraies
 * photos sont plus bas dans la page.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Décoratif : le conteneur porte `aria-hidden`. Les deux noms et les deux
 * rôles sont écrits en clair dans la section suivante.
 */

const LOOP = 6400;
const PHASE = 3200;

const COPY = {
  fr: {
    team: "Équipe Synode",
    city: "Bruxelles",
    role: "Co-fondateur",
    you: "Vous",
    yours: "votre entreprise",
    pill: (who: string) => `${who}, votre interlocuteur sur ce sujet`,
  },
  en: {
    team: "Synode team",
    city: "Brussels",
    role: "Co-founder",
    you: "You",
    yours: "your company",
    pill: (who: string) => `${who}, your contact on this subject`,
  },
} as const;

const PEOPLE = ["Antonino", "Killian"];

/** La silhouette : une place, pas un portrait. */
function Figure() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden>
      <circle cx={60} cy={42} r={22} />
      <path d="M18 116c0-26 19-44 42-44s42 18 42 44z" />
    </svg>
  );
}

export function HeroTeam({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [phase, setPhase] = useState(0);
  const dot = useRef<HTMLSpanElement | null>(null);
  const client = useRef<HTMLSpanElement | null>(null);
  const cards = useRef<(HTMLSpanElement | null)[]>([]);

  const { root, still } = useVisualClock(LOOP, t => {
    const p = t < PHASE ? 0 : 1;
    setPhase(prev => (prev === p ? prev : p));

    /* Le point va de l'équipe vers le client, puis revient. */
    const run = span(t, p * PHASE + 300, p * PHASE + PHASE - 500);
    const at = p === 0 ? run : 1 - run;
    if (dot.current) dot.current.style.left = `${(at * 100).toFixed(2)}%`;
    /* Le client s'éclaire quand le point arrive chez lui. */
    if (client.current) client.current.style.setProperty("--lit", at > 0.85 ? "1" : "0");

    /* Les trois cartes flottent, décalées l'une de l'autre. */
    cards.current.forEach((node, i) => {
      if (node) node.style.setProperty("--float", `${(3 * Math.sin((t / 8800) * Math.PI * 2 + i * 2)).toFixed(2)}px`);
    });
  });

  const active = still ? 0 : phase;

  return (
    <div className={styles.root} ref={root} aria-hidden>
      <div className={styles.grid}>
        {/* ---- L'équipe ---- */}
        <div className={styles.frame}>
          <span className={styles.frameHead}>
            <em>{c.team}</em>
            <i>{c.city}</i>
          </span>
          <div className={styles.people}>
            {PEOPLE.map((who, i) => (
              <span key={who} className={styles.person}>
                <span
                  ref={node => { cards.current[i] = node; }}
                  className={i === active ? `${styles.shot} ${styles.shotOn}` : styles.shot}
                >
                  <Figure />
                </span>
                <strong>{who}</strong>
                <em>{c.role}</em>
              </span>
            ))}
          </div>
        </div>

        {/* ---- La liaison ---- */}
        <span className={styles.link}>
          <i className={styles.rail} />
          <span className={styles.dot} ref={dot} style={{ left: still ? "100%" : "0%" }} />
        </span>

        {/* ---- Le client ---- */}
        <span className={styles.person}>
          <span
            ref={node => { cards.current[2] = node; client.current = node; }}
            className={styles.clientShot}
            style={still ? { ["--lit" as string]: "1" } : undefined}
          >
            <span className={styles.building}>
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M4 21V7l8-4 8 4v14" />
                <path d="M9 21v-6h6v6" />
                <path d="M8 11h.01M12 11h.01M16 11h.01" />
              </svg>
            </span>
            <Figure />
          </span>
          <strong>{c.you}</strong>
          <em>{c.yours}</em>
        </span>
      </div>

      <span className={styles.pill}>
        <i aria-hidden />
        {c.pill(PEOPLE[active])}
      </span>
    </div>
  );
}
