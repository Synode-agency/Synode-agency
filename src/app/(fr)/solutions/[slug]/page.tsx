import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import { findSolution, solutionFamilies } from "@/lib/solution-details";
import { path } from "@/lib/content";

const locale = "fr";

/* Métadonnées propres aux cinq services optimisés. La page générale des
   solutions et la page Assistants & Agents IA gardent leur contenu actuel. */
const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "automatisations-intelligentes": {
    title: "Automatisation des processus métier avec l’IA | Synode",
    description: "Automatisez les tâches répétitives, les documents et les validations en reliant vos logiciels, vos données et vos règles métier.",
  },
  "logiciels-applications-ia": {
    title: "Logiciel métier sur mesure et application IA | Synode",
    description: "Développez un logiciel métier ou une application IA sur mesure, conçu autour de vos processus, de vos équipes et de vos données.",
  },
  "integrations-systemes-connectes": {
    title: "Intégration de logiciels, API et systèmes | Synode",
    description: "Connectez votre CRM, ERP, site web, API et bases de données pour synchroniser les informations et réduire la double saisie.",
  },
  "data-intelligence": {
    title: "Analyse de données et tableaux de bord | Synode",
    description: "Centralisez vos données d’entreprise et transformez-les en tableaux de bord, indicateurs métier, analyses et prévisions fiables.",
  },
  "formation-adoption-ia": {
    title: "Formation IA en entreprise et adoption | Synode",
    description: "Formez vos équipes à l’intelligence artificielle avec des exercices métier, des méthodes de vérification et des règles de confidentialité.",
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
    alternates: { canonical: path(locale, route), languages: { fr: route, en: `/en${route}` } },
    openGraph: { title, description, url: path(locale, route), type: "website" },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) notFound();
  return <ServicePage locale={locale} family={family} />;
}
