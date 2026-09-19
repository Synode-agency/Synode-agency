import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/site/legal-page";
import { HtmlLang } from "@/components/site/html-lang";
import { getLegalDoc, legalSlugs, type LegalSlug } from "@/lib/legal";

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

function isLegalSlug(value: string): value is LegalSlug {
  return (legalSlugs as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: PageProps<"/en/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const doc = getLegalDoc("en", slug);
  return {
    title: { absolute: `${doc.title} — Synode` },
    description: doc.intro,
    alternates: {
      canonical: `/en/legal/${slug}`,
      languages: { fr: `/legal/${slug}`, en: `/en/legal/${slug}` },
    },
  };
}

export default async function LegalEn({ params }: PageProps<"/en/legal/[slug]">) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  return (
    <>
      <HtmlLang lang="en" />
      <LegalPage locale="en" slug={slug} />
    </>
  );
}
