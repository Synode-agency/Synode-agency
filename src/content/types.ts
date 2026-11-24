import type { Locale } from "@/lib/routes";
import type { fr } from "./fr";
import type { work } from "./fr/work";

/**
 * LA FORME COMMUNE DES DEUX LANGUES.
 *
 * Le français fait foi : `SiteContent` est la forme du contenu français, sans
 * ses valeurs. Chaque fichier anglais la respecte (`satisfies`), donc une clé
 * oubliée, ajoutée ou mal nommée d'un côté casse la compilation au lieu de
 * laisser une page anglaise vide ou incomplète.
 */

/** Retire les valeurs littérales de `as const` pour ne garder que la forme. */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

export type SiteContent = Omit<Widen<typeof fr>, "locale"> & { locale: Locale };

export type WorkKind = "internal" | "beta" | "demo" | "client" | "software";

export type WorkItem = {
  slug: string;
  /** Real project capture, when supplied. Otherwise show an explicit placeholder. */
  image?: { src: string; alt: string };
  kind: WorkKind;
  title: string;
  /** La partie du titre peinte en bleu. Doit figurer telle quelle dans `title`. */
  accent?: string;
  /** L'état réel, affiché tel quel. Jamais « bientôt disponible ». */
  status: string;
  /** Le problème métier, en une phrase. */
  problem: string;
  /** Parcours fonctionnel présenté sans le confondre avec un résultat livré. */
  journey: readonly string[];
  /** Le contexte, sur la fiche détaillée. */
  context: string;
  /** Ce que la solution fait réellement aujourd'hui. */
  does: readonly string[];
  /** Le rôle de l'IA, dit explicitement. */
  aiRole: string;
  /** Ce qu'on vise, PAS ce qu'on a mesuré. */
  goals: readonly string[];
  /** Les limites, et ce qui reste validé par un humain. */
  limits: readonly string[];
  /** `true` tant que la fiche attend captures, vidéo ou contenu réel. */
  todo: boolean;
};

/** La forme de la page Réalisations, la même dans les deux langues. */
export type WorkContent = typeof work;
