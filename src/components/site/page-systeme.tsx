import type { ReactNode } from "react";

/**
 * LE GABARIT DES PAGES « SYSTÈME » : la 404, la page d'erreur et Merci
 * (28/11/2026, maquettes choisies par Antonino : 404 « A », Erreur « A »,
 * Merci « B »). Un écran plein sur le fond nuit de l'accueil, la barre du
 * haut transparente par-dessus ; les styles sont dans `refonte.css`
 * (« LES PAGES SYSTÈME »).
 *
 * - `centre` (404, erreur) : le bloc centré sur ordinateur, aligné à
 *   gauche sur téléphone, comme le hero de l'accueil ;
 * - `deux` (Merci) : le message à gauche, les étapes à droite dès 1024px,
 *   l'un sous l'autre en dessous.
 *
 * Sans `"use client"` ni rien de propre au serveur : la page d'erreur, un
 * composant client, s'en sert aussi.
 */
export function PageSysteme({ variante = "centre", children }: { variante?: "centre" | "deux"; children: ReactNode }) {
  return (
    <section id="top" className={`page-systeme page-systeme--${variante}`}>
      <div className="col page-systeme-col">{children}</div>
    </section>
  );
}
