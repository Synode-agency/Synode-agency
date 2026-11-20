import type { ReactNode } from "react";

/**
 * Le hero commun aux pages principales, en deux dispositions.
 *
 * `feature` est réservée à l'accueil : le titre est centré sur toute la
 * largeur de la colonne, au-dessus de la grille, et le hero suit la hauteur
 * de la fenêtre. C'est la page la plus forte visuellement, et elle doit le
 * rester seule.
 *
 * `inner` sert les pages internes, et c'est la valeur par défaut : le titre
 * entre dans la colonne de gauche, aligné à gauche, avec le paragraphe puis
 * les actions sous lui ; l'illustration occupe la colonne de droite. Pas de
 * titre pleine largeur, pas de hauteur de fenêtre imposée, pas d'espace vide
 * à combler. Ces pages sont plus sobres par construction.
 *
 * `kicker` est optionnel et se place AU-DESSUS du `h1`, hors du titre : les
 * six pages services s'en servent pour annoncer le service, et un surtitre
 * glissé dans le `h1` abîmerait le titre pour un lecteur d'écran comme pour
 * un moteur de recherche.
 *
 * `kickerMobileOnly` le réserve au téléphone. Cinq pages s'en servent —
 * l'accueil, Solutions, Cas d'usage, Réalisations et Contact — pour situer
 * la page au-dessus du titre là où il n'y a plus de barre de navigation
 * visible pour le faire. Sur grand écran, ces cinq-là n'en veulent pas : le
 * titre y suffit. C'est de l'affichage, pas du contenu conditionnel, donc le
 * surtitre est dans le HTML dans les deux cas et c'est la feuille de style
 * qui le montre ou non.
 *
 * `aside` est rendu en enfant direct de la grille, sans enveloppe : chaque
 * illustration garde ainsi ses propres règles de largeur et d'alignement.
 * Sans illustration, la grille passe à une colonne plutôt que de laisser un
 * vide à droite.
 *
 * ⚠ ESSAI (branche `essai-heros-centres`, 20/11/2026) : AUCUN hero n'affiche
 * plus son illustration, et tout le texte du hero est centré, comme le titre
 * de l'accueil (classe `page-hero--centre`, règles en fin de `studio.css`).
 * `aside` reste dans la signature pour ne toucher à aucune page : il n'est
 * simplement plus rendu. SAUF avec `keepAside`, réservé à Contact : sa
 * colonne de droite n'est pas une illustration mais le calendrier Cal.com,
 * qui porte l'ancre `#reservation` visée par tous les boutons « Parler de
 * votre besoin ». Il passe alors SOUS le texte, centré. Pour revenir à la
 * version en ligne, il suffit de revenir sur `main`.
 */
export function PageHero({
  id = "top",
  layout = "inner",
  kicker,
  kickerMobileOnly = false,
  title,
  aside,
  keepAside = false,
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
  keepAside?: boolean;
  strip?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const grid = "studio-hero-grid studio-hero-grid--single";
  const kickerClass = ["studio-hero-kicker", kickerMobileOnly ? "studio-hero-kicker--mobile" : null]
    .filter(Boolean)
    .join(" ");
  const kickerNode = kicker ? <span className={kickerClass}>{kicker}</span> : null;
  const shell = ["studio-hero", "home-dark-band", "home-hero-dark", layout === "inner" ? "page-hero--inner" : null, "page-hero--centre", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={shell}>
      <div className="col studio-hero-inner">
        {layout === "feature" ? (
          <>
            {kickerNode}
            <h1>{title}</h1>
            <div className={grid}>
              <div className="studio-hero-copy">{children}</div>
            </div>
          </>
        ) : (
          <div className={grid}>
            <div className="studio-hero-copy">
              {kickerNode}
              <h1>{title}</h1>
              {children}
            </div>
            {keepAside ? aside : null}
          </div>
        )}
      </div>
      {strip ? <div className="col">{strip}</div> : null}
    </section>
  );
}
