import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * LA POLICE DES ILLUSTRATIONS COORY : Plus Jakarta Sans, 400 à 700, comme
 * le lien Google Fonts des originaux.
 *
 * `next/font` télécharge les fichiers au moment du build et les sert depuis
 * le site : le navigateur du visiteur n'appelle jamais Google. Rien à
 * déclarer dans la politique de confidentialité, aucun bandeau à prévoir.
 *
 * La famille garde son vrai nom, « Plus Jakarta Sans » : les styles inline
 * des originaux, qui la nomment ainsi, la trouvent donc sans rien changer.
 * La classe `variable` n'est posée sur la racine des illustrations que pour
 * rattacher la police à leurs pages ; le reste du site ne l'utilise pas.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-coory-illustrations",
});
