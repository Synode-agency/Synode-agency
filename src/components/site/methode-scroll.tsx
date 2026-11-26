"use client";

import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content";
import { SectionNuit } from "@/components/site/section-nuit";
import { TitreAnime } from "@/components/site/titre-anime";
import { cx } from "@/lib/cx";
import s from "./methode-scroll.module.css";

/* Les outils du calcul, et le rythme du texte de « Notre approche »
   (`approach-scroll.tsx`) : le même effet ici (demande d'Antonino,
   25/11/2026). */
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
/* Le lissage : la progression rejoint le défilement en douceur, par deux
   amortissements en chaîne (constante de temps de chacun, en secondes). */
const LISSAGE = 0.14;
/* Les mots s'éclairent pendant le blocage, de 4 % à 90 % de sa durée. */
const MOTS: [number, number] = [0.04, 0.9];

type Methode = SiteContent["home"]["methode"];
type Mot = { texte: string; type: "titre" | "cle" | "desc" };

/* Les mots de chaque étape, dans l'ordre, chacun avec son type (début de
   titre, mot clé ou description), coupés sur les espaces. */
function decouper(etapes: Methode["etapes"]): Mot[][] {
  return etapes.map((etape) => {
    const parties: [string, Mot["type"]][] = [
      [etape.debut, "titre"],
      [etape.cle, "cle"],
      [etape.description, "desc"],
    ];
    return parties.flatMap(([texte, type]) => texte.split(" ").filter(Boolean).map((mot) => ({ texte: mot, type })));
  });
}

/**
 * « NOTRE MÉTHODE », LA SECTION « COMMENT ÇA MARCHE » DE L'ACCUEIL
 * (25/11/2026, fiche « 4a · Une seule phrase » d'Antonino).
 *
 * L'en-tête est celui des services et des réalisations (`TitreAnime`) :
 * « Construisons la suite, » et une fin qui change en boucle ; à droite,
 * à la place de leur lien, l'étiquette « Notre méthode », sans lien
 * (demande d'Antonino du 25/11/2026).
 *
 * Les trois étapes forment un seul paragraphe, une étape par ligne (à la
 * place des numéros 01, 02, 03 : choix « A » d'Antonino sur maquettes, le
 * 25/11/2026). Pendant le défilement, la
 * section reste fixée à l'écran (elle fait 190vh : environ un écran de
 * blocage), le temps que ses mots s'éclairent un à un, comme le texte de
 * « Notre approche » : même progression (sur le blocage), même lissage ;
 * puis la page reprend son défilement. En remontant, ils redeviennent
 * sombres.
 *
 * Le fond passe du blanc des réalisations au bleu nuit, d'un bloc sur tout
 * l'écran, comme des services (`SectionNuit`, avec le bas des réalisations) ;
 * il redevient clair à l'appel final.
 *
 * Seule la propriété `color` des mots change, directement dans le DOM : pas
 * de nouveau rendu à chaque pixel. Rendu côté serveur avec tous les mots
 * éclairés (lisible sans script). Sans mouvement (`prefers-reduced-motion`),
 * pas de blocage et tout est éclairé. Le paragraphe reste du vrai texte.
 */
export function MethodeScroll({ methode, className }: { methode: Methode; className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const texteRef = useRef<HTMLParagraphElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const etapes = decouper(methode.etapes);

  useEffect(() => {
    const section = sectionRef.current;
    const texte = texteRef.current;
    if (!section || !texte) return;
    const spans = Array.from(texte.querySelectorAll<HTMLElement>("[data-mot]"));
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    let eclaires = -1;

    // Les n premiers mots prennent leur couleur (celle de leur type, dans la
    // feuille de style) ; les autres restent sombres.
    const peindre = (n: number) => {
      if (n === eclaires) return;
      eclaires = n;
      spans.forEach((mot, i) => {
        const couleur = i < n ? "" : "var(--m-eteint)";
        if (mot.style.color !== couleur) mot.style.color = couleur;
      });
    };

    // La progression du blocage, mesurée sur la section : 0 quand le bloc se
    // fixe en haut de l'écran, 1 quand il repart avec la page. Sa course :
    // la hauteur de la section, moins sa marge du bas (l'écart avec la
    // section suivante) et la hauteur du bloc, qui n'occupe plus tout
    // l'écran (25/11/2026 : l'écart avec la suite ne dépend plus de la
    // hauteur de l'écran).
    const progression = () => {
      const bas = parseFloat(getComputedStyle(section).paddingBottom) || 0;
      const course = section.offsetHeight - bas - (pinRef.current?.offsetHeight ?? window.innerHeight);
      const p = -section.getBoundingClientRect().top / Math.max(1, course);
      return Number.isFinite(p) ? clamp(p) : 0;
    };

    let lisse: number | null = null;
    let relais = 0;
    let derniere = 0;
    let enMouvement = false;
    let raf = 0;
    const frame = (now: number) => {
      raf = 0;
      if (reduit.matches) {
        lisse = null;
        peindre(spans.length);
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
      peindre(Math.round(seg(lisse, ...MOTS) * spans.length));
      if (enMouvement) raf = requestAnimationFrame(frame);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // Filet de sécurité : un calcul toutes les 120 ms, seulement si la page a
    // défilé sans que l'évènement arrive.
    const racine = document.scrollingElement ?? document.documentElement;
    let dernier = racine.scrollTop;
    const filet = window.setInterval(() => {
      if (racine.scrollTop === dernier) return;
      dernier = racine.scrollTop;
      request();
    }, 120);

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduit.addEventListener("change", request);
    frame(performance.now());
    return () => {
      window.clearInterval(filet);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduit.removeEventListener("change", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="etapes" className={cx(s.section, className)} aria-label={methode.label}>
      {/* Le bleu nuit couvre aussi le haut des témoignages, visible en bas
          de l'écran, et prend fin à leur arrivée (sans témoignages, à
          l'appel final, dont la coquille est blanche elle aussi) : jamais
          d'écran coupé en deux couleurs. */}
      <SectionNuit aussi="#realisations, #temoignages, main > .card-shell" jusqua="#temoignages, main > .card-shell" />
      <div ref={pinRef} className={s.pin}>
        <div className={cx("section-heading home-section-heading", s.entete)}>
          <TitreAnime
            prefix={methode.title.prefix}
            rotating={methode.title.rotating}
            full={methode.title.full}
            fullEnd={methode.title.fullEnd}
          />
          <p className={s.etiquette}>{methode.label}</p>
        </div>
        <p ref={texteRef} className={s.texte}>
          {etapes.map((mots, k) => (
            <span key={k} className={s.etape}>
              {mots.map((mot, i) => (
                <span key={i} data-mot="" className={cx(s.mot, mot.type === "cle" && s.cle, mot.type === "desc" && s.desc)}>
                  {mot.texte}
                  {/* Un nombre reste avec son unité : « 30 min. ». */}
                  {/^\d+$/.test(mot.texte) ? " " : " "}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
