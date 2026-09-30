import type { Metadata } from "next";
import { HomePage } from "@/components/site/home-page";
import { getContent } from "@/lib/content";

const c = getContent("fr").home;

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: "/", languages: { fr: "/", en: "/en" } },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: "/", type: "website", locale: "fr_BE" },
  twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
};

export default function Page() {
  return <HomePage locale="fr" />;
}
