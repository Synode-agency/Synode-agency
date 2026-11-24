import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { LegalPage } from "@/components/site/simple-pages";
import { getContent } from "@/content";

const c = getContent("fr").legal;

export const metadata: Metadata = {
  title: c.noticeTitle,
  description: c.noticeDescription,
  openGraph: { ...ogBase("fr"), title: withBrand(c.noticeTitle), description: c.noticeDescription, url: "/mentions-legales" },
  alternates: { canonical: "/mentions-legales", languages: { fr: "/mentions-legales", en: "/en/mentions-legales", "x-default": "/mentions-legales" } },
};

export default function Page() {
  return <LegalPage locale="fr" kind="notice" />;
}
