import type { MetadataRoute } from "next";
import { legalSlugs } from "@/lib/legal";
import { siteUrl } from "@/lib/site-url";
import { assertCatalogue, capabilities, systems } from "@/lib/solutions";

/** Every route, each one paired with its translation so Google knows the
 *  two versions are the same page in two languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  /* Le sitemap est le seul endroit qui doit connaître le catalogue en
     entier. C'est donc ici qu'on vérifie son intégrité : une capacité
     oubliée dans un système ou dans une famille casse le build au lieu
     d'arriver sur le site en page orpheline. */
  assertCatalogue("fr");
  assertCatalogue("en");

  /* Systèmes et capacités partagent leur slug entre les deux langues, donc
     la liste française suffit à générer les deux versions. */
  const systemSlugs = systems("fr").map((s) => s.slug);
  const capabilitySlugs = capabilities("fr").map((c) => c.slug);

  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    /* Les systèmes portent l'offre, donc ils passent devant les capacités.
       Celles-ci restent indexées : ce sont elles que les gens cherchent. */
    { path: "/solutions", priority: 0.9 },
    ...systemSlugs.map((slug) => ({ path: `/solutions/${slug}`, priority: 0.8 })),
    { path: "/expertise", priority: 0.7 },
    ...capabilitySlugs.map((slug) => ({ path: `/expertise/${slug}`, priority: 0.6 })),
    { path: "/realisations", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/methode", priority: 0.7 },
    { path: "/faq", priority: 0.5 },
    { path: "/a-propos", priority: 0.5 },
    ...legalSlugs.map((slug) => ({ path: `/legal/${slug}`, priority: 0.2 })),
  ];

  const lastModified = new Date();

  return pages.flatMap(({ path, priority }) => {
    const fr = `${siteUrl}${path}`;
    const en = `${siteUrl}/en${path}`;
    const alternates = { languages: { fr, en } };
    return [
      { url: fr || siteUrl, lastModified, priority, alternates },
      { url: en, lastModified, priority: priority * 0.9, alternates },
    ];
  });
}
