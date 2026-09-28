import type { Metadata } from "next";
import { MethodPage } from "@/components/site/method-page";
import { getContent } from "@/lib/content";

const c = getContent("en").method;
const prefix = "/en";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}/methode`,
    languages: { fr: "/methode", en: "/en/methode" },
  },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: `${prefix}/methode`, type: "website" },
};

export default function Page() {
  return <MethodPage locale="en" />;
}
