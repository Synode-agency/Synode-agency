"use client";

import { useEffect, useRef, useState } from "react";
import { renderLines } from "@/lib/lines";
import { Badge, Goals, Limits, Section, Sub, Title } from "./section-parts";
import { OutreachWindow } from "./windows";
import type { WindowsContent } from "./windows-content";
import styles from "./goals-visual.module.css";

/**
 * LA SECTION « OBJECTIFS » : le texte à gauche, un écran à droite.
 *
 * ⚠ UNE SEULE horloge pour toute la section. Elle pilote la carte des
 * objectifs et la validation des messages dans la fenêtre Outreach.
 *
 * Tout le contenu arrive en props, comme pour la section « contexte ».
 */

const GOAL_MS = 2400;
/** Un message par cycle, validé en cours de route. */
const ROW_MS = 3000;
const PRESS_FROM = 1700;
const PRESS_TO = 1900;

export type GoalsContent = {
  /** Optionnelle : la page Nexus n'en affiche pas. */
  badge?: string;
  title: { before: string; accent: string; after?: string };
  lead: string;
  goals: readonly string[];
  goalLabel: string;
  goalsFoot: string;
  limitsTitle: string;
  limits: readonly string[];
};

export function GoalsSection({ c, w }: { c: GoalsContent; w: WindowsContent }) {
  const root = useRef<HTMLElement | null>(null);
  const [still, setStill] = useState(false);
  const [goal, setGoal] = useState(0);
  const [row, setRow] = useState(0);
  const [validated, setValidated] = useState(false);
  const card = useRef<HTMLDivElement | null>(null);
  const button = useRef<HTMLElement | null>(null);

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
      const t = now - t0;

      setGoal(prev => {
        const next = Math.floor(t / GOAL_MS) % c.goals.length;
        return prev === next ? prev : next;
      });

      const i = Math.floor(t / ROW_MS) % w.outreach.rows.length;
      const tc = t % ROW_MS;
      setRow(prev => (prev === i ? prev : i));
      const ok = tc >= PRESS_TO;
      setValidated(prev => (prev === ok ? prev : ok));
      if (button.current) {
        button.current.style.transform = tc >= PRESS_FROM && tc < PRESS_TO ? "scale(.95)" : "scale(1)";
      }
      if (card.current) card.current.style.transform = `translateY(${(4 * Math.sin((t / 9000) * Math.PI * 2 + 1)).toFixed(2)}px)`;

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (on) return; on = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!on) return; on = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.1 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [c, w]);

  return (
    <Section
      tone="tint"
      rootRef={root}
      left={
        <>
          {c.badge && <Badge onWhite>{c.badge}</Badge>}
          <Title before={c.title.before} accent={c.title.accent} after={c.title.after} />
          <p>{c.lead}</p>
          <Goals items={c.goals} active={still ? 0 : goal} label={c.goalLabel} foot={c.goalsFoot} />
          <Sub>{renderLines(c.limitsTitle)}</Sub>
          <Limits items={c.limits} />
        </>
      }
      right={
        <div className={styles.stage}>
          <OutreachWindow
            className={styles.one}
            chrome={{ brand: { kind: "nexus", word: w.brandWord }, by: w.by, menus: w.menus, badge: w.badge, crumbTemplate: w.crumbTemplate }}
            active={3}
            w={w.outreach}
            row={still ? 2 : row}
            validated={still ? true : validated}
            card={card}
            button={button}
          />
        </div>
      }
    />
  );
}
