import { Instrument_Serif } from "next/font/google";

/* LA POLICE DES MOTS EN COULEUR : INSTRUMENT SERIF ITALIQUE, sur tout le
   site (27/11/2026, demande d'Antonino : « je préfère Instrument, avec ses
   serifs » ; essayées avant : Castoro, puis Playfair Light). Elle n'existe
   qu'en une graisse, la normale (400), déjà fine et très contrastée : elle
   tranche sur Manrope (500 dans les titres). Jamais de faux gras.
   Déclarée une seule fois ici : le gabarit commun pose sa variable,
   `--font-accent`, sur `<html>`. `next/font` la sert depuis le site
   lui-même. Licence libre (OFL). */
export const accentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});
