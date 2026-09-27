import type { Metadata } from "next";
import { MethodPage } from "@/components/site/method-page";

const title = "Our method: from mapping to production";
const description = "Discover, Design, Build, Deploy, Improve: the five stages Synode uses to design and ship a business AI system.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/methode",
    languages: { fr: "/methode", en: "/en/methode" },
  },
  openGraph: { title, description, url: "/en/methode", type: "website", locale: "en", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <MethodPage locale="en" />;
}
