/**
 * LA PAGE SERVICES, REFAITE LE 27/11/2026 (fiche d'Antonino) sur le design
 * system de l'accueil : le hero et ses quatre tuiles, « Notre approche »
 * centrée, les quatre services à côté d'une photo qui reste à l'écran, puis
 * d'un seul fond bleu nuit « Inclus dans chaque projet », le chiffrage
 * (le composant de « Notre méthode ») et l'appel final de l'accueil, enfin
 * la FAQ. La tarification et la sécurité ne sont écrites qu'ici sur tout
 * le site (règle 5 du brief) ; la sécurité est dans la FAQ (« Que
 * deviennent nos données ? »).
 */
export const services = {
  metaTitle: "Services · Logiciels, IA, intégrations, sites et applications · Synode",
  metaDescription:
    "Logiciels sur mesure, IA et automatisation, intégrations, sites web et applications mobiles : quatre services, des indépendants aux grandes entreprises.",

  hero: {
    /* Une ligne par `\n` sur ordinateur. Chaque « | » : une espace sur
       ordinateur, un retour à la ligne sur téléphone (« Quatre services /
       pour faire avancer / votre activité. »), comme le titre de
       l'accueil. « Quatre services » plutôt que « Quatre façons » pour le
       référencement (27/11/2026, demande d'Antonino). */
    title: "Quatre services|pour faire\navancer|votre activité.",
    accents: ["avancer"],
    subtitle:
      "Pour les entreprises comme pour les indépendants : on construit ce qui manque, on relie ce qui existe et on ajoute de l’IA quand elle apporte vraiment quelque chose.",
    /* Le nom des quatre tuiles pour les lecteurs d'écran. */
    tilesLabel: "Les quatre services",
  },

  /* « NOTRE APPROCHE », centrée, sans photos : le texte se remplit au
     défilement, comme celui de l'accueil. Les mots en valeur suivent ceux de
     l'accueil : « logiciels » et « intelligence artificielle ». */
  approach: {
    label: "Notre approche",
    text: "Entreprise ou indépendant, chacun a ses outils, ses données et ses règles. On ne vend pas de solution toute faite : on développe des logiciels sur mesure, on connecte ce qui existe déjà et on ajoute de l’intelligence artificielle seulement quand elle apporte quelque chose.",
    accents: ["logiciels", "intelligence", "artificielle"],
  },

  /* L'EN-TÊTE DES QUATRE SERVICES : celui de l'accueil (`TitreAnime`),
     « Quatre services pour » et un mot qui change en boucle ; à droite,
     « Nos services ». */
  list: {
    etiquette: "Nos services",
    prefix: "Quatre services pour",
    rotating: ["développer.", "automatiser.", "connecter.", "se lancer."],
    full: "Quatre services pour développer, automatiser, connecter et se lancer.",
    fullEnd: "développer, automatiser, connecter et se lancer.",
    button: "Découvrir ce service",
  },

  /* LES QUATRE SERVICES, dans l'ordre de la page (format « A », choisi par
     Antonino le 27/11/2026 sur maquette, d'après Kern-IT et In The
     Pocket : une phrase, trois livrables, le bouton ; plus de rubriques
     « Le problème / Ce qu'on fait / Le résultat »). `key` donne l'ancre
     (`#logiciel`, `#ia`, `#connecter`, `#web`, celles du menu
     « Services ») ; `name` : le nom sur deux lignes (barre du hero et titre
     sur la photo) ; `heading` : le titre du bloc, sa 2e partie en
     Instrument Serif.
     ⚠ Le logiciel n'est pas seulement « métier » (demande d'Antonino) :
     logiciel de bureau, application web, outil interne, portail, SaaS
     ouvert à tout un marché ; sur un ton d'agence professionnelle (pas de
     « loisirs »). L'IA parle d'abord d'AUTOMATISATION, en mots simples
     (« assistants IA » plutôt qu'« agents IA », que peu de gens
     comprennent). Et rien de ce qu'on ne
     garantit pas (pas de « bien référencé » : le référencement est un
     travail à part). Un `\n` dans une phrase : un retour à la ligne. */
  items: [
    {
      key: "software",
      name: ["Développement", "logiciel"],
      line: "Logiciels de bureau, web et SaaS",
      image: "/images/services/service-logiciel.webp",
      heading: ["Des logiciels pensés pour ", "ceux qui les utilisent."],
      sentence:
        "Pour votre équipe, vos clients ou tout un marché : logiciel de bureau, application web ou plateforme SaaS, on développe le logiciel que vous imaginez, solide et sécurisé.",
      deliverables: [
        "Logiciels de bureau, applications web, plateformes SaaS",
        "Outils internes, portails clients, MVP",
        "Comptes, droits par rôle, sauvegardes, historique",
      ],
    },
    {
      key: "ai",
      name: ["Intelligence artificielle", "& automatisation"],
      line: "Automatisations, assistants IA",
      image: "/images/services/service-ia.webp",
      heading: ["L’IA au travail sur ", "vos vrais dossiers."],
      sentence:
        "On automatise les tâches répétitives et on met l’IA au travail sur vos outils et vos documents : du temps gagné, sans exposer vos données ni vos clients.",
      deliverables: [
        "Tâches répétitives automatisées : relances, devis, saisies",
        "Assistants IA qui trient, rédigent, répondent et agissent dans vos outils",
        "Accès limités, validation humaine, tests sur vos cas réels",
      ],
    },
    {
      key: "connect",
      name: ["Intégration &", "systèmes connectés"],
      line: "CRM, ERP, facturation, API",
      image: "/images/services/service-integration.webp",
      heading: ["Des outils qui ", "se parlent enfin."],
      sentence:
        "CRM, comptabilité, boutique, agenda\u00a0: on relie vos outils pour que vos données soient justes partout, sans ressaisie.",
      deliverables: [
        "Connexions API, CRM, ERP, facturation",
        "Doublons et erreurs gérés, alerte si un flux bloque",
        "Chaque flux documenté",
      ],
    },
    {
      key: "web",
      name: ["Sites web &", "applications mobiles"],
      line: "Sites, iPhone et Android",
      image: "/images/services/service-web.webp",
      heading: ["Une présence en ligne ", "à votre image."],
      /* Le `\n` : un retour à la ligne après « rapides, » (demande
         d'Antonino du 27/11/2026). */
      sentence: "Des sites et des applications iPhone et Android rapides,\nsoignés et reliés à vos outils.",
      deliverables: [
        "Sites vitrines, boutiques en ligne, réservation et paiement en ligne",
        "Espaces clients et espace d’administration",
        "Applications iPhone et Android, publiées sur les stores",
        "Performance, accessibilité, RGPD",
      ],
    },
  ] as const,

  /* INCLUS DANS CHAQUE PROJET : le titre, la phrase à droite, quatre cartes
     et la phrase sur l'abonnement. `image` : la photo de la carte, dans le
     style de celles des services ; tant que le fichier n'existe pas dans
     `public/`, un bloc bleu nuit tient sa place. */
  included: {
    title: "Inclus dans",
    accent: "chaque projet.",
    /* Valable pour LES QUATRE SERVICES, site web compris (27/11/2026,
       demande d'Antonino : « outil » partout faisait penser au seul
       logiciel). La formation, « selon le projet » : un site ne demande pas
       toujours de formation. */
    text: "Logiciel, IA, intégration, site ou application : on ne s’arrête pas à la livraison. Vous repartez avec un projet en service, compris et documenté.",
    items: [
      {
        title: "Installation",
        text: "Site mis en ligne, application publiée, logiciel ou assistant IA mis en service, avec vos données.",
        image: "/images/services/inclus-installation.webp",
      },
      {
        title: "Formation",
        text: "Selon le projet, votre équipe apprend à s’en servir : application, logiciel ou assistant IA.",
        image: "/images/services/inclus-formation.webp",
      },
      {
        title: "Documentation",
        text: "Un guide clair de ce qui a été livré : accès, réglages, procédures.",
        image: "/images/services/inclus-documentation.webp",
      },
      {
        title: "Accompagnement",
        text: "Après le lancement, on reste disponibles jusqu’à ce que tout soit pris en main.",
        image: "/images/services/inclus-accompagnement.webp",
      },
    ],
    recurring: {
      before:
        "Certains projets vivent au-delà de la livraison : mises à jour de sécurité, hébergement, évolution des modèles d’IA, nouvelles fonctionnalités. Pour ceux-là, on vous propose un ",
      accent: "abonnement mensuel",
      after: " de maintenance et de suivi, chiffré dès le devis.",
    },
  },

  /* COMMENT NOUS CHIFFRONS VOTRE PROJET : le composant de « Notre méthode »
     de l'accueil (`MethodeScroll`), même forme de texte. Pas de prix publiés
     (décision D1 du 23/11/2026). */
  pricing: {
    label: "Comment nous chiffrons votre projet",
    title: {
      prefix: "Comment nous chiffrons",
      rotating: ["votre projet.", "chaque étape.", "sans surprise."],
      full: "Comment nous chiffrons votre projet, chaque étape, sans surprise.",
      fullEnd: "votre projet, chaque étape, sans surprise.",
    },
    etapes: [
      {
        debut: "Un premier appel",
        cle: "gratuit.",
        description: "30 minutes pour comprendre votre activité et ce que vous aimeriez améliorer.",
      },
      {
        debut: "Un cadrage",
        cle: "écrit.",
        description: "Payant puis déduit du projet : ce qu’on construit, en combien de temps, pour quel prix.",
      },
      {
        debut: "Un devis en",
        cle: "trois lignes.",
        description: "Développement, frais de fonctionnement et évolutions, clairement séparés.",
      },
    ],
  },

  /* L'APPEL FINAL : la question et la phrase propres à cette page
     (27/11/2026, demande d'Antonino : en lien avec les services) ; le
     champ, ses exemples et le bouton restent ceux de l'accueil
     (`home.appel`). « commencer » en Instrument Serif. */
  appel: {
    titreAvant: "Par quel service",
    accent: "commencer",
    titreApres: "\u00a0?",
    texte:
      "Un logiciel, de l’IA, des outils à relier, un site ou une application\u00a0: décrivez votre projet en une phrase, on vous aide à choisir pendant un appel de 30\u00a0minutes.",
  },

  faq: {
    title: "Questions fréquentes",
    accent: "fréquentes",
    more: "Une autre question ?",
    items: [
      {
        q: "Combien de temps dure un projet ?",
        /* Sans délai inventé. [À COMPLÉTER] une fourchette réaliste quand
           Synode en aura une. */
        a: "La durée dépend du périmètre, du nombre d’outils à relier, de la disponibilité des données et des tests nécessaires. Le calendrier est fixé par écrit avant le démarrage.",
      },
      {
        q: "Qui paie les frais d’IA et d’hébergement ?",
        a: "Vous choisissez : on les gère pour vous, ou vous souscrivez directement auprès des fournisseurs.",
      },
      {
        q: "Que deviennent nos données ?",
        a: "Chaque outil n’accède qu’aux données nécessaires, chaque action est enregistrée, et vous choisissez quelles actions demandent votre accord. Vos données restent les vôtres, hébergées en Europe quand c’est requis.",
      },
      {
        q: "Et si l’IA se trompe ?",
        a: "Vous choisissez le niveau de contrôle : valider chaque action, seulement les actions sensibles, ou laisser l’IA gérer.",
      },
      {
        q: "La solution peut-elle évoluer ?",
        a: "Oui. Chaque évolution est cadrée et validée par écrit avant d’être développée.",
      },
      {
        q: "Avec qui signons-nous ?",
        a: "Le contrat et les factures sont établis par Productions Associées ASBL (Smart), qui héberge l’activité de Synode, en Belgique. Au quotidien, vous travaillez directement avec nous.",
      },
    ],
  },
} as const;
