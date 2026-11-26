/**
 * LA PHRASE DU PROJET (26/11/2026, demande d'Antonino : « relier la demande
 * à la réservation »).
 *
 * Le visiteur la tape dans l'appel final de l'accueil (`AppelProjet`). Elle
 * est gardée dans son navigateur le temps de l'onglet (`sessionStorage`,
 * aucun cookie), puis la réservation de la page Contact (`Booking`) la
 * reprend : elle l'affiche, et la transmet à Cal.com quand l'agenda s'ouvre,
 * dans la question de réservation dont l'identifiant est `projet` (à créer
 * dans l'événement de 30 minutes sur Cal.com). Rien ne passe par notre
 * serveur ni par l'adresse du site.
 */
export const CLE_PROJET = "synode-projet";
/** L'identifiant de la question « Votre projet » dans Cal.com. */
export const CHAMP_CAL_PROJET = "projet";
/** Une phrase, pas un roman. */
export const LONGUEUR_PROJET = 200;

/* Le stockage peut être refusé (navigation privée, réglages) : jamais
   d'erreur, la réservation marche simplement sans la phrase. */
export function ecrireProjet(texte: string) {
  try {
    const propre = texte.trim().slice(0, LONGUEUR_PROJET);
    if (propre) sessionStorage.setItem(CLE_PROJET, propre);
    else sessionStorage.removeItem(CLE_PROJET);
  } catch {
    /* Sans stockage, la phrase n'est pas reprise. */
  }
}

export function lireProjet(): string | null {
  try {
    return sessionStorage.getItem(CLE_PROJET);
  } catch {
    return null;
  }
}
