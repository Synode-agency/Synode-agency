import Image from "next/image";
import { Fragment, type ComponentType, type SVGProps } from "react";
import {
  Bell,
  CalendarCheck,
  Clock,
  CreditCard,
  Folder,
  Mail,
  Send,
  Users,
} from "lucide-react";
import { CalendarIcon, FileIcon } from "@/components/site/icons";
import type { getContent } from "@/lib/content";

/* Le jeu mélange des glyphes lucide et les icônes dessinées du dossier
   `public/svg-icons`, qui n'ont pas le même type. Le dénominateur commun est
   un composant SVG. */
type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

type System = ReturnType<typeof getContent>["home"]["hero"]["systems"][number];

/**
 * Le mock du logiciel, au centre du hero.
 *
 * Il ne prétend pas être une application qui tourne : il montre la forme de
 * ce que l'agence livre. Entièrement décoratif, donc masqué aux
 * technologies d'assistance — rien ici n'est un lien ni une commande, et
 * aucun des noms, montants ou dates qui s'y affichent ne désigne un client
 * réel. Ils ne doivent jamais être repris ailleurs sur le site.
 *
 * ── Deux présentations ──────────────────────────────────────────────────
 * Le premier écran est un TABLEAU : trois colonnes, trois dossiers qui
 * avancent de l'une à l'autre. Les deux suivants sont des FLUX : trois
 * étapes en cercles reliés, un journal et une fiche. C'est ce contraste
 * qui évite que la pile ne montre trois fois la même chose.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Un point à ne pas défaire ───────────────────────────────────────────
 * Tout est animé en CSS, rien en JavaScript. Les animations sont en pause
 * par défaut et `.hero-system[data-play="true"]` les relâche : seule la
 * carte au-dessus de la pile s'anime, les deux autres restent figées sur
 * leur première image. Un timer JS ne saurait pas faire ça sans connaître
 * l'état du carrousel.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Toutes les dimensions sont en `em` contre une taille de police exprimée en
 * unités de conteneur, donc le panneau entier s'échelonne d'un bloc avec le
 * plateau au lieu de se recomposer à chaque point de rupture. Dans ce
 * fichier et dans son CSS, 1em vaut 10px à la taille de référence du cadre.
 */

const NAV_ICONS: Glyph[][] = [
  [Mail, FileIcon, CalendarIcon, Folder],
  [Clock, Send, CreditCard, Users],
  [CalendarIcon, Mail, Clock, Bell],
];

const STEP_ICONS: Glyph[][] = [
  [Mail, FileIcon, Bell],
  [FileIcon, Send, CreditCard],
  [CalendarIcon, CalendarCheck, Bell],
];

/** Les deux dossiers du tableau. Des noms inventés, voir l'en-tête. */
const FOLDERS = {
  fr: [
    ["Marie L. · Devis toiture", "e-mail"],
    ["Atelier Brun · Tarifs", "formulaire"],
  ],
  en: [
    ["Marie L. · Roofing quote", "email"],
    ["Atelier Brun · Pricing", "form"],
  ],
} as const;

/** Les journaux des deux écrans en flux, et la fiche qui les accompagne. */
const FLOW = {
  fr: [
    {
      log: [
        ["J+1", "Échéance dépassée, retard détecté"],
        ["J+2", "Relance personnalisée envoyée"],
        ["J+6", "Paiement reçu et rapproché"],
      ],
      pills: ["Échue", "Relancée", "Payée"],
      ref: "facture F-2026-118",
      who: "Dumont SRL",
      amount: "1 240 €",
    },
    {
      log: [
        ["lun. 16:40", "Créneau mardi 10:00 choisi en ligne"],
        ["lun. 16:41", "Disponibilités vérifiées, RDV confirmé"],
        ["lun. 18:00", "Rappel SMS envoyé la veille"],
      ],
      pills: ["Créneau choisi", "Confirmé", "Rappel envoyé"],
      week: "semaine 42",
      days: "L M M J",
    },
  ],
  en: [
    {
      log: [
        ["D+1", "Due date passed, delay detected"],
        ["D+2", "Personalised reminder sent"],
        ["D+6", "Payment received and reconciled"],
      ],
      pills: ["Overdue", "Reminded", "Paid"],
      ref: "invoice F-2026-118",
      who: "Dumont SRL",
      amount: "€1,240",
    },
    {
      log: [
        ["Mon 16:40", "Tuesday 10:00 slot chosen online"],
        ["Mon 16:41", "Availability checked, meeting confirmed"],
        ["Mon 18:00", "SMS reminder sent the day before"],
      ],
      pills: ["Slot chosen", "Confirmed", "Reminder sent"],
      week: "week 42",
      days: "M T W T",
    },
  ],
} as const;

/** Les huit cases du mini-calendrier, sur deux lignes. `true` = déjà occupée. */
const CAL = [
  false, false, true, false,
  true, false, false, true,
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroAppMock({
  system,
  index,
  locale,
}: {
  system: System;
  index: number;
  locale: "fr" | "en";
}) {
  const fr = locale === "fr";
  const navIcons = NAV_ICONS[index] ?? NAV_ICONS[0];
  const stepIcons = STEP_ICONS[index] ?? STEP_ICONS[0];
  const gradientId = `hero-gain-${system.id}`;
  const folders = FOLDERS[fr ? "fr" : "en"];
  const flow = FLOW[fr ? "fr" : "en"][index - 1];

  return (
    <div aria-hidden className="hero-app">
      {/* Le curseur. Il entre par le bas, monte jusqu'à la première entrée
          de menu, clique, puis s'efface. C'est lui qui ouvre la séquence. */}
      <span className="hero-app-cursor">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.5 3.2 19 12.4l-5.6.7 3 5.9-2.4 1.2-3-6-3.5 3.9z" />
        </svg>
      </span>

      <aside className="hero-app-side">
        <div className="hero-app-brand">
          <Image src="/synode-mark.png" alt="" width={48} height={48} />
          <span>{system.appName}</span>
        </div>

        <nav className="hero-app-nav">
          {system.nav.map((label, i) => {
            const Glyph = navIcons[i];
            return (
              <span key={label} className={i === 0 ? "hero-app-nav-row is-active" : "hero-app-nav-row"}>
                {Glyph && <Glyph />}
                <i>{label}</i>
              </span>
            );
          })}
        </nav>
      </aside>

      <div className="hero-app-main">
        <div className="hero-app-head">
          <p className="hero-app-title">
            {system.title.split("\n").map((line, i, all) => (
              <Fragment key={i}>
                {line}
                {i < all.length - 1 && <br />}
              </Fragment>
            ))}
          </p>
          <span className="hero-app-status">
            <i />
            {system.badge}
          </span>
        </div>

        {index === 0 ? (
          /* ---------------- Écran 1 : le tableau ---------------- */
          <>
            <div className="hero-board">
              {system.steps.map((step, col) => (
                <div className="hero-board-col" key={step} style={{ "--col": col } as React.CSSProperties}>
                  <div className="hero-board-colhead">
                    <span>{col + 1}. {step}</span>
                    {/* Deux chiffres superposés, croisés en fondu au rythme
                        du cycle : un compteur CSS ne s'anime pas. */}
                    <em className="hero-board-count"><b>0</b><b>2</b></em>
                  </div>
                </div>
              ))}

              {/* Les dossiers sont posés en absolu au-dessus des colonnes :
                  ils traversent le tableau sans appartenir à aucune. */}
              {folders.map(([name, source], i) => (
                <span className="hero-board-card" key={name} style={{ "--i": i } as React.CSSProperties}>
                  <b>{name}</b>
                  <i><s />{source}</i>
                </span>
              ))}
            </div>

            <div className="hero-app-card hero-board-metric">
              <span>
                <b>{system.gainLabel}</b>
                <strong>{system.gainValue}</strong>
              </span>
              <span className="hero-app-chart">
                <svg viewBox="0 0 120 44" fill="none" preserveAspectRatio="none">
                  <path className="hero-app-chart-area" d="M0 36C14 36 20 30 32 27s16 4 28 1 18-16 34-20 26-4 26-4V44H0z" fill={`url(#${gradientId})`} />
                  <path className="hero-app-chart-line" d="M0 36c14 0 20-6 32-9s16 4 28 1 18-16 34-20 26-4 26-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
          </>
        ) : (
          /* ---------------- Écrans 2 et 3 : le flux ---------------- */
          <>
            <div className="hero-flow">
              {system.steps.map((label, i) => {
                const Glyph = stepIcons[i];
                return (
                  <Fragment key={label}>
                    {i > 0 && <span className="hero-flow-bar" style={{ "--b": i - 1 } as React.CSSProperties} />}
                    <span className="hero-flow-step" style={{ "--s": i } as React.CSSProperties}>
                      <span className="hero-flow-disc">
                        {Glyph && <Glyph />}
                        <span className="hero-flow-check"><Check /></span>
                      </span>
                      <span className="hero-flow-label"><b>{i + 1}.</b> {label}</span>
                    </span>
                  </Fragment>
                );
              })}
            </div>

            <div className="hero-app-bottom">
              <div className="hero-app-card hero-log">
                {flow.log.map(([time, text], i) => (
                  <span className="hero-log-row" key={text} style={{ "--l": i } as React.CSSProperties}>
                    <i />
                    <em>{time}</em>
                    <b>{text}</b>
                  </span>
                ))}
              </div>

              <div className="hero-app-card hero-sheet">
                {index === 1 ? (
                  <>
                    <em className="hero-sheet-ref">{"ref" in flow ? flow.ref : ""}</em>
                    <span className="hero-sheet-who">{"who" in flow ? flow.who : ""}</span>
                    <strong className="hero-sheet-amount">{"amount" in flow ? flow.amount : ""}</strong>
                  </>
                ) : (
                  <>
                    <span className="hero-cal-head">
                      <em>{"week" in flow ? flow.week : ""}</em>
                      <em>{"days" in flow ? flow.days : ""}</em>
                    </span>
                    <span className="hero-cal-grid">
                      {CAL.map((busy, i) => (
                        <i key={i} className={i === 1 ? "is-slot" : busy ? "is-busy" : undefined}>
                          {i === 1 && <Check />}
                        </i>
                      ))}
                    </span>
                  </>
                )}

                {/* Les trois états du dossier, croisés en fondu au rythme
                    des étapes : la pastille dit toujours où en est le flux. */}
                <span className="hero-sheet-pills">
                  {flow.pills.map((pill, i) => (
                    <b key={pill} style={{ "--p": i } as React.CSSProperties}>{pill}</b>
                  ))}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
