import type { Metadata } from "next";
import { UseCasesPage } from "@/components/site/use-cases-page";

const title = "AI use cases and business automation";
const description = "22 AI use cases for business: quotes, internal documentation, tenders, multilingual customer service, IT system integration, security and AI Act compliance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/cas-usage",
    languages: { fr: "/cas-usage", en: "/en/cas-usage", "x-default": "/cas-usage" },
  },
  openGraph: { title, description, url: "/en/cas-usage", type: "website", locale: "en_BE" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <UseCasesPage locale="en" />;
}
