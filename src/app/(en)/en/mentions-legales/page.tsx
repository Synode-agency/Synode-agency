import type { Metadata } from "next";
import { LegalPage } from "@/components/site/simple-pages";
import { getContent } from "@/lib/content";

const c = getContent("en").legal;

export const metadata: Metadata = {
  title: c.noticeTitle,
  description: c.noticeDescription,
  alternates: { canonical: "/en/mentions-legales", languages: { fr: "/mentions-legales", en: "/en/mentions-legales" } },
};

export default function Page() {
  return <LegalPage locale="en" kind="notice" />;
}
