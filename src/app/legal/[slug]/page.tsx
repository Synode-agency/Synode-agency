import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/legal-page";
import { getLegalDoc, legalSlugs, type LegalSlug } from "@/lib/legal";

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

function isLegalSlug(value: string): value is LegalSlug {
  return (legalSlugs as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const doc = getLegalDoc("fr", slug);
  return {
    title: doc.title,
    description: doc.intro,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/legal/${slug}`,
      languages: { fr: `/legal/${slug}`, en: `/en/legal/${slug}` },
    },
  };
}

export default async function Legal({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  return <LegalPage locale="fr" slug={slug} />;
}
