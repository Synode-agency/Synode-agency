"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * « APRÈS LA MISE EN SERVICE » : LE PANNEAU DE SUIVI.
 *
 * Un seul panneau pour les six pages services : un bandeau d'état, les
 * quatre volets du suivi, et la note contractuelle en pied. Les quatre
 * volets tournent comme une boucle de contrôle, ce qui est exactement ce
 * que le suivi est : une surveillance continue, pas quatre promesses.
 *
 * Les titres, les descriptions et les statuts arrivent de
 * `service-pages.ts` ; la pastille de paiement récurrent et la note de pied
 * viennent de `content.ts`, où elles sont écrites UNE fois pour tout le
 * site. Rien de tout cela n'est recopié ici.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. Le volet 0 est actif au premier rendu, côté serveur comme côté client :
 *    le tirer au montage provoquerait une différence d'hydratation.
 * 2. Le survol arrête la boucle DÉFINITIVEMENT. Quelqu'un qui pointe un
 *    volet pour le lire ne doit pas le voir changer sous son curseur.
 * ────────────────────────────────────────────────────────────────────────
 *
 * La hauteur du panneau ne bouge jamais : seules la teinte du volet actif,
 * sa barre et son statut changent.
 */

/** Un volet toutes les 2,6s. La barre se remplit sur la même durée : les
 *  deux valeurs doivent rester accordées, l'une est ici et l'autre dans
 *  l'animation CSS `afp-fill`. */
const STEP_MS = 2600;

const COPY = {
  fr: { live: "Suivi actif", cycle: (n: number) => `cycle continu · passage n° ${n}`, idle: "à jour" },
  en: { live: "Support active", cycle: (n: number) => `continuous cycle · pass no. ${n}`, idle: "up to date" },
} as const;

/** Le pouls du bandeau, et la flèche de cycle du pied. Deux tracés, pas une
 *  dépendance d'icônes : ils ne servent qu'ici. */
function Pulse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12h4l3-8 4 16 3-8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cycle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AfterPanel({
  items,
  pill,
  note,
  locale,
}: {
  items: readonly { title: string; text: string; status: string }[];
  pill: string;
  note: string;
  locale: Locale;
}) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [active, setActive] = useState(0);
  const [pass, setPass] = useState(1);
  /* Coupée définitivement au premier survol, et jamais relancée. */
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    if (!auto) return;
    const id = window.setInterval(() => {
      setActive(n => {
        const next = (n + 1) % items.length;
        /* Un tour complet de plus. */
        if (next === 0) setPass(p => p + 1);
        return next;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [auto, items.length]);

  const running = auto && !still;

  /* Deux groupes de deux : c'est ce qui interdit le volet seul sur une ligne
     à la largeur intermédiaire. Un `auto-fit` sur les quatre ne saurait pas
     s'en empêcher. */
  const groups = [items.slice(0, 2), items.slice(2)];

  return (
    <div className="afp">
      {/* ---- 1 · le bandeau d'état ---- */}
      <div className="afp-head">
        <span className="afp-live">
          <span className={running ? "afp-dot is-live" : "afp-dot"} aria-hidden />
          <strong>{c.live}</strong>
          <em>{c.cycle(pass)}</em>
        </span>
        <span className="afp-pill"><Pulse />{pill}</span>
      </div>

      {/* ---- 2 · les quatre volets ---- */}
      <div className="afp-grid">
        {groups.map((group, g) => (
          <div className="afp-group" key={g}>
            {group.map((item, k) => {
              const i = g * 2 + k;
              const on = still ? i === 0 : i === active;
              return (
                <article
                  key={item.title}
                  className={on ? "afp-cell is-on" : "afp-cell"}
                  onMouseEnter={() => { setAuto(false); setActive(i); }}
                >
                  {/* La barre n'est rendue que sur le volet actif, et sa clé
                      change à chaque passage : c'est ce qui relance son
                      remplissage au lieu de la laisser terminée. */}
                  {on && (
                    <i
                      key={running ? `${pass}-${i}` : "held"}
                      className={running ? "afp-bar is-filling" : "afp-bar"}
                      aria-hidden
                    />
                  )}
                  <span className="afp-top">
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <span className={on ? "afp-state is-on" : "afp-state"}>
                      <i aria-hidden />
                      {on ? item.status : c.idle}
                    </span>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        ))}
      </div>

      {/* ---- 3 · la note contractuelle ---- */}
      <div className="afp-foot">
        <Cycle />
        {note}
      </div>
    </div>
  );
}
