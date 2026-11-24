import type { CSSProperties, ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./studio.css";
/* Les composants de la refonte du 24/11/2026, après les deux autres. */
import "./refonte.css";
import { ScrollReveal } from "@/components/site/scroll-reveal";

// A neutral system sans keeps the interface crisp without a font download.
const sans = '"Helvetica Neue", Helvetica, Arial, sans-serif';

/* LA POLICE DES TITRES (24/11/2026, choix d'Antonino) : Manrope, pour les
   titres seuls (h1 à h4). `next/font` la sert depuis le site lui-même :
   aucun appel à Google côté visiteur. Licence libre (OFL). */
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const fontAliases = {
  "--font-sans": sans,
  "--font-heading": `var(--font-manrope), ${sans}`,
  "--font-archivo": sans,
  "--font-plex": sans,
  "--font-chapter": sans,
} as CSSProperties;

/* `siteUrl` a déménagé dans `@/lib/site-url` : voir le commentaire là-bas. */
export { siteUrl } from "@/lib/site-url";

/**
 * The document shell, shared by the two root layouts.
 *
 * There are two of them, one per language, because `<html lang>` has to be
 * in the served HTML: a crawler or a screen reader reads it before any
 * script runs, so correcting it after hydration was never enough. Route
 * groups let `(fr)` and `(en)` each own a root layout without changing a
 * single URL. The only cost is that switching language is a full page load
 * rather than a client-side navigation, which for a language switch is the
 * honest behaviour anyway.
 */
export function SiteShell({ lang, children }: { lang: string; children: ReactNode }) {
  return (
    /* `suppressHydrationWarning` : le script ci-dessous pose `data-rv-hero`
       sur `<html>` AVANT que React ne prenne la main, exprès. Sans cette
       mention, React signale l'écart (la pastille « 1 issue » du serveur
       de développement). Elle ne vaut que pour les attributs de `<html>`
       lui-même, pas pour ses enfants. */
    <html
      suppressHydrationWarning
      lang={lang}
      data-scroll-behavior="smooth"
      className={`h-full ${manrope.variable}`}
      style={fontAliases}
    >
      <head>
        {/* ⚠ NO `history.scrollRestoration = 'manual'` here. It was set from
            22/09 to 23/11/2026 so that a reload landed at the top, but it
            applied to every history entry: the Back button then dropped the
            visitor at the top of the previous page instead of where they had
            been (measured: 1674px on /cas-usage, then /contact, then Back,
            landed at 0). Trying to limit it to reloads failed, Chrome keeps
            the mode the page had when it was left. The browser's own
            behaviour is kept: Back and reload both return to the position. */}
        {/* LE HÉROS DES PAGES INTÉRIEURES S'ANIME À L'ARRIVÉE (voir
            `ScrollReveal`). Pour qu'on ne le voie pas s'afficher, disparaître
            puis revenir, ce script le garde masqué AVANT le premier
            affichage, en posant `data-rv-hero` sur `<html>`. Il ne le fait
            pas si le visiteur a demandé moins de mouvement, et il rend la
            main au bout de 2,5s quoi qu'il arrive : si le script de la page
            n'a pas démarré d'ici là, le héros s'affiche normalement. Sans
            JavaScript, il ne tourne pas et rien n'est masqué. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.setAttribute('data-rv-hero','');setTimeout(function(){h.removeAttribute('data-rv-hero')},2500)}}catch(e){}",
          }}
        />
        <noscript>
          {/* Plus de règle `.reveal` ici : les apparitions au défilement
              (`ScrollReveal`) ne masquent rien dans le CSS de départ, c'est le
              script qui pose l'état masqué. Sans JavaScript, il n'y a donc
              rien à démasquer. */}
          {/* Sans JavaScript, la pile du hero reste sur sa première carte :
              elle est déjà dessinée en entier, seules les animations et la
              rotation manquent. Rien à corriger ici. */}
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
