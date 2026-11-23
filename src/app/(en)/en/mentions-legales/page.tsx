import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { LegalPage } from "@/components/site/simple-pages";
import { getContent } from "@/lib/content";

const c = getContent("en").legal;

export const metadata: Metadata = {
  title: c.noticeTitle,
  description: c.noticeDescription,
  openGraph: { ...ogBase("en"), title: withBrand(c.noticeTitle), description: c.noticeDescription, url: "/en/mentions-legales" },
  alternates: { canonical: "/en/mentions-legales", languages: { fr: "/mentions-legales", en: "/en/mentions-legales", "x-default": "/mentions-legales" } },
};

export default function Page() {
  return <LegalPage locale="en" kind="notice" />;
}
