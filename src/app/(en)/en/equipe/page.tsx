import type { Metadata } from "next";
import { TeamPage } from "@/components/site/team-page";
import { getContent } from "@/lib/content";

const c = getContent("en").team;
const prefix = "/en";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}/equipe`,
    languages: { fr: "/equipe", en: "/en/equipe" },
  },
  openGraph: { title: c.metaTitle, description: c.metaDescription, url: `${prefix}/equipe`, type: "website" },
};

export default function Page() {
  return <TeamPage locale="en" />;
}
