import type { Metadata } from "next";
import { pageMetadata, withBrand } from "@/lib/seo";
import { ThanksPage } from "@/components/site/simple-pages";
import { ROUTES, getContent } from "@/content";

const c = getContent("fr").thanks;

/* Hors index : cette page n'a de sens qu'après un envoi. */
export const metadata: Metadata = pageMetadata({ locale: "fr", route: ROUTES.thanks, title: withBrand(c.metaTitle), description: c.text, noindex: true });

export default function Page() {
  return <ThanksPage locale="fr" />;
}
