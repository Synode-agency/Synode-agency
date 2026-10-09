"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Box, Scene, T, ease, px, py, span, useSceneClock } from "./scene";

/**
 * 2 · LOGICIELS SUR MESURE : « Votre application ».
 *
 * Huit modules épars se rangent un par un dans une fenêtre, puis
 * s'allument. Ce que le visuel raconte : l'application est assemblée à
 * partir du fonctionnement de l'entreprise, elle n'est pas un produit dans
 * lequel il faut rentrer.
 *
 * ⚠ Les positions des modules sont écrites à chaque image DANS le DOM, en
 * pourcentage du repère. Pas de transition CSS sur `left` et `top` : la
 * transition et l'horloge se battraient, et le vol saccaderait.
 */

const LOOP = 9000;
const FLY_FROM = 300;
const FLY_STEP = 450;
const FLY_MS = 650;
const LIT_FROM = 4600;
const LIT_STEP = 480;
const FADE_FROM = 8500;
const NOTE_AT = 4200;

const START_Y = [44, 110, 176, 242];
const END_X = [128, 244];
const END_Y = [74, 126, 178, 230];
const start = (k: number) => ({ x: k < 4 ? 8 : 372, y: START_Y[k % 4] });
const end = (k: number) => ({ x: END_X[k % 2], y: END_Y[Math.floor(k / 2)] });

const COPY = {
  fr: {
    title: "Votre application",
    modules: ["Rôles et droits", "Règles métier", "Vos données", "Écrans dédiés", "Historique", "Exports", "Connexions", "Assistance IA"],
    building: "assemblage des modules…",
    done: "votre organisation, reprise telle quelle",
    label: "Huit modules métier se rangent dans une application sur mesure : rôles et droits, règles métier, vos données, écrans dédiés, historique, exports, connexions et assistance IA.",
  },
  en: {
    title: "Your application",
    modules: ["Roles and rights", "Business rules", "Your data", "Dedicated screens", "History", "Exports", "Connections", "AI assistance"],
    building: "assembling the modules…",
    done: "your way of working, kept as it is",
    label: "Eight business modules fall into place inside a custom application: roles and rights, business rules, your data, dedicated screens, history, exports, connections and AI assistance.",
  },
} as const;

export function AppVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [placed, setPlaced] = useState(0);
  const [lit, setLit] = useState(0);
  const [said, setSaid] = useState(false);
  const mods = useRef<(HTMLSpanElement | null)[]>([]);
  const links = useRef<(SVGPathElement | null)[]>([]);
  const stage = useRef<HTMLDivElement | null>(null);

  const { root, still } = useSceneClock(LOOP, t => {
    let done = 0;
    for (let k = 0; k < 8; k++) {
      const from = FLY_FROM + k * FLY_STEP;
      const p = ease(span(t, from, from + FLY_MS));
      if (p >= 1) done++;
      const a = start(k);
      const b = end(k);
      const node = mods.current[k];
      if (node) {
        node.style.left = px(a.x + (b.x - a.x) * p);
        node.style.top = py(a.y + (b.y - a.y) * p);
      }
      const link = links.current[k];
      if (link) link.setAttribute("opacity", p > 0 && p < 1 ? "1" : "0");
    }
    setPlaced(prev => (prev === done ? prev : done));

    const n = t < LIT_FROM ? 0 : Math.min(8, Math.floor((t - LIT_FROM) / LIT_STEP) + 1);
    setLit(prev => (prev === n ? prev : n));
    const say = t >= NOTE_AT;
    setSaid(prev => (prev === say ? prev : say));

    /* Le fondu de fin porte sur la scène entière, formes comprises : c'est
       l'enveloppe qui s'efface, pas chaque élément. */
    if (stage.current) {
      stage.current.style.opacity = t < FADE_FROM ? "1" : (1 - span(t, FADE_FROM, LOOP)).toFixed(3);
    }
  });

  const nPlaced = still ? 8 : placed;
  const nLit = still ? 8 : lit;
  const settled = still || said;

  return (
    <Scene
      rootRef={root}
      sceneRef={node => { stage.current = node; }}
      label={c.label}
      shapes={
        <>
          <rect className="cv-win" x={116} y={28} width={248} height={264} rx={12} />
          <path className="cv-rule" d="M116 62 H364" />
          {[130, 140, 150].map(x => <circle key={x} className="cv-win-dot" cx={x} cy={45} r={3} />)}
          {c.modules.map((name, k) => {
            const a = start(k);
            const b = end(k);
            return (
              <path
                key={name}
                ref={node => { links.current[k] = node; }}
                className="cv-dash"
                opacity={0}
                d={`M${a.x + 54} ${a.y + 21} L${b.x + 54} ${b.y + 21}`}
              />
            );
          })}
        </>
      }
    >
      <T x={160} y={45} size={12.5} className="cv-strong">{c.title}</T>
      {c.modules.map((name, k) => {
        const at = still ? end(k) : start(k);
        return (
          <Box
            key={name}
            nodeRef={node => { mods.current[k] = node; }}
            x={at.x}
            y={at.y}
            w={108}
            h={42}
            size={10.5}
            className={[
              "cv-module",
              k < nPlaced ? "is-set" : "",
              k < nLit ? "is-lit" : "",
            ].filter(Boolean).join(" ")}
          >
            {name}
          </Box>
        );
      })}
      {/* ⚠ La mention est à y = 304 et non 292 comme sur les autres visuels :
          la fenêtre descend elle-même jusqu'à 292, et le texte serait assis
          sur sa bordure du bas. */}
      <T x={116} y={304} size={10} className={settled ? "cv-note is-said" : "cv-note"}>
        {settled ? c.done : c.building}
      </T>
    </Scene>
  );
}
