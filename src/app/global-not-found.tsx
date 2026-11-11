import type { Metadata } from "next";
import { SiteShell } from "@/app/site-shell";
import { NotFoundPage } from "@/components/site/simple-pages";

/**
 * LA 404 DES ADRESSES QUI NE CORRESPONDENT À AUCUNE ROUTE.
 *
 * Le site a DEUX layouts racine, `(fr)` et `(en)` : Next ne sait donc pas
 * dans lequel composer une page introuvable comme `/page-inexistante`, et
 * servait sa page brute — écran noir, en anglais, sans menu ni lien de
 * retour. Ce fichier, activé par `experimental.globalNotFound` dans
 * `next.config.ts`, la remplace par la vraie page 404 du site, en français,
 * la langue par défaut.
 *
 * Il contourne les layouts : c'est `SiteShell` qui apporte `<html>`, les
 * feuilles de style et les scripts, exactement comme dans les deux layouts.
 *
 * Les adresses inconnues sous `/en` n'arrivent pas ici : elles sont prises
 * par `(en)/en/[...missing]`, qui les envoie vers la 404 anglaise.
 */
export const metadata: Metadata = {
  title: "Page introuvable — Synode",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <SiteShell lang="fr">
      <NotFoundPage locale="fr" />
    </SiteShell>
  );
}
