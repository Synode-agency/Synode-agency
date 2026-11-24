import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";
import { SiteShell, siteUrl } from "@/app/site-shell";
import { getContent } from "@/content";

const { site } = getContent("en");

/** La racine anglaise. Voir le layout français pour la raison des deux. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} - ${getContent("en").home.metaTitle}`,
    template: `%s - ${SITE_NAME}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    locale: "en_BE",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${getContent("en").home.metaTitle}`,
    description: site.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
