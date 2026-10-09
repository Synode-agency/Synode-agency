"use client";

import { CalendarPreview } from "./calendar-preview";
import { useState } from "react";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { getContent, type Locale } from "@/lib/content";

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
  const [open, setOpen] = useState(variant === "card" && Boolean(url));

  if (!url && variant === "default") {
    return <CalendarPreview locale={locale} />;
  }

  if (!url && variant === "card") {
    return <CalendarPreview locale={locale} variant="cta" />;
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
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn btn--primary"><CalendarClock aria-hidden />{b.openLabel}</button>
      )}
      {url && (open || variant === "default") && <a href={url.toString()} target="_blank" rel="noreferrer" className="go booking-direct">{fr ? "Ouvrir sur Cal.com" : "Open on Cal.com"}<ArrowUpRight aria-hidden /></a>}
    </div>
  );
}
