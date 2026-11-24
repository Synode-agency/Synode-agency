import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import { SiteShell, siteUrl } from "@/app/site-shell";
import { getContent } from "@/content";

const { home } = getContent("en");

/** La racine anglaise. Voir le layout français pour la raison des deux. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: home.metaTitle,
    template: `%s · ${SITE_NAME}`,
  },
  description: home.metaDescription,
  openGraph: {
    type: "website",
    locale: "en_BE",
    siteName: SITE_NAME,
    title: home.metaTitle,
    description: home.metaDescription,
  },
  twitter: { card: "summary_large_image" },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
