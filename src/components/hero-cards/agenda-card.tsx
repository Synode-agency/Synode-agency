"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { Card, span, useCardClock, type Tone } from "./frame";

/**
 * CARTE 2 · AGENDA : l'agent IA organise un rendez-vous tout seul.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * Tout dit que c'est un AGENT qui agit, et non un calendrier qui se remplit :
 * la pastille d'en-tête le nomme et annonce ce qu'il est en train de faire,
 * l'étiquette « IA vérifie » saute d'un créneau libre à l'autre pendant la
 * recherche, et la notification finale est signée « Agent IA ». Retirer l'un
 * de ces trois repères et le bloc redevient un agenda quelconque.
 * ────────────────────────────────────────────────────────────────────────
 *
 * « Marie L. » et les créneaux sont illustratifs.
 */

const LOOP = 7400;
const AT = { read: 0, search: 700, propose: 2400, confirm: 3600, sms: 4600 } as const;
/** Les créneaux libres que l'agent passe en revue, et le rendez-vous retenu. */
const LOOKED = [2, 7, 11, 16];
const SLOT = 6;
const BUSY = [0, 3, 8, 12, 14, 17, 19, 21, 24];
const LOOK_FROM = 500;
const LOOK_STEP = 450;

const COPY = {
  fr: {
    label: "Agenda",
    week: "Semaine 42",
    agent: "Agent IA",
    acts: ["lit la demande", "cherche un créneau…", "propose mardi 10:00", "rendez-vous confirmé", "rappel SMS envoyé"],
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    hours: ["9:00", "10:00", "11:00", "14:00", "15:00"],
    mail: "e-mail reçu",
    from: "Marie L.",
    ask: "« Un rendez-vous mardi matin serait possible ? »",
    checking: "IA vérifie",
    proposed: "proposé…",
    confirmed: "✓ confirmé",
    sms: "Agent IA · SMS envoyé à Marie L.",
    smsText: "Votre rendez-vous : mardi 10:00",
  },
  en: {
    label: "Calendar",
    week: "Week 42",
    agent: "AI agent",
    acts: ["reading the request", "looking for a slot…", "proposing Tuesday 10:00", "appointment confirmed", "text reminder sent"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    hours: ["9:00", "10:00", "11:00", "14:00", "15:00"],
    mail: "email received",
    from: "Marie L.",
    ask: "“Would Tuesday morning work for a meeting?”",
    checking: "AI checking",
    proposed: "proposed…",
    confirmed: "✓ confirmed",
    sms: "AI agent · text sent to Marie L.",
    smsText: "Your appointment: Tuesday 10:00",
  },
} as const;

/** La petite tête de l'agent, dans la pastille d'en-tête. */
function Bot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="7" width="16" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9.5" cy="13" r="1.3" fill="currentColor" />
      <circle cx="14.5" cy="13" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function AgendaCard({ locale, active }: { locale: Locale; active: boolean }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [phase, setPhase] = useState(0);
  /* Le créneau que l'agent regarde à cet instant, -1 quand il ne cherche pas. */
  const [look, setLook] = useState(-1);
  const note = useRef<HTMLDivElement | null>(null);

  const still = useCardClock(active, LOOP, t => {
    const p = t < AT.search ? 0 : t < AT.propose ? 1 : t < AT.confirm ? 2 : t < AT.sms ? 3 : 4;
    setPhase(prev => (prev === p ? prev : p));

    const i = t >= LOOK_FROM && t < AT.propose - 100 ? Math.min(Math.floor((t - LOOK_FROM) / LOOK_STEP), LOOKED.length - 1) : -1;
    setLook(prev => (prev === i ? prev : i));

    /* La notification monte en glissant. */
    if (note.current) {
      const p2 = span(t, AT.sms, AT.sms + 500);
      note.current.style.opacity = `${p2}`;
      note.current.style.transform = `translateY(${(24 * (1 - p2)).toFixed(1)}px)`;
    }
  });

  const step = still ? 4 : phase;
  const tone: Tone = step >= 3 ? "green" : "blue";
  const looked = still ? -1 : look;

  return (
    <Card
      label={c.label}
      extra={c.week}
      pill={
        <span className={`hc-agent hc-agent--${tone}`}>
          <i aria-hidden><Bot /></i>
          <b>{c.agent}</b>
          <em>· {c.acts[step]}</em>
        </span>
      }
    >
      <div className="hc-cal">
        {c.days.map((d, i) => (
          <span key={d} className={i === 1 && step >= 2 ? "hc-day is-on" : "hc-day"} style={{ left: 38 + i * 100 }}>{d}</span>
        ))}
        {c.hours.map((h, i) => (
          <span key={h} className="hc-hour" style={{ top: 26 + i * 47 }}>{h}</span>
        ))}
        {Array.from({ length: 25 }).map((_, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const busy = BUSY.includes(i);
          const checking = looked >= 0 && LOOKED[looked] === i;
          const rdv = i === SLOT && step >= 2;
          return (
            <span
              key={i}
              className={[
                "hc-slot",
                busy ? "is-busy" : "",
                checking ? "is-checking" : "",
                rdv ? (step >= 3 ? "is-done" : "is-rdv") : "",
              ].filter(Boolean).join(" ")}
              style={{ left: 38 + col * 100, top: 26 + row * 47 }}
            >
              {rdv && (
                <>
                  <b>{c.from}</b>
                  <em>{step >= 3 ? c.confirmed : c.proposed}</em>
                </>
              )}
              {checking && <i className="hc-check-tag"><u aria-hidden />{c.checking}</i>}
            </span>
          );
        })}
      </div>

      {/* ---- La demande qui déclenche tout ---- */}
      <div className={!still && step <= 2 ? "hc-ask is-on" : "hc-ask"}>
        <em>{c.mail}</em>
        <b>{c.from}</b>
        <span>{c.ask}</span>
      </div>

      {/* ---- Le rappel envoyé par l'agent ---- */}
      <div className="hc-note" ref={note} style={still ? { opacity: 1, transform: "none" } : { opacity: 0 }}>
        <i aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-2 8-2 8h16s-2-1-2-8M13.7 20a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </i>
        <span>
          <em>{c.sms}</em>
          <b>{c.smsText}</b>
        </span>
      </div>
    </Card>
  );
}
