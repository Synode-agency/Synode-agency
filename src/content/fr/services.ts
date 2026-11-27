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
       ordinateur, un retour à la ligne sur téléphone (« Quatre façons / de
       faire avancer / votre activité. »), comme le titre de l'accueil. */
    title: "Quatre façons|de faire\navancer|votre activité.",
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
    labels: { problem: "Le problème", does: "Ce qu’on fait", result: "Le résultat" },
    button: "Découvrir ce service",
  },

  /* LES QUATRE SERVICES, dans l'ordre de la page. `key` donne l'ancre
     (`#logiciel`, `#ia`, `#connecter`, `#web`, celles du menu « Services ») ;
     `name` : le nom sur deux lignes (tuiles du hero et titre sur la photo) ;
     `heading` : le titre du bloc, sa 2e partie en Instrument Serif. */
  items: [
    {
      key: "software",
      name: ["Développement", "logiciel"],
      line: "Outils métier, portails, plateformes",
      image: "/images/services/service-logiciel.webp",
      heading: ["Un logiciel fait pour ", "votre métier."],
      problem:
        "Votre activité tient sur un fichier Excel devenu critique : partagé entre plusieurs personnes, rempli de données clients et de calculs que plus personne n’ose toucher. Le jour où il casse ou fuit, tout s’arrête.",
      does: "On transforme ce processus en un vrai logiciel : base de données fiable, comptes et droits par rôle, sauvegardes, historique des modifications, et une architecture qui tient quand votre équipe ou votre clientèle grandit.",
      result: "Un outil solide et sécurisé, qui grandit avec votre activité.",
    },
    {
      key: "ai",
      name: ["Intelligence artificielle", "& automatisation"],
      line: "Agents IA, automatisations",
      image: "/images/services/service-ia.webp",
      heading: ["L’IA au travail sur ", "vos vrais dossiers."],
      problem:
        "Un chatbot se monte en une soirée. Un assistant qui lit vos vrais documents, respecte qui a le droit de voir quoi, ne divulgue aucune donnée client et ne répond pas n’importe quoi à vos clients, c’est un autre métier.",
      does: "On conçoit des agents IA branchés sur vos outils et vos données, avec des limites d’accès, des règles de validation humaine, des tests sur vos cas réels et un suivi de la qualité des réponses dans le temps.",
      result: "Une IA à qui confier du travail réel, sans risque pour vos clients.",
    },
    {
      key: "connect",
      name: ["Intégration &", "systèmes connectés"],
      line: "CRM, ERP, facturation, API",
      image: "/images/services/service-integration.webp",
      heading: ["Des outils qui ", "se parlent enfin."],
      problem:
        "Votre CRM, votre comptabilité, votre boutique et votre agenda échangent des données par des connexions fragiles. Un doublon, une mise à jour chez un éditeur, une synchronisation qui échoue en silence, et vos chiffres ne sont plus fiables.",
      does: "On construit des intégrations robustes : une source de vérité claire, la gestion des erreurs et des doublons, des alertes quand un flux bloque, et une documentation pour savoir ce qui circule où.",
      result: "Des données justes partout, et des flux qui ne cassent pas sans prévenir.",
    },
    {
      key: "web",
      name: ["Sites web &", "applications mobiles"],
      line: "Sites, iPhone et Android",
      image: "/images/services/service-web.webp",
      heading: ["Une présence en ligne ", "à votre image."],
      problem:
        "Une jolie vitrine se fait en un week-end. Un site ou une application qui gère réservations, paiements, comptes clients et plusieurs langues, rapide, bien référencé, conforme au RGPD et sans faille, demande une vraie équipe.",
      does: "On conçoit et on développe des sites et des applications iPhone et Android reliés à vos outils : paiements, espaces clients, publication sur les stores, performance, accessibilité et sécurité.",
      result: "Un site ou une application fiable, que vos clients utilisent vraiment.",
    },
  ] as const,

  /* INCLUS DANS CHAQUE PROJET : le titre, la phrase à droite, quatre cartes
     et la phrase sur l'abonnement. `image` : la photo de la carte, dans le
     style de celles des services ; tant que le fichier n'existe pas dans
     `public/`, un bloc bleu nuit tient sa place. */
  included: {
    title: "Inclus dans",
    accent: "chaque projet.",
    text: "Quel que soit le service, on ne s’arrête pas à la mise en ligne : votre équipe repart avec un outil qu’elle sait utiliser.",
    items: [
      {
        title: "Installation",
        text: "On met l’outil en service dans votre environnement, avec vos données.",
        image: "/images/services/inclus-installation.webp",
      },
      {
        title: "Formation",
        text: "Votre équipe apprend à utiliser l’outil livré, sur ses propres cas.",
        image: "/images/services/inclus-formation.webp",
      },
      {
        title: "Documentation",
        text: "Un guide clair, pour retrouver chaque réglage et chaque procédure.",
        image: "/images/services/inclus-documentation.webp",
      },
      {
        title: "Accompagnement",
        text: "On reste disponibles jusqu’à la prise en main complète.",
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
