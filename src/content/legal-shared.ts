/**
 * LE TEXTE DES PAGES LÉGALES, EN FRANÇAIS ET EN ANGLAIS.
 *
 * Texte validé par Antonino le 23/11/2026, une fois le cadre Smart connu :
 * Synode n'est pas une société, c'est le nom commercial d'une activité
 * hébergée au sein de Productions Associées ASBL (Smart), qui émet les
 * devis, les contrats et les factures. L'anglais en est la traduction
 * fidèle : les noms propres, les adresses, les numéros et les articles du
 * RGPD ne sont pas traduits.
 *
 * Écriture des paragraphes (lue par `LegalText`, dans `simple-pages.tsx`) :
 *   **texte**            texte en gras
 *   {email}              l'adresse de contact du site, en lien mailto
 *   <<libellé|https://>> lien externe (ou mailto:)
 *   <<libellé|@privacy>> lien vers la page Confidentialité de la langue
 *   <<libellé|@notice>>  lien vers la page Mentions légales de la langue
 *   un retour à la ligne (\n) devient un saut de ligne dans le paragraphe
 *
 * ⚠ Les prestataires cités doivent TOUJOURS correspondre à ceux réellement
 * branchés : un changement d'hébergeur, de boîte e-mail ou d'agenda change
 * ce fichier.
 */

/**
 * LE NUMÉRO D'ACTIVITÉ SMART DE SYNODE.
 *
 * Vide tant qu'Antonino ne l'a pas reçu : les mentions légales n'affichent
 * alors pas « activité n° … ». Il suffit de le saisir ici, par exemple
 * "12345", pour qu'il apparaisse dans les deux langues.
 */
export const SMART_ACTIVITY_NUMBER = "";

export const activityFr = SMART_ACTIVITY_NUMBER ? `, activité n° ${SMART_ACTIVITY_NUMBER}` : "";
export const activityEn = SMART_ACTIVITY_NUMBER ? `, activity no. ${SMART_ACTIVITY_NUMBER}` : "";

export const SMART_POLICY = "https://smartbe.be/fr/smart-politique-de-protection-des-donnees-personnelles/";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalTexts = {
  updated: string;
  notice: LegalSection[];
  privacy: LegalSection[];
};
