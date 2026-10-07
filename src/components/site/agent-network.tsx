"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * LE VISUEL DE « VOS OUTILS RESTENT AU CENTRE ».
 *
 * L'agent au centre, les huit outils autour, et ce qui circule entre eux :
 * il LIT dans certains, il ÉCRIT dans d'autres, et une action attend une
 * validation humaine. Posé à même la bande, sans cadre.
 *
 * ── Le piège de géométrie, à ne pas défaire ─────────────────────────────
 * Les traits sont tracés dans un SVG en `viewBox="0 0 520 380"` et les
 * labels sont posés en POURCENTAGE du même repère. Les deux ne se
 * superposent que parce que la scène porte `aspect-ratio: 520 / 380`. Sans
 * ce rapport, le SVG se centrerait dans sa boîte avec des bandes vides et
 * les rayons pointeraient à côté des labels.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Quatre points à ne pas défaire ──────────────────────────────────────
 * 1. UNE SEULE horloge, en `requestAnimationFrame`. Position, rotation,
 *    échelle, rayons, onde, point et robot sont écrits DIRECTEMENT dans le
 *    DOM par des refs ; React ne rend que le changement d'outil actif,
 *    toutes les 1,6s. Aucune transition CSS sur ces propriétés : elle se
 *    battrait avec la valeur calculée.
 * 2. Le flottement est BORNÉ par la taille réelle de chaque label, mesurée
 *    une fois et à chaque redimensionnement. Sans cette borne, le label
 *    « Documents » sort de la scène par la droite : sa position de base le
 *    laisse à quatre unités du bord, et le flottement en demande sept.
 * 3. Les mouvements sont interpolés, jamais posés : l'échelle, l'inclinaison
 *    de la tête et le regard glissent vers leur cible d'une fraction par
 *    image. C'est ce qui évite les sauts au changement d'outil.
 * 4. `prefers-reduced-motion` n'arme aucune horloge : labels à leur position
 *    de base, le premier outil actif, ni point ni onde, robot immobile.
 * ────────────────────────────────────────────────────────────────────────
 */

/* ---- Le repère de la scène. Les positions sont dans ce système. ---- */
const W = 520;
const H = 380;
const CX = 260;
const CY = 190;
const RING = 74;

/** Un outil actif toutes les 1,6s. */
const STEP_MS = 1600;
/** Le point parcourt son rayon sur les 70 % de l'étape, puis s'efface. */
const TRAVEL = 0.7;
const FADE_FROM = 0.8;
/** L'onde part de l'anneau et s'étend jusqu'à 120, en 900ms. */
const WAVE_MS = 900;
const WAVE_TO = 120;
/** Le clignement : 140ms toutes les 3,6s, décalé pour ouvrir l'œil à la
 *  première image. */
const BLINK_EVERY = 3600;
const BLINK_MS = 140;
const BLINK_OFFSET = 1500;

type Mode = "read" | "write" | "approve";

const TOOLS: { code: string; x: number; y: number; mode: Mode }[] = [
  { code: "CRM", x: 85, y: 65, mode: "write" },
  { code: "ERP", x: 258, y: 46, mode: "read" },
  { code: "@", x: 437, y: 78, mode: "write" },
  { code: "DOC", x: 448, y: 202, mode: "read" },
  { code: "DB", x: 417, y: 322, mode: "read" },
  { code: "API", x: 248, y: 337, mode: "write" },
  { code: "APP", x: 98, y: 313, mode: "approve" },
  { code: "CAL", x: 76, y: 172, mode: "write" },
];

const COPY = {
  fr: {
    names: ["CRM", "ERP", "Email", "Documents", "Base de données", "API", "Outils métier", "Agenda"],
    idle: "connecté",
    states: { read: "lit", write: "écrit", approve: "à valider" },
    alt: "Un agent IA au centre de huit outils d’entreprise : il lit dans certains, écrit dans d’autres, et une action attend une validation humaine.",
  },
  en: {
    names: ["CRM", "ERP", "Email", "Documents", "Database", "API", "Business tools", "Calendar"],
    idle: "connected",
    states: { read: "reads", write: "writes", approve: "to approve" },
    alt: "An AI agent at the centre of eight business tools: it reads from some, writes to others, and one action waits for human approval.",
  },
} as const;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
/** Ralenti au début et à la fin. */
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
const pc = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

export function AgentNetwork({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  const root = useRef<HTMLDivElement | null>(null);
  const scene = useRef<HTMLDivElement | null>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const rays = useRef<(SVGLineElement | null)[]>([]);
  const ring = useRef<SVGCircleElement | null>(null);
  const wave = useRef<SVGCircleElement | null>(null);
  const dot = useRef<SVGCircleElement | null>(null);
  const bot = useRef<HTMLDivElement | null>(null);
  const head = useRef<HTMLDivElement | null>(null);
  const eyes = useRef<HTMLSpanElement | null>(null);
  const eyeL = useRef<HTMLSpanElement | null>(null);
  const eyeR = useRef<HTMLSpanElement | null>(null);
  const floor = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = root.current;
    const box = scene.current;
    if (!el || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    /* La demi-taille de chaque label, en unités de scène. Mesurée ici et
       non à chaque image : lire `offsetWidth` dans la boucle forcerait un
       recalcul de mise en page soixante fois par seconde. */
    let half = TOOLS.map(() => ({ w: 0, h: 0 }));
    const measure = () => {
      const unit = W / (box.clientWidth || W);
      half = labels.current.map(node => ({
        w: ((node?.offsetWidth ?? 0) / 2) * unit,
        h: ((node?.offsetHeight ?? 0) / 2) * unit,
      }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);

    /* Les valeurs interpolées survivent d'une image à l'autre. */
    const scales = TOOLS.map(() => 1);
    const eye = { x: 0, y: 0 };
    let rot = 0;
    let raf = 0;
    let t0 = 0;
    let lastIndex = 0;
    let waveAt = 0;
    let running = false;

    const frame = (now: number) => {
      if (!t0) { t0 = now; waveAt = 0; }
      const t = now - t0;

      const index = Math.floor(t / STEP_MS) % TOOLS.length;
      if (index !== lastIndex) { lastIndex = index; waveAt = t; setActive(index); }

      /* ---- Les labels : flottement, rotation, échelle ---- */
      const now_x: number[] = [];
      const now_y: number[] = [];
      TOOLS.forEach((tool, k) => {
        const fx = tool.x
          + Math.sin(t / (5200 + k * 610) + k * 1.7) * 6
          + Math.sin(t / (2300 + k * 170) + k) * 1.5;
        const fy = tool.y
          + Math.cos(t / (6100 + k * 530) + k * 2.3) * 5
          + Math.cos(t / (2700 + k * 230) + k * 0.6) * 1.2;
        const x = clamp(fx, half[k].w + 2, W - half[k].w - 2);
        const y = clamp(fy, half[k].h + 2, H - half[k].h - 2);
        now_x[k] = x;
        now_y[k] = y;

        const target = k === index ? 1.03 : 1;
        scales[k] += (target - scales[k]) * 0.08;
        const spin = Math.sin(t / (7000 + k * 450) + k) * 0.6;
        const node = labels.current[k];
        if (node) {
          node.style.left = pc(x, W);
          node.style.top = pc(y, H);
          node.style.transform = `translate(-50%, -50%) rotate(${spin.toFixed(3)}deg) scale(${scales[k].toFixed(4)})`;
        }
      });

      /* ---- Les rayons, recalculés pour suivre le flottement ---- */
      TOOLS.forEach((tool, k) => {
        const line = rays.current[k];
        if (!line) return;
        const dx = now_x[k] - CX;
        const dy = now_y[k] - CY;
        const len = Math.hypot(dx, dy) || 1;
        line.setAttribute("x1", `${CX + (dx / len) * RING}`);
        line.setAttribute("y1", `${CY + (dy / len) * RING}`);
        line.setAttribute("x2", `${now_x[k]}`);
        line.setAttribute("y2", `${now_y[k]}`);
        line.setAttribute("stroke-dashoffset", k === index ? "0" : `${-((t / 90) % 8)}`);
      });

      /* ---- L'anneau tourne, l'onde part à chaque changement d'outil ---- */
      if (ring.current) ring.current.setAttribute("stroke-dashoffset", `${(t / 160) % 14}`);
      if (wave.current) {
        const p = clamp((t - waveAt) / WAVE_MS, 0, 1);
        wave.current.setAttribute("r", `${RING + (WAVE_TO - RING) * (1 - Math.pow(1 - p, 3))}`);
        wave.current.setAttribute("opacity", `${(0.22 * Math.pow(1 - p, 2)).toFixed(3)}`);
      }

      /* ---- Le point qui circule sur le rayon actif ---- */
      if (dot.current) {
        const frac = (t % STEP_MS) / STEP_MS;
        const dx = now_x[index] - CX;
        const dy = now_y[index] - CY;
        const len = Math.hypot(dx, dy) || 1;
        const edge = { x: CX + (dx / len) * RING, y: CY + (dy / len) * RING };
        const far = { x: now_x[index], y: now_y[index] };
        /* Vers l'agent pour la lecture, vers l'outil sinon. */
        const [from, to] = TOOLS[index].mode === "read" ? [far, edge] : [edge, far];
        const p = ease(clamp(frac / TRAVEL, 0, 1));
        dot.current.setAttribute("cx", `${from.x + (to.x - from.x) * p}`);
        dot.current.setAttribute("cy", `${from.y + (to.y - from.y) * p}`);
        dot.current.setAttribute("opacity", `${frac < FADE_FROM ? 1 : clamp(1 - (frac - FADE_FROM) / (1 - FADE_FROM), 0, 1)}`);
      }

      /* ---- Le robot : flottement, inclinaison, regard, clignement ---- */
      const sway = Math.sin(t / 900);
      if (bot.current) bot.current.style.transform = `translateY(${(sway * 3).toFixed(2)}px)`;
      if (floor.current) floor.current.style.width = `${(64 - sway * 6).toFixed(1)}px`;

      const tiltTarget = clamp(((now_x[index] - CX) / 200) * 5, -5, 5);
      rot += (tiltTarget - rot) * 0.03;
      if (head.current) head.current.style.transform = `rotate(${rot.toFixed(3)}deg)`;

      const dx = now_x[index] - CX;
      const dy = now_y[index] - CY;
      const len = Math.hypot(dx, dy) || 1;
      eye.x += ((dx / len) * 4.5 - eye.x) * 0.08;
      eye.y += ((dy / len) * 3.5 - eye.y) * 0.08;
      if (eyes.current) eyes.current.style.transform = `translate(${eye.x.toFixed(2)}px, ${eye.y.toFixed(2)}px)`;

      const lid = (t + BLINK_OFFSET) % BLINK_EVERY < BLINK_MS ? "scaleY(.15)" : "scaleY(1)";
      if (eyeL.current) eyeL.current.style.transform = lid;
      if (eyeR.current) eyeR.current.style.transform = lid;

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    /* L'horloge ne tourne que lorsque la section est à l'écran. */
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); ro.disconnect(); stop(); };
  }, []);

  return (
    <div className="ant" ref={root}>
      <div className="ant-scroll">
        <div className="ant-scene" ref={scene} role="img" aria-label={c.alt}>
          {/* ---- Les traits : l'anneau, l'onde, les rayons, le point ---- */}
          <svg className="ant-wires" viewBox={`0 0 ${W} ${H}`} aria-hidden>
            <circle className="ant-ring" cx={CX} cy={CY} r={RING} strokeDasharray="2 5" />
            {!still && <circle className="ant-wave" cx={CX} cy={CY} r={RING} opacity={0} />}
            {TOOLS.map((tool, i) => {
              const on = still ? i === 0 : i === active;
              return (
                <line
                  key={tool.code}
                  ref={node => { rays.current[i] = node; }}
                  className={on ? `ant-ray is-on ant-ray--${tool.mode}` : "ant-ray"}
                  x1={CX}
                  y1={CY - RING}
                  x2={tool.x}
                  y2={tool.y}
                  strokeDasharray={on ? undefined : "2 6"}
                />
              );
            })}
            {!still && <circle className="ant-dot" ref={dot} r={3.5} cx={CX} cy={CY} opacity={0} />}
          </svg>

          {/* ---- Les huit outils ---- */}
          {TOOLS.map((tool, i) => {
            const on = still ? i === 0 : i === active;
            return (
              <div
                key={tool.code}
                ref={node => { labels.current[i] = node; }}
                className={`ant-tool${on ? ` is-on ant-tool--${tool.mode}` : ""}`}
                style={{ left: pc(tool.x, W), top: pc(tool.y, H) }}
              >
                <span className="ant-code">{tool.code}</span>
                <span className="ant-meta">
                  <strong>{c.names[i]}</strong>
                  <em><i aria-hidden />{on ? c.states[tool.mode] : c.idle}</em>
                </span>
              </div>
            );
          })}

          {/* ---- L'agent, au centre ---- */}
          <div className="ant-bot" aria-hidden>
            <div className="ant-bot-in" ref={bot}>
              <span className="ant-antenna"><i className="ant-ball" /><i className="ant-stem" /></span>
              <div className="ant-head" ref={head}>
                <span className="ant-ear ant-ear--l" />
                <span className="ant-ear ant-ear--r" />
                <div className="ant-face">
                  <span className="ant-eyes" ref={eyes}>
                    <span className="ant-eye" ref={eyeL} />
                    <span className="ant-eye" ref={eyeR} />
                  </span>
                  <span className="ant-mouth" />
                </div>
              </div>
              <span className="ant-floor" ref={floor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
