import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/site/service-page";
import { findSolution, solutionFamilies } from "@/lib/solution-details";
import { path } from "@/lib/content";

const locale = "fr";
export function generateStaticParams() {
  return solutionFamilies(locale).map(family => ({ slug: family.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) return {};
  const route = `/solutions/${slug}`;
  return { title: family.title, description: family.text,
    alternates: { canonical: path(locale, route), languages: { fr: route, en: `/en${route}` } },
    openGraph: { title: family.title, description: family.text, url: path(locale, route), type: "website" },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = findSolution(locale, slug);
  if (!family) notFound();
  return <ServicePage locale={locale} family={family} />;
}
