"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import m from "./services-page.module.css";

type Carte = {
  title: string;
  text: string;
  detail: string;
  /** La photo (rendue côté serveur), ou rien : un bloc bleu nuit. */
  photo: ReactNode;
};

/**
 * LES CARTES « INCLUS DANS CHAQUE PROJET » (page Services, 28/11/2026,
 * proposition « A » choisie par Antonino sur maquette,
 * `docs/maquettes/inclus-survol.html`).
 *
 * Fermée : la photo, le titre, la phrase courte, et un petit « + » dans
 * un cercle, en haut à droite. Ouverte, au survol de la souris ou au
 * toucher (toute la carte est cliquable) : la carte devient texte, d'un
 * fondu doux (la photo, le titre et la phrase s'effacent ; le titre et
 * deux phrases d'explication apparaissent), prend une teinte bleutée et
 * ses coins s'arrondissent ; le « + » tourne en croix, qui la referme.
 * UNE SEULE CARTE OUVERTE À LA FOIS : en ouvrir une referme l'autre.
 * Au clavier, le bouton « + ».
 */
export function InclusCartes({ items, more, less }: { items: readonly Carte[]; more: string; less: string }) {
  const [ouverte, setOuverte] = useState<number | null>(null);
  const basculer = (i: number) => setOuverte((o) => (o === i ? null : i));

  return (
    /* Au défilement, les cartes montent l'une après l'autre, dans l'ordre,
       quand on les voit, à 150 ms d'écart (`data-rv-groupe`, `data-rv-vue`,
       `data-rv-pas`, voir `scroll-reveal.tsx` ; 28/11/2026, demande
       d'Antonino : « une par une, mais assez rapidement »). */
    <ul className={m.cartes} data-rv-groupe="bottom" data-rv-vue="" data-rv-pas="150">
      {items.map((item, i) => (
        <InclusCarte key={item.title} {...item} ouvert={ouverte === i} onBasculer={() => basculer(i)} more={more} less={less} />
      ))}
    </ul>
  );
}

function InclusCarte({
  title,
  text,
  detail,
  photo,
  ouvert,
  onBasculer,
  more,
  less,
}: Carte & { ouvert: boolean; onBasculer: () => void; more: string; less: string }) {
  const id = useId();

  return (
    <li className={m.carte} data-ouvert={ouvert ? "" : undefined} onClick={onBasculer}>
      <div className={m.photo} aria-hidden="true">
        {photo}
      </div>
      <div className={m.carteTexte}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div id={id} className={m.face}>
        <p className={m.faceTitre} aria-hidden="true">
          {title}
        </p>
        <p className={m.detail}>{detail}</p>
      </div>
      <button
        type="button"
        className={m.plus}
        aria-expanded={ouvert}
        aria-controls={id}
        aria-label={ouvert ? less : more}
        onClick={(e) => {
          e.stopPropagation();
          onBasculer();
        }}
      >
        <Plus aria-hidden />
      </button>
    </li>
  );
}
