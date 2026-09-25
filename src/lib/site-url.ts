/**
 * L'adresse canonique du site.
 *
 * Elle vit dans son propre module, et non dans `site-shell.tsx`, parce que
 * `robots.ts` et `sitemap.ts` en ont besoin. Ces deux-là sont compilés dans
 * un contexte où la transformation de `next/font/local` ne s'applique pas :
 * importer le fichier des polices depuis eux faisait échouer la construction
 * sur « Cannot read properties of undefined ».
 */
export const siteUrl = "https://synode-agency.com";
