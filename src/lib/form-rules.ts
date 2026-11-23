/**
 * Les règles du formulaire de contact, les MÊMES dans le navigateur et sur
 * le serveur.
 *
 * Avant le 23/11/2026, chaque côté avait la sienne, et celle de l'adresse
 * acceptait « jean@gmail..com » ou « jean@gmail.com. » (constat K8 de
 * l'audit) : Brevo les refusait ensuite, et le visiteur lisait « erreur
 * serveur » au lieu de « adresse invalide ». Le serveur reste juge : le
 * navigateur n'applique ces règles que pour répondre plus vite.
 */

/** Une adresse sans point doublé, ni point en début ou en fin de partie. */
const EMAIL_RE =
  /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?\.)+\p{L}{2,}$/u;

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email);
}

/** Un site, avec ou sans « https:// » : « exemple.be » suffit. */
export function isValidWebsite(website: string) {
  return /^https?:\/\/\S+\.\S+/.test(website) || /^\S+\.\S{2,}/.test(website);
}
