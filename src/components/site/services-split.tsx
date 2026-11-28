"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import s from "./services-split.module.css";

export type ServiceBloc = {
  /** L'ancre du bloc (`logiciel`, `ia`…), celle du menu « Services ». */
  anchor: string;
  /** Le nom sur deux lignes, posé sur la photo. */
  name: readonly string[];
  image: string;
  /** Le titre du bloc : le début, puis la fin en Instrument Serif. */
  heading: readonly string[];
  /** Une phrase : pour qui, ce qu'on fait. */
  sentence: string;
  /** Trois livrables, courts. */
  deliverables: readonly string[];
};

/**
 * LES QUATRE SERVICES DE LA PAGE SERVICES, EN RANGÉES ALTERNÉES
 * (28/11/2026, maquette « Page Services 2 » choisie par Antonino ; une
 * photo qui restait à l'écran pendant que les textes défilaient avant,
 * jugée trop difficile à comprendre).
 *
 * Sur ordinateur (dès 1025px), une rangée par service : sa photo, avec son
 * nom posé dessus, d'un côté, ses textes de l'autre ; la photo passe à
 * droite un service sur deux. Rien ne reste fixe au défilement.
 *
 * Sous 1025px, une colonne : la photo au-dessus des textes, comme avant.
 *
 * Chaque bloc (format « A », choisi par Antonino le 27/11/2026) : le titre,
 * une phrase, trois livrables entre de fins filets, le bouton.
 *
 * Au défilement, les rangées montent l'une après l'autre, quand on les
 * voit (`data-rv-groupe`, `data-rv-vue`, voir `scroll-reveal.tsx`) ; la
 * rangée visée par une ancre (`#ia`) n'est jamais masquée.
 */
export function ServicesSplit({ items, button }: { items: readonly ServiceBloc[]; button: string }) {
  const racineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const racine = racineRef.current;
    if (!racine) return;
    // L'ARRIVÉE PAR UNE ANCRE (`/services#ia`, depuis le menu d'une autre
    // page) : le navigateur se place sur le bloc avant que « Notre
    // approche », au-dessus, ait pris sa hauteur (son calage, les polices) ;
    // on se recale sur le bloc une fois la page posée.
    const cible = Array.from(racine.querySelectorAll<HTMLElement>("article")).find(
      (bloc) => `#${bloc.id}` === decodeURIComponent(window.location.hash),
    );
    if (!cible) return;
    let actif = true;
    const recaler = () => cible.scrollIntoView({ behavior: "instant", block: "start" });
    requestAnimationFrame(recaler);
    document.fonts?.ready.then(() => {
      if (actif) requestAnimationFrame(recaler);
    });
    return () => {
      actif = false;
    };
  }, []);

  const deuxLignes = (lignes: readonly string[]) =>
    lignes.map((ligne, i) => (
      <Fragment key={i}>
        {i > 0 ? <br /> : null}
        {ligne}
      </Fragment>
    ));

  return (
    <div ref={racineRef} className={s.rangees} data-rv-groupe="bottom" data-rv-vue="">
      {items.map((item, i) => (
        <article
          key={item.anchor}
          id={item.anchor}
          className={s.rangee}
          data-inverse={i % 2 === 1 ? "" : undefined}
        >
          {/* La photo du service, avec son nom posé dessus (décorative :
              le titre du bloc le dit déjà). */}
          <div className={s.photoBloc} aria-hidden="true">
            <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 92vw, 46vw" />
            <p className={s.nomBloc}>{deuxLignes(item.name)}</p>
          </div>
          <div className={s.texteBloc}>
            <h3 className={s.titre}>
              {item.heading[0]}
              <em>{item.heading[1]}</em>
            </h3>
            {/* Un `\n` dans la phrase : un retour à la ligne voulu, dès
                641px ; sur téléphone, la phrase s'enchaîne (une espace). */}
            <p className={s.phrase}>
              {item.sentence.split("\n").map((morceau, j) => (
                <Fragment key={j}>
                  {j > 0 ? (
                    <>
                      {" "}
                      <br className={s.retour} />
                    </>
                  ) : null}
                  {morceau}
                </Fragment>
              ))}
            </p>
            <ul className={s.livrables}>
              {item.deliverables.map((livrable) => (
                <li key={livrable}>{livrable}</li>
              ))}
            </ul>
            {/* TODO(pages des services) : mener à la page du service quand
                elle existera (/services/developpement-logiciel,
                /services/ia-automatisation,
                /services/integrations-systemes-connectes,
                /services/site-web-applications-mobiles). D'ici là, l'ancre
                du bloc. ⚠ La redirection `/services/:slug` de
                `next.config.ts` devra alors laisser passer ces adresses. */}
            <Link className={`btn ${s.bouton}`} href={`#${item.anchor}`}>
              <span className="btn-lib">
                {button}
                <ArrowRight aria-hidden />
              </span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
