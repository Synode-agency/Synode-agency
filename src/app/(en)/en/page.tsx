import type { Metadata } from "next";
import { HomePage } from "@/components/site/home-page";
import { getContent } from "@/lib/content";

const c = getContent("en").home;

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: "/en", type: "website", locale: "en_BE" },
  twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
};

export default function Page() {
  return <HomePage locale="en" />;
}
