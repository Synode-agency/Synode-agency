import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceDetailPage,
  findService,
} from "@/components/site/service-detail-page";
import { getContent } from "@/lib/content";

export function generateStaticParams() {
  const { services } = getContent("en");
  return services.families.flatMap((f) =>
    f.items.map((i) => ({ slug: i.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findService("en", slug);
  if (!found) return {};
  return {
    title: { absolute: `${found.item.title} — Synode` },
    description: found.item.lead,
    alternates: {
      canonical: `/en/services/${slug}`,
      languages: { fr: `/services/${slug}`, en: `/en/services/${slug}` },
    },
  };
}

export default async function ServiceEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!findService("en", slug)) notFound();
  return <ServiceDetailPage locale="en" slug={slug} />;
}
