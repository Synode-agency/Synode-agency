import type { Metadata } from "next";
import { FaqPage } from "@/components/site/faq-page";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Délais, prix, outils existants, données : ce qu'on nous demande avant de signer, et nos réponses.",
  alternates: {
    canonical: "/faq",
    languages: { fr: "/faq", en: "/en/faq" },
  },
};

export default function Faq() {
  return <FaqPage locale="fr" />;
}
