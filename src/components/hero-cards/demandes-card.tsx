"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Card, Pill, span, useCardClock } from "./frame";

/**
 * CARTE 3 · DEMANDES CLIENTS : une demande reçue, une réponse rédigée et
 * envoyée.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * La réponse s'écrit en VRAIES LETTRES, pas en lignes grises. Un faux texte
 * fait de barres ne dit pas qu'une réponse est rédigée : il dit qu'un
 * gabarit se remplit. Ne pas remplacer ce texte par des traits.
 * ────────────────────────────────────────────────────────────────────────
 *
 * « Marie L. », « Atelier Brun », « J. Peeters », le devis et le compteur
 * sont illustratifs, et ne doivent jamais être repris comme des résultats.
 */

const LOOP = 7400;
const AT = { pick: 2000, type: 2300, typed: 4800, press: 4900, sent: 5200 } as const;
const MAILS_AT = [300, 900, 1500];
const TAGS_AT = [2900, 3200, 3500];

const COPY = {
  fr: {
    label: "Demandes clients",
    inbox: "Boîte de réception",
    mails: [
      ["Marie L.", "e-mail", "Demande de devis rénovation"],
      ["Atelier Brun", "site web", "Question sur vos tarifs"],
      ["J. Peeters", "téléphone", "Rappel demandé"],
    ],
    states: ["nouveau", "en cours", "répondu"],
    ready: "Réponse préparée",
    handled: "traitées aujourd’hui",
    subject: "Marie L. · Demande de devis",
    tags: ["Type : devis", "Urgence : normale", "Client existant"],
    reply: "Bonjour Marie, merci pour votre demande. Vous trouverez ci-joint notre devis détaillé. Une intervention est possible dès la semaine 44. Bien à vous.",
    file: "devis_2026-041.pdf joint",
    send: "Envoyer",
    sent: "✓ Envoyé",
  },
  en: {
    label: "Client requests",
    inbox: "Inbox",
    mails: [
      ["Marie L.", "email", "Renovation quote request"],
      ["Atelier Brun", "website", "Question about your pricing"],
      ["J. Peeters", "phone", "Call-back requested"],
    ],
    states: ["new", "in progress", "answered"],
    ready: "Reply prepared",
    handled: "handled today",
    subject: "Marie L. · Quote request",
    tags: ["Type: quote", "Urgency: normal", "Existing client"],
    reply: "Hello Marie, thank you for your request. Please find our detailed quote attached. Work can start in week 44. Kind regards.",
    file: "quote_2026-041.pdf attached",
    send: "Send",
    sent: "✓ Sent",
  },
} as const;

export function DemandesCard({ locale, active }: { locale: Locale; active: boolean }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [phase, setPhase] = useState(0);
  const typed = useRef<HTMLSpanElement | null>(null);
  const caret = useRef<HTMLSpanElement | null>(null);
  const button = useRef<HTMLSpanElement | null>(null);

  const still = useCardClock(active, LOOP, t => {
    /* Les étapes : arrivée des messages, sélection, rédaction, envoi. */
    const p = t < MAILS_AT[0] ? 0
      : t < MAILS_AT[1] ? 1
      : t < MAILS_AT[2] ? 2
      : t < AT.pick ? 3
      : t < TAGS_AT[0] ? 4
      : t < TAGS_AT[1] ? 5
      : t < TAGS_AT[2] ? 6
      : t < AT.sent ? 7
      : 8;
    setPhase(prev => (prev === p ? prev : p));

    if (typed.current) {
      const n = Math.round(c.reply.length * span(t, AT.type, AT.typed));
      const next = t < AT.type ? "" : c.reply.slice(0, n);
      if (typed.current.textContent !== next) typed.current.textContent = next;
    }
    if (caret.current) {
      const writing = t >= AT.type && t < AT.typed;
      caret.current.style.opacity = writing && Math.floor(t / 420) % 2 === 0 ? "1" : "0";
    }
    if (button.current) {
      button.current.style.transform = t >= AT.press && t < AT.sent ? "scale(.94)" : "scale(1)";
    }
  });

  const step = still ? 8 : phase;
  const picked = step >= 4;
  const sent = step >= 8;
  const seen = (i: number) => still || step > i;

  return (
    <Card label={c.label} pill={<Pill tone={sent ? "green" : "blue"}>{sent ? c.states[2] : c.states[1]}</Pill>}>
      {/* ---- La boîte de réception ---- */}
      <div className="hc-inbox">
        <span className="hc-inbox-title">{c.inbox}</span>
        {c.mails.map(([name, src, subject], i) => {
          const state = i === 0 ? (sent ? 2 : picked ? 1 : 0) : 0;
          return (
            <div key={name} className={[
              "hc-mailrow",
              seen(i) ? "is-in" : "",
              i === 0 && picked ? "is-picked" : "",
            ].filter(Boolean).join(" ")}>
              <span className="hc-mailrow-top">
                <strong>{name}</strong>
                <em>{src}</em>
              </span>
              {/* Objet et état sur LA MÊME ligne : à trois lignes par case,
                  la troisième demande sortait de la colonne. */}
              <span className="hc-mailrow-bot">
                <span className="hc-mailrow-sub">{subject}</span>
                <b className={`hc-badge hc-badge--${state}`}>{c.states[state]}</b>
              </span>
            </div>
          );
        })}
      </div>

      {/* ---- La réponse ---- */}
      <div className="hc-answer">
        <span className="hc-answer-top">
          <em>{c.ready}</em>
          <span>{c.handled} <b>{sent ? 13 : 12}</b></span>
        </span>
        <strong className={picked ? "hc-answer-subject is-on" : "hc-answer-subject"}>{c.subject}</strong>
        <span className="hc-answer-tags">
          {c.tags.map((tag, i) => (
            <i key={tag} className={still || step > 4 + i ? "is-in" : undefined}>{tag}</i>
          ))}
        </span>
        <div className="hc-draft">
          <p>
            <span ref={typed}>{still ? c.reply : ""}</span>
            <i className="hc-caret" ref={caret} aria-hidden />
          </p>
          <span className="hc-draft-foot">
            <em>{c.file}</em>
            <b ref={button} className={sent ? "hc-send is-sent" : "hc-send"}>{sent ? c.sent : c.send}</b>
          </span>
        </div>
      </div>
    </Card>
  );
}
