import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
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
    title: "Agents IA sur mesure pour entreprises",
    description: "Des agents IA qui recherchent, rédigent, analysent et exécutent des actions dans vos outils, avec les accès que vous accordez et vos validations.",
  },
  "automatisations-intelligentes": {
    title: "Automatisations intelligentes des processus",
    description: "Automatisez les tâches répétitives, les documents et les validations en reliant vos logiciels, vos données et vos règles métier.",
  },
  "logiciels-applications-ia": {
    title: "Logiciels & applications sur mesure",
    description: "Développez un logiciel métier ou une application sur mesure, conçu autour de vos processus, de vos équipes et de vos données.",
  },
  "integrations-systemes-connectes": {
    title: "Intégrations & systèmes connectés",
    description: "Connectez votre CRM, ERP, site web, API et bases de données pour synchroniser les informations et réduire la double saisie.",
  },
  "data-intelligence": {
    title: "Data & intelligence : tableaux de bord",
    description: "Centralisez vos données d’entreprise et transformez-les en tableaux de bord, indicateurs métier, analyses et estimations utiles.",
  },
  "formation-adoption-ia": {
    title: "Formation & adoption de l’IA en entreprise",
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
    openGraph: { ...ogBase("fr"), title: withBrand(title), description, url: path(locale, route), type: "website" },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) notFound();
  return <ServicePage locale={locale} family={family} />;
}
