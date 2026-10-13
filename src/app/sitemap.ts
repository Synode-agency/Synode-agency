import type { MetadataRoute } from "next";
import { solutionFamilies } from "@/lib/solution-details";
import { ROUTES } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import { assertBusinessUseCases } from "@/lib/business-use-cases";
import { workItems } from "@/lib/work";
import { assertDiagnosticParity } from "@/lib/ai-diagnostic-questions";

/**
 * Le plan du site, chaque page appariée à sa traduction.
 *
 * Deux pages n'y figurent pas, et c'est délibéré : `/merci`, qui n'a de sens
 * qu'après un envoi et que l'architecture demande d'exclure, et
 * `/design-system`, qui est un outil d'équipe. Toutes deux portent en plus
 * un `robots: noindex` dans leur propre fichier de route.
 *
 * C'est aussi le seul endroit qui connaît le catalogue en entier, donc c'est
 * ici qu'on vérifie son intégrité : un cas d'usage ajouté dans une seule
 * langue casse le build au lieu de produire une page anglaise vide.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  assertBusinessUseCases();
  assertDiagnosticParity();

  const pages: { path: string; priority: number }[] = [
    { path: ROUTES.home === "/" ? "" : ROUTES.home, priority: 1 },
    { path: ROUTES.solutions, priority: 0.9 },
    ...solutionFamilies("fr").map(f => ({ path: `${ROUTES.solutions}/${f.slug}`, priority: 0.8 })),
    { path: ROUTES.useCases, priority: 0.8 },
    { path: ROUTES.work, priority: 0.8 },
    ...workItems("fr").map((w) => ({ path: `${ROUTES.work}/${w.slug}`, priority: 0.6 })),
    { path: ROUTES.contact, priority: 0.8 },
    { path: ROUTES.team, priority: 0.6 },
    { path: ROUTES.legalNotice, priority: 0.2 },
    { path: ROUTES.privacy, priority: 0.2 },
  ];

  /* ---- LA DATE DE DERNIÈRE MODIFICATION.

     C'était `new Date()` : la date du BUILD. Chaque déploiement annonçait
     donc que les trente pages du site venaient de changer, même celles dont
     pas une ligne n'avait bougé. Un moteur de recherche qui le constate deux
     ou trois fois cesse d'accorder du crédit au champ, et on perd le signal
     le jour où une page change vraiment.

     Elle vient maintenant de la DATE DU CONTENU, écrite ci-dessous à la
     main. Une date de commit aurait été automatique, mais `git` n'est pas
     disponible à la compilation sur un hébergeur, et un fichier retouché
     pour une virgule n'est pas une page modifiée. Changer cette constante
     fait partie d'une vraie mise à jour de contenu, au même titre que le
     texte. ---- */
  const lastModified = new Date("2026-10-13");

  return pages.flatMap(({ path: p, priority }) => {
    const fr = `${siteUrl}${p}`;
    const en = `${siteUrl}/en${p}`;
    const alternates = { languages: { fr, en } };
    return [
      { url: fr || siteUrl, lastModified, priority, alternates },
      /* La version anglaise est servie, mais le français est la langue
         d'origine du site : elle passe légèrement derrière. */
      { url: en, lastModified, priority: priority * 0.9, alternates },
    ];
  });
}
