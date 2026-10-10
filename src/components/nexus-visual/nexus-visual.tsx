"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Target } from "lucide-react";
import type { Locale } from "@/lib/content";
import styles from "./nexus-visual.module.css";

/**
 * LE VISUEL DE LA CARTE « NEXUS — LOGICIEL DE PROSPECTION ».
 *
 * Il remplace la capture d'écran, aux deux endroits où cette carte existe :
 * la section Réalisations de l'accueil et la page Réalisations. Un seul
 * composant pour les deux, aucune variante.
 *
 * ── Le piège, à ne pas défaire ──────────────────────────────────────────
 * La scène est dessinée sur une base FIXE de 800 × 500px. Rien n'y est en
 * pourcentage : tout est posé au pixel sur cette base. L'adaptation ne passe
 * donc pas par une mise en page qui se replie, mais par une MISE À
 * L'ÉCHELLE : la scène garde ses 800px et porte un
 * `transform: scale(largeur réelle / 800)`. La composition rétrécit d'un
 * bloc, comme une image. C'est ce qui garantit qu'à 375px rien n'est coupé,
 * rien ne se réorganise et aucun libellé ne passe sur deux lignes.
 *
 * La largeur est mesurée par un `ResizeObserver` sur l'enveloppe, et non lue
 * sur la fenêtre : la carte vit dans une colonne dont la largeur ne suit pas
 * celle de l'écran. La hauteur est mesurée aussi : la zone image de la carte
 * n'a pas le même rapport sur les deux pages, et la scène se centre alors
 * verticalement, le fond à points remplissant le surplus.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Ce que ce bloc n'est pas ────────────────────────────────────────────
 * « Atelier Brun », « Dumont SRL », « Lumen SA », « Verhaegen & Fils »,
 * « Nova Logistique », les scores et les compteurs sont ILLUSTRATIFS. Ce ne
 * sont ni des clients, ni des résultats mesurés, et ils ne doivent jamais
 * être repris ailleurs comme tels.
 * ────────────────────────────────────────────────────────────────────────
 */

const W = 800;
const H = 500;
const LOOP = 11000;

/** Les instants de la boucle, en millisecondes. */
const AT = {
  typeFrom: 300,
  typeTo: 1900,
  countFrom: 1900,
  countTo: 2800,
  rowsFrom: 2000,
  rowStep: 220,
  rowMs: 420,
  gaugeFrom: 2600,
  gaugeStep: 260,
  gaugeMs: 900,
  statusFrom: 3700,
  statusStep: 260,
  statusMs: 300,
  kpiFrom: 3700,
  kpiTo: 5000,
  open: 5200,
  openMs: 500,
  reasonFrom: 5800,
  reasonStep: 300,
  reasonMs: 350,
  msgFrom: 7000,
  msgTo: 9600,
  fadeFrom: 10500,
} as const;

const COUNT_TO = 128;
const KPI_FROM = 124;
const KPI_TO = 155;

type Tone = "ok" | "wait" | "off";

const ROWS: { initials: string; colour: string; score: number; tone: Tone }[] = [
  { initials: "AB", colour: "#0B6BE6", score: 92, tone: "ok" },
  { initials: "DS", colour: "#7B5CF0", score: 84, tone: "ok" },
  { initials: "LS", colour: "#E0567A", score: 61, tone: "wait" },
  { initials: "VF", colour: "#E09A2D", score: 74, tone: "ok" },
  { initials: "NL", colour: "#2DB37A", score: 28, tone: "off" },
];

/** Le fil du score : vert au-dessus de 70, bleu au-dessus de 50, gris sinon. */
const gaugeColour = (score: number) => (score > 70 ? "#34D399" : score > 50 ? "#4E8FF0" : "#5E6E8A");

const COPY = {
  fr: {
    label: "Nexus, logiciel de prospection B2B : une recherche sectorielle, cinq entreprises notées par l’IA, et la fiche d’une entreprise avec son premier message préparé. Données de démonstration.",
    product: "Prospection B2B",
    query: "Menuiserie, construction · Wallonie · 20–200 employés",
    companies: (n: number) => `${n} entreprises`,
    heads: ["Entreprise", "Taille", "Score IA", "Statut"],
    names: ["Atelier Brun", "Dumont SRL", "Lumen SA", "Verhaegen & Fils", "Nova Logistique"],
    sectors: ["Menuiserie", "Construction", "Rénovation", "Charpente", "Transport"],
    sizes: ["48 empl.", "120 empl.", "35 empl.", "22 empl.", "160 empl."],
    tones: { ok: "Qualifié", wait: "À analyser", off: "Non pertinent" },
    sheetMeta: "Menuiserie · 48 empl. · Namur",
    sheetScore: "score 92",
    why: "Pourquoi cette entreprise",
    reasons: ["Secteur et taille correspondent", "Site web actif, croissance récente", "Besoin probable : devis et relances"],
    draft: "Premier message préparé",
    writing: "rédaction…",
    ready: "✓ prêt à envoyer",
    message: "Bonjour, nous aidons les menuiseries à automatiser leurs devis et relances. Un échange de 20 minutes ?",
    kpi: "Leads qualifiés cette semaine",
  },
  en: {
    label: "Nexus, B2B prospecting software: a sector search, five companies scored by AI, and one company sheet with its first message drafted. Demonstration data.",
    product: "B2B prospecting",
    query: "Joinery, construction · Wallonia · 20–200 employees",
    companies: (n: number) => `${n} companies`,
    heads: ["Company", "Size", "AI score", "Status"],
    names: ["Atelier Brun", "Dumont SRL", "Lumen SA", "Verhaegen & Fils", "Nova Logistique"],
    sectors: ["Joinery", "Construction", "Renovation", "Roof framing", "Transport"],
    sizes: ["48 staff", "120 staff", "35 staff", "22 staff", "160 staff"],
    tones: { ok: "Qualified", wait: "To review", off: "Not relevant" },
    sheetMeta: "Joinery · 48 staff · Namur",
    sheetScore: "score 92",
    why: "Why this company",
    reasons: ["Sector and size match", "Active website, recent growth", "Likely need: quotes and chasing"],
    draft: "First message drafted",
    writing: "drafting…",
    ready: "✓ ready to send",
    message: "Hello, we help joinery businesses automate their quotes and payment chasing. Would twenty minutes suit you?",
    kpi: "Qualified leads this week",
  },
} as const;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from), 0, 1);
/** Ralenti en fin de course. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function NexusVisual({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const box = useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = useState({ k: 1, top: 0 });
  const [still, setStill] = useState(false);
  /* Deux états discrets seulement passent par React : la fiche qui s'ouvre et
     le message qui est prêt. Tout le reste est écrit dans le DOM. */
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const query = useRef<HTMLSpanElement | null>(null);
  const queryCaret = useRef<HTMLSpanElement | null>(null);
  const count = useRef<HTMLSpanElement | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const gauges = useRef<(HTMLSpanElement | null)[]>([]);
  const scores = useRef<(HTMLSpanElement | null)[]>([]);
  const states = useRef<(HTMLSpanElement | null)[]>([]);
  const sheet = useRef<HTMLDivElement | null>(null);
  const reasons = useRef<(HTMLLIElement | null)[]>([]);
  const message = useRef<HTMLSpanElement | null>(null);
  const msgCaret = useRef<HTMLSpanElement | null>(null);
  const kpiValue = useRef<HTMLElement | null>(null);
  const kpiDelta = useRef<HTMLSpanElement | null>(null);

  /* ---- La mise à l'échelle, mesurée sur l'enveloppe ---- */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const k = width / W;
      setFit({ k, top: Math.max(0, (height - H * k) / 2) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- L'horloge ---- */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    let raf = 0;
    let t0 = 0;
    let running = false;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = (now - t0) % LOOP;
      const out = 1 - span(t, AT.fadeFrom, LOOP);

      /* La recherche s'écrit, puis le compteur monte. */
      if (query.current) {
        const n = Math.round(c.query.length * span(t, AT.typeFrom, AT.typeTo));
        const next = c.query.slice(0, n);
        if (query.current.textContent !== next) query.current.textContent = next;
      }
      if (queryCaret.current) {
        const typing = t >= AT.typeFrom && t < AT.typeTo;
        queryCaret.current.style.opacity = typing && Math.floor(t / 420) % 2 === 0 ? "1" : "0";
      }
      if (count.current) {
        const next = c.companies(Math.round(COUNT_TO * easeOut(span(t, AT.countFrom, AT.countTo))));
        if (count.current.textContent !== next) count.current.textContent = next;
      }

      /* Les lignes, leurs jauges et leurs statuts. */
      ROWS.forEach((row, i) => {
        const from = AT.rowsFrom + i * AT.rowStep;
        const p = easeOut(span(t, from, from + AT.rowMs));
        const node = rows.current[i];
        if (node) {
          node.style.opacity = (p * out).toFixed(3);
          node.style.transform = `translateY(${(8 * (1 - p)).toFixed(2)}px)`;
        }
        const gaugeAt = AT.gaugeFrom + i * AT.gaugeStep;
        const g = easeOut(span(t, gaugeAt, gaugeAt + AT.gaugeMs));
        const gauge = gauges.current[i];
        if (gauge) gauge.style.width = `${(row.score * g).toFixed(1)}%`;
        const score = scores.current[i];
        if (score) {
          const next = String(Math.round(row.score * g));
          if (score.textContent !== next) score.textContent = next;
        }
        const state = states.current[i];
        if (state) {
          const statusAt = AT.statusFrom + i * AT.statusStep;
          state.style.opacity = span(t, statusAt, statusAt + AT.statusMs).toFixed(3);
        }
      });

      /* Le compteur de la carte KPI. */
      const kpi = KPI_FROM + Math.round((KPI_TO - KPI_FROM) * easeOut(span(t, AT.kpiFrom, AT.kpiTo)));
      if (kpiValue.current && kpiValue.current.textContent !== String(kpi)) kpiValue.current.textContent = String(kpi);
      if (kpiDelta.current) {
        const next = `+${kpi - KPI_FROM}`;
        if (kpiDelta.current.textContent !== next) kpiDelta.current.textContent = next;
      }

      /* La fiche s'ouvre, ses raisons apparaissent, son message s'écrit. */
      const s = easeOut(span(t, AT.open, AT.open + AT.openMs));
      if (sheet.current) {
        sheet.current.style.opacity = (s * out).toFixed(3);
        sheet.current.style.transform = `translateY(${(14 * (1 - s)).toFixed(2)}px) scale(${(0.97 + 0.03 * s).toFixed(4)})`;
      }
      reasons.current.forEach((node, j) => {
        if (!node) return;
        const from = AT.reasonFrom + j * AT.reasonStep;
        const p = easeOut(span(t, from, from + AT.reasonMs));
        node.style.opacity = p.toFixed(3);
        node.style.transform = `translateY(${(6 * (1 - p)).toFixed(2)}px)`;
      });
      if (message.current) {
        const n = Math.round(c.message.length * span(t, AT.msgFrom, AT.msgTo));
        const next = c.message.slice(0, n);
        if (message.current.textContent !== next) message.current.textContent = next;
      }
      if (msgCaret.current) {
        const writing = t >= AT.msgFrom && t < AT.msgTo;
        msgCaret.current.style.opacity = writing && Math.floor(t / 420) % 2 === 0 ? "1" : "0";
      }

      const isOpen = t >= AT.open;
      const isReady = t >= AT.msgTo;
      setOpen(prev => (prev === isOpen ? prev : isOpen));
      setReady(prev => (prev === isReady ? prev : isReady));

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [c]);

  /* Sous `prefers-reduced-motion`, la scène rend son état final : recherche
     complète, cinq lignes notées, fiche ouverte, message rédigé. */
  const shown = still || open;
  const said = still || ready;
  const active = shown ? 2 : 1;

  return (
    <div className={styles.root} ref={box} role="img" aria-label={c.label}>
      <div className={styles.scene} style={{ top: `${fit.top}px`, transform: `scale(${fit.k})` }}>
        {/* ---- La fenêtre de l'application ---- */}
        <div className={styles.win}>
          <div className={styles.bar}>
            <span className={styles.dots} aria-hidden><i /><i /><i /></span>
            <span className={styles.mark} aria-hidden>N</span>
            <strong className={styles.brand}>Nexus</strong>
            <span className={styles.product}>{c.product}</span>
          </div>

          <div className={styles.side} aria-hidden>
            {[0, 1, 2, 3, 4].map(i => (
              <span key={i} className={i === active ? `${styles.tile} ${styles.tileOn}` : styles.tile} />
            ))}
          </div>

          <div className={styles.main}>
            <div className={still ? `${styles.search}` : `${styles.search} ${styles.searchTyping}`}>
              <Search className={styles.searchIcon} aria-hidden />
              <span className={styles.query} ref={query}>{still ? c.query : ""}</span>
              <i className={styles.caret} ref={queryCaret} aria-hidden />
              <span className={styles.count} ref={count}>{c.companies(still ? COUNT_TO : 0)}</span>
            </div>

            <div className={styles.head} aria-hidden>
              {c.heads.map(head => <span key={head}>{head}</span>)}
            </div>

            <div className={styles.rows}>
              {ROWS.map((row, i) => (
                <div
                  key={row.initials}
                  ref={node => { rows.current[i] = node; }}
                  className={i === 0 && shown ? `${styles.row} ${styles.rowOn}` : styles.row}
                  style={still ? undefined : { opacity: 0 }}
                >
                  <span className={styles.who}>
                    <i className={styles.rowMark} style={{ background: row.colour }} aria-hidden>{row.initials}</i>
                    <span className={styles.rowName}>
                      <strong>{c.names[i]}</strong>
                      <em>{c.sectors[i]}</em>
                    </span>
                  </span>
                  <span className={styles.size}>{c.sizes[i]}</span>
                  <span className={styles.score}>
                    <i className={styles.gauge} aria-hidden>
                      <b
                        ref={node => { gauges.current[i] = node; }}
                        style={{ width: still ? `${row.score}%` : 0, background: gaugeColour(row.score) }}
                      />
                    </i>
                    <span ref={node => { scores.current[i] = node; }}>{still ? row.score : 0}</span>
                  </span>
                  <span className={styles.statusCell}>
                    <span
                      ref={node => { states.current[i] = node; }}
                      className={`${styles.pill} ${styles[row.tone]}`}
                      style={still ? undefined : { opacity: 0 }}
                    >
                      {c.tones[row.tone]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- La fiche de l'entreprise ---- */}
        <div className={styles.sheet} ref={sheet} style={still ? undefined : { opacity: 0 }}>
          <div className={styles.sheetHead}>
            <i className={styles.sheetMark} aria-hidden>AB</i>
            <span className={styles.sheetWho}>
              <strong>{c.names[0]}</strong>
              <em>{c.sheetMeta}</em>
            </span>
            <span className={styles.sheetScore}>{c.sheetScore}</span>
          </div>
          <span className={styles.why}>{c.why}</span>
          <ul className={styles.reasons}>
            {c.reasons.map((reason, j) => (
              <li
                key={reason}
                ref={node => { reasons.current[j] = node; }}
                style={still ? undefined : { opacity: 0 }}
              >
                <i aria-hidden>✓</i>
                {reason}
              </li>
            ))}
          </ul>
          <div className={styles.draft}>
            <span className={styles.draftHead}>
              <em>{c.draft}</em>
              <b className={said ? `${styles.draftState} ${styles.draftReady}` : styles.draftState}>
                {said ? c.ready : c.writing}
              </b>
            </span>
            <p className={styles.message}>
              <span ref={message}>{still ? c.message : ""}</span>
              <i className={styles.msgCaret} ref={msgCaret} aria-hidden />
            </p>
          </div>
        </div>

        {/* ---- La carte des leads qualifiés ---- */}
        <div className={styles.kpi}>
          <i className={styles.kpiIcon} aria-hidden><Target /></i>
          <span className={styles.kpiBody}>
            <em>{c.kpi}</em>
            <span className={styles.kpiLine}>
              <strong ref={kpiValue}>{still ? KPI_TO : KPI_FROM}</strong>
              <span className={styles.kpiDelta} ref={kpiDelta}>+{still ? KPI_TO - KPI_FROM : 0}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
