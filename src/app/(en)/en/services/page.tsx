import type { Metadata } from "next";
import { ServicesPage } from "@/components/site/services-page";

const title = "Business automation and AI agent services";
const description = "Explore Synode’s process automation, CRM integration, document workflows, AI agents and custom business tools to simplify your team’s daily work.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/services",
    languages: { fr: "/services", en: "/en/services" },
  },
  openGraph: { title, description, url: "/en/services", type: "website", locale: "en_GB", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Services() {
  return <ServicesPage locale="en" />;
}
