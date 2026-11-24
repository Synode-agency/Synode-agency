/** L'accueil : titre Google, description et FAQ. Le corps de la page est encore écrit dans `home-page.tsx` : il est réécrit à l'étape 4 de la refonte. */
export const home = {
  metaTitle: "Intégration, logiciels et IA à Bruxelles",
  metaDescription: "Synode, agence technologique à Bruxelles : des systèmes connectés (CRM, ERP, API), des logiciels métier intelligents et des processus automatisés, avec l’IA intégrée.",
  faq: {
    kicker: "Questions fréquentes",
    title: "Questions fréquentes sur nos solutions sur mesure",
    items: [
      {
        q: "Dois-je changer mes logiciels pour travailler avec vous ?",
        a: "Pas nécessairement. Nous cherchons d’abord à intégrer la solution à vos logiciels existants. Selon leurs possibilités techniques et votre besoin, nous pouvons les connecter, les compléter ou développer un outil métier plus adapté.",
      },
      {
        q: "Développez-vous aussi des logiciels sans IA ?",
        a: "Oui. Une intégration ou un logiciel métier peut très bien fonctionner sans IA. Nous ne l’ajoutons que si elle apporte un gain concret, et nous vous le disons dans la proposition.",
      },
      {
        q: "Combien coûte une solution sur mesure ?",
        a: "Il n’y a pas de grille tarifaire publique : chaque projet est chiffré sur son périmètre réel (fonctionnalités, données, logiciels à connecter, volumes). Le premier échange est gratuit. Le cadrage est payant : il aboutit au périmètre écrit et au devis ferme, et son montant est déduit du prix du projet au démarrage du développement. Le devis distingue le développement, les coûts techniques récurrents, la maintenance si vous la choisissez et les services tiers.",
      },
      {
        q: "Y a-t-il des coûts récurrents après la mise en service ?",
        a: "Oui, dès que votre solution s’appuie sur des services payants (modèles d’IA, hébergement, plateformes d’automatisation), qui fonctionnent par abonnement tant qu’elle tourne. Ces coûts ne sont jamais absorbés par Synode. Soit vous nous confiez le suivi et la maintenance, et nous assurons l’exploitation, le monitoring et la maintenance contre un paiement récurrent défini au contrat ; soit vous souscrivez et payez ces services directement auprès des fournisseurs. Les montants sont estimés avant le démarrage.",
      },
      {
        q: "Mes données restent-elles confidentielles ?",
        a: "Oui. Les accès sont limités aux données nécessaires et définis dans la proposition. Vous les accordez au démarrage, et ils sont retirés à la fin si vous le souhaitez. C’est vous qui choisissez ce qui est validé par une personne : toutes les actions, ou seulement les actions sensibles.",
      },
    ],
  },
} as const;
