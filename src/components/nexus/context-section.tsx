"use client";

import { useEffect, useRef, useState } from "react";
import { renderLines } from "@/lib/lines";
import { Badge, CheckList, Section, ShieldNote, StepReader, Sub, Title } from "./section-parts";
import { DiscoveryWindow, LeadsWindow, OverviewWindow } from "./windows";
import type { WindowsContent } from "./windows-content";
import styles from "./context-visual.module.css";

/**
 * LA SECTION « CONTEXTE » : le texte à gauche, trois écrans à droite.
 *
 * ⚠ UNE SEULE horloge pour toute la section, celle-ci. Elle pilote le
 * lecteur d'étapes, la liste cochée et les trois fenêtres : ce qui change
 * par étapes passe par React, ce qui change à chaque image est écrit
 * directement dans le DOM par des refs.
 *
 * Tout le contenu arrive en props : la page d'un autre projet réutilise ce
 * composant tel quel avec ses propres textes et ses propres écrans.
 */

const STEP_MS = 2600;
const CHECK_MS = 2200;
/** Le cycle d'analyse d'une entreprise, dans la fenêtre Leads. */
const LEAD_MS = 3200;
const TYPE_NAME = 700;
const TYPE_SYNTH_TO = 2200;
const TAG_FROM = 2300;
const TAG_STEP = 200;
/** Le cycle de la file, dans la fenêtre Discovery. */
const DISCO_MS = 9000;
const RUN_FROM = 600;
const RUN_TO = 7000;
const SECTOR_MS = 1500;
const SPLIT_MS = 1300;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from), 0, 1);

export type ContextContent = {
  /** Optionnelle : la page Nexus n'en affiche pas. */
  badge?: string;
  title: { before: string; accent: string; after?: string };
  lead: string;
  tailBefore: string;
  tailStrong: string;
  tailAfter: string;
  stepsTitle: string;
  steps: readonly { name: string; text: string }[];
  doesTitle: string;
  does: readonly string[];
  aiTitle: string;
  aiText: string;
  aiNote: string;
};

export function ContextSection({ c, w }: { c: ContextContent; w: WindowsContent }) {
  const root = useRef<HTMLElement | null>(null);
  const [still, setStill] = useState(false);

  /* Les états par étapes. */
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [check, setCheck] = useState(0);
  const [lead, setLead] = useState(0);
  const [tags, setTags] = useState(0);
  const [running, setRunning] = useState(false);
  const [sector, setSector] = useState(0);
  const [split, setSplit] = useState(0);

  /* Les valeurs par image. */
  const query = useRef<HTMLSpanElement | null>(null);
  const synth = useRef<HTMLSpanElement | null>(null);
  const caret = useRef<HTMLElement | null>(null);
  const card = useRef<HTMLDivElement | null>(null);
  const bar = useRef<HTMLElement | null>(null);
  const jobs = useRef<HTMLSpanElement | null>(null);
  const pct = useRef<HTMLElement | null>(null);
  const counters = useRef<(HTMLElement | null)[]>([]);
  const button = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    let raf = 0;
    let t0 = 0;
    let on = false;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;

      /* Le lecteur d'étapes et la liste cochée. */
      setStep(prev => {
        const next = Math.floor(t / STEP_MS) % c.steps.length;
        return prev === next ? prev : next;
      });
      setCheck(prev => {
        const next = Math.floor(t / CHECK_MS) % c.does.length;
        return prev === next ? prev : next;
      });

      /* La fenêtre Leads : le nom se tape, la synthèse s'écrit, les
         étiquettes arrivent. */
      const i = Math.floor(t / LEAD_MS) % 4;
      const tc = t % LEAD_MS;
      setLead(prev => (prev === i ? prev : i));
      const nTags = tc < TAG_FROM ? 0 : Math.min(3, Math.floor((tc - TAG_FROM) / TAG_STEP) + 1);
      setTags(prev => (prev === nTags ? prev : nTags));
      if (query.current) {
        const name = w.leads.rows[i].name;
        const next = name.slice(0, Math.round(name.length * span(tc, 0, TYPE_NAME)));
        if (query.current.textContent !== next) query.current.textContent = next;
      }
      if (synth.current) {
        const text = w.leads.synth[i];
        const p = span(tc, TYPE_NAME, TYPE_SYNTH_TO);
        const next = text.slice(0, Math.round(text.length * p));
        if (synth.current.textContent !== next) synth.current.textContent = next;
      }
      if (caret.current) {
        const writing = tc >= TYPE_NAME && tc < TYPE_SYNTH_TO;
        caret.current.style.opacity = writing && Math.floor(t / 420) % 2 === 0 ? "1" : "0";
      }
      /* Les deux cartes blanches flottent doucement. */
      if (card.current) card.current.style.transform = `translateY(${(4 * Math.sin((t / 9000) * Math.PI * 2)).toFixed(2)}px)`;

      /* La fenêtre Discovery : la file avance pendant le traitement. */
      const td = t % DISCO_MS;
      const isRun = td >= RUN_FROM && td < RUN_TO;
      setRunning(prev => (prev === isRun ? prev : isRun));
      const progress = span(td, RUN_FROM, RUN_TO);
      const done = 107 + Math.round(24 * progress);
      if (jobs.current) {
        const next = w.discovery.jobs.replace("{n}", String(done));
        if (jobs.current.textContent !== next) jobs.current.textContent = next;
      }
      const ratio = (done / 570) * 100;
      if (pct.current) {
        const next = `${ratio.toFixed(0)} %`;
        if (pct.current.textContent !== next) pct.current.textContent = next;
      }
      if (bar.current) bar.current.style.width = `${ratio.toFixed(2)}%`;
      const values = [String(570 - done - (isRun ? 3 : 0)), isRun ? "3" : "0", String(done), "0"];
      counters.current.forEach((node, k) => {
        if (node && node.textContent !== values[k]) node.textContent = values[k];
      });
      if (button.current) {
        const pulse = td < RUN_FROM ? 3 + 4 * Math.abs(Math.sin((td / 600) * Math.PI)) : 0;
        button.current.style.boxShadow = pulse ? `0 0 0 ${pulse.toFixed(1)}px rgb(47 107 255 / 22%)` : "none";
      }
      setSector(prev => {
        const next = Math.floor(t / SECTOR_MS) % w.discovery.sectors.length;
        return prev === next ? prev : next;
      });
      setSplit(prev => {
        const next = Math.floor(t / SPLIT_MS) % w.overview.splits.length;
        return prev === next ? prev : next;
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (on) return; on = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!on) return; on = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.1 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [c, w]);

  /* Sous `prefers-reduced-motion`, l'état final : dernière étape, dernière
     ligne cochée, écrans complets. */
  const sStep = still ? c.steps.length - 1 : hover ?? step;
  const sCheck = still ? c.does.length - 1 : check;

  return (
    <Section
      tone="white"
      rootRef={root}
      left={
        <>
          {c.badge && <Badge>{c.badge}</Badge>}
          <Title before={c.title.before} accent={c.title.accent} after={c.title.after} />
          <p>{c.lead}</p>
          <p>{c.tailBefore}<strong>{c.tailStrong}</strong>{c.tailAfter}</p>

          <Sub>{renderLines(c.stepsTitle)}</Sub>
          <StepReader steps={c.steps} active={sStep} onHover={setHover} />

          <Sub>{renderLines(c.doesTitle)}</Sub>
          <CheckList items={c.does} active={still ? c.does.length : sCheck} />

          <Sub>{renderLines(c.aiTitle)}</Sub>
          <p>{c.aiText}</p>
          <ShieldNote>{c.aiNote}</ShieldNote>
        </>
      }
      right={
        <div className={styles.stack}>
          <LeadsWindow
            className={styles.one}
            chrome={{ brand: { kind: "nexus", word: w.brandWord }, by: w.by, menus: w.menus, badge: w.badge, crumbTemplate: w.crumbTemplate }}
            active={2}
            w={w.leads}
            lead={still ? 0 : lead}
            tags={still ? 3 : tags}
            query={query}
            synth={synth}
            caret={caret}
            card={card}
          />
          <DiscoveryWindow
            className={styles.two}
            chrome={{ brand: { kind: "nexus", word: w.brandWord }, by: w.by, menus: w.menus, badge: w.badge, crumbTemplate: w.crumbTemplate }}
            active={1}
            w={w.discovery}
            running={still ? true : running}
            lit={still ? 0 : sector}
            jobs={jobs}
            pct={pct}
            bar={bar}
            counters={counters}
            button={button}
          />
          <OverviewWindow
            className={styles.three}
            chrome={{ brand: { kind: "nexus", word: w.brandWord }, by: w.by, menus: w.menus, badge: w.badge, crumbTemplate: w.crumbTemplate }}
            active={0}
            w={w.overview}
            jobs={still || running ? 3 : 0}
            lit={still ? 0 : split}
          />
        </div>
      }
    />
  );
}
