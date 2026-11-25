/**
 * LA PAGE SERVICES (brief de la refonte, 6.2) : les quatre services (le
 * 4e ajouté le 25/11/2026, une seule page pour tous), ce qui
 * est inclus, la tarification, la sécurité et la FAQ. La tarification et la
 * sécurité ne sont écrites qu'ici sur tout le site (règle 5 du brief).
 */
export const services = {
  metaTitle: "Services · Intégrations, IA, logiciels et sites web · Synode",
  metaDescription: "Connecter vos outils, mettre l’IA au travail, créer votre logiciel, votre site ou votre application mobile. Exemples, tarification et sécurité.",

  hero: {
    eyebrow: "Services",
    title: "Quatre façons de faire gagner du temps à votre équipe",
    accents: ["gagner du temps"],
    subtitle: "Chaque projet part de vos outils, de vos données et de vos règles. On ne vend pas de solution toute faite.",
  },

  labels: { problem: "Le problème", does: "Ce qu’on fait", examples: "Par exemple", result: "Le résultat" },

  blocks: [
    {
      key: "connect",
      title: "Connecter vos outils",
      problem: "Vos logiciels ne se parlent pas. Votre équipe recopie, exporte et vérifie à la main.",
      does: "On relie vos outils existants (CRM, ERP, facturation, site, e-mail, bases de données) et on automatise les étapes répétitives entre eux.",
      examples: [
        { strong: "Une demande qui circule seule", rest: " : du formulaire du site au CRM, puis à l’équipe concernée, sans ressaisie." },
        { strong: "Un nouveau client accueilli sans oubli", rest: " : documents demandés, dossier créé, équipe prévenue." },
        { strong: "Des factures relancées au bon moment", rest: ", avec lien de paiement, et une alerte quand un appel est nécessaire." },
      ],
      result: "Moins de ressaisie, moins d’erreurs, une information à jour partout.",
    },
    {
      key: "ai",
      title: "Mettre l’IA au travail",
      problem: "Devis, e-mails, documents, questions répétitives : votre équipe passe ses journées à préparer au lieu de décider.",
      does: "On met en place des assistants IA branchés sur vos outils et vos documents. Ils agissent seuls ou vous soumettent chaque action : c’est vous qui fixez la règle.",
      examples: [
        { strong: "Devis et relances", rest: " : la demande est résumée, un brouillon de devis est prêt à relire, les relances partent automatiquement." },
        { strong: "Service client en FR, NL et EN", rest: " : les questions fréquentes reçoivent une réponse, les cas complexes passent à votre équipe." },
        { strong: "Votre documentation interrogeable", rest: " : un assistant répond à partir de vos documents, cite ses sources et respecte les droits d’accès." },
      ],
      result: "Des réponses plus rapides, une équipe qui se concentre sur ce qui demande du jugement.",
    },
    {
      key: "software",
      title: "Créer votre logiciel sur mesure",
      problem: "Vous jonglez entre Excel, e-mails et outils qui ne correspondent pas à votre métier.",
      does: "On construit l’application qu’il vous faut, quelle qu’elle soit : application web ou mobile, outil interne, portail pour vos clients, plateforme métier. Avec de l’IA là où elle est utile.",
      examples: [
        { strong: "Un outil métier", rest: " qui centralise vos interventions et leur historique, et dont l’IA rédige les rapports." },
        { strong: "Une application pour vos clients", rest: ", sur le web ou sur mobile : réservation, suivi de dossier, espace personnel." },
        { strong: "Un tableau de bord", rest: " (Power BI, Excel ou web) qui se met à jour seul : ventes, marges, trésorerie." },
      ],
      result: "Un outil fait pour votre façon de travailler, pas l’inverse.",
    },
    /* [À VALIDER PAR ANTONINO] Le 4e service, texte proposé le 25/11/2026. */
    {
      key: "web",
      title: "Créer votre site ou votre application mobile",
      problem: "Votre site ne reflète plus votre activité, ou vos clients attendent une application que vous n’avez pas encore.",
      does: "On conçoit et on développe des sites web et des applications mobiles rapides, clairs et faciles à utiliser, reliés à vos outils.",
      examples: [
        { strong: "Un site qui travaille pour vous", rest: " : vos services présentés clairement, et chaque demande de contact envoyée directement dans vos outils." },
        { strong: "Une application mobile", rest: " sur iPhone et Android, pour vos clients ou pour vos équipes sur le terrain." },
        { strong: "La refonte de votre site actuel", rest: " : plus rapide, plus clair, et pensé pour être bien trouvé sur Google." },
      ],
      result: "Une présence en ligne à votre image, et des outils que vos clients utilisent vraiment.",
    },
  ] as const,

  /* Remplace l'ancienne offre « Formation & adoption IA » : la formation
     vient après la livraison, et la formation à l'IA s'ajoute à un projet
     (décision du 24/11/2026). */
  included: {
    title: "Inclus dans chaque projet",
    items: ["Installation", "Formation de votre équipe à l’outil livré", "Documentation", "Accompagnement jusqu’à la prise en main"],
    option: "En option, à ajouter au projet : une formation de vos équipes à l’IA, et le suivi, la maintenance et les évolutions par contrat récurrent.",
  },

  pricing: {
    title: "Comment nous chiffrons votre projet",
    items: [
      { strong: "Premier appel gratuit", rest: " (30 min)." },
      { strong: "Cadrage payant, déduit du projet", rest: " : vous recevez un périmètre écrit et validé." },
      { strong: "Un devis en trois lignes", rest: " : développement, frais de fonctionnement (hébergement, IA, maintenance), évolutions." },
    ],
    /* [À COMPLÉTER] « Projets à partir de … € » : vide, donc masqué. Pas de
       prix publiés (décision D1 du 23/11/2026). */
    from: "",
    /* [À VÉRIFIER] aides régionales à la digitalisation : à ne publier
       qu'après vérification. Vide, donc masqué. */
    aids: "",
  },

  security: {
    title: "Vos données restent sous contrôle",
    items: [
      { strong: "Accès limités", rest: " : chaque outil n’accède qu’aux données nécessaires." },
      { strong: "Validation humaine", rest: " : vous choisissez quelles actions demandent votre accord." },
      { strong: "Traçabilité", rest: " : chaque action est enregistrée." },
      { strong: "Vos données restent les vôtres", rest: " : hébergement en Europe quand c’est requis." },
    ],
  },

  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Combien de temps dure un projet ?",
        /* La réponse du site actuel, sans délai inventé. [À COMPLÉTER] une
           fourchette réaliste quand Synode en aura une. */
        a: "La durée dépend du périmètre, du nombre d’outils à relier, de la disponibilité des données et des tests nécessaires. Le calendrier est fixé par écrit avant le démarrage.",
      },
      {
        q: "Qui paie les frais d’IA et d’hébergement ?",
        a: "Vous choisissez : on les gère pour vous, ou vous souscrivez directement auprès des fournisseurs.",
      },
      {
        q: "La solution peut-elle évoluer ?",
        a: "Oui. Chaque évolution est cadrée et validée par écrit avant d’être développée.",
      },
      {
        q: "Et si l’IA se trompe ?",
        a: "Vous choisissez le niveau de contrôle : valider chaque action, seulement les actions sensibles, ou laisser l’IA gérer.",
      },
      {
        q: "Avec qui signons-nous ?",
        a: "Le contrat et les factures sont établis par Productions Associées ASBL (Smart), qui héberge l’activité de Synode, en Belgique. Au quotidien, vous travaillez directement avec nous.",
      },
    ],
  },
} as const;
