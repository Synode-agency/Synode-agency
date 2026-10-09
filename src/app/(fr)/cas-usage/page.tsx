import type { Metadata } from "next";
import { UseCasesPage } from "@/components/site/use-cases-page";

const title = "Cas d’usage IA et automatisation en entreprise | Synode";
const description = "Découvrez 12 cas d’usage de l’IA pour automatiser les processus métier : agents IA, documents, service client, ventes, finance et données.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/cas-usage",
    languages: { fr: "/cas-usage", en: "/en/cas-usage" },
  },
  openGraph: { title, description, url: "/cas-usage", type: "website", locale: "fr_BE" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <UseCasesPage locale="fr" />;
}
