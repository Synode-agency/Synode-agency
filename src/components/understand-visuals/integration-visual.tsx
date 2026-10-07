"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Scene, T, clamp, ease, span, useSceneClock } from "./scene";

/**
 * « QU'EST-CE QU'UNE INTÉGRATION ENTRE VOS SYSTÈMES ? ».
 *
 * Une donnée passe du système A au système B, encore et encore, et le
 * journal garde la trace des trois derniers échanges. C'est l'argument de
 * la section : une intégration n'est pas un transfert ponctuel, c'est un
 * échange réglé et consigné.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. Ce visuel TOURNE EN CONTINU, sans fondu de fin : un échange qui
 *    s'éteint toutes les 1,6s dirait le contraire de ce qu'il montre.
 * 2. La pastille « source de référence » est sur le système A, et sur lui
 *    seul. C'est la règle que la section explique : pour chaque donnée, un
 *    système fait foi.
 * ────────────────────────────────────────────────────────────────────────
 */

const CYCLE = 1600;
const SLIDE_FROM = 150;
const SLIDE_TO = 1150;
const ARRIVED_TO = 1500;

const COPY = {
  fr: {
    a: "Système A", b: "Système B", source: "source de référence",
    id: "identifiant commun", rules: "règles de transfert",
    items: ["Contact", "Statut", "Commande", "Document"],
    log: "Journal", synced: "synchronisé",
    alt: "Une donnée passe du système A au système B à intervalle régulier ; chaque échange est consigné dans un journal.",
  },
  en: {
    a: "System A", b: "System B", source: "system of record",
    id: "shared identifier", rules: "transfer rules",
    items: ["Contact", "Status", "Order", "Document"],
    log: "Log", synced: "synced",
    alt: "A record moves from system A to system B at regular intervals; every exchange is written to a log.",
  },
} as const;

/** Les trois dernières lignes du journal, la plus récente en tête. */
type Entry = { item: string; minute: number };

export function IntegrationVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  /* Le journal est le seul état React : il ne change qu'à l'arrivée d'une
     donnée, soit une fois par cycle. */
  const [log, setLog] = useState<Entry[]>([{ item: c.items[0], minute: 1 }]);
  const pill = useRef<SVGRectElement | null>(null);
  const pillText = useRef<HTMLSpanElement | null>(null);
  const boxB = useRef<SVGRectElement | null>(null);
  const check = useRef<SVGGElement | null>(null);
  const cycleRef = useRef(0);
  const loggedRef = useRef(0);

  const { root, still } = useSceneClock(CYCLE * 1000, t => {
    const cycle = Math.floor(t / CYCLE);
    cycleRef.current = cycle;
    const inCycle = t % CYCLE;
    const item = c.items[cycle % c.items.length];

    /* La donnée glisse de A vers le milieu, puis disparaît. */
    const p = span(inCycle, SLIDE_FROM, SLIDE_TO);
    const x = 150 + (294 - 150) * ease(p);
    const fade = inCycle < SLIDE_FROM ? 0 : p >= 1 ? clamp(1 - span(inCycle, SLIDE_TO, SLIDE_TO + 200), 0, 1) : Math.min(1, span(inCycle, SLIDE_FROM, SLIDE_FROM + 150) * 1.4);
    if (pill.current) {
      pill.current.setAttribute("x", `${x - 38}`);
      pill.current.setAttribute("opacity", `${fade}`);
    }
    if (pillText.current) {
      pillText.current.style.left = `${((x / 520) * 100).toFixed(3)}%`;
      pillText.current.style.opacity = `${fade}`;
      if (pillText.current.textContent !== item) pillText.current.textContent = item;
    }

    /* À l'arrivée, le système B passe au vert et coche. */
    const arrived = inCycle >= SLIDE_TO && inCycle < ARRIVED_TO;
    boxB.current?.setAttribute("stroke", arrived ? "#2DB37A" : "#D5DBE3");
    check.current?.setAttribute("opacity", arrived ? "1" : "0");

    /* Et le journal gagne une ligne, une seule fois par cycle. */
    if (inCycle >= SLIDE_TO && loggedRef.current !== cycle) {
      loggedRef.current = cycle;
      setLog(prev => [{ item, minute: (cycle % 9) + 1 }, ...prev].slice(0, 3));
    }
  });

  const entries = still ? [{ item: c.items[0], minute: 1 }] : log;

  return (
    <Scene
      rootRef={root}
      label={c.alt}
      shapes={
        <>
          {/* ---- Les deux systèmes ---- */}
          <rect x={28} y={82} width={114} height={20} rx={10} fill="#EAF2FE" stroke="#D6E2FA" />
          <rect x={20} y={112} width={130} height={86} rx={10} fill="#FFFFFF" stroke="#9DB8F2" strokeWidth={1.5} />
          <rect ref={boxB} x={370} y={112} width={130} height={86} rx={10} fill="#FFFFFF"
            stroke={still ? "#2DB37A" : "#D5DBE3"} strokeWidth={1.5} />

          {/* ---- Les trois canaux ---- */}
          <line x1={150} y1={136} x2={370} y2={136} stroke="#D5DBE3" strokeWidth={1.2} strokeDasharray="3 4" />
          <line x1={150} y1={155} x2={370} y2={155} stroke="#9DB8F2" strokeWidth={1.6} />
          <line x1={150} y1={174} x2={370} y2={174} stroke="#D5DBE3" strokeWidth={1.2} strokeDasharray="3 4" />

          {/* ---- La donnée qui passe ---- */}
          {!still && (
            <rect ref={pill} className="unv-pill" x={112} y={144} width={76} height={22} rx={11} opacity={0} />
          )}

          {/* ---- La coche d'arrivée ---- */}
          <g ref={check} opacity={still ? 1 : 0}>
            <circle cx={492} cy={120} r={8} fill="#2DB37A" />
            <path d="M488 120.2l3 3 5.5-6" stroke="#FFFFFF" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* ---- Les séparateurs du journal ---- */}
          {[266, 292, 318].map(y => <line key={y} x1={20} y1={y + 13} x2={500} y2={y + 13} stroke="#ECEEF1" />)}
          {entries.map((e, i) => <circle key={i} cx={26} cy={[266, 292, 318][i]} r={3} fill="#2DB37A" opacity={[1, 0.7, 0.4][i]} />)}
        </>
      }
    >
      <T x={85} y={155} size={14} at="center" className="unv-sys">{c.a}</T>
      <T x={435} y={155} size={14} at="center" className="unv-sys">{c.b}</T>
      <T x={85} y={92} size={10} at="center" className="unv-chip">{c.source}</T>
      <T x={260} y={128} size={9.5} at="center" className="unv-hint">{c.id}</T>
      <T x={260} y={190} size={9.5} at="center" className="unv-hint">{c.rules}</T>
      {!still && (
        <T x={260} y={155} size={11} at="center" className="unv-pill-label"
          nodeRef={node => { pillText.current = node; }} style={{ opacity: 0 }}>
          {c.items[0]}
        </T>
      )}
      <T x={20} y={238} size={11} className="unv-hint">{c.log}</T>
      {entries.map((e, i) => (
        <T key={`${e.item}-${i}`} x={38} y={[266, 292, 318][i]} size={11.5} className="unv-log" style={{ opacity: [1, 0.7, 0.4][i] }}>
          14:0{e.minute} · {e.item} {c.synced}
        </T>
      ))}
      {entries.map((e, i) => (
        <T key={`ab-${i}`} x={500} y={[266, 292, 318][i]} size={10.5} at="end" className="unv-hint" style={{ opacity: [1, 0.7, 0.4][i] }}>
          A → B
        </T>
      ))}
    </Scene>
  );
}
