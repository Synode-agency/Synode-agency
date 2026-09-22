import type { MetadataRoute } from "next";
import { legalSlugs } from "@/lib/legal";
import { siteUrl } from "./site-shell";

/** Every route, each one paired with its translation so Google knows the
 *  two versions are the same page in two languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/realisations", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
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
