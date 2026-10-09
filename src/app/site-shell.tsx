import type { CSSProperties, ReactNode } from "react";
import "./globals.css";
import "./studio.css";
import { Toaster } from "@/components/ui/sonner";

// A neutral system sans keeps the interface crisp without a font download.
const sans = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const fontAliases = {
  "--font-sans": sans,
  "--font-heading": sans,
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
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className="h-full"
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
          {/* Sans JavaScript, la pile du hero reste sur sa première carte :
              elle est déjà dessinée en entier, seules les animations et la
              rotation manquent. Rien à corriger ici. */}
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
