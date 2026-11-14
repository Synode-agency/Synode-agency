"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { renderLines } from "@/lib/lines";
import {
  CheckList,
  Goals,
  Limits,
  Section,
  ShieldNote,
  StepReader,
  Sub,
  Title,
} from "@/components/nexus/section-parts";
import type { ContextContent } from "@/components/nexus/context-section";
import type { GoalsContent } from "@/components/nexus/goals-section";
import {
  CooryAgendaMobile,
  CooryAssistant,
  CooryComptaMobile,
  CooryEncaissements,
  CooryFiche,
  CooryProgramme,
} from "@/components/illustrations";
import styles from "./coory-sections.module.css";

/**
 * LES SECTIONS « CONTEXTE » ET « OBJECTIFS » DE LA PAGE COORY.
 *
 * Les mêmes blocs de texte que la page Nexus (`components/nexus/section-parts`),
 * au même rythme : le lecteur d'étapes avance toutes les 2,6s, la liste
 * cochée toutes les 2,2s, la carte des objectifs toutes les 2,4s.
 *
 * À droite, une illustration animée par sous-titre, dans l'ordre du texte
 * (association validée par Antonino le 14/11) :
 *  - « Contexte » : ILL-03 fiche sportif, ILL-05 programme, ILL-04 agenda
 *    sur téléphone, ILL-08 assistant IA ;
 *  - « Objectifs » : ILL-07 séances à encaisser, ILL-06 comptabilité sur
 *    téléphone (en face des limites : aucune illustration ne les montre,
 *    elle prolonge les objectifs).
 * Elles sont décoratives (`aria-hidden`) : tout ce qu'elles montrent est
 * écrit à gauche. Sur une colonne, chacune suit son bloc de texte (voir
 * `Section` dans nexus/section-parts).
 *
 * Une horloge par section, gelée hors écran ; sous `prefers-reduced-motion`,
 * l'état final, comme sur la page Nexus.
 */

const STEP_MS = 2600;
const CHECK_MS = 2200;
const GOAL_MS = 2400;

/** L'horloge d'une section : `t` en millisecondes, ou `null` si figée. */
function useSectionClock(onFrame: (t: number) => void) {
  const root = useRef<HTMLElement | null>(null);
  const [still, setStill] = useState(false);
  const frameRef = useRef(onFrame);

  useEffect(() => {
    frameRef.current = onFrame;
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    let raf = 0;
    let t0 = 0;
    let on = false;
    const frame = (now: number) => {
      if (!t0) t0 = now;
      frameRef.current(now - t0);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (on) return; on = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!on) return; on = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.1 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  return { root, still };
}

export function CooryContextSection({ c }: { c: ContextContent }) {
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [check, setCheck] = useState(0);
  const { root, still } = useSectionClock((t) => {
    const nextStep = Math.floor(t / STEP_MS) % c.steps.length;
    setStep(prev => (prev === nextStep ? prev : nextStep));
    const nextCheck = Math.floor(t / CHECK_MS) % c.does.length;
    setCheck(prev => (prev === nextCheck ? prev : nextCheck));
  });

  const sStep = still ? c.steps.length - 1 : hover ?? step;
  const sCheck = still ? c.does.length : check;

  return (
    <Section
      tone="white"
      rootRef={root}
      blocks={[
        <Fragment key="context">
          <Title before={c.title.before} accent={c.title.accent} after={c.title.after} />
          <p>{c.lead}</p>
          <p>{c.tailBefore}<strong>{c.tailStrong}</strong>{c.tailAfter}</p>
        </Fragment>,
        <Fragment key="steps">
          <Sub>{renderLines(c.stepsTitle)}</Sub>
          <StepReader steps={c.steps} active={sStep} onHover={setHover} />
        </Fragment>,
        <Fragment key="does">
          <Sub>{renderLines(c.doesTitle)}</Sub>
          <CheckList items={c.does} active={sCheck} />
        </Fragment>,
        <Fragment key="ai">
          <Sub>{renderLines(c.aiTitle)}</Sub>
          <p>{c.aiText}</p>
          <ShieldNote>{c.aiNote}</ShieldNote>
        </Fragment>,
      ]}
      stackClassName={styles.stack}
      visuals={[
        <div key="fiche" className={styles.cutRight}><CooryFiche /></div>,
        <div key="programme" className={styles.cutLeft}><CooryProgramme /></div>,
        <div key="agenda" className={styles.phone}><CooryAgendaMobile /></div>,
        <div key="assistant" className={styles.cutRight}><CooryAssistant /></div>,
      ]}
    />
  );
}

export function CooryGoalsSection({ c }: { c: GoalsContent }) {
  const [goal, setGoal] = useState(0);
  const { root, still } = useSectionClock((t) => {
    const next = Math.floor(t / GOAL_MS) % c.goals.length;
    setGoal(prev => (prev === next ? prev : next));
  });

  return (
    <Section
      tone="tint"
      rootRef={root}
      blocks={[
        <Fragment key="goals">
          <Title before={c.title.before} accent={c.title.accent} after={c.title.after} />
          <p>{c.lead}</p>
          <Goals items={c.goals} active={still ? 0 : goal} label={c.goalLabel} foot={c.goalsFoot} />
        </Fragment>,
        <Fragment key="limits">
          <Sub>{renderLines(c.limitsTitle)}</Sub>
          <Limits items={c.limits} />
        </Fragment>,
      ]}
      stackClassName={styles.stack}
      visuals={[
        <div key="encaissements" className={styles.cutRight}><CooryEncaissements /></div>,
        <div key="compta" className={styles.phone}><CooryComptaMobile /></div>,
      ]}
    />
  );
}
