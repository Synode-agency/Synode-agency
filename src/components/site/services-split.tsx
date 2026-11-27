"use client";

import { Fragment, useEffect, useRef, useState } from "react";
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

/* Un service devient actif quand le haut de son bloc passe au-dessus de
   55 % de la hauteur de l'écran. */
const SEUIL = 0.55;

/**
 * LES QUATRE SERVICES DE LA PAGE SERVICES (27/11/2026, fiche d'Antonino).
 *
 * Sur ordinateur (dès 1025px), deux colonnes sur la grille de 12 : à
 * gauche, une boîte photo qui reste à l'écran (`sticky`) ; à droite, les
 * quatre blocs. Le service actif (le dernier bloc dont le haut a passé
 * 55 % de l'écran) choisit la photo (fondu et léger zoom arrière), le nom
 * posé dessus, le trait allongé sous la boîte, et éclaire son bloc ; les
 * autres restent à demi éteints.
 *
 * Sous 1025px, une colonne : chaque bloc porte sa propre photo, au-dessus
 * de son titre, sans boîte fixe ni bloc éteint.
 *
 * Chaque bloc (format « A », choisi par Antonino le 27/11/2026) : le titre,
 * une phrase, trois livrables entre de fins filets, le bouton.
 *
 * Sans script, tout est lisible : le premier service est actif, les blocs
 * restent pleins (`data-pret` n'est posé que par le script). Sans
 * mouvement (`prefers-reduced-motion`), rien ne glisse ni ne s'éteint.
 */
export function ServicesSplit({ items, button }: { items: readonly ServiceBloc[]; button: string }) {
  const racineRef = useRef<HTMLDivElement>(null);
  const [actif, setActif] = useState(0);

  useEffect(() => {
    const racine = racineRef.current;
    if (!racine) return;
    const blocs = Array.from(racine.querySelectorAll<HTMLElement>("article"));
    racine.setAttribute("data-pret", "");
    let raf = 0;
    const mesure = () => {
      raf = 0;
      const limite = window.innerHeight * SEUIL;
      let n = 0;
      blocs.forEach((bloc, i) => {
        if (bloc.getBoundingClientRect().top < limite) n = i;
      });
      setActif(n);
    };
    const demander = () => {
      if (!raf) raf = requestAnimationFrame(mesure);
    };
    mesure();
    // L'ARRIVÉE PAR UNE ANCRE (`/services#ia`, depuis le menu d'une autre
    // page) : le navigateur se place sur le bloc avant que « Notre
    // approche », au-dessus, ait pris sa hauteur (son calage, les polices) ;
    // on se recale sur le bloc une fois la page posée.
    const cible = blocs.find((bloc) => `#${bloc.id}` === decodeURIComponent(window.location.hash));
    const recaler = () => cible?.scrollIntoView({ behavior: "instant", block: "start" });
    let actifRecalage = Boolean(cible);
    if (cible) {
      requestAnimationFrame(recaler);
      document.fonts?.ready.then(() => {
        if (actifRecalage) requestAnimationFrame(recaler);
      });
    }
    window.addEventListener("scroll", demander, { passive: true });
    window.addEventListener("resize", demander);
    return () => {
      actifRecalage = false;
      window.removeEventListener("scroll", demander);
      window.removeEventListener("resize", demander);
      cancelAnimationFrame(raf);
      racine.removeAttribute("data-pret");
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
    /* `data-rv-fixe` : pas d'apparition au défilement (`ScrollReveal`) ;
       le bloc a la sienne (la photo, les blocs qui s'éclairent), et un
       glissement décalait l'arrivée par une ancre. */
    <div ref={racineRef} className={s.split} data-rv-fixe="">
      {/* La boîte qui reste à l'écran (ordinateur), décorative : chaque
          bloc porte déjà son titre. */}
      <div className={s.visuel} aria-hidden="true">
        <div className={s.boite}>
          {items.map((item, i) => (
            <Image
              key={item.anchor}
              className={s.photo}
              data-actif={i === actif ? "" : undefined}
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1025px) 42vw, 1px"
            />
          ))}
          <div className={s.noms}>
            {items.map((item, i) => (
              <p key={item.anchor} className={s.nom} data-actif={i === actif ? "" : undefined}>
                {deuxLignes(item.name)}
              </p>
            ))}
          </div>
        </div>
        <div className={s.traits}>
          {items.map((item, i) => (
            <span key={item.anchor} data-actif={i === actif ? "" : undefined} />
          ))}
        </div>
      </div>

      <div className={s.blocs}>
        {items.map((item, i) => (
          <article key={item.anchor} id={item.anchor} className={s.bloc} data-actif={i === actif ? "" : undefined}>
            {/* Téléphone et tablette : la photo du bloc, au-dessus de son
                titre, avec le nom posé dessus (décorative). */}
            <div className={s.photoBloc} aria-hidden="true">
              <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 92vw, 1px" />
              <p className={s.nomBloc}>{deuxLignes(item.name)}</p>
            </div>
            <h3 className={s.titre}>
              {item.heading[0]}
              <em>{item.heading[1]}</em>
            </h3>
            {/* Un `\n` dans la phrase : un retour à la ligne voulu, dès
                641px ; sur téléphone, la phrase s'enchaîne (une espace). */}
            <p className={s.phrase}>
              {item.sentence.split("\n").map((morceau, i) => (
                <Fragment key={i}>
                  {i > 0 ? (
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
          </article>
        ))}
      </div>
    </div>
  );
}
