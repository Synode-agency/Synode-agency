import { Fragment, type ReactNode } from "react";

/**
 * Les retours à la ligne des titres et des chapeaux sont écrits à la main
 * dans `content.ts`, avec un `\n`, parce que la composition desktop doit être
 * la même d'un portable à un écran 4K.
 *
 * Sur téléphone, aucun de ces retours ne s'applique. Une coupe calée sur une
 * colonne de 1760px n'a aucune raison de tomber juste sur 350px : elle y
 * produit une ligne très courte suivie d'une ligne pleine, ce qui se lit
 * comme une erreur. Le texte y coule donc normalement et se répartit tout
 * seul sur autant de lignes qu'il en faut.
 *
 * D'où un seul marqueur de coupe, avec une seule portée :
 *
 *   \n   coupe à partir de 768px, jamais en dessous
 *
 * Et un second marqueur, de registre plutôt que de coupe :
 *
 *   ^    ce qui suit est la seconde voix du titre. Sur téléphone : sa propre
 *        ligne, dans un corps plus petit. Sur desktop : rien du tout, le
 *        texte reste au fil de la phrase et à la même taille.
 *
 * Le second registre n'est pas une décoration. Avec des titres à 32px dans
 * une colonne de 350px, une phrase de deux propositions part sur quatre
 * lignes. Réduire la seconde la ramène sur une, et la hiérarchie qui en
 * résulte dit quelque chose de vrai : la première proposition porte le
 * constat, la seconde le nuance.
 *
 * Rendu en `<br>` masqué par CSS plutôt qu'en deux textes différents : un
 * seul texte dans le DOM, donc une seule version lue par un lecteur d'écran
 * et indexée par un moteur.
 *
 * `accents` sont les mots peints dans le titre.
 */

/** Les mots peints arrivent de la copie, donc d'un texte libre : `perdre du
 *  temps.` deviendrait `perdre du temps` suivi de n'importe quel caractère si
 *  on l'injectait tel quel dans une expression régulière. */
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function renderLines(
  text: string,
  accents: string[] = [],
  accentClass = "text-brand",
): ReactNode[] {
  /* Le marqueur de registre se traite avant les coupes : il ne découpe pas
     le texte en morceaux de même rang, il ouvre un bloc qui court jusqu'à la
     fin. Tout ce qui le suit repasse par la même fonction, donc un `\n` reste
     valable à l'intérieur de la seconde voix. */
  const cut = text.indexOf("^");
  if (cut !== -1) {
    return [
      ...renderLines(text.slice(0, cut), accents, accentClass),
      <span key="aside" className="title-aside">
        {renderLines(text.slice(cut + 1), accents, accentClass)}
      </span>,
    ];
  }

  const pattern = accents.length
    ? `(${accents.map(escapeRe).join("|")}|\\n)`
    : `(\\n)`;

  return text.split(new RegExp(pattern)).map((part, index) => {
    if (part === "\n") {
      /* Le `<br>` est suivi d'une espace, et elle est écrite dans tous les
         cas. Sur téléphone le `<br>` est masqué et c'est elle qui recolle
         les deux morceaux, sans quoi on lirait « vite.Les entreprises ».
         Sur desktop le `<br>` s'affiche et le navigateur supprime cette
         espace, qui se retrouve en début de ligne. */
      return (
        <Fragment key={index}>
          <br className="max-md:hidden" />{" "}
        </Fragment>
      );
    }
    if (accents.includes(part)) {
      return (
        <span key={index} className={accentClass}>
          {part}
        </span>
      );
    }
    return part;
  });
}
