/**
 * The oversized number that opens a section of the landing page.
 *
 * Every section shares the same silhouette — eyebrow, title, paragraph,
 * content — and reading five of them in a row flattens the page. These
 * numerals give each one a shape of its own before a single word is read,
 * and they alternate left and right so the eye zigzags down the page rather
 * than running straight down one edge.
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
