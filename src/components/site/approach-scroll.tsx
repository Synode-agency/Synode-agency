"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

/* Les outils du calcul. */
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* Le gris des mots pas encore écrits. Une fois écrits, ils prennent leurs
   couleurs de la feuille de style (bleu nuit, et bleu pour « logiciel » et
   « IA »). */
const GRIS = "#D5D9E0";

/* LE LISSAGE : la scène rejoint le défilement en douceur, par deux
   amortissements en chaîne (constante de temps de chacun, en secondes).
   Même avec un défilement rapide, rien ne saute. */
const LISSAGE = 0.14;

/* LE CALENDRIER DE LA SCÈNE, en part de sa progression (0 → 1). Tout finit
   près de la fin, pour ne pas laisser de défilement « pour rien ». */
const MOTS: [number, number] = [0.04, 0.9];
const PHOTOS: [number, number][] = [
  [0.08, 0.38],
  [0.34, 0.64],
  [0.6, 0.9],
];
/* La dérive de chaque photo pendant la scène (en px) : des vitesses
   différentes donnent de la profondeur. */
const DERIVE = [-30, 12, 40];

const SANS_MOUVEMENT = "(prefers-reduced-motion: reduce)";
/* Sur ordinateur, la scène est épinglée pendant le défilement. */
const EPINGLE = "(min-width: 800px)";

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
 * LA SECTION « NOTRE APPROCHE » (refaite le 25/11/2026, maquette
 * « L'escalier » validée par Antonino) : sur fond blanc, le paragraphe à
 * gauche, les trois photos de l'équipe à droite, en escalier.
 *
 * Sur ordinateur, la scène reste fixe à l'écran pendant que la section
 * défile. Le paragraphe se remplit mot par mot, du gris clair au bleu nuit
 * (« logiciel » et « IA » en bleu, en Castoro italique). En même temps, les
 * photos montent l'une après l'autre, chacune dévoilée par le bas, puis
 * dérivent à des vitesses différentes. Chaque carte a les proportions de
 * sa photo : rien n'est rogné ni zoomé. La troisième se
 * pose à côté de la deuxième, par-dessus, un peu plus haut que dans la
 * maquette (demande d'Antonino). Tout se rejoue à l'envers en remontant.
 *
 * Sur téléphone, rien n'est épinglé : le texte, puis les photos, et la même
 * animation suit la position de la section à l'écran.
 *
 * Rendu côté serveur dans son état final (lisible sans script). Sans
 * mouvement (`prefers-reduced-motion`), il reste ainsi. Le texte reste du
 * vrai texte ; les photos sont décoratives.
 */
export function ApproachScroll({
  label,
  text,
  accents,
  photos,
  className,
}: {
  label: string;
  text: string;
  accents: readonly string[];
  photos: readonly string[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const texteRef = useRef<HTMLParagraphElement>(null);
  const trioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const texte = texteRef.current;
    const trio = trioRef.current;
    if (!section || !texte || !trio) return;
    const mots = Array.from(texte.querySelectorAll<HTMLElement>("[data-mot]"));
    const cadres = Array.from(trio.querySelectorAll<HTMLElement>("[data-photo]"));
    const reduit = window.matchMedia(SANS_MOUVEMENT);
    const epingle = window.matchMedia(EPINGLE);

    let lisse: number | null = null;
    let relais = 0;
    let derniere = 0;
    let enMouvement = false;
    let raf = 0;

    // L'état final, celui du rendu serveur (et sans mouvement).
    const finir = () => {
      for (const m of mots) {
        m.style.color = "";
        const a = m.querySelector<HTMLElement>("[data-accent]");
        if (a) a.style.color = "";
      }
      for (const c of cadres) {
        c.style.clipPath = "";
        c.style.transform = "";
      }
      lisse = null;
      enMouvement = false;
    };

    // La progression : épinglée, du haut de la section en haut de l'écran
    // jusqu'à sa libération ; sinon, du haut à 85 % de l'écran jusqu'au bas
    // à 70 %.
    const progression = () => {
      const r = section.getBoundingClientRect();
      const H = window.innerHeight;
      if (epingle.matches) return clamp(-r.top / Math.max(1, r.height - H));
      return clamp((0.85 * H - r.top) / (0.15 * H + r.height));
    };

    const frame = (now: number) => {
      raf = 0;
      if (reduit.matches) {
        finir();
        return;
      }
      const p = progression();
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

      // Les mots s'écrivent.
      const n = Math.round(seg(q, ...MOTS) * mots.length);
      mots.forEach((m, i) => {
        const c = i < n ? "" : GRIS;
        if (m.style.color !== c) m.style.color = c;
        const a = m.querySelector<HTMLElement>("[data-accent]");
        if (a && a.style.color !== c) a.style.color = c;
      });

      // Les photos montent en escalier, puis dérivent. Sans zoom : elles
      // restent à leur taille (demande d'Antonino, pour la qualité).
      cadres.forEach((c, i) => {
        const e = ease(seg(q, ...PHOTOS[i]));
        c.style.clipPath = `inset(${(1 - e) * 100}% 0 0 0 round 18px)`;
        c.style.transform = `translateY(${(1 - e) * 70 + (q - 0.5) * DERIVE[i]}px)`;
      });

      if (enMouvement) raf = requestAnimationFrame(frame);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    frame(performance.now());
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduit.addEventListener("change", request);
    epingle.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduit.removeEventListener("change", request);
      epingle.removeEventListener("change", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  const motsTexte = text.split(" ");

  return (
    /* ⚠ Un `div` (région nommée) et non une `section` : les bandes de
       l'accueil alternent sombre et clair selon leur RANG parmi les
       sections, et celle-ci ne doit pas compter. */
    <div ref={sectionRef} id="approche" role="region" className={`approach ${className ?? ""}`} aria-label={label}>
      <div className="approach-scene">
        <div className="col approach-grille">
          <p ref={texteRef} className="approach-text">
            {motsTexte.map((mot, i) => (
              <Fragment key={i}>
                {i > 0 ? " " : null}
                <span className="approach-word" data-mot="">
                  {decoupe(mot, accents)}
                </span>
              </Fragment>
            ))}
          </p>
          <div ref={trioRef} className="approach-trio" aria-hidden="true">
            {photos.map((src, i) => (
              <div key={src} className={`approach-ph approach-ph--${i + 1}`} data-photo="">
                <Image src={src} alt="" fill sizes="(max-width: 799px) 70vw, 420px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
