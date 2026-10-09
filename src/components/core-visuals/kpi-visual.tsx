"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Box, Dot, Scene, T, curve, ease, onCurve, polyline, py, span, useSceneClock } from "./scene";

/**
 * 4 · DATA & INTELLIGENCE : « Vos indicateurs ».
 *
 * Huit sources passent un contrôle qualité avant d'alimenter des
 * indicateurs. L'une d'elles reste incomplète et n'alimente rien : c'est le
 * propos du visuel, et la raison de la mention du bas. Ne pas la faire
 * passer au vert pour « finir » la scène.
 *
 * Les six barres n'ont aucune échelle et aucun chiffre : ce sont des
 * hauteurs relatives, pas des résultats.
 */

const LOOP = 7600;
const FROM = 300;
const STEP = 650;
const TRIP_MS = 600;
const FADE_FROM = 7100;

const COL_X = [12, 116];
const ROW_Y = [40, 100, 160, 220];
/** La source k : colonne, rangée. Les quatre de gauche, puis les quatre de
 *  droite — c'est aussi l'ordre dans lequel elles partent. */
const col = (k: number) => (k < 4 ? 0 : 1);
const row = (k: number) => k % 4;
const SOURCE_Y = (k: number) => ROW_Y[row(k)] + 14;
/** « Fichiers internes » : la source incomplète. */
const WARN = 7;
const BARS = [44, 62, 52, 78, 70, 96];
const arrive = (k: number) => FROM + k * STEP + TRIP_MS;

const COPY = {
  fr: {
    sources: ["Ventes", "Stocks", "Production", "Clients", "Finance", "Support", "Site web", "Fichiers internes"],
    check: "contrôle qualité",
    title: "Vos indicateurs",
    ok: (n: number) => `${n} source${n > 1 ? "s" : ""} vérifiée${n > 1 ? "s" : ""}`,
    warn: "1 source à compléter",
    run: "réunir · vérifier · présenter",
    rule: "un chiffre n’est affiché que si sa source est vérifiée",
    label: "Huit sources de données passent un contrôle qualité avant d’alimenter vos indicateurs ; une source incomplète n’est pas comptée.",
  },
  en: {
    sources: ["Sales", "Stock", "Production", "Customers", "Finance", "Support", "Website", "Internal files"],
    check: "quality check",
    title: "Your indicators",
    ok: (n: number) => `${n} source${n > 1 ? "s" : ""} checked`,
    warn: "1 source to complete",
    run: "gather · check · present",
    rule: "a figure is shown only once its source is checked",
    label: "Eight data sources pass a quality check before feeding your indicators; an incomplete source is not counted.",
  },
} as const;

/**
 * La liaison d'une source vers le contrôle qualité.
 *
 * ⚠ Les sources de GAUCHE ne peuvent pas rejoindre (226, 150) par une
 * courbe directe : elle traverserait les pastilles de la colonne de droite.
 * Elles descendent donc de 30px, ce qui les pose exactement dans l'espace
 * libre SOUS la pastille de droite de leur rangée, longent cet espace
 * jusqu'au contrôle qualité, puis remontent le long de celui-ci. Elles
 * n'arrivent ainsi jamais sur une pastille, et ne relient pas deux
 * pastilles entre elles.
 */
function link(k: number) {
  const y = SOURCE_Y(k);
  if (col(k) === 1) {
    return { d: curve(212, y, 226, 150), at: (p: number) => onCurve(212, y, 226, 150, p) };
  }
  const route = polyline([[108, y], [108, y + 30], [226, y + 30], [226, 150]]);
  return { d: route.d, at: route.at };
}

export function KpiVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [sent, setSent] = useState(0);
  const dot = useRef<SVGGElement | null>(null);
  const feed = useRef<SVGGElement | null>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const stage = useRef<HTMLDivElement | null>(null);

  const { root, still } = useSceneClock(LOOP, t => {
    let done = 0;
    for (let k = 0; k < 8; k++) if (t >= arrive(k)) done++;
    setSent(prev => (prev === done ? prev : done));

    /* Le point gris suit la liaison de la source en cours. */
    const k = Math.min(7, Math.max(0, Math.floor((t - FROM) / STEP)));
    const p = span(t, FROM + k * STEP, arrive(k));
    if (dot.current) {
      const at = link(k).at(ease(p));
      dot.current.setAttribute("transform", `translate(${at.x.toFixed(2)} ${at.y.toFixed(2)})`);
      dot.current.setAttribute("opacity", t >= FROM && p < 1 ? "1" : "0");
    }
    /* Le point vert file du contrôle vers l'encadré, à chaque arrivée. */
    if (feed.current) {
      const q = span(t, arrive(k), arrive(k) + 300);
      feed.current.setAttribute("transform", `translate(${(226 + 44 * ease(q)).toFixed(2)} 150)`);
      feed.current.setAttribute("opacity", k !== WARN && q > 0 && q < 1 ? "1" : "0");
    }

    /* Les barres montent en proportion des sources vérifiées, chacune sur
       300ms après l'arrivée de la source qui la fait monter. */
    let level = 0;
    for (let j = 0; j < 8; j++) if (j !== WARN) level += span(t, arrive(j), arrive(j) + 300) / 7;
    for (let j = 0; j < BARS.length; j++) {
      const node = bars.current[j];
      if (!node) continue;
      const h = BARS[j] * level;
      node.style.height = py(h);
      node.style.top = py(246 - h);
      /* Une barre vide ne doit pas laisser un trait de bordure visible. */
      node.style.opacity = h < 0.6 ? "0" : "1";
    }

    if (stage.current) {
      stage.current.style.opacity = t < FADE_FROM ? "1" : (1 - span(t, FADE_FROM, LOOP)).toFixed(3);
    }
  });

  const n = still ? 8 : sent;
  const checked = still ? 7 : Math.max(0, n - (n > WARN ? 1 : 0));
  const level = checked / 7;

  return (
    <Scene
      rootRef={root}
      sceneRef={node => { stage.current = node; }}
      label={c.label}
      shapes={
        <>
          {c.sources.map((name, k) => (
            <path
              key={name}
              className={[
                "cv-link",
                k < n ? (k === WARN ? "is-warn" : "is-set") : "",
              ].filter(Boolean).join(" ")}
              d={link(k).d}
            />
          ))}
          {/* Le contrôle qualité : une ligne, pas une boîte. */}
          <path className="cv-dash cv-check" d="M226 36 V262" />
          <path className="cv-base" d="M272 246 H456" />
          <Dot nodeRef={node => { dot.current = node; }} tone="grey" />
          <Dot nodeRef={node => { feed.current = node; }} tone="green" />
        </>
      }
    >
      {c.sources.map((name, k) => (
        <Box key={name} x={COL_X[col(k)]} y={ROW_Y[row(k)]} w={96} h={28} size={10}
          className={[
            "cv-pill",
            k < n ? (k === WARN ? "is-warn" : "is-set") : "",
          ].filter(Boolean).join(" ")}>
          {name}
        </Box>
      ))}
      <T x={226} y={28} size={8.5} at="center" className="cv-muted">{c.check}</T>

      {/* ---- Les indicateurs ---- */}
      <Box x={260} y={36} w={206} h={230} className="cv-frame" />
      <T x={272} y={58} size={12.5} className="cv-strong">{c.title}</T>
      <T x={272} y={78} size={9.5} className="cv-ok">{c.ok(checked)}</T>
      {n > WARN && <T x={272} y={96} size={9.5} className="cv-warn">{c.warn}</T>}
      {BARS.map((max, j) => (
        <Box
          key={max}
          nodeRef={node => { bars.current[j] = node; }}
          x={280 + j * 28}
          y={246 - max * level}
          w={18}
          h={max * level}
          className={j === BARS.length - 1 ? "cv-bar is-lead" : "cv-bar"}
          style={{ opacity: max * level < 0.6 ? 0 : 1 }}
        />
      ))}

      <T x={14} y={292} size={10} className={n >= 8 ? "cv-note is-said" : "cv-note"}>
        {n >= 8 ? c.rule : c.run}
      </T>
    </Scene>
  );
}
