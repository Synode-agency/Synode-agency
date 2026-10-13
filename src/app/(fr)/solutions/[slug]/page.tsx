import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import { findSolution, solutionFamilies } from "@/lib/solution-details";
import { path } from "@/lib/content";

const locale = "fr";

/* ⚠ Les titres n'incluent PAS la marque : le gabarit du layout racine
   ajoute « — Synode » à tout titre de page enfant. L'écrire ici aussi la
   mettait deux fois, « … | Synode — Synode », sur les six pages et dans les
   deux langues.

   Les six familles ont leur entrée. La page Agents IA n'en avait pas et
   retombait sur le titre de sa carte, « Agents IA », soit dix-huit
   caractères pour la page la plus demandée du site. */
const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "agents-ia": {
    title: "Agents IA sur mesure pour votre entreprise",
    description: "Des agents IA qui recherchent, rédigent, analysent et exécutent des actions dans vos outils, avec les accès que vous accordez et vos validations.",
  },
  "automatisations-intelligentes": {
    title: "Automatisation des processus métier avec l’IA",
    description: "Automatisez les tâches répétitives, les documents et les validations en reliant vos logiciels, vos données et vos règles métier.",
  },
  "logiciels-applications-ia": {
    title: "Logiciel métier sur mesure et application IA",
    description: "Développez un logiciel métier ou une application IA sur mesure, conçu autour de vos processus, de vos équipes et de vos données.",
  },
  "integrations-systemes-connectes": {
    title: "Intégration de logiciels, API et systèmes",
    description: "Connectez votre CRM, ERP, site web, API et bases de données pour synchroniser les informations et réduire la double saisie.",
  },
  "data-intelligence": {
    title: "Analyse de données et tableaux de bord",
    description: "Centralisez vos données d’entreprise et transformez-les en tableaux de bord, indicateurs métier, analyses et prévisions fiables.",
  },
  "formation-adoption-ia": {
    title: "Formation IA en entreprise et adoption",
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
    alternates: { canonical: path(locale, route), languages: { fr: route, en: `/en${route}`, "x-default": route } },
    openGraph: { title, description, url: path(locale, route), type: "website" },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) notFound();
  return <ServicePage locale={locale} family={family} />;
}
