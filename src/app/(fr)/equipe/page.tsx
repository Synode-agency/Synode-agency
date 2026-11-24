import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { TeamPage } from "@/components/site/team-page";
import { getContent } from "@/content";

const c = getContent("fr").team;
const prefix = "";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}/equipe`,
    languages: { fr: "/equipe", en: "/en/equipe", "x-default": "/equipe" },
  },
  openGraph: { ...ogBase("fr"), title: withBrand(c.metaTitle), description: c.metaDescription, url: `${prefix}/equipe`, type: "website" },
  twitter: { card: "summary_large_image", title: withBrand(c.metaTitle), description: c.metaDescription },
};

export default function Page() {
  return <TeamPage locale="fr" />;
}
