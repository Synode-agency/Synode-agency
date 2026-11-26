import { Hand, HandGrab } from "lucide-react";
import s from "./indice-defiler.module.css";

/**
 * LA PETITE MAIN DU BAS DU HERO (26/11/2026, demande d'Antonino) : la même
 * que celle des témoignages, mais pour inviter à faire défiler la page. Au
 * milieu, en bas du hero : la main apparaît, se ferme pour attraper, monte
 * en laissant un petit trait bleu (le geste du doigt qui fait défiler),
 * s'ouvre pour lâcher et s'efface ; puis le mot (« Défilez ») monte, reste
 * un instant et repart ; puis 3 s sans rien, et tout recommence.
 *
 * Décorative : cachée aux lecteurs d'écran, et absente quand le visiteur
 * demande moins de mouvement.
 */
export function IndiceDefiler({ mot }: { mot: string }) {
  return (
    <span className={s.indice} aria-hidden="true">
      <span className={s.piste} />
      <span className={s.main}>
        <Hand className={s.ouverte} />
        <HandGrab className={s.fermee} />
      </span>
      <span className={s.mot}>{mot}</span>
    </span>
  );
}
