"use client";

import { useEffect, useState } from "react";
import { useOnScreen } from "@/lib/use-on-screen";
import styles from "./hero-compact.module.css";

/**
 * LA CARD COMPACTE DES HEROS, SUR TÉLÉPHONE.
 *
 * Les visuels de hero du site sont dessinés pour une demi-colonne de
 * bureau : empilements de fenêtres, listes à trois niveaux, maquettes de
 * logiciel. Réduits à 350px de large, ils deviennent illisibles sans rien
 * gagner en information. Cette card les remplace : le même propos, dit avec
 * trois lignes et un rythme.
 *
 * ── Ce qu'elle n'est pas ────────────────────────────────────────────────
 * Elle ne dit RIEN que le visuel de bureau ne dise déjà, et tous ses textes
 * viennent de lui. Ce n'est pas un second contenu à maintenir : si le
 * visuel de bureau change, c'est ici qu'il faut reporter, et nulle part
 * ailleurs.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Décorative : le conteneur porte `aria-hidden`. Ce qu'elle illustre est
 * écrit juste au-dessus, dans le titre et le paragraphe du hero.
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. UNE horloge, gelée hors écran par `useOnScreen`. Une card de hero qui
 *    tourne pendant qu'on lit le bas de la page ne sert personne.
 * 2. `prefers-reduced-motion` n'arme rien : la première ligne reste active,
 *    et la card garde exactement la même hauteur.
 * 3. La hauteur ne dépend PAS de la ligne active. Les trois lignes font la
 *    même taille, seules les couleurs changent, donc la page ne saute pas
 *    toutes les 1,6s.
 * ────────────────────────────────────────────────────────────────────────
 */

/** La ligne active change toutes les 1,6s, comme le prévoit le brief. */
const STEP_MS = 1600;

export type HeroTile = {
  /** Le libellé de la tuile. */
  label: string;
  /** Sa valeur, en gras. */
  value: string;
};

export type HeroRow = {
  /** Le repère de gauche : un numéro, une étape, un jour. */
  num: string;
  /** Le libellé, au centre. */
  label: string;
  /** L'état, à droite. Facultatif. */
  state?: string;
};

export function HeroCompact({
  title,
  status,
  rows,
  tiles,
}: {
  /** Facultatif : deux visuels n'ont aucun titre dans leur contenu, et
   *  inventer un libellé serait ajouter du texte au site. L'en-tête ne
   *  porte alors que l'état. */
  title?: string;
  /** Le mot à droite de l'en-tête, précédé du point vert. */
  status: string;
  /** La variante « lignes ». Exclusive de `tiles`. */
  rows?: readonly HeroRow[];
  /** La variante « tuiles », en deux colonnes. Exclusive de `rows`. */
  tiles?: readonly HeroTile[];
}) {
  const count = rows?.length ?? tiles?.length ?? 0;
  const [root, onScreen] = useOnScreen<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    if (!onScreen) return;
    if (count < 2) return;
    const id = window.setInterval(() => setActive(n => (n + 1) % count), STEP_MS);
    return () => window.clearInterval(id);
  }, [onScreen, count]);

  const on = still ? 0 : active;

  return (
    <div className={styles.card} ref={root} aria-hidden>
      <div className={styles.head}>
        {title && <span className={styles.title}>{title}</span>}
        <span className={styles.status}><i />{status}</span>
      </div>

      {tiles && (
        <div className={styles.tiles}>
          {tiles.map((tile, i) => (
            <span key={tile.label} className={i === on ? `${styles.tile} ${styles.tileOn}` : styles.tile}>
              <em className={styles.tileLabel}>{tile.label}</em>
              <strong className={styles.tileValue}>{tile.value}</strong>
            </span>
          ))}
        </div>
      )}

      {rows && (
      <div className={styles.rows}>
        {rows.map((row, i) => (
          <span key={row.num} className={i === on ? `${styles.row} ${styles.rowOn}` : styles.row}>
            <em className={styles.num}>{row.num}</em>
            <span className={styles.label}>{row.label}</span>
            {row.state && <span className={styles.state}>{row.state}</span>}
          </span>
        ))}
      </div>
      )}
    </div>
  );
}
