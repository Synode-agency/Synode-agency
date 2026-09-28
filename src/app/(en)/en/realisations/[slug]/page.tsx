import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetailPage } from "@/components/site/work-page";
import { findWork, workItems } from "@/lib/work";

export function generateStaticParams() {
  return workItems("en").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findWork("en", slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.problem,
    alternates: {
      canonical: `/en/realisations/${slug}`,
      languages: { fr: `/realisations/${slug}`, en: `/en/realisations/${slug}` },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findWork("en", slug);
  if (!item) notFound();
  return <WorkDetailPage locale="en" item={item} />;
}
