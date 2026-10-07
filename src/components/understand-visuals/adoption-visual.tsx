"use client";

import { useRef } from "react";
import type { Locale } from "@/lib/content";
import { Scene, T, clamp, ease, span, useSceneClock } from "./scene";

/**
 * « QU'EST-CE QUE L'ADOPTION DE L'IA EN ENTREPRISE ? ».
 *
 * Quatre personnes traversent les trois temps — comprendre, pratiquer,
 * vérifier — et ce qui reste à la fin, ce sont des repères écrits.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * Les trois repères se cochent APRÈS le passage de l'équipe, pas avant.
 * C'est l'argument de la section : l'adoption ne se décrète pas, elle se
 * constate une fois les usages pratiqués.
 * ────────────────────────────────────────────────────────────────────────
 */

const LOOP = 8000;
const FADE_FROM = 7600;
/** Les avatars partent en file et mettent 4s à traverser. */
const WALK_MS = 4000;
const FIRST_AT = 300;
const GAP_MS = 450;
const START_X = 40;
const END_X = 480;
/** Un repère se coche après le passage, l'un après l'autre. */
const MARKS_AT = [4900, 5350, 5800];

const STEPS_X = [90, 260, 430];
const MARKS_Y = [218, 256, 294];
const INITIALS = ["ML", "JV", "SC", "TB"];

const COPY = {
  fr: { steps: ["Comprendre", "Pratiquer", "Vérifier"], title: "Repères partagés",
    marks: ["Ce que l’on peut confier à l’IA", "Comment vérifier une réponse", "Ce qui ne sort pas de l’entreprise"],
    alt: "Quatre personnes traversent trois temps — comprendre, pratiquer, vérifier — et trois repères partagés se cochent une fois les usages pratiqués." },
  en: { steps: ["Understand", "Practise", "Verify"], title: "Shared ground rules",
    marks: ["What can be handed to AI", "How to check an answer", "What must not leave the company"],
    alt: "Four people move through three steps — understand, practise, verify — and three shared ground rules get ticked once the uses have been practised." },
} as const;

/** La position d'un avatar à l'instant t. */
function walkAt(t: number, i: number) {
  const p = span(t, FIRST_AT + i * GAP_MS, FIRST_AT + i * GAP_MS + WALK_MS);
  return { x: START_X + (END_X - START_X) * ease(p), started: t >= FIRST_AT + i * GAP_MS, p };
}

export function AdoptionVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const scene = useRef<HTMLDivElement | null>(null);
  const avatars = useRef<(SVGGElement | null)[]>([]);
  const faces = useRef<(SVGCircleElement | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const steps = useRef<(SVGRectElement | null)[]>([]);
  const nums = useRef<(HTMLSpanElement | null)[]>([]);
  const links = useRef<(SVGLineElement | null)[]>([]);
  const boxes = useRef<(SVGRectElement | null)[]>([]);
  const ticks = useRef<(SVGPathElement | null)[]>([]);
  const marks = useRef<(HTMLSpanElement | null)[]>([]);

  const { root, still } = useSceneClock(LOOP, t => {
    /* ---- Les quatre avatars sur leur piste ---- */
    const xs: number[] = [];
    INITIALS.forEach((_, i) => {
      const { x, started } = walkAt(t, i);
      xs[i] = x;
      const g = avatars.current[i];
      if (g) {
        g.setAttribute("transform", `translate(${x.toFixed(2)} 40)`);
        g.setAttribute("opacity", started ? "1" : "0");
      }
      const label = labels.current[i];
      if (label) {
        label.style.left = `${((x / 520) * 100).toFixed(3)}%`;
        label.style.opacity = started ? "1" : "0";
      }
      /* Arrivé au bout, la personne passe au vert. */
      faces.current[i]?.setAttribute("fill", x > 450 ? "#2DB37A" : "#0B6BE6");
    });

    const first = xs[0] ?? START_X;
    const last = Math.min(...xs);

    /* ---- Les trois temps ---- */
    STEPS_X.forEach((sx, i) => {
      const running = first >= sx - 30;
      const done = last >= sx + 20;
      const rect = steps.current[i];
      if (rect) {
        rect.setAttribute("fill", running && !done ? "#F4F8FE" : "#FFFFFF");
        rect.setAttribute("stroke", done ? "#2DB37A" : running ? "#0B6BE6" : "#D5DBE3");
      }
      const num = nums.current[i];
      if (num) num.dataset.state = done ? "done" : running ? "on" : "rest";
    });

    /* Les liaisons se remplissent au passage du premier. */
    [[116, 234], [286, 404]].forEach(([x1, x2], i) => {
      const line = links.current[i];
      if (!line) return;
      const p = clamp((first - x1) / (x2 - x1), 0, 1);
      line.setAttribute("x2", `${x1 + (x2 - x1) * p}`);
    });

    /* ---- Les repères, cochés après le passage ---- */
    MARKS_AT.forEach((at, i) => {
      const on = t >= at;
      boxes.current[i]?.setAttribute("fill", on ? "#2DB37A" : "#FFFFFF");
      boxes.current[i]?.setAttribute("stroke", on ? "#2DB37A" : "#D5DBE3");
      ticks.current[i]?.setAttribute("opacity", on ? "1" : "0");
      const label = marks.current[i];
      if (label) label.dataset.on = on ? "true" : "false";
    });

    if (scene.current) scene.current.style.opacity = `${1 - span(t, FADE_FROM, LOOP)}`;
  });

  return (
    <div ref={scene} className="unv-wrap">
      <Scene
        rootRef={root}
        label={c.alt}
        shapes={
          <>
            {/* ---- La piste ---- */}
            <line x1={START_X} y1={40} x2={END_X} y2={40} stroke="#D5DBE3" strokeDasharray="3 5" />

            {/* ---- Les trois temps et leurs liaisons ---- */}
            <line ref={node => { links.current[0] = node; }} x1={116} y1={96} x2={still ? 234 : 116} y2={96} stroke="#0B6BE6" strokeWidth={1.6} />
            <line x1={116} y1={96} x2={234} y2={96} stroke="#D5DBE3" strokeWidth={1.4} />
            <line ref={node => { links.current[1] = node; }} x1={286} y1={96} x2={still ? 404 : 286} y2={96} stroke="#0B6BE6" strokeWidth={1.6} />
            <line x1={286} y1={96} x2={404} y2={96} stroke="#D5DBE3" strokeWidth={1.4} />
            {STEPS_X.map((x, i) => (
              <rect key={x} ref={node => { steps.current[i] = node; }} x={x - 26} y={70} width={52} height={52} rx={10}
                fill="#FFFFFF" stroke={still ? "#2DB37A" : "#D5DBE3"} strokeWidth={1.5} />
            ))}

            {/* ---- Les avatars ---- */}
            {INITIALS.map((_, i) => (
              <g key={i} ref={node => { avatars.current[i] = node; }}
                transform={`translate(${still ? END_X : START_X} 40)`} opacity={still ? 1 : 0}>
                <circle ref={node => { faces.current[i] = node; }} r={10} fill={still ? "#2DB37A" : "#0B6BE6"} />
              </g>
            ))}

            {/* ---- Les trois repères ---- */}
            {MARKS_Y.map((y, i) => (
              <g key={y}>
                <rect ref={node => { boxes.current[i] = node; }} x={40} y={y - 8} width={16} height={16} rx={4}
                  fill={still ? "#2DB37A" : "#FFFFFF"} stroke={still ? "#2DB37A" : "#D5DBE3"} strokeWidth={1.4} />
                <path ref={node => { ticks.current[i] = node; }} d={`M44 ${y + 0.2}l3 3 5.5-6`} stroke="#FFFFFF" strokeWidth={1.8}
                  fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={still ? 1 : 0} />
                <line x1={40} y1={y + 19} x2={500} y2={y + 19} stroke="#ECEEF1" />
              </g>
            ))}
          </>
        }
      >
        {/* Les initiales suivent leur avatar : elles sont en HTML, donc
            positionnées à part, et leur abscisse est écrite à chaque image. */}
        {INITIALS.map((ini, i) => (
          <T key={ini} x={still ? END_X : START_X} y={40} size={8.5} at="center" className="unv-ini"
            nodeRef={node => { labels.current[i] = node; }} style={{ opacity: still ? 1 : 0 }}>
            {ini}
          </T>
        ))}
        {STEPS_X.map((x, i) => (
          <T key={x} x={x} y={96} size={14} at="center" className="unv-num"
            nodeRef={node => { nums.current[i] = node; if (node && still) node.dataset.state = "done"; }}>
            {i + 1}
          </T>
        ))}
        {STEPS_X.map((x, i) => (
          <T key={`s${x}`} x={x} y={142} size={12} at="center" className="unv-step">{c.steps[i]}</T>
        ))}
        <T x={40} y={186} size={11} className="unv-hint">{c.title}</T>
        {MARKS_Y.map((y, i) => (
          <T key={y} x={68} y={y} size={12.5} className="unv-mark"
            nodeRef={node => { marks.current[i] = node; if (node && still) node.dataset.on = "true"; }}>
            {c.marks[i]}
          </T>
        ))}
      </Scene>
    </div>
  );
}
