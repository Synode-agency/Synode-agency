"use client";

import { useEffect, useRef, useState } from "react";
import { Archive, Bell, Cpu, Database, FileText, Send, Sparkles, User } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * LE VISUEL DE LA COLONNE DE DROITE DE « QU'EST-CE QU'UNE AUTOMATISATION ? ».
 *
 * Un flux à nœuds : un document arrive, l'analyse IA le lit, puis le flux
 * transmet, archive, met à jour et notifie. Une exécution sur trois tombe
 * sur un cas ambigu : rien ne part, tout s'arrête au contrôle humain.
 *
 * ── Ce que ce bloc raconte, et qu'il faut garder ────────────────────────
 * Le cas ambigu n'est pas une décoration. C'est l'argument de la section :
 * un flux automatisé ne devine pas, il sort du chemin et appelle une
 * personne. Si on retire cette exécution sur trois, le bloc ne dit plus
 * qu'une chose, et la fausse.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Le piège de géométrie, à ne pas défaire ─────────────────────────────
 * Les liaisons sont tracées dans un SVG en `viewBox="0 0 640 370"` et les
 * nœuds sont posés en POURCENTAGE du même repère. Les deux ne se
 * superposent que parce que la scène porte `aspect-ratio: 640 / 370`. Sans
 * ce rapport, le SVG se centrerait dans sa boîte avec des bandes vides et
 * les liaisons arriveraient à côté des nœuds.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. UNE SEULE horloge, en `requestAnimationFrame`. Les points qui
 *    circulent et l'atténuation de fin de boucle sont écrits DIRECTEMENT
 *    dans le DOM par des refs ; React ne rend que les changements d'état,
 *    une quinzaine par boucle, jamais soixante fois par seconde.
 * 2. L'état de départ est le même côté serveur et côté client : tout au
 *    repos. Le tirer au montage provoquerait une différence d'hydratation.
 * 3. `prefers-reduced-motion` n'arme aucune horloge et montre une exécution
 *    normale terminée, contrôle humain au repos.
 * ────────────────────────────────────────────────────────────────────────
 */

/* ---- Le repère de la scène. Les positions sont dans ce système. ---- */
const W = 640;
const H = 370;

/* ---- La chronologie, en millisecondes. ---- */
const LOOP = 6400;
const FADE_FROM = 6000;
/** Une exécution sur trois tombe sur le cas ambigu. */
const AMBIGUOUS_EVERY = 3;

type NodeState = "rest" | "run" | "done" | "alert";
type EdgeState = "rest" | "run" | "done";

type Node = {
  cx: number; cy: number; w: number; h: number;
  icon: typeof FileText;
  /** `trigger` arrondit le bord gauche, `round` fait un rond, `wide` écrit
   *  son nom DANS la boîte au lieu de dessous. */
  shape?: "trigger" | "round" | "wide";
  ai?: true;
};

const NODES: Node[] = [
  { cx: 56, cy: 150, w: 56, h: 56, icon: FileText, shape: "trigger" },
  { cx: 210, cy: 150, w: 150, h: 56, icon: Sparkles, shape: "wide", ai: true },
  { cx: 360, cy: 45, w: 56, h: 56, icon: Archive },
  { cx: 360, cy: 150, w: 56, h: 56, icon: Send },
  { cx: 465, cy: 150, w: 56, h: 56, icon: Database },
  { cx: 572, cy: 150, w: 56, h: 56, icon: Bell },
  { cx: 360, cy: 300, w: 56, h: 56, icon: User },
  { cx: 210, cy: 312, w: 44, h: 44, icon: Cpu, shape: "round", ai: true },
];

/** Les liaisons, dans l'ordre e1, e2, e6, e3, e4, e5. `label` marque celles
 *  qui affichent « 1 élément » une fois parcourues. */
const EDGES: { from: [number, number]; to: [number, number]; label?: true; warm?: true }[] = [
  { from: [84, 150], to: [135, 150], label: true },
  { from: [285, 138], to: [332, 150] },
  { from: [285, 138], to: [332, 45], label: true },
  { from: [388, 150], to: [437, 150], label: true },
  { from: [493, 150], to: [544, 150], label: true },
  { from: [285, 162], to: [332, 300], warm: true },
];

const PORTS: [number, number][] = [
  [84, 150], [135, 150], [285, 138], [285, 162], [332, 150], [388, 150],
  [437, 150], [493, 150], [544, 150], [600, 150], [332, 300], [210, 178],
  [332, 45], [388, 45],
];

const COPY = {
  fr: {
    names: ["Nouveau document", "Analyse IA", "Archiver", "Transmettre", "Mettre à jour", "Notifier", "Contrôle humain", "Modèle IA"],
    metas: ["déclencheur", "", "", "", "", "équipe finance", "", ""],
    item: "1 élément",
    alt: "Un flux automatisé : un document arrive, une analyse IA le lit, puis le flux transmet, archive, met à jour et notifie. Un cas ambigu part en contrôle humain.",
  },
  en: {
    names: ["New document", "AI analysis", "Archive", "Send", "Update", "Notify", "Human approval", "AI model"],
    metas: ["trigger", "", "", "", "", "finance team", "", ""],
    item: "1 item",
    alt: "An automated flow: a document arrives, an AI analysis reads it, then the flow sends, archives, updates and notifies. An ambiguous case goes to human approval.",
  },
} as const;

/** La courbe d'une liaison : horizontale en entrée comme en sortie. */
function curve(from: [number, number], to: [number, number]) {
  const dx = Math.max(30, Math.abs(to[0] - from[0])) * 0.5;
  return { d: `M${from[0]} ${from[1]} C${from[0] + dx} ${from[1]}, ${to[0] - dx} ${to[1]}, ${to[0]} ${to[1]}`, c1: [from[0] + dx, from[1]], c2: [to[0] - dx, to[1]] };
}
/** Le point d'une cubique, pour y poser le point qui circule. */
function onCurve(from: [number, number], to: [number, number], p: number) {
  const dx = Math.max(30, Math.abs(to[0] - from[0])) * 0.5;
  const c1: [number, number] = [from[0] + dx, from[1]];
  const c2: [number, number] = [to[0] - dx, to[1]];
  const q = 1 - p;
  const x = q * q * q * from[0] + 3 * q * q * p * c1[0] + 3 * q * p * p * c2[0] + p * p * p * to[0];
  const y = q * q * q * from[1] + 3 * q * q * p * c1[1] + 3 * q * p * p * c2[1] + p * p * p * to[1];
  return { x, y };
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
/** Ralenti au début et à la fin. */
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
const pc = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

/** Les fenêtres de chaque nœud et de chaque liaison, pour les deux issues.
 *  Tout le minutage du bloc est ici, et nulle part ailleurs. */
const RUN = {
  normal: {
    nodes: [[0, 500], [900, 1900], [2400, 2900], [2400, 2900], [3300, 3800], [4200, 4700], null, null] as ([number, number] | null)[],
    edges: [[500, 900], [1900, 2400], [1900, 2400], [2900, 3300], [3800, 4200], null] as ([number, number] | null)[],
  },
  ambiguous: {
    nodes: [[0, 500], [900, 1900], null, null, null, null, [2500, 3200], null] as ([number, number] | null)[],
    edges: [[500, 900], null, null, null, null, [1900, 2500]] as ([number, number] | null)[],
  },
};

function statesAt(t: number, ambiguous: boolean) {
  const plan = ambiguous ? RUN.ambiguous : RUN.normal;
  const nodes: NodeState[] = plan.nodes.map((win, i) => {
    if (!win) return "rest";
    if (t < win[0]) return "rest";
    if (t < win[1]) return "run";
    /* Le contrôle humain ne « réussit » pas : il alerte. */
    return ambiguous && i === 6 ? "alert" : "done";
  });
  /* Le modèle IA s'allume avec l'analyse et le reste jusqu'à la fin. */
  const ai = t >= 900;
  if (ai) nodes[7] = "run";
  const edges: EdgeState[] = plan.edges.map(win => {
    if (!win) return "rest";
    if (t < win[0]) return "rest";
    if (t < win[1]) return "run";
    return "done";
  });
  return { nodes, edges, ai };
}

export function AutomationGraph({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [view, setView] = useState(() => statesAt(0, false));
  const [still, setStill] = useState(false);

  const root = useRef<HTMLDivElement | null>(null);
  const scene = useRef<HTMLDivElement | null>(null);
  const dots = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* Une exécution normale terminée, contrôle humain au repos. */
      queueMicrotask(() => { setStill(true); setView(statesAt(FADE_FROM - 1, false)); });
      return;
    }

    let raf = 0;
    let t0 = 0;
    let key = "";
    let running = false;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const total = now - t0;
      const t = total % LOOP;
      const ambiguous = Math.floor(total / LOOP) % AMBIGUOUS_EVERY === AMBIGUOUS_EVERY - 1;

      /* ---- Ce qui ne change qu'à l'étape : passe par React ---- */
      const next = statesAt(t, ambiguous);
      const k = next.nodes.join("") + "|" + next.edges.join("") + "|" + next.ai;
      if (k !== key) { key = k; setView(next); }

      /* ---- Les points qui circulent, écrits dans le DOM ---- */
      const plan = ambiguous ? RUN.ambiguous : RUN.normal;
      let slot = 0;
      plan.edges.forEach((win, i) => {
        if (!win || t < win[0] || t >= win[1] || slot > 1) return;
        const p = ease(clamp((t - win[0]) / (win[1] - win[0]), 0, 1));
        const { x, y } = onCurve(EDGES[i].from, EDGES[i].to, p);
        const g = dots.current[slot];
        if (g) {
          g.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
          g.setAttribute("opacity", "1");
        }
        slot += 1;
      });
      for (let i = slot; i < 2; i += 1) dots.current[i]?.setAttribute("opacity", "0");

      /* ---- La fin de boucle s'efface ---- */
      if (scene.current) {
        scene.current.style.opacity = t >= FADE_FROM ? `${(1 - (t - FADE_FROM) / (LOOP - FADE_FROM)).toFixed(3)}` : "1";
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

  return (
    <div className="aug" ref={root}>
        <div className="aug-scene" ref={scene} role="img" aria-label={c.alt}>
          <svg className="aug-wires" viewBox={`0 0 ${W} ${H}`} aria-hidden>
            {/* ---- La laisse du modèle IA ---- */}
            <line className={view.ai ? "aug-dash is-on" : "aug-dash"} x1={210} y1={178} x2={210} y2={288} strokeDasharray="4 4" />

            {/* ---- Les liaisons ---- */}
            {EDGES.map((edge, i) => (
              <path
                key={i}
                className={`aug-edge is-${view.edges[i]}${edge.warm ? " aug-edge--warm" : ""}`}
                d={curve(edge.from, edge.to).d}
              />
            ))}

            {/* ---- Les ports ---- */}
            {PORTS.map(([x, y]) => <circle key={`${x}-${y}`} className="aug-port" cx={x} cy={y} r={4} />)}

            {/* ---- Les étiquettes, une fois la liaison parcourue ---- */}
            {EDGES.map((edge, i) => {
              if (!edge.label || view.edges[i] !== "done") return null;
              const mid = onCurve(edge.from, edge.to, 0.5);
              return (
                <text key={`l${i}`} className="aug-label" x={mid.x} y={mid.y - 7} textAnchor="middle">
                  {c.item}
                </text>
              );
            })}

            {/* ---- Les deux points qui circulent ---- */}
            {!still && [0, 1].map(i => (
              <g key={i} ref={node => { dots.current[i] = node; }} opacity={0}>
                <circle className="aug-dot-halo" r={9} />
                <circle className="aug-dot" r={4} />
              </g>
            ))}
          </svg>

          {/* ---- L'éclair du déclencheur ---- */}
          <span className="aug-bolt" style={{ left: pc(14, W), top: pc(150, H) }} aria-hidden>
            <svg viewBox="0 0 12 14"><path d="M7.5 0 1 8h3.5L4 14 11 6H7z" /></svg>
          </span>

          {/* ---- Les nœuds ---- */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const state = view.nodes[i];
            return (
              <div
                key={c.names[i]}
                className={[
                  "aug-node",
                  `is-${state}`,
                  node.shape ? `aug-node--${node.shape}` : "",
                  node.ai ? "aug-node--ai" : "",
                ].filter(Boolean).join(" ")}
                style={{
                  left: pc(node.cx - node.w / 2, W),
                  top: pc(node.cy - node.h / 2, H),
                  width: pc(node.w, W),
                  height: pc(node.h, H),
                }}
              >
                <Icon aria-hidden />
                {node.shape === "wide" && <b>{c.names[i]}</b>}
                {node.shape !== "wide" && (
                  <span className="aug-name">
                    {c.names[i]}
                    {c.metas[i] && <em>{c.metas[i]}</em>}
                  </span>
                )}
                {state === "done" && (
                  <span className="aug-badge aug-badge--ok" aria-hidden>
                    <svg viewBox="0 0 12 12"><path d="M2.5 6.3 5 8.8l4.5-5" /></svg>
                  </span>
                )}
                {state === "alert" && (
                  <span className="aug-badge aug-badge--warn" aria-hidden>
                    <svg viewBox="0 0 12 12">
                      <path d="M6 1 11.2 10.6H.8z" fill="#f5b454" stroke="none" />
                      <path d="M6 4.4v2.7" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="6" cy="8.9" r="0.75" fill="#ffffff" stroke="none" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
    </div>
  );
}
