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
  return workItems("fr").map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = findWork("fr", slug);
  if (!item) return {};
  const SEO: Record<string, { title: string; description: string }> = {
    nexus: {
      title: "Nexus : logiciel de prospection B2B avec IA",
      description:
        "Découvrez comment Synode utilise Nexus pour rechercher et qualifier des entreprises à Bruxelles et en Belgique, puis préparer une prospection B2B ciblée.",
    },
    coory: {
      title: "Coory : plateforme de coaching sportif",
      description:
        "Coory, conçue par Synode, réunit les sportifs, les programmes, l’agenda et les paiements d’un coach sportif, avec un assistant IA validé par le coach.",
    },
  };
  const title = SEO[slug]?.title ?? item.title;
  const description = SEO[slug]?.description ?? item.problem;
  return {
    title,
    description,
    alternates: {
      canonical: `/realisations/${slug}`,
      languages: { fr: `/realisations/${slug}`, en: `/en/realisations/${slug}`, "x-default": `/realisations/${slug}` },
    },
    openGraph: { ...ogBase("fr"), title: withBrand(title), description, url: `/realisations/${slug}`, type: "website", locale: "fr_BE" },
    twitter: { card: "summary_large_image", title: withBrand(title), description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findWork("fr", slug);
  if (!item) notFound();
  return <WorkDetailPage locale="fr" item={item} />;
}
