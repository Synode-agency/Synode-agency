import type { Locale } from "@/lib/routes";
import type { fr } from "./fr";

/**
 * LA FORME COMMUNE DES DEUX LANGUES.
 *
 * Le français fait foi : `SiteContent` est la forme du contenu français, sans
 * ses valeurs. Chaque fichier anglais la respecte (`satisfies`), donc une clé
 * oubliée, ajoutée ou mal nommée d'un côté casse la compilation au lieu de
 * laisser une page anglaise vide ou incomplète.
 */

/**
 * Retire les valeurs littérales de `as const` pour ne garder que la forme.
 *
 * Sauf pour les champs nommés `key` : ce sont des identifiants que le code
 * lit (`"connect"`, `"ai"`, `"software"` pour les trois services), pas du
 * texte. Ils gardent leur valeur exacte, et l'anglais doit reprendre les
 * mêmes.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: K extends "key" ? T[K] : Widen<T[K]> }
          : T;

export type SiteContent = Omit<Widen<typeof fr>, "locale"> & { locale: Locale };

/** L'état d'une réalisation, affiché en pastille sur sa carte (brief, 5). */
export type CaseStatus = "live" | "beta" | "demo";

/** Une réalisation, telle que sa carte la montre (accueil, Réalisations). */
export type CaseCard = {
  slug: string;
  name: string;
  status: CaseStatus;
  /** Une phrase. */
  summary: string;
  /** La mention sous la phrase ; vide = rien. */
  note: string;
};

/**
 * Une réalisation avec sa fiche détaillée, dans l'ordre du modèle du brief
 * (6.3) : en-tête, problème, ce qu'on a construit, résultat, citation,
 * technologies.
 */
export type CaseStudy = CaseCard & {
  metaTitle: string;
  metaDescription: string;
  sector: string;
  year: string;
  problem: string;
  built: string;
  /** 1 à 3 chiffres ou constats. Jamais un chiffre inventé. */
  results: readonly string[];
  /** Vide = pas de citation. */
  quote: { text: string; author: string };
  tech: string;
};
