import type { Metadata } from "next";
import { SolutionsPage } from "@/components/site/solutions-page";
import { getContent } from "@/lib/content";

const c = getContent("en").solutions;
const prefix = "/en";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}/solutions`,
    languages: { fr: "/solutions", en: "/en/solutions" },
  },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: `${prefix}/solutions`, type: "website" },
};

export default function Page() {
  return <SolutionsPage locale="en" />;
}
