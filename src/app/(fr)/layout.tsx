import type { Metadata } from "next";
import { SiteShell, siteUrl } from "@/app/site-shell";
import { getContent } from "@/lib/content";

const { site } = getContent("fr");

/**
 * La racine française.
 *
 * Il y a DEUX layouts racine, un par langue, parce que `<html lang>` doit se
 * trouver dans le HTML servi : un moteur de recherche ou un lecteur d'écran
 * le lit avant qu'aucun script ne tourne, donc le corriger après hydratation
 * n'a jamais suffi. Les groupes de routes permettent à `(fr)` et `(en)`
 * d'avoir chacun son layout sans changer une seule URL.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="fr">{children}</SiteShell>;
}
