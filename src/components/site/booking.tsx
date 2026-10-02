"use client";

import { CalendarPreview } from "./calendar-preview";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarClock, Clock3 } from "lucide-react";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";

/** Accept a Cal.com event path or a full public booking URL. */
function bookingUrl(value: string | undefined) {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.startsWith("https://") ? value : `https://cal.com/${value.replace(/^\/+/, "")}`);
    if (url.protocol !== "https:" || !["cal.com", "app.cal.com", "cal.eu", "app.cal.eu"].includes(url.hostname)) return null;
    if (url.pathname === "/") return null;
    return url;
  } catch {
    return null;
  }
}

/** Cal.com loads on request. The contact fallback is explicitly a non-booking design preview. */
export function Booking({ locale, variant = "default" }: { locale: Locale; variant?: "default" | "card" }) {
  const { contact } = getContent(locale);
  const b = contact.booking;
  const fr = locale === "fr";
  const url = bookingUrl(process.env.NEXT_PUBLIC_CAL_LINK);
  const [open, setOpen] = useState(false);
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;

  if (!url && variant === "default") {
    return <CalendarPreview locale={locale} />;
  }

  const embedUrl = url ? new URL(url) : null;
  if (embedUrl) {
    embedUrl.pathname = `${embedUrl.pathname.replace(/\/$/, "").replace(/\/embed$/, "")}/embed`;
    embedUrl.searchParams.set("embed", "");
    embedUrl.searchParams.set("layout", "month_view");
    embedUrl.searchParams.set("theme", "light");
  }

  return (
    <div className={variant === "card" ? "booking booking--card" : "booking"}>
      {open && embedUrl ? (
        <iframe src={embedUrl.toString()} title={b.title} loading="lazy" className="booking-frame" />
      ) : variant === "card" ? (
        <div className="booking-preview">
          <div className="booking-preview-heading"><CalendarClock aria-hidden /><div><h3>{fr ? "Faisons connaissance" : "Let’s meet"}</h3><span><Clock3 aria-hidden />{fr ? "30 min · En visio" : "30 min · Video call"}</span></div></div>
          <div className="calendar-illustration" aria-hidden="true">
            <div className="calendar-week">{(fr ? ["L", "M", "M", "J", "V", "S", "D"] : ["M", "T", "W", "T", "F", "S", "S"]).map((day, i) => <span key={i}>{day}</span>)}</div>
            <div className="calendar-days">{Array.from({ length: 28 }, (_, i) => <span key={i} />)}</div>
          </div>
          {url ? <><p>{fr ? "Consultez nos disponibilités, puis choisissez le jour et l’heure qui vous conviennent." : "See our availability and choose a day and time that suits you."}</p><button type="button" onClick={() => setOpen(true)} className="btn btn--primary">{fr ? "Afficher les disponibilités" : "Show available times"}<ArrowUpRight aria-hidden /></button></> : <><p>{fr ? "La réservation en ligne sera bientôt disponible. En attendant, contactez-nous pour convenir d’un créneau." : "Online booking will be available soon. Contact us to arrange a time in the meantime."}</p><Link href={formHref} className="btn btn--primary">{fr ? "Nous contacter" : "Contact us"}<ArrowUpRight aria-hidden /></Link></>}
          <span className="booking-provider">{url ? "Cal.com" : (fr ? "Calendrier à venir" : "Calendar coming soon")}</span>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn btn--primary"><CalendarClock aria-hidden />{b.openLabel}</button>
      )}
      {url && (open || variant === "default") && <a href={url.toString()} target="_blank" rel="noreferrer" className="go booking-direct">{fr ? "Ouvrir sur Cal.com" : "Open on Cal.com"}<ArrowUpRight aria-hidden /></a>}
    </div>
  );
}
