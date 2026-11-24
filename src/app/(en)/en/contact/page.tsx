import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/site/contact-page";
import { ROUTES, getContent } from "@/content";

const c = getContent("en").contact;

export const metadata: Metadata = pageMetadata({ locale: "en", route: ROUTES.contact, title: c.metaTitle, description: c.metaDescription });

export default function Page() {
  return <ContactPage locale="en" />;
}
