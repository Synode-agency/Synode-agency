import type { Metadata } from "next";
import { ThanksPage } from "@/components/site/simple-pages";
import { getContent } from "@/lib/content";

/* Hors index : cette page n'a de sens qu'après un envoi, et l'architecture
   demande explicitement de l'exclure. */
export const metadata: Metadata = {
  title: getContent("en").thanks.metaTitle,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThanksPage locale="en" />;
}
