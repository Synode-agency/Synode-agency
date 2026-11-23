import type { Metadata } from "next";
import { ogBase, withBrand } from "@/lib/seo";
import { notFound } from "next/navigation";
import { WorkDetailPage } from "@/components/site/work-page";
import { findWork, workItems } from "@/lib/work";

/* Seules les adresses générées existent. Une adresse inconnue, par
   exemple une faute de frappe, est refusée dès le routage et reçoit la 404
   globale (`global-not-found.tsx`), une vraie page avec son statut 404.
   Sans cette ligne, elle passait par `notFound()`, que Next ne sait pas
   rattacher à nos 404 avec deux layouts racine : il servait une page vide
   (constat C30 de l'audit du 23/11/2026). */
export const dynamicParams = false;

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
  const SEO: Record<string, { title: string; description: string }> = {
    nexus: {
      title: "Nexus: AI-assisted B2B prospecting software",
      description:
        "See how Synode uses Nexus to research and qualify companies in Brussels and Belgium, then prepare more targeted B2B prospecting.",
    },
    coory: {
      title: "Coory: sports coaching platform",
      description:
        "Coory, built by Synode, brings together a sports coach’s athletes, programmes, schedule and payments, with an AI assistant the coach stays in control of.",
    },
  };
  const title = SEO[slug]?.title ?? item.title;
  const description = SEO[slug]?.description ?? item.problem;
  return {
    title,
    description,
    alternates: {
      canonical: `/en/realisations/${slug}`,
      languages: { fr: `/realisations/${slug}`, en: `/en/realisations/${slug}`, "x-default": `/realisations/${slug}` },
    },
    openGraph: { ...ogBase("en"), title: withBrand(title), description, url: `/en/realisations/${slug}`, type: "website", locale: "en_BE" },
    twitter: { card: "summary_large_image", title: withBrand(title), description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findWork("en", slug);
  if (!item) notFound();
  return <WorkDetailPage locale="en" item={item} />;
}
