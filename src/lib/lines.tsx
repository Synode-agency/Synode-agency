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
 *   ~    coupe EN DESSOUS de 768px, jamais au-dessus. C'est l'inverse du
 *        `\n`, et les deux se cumulent : un titre qui porte les deux au même
 *        endroit se coupe à toutes les largeurs, puisque chaque `<br>` n'est
 *        visible qu'à la sienne.
 *   |    coupe sur les GRANDS téléphones seulement, de 440px à 767px. Un
 *        iPhone Pro Max offre 90px de plus qu'un iPhone ordinaire : une
 *        phrase qui tient sur trois lignes chez lui en demande quatre ou
 *        cinq ailleurs, et la coupe qui l'équilibre chez lui déséquilibre
 *        les autres. À réserver aux titres dont la composition a été réglée
 *        sur ce format précis. 440px est la largeur CSS de l'iPhone 16 et 17
 *        Pro Max.
 *
 * Et un marqueur de contenu, pour les rares titres trop longs sur téléphone :
 *
 *   [[…]]  ce fragment n'est affiché qu'à partir de 768px. Sur mobile, la
 *          phrase se lit sans lui. À réserver aux cas où raccourcir vaut
 *          mieux qu'une troisième ligne : deux variantes d'un même titre, ce
 *          sont deux textes à maintenir.
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
 * ⚠ Le masquage passe par `.only-desktop` et `.only-mobile`, deux classes du
 * projet, et surtout PAS par les variantes `max-md:` / `md:` de Tailwind :
 * celles-ci compilent une requête média moderne en développement qu'un
 * iPhone ignore, ce qui faisait apparaître toutes les coupes à la fois.
 * L'explication complète est dans `studio.css`, au-dessus de ces classes.
 *
 * `accents` sont les mots peints dans le titre.
 */

/** Les mots peints arrivent de la copie, donc d'un texte libre : `perdre du
 *  temps.` deviendrait `perdre du temps` suivi de n'importe quel caractère si
 *  on l'injectait tel quel dans une expression régulière. */
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function renderLines(
  text: string,
  accents: readonly string[] = [],
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

  /* Le fragment réservé au desktop se traite avant les coupes : il entoure
     du texte, il ne le découpe pas. */
  const kept = text.match(/\[\[([^]*?)\]\]/);
  if (kept) {
    const [whole, inner] = kept;
    const at = kept.index ?? 0;
    return [
      ...renderLines(text.slice(0, at), accents, accentClass),
      <span key="desktop-only" className="only-desktop">
        {renderLines(inner, accents, accentClass)}
      </span>,
      ...renderLines(text.slice(at + whole.length), accents, accentClass),
    ];
  }

  const pattern = accents.length
    ? `(${accents.map(escapeRe).join("|")}|\\n|~|\\|)`
    : `(\\n|~|\\|)`;

  return text.split(new RegExp(pattern)).map((part, index) => {
    if (part === "|") {
      /* La coupe des grands téléphones. Deux bornes, donc une classe du
         projet plutôt qu'un utilitaire : voir `.br-phone-xl`. */
      return (
        <Fragment key={index}>
          <br className="br-phone-xl" />{" "}
        </Fragment>
      );
    }
    if (part === "~") {
      /* La coupe de téléphone. Même raison que plus bas pour l'espace. */
      return (
        <Fragment key={index}>
          <br className="only-mobile" />{" "}
        </Fragment>
      );
    }
    if (part === "\n") {
      /* Le `<br>` est suivi d'une espace, et elle est écrite dans tous les
         cas. Sur téléphone le `<br>` est masqué et c'est elle qui recolle
         les deux morceaux, sans quoi on lirait « vite.Les entreprises ».
         Sur desktop le `<br>` s'affiche et le navigateur supprime cette
         espace, qui se retrouve en début de ligne. */
      return (
        <Fragment key={index}>
          <br className="only-desktop" />{" "}
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
