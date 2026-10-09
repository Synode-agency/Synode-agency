"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Box, Dot, Scene, T, ease, polyline, px, py, span, useSceneClock } from "./scene";

/**
 * 3 · INTÉGRATIONS : « Couche d'intégration ».
 *
 * Quatre systèmes en haut, quatre en bas, une couche au milieu. Un échange
 * part d'un système, longe le rail du haut, traverse la couche, longe le
 * rail du bas et arrive à destination. Ce que le visuel raconte : rien ne
 * parle directement à rien, tout passe par une couche qui consigne.
 *
 * ⚠ L'étiquette de la donnée n'apparaît qu'une fois le point sorti de la
 * pastille de départ, sinon elle masque le nom du système d'où part
 * l'échange.
 */

const CYCLE = 3000;
const TRIP_MS = 2100;
const DONE_AT = 2150;

const XS = [84, 184, 284, 392];
const TOP_W = [76, 76, 76, 112];
const BOT_W = [84, 94, 84, 84];
/** Les quatre échanges : système du haut, système du bas, donnée. */
const SWAPS: [number, number][] = [[0, 3], [1, 2], [3, 0], [2, 1]];

const COPY = {
  fr: {
    top: ["CRM", "ERP", "API", "Base de données"],
    bottom: ["Site web", "Outils SaaS", "Documents", "Reporting"],
    layer: "Couche d’intégration",
    data: ["contact", "facture", "disponibilité", "commande"],
    run: (a: string, b: string, d: string) => `${a} → ${b} · ${d} · transfert…`,
    kept: "échange consigné",
    label: "Une couche d’intégration fait circuler les données entre vos systèmes : CRM, ERP, API, base de données, site web, outils SaaS, documents et reporting.",
  },
  en: {
    top: ["CRM", "ERP", "API", "Database"],
    bottom: ["Website", "SaaS tools", "Documents", "Reporting"],
    layer: "Integration layer",
    data: ["contact", "invoice", "availability", "order"],
    run: (a: string, b: string, d: string) => `${a} → ${b} · ${d} · transferring…`,
    kept: "exchange logged",
    label: "An integration layer moves data between your systems: CRM, ERP, API, database, website, SaaS tools, documents and reporting.",
  },
} as const;

/** Le trajet d'un échange : descente, rail du haut, couche, rail du bas,
 *  descente. Il traverse toujours la couche en son milieu, à x = 240. */
const trip = (from: number, to: number) => polyline([
  [XS[from], 76], [XS[from], 124], [240, 124], [240, 196], [XS[to], 196], [XS[to], 244],
]);

export function LayerVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);
  const dot = useRef<SVGGElement | null>(null);
  const trace = useRef<SVGPathElement | null>(null);
  const tag = useRef<HTMLSpanElement | null>(null);

  const { root, still } = useSceneClock(CYCLE * SWAPS.length, t => {
    const i = Math.min(SWAPS.length - 1, Math.floor(t / CYCLE));
    const tc = t - i * CYCLE;
    const p = ease(span(tc, 0, TRIP_MS));
    const [from, to] = SWAPS[i];
    const route = trip(from, to);
    const at = route.at(p);

    setCycle(prev => (prev === i ? prev : i));
    /* 0 : en route · 1 : dans la couche · 2 : arrivé. */
    const s = tc >= DONE_AT ? 2 : at.seg === 2 ? 1 : 0;
    setStep(prev => (prev === s ? prev : s));

    if (dot.current) {
      dot.current.setAttribute("transform", `translate(${at.x.toFixed(2)} ${at.y.toFixed(2)})`);
      dot.current.setAttribute("opacity", tc < TRIP_MS ? "1" : "0");
    }
    if (trace.current) {
      trace.current.setAttribute("d", route.d);
      trace.current.setAttribute("stroke-dasharray", `${route.length.toFixed(1)}`);
      trace.current.setAttribute("stroke-dashoffset", (route.length * (1 - p)).toFixed(1));
    }
    if (tag.current) {
      /* Visible seulement une fois la pastille de départ quittée. */
      const out = at.seg >= 1 && tc < TRIP_MS;
      tag.current.style.opacity = out ? "1" : "0";
      tag.current.style.left = px(at.x);
      tag.current.style.top = py(at.y - 15);
    }
  });

  const i = still ? SWAPS.length - 1 : cycle;
  const s = still ? 2 : step;
  const [from, to] = SWAPS[i];
  const route = trip(from, to);

  return (
    <Scene
      rootRef={root}
      label={c.label}
      shapes={
        <>
          {/* Les deux rails, et le branchement de chaque système. */}
          <path className="cv-rail" d="M30 124 H446" />
          <path className="cv-rail" d="M30 196 H446" />
          {XS.map(x => <path key={`t-${x}`} className="cv-rail" d={`M${x} 76 V124`} />)}
          {XS.map(x => <path key={`b-${x}`} className="cv-rail" d={`M${x} 196 V244`} />)}
          <path
            ref={trace}
            className="cv-trace"
            d={route.d}
            strokeDasharray={route.length}
            strokeDashoffset={still ? 0 : route.length}
          />
          <Dot nodeRef={node => { dot.current = node; }} />
        </>
      }
    >
      {c.top.map((name, k) => (
        <Box key={name} x={XS[k] - TOP_W[k] / 2} y={42} w={TOP_W[k]} h={34} size={10.5}
          className={k === from ? "cv-pill is-on" : "cv-pill"}>
          {name}
        </Box>
      ))}
      {c.bottom.map((name, k) => (
        <Box key={name} x={XS[k] - BOT_W[k] / 2} y={244} w={BOT_W[k]} h={34} size={10.5}
          className={k === to && s >= 2 ? "cv-pill is-done" : k === to ? "cv-pill is-on" : "cv-pill"}>
          {k === to && s >= 2 ? `✓ ${name}` : name}
        </Box>
      ))}

      {/* ---- La couche ---- */}
      <Box x={52} y={138} w={376} h={44} className={s === 1 ? "cv-frame cv-layer is-hot" : "cv-frame cv-layer"} />
      <T x={240} y={160} size={12.5} at="center" className="cv-strong">{c.layer}</T>

      {/* ---- L'étiquette qui suit le point ---- */}
      <T
        nodeRef={node => { tag.current = node; }}
        x={240}
        y={109}
        size={8.5}
        at="center"
        className="cv-tag"
        /* Toujours invisible au premier rendu : c'est l'horloge qui la
           montre, une fois le point sorti de sa pastille de départ. */
        style={{ opacity: 0 }}
      >
        {c.data[i]}
      </T>

      <T x={14} y={292} size={10} className={s >= 2 ? "cv-note is-done" : "cv-note"}>
        {s >= 2 ? c.kept : c.run(c.top[from], c.bottom[to], c.data[i])}
      </T>
    </Scene>
  );
}
