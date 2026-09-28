import type { Metadata } from "next";
import { DesignSystemPage } from "@/components/site/design-system-page";

/* Internal page: it has no business in a search index, so it is explicitly
   de-indexed and kept out of the sitemap. */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignSystemPage locale="en" />;
}
