import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import styles from "./included-strip.module.css";

/**
 * « INCLUS DANS CHAQUE PROJET » : ce que toute solution livrée comprend.
 *
 * Décision d'Antonino du 14/11/2026, après la relecture du site par un
 * dirigeant de PME : la formation n'est pas une option. Chaque projet
 * comprend la mise en service, la formation des utilisateurs, la
 * documentation et l'accompagnement des premières semaines ; la page
 * Formation & Adoption reste une offre à part, pour former une équipe à
 * l'IA sans projet.
 *
 * Le texte vient de `content.ts` (`solutions.operations.included`), écrit
 * une seule fois pour les six pages : c'est un engagement, il ne doit pas
 * exister en six exemplaires. Sur la page Formation elle-même, le lien vers
 * cette page n'a pas de sens : `moreHref` est alors omis.
 */
export function IncludedStrip({
  title,
  items,
  more,
  moreHref,
}: {
  title: string;
  items: readonly string[];
  more: string;
  moreHref?: string;
}) {
  return (
    <div className={styles.strip}>
      <p className={styles.title}>{title}</p>
      <ul className={styles.items}>
        {items.map(item => (
          <li key={item}>
            <Check aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      {moreHref ? (
        <Link className={`go ${styles.more}`} href={moreHref}>
          {more}
          <ArrowRight aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
