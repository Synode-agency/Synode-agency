/**
 * The oversized number that opens a section of the landing page.
 *
 * ⚠ IL A QUITTÉ LA LANDING. Sa raison d'être était écrite ici : « chaque
 * section a la même silhouette, chapeau, titre, paragraphe, contenu, et en
 * lire cinq de suite aplatit la page ». Le repositionnement a supprimé les
 * chapeaux et donné à chaque section une composition différente, donc les
 * numéros ne compensaient plus rien. Ils percutaient en plus les titres,
 * qui remontent d'une ligne sans leur chapeau.

 * Un numéro ne se justifie que sur une vraie séquence. Il en reste une sur
 * la page, la méthode, et ses cinq étapes portent déjà les leurs.
 *
 * Il sert encore sur la FAQ et la page équipe. S'il en part aussi, ce
 * fichier peut disparaître.
 *
 * Decorative and nothing else: the eyebrow of each section already says
 * "02 / Notre offre" to anyone reading the page aloud, so this is hidden
 * from assistive technology.
 */
export function ChapterMark({
  n,
  side,
}: {
  /** 1 to 5: picks the numeral, and with it the face it is set in. */
  n: 1 | 2 | 3 | 4 | 5;
  side: "left" | "right";
}) {
  return (
    <span aria-hidden className="chapter-mark" data-n={n} data-side={side}>
      {String(n).padStart(2, "0")}
    </span>
  );
}
