"use client";

import { useEffect, useRef, useState } from "react";
import { Database, GitMerge, ShieldCheck, UserCheck } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * « Résultats recherchés » : la liste à gauche, l'aperçu à droite.
 *
 * Chaque résultat porte un mini-visuel qui le montre plutôt que de le
 * répéter : des maillons qui se relient, des contrôles qui se cochent, des
 * barres qui bougent, un partage automatisé/humain. Ils tournent sur un
 * cycle de quatre temps, commun aux quatre.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. Le résultat 0 est actif au premier rendu, côté serveur comme côté
 *    client. Le tirer au montage provoquerait une différence d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE le défilement ET les mini-visuels, il
 *    ne les ralentit pas. Le résultat 01 reste actif, son visuel figé sur
 *    son dernier temps, et le survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 */

const STEP_MS = 3200;
const TICK_MS = 700;
const TICKS = 4;

const ICONS = [GitMerge, ShieldCheck, Database, UserCheck];

const ITEMS = {
  fr: [
    { label: "Orchestration", title: "Continuité des processus", text: "Réduisez les ruptures entre vos outils, vos équipes et les différentes étapes de vos processus métier grâce à une meilleure orchestration des systèmes." },
    { label: "Règles métier", title: "Fiabilité opérationnelle", text: "Intégrez vos règles métier, contrôles et validations directement dans votre système IA afin de fiabiliser l’exécution de vos processus." },
    { label: "Pilotage", title: "Exploitation des données", text: "Centralisez, contextualisez et rendez vos données exploitables au bon moment pour faciliter le pilotage et la prise de décision." },
    { label: "Validation humaine", title: "Capacité opérationnelle augmentée", text: "Automatisez certaines étapes de vos processus métier tout en conservant un contrôle humain sur les décisions importantes et les situations complexes." },
  ],
  en: [
    { label: "Orchestration", title: "Process continuity", text: "Reduce the breaks between your tools, your teams and the successive steps of a business process through better orchestration of your systems." },
    { label: "Business rules", title: "Operational reliability", text: "Build your business rules, checks and approvals into your AI system itself, so that your processes run reliably." },
    { label: "Oversight", title: "Data you can use", text: "Centralise and contextualise your data, and make it usable at the right moment to support oversight and decision-making." },
    { label: "Human approval", title: "Extended operational capacity", text: "Automate selected steps of your business processes while keeping human control over the decisions that matter and the situations that are complex." },
  ],
} as const;

type VisualWords = {
  chain: readonly string[];
  rules: readonly string[];
  split: readonly string[];
  splitFoot: readonly string[];
};

const VISUAL_WORDS: Record<"fr" | "en", VisualWords> = {
  fr: {
    chain: ["Outil", "Équipe", "Étape"],
    rules: ["Règle métier", "Contrôle", "Validation"],
    split: ["Automatisé", "Humain"],
    splitFoot: ["étapes répétitives", "décisions"],
  },
  en: {
    chain: ["Tool", "Team", "Step"],
    rules: ["Business rule", "Check", "Approval"],
    split: ["Automated", "Human"],
    splitFoot: ["repetitive steps", "decisions"],
  },
} as const;

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Les quatre mini-visuels. `tick` vaut 0 à 3 et pilote leur progression. */
function Visual({ kind, tick, words }: { kind: number; tick: number; words: VisualWords }) {
  if (kind === 0) {
    return (
      <div className="isp-chain">
        {words.chain.map((w, i) => (
          <span key={w} className="isp-chain-part">
            {i > 0 && <i className={tick >= i ? "isp-chain-link is-on" : "isp-chain-link"} aria-hidden />}
            <b>{w}</b>
          </span>
        ))}
      </div>
    );
  }
  if (kind === 1) {
    return (
      <div className="isp-rules">
        {words.rules.map((w, i) => (
          <span key={w} className={tick > i ? "isp-rule is-on" : "isp-rule"}>
            <i aria-hidden><Tick /></i>
            {w}
          </span>
        ))}
      </div>
    );
  }
  if (kind === 2) {
    const a = [40, 62, 50, 80, 58];
    const b = [52, 44, 70, 60, 86];
    const h = tick % 2 === 0 ? a : b;
    return (
      <div className="isp-bars" aria-hidden>
        {h.map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}
      </div>
    );
  }
  return (
    <div className="isp-split" aria-hidden>
      <div className="isp-split-bar">
        <span className="isp-split-auto">{words.split[0]}</span>
        <span className="isp-split-human">{words.split[1]}</span>
      </div>
      <div className="isp-split-foot">
        <em>{words.splitFoot[0]}</em>
        <em>{words.splitFoot[1]}</em>
      </div>
    </div>
  );
}

export function ImpactSplit({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const items = ITEMS[fr ? "fr" : "en"];
  const words = VISUAL_WORDS[fr ? "fr" : "en"];

  const [auto, setAuto] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const [tick, setTick] = useState(TICKS - 1);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const active = held ?? auto;

  /* Le défilement d'un résultat à l'autre. */
  useEffect(() => {
    if (held !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAuto((n) => (n + 1) % items.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [held, items.length]);

  /* Le cycle interne des mini-visuels, indépendant du précédent : un visuel
     continue de tourner pendant qu'on survole son résultat. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % TICKS), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + items.length) % items.length;
    setHeld(next);
    rows.current[next]?.focus();
  };

  const item = items[active];

  return (
    <div className="isp">
      <div className="isp-list">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <button
              key={it.title}
              type="button"
              ref={(el) => { rows.current[i] = el; }}
              className={i === active ? "isp-row is-on" : "isp-row"}
              aria-pressed={i === active}
              onMouseEnter={() => setHeld(i)}
              onFocus={() => setHeld(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="isp-row-mark" aria-hidden />
              <span className="isp-row-icon"><Icon aria-hidden /></span>
              <span className="isp-row-copy">
                <em>{it.label}</em>
                <strong>{it.title}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <div className="isp-view" aria-live="polite">
        <div className="isp-stage">
          <Visual kind={active} tick={tick} words={words} />
        </div>
        <div>
          <span className="isp-view-label">{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </div>
    </div>
  );
}
