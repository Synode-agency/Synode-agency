import type { Metadata } from "next";
import { ContactPage } from "@/components/site/contact-page";

export const metadata: Metadata = {
  title: "Nous contacter",
  description:
    "Dites-nous ce qui vous fait perdre du temps. Réponse sous 24 h ouvrées, avec un premier avis honnête et un audit d'une heure offert.",
  alternates: {
    canonical: "/contact",
    languages: { fr: "/contact", en: "/en/contact" },
  },
};

export default function Contact() {
  return <ContactPage locale="fr" />;
}
