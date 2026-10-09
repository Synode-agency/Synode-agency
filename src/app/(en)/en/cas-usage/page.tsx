import type { Metadata } from "next";
import { UseCasesPage } from "@/components/site/use-cases-page";

const title = "AI use cases and business automation | Synode";
const description = "Explore 12 AI use cases for business process automation, including AI agents, documents, customer service, sales, finance and data.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/en/cas-usage",
    languages: { fr: "/cas-usage", en: "/en/cas-usage" },
  },
  openGraph: { title, description, url: "/en/cas-usage", type: "website", locale: "en_BE" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <UseCasesPage locale="en" />;
}
