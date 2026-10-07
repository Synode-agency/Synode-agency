"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Check, Search } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * LE VISUEL DU HERO DE LA PAGE « ASSISTANTS & AGENTS IA ».
 *
 * Il n'est posé que là, et il n'a pas de variante claire : sa palette est
 * sombre par défaut dans `studio.css`. Avant de le réutiliser ailleurs, il
 * faudrait d'abord vérifier que la bande d'accueil est en bleu nuit.
 *
 * Un agent IA qui traite une vraie demande client, en quatre temps :
 * il cherche dans les sources autorisées, comprend la demande, prépare
 * une réponse sourcée, puis ATTEND une validation humaine avant l'envoi.
 *
 * ── Ce que ce bloc n'est pas ────────────────────────────────────────────
 * Ce n'est pas une capture d'un produit qui tourne. « Marie L. », la
 * demande #2041, les noms de fichiers et les scores sont illustratifs, et
 * ne doivent jamais être repris ailleurs comme des résultats. Ce que le
 * bloc montre, en revanche, est vrai de ce que nous construisons : les
 * sources sont citées, et rien ne part sans validation.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. L'horloge ne tourne QUE lorsque le bloc est à l'écran. Six solutions
 *    sur deux pages, chacune avec son minuteur à 100ms, feraient tourner
 *    le processeur pour des pixels que personne ne regarde.
 * 2. `prefers-reduced-motion` affiche l'état final — brouillon complet,
 *    sources citées, message envoyé — et n'arme aucune horloge.
 * ────────────────────────────────────────────────────────────────────────
 */

/* La boucle, en millisecondes. Chaque repère est commenté là où il sert. */
const LOOP = 15000;
const TICK = 100;
const T_UNDERSTAND = 4000;
const T_DRAFT = 7000;
const T_VALIDATE = 11500;
const T_SENT = 12800;
/** L'état final, celui qu'on affiche quand le mouvement est réduit. */
const T_STILL = 13500;

const COPY = {
  fr: {
    agent: "Agent IA",
    ref: "demande #2041 · Marie L.",
    states: ["Recherche…", "Analyse…", "Rédaction…", "Validation requise", "Envoyé"],
    steps: ["Rechercher", "Comprendre", "Préparer"],
    query: "devis toiture · tarifs · délais",
    sources: [
      { badge: "PDF", name: "tarifs_toiture_2026.pdf", score: "0.94" },
      { badge: "XLS", name: "planning_chantiers_Q4.xlsx", score: "0.88" },
      { badge: "CRM", name: "historique · Marie Lambert", score: "0.81" },
    ],
    msgLabel: "message client",
    msg: [
      "Bonjour, pourriez-vous m’envoyer un ",
      "devis",
      " pour la rénovation de notre toiture de ",
      "80 m²",
      " ? Idéalement ",
      "avant fin octobre",
      ". Merci !",
    ],
    tags: ["type : devis", "surface : 80 m²", "échéance : 31/10"],
    draftLabel: "brouillon de réponse",
    draft: "Bonjour Marie, merci pour votre demande. Vous trouverez ci-joint notre devis pour la rénovation de votre toiture de 80 m². Une intervention est possible avant fin octobre [1][2].",
    sourcesLabel: "Sources",
    cites: ["[1] tarifs_2026", "[2] planning"],
    waiting: "Votre validation avant envoi",
    approve: "Valider",
    signed: "Validé par Marie · 14:32",
    sent: "✓ Envoyé",
  },
  en: {
    agent: "AI agent",
    ref: "request #2041 · Marie L.",
    states: ["Searching…", "Analysing…", "Drafting…", "Approval needed", "Sent"],
    steps: ["Search", "Understand", "Draft"],
    query: "roofing quote · pricing · lead times",
    sources: [
      { badge: "PDF", name: "roofing_pricing_2026.pdf", score: "0.94" },
      { badge: "XLS", name: "site_schedule_Q4.xlsx", score: "0.88" },
      { badge: "CRM", name: "history · Marie Lambert", score: "0.81" },
    ],
    msgLabel: "client message",
    msg: [
      "Hello, could you send me a ",
      "quote",
      " for renovating our roof of ",
      "80 m²",
      "? Ideally ",
      "before the end of October",
      ". Thanks!",
    ],
    tags: ["type: quote", "area: 80 m²", "due: 31/10"],
    draftLabel: "draft reply",
    draft: "Hello Marie, thank you for your request. Please find attached our quote for renovating your 80 m² roof. Work can start before the end of October [1][2].",
    sourcesLabel: "Sources",
    cites: ["[1] pricing_2026", "[2] schedule"],
    waiting: "Your approval before sending",
    approve: "Approve",
    signed: "Approved by Marie · 14:32",
    sent: "✓ Sent",
  },
} as const;

/** Les repères internes d'une phase, pour ne pas les semer dans le corps. */
const AT_SOURCE = [1200, 2000, 2800];
const AT_SCORE = [1700, 2500, 3300];
const AT_MARK = [4600, 5200, 5800];
const AT_TAG = [5800, 6100, 6400];
/** 44 caractères par seconde, la vitesse d'une frappe lisible. */
const CPS = 44;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function AgentDemo({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];
  const box = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setT(T_STILL));
      return;
    }
    let id = 0;
    const start = () => {
      if (id) return;
      id = window.setInterval(() => setT((v) => (v + TICK) % LOOP), TICK);
    };
    const stop = () => {
      if (!id) return;
      window.clearInterval(id);
      id = 0;
    };
    /* L'horloge ne tourne que si le bloc est à l'écran. */
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  const phase = t < T_UNDERSTAND ? 0 : t < T_DRAFT ? 1 : t < T_VALIDATE ? 2 : t < T_SENT ? 3 : 4;
  /* La carte de travail suit l'étape, et garde le brouillon pendant la
     validation et l'envoi : c'est lui qu'on valide. */
  const view = Math.min(phase, 2);

  const bar = (i: number) => {
    const from = [0, T_UNDERSTAND, T_DRAFT][i];
    const to = [T_UNDERSTAND, T_DRAFT, T_VALIDATE][i];
    return `${clamp(((t - from) / (to - from)) * 100, 0, 100)}%`;
  };

  const typed = (text: string, from: number, cps: number) =>
    text.slice(0, clamp(Math.floor(((t - from) / 1000) * cps), 0, text.length));

  const query = typed(c.query, 0, c.query.length / 1.1);
  const draft = phase >= 2 ? typed(c.draft, T_DRAFT, CPS) : "";
  const draftDone = draft.length >= c.draft.length;

  return (
    <div className="agd" ref={box}>
      {/* ---- L'agent et son état ---- */}
      <div className="agd-head">
        <span className={`agd-avatar${phase === 0 || phase === 2 ? " is-busy" : ""}`} aria-hidden><Bot /></span>
        <span className="agd-who">
          <strong>{c.agent}</strong>
          <em>{c.ref}</em>
        </span>
        <span className={`agd-state agd-state--${phase >= 4 ? "sent" : phase === 3 ? "wait" : "work"}`}>
          <i className={phase < 3 ? "is-blink" : undefined} aria-hidden />
          {c.states[phase]}
        </span>
      </div>

      {/* ---- Les trois étapes ---- */}
      <div className="agd-steps">
        {c.steps.map((s, i) => (
          <span key={s} className={`agd-step${view > i ? " is-done" : view === i ? " is-now" : ""}`}>
            <i aria-hidden><b style={{ width: bar(i) }} /></i>
            <span>
              {view > i && <Check className="agd-step-tick" aria-hidden />}
              {s}
            </span>
          </span>
        ))}
      </div>

      {/* ---- La carte de travail ---- */}
      <div className="agd-card">
        {view === 0 && (
          <>
            <span className="agd-query">
              <Search aria-hidden />
              {query}
              <i className="agd-caret" aria-hidden />
            </span>
            <ul className="agd-sources">
              {c.sources.map((src, i) => (
                <li key={src.name} className={`${t >= AT_SOURCE[i] ? "is-in" : ""}${t >= AT_SOURCE[i] && t < AT_SCORE[i] ? " is-scan" : ""}`}>
                  <em>{src.badge}</em>
                  <b>{src.name}</b>
                  <span className={t >= AT_SCORE[i] ? "is-done" : undefined}>{t >= AT_SCORE[i] ? src.score : "···"}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {view === 1 && (
          <>
            <span className="agd-label">{c.msgLabel}</span>
            <p className="agd-msg">
              {c.msg.map((part, i) =>
                i % 2 === 1
                  ? <mark key={i} className={t >= AT_MARK[(i - 1) / 2] ? "is-on" : undefined}>{part}</mark>
                  : <span key={i}>{part}</span>,
              )}
            </p>
            <span className="agd-tags">
              {c.tags.map((tag, i) => (
                <em key={tag} className={t >= AT_TAG[i] ? "is-in" : undefined}>{tag}</em>
              ))}
            </span>
          </>
        )}

        {view === 2 && (
          <>
            <span className="agd-label">{c.draftLabel}</span>
            <p className="agd-draft">
              {draft}
              {!draftDone && <i className="agd-caret" aria-hidden />}
            </p>
            <span className={draftDone ? "agd-cites is-in" : "agd-cites"}>
              <em>{c.sourcesLabel}</em>
              {c.cites.map((cite) => <b key={cite}>{cite}</b>)}
            </span>
          </>
        )}
      </div>

      {/* ---- La validation humaine ---- */}
      <div className={`agd-approve agd-approve--${phase >= 4 ? "sent" : phase === 3 ? "wait" : "idle"}`}>
        <span>{phase >= 4 ? c.signed : c.waiting}</span>
        <b className={phase === 3 && t >= 12400 ? "is-press" : undefined}>
          {phase >= 4 ? c.sent : c.approve}
        </b>
      </div>
    </div>
  );
}
