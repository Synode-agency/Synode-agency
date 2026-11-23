import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import { findSolution, solutionFamilies } from "@/lib/solution-details";
import { path } from "@/lib/content";

const locale = "en";

const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "agents-ia": {
    title: "Custom AI agents for business",
    description: "AI agents that search, draft, analyse and carry out actions inside your tools, with the access you grant and the approvals you decide.",
  },
  "automatisations-intelligentes": {
    title: "Intelligent process automation",
    description: "Automate repetitive business processes, connect your software and keep human control over exceptions with reliable AI automation.",
  },
  "logiciels-applications-ia": {
    title: "Custom software & applications",
    description: "Build custom business software and applications designed around your processes, teams, data and operational needs.",
  },
  "integrations-systemes-connectes": {
    title: "Integrations & connected systems",
    description: "Connect your CRM, ERP, website, APIs and databases to synchronise data, eliminate duplicate entry and streamline operations.",
  },
  "data-intelligence": {
    title: "Data & intelligence: dashboards",
    description: "Centralise your business data and turn it into reliable dashboards, indicators and analyses that support better decisions.",
  },
  "formation-adoption-ia": {
    title: "AI training & adoption for teams",
    description: "Train your teams to use AI effectively, responsibly and securely through practical business use cases and lasting adoption support.",
  },
};

export function generateStaticParams() {
  return solutionFamilies(locale).map(family => ({ slug: family.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) return {};
  const route = `/solutions/${slug}`;
  const seo = SERVICE_SEO[slug];
  const title = seo?.title ?? family.title;
  const description = seo?.description ?? family.text;
  return { title, description,
    alternates: { canonical: path(locale, route), languages: { fr: route, en: `/en${route}`, "x-default": route } },
    openGraph: { ...ogBase("en"), title: withBrand(title), description, url: path(locale, route), type: "website" },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) notFound();
  return <ServicePage locale={locale} family={family} />;
}
