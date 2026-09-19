import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Bricolage_Grotesque, Inter } from "next/font/google";
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

const siteUrl = "https://synode.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Synode — Gérez votre entreprise sans le superflu",
    template: "%s — Synode",
  },
  description:
    "Automatisation des processus, agents IA branchés sur vos données, logiciels et outils métier sur mesure. Nous mesurons le gain avant d'écrire une ligne de code.",
  keywords: [
    "automatisation",
    "agents IA",
    "intelligence artificielle",
    "logiciel sur mesure",
    "CRM",
    "PME",
    "indépendants",
    "audit de processus",
    "Belgique",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Synode",
    title: "Synode — Gérez votre entreprise sans le superflu",
    description:
      "Automatisation, agents IA, logiciels et outils métier sur mesure pour PME. Deux offres, séparément ou combinées.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synode — Gérez votre entreprise sans le superflu",
    description:
      "Automatisation, agents IA et solutions sur mesure pour PME et indépendants.",
  },
  alternates: {
    canonical: siteUrl,
    languages: { fr: `${siteUrl}/`, en: `${siteUrl}/en` },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontLabel.variable} h-full`}
      style={fontAliases}
    >
      <head>
        <noscript>
          {/* Scroll-reveal content stays visible without JS */}
          <style>{`.reveal{opacity:1 !important;transform:none !important;animation:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
