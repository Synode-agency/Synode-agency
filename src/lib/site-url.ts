/**
 * L'adresse canonique du site.
 *
 * Elle vit dans son propre module, et non dans `site-shell.tsx`, parce que
 * `robots.ts` et `sitemap.ts` en ont besoin. Ces deux-là sont compilés dans
 * un contexte où la transformation de `next/font/local` ne s'applique pas :
 * importer le fichier des polices depuis eux faisait échouer la construction
 * sur « Cannot read properties of undefined ».
 */
/* ⚠ `.env.example` documente `NEXT_PUBLIC_SITE_URL` depuis le début, mais
   rien ne la lisait : l'adresse était écrite en dur ici, et changer de
   domaine demandait de modifier le code. Elle est maintenant lue, avec
   l'adresse actuelle comme repli — le site reste donc correct sans aucune
   configuration, et le jour du changement de domaine, une variable suffit.

   Le préfixe `NEXT_PUBLIC_` est le bon : cette valeur n'a rien de secret et
   sert aussi côté navigateur. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://synode-agency.com").replace(/\/$/, "");
