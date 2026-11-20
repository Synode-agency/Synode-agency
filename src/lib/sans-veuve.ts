/**
 * Pas de mot seul sur la dernière ligne d'un paragraphe (une « veuve »).
 *
 * Les deux derniers mots sont liés par une espace insécable : le navigateur
 * ne peut plus les séparer, donc la dernière ligne en porte toujours au
 * moins deux. Contrairement à un réglage de largeur, ça tient à TOUTES les
 * largeurs d'écran et dans tous les navigateurs, Safari compris.
 *
 * Seule la dernière espace ordinaire (U+0020) est remplacée : les espaces
 * insécables déjà posées par la typographie française (avant « : », « ? »)
 * restent telles quelles.
 */
export function sansVeuve(texte: string): string {
  const i = texte.trimEnd().lastIndexOf(" ");
  return i > 0 ? `${texte.slice(0, i)} ${texte.slice(i + 1)}` : texte;
}
