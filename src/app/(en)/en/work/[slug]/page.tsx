import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { CaseStudyPage } from "@/components/site/case-pages";
import { CASES, ROUTES, findCase } from "@/content";

/* Seules les adresses générées existent. Une adresse inconnue est refusée
   dès le routage et reçoit la 404 globale (`global-not-found.tsx`) : avec
   deux layouts racine, `notFound()` servait une page vide (constat C30 de
   l'audit du 23/11/2026). */
export const dynamicParams = false;

export function generateStaticParams() {
  return CASES["en"].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findCase("en", slug);
  if (!item) return {};
  return pageMetadata({ locale: "en", route: `${ROUTES.work}/${slug}`, title: item.metaTitle, description: item.metaDescription });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findCase("en", slug);
  if (!item) notFound();
  return <CaseStudyPage locale="en" item={item} />;
}
