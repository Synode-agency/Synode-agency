"use client";

import { useEffect, useRef } from "react";

/**
 * LA SECTION PASSE EN BLEU NUIT AU DÉFILEMENT (25/11/2026, demande
 * d'Antonino, à la manière d'In The Pocket).
 *
 * Posé dans une section, il lui donne `data-nuit` dès que son haut passe
 * au-dessus de `seuil` (part de la hauteur de l'écran, 60 % par défaut) ;
 * elle le perd en remontant. La feuille de style fait le reste : ses
 * couleurs s'inversent.
 *
 * LE FOND EST UNIQUE (demande d'Antonino du 25/11/2026 : « je veux que le
 * fond soit uni », sans ligne entre les sections) : un calque fixe, de la
 * taille de l'écran (`.fond-nuit`, ajouté au `body`), porte le bleu nuit
 * et la lueur du hero, toujours centrée sur l'écran. Les sections qui
 * basculent deviennent transparentes et le laissent voir.
 *
 * `aussi` : d'autres éléments (sélecteur) qui basculent en même temps (la
 * section du dessus), pour que tout l'écran change de couleur d'un seul
 * tenant.
 *
 * `jusqua` : la section suivante (sélecteur). Dès que SON haut passe le
 * même seuil, l'écran redevient clair : seule la section est en bleu nuit
 * (demande d'Antonino du 25/11/2026 : « Ce que nous avons construit »
 * redevient blanc). Elle est aussi dans `aussi` : tant que l'écran est en
 * bleu nuit, son haut, déjà visible en bas de l'écran, l'est aussi, et
 * tout l'écran change de couleur d'un bloc.
 */
export function SectionNuit({ seuil = 0.6, aussi, jusqua }: { seuil?: number; aussi?: string; jusqua?: string }) {
  const repere = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = repere.current?.closest("section");
    if (!section) return;
    // Le fond unique, sous tout le contenu.
    const fond = document.createElement("div");
    fond.className = "fond-nuit";
    fond.setAttribute("aria-hidden", "true");
    document.body.appendChild(fond);
    const cibles: Element[] = [fond, section, ...(aussi ? Array.from(document.querySelectorAll(aussi)) : [])];
    const suivante = jusqua ? document.querySelector(jusqua) : null;
    let raf = 0;
    const mesure = () => {
      raf = 0;
      const limite = seuil * window.innerHeight;
      const nuit =
        section.getBoundingClientRect().top < limite && (!suivante || suivante.getBoundingClientRect().top >= limite);
      for (const c of cibles) c.toggleAttribute("data-nuit", nuit);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(mesure);
    };
    mesure();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(raf);
      for (const c of cibles) c.removeAttribute("data-nuit");
      fond.remove();
    };
  }, [seuil, aussi, jusqua]);

  return <span ref={repere} hidden />;
}
