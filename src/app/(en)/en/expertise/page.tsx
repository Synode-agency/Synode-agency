import type { Metadata } from "next";
import { ExpertisePage } from "@/components/site/expertise-page";

const title = "Expertise: AI agents, automation, integrations";
const description = "The capabilities we build our systems with: AI agents, automation, integrations, business software, data and knowledge.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/expertise",
    languages: { fr: "/expertise", en: "/en/expertise" },
  },
  openGraph: { title, description, url: "/en/expertise", type: "website", locale: "en", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <ExpertisePage locale="en" />;
}
