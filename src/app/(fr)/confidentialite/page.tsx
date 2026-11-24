import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { LegalPage } from "@/components/site/simple-pages";
import { getContent } from "@/content";

const c = getContent("fr").legal;

export const metadata: Metadata = {
  title: c.privacyTitle,
  description: c.privacyDescription,
  openGraph: { ...ogBase("fr"), title: withBrand(c.privacyTitle), description: c.privacyDescription, url: "/confidentialite" },
  alternates: { canonical: "/confidentialite", languages: { fr: "/confidentialite", en: "/en/confidentialite", "x-default": "/confidentialite" } },
};

export default function Page() {
  return <LegalPage locale="fr" kind="privacy" />;
}
