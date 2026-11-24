import type { Metadata } from "next";
import { pageMetadata, withBrand } from "@/lib/seo";
import { LegalPage } from "@/components/site/simple-pages";
import { ROUTES, getContent } from "@/content";

const c = getContent("fr").legal;

export const metadata: Metadata = pageMetadata({ locale: "fr", route: ROUTES.legalNotice, title: withBrand(c.noticeTitle), description: c.noticeDescription });

export default function Page() {
  return <LegalPage locale="fr" kind="notice" />;
}
