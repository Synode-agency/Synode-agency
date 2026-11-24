import type { Metadata } from "next";
import { path, type Locale } from "@/lib/routes";

/**
 * Le nom du site et le socle commun des métadonnées : titres des pages,
 * liens entre langues et cartes de partage (l'aperçu qui s'affiche quand on
 * envoie un lien par WhatsApp, par message, sur LinkedIn…).
 *
 * Décision du 24/11/2026 : le nom de l'agence est « Synode ».
 * `synode-agency.com` n'est que le domaine. « Synode agency » ne reste que
 * comme autre nom dans les données structurées (`organization.ts`).
 */
export const SITE_NAME = "Synode";

/** Le titre d'une page : son sujet, puis le nom (« Contact · Synode »). */
export const withBrand = (title: string) => `${title} · ${SITE_NAME}`;

/**
 * Ce que chaque carte de partage doit porter.
 *
 * ⚠ Une page qui déclare son propre `openGraph` REMPLACE celui du layout,
 * sans fusion : sans ce socle, le nom du site et la langue disparaissaient
 * de la carte de toutes ces pages.
 */
export const ogBase = (locale: Locale) => ({
  siteName: SITE_NAME,
  locale: locale === "fr" ? "fr_BE" : "en_BE",
  type: "website" as const,
});

/**
 * LES MÉTADONNÉES D'UNE PAGE (brief, section 10) : le titre exact, la
 * description, l'adresse canonique, la même page dans l'autre langue
 * (`hreflang` fr-BE, en, et x-default vers le français) et la carte de
 * partage. `route` est l'adresse française de la page (`ROUTES`).
 */
export function pageMetadata({
  locale,
  route,
  title,
  description,
  noindex = false,
}: {
  locale: Locale;
  route: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const url = path(locale, route);
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { "fr-BE": path("fr", route), en: path("en", route), "x-default": path("fr", route) },
    },
    openGraph: { ...ogBase(locale), title, description, url },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
