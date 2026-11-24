import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/site/about-page";
import { ROUTES, getContent } from "@/content";

const c = getContent("en").about;

export const metadata: Metadata = pageMetadata({ locale: "en", route: ROUTES.about, title: c.metaTitle, description: c.metaDescription });

export default function Page() {
  return <AboutPage locale="en" />;
}
