"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

/* Les outils du calcul de l'animation. */
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/* Pour la descente du paragraphe : une courbe plus douce que la cubique,
   qui n'accélère pas brutalement au milieu. */
const easeSine = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

/* LE LISSAGE (demande d'Antonino du 24/11/2026 : avec un défilement
   rapide, la descente du paragraphe était trop brusque). La photo, le voile
   et le paragraphe ne suivent pas le défilement à la lettre : ils le
   rejoignent en douceur, par deux amortissements exponentiels en chaîne
   (constante de temps de chacun). En chaîne, le mouvement démarre sans
   à-coup au lieu de partir d'un coup : après un saut brusque, la descente
   se pose en 0,35 s environ, et tout est en place en 0,65 s.
   Le défilement de la page, lui, n'est jamais freiné. */
const LISSAGE = 0.14;

/* Prévient la barre de navigation que le fond sous elle change sans
   défilement (la photo finit de monter) : elle se mesure à nouveau. */
const EVENEMENT_FOND = "site:fond";

/* Les couleurs des mots. */
const GRIS = "#D5D9E0"; // première phrase, pas encore écrite
const NOIR = "#0B1424"; // première phrase écrite, sur le fond blanc
const BLANC = "#FFFFFF"; // mots écrits, sur la photo
const BLANC_PALE = "rgba(255,255,255,.35)"; // première phrase pas encore écrite, sur la photo
const BLEU = "#8EC1FF"; // « logiciel » et « IA »
const INVISIBLE = "transparent"; // la suite, avant de s'écrire (sa place reste réservée)

/* Les mots s'écrivent un par un, sans défilement, en tant de temps au total. */
const DUREE_DEBUT = 650;
const DUREE_SUITE = 1100;

const SANS_MOUVEMENT = "(prefers-reduced-motion: reduce)";

/* Coupe un mot autour de son mot en valeur : « logiciel » en entier, ou
   « IA » dans « l'IA » (seul « IA » change de style, « l' » reste normal).
   La ponctuation collée au mot reste normale. */
function decoupe(mot: string, accents: readonly string[]): ReactNode {
  for (const accent of accents) {
    const at = mot.indexOf(accent);
    if (at === -1) continue;
    const avant = mot.slice(0, at);
    const apres = mot.slice(at + accent.length);
    if (avant && !/['’]$/.test(avant)) continue;
    if (apres && !/^[.,;:!?… »)]+$/.test(apres)) continue;
    return (
      <>
        {avant}
        <span className="approach-accent" data-accent="">
          {accent}
        </span>
        {apres}
      </>
    );
  }
  return mot;
}

/**
 * LA SECTION « NOTRE APPROCHE » (24/11/2026, d'après la fiche d'Antonino) :
 * le paragraphe et la photo du bureau de nuit, rien d'autre.
 *
 * Une section de 135vh, avec une scène fixe de 100vh :
 *  - la première phrase (`lead`) s'écrit toute seule, du gris au noir, mot
 *    par mot en 0,65 s, quand le haut de la section passe à 55 % de
 *    l'écran ; elle redevient grise si on remonte sous 80 % ;
 *  - la photo monte du bas de l'écran et s'agrandit jusqu'à le remplir
 *    (`clip-path`), avec un léger dézoom et un voile sombre qui apparaît ;
 *    dès que le voile dépasse 0,5, la première phrase passe en blanc ;
 *  - la suite (`rest`), déjà en place mais transparente, s'écrit toute
 *    seule en blanc, mot par mot en 1,1 s, dès que p dépasse 0,5 ; elle
 *    redevient transparente si p repasse sous 0,25.
 * Tout tient en un tiers d'écran de défilement (p va de 0 à 1 sur 35vh).
 * La photo, le voile et le paragraphe suivent une progression LISSÉE
 * (`LISSAGE`) : même avec un défilement rapide, ils glissent en place au
 * lieu de sauter.
 *
 * Chaque image ne change que `color`, `clip-path`, `transform` et
 * `opacity`. Le texte reste du vrai texte, sélectionnable et lu en entier
 * par les lecteurs d'écran, même quand des mots sont transparents.
 *
 * Sans mouvement (`prefers-reduced-motion`) : la feuille de style montre
 * directement la photo en plein écran avec son voile, et tout le texte en
 * blanc ; le script n'y touche pas.
 *
 * `data-tone="dark"` dit à la barre de navigation que la photo est sombre
 * quand elle passe dessous.
 */
export function ApproachScroll({
  label,
  lead,
  rest,
  accents,
  image,
  className,
}: {
  label: string;
  lead: string;
  rest: string;
  accents: readonly string[];
  image: string;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const voileRef = useRef<HTMLDivElement>(null);
  const texteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const photo = photoRef.current;
    const zoom = zoomRef.current;
    const voile = voileRef.current;
    const texte = texteRef.current;
    if (!section || !sticky || !photo || !zoom || !voile || !texte) return;

    const motsDebut = Array.from(texte.querySelectorAll<HTMLElement>("[data-debut]"));
    const motsSuite = Array.from(texte.querySelectorAll<HTMLElement>("[data-suite]"));
    // Le mot en valeur de chaque mot de la suite (ou rien).
    const accentsSuite = motsSuite.map((m) => m.querySelector<HTMLElement>("[data-accent]"));
    const reduit = window.matchMedia(SANS_MOUVEMENT);

    // L'instant où chaque partie a commencé à s'écrire (null : pas écrite).
    let debut: number | null = null;
    let suite: number | null = null;
    let raf = 0;
    // La progression lissée (null : pas encore mesurée) et son relais (le
    // premier des deux amortissements), l'instant de la dernière image, et
    // si elle court encore après le défilement.
    let lisse: number | null = null;
    let relais = 0;
    let derniere = 0;
    let enMouvement = false;

    // Les mots à écrire à cet instant, d'après le temps écoulé.
    const ecrits = (depart: number | null, duree: number, total: number, now: number) =>
      depart === null ? 0 : Math.ceil(clamp((now - depart) / duree) * total);

    const peindre = (el: HTMLElement, couleur: string) => {
      if (el.style.color !== couleur) el.style.color = couleur;
    };

    // Sans mouvement : la feuille de style montre l'état final.
    const effacer = () => {
      photo.style.clipPath = "";
      zoom.style.transform = "";
      voile.style.opacity = "";
      texte.style.transform = "";
      for (const el of [...motsDebut, ...motsSuite]) el.style.color = "";
      for (const el of accentsSuite) if (el) el.style.color = "";
      debut = null;
      suite = null;
      lisse = null;
      enMouvement = false;
    };

    const frame = (now: number) => {
      raf = 0;
      if (reduit.matches) {
        effacer();
        return;
      }

      const r = section.getBoundingClientRect();
      const H = window.innerHeight;
      const course = r.height - H;
      const p = course > 0 ? clamp(-r.top / course) : 1;

      // La progression lissée : elle rejoint `p` en douceur (LISSAGE).
      // Au chargement, elle part directement de `p` ; après une pause, la
      // première image compte pour 1/60 s (pas de saut).
      const avant = lisse;
      if (lisse === null) {
        lisse = p;
        relais = p;
      } else {
        const dt = enMouvement ? Math.min(0.05, (now - derniere) / 1000) : 1 / 60;
        const k = 1 - Math.exp(-dt / LISSAGE);
        relais += (p - relais) * k;
        lisse += (relais - lisse) * k;
        if (Math.abs(p - relais) < 0.0005 && Math.abs(p - lisse) < 0.0005) {
          relais = p;
          lisse = p;
        }
      }
      derniere = now;
      enMouvement = lisse !== p;
      const q = lisse;

      // Les déclenchements, et les remises à zéro en remontant.
      if (debut === null && r.top < 0.55 * H) debut = now;
      else if (debut !== null && r.top > 0.8 * H) debut = null;
      if (suite === null && q > 0.5) suite = now;
      else if (suite !== null && q < 0.25) suite = null;

      // La photo monte du bas et remplit l'écran, en se dézoomant.
      const e = ease(seg(q, 0, 0.7));
      photo.style.clipPath = `inset(${100 * (1 - e)}% ${6 * (1 - e)}% 0% ${6 * (1 - e)}% round ${24 * (1 - e)}px)`;
      zoom.style.transform = `scale(${1.18 - 0.18 * ease(q)})`;
      const v = ease(seg(q, 0.25, 0.65));
      voile.style.opacity = String(v);
      const surPhoto = v > 0.5;

      // Le paragraphe descend en même temps que la photo monte, jusqu'au
      // milieu de l'image (il part de 13vh, sa place sur le fond blanc).
      // Mesuré sans transformation : `offsetTop` et `offsetHeight` l'ignorent.
      const haut = texte.offsetTop + (texte.parentElement?.offsetTop ?? 0);
      const descente = Math.max(0, (sticky.clientHeight - texte.offsetHeight) / 2 - haut);
      texte.style.transform = `translateY(${descente * easeSine(seg(q, 0, 0.7))}px)`;

      // La photo a bougé sans défilement : la barre se mesure à nouveau.
      if (avant !== null && avant !== lisse) window.dispatchEvent(new Event(EVENEMENT_FOND));

      // La première phrase.
      const nDebut = ecrits(debut, DUREE_DEBUT, motsDebut.length, now);
      motsDebut.forEach((el, i) =>
        peindre(el, i < nDebut ? (surPhoto ? BLANC : NOIR) : surPhoto ? BLANC_PALE : GRIS),
      );

      // La suite, et ses mots en valeur en bleu.
      const nSuite = ecrits(suite, DUREE_SUITE, motsSuite.length, now);
      motsSuite.forEach((el, i) => {
        const ecrit = i < nSuite;
        peindre(el, ecrit ? BLANC : INVISIBLE);
        const accent = accentsSuite[i];
        if (accent) peindre(accent, ecrit ? BLEU : INVISIBLE);
      });

      // Tant qu'une phrase s'écrit, ou que la scène rejoint le défilement,
      // on continue image par image.
      const enCours =
        enMouvement ||
        (debut !== null && now - debut < DUREE_DEBUT) ||
        (suite !== null && now - suite < DUREE_SUITE);
      if (enCours) raf = requestAnimationFrame(frame);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    frame(performance.now());
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduit.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduit.removeEventListener("change", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  const motsDebut = lead.split(" ");
  const motsSuite = rest.split(" ");

  return (
    /* ⚠ Un `div` (région nommée) et non une `section` : les bandes de
       l'accueil alternent sombre et clair selon leur RANG parmi les
       sections. Sans elle dans le compte, « Ce que nous faisons » passe en
       blanc et toute la suite s'inverse (demande d'Antonino, 24/11/2026). */
    <div ref={sectionRef} id="approche" role="region" className={`approach ${className ?? ""}`} aria-label={label}>
      <div ref={stickyRef} className="approach-sticky">
        {/* La photo, décorative : elle monte du bas et remplit l'écran. */}
        <div ref={photoRef} className="approach-photo" data-tone="dark" aria-hidden="true">
          <div ref={zoomRef} className="approach-zoom">
            <Image src={image} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div ref={voileRef} className="approach-veil" />
        </div>

        {/* Le paragraphe, d'un seul tenant, au-dessus de la photo.
            `data-tone="dark"` : il ne passe sous la barre de navigation
            qu'en quittant l'écran, la photo déjà en plein écran derrière
            lui (avant, il reste sous 13vh, plus bas que la barre). */}
        <div className="approach-inner">
          <p ref={texteRef} className="approach-text" data-tone="dark">
            {motsDebut.map((mot, i) => (
              <Fragment key={`d${i}`}>
                <span className="approach-word" data-debut="">
                  {decoupe(mot, accents)}
                </span>{" "}
              </Fragment>
            ))}
            {motsSuite.map((mot, i) => (
              <Fragment key={`s${i}`}>
                {i > 0 ? " " : null}
                <span className="approach-word" data-suite="">
                  {decoupe(mot, accents)}
                </span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
