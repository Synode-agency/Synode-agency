"use client";

import { useEffect, useRef, useState } from "react";

/* Le mot change toutes les 2,4 secondes. */
const RYTHME = 2400;

const SANS_MOUVEMENT = "(prefers-reduced-motion: reduce)";

/**
 * L'EN-TÊTE ANIMÉ D'UNE SECTION (25/11/2026, d'après la fiche d'Antonino
 * pour les services, repris pour les réalisations), aligné à gauche :
 *  - une étiquette (« Nos services », « Nos réalisations ») ;
 *  - un titre dont le dernier mot change en boucle : « Conçus pour les »
 *    suivi de « indépendants. », « PME. », « grandes entreprises. », ou
 *    « Ce que nous avons » suivi de « développé. », « connecté. »,
 *    « intégré. », « automatisé. », en serif italique bleu (Castoro, comme
 *    les autres mots en couleur) ;
 *  - trois petits traits qui suivent le mot affiché.
 *
 * Le titre a la taille des titres de section de l'accueil (`refonte.css`).
 *
 * Le mot est dans une fente de largeur fixe : tous les mots, invisibles et
 * superposés, réservent la place du plus large (à l'affichage, et non au
 * nombre de lettres : en anglais, « automated. » est plus large
 * qu'« integrated. »), et les mots visibles sont posés par-dessus. Le
 * début du titre ne bouge donc jamais. Le mot affiché monte et sort par
 * le haut pendant que le suivant arrive par le bas.
 *
 * Entrée, une seule fois, quand l'en-tête arrive à l'écran (aux trois
 * cinquièmes) : l'étiquette apparaît en fondu, le titre en fondu en
 * montant, et la boucle démarre. Elle se met en pause quand la section
 * n'est plus visible.
 *
 * Accessibilité : le titre porte la phrase entière (`aria-label`) ; les
 * mots animés et les traits sont cachés aux lecteurs d'écran. Sans
 * mouvement (`prefers-reduced-motion`), la phrase entière s'affiche, sans
 * boucle (la feuille de style s'en charge).
 */
export function TitreAnime({
  eyebrow,
  prefix,
  rotating,
  full,
  fullEnd,
}: {
  eyebrow: string;
  prefix: string;
  rotating: readonly string[];
  full: string;
  fullEnd: string;
}) {
  const blocRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = rotating.length;

  useEffect(() => {
    const bloc = blocRef.current;
    const section = bloc?.closest("section") ?? bloc;
    if (!bloc || !section) return;
    if (window.matchMedia(SANS_MOUVEMENT).matches) return;

    // En attente de l'entrée (l'étiquette et le titre sont masqués).
    bloc.setAttribute("data-attente", "");
    let entree = false;
    let minuteur = 0;
    const demarrer = () => {
      if (!minuteur) minuteur = window.setInterval(() => setIndex((i) => (i + 1) % total), RYTHME);
    };
    const arreter = () => {
      window.clearInterval(minuteur);
      minuteur = 0;
    };

    // L'entrée : quand l'en-tête lui-même est visible aux trois cinquièmes.
    // (Mesurée sur la section, elle arrivait trop tard sur téléphone, où la
    // section est très haute : le contenu paraissait avant le titre.)
    let visible = false;
    const observateurEntree = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        entree = true;
        bloc.removeAttribute("data-attente");
        observateurEntree.disconnect();
        if (visible) demarrer();
      },
      { threshold: 0.6 },
    );
    // La boucle tourne tant que la section est à l'écran.
    const observateurVue = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (entree && visible) demarrer();
      else arreter();
    });
    observateurEntree.observe(bloc);
    observateurVue.observe(section);
    return () => {
      observateurEntree.disconnect();
      observateurVue.disconnect();
      arreter();
    };
  }, [total]);

  // La place de chaque mot selon l'index : affiché, sorti par le haut, ou
  // en attente en bas.
  const etat = (j: number) => (j === index ? "est-affiche" : j === (index - 1 + total) % total ? "est-sorti" : "en-attente");

  return (
    <div ref={blocRef} className="titre-anime">
      <p className="titre-anime-etiquette">{eyebrow}</p>
      <h2 className="titre-anime-h2" aria-label={full.replace(/\.$/, "")}>
        <span className="titre-anime-boucle" aria-hidden="true">
          <span className="titre-anime-fixe">{prefix}</span>
          <span className="titre-anime-fente">
            {rotating.map((mot) => (
              <span key={mot} className="titre-anime-reserve">
                {mot}
              </span>
            ))}
            {rotating.map((mot, j) => (
              <span key={mot} className={`titre-anime-mot ${etat(j)}`}>
                {mot}
              </span>
            ))}
          </span>
        </span>
        {/* Sans mouvement : la phrase entière, la fin en serif italique bleu. */}
        <span className="titre-anime-statique" aria-hidden="true">
          {full.slice(0, full.length - fullEnd.length)}
          <span className="titre-anime-fin">{fullEnd}</span>
        </span>
      </h2>
      <div className="titre-anime-traits" aria-hidden="true">
        {rotating.map((mot, j) => (
          <span key={mot} className={j === index ? "est-actif" : undefined} />
        ))}
      </div>
    </div>
  );
}
