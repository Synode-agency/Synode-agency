"use client";

import { useEffect } from "react";

/* Les boutons du site qui suivent la souris. */
const BOUTONS = ".btn, .site-header-contact, .services-index a";

/* Le décalage au bord du bouton, en px : le bouton lui-même, puis son texte
   EN PLUS (il suit donc un peu plus que le bouton, ce qui donne la
   profondeur). */
const BOUTON = { x: 7, y: 5 };
const TEXTE = { x: 4, y: 3 };

const borne = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * LES BOUTONS AIMANTÉS (25/11/2026, variante C choisie par Antonino sur la
 * planche de maquettes, après deux essais sur l'arrondi refusés).
 *
 * Au survol à la souris, le bouton suit un peu le curseur et son texte
 * (`.btn-lib`) un peu plus, comme si on le touchait ; il revient en douceur
 * quand la souris s'en va. Un seul écouteur pour tout le site, sur le
 * document : les boutons de chaque page, présents ou à venir, sont pris
 * sans rien brancher sur eux. Le mouvement lui-même est dans `refonte.css`
 * (variables `--aimant-*` et attribut `data-aimant` pendant qu'il suit).
 *
 * Rien au toucher, rien sur un bouton désactivé, rien quand le visiteur
 * limite les animations.
 */
export function BoutonsAimantes() {
  useEffect(() => {
    const souris = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)");
    let actif: HTMLElement | null = null;

    const relache = () => {
      if (!actif) return;
      actif.removeAttribute("data-aimant");
      for (const nom of ["--aimant-x", "--aimant-y", "--aimant-lx", "--aimant-ly"]) actif.style.removeProperty(nom);
      actif = null;
    };

    const bouge = (e: PointerEvent) => {
      const cible = e.target instanceof Element ? e.target.closest<HTMLElement>(BOUTONS) : null;
      const bouton = e.pointerType === "mouse" && souris.matches && !reduit.matches ? cible : null;
      if (bouton !== actif) relache();
      if (!bouton || bouton.matches(":disabled")) return;
      // Le centre du bouton SANS le décalage déjà appliqué : sinon, en
      // avançant vers la souris, il fausserait sa propre mesure.
      const r = bouton.getBoundingClientRect();
      const dejaX = parseFloat(bouton.style.getPropertyValue("--aimant-x")) || 0;
      const dejaY = parseFloat(bouton.style.getPropertyValue("--aimant-y")) || 0;
      const dx = borne((e.clientX - (r.left - dejaX + r.width / 2)) / (r.width / 2));
      const dy = borne((e.clientY - (r.top - dejaY + r.height / 2)) / (r.height / 2));
      actif = bouton;
      bouton.setAttribute("data-aimant", "");
      bouton.style.setProperty("--aimant-x", `${(dx * BOUTON.x).toFixed(2)}px`);
      bouton.style.setProperty("--aimant-y", `${(dy * BOUTON.y).toFixed(2)}px`);
      bouton.style.setProperty("--aimant-lx", `${(dx * TEXTE.x).toFixed(2)}px`);
      bouton.style.setProperty("--aimant-ly", `${(dy * TEXTE.y).toFixed(2)}px`);
    };

    document.addEventListener("pointermove", bouge, { passive: true });
    document.documentElement.addEventListener("pointerleave", relache);
    window.addEventListener("scroll", relache, { passive: true });
    window.addEventListener("blur", relache);
    return () => {
      document.removeEventListener("pointermove", bouge);
      document.documentElement.removeEventListener("pointerleave", relache);
      window.removeEventListener("scroll", relache);
      window.removeEventListener("blur", relache);
      relache();
    };
  }, []);

  return null;
}
