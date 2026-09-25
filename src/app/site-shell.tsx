import type { CSSProperties, ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

/**
 * One sans for the whole site. The monospace that used to carry the small
 * labels is gone: it read as terminal output, and wide letter-spacing on a
 * light weight does the same job without the connotation.
 * Inter carries both the headlines and the running text: at heavy weights
 * with tight tracking it holds a display line, and it is the most neutral
 * face available, which is what an agency site is after.
 *
 * `--font-heading`, `--font-archivo` and `--font-plex` all resolve to it,
 * which keeps every existing class working without a second download.
 */
/**
 * La police du site : Anodina, déposée dans `src/fonts`.
 *
 * Une seule famille pour tout, titres et texte courant — c'est le principe
 * posé depuis le début : la différence entre un titre et un paragraphe se
 * fait par la taille et la graisse, jamais par un changement de police.
 *
 * Quatre fichiers statiques sur les cinq fournis. L'ExtraLight (250) n'est
 * pas déclaré : aucune règle du site ne descend sous 300, et un poids
 * déclaré est un poids préchargé.
 *
 * La famille n'a ni 500 ni 600, alors que le site en demande. Ce n'est pas
 * un problème : le navigateur choisit le fichier réel le plus proche — 500
 * tombe sur 400, 600 sur 700 — donc aucun faux gras n'est fabriqué. Les
 * éléments en 600 sortiront simplement un cran plus gras que prévu.
 */
const fontSans = localFont({
  src: [
    { path: "../fonts/Anodina-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Anodina-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Anodina-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Anodina-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const fontChapter = Bebas_Neue({
  variable: "--font-chapter",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/**
 * The heading slot, and the two aliases the offer cards still carry, all
 * point at the one sans. Set on <html> rather than in the theme block, where
 * `--font-heading: var(--font-sans)` on the same element would be a
 * self-reference and resolve to nothing.
 */
const fontAliases = {
  "--font-heading": fontSans.style.fontFamily,
  "--font-archivo": fontSans.style.fontFamily,
  "--font-plex": fontSans.style.fontFamily,
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
    <html
      lang={lang}
      className={[
        fontSans.variable,
        fontChapter.variable,
        "h-full",
      ].join(" ")}
      style={fontAliases}
    >
      <head>
        {/* A reload lands at the top of the page, not where the visitor had
            scrolled to. It runs before first paint, so the browser never gets
            to restore the old offset and there is no jump to correct. An
            anchor in the URL still wins: the hash is handled after this. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history){history.scrollRestoration='manual'}",
          }}
        />
        <noscript>
          {/* Scroll-reveal content stays visible without JS */}
          <style>{`.reveal{opacity:1 !important;transform:none !important;animation:none !important}`}</style>
          {/* La séquence du mock est en pause tant que `data-shown` n'est pas
              posé, et c'est JavaScript qui le pose. Sans lui, le mock
              resterait figé sur sa première image, donc vide : ici il
              s'affiche directement terminé, et seule la première carte de
              la pile est montrée puisque rien ne peut faire glisser les
              suivantes. */}
          <style>{`.hero-app,.hero-app *{animation:none !important;opacity:1 !important}.hero-app-cursor{display:none !important}.hero-system:not(:first-child){display:none !important}.hero-app-nav-row.is-active{background:var(--sys-tint);color:var(--sys-ink);font-weight:600}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
