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
 * l'accroche, le prénom, le rôle et la description sont affichés mot pour
 * mot. Ce composant ne décide que de leur mise en forme.
 */
export function TeamCard({
  first,
  photo,
  headline,
  role,
  text,
}: {
  first: string;
  photo: string;
  headline: string;
  role: string;
  text: string;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Image src={photo} alt={first} fill sizes="(max-width: 1000px) 90vw, 30vw" />
      </div>
      <div className={styles.copy}>
        <span className={styles.headline}>{headline}</span>
        <h3>{first}</h3>
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
