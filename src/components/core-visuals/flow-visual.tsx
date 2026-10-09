"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Box, Dot, Scene, T, curve, ease, onCurve, span, useSceneClock } from "./scene";

/**
 * 1 · AUTOMATISATIONS : « Flux automatisé ».
 *
 * Quatre outils à gauche, quatre à droite, un flux au milieu. À chaque
 * cycle, un couple est traité : la donnée part de l'outil de gauche, passe
 * par les trois temps du flux (lire, traiter, envoyer) et arrive dans
 * l'outil de droite, qui se valide.
 *
 * Les noms d'outils sont des catégories (« Boîte email », « ERP »), jamais
 * des produits : rien ici ne doit ressembler à un écosystème imposé.
 */

const CYCLE = 3400;
const AT = { centre: 900, g2: 1100, g3: 1300, out: 1500, done: 2400 } as const;
/** Les quatre couples, dans l'ordre : départ → arrivée. */
const PAIRS: [number, number][] = [[0, 0], [1, 2], [2, 3], [3, 1]];
const YS = [56, 124, 192, 260];

const COPY = {
  fr: {
    from: ["Boîte email", "Documents", "CRM", "Outil comptable"],
    to: ["ERP", "Tableur", "Signature", "Messagerie d’équipe"],
    centre: "Flux automatisé",
    gauges: ["lire", "traiter", "envoyer"],
    run: (n: number, a: string, b: string) => `exécution #${n} · ${a} → ${b} · en cours…`,
    kept: "trace enregistrée",
    label: "Un flux automatisé lit une donnée dans un outil, la traite, puis l’écrit dans un autre outil.",
  },
  en: {
    from: ["Email inbox", "Documents", "CRM", "Accounting tool"],
    to: ["ERP", "Spreadsheet", "E-signature", "Team messaging"],
    centre: "Automated flow",
    gauges: ["read", "process", "send"],
    run: (n: number, a: string, b: string) => `run #${n} · ${a} → ${b} · running…`,
    kept: "trace recorded",
    label: "An automated flow reads data from one tool, processes it, then writes it into another.",
  },
} as const;

export function FlowVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  /* Seuls les changements d'étape passent par React. */
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);
  /* Le numéro d'exécution continue de monter d'une boucle à l'autre. Il est
     compté ici et non lu sur l'horloge : une valeur tirée du temps réel
     pendant le rendu rendrait le composant impur. */
  const [pass, setPass] = useState(0);
  const dot = useRef<SVGGElement | null>(null);

  const { root, still } = useSceneClock(CYCLE * PAIRS.length, t => {
    const i = Math.min(PAIRS.length - 1, Math.floor(t / CYCLE));
    const tc = t - i * CYCLE;
    const s = tc < AT.centre ? 0
      : tc < AT.g2 ? 1
      : tc < AT.g3 ? 2
      : tc < AT.out ? 3
      : tc < AT.done ? 4
      : 5;
    setCycle(prev => {
      if (prev === i) return prev;
      if (i < prev) setPass(n => n + 1);
      return i;
    });
    setStep(prev => (prev === s ? prev : s));

    if (dot.current) {
      const [a, b] = PAIRS[i];
      if (tc < AT.centre) {
        const p = onCurve(134, YS[a], 180, 160, ease(span(tc, 0, AT.centre)));
        dot.current.setAttribute("transform", `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
        dot.current.setAttribute("opacity", "1");
      } else if (tc >= AT.out && tc < AT.done) {
        const p = onCurve(300, 160, 346, YS[b], ease(span(tc, AT.out, AT.done)));
        dot.current.setAttribute("transform", `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
        dot.current.setAttribute("opacity", "1");
      } else {
        dot.current.setAttribute("opacity", "0");
      }
    }
  });

  /* État complet et immobile sous `prefers-reduced-motion` : le dernier
     couple, flux allumé, arrivée validée. */
  const i = still ? PAIRS.length - 1 : cycle;
  const s = still ? 5 : step;
  const [src, dst] = PAIRS[i];
  const hot = s >= 1;
  const done = s >= 5;

  return (
    <Scene
      rootRef={root}
      label={c.label}
      shapes={
        <>
          {YS.map((y, k) => (
            <path
              key={`in-${k}`}
              className={k === src ? "cv-link is-on" : "cv-link"}
              d={curve(134, y, 180, 160)}
            />
          ))}
          {YS.map((y, k) => (
            <path
              key={`out-${k}`}
              className={k === dst && done ? "cv-link is-done" : k === dst && s >= 3 ? "cv-link is-on" : "cv-link"}
              d={curve(300, 160, 346, y)}
            />
          ))}
          <Dot nodeRef={node => { dot.current = node; }} />
        </>
      }
    >
      {c.from.map((name, k) => (
        <Box key={name} x={14} y={YS[k] - 15} w={120} h={30} size={10.5}
          className={k === src ? "cv-pill is-on" : "cv-pill"}>
          {name}
        </Box>
      ))}
      {c.to.map((name, k) => (
        <Box key={name} x={346} y={YS[k] - 15} w={120} h={30} size={10.5}
          className={k === dst && done ? "cv-pill is-done" : k === dst && s >= 3 ? "cv-pill is-on" : "cv-pill"}>
          {done && k === dst ? `✓ ${name}` : name}
        </Box>
      ))}

      {/* ---- Le flux, au centre ---- */}
      <Box x={180} y={118} w={120} h={84} className={hot ? "cv-frame cv-flow is-hot" : "cv-frame cv-flow"} />
      <T x={240} y={134} size={12.5} at="center" className="cv-strong">{c.centre}</T>
      {c.gauges.map((word, j) => (
        <Box key={word} x={190 + j * 34} y={162} w={30} h={5}
          className={s > j ? "cv-gauge is-on" : "cv-gauge"} />
      ))}
      {c.gauges.map((word, j) => (
        <T key={`w-${word}`} x={205 + j * 34} y={176} size={7.5} at="center" className="cv-muted">{word}</T>
      ))}

      <T x={14} y={292} size={10} className={done ? "cv-note is-done" : "cv-note"}>
        {done ? c.kept : c.run(pass * PAIRS.length + i + 1, c.from[src], c.to[dst])}
      </T>
    </Scene>
  );
}
