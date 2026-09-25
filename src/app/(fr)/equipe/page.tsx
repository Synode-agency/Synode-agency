import type { Metadata } from "next";
import { TeamPage } from "@/components/site/team-page";

export const metadata: Metadata = {
  title: "La team",
  description:
    "Deux profils complémentaires. Vous parlez directement aux personnes qui conçoivent et développent.",
  alternates: {
    canonical: "/equipe",
    languages: { fr: "/equipe", en: "/en/equipe" },
  },
};

export default function Equipe() {
  return <TeamPage locale="fr" />;
}
