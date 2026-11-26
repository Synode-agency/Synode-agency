import { Castoro } from "next/font/google";

/* LA POLICE DES MOTS EN COULEUR : Castoro italique (choisie par Antonino
   sur la planche de maquettes, après Instrument Serif, Bodoni Moda et
   Fraunces). Une seule graisse, la normale : jamais de faux gras.
   Déclarée une seule fois ici (26/11/2026) : l'accueil s'en sert pour ses
   titres, et la barre et les menus pour le mot « Services », sur toutes
   les pages (le gabarit commun pose sa variable, `--font-accent`, sur
   `<html>`). `next/font` la sert depuis le site lui-même. Licence libre
   (OFL). */
export const accentFont = Castoro({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});
