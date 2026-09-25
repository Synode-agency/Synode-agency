import type { Metadata } from "next";
import { ServicesPage } from "@/components/site/services-page";

const title = "Services d’automatisation et agents IA";
const description = "Découvrez les services Synode : automatisation des processus, CRM, documents, agents IA et outils métier sur mesure pour simplifier le travail de vos équipes.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
    languages: { fr: "/services", en: "/en/services" },
  },
  openGraph: { title, description, url: "/services", type: "website", locale: "fr_BE", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Services() {
  return <ServicesPage locale="fr" />;
}
