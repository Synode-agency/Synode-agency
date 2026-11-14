import type { Metadata } from "next";
import { UseCasesPage } from "@/components/site/use-cases-page";

const title = "Cas d’usage IA et automatisation en entreprise";
const description = "22 cas d’usage de l’IA en entreprise : devis, documentation interne, appels d’offres, service client multilingue, intégration au SI, sécurité et conformité AI Act.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cas-usage",
    languages: { fr: "/cas-usage", en: "/en/cas-usage", "x-default": "/cas-usage" },
  },
  openGraph: { title, description, url: "/cas-usage", type: "website", locale: "fr_BE" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <UseCasesPage locale="fr" />;
}
