import type { MetadataRoute } from "next";
import { CASES, ROUTES, path } from "@/content";
import { siteUrl } from "@/lib/site-url";

/**
 * Le plan du site, chaque page appariée à sa traduction.
 *
 * Depuis la refonte du 24/11/2026 : cinq pages, les fiches des réalisations
 * et les deux pages légales, en français et en anglais. Les adresses
 * anglaises viennent de `path()`, qui connaît leurs traductions
 * (`/en/work`, `/en/about`…).
 *
 * Deux pages n'y figurent pas, et c'est délibéré : `/merci` (`/en/thanks`),
 * qui n'a de sens qu'après un envoi, et `/design-system`, qui n'existe
 * qu'en développement. La première porte en plus un `robots: noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { route: string; priority: number }[] = [
    { route: ROUTES.home, priority: 1 },
    { route: ROUTES.services, priority: 0.9 },
    { route: ROUTES.work, priority: 0.8 },
    ...CASES.fr.map((c) => ({ route: `${ROUTES.work}/${c.slug}`, priority: 0.6 })),
    { route: ROUTES.about, priority: 0.7 },
    { route: ROUTES.contact, priority: 0.8 },
    { route: ROUTES.legalNotice, priority: 0.2 },
    { route: ROUTES.privacy, priority: 0.2 },
  ];

  /* ---- LA DATE DE DERNIÈRE MODIFICATION.

     La DATE DU CONTENU, écrite à la main, et non celle du build : sinon
     chaque déploiement annoncerait que toutes les pages ont changé, et un
     moteur de recherche cesserait de croire ce champ. La changer fait
     partie d'une vraie mise à jour de contenu. ---- */
  const lastModified = new Date("2026-11-24");

  return pages.flatMap(({ route, priority }) => {
    const fr = `${siteUrl}${path("fr", route) === "/" ? "" : path("fr", route)}`;
    const en = `${siteUrl}${path("en", route)}`;
    /* `x-default` comme sur les pages : le français est la version par défaut. */
    const alternates = { languages: { "fr-BE": fr || siteUrl, en, "x-default": fr || siteUrl } };
    return [
      { url: fr || siteUrl, lastModified, priority, alternates },
      /* La version anglaise est servie, mais le français est la langue
         d'origine du site : elle passe légèrement derrière. */
      { url: en, lastModified, priority: Math.round(priority * 90) / 100, alternates },
    ];
  });
}
