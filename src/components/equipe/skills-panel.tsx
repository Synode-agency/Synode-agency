"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/content";
import { span, useVisualClock } from "./use-visual-clock";
import styles from "./skills-panel.module.css";

/**
 * LE PANNEAU « COMPÉTENCES RÉUNIES ».
 *
 * Les cinq compétences s'allument une par une, et la ligne de résultat ne
 * s'allume que lorsque les cinq le sont : c'est le propos du paragraphe
 * d'à côté, que ce visuel ne fait que montrer.
 *
 * ⚠ Les cinq libellés sont ceux du paragraphe de la section, dans le même
 * ordre. Les changer ici sans changer le texte romprait le lien entre les
 * deux. Décoratif : le conteneur porte `aria-hidden`.
 */

const LOOP = 7000;
const STEP = 900;

const COPY = {
  fr: {
    title: "Compétences réunies",
    skills: [
      "Analyse des processus",
      "Conception d’agents IA",
      "Automatisation",
      "Développement d’applications",
      "Intégration de logiciels",
    ],
    result: "Une solution IA cohérente",
    with: "avec votre organisation",
  },
  en: {
    title: "Skills combined",
    skills: [
      "Process analysis",
      "AI agent design",
      "Automation",
      "Application development",
      "Software integration",
    ],
    result: "One coherent AI solution",
    with: "matching your organisation",
  },
} as const;

export function SkillsPanel({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [done, setDone] = useState(0);
  const gauges = useRef<(HTMLSpanElement | null)[]>([]);

  const { root, still } = useVisualClock(LOOP, t => {
    const n = Math.min(c.skills.length, Math.floor(t / STEP));
    setDone(prev => (prev === n ? prev : n));
    /* La jauge d'une compétence se remplit au moment où elle s'active. */
    gauges.current.forEach((node, i) => {
      if (node) node.style.width = `${(100 * span(t, (i + 1) * STEP - 500, (i + 1) * STEP)).toFixed(1)}%`;
    });
  });

  const n = still ? c.skills.length : done;
  const full = n >= c.skills.length;

  return (
    <div className={styles.panel} ref={root} aria-hidden>
      <div className={styles.head}>
        <span>{c.title}</span>
        <em>{n} / {c.skills.length}</em>
      </div>

      {c.skills.map((skill, i) => (
        <div key={skill} className={i < n ? `${styles.row} ${styles.rowOn}` : styles.row}>
          <i className={styles.num}>{i + 1}</i>
          <span className={styles.label}>{skill}</span>
          <i className={styles.gauge}>
            <b ref={node => { gauges.current[i] = node; }} style={{ width: still ? "100%" : 0 }} />
          </i>
        </div>
      ))}

      <div className={full ? `${styles.result} ${styles.resultOn}` : styles.result}>
        <i className={styles.tick}><Check aria-hidden /></i>
        <span>
          <strong>{c.result}</strong>
          <em>{c.with}</em>
        </span>
      </div>
    </div>
  );
}
