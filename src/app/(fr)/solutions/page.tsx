import type { Metadata } from "next";
import { SolutionsPage } from "@/components/site/solutions-page";

const title = "Systèmes IA métier pour votre entreprise";
const description = "Quatre systèmes IA métier : commercial, relation client, opérations et connaissance. Synode les construit avec vos données, vos logiciels et vos équipes.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/solutions",
    languages: { fr: "/solutions", en: "/en/solutions" },
  },
  openGraph: { title, description, url: "/solutions", type: "website", locale: "fr_BE", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <SolutionsPage locale="fr" />;
}
