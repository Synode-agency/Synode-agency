/**
 * LE LIBELLÉ DU BOUTON PRINCIPAL, le même sur tout le site (brief de la
 * refonte, règle 1). Il est à part, et minuscule, parce que le bouton sert
 * aussi dans la barre et le menu de téléphone, des composants interactifs :
 * importer `@/content` y ferait partir tous les textes du site dans le
 * navigateur (K9). `common.ts` le reprend tel quel.
 */
export const ctaLabel = {
  fr: "Réserver un appel de 30 min",
  en: "Book a 30-min call",
} as const;
