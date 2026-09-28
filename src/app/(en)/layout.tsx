import type { Metadata } from "next";
import { SiteShell, siteUrl } from "@/app/site-shell";
import { getContent } from "@/lib/content";

const { site } = getContent("en");

/** La racine anglaise. Voir le layout français pour la raison des deux. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: "en",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
