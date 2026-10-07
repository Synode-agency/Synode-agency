import type { Locale } from "./content";

/**
 * LE CONTENU DES PAGES SERVICES, service par service.
 *
 * Les six pages services partagent UN SEUL gabarit, `ServicePage`. Ce
 * fichier porte ce qui change d'une page à l'autre ; le gabarit porte la
 * structure, le rythme et la direction artistique. Ajouter une section à
 * une seule page n'est donc pas possible par construction, et c'est voulu :
 * c'est ce qui garde les six pages dans le même système.
 *
 * ── Pourquoi deux fichiers de contenu ───────────────────────────────────
 * `solution-details.ts` garde la définition, les prérequis, la FAQ et les
 * familles liées : ce texte est relu et validé, et une partie engage
 * Synode contractuellement (le paiement récurrent). Il n'est pas recopié
 * ici. Ce fichier n'ajoute QUE ce que les nouvelles sections demandent,
 * et le gabarit assemble les deux. La seule liste composée est donc
 * `faqExtra + faq`, jamais une copie.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Le périmètre de ce fichier ──────────────────────────────────────────
 * Aucun chiffre, aucun client, aucun résultat. Tout y est descriptif ou
 * conditionnel : ce que la solution PEUT faire, dans un périmètre défini
 * avec l'entreprise. Ne pas transformer ces lignes en promesses.
 * ────────────────────────────────────────────────────────────────────────
 */

export type ServicePageContent = {
  /** Le surtitre du hero, et le fil conducteur de la page. */
  kicker: string;
  /** Le H1. Il peut différer du titre court du menu. */
  h1: string;
  /** Les mots du H1 peints en bleu. `renderLines` les repère comme des
   *  chaînes EXACTES : une faute de frappe ne peint rien, elle ne casse
   *  rien. Le titre reste d'un seul tenant pour un lecteur d'écran. */
  h1Accents: string[];
  /** Le surtitre de la section « Qu'est-ce que… ». */
  whatKicker: string;
  whatTitle: string;
  /** Les mots du titre peints en bleu, comme dans le H1 du hero. */
  whatTitleAccents: string[];
  /** Tient le titre sur une seule ligne, au-dessus de 1024px. À ne mettre
   *  que sur un titre court : au-delà d'une trentaine de caractères il ne
   *  tient pas dans une demi-colonne, et il déborderait sur le schéma. */
  whatTitleOneLine?: true;
  /** Remplace le petit schéma de la colonne de droite par un visuel animé
   *  dédié. La mise en page en deux colonnes ne change pas ; `sketch` n'est
   *  alors pas lu. */
  whatVisual?: "agent" | "automation" | "software" | "integration" | "data" | "adoption";
  whatText: string;
  usesTitle: string;
  usesText: string;
  /** Remplace le surtitre commun « Usages concrets ». */
  usesKicker?: string;
  /** Les mots du titre de section peints en bleu. */
  usesTitleAccents?: string[];
  /** Les usages s'affichent en cartes avec un mini-aperçu illustré, au lieu
   *  de la grille commune icône + titre + description. */
  usesCards?: true;
  /** Les formes sont REPLIÉES dans les cartes d'usages, par leur champ
   *  `form`, et la section « plusieurs formes possibles » n'existe plus :
   *  les deux disaient la même chose à deux endroits. `formsTitle`,
   *  `formsText` et `forms` ne sont alors pas lus. */
  mergeForms?: true;
  /** Six à huit usages concrets. Le gabarit leur associe les icônes.
   *  `form` nomme la forme d'agent correspondante, quand les deux sections
   *  sont fusionnées. */
  uses: { title: string; text: string; form?: string }[];
  formsTitle?: string;
  formsText?: string;
  /** Les formes que le service peut prendre. Huit au maximum. Absentes
   *  quand `mergeForms` est posé, et c'est la seule raison de les omettre. */
  forms?: { title: string; text: string }[];
  coreKicker: string;
  coreTitle: string;
  /** Les mots du titre peints en bleu. */
  coreTitleAccents?: string[];
  /** Tient le titre sur une seule ligne, au-dessus de 1024px. À ne mettre
   *  que sur un titre court : au-delà d'une trentaine de caractères il ne
   *  tient pas dans une demi-colonne, et il déborderait sur le visuel. */
  coreTitleOneLine?: true;
  coreText: string;
  /** Remplace le moyeu et ses pastilles par le visuel animé de l'agent et
   *  de ses huit outils. La mise en page en deux colonnes ne change pas. */
  coreVisual?: "agent";
  coreCentre: string;
  coreChips: string[];
  coreNote: string;
  afterTitle: string;
  /** Les mots du titre peints en bleu. */
  afterTitleAccents?: string[];
  afterText: string;
  /** `status` est le libellé affiché pendant que le volet est actif, de la
   *  forme « [action] en cours ». Au repos, le panneau affiche « à jour ». */
  after: { title: string; text: string; status: string }[];
  ctaTitle: string;
  /** Les mots du titre peints en bleu. */
  ctaTitleAccents?: string[];
  ctaText: string;
  faqTitle: string;
  /** Les mots du titre peints en bleu. */
  faqTitleAccents?: string[];
  /** Précède `detail.faq`, dont la dernière entrée est le coût récurrent. */
  faqExtra: { q: string; a: string }[];
};

const fr: Record<string, ServicePageContent> = {
  "assistants-agents-ia": {
    kicker: "Assistants & agents IA",
    h1: "Des assistants et des agents IA intégrés à vos outils",
    h1Accents: ["assistants", "agents IA"],
    whatKicker: "Comprendre les agents IA",
    whatTitle: "Qu’est-ce qu’un agent IA ?",
    whatTitleAccents: ["agent IA ?"],
    whatTitleOneLine: true,
    whatText:
      "Un assistant IA aide vos équipes à rechercher, rédiger, résumer ou exploiter des informations plus rapidement. Un agent IA va plus loin : connecté à vos données et à vos logiciels métier, il peut analyser une demande, enchaîner plusieurs étapes et exécuter des actions selon des règles définies, tout en gardant un niveau de contrôle adapté à votre activité.",
    whatVisual: "agent",
    usesTitle: "À quoi peut servir un agent IA,\net quelles formes il peut prendre",
    usesTitleAccents: ["servir", "formes"],
    usesKicker: "Usages concrets et formes d’agents",
    usesCards: true,
    mergeForms: true,
    usesText: "Les usages ci-dessous sont ceux que nous rencontrons le plus souvent en entreprise. Votre besoin peut être différent : il est cadré à partir de vos processus métier.",
    uses: [
      { title: "Répondre aux demandes courantes", text: "Préparer une réponse à partir de vos documents, avec les sources utilisées.", form: "Agent conversationnel" },
      { title: "Rechercher dans vos documents", text: "Retrouver une information précise dans des fichiers autorisés.", form: "Agent documentaire" },
      { title: "Qualifier une demande entrante", text: "Identifier l’objet, l’urgence et la personne à qui la transmettre.", form: "Agent commercial" },
      { title: "Mettre à jour votre CRM", text: "Créer ou compléter une fiche après un échange, selon les champs convenus.", form: "Agent opérations" },
      { title: "Préparer un devis ou un dossier", text: "Rassembler les éléments nécessaires et proposer un document à relire.", form: "Agent administratif" },
      { title: "Analyser les emails reçus", text: "Classer, résumer et signaler ce qui demande une décision rapide.", form: "Agent service client" },
      { title: "Produire un compte rendu", text: "Rédiger une synthèse à partir de notes ou d’un historique d’échanges.", form: "Copilote métier" },
      { title: "Enchaîner plusieurs actions", text: "Exécuter une suite d’étapes autorisées, et s’arrêter à une validation.", form: "Agent sur mesure" },
    ],
    coreKicker: "Intégration dans votre environnement",
    coreTitle: "Vos outils restent au centre",
    coreTitleAccents: ["outils", "centre"],
    coreTitleOneLine: true,
    coreVisual: "agent",
    coreText: "Un agent IA ne remplace pas votre environnement de travail : il s’y branche. Il lit et écrit dans les logiciels que vos équipes utilisent déjà, avec les droits d’accès que vous lui accordez.",
    coreCentre: "Agent IA",
    coreChips: ["CRM", "ERP", "Email", "Documents", "Base de données", "API", "Outils métier", "Agenda"],
    coreNote: "Les accès sont limités au nécessaire. Les actions sensibles restent soumises à validation humaine.",
    afterTitle: "Votre agent évolue avec votre activité",
    afterTitleAccents: ["évolue"],
    afterText: "Un agent vit dans un environnement qui change : vos documents, vos règles et vos outils évoluent. Voici ce que nous assurons après la mise en service.",
    after: [
      { title: "Surveillance du fonctionnement", text: "Nous suivons les exécutions, les erreurs et les cas sortis du périmètre prévu.", status: "surveillance en cours" },
      { title: "Ajustement des règles", text: "Les réponses et les actions sont corrigées à partir des retours de vos utilisateurs.", status: "ajustement en cours" },
      { title: "Mise à jour des sources", text: "Les documents et les accès sont tenus à jour pour que l’agent reste fiable.", status: "mise à jour en cours" },
      { title: "Suivi des coûts d’usage", text: "La consommation des modèles IA est visible et estimée avant toute évolution.", status: "estimation en cours" },
    ],
    ctaTitle: "Voyons si un agent IA a sa place dans votre activité",
    ctaTitleAccents: ["agent IA"],
    ctaText: "Décrivez-nous une tâche précise qui prend du temps à votre équipe. Le premier échange sert à vérifier si un assistant ou un agent IA peut réellement y aider, et à quelles conditions.",
    faqTitle: "Questions fréquentes sur les agents IA",
    faqTitleAccents: ["agents IA"],
    faqExtra: [
      { q: "Quelle est la différence entre un agent IA et un chatbot ?", a: "Un chatbot répond dans une fenêtre de discussion. Un agent IA est relié à vos outils : il peut rechercher dans vos données, préparer un document ou créer une tâche, dans un périmètre défini. Le dialogue n’est qu’une des façons de le déclencher." },
      { q: "Peut-il utiliser les logiciels que nous avons déjà ?", a: "C’est le principe. Nous vérifions d’abord les accès réellement disponibles sur votre CRM, votre messagerie ou vos espaces de documents, puis nous limitons l’agent aux opérations nécessaires." },
      { q: "Combien de temps faut-il pour en mettre un en service ?", a: "Cela dépend du périmètre, de la qualité de votre documentation et des accès disponibles. Un assistant limité à une tâche précise se met en place plus vite qu’un agent qui agit dans plusieurs logiciels. La durée est estimée après le cadrage." },
    ],
  },

  "automatisations-intelligentes": {
    kicker: "Automatisations intelligentes",
    h1: "Des automatisations intelligentes pour vos processus métier",
    h1Accents: ["automatisations intelligentes"],
    whatKicker: "Comprendre l’automatisation",
    whatTitle: "Qu’est-ce qu’une automatisation ?",
    whatTitleAccents: ["automatisation ?"],
    whatText:
      "Une automatisation intelligente relie vos outils, vos règles métier et vos données pour exécuter automatiquement certaines étapes d’un processus. L’IA intervient uniquement lorsque le flux doit comprendre un texte, classer une demande ou extraire une information, tandis que les règles simples restent automatisées de façon déterministe.",
    whatVisual: "automation",
    usesTitle: "À quoi peut servir une automatisation,\net quelles formes elle peut prendre",
    usesTitleAccents: ["servir", "formes"],
    usesKicker: "Usages concrets et formes d’automatisation",
    usesCards: true,
    mergeForms: true,
    usesText: "L’automatisation des processus commence là où une tâche se répète avec les mêmes règles. Ces exemples montrent les points de départ les plus fréquents en entreprise.",
    uses: [
      { title: "Trier les demandes entrantes", text: "Classer un email ou un formulaire et l’attribuer au bon interlocuteur.", form: "Administratif" },
      { title: "Extraire les données d’un document", text: "Lire une facture, un bon de commande ou un formulaire reçu en PDF.", form: "Documentaire" },
      { title: "Contrôler avant d’enregistrer", text: "Vérifier les montants, les doublons et les champs obligatoires.", form: "Finance" },
      { title: "Faire circuler une validation", text: "Demander un accord au bon responsable avant de poursuivre le flux.", form: "Workflow métier" },
      { title: "Préparer un document", text: "Générer un devis, un contrat ou un récapitulatif à partir de données existantes.", form: "Commercial" },
      { title: "Relancer au bon moment", text: "Déclencher un rappel selon une échéance ou l’absence de réponse.", form: "Opérations" },
      { title: "Alimenter un reporting", text: "Consolider les données d’activité à intervalle régulier.", form: "Reporting" },
      { title: "Notifier les bonnes personnes", text: "Prévenir une équipe dans son outil lorsqu’un cas demande une décision.", form: "Notifications" },
    ],
    coreKicker: "Place dans votre organisation",
    coreTitle: "Vos processus restent au centre",
    coreText: "Une automatisation ne vous demande pas de changer d’outils. Elle s’insère entre ceux que vous utilisez déjà, et prend en charge les étapes intermédiaires qui occupent vos équipes.",
    coreCentre: "Flux automatisé",
    coreChips: ["Boîte email", "Documents", "CRM", "Outil comptable", "ERP", "Tableur", "Signature", "Messagerie d’équipe"],
    coreNote: "Les fichiers d’origine sont conservés, et chaque exécution laisse une trace consultable.",
    afterTitle: "Vos flux évoluent avec vos règles",
    afterTitleAccents: ["évoluent"],
    afterText: "Un processus automatisé n’est pas figé : vos règles changent, vos outils se mettent à jour. Voici ce que nous assurons après la mise en service.",
    after: [
      { title: "Surveillance des exécutions", text: "Les échecs, les blocages et les files d’attente anormales sont détectés.", status: "surveillance en cours" },
      { title: "Traitement des exceptions", text: "Les cas sortis du flux sont analysés, puis intégrés aux règles si c’est utile.", status: "traitement en cours" },
      { title: "Adaptation aux outils", text: "Une mise à jour d’un logiciel connecté peut demander un ajustement du flux.", status: "adaptation en cours" },
      { title: "Suivi des volumes", text: "Les volumes traités et les coûts de plateforme restent visibles.", status: "mesure en cours" },
    ],
    ctaTitle: "Voyons quel processus mérite d’être automatisé",
    ctaTitleAccents: ["processus"],
    ctaText: "Décrivez-nous une tâche que votre équipe répète chaque semaine. Le premier échange sert à vérifier si elle peut être automatisée de façon fiable, et ce qu’il faut cadrer avant.",
    faqTitle: "Questions fréquentes sur l’automatisation des processus",
    faqTitleAccents: ["l’automatisation des processus"],
    faqExtra: [
      { q: "Faut-il changer nos logiciels pour automatiser ?", a: "Non. Une automatisation s’appuie sur les outils existants et leurs accès. Nous vérifions ce qui est disponible avant de proposer un périmètre, et nous ne remplaçons un outil que si cela se justifie." },
      { q: "Que deviennent les cas particuliers ?", a: "Ils ne sont jamais traités au hasard. Un cas qui ne correspond pas aux règles convenues est sorti du flux et signalé à une personne. C’est une partie importante du cadrage." },
      { q: "Combien de temps faut-il pour automatiser un processus ?", a: "Un flux simple entre deux outils bien documentés se met en place rapidement. Un processus avec de nombreuses exceptions demande plus de cadrage que de développement. La durée est estimée après l’analyse." },
    ],
  },

  "logiciels-applications-ia": {
    kicker: "Logiciels & applications IA",
    h1: "Des logiciels métier et applications IA sur mesure",
    h1Accents: ["logiciels métier", "applications IA"],
    whatKicker: "Comprendre le sur-mesure",
    whatTitle: "Qu’est-ce qu’un logiciel métier sur mesure ?",
    whatTitleAccents: ["logiciel métier sur mesure ?"],
    whatText:
      "C’est une application conçue autour de votre fonctionnement réel : vos rôles, vos données, vos règles et les écrans dont vos équipes ont besoin. Elle peut remplacer un ensemble de fichiers devenu difficile à tenir, compléter un logiciel existant, ou devenir une fonctionnalité que vous proposez à vos propres clients. L’IA n’y est pas le point de départ : nous définissons d’abord le parcours utile, puis les endroits où elle apporte quelque chose.",
    whatVisual: "software",
    usesTitle: "À quoi peut servir un logiciel métier,\net quelles formes il peut prendre",
    usesTitleAccents: ["servir", "formes"],
    usesKicker: "Usages concrets et formes de logiciels",
    usesCards: true,
    mergeForms: true,
    usesText: "Un développement sur mesure se justifie quand le travail ne rentre plus dans un tableur ni dans un logiciel généraliste. Voici les situations les plus courantes.",
    uses: [
      { title: "Centraliser les dossiers", text: "Réunir dans un seul espace ce qui circule aujourd’hui par email.", form: "Outil de gestion" },
      { title: "Suivre des interventions", text: "Planifier, suivre l’avancement et conserver l’historique d’un dossier.", form: "Interface métier" },
      { title: "Donner un accès à vos clients", text: "Un portail où ils retrouvent leurs demandes et leur avancement.", form: "Application client" },
      { title: "Remplacer des fichiers partagés", text: "Sortir d’un tableur devenu trop grand, avec des droits par rôle.", form: "Portail interne" },
      { title: "Saisir une information sur le terrain", text: "Une interface simple, utilisable sur mobile, pensée pour la saisie.", form: "Outil de saisie" },
      { title: "Visualiser l’activité", text: "Des écrans de pilotage alimentés par les données de l’outil.", form: "Tableau de bord" },
      { title: "Assister la rédaction", text: "Préparer un compte rendu ou un document à partir des données saisies.", form: "Copilote intégré" },
      { title: "Enrichir votre produit", text: "Ajouter une fonctionnalité IA destinée aux utilisateurs de votre logiciel.", form: "Back-office" },
    ],
    coreKicker: "Conçu autour de votre fonctionnement",
    coreTitle: "Un outil conçu autour de votre fonctionnement",
    coreText: "Un logiciel métier n’impose pas une organisation : il reprend la vôtre. Les écrans suivent les étapes de votre travail, les droits suivent vos rôles, et les données restent les vôtres.",
    coreCentre: "Votre application",
    coreChips: ["Rôles et droits", "Règles métier", "Vos données", "Écrans dédiés", "Historique", "Exports", "Connexions", "Assistance IA"],
    coreNote: "L’hébergement, les sauvegardes et les conditions d’accès sont définis avec vous avant le développement.",
    afterTitle: "Votre application évolue avec votre activité",
    afterTitleAccents: ["évolue"],
    afterText: "Un outil métier qui sert vraiment finit toujours par devoir évoluer. Voici ce que nous assurons après la mise en service.",
    after: [
      { title: "Maintenance technique", text: "Mises à jour, correctifs et surveillance de la disponibilité.", status: "maintenance en cours" },
      { title: "Nouvelles fonctionnalités", text: "Les demandes sont priorisées, estimées, puis développées par étapes.", status: "arbitrage en cours" },
      { title: "Accompagnement des utilisateurs", text: "Prise en main des nouveaux arrivants et retours sur les usages réels.", status: "accompagnement en cours" },
      { title: "Suivi des coûts", text: "Hébergement, stockage et services externes restent chiffrés et visibles.", status: "estimation en cours" },
    ],
    ctaTitle: "Voyons si un outil sur mesure est la bonne réponse",
    ctaTitleAccents: ["outil sur mesure"],
    ctaText: "Décrivez-nous comment votre équipe travaille aujourd’hui, et ce qui coince. Le premier échange sert aussi à vérifier si un logiciel existant ne suffirait pas.",
    faqTitle: "Questions fréquentes sur les logiciels métier sur mesure",
    faqTitleAccents: ["logiciels métier sur mesure"],
    faqExtra: [
      { q: "Pourquoi développer plutôt qu’acheter un logiciel existant ?", a: "Dans beaucoup de cas, un logiciel du marché suffit, et nous le disons. Le sur-mesure se justifie quand votre fonctionnement est spécifique, quand plusieurs outils devraient être reliés, ou quand aucune solution ne couvre le parcours central de votre activité." },
      { q: "Peut-on commencer petit ?", a: "C’est la méthode que nous recommandons. Une première version couvre le parcours le plus utile, elle est testée par ses utilisateurs, puis étendue. Cela limite le risque et rend les arbitrages plus concrets." },
      { q: "À qui appartient le code de l’application ?", a: "Les conditions de propriété, d’hébergement et de réversibilité sont écrites dans la proposition avant le démarrage, avec le périmètre et les responsabilités de chacun." },
    ],
  },

  "integrations-systemes-connectes": {
    kicker: "Intégrations & systèmes connectés",
    h1: "Des intégrations entre vos logiciels et vos données",
    h1Accents: ["intégrations"],
    whatKicker: "Comprendre les intégrations",
    whatTitle: "Qu’est-ce qu’une intégration entre vos systèmes ?",
    whatTitleAccents: ["intégration", "?"],
    whatText:
      "Une intégration permet à deux logiciels d’échanger une information : un contact, un statut, une commande, un document. Elle supprime la recopie et la question « quelle version est la bonne ». Une automatisation organise les étapes d’un processus ; une intégration transporte les données entre les outils. Les deux travaillent souvent ensemble, mais ce ne sont pas les mêmes objets.",
    whatVisual: "integration",
    usesTitle: "À quoi peut servir une intégration,\net quels systèmes elle relie",
    usesTitleAccents: ["servir", "systèmes"],
    usesKicker: "Usages concrets et systèmes connectés",
    usesCards: true,
    mergeForms: true,
    usesText: "Une intégration se justifie dès que la même information existe dans deux outils. Voici les connexions les plus demandées.",
    uses: [
      { title: "Relier votre site à votre CRM", text: "Une demande validée crée ou met à jour la fiche correspondante.", form: "Site web et formulaires" },
      { title: "Synchroniser des contacts", text: "Une même fiche client, à jour dans les outils concernés.", form: "CRM" },
      { title: "Partager un statut de commande", text: "L’information confirmée dans l’ERP devient visible ailleurs.", form: "ERP et gestion" },
      { title: "Alimenter un outil d’analyse", text: "Les données autorisées de plusieurs logiciels rejoignent un même espace.", form: "Outils SaaS" },
      { title: "Connecter une API externe", text: "Un service tiers est appelé dans vos processus, avec ses limites.", form: "API tierces" },
      { title: "Rapprocher deux bases", text: "Identifier les correspondances, les écarts et les doublons.", form: "Bases de données" },
      { title: "Remplacer une double saisie", text: "Supprimer la recopie manuelle entre deux applications.", form: "Messagerie et agendas" },
      { title: "Tracer les échanges", text: "Conserver un journal des transferts, des erreurs et des reprises.", form: "Espaces de documents" },
    ],
    coreKicker: "Vos systèmes, reliés",
    coreTitle: "Connecter les systèmes que vous utilisez déjà",
    coreText: "L’objectif n’est pas d’ajouter un logiciel de plus, mais de faire circuler l’information entre ceux qui sont en place. Vos équipes continuent de travailler dans leurs outils habituels.",
    coreCentre: "Couche d’intégration",
    coreChips: ["CRM", "ERP", "API", "Base de données", "Site web", "Outils SaaS", "Documents", "Reporting"],
    coreNote: "Chaque échange est limité aux données nécessaires, et consigné pour pouvoir être vérifié.",
    afterTitle: "Vos connexions demandent un suivi",
    afterTitleAccents: ["un suivi"],
    afterText: "Une intégration dépend d’outils que vous ne maîtrisez pas entièrement : ils évoluent. Voici ce que nous assurons après la mise en service.",
    after: [
      { title: "Surveillance des échanges", text: "Les erreurs de transfert et les interruptions sont détectées rapidement.", status: "surveillance en cours" },
      { title: "Suivi des évolutions d’API", text: "Une modification côté éditeur peut demander une adaptation de la connexion.", status: "vérification en cours" },
      { title: "Contrôle de cohérence", text: "Les écarts entre deux systèmes sont repérés et corrigés.", status: "contrôle en cours" },
      { title: "Suivi des limites d’usage", text: "Volumes, quotas et coûts des services connectés restent visibles.", status: "mesure en cours" },
    ],
    ctaTitle: "Voyons quels systèmes gagneraient à être reliés",
    ctaTitleAccents: ["systèmes"],
    ctaText: "Dites-nous quelle information vos équipes recopient d’un outil à l’autre. Le premier échange sert à vérifier les accès disponibles et la faisabilité réelle.",
    faqTitle: "Questions fréquentes sur les intégrations",
    faqTitleAccents: ["intégrations"],
    faqExtra: [
      { q: "Faut-il un abonnement supplémentaire pour connecter nos outils ?", a: "Parfois. Certains éditeurs réservent l’accès par API à certaines formules, ou facturent au volume. Nous identifions ces conditions pendant le cadrage, pour qu’elles ne soient pas découvertes en cours de projet." },
      { q: "Que se passe-t-il si un outil est indisponible ?", a: "Le transfert est mis en attente plutôt que perdu, puis rejoué selon les règles convenues. Les échecs restent visibles, et les doublons sont contrôlés à la reprise." },
      { q: "Peut-on connecter un logiciel ancien ou interne ?", a: "Souvent oui, par sa base de données, un export ou une passerelle dédiée. La solution dépend de ce que le logiciel expose réellement et des autorisations disponibles." },
    ],
  },

  "data-intelligence": {
    kicker: "Data & intelligence",
    h1: "Vos données d’entreprise, transformées en informations utiles",
    h1Accents: ["données d’entreprise"],
    whatKicker: "Comprendre la donnée",
    whatTitle: "Qu’est-ce que la Data & Intelligence appliquée à l’entreprise ?",
    whatTitleAccents: ["Data & Intelligence", "?"],
    whatText:
      "C’est le travail qui mène de données dispersées à des informations sur lesquelles on peut décider : réunir les sources, corriger ce qui est incohérent, définir des indicateurs avec le métier, puis les rendre lisibles. Lorsque l’historique le permet, une étape supplémentaire devient possible : estimation, score ou recommandation. Un chiffre observé et une estimation restent toujours présentés comme deux choses différentes.",
    whatVisual: "data",
    usesTitle: "À quoi peuvent servir vos données,\net quelles formes prend le travail",
    usesTitleAccents: ["servir", "formes"],
    usesKicker: "Usages concrets et formes de projets data",
    usesCards: true,
    mergeForms: true,
    usesText: "L’objectif n’est pas de produire des graphiques, mais de répondre à des questions que vous vous posez déjà. Voici les usages les plus fréquents.",
    uses: [
      { title: "Réunir des données dispersées", text: "Rassembler ce qui vit aujourd’hui dans plusieurs outils et fichiers.", form: "Centralisation des données" },
      { title: "Suivre l’activité", text: "Des indicateurs à jour, sans export manuel ni retraitement.", form: "Tableau de bord métier" },
      { title: "Comparer des périodes", text: "Lire une évolution sur un historique cohérent et contrôlé.", form: "Analyse d’activité" },
      { title: "Repérer une anomalie", text: "Signaler un écart inhabituel qui mérite une vérification.", form: "Détection d’anomalies" },
      { title: "Prioriser des dossiers", text: "Un score explicable propose un ordre d’examen, que vous pouvez corriger.", form: "Scoring" },
      { title: "Anticiper un besoin", text: "Estimer une charge ou un réapprovisionnement si l’historique le permet.", form: "Prévision" },
      { title: "Chercher dans l’information", text: "Retrouver un élément par le sens, pas seulement par mot-clé.", form: "Recherche sémantique" },
      { title: "Partager un chiffre fiable", text: "Une même définition d’indicateur pour toutes les équipes.", form: "Qualité des données" },
    ],
    coreKicker: "De la donnée à la décision",
    coreTitle: "Transformer vos données en informations exploitables",
    coreText: "Vos données existent déjà, dans vos logiciels de gestion, vos fichiers et vos outils en ligne. Le travail consiste à les réunir, à vérifier ce qu’elles valent, puis à les présenter dans une forme utilisable.",
    coreCentre: "Vos indicateurs",
    coreChips: ["Ventes", "Stocks", "Production", "Clients", "Finance", "Support", "Site web", "Fichiers internes"],
    coreNote: "La qualité des données disponibles détermine ce qui peut être affirmé. Nous le disons avant de livrer un chiffre.",
    afterTitle: "Vos indicateurs demandent un entretien",
    afterTitleAccents: ["un entretien"],
    afterText: "Des données vivantes se dégradent : une source change, un format évolue. Voici ce que nous assurons après la mise en service.",
    after: [
      { title: "Surveillance des alimentations", text: "Une source interrompue ou incomplète est détectée avant d’être lue.", status: "surveillance en cours" },
      { title: "Contrôle de qualité", text: "Les écarts et les valeurs aberrantes sont suivis dans le temps.", status: "contrôle en cours" },
      { title: "Révision des modèles", text: "Une estimation est réévaluée régulièrement, et corrigée si elle dérive.", status: "révision en cours" },
      { title: "Évolution des indicateurs", text: "Les définitions sont ajustées quand votre activité change.", status: "ajustement en cours" },
    ],
    ctaTitle: "Voyons ce que vos données permettent réellement de dire",
    ctaTitleAccents: ["vos données"],
    ctaText: "Dites-nous quelle décision vous prenez aujourd’hui sans chiffre fiable. Le premier échange sert à évaluer les données disponibles et ce qu’elles autorisent.",
    faqTitle: "Questions fréquentes sur l’exploitation des données",
    faqTitleAccents: ["l’exploitation des données"],
    faqExtra: [
      { q: "Faut-il beaucoup de données pour commencer ?", a: "Pas pour un tableau de bord : il suffit que vos données existantes soient accessibles et cohérentes. Pour une prévision ou un score, le volume, la qualité et la profondeur d’historique comptent, et nous les examinons avant de nous engager." },
      { q: "Nos données sont-elles utilisées pour entraîner des modèles ?", a: "Pas en dehors du cadre défini avec vous. Les conditions d’usage, les accès et les services techniques concernés sont écrits dans la proposition avant le démarrage." },
      { q: "Une prévision est-elle fiable ?", a: "Une prévision est une estimation, évaluée sur des données passées et accompagnée de ses limites. Elle peut aider à préparer une décision, mais elle ne la remplace pas, et nous ne la présentons jamais comme une certitude." },
    ],
  },

  "formation-adoption-ia": {
    kicker: "Formation & adoption IA",
    h1: "Former vos équipes et installer des usages durables de l’IA",
    h1Accents: ["usages durables"],
    whatKicker: "Comprendre l’adoption",
    whatTitle: "Qu’est-ce que l’adoption de l’IA en entreprise ?",
    whatTitleAccents: ["adoption de l’IA", "?"],
    whatText:
      "Découvrir un outil et l’utiliser dans son travail sont deux choses distinctes. L’adoption consiste à choisir des usages utiles pour votre métier, à les pratiquer sur de vraies situations, puis à fixer des repères partagés : ce que l’on peut confier à l’IA, comment vérifier une réponse, et quelles informations ne doivent pas sortir de l’entreprise. Cela vaut pour des outils d’intelligence artificielle existants comme pour une solution que nous vous livrons.",
    whatVisual: "adoption",
    usesTitle: "À quoi peut servir une formation IA,\net quelles formes elle peut prendre",
    usesTitleAccents: ["servir", "formes"],
    usesKicker: "Usages concrets et formats d’accompagnement",
    usesCards: true,
    mergeForms: true,
    usesText: "Une formation utile part de votre métier, pas d’un tour d’horizon des outils. Voici les objectifs les plus souvent retenus.",
    uses: [
      { title: "Comprendre ce que l’IA peut faire", text: "Et surtout ce qu’elle ne sait pas faire de façon fiable.", form: "Atelier de découverte" },
      { title: "Choisir les bons usages", text: "Identifier les tâches où l’IA apporte un gain vérifiable.", form: "Session métier" },
      { title: "Formuler une demande efficace", text: "Obtenir une réponse utilisable plutôt qu’une réponse vague.", form: "Formation pratique" },
      { title: "Vérifier une réponse", text: "Repérer une erreur, une invention ou une information manquante.", form: "Accompagnement d’équipe" },
      { title: "Protéger vos informations", text: "Savoir quelles données peuvent être partagées, et où.", form: "Cadre d’usage interne" },
      { title: "Documenter vos pratiques", text: "Fixer des règles communes pour toute l’équipe.", form: "Cadre d’usage interne" },
      { title: "Prendre en main une solution livrée", text: "Utiliser correctement l’outil que nous avons développé.", form: "Prise en main d’une solution" },
      { title: "Former des référents", text: "Des personnes capables de diffuser les usages en interne.", form: "Formation de référents" },
    ],
    coreKicker: "De la découverte à l’usage réel",
    coreTitle: "Faire entrer l’IA dans les usages réels",
    coreText: "Une équipe formée ne se reconnaît pas au nombre d’outils qu’elle connaît, mais à la façon dont elle s’en sert : sur les bonnes tâches, avec une vérification systématique et des règles claires sur les informations partagées.",
    coreCentre: "Vos équipes",
    coreChips: ["Cas pratiques", "Exercices métier", "Méthodes de vérification", "Règles de partage", "Référents internes", "Supports écrits", "Suivi d’adoption", "Questions ouvertes"],
    coreNote: "Aucune certification n’est délivrée, et aucune prise en charge financière n’est présumée.",
    afterTitle: "L’adoption se construit après la formation",
    afterTitleAccents: ["se construit"],
    afterText: "Les habitudes se prennent dans les semaines qui suivent, pas pendant la séance. Voici ce que nous proposons ensuite.",
    after: [
      { title: "Point de suivi", text: "Une séance ultérieure pour traiter les blocages rencontrés sur le terrain.", status: "suivi en cours" },
      { title: "Appui aux référents", text: "Les personnes qui diffusent les usages en interne restent accompagnées.", status: "appui en cours" },
      { title: "Mise à jour des contenus", text: "Les outils évoluent vite : les supports et les exemples sont revus.", status: "mise à jour en cours" },
      { title: "Nouveaux usages", text: "De nouvelles tâches sont examinées à mesure que l’équipe progresse.", status: "examen en cours" },
    ],
    ctaTitle: "Voyons comment former votre équipe utilement",
    ctaTitleAccents: ["votre équipe"],
    ctaText: "Dites-nous où en est votre équipe avec l’IA aujourd’hui. Le premier échange sert à définir un format réaliste et des usages adaptés à votre métier.",
    faqTitle: "Questions fréquentes sur la formation IA",
    faqTitleAccents: ["la formation IA"],
    faqExtra: [
      { q: "Faut-il déjà utiliser l’IA pour suivre une formation ?", a: "Non. Nous adaptons le point de départ : une équipe qui n’a jamais utilisé ces outils travaille d’abord sur la compréhension et la vérification, avant d’aller vers des usages plus avancés." },
      { q: "La formation est-elle liée à un outil en particulier ?", a: "Pas nécessairement. Nous travaillons avec les outils autorisés dans votre entreprise. Si vous n’en avez pas encore, nous aidons à choisir en fonction de vos usages et de vos contraintes de confidentialité." },
      { q: "Combien de temps faut-il pour que les usages s’installent ?", a: "Une séance suffit à comprendre, pas à changer des habitudes. L’adoption se mesure sur plusieurs semaines, avec un point de suivi et des référents internes. Nous ne promettons pas de gain de productivité immédiat." },
    ],
  },
};

const en: Record<string, ServicePageContent> = {
  "assistants-agents-ia": {
    kicker: "AI assistants & agents",
    h1: "AI assistants and agents built into your tools",
    h1Accents: ["AI assistants and agents"],
    whatKicker: "Understanding AI agents",
    whatTitle: "What is an AI agent?",
    whatTitleAccents: ["AI agent?"],
    whatTitleOneLine: true,
    whatText:
      "An AI assistant helps your teams search, draft, summarise or make use of information faster. An AI agent goes further: connected to your data and your business software, it can analyse a request, carry out a sequence of steps and perform actions under defined rules, while keeping a level of control that suits your business.",
    whatVisual: "agent",
    usesTitle: "What an AI agent can be used for,\nand the forms it can take",
    usesTitleAccents: ["used for", "forms"],
    usesKicker: "Concrete uses and agent types",
    usesCards: true,
    mergeForms: true,
    usesText: "These are the uses we meet most often in business. Your need may be different: it is scoped around your own processes.",
    uses: [
      { title: "Answer routine requests", text: "Prepare a reply from your documents, with the sources used.", form: "Conversational agent" },
      { title: "Search your documents", text: "Find a precise detail inside authorised files.", form: "Document agent" },
      { title: "Qualify an incoming request", text: "Identify the subject, the urgency and who should handle it.", form: "Sales agent" },
      { title: "Update your CRM", text: "Create or complete a record after an exchange, using agreed fields.", form: "Operations agent" },
      { title: "Prepare a quote or a file", text: "Gather what is needed and propose a document to review.", form: "Admin agent" },
      { title: "Analyse incoming email", text: "Sort, summarise and flag what needs a quick decision.", form: "Customer service agent" },
      { title: "Produce a write-up", text: "Draft a summary from notes or a history of exchanges.", form: "Business copilot" },
      { title: "Chain several actions", text: "Run a sequence of permitted steps, and stop at an approval.", form: "Custom agent" },
    ],
    coreKicker: "Inside your environment",
    coreTitle: "Your tools stay at the centre",
    coreTitleAccents: ["tools", "centre"],
    coreTitleOneLine: true,
    coreVisual: "agent",
    coreText: "An AI agent does not replace your working environment, it plugs into it. It reads and writes in the software your teams already use, with the access rights you grant.",
    coreCentre: "AI agent",
    coreChips: ["CRM", "ERP", "Email", "Documents", "Database", "API", "Business tools", "Calendar"],
    coreNote: "Access is limited to what is necessary. Sensitive actions remain subject to human approval.",
    afterTitle: "Your agent changes as your business does",
    afterTitleAccents: ["changes"],
    afterText: "An agent lives in an environment that moves: your documents, rules and tools all change. Here is what we handle after go-live.",
    after: [
      { title: "Monitoring", text: "We watch runs, errors and cases that fall outside the intended scope.", status: "monitoring in progress" },
      { title: "Rule adjustments", text: "Answers and actions are corrected from your users' feedback.", status: "adjustment in progress" },
      { title: "Source upkeep", text: "Documents and access are kept current so the agent stays reliable.", status: "update in progress" },
      { title: "Usage costs", text: "AI model consumption stays visible and is estimated before any change.", status: "estimate in progress" },
    ],
    ctaTitle: "Let's see whether an AI agent fits your business",
    ctaTitleAccents: ["AI agent"],
    ctaText: "Describe one specific task that takes your team's time. The first conversation checks whether an assistant or an agent can genuinely help, and on what terms.",
    faqTitle: "Frequently asked questions about AI agents",
    faqTitleAccents: ["AI agents"],
    faqExtra: [
      { q: "What is the difference between an AI agent and a chatbot?", a: "A chatbot answers inside a chat window. An AI agent is connected to your tools: it can search your data, prepare a document or create a task, within a defined scope. Conversation is only one of the ways to trigger it." },
      { q: "Can it use the software we already have?", a: "That is the point. We first check the access actually available in your CRM, mailbox or document spaces, then restrict the agent to the operations it needs." },
      { q: "How long does it take to put one in service?", a: "It depends on the scope, the quality of your documentation and the available access. An assistant limited to one task is faster to deliver than an agent acting across several systems. We estimate the time after scoping." },
    ],
  },

  "automatisations-intelligentes": {
    kicker: "Intelligent automation",
    h1: "Intelligent automation for your business processes",
    h1Accents: ["Intelligent automation"],
    whatKicker: "Understanding automation",
    whatTitle: "What is automation?",
    whatTitleAccents: ["automation?"],
    whatText:
      "Intelligent automation connects your tools, your business rules and your data in order to run certain steps of a process automatically. AI steps in only where the flow has to understand a text, classify a request or extract a piece of information, while the simple rules stay automated deterministically.",
    whatVisual: "automation",
    usesTitle: "What automation can be used for,\nand the forms it can take",
    usesTitleAccents: ["used for", "forms"],
    usesKicker: "Concrete uses and types of automation",
    usesCards: true,
    mergeForms: true,
    usesText: "Process automation starts wherever a task repeats under the same rules. These are the most common starting points.",
    uses: [
      { title: "Sort incoming requests", text: "Classify an email or a form and assign it to the right person.", form: "Administrative" },
      { title: "Extract data from a document", text: "Read an invoice, a purchase order or a form received as a PDF.", form: "Documents" },
      { title: "Check before recording", text: "Verify amounts, duplicates and required fields.", form: "Finance" },
      { title: "Route an approval", text: "Ask the right manager for a decision before the flow continues.", form: "Business workflow" },
      { title: "Prepare a document", text: "Generate a quote, a contract or a summary from existing data.", form: "Sales" },
      { title: "Follow up at the right time", text: "Trigger a reminder based on a deadline or a missing reply.", form: "Operations" },
      { title: "Feed your reporting", text: "Consolidate activity data at a regular interval.", form: "Reporting" },
      { title: "Notify the right people", text: "Alert a team in their own tool when a case needs a decision.", form: "Notifications" },
    ],
    coreKicker: "Where it sits in your organisation",
    coreTitle: "Your processes stay at the centre",
    coreText: "An automation does not ask you to change tools. It slots in between the ones you already use and takes on the in-between steps that occupy your teams.",
    coreCentre: "Automated flow",
    coreChips: ["Mailbox", "Documents", "CRM", "Accounting tool", "ERP", "Spreadsheet", "E-signature", "Team chat"],
    coreNote: "Original files are kept, and every run leaves a record you can consult.",
    afterTitle: "Your flows follow your rules",
    afterTitleAccents: ["follow"],
    afterText: "An automated process is not frozen: your rules change, your tools get updated. Here is what we handle after go-live.",
    after: [
      { title: "Run monitoring", text: "Failures, blockages and unusual queues are detected.", status: "monitoring in progress" },
      { title: "Exception handling", text: "Cases that left the flow are reviewed, then folded into the rules if useful.", status: "handling in progress" },
      { title: "Keeping up with tools", text: "An update to a connected system can require adjusting the flow.", status: "adaptation in progress" },
      { title: "Volume tracking", text: "Processed volumes and platform costs stay visible.", status: "measurement in progress" },
    ],
    ctaTitle: "Let's see which process is worth automating",
    ctaTitleAccents: ["process"],
    ctaText: "Describe a task your team repeats every week. The first conversation checks whether it can be automated reliably, and what has to be settled first.",
    faqTitle: "Frequently asked questions about process automation",
    faqTitleAccents: ["process automation"],
    faqExtra: [
      { q: "Do we have to change software to automate?", a: "No. An automation builds on your existing tools and their access. We check what is available before proposing a scope, and we only replace a tool when that is genuinely justified." },
      { q: "What happens to edge cases?", a: "They are never guessed. A case that does not match the agreed rules leaves the flow and is flagged to a person. That is an important part of scoping." },
      { q: "How long does it take to automate a process?", a: "A simple flow between two well-documented tools is quick. A process with many exceptions takes more scoping than development. The time is estimated after analysis." },
    ],
  },

  "logiciels-applications-ia": {
    kicker: "AI software & applications",
    h1: "Custom business software and AI applications",
    h1Accents: ["Custom business software", "AI applications"],
    whatKicker: "Understanding custom software",
    whatTitle: "What is custom business software?",
    whatTitleAccents: ["custom business software?"],
    whatText:
      "It is an application designed around how you actually work: your roles, your data, your rules and the screens your teams need. It can replace a set of files that has become hard to maintain, extend software you already run, or become a feature you offer your own customers. AI is not the starting point: we define the useful path first, then where AI adds something.",
    whatVisual: "software",
    usesTitle: "What business software can be used for,\nand the forms it can take",
    usesTitleAccents: ["used for", "forms"],
    usesKicker: "Concrete uses and types of software",
    usesCards: true,
    mergeForms: true,
    usesText: "Custom development is justified when the work no longer fits a spreadsheet or an off-the-shelf product. These are the most common situations.",
    uses: [
      { title: "Centralise your files", text: "Bring into one space what circulates by email today.", form: "Management tool" },
      { title: "Track jobs and visits", text: "Plan, follow progress and keep the history of a case.", form: "Business interface" },
      { title: "Give your clients access", text: "A portal where they find their requests and their status.", form: "Client application" },
      { title: "Replace shared files", text: "Move off a spreadsheet that has outgrown itself, with rights per role.", form: "Internal portal" },
      { title: "Capture data in the field", text: "A simple mobile-friendly interface, designed for entry.", form: "Data entry tool" },
      { title: "See the activity", text: "Management screens fed by the tool's own data.", form: "Dashboard" },
      { title: "Assist with writing", text: "Prepare a report or a document from the data entered.", form: "Embedded copilot" },
      { title: "Extend your product", text: "Add an AI feature for the users of your own software.", form: "Back-office" },
    ],
    coreKicker: "Shaped around how you work",
    coreTitle: "A tool designed around how you work",
    coreText: "Custom software does not impose an organisation, it takes yours. The screens follow the steps of your work, the rights follow your roles, and the data stays yours.",
    coreCentre: "Your application",
    coreChips: ["Roles and rights", "Business rules", "Your data", "Dedicated screens", "History", "Exports", "Connections", "AI assistance"],
    coreNote: "Hosting, backups and access conditions are agreed with you before development starts.",
    afterTitle: "Your application grows with your business",
    afterTitleAccents: ["grows"],
    afterText: "A tool that genuinely gets used always ends up needing to change. Here is what we handle after go-live.",
    after: [
      { title: "Technical maintenance", text: "Updates, fixes and availability monitoring.", status: "maintenance in progress" },
      { title: "New features", text: "Requests are prioritised, estimated, then built in stages.", status: "review in progress" },
      { title: "User support", text: "Onboarding for newcomers and feedback from real use.", status: "support in progress" },
      { title: "Cost tracking", text: "Hosting, storage and external services stay costed and visible.", status: "estimate in progress" },
    ],
    ctaTitle: "Let's see whether custom software is the right answer",
    ctaTitleAccents: ["custom software"],
    ctaText: "Tell us how your team works today, and where it breaks down. The first conversation also checks whether an existing product would do the job.",
    faqTitle: "Frequently asked questions about custom business software",
    faqTitleAccents: ["custom business software"],
    faqExtra: [
      { q: "Why build rather than buy?", a: "In many cases an off-the-shelf product is enough, and we say so. Custom work is justified when your way of working is specific, when several tools should be connected, or when no product covers the core path of your activity." },
      { q: "Can we start small?", a: "That is the approach we recommend. A first version covers the most useful path, is tested by its users, then extended. It limits risk and makes trade-offs concrete." },
      { q: "Who owns the application's code?", a: "Ownership, hosting and exit conditions are written into the proposal before work starts, along with the scope and each party's responsibilities." },
    ],
  },

  "integrations-systemes-connectes": {
    kicker: "Integrations & connected systems",
    h1: "Integrations between your software and your data",
    h1Accents: ["Integrations"],
    whatKicker: "Understanding integrations",
    whatTitle: "What is an integration between your systems?",
    whatTitleAccents: ["integration", "?"],
    whatText:
      "An integration lets two pieces of software exchange information: a contact, a status, an order, a document. It removes re-keying and the question of which version is right. An automation organises the steps of a process; an integration moves data between tools. The two often work together, but they are not the same thing.",
    whatVisual: "integration",
    usesTitle: "What an integration can be used for,\nand the systems it connects",
    usesTitleAccents: ["used for", "systems"],
    usesKicker: "Concrete uses and connected systems",
    usesCards: true,
    mergeForms: true,
    usesText: "An integration is justified as soon as the same information lives in two tools. These are the connections most often requested.",
    uses: [
      { title: "Connect your site to your CRM", text: "An approved request creates or updates the matching record.", form: "Website and forms" },
      { title: "Synchronise contacts", text: "One client record, current in the tools that need it.", form: "CRM" },
      { title: "Share an order status", text: "What the ERP confirms becomes visible elsewhere.", form: "ERP and management" },
      { title: "Feed an analytics tool", text: "Authorised data from several systems lands in one place.", form: "SaaS tools" },
      { title: "Call an external API", text: "A third-party service is used inside your processes, with its limits.", form: "Third-party APIs" },
      { title: "Reconcile two databases", text: "Identify matches, gaps and duplicates.", form: "Databases" },
      { title: "Remove double entry", text: "End manual re-keying between two applications.", form: "Mail and calendars" },
      { title: "Trace the exchanges", text: "Keep a log of transfers, errors and retries.", form: "Document spaces" },
    ],
    coreKicker: "Your systems, connected",
    coreTitle: "Connecting the systems you already use",
    coreText: "The aim is not to add one more piece of software, but to move information between the ones already in place. Your teams keep working in their usual tools.",
    coreCentre: "Integration layer",
    coreChips: ["CRM", "ERP", "API", "Database", "Website", "SaaS tools", "Documents", "Reporting"],
    coreNote: "Each exchange is limited to the data required, and logged so it can be checked.",
    afterTitle: "Your connections need looking after",
    afterTitleAccents: ["looking after"],
    afterText: "An integration depends on tools you do not fully control, and they change. Here is what we handle after go-live.",
    after: [
      { title: "Exchange monitoring", text: "Transfer errors and outages are detected quickly.", status: "monitoring in progress" },
      { title: "Following API changes", text: "A change on the vendor's side can require adapting the connection.", status: "check in progress" },
      { title: "Consistency checks", text: "Differences between two systems are spotted and corrected.", status: "check in progress" },
      { title: "Usage limits", text: "Volumes, quotas and the cost of connected services stay visible.", status: "measurement in progress" },
    ],
    ctaTitle: "Let's see which systems should be connected",
    ctaTitleAccents: ["systems"],
    ctaText: "Tell us which information your teams copy from one tool to another. The first conversation checks the available access and what is genuinely feasible.",
    faqTitle: "Frequently asked questions about integrations",
    faqTitleAccents: ["integrations"],
    faqExtra: [
      { q: "Do we need an extra subscription to connect our tools?", a: "Sometimes. Some vendors reserve API access for certain plans, or charge by volume. We identify those conditions during scoping, so they are not discovered mid-project." },
      { q: "What happens if a tool is unavailable?", a: "The transfer is queued rather than lost, then replayed under the agreed rules. Failures stay visible, and duplicates are checked on retry." },
      { q: "Can an old or in-house system be connected?", a: "Often yes, through its database, an export or a dedicated gateway. The approach depends on what the system actually exposes and on the permissions available." },
    ],
  },

  "data-intelligence": {
    kicker: "Data & intelligence",
    h1: "Turning your business data into information you can use",
    h1Accents: ["business data"],
    whatKicker: "Understanding data work",
    whatTitle: "What is data and intelligence applied to business?",
    whatTitleAccents: ["data and intelligence", "?"],
    whatText:
      "It is the work that leads from scattered data to information you can decide on: bringing the sources together, correcting what is inconsistent, defining indicators with the business, then making them readable. Where the history allows it, a further step becomes possible: an estimate, a score, a recommendation. An observed figure and an estimate are always presented as two different things.",
    whatVisual: "data",
    usesTitle: "What your data can be used for,\nand the forms the work takes",
    usesTitleAccents: ["used for", "forms"],
    usesKicker: "Concrete uses and types of data work",
    usesCards: true,
    mergeForms: true,
    usesText: "The aim is not to produce charts, but to answer questions you are already asking. These are the most frequent uses.",
    uses: [
      { title: "Bring scattered data together", text: "Gather what lives across several tools and files today.", form: "Data centralisation" },
      { title: "Follow the activity", text: "Current indicators, with no manual export or rework.", form: "Business dashboard" },
      { title: "Compare periods", text: "Read a trend over a consistent, checked history.", form: "Activity analysis" },
      { title: "Spot an anomaly", text: "Flag an unusual gap that deserves a look.", form: "Anomaly detection" },
      { title: "Prioritise case work", text: "An explainable score proposes an order you can override.", form: "Scoring" },
      { title: "Anticipate a need", text: "Estimate a load or a restock where the history allows it.", form: "Forecasting" },
      { title: "Search your information", text: "Find something by meaning, not only by keyword.", form: "Semantic search" },
      { title: "Share a trusted figure", text: "One definition of each indicator, for every team.", form: "Data quality" },
    ],
    coreKicker: "From data to decision",
    coreTitle: "Turning your data into usable information",
    coreText: "Your data already exists, in your management software, your files and your online tools. The work is to bring it together, check what it is worth, then present it in a form people can use.",
    coreCentre: "Your indicators",
    coreChips: ["Sales", "Stock", "Production", "Clients", "Finance", "Support", "Website", "Internal files"],
    coreNote: "The quality of the available data decides what can be claimed. We say so before delivering a figure.",
    afterTitle: "Your indicators need upkeep",
    afterTitleAccents: ["upkeep"],
    afterText: "Live data degrades: a source changes, a format moves. Here is what we handle after go-live.",
    after: [
      { title: "Feed monitoring", text: "An interrupted or incomplete source is detected before it is read.", status: "monitoring in progress" },
      { title: "Quality control", text: "Gaps and outliers are tracked over time.", status: "check in progress" },
      { title: "Model review", text: "An estimate is re-evaluated regularly, and corrected if it drifts.", status: "review in progress" },
      { title: "Indicator changes", text: "Definitions are adjusted when your activity changes.", status: "adjustment in progress" },
    ],
    ctaTitle: "Let's see what your data can actually tell you",
    ctaTitleAccents: ["your data"],
    ctaText: "Tell us which decision you make today without a figure you trust. The first conversation assesses the data available and what it supports.",
    faqTitle: "Frequently asked questions about working with data",
    faqTitleAccents: ["working with data"],
    faqExtra: [
      { q: "Do we need a lot of data to start?", a: "Not for a dashboard: your existing data simply has to be accessible and consistent. For a forecast or a score, volume, quality and depth of history matter, and we examine them before committing." },
      { q: "Is our data used to train models?", a: "Not outside the scope agreed with you. Usage conditions, access and the technical services involved are written into the proposal before work starts." },
      { q: "Can a forecast be trusted?", a: "A forecast is an estimate, evaluated on past data and presented with its limits. It can support a decision but does not replace it, and we never present it as a certainty." },
    ],
  },

  "formation-adoption-ia": {
    kicker: "AI training & adoption",
    h1: "Training your teams and making AI use stick",
    h1Accents: ["Training your teams"],
    whatKicker: "Understanding adoption",
    whatTitle: "What does adopting AI in a company mean?",
    whatTitleAccents: ["adopting AI", "?"],
    whatText:
      "Discovering a tool and using it in your work are two different things. Adoption means choosing uses that suit your business, practising them on real situations, then agreeing shared ground rules: what can be handed to AI, how an answer is checked, and which information must not leave the company. This applies to existing AI tools as much as to a solution we deliver.",
    whatVisual: "adoption",
    usesTitle: "What AI training can be used for,\nand the forms it can take",
    usesTitleAccents: ["used for", "forms"],
    usesKicker: "Concrete uses and formats of support",
    usesCards: true,
    mergeForms: true,
    usesText: "Useful training starts from your work, not from a tour of the tools. These are the objectives most often chosen.",
    uses: [
      { title: "Understand what AI can do", text: "And above all what it cannot do reliably.", form: "Discovery workshop" },
      { title: "Choose the right uses", text: "Identify the tasks where AI brings a gain you can verify.", form: "Business session" },
      { title: "Write an effective request", text: "Get a usable answer rather than a vague one.", form: "Hands-on training" },
      { title: "Check an answer", text: "Spot an error, an invention or a missing piece of information.", form: "Team support" },
      { title: "Protect your information", text: "Know which data can be shared, and where.", form: "Internal usage rules" },
      { title: "Document your practice", text: "Set common rules for the whole team.", form: "Internal usage rules" },
      { title: "Take on a delivered solution", text: "Use the tool we built the way it was designed to be used.", form: "Solution onboarding" },
      { title: "Train internal champions", text: "People able to spread the practice inside the company.", form: "Champion training" },
    ],
    coreKicker: "From discovery to real use",
    coreTitle: "Making AI part of real working habits",
    coreText: "A trained team is not one that knows many tools, but one that uses them well: on the right tasks, with systematic verification and clear rules about what is shared.",
    coreCentre: "Your teams",
    coreChips: ["Practical cases", "Business exercises", "Verification methods", "Sharing rules", "Internal champions", "Written material", "Adoption follow-up", "Open questions"],
    coreNote: "No certification is issued, and no funding scheme is assumed.",
    afterTitle: "Adoption is built after the training",
    afterTitleAccents: ["is built"],
    afterText: "Habits form in the weeks that follow, not during the session. Here is what we offer next.",
    after: [
      { title: "Follow-up session", text: "A later meeting to work through what blocked people in practice.", status: "follow-up in progress" },
      { title: "Support for champions", text: "The people spreading the practice internally keep their support.", status: "support in progress" },
      { title: "Updated material", text: "Tools move fast: material and examples are reviewed.", status: "update in progress" },
      { title: "New uses", text: "Further tasks are examined as the team progresses.", status: "review in progress" },
    ],
    ctaTitle: "Let's see how to train your team usefully",
    ctaTitleAccents: ["your team"],
    ctaText: "Tell us where your team stands with AI today. The first conversation sets a realistic format and uses that suit your business.",
    faqTitle: "Frequently asked questions about AI training",
    faqTitleAccents: ["AI training"],
    faqExtra: [
      { q: "Do we need to use AI already?", a: "No. We adapt the starting point: a team that has never used these tools works first on understanding and verification, before moving to more advanced uses." },
      { q: "Is the training tied to one particular tool?", a: "Not necessarily. We work with the tools approved in your company. If you have none yet, we help choose according to your uses and your confidentiality constraints." },
      { q: "How long before the habits stick?", a: "One session is enough to understand, not to change habits. Adoption is measured over several weeks, with a follow-up and internal champions. We do not promise an immediate productivity gain." },
    ],
  },
};

/** Le contenu de page d'un service, par son slug. */
export function servicePage(locale: Locale, slug: string): ServicePageContent | undefined {
  return (locale === "fr" ? fr : en)[slug];
}
