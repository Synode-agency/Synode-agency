import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomePage } from "@/components/site/home-page";
import { ROUTES, getContent } from "@/content";

const c = getContent("fr").home;

export const metadata: Metadata = pageMetadata({ locale: "fr", route: ROUTES.home, title: c.metaTitle, description: c.metaDescription });

export default function Page() {
  return <HomePage locale="fr" />;
}
