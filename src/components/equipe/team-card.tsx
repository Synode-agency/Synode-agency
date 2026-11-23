import Image from "next/image";
import styles from "./team-card.module.css";

/**
 * LA CARTE D'UN ASSOCIÉ.
 *
 * La photo à gauche, le texte à droite, et les deux passent l'une sous
 * l'autre quand la place manque — c'est `auto-fit` qui en décide, pas un
 * point de rupture.
 *
 * ⚠ Les quatre textes viennent du contenu et ne sont pas retouchés ici :
 * le nom, le rôle et la description sont affichés mot pour
 * mot. Ce composant ne décide que de leur mise en forme.
 *
 * Le nom sur deux lignes (décision D8 du 23/11/2026) : le nom de famille en
 * petit au-dessus, le prénom en grand en dessous. Dans le HTML, le prénom
 * vient d'abord, pour qu'un lecteur d'écran dise « Antonino Lo Bianco » et
 * non « Lo Bianco Antonino » ; c'est la colonne inversée qui les retourne
 * à l'écran.
 */
export function TeamCard({
  first,
  last,
  photo,
  role,
  text,
}: {
  first: string;
  last: string;
  photo: string;
  role: string;
  text: string;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Image src={photo} alt={`${first} ${last}`} fill sizes="(max-width: 1000px) 90vw, 30vw" />
      </div>
      <div className={styles.copy}>
        <h3 className={styles.name}>
          <span className={styles.first}>{first}</span>{" "}
          <span className={styles.last}>{last}</span>
        </h3>
        <p className={styles.role}>{role}</p>
        <i className={styles.rule} aria-hidden />
        <p className={styles.text}>{text}</p>
      </div>
    </article>
  );
}

/** La grille des deux cartes. */
export function TeamCards({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
