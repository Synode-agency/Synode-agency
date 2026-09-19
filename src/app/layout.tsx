import type { Metadata } from "next";
import { Archivo, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteBackground } from "@/components/site/site-background";

/**
 * Three faces, no more. Archivo for every heading (a neutral Swiss grotesque),
 * Inter for running text, Geist Mono for the numbered labels and small caps.
 * `--font-archivo` and `--font-plex` are kept as aliases so the offer cards'
 * existing classes keep resolving, they now point at the same two families.
 */
const fontHeading = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      className={`dark ${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} h-full`}
    >
      <head>
        <noscript>
          {/* Scroll-reveal content stays visible without JS */}
          <style>{`.reveal{opacity:1 !important;transform:none !important;animation:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* One fixed surface behind the whole site — every page scrolls over it */}
        <SiteBackground />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
