import type { Metadata } from "next";
import { LegalPage } from "@/components/site/simple-pages";
import { getContent } from "@/lib/content";

const c = getContent("fr").legal;

export const metadata: Metadata = {
  title: c.privacyTitle,
  description: c.privacyDescription,
  alternates: { canonical: "/confidentialite", languages: { fr: "/confidentialite", en: "/en/confidentialite" } },
};

export default function Page() {
  return <LegalPage locale="fr" kind="privacy" />;
}
