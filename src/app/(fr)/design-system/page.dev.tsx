import type { Metadata } from "next";
import { DesignSystemPage } from "@/components/site/design-system-page";

/* Page interne à l'équipe : elle n'a rien à faire dans un moteur de
   recherche, donc elle est explicitement désindexée et absente du sitemap. */
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignSystemPage locale="fr" />;
}
