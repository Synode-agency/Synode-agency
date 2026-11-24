import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { WorkListPage } from "@/components/site/case-pages";
import { ROUTES, getContent } from "@/content";

const c = getContent("en").work;

export const metadata: Metadata = pageMetadata({ locale: "en", route: ROUTES.work, title: c.metaTitle, description: c.metaDescription });

export default function Page() {
  return <WorkListPage locale="en" />;
}
