import type { Metadata } from "next";
import { UseCasesPage } from "@/components/site/use-cases-page";

const fr = true;
const title = fr ? "Cas d’usage : huit exemples concrets" : "Use cases: eight concrete examples";
const description = fr
  ? "Huit situations où une solution IA peut aider, rangées en quatre territoires. Pour chacune : le fonctionnement, le bénéfice recherché, les prérequis et la limite principale."
  : "Eight situations where an AI solution can help, grouped into four areas. For each: how it runs, what we are after, what it needs and its main limit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cas-usage", languages: { fr: "/cas-usage", en: "/en/cas-usage" } },
  openGraph: { title, description, url: "/cas-usage", type: "website" },
};

export default function Page() {
  return <UseCasesPage locale="fr" />;
}
