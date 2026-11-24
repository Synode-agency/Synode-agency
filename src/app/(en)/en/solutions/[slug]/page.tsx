import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import { findSolution, solutionFamilies } from "@/lib/solution-details";
import { path } from "@/content";

const locale = "en";

const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "agents-ia": {
    title: "Custom AI agents in Brussels",
    description: "Custom AI agents in Brussels that search, draft, analyse and act inside your tools, with the access you grant and the approvals you decide.",
  },
  "automatisations-intelligentes": {
    title: "AI process automation in Brussels",
    description: "AI process automation in Brussels: automate repetitive processes, connect your software and keep human control over exceptions.",
  },
  "logiciels-applications-ia": {
    title: "Custom business software in Brussels",
    description: "Custom business software and applications built in Brussels around your processes, teams, data and operational needs.",
  },
  "integrations-systemes-connectes": {
    title: "CRM, ERP and API integration in Brussels",
    description: "CRM, ERP, website, API and database integration in Brussels, to synchronise data, reduce duplicate entry and streamline operations.",
  },
  "data-intelligence": {
    title: "Dashboards and data in Brussels",
    description: "Dashboards and data in Brussels: centralise your business data and turn it into reliable indicators and analyses that support decisions.",
  },
  "formation-adoption-ia": {
    title: "AI training for companies in Brussels",
    description: "AI training for companies in Brussels: practical business use cases, verification methods and confidentiality rules for your teams.",
  },
};

/* Seules les adresses générées existent. Une adresse inconnue, par
   exemple une faute de frappe, est refusée dès le routage et reçoit la 404
   globale (`global-not-found.tsx`), une vraie page avec son statut 404.
   Sans cette ligne, elle passait par `notFound()`, que Next ne sait pas
   rattacher à nos 404 avec deux layouts racine : il servait une page vide
   (constat C30 de l'audit du 23/11/2026). */
export const dynamicParams = false;

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
