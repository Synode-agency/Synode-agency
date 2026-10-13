import type { Metadata } from "next";
import { HomePage } from "@/components/site/home-page";
import { getContent } from "@/lib/content";

const c = getContent("en").home;

export const metadata: Metadata = {
  /* ⚠ `absolute`, et la marque écrite à la main : le gabarit `%s — Synode`
     du layout ne s'applique PAS au segment qui le déclare, seulement à ses
     enfants. Sans ça, l'accueil était la seule page du site dont le titre
     ne portait pas la marque. */
  title: { absolute: `${c.metaTitle} — Synode` },
  description: c.metaDescription,
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en", "x-default": "/" } },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: "/en", type: "website", locale: "en_BE" },
  twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
};

export default function Page() {
  return <HomePage locale="en" />;
}
