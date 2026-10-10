"use client";

import { useState } from "react";
import type { Locale } from "@/lib/content";
import { useVisualClock } from "./use-visual-clock";
import styles from "./contact-panel.module.css";

/**
 * LA CARTE « VOTRE INTERLOCUTEUR ».
 *
 * Les cinq étapes du projet avancent, et les trois contrôles se valident au
 * passage de l'étape qui les concerne. C'est la liste de gauche, montrée
 * dans le temps : un interlocuteur, une analyse avant le développement, des
 * tests sur vos cas réels, une documentation avant le déploiement.
 *
 * ⚠ Aucun délai n'est affiché, et aucun chiffre : une frise de projet n'est
 * pas un engagement de calendrier. Décoratif : `aria-hidden` sur le
 * conteneur.
 */

const LOOP = 9000;
const STEP = 1500;
/** L'étape à laquelle chaque contrôle se valide. */
const CHECK_AT = [2, 4, 5];

const COPY = {
  fr: {
    who: "Votre interlocuteur",
    sub: "du cadrage à la mise en service",
    step: (n: number) => `étape ${n} / 5`,
    steps: ["Cadrage", "Analyse", "Développement", "Tests", "Mise en service"],
    checks: ["Processus et données analysés", "Tests sur vos cas réels", "Documentation et maintenance"],
    states: ["✓ fait", "✓ validé", "✓ prête"],
  },
  en: {
    who: "Your contact",
    sub: "from scoping to go-live",
    step: (n: number) => `stage ${n} / 5`,
    steps: ["Scoping", "Analysis", "Development", "Testing", "Go-live"],
    checks: ["Processes and data analysed", "Tested on your real cases", "Documentation and maintenance"],
    states: ["✓ done", "✓ approved", "✓ ready"],
  },
} as const;

const PEOPLE = ["Antonino", "Killian"];

export function ContactPanel({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [stage, setStage] = useState(1);
  /* L'interlocuteur change à chaque boucle. Il est compté ici et non lu sur
     l'horloge : une valeur tirée du temps réel pendant le rendu rendrait le
     composant impur. */
  const [pass, setPass] = useState(0);

  const { root, still } = useVisualClock(LOOP, t => {
    const n = Math.min(5, Math.floor(t / STEP) + 1);
    setStage(prev => {
      if (prev === n) return prev;
      if (n < prev) setPass(p => p + 1);
      return n;
    });
  });

  const n = still ? 5 : stage;
  const who = PEOPLE[(still ? 0 : pass) % PEOPLE.length];

  return (
    <div className={styles.panel} ref={root} aria-hidden>
      <div className={styles.head}>
        <i className={styles.avatar}>{who[0]}</i>
        <span className={styles.who}>
          <strong>{c.who} · {who}</strong>
          <em>{c.sub}</em>
        </span>
        <span className={styles.stage}>{c.step(n)}</span>
      </div>

      <div className={styles.steps}>
        {c.steps.map((step, i) => (
          <span key={step} className={styles.step}>
            <i className={i + 1 < n ? styles.barDone : i + 1 === n ? styles.barOn : styles.bar} />
            <em className={i + 1 <= n ? styles.stepOn : undefined}>{step}</em>
          </span>
        ))}
      </div>

      <div className={styles.checks}>
        {c.checks.map((check, i) => {
          const on = n >= CHECK_AT[i];
          return (
            <span key={check} className={on ? `${styles.check} ${styles.checkOn}` : styles.check}>
              <i aria-hidden />
              <span>{check}</span>
              <em>{on ? c.states[i] : ""}</em>
            </span>
          );
        })}
      </div>
    </div>
  );
}
