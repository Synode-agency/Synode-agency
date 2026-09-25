import type { Metadata } from "next";
import { TeamPage } from "@/components/site/team-page";

export const metadata: Metadata = {
  title: { absolute: "The team — Synode" },
  description:
    "Two complementary profiles. You talk directly to the people who design and build.",
  alternates: {
    canonical: "/en/equipe",
    languages: { fr: "/equipe", en: "/en/equipe" },
  },
};

export default function EquipeEn() {
  return <TeamPage locale="en" />;
}
