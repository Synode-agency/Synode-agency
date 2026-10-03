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
 * `aside` est rendu en enfant direct de la grille, sans enveloppe : chaque
 * illustration garde ainsi ses propres règles de largeur et d'alignement.
 * Sans illustration, la grille passe à une colonne plutôt que de laisser un
 * vide à droite.
 */
export function PageHero({
  id = "top",
  layout = "inner",
  title,
  aside,
  strip,
  className,
  children,
}: {
  id?: string;
  layout?: "feature" | "inner";
  title: ReactNode;
  aside?: ReactNode;
  strip?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const grid = ["studio-hero-grid", aside ? null : "studio-hero-grid--single"].filter(Boolean).join(" ");
  const shell = ["studio-hero", "home-dark-band", "home-hero-dark", layout === "inner" ? "page-hero--inner" : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={shell}>
      <div className="col studio-hero-inner">
        {layout === "feature" ? (
          <>
            <h1>{title}</h1>
            <div className={grid}>
              <div className="studio-hero-copy">{children}</div>
              {aside}
            </div>
          </>
        ) : (
          <div className={grid}>
            <div className="studio-hero-copy">
              <h1>{title}</h1>
              {children}
            </div>
            {aside}
          </div>
        )}
      </div>
      {strip ? <div className="col">{strip}</div> : null}
    </section>
  );
}
