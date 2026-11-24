/** L'ancienne page Solutions et ses six familles. Elle disparaît à l'étape 5 de la refonte, fusionnée dans Services. */
export const solutions = {
  metaTitle: "Solutions sur mesure, avec l’IA intégrée",
  metaDescription:
    "Les solutions sur mesure de Synode à Bruxelles, avec l’IA intégrée : agents IA, intégrations, automatisations, logiciels métier, data et formation.",
  kicker: "Notre offre",
  title: "Une solution construite\n^à partir de votre besoin",
  text: "De l’amélioration d’une tâche à une application complète ou à la formation de votre équipe, nous construisons la réponse autour de votre activité.",

  bricks: [
    {
          "slug": "agents-ia",
          "title": "Agents IA",
          "text": "Des agents IA pour rechercher, rédiger et analyser vos informations, capables d’enchaîner plusieurs étapes et d’exécuter des actions dans un cadre défini.",
          "benefit": "Accéder plus vite à l’information et accélérer les tâches quotidiennes.",
          "example": "Un agent IA prépare une réponse client à partir de vos documents, cite ses sources et demande votre validation avant envoi.",
          "visual": 0
    },
    {
          "slug": "integrations-systemes-connectes",
          "title": "Intégrations & systèmes connectés",
          "text": "Nous connectons les outils que vous utilisez déjà, CRM, ERP, site web ou bases de données, pour que vos données circulent sans ressaisie et que l’IA travaille sur des informations fiables.",
          "benefit": "Faire circuler les données entre vos outils sans double saisie.",
          "example": "Une demande validée sur votre site crée ou met à jour la fiche correspondante dans le CRM et l’outil de gestion.",
          "visual": 2
    },
    {
          "slug": "automatisations-intelligentes",
          "title": "Automatisations intelligentes",
          "text": "Des automatisations intelligentes pour relier les étapes répétitives de vos processus métier et traiter les informations qui circulent entre vos outils.",
          "benefit": "Réduire les saisies manuelles, les oublis et les tâches répétitives.",
          "example": "Une demande de devis reçue sur votre site est analysée, le devis est préparé pour relecture, puis relancé automatiquement jusqu’à sa signature.",
          "visual": 1
    },
    {
          "slug": "logiciels-applications-ia",
          "title": "Logiciels & applications sur mesure",
          "text": "Des logiciels métier et des applications sur mesure, conçus autour de vos processus, de vos utilisateurs et de vos règles, avec l’IA intégrée là où elle apporte un gain.",
          "benefit": "Disposer d’un outil métier adapté au travail réel de vos équipes.",
          "example": "Vos interventions sont centralisées dans une interface métier avec suivi, historique et comptes rendus assistés par IA.",
          "visual": 3
    },
    {
          "slug": "data-intelligence",
          "title": "Data & intelligence",
          "text": "Centralisation et analyse de données, tableaux de bord, détection d’anomalies, prévisions et recommandations lorsque les données le permettent.",
          "benefit": "Transformer vos données métier en indicateurs utiles à la décision.",
          "example": "Vos chiffres de ventes, de marge et de trésorerie sont réunis dans un tableau de bord Power BI ou Excel, à jour sans export manuel, avec les écarts à vérifier signalés.",
          "visual": 4
    },
    {
          "slug": "formation-adoption-ia",
          "title": "Formation & adoption IA",
          "text": "La prise en main de chaque solution livrée est incluse dans le projet. Cette offre forme aussi vos équipes à l’IA sans projet : ateliers pratiques, bons réflexes et règles d’usage.",
          "benefit": "Rendre vos équipes autonomes et responsables dans leurs usages de l’IA.",
          "example": "À partir de situations réelles, votre équipe apprend à utiliser l’IA pour préparer, vérifier et améliorer ses réponses clients.",
          "visual": 5
    }
],

  operations: {
    kicker: "Après la mise en service",
    title: "Votre solution évolue.\n^Nous restons à vos côtés",
    text: "Pour chaque solution mise en service, notre proposition distingue le coût de création et le paiement récurrent lié à son exploitation. Son montant dépend de la complexité, des volumes et des services nécessaires, avec des conditions définies avant le démarrage.",
    recurringLabel: "Paiement récurrent · défini au contrat",
    familyNote: "Ce suivi est proposé en option pour chacune de nos six solutions.",
    /* Décision du 14/11/2026 : la formation fait partie de chaque projet.
       Affiché sur les six pages solutions (`IncludedStrip`). */
    included: {
      title: "Inclus dans chaque projet",
      items: ["Installation et mise en service", "Formation de vos utilisateurs", "Documentation remise", "Accompagnement jusqu’à la prise en main"],
      more: "Former toute votre équipe à l’IA, même sans projet",
    },
    cycle: ["Conception", "Déploiement", "Surveillance", "Amélioration"],
    items: [
      { title: "Surveillance & maintenance", text: "Nous suivons le fonctionnement de la solution et intervenons dans le périmètre convenu en cas de problème." },
      { title: "Optimisation continue", text: "Nous ajustons les comportements et adaptons la solution lorsque les usages ou les technologies évoluent." },
      { title: "Suivi des coûts techniques", text: "Nous rendons visibles les coûts d’hébergement, de modèles IA, de stockage et de services externes." },
      { title: "Assistance & évolutions", text: "Le support prévu est précisé au contrat. Les nouvelles fonctionnalités importantes font l’objet d’un devis séparé." },
    ],
  },





  faqTitle: "Questions fréquentes sur nos solutions sur mesure",
  faq: [
    { q: "Comment se déroule un projet avec Synode ?", a: "Le projet suit six étapes : cadrage du besoin métier, conception et architecture, développement sur mesure, intégration et déploiement, documentation et formation, puis maintenance et évolution si vous nous les confiez. Chaque étape est validée avec vous." },
    { q: "Proposez-vous la maintenance et le monitoring après le déploiement ?", a: "Oui, si vous nous confiez le suivi et la maintenance : Synode assure le monitoring, la maintenance et les interventions prévues, contre un paiement récurrent fixé au contrat. Sinon, la solution vous est livrée et déployée, et vous souscrivez directement les services nécessaires auprès des fournisseurs. Dans les deux cas, Synode ne prend jamais ces coûts à sa charge." },
    { q: "Combien de temps faut-il pour développer une solution sur mesure ?", a: "La durée dépend du périmètre, du nombre d’intégrations, de la disponibilité des données et des tests nécessaires. Les étapes, les livrables et le calendrier sont définis dans le devis avant le démarrage." },
    { q: "Une solution sur mesure peut-elle évoluer ?", a: "Oui. Une solution peut évoluer avec vos usages, vos outils et vos volumes. Les nouvelles fonctionnalités importantes font l’objet d’un cadrage, d’un chiffrage et d’un accord écrit avant leur développement." },
    { q: "Avec qui signons-nous ?", a: "Le contrat et les factures sont établis par Productions Associées ASBL (Smart), qui héberge l’activité de Synode : un contrat écrit, des factures avec TVA et un cocontractant établi en Belgique. Au quotidien, vous travaillez directement avec nous." },
  ],
} as const;
