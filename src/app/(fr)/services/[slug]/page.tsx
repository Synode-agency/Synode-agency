import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceDetailPage,
  findService,
} from "@/components/site/service-detail-page";
import { getContent } from "@/lib/content";

/** Les douze pages sont connues à la compilation : elles sont pré-rendues. */
export function generateStaticParams() {
  const { services } = getContent("fr");
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
  const found = findService("fr", slug);
  if (!found) return {};
  return {
    title: found.item.title,
    description: found.item.lead,
    alternates: {
      canonical: `/services/${slug}`,
      languages: { fr: `/services/${slug}`, en: `/en/services/${slug}` },
    },
  };
}

export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!findService("fr", slug)) notFound();
  return <ServiceDetailPage locale="fr" slug={slug} />;
}
