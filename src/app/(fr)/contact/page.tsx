import type { Metadata } from "next";
import { ContactPage } from "@/components/site/contact-page";
import { getContent } from "@/lib/content";

const c = getContent("fr").contact;
const prefix = "";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}/contact`,
    languages: { fr: "/contact", en: "/en/contact" },
  },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: `${prefix}/contact`, type: "website" },
};

export default function Page() {
  return <ContactPage locale="fr" />;
}
