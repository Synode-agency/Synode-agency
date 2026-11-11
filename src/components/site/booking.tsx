"use client";

import { CalendarPreview } from "./calendar-preview";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";

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

/**
 * LA RÉSERVATION.
 *
 * Sans `NEXT_PUBLIC_CAL_LINK`, c'est l'aperçu explicitement fictif
 * (`CalendarPreview`). Avec, c'est l'agenda Cal.com, intégré dans la page.
 *
 * ⚠ CAL.COM N'EST CHARGÉ QU'AU CLIC, PARTOUT. La variante « carte » s'ouvrait
 * d'office, et c'est elle qui sert aux quatre emplacements du site (accueil,
 * Solutions, Cas d'usage, Contact) : dès Cal.com branché, son agenda — et
 * ses cookies — se seraient chargés au simple défilement, sans que le
 * visiteur l'ait demandé. Ça aurait rendu fausse la page Confidentialité et
 * obligatoire un bandeau de cookies. Fermée, la carte dit QUI fournit
 * l'agenda : le clic devient un choix éclairé, et le site reste sans
 * bandeau. Corrigé le jour du branchement, comme convenu avec Antonino.
 *
 * Fermée, la carte a la hauteur de l'agenda : il prend sa place au clic sans
 * pousser la page.
 */
export function Booking({ locale, variant = "default" }: { locale: Locale; variant?: "default" | "card" }) {
  const { contact } = getContent(locale);
  const b = contact.booking;
  const fr = locale === "fr";
  const url = bookingUrl(process.env.NEXT_PUBLIC_CAL_LINK);
  const [open, setOpen] = useState(false);

  if (!url && variant === "default") {
    return <CalendarPreview locale={locale} />;
  }

  if (!url && variant === "card") {
    return <CalendarPreview locale={locale} variant="cta" />;
  }

  /* ⚠ LA PAGE DE RÉSERVATION NORMALE, ET NON SA VARIANTE `/embed`.
     La variante `/embed` reste masquée (page blanche) tant que le script
     officiel de Cal.com, `embed.js`, ne lui a pas envoyé de signal depuis
     notre page. Chargée seule dans un cadre, elle ne s'affichait jamais :
     vérifié au navigateur le 11/11/2026, côte à côte avec la page normale,
     qui s'affiche entière. */
  const embedUrl = url ? new URL(url) : null;
  if (embedUrl) {
    embedUrl.pathname = embedUrl.pathname.replace(/\/$/, "").replace(/\/embed$/, "");
    embedUrl.searchParams.delete("embed");
    embedUrl.searchParams.set("layout", "month_view");
    embedUrl.searchParams.set("theme", "light");
  }

  return (
    <div className={variant === "card" ? "booking booking--card" : "booking"}>
      {open && embedUrl ? (
        <iframe src={embedUrl.toString()} title={b.title} className="booking-frame" />
      ) : (
        <div className="booking-closed">
          <span className="booking-closed-icon" aria-hidden><CalendarClock /></span>
          <p className="booking-closed-title">{b.closedTitle}</p>
          <p className="booking-closed-text">{b.closedText}</p>
          <button type="button" onClick={() => setOpen(true)} className="btn btn--primary">{b.openLabel}</button>
          <p className="booking-closed-note">
            {b.closedNote}{" "}
            <Link href={path(locale, ROUTES.privacy)}>{b.closedNoteLink}</Link>
          </p>
        </div>
      )}
      {url && (open || variant === "default") && <a href={url.toString()} target="_blank" rel="noreferrer" className="go booking-direct">{fr ? "Ouvrir sur Cal.com" : "Open on Cal.com"}<ArrowUpRight aria-hidden /></a>}
    </div>
  );
}
