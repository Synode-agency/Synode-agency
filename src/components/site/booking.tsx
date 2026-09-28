"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { getContent, type Locale } from "@/lib/content";

/**
 * La réservation Cal.com.
 *
 * Le calendrier NE SE CHARGE PAS TOUT SEUL, et c'est une décision, pas une
 * économie. Un cadre tiers posé au chargement dépose ses cookies avant que
 * le visiteur ait rien demandé ; ici il ne part qu'au clic, donc quelqu'un
 * qui lit la page sans réserver n'a rien à refuser.
 *
 * Sans `NEXT_PUBLIC_CAL_LINK`, la page ne prétend pas que la réservation
 * fonctionne : elle dit qu'elle n'est pas encore branchée et renvoie vers le
 * formulaire, qui lui marche. Aucune URL Cal.com n'est inventée ici.
 *
 * Un clic sur le calendrier n'est pas un rendez-vous : la confirmation vient
 * de Cal.com, par email, et de nulle part ailleurs.
 */
export function Booking({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);
  const b = contact.booking;
  const link = process.env.NEXT_PUBLIC_CAL_LINK;
  const [open, setOpen] = useState(false);

  if (!link) {
    return (
      <div className="todo">
        <span className="todo-label">{b.unavailableTitle}</span>
        <p>{b.unavailableText}</p>
      </div>
    );
  }

  const url = `https://cal.com/${link}`;

  return (
    <div className="booking">
      {open ? (
        <iframe
          src={`${url}?embed=true`}
          title={b.title}
          loading="lazy"
          className="booking-frame"
        />
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn btn--primary">
          <CalendarClock aria-hidden />
          {b.openLabel}
        </button>
      )}

      {/* Le lien direct reste là même quand le cadre est ouvert : s'il ne
          charge pas, le visiteur a toujours un chemin. */}
      <a href={url} target="_blank" rel="noreferrer" className="go booking-direct">
        {b.openLabel}
        <ArrowUpRight aria-hidden />
      </a>
    </div>
  );
}
