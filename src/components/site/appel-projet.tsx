"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { bookingHref, type Locale } from "@/lib/routes";
import { ctaLabel } from "@/content/cta";
import { ecrireProjet, LONGUEUR_PROJET } from "@/lib/projet";
import s from "./appel-projet.module.css";

type Appel = {
  titreAvant: string;
  accent: string;
  titreApres: string;
  texte: string;
  label: string;
  attente: string;
  exemples: readonly string[];
};

/* Le rythme des exemples qui s'écrivent : une lettre toutes les 45 ms,
   l'exemple complet reste 1,7 s, puis il s'efface plus vite. */
const FRAPPE = 45;
const TENUE = 1700;
const EFFACE = 22;
const ENTRE = 350;
const SANS_MOUVEMENT = "(prefers-reduced-motion: reduce)";

/* L'entrée au défilement : le contenu entre quand le haut du TITRE passe à
   85 % de l'écran, et se cache de nouveau, pour rejouer, quand on remonte
   jusqu'à ne plus le voir. (Mesurée sur le haut de la bande avant le
   26/11/2026 : avec sa grande marge du haut, tout s'animait encore sous
   l'écran.) */
const ENTREE = 0.85;
const RETOUR = 1;

/**
 * L'APPEL FINAL DE L'ACCUEIL (26/11/2026, maquette « 4A · Ce que vous
 * aimeriez construire » choisie par Antonino), entre les témoignages et la
 * FAQ, à la place de la carte bleu nuit.
 *
 * EN BLEU NUIT (26/11/2026, choix d'Antonino) : dans le bleu nuit de
 * « Notre méthode » et des témoignages, qui continue jusqu'ici d'un seul
 * fond ; la FAQ, blanche, le coupe d'une ligne nette juste en dessous. La
 * question et la phrase à gauche, le champ et le bouton à droite, sur la
 * même ligne (l'un sous l'autre en dessous de 1080px de colonne). Le titre
 * monte ligne à ligne, la phrase suit, le champ glisse depuis la droite ;
 * en remontant, l'entrée se rejoue.
 *
 * Une question ouverte à tous les métiers de Synode (« Qu'aimeriez-vous
 * construire ? », « construire » en Castoro bleu), une phrase, et un champ
 * en pilule où des exemples s'écrivent tout seuls (logiciel, site,
 * application, agent IA, intégration, automatisation). Le visiteur tape son
 * projet en une phrase et clique sur le bouton du site : la phrase est
 * gardée dans son navigateur (`@/lib/projet`) et la page Contact la reprend
 * dans la réservation Cal.com. Sans phrase, le bouton mène simplement à la
 * réservation.
 *
 * Les exemples s'arrêtent dès qu'on clique dans le champ, et quand la
 * section n'est pas à l'écran. Sans mouvement : le premier exemple, fixe.
 * Sans JavaScript, le formulaire mène à la réservation sans la phrase (le
 * champ n'a pas de `name` : la phrase ne passe jamais dans l'adresse).
 */
export function AppelProjet({
  locale,
  appel,
  className,
}: {
  locale: Locale;
  appel: Appel;
  /** La variable de la police Castoro (`--font-accent`), posée par l'accueil. */
  className?: string;
}) {
  const router = useRouter();
  const racineRef = useRef<HTMLDivElement>(null);
  const champRef = useRef<HTMLInputElement>(null);
  const [exemple, setExemple] = useState(appel.exemples[0] ?? "");
  const [main, setMain] = useState(false);

  /* Les exemples qui s'écrivent, lettre par lettre, tant que le visiteur
     n'a pas pris la main et que la section est à l'écran. */
  useEffect(() => {
    const racine = racineRef.current;
    if (!racine || main || appel.exemples.length === 0) return;
    if (window.matchMedia(SANS_MOUVEMENT).matches) return;
    let i = 0;
    let lettres = appel.exemples[0].length;
    let efface = true;
    let minuteur = 0;
    let vu = false;
    const taper = () => {
      if (!vu) return;
      const mot = appel.exemples[i];
      if (!efface) {
        lettres += 1;
        setExemple(mot.slice(0, lettres));
        if (lettres >= mot.length) {
          efface = true;
          minuteur = window.setTimeout(taper, TENUE);
          return;
        }
        minuteur = window.setTimeout(taper, FRAPPE);
      } else {
        lettres -= 1;
        setExemple(mot.slice(0, Math.max(0, lettres)));
        if (lettres <= 0) {
          efface = false;
          i = (i + 1) % appel.exemples.length;
          minuteur = window.setTimeout(taper, ENTRE);
          return;
        }
        minuteur = window.setTimeout(taper, EFFACE);
      }
    };
    const observateur = new IntersectionObserver(([e]) => {
      vu = e.isIntersecting;
      window.clearTimeout(minuteur);
      if (vu) minuteur = window.setTimeout(taper, TENUE);
    });
    observateur.observe(racine);
    return () => {
      observateur.disconnect();
      window.clearTimeout(minuteur);
    };
  }, [main, appel.exemples]);

  /* L'entrée du contenu, réglée par le défilement. `data-entree="avant"`
     cache le contenu : posé par le script seulement, l'appel reste lisible
     sans lui. Sans mouvement : pas d'entrée. */
  useEffect(() => {
    const racine = racineRef.current;
    if (!racine) return;
    const reduit = window.matchMedia(SANS_MOUVEMENT);
    let raf = 0;
    const maj = () => {
      raf = 0;
      if (reduit.matches) {
        delete racine.dataset.entree;
        return;
      }
      const hauteur = window.innerHeight;
      const haut = (racine.querySelector("h2") ?? racine).getBoundingClientRect().top;
      if (haut < hauteur * ENTREE) delete racine.dataset.entree;
      else if (haut > hauteur * RETOUR) racine.dataset.entree = "avant";
    };
    const demander = () => {
      if (!raf) raf = requestAnimationFrame(maj);
    };
    maj();
    window.addEventListener("scroll", demander, { passive: true });
    window.addEventListener("resize", demander);
    reduit.addEventListener("change", demander);
    return () => {
      window.removeEventListener("scroll", demander);
      window.removeEventListener("resize", demander);
      reduit.removeEventListener("change", demander);
      cancelAnimationFrame(raf);
    };
  }, []);

  const envoyer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ecrireProjet(champRef.current?.value ?? "");
    router.push(bookingHref(locale));
  };

  return (
    <div
      ref={racineRef}
      id="appel"
      className={className ? `${s.appel} ${className}` : s.appel}
      role="region"
      aria-labelledby="appel-titre"
    >
      <div className={`col ${s.colonne}`}>
        <h2 id="appel-titre" className={s.titre}>
          <span className={s.ligne}>
            <span>{appel.titreAvant}</span>
          </span>{" "}
          <span className={s.ligne}>
            <span>
              <em className={s.accent}>{appel.accent}</em>
              {appel.titreApres}
            </span>
          </span>
        </h2>
        <div className={s.grille}>
          <div className={s.gauche}>
            <p className={s.texte}>{appel.texte}</p>
          </div>
          <div className={s.droite}>
            <form className={s.champ} action={bookingHref(locale)} method="get" onSubmit={envoyer}>
              <label className={s.cache} htmlFor="appel-projet">
                {appel.label}
              </label>
              <input
                ref={champRef}
                id="appel-projet"
                type="text"
                autoComplete="off"
                maxLength={LONGUEUR_PROJET}
                placeholder={main ? appel.attente : exemple}
                onFocus={() => setMain(true)}
              />
              <button type="submit" className="btn btn--primary">
                <span className="btn-lib">
                  {ctaLabel[locale]}
                  <ArrowRight aria-hidden />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
