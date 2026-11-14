"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Card, Pill, easeOut, span, useCardClock, type Tone } from "./frame";

/**
 * CARTE 1 · RELANCES : un devis sans réponse finit signé.
 *
 * Un devis à gauche, le suivi automatique à droite. Le client ne répond
 * pas, une relance part, le devis est signé en ligne, et le tampon tombe.
 *
 * Jusqu'au 14/11/2026, cette carte suivait une facture impayée. Le devis
 * la remplace : c'est un processus qu'un ERP ou un outil comptable ne
 * couvre pas, et le site laissait croire que l'automatisation se limitait
 * à la comptabilité (relecture du site par un dirigeant de PME).
 *
 * ── Ce que ce bloc n'est pas ────────────────────────────────────────────
 * « Lumen SA », le devis D-2026-042 et les 4 850 € sont illustratifs. Le
 * nom du client est court exprès : le tampon « SIGNÉ » se pose sur sa fin.
 * Ce ne sont pas des chiffres de clients, et ils ne doivent jamais être
 * repris ailleurs comme des résultats.
 * ────────────────────────────────────────────────────────────────────────
 */

const LOOP = 7400;
/** Les trois temps du suivi, et le moment où le tampon tombe. */
const AT = { late: 600, chase: 1700, paid: 4300, stamp: 4700 } as const;
const TYPE_FROM = 1900;
const TYPE_TO = 3900;

const COPY = {
  fr: {
    label: "Relances",
    states: ["Sans réponse", "Relancé", "Signé"],
    ref: "Devis D-2026-042",
    client: "Lumen SA",
    total: "Total HTVA",
    amount: "4 850 €",
    due: "envoyé le 02/10 · pas de réponse",
    settled: "signé le 07/10",
    stamp: "SIGNÉ",
    follow: "Suivi automatique",
    steps: [
      ["J+2", "Pas encore de réponse"],
      ["J+3", "Relance personnalisée envoyée"],
      ["J+5", "Devis signé en ligne"],
    ],
    mail: "Bonjour, avez-vous pu consulter notre devis D-2026-042 ? Voici le lien pour le signer en ligne.",
  },
  en: {
    label: "Follow-ups",
    states: ["No reply", "Chased", "Signed"],
    ref: "Quote Q-2026-042",
    client: "Lumen SA",
    total: "Total excl. VAT",
    amount: "€4,850",
    due: "sent 02/10 · no reply yet",
    settled: "signed 07/10",
    stamp: "SIGNED",
    follow: "Automatic follow-up",
    steps: [
      ["D+2", "No reply yet"],
      ["D+3", "Personalised reminder sent"],
      ["D+5", "Quote signed online"],
    ],
    mail: "Hello, have you had a chance to look at quote Q-2026-042? Here is the link to sign it online.",
  },
} as const;

export function RelancesCard({ locale, active }: { locale: Locale; active: boolean }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  /* Quatre états seulement passent par React : le reste est écrit dans le DOM. */
  const [phase, setPhase] = useState(0);
  const fill = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<HTMLSpanElement | null>(null);
  const caret = useRef<HTMLSpanElement | null>(null);
  const stamp = useRef<HTMLSpanElement | null>(null);

  const still = useCardClock(active, LOOP, t => {
    const p = t < AT.late ? 0 : t < AT.chase ? 1 : t < AT.paid ? 2 : 3;
    setPhase(prev => (prev === p ? prev : p));

    /* Le rail se remplit par paliers : il suit les étapes, il ne glisse pas
       tout seul d'un bout à l'autre. */
    if (fill.current) {
      const h = t < AT.late ? 0
        : t < AT.chase ? 30
        : t < 4100 ? 30 + (142 - 30) * span(t, AT.chase, 4100)
        : t < AT.paid ? 142
        : 186;
      fill.current.style.height = `${h.toFixed(1)}px`;
    }

    if (typed.current) {
      const n = Math.round(c.mail.length * span(t, TYPE_FROM, TYPE_TO));
      const next = t < TYPE_FROM ? "" : c.mail.slice(0, n);
      if (typed.current.textContent !== next) typed.current.textContent = next;
    }
    if (caret.current) {
      const writing = t >= TYPE_FROM && t < TYPE_TO;
      caret.current.style.opacity = writing && Math.floor(t / 420) % 2 === 0 ? "1" : "0";
    }

    /* Le tampon tombe : il arrive gros et se pose. */
    if (stamp.current) {
      const p2 = span(t, AT.stamp, AT.stamp + 350);
      stamp.current.style.opacity = t < AT.stamp ? "0" : "1";
      stamp.current.style.transform = `rotate(-12deg) scale(${(1.6 - 0.6 * easeOut(p2)).toFixed(3)})`;
    }
  });

  const step = still ? 3 : phase;
  const tone: Tone = step >= 3 ? "green" : step >= 2 ? "blue" : "warm";
  const state = step >= 3 ? c.states[2] : step >= 2 ? c.states[1] : c.states[0];

  return (
    <Card label={c.label} pill={<Pill tone={tone}>{state}</Pill>}>
      {/* ---- Le devis ---- */}
      <div className="hc-invoice">
        <span className="hc-inv-ref">{c.ref}</span>
        <strong className="hc-inv-client">{c.client}</strong>
        <i className="hc-rule" />
        <i className="hc-ghost" style={{ width: "86%" }} />
        <i className="hc-ghost" style={{ width: "64%" }} />
        <i className="hc-ghost" style={{ width: "74%" }} />
        <span className="hc-inv-total">{c.total}</span>
        <strong className="hc-inv-amount">{c.amount}</strong>
        <span className={step >= 3 ? "hc-inv-due is-paid" : "hc-inv-due"}>
          {step >= 3 ? c.settled : c.due}
        </span>
        <span
          className="hc-stamp"
          ref={stamp}
          style={still ? { opacity: 1, transform: "rotate(-12deg) scale(1)" } : { opacity: 0 }}
        >
          {c.stamp}
        </span>
      </div>

      {/* ---- Le suivi ---- */}
      <div className="hc-track">
        <span className="hc-track-title">{c.follow}</span>
        <span className="hc-rail" aria-hidden>
          <i ref={fill} style={{ height: still ? 186 : 0 }} />
        </span>
        {c.steps.map(([day, title], i) => {
          const on = still || step > i;
          return (
            <div key={day} className={on ? `hc-ev hc-ev--${i} is-on` : `hc-ev hc-ev--${i}`}>
              <span className={i === 2 ? "hc-ev-dot is-done" : "hc-ev-dot"} aria-hidden />
              <span className="hc-ev-day">{day}</span>
              <strong>{title}</strong>
            </div>
          );
        })}
        <div className={still || step >= 2 ? "hc-mail is-on" : "hc-mail"}>
          <span ref={typed}>{still ? c.mail : ""}</span>
          <i className="hc-caret" ref={caret} aria-hidden />
        </div>
      </div>
    </Card>
  );
}
