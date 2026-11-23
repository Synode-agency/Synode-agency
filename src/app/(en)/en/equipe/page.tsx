import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { TeamPage } from "@/components/site/team-page";
import { getContent } from "@/lib/content";

const c = getContent("en").team;
const prefix = "/en";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}/equipe`,
    languages: { fr: "/equipe", en: "/en/equipe", "x-default": "/equipe" },
  },
  openGraph: { ...ogBase("en"), title: withBrand(c.metaTitle), description: c.metaDescription, url: `${prefix}/equipe`, type: "website" },
  twitter: { card: "summary_large_image", title: withBrand(c.metaTitle), description: c.metaDescription },
};

export default function Page() {
  return <TeamPage locale="en" />;
}
