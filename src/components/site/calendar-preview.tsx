"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarCheck2, ChevronLeft, ChevronRight, Clock3, Info } from "lucide-react";
import { ANCHORS, path, ROUTES, type Locale } from "@/lib/content";

/**
 * L'aperçu de réservation. Il ne lit aucune disponibilité et n'enregistre
 * AUCUN rendez-vous : il n'apparaît que lorsque `NEXT_PUBLIC_CAL_LINK` est
 * absent, c'est-à-dire tant que Cal.com n'est pas branché.
 *
 * Le parcours se joue en trois états dans le MÊME conteneur, de hauteur
 * fixe : calendrier, horaires, récapitulatif. Rien ne pousse la page vers
 * le bas, et le bloc occupe la même place aux trois étapes.
 *
 * ── Un point à ne pas défaire ───────────────────────────────────────────
 * AUCUN libellé de ce composant ne doit laisser croire qu'une réservation
 * se fait. Le bouton dit « tester », le troisième écran dit que c'est à ça
 * que ressemblera la réservation, et l'avertissement du haut est affiché
 * dans les deux variantes. Trois formulations précédentes — « valider votre
 * rendez-vous », « votre créneau est retenu », et l'avertissement masqué sur
 * la page Contact — laissaient quelqu'un repartir en croyant avoir un
 * rendez-vous. Rien n'est envoyé nulle part, aucun email ne part.
 *
 * Le jour où Cal.com sera connecté, ce composant ne s'affichera plus du
 * tout : `Booking` passera sur l'iframe. Si l'on veut malgré tout une vraie
 * confirmation ici, il faudra d'abord un envoi réel, puis seulement
 * remplacer `confirmTitle` et `confirmText` dans les textes ci-dessous.
 * ────────────────────────────────────────────────────────────────────────
 */

type Step = "calendar" | "time" | "confirmed";

const SLOTS = ["09:00", "09:30", "10:00", "11:00", "14:00", "15:30"];

export function CalendarPreview({ locale, variant = "default" }: { locale: Locale; variant?: "default" | "cta" }) {
  const fr = locale === "fr";
  const isCta = variant === "cta";
  const lang = fr ? "fr-BE" : "en-GB";

  const [offset, setOffset] = useState(0);
  const [step, setStep] = useState<Step>("calendar");
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  /* ⚠ Le mois courant, CALCULÉ, et non une date écrite.
     L'aperçu partait sur septembre 2026, écrit en dur : trois semaines plus
     tard il proposait des créneaux déjà passés, ce qui est exactement ce
     qu'une démonstration de réservation ne doit pas faire. `useState` le fige
     au montage pour que le rendu du serveur et celui du client soient
     identiques, et que la grille ne saute pas si l'on passe minuit. */
  const [base] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const month = new Date(base.getFullYear(), base.getMonth() + offset, 1);
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const blanks = (month.getDay() + 6) % 7;
  const monthLabel = month.toLocaleDateString(lang, { month: "long", year: "numeric" });

  const changeMonth = (delta: number) => {
    setOffset(offset + delta);
    setDay(null);
    setTime(null);
  };

  const pickDay = (n: number) => {
    setDay(n);
    setTime(null);
    setStep("time");
  };

  const restart = () => {
    setStep("calendar");
    setTime(null);
  };

  const dayLabel = day
    ? new Date(month.getFullYear(), month.getMonth(), day)
      .toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long" })
    : "";

  const contactHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;

  return (
    <div className={isCta ? "calendar-demo calendar-demo--cta" : "calendar-demo"}>
      {/* L'encadré d'avertissement et le pied de page ne sont posés que
          hors des CTA. Dans les deux cartes d'accueil et de Solutions, le
          calendrier est encadré par un titre et des boutons qui disent
          déjà ce qu'on y fait ; ces deux blocs y répétaient le message et
          allongeaient la carte.

          ⚠ Ce qui reste, et qui ne doit PAS disparaître : le troisième
          état dit que le créneau est RETENU, pas réservé, et qu'aucune
          réservation n'est enregistrée. C'est désormais le seul endroit où
          le visiteur l'apprend dans un CTA. Tant que Cal.com n'est pas
          branché, ce texte est la seule chose qui empêche quelqu'un
          d'attendre un appel qui n'existe pas. */}
      {/* ⚠ Affiché dans les DEUX variantes. Il ne l'était pas dans la
          compacte, c'est-à-dire sur la page Contact — la seule où quelqu'un
          vient réellement pour réserver, donc la seule où le malentendu
          coûte quelque chose. */}
      <div className="calendar-demo-notice">
        <Info aria-hidden />
        <span>
          {fr
            ? "Aperçu interactif · dates et horaires fictifs. Aucune réservation n’est effectuée."
            : "Interactive preview · illustrative dates and times. No booking is made."}
        </span>
      </div>

      <div className="calendar-demo-body">
        {/* La scène, de hauteur fixe. Les trois états s'y succèdent sans
            jamais déplacer ce qui suit dans la page. La clé force le
            remontage, donc l'animation d'entrée rejoue à chaque passage. */}
        <div className="calendar-stage" aria-live="polite">
          {step === "calendar" && (
            <div className="calendar-panel" key="calendar">
              <div className="calendar-demo-month-nav">
                <p className="calendar-demo-label">{monthLabel}</p>
                <div>
                  <button type="button" aria-label={fr ? "Mois précédent de l’aperçu" : "Previous preview month"} onClick={() => changeMonth(-1)}>
                    <ChevronLeft aria-hidden />
                  </button>
                  <button type="button" aria-label={fr ? "Mois suivant de l’aperçu" : "Next preview month"} onClick={() => changeMonth(1)}>
                    <ChevronRight aria-hidden />
                  </button>
                </div>
              </div>

              <div className="calendar-demo-week" aria-hidden>
                {(fr ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className="calendar-demo-days" role="group" aria-label={fr ? "Choisir une date dans l’aperçu" : "Choose a preview date"}>
                {Array.from({ length: blanks }, (_, i) => <span key={`blank-${i}`} />)}
                {Array.from({ length: count }, (_, i) => {
                  const n = i + 1;
                  return (
                    <button
                      type="button"
                      key={n}
                      aria-pressed={day === n}
                      aria-label={`${fr ? "Tester le" : "Preview"} ${n} ${monthLabel}`}
                      onClick={() => pickDay(n)}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "time" && (
            <div className="calendar-panel" key="time">
              <button type="button" className="calendar-back" onClick={restart}>
                <ChevronLeft aria-hidden />{fr ? "Modifier la date" : "Change the date"}
              </button>
              <p className="calendar-demo-label calendar-chosen-day">{dayLabel}</p>

              <div className="calendar-slots" role="group" aria-label={fr ? "Horaires fictifs" : "Illustrative times"}>
                {SLOTS.map((t) => (
                  <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="calendar-panel-foot">
                <button
                  type="button"
                  className="btn btn--primary"
                  disabled={!time}
                  onClick={() => setStep("confirmed")}
                >
                  {fr ? "Tester ce créneau" : "Try this slot"}
                </button>
                <p className="calendar-alt">
                  {fr ? "Aucun de ces horaires ne vous convient ?" : "None of these times work for you?"}{" "}
                  <Link className="go" href={contactHref}>{fr ? "Nous contacter" : "Contact us"}</Link>
                </p>
              </div>
            </div>
          )}

          {step === "confirmed" && (
            <div className="calendar-panel calendar-done" key="confirmed">
              <span className="calendar-done-icon" aria-hidden><CalendarCheck2 /></span>
              {/* Volontairement « retenu » et non « validé » : rien n'est
                  envoyé, aucun email ne part. Voir l'en-tête du fichier. */}
              <h4>{fr ? "Voilà à quoi ressemble la réservation." : "This is what booking looks like."}</h4>
              <p>
                {fr
                  ? "Cet aperçu n’enregistre aucune réservation. Confirmez-le en un message et nous vous renvoyons l’invitation et le lien de visioconférence."
                  : "This preview records no booking. Confirm it in one message and we will send back the invitation and the video link."}
              </p>

              <dl className="calendar-recap">
                <div><dt>{fr ? "Date" : "Date"}</dt><dd>{dayLabel}</dd></div>
                <div><dt>{fr ? "Heure" : "Time"}</dt><dd>{time}</dd></div>
                <div><dt>{fr ? "Durée" : "Duration"}</dt><dd>{fr ? "30 minutes" : "30 minutes"}</dd></div>
                <div><dt>{fr ? "Format" : "Format"}</dt><dd>{fr ? "Visioconférence" : "Video call"}</dd></div>
                <div><dt>{fr ? "Fuseau" : "Time zone"}</dt><dd>Europe/Brussels</dd></div>
              </dl>

              <div className="calendar-panel-foot">
                <Link className="btn btn--primary" href={contactHref}>
                  {fr ? "Confirmer ce créneau" : "Confirm this slot"}
                </Link>
                <button type="button" className="calendar-back" onClick={restart}>
                  <ChevronLeft aria-hidden />{fr ? "Choisir un autre créneau" : "Choose another slot"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isCta && (
        <div className="calendar-demo-footer">
          <span><Clock3 aria-hidden />{fr ? "Pour convenir d’un vrai rendez-vous :" : "To arrange an actual meeting:"}</span>
          <Link className="go" href={contactHref}>
            {fr ? "Nous contacter" : "Contact us"}<ChevronRight aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
