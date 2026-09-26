import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetailPage } from "@/components/site/solution-detail-page";
import { findSystem, systems } from "@/lib/solutions";

/** Les pages sont connues à la compilation : elles sont pré-rendues. */
export function generateStaticParams() {
  return systems("en").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findSystem("en", slug);
  if (!found) return {};
  return {
    title: found.title,
    description: found.promise,
    alternates: {
      canonical: "/en/solutions/" + slug,
      languages: { fr: "/solutions/" + slug, en: "/en/solutions/" + slug },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!findSystem("en", slug)) notFound();
  return <SolutionDetailPage locale="en" slug={slug} />;
}
