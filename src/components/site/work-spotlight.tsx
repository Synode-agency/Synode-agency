"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { ROUTES, path, type Locale } from "@/lib/content";
import { workItems } from "@/lib/work";

/**
 * LES RÉALISATIONS DE L'ACCUEIL : UN PROJECTEUR À ONGLETS.
 *
 * Deux projets, deux onglets à gauche, une fenêtre d'aperçu à droite. Sous
 * 760px de largeur de composant, les deux projets deviennent des blocs
 * dépliables.
 *
 * ── Ce que ce bloc ne doit pas laisser croire ───────────────────────────
 * Le second projet N'EXISTE PAS ENCORE. Son aperçu est un scénario dessiné,
 * sur des données fictives dites comme telles, et son pied annonce une
 * publication à venir, sans lien. Ne jamais lui donner l'apparence d'un
 * produit en service, ni un lien vers une page qui n'existe pas.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. La bascule mobile se décide sur la LARGEUR DU COMPOSANT, mesurée par
 *    `ResizeObserver`, et non sur celle de la fenêtre : ce bloc vit dans une
 *    colonne dont la largeur ne suit pas celle de l'écran. Le premier rendu
 *    est celui du desktop, côté serveur comme côté client, sinon
 *    l'hydratation diffère.
 * 2. Le défilement automatique s'arrête DÉFINITIVEMENT au premier survol
 *    ou clic. Quelqu'un qui a ouvert un projet pour le lire ne doit pas le
 *    voir disparaître sept secondes plus tard.
 * 3. `prefers-reduced-motion` n'arme aucune horloge : le premier onglet est
 *    actif, sa barre est pleine, et le scénario montre ses quatre étapes
 *    validées.
 * ────────────────────────────────────────────────────────────────────────
 */

/** Un onglet toutes les 7s, la barre de progression se remplit sur la même
 *  durée. Les deux valeurs doivent rester accordées, l'une est ici et
 *  l'autre dans l'animation CSS `wsp-fill`. */
const TAB_MS = 7000;
/** Le scénario avance toutes les 1,1s sur cinq positions : les quatre
 *  étapes, puis un temps où tout est validé. */
const STEP_MS = 1100;
const STEPS = 5;
/** En dessous, les projets deviennent des blocs dépliables. */
const COMPACT_AT = 760;

const COPY = {
  fr: {
    project: "Projet",
    soon: "Publication à venir",
    soonShort: "bientôt",
    fake: "données fictives",
    go: "Découvrir le projet",
    bars: ["nexus · prospection B2B", "démonstrateur · aperçu du scénario"],
    barsCompact: ["nexus · prospection B2B", "démonstrateur · données fictives"],
    prep: "En préparation",
    steps: [
      ["Demande reçue", "un e-mail client arrive"],
      ["Analyse par l’agent", "lecture et recherche des informations"],
      ["Action préparée", "réponse et mise à jour proposées"],
      ["Validation humaine", "rien ne part sans votre accord"],
    ],
    running: "en cours…",
    done: "fait",
    approved: "validé",
  },
  en: {
    project: "Project",
    soon: "Publication to come",
    soonShort: "soon",
    fake: "fictional data",
    go: "Explore the project",
    bars: ["nexus · B2B prospecting", "demonstrator · scenario preview"],
    barsCompact: ["nexus · B2B prospecting", "demonstrator · fictional data"],
    prep: "In preparation",
    steps: [
      ["Request received", "a client email arrives"],
      ["Analysed by the agent", "reading and looking up the details"],
      ["Action prepared", "a reply and an update are proposed"],
      ["Human approval", "nothing goes out without your say"],
    ],
    running: "under way…",
    done: "done",
    approved: "approved",
  },
} as const;

/** Le scénario du second projet. Les quatre temps, et leur état. */
function Scenario({ step, compact, c }: { step: number; compact?: boolean; c: (typeof COPY)["fr"] | (typeof COPY)["en"] }) {
  return (
    <ol className={compact ? "wsp-scen wsp-scen--compact" : "wsp-scen"}>
      {c.steps.map(([name, hint], i) => {
        const state = i < step ? "done" : i === step ? "on" : "next";
        return (
          <li key={name} className={`wsp-step is-${state}`}>
            <span className="wsp-step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="wsp-step-copy">
              <strong>{name}</strong>
              {!compact && <em>{hint}</em>}
            </span>
            <span className="wsp-step-state">
              {state === "on" ? c.running : state === "done" ? (i === 3 ? c.approved : c.done) : ""}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function WorkSpotlight({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const c = COPY[fr ? "fr" : "en"];
  const item = workItems(locale)[0];

  /* Les deux projets. Les textes viennent de `work.ts` pour le premier :
     c'est la fiche du projet, elle n'existe qu'une fois. */
  const projects = [
    {
      status: item?.status ?? "",
      tone: "green" as const,
      title: fr ? "Nexus — Logiciel de prospection" : "Nexus — Prospecting software",
      text: item?.problem ?? "",
      tags: fr ? ["Recherche web", "Analyse IA", "Qualification", "Suivi commercial"] : ["Web research", "AI analysis", "Qualification", "Sales follow-up"],
      href: item ? `${path(locale, ROUTES.work)}/${item.slug}` : undefined,
    },
    {
      status: c.prep,
      tone: "blue" as const,
      title: fr ? "Démonstrateur IA — en préparation" : "AI demonstrator — in preparation",
      text: fr
        ? "De la demande reçue à l’action validée, sur des données fictives identifiées comme telles. Elle sera publiée ici quand elle fonctionnera réellement."
        : "From the incoming request to the approved action, on fictional data labelled as such. It will be published here once it genuinely runs.",
      tags: fr ? ["Agent IA", "Automatisation", "Validation humaine"] : ["AI agent", "Automation", "Human approval"],
      href: undefined,
    },
  ];

  const [active, setActive] = useState(0);
  /* Un compteur de passages. Il ne sert qu'à donner une clé neuve à la barre
     de progression pour relancer son remplissage : `Date.now()` pendant le
     rendu est impur, et la règle de lint du projet le refuse. */
  const [pass, setPass] = useState(0);
  /* Coupé définitivement au premier survol ou clic, et jamais relancé. */
  const [auto, setAuto] = useState(true);
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(false);
  /* Le premier rendu est celui du desktop, des deux côtés. */
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const root = useRef<HTMLDivElement | null>(null);

  /* La largeur du COMPOSANT décide de la bascule, pas celle de la fenêtre. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < COMPACT_AT));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => { setStill(true); setStep(STEPS - 1); });
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* L'alternance des onglets, sur desktop seulement. */
  useEffect(() => {
    if (still || compact || !auto || !visible) return;
    const id = window.setInterval(() => {
      setActive(n => (n + 1) % projects.length);
      setPass(n => n + 1);
    }, TAB_MS);
    return () => window.clearInterval(id);
  }, [still, compact, auto, visible, projects.length]);

  /* Le scénario, qui tourne tant que la section est à l'écran. */
  useEffect(() => {
    if (still || !visible) return;
    const id = window.setInterval(() => setStep(n => (n + 1) % STEPS), STEP_MS);
    return () => window.clearInterval(id);
  }, [still, visible]);

  const hold = (i: number) => { setAuto(false); setActive(i); };
  const running = auto && !still;

  const pill = (p: typeof projects[number], size?: "sm") => (
    <span className={`wsp-pill wsp-pill--${p.tone}${size ? " wsp-pill--sm" : ""}`}>
      <i aria-hidden />{p.status}
    </span>
  );
  const tags = (p: typeof projects[number]) => (
    <ul className="wsp-tags">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
  );
  const shot = (sizes: string) => (
    <Image
      src="/demos/nexus-dashboard-workspace.png"
      alt={fr
        ? "Nexus, logiciel de prospection B2B : le tableau de bord et ses quatre étapes, Discovery, Qualification, Leads et Outreach, sur des données de démonstration."
        : "Nexus, B2B prospecting software: the dashboard and its four stages — Discovery, Qualification, Leads and Outreach — on demonstration data."}
      width={1448}
      height={1086}
      sizes={sizes}
    />
  );

  /* ---------- MOBILE : deux blocs dépliables ---------- */
  if (compact) {
    return (
      <div className="wsp wsp--compact" ref={root}>
        {projects.map((p, i) => {
          const on = open === i;
          return (
            <div key={p.title} className={on ? "wsp-fold is-open" : "wsp-fold"}>
              <h3 className="wsp-fold-head">
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)}>
                  <span className="wsp-fold-top">
                    {pill(p, "sm")}
                    <span className="wsp-chev" aria-hidden><ChevronDown /></span>
                  </span>
                  <strong>{p.title}</strong>
                  <span className="wsp-fold-text">{p.text}</span>
                </button>
              </h3>
              {on && (
                <div className="wsp-fold-body">
                  {tags(p)}
                  <div className="wsp-mini">
                    <span className="wsp-mini-bar"><i /><i /><i />{c.barsCompact[i]}</span>
                    {i === 0 ? <span className="wsp-mini-shot">{shot("92vw")}</span> : <Scenario step={step} compact c={c} />}
                  </div>
                  {p.href
                    ? <Link className="wsp-go" href={p.href}>{c.go}<ArrowUpRight aria-hidden /></Link>
                    : <span className="wsp-soon">{c.soon}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* ---------- DESKTOP : le projecteur ---------- */
  return (
    <div className="wsp" ref={root}>
      <div className="wsp-tabs" role="tablist" aria-label={fr ? "Nos deux projets" : "Our two projects"}>
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "wsp-tab is-on" : "wsp-tab"}
            onMouseEnter={() => hold(i)}
            onFocus={() => hold(i)}
            onClick={() => hold(i)}
          >
            <span className="wsp-bar" aria-hidden>
              {i === active && <i key={running ? `${active}-${pass}` : "held"} className={running ? "is-filling" : undefined} />}
            </span>
            <span className="wsp-tab-top">
              <em>{c.project} {String(i + 1).padStart(2, "0")}</em>
              {pill(p)}
            </span>
            <strong>{p.title}</strong>
            <span className="wsp-tab-text">{p.text}</span>
            {tags(p)}
          </button>
        ))}
      </div>

      <div className="wsp-stage">
        {projects.map((p, i) => (
          <div key={p.title} className={i === active ? "wsp-win is-on" : "wsp-win"} aria-hidden={i !== active}>
            <span className="wsp-win-bar">
              <i /><i /><i />
              {c.bars[i]}
              {i === 1 && <b className="wsp-fake">{c.fake}</b>}
            </span>
            {i === 0 ? (
              <span className="wsp-shot">{shot("(max-width: 1100px) 90vw, 46vw")}</span>
            ) : (
              <div className="wsp-scen-wrap"><Scenario step={step} c={c} /></div>
            )}
            <span className="wsp-win-foot">
              {p.href
                ? <Link className="wsp-go" href={p.href}>{c.go}<ArrowUpRight aria-hidden /></Link>
                : <><span className="wsp-soon">{c.soon}</span><b>{c.soonShort}</b></>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
