import type { Metadata } from "next";
import { MethodPage } from "@/components/site/method-page";

const title = "Notre méthode : de la cartographie à la mise en production";
const description = "Discover, Design, Build, Deploy, Improve : les cinq temps par lesquels Synode conçoit et déploie un système IA métier.";
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/methode",
    languages: { fr: "/methode", en: "/en/methode" },
  },
  openGraph: { title, description, url: "/methode", type: "website", locale: "fr_BE", siteName: "Synode" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <MethodPage locale="fr" />;
}
