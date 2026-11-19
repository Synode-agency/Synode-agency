/**
 * L'identité de Synode pour les moteurs de recherche.
 *
 * Le nom affiché reste « Synode ». « Synode Agency » est le nom que porte le
 * domaine et celui que les gens tapent : sans lui, Google ne relie pas cette
 * recherche au site, d'autant que « synode » désigne d'abord une assemblée
 * d'Église et d'autres sociétés (synode.ai, synode-it.com).
 */
export const organizationName = "Synode";
export const organizationAlternateName = "Synode Agency";

/**
 * Les profils officiels de Synode ailleurs sur le Web (`sameAs`).
 *
 * Ils disent à Google que ces pages et ce site parlent de la même entreprise.
 * N'ajouter que des profils qui existent et qui renvoient eux-mêmes vers
 * synode-agency.com : page LinkedIn de l'entreprise, fiche Google Business
 * Profile, profil Sortlist, etc. Une liste vide n'écrit rien dans la page.
 */
export const organizationProfiles: string[] = [
  "https://www.linkedin.com/company/synode-agency/",
];

/** `sameAs` prêt à étaler dans un objet schema.org, ou rien si la liste est vide. */
export const sameAsField = organizationProfiles.length > 0 ? { sameAs: organizationProfiles } : {};
