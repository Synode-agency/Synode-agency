import { Children, Fragment, cloneElement, isValidElement, type ReactNode } from "react";
import { sansVeuve } from "@/lib/sans-veuve";

/**
 * Lie les deux derniers mots d'un paragraphe du hero (voir `sansVeuve`).
 * Descend dans un `<p>`, un `<span>` ou un fragment jusqu'au DERNIER texte
 * qu'il contient ; tout autre élément est laissé intact.
 */
function lierFin(node: ReactNode): ReactNode {
  if (typeof node === "string") return sansVeuve(node);
  if (Array.isArray(node)) {
    const copie = [...node];
    for (let i = copie.length - 1; i >= 0; i--) {
      if (typeof copie[i] === "string" || isValidElement(copie[i])) {
        copie[i] = lierFin(copie[i]);
        break;
      }
    }
    return copie;
  }
  if (isValidElement<{ children?: ReactNode }>(node) && (node.type === "p" || node.type === "span" || node.type === Fragment)) {
    const fin = lierFin(node.props.children);
    return cloneElement(node, undefined, ...(Array.isArray(fin) ? fin : [fin]));
  }
  return node;
}

/** Les paragraphes du hero et sa mention « * Un premier échange… ». */
function estTexteDuHero(node: ReactNode) {
  if (!isValidElement<{ className?: string }>(node)) return false;
  return node.type === "p" || (node.type === "span" && node.props.className === "hero-reassurance");
}

/**
 * Le hero commun aux pages principales.
 *
 * DEPUIS LE 20/11/2026, LES HEROS N'ONT PLUS D'ILLUSTRATION. Le texte est
 * centré, comme le titre de l'accueil : surtitre, titre, paragraphe, puis
 * les boutons centrés sous lui (classe `page-hero--centre`, règles en fin
 * de `studio.css`). Sur ordinateur, tous les heros sont construits comme
 * celui de Cas d'usage, la page de référence choisie par Antonino : pas de
 * surtitre, 1,4rem entre titre, paragraphe et boutons, le tout centré dans
 * la hauteur du hero.
 *
 * SEULE EXCEPTION, `aside` : une colonne de droite qui n'est pas une
 * illustration. Contact y met le calendrier Cal.com, qui porte l'ancre
 * `#reservation` visée par tous les boutons « Parler de votre besoin ».
 * Avec `aside`, le hero garde la disposition en deux colonnes, NON
 * centrée : texte à gauche, colonne à droite, l'un sous l'autre sur
 * téléphone. `aside` est rendu en enfant direct de la grille, sans
 * enveloppe, pour garder ses propres règles de largeur.
 *
 * Deux dispositions :
 *
 * `feature` est réservée à l'accueil : le surtitre et le titre sont placés
 * hors de la colonne de texte, au-dessus d'elle, et le hero porte en bas
 * le bandeau défilant (`strip`). Sur ordinateur, la feuille de style les
 * empile au même écart que les autres pages.
 *
 * `inner` sert toutes les autres pages, et c'est la valeur par défaut : le
 * surtitre et le titre sont dans la colonne de texte.
 *
 * `kicker` est optionnel et se place AU-DESSUS du `h1`, hors du titre : un
 * surtitre glissé dans le `h1` abîmerait le titre pour un lecteur d'écran
 * comme pour un moteur de recherche. Sur ordinateur, il est masqué partout,
 * comme sur Cas d'usage.
 *
 * `kickerMobileOnly` le réserve au téléphone dès 761px. Cinq pages s'en
 * servent (l'accueil, Solutions, Cas d'usage, Réalisations et Contact) pour
 * situer la page au-dessus du titre là où il n'y a plus de barre de
 * navigation visible pour le faire. C'est de l'affichage, pas du contenu
 * conditionnel : le surtitre est dans le HTML dans tous les cas et c'est la
 * feuille de style qui le montre ou non.
 *
 * Partout, les titres prennent l'échelle de celui de l'accueil, et les deux
 * derniers mots de chaque paragraphe sont liés pour qu'aucun mot ne reste
 * seul sur la dernière ligne.
 */
export function PageHero({
  id = "top",
  layout = "inner",
  kicker,
  kickerMobileOnly = false,
  title,
  aside,
  strip,
  className,
  children,
}: {
  id?: string;
  layout?: "feature" | "inner";
  /* Un `ReactNode` et non une chaîne : les surtitres des pages services
     passent par `renderLines`, qui y pose les coupes de téléphone. */
  kicker?: ReactNode;
  kickerMobileOnly?: boolean;
  title: ReactNode;
  aside?: ReactNode;
  strip?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const avecAside = Boolean(aside);
  const grid = ["studio-hero-grid", avecAside ? null : "studio-hero-grid--single"].filter(Boolean).join(" ");
  const kickerClass = ["studio-hero-kicker", kickerMobileOnly ? "studio-hero-kicker--mobile" : null]
    .filter(Boolean)
    .join(" ");
  const kickerNode = kicker ? <span className={kickerClass}>{kicker}</span> : null;
  const shell = ["studio-hero", "home-dark-band", "home-hero-dark", layout === "inner" ? "page-hero--inner" : null, avecAside ? null : "page-hero--centre", className]
    .filter(Boolean)
    .join(" ");
  const texte = Children.map(children, (c) => (estTexteDuHero(c) ? lierFin(c) : c));

  return (
    <section id={id} className={shell}>
      <div className="col studio-hero-inner">
        {layout === "feature" ? (
          <>
            {kickerNode}
            <h1>{title}</h1>
            <div className={grid}>
              <div className="studio-hero-copy">{texte}</div>
              {aside}
            </div>
          </>
        ) : (
          <div className={grid}>
            <div className="studio-hero-copy">
              {kickerNode}
              <h1>{title}</h1>
              {texte}
            </div>
            {aside}
          </div>
        )}
      </div>
      {strip ? <div className="col">{strip}</div> : null}
    </section>
  );
}
