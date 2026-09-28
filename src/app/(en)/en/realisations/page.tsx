import type { Metadata } from "next";
import { WorkPage } from "@/components/site/work-page";

const fr = false;
const title = fr ? "Réalisations et démonstrations" : "Work and demos";
const description = fr
  ? "Ce que nous construisons, et où nous en sommes. Seulement ce qui existe réellement : pas de logo client que nous n’avons pas."
  : "What we are building, and where we stand. Only what genuinely exists: no client logos we do not have.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/realisations", languages: { fr: "/realisations", en: "/en/realisations" } },
  openGraph: { title, description, url: "/en/realisations", type: "website" },
};

export default function Page() {
  return <WorkPage locale="en" />;
}
