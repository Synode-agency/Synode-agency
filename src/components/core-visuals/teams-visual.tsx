"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Box, Dot, Scene, T, curve, ease, onCurve, px, span, useSceneClock } from "./scene";

/**
 * 5 · FORMATION & ADOPTION : « Vos équipes ».
 *
 * Un parcours de huit étapes à gauche, cinq personnes à droite. Chaque
 * étape validée fait avancer les jauges. Les niveaux sont volontairement
 * inégaux : une équipe n'avance pas d'un seul bloc, et le visuel ne doit
 * pas raconter le contraire.
 *
 * Les initiales (ML, JV, SC, TB, AD) sont illustratives. Ce ne sont pas des
 * personnes réelles, et aucun chiffre d'adoption n'est affiché.
 */

const LOOP = 8000;
const FROM = 400;
const STEP = 600;
const OK_AFTER = 450;
const FADE_FROM = 7500;
const STEPS = 8;
/** La part du parcours que chaque personne a faite, à la fin. */
const LEVELS = [0.95, 0.8, 1, 0.7, 0.88];
const INITIALS = ["ML", "JV", "SC", "TB", "AD"];
const stepY = (k: number) => 20 + k * 34;
const personY = (j: number) => 70 + j * 42;
const validated = (k: number) => FROM + k * STEP + OK_AFTER;

const COPY = {
  fr: {
    steps: ["Cas pratiques", "Exercices métier", "Méthodes de vérification", "Règles de partage", "Référents internes", "Supports écrits", "Suivi d’adoption", "Questions ouvertes"],
    title: "Vos équipes",
    count: (n: number) => `${n}/5 autonomes`,
    label: "Un parcours de huit étapes rend cinq personnes autonomes : cas pratiques, exercices métier, méthodes de vérification, règles de partage, référents internes, supports écrits, suivi d’adoption et questions ouvertes.",
  },
  en: {
    steps: ["Practical cases", "Business exercises", "Checking methods", "Sharing rules", "Internal champions", "Written material", "Adoption follow-up", "Open questions"],
    title: "Your teams",
    count: (n: number) => `${n}/5 self-sufficient`,
    label: "An eight-step path makes five people self-sufficient: practical cases, business exercises, checking methods, sharing rules, internal champions, written material, adoption follow-up and open questions.",
  },
} as const;

export function TeamsVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [done, setDone] = useState(0);
  const [live, setLive] = useState(-1);
  const dot = useRef<SVGGElement | null>(null);
  const gauges = useRef<(HTMLSpanElement | null)[]>([]);
  const stage = useRef<HTMLDivElement | null>(null);

  const { root, still } = useSceneClock(LOOP, t => {
    let n = 0;
    for (let k = 0; k < STEPS; k++) if (t >= validated(k)) n++;
    setDone(prev => (prev === n ? prev : n));

    const k = Math.floor((t - FROM) / STEP);
    const on = t >= FROM && k < STEPS ? k : -1;
    setLive(prev => (prev === on ? prev : on));

    /* À chaque validation, un point file de l'étape vers l'encadré. */
    if (dot.current) {
      const i = Math.min(STEPS - 1, Math.max(0, k));
      const p = span(t, validated(i), validated(i) + 350);
      const at = onCurve(214, stepY(i) + 13, 244, 156, ease(p));
      dot.current.setAttribute("transform", `translate(${at.x.toFixed(2)} ${at.y.toFixed(2)})`);
      dot.current.setAttribute("opacity", p > 0 && p < 1 ? "1" : "0");
    }

    /* Les jauges avancent par paliers lissés, à chaque étape validée. */
    let share = 0;
    for (let i = 0; i < STEPS; i++) share += span(t, validated(i), validated(i) + 300) / STEPS;
    for (let j = 0; j < LEVELS.length; j++) {
      const node = gauges.current[j];
      if (!node) continue;
      const w = 156 * LEVELS[j] * share;
      node.style.width = px(w);
      /* Une jauge vide ne doit pas laisser un trait de bordure visible. */
      node.style.opacity = w < 0.6 ? "0" : "1";
    }

    if (stage.current) {
      stage.current.style.opacity = t < FADE_FROM ? "1" : (1 - span(t, FADE_FROM, LOOP)).toFixed(3);
    }
  });

  const n = still ? STEPS : done;
  const full = n >= STEPS;
  const share = n / STEPS;

  return (
    <Scene
      rootRef={root}
      sceneRef={node => { stage.current = node; }}
      label={c.label}
      shapes={
        <>
          {c.steps.map((name, k) => (
            <path
              key={name}
              className={k < n ? "cv-link is-set" : k === live ? "cv-link is-on" : "cv-link"}
              d={curve(214, stepY(k) + 13, 244, 156)}
            />
          ))}
          <Dot nodeRef={node => { dot.current = node; }} />
        </>
      }
    >
      {c.steps.map((name, k) => (
        <Box key={`n-${name}`} x={14} y={stepY(k) + 2} w={22} h={22} size={9.5}
          className={k < n ? "cv-num is-done" : k === live ? "cv-num is-on" : "cv-num"}>
          {k < n ? "✓" : k + 1}
        </Box>
      ))}
      {c.steps.map((name, k) => (
        <Box key={name} x={42} y={stepY(k)} w={172} h={26} size={10}
          className={k < n ? "cv-pill cv-step is-set" : k === live ? "cv-pill cv-step is-on" : "cv-pill cv-step"}>
          {name}
        </Box>
      ))}

      {/* ---- Les équipes ---- */}
      <Box x={244} y={20} w={222} h={272} className="cv-frame" />
      <T x={258} y={42} size={12.5} className="cv-strong">{c.title}</T>
      <T x={452} y={42} size={9.5} at="end" className={full ? "cv-ok" : "cv-muted"}>{c.count(Math.min(5, Math.floor(share * 5)))}</T>
      {INITIALS.map((who, j) => (
        <Box key={who} x={256} y={personY(j) - 13} w={26} h={26} size={9.5}
          className={full ? "cv-avatar is-done" : "cv-avatar"}>
          {who}
        </Box>
      ))}
      {INITIALS.map((who, j) => (
        <Box key={`g-${who}`} x={294} y={personY(j) - 3} w={156} h={6} className="cv-track" />
      ))}
      {INITIALS.map((who, j) => (
        <Box
          key={`f-${who}`}
          nodeRef={node => { gauges.current[j] = node; }}
          x={294}
          y={personY(j) - 3}
          w={156 * LEVELS[j] * share}
          h={6}
          className={full ? "cv-fill is-done" : "cv-fill"}
          style={{ opacity: 156 * LEVELS[j] * share < 0.6 ? 0 : 1 }}
        />
      ))}
    </Scene>
  );
}
