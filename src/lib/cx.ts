/**
 * Joint des classes, en ignorant les valeurs fausses.
 *
 * Pour les composants interactifs, à la place de `cn` : `cn` fusionne aussi
 * les classes Tailwind en conflit, au prix d'environ 100 Ko de code envoyés
 * au navigateur. Ici, aucune classe n'entre en conflit, une jointure suffit
 * (constat K9 de l'audit du 23/11/2026).
 */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
