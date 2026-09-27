import type { Metadata } from "next";
import { TeamPage } from "@/components/site/team-page";

const title = "About Synode, an AI engineering company";
const description = "Synode builds business AI systems for established SMEs and growing companies. Who we are and how we work.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/a-propos",
    languages: { fr: "/a-propos", en: "/en/a-propos" },
  },
  openGraph: { title, description, url: "/en/a-propos", type: "website", locale: "en", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <TeamPage locale="en" />;
}
