"use client";

import { useEffect, useState } from "react";
import { useOnScreen } from "@/lib/use-on-screen";
import styles from "./compact-panel.module.css";

/**
 * LE PANNEAU COMPACT, SUR FOND CLAIR.
 *
 * Le pendant de `HeroCompact` pour les sections claires. Les deux font le
 * même travail — remplacer sur téléphone un visuel dessiné pour une
 * demi-colonne de bureau — et ils sont séparés pour une seule raison :
 * `HeroCompact` est réglé pour le bleu nuit et ne doit pas servir ailleurs,
 * c'est écrit dans sa feuille. Celui-ci vit sur les bandes claires.
 *
 * ── Ce qu'il n'est pas ──────────────────────────────────────────────────
 * Il ne dit RIEN que le visuel de bureau ne dise déjà, et toutes ses
 * chaînes viennent du `COPY` de ce visuel. Ce n'est pas un second contenu à
 * maintenir : si le visuel change, c'est au même endroit que ça se corrige.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Décoratif : le conteneur porte `aria-hidden`. Ce qu'il illustre est écrit
 * juste à côté, dans le titre et le paragraphe de la section, et le visuel
 * de bureau garde son `aria-label` pour les écrans qui l'affichent.
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. UNE horloge, gelée hors écran par `useOnScreen`. Un panneau qui tourne
 *    pendant qu'on lit le bas de la page ne sert personne.
 * 2. `prefers-reduced-motion` n'arme rien : la première ligne reste active,
 *    et le panneau garde exactement la même hauteur.
 * 3. La hauteur ne dépend PAS de la ligne active. Toutes les lignes font la
 *    même taille, seules les couleurs changent, donc la page ne saute pas.
 * ────────────────────────────────────────────────────────────────────────
 */

/** Même cadence que `HeroCompact` : les deux cohabitent sur le même site. */
const STEP_MS = 1600;

export type PanelRow = {
  /** Le repère de gauche. Facultatif : certaines listes n'en ont pas. */
  num?: string;
  /** Le libellé, au centre. */
  label: string;
  /** L'état, à droite. Facultatif. */
  state?: string;
  /** Marque la ligne assistée par l'IA : repère et libellé passent au bleu,
   *  même au repos. C'est une propriété de la ligne, pas un état. */
  ai?: true;
};

export function CompactPanel({
  head,
  chip,
  rows,
  foot,
}: {
  /** Le titre du bandeau, à gauche. */
  head: string;
  /** Le mot à droite du bandeau. Facultatif. */
  chip?: string;
  rows: readonly PanelRow[];
  /** La ligne de pied. Facultative. */
  foot?: string;
}) {
  const [root, onScreen] = useOnScreen<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    if (!onScreen) return;
    if (rows.length < 2) return;
    const id = window.setInterval(() => setActive(n => (n + 1) % rows.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [onScreen, rows.length]);

  const on = still ? 0 : active;

  return (
    <div className={styles.panel} ref={root} aria-hidden>
      <div className={styles.head}>
        <span className={styles.headText}>{head}</span>
        {chip && <em className={styles.chip}>{chip}</em>}
      </div>

      <div className={styles.rows}>
        {rows.map((row, i) => (
          <span
            key={row.label}
            className={[styles.row, i === on ? styles.rowOn : "", row.ai ? styles.rowAi : ""].filter(Boolean).join(" ")}
          >
            {row.num && <em className={styles.num}>{row.num}</em>}
            <span className={styles.label}>{row.label}</span>
            {row.state && <span className={styles.state}>{row.state}</span>}
          </span>
        ))}
      </div>

      {foot && <div className={styles.foot}>{foot}</div>}
    </div>
  );
}
