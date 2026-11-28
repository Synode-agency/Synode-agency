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
 * Depuis le 23/11/2026, elle sert AUSSI les adresses inconnues sous /en et
 * les offres ou réalisations qui n'existent pas (`dynamicParams = false`
 * sur les pages [slug]) : `notFound()` donnait une page vide avec deux
 * layouts racine. Sa ligne en anglais vers /en est retirée depuis le
 * 28/11/2026 : la 404 n'a plus que son titre, sa phrase et son bouton
 * (maquette « A », demande d'Antonino).
 */
export const metadata: Metadata = {
  title: "Page introuvable · Synode",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <SiteShell lang="fr">
      <NotFoundPage locale="fr" />
    </SiteShell>
  );
}
