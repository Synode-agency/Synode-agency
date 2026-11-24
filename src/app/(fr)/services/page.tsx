import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ServicesPage } from "@/components/site/services-page";
import { ROUTES, getContent } from "@/content";

const c = getContent("fr").services;

export const metadata: Metadata = pageMetadata({ locale: "fr", route: ROUTES.services, title: c.metaTitle, description: c.metaDescription });

export default function Page() {
  return <ServicesPage locale="fr" />;
}
