"use client";

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
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
   *  une silhouette blanche, passée en noir sur un fond blanc). */
  logo: { src: string; width: number; height: number; hauteur: number; couleur?: boolean };
};

/* Un mot de la citation : en Castoro ou non, précédé d'une espace ou non
   (« endroit » et le point qui le suit restent collés). */
type Mot = { texte: string; cle: boolean; espace: boolean };

/* Chaque avis reste 3,5 secondes une fois tout éclairé, puis le suivant
   arrive (demandes d'Antonino du 26/11/2026). */
const PAUSE = 3500;
/* Le glissement d'un avis à l'autre, puis l'éclairage : la signature (logo,
   nom, fonction, 120 ms d'écart), puis les mots, un toutes les 55 ms, à
   partir de 420 ms ; chaque mot s'allume en 450 ms. Le rythme est dans
   `temoignages.module.css`, la durée totale ici pour le minuteur. */
const GLISSE = 900;
const PAS_MOT = 55;
const DEPART_MOTS = 420;
const ALLUMAGE = 450;
const COURBE = "cubic-bezier(0.77, 0, 0.175, 1)";
/* Après un geste : la suite part de là où le doigt l'a laissée. */
const SORTIE = "cubic-bezier(0.23, 1, 0.32, 1)";
/* Le geste : au-delà de 90 px (ou d'un mouvement vif), l'avis change. */
const SEUIL = 90;
const VIF = 0.6;

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

/* L'éclairage, posé par le script seulement (`data-eteint`) : sans lui,
   tout est lisible. */
const eteindre = (el: HTMLElement | null | undefined) => {
  if (el) el.dataset.eteint = "";
};
const allumer = (el: HTMLElement | null | undefined) => {
  if (el) delete el.dataset.eteint;
};
/* Le temps de l'éclairage d'un avis de `n` mots : la signature, puis ses
   mots. */
const dureeAllumage = (n: number) => DEPART_MOTS + n * PAS_MOT + ALLUMAGE;
/* La position laissée par le doigt sur un avis, puis le ménage. */
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
}

/**
 * LES TÉMOIGNAGES DE L'ACCUEIL (25/11/2026, maquette « T1 » choisie par
 * Antonino), sous « Notre méthode », dans le bleu nuit. Depuis le
 * 26/11/2026 : la maquette « 6 · La citation s'éclaire », avec la mise en
 * page de la « 2 · La signature à gauche », alignée à gauche (choix
 * d'Antonino, à la place de la pile de fiches).
 *
 * À gauche, la signature : le logo de l'entreprise, le nom, la fonction et
 * l'entreprise du client. À droite, la citation, sur 4 lignes, son passage
 * clé en Castoro bleu. Sous l'avis : la petite main qui montre qu'on peut
 * l'attraper, le compteur et les flèches. Sous le titre, les petits traits
 * des titres animés (`titre-anime-traits`) suivent l'avis.
 *
 * L'ÉCLAIRAGE, comme « Notre méthode » : l'avis arrive éteint ; la
 * signature apparaît d'abord (le logo, puis le nom, puis la fonction),
 * puis les mots de la citation s'éclairent un à un, le passage clé en
 * bleu. Le premier s'éclaire quand la section arrive à l'écran.
 *
 * Une fois tout éclairé, 3,5 s d'arrêt, puis l'avis glisse vers la gauche
 * et le suivant arrive de la droite. Les flèches font de même (celle de
 * gauche dans l'autre sens). Pas de bouton pause.
 *
 * LE GESTE, dans les deux sens : on attrape l'avis ; l'avis voisin entre
 * déjà par le bord opposé (le suivant par la droite, le précédent par la
 * gauche). Au lâcher, au-delà de 90 px ou d'un geste vif, l'un finit de
 * partir et l'autre d'arriver ; sinon, tout revient en place.
 *
 * Le défilement attend le temps d'une lecture : la souris sur l'avis, le
 * focus du clavier sur les flèches, le geste en cours, ou l'avis hors de
 * l'écran.
 *
 * Accessibilité : pendant le défilement, les changements ne sont pas
 * annoncés ; à l'arrêt, l'avis choisi l'est (`aria-live`). Les avis cachés
 * le sont aussi aux lecteurs d'écran ; le logo et la petite main sont
 * décoratifs. Sans mouvement : ni éclairage, ni défilement, ni geste, ni
 * main ; les flèches changent l'avis par un simple fondu.
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
  const reduit = useSyncExternalStore(suivreMouvement, lireMouvement, () => false);

  const motsParAvis = useMemo(() => items.map((avis) => decouper(avis.texte, avis.cle)), [items]);
  const carrouselRef = useRef<HTMLDivElement>(null);
  const diapos = useRef<(HTMLElement | null)[]>([]);
  const indexRef = useRef(0);
  /* L'instant où l'avis affiché a fini d'arriver et de s'éclairer. */
  const finMouvement = useRef(0);
  const minuteurAllumage = useRef(0);
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

  /* Au départ, tout est éteint (avant l'affichage) ; sans mouvement, tout
     reste éclairé. */
  useLayoutEffect(() => {
    for (const el of diapos.current) {
      if (reduit) allumer(el);
      else eteindre(el);
    }
  }, [reduit]);

  /* Le premier avis s'éclaire quand la section arrive à l'écran. */
  useEffect(() => {
    if (!vu || reduit) return;
    const actuel = indexRef.current;
    const el = diapos.current[actuel];
    if (!el || el.dataset.eteint === undefined || el.getAnimations().length) return;
    allumer(el);
    finMouvement.current = performance.now() + dureeAllumage(motsParAvis[actuel]?.length ?? 0);
  }, [vu, reduit, motsParAvis]);

  /* Le minuteur : la fin de l'arrivée et de l'éclairage, puis les 3,5 s.
     Il repart à chaque nouvel avis (flèches et gestes compris) et à chaque
     reprise. */
  useEffect(() => {
    if (!tourne) return;
    const reste = Math.max(0, finMouvement.current - performance.now());
    const minuteur = window.setTimeout(
      () => setEtat((e) => ({ index: (e.index + 1) % total, sortant: e.index, sens: 1, geste: false })),
      reste + PAUSE,
    );
    return () => window.clearTimeout(minuteur);
  }, [tourne, index, total]);

  /* Le glissement, lancé avant l'affichage de l'image : l'avis qui part
     sort d'un côté, le nouveau entre de l'autre, éteint ; à la fin du
     glissement, il s'éclaire. Après un geste, tout repart de là où le
     doigt l'a laissé. */
  useLayoutEffect(() => {
    if (sortant < 0 || sortant === index) return;
    const partant = diapos.current[sortant];
    const entrant = diapos.current[index];
    if (!partant || !entrant) return;
    window.clearTimeout(minuteurAllumage.current);
    for (const el of [partant, entrant]) for (const a of el.getAnimations()) a.cancel();
    if (reduit) {
      relacher(partant);
      relacher(entrant);
      allumer(entrant);
      entrant.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease" });
      finMouvement.current = performance.now() + 200;
      return;
    }
    const largeur = window.innerWidth;
    const departPartant = lireTire(partant);
    const departEntrant = geste && entrant.dataset.tire ? lireTire(entrant) : sens * largeur;
    relacher(partant);
    relacher(entrant);
    eteindre(entrant);
    const options = { duration: GLISSE, easing: geste ? SORTIE : COURBE };
    const sortie = partant.animate(
      [
        { transform: `translateX(${departPartant}px)`, visibility: "visible" },
        { transform: `translateX(${-sens * largeur}px)`, visibility: "visible" },
      ],
      options,
    );
    sortie.onfinish = () => eteindre(partant);
    entrant.animate([{ transform: `translateX(${departEntrant}px)` }, { transform: "translateX(0)" }], options);
    const avant = Math.max(0, GLISSE - 150);
    minuteurAllumage.current = window.setTimeout(() => allumer(entrant), avant);
    finMouvement.current = performance.now() + avant + dureeAllumage(motsParAvis[index]?.length ?? 0);
  }, [index, sortant, sens, geste, reduit, motsParAvis]);

  useEffect(() => () => window.clearTimeout(minuteurAllumage.current), []);

  if (total === 0) return null;

  /* Une flèche : l'avis voisin, dans son sens. */
  const aller = (pas: 1 | -1) =>
    setEtat((e) => ({ index: (e.index + pas + total) % total, sortant: e.index, sens: pas, geste: false }));

  /* ---- Le geste ---- */
  const attraper = (e: EvenementPointeur<HTMLDivElement>) => {
    if (reduit || total < 2 || e.button > 0) return;
    // Un glissement en cours se termine d'abord : on attrape un avis posé.
    for (const el of diapos.current) if (el) for (const a of el.getAnimations()) a.finish();
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
    if (p.voisin !== voisin && p.voisin >= 0) {
      const ancien = diapos.current[p.voisin];
      if (ancien) relacher(ancien);
    }
    p.voisin = voisin;
    const largeur = window.innerWidth;
    const courant = diapos.current[actuel];
    if (courant) placer(courant, dx);
    const entrant = voisin >= 0 ? diapos.current[voisin] : null;
    if (entrant) {
      eteindre(entrant);
      placer(entrant, (dx < 0 ? largeur : -largeur) + dx, true);
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
      // L'un finit de partir, l'autre d'arriver (le glissement, ci-dessus).
      setEtat({ index: p.voisin, sortant: actuel, sens: p.dx < 0 ? 1 : -1, geste: true });
      return;
    }
    // Pas assez loin : tout revient en place, le voisin hors de l'écran.
    const largeur = window.innerWidth;
    const courant = diapos.current[actuel];
    if (courant) {
      const x = lireTire(courant);
      relacher(courant);
      if (x) courant.animate([{ transform: `translateX(${x}px)` }, { transform: "translateX(0)" }], { duration: 450, easing: SORTIE });
    }
    const voisin = p.voisin >= 0 ? diapos.current[p.voisin] : null;
    if (voisin) {
      const x = lireTire(voisin);
      relacher(voisin);
      voisin.animate(
        [
          { transform: `translateX(${x}px)`, visibility: "visible" },
          { transform: `translateX(${x > 0 ? largeur : -largeur}px)`, visibility: "visible" },
        ],
        { duration: 450, easing: SORTIE },
      );
    }
  };

  return (
    <>
      <div className={cx(s.tete, total > 1 && s.teteTraits)}>
        {/* Le titre monte à son arrivée, comme ceux des sections
            précédentes (`ScrollReveal`, 26/11/2026). */}
        <h2 className={s.titre} data-rv-bloc="bottom">
          {renderLines(titre, [accent], s.accent)}
        </h2>
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
            {items.map((avis, i) => (
              <figure
                key={avis.nom}
                ref={(el) => {
                  diapos.current[i] = el;
                }}
                className={cx(s.diapo, i === index && s.affiche)}
                aria-hidden={i === index ? undefined : true}
              >
                {/* La signature : le logo, le nom, puis la fonction, qui
                    apparaissent l'un après l'autre avant la citation. */}
                <figcaption className={s.signature}>
                  <Image
                    className={cx(s.logo, s.piece, avis.logo.couleur && s.logoCouleur)}
                    src={avis.logo.src}
                    alt=""
                    width={avis.logo.width}
                    height={avis.logo.height}
                    style={{ height: avis.logo.hauteur, width: "auto", "--j": 0 } as CSSProperties}
                  />
                  <strong className={cx(s.nom, s.piece)} style={{ "--j": 1 } as CSSProperties}>
                    {avis.nom}
                  </strong>
                  <span className={cx(s.poste, s.piece)} style={{ "--j": 2 } as CSSProperties}>
                    {avis.poste}, {avis.entreprise}
                  </span>
                </figcaption>
                <blockquote className={s.citation}>
                  <p className={s.texte}>
                    {motsParAvis[i].map((m, k) => (
                      <Fragment key={k}>
                        {m.espace ? " " : null}
                        <span className={cx(s.mot, m.cle && s.cle)} style={{ "--i": k } as CSSProperties}>
                          {m.texte}
                        </span>
                      </Fragment>
                    ))}
                  </p>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>

        {total > 1 ? (
          <div className={s.bas}>
            {/* La petite main : elle attrape, glisse vers la gauche et lâche,
                pour montrer qu'on peut jouer avec l'avis ; puis un petit mot
                (« Glissez ») apparaît et repart avant qu'elle revienne
                (demandes d'Antonino du 26/11/2026). */}
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
