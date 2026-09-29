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
    { href: ROUTES.work, label: "Réalisations" },
    { href: ROUTES.team, label: "Équipe" },
    { href: ROUTES.contact, label: "Contact" },
  ],
  en: [
    { href: ROUTES.home, label: "Home" },
    { href: ROUTES.solutions, label: "Solutions" },
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

      /* --------------------------------------------------------------
         LES TROIS SYSTÈMES DU MOCK.

         C'est le seul élément visuel repris de la version précédente du
         site, et il n'apparaît qu'ICI. Trois interfaces empilées qui se
         relaient, chacune racontant un scénario en trois temps.

         Entièrement décoratif et masqué aux technologies d'assistance :
         rien de ce texte n'est lu à voix haute. Il existe pour montrer la
         FORME de ce que nous livrons, pas pour être une capture d'un
         produit réel — et c'est pour ça qu'aucune de ces trois cartes ne
         porte le moindre chiffre.
         -------------------------------------------------------------- */
      systems: [
        {
          id: "demandes",
          appName: "Synode",
          badge: "Automatisé",
          nav: ["Demandes clients", "Devis & factures", "Planning", "Documents"],
          title: "Vos demandes clients,\nprises en charge",
          steps: ["Demande reçue", "Devis envoyé", "Relance automatique"],
          caseLabel: "Exemple de fonctionnement",
          caseText:
            "Un client demande un devis. La demande est classée, le devis préparé, et la relance part si personne ne répond.",
          caseEmphasis: ["devis", "relance"],
          docLabel: "Devis",
          gainLabel: "Demandes traitées",
          gainValue: "En hausse",
        },
        {
          id: "impayes",
          appName: "Synode",
          badge: "Suivi actif",
          nav: ["Factures en retard", "Relances", "Paiements", "Clients"],
          title: "Vos impayés,\npris en charge",
          steps: ["Facture échue", "Relance envoyée", "Paiement suivi"],
          caseLabel: "Exemple de fonctionnement",
          caseText:
            "Une facture dépasse son échéance. Le retard est détecté, une relance part, et le paiement est suivi jusqu'à son encaissement.",
          caseEmphasis: ["relance", "suivi"],
          docLabel: "Facture",
          gainLabel: "Factures réglées",
          gainValue: "En hausse",
        },
        {
          id: "planning",
          appName: "Synode",
          badge: "Organisé",
          nav: ["Rendez-vous", "Confirmations", "Disponibilités", "Notifications"],
          title: "Vos rendez-vous,\npris en charge",
          steps: ["Créneau choisi", "Rendez-vous confirmé", "Rappel envoyé"],
          caseLabel: "Exemple de fonctionnement",
          caseText:
            "Un prospect choisit un créneau. Les disponibilités sont vérifiées, le rendez-vous confirmé, et le rappel envoyé la veille.",
          caseEmphasis: ["disponibilités", "rappel"],
          docLabel: "Agenda",
          gainLabel: "Rendez-vous tenus",
          gainValue: "En hausse",
        },
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
      kicker: "Questions fréquentes",
      title: "Ce qu’on nous demande\n^avant de commencer.",
      items: [
        {
          q: "Est-ce que vous prenez les petits projets ?",
          a: "Oui. Un périmètre réduit est souvent le meilleur point de départ : il permet de vérifier l’utilité réelle avant d’investir davantage. Ce qui compte n’est pas la taille, c’est que le problème revienne assez souvent pour que le traiter en vaille la peine.",
        },
        {
          q: "Avec quels outils travaillez-vous ?",
          a: "Avec les vôtres. Nous nous connectons à ce que vous utilisez déjà quand c’est possible, et nous ne proposons un nouvel outil que si l’existant ne peut pas faire le travail. La faisabilité est vérifiée avant le devis, pas après.",
        },
        {
          q: "Quel budget faut-il prévoir ?",
          a: "Nous ne publions pas de grille, parce qu’un prix annoncé sans connaître le besoin est soit faux, soit une moyenne qui ne concerne personne. Le budget est communiqué après le premier échange, quand le périmètre est clair.",
        },
        {
          q: "Que se passe-t-il après la livraison ?",
          a: "L’exploitation et la maintenance sont définies au contrat : hébergement, consommations IA, services tiers, surveillance et interventions incluses. Les évolutions importantes font l’objet d’un nouveau devis, jamais d’une facture surprise.",
        },
        {
          q: "Mon besoin ne ressemble à aucun de vos exemples.",
          a: "C’est le cas le plus fréquent. Les exemples servent à montrer comment nous travaillons, pas à délimiter ce que nous savons faire. Décrivez votre situation : si l’IA n’est pas la bonne réponse, nous vous le dirons.",
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
    metaTitle: "Solutions IA sur mesure pour indépendants, TPE et PME",
    metaDescription:
      "Six familles de solutions IA sur mesure : assistants, automatisations, logiciels, intégrations, data et formation. Pour indépendants, TPE et PME.",
    kicker: "Notre offre",
    title: "Une solution construite\n^à partir de votre besoin.",
    text: "De l’amélioration d’une tâche à une application complète ou à la formation de votre équipe, nous construisons la réponse autour de votre activité.",

    bricksTitle: "Nos solutions IA sur mesure",
    bricksText: "Six familles complémentaires pour les indépendants, TPE et PME. Un projet peut en combiner plusieurs, selon votre besoin. Aucun forfait imposé.",
    bricks: [
      {
            "slug": "assistants-agents-ia",
            "title": "Assistants & Agents IA",
            "text": "Des assistants pour chercher, rédiger ou analyser ; des agents pour enchaîner des actions dans un cadre autorisé.",
            "benefit": "Retrouver l’information et préparer la suite.",
            "example": "Une réponse client préparée à partir de vos documents, avec ses sources et votre validation.",
            "visual": 0
      },
      {
            "slug": "automatisations-intelligentes",
            "title": "Automatisations intelligentes",
            "text": "Des flux qui relient les étapes répétitives, avec de l’IA lorsqu’il faut comprendre ou classer une information.",
            "benefit": "Moins de manipulations entre deux étapes.",
            "example": "Une facture reçue par email est extraite et contrôlée ; les cas ambigus vous sont soumis.",
            "visual": 1
      },
      {
            "slug": "logiciels-applications-ia",
            "title": "Logiciels & Applications IA sur mesure",
            "text": "Des applications conçues pour votre équipe, ou des fonctionnalités IA intégrées aux produits de vos clients.",
            "benefit": "Un outil adapté au travail réel.",
            "example": "Vos interventions réunies dans une interface, avec un compte rendu préparé puis relu.",
            "visual": 3
      },
      {
            "slug": "integrations-systemes-connectes",
            "title": "Intégrations & systèmes connectés",
            "text": "Des connexions entre vos logiciels, CRM, ERP et bases de données pour faire circuler les informations utiles.",
            "benefit": "Des outils qui travaillent ensemble.",
            "example": "Une demande validée sur le site met à jour le CRM et rejoint votre outil de gestion.",
            "visual": 2
      },
      {
            "slug": "data-intelligence",
            "title": "Data & Intelligence",
            "text": "Centralisation, analyse et tableaux de bord ; prévision, scoring ou recommandation lorsque les données le permettent.",
            "benefit": "Des décisions mieux informées.",
            "example": "Ventes et stocks réunis pour repérer les anomalies et estimer les besoins si l’historique suffit.",
            "visual": 4
      },
      {
            "slug": "formation-adoption-ia",
            "title": "Formation & Adoption IA",
            "text": "Des ateliers pratiques pour apprendre les usages de l’IA et prendre en main vos solutions, avec ou sans projet Synode.",
            "benefit": "Une équipe à l’aise avec ses nouveaux usages.",
            "example": "À partir de situations réelles, votre équipe apprend à préparer et relire ses réponses clients.",
            "visual": 5
      }
],

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
      { title: "Exploitation et maintenance", text: "Hébergement, consommations IA, services tiers, surveillance et interventions incluses. Fréquence et plafonds explicites au contrat." },
      { title: "Évolutions importantes", text: "Nouveau périmètre, nouveau chiffrage, accord écrit avant réalisation." },
    ],
    pricingNote: "Pas de prix public et pas de « tout illimité ». Le budget est communiqué après le premier échange, quand nous savons de quoi nous parlons.",

    faqTitle: "Avant de décider",
    faq: [
      { q: "De quels accès avez-vous besoin ?", a: "De ceux qui sont strictement nécessaires au périmètre, et de rien d’autre. Nous les listons dans la proposition, vous les accordez au moment du démarrage, et ils sont retirés à la fin si vous le souhaitez." },
      { q: "Est-ce compatible avec mes outils actuels ?", a: "C’est la première chose que nous vérifions, avant le devis. Certains logiciels n’exposent pas leurs données ; dans ce cas nous le disons et nous cherchons un autre chemin, ou nous vous déconseillons le projet." },
      { q: "Qu’est-ce qui reste validé par un humain ?", a: "Vous le décidez, et c’est écrit dans le périmètre. Par défaut, tout ce qui sort de l’entreprise ou engage un montant passe par une validation. Le reste peut être automatique si vous le jugez sans risque." },
      { q: "À qui appartient ce qui est produit ?", a: "Les conditions sont fixées au contrat, avant le démarrage. C’est un point que nous traitons explicitement plutôt que de le laisser implicite." },
      { q: "Qui paie les services tiers ?", a: "Nous distinguons toujours les frais que vous payez directement à un fournisseur de ceux qui vous sont éventuellement refacturés. Aucun coût récurrent n’apparaît après coup." },
      { q: "Et si ça tombe en panne ?", a: "Le contrat définit ce qui est couvert, sous quel délai et dans quelles limites. Une solution qui tourne sans surveillance finit par se tromper sans que personne le voie : c’est pour ça que le suivi n’est pas une option décorative." },
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
        work: "Comprendre le problème, sa fréquence, vos outils, son impact et sa priorité.",
        client: "Décrire un exemple concret, récent de préférence.",
        output: "Un résumé du besoin et la prochaine étape proposée.",
      },
      {
        title: "Analyse et proposition",
        work: "Examiner la faisabilité et dimensionner le projet.",
        client: "Confirmer les données disponibles, les contraintes et qui décide.",
        output: "Une proposition, un devis et des critères de réussite.",
      },
      {
        title: "Conception",
        work: "Définir le fonctionnement, les accès et les points de validation.",
        client: "Valider le périmètre et les exemples qui serviront de référence.",
        output: "Un plan de réalisation partagé.",
      },
      {
        title: "Construction",
        work: "Développer et montrer les jalons au fur et à mesure.",
        client: "Tester les parcours sur vos cas réels et répondre aux questions.",
        output: "Une version prête pour la recette.",
      },
      {
        title: "Recette et déploiement",
        work: "Vérifier, corriger, documenter et mettre en service.",
        client: "Valider les critères convenus à l’étape 2.",
        output: "La solution en service, et sa documentation transmise.",
      },
      {
        title: "Suivi",
        work: "Surveiller le fonctionnement et intervenir dans le périmètre retenu.",
        client: "Signaler les incidents et les nouveaux besoins.",
        output: "Une maintenance suivie, et les évolutions chiffrées.",
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
    hero: {
      title:
        "Custom AI solutions,\nbuilt around how you work\n^and made to move your operations.",
      text: "We build assistants, automations and internal tools that take work off your plate and put your own data to use.",
      secondaryCta: "See the use cases",
      stack: ["AI assistants", "Automations", "Integrations", "Internal tools", "Data & dashboards"],

      /* See the French block: decorative, hidden from assistive tech, and
         deliberately carrying no figures. */
      systems: [
        {
          id: "demandes",
          appName: "Synode",
          badge: "Automated",
          nav: ["Client requests", "Quotes & invoices", "Schedule", "Documents"],
          title: "Your client requests,\ntaken care of",
          steps: ["Request received", "Quote sent", "Follow-up fires"],
          caseLabel: "How it runs",
          caseText:
            "A client asks for a quote. The request is filed, the quote drafted, and a follow-up goes out if nobody replies.",
          caseEmphasis: ["quote", "follow-up"],
          docLabel: "Quote",
          gainLabel: "Requests handled",
          gainValue: "Trending up",
        },
        {
          id: "impayes",
          appName: "Synode",
          badge: "Tracking on",
          nav: ["Overdue invoices", "Reminders", "Payments", "Clients"],
          title: "Your unpaid invoices,\ntaken care of",
          steps: ["Invoice overdue", "Reminder sent", "Payment tracked"],
          caseLabel: "How it runs",
          caseText:
            "An invoice passes its due date. The delay is caught, a reminder goes out, and the payment is tracked until it lands.",
          caseEmphasis: ["reminder", "tracked"],
          docLabel: "Invoice",
          gainLabel: "Invoices settled",
          gainValue: "Trending up",
        },
        {
          id: "planning",
          appName: "Synode",
          badge: "Organised",
          nav: ["Meetings", "Confirmations", "Availability", "Notifications"],
          title: "Your meetings,\ntaken care of",
          steps: ["Slot chosen", "Meeting confirmed", "Reminder sent"],
          caseLabel: "How it runs",
          caseText:
            "A prospect picks a slot. Availability is checked, the meeting confirmed, and the reminder sent the day before.",
          caseEmphasis: ["Availability", "reminder"],
          docLabel: "Calendar",
          gainLabel: "Meetings kept",
          gainValue: "Trending up",
        },
      ],
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
      kicker: "Common questions",
      title: "What people ask us\n^before we start.",
      items: [
        {
          q: "Do you take on small projects?",
          a: "Yes. A narrow scope is often the best place to start: it proves the value before you commit further. What matters is not the size but whether the problem comes back often enough to be worth solving.",
        },
        {
          q: "Which tools do you work with?",
          a: "Yours. We connect to what you already use wherever that is possible, and we only suggest a new tool when the existing one genuinely cannot do the job. Feasibility is checked before the quote, not after.",
        },
        {
          q: "What should I budget?",
          a: "We do not publish a price list, because a number quoted without knowing the need is either wrong or an average that applies to nobody. We give you a figure after the first call, once the scope is clear.",
        },
        {
          q: "What happens after delivery?",
          a: "Running and maintenance are set out in the contract: hosting, AI usage, third-party services, monitoring and the support included. Significant changes get their own quote, never a surprise invoice.",
        },
        {
          q: "My need looks nothing like your examples.",
          a: "That is the usual case. The examples show how we work, not the limits of what we can do. Describe your situation, and if AI is not the right answer we will tell you.",
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
            "text": "Assistants that search, draft or analyse, and agents that carry out a sequence of actions within an agreed scope.",
            "benefit": "Find information and prepare the next step.",
            "example": "A customer reply drafted from your documents, with sources and your approval.",
            "visual": 0
      },
      {
            "slug": "automatisations-intelligentes",
            "title": "Intelligent Automations",
            "text": "Workflows that connect repetitive steps, using AI when information needs to be understood or classified.",
            "benefit": "Fewer manual steps along the way.",
            "example": "An emailed invoice is extracted and checked; ambiguous cases are sent to you for review.",
            "visual": 1
      },
      {
            "slug": "logiciels-applications-ia",
            "title": "Custom AI Software & Applications",
            "text": "Applications built for your team, or AI features integrated into products used by your customers.",
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
            "text": "Centralisation, analysis and dashboards, with forecasting, scoring or recommendations when the data supports them.",
            "benefit": "Better-informed decisions.",
            "example": "Sales and stock in one view to spot anomalies and estimate needs when enough history is available.",
            "visual": 4
      },
      {
            "slug": "formation-adoption-ia",
            "title": "AI Training & Adoption",
            "text": "Practical workshops to learn everyday AI uses and adopt your solutions, with or without a Synode development project.",
            "benefit": "A team comfortable with its new ways of working.",
            "example": "Using real situations, your team learns to draft and review customer replies.",
            "visual": 5
      }
],

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
      { title: "Running and maintenance", text: "Hosting, AI usage, third-party services, monitoring and the support included. Frequency and limits stated in the contract." },
      { title: "Significant changes", text: "New scope, new quote, written agreement before any work." },
    ],
    pricingNote: "No public price list and no “unlimited everything”. We give you a figure after the first call, once we know what we are talking about.",

    faqTitle: "Before you decide",
    faq: [
      { q: "What access do you need?", a: "Only what the scope strictly requires, and nothing else. We list it in the proposal, you grant it at kick-off, and it is revoked at the end if you want it to be." },
      { q: "Will it work with my current tools?", a: "That is the first thing we check, before quoting. Some software does not expose its data; when that happens we say so and look for another route, or advise you against the project." },
      { q: "What still gets approved by a person?", a: "You decide, and it is written into the scope. By default, anything that leaves the company or commits money goes through an approval. The rest can run on its own if you judge it safe." },
      { q: "Who owns what gets built?", a: "The terms are set in the contract, before work starts. We deal with this explicitly rather than leaving it implied." },
      { q: "Who pays for third-party services?", a: "We always separate what you pay a provider directly from anything that may be billed back through us. No recurring cost appears after the fact." },
      { q: "What if it breaks?", a: "The contract defines what is covered, how fast and within what limits. A solution running unwatched eventually gets things wrong with nobody noticing, which is why support is not a decorative extra." },
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
      { title: "First call", work: "Understand the problem, how often it occurs, your tools, its impact and its priority.", client: "Describe a concrete example, ideally a recent one.", output: "A summary of the need and a proposed next step." },
      { title: "Analysis and proposal", work: "Check feasibility and size the project.", client: "Confirm what data exists, the constraints and who decides.", output: "A proposal, a quote and success criteria." },
      { title: "Design", work: "Define how it works, what it accesses and where approvals sit.", client: "Sign off the scope and the reference examples.", output: "A shared build plan." },
      { title: "Build", work: "Develop and show the milestones as they land.", client: "Test the flows on your real cases and answer questions.", output: "A version ready for acceptance." },
      { title: "Acceptance and go-live", work: "Verify, fix, document and put it into service.", client: "Sign off the criteria agreed at stage two.", output: "The solution live, with its documentation handed over." },
      { title: "Support", work: "Watch how it runs and step in within the agreed scope.", client: "Report incidents and new needs.", output: "Maintenance tracked, and changes quoted." },
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
