"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * LE VISUEL DE LA COLONNE DE DROITE DE « QU'EST-CE QU'UN AGENT IA ? ».
 *
 * Les cinq temps d'un agent posés en cercle autour de sa tête, chacun relié
 * à elle par un trait. Le temps en cours s'allume, et l'agent le REGARDE :
 * ses yeux et sa tête s'orientent vers le mot.
 *
 * ── Le piège de géométrie, à ne pas défaire ─────────────────────────────
 * Les traits sont tracés dans un SVG en `viewBox="0 0 560 360"` et les mots
 * sont posés en POURCENTAGE du même repère. Les deux ne se superposent que
 * parce que la scène porte `aspect-ratio: 560 / 360`. Sans ce rapport, le
 * SVG se centrerait dans sa boîte avec des bandes vides et les traits
 * pointeraient à côté des mots.
 *
 * Les traits partent du CENTRE de la scène, pas du bord de la tête. La tête
 * est un élément HTML de taille fixe, donc son rayon en unités SVG change
 * avec la largeur de la carte : aucun rayon écrit en dur ne tiendrait à
 * toutes les largeurs. C'est son fond blanc, dessiné par-dessus, qui masque
 * la portion inutile de chaque trait. Même chose pour les mots.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. UNE SEULE horloge, en `requestAnimationFrame`. Le flottement, le
 *    clignement, l'antenne et l'opacité de fin de boucle sont écrits
 *    directement dans le DOM par des refs ; React ne rend que les six
 *    changements d'état de la boucle.
 * 2. Le regard et l'inclinaison sont les SEULES valeurs à porter une
 *    transition CSS : elles ne changent qu'au changement de temps. D'où
 *    deux niveaux pour les yeux, le groupe pour le regard et chaque œil
 *    pour le clignement.
 * 3. Le premier temps est actif au premier rendu, yeux ouverts, côté
 *    serveur comme côté client.
 * ────────────────────────────────────────────────────────────────────────
 */

/* ---- Le repère de la scène. Les positions sont dans ce système. ---- */
const W = 560;
const H = 360;
const CX = W / 2;
const CY = H / 2;
/** Le cercle est aplati : la carte est plus large que haute. */
const RX = 200;
const RY = 118;

/* ---- La chronologie. Cinq temps, puis un temps de repos. ---- */
const STEP_MS = 1800;
const STEPS = 5;
const DONE_AT = STEP_MS * STEPS;
const HAPPY_FROM = DONE_AT + 100;
const FADE_FROM = 10600;
const LOOP = 11000;
const BLINK_EVERY = 3400;
const BLINK_MS = 130;
const BLINK_OFFSET = 1700;
const FLOAT_AMP = 2.5;
/** `sin(ms / 700)`, soit une période d'environ 4,4s. */
const FLOAT_DIV = 700;

/** Les trois bouches, dans le repère du visage. */
const MOUTH = {
  rest: "M-7 1 Q0 3 7 1",
  focus: "M-6 1 L6 1",
  smile: "M-8 -1 Q0 6 8 -1",
} as const;

/** Les cinq mots, en partant du haut et dans le sens des aiguilles. */
const ANGLES = [-90, -18, 54, 126, 198].map(d => (d * Math.PI) / 180);
const SPOTS = ANGLES.map(a => ({ x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) }));
/** Le regard suit le mot : même direction, amplitude d'un œil. */
const GAZE = ANGLES.map(a => [+(Math.cos(a) * 5).toFixed(2), +(Math.sin(a) * 4).toFixed(2)]);
/** La tête se penche du côté du mot. */
const TILT = ANGLES.map(a => +(Math.cos(a) * 6).toFixed(2));

const pc = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

const COPY = {
  fr: {
    steps: ["Recevoir", "Comprendre", "Décider", "Agir", "Faire valider"],
    human: "humain",
    alt: "Un agent IA et ses cinq temps : recevoir, comprendre, décider, agir, puis faire valider par une personne.",
  },
  en: {
    steps: ["Receive", "Understand", "Decide", "Act", "Get approval"],
    human: "human",
    alt: "An AI agent and its five steps: receive, understand, decide, act, then have a person approve.",
  },
} as const;

export function AgentBrief({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [step, setStep] = useState(0);
  const [happy, setHappy] = useState(false);
  const [still, setStill] = useState(false);

  const root = useRef<HTMLDivElement | null>(null);
  const card = useRef<HTMLDivElement | null>(null);
  const body = useRef<HTMLDivElement | null>(null);
  const shadow = useRef<HTMLSpanElement | null>(null);
  const ball = useRef<HTMLSpanElement | null>(null);
  const eyeL = useRef<HTMLSpanElement | null>(null);
  const eyeR = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* L'état final : les cinq temps franchis, l'agent content et immobile. */
      queueMicrotask(() => { setStill(true); setStep(STEPS - 1); setHappy(true); });
      return;
    }

    let raf = 0;
    let t0 = 0;
    let lastStep = 0;
    let lastHappy = false;
    let running = false;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = (now - t0) % LOOP;

      const s = Math.min(Math.floor(t / STEP_MS), STEPS - 1);
      if (s !== lastStep) { lastStep = s; setStep(s); }
      const isHappy = t >= HAPPY_FROM && t < FADE_FROM;
      if (isHappy !== lastHappy) { lastHappy = isHappy; setHappy(isHappy); }

      const float = Math.sin(t / FLOAT_DIV) * FLOAT_AMP;
      if (body.current) body.current.style.transform = `translateY(${float.toFixed(2)}px)`;
      if (shadow.current) shadow.current.style.width = `${(54 - 2 * float).toFixed(1)}px`;

      const lid = !isHappy && (t + BLINK_OFFSET) % BLINK_EVERY < BLINK_MS ? "scaleY(.12)" : "scaleY(1)";
      if (eyeL.current) eyeL.current.style.transform = lid;
      if (eyeR.current) eyeR.current.style.transform = lid;

      /* L'antenne clignote pendant qu'il travaille : comprendre, décider,
         agir. Ni à la réception, ni à la validation. */
      const working = s >= 1 && s <= 3;
      if (ball.current) {
        const on = working && Math.floor(t / 300) % 2 === 0;
        ball.current.style.background = working ? (on ? "#0B6BE6" : "#9DC0F5") : "#0B6BE6";
        ball.current.style.boxShadow = working ? "0 0 6px rgba(11,107,230,.55)" : "none";
      }

      /* La fin de boucle s'atténue, sans jamais s'éteindre. */
      if (card.current) {
        card.current.style.opacity = t >= FADE_FROM ? `${(1 - ((t - FADE_FROM) / (LOOP - FADE_FROM)) * 0.85).toFixed(3)}` : "1";
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    /* L'horloge ne tourne que lorsque la section est à l'écran. */
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  const [gx, gy] = GAZE[step];
  const mouth = step === STEPS - 1 ? MOUTH.smile : step === 0 ? MOUTH.rest : MOUTH.focus;
  const working = step >= 1 && step <= 3;

  return (
    <div className="abr" ref={root}>
      <div className="abr-card" ref={card} role="img" aria-label={c.alt}>
        <div className="abr-orbit">
          {/* ---- Les traits. Ils partent du centre ; la tête et les mots,
              dessinés par-dessus, en masquent les extrémités. ---- */}
          <svg className="abr-wires" viewBox={`0 0 ${W} ${H}`} aria-hidden>
            {SPOTS.map((spot, i) => (
              <line
                key={c.steps[i]}
                className={i === step ? "abr-wire is-on" : i < step || still ? "abr-wire is-done" : "abr-wire"}
                x1={CX}
                y1={CY}
                x2={spot.x}
                y2={spot.y}
              />
            ))}
          </svg>

          {/* ---- Les cinq mots ---- */}
          {c.steps.map((label, i) => (
            <span
              key={label}
              className={`abr-word${i === step ? " is-on" : i < step || still ? " is-done" : ""}`}
              style={{ left: pc(SPOTS[i].x, W), top: pc(SPOTS[i].y, H) }}
            >
              {label}
              {i === STEPS - 1 && <em>{c.human}</em>}
            </span>
          ))}

          {/* ---- L'agent, au centre ---- */}
          <div className="abr-bot">
            <span className="abr-antenna" aria-hidden>
              <span className="abr-ball" ref={ball} />
              <i />
            </span>
            <div className="abr-body" ref={body}>
              <div className={working ? "abr-head is-working" : "abr-head"} style={{ transform: `rotate(${TILT[step]}deg)` }} aria-hidden>
                <span className="abr-ear abr-ear--l" />
                <span className="abr-ear abr-ear--r" />
                <div className="abr-face">
                  <span className="abr-eyes" style={{ transform: `translate(${gx}px, ${gy}px)` }}>
                    {happy ? (
                      <>
                        <svg className="abr-arc" viewBox="0 0 13 8" aria-hidden><path d="M1.5 6.5 Q6.5 -1.5 11.5 6.5" /></svg>
                        <svg className="abr-arc" viewBox="0 0 13 8" aria-hidden><path d="M1.5 6.5 Q6.5 -1.5 11.5 6.5" /></svg>
                      </>
                    ) : (
                      <>
                        <span className="abr-eye" ref={eyeL} />
                        <span className="abr-eye" ref={eyeR} />
                      </>
                    )}
                  </span>
                  <svg className="abr-mouth" viewBox="-15 -6 30 12" aria-hidden><path d={mouth} /></svg>
                </div>
                <span className={happy ? "abr-cheek abr-cheek--l is-on" : "abr-cheek abr-cheek--l"} />
                <span className={happy ? "abr-cheek abr-cheek--r is-on" : "abr-cheek abr-cheek--r"} />
              </div>
              <span className="abr-floor" ref={shadow} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
