import type { Metadata } from "next";
import { SITE_NAME, ogBase } from "@/lib/seo";
import { HomePage } from "@/components/site/home-page";
import { getContent } from "@/content";

const c = getContent("fr").home;

export const metadata: Metadata = {
  /* ⚠ `absolute` : sur l'accueil, et seulement là, le nom complet vient
     EN PREMIER (« Synode agency - … », décision du 23/11/2026). Le gabarit
     du layout ne s'applique de toute façon pas au segment qui le déclare. */
  title: { absolute: `${SITE_NAME} - ${c.metaTitle}` },
  description: c.metaDescription,
  alternates: { canonical: "/", languages: { fr: "/", en: "/en", "x-default": "/" } },
  openGraph: { ...ogBase("fr"), title: `${SITE_NAME} - ${c.metaTitle}`, description: c.metaDescription, url: "/" },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} - ${c.metaTitle}`, description: c.metaDescription },
};

export default function Page() {
  return <HomePage locale="fr" />;
}
