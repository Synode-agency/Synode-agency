/**
 * L'accès de démonstration de Coory (compte partagé, données fictives remises
 * à zéro chaque nuit, Assistant IA inclus), décidé le 14/11/2026.
 *
 * Les valeurs viennent des variables Netlify, JAMAIS du code : on change le
 * mot de passe ou le code d'accès sans toucher au site.
 *   NEXT_PUBLIC_COORY_DEMO_URL       adresse de connexion (…/login)
 *   NEXT_PUBLIC_COORY_DEMO_EMAIL     adresse du compte de démo
 *   NEXT_PUBLIC_COORY_DEMO_PASSWORD  son mot de passe, public par nature
 *
 * ⚠ Sans adresse, l'encadré de la démo ne s'affiche pas sur la fiche de
 * Coory.
 */
export const COORY_DEMO = {
  url: process.env.NEXT_PUBLIC_COORY_DEMO_URL ?? "",
  email: process.env.NEXT_PUBLIC_COORY_DEMO_EMAIL ?? "",
  password: process.env.NEXT_PUBLIC_COORY_DEMO_PASSWORD ?? "",
};
