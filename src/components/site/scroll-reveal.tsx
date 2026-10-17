"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * LES APPARITIONS, DITES « REVEAL ».
 *
 * Un seul utilitaire pour tout le site, monté une fois dans le shell. Aucune
 * page ne déclare rien. C'est la condition posée dans
 * `docs/SITE_A_COMPLETER.md`, « Les animations ».
 *
 * ── DEUX MOMENTS ────────────────────────────────────────────────────────
 * 1. LE HÉROS, à l'arrivée sur la page — toutes les pages SAUF l'accueil.
 *    Le surtitre et le titre sont là d'emblée. Puis, dans cet ordre : le
 *    paragraphe, les boutons, le visuel de droite. (Décidé le 17/10.)
 * 2. LES SECTIONS, au défilement. Illustrations, éléments graphiques et
 *    paragraphes apparaissent ; titres et surtitres restent fixes ; les
 *    boutons arrivent un temps après le texte, comme la colonne de droite.
 *    La FAQ ne bouge pas.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── LA DIRECTION SUIT LA POSITION ───────────────────────────────────────
 * Au bureau, un bloc arrive du côté où il se trouve : colonne de gauche par
 * la gauche, colonne de droite par la droite, pleine largeur par le bas.
 * Un seul mouvement par section, qui converge vers son centre, plutôt qu'un
 * mélange au hasard. Sous 900px, tout est sur une colonne : par le bas
 * seulement, un glissement latéral sur écran étroit se lit comme une
 * secousse.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Les trois garde-fous de la spécification ────────────────────────────
 * 1. Visible SANS JavaScript. Rien n'est masqué par le CSS de départ. Le
 *    héros fait exception le temps d'un instant : un script de `<head>`
 *    pose `data-rv-hero` sur `<html>` AVANT le premier affichage, pour qu'on
 *    ne voie pas le héros apparaître, disparaître puis revenir. Ce script ne
 *    tourne évidemment qu'avec JavaScript, et il retire l'attribut au bout
 *    de 2,5s si cet utilitaire n'a pas pris le relais.
 * 2. `prefers-reduced-motion` SUPPRIME l'animation, héros compris.
 * 3. Rien ne bloque la lecture : chaque bloc ne s'anime qu'une fois, et ce
 *    qui est déjà passé n'est jamais masqué.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ⚠ UN ATTRIBUT `data-rv`, ET JAMAIS UNE CLASSE : plusieurs composants
 * réécrivent leur `className` après le chargement, ce qui effaçait la
 * classe de la première version.
 *
 * ⚠ `useLayoutEffect` et non `useEffect` : lors d'une navigation interne,
 * le nouveau héros doit être masqué AVANT que le navigateur ne le peigne.
 */

/* ---- Les sections ---- */
const RACINES = "main > section.band:not(#top):not(#faq) > .col, main > .card-shell > .card-panel > .col";
const FIXE = "h1, h2, h3, h4, .lede-kicker, .eyebrow, .studio-hero-kicker, .badge";
const BOUTON = ".btn, .btn-row, a.go";
const ENTETE = "h1, h2, .lede-kicker, .eyebrow, .studio-hero-kicker";

/* ---- Le héros ---- */
const HEROS = "main > section#top:not(.home-page-hero)";
const HEROS_TEXTE = ".studio-hero-copy > p, .lede > .lede-text, .work-status";
const HEROS_BOUTONS = ".studio-hero-copy > .btn-row, .studio-hero-copy > .hero-reassurance";
const HEROS_VISUEL = ".hero-visual-desktop, [class*='hero-compact-module'][class*='__card']";
/** Les trois temps du héros. Lents exprès : on doit les voir arriver. */
const TEMPS_HEROS = { texte: 250, boutons: 750, visuel: 1250 };

/** Le décalage entre deux blocs qui arrivent ensemble, et son plafond. */
const PAS = 120;
const PLAFOND = 360;
/** Le supplément des boutons et de la colonne de droite. */
const RETARD = 350;

let premierPassage = true;

function unites(racine: Element, out: HTMLElement[]) {
  for (const enfant of Array.from(racine.children)) {
    if (!(enfant instanceof HTMLElement)) continue;
    if (enfant.matches(FIXE)) continue;
    if (enfant.matches(BOUTON)) { enfant.dataset.rvLate = ""; out.push(enfant); continue; }
    /* On ouvre un bloc s'il contient un titre ou un surtitre, ou s'il porte
       des boutons au premier niveau. Un bouton enfoui dans un visuel — le
       calendrier, un outil — ne l'ouvre pas : le visuel part entier. */
    if (enfant.querySelector(ENTETE) || Array.from(enfant.children).some(c => c.matches(".btn, .btn-row"))) {
      unites(enfant, out); continue;
    }
    out.push(enfant);
  }
}

const visible = (el: HTMLElement) => el.getBoundingClientRect().height > 0;

function sensDe(el: HTMLElement, etroit: boolean): string {
  if (etroit || el.hasAttribute("data-rv-late")) return "bottom";
  const col = el.closest(".col");
  if (!col) return "bottom";
  const c = col.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  if (r.width >= c.width * 0.66) return "bottom";
  return r.left + r.width / 2 < c.left + c.width / 2 ? "left" : "right";
}

function nettoyer(el: HTMLElement) {
  delete el.dataset.rv;
  delete el.dataset.rvFrom;
  delete el.dataset.rvLate;
  el.style.transitionDelay = "";
}

function lancer(el: HTMLElement, delai: number) {
  el.style.transitionDelay = `${delai}ms`;
  el.dataset.rv = "in";
  /* `transitionend` remonte depuis les enfants : on n'écoute que la fin du
     bloc lui-même, sinon un visuel animé à l'intérieur ferait tomber
     l'attribut en pleine apparition. */
  const fin = (ev: TransitionEvent) => {
    if (ev.target !== el) return;
    el.removeEventListener("transitionend", fin);
    nettoyer(el);
  };
  el.addEventListener("transitionend", fin);
}

export function ScrollReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const html = document.documentElement;
    const premier = premierPassage;
    premierPassage = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      delete html.dataset.rvHero;
      return;
    }
    const etroit = window.matchMedia("(max-width: 900px)").matches;
    const pli = window.innerHeight;
    const tous: HTMLElement[] = [];
    const surveilles: HTMLElement[] = [];

    /* ---- 1 · Le héros ----
       Au premier chargement, on ne l'anime que si le script de `<head>` l'a
       bien gardé masqué : s'il a déjà rendu la main (téléphone lent), le
       héros est affiché et on ne le cache pas après coup. */
    const heros = document.querySelector<HTMLElement>(HEROS);
    const herosPermis = heros && (!premier || "rvHero" in html.dataset);
    const sequence: Array<[HTMLElement, number]> = [];
    if (heros && herosPermis) {
      const groupes: Array<[string, number, string]> = [
        [HEROS_TEXTE, TEMPS_HEROS.texte, "left"],
        [HEROS_BOUTONS, TEMPS_HEROS.boutons, "bottom"],
        [HEROS_VISUEL, TEMPS_HEROS.visuel, "right"],
      ];
      for (const [sel, delai, sens] of groupes) {
        heros.querySelectorAll<HTMLElement>(sel).forEach(el => {
          if (!visible(el)) return;
          el.dataset.rvFrom = etroit ? "bottom" : sens;
          el.dataset.rv = "pending";
          tous.push(el);
          /* Une partie du héros sous l'écran — le visuel, sur téléphone —
             attend d'être atteinte, comme une section. */
          if (el.getBoundingClientRect().top < pli) sequence.push([el, delai]);
          else surveilles.push(el);
        });
      }
    }
    /* Les blocs du héros tiennent maintenant leur propre état masqué : la
       garde de `<html>` peut tomber sans rien laisser paraître. */
    delete html.dataset.rvHero;

    /* ---- 2 · Les sections, seulement ce qui est sous l'écran ---- */
    const unitesSections: HTMLElement[] = [];
    document.querySelectorAll(RACINES).forEach(r => unites(r, unitesSections));
    for (const el of unitesSections) {
      if (!visible(el) || el.getBoundingClientRect().top <= pli) { delete el.dataset.rvLate; continue; }
      el.dataset.rvFrom = sensDe(el, etroit);
      el.dataset.rv = "pending";
      tous.push(el);
      surveilles.push(el);
    }

    /* Le héros part deux images plus tard : il faut que l'état masqué ait
       été peint une fois, sinon la transition n'aurait pas de départ. */
    const image = requestAnimationFrame(() => requestAnimationFrame(() => {
      sequence.forEach(([el, delai]) => lancer(el, delai));
    }));

    const io = new IntersectionObserver(entries => {
      const arrivants = entries.filter(e => e.isIntersecting).map(e => e.target as HTMLElement);
      arrivants.forEach((el, i) => {
        io.unobserve(el);
        const tard = el.hasAttribute("data-rv-late") || el.dataset.rvFrom === "right" ? RETARD : 0;
        lancer(el, Math.min(i * PAS, PLAFOND) + tard);
      });
    }, { threshold: 0 });
    surveilles.forEach(el => io.observe(el));

    /* Filet : à l'impression et en quittant la page, tout redevient visible. */
    const toutMontrer = () => tous.forEach(nettoyer);
    window.addEventListener("beforeprint", toutMontrer);
    return () => {
      cancelAnimationFrame(image);
      io.disconnect();
      window.removeEventListener("beforeprint", toutMontrer);
      toutMontrer();
    };
  }, [pathname]);

  return null;
}
