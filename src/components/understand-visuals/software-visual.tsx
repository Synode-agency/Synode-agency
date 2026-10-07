"use client";

import { useRef } from "react";
import type { Locale } from "@/lib/content";
import { Dot, Scene, T, curve, ease, onCurve, span, useSceneClock } from "./scene";

/**
 * « QU'EST-CE QU'UN LOGICIEL MÉTIER SUR MESURE ? ».
 *
 * Trois rôles se branchent tour à tour sur la même application, et chacun y
 * trouve ses écrans. C'est l'argument de la section : l'outil est fait pour
 * ceux qui s'en servent, et l'IA n'occupe qu'un écran sur six.
 */

const LOOP = 7000;
const FADE_FROM = 6600;
/** Un rôle actif pendant 2s ; le troisième reste jusqu'à la fin. */
const ROLE_MS = 2000;
const SCREEN_FROM = 200;
const SCREEN_STEP = 260;
const AI_FROM = 3800;

const ROLES_Y = [90, 170, 250];
/** Les six écrans : colonne, rangée, et le titre qui va avec. */
const CELLS = [
  { x: 262, y: 64 }, { x: 384, y: 64 },
  { x: 262, y: 148 }, { x: 384, y: 148 },
  { x: 262, y: 232 }, { x: 384, y: 232 },
];
/** L'écran que l'IA sert. C'est le seul qui s'allume. */
const AI_CELL = 3;

const COPY = {
  fr: { roles: ["Direction", "Équipe terrain", "Administration"], screens: ["Clients", "Planning", "Devis", "Résumé IA", "Factures", "Rapports"],
    alt: "Trois rôles — direction, équipe terrain, administration — ouvrent la même application métier, qui leur présente leurs écrans. Un seul écran est assisté par l’IA." },
  en: { roles: ["Management", "Field team", "Administration"], screens: ["Clients", "Schedule", "Quotes", "AI summary", "Invoices", "Reports"],
    alt: "Three roles — management, field team, administration — open the same business application, which shows them their own screens. Only one screen is AI-assisted." },
} as const;

export function SoftwareVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const scene = useRef<HTMLDivElement | null>(null);
  const roles = useRef<(HTMLSpanElement | null)[]>([]);
  const pills = useRef<(SVGRectElement | null)[]>([]);
  const wires = useRef<(SVGPathElement | null)[]>([]);
  const dot = useRef<SVGGElement | null>(null);
  const cells = useRef<(SVGRectElement | null)[]>([]);
  const titles = useRef<(HTMLSpanElement | null)[]>([]);
  const bars = useRef<(SVGRectElement | null)[]>([]);
  const navs = useRef<(SVGRectElement | null)[]>([]);
  const pulse = useRef<SVGCircleElement | null>(null);

  const { root, still } = useSceneClock(LOOP, t => {
    /* Le rôle en cours, et celui qui est déjà passé. */
    const active = Math.min(Math.floor(t / ROLE_MS), 2);
    roles.current.forEach((node, i) => {
      if (node) node.dataset.on = i === active ? "true" : "false";
    });
    pills.current.forEach((rect, i) => {
      if (!rect) return;
      rect.setAttribute("fill", i === active ? "#F4F8FE" : "#FFFFFF");
      rect.setAttribute("stroke", i === active ? "#0B6BE6" : "#D5DBE3");
    });
    navs.current.forEach((rect, i) => {
      if (rect) rect.setAttribute("fill", i === active ? "#EAF2FE" : "#F3F5F8");
    });
    wires.current.forEach((path, i) => {
      if (path) path.setAttribute("stroke", i <= active ? "#9DB8F2" : "#D5DBE3");
    });

    /* Le point part de la pastille pendant les 0,6 premières secondes du rôle. */
    if (dot.current) {
      const inRole = t - active * ROLE_MS;
      const p = span(inRole, 0, 600);
      if (p > 0 && p < 1) {
        const { x, y } = onCurve(130, ROLES_Y[active], 170, 170, ease(p));
        dot.current.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        dot.current.setAttribute("opacity", "1");
      } else {
        dot.current.setAttribute("opacity", "0");
      }
    }

    /* Les écrans arrivent un par un. */
    CELLS.forEach((_, i) => {
      const o = span(t, SCREEN_FROM + i * SCREEN_STEP, SCREEN_FROM + i * SCREEN_STEP + 400);
      cells.current[i]?.setAttribute("opacity", `${o}`);
      const title = titles.current[i];
      if (title) title.style.opacity = `${o}`;
      bars.current[i * 2]?.setAttribute("opacity", `${o}`);
      bars.current[i * 2 + 1]?.setAttribute("opacity", `${o}`);
    });

    /* Puis l'écran assisté s'allume, et son point respire. */
    const ai = t >= AI_FROM;
    const cell = cells.current[AI_CELL];
    if (cell) {
      cell.setAttribute("fill", ai ? "#F4F8FE" : "#FFFFFF");
      cell.setAttribute("stroke", ai ? "#0B6BE6" : "#D5DBE3");
    }
    const aiTitle = titles.current[AI_CELL];
    if (aiTitle) aiTitle.dataset.on = ai ? "true" : "false";
    bars.current[AI_CELL * 2]?.setAttribute("fill", ai ? "#C9D8F5" : "#ECEEF1");
    bars.current[AI_CELL * 2 + 1]?.setAttribute("fill", ai ? "#C9D8F5" : "#ECEEF1");
    if (pulse.current) {
      pulse.current.setAttribute("opacity", ai ? "1" : "0");
      pulse.current.setAttribute("r", `${4 + Math.sin((t / 1900) * Math.PI * 2) + 1}`);
    }

    /* La fin de boucle s'efface. */
    if (scene.current) scene.current.style.opacity = `${1 - span(t, FADE_FROM, LOOP)}`;
  });

  return (
    <div ref={scene} className="unv-wrap">
      <Scene
        rootRef={root}
        label={c.alt}
        shapes={
          <>
            {/* ---- Les trois rôles et leurs liaisons ---- */}
            {ROLES_Y.map((y, i) => (
              <g key={y}>
                <rect ref={node => { pills.current[i] = node; }} className="unv-role" x={10} y={y - 15} width={120} height={30} rx={15}
                  fill={still && i === 2 ? "#F4F8FE" : "#FFFFFF"} stroke={still && i === 2 ? "#0B6BE6" : "#D5DBE3"} />
                <path ref={node => { wires.current[i] = node; }} className="unv-wire"
                  d={curve(130, y, 170, 170)} stroke={still ? "#9DB8F2" : "#D5DBE3"} />
              </g>
            ))}

            {/* ---- La fenêtre ---- */}
            <rect x={170} y={24} width={336} height={292} rx={10} fill="#FFFFFF" stroke="#D5DBE3" strokeWidth={1.5} />
            <line x1={170} y1={50} x2={506} y2={50} stroke="#D5DBE3" />
            {[186, 196, 206].map(x => <circle key={x} cx={x} cy={37} r={3} fill="#D5DBE3" />)}
            <line x1={250} y1={50} x2={250} y2={316} stroke="#D5DBE3" />
            {[64, 92, 120, 148].map((y, i) => (
              <rect key={y} ref={node => { navs.current[i] = node; }} x={182} y={y} width={56} height={16} rx={4}
                fill={still && i === 2 ? "#EAF2FE" : "#F3F5F8"} />
            ))}

            {/* ---- Les six écrans ---- */}
            {CELLS.map((cell, i) => (
              <g key={i}>
                <rect ref={node => { cells.current[i] = node; }} x={cell.x} y={cell.y} width={110} height={72} rx={8}
                  fill={still && i === AI_CELL ? "#F4F8FE" : "#FFFFFF"}
                  stroke={still && i === AI_CELL ? "#0B6BE6" : "#D5DBE3"}
                  opacity={still ? 1 : 0} />
                <rect ref={node => { bars.current[i * 2] = node; }} x={cell.x + 12} y={cell.y + 36} width={74} height={5} rx={2.5}
                  fill={still && i === AI_CELL ? "#C9D8F5" : "#ECEEF1"} opacity={still ? 1 : 0} />
                <rect ref={node => { bars.current[i * 2 + 1] = node; }} x={cell.x + 12} y={cell.y + 48} width={50} height={5} rx={2.5}
                  fill={still && i === AI_CELL ? "#C9D8F5" : "#ECEEF1"} opacity={still ? 1 : 0} />
              </g>
            ))}
            <circle ref={pulse} className="unv-pulse" cx={CELLS[AI_CELL].x + 96} cy={CELLS[AI_CELL].y + 14} r={4} opacity={still ? 1 : 0} />

            {!still && <Dot nodeRef={node => { dot.current = node; }} />}
          </>
        }
      >
        {ROLES_Y.map((y, i) => (
          <T key={y} x={70} y={y} size={12} at="center" className="unv-role-label"
            nodeRef={node => { roles.current[i] = node; if (node && still) node.dataset.on = i === 2 ? "true" : "false"; }}>
            {c.roles[i]}
          </T>
        ))}
        {CELLS.map((cell, i) => (
          <T key={i} x={cell.x + 12} y={cell.y + 22} size={11.5} className="unv-screen"
            nodeRef={node => { titles.current[i] = node; if (node && still && i === AI_CELL) node.dataset.on = "true"; }}
            style={{ opacity: still ? 1 : 0 }}>
            {c.screens[i]}
          </T>
        ))}
      </Scene>
    </div>
  );
}
