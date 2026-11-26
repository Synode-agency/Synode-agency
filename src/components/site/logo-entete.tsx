import { LogoSynode } from "./logo-synode";

/**
 * LE LOGO DE LA BARRE (26/11/2026) : le logo recomposé (`LogoSynode`,
 * « SY » et « ODE » en Manrope autour du N d'Antonino).
 *
 * - En haut de page, sur le hero : tout en blanc. Barre claire (menu
 *   « Services ») ou fond clair sous le logo : lettres noires, N bleu.
 * - Au défilement, « SY » et « ODE » s'effacent ; le N glisse à la place
 *   du S en FAISANT UN TOUR SUR LUI-MÊME, puis reste seul : blanc sur un
 *   fond sombre, bleu sur un fond clair (`data-fond-logo`, mesuré sous le
 *   logo par `SiteHeader`), en fondu.
 * - En revenant tout en haut, le N refait son tour en regagnant sa place,
 *   puis les lettres reviennent.
 * - Sur téléphone, le N seul, tout le temps.
 *
 * Décoratif : le lien qui l'entoure porte son nom (« Accueil »).
 */
export function LogoEntete() {
  return <LogoSynode className="logo-entete" deuxN decoratif />;
}
