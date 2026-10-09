"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Card, Pill, easeOut, span, useCardClock, type Tone } from "./frame";

/**
 * CARTE 1 · RELANCES : une facture impayée se règle toute seule.
 *
 * Une facture à gauche, le suivi automatique à droite. L'échéance passe,
 * une relance part, le paiement arrive, et le tampon tombe.
 *
 * ── Ce que ce bloc n'est pas ────────────────────────────────────────────
 * « Dumont SRL », la facture F-2026-118 et les 1 240 € sont illustratifs.
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
    states: ["En retard", "Relancé", "Payée"],
    ref: "Facture F-2026-118",
    client: "Dumont SRL",
    total: "Total TTC",
    amount: "1 240 €",
    due: "échue le 30/09 · 6 jours de retard",
    settled: "réglée le 06/10",
    stamp: "PAYÉE",
    follow: "Suivi automatique",
    steps: [
      ["J+1", "Échéance dépassée"],
      ["J+3", "Relance personnalisée envoyée"],
      ["J+6", "Paiement reçu et rapproché"],
    ],
    mail: "Bonjour, sauf erreur de notre part, la facture F-2026-118 reste impayée. Voici le lien de paiement.",
  },
  en: {
    label: "Payment chasing",
    states: ["Overdue", "Chased", "Paid"],
    ref: "Invoice F-2026-118",
    client: "Dumont SRL",
    total: "Total incl. VAT",
    amount: "€1,240",
    due: "due 30/09 · 6 days late",
    settled: "settled 06/10",
    stamp: "PAID",
    follow: "Automatic follow-up",
    steps: [
      ["D+1", "Due date passed"],
      ["D+3", "Personalised reminder sent"],
      ["D+6", "Payment received and matched"],
    ],
    mail: "Hello, unless we are mistaken, invoice F-2026-118 is still unpaid. Here is the payment link.",
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
      {/* ---- La facture ---- */}
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
