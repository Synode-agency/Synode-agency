import type { CSSProperties, ReactNode } from "react";
import { Bebas_Neue, Bricolage_Grotesque, Inter } from "next/font/google";
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
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Used only for the names on the paper stack in the Constat. A grotesque
 * like the body face, but drawn with deliberately uneven proportions and
 * cut-in corners, so it carries character without the reading cost of a
 * condensed or serif display face.
 */
const fontLabel = Bricolage_Grotesque({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

/**
 * The face of the five chapter numerals on the landing page.
 *
 * Very condensed and very tall, which is what makes an "01" read as a shape
 * rather than as two digits at the opacity these are set in. One weight, and
 * the only glyphs ever drawn are the digits 0 to 5.
 */
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

export const siteUrl = "https://synode-agency.com";

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
        fontLabel.variable,
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
              s'affiche directement terminé. */}
          <style>{`.hero-app,.hero-app *{animation:none !important;opacity:1 !important}.hero-app-cursor{display:none !important}.hero-app-nav-row.is-active{background:#e8f1fd;color:#0a7ce0;font-weight:600}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
