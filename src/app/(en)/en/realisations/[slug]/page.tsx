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
  const isNexus = slug === "nexus";
  const title = isNexus ? "Nexus: AI-assisted B2B prospecting software" : item.title;
  const description = isNexus
    ? "See how Synode uses Nexus to research and qualify companies in Brussels and Belgium, then prepare more targeted B2B prospecting."
    : item.problem;
  return {
    title,
    description,
    alternates: {
      canonical: `/en/realisations/${slug}`,
      languages: { fr: `/realisations/${slug}`, en: `/en/realisations/${slug}`, "x-default": `/realisations/${slug}` },
    },
    openGraph: { title, description, url: `/en/realisations/${slug}`, type: "website", locale: "en_BE" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findWork("en", slug);
  if (!item) notFound();
  return <WorkDetailPage locale="en" item={item} />;
}
