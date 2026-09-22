import type { Metadata } from "next";
import { ContactPage } from "@/components/site/contact-page";

export const metadata: Metadata = {
  title: { absolute: "Get in touch — Synode" },
  description:
    "Tell us what's eating your time. Reply within one business day, with an honest first take and a free one-hour audit.",
  alternates: {
    canonical: "/en/contact",
    languages: { fr: "/contact", en: "/en/contact" },
  },
};

export default function ContactEn() {
  return (
    <ContactPage locale="en" />
  );
}
