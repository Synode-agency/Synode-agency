import type { Metadata } from "next";
import { SolutionsPage } from "@/components/site/solutions-page";

const title = "Business AI systems for your company";
const description = "Four business AI systems: sales, customer service, operations and knowledge. Synode builds them with your data, your software and your teams.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/solutions",
    languages: { fr: "/solutions", en: "/en/solutions" },
  },
  openGraph: { title, description, url: "/en/solutions", type: "website", locale: "en", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <SolutionsPage locale="en" />;
}
