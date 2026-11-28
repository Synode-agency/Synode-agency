"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import m from "./services-page.module.css";

/**
 * UNE CARTE « INCLUS DANS CHAQUE PROJET » (page Services, 28/11/2026,
 * proposition « A » choisie par Antonino sur maquette,
 * `docs/maquettes/inclus-survol.html`).
 *
 * Fermée : la photo, le titre, la phrase courte, et un petit bouton « Voir
 * plus ». Ouverte, au survol de la souris ou au toucher (téléphone) : la
 * carte devient texte, d'un fondu doux (la photo, le titre et la phrase
 * s'effacent ; le titre et deux phrases d'explication apparaissent), prend
 * une teinte bleutée et ses coins s'arrondissent. Le bouton dit alors
 * « Voir moins ». Toucher la carte (ou le bouton) l'ouvre et la referme ;
 * au clavier, le bouton.
 */
export function InclusCarte({
  title,
  text,
  detail,
  photo,
  more,
  less,
}: {
  title: string;
  text: string;
  detail: string;
  /** La photo (rendue côté serveur), ou rien : un bloc bleu nuit. */
  photo: ReactNode;
  more: string;
  less: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const id = useId();
  const basculer = () => setOuvert((o) => !o);

  return (
    <li className={m.carte} data-ouvert={ouvert ? "" : undefined} onClick={basculer}>
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
        className={m.voirPlus}
        aria-expanded={ouvert}
        aria-controls={id}
        onClick={(e) => {
          e.stopPropagation();
          basculer();
        }}
      >
        <span className={m.voirPlusLib}>{more}</span>
        <span className={m.voirMoinsLib}>{less}</span>
        <Plus aria-hidden />
      </button>
    </li>
  );
}
