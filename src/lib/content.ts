/**
 * Le contenu du site, en français et en anglais.
 *
 * L'anglais n'est PAS une traduction mot à mot : c'est la même substance
 * écrite dans le registre d'un lecteur anglophone. Le positionnement, l'offre
 * et les cibles sont identiques, parce qu'inventer une stratégie anglophone
 * dont personne n'a décidé serait du contenu fabriqué.
 *
 * Règle de fond, tenue partout dans ce fichier : aucun client, témoignage,
 * chiffre de performance, certification, délai garanti, adresse ni numéro
 * légal n'est inventé. Ce qui manque est marqué par un emplacement réservé
 * visible et listé dans `docs/SITE_A_COMPLETER.md`.
 *
 * Les cas d'usage et les réalisations vivent dans leurs propres fichiers :
 * ils sont volumineux et ils changeront à un autre rythme que le reste.
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

/** Le français est la langue par défaut et vit à la racine. */
export const localePrefix = (locale: Locale) => (locale === "fr" ? "" : "/en");

/** path("en", "/contact") -> "/en/contact" */
export const path = (locale: Locale, sub = "/") => {
  const prefix = localePrefix(locale);
  if (sub === "/") return prefix || "/";
  return `${prefix}${sub}`;
};

export const homePath = (locale: Locale) => (locale === "fr" ? "/" : "/en");

/**
 * Les adresses sont les mêmes dans les deux langues : le sélecteur ne fait
 * que remplacer le préfixe `/en`. Traduire les URL casserait ce mécanisme et
 * obligerait à maintenir deux tables de correspondance.
 */
export const ROUTES = {
  home: "/",
  solutions: "/solutions",
  useCases: "/cas-usage",
  method: "/methode",
  work: "/realisations",
  tools: "/outils",
  aiDiagnostic: "/outils/diagnostic-potentiel-ia",
  team: "/equipe",
  contact: "/contact",
  thanks: "/merci",
  legalNotice: "/mentions-legales",
  privacy: "/confidentialite",
} as const;

/** Les ancres de la page Contact, citées depuis toute la navigation. */
export const ANCHORS = {
  booking: "reservation",
  form: "formulaire",
} as const;

const nav = {
  fr: [
    { href: ROUTES.home, label: "Accueil" },
    { href: ROUTES.solutions, label: "Solutions" },
    { href: ROUTES.useCases, label: "Cas d’usage" },
    { href: ROUTES.work, label: "Réalisations" },
    { href: ROUTES.team, label: "Équipe" },
    { href: ROUTES.contact, label: "Contact" },
  ],
  en: [
    { href: ROUTES.home, label: "Home" },
    { href: ROUTES.solutions, label: "Solutions" },
    { href: ROUTES.useCases, label: "Use cases" },
    { href: ROUTES.work, label: "Work" },
    { href: ROUTES.team, label: "Team" },
    { href: ROUTES.contact, label: "Contact" },
  ],
} as const;

/* ==========================================================================
   FRANÇAIS
   ========================================================================== */
const fr = {
  locale: "fr" as Locale,
  htmlLang: "fr",

  site: {
    name: "Synode",
    /* ⚠ À confirmer avant mise en ligne : voir docs/SITE_A_COMPLETER.md. */
    email: "contact@synode-agency.com",
    location: "Bruxelles, Belgique",
    tagline:
      "Des solutions IA sur mesure, conçues autour de votre activité et qui font avancer vos opérations.",
    nav: nav.fr,
    cta: "Réserver un échange gratuit",
    ctaShort: "Réserver un échange",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    homeLabel: "Synode, retour à l’accueil",
    skip: "Aller au contenu",
    langLabel: "Langue",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerLegal: "Informations légales",
    copyright: "Synode",
  },

  home: {
    metaTitle: "Solutions IA sur mesure à Bruxelles et en Belgique",
    metaDescription: "Synode conçoit des agents IA, des automatisations et des logiciels métier sur mesure à Bruxelles et en Belgique, intégrés à vos outils et à vos données.",
    hero: {
      title:
        "Des solutions IA sur mesure,\nconçues autour de votre activité\n^et qui font avancer vos opérations.",
      text: "Nous concevons des assistants, des automatisations et des outils métier pour simplifier vos opérations et mieux exploiter vos données.",
      secondaryCta: "Voir les cas d’usage",
      /* Ce que le visiteur doit comprendre en une ligne, sous les boutons.
         Ce ne sont pas des liens : à l'arrivée il a deux choix, pas six. */
      stack: [
        "Assistants IA",
        "Automatisations",
        "Intégrations",
        "Outils métier",
        "Données & tableaux de bord",
      ],
    },

    problems: {
      kicker: "Ce qui vous ralentit",
      title: "Quatre situations\n^qu’on retrouve partout.",
      text: "Vous en reconnaîtrez probablement une. C’est en général par là qu’un projet commence.",
      items: [
        {
          title: "Des tâches refaites à la main chaque semaine",
          text: "Les mêmes gestes, le même jour, sur les mêmes dossiers. Personne n’a le temps de s’arrêter pour les traiter autrement.",
          useCase: "preparer-rendez-vous",
        },
        {
          title: "Des outils qui ne se parlent pas",
          text: "L’information est dans le mail, le devis dans un dossier, le suivi dans un tableur. On recopie d’un écran à l’autre.",
          useCase: "vue-commune",
        },
        {
          title: "Des demandes difficiles à traiter",
          text: "Les messages arrivent de partout, il faut les lire pour savoir de quoi il s’agit, et les urgents se noient dans le reste.",
          useCase: "trier-emails",
        },
        {
          title: "De l’information qu’on ne retrouve pas",
          text: "La bonne procédure existe. Elle est dans un document que personne ne retrouve, ou chez la personne absente.",
          useCase: "recherche-documents",
        },
      ],
    },

    useCases: {
      kicker: "Cas d’usage",
      title: "Ce qu’une solution IA\n^peut prendre en charge.",
      text: "Quatre exemples parmi ceux que nous détaillons. Chacun part d’un problème réel, pas d’une technologie.",
      cta: "Explorer les cas d’usage",
    },

    offer: {
      kicker: "Notre offre",
      title: "Une seule offre,\n^construite pour vous.",
      text: "Un petit projet ciblé et un outil métier complet relèvent de la même offre. Ce qui change, c’est le périmètre, le budget et l’accompagnement, pas la nature du travail.",
      /* Les briques ne sont pas un menu : ce sont les matériaux possibles. */
      bricks: [
        { title: "Assistants et agents IA", text: "Analyse, recherche, préparation de réponses, aide à la décision." },
        { title: "Automatisations", text: "Traitement des demandes, des documents, des tâches et des circuits de validation." },
        { title: "Intégrations", text: "Connexion à vos logiciels et à vos données existants." },
        { title: "Outils métier", text: "Interfaces, espaces internes, bases de données et tableaux de bord." },
      ],
      note: "L’IA fait partie de chaque projet, avec une utilité identifiée. Si elle n’apporte rien à votre problème, nous vous le disons et nous réorientons la demande.",
      cta: "Découvrir notre approche",
    },
      /* Le schéma d'architecture de la bande Offre. Trois étages : ce que
         l'entreprise possède déjà, ce que nous construisons entre les deux,
         et ce qui en sort. C'est l'argument de la section, montré. */
      architecture: {
        caption: "Ce que nous construisons, et où cela se place",
        toolsLabel: "Vos outils, tels qu’ils sont",
        tools: ["CRM", "Email", "Documents", "Agenda", "Logiciel métier"],
        coreLabel: "La solution Synode",
        core: ["Assistants IA", "Automatisations", "Intégrations", "Interface métier"],
        outLabel: "Vos processus",
        out: ["Demandes traitées", "Documents produits", "Suivi à jour"],
        humanLabel: "Vous gardez la validation sur ce qui compte",
      },


    proof: {
      kicker: "Ce que nous construisons",
      title: "Des preuves, pas des promesses.",
      text: "Nous démarrons. Plutôt que d’afficher des logos que nous n’avons pas, nous montrons ce qui existe réellement aujourd’hui.",
      cta: "Voir les réalisations",
    },

    method: {
      kicker: "Méthode",
      title: "Comment un projet\n^se déroule.",
      text: "Cinq temps, et aucun ne commence avant que le précédent soit validé avec vous.",
      steps: [
        { title: "Comprendre", text: "Votre problème, sa fréquence, vos outils et ce qu’il vous coûte aujourd’hui." },
        { title: "Proposer", text: "Un périmètre écrit, des livrables, un prix et des critères de réussite." },
        { title: "Construire", text: "Par jalons, avec des démonstrations que vous validez au fur et à mesure." },
        { title: "Déployer", text: "Tests sur vos critères, formation de vos équipes, documentation transmise." },
        { title: "Suivre", text: "Surveillance du fonctionnement et interventions dans le cadre convenu." },
      ],
      cta: "Comment se déroule un projet ?",
    },

    team: {
      kicker: "L’équipe",
      title: "Deux associés,\n^un interlocuteur par sujet.",
      text: "Vous savez toujours à qui vous parlez : celui qui comprend et suit votre besoin, et celui qui conçoit et réalise la solution.",
      cta: "Rencontrer l’équipe",
    },

    faq: {
      kicker: "Questions fréquentes sur nos solutions IA",
      title: "Questions fréquentes sur les solutions IA sur mesure",
      items: [
        {
          q: "Dois-je changer mes logiciels pour utiliser une solution IA ?",
          a: "Pas nécessairement. Nous cherchons d’abord à intégrer la solution IA à vos logiciels existants. Selon leurs possibilités techniques et votre besoin, nous pouvons les connecter, les compléter ou développer un outil métier plus adapté.",
        },
        {
          q: "Combien coûte une solution IA sur mesure ?",
          a: "Le prix d’un agent IA, d’une automatisation ou d’un logiciel IA sur mesure dépend du périmètre, des intégrations et de la complexité. Un premier échange gratuit nous permet de comprendre votre besoin avant de préparer un devis personnalisé, avec les éventuels frais récurrents.",
        },
        {
          q: "Y a-t-il des coûts récurrents après la mise en service ?",
          a: "Oui. Une solution IA s’appuie sur des services payants — modèles IA, hébergement, plateformes d’automatisation — qui fonctionnent par abonnement tant qu’elle tourne. Ces coûts ne sont jamais absorbés par Synode. Soit vous prenez notre suivi et nous assurons l’exploitation, le monitoring et la maintenance contre un paiement récurrent défini au contrat ; soit vous souscrivez et payez ces services directement auprès des fournisseurs. Les montants sont estimés avant le démarrage.",
        },
        {
          q: "Comment se déroule un projet avec Synode ?",
          a: "Nous commençons par comprendre votre activité, vos outils et le problème à résoudre. Nous analysons ensuite la faisabilité, préparons une proposition, développons la solution IA et accompagnons sa mise en service.",
        },
        {
          q: "Mes données restent-elles confidentielles ?",
          a: "La confidentialité et la gestion des accès sont prises en compte lors de la conception. Les outils et services utilisés, ainsi que les modalités de traitement des données, sont définis selon les exigences de votre projet.",
        },
        {
          q: "Assurez-vous la maintenance après le déploiement ?",
          a: "Oui. Synode assure l’exploitation, le monitoring et la maintenance de votre solution IA selon les modalités prévues au contrat. Les coûts techniques et les évolutions importantes sont définis séparément.",
        },
      ],
    },

    cta: {
      title: "Quel processus aimeriez-vous\n^simplifier en premier ?",
      text: "Un échange de 30 minutes, gratuit et sans engagement. Nous cherchons à comprendre votre situation et à identifier une première piste. Ce n’est pas un audit technique complet, et rien ne vous engage à la suite.",
      secondary: "Décrire mon besoin par écrit",
    },
  },

  /* ---------------------------------------------------------------- Solutions */
  solutions: {
    metaTitle: "Solutions IA sur mesure à Bruxelles et en Belgique",
    metaDescription:
      "Découvrez les solutions IA sur mesure de Synode à Bruxelles : agents IA, automatisations, logiciels métier, intégrations, data et formation pour entreprises.",
    kicker: "Notre offre",
    title: "Une solution construite\n^à partir de votre besoin.",
    text: "De l’amélioration d’une tâche à une application complète ou à la formation de votre équipe, nous construisons la réponse autour de votre activité.",

    bricksTitle: "Nos solutions IA sur mesure",
    bricksText: "Six familles complémentaires pour les indépendants, TPE et PME. Un projet peut en combiner plusieurs, selon votre besoin. Aucun forfait imposé.",
    bricks: [
      {
            "slug": "assistants-agents-ia",
            "title": "Assistants & Agents IA",
            "text": "Des assistants IA pour rechercher, rédiger et analyser vos informations, ainsi que des agents IA capables d’exécuter des actions dans un cadre défini.",
            "benefit": "Accéder plus vite à l’information et accélérer les tâches quotidiennes.",
            "example": "Un agent IA prépare une réponse client à partir de vos documents, cite ses sources et demande votre validation avant envoi.",
            "visual": 0
      },
      {
            "slug": "automatisations-intelligentes",
            "title": "Automatisations intelligentes",
            "text": "Des automatisations intelligentes pour relier les étapes répétitives de vos processus métier et traiter les informations qui circulent entre vos outils.",
            "benefit": "Réduire les saisies manuelles, les oublis et les tâches répétitives.",
            "example": "Une facture reçue par email est extraite, contrôlée et transmise au bon outil, tandis que les cas ambigus vous sont signalés.",
            "visual": 1
      },
      {
            "slug": "logiciels-applications-ia",
            "title": "Logiciels & Applications IA sur mesure",
            "text": "Des logiciels métier et applications IA sur mesure conçus autour de vos processus, de vos utilisateurs et de vos règles de fonctionnement.",
            "benefit": "Disposer d’un outil métier adapté au travail réel de vos équipes.",
            "example": "Vos interventions sont centralisées dans une interface métier avec suivi, historique et comptes rendus assistés par IA.",
            "visual": 3
      },
      {
            "slug": "integrations-systemes-connectes",
            "title": "Intégrations & systèmes connectés",
            "text": "Des intégrations entre vos logiciels, CRM, ERP, sites web et bases de données pour synchroniser les informations utiles.",
            "benefit": "Faire circuler les données entre vos outils sans double saisie.",
            "example": "Une demande validée sur votre site crée ou met à jour la fiche correspondante dans le CRM et l’outil de gestion.",
            "visual": 2
      },
      {
            "slug": "data-intelligence",
            "title": "Data & Intelligence",
            "text": "Centralisation et analyse de données, tableaux de bord, détection d’anomalies, prévisions et recommandations lorsque les données le permettent.",
            "benefit": "Transformer vos données métier en indicateurs utiles à la décision.",
            "example": "Les données de ventes et de stocks sont réunies pour détecter les anomalies et anticiper les besoins à partir de l’historique disponible.",
            "visual": 4
      },
      {
            "slug": "formation-adoption-ia",
            "title": "Formation & Adoption IA",
            "text": "Des formations IA et ateliers pratiques pour comprendre les usages, adopter les bons réflexes et prendre en main vos solutions d’intelligence artificielle.",
            "benefit": "Rendre vos équipes autonomes et responsables dans leurs usages de l’IA.",
            "example": "À partir de situations réelles, votre équipe apprend à utiliser l’IA pour préparer, vérifier et améliorer ses réponses clients.",
            "visual": 5
      }
],

    operations: {
      kicker: "Après la mise en service",
      title: "Votre solution évolue.\n^Nous restons à vos côtés.",
      text: "Pour chaque solution mise en service, notre proposition distingue le coût de création et le paiement récurrent lié à son exploitation. Son montant dépend de la complexité, des volumes et des services nécessaires, avec des conditions définies avant le démarrage.",
      recurringLabel: "Paiement récurrent · défini au contrat",
      familyNote: "Ce suivi accompagne les six familles de solutions. Il ne constitue pas une septième offre.",
      cycle: ["Conception", "Déploiement", "Surveillance", "Amélioration"],
      items: [
        { title: "Surveillance & maintenance", text: "Nous suivons le fonctionnement de la solution et intervenons dans le périmètre convenu en cas de problème." },
        { title: "Optimisation continue", text: "Nous ajustons les comportements et adaptons la solution lorsque les usages ou les technologies évoluent." },
        { title: "Suivi des coûts techniques", text: "Nous rendons visibles les coûts d’hébergement, de modèles IA, de stockage et de services externes." },
        { title: "Assistance & évolutions", text: "Le support prévu est précisé au contrat. Les nouvelles fonctionnalités importantes font l’objet d’un devis séparé." },
      ],
    },

    domainsTitle: "Quatre territoires d’intervention",
    domainsText: "Ils servent à comprendre notre activité. Ce ne sont ni quatre offres distinctes, ni les limites de ce que nous savons faire.",
    domainsCta: "Voir les cas d’usage",

    deliverablesTitle: "Ce que vous recevez",
    deliverables: [
      "Un périmètre écrit et validé avant le démarrage.",
      "Une solution testée selon les critères convenus ensemble.",
      "La documentation de son fonctionnement.",
      "Une prise en main avec les personnes qui vont l’utiliser.",
      "Les modalités de suivi, écrites elles aussi.",
    ],
    deliverablesNote: "Le devis fixe les livrables exacts de votre projet. Cette liste décrit le socle, pas une promesse automatique.",

    sizingTitle: "Comment un projet est dimensionné",
    sizingText: "Six facteurs, et ils comptent plus que la taille de votre entreprise.",
    sizing: [
      { title: "L’objectif", text: "Ce que la solution doit changer, et comment on saura que c’est le cas." },
      { title: "La complexité", text: "Le nombre de cas particuliers et d’exceptions à traiter." },
      { title: "Les données", text: "Leur disponibilité, leur qualité et les droits d’accès." },
      { title: "Les intégrations", text: "Le nombre d’outils à connecter et ce qu’ils permettent réellement." },
      { title: "Les utilisateurs", text: "Combien de personnes s’en servent, et avec quel niveau de contrôle." },
      { title: "Les contraintes", text: "Confidentialité, validation humaine obligatoire, volumes à absorber." },
    ],
    sizingNote: "Un petit besoin peut démarrer par un périmètre réduit, et s’étendre ensuite si l’utilité est démontrée.",

    pricingTitle: "Comment nous facturons",
    pricing: [
      { title: "Création", text: "Cadrage, développement, intégrations, tests et déploiement. Prix et échéancier propres au projet." },
      { title: "Exploitation, maintenance & monitoring", text: "Un paiement récurrent propre à chaque solution mise en service. Il couvre uniquement les services, la surveillance et les interventions précisés au contrat." },
      { title: "Évolutions importantes", text: "Nouveau périmètre, nouveau chiffrage, accord écrit avant réalisation." },
    ],
    pricingNote: "La proposition distingue clairement le coût de création, le paiement récurrent et les services tiers éventuels. Pas de prix public ni de « tout illimité » : le budget dépend du périmètre réel.",

    faqTitle: "Questions fréquentes sur les solutions IA sur mesure",
    faq: [
      { q: "Une solution IA peut-elle s’intégrer à mes logiciels actuels ?", a: "Oui, lorsque vos outils proposent des API, des exports ou d’autres possibilités de connexion. Nous étudions d’abord votre CRM, ERP, messagerie, bases de données et logiciels métier afin de définir une intégration réaliste avant le devis." },
      { q: "Combien coûte une solution IA sur mesure ?", a: "Le prix dépend du périmètre, des fonctionnalités, des volumes, des données et des logiciels à connecter. Vous recevez un devis personnalisé qui distingue le développement, les coûts techniques récurrents, la maintenance éventuelle et les services tiers." },
      { q: "Comment se déroule un projet IA avec Synode ?", a: "Le projet suit cinq étapes : cadrage du besoin métier, conception de la solution IA, développement et intégration, déploiement et formation, puis maintenance et évolution. Chaque étape est validée avec vous." },
      { q: "Comment protégez-vous les données utilisées par la solution IA ?", a: "Les accès sont limités aux données nécessaires et définis dans la proposition. Les permissions dépendent des utilisateurs et des outils connectés. Les actions sensibles peuvent rester soumises à une validation humaine." },
      { q: "Proposez-vous la maintenance et le monitoring après le déploiement ?", a: "Oui. Selon le contrat, Synode peut assurer le monitoring, la maintenance et les interventions prévues pour votre solution IA. Les abonnements techniques et les évolutions importantes sont identifiés et chiffrés séparément." },
      { q: "Combien de temps faut-il pour développer une solution IA ?", a: "La durée dépend du périmètre, du nombre d’intégrations, de la disponibilité des données et des tests nécessaires. Les étapes, les livrables et le calendrier sont définis dans le devis avant le démarrage." },
      { q: "Une solution IA sur mesure peut-elle évoluer ?", a: "Oui. Une solution peut évoluer avec vos usages, vos outils et vos volumes. Les nouvelles fonctionnalités importantes font l’objet d’un cadrage, d’un chiffrage et d’un accord écrit avant leur développement." },
    ],

    notInList: {
      title: "Votre besoin ne figure pas ici ?",
      text: "Chaque projet est conçu à partir de votre contexte. Les exemples de ce site montrent notre manière de travailler, pas un catalogue fermé.",
      cta: "Parlons de votre besoin",
    },
  },

  /* ------------------------------------------------------------------ Méthode */
  method: {
    metaTitle: "Notre méthode : du premier échange au suivi",
    metaDescription:
      "Six étapes, ce que fait Synode, ce que vous apportez et ce qui sort de chacune. Aucun délai universel annoncé : il dépend du périmètre.",
    kicker: "Méthode",
    title: "Ce qui se passe,\n^étape par étape.",
    text: "Chaque étape a une sortie visible. Vous savez à tout moment où en est le projet et ce qui vous est demandé.",
    columns: { work: "Ce que nous faisons", client: "Ce que vous apportez", output: "Ce qui en sort" },
    steps: [
      {
        title: "Premier échange",
        work: "Comprendre votre besoin, vos outils, vos contraintes et la priorité du projet.",
        client: "Partir d’un cas concret, récent de préférence.",
        output: "Un résumé du besoin et la prochaine étape proposée.", brief: "On cadre votre besoin en 30 minutes, gratuit et sans engagement", accents: ["besoin", "30 minutes", "sans engagement"],
      },
      {
        title: "Analyse et proposition",
        work: "Évaluer la faisabilité, définir le périmètre du projet et préciser les critères de réussite.",
        client: "Confirmer les données disponibles, les contraintes et les personnes impliquées dans la décision.",
        output: "Une proposition, un devis et des critères de réussite.", brief: "Vos données et contraintes donnent la faisabilité, le périmètre et le devis", accents: ["données", "contraintes", "faisabilité", "périmètre", "devis"],
      },
      {
        title: "Conception",
        work: "Définir le fonctionnement de la solution IA, les accès nécessaires et les étapes qui nécessitent une validation humaine.",
        client: "Valider le périmètre, les règles métier et les exemples qui serviront de référence.",
        output: "Un plan de réalisation partagé.", brief: "Vos règles métier deviennent le plan\nde réalisation", accents: ["règles métier", "plan", "de réalisation"],
      },
      {
        title: "Construction",
        work: "Développer la solution et la confronter progressivement à vos processus et à vos cas réels.",
        client: "Tester les parcours, valider les premiers résultats et nous transmettre vos retours.",
        output: "Une version prête pour la recette.", brief: "On développe sur vos cas réels, guidés par vos retours", accents: ["cas réels", "retours"],
      },
      {
        title: "Recette et déploiement",
        work: "Tester, corriger, documenter et mettre la solution IA en service dans votre environnement.",
        client: "Valider les critères de réussite définis au début du projet avant la mise en production.",
        output: "La solution en service, et sa documentation transmise.", brief: "Votre validation ouvre la mise en service et la documentation", accents: ["validation", "mise en service", "documentation"],
      },
      {
        title: "Suivi",
        work: "Surveiller le fonctionnement de la solution, assurer sa maintenance et cadrer les évolutions nécessaires.",
        client: "Signaler les incidents, les nouveaux besoins et les évolutions de vos processus métier.",
        output: "Une maintenance suivie, et les évolutions chiffrées.", brief: "Vos retours d’usage orientent la maintenance\net les évolutions", accents: ["retours d’usage", "maintenance", "évolutions"],
      },
    ],
    notesTitle: "Quatre choses que nous préférons dire d’avance",
    notes: [
      { title: "Un changement de périmètre se chiffre", text: "Ajouter un cas non prévu en cours de route est possible, mais cela se discute et se chiffre. Nous ne l’absorbons pas en silence, et nous ne le découvrons pas non plus à la facture." },
      { title: "Le projet dépend de vos accès", text: "Une donnée indisponible ou un accès qui tarde décale la suite. C’est la cause de retard la plus fréquente, et la plus facile à éviter en la nommant tôt." },
      { title: "Vos données restent les vôtres", text: "Nous travaillons sur le strict nécessaire, et les conditions de traitement sont écrites avant le démarrage." },
      { title: "Maintenance et nouveauté ne sont pas la même chose", text: "Corriger ce qui ne fonctionne plus comme convenu relève de la maintenance. Ajouter une fonction qui n’existait pas relève d’un nouveau devis." },
    ],
    noDelay: "Nous n’annonçons pas de délai universel de livraison. Il dépend du périmètre, de vos accès et de votre disponibilité pour valider.",
    cta: "Commençons par votre situation actuelle",
  },

  /* ------------------------------------------------------------------- Équipe */
  team: {
    metaTitle: "L’équipe Synode",
    metaDescription:
      "Deux associés : qui comprend et suit votre besoin, qui conçoit et réalise la solution. Comment nous travaillons avec vous.",
    kicker: "L’équipe",
    title: "Pourquoi nous\n^construisons Synode.",
    vision:
      "Beaucoup d’entreprises entendent parler d’IA sans jamais voir ce que cela changerait chez elles. Les démonstrations impressionnent, puis rien n’arrive dans le travail réel. Nous avons fait Synode pour l’autre chemin : partir d’une tâche précise qui coûte du temps, et construire ce qui la prend en charge.",
    peopleTitle: "Deux profils, une même exigence.",
    people: [
      {
        first: "Antonino", photo: "/equipe/AntoEquipe.webp", headline: "Automatiser et faire grandir", role: "Co-fondateur · Développeur & Expert IA",
        text: "Conception des workflows et des agents : il cartographie vos processus, choisit ce qui vaut la peine d’être automatisé et le met en production.",
      },
      {
        first: "Killian", photo: "/equipe/KillianEquipe.webp", headline: "Concevoir des idées durables", role: "Co-fondateur · Développeur & Expert IA",
        text: "Développement des applications, outils internes et intégrations : il construit ce qui n’existe pas encore et connecte ce que vous avez déjà.",
      },
    ],
    complementTitle: "Notre complémentarité",
    complementText:
      "Deux expertises, un même objectif : relier la compréhension de vos processus à la construction d’outils utiles. Workflows, agents, applications et intégrations se complètent dans une solution pensée pour votre activité.",
    workingTitle: "Notre manière de travailler",
    working: [
      "Un interlocuteur identifié pour votre projet, du premier échange au suivi.",
      "Des explications en langage courant, pas en vocabulaire technique.",
      "Des étapes visibles : vous savez toujours où en est le projet.",
      "Des décisions écrites, pour que personne n’ait à se souvenir de ce qui avait été dit.",
    ],
    cta: "Échangeons sur votre projet",
  },

  /* ------------------------------------------------------------------ Contact */
  contact: {
    metaTitle: "Parlons de votre projet",
    metaDescription:
      "Réservez un échange gratuit de 30 minutes, ou décrivez votre besoin par écrit. Sans engagement.",
    kicker: "Contact",
    title: "Parlons de\n^votre projet.",
    text: "Deux façons de commencer, au choix. Vous n’avez rien à remplir pour accéder au calendrier.",

    booking: {
      title: "Réserver un échange de 30 minutes",
      text: "Un premier échange gratuit et sans engagement. Nous cherchons à comprendre votre situation et à identifier une première piste. Ce n’est pas un audit technique complet.",
      openLabel: "Ouvrir le calendrier",
      unavailableTitle: "Réservation pas encore disponible",
      unavailableText:
        "Le calendrier n’est pas encore branché sur cette version du site. En attendant, décrivez votre besoin par le formulaire ci-dessous : nous vous répondons et nous proposons un créneau.",
    },

    form: {
      title: "Décrire votre besoin par écrit",
      text: "Si vous préférez écrire, ou si aucun créneau ne vous convient.",
      fields: {
        name: { label: "Nom", placeholder: "Votre nom" },
        email: { label: "Email de contact", placeholder: "vous@exemple.com", hint: "Une adresse personnelle convient : nous travaillons aussi avec des indépendants." },
        company: { label: "Entreprise ou activité", placeholder: "Facultatif", optional: "Facultatif" },
        need: { label: "Que souhaitez-vous améliorer aujourd’hui ?", placeholder: "Décrivez la tâche ou la situation qui vous coûte le plus de temps.", hint: "Un exemple concret vaut mieux qu’une description générale." },
        phone: { label: "Téléphone", placeholder: "Facultatif", optional: "Facultatif" },
        website: { label: "Site internet", placeholder: "Facultatif", optional: "Facultatif" },
        timeline: { label: "Échéance envisagée", optional: "Facultatif" },
        budget: { label: "Budget envisagé", optional: "Facultatif" },
      },
      timelineOptions: ["À définir", "Dès que possible", "Dans 1 à 3 mois", "Dans 3 à 6 mois", "Plus tard"],
      budgetOptions: ["À définir", "Moins de 5 000 €", "5 000 à 15 000 €", "15 000 à 40 000 €", "Plus de 40 000 €"],
      submit: "Envoyer mon message",
      sending: "Envoi en cours…",
      privacyNote: "Vos informations servent uniquement à traiter votre demande. Pas de newsletter, pas de revente.",
      privacyLink: "Comment nous traitons vos données",
      errors: {
        name: "Indiquez votre nom.",
        email: "Indiquez une adresse email.",
        emailInvalid: "Cette adresse email semble incorrecte.",
        need: "Décrivez votre besoin en quelques mots (10 caractères minimum).",
        website: "Cette adresse de site semble incorrecte.",
        tooLong: "Ce champ est trop long.",
        rateLimited: "Vous venez d’envoyer une demande. Patientez un instant avant de recommencer.",
        server: "Nous n’avons pas pu enregistrer votre demande. Votre texte est conservé : réessayez dans un instant.",
        notConfigured:
          "L’envoi de messages n’est pas encore activé sur cette version du site. Votre texte est conservé ci-dessous ; écrivez-nous directement en attendant.",
      },
    },

    direct: { title: "Ou directement", emailLabel: "Par email" },
  },

  thanks: {
    metaTitle: "Message bien reçu",
    title: "Votre message\n^a bien été reçu.",
    text: "Nous l’avons enregistré et nous revenons vers vous. Si votre demande est urgente, réservez directement un créneau : c’est le chemin le plus rapide.",
    /* On ne promet pas de délai : la référence l'interdit tant qu'il n'est
       pas tenable. */
    notBooked: "Ce message n’est pas un rendez-vous. Pour en fixer un, passez par le calendrier.",
    bookCta: "Réserver un échange",
    homeCta: "Revenir à l’accueil",
  },

  notFound: {
    title: "Cette page\n^n’existe pas.",
    text: "Le lien est peut-être ancien, ou l’adresse comporte une faute. Voici les pages les plus consultées.",
    homeCta: "Revenir à l’accueil",
  },

  /* ------------------------------------------------------------------- Légal */
  legal: {
    noticeTitle: "Mentions légales",
    noticeDescription: "Informations légales du site Synode.",
    privacyTitle: "Politique de confidentialité",
    privacyDescription: "Quelles données nous traitons, pourquoi, et avec quels prestataires.",
    draftLabel: "Brouillon",
    draftText:
      "Cette page est incomplète. Les informations manquantes doivent être confirmées avant toute mise en ligne : elles sont listées dans la documentation du projet.",
    updated: "Dernière mise à jour",
  },
} as const;

/* ==========================================================================
   ENGLISH

   Written for an English-speaking reader, not translated word for word. The
   offer, the targets and the claims are identical: only the register moves.
   ========================================================================== */
const en = {
  locale: "en" as Locale,
  htmlLang: "en",

  site: {
    name: "Synode",
    email: "contact@synode-agency.com",
    location: "Brussels, Belgium",
    tagline:
      "Custom AI solutions, built around how your business actually works, to move your operations forward.",
    nav: nav.en,
    cta: "Book a free call",
    ctaShort: "Book a call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    homeLabel: "Synode, back to home",
    skip: "Skip to content",
    langLabel: "Language",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerLegal: "Legal",
    copyright: "Synode",
  },

  home: {
    metaTitle: "Custom AI solutions in Brussels and Belgium",
    metaDescription: "Synode designs AI agents, automations and custom business software in Brussels and Belgium, integrated with your tools and data.",
    hero: {
      title:
        "Custom AI solutions,\nbuilt around how you work\n^and made to move your operations.",
      text: "We build assistants, automations and internal tools that take work off your plate and put your own data to use.",
      secondaryCta: "See the use cases",
      stack: ["AI assistants", "Automations", "Integrations", "Internal tools", "Data & dashboards"],
    },

    problems: {
      kicker: "What slows you down",
      title: "Four situations\n^we find everywhere.",
      text: "You will probably recognise one of them. That is usually where a project starts.",
      items: [
        {
          title: "The same work, redone by hand every week",
          text: "Same steps, same day, same files. Nobody has time to stop and deal with it differently.",
          useCase: "preparer-rendez-vous",
        },
        {
          title: "Tools that do not talk to each other",
          text: "The context is in an email, the quote in a folder, the follow-up in a spreadsheet. People retype from one screen to the next.",
          useCase: "vue-commune",
        },
        {
          title: "Incoming requests that are hard to handle",
          text: "Messages arrive from everywhere, you have to read them to know what they are about, and the urgent ones sink into the rest.",
          useCase: "trier-emails",
        },
        {
          title: "Information nobody can find",
          text: "The right procedure exists. It is in a document nobody can locate, or with the person who is away.",
          useCase: "recherche-documents",
        },
      ],
    },

    useCases: {
      kicker: "Use cases",
      title: "What an AI solution\n^can take on.",
      text: "Four examples from the ones we document. Each starts with a real problem, not with a technology.",
      cta: "Explore the use cases",
    },

    offer: {
      kicker: "What we sell",
      title: "One offer,\n^built for you.",
      text: "A small, targeted project and a full internal tool are the same offer. What changes is the scope, the budget and the support, not the nature of the work.",
      bricks: [
        { title: "AI assistants and agents", text: "Reading, searching, summarising, drafting, helping a decision along." },
        { title: "Automations", text: "Handling requests, documents, tasks and approval routes." },
        { title: "Integrations", text: "Connecting the software and the data you already have." },
        { title: "Internal tools", text: "Interfaces, internal spaces, databases and dashboards." },
      ],
      note: "AI is part of every project, with a purpose we can point to. If it adds nothing to your problem, we say so and steer the request elsewhere.",
      cta: "See how we work",
    },
      architecture: {
        caption: "What we build, and where it sits",
        toolsLabel: "Your tools, as they are",
        tools: ["CRM", "Email", "Documents", "Calendar", "Line-of-business app"],
        coreLabel: "The Synode solution",
        core: ["AI assistants", "Automations", "Integrations", "Business interface"],
        outLabel: "Your processes",
        out: ["Requests handled", "Documents produced", "Follow-up current"],
        humanLabel: "You keep approval on what matters",
      },


    proof: {
      kicker: "What we are building",
      title: "Evidence, not promises.",
      text: "We are starting out. Rather than show logos we do not have, we show what actually exists today.",
      cta: "See our work",
    },

    method: {
      kicker: "Method",
      title: "How a project\n^runs.",
      text: "Five stages, and none starts before the previous one is signed off with you.",
      steps: [
        { title: "Understand", text: "Your problem, how often it happens, your tools, and what it costs you today." },
        { title: "Propose", text: "A written scope, deliverables, a price and success criteria." },
        { title: "Build", text: "In milestones, with demos you sign off as we go." },
        { title: "Ship", text: "Testing against your criteria, training your people, handing over the documentation." },
        { title: "Support", text: "Watching how it runs and stepping in within the agreed scope." },
      ],
      cta: "How does a project run?",
    },

    team: {
      kicker: "The team",
      title: "Two partners,\n^one person per subject.",
      text: "You always know who you are talking to: the one who understands and follows your need, and the one who designs and builds the solution.",
      cta: "Meet the team",
    },

    faq: {
      kicker: "Frequently asked questions about our AI solutions",
      title: "Common questions about custom AI solutions",
      items: [
        {
          q: "Do I need to change my software to use an AI solution?",
          a: "Not necessarily. We first look at how to work with your existing tools. Depending on their integration options and your needs, we can connect them, extend them or suggest a more suitable solution.",
        },
        {
          q: "How much does a custom AI solution cost?",
          a: "The price depends on the project, its features and its complexity. We start with a free conversation to understand your need before preparing a tailored proposal. Any recurring costs are stated as well.",
        },
        {
          q: "Are there recurring costs after go-live?",
          a: "Yes. An AI solution relies on paid services — AI models, hosting, automation platforms — billed by subscription for as long as it runs. Synode never absorbs these costs. Either you take our support service and we handle running, monitoring and maintenance for a recurring payment set out in the contract; or you subscribe to and pay those services directly with the providers. Amounts are estimated before work starts.",
        },
        {
          q: "How does a project with Synode work?",
          a: "We begin by understanding your need. We then assess feasibility, prepare a proposal, build the solution and support its go-live.",
        },
        {
          q: "Will my data remain confidential?",
          a: "Confidentiality and access management are considered during design. The tools and services involved, along with how data is handled, are defined according to your project requirements.",
        },
        {
          q: "Do you provide maintenance after deployment?",
          a: "Yes. Synode runs, monitors and maintains your AI solution under the terms set out in the contract. Technical costs and significant changes are defined separately.",
        },
      ],
    },

    cta: {
      title: "Which process would you\n^simplify first?",
      text: "A 30-minute call, free and with no strings attached. We are there to understand your situation and find a first angle. It is not a full technical audit, and nothing commits you to what comes next.",
      secondary: "Write to us instead",
    },
  },

  solutions: {
    metaTitle: "Custom AI solutions for freelancers and small companies",
    metaDescription:
      "Six families of custom AI solutions: assistants, automations, software, integrations, data and training. For freelancers and small businesses.",
    kicker: "What we sell",
    title: "A solution built\n^from your need.",
    text: "From improving a task to building a full application or training your team, we shape the solution around your business.",

    bricksTitle: "Our custom AI solutions",
    bricksText: "Six complementary families for freelancers and small businesses. A project can combine several, depending on your needs. No fixed packages.",
    bricks: [
      {
            "slug": "assistants-agents-ia",
            "title": "AI Assistants & Agents",
            "text": "AI assistants that search, draft or analyse information, and AI agents that carry out a sequence of actions within an agreed scope.",
            "benefit": "Find information and prepare the next step.",
            "example": "A customer reply drafted from your documents, with sources and your approval.",
            "visual": 0
      },
      {
            "slug": "automatisations-intelligentes",
            "title": "Intelligent Automations",
            "text": "Intelligent automations that connect the repetitive steps of your business processes, using AI when information needs to be understood, classified or processed.",
            "benefit": "Fewer manual steps along the way.",
            "example": "An emailed invoice is extracted and checked; ambiguous cases are sent to you for review.",
            "visual": 1
      },
      {
            "slug": "logiciels-applications-ia",
            "title": "Custom AI Software & Applications",
            "text": "Custom AI software and applications built for your team, or artificial intelligence features integrated into products used by your customers.",
            "benefit": "Software that fits how people work.",
            "example": "Service jobs in one interface, with a report drafted for a team member to review.",
            "visual": 3
      },
      {
            "slug": "integrations-systemes-connectes",
            "title": "Integrations & Connected Systems",
            "text": "Connections between your software, CRM, ERP and databases to share the information that matters.",
            "benefit": "Tools that work together.",
            "example": "An approved website request updates the CRM and reaches your management software.",
            "visual": 2
      },
      {
            "slug": "data-intelligence",
            "title": "Data & Intelligence",
            "text": "Centralisation and analysis of data, dashboards, forecasting, scoring or recommendations when the quality and volume of the data support them.",
            "benefit": "Better-informed decisions.",
            "example": "Sales and stock in one view to spot anomalies and estimate needs when enough history is available.",
            "visual": 4
      },
      {
            "slug": "formation-adoption-ia",
            "title": "AI Training & Adoption",
            "text": "AI training and practical workshops to learn how to use artificial intelligence and adopt your solutions, with or without a Synode project.",
            "benefit": "A team comfortable with its new ways of working.",
            "example": "Using real situations, your team learns to draft and review customer replies.",
            "visual": 5
      }
],

    operations: {
      kicker: "After go-live",
      title: "Your solution evolves.\n^We stay by your side.",
      text: "For every solution that goes live, our proposal separates the build cost from the recurring payment required to run it. The amount depends on complexity, usage volumes and the services involved, with the terms agreed before work begins.",
      recurringLabel: "Recurring payment · defined in the contract",
      familyNote: "This support applies across all six solution families. It is not a seventh offer.",
      cycle: ["Design", "Deployment", "Monitoring", "Improvement"],
      items: [
        { title: "Monitoring & maintenance", text: "We monitor how the solution runs and intervene within the agreed scope when an issue occurs." },
        { title: "Continuous optimisation", text: "We adjust behaviours and adapt the solution as usage patterns or technologies change." },
        { title: "Technical cost tracking", text: "We make hosting, AI model, storage and external service costs visible." },
        { title: "Support & changes", text: "The included support is stated in the contract. Significant new features receive a separate quote." },
      ],
    },

    domainsTitle: "Four areas we work in",
    domainsText: "They are there to explain what we do. They are neither four separate packages nor the limits of what we can build.",
    domainsCta: "See the use cases",

    deliverablesTitle: "What you get",
    deliverables: [
      "A written scope, agreed before anything starts.",
      "A solution tested against the criteria we set together.",
      "Documentation of how it works.",
      "A handover with the people who will actually use it.",
      "Support terms, in writing as well.",
    ],
    deliverablesNote: "Your quote sets the exact deliverables. This list describes the baseline, not an automatic promise.",

    sizingTitle: "How a project is sized",
    sizingText: "Six factors, and they matter more than the size of your company.",
    sizing: [
      { title: "The goal", text: "What the solution has to change, and how we will know it did." },
      { title: "Complexity", text: "How many edge cases and exceptions there are to handle." },
      { title: "The data", text: "Whether it exists, whether it is clean, and who is allowed to see it." },
      { title: "Integrations", text: "How many tools to connect, and what they actually allow." },
      { title: "Users", text: "How many people use it, and with how much control." },
      { title: "Constraints", text: "Confidentiality, mandatory human approval, volume to absorb." },
    ],
    sizingNote: "A small need can start with a narrow scope and grow later, once the value is proven.",

    pricingTitle: "How we charge",
    pricing: [
      { title: "Build", text: "Scoping, development, integrations, testing and deployment. Price and schedule specific to the project." },
      { title: "Running, maintenance & monitoring", text: "A recurring payment specific to each live solution. It covers only the services, monitoring and support stated in the contract." },
      { title: "Significant changes", text: "New scope, new quote, written agreement before any work." },
    ],
    pricingNote: "The proposal clearly separates the build cost, recurring payment and any third-party services. There is no public price list or “unlimited everything”: the budget reflects the actual scope.",

    faqTitle: "Common questions about custom AI solutions",
    faq: [
      { q: "Do I have to replace my current software?", a: "Not necessarily. We first look to integrate the AI solution with the software you already have. If one of them does not expose its data, we say so before quoting and look for another route." },
      { q: "How much does a custom AI solution cost?", a: "There is no public price list. The budget depends on the scope, the complexity and the integrations involved. You receive a tailored quote before anything starts, separating the build cost, any recurring payment and third-party services." },
      { q: "How does a project with Synode run?", a: "In five steps: scoping the need, designing the solution, development and integration, rollout and training, then follow-up and evolution." },
      { q: "Does my data stay confidential?", a: "Access is limited to what is strictly required and listed in the proposal. You grant it at kick-off, and it is revoked at the end if you want it to be. Sensitive actions can stay subject to human approval." },
      { q: "Do you handle maintenance after deployment?", a: "Yes, if you take our support service: we handle running, monitoring and maintenance for a recurring payment set out in the contract. If you do not, the solution is delivered and deployed, and you subscribe to the required services directly with the providers. Either way, Synode never absorbs those costs." },
      { q: "How long does it take to build a solution?", a: "It depends on the scope and the integrations. The schedule, its steps and its deadlines are set in the quote, before work starts." },
      { q: "Can the solution evolve later on?", a: "Yes. Significant changes or new features go through a fresh scoping exercise, a new quote and a written agreement before any work begins." },
    ],

    notInList: {
      title: "Your need is not on this page?",
      text: "Every project is built from your own context. The examples here show how we work, not a closed catalogue.",
      cta: "Tell us about it",
    },
  },

  method: {
    metaTitle: "Our method: from the first call to ongoing support",
    metaDescription:
      "Six stages, what Synode does, what you bring and what comes out of each. No universal delivery time: it depends on the scope.",
    kicker: "Method",
    title: "What happens,\n^stage by stage.",
    text: "Every stage has a visible output. You always know where the project stands and what is being asked of you.",
    columns: { work: "What we do", client: "What you bring", output: "What comes out" },
    steps: [
      { title: "First call", work: "Understand your need, your tools, your constraints and the priority of the project.", client: "Start from a concrete example, ideally a recent one.", output: "A summary of the need and a proposed next step.", brief: "We frame your need in 30 minutes, free and with no commitment", accents: ["need", "30 minutes", "no commitment"], },
      { title: "Analysis and proposal", work: "Assess feasibility, define the scope of the project and set the success criteria.", client: "Confirm the data available, the constraints and the people involved in the decision.", output: "A proposal, a quote and success criteria.", brief: "Your data and constraints give the feasibility, scope and quote", accents: ["data", "constraints", "feasibility", "scope", "quote"], },
      { title: "Design", work: "Define how the AI solution works, the access it needs and the steps that require human approval.", client: "Sign off the scope, the business rules and the examples that will serve as reference.", output: "A shared build plan.", brief: "Your business rules become the build plan", accents: ["business rules", "build plan"], },
      { title: "Build", work: "Develop the solution and test it progressively against your processes and your real cases.", client: "Test the flows, review the first results and send us your feedback.", output: "A version ready for acceptance.", brief: "We build on your real cases, guided by your feedback", accents: ["real cases", "feedback"], },
      { title: "Acceptance and go-live", work: "Test, fix, document and put the AI solution into service in your environment.", client: "Sign off the success criteria set at the start of the project before going live.", output: "The solution live, with its documentation handed over.", brief: "Your sign-off opens go-live and documentation", accents: ["sign-off", "go-live", "documentation"], },
      { title: "Support", work: "Watch how the solution runs, maintain it and scope the changes it needs.", client: "Report incidents, new needs and changes in your business processes.", output: "Maintenance tracked, and changes quoted.", brief: "Your usage feedback drives maintenance and changes", accents: ["usage feedback", "maintenance", "changes"], },
    ],
    notesTitle: "Four things we would rather say upfront",
    notes: [
      { title: "A change of scope gets quoted", text: "Adding an unplanned case mid-project is possible, but it gets discussed and priced. We do not absorb it silently, and you do not discover it on the invoice." },
      { title: "The project depends on your access", text: "Data that is not available, or an access that takes weeks, pushes everything back. It is the most common cause of delay and the easiest to avoid by naming it early." },
      { title: "Your data stays yours", text: "We work on strictly what is needed, and the processing terms are written down before anything starts." },
      { title: "Maintenance and new features are different things", text: "Fixing something that stopped working as agreed is maintenance. Adding a capability that did not exist is a new quote." },
    ],
    noDelay: "We do not advertise a universal delivery time. It depends on the scope, on your access, and on how quickly you can sign things off.",
    cta: "Let’s start with where you are",
  },

  team: {
    metaTitle: "The Synode team",
    metaDescription:
      "Two partners: one who understands and follows your need, one who designs and builds the solution. How we work with you.",
    kicker: "The team",
    title: "Why we are\n^building Synode.",
    vision:
      "Plenty of companies hear about AI without ever seeing what it would change for them. The demos are impressive, then nothing reaches the actual work. We built Synode for the other route: start from one specific task that costs real time, and build the thing that takes it on.",
    peopleTitle: "Two perspectives, one shared standard.",
    people: [
      {
        first: "Antonino", photo: "/equipe/AntoEquipe.webp", headline: "Automate and grow", role: "Co-founder · Developer & AI Expert",
        text: "Workflow and agent design: he maps your processes, identifies what is worth automating and brings it into production.",
      },
      {
        first: "Killian", photo: "/equipe/KillianEquipe.webp", headline: "Build ideas that last", role: "Co-founder · Developer & AI Expert",
        text: "Applications, internal tools and integrations: he builds what does not yet exist and connects what you already use.",
      },
    ],
    complementTitle: "How we complement each other",
    complementText: "Two areas of expertise, one shared goal: connecting an understanding of your processes with the tools you need. Workflows, agents, applications and integrations come together in a solution designed for your business.",
    workingTitle: "How we work",
    working: [
      "One named contact for your project, from the first call through to support.",
      "Plain explanations, not technical vocabulary.",
      "Visible stages: you always know where the project stands.",
      "Decisions in writing, so nobody has to remember what was said.",
    ],
    cta: "Let’s talk about your project",
  },

  contact: {
    metaTitle: "Let’s talk about your project",
    metaDescription: "Book a free 30-minute call, or describe your need in writing. No strings attached.",
    kicker: "Contact",
    title: "Let’s talk about\n^your project.",
    text: "Two ways to start, your choice. You do not have to fill anything in to reach the calendar.",

    booking: {
      title: "Book a 30-minute call",
      text: "A first call, free and with no strings attached. We are there to understand your situation and find a first angle. It is not a full technical audit.",
      openLabel: "Open the calendar",
      unavailableTitle: "Booking is not live yet",
      unavailableText:
        "The calendar is not connected on this version of the site yet. In the meantime, describe your need in the form below: we will reply and suggest a time.",
    },

    form: {
      title: "Describe your need in writing",
      text: "If you would rather write, or if none of the slots suit you.",
      fields: {
        name: { label: "Name", placeholder: "Your name" },
        email: { label: "Contact email", placeholder: "you@example.com", hint: "A personal address is fine: we work with freelancers too." },
        company: { label: "Company or activity", placeholder: "Optional", optional: "Optional" },
        need: { label: "What would you like to improve?", placeholder: "Describe the task or situation that costs you the most time.", hint: "One concrete example beats a general description." },
        phone: { label: "Phone", placeholder: "Optional", optional: "Optional" },
        website: { label: "Website", placeholder: "Optional", optional: "Optional" },
        timeline: { label: "Timeline in mind", optional: "Optional" },
        budget: { label: "Budget in mind", optional: "Optional" },
      },
      timelineOptions: ["To be defined", "As soon as possible", "In 1 to 3 months", "In 3 to 6 months", "Later"],
      budgetOptions: ["To be defined", "Under €5,000", "€5,000 to €15,000", "€15,000 to €40,000", "Over €40,000"],
      submit: "Send my message",
      sending: "Sending…",
      privacyNote: "Your details are used only to handle your request. No newsletter, no reselling.",
      privacyLink: "How we handle your data",
      errors: {
        name: "Please enter your name.",
        email: "Please enter an email address.",
        emailInvalid: "That email address looks wrong.",
        need: "Describe your need in a few words (10 characters minimum).",
        website: "That website address looks wrong.",
        tooLong: "This field is too long.",
        rateLimited: "You have just sent a request. Give it a moment before trying again.",
        server: "We could not save your request. Your text is still here: try again in a moment.",
        notConfigured:
          "Sending messages is not switched on in this version of the site. Your text is kept below; write to us directly in the meantime.",
      },
    },

    direct: { title: "Or directly", emailLabel: "By email" },
  },

  thanks: {
    metaTitle: "Message received",
    title: "Your message\n^has been received.",
    text: "We have saved it and we will get back to you. If it is urgent, book a slot directly: that is the fastest route.",
    notBooked: "This message is not a meeting. To set one up, use the calendar.",
    bookCta: "Book a call",
    homeCta: "Back to home",
  },

  notFound: {
    title: "This page\n^does not exist.",
    text: "The link may be old, or the address has a typo. Here are the pages people visit most.",
    homeCta: "Back to home",
  },

  legal: {
    noticeTitle: "Legal notice",
    noticeDescription: "Legal information for the Synode site.",
    privacyTitle: "Privacy policy",
    privacyDescription: "What data we process, why, and with which providers.",
    draftLabel: "Draft",
    draftText:
      "This page is incomplete. The missing information has to be confirmed before the site goes live: it is listed in the project documentation.",
    updated: "Last updated",
  },
} as const;

export const content = { fr, en };
export type Content = typeof fr;

export function getContent(locale: Locale): Content {
  return content[locale] as Content;
}
