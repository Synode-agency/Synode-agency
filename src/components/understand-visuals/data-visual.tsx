"use client";

import { useRef } from "react";
import type { Locale } from "@/lib/content";
import { Dot, Scene, T, curve, ease, onCurve, span, useSceneClock } from "./scene";

/**
 * « QU'EST-CE QUE LA DATA & INTELLIGENCE APPLIQUÉE À L'ENTREPRISE ? ».
 *
 * Cinq sources entrent, deux étapes les rendent exploitables, et il en sort
 * des chiffres constatés — plus une estimation, dessinée autrement.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * La barre estimée est en POINTILLÉS et porte sa propre légende. C'est la
 * règle que la section énonce : un chiffre observé et une estimation ne se
 * présentent pas de la même façon. Lui donner le même aplat que les autres
 * dirait l'inverse.
 * ────────────────────────────────────────────────────────────────────────
 */

const LOOP = 7200;
const FADE_FROM = 6800;
const BARS_FROM = 900;
const BARS_STEP = 160;
const BARS_MS = 700;
const EST_FROM = 2600;
const EST_MS = 800;
/** Les points des sources circulent en continu, décalés les uns des autres. */
const FEED_MS = 1600;
const FEED_OFFSET = 320;

const SOURCES_Y = [50, 108, 166, 224, 282];
const BARS = [60, 84, 70, 100, 88];
const BASE_Y = 270;

const COPY = {
  fr: { sources: ["CRM", "ERP", "Tableurs", "Compta", "Site web"], steps: ["Nettoyer", "Structurer"], observed: "constaté", estimated: "estimé",
    alt: "Cinq sources de données entrent dans deux étapes, nettoyer puis structurer, et il en sort des chiffres constatés ainsi qu’une estimation, dessinée en pointillés." },
  en: { sources: ["CRM", "ERP", "Spreadsheets", "Accounting", "Website"], steps: ["Clean", "Structure"], observed: "recorded", estimated: "estimated",
    alt: "Five data sources feed two steps, clean then structure, producing recorded figures plus an estimate, drawn with a dashed outline." },
} as const;

export function DataVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const scene = useRef<HTMLDivElement | null>(null);
  const feeds = useRef<(SVGCircleElement | null)[]>([]);
  const hops = useRef<(SVGGElement | null)[]>([]);
  const bars = useRef<(SVGRectElement | null)[]>([]);
  const est = useRef<SVGRectElement | null>(null);
  const estLabel = useRef<HTMLSpanElement | null>(null);

  const { root, still } = useSceneClock(LOOP, t => {
    /* Les sources alimentent sans fin : un point par courbe, en décalé. */
    SOURCES_Y.forEach((y, i) => {
      const node = feeds.current[i];
      if (!node) return;
      const p = ((t + i * FEED_OFFSET) % FEED_MS) / FEED_MS;
      const { x, y: cy } = onCurve(96, y, 150, 170, ease(p));
      node.setAttribute("cx", `${x.toFixed(2)}`);
      node.setAttribute("cy", `${cy.toFixed(2)}`);
      /* Une opacité en cloche : le point naît et meurt sur sa course. */
      node.setAttribute("opacity", `${Math.sin(p * Math.PI).toFixed(3)}`);
    });

    /* Entre les deux nœuds, puis vers le graphique : la donnée ressort propre. */
    [[194, 228], [272, 300]].forEach(([x1, x2], i) => {
      const g = hops.current[i];
      if (!g) return;
      const p = ((t + i * 450) % 900) / 900;
      g.setAttribute("transform", `translate(${(x1 + (x2 - x1) * ease(p)).toFixed(2)} 170)`);
      g.setAttribute("opacity", `${Math.sin(p * Math.PI).toFixed(3)}`);
    });

    /* Les barres constatées montent une par une. */
    BARS.forEach((h, i) => {
      const rect = bars.current[i];
      if (!rect) return;
      const p = span(t, BARS_FROM + i * BARS_STEP, BARS_FROM + i * BARS_STEP + BARS_MS);
      const grown = h * ease(p);
      rect.setAttribute("height", `${grown}`);
      rect.setAttribute("y", `${BASE_Y - grown}`);
    });

    /* Puis l'estimation, plus tard et autrement. */
    const pe = span(t, EST_FROM, EST_FROM + EST_MS);
    if (est.current) {
      const grown = 120 * ease(pe);
      est.current.setAttribute("height", `${grown}`);
      est.current.setAttribute("y", `${BASE_Y - grown}`);
      est.current.setAttribute("opacity", `${pe}`);
    }
    if (estLabel.current) estLabel.current.style.opacity = `${pe}`;

    if (scene.current) scene.current.style.opacity = `${1 - span(t, FADE_FROM, LOOP)}`;
  });

  return (
    <div ref={scene} className="unv-wrap">
      <Scene
        rootRef={root}
        label={c.alt}
        shapes={
          <>
            {/* ---- Les cinq sources ---- */}
            {SOURCES_Y.map((y, i) => (
              <g key={y}>
                <rect x={10} y={y - 12} width={86} height={24} rx={6} fill="#F7F8FA" stroke="#E3E6EA" />
                <path className="unv-feed" d={curve(96, y, 150, 170)} stroke="#E3E6EA" strokeWidth={1.4} />
                {!still && <circle ref={node => { feeds.current[i] = node; }} className="unv-grain" r={3} opacity={0} />}
              </g>
            ))}

            {/* ---- Les deux étapes ---- */}
            {[172, 250].map(x => (
              <rect key={x} x={x - 22} y={148} width={44} height={44} rx={9} fill="#FFFFFF" stroke="#0B6BE6" strokeWidth={1.5} />
            ))}
            <line x1={194} y1={170} x2={228} y2={170} stroke="#9DB8F2" strokeWidth={1.6} />
            <line x1={272} y1={170} x2={300} y2={170} stroke="#9DB8F2" strokeWidth={1.6} />
            {!still && [0, 1].map(i => <Dot key={i} nodeRef={node => { hops.current[i] = node; }} />)}

            {/* ---- Le graphique ---- */}
            <line x1={306} y1={BASE_Y} x2={500} y2={BASE_Y} stroke="#D5DBE3" />
            {BARS.map((h, i) => (
              <rect key={i} ref={node => { bars.current[i] = node; }}
                x={308 + i * 32} y={still ? BASE_Y - h : BASE_Y} width={22} height={still ? h : 0} rx={3}
                fill={i === BARS.length - 1 ? "#0B6BE6" : "#C9D8F5"} />
            ))}
            <rect ref={est} x={468} y={still ? BASE_Y - 120 : BASE_Y} width={22} height={still ? 120 : 0} rx={3}
              fill="#F4F8FE" stroke="#0B6BE6" strokeWidth={1.2} strokeDasharray="4 3" opacity={still ? 1 : 0} />

            {/* ---- Les deux légendes ---- */}
            <line x1={308} y1={282} x2={458} y2={282} stroke="#D5DBE3" />
            <line x1={468} y1={282} x2={490} y2={282} stroke="#9DB8F2" />
          </>
        }
      >
        {SOURCES_Y.map((y, i) => (
          <T key={y} x={53} y={y} size={11} at="center" className="unv-src">{c.sources[i]}</T>
        ))}
        <T x={172} y={170} size={13} at="center" className="unv-num">1</T>
        <T x={250} y={170} size={13} at="center" className="unv-num">2</T>
        <T x={172} y={212} size={12} at="center" className="unv-step">{c.steps[0]}</T>
        <T x={250} y={212} size={12} at="center" className="unv-step">{c.steps[1]}</T>
        <T x={383} y={296} size={10.5} at="center" className="unv-hint">{c.observed}</T>
        <T x={479} y={296} size={10.5} at="center" className="unv-est"
          nodeRef={node => { estLabel.current = node; }} style={{ opacity: still ? 1 : 0 }}>
          {c.estimated}
        </T>
      </Scene>
    </div>
  );
}
