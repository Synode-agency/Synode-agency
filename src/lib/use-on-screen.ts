"use client";

import { useEffect, useRef, useState } from "react";

/**
 * « CE BLOC EST-IL SOUS LES YEUX DU VISITEUR ? »
 *
 * Les animations récentes du site suivent toutes la même règle : une horloge,
 * gelée dès que le bloc quitte l'écran. Les plus anciennes, écrites avant
 * cette règle, tournaient en permanence — sur l'accueil, quatre minuteurs
 * réveillaient React toutes les 0,7 à 4 secondes pendant que le visiteur
 * lisait le pied de page. Sur un téléphone, ça se paie en batterie.
 *
 * Ce crochet est volontairement MINUSCULE et ne décide de rien : il rend une
 * ref à poser sur le bloc, et un booléen. Chaque composant garde donc sa
 * logique propre — la carte retenue au survol, le mouvement réduit, le cycle
 * arrêté au clic — et n'y ajoute qu'une condition.
 *
 * Il part à `false` : le minuteur n'est armé qu'une fois l'observateur passé,
 * ce qu'il fait dès la première mesure de mise en page. Un bloc visible au
 * chargement démarre donc à l'image suivante, ce qui ne se voit pas, et un
 * bloc situé plus bas ne démarre pas du tout tant qu'on ne l'a pas atteint.
 */
export function useOnScreen<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, onScreen] as const;
}
