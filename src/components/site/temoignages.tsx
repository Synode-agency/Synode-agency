"use client";

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as EvenementPointeur,
} from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Hand, HandGrab } from "lucide-react";
import { cx } from "@/lib/cx";
import { renderLines } from "@/lib/lines";
import s from "./temoignages.module.css";

type Temoignage = {
  texte: string;
  /** Le passage du texte en Castoro italique bleu. */
  cle: string;
  nom: string;
  poste: string;
  entreprise: string;
  /** `couleur` : le logo d'origine, en couleur, affiché tel quel (sinon,
   *  une silhouette blanche, passée en noir sur le blanc). */
  logo: { src: string; width: number; height: number; hauteur: number; couleur?: boolean };
};

/* Un mot de la citation : en Castoro ou non, précédé d'une espace ou non
   (« endroit » et le point qui le suit restent collés). */
type Mot = { texte: string; cle: boolean; espace: boolean };

/* Un nouvel avis toutes les 2,7 secondes, comptées depuis le début du
   balayage (4 s auparavant, jugées trop longues par Antonino le
   26/11/2026). Le balayage dure 1,2 s : l'avis reste immobile 1,5 s. */
const DUREE = 2700;
/* Le balayage (maquette « 8 · Les lignes en balayage », choisie le
   26/11/2026) : chaque ligne traverse l'écran en 820 ms, 70 ms après celle
   du dessus ; les lignes du nouvel avis partent 140 ms après. Courbe des
   mouvements à l'écran (lent, rapide, lent). */
const GLISSE = 820;
const DECALAGE = 70;
const ENTREE = 140;
const COURBE = "cubic-bezier(0.77, 0, 0.175, 1)";
/* Après un geste : la suite part de là où le doigt l'a laissée. */
const SORTIE = "cubic-bezier(0.23, 1, 0.32, 1)";
/* Le geste : au-delà de 90 px (ou d'un mouvement vif), l'avis change. Les
   lignes suivent le doigt, chacune un peu moins que celle du dessus. */
const SEUIL = 90;
const VIF = 0.6;
const VAGUE = 0.1;

/* Sans mouvement (`prefers-reduced-motion`) : lu sans état ni effet, et
   `false` côté serveur. */
const SANS_MOUVEMENT = "(prefers-reduced-motion: reduce)";
const suivreMouvement = (rappel: () => void) => {
  const requete = window.matchMedia(SANS_MOUVEMENT);
  requete.addEventListener("change", rappel);
  return () => requete.removeEventListener("change", rappel);
};
const lireMouvement = () => window.matchMedia(SANS_MOUVEMENT).matches;

/* Les mots d'un avis, le passage clé repéré (choix « B » d'Antonino sur
   maquettes, le 26/11/2026, à la place du guillemet). */
function decouper(texte: string, cle: string): Mot[] {
  const at = cle ? texte.indexOf(cle) : -1;
  const segments: [string, boolean][] =
    at === -1
      ? [[texte, false]]
      : [
          [texte.slice(0, at), false],
          [cle, true],
          [texte.slice(at + cle.length), false],
        ];
  const mots: Mot[] = [];
  let espace = false;
  for (const [segment, estCle] of segments) {
    segment.split(" ").forEach((morceau, k) => {
      if (k > 0) espace = true;
      if (!morceau) return;
      mots.push({ texte: morceau, cle: estCle, espace: mots.length > 0 && espace });
      espace = false;
    });
  }
  return mots;
}

/* Le rang du premier mot de chaque ligne, d'après la position des mots à
   l'écran (le Castoro et Manrope n'ont pas la même hauteur : deux mots
   d'une même ligne restent à moins d'une demi-ligne l'un de l'autre). */
function debutsDeLignes(figure: HTMLElement | null): number[] | null {
  const p = figure?.querySelector("blockquote p");
  if (!p) return null;
  const demiLigne = parseFloat(getComputedStyle(p).fontSize) * 0.65;
  const debuts: number[] = [];
  let milieu: number | null = null;
  p.querySelectorAll<HTMLElement>("[data-mot]").forEach((mot, i) => {
    const r = mot.getBoundingClientRect();
    const c = r.top + r.height / 2;
    if (milieu === null || Math.abs(c - milieu) > demiLigne) {
      debuts.push(i);
      milieu = c;
    }
  });
  return debuts;
}

/* Ce qui glisse dans un avis : ses lignes (une fois découpées, sinon la
   citation entière), puis la légende. */
function pieces(figure: HTMLElement | null | undefined): HTMLElement[] {
  if (!figure) return [];
  const lignes = Array.from(figure.querySelectorAll<HTMLElement>("[data-ligne]"));
  const citation = figure.querySelector<HTMLElement>("blockquote");
  const legende = figure.querySelector<HTMLElement>("figcaption");
  return [...(lignes.length ? lignes : citation ? [citation] : []), ...(legende ? [legende] : [])];
}
/* La position laissée par le doigt sur une pièce, puis le ménage. */
const lireTire = (el: HTMLElement) => parseFloat(el.dataset.tire ?? "0") || 0;
function placer(el: HTMLElement, x: number, visible = false) {
  el.style.transform = `translateX(${x}px)`;
  if (visible) el.style.visibility = "visible";
  el.dataset.tire = String(x);
}
function relacher(el: HTMLElement) {
  el.style.transform = "";
  el.style.visibility = "";
  delete el.dataset.tire;
  delete el.dataset.base;
}

/**
 * LES TÉMOIGNAGES DE L'ACCUEIL (25/11/2026, maquette « T1 » choisie par
 * Antonino), sous « Notre méthode ». En slider le 26/11/2026, puis dans le
 * design « 8 · Les lignes en balayage » choisi sur maquettes le même jour.
 *
 * La citation tout à gauche, sur 4 lignes, son passage clé en Castoro bleu ;
 * dessous, le logo de l'entreprise, le nom, la fonction et l'entreprise du
 * client ; tout en bas, une petite main qui montre qu'on peut attraper
 * l'avis, le compteur et les flèches. Sous le titre, les petits traits des
 * titres animés (`titre-anime-traits`) suivent l'avis affiché.
 *
 * Toutes les 2,7 secondes, les lignes de l'avis partent vers la gauche l'une
 * après l'autre, et celles du suivant arrivent de la droite. Les flèches
 * font de même (la flèche de gauche dans l'autre sens) ; le défilement
 * continue ensuite. Pas de bouton pause (choix d'Antonino).
 *
 * LE GESTE (demande d'Antonino du 26/11/2026 : « lorsque je balaye, que ce
 * soit vers la gauche ou la droite, l'un apparaît et l'autre s'en va ») :
 * on attrape l'avis à la souris ou au doigt ; ses lignes suivent en vague,
 * et l'avis voisin entre déjà par le bord opposé (le suivant par la droite,
 * le précédent par la gauche). Au lâcher, au-delà de 90 px ou d'un geste
 * vif, l'un finit de partir et l'autre d'arriver ; sinon, tout revient en
 * place. Un geste pendant un balayage le termine d'abord : rien ne reste
 * bloqué à mi-chemin.
 *
 * Les lignes sont découpées après l'affichage, d'après la position des
 * mots (rendu serveur : la citation d'un bloc, identique à l'œil), puis de
 * nouveau quand les polices arrivent ou que la largeur change. Les avis
 * sont empilés dans la même case : la zone garde la hauteur du plus long.
 *
 * Le défilement attend le temps d'une lecture : la souris sur l'avis, le
 * focus du clavier sur les flèches, le geste en cours, ou l'avis hors de
 * l'écran.
 *
 * Accessibilité : pendant le défilement, les changements ne sont pas
 * annoncés ; à l'arrêt, l'avis choisi l'est (`aria-live`). Les avis cachés
 * le sont aussi aux lecteurs d'écran ; le logo et la petite main sont
 * décoratifs. Sans mouvement : ni défilement, ni geste, ni main ; les
 * flèches changent l'avis par un simple fondu.
 */
export function Temoignages({
  titre,
  accent,
  items,
  precedent,
  suivant,
  indice,
}: {
  titre: string;
  /** Le mot du titre en Castoro italique bleu. */
  accent: string;
  items: readonly Temoignage[];
  precedent: string;
  suivant: string;
  /** Le petit mot qui suit le geste de la main animée (« Glissez »). */
  indice: string;
}) {
  const total = items.length;
  /* L'avis affiché, celui qui vient de partir, le sens (1 : vers la
     gauche, l'avis suivant ; -1 : vers la droite) et l'origine (un geste :
     tout repart de là où le doigt l'a laissé). */
  const [{ index, sortant, sens, geste }, setEtat] = useState({ index: 0, sortant: -1, sens: 1, geste: false });
  /* Les pauses le temps d'une lecture. */
  const [survol, setSurvol] = useState(false);
  const [clavier, setClavier] = useState(false);
  const [tenu, setTenu] = useState(false);
  /* À l'écran, à moitié au moins. */
  const [vu, setVu] = useState(false);
  /* Le premier mot de chaque ligne, avis par avis (null : pas encore
     découpées). */
  const [lignes, setLignes] = useState<(number[] | null)[] | null>(null);
  const reduit = useSyncExternalStore(suivreMouvement, lireMouvement, () => false);

  const motsParAvis = useMemo(() => items.map((avis) => decouper(avis.texte, avis.cle)), [items]);
  const carrouselRef = useRef<HTMLDivElement>(null);
  const diapos = useRef<(HTMLElement | null)[]>([]);
  const indexRef = useRef(0);
  const prise = useRef<{ x0: number; dx: number; t: number; v: number; voisin: number } | null>(null);

  const tourne = total > 1 && vu && !survol && !clavier && !tenu && !reduit;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const carrousel = carrouselRef.current;
    if (!carrousel) return;
    const observateur = new IntersectionObserver(([e]) => setVu(e.isIntersecting), { threshold: 0.5 });
    observateur.observe(carrousel);
    return () => observateur.disconnect();
  }, []);

  /* Le minuteur repart de zéro à chaque nouvel avis (flèches et gestes
     compris) et à chaque reprise. */
  useEffect(() => {
    if (!tourne) return;
    const minuteur = window.setTimeout(
      () => setEtat((e) => ({ index: (e.index + 1) % total, sortant: e.index, sens: 1, geste: false })),
      DUREE,
    );
    return () => window.clearTimeout(minuteur);
  }, [tourne, index, total]);

  /* Le découpage en lignes : sur la citation d'un bloc (lignes à null),
     à l'image suivante ; de nouveau quand les polices arrivent ou que la
     largeur change. */
  useEffect(() => {
    if (lignes !== null) return;
    const image = requestAnimationFrame(() => setLignes(diapos.current.map(debutsDeLignes)));
    return () => cancelAnimationFrame(image);
  }, [lignes]);
  useEffect(() => {
    const carrousel = carrouselRef.current;
    if (!carrousel) return;
    let largeur = carrousel.getBoundingClientRect().width;
    const observateur = new ResizeObserver(([e]) => {
      if (Math.abs(e.contentRect.width - largeur) < 1) return;
      largeur = e.contentRect.width;
      setLignes(null);
    });
    observateur.observe(carrousel);
    let actif = true;
    document.fonts?.ready.then(() => {
      if (actif) setLignes(null);
    });
    return () => {
      actif = false;
      observateur.disconnect();
    };
  }, []);

  /* Le balayage, lancé avant l'affichage de l'image : les lignes de l'avis
     qui part sortent l'une après l'autre, celles du nouveau entrent de
     l'autre côté. Après un geste, tout repart de là où le doigt l'a
     laissé, sans attendre. */
  useLayoutEffect(() => {
    if (sortant < 0 || sortant === index) return;
    const partant = pieces(diapos.current[sortant]);
    const entrant = pieces(diapos.current[index]);
    for (const el of [...partant, ...entrant]) for (const a of el.getAnimations()) a.cancel();
    if (reduit) {
      for (const el of [...partant, ...entrant]) relacher(el);
      for (const el of entrant) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease" });
      return;
    }
    const d = window.innerWidth;
    partant.forEach((el, i) => {
      const depart = lireTire(el);
      relacher(el);
      el.animate(
        [
          { transform: `translateX(${depart}px)`, visibility: "visible" },
          { transform: `translateX(${-sens * d}px)`, visibility: "visible" },
        ],
        { duration: GLISSE, easing: geste ? SORTIE : COURBE, delay: geste ? 0 : i * DECALAGE, fill: "backwards" },
      );
    });
    entrant.forEach((el, i) => {
      const depart = geste && el.dataset.tire ? lireTire(el) : sens * d;
      relacher(el);
      el.animate(
        [
          { transform: `translateX(${depart}px)`, visibility: "visible" },
          { transform: "translateX(0)", visibility: "visible" },
        ],
        {
          duration: GLISSE,
          easing: geste ? SORTIE : COURBE,
          delay: geste ? i * 30 : ENTREE + i * DECALAGE,
          fill: "backwards",
        },
      );
    });
  }, [index, sortant, sens, geste, reduit]);

  if (total === 0) return null;

  /* Une flèche : l'avis voisin, dans son sens. */
  const aller = (pas: 1 | -1) =>
    setEtat((e) => ({ index: (e.index + pas + total) % total, sortant: e.index, sens: pas, geste: false }));

  /* ---- Le geste ---- */
  const attraper = (e: EvenementPointeur<HTMLDivElement>) => {
    if (reduit || total < 2 || e.button > 0) return;
    // Un balayage en cours se termine d'abord : on attrape un avis posé.
    for (const figure of diapos.current) for (const el of pieces(figure)) for (const a of el.getAnimations()) a.finish();
    prise.current = { x0: e.clientX, dx: 0, t: performance.now(), v: 0, voisin: -1 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setTenu(true);
  };
  const tirer = (e: EvenementPointeur<HTMLDivElement>) => {
    const p = prise.current;
    if (!p) return;
    const dx = e.clientX - p.x0;
    const maintenant = performance.now();
    p.v = (dx - p.dx) / Math.max(1, maintenant - p.t);
    p.t = maintenant;
    p.dx = dx;
    const actuel = indexRef.current;
    const voisin = dx === 0 ? -1 : dx < 0 ? (actuel + 1) % total : (actuel - 1 + total) % total;
    // Le doigt change de côté : l'ancien voisin repart d'où il venait.
    if (p.voisin !== voisin && p.voisin >= 0) for (const el of pieces(diapos.current[p.voisin])) relacher(el);
    p.voisin = voisin;
    const d = window.innerWidth;
    pieces(diapos.current[actuel]).forEach((el, k) => placer(el, dx * (1 - k * VAGUE)));
    if (voisin >= 0) {
      pieces(diapos.current[voisin]).forEach((el, k) => {
        // Le voisin part juste derrière le bord de l'écran, de son côté
        // (mesuré au repos, une fois) : il apparaît dès que le doigt bouge,
        // à droite comme à gauche, même si le texte est calé à gauche.
        if (el.dataset.base === undefined) {
          const r = el.getBoundingClientRect();
          el.dataset.base = String(dx < 0 ? d - r.left : -r.right);
        }
        placer(el, parseFloat(el.dataset.base) + dx * (1 - k * VAGUE), true);
      });
    }
  };
  const lacher = () => {
    const p = prise.current;
    if (!p) return;
    prise.current = null;
    setTenu(false);
    const actuel = indexRef.current;
    const change = p.voisin >= 0 && (Math.abs(p.dx) > SEUIL || (Math.abs(p.v) > VIF && Math.abs(p.dx) > 20));
    if (change) {
      // L'un finit de partir, l'autre d'arriver (le balayage, ci-dessus).
      setEtat({ index: p.voisin, sortant: actuel, sens: p.dx < 0 ? 1 : -1, geste: true });
      return;
    }
    // Pas assez loin : tout revient en place, le voisin hors de l'écran.
    const d = window.innerWidth;
    for (const el of pieces(diapos.current[actuel])) {
      const x = lireTire(el);
      relacher(el);
      if (x) el.animate([{ transform: `translateX(${x}px)` }, { transform: "translateX(0)" }], { duration: 450, easing: SORTIE });
    }
    if (p.voisin >= 0) {
      for (const el of pieces(diapos.current[p.voisin])) {
        const x = lireTire(el);
        relacher(el);
        el.animate(
          [
            { transform: `translateX(${x}px)`, visibility: "visible" },
            { transform: `translateX(${x > 0 ? d : -d}px)`, visibility: "visible" },
          ],
          { duration: 450, easing: SORTIE },
        );
      }
    }
  };

  return (
    <>
      <div className={cx(s.tete, total > 1 && s.teteTraits)}>
        <h2 className={s.titre}>{renderLines(titre, [accent], s.accent)}</h2>
        {total > 1 ? (
          <div className="titre-anime-traits" aria-hidden="true">
            {items.map((avis, j) => (
              <span key={avis.nom} className={j === index ? "est-actif" : undefined} />
            ))}
          </div>
        ) : null}
      </div>

      <div
        ref={carrouselRef}
        className={s.grande}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setSurvol(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setSurvol(false);
        }}
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) setClavier(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setClavier(false);
        }}
      >
        <div
          className={cx(s.scene, total > 1 && !reduit && s.attrapable, tenu && s.tenue)}
          onPointerDown={attraper}
          onPointerMove={tirer}
          onPointerUp={lacher}
          onPointerCancel={lacher}
        >
          <div className={s.diapos} aria-live={tourne ? "off" : "polite"}>
            {items.map((avis, i) => {
              const mots = motsParAvis[i];
              const debuts = lignes?.[i] ?? null;
              const mot = (m: Mot) => (
                <span data-mot="" className={m.cle ? s.cle : undefined}>
                  {m.texte}
                </span>
              );
              return (
                <figure
                  key={avis.nom}
                  ref={(el) => {
                    diapos.current[i] = el;
                  }}
                  className={cx(s.diapo, i === index && s.affiche)}
                  aria-hidden={i === index ? undefined : true}
                >
                  <blockquote className={s.texte}>
                    <p>
                      {debuts
                        ? debuts.map((debut, k) => {
                            const fin = debuts[k + 1] ?? mots.length;
                            return (
                              <span key={debut} data-ligne="" className={s.ligne}>
                                {mots.slice(debut, fin).map((m, j) => (
                                  <Fragment key={debut + j}>
                                    {j > 0 && m.espace ? " " : null}
                                    {mot(m)}
                                  </Fragment>
                                ))}
                                {/* L'espace de fin de ligne, pour le copier-coller et les lecteurs d'écran. */}
                                {fin < mots.length ? " " : null}
                              </span>
                            );
                          })
                        : mots.map((m, n) => (
                            <Fragment key={n}>
                              {m.espace ? " " : null}
                              {mot(m)}
                            </Fragment>
                          ))}
                    </p>
                  </blockquote>
                  <figcaption className={s.qui}>
                    <Image
                      className={cx(s.logo, avis.logo.couleur && s.logoCouleur)}
                      src={avis.logo.src}
                      alt=""
                      width={avis.logo.width}
                      height={avis.logo.height}
                      style={{ height: avis.logo.hauteur, width: "auto" }}
                    />
                    <span className={s.filet} aria-hidden="true" />
                    <span className={s.identite}>
                      <strong className={s.nom}>{avis.nom}</strong>
                      <span className={s.poste}>
                        {avis.poste}, {avis.entreprise}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        {total > 1 ? (
          <div className={s.bas}>
            {/* La petite main : elle attrape, glisse vers la gauche et lâche,
                pour montrer qu'on peut jouer avec l'avis ; puis un petit mot
                (« Glissez ») apparaît et repart avant qu'elle revienne
                (demandes d'Antonino du 26/11/2026, à la place de « Faites
                glisser l'avis »). */}
            <span className={s.indice} aria-hidden="true">
              <span className={s.indicePiste} />
              <span className={s.indiceMain}>
                <Hand className={s.mainOuverte} />
                <HandGrab className={s.mainFermee} />
              </span>
              <span className={s.indiceMot}>{indice}</span>
            </span>
            <div className={s.nav}>
              <span className={s.compte} aria-hidden="true">
                {index + 1} / {total}
              </span>
              <button type="button" className={s.fleche} aria-label={precedent} onClick={() => aller(-1)}>
                <ArrowLeft aria-hidden />
              </button>
              <button type="button" className={s.fleche} aria-label={suivant} onClick={() => aller(1)}>
                <ArrowRight aria-hidden />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
