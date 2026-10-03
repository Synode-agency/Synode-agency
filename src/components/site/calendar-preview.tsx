"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Video, Globe2, Info } from "lucide-react";
import { ANCHORS, path, ROUTES, type Locale } from "@/lib/content";

/** A design preview only. It does not fetch availability or create bookings. */
export function CalendarPreview({ locale, variant = "default" }: { locale: Locale; variant?: "default" | "cta" }) {
  const fr = locale === "fr";
  const [offset, setOffset] = useState(0);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const month = new Date(2026, 8 + offset, 1);
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const blanks = (month.getDay() + 6) % 7;
  const lang = fr ? "fr-BE" : "en-GB";
  const monthLabel = month.toLocaleDateString(lang, { month: "long", year: "numeric" });
  const changeMonth = (delta: number) => { setOffset(offset + delta); setDay(null); setTime(null); };
  const revealDetails = variant === "default" || day !== null;
  return <div className={variant === "cta" ? "calendar-demo calendar-demo--cta" : "calendar-demo"}>
    <div className="calendar-demo-notice"><Info aria-hidden /><span>{fr ? "Aperçu interactif · dates et horaires fictifs. Aucune réservation n’est effectuée." : "Interactive preview · illustrative dates and times. No booking is made."}</span></div>
    <div className="calendar-demo-body">
      {revealDetails && <aside className="calendar-demo-info"><Image src="/synode-mark.png" width={44} height={44} alt="Synode" /><span className="eyebrow">Synode</span><h3>{fr ? "Faisons connaissance." : "Let’s meet."}</h3><p>{fr ? "Un premier échange pour comprendre votre besoin et envisager la suite." : "A first conversation to understand your needs and explore the next step."}</p><ul><li><Clock3 aria-hidden />{fr ? "30 minutes · Gratuit" : "30 minutes · Free"}</li><li><Video aria-hidden />{fr ? "En visioconférence" : "Video call"}</li><li><Globe2 aria-hidden />Europe/Brussels</li></ul></aside>}
      <div className="calendar-demo-month"><div className="calendar-demo-month-nav"><p className="calendar-demo-label" aria-live="polite">{monthLabel}</p><div><button type="button" aria-label={fr ? "Mois précédent de l’aperçu" : "Previous preview month"} onClick={() => changeMonth(-1)}><ChevronLeft aria-hidden /></button><button type="button" aria-label={fr ? "Mois suivant de l’aperçu" : "Next preview month"} onClick={() => changeMonth(1)}><ChevronRight aria-hidden /></button></div></div>
        <div className="calendar-demo-week" aria-hidden>{(fr ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).map(d => <span key={d}>{d}</span>)}</div>
        <div className="calendar-demo-days" role="group" aria-label={fr ? "Choisir une date dans l’aperçu" : "Choose a preview date"}>{Array.from({ length: blanks }, (_, i) => <span key={`blank-${i}`} />)}{Array.from({ length: count }, (_, i) => { const n = i + 1; return <button type="button" key={n} aria-pressed={day === n} aria-label={`${fr ? "Tester le" : "Preview"} ${n} ${monthLabel}`} onClick={() => { setDay(n); setTime(null); }}>{n}</button>; })}</div>
        <p className="calendar-demo-hint">{fr ? "Explorez la présentation du calendrier." : "Explore the calendar layout."}</p>
      </div>
      {revealDetails && <div className="calendar-demo-times"><p className="calendar-demo-label">{fr ? "Horaires d’exemple" : "Example times"}</p><p aria-live="polite">{day ? `${day} ${monthLabel}` : fr ? "Sélectionnez une date pour essayer." : "Select a date to try it."}</p><div role="group" aria-label={fr ? "Horaires fictifs" : "Illustrative times"}>{["09:00", "10:30", "14:00", "15:30"].map(t => <button type="button" disabled={!day} key={t} aria-pressed={time === t} onClick={() => setTime(t)}>{t}</button>)}</div><span className="calendar-demo-selection" role="status">{time ? (fr ? `Aperçu : ${time}. Aucun créneau réservé.` : `Preview: ${time}. No time booked.`) : (fr ? "La réservation sera gérée par Cal.com une fois le calendrier connecté." : "Cal.com will handle booking once the calendar is connected.")}</span></div>}
    </div>
    <div className="calendar-demo-footer"><span>{fr ? "Pour convenir d’un vrai rendez-vous :" : "To arrange an actual meeting:"}</span><Link className="go" href={`${path(locale, ROUTES.contact)}#${ANCHORS.form}`}>{fr ? "Nous contacter" : "Contact us"}<ChevronRight aria-hidden /></Link></div>
  </div>;
}
