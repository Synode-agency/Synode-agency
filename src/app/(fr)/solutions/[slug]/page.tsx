import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import { findSolution, solutionFamilies } from "@/lib/solution-details";
import { path } from "@/lib/content";

const locale = "fr";

/* ⚠ Les titres n'incluent PAS la marque : le gabarit du layout racine
   ajoute « - Synode agency » à tout titre de page enfant. L'écrire ici
   aussi la mettrait deux fois, sur les six pages et dans les deux langues.
   Depuis le 23/11/2026, chaque titre et chaque description nomment
   Bruxelles : sur un domaine neuf, c'est le levier le plus fort pour les
   recherches locales (« agents IA Bruxelles »…).

   Les six familles ont leur entrée. La page Agents IA n'en avait pas et
   retombait sur le titre de sa carte, « Agents IA », soit dix-huit
   caractères pour la page la plus demandée du site. */
const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "agents-ia": {
    title: "Agents IA sur mesure à Bruxelles",
    description: "Agents IA sur mesure à Bruxelles : ils recherchent, rédigent, analysent et agissent dans vos outils, avec les accès que vous accordez et vos validations.",
  },
  "automatisations-intelligentes": {
    title: "Automatisation IA des processus à Bruxelles",
    description: "Automatisation des processus à Bruxelles : tâches répétitives, documents et validations, en reliant vos logiciels, vos données et vos règles métier.",
  },
  "logiciels-applications-ia": {
    title: "Logiciels métier sur mesure à Bruxelles",
    description: "Logiciel métier ou application sur mesure, développé à Bruxelles autour de vos processus, de vos équipes et de vos données.",
  },
  "integrations-systemes-connectes": {
    title: "Intégration CRM, ERP et API à Bruxelles",
    description: "Intégration à Bruxelles de votre CRM, ERP, site web, API et bases de données, pour synchroniser les informations et réduire la double saisie.",
  },
  "data-intelligence": {
    title: "Tableaux de bord et data à Bruxelles",
    description: "Tableaux de bord à Bruxelles : centralisez vos données d’entreprise et transformez-les en indicateurs métier, analyses et estimations utiles.",
  },
  "formation-adoption-ia": {
    title: "Formation IA pour entreprises à Bruxelles",
    description: "Formation IA pour entreprises à Bruxelles : exercices métier, méthodes de vérification et règles de confidentialité pour vos équipes.",
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
