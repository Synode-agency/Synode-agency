import type { Metadata } from "next";
import { TeamPage } from "@/components/site/team-page";

const title = "À propos de Synode, entreprise d’AI Engineering";
const description = "Synode conçoit des systèmes IA métier pour les PME structurées et les entreprises en croissance. Qui nous sommes et comment nous travaillons.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/a-propos",
    languages: { fr: "/a-propos", en: "/en/a-propos" },
  },
  openGraph: { title, description, url: "/a-propos", type: "website", locale: "fr_BE", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <TeamPage locale="fr" />;
}
