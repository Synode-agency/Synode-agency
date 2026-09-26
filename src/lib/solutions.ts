import { getContent, type Locale } from "@/lib/content";

/**
 * Les deux étages du catalogue, et la seule façon d'y naviguer.
 *
 * Un système est ce que Synode vend. Une capacité est une brique avec
 * laquelle on le construit. Un système ne contient donc pas ses capacités,
 * il contient leurs slugs, et c'est ici qu'on les résout.
 *
 * L'intérêt de passer par ces fonctions plutôt que de plonger dans
 * `content` depuis un composant : une capacité citée par deux systèmes ne
 * peut pas raconter deux choses différentes, et un slug qui n'existe pas
 * échoue ici, à un seul endroit, au lieu de rendre une page à demi vide.
 */

export type System = ReturnType<typeof getContent>["solutions"]["systems"][number];
export type Capability = ReturnType<typeof getContent>["capabilities"]["items"][number];
export type CapabilityGroup = ReturnType<typeof getContent>["capabilities"]["groups"][number];

/** Les quatre systèmes, dans l'ordre de la page. */
export function systems(locale: Locale): readonly System[] {
  return getContent(locale).solutions.systems;
}

/** Les seize capacités, à plat. */
export function capabilities(locale: Locale): readonly Capability[] {
  return getContent(locale).capabilities.items;
}

export function findSystem(locale: Locale, slug: string): System | undefined {
  return systems(locale).find((s) => s.slug === slug);
}

export function findCapability(locale: Locale, slug: string): Capability | undefined {
  return capabilities(locale).find((c) => c.slug === slug);
}

/**
 * Les capacités d'un système, résolues depuis ses slugs et dans l'ordre où
 * il les déclare. Un slug inconnu est écarté plutôt que rendu en trou : la
 * vérification d'intégrité est faite une fois pour toutes par
 * `assertCatalogue`, appelée au build.
 */
export function capabilitiesOf(locale: Locale, system: System): Capability[] {
  const all = capabilities(locale);
  return system.capabilities
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is Capability => Boolean(c));
}

/** Le premier système qui cite cette capacité, pour le fil d'Ariane. */
export function systemOf(locale: Locale, slug: string): System | undefined {
  return systems(locale).find((s) => s.capabilities.some((c) => c === slug));
}

/** Les capacités d'une famille, résolues comme ci-dessus. */
export function groupItems(locale: Locale, group: CapabilityGroup): Capability[] {
  const all = capabilities(locale);
  return group.items
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is Capability => Boolean(c));
}

/**
 * Vérifie que les deux axes de rangement couvrent exactement le catalogue.
 *
 * Les seize capacités sont rangées deux fois : une fois par système, une
 * fois par famille. Rien n'empêche d'en oublier une dans un axe, et le
 * symptôme serait une capacité qui a une page mais qu'aucune page ne cite.
 * Appelée depuis `sitemap.ts`, donc elle tourne à chaque build et la faute
 * casse la compilation au lieu d'atteindre le site.
 */
export function assertCatalogue(locale: Locale) {
  const { solutions, capabilities: caps } = getContent(locale);
  const known = new Set(caps.items.map((i) => i.slug));

  for (const [axis, lists] of [
    ["systèmes", solutions.systems.map((s) => s.capabilities)],
    ["familles", caps.groups.map((g) => g.items)],
  ] as const) {
    const flat = lists.flatMap((l) => [...l]);
    const seen = new Set(flat);
    if (seen.size !== flat.length) {
      throw new Error(`Catalogue ${locale} : une capacité est citée deux fois par les ${axis}.`);
    }
    for (const slug of flat) {
      if (!known.has(slug)) {
        throw new Error(`Catalogue ${locale} : les ${axis} citent « ${slug} », qui n'est pas au catalogue.`);
      }
    }
    for (const slug of known) {
      if (!seen.has(slug)) {
        throw new Error(`Catalogue ${locale} : « ${slug} » n'est rangée dans aucune des ${axis}.`);
      }
    }
  }
}
