import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityDetailPage } from "@/components/site/capability-detail-page";
import { findCapability, capabilities } from "@/lib/solutions";

/** Les pages sont connues à la compilation : elles sont pré-rendues. */
export function generateStaticParams() {
  return capabilities("fr").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findCapability("fr", slug);
  if (!found) return {};
  return {
    title: found.title,
    description: found.lead,
    alternates: {
      canonical: "/expertise/" + slug,
      languages: { fr: "/expertise/" + slug, en: "/en/expertise/" + slug },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!findCapability("fr", slug)) notFound();
  return <CapabilityDetailPage locale="fr" slug={slug} />;
}
