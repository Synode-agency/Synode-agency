import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { LegalPage } from "@/components/site/simple-pages";
import { getContent } from "@/content";

const c = getContent("en").legal;

export const metadata: Metadata = {
  title: c.privacyTitle,
  description: c.privacyDescription,
  openGraph: { ...ogBase("en"), title: withBrand(c.privacyTitle), description: c.privacyDescription, url: "/en/confidentialite" },
  alternates: { canonical: "/en/confidentialite", languages: { fr: "/confidentialite", en: "/en/confidentialite", "x-default": "/confidentialite" } },
};

export default function Page() {
  return <LegalPage locale="en" kind="privacy" />;
}
