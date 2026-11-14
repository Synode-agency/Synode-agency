/**
 * UN TROU `{{ x }}` DANS UN TEXTE DES ORIGINAUX.
 *
 * Le moteur d'origine rend chaque valeur dans son propre <span>, et rien du
 * tout pour `null`, `undefined` ou un booléen. On fait pareil : dans un
 * conteneur en flex, un texte nu et un <span> ne se placent pas de la même
 * façon (le `gap` s'applique entre deux éléments, pas à l'intérieur d'un
 * même texte).
 */
export function hole(x: unknown) {
  if (x === undefined || x === null || typeof x === "boolean") return null;
  return <span>{String(x)}</span>;
}
