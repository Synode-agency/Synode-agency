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
  /** Le visuel animé de la bande bleu nuit. Il est choisi ICI, par le
   *  contenu, et jamais par le slug dans le gabarit : c'est ce qui garantit
   *  que les six pages restent dans le même système. La mise en page en
   *  deux colonnes ne change pas d'un visuel à l'autre. */
  coreVisual?: "agent" | "automation" | "software" | "integration" | "data" | "adoption";
  /** ⚠ Plus aucune page ne lit ces deux champs depuis que les six bandes
   *  bleu nuit ont leur visuel animé : le moyeu et ses pastilles, qui
   *  étaient leur seul lecteur, ont été supprimés. Conservés le temps de
   *  s'assurer que les visuels conviennent partout. */
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
    kicker: "Automatisation des processus métier",
    h1: "Automatisez vos processus métier avec l’intelligence artificielle",
    h1Accents: ["Automatisez vos processus métier"],
    whatKicker: "Comprendre l’automatisation des processus",
    whatTitle: "Qu’est-ce qu’une automatisation intelligente ?",
    whatTitleAccents: ["automatisation intelligente ?"],
    whatText:
      "Une automatisation intelligente relie vos logiciels, vos données et vos règles métier pour exécuter automatiquement les étapes répétitives d’un processus. L’intelligence artificielle intervient lorsqu’il faut comprendre un texte, classer une demande ou extraire une information ; les opérations simples restent gérées par des règles déterministes, plus fiables et plus faciles à contrôler.",
    whatVisual: "automation",
    usesTitle: "Quels processus métier automatiser,\net avec quelles solutions ?",
    usesTitleAccents: ["processus métier automatiser", "solutions ?"],
    usesKicker: "Cas d’usage de l’automatisation intelligente",
    usesCards: true,
    mergeForms: true,
    usesText: "L’automatisation des processus métier devient pertinente lorsqu’une tâche se répète selon des règles connues. Ces exemples présentent les usages les plus fréquents pour réduire la saisie manuelle, accélérer les traitements et limiter les oublis en entreprise.",
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
    coreKicker: "Intégration à vos outils métier",
    coreTitle: "Automatiser sans remplacer vos logiciels",
    coreText: "Une automatisation métier s’intègre aux logiciels que votre entreprise utilise déjà. Elle fait circuler les informations entre vos outils et prend en charge les étapes intermédiaires répétitives, sans imposer une nouvelle organisation à vos équipes.",
    coreVisual: "automation",
    coreCentre: "Flux automatisé",
    coreChips: ["Boîte email", "Documents", "CRM", "Outil comptable", "ERP", "Tableur", "Signature", "Messagerie d’équipe"],
    coreNote: "Les fichiers d’origine sont conservés, et chaque exécution laisse une trace consultable.",
    afterTitle: "Vos automatisations évoluent avec vos processus",
    afterTitleAccents: ["automatisations évoluent"],
    afterText: "Une automatisation de processus n’est jamais figée : vos règles métier changent, vos volumes évoluent et vos logiciels sont mis à jour. Après la mise en service, nous suivons le fonctionnement du flux et adaptons la solution lorsque votre activité l’exige.",
    after: [
      { title: "Surveillance des exécutions", text: "Les échecs, les blocages et les files d’attente anormales sont détectés.", status: "surveillance en cours" },
      { title: "Traitement des exceptions", text: "Les cas sortis du flux sont analysés, puis intégrés aux règles si c’est utile.", status: "traitement en cours" },
      { title: "Adaptation aux outils", text: "Une mise à jour d’un logiciel connecté peut demander un ajustement du flux.", status: "adaptation en cours" },
      { title: "Suivi des volumes", text: "Les volumes traités et les coûts de plateforme restent visibles.", status: "mesure en cours" },
    ],
    ctaTitle: "Identifions le processus métier à automatiser",
    ctaTitleAccents: ["processus métier à automatiser"],
    ctaText: "Décrivez une tâche répétitive qui mobilise votre équipe chaque semaine. Un premier échange permet d’évaluer la faisabilité de son automatisation, les logiciels à connecter et les règles à définir pour obtenir un fonctionnement fiable.",
    faqTitle: "Questions fréquentes sur\nl’automatisation des processus",
    faqTitleAccents: ["l’automatisation des processus"],
    faqExtra: [
      { q: "Faut-il changer nos logiciels pour automatiser ?", a: "Non. Une automatisation s’appuie sur les outils existants et leurs accès. Nous vérifions ce qui est disponible avant de proposer un périmètre, et nous ne remplaçons un outil que si cela se justifie." },
      { q: "Que deviennent les cas particuliers ?", a: "Ils ne sont jamais traités au hasard. Un cas qui ne correspond pas aux règles convenues est sorti du flux et signalé à une personne. C’est une partie importante du cadrage." },
      { q: "Combien de temps faut-il pour automatiser un processus ?", a: "Un flux simple entre deux outils bien documentés se met en place rapidement. Un processus avec de nombreuses exceptions demande plus de cadrage que de développement. La durée est estimée après l’analyse." },
    ],
  },

  "logiciels-applications-ia": {
    kicker: "Développement de logiciels métier sur mesure",
    h1: "Des logiciels métier et des applications IA sur mesure",
    h1Accents: ["logiciels métier", "applications IA"],
    whatKicker: "Comprendre le développement sur mesure",
    whatTitle: "Qu’est-ce qu’un logiciel métier sur mesure ?",
    whatTitleAccents: ["logiciel métier sur mesure ?"],
    whatText:
      "Un logiciel métier sur mesure est une application conçue autour du fonctionnement réel de votre entreprise : vos processus, vos rôles, vos données et les écrans dont vos équipes ont besoin. Il peut remplacer des fichiers devenus difficiles à gérer, compléter un logiciel existant ou intégrer une fonctionnalité IA destinée à vos collaborateurs ou à vos clients. Nous définissons d’abord le parcours utile, puis les usages où l’intelligence artificielle apporte une valeur concrète.",
    whatVisual: "software",
    usesTitle: "Quels usages pour un logiciel métier,\net quelles applications développer ?",
    usesTitleAccents: ["usages", "applications développer ?"],
    usesKicker: "Cas d’usage des logiciels sur mesure",
    usesCards: true,
    mergeForms: true,
    usesText: "Le développement d’un logiciel sur mesure se justifie lorsque vos processus métier ne tiennent plus dans un tableur ou qu’un logiciel généraliste oblige vos équipes à multiplier les contournements. Voici les applications internes et interfaces métier les plus fréquemment demandées.",
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
    coreKicker: "Conception centrée sur vos processus",
    coreTitle: "Un logiciel sur mesure adapté à votre entreprise",
    coreText: "Un logiciel métier sur mesure s’adapte à votre organisation au lieu de vous imposer celle d’un outil standard. Les écrans suivent les étapes de votre travail, les droits d’accès correspondent à vos rôles et vos données restent sous votre contrôle.",
    coreVisual: "software",
    coreCentre: "Votre application",
    coreChips: ["Rôles et droits", "Règles métier", "Vos données", "Écrans dédiés", "Historique", "Exports", "Connexions", "Assistance IA"],
    coreNote: "L’hébergement, les sauvegardes et les conditions d’accès sont définis avec vous avant le développement.",
    afterTitle: "Votre logiciel métier évolue avec votre activité",
    afterTitleAccents: ["logiciel métier évolue"],
    afterText: "Une application métier utilisée au quotidien doit évoluer avec vos équipes, vos processus et vos volumes. Après sa mise en service, nous assurons la maintenance technique, le suivi des usages et le développement progressif des nouvelles fonctionnalités prioritaires.",
    after: [
      { title: "Maintenance technique", text: "Mises à jour, correctifs et surveillance de la disponibilité.", status: "maintenance en cours" },
      { title: "Nouvelles fonctionnalités", text: "Les demandes sont priorisées, estimées, puis développées par étapes.", status: "arbitrage en cours" },
      { title: "Accompagnement des utilisateurs", text: "Prise en main des nouveaux arrivants et retours sur les usages réels.", status: "accompagnement en cours" },
      { title: "Suivi des coûts", text: "Hébergement, stockage et services externes restent chiffrés et visibles.", status: "estimation en cours" },
    ],
    ctaTitle: "Évaluons votre projet de logiciel métier sur mesure",
    ctaTitleAccents: ["logiciel métier sur mesure"],
    ctaText: "Présentez-nous votre processus actuel, les outils utilisés et les difficultés rencontrées par vos équipes. Le premier échange permet de vérifier si un développement sur mesure est justifié ou si un logiciel existant peut déjà répondre à votre besoin.",
    faqTitle: "Questions fréquentes sur les\nlogiciels métier sur mesure",
    faqTitleAccents: ["logiciels métier sur mesure"],
    faqExtra: [
      { q: "Pourquoi développer plutôt qu’acheter un logiciel existant ?", a: "Dans beaucoup de cas, un logiciel du marché suffit, et nous le disons. Le sur-mesure se justifie quand votre fonctionnement est spécifique, quand plusieurs outils devraient être reliés, ou quand aucune solution ne couvre le parcours central de votre activité." },
      { q: "Peut-on commencer petit ?", a: "C’est la méthode que nous recommandons. Une première version couvre le parcours le plus utile, elle est testée par ses utilisateurs, puis étendue. Cela limite le risque et rend les arbitrages plus concrets." },
      { q: "À qui appartient le code de l’application ?", a: "Les conditions de propriété, d’hébergement et de réversibilité sont écrites dans la proposition avant le démarrage, avec le périmètre et les responsabilités de chacun." },
    ],
  },

  "integrations-systemes-connectes": {
    kicker: "Intégration de logiciels & API",
    h1: "Connectez vos logiciels, API et données d’entreprise",
    h1Accents: ["Connectez vos logiciels"],
    whatKicker: "Comprendre l’intégration de systèmes",
    whatTitle: "Qu’est-ce qu’une intégration entre logiciels ?",
    whatTitleAccents: ["intégration entre logiciels ?"],
    whatText:
      "Une intégration de logiciels permet à plusieurs systèmes d’échanger automatiquement des données : contacts, statuts, commandes, documents ou informations métier. Elle réduit la double saisie et maintient une source de référence claire. L’automatisation organise les étapes d’un processus, tandis que l’intégration transporte les données entre un CRM, un ERP, un site web, une API ou une base de données.",
    whatVisual: "integration",
    usesTitle: "Quels logiciels connecter,\net quelles données synchroniser ?",
    usesTitleAccents: ["logiciels connecter", "données synchroniser ?"],
    usesKicker: "Cas d’usage des systèmes connectés",
    usesCards: true,
    mergeForms: true,
    usesText: "Une intégration devient utile dès que la même information doit être copiée ou vérifiée dans plusieurs logiciels. Ces exemples présentent les connexions les plus demandées pour synchroniser un CRM, un ERP, des outils SaaS, des bases de données et des applications internes.",
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
    coreKicker: "Architecture de vos systèmes connectés",
    coreTitle: "Relier vos outils sans bouleverser vos usages",
    coreText: "L’objectif d’une intégration n’est pas d’ajouter un logiciel supplémentaire, mais de faire circuler les bonnes données entre les systèmes déjà en place. Vos équipes continuent de travailler dans leurs outils habituels, avec moins de ressaisie et des informations plus cohérentes.",
    coreVisual: "integration",
    coreCentre: "Couche d’intégration",
    coreChips: ["CRM", "ERP", "API", "Base de données", "Site web", "Outils SaaS", "Documents", "Reporting"],
    coreNote: "Chaque échange est limité aux données nécessaires, et consigné pour pouvoir être vérifié.",
    afterTitle: "Vos intégrations demandent un suivi technique",
    afterTitleAccents: ["suivi technique"],
    afterText: "Une connexion entre logiciels dépend d’API, de formats et de services externes qui peuvent évoluer. Après la mise en service, nous surveillons les échanges, les erreurs, les quotas et les changements techniques susceptibles d’affecter la synchronisation.",
    after: [
      { title: "Surveillance des échanges", text: "Les erreurs de transfert et les interruptions sont détectées rapidement.", status: "surveillance en cours" },
      { title: "Suivi des évolutions d’API", text: "Une modification côté éditeur peut demander une adaptation de la connexion.", status: "vérification en cours" },
      { title: "Contrôle de cohérence", text: "Les écarts entre deux systèmes sont repérés et corrigés.", status: "contrôle en cours" },
      { title: "Suivi des limites d’usage", text: "Volumes, quotas et coûts des services connectés restent visibles.", status: "mesure en cours" },
    ],
    ctaTitle: "Identifions les logiciels et données à connecter",
    ctaTitleAccents: ["logiciels et données à connecter"],
    ctaText: "Indiquez-nous quelles informations vos équipes recopient d’un logiciel à l’autre. Le premier échange permet d’identifier les API et accès disponibles, la source de référence et la faisabilité réelle de l’intégration.",
    faqTitle: "Questions fréquentes sur les\nintégrations et systèmes connectés",
    faqTitleAccents: ["intégrations et systèmes connectés"],
    faqExtra: [
      { q: "Faut-il un abonnement supplémentaire pour connecter nos outils ?", a: "Parfois. Certains éditeurs réservent l’accès par API à certaines formules, ou facturent au volume. Nous identifions ces conditions pendant le cadrage, pour qu’elles ne soient pas découvertes en cours de projet." },
      { q: "Que se passe-t-il si un outil est indisponible ?", a: "Le transfert est mis en attente plutôt que perdu, puis rejoué selon les règles convenues. Les échecs restent visibles, et les doublons sont contrôlés à la reprise." },
      { q: "Peut-on connecter un logiciel ancien ou interne ?", a: "Souvent oui, par sa base de données, un export ou une passerelle dédiée. La solution dépend de ce que le logiciel expose réellement et des autorisations disponibles." },
    ],
  },

  "data-intelligence": {
    kicker: "Analyse de données & tableaux de bord",
    h1: "Transformez vos données d’entreprise en décisions utiles",
    h1Accents: ["données d’entreprise"],
    whatKicker: "Comprendre l’analyse de données",
    whatTitle: "Qu’est-ce que la Data & Intelligence en entreprise ?",
    whatTitleAccents: ["Data & Intelligence", "entreprise ?"],
    whatText:
      "La Data & Intelligence transforme des données dispersées en informations exploitables pour piloter l’entreprise. Le travail consiste à centraliser les sources, corriger les incohérences, définir des indicateurs métier et les présenter dans des tableaux de bord lisibles. Lorsque l’historique le permet, ces données peuvent aussi alimenter une prévision, un score ou une recommandation, toujours distingués des chiffres réellement observés.",
    whatVisual: "data",
    usesTitle: "Comment exploiter vos données,\net quels outils mettre en place ?",
    usesTitleAccents: ["exploiter vos données", "outils"],
    usesKicker: "Cas d’usage de la Data & Intelligence",
    usesCards: true,
    mergeForms: true,
    usesText: "Un projet data ne consiste pas seulement à produire des graphiques : il doit répondre à des questions métier précises avec des données fiables. Voici les usages les plus fréquents, de la centralisation des données au tableau de bord, jusqu’à la détection d’anomalies et à la prévision.",
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
    coreKicker: "De vos sources à vos indicateurs métier",
    coreTitle: "Centraliser et fiabiliser vos données d’entreprise",
    coreText: "Les données utiles à votre activité existent déjà dans vos logiciels de gestion, vos fichiers, votre CRM ou vos outils en ligne. Nous les réunissons, évaluons leur qualité et les structurons afin de produire des indicateurs compréhensibles et réellement utilisables par vos équipes.",
    coreVisual: "data",
    coreCentre: "Vos indicateurs",
    coreChips: ["Ventes", "Stocks", "Production", "Clients", "Finance", "Support", "Site web", "Fichiers internes"],
    coreNote: "La qualité des données disponibles détermine ce qui peut être affirmé. Nous le disons avant de livrer un chiffre.",
    afterTitle: "Vos données et tableaux de bord restent fiables",
    afterTitleAccents: ["restent fiables"],
    afterText: "La fiabilité d’un tableau de bord dépend de sources qui évoluent, de formats qui changent et d’indicateurs qui doivent rester alignés sur votre activité. Après la mise en service, nous surveillons les alimentations, la qualité des données et les éventuelles dérives des modèles.",
    after: [
      { title: "Surveillance des alimentations", text: "Une source interrompue ou incomplète est détectée avant d’être lue.", status: "surveillance en cours" },
      { title: "Contrôle de qualité", text: "Les écarts et les valeurs aberrantes sont suivis dans le temps.", status: "contrôle en cours" },
      { title: "Révision des modèles", text: "Une estimation est réévaluée régulièrement, et corrigée si elle dérive.", status: "révision en cours" },
      { title: "Évolution des indicateurs", text: "Les définitions sont ajustées quand votre activité change.", status: "ajustement en cours" },
    ],
    ctaTitle: "Évaluons le potentiel de vos données d’entreprise",
    ctaTitleAccents: ["vos données d’entreprise"],
    ctaText: "Présentez-nous la décision que vous devez aujourd’hui prendre sans indicateur fiable. Le premier échange permet d’identifier les sources disponibles, leur qualité et le type de tableau de bord, d’analyse ou de prévision réellement envisageable.",
    faqTitle: "Questions fréquentes sur\nl’exploitation des données",
    faqTitleAccents: ["l’exploitation des données"],
    faqExtra: [
      { q: "Faut-il beaucoup de données pour commencer ?", a: "Pas pour un tableau de bord : il suffit que vos données existantes soient accessibles et cohérentes. Pour une prévision ou un score, le volume, la qualité et la profondeur d’historique comptent, et nous les examinons avant de nous engager." },
      { q: "Nos données sont-elles utilisées pour entraîner des modèles ?", a: "Pas en dehors du cadre défini avec vous. Les conditions d’usage, les accès et les services techniques concernés sont écrits dans la proposition avant le démarrage." },
      { q: "Une prévision est-elle fiable ?", a: "Une prévision est une estimation, évaluée sur des données passées et accompagnée de ses limites. Elle peut aider à préparer une décision, mais elle ne la remplace pas, et nous ne la présentons jamais comme une certitude." },
    ],
  },

  "formation-adoption-ia": {
    kicker: "Formation IA en entreprise",
    h1: "Formez vos équipes à l’IA et développez des usages durables",
    h1Accents: ["Formez vos équipes à l’IA", "usages durables"],
    whatKicker: "Comprendre l’adoption de l’intelligence artificielle",
    whatTitle: "Comment réussir l’adoption de l’IA en entreprise ?",
    whatTitleAccents: ["adoption de l’IA", "?"],
    whatText:
      "Découvrir un outil d’intelligence artificielle et l’intégrer au travail quotidien sont deux étapes différentes. L’adoption de l’IA consiste à choisir des usages utiles pour votre métier, à les pratiquer sur des situations réelles et à définir des règles communes : quelles tâches confier à l’IA, comment vérifier ses réponses et quelles données protéger. Cette démarche s’applique aux outils existants comme aux solutions IA développées pour votre entreprise.",
    whatVisual: "adoption",
    usesTitle: "Quels objectifs pour une formation IA,\net quel accompagnement choisir ?",
    usesTitleAccents: ["formation IA", "accompagnement choisir ?"],
    usesKicker: "Cas d’usage et formats de formation IA",
    usesCards: true,
    mergeForms: true,
    usesText: "Une formation IA en entreprise doit partir des métiers, des outils autorisés et des situations rencontrées par vos équipes. Ces objectifs couvrent les besoins les plus fréquents : comprendre les limites de l’IA, mieux formuler les demandes, vérifier les réponses et protéger les informations sensibles.",
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
    coreKicker: "De la formation à l’adoption de l’IA",
    coreTitle: "Ancrer l’intelligence artificielle dans les pratiques métier",
    coreText: "Une équipe formée à l’IA ne se distingue pas par le nombre d’outils qu’elle connaît, mais par sa capacité à les utiliser sur les bonnes tâches. L’adoption repose sur des exercices métier, une vérification systématique des résultats et des règles claires concernant les données partagées.",
    coreVisual: "adoption",
    coreCentre: "Vos équipes",
    coreChips: ["Cas pratiques", "Exercices métier", "Méthodes de vérification", "Règles de partage", "Référents internes", "Supports écrits", "Suivi d’adoption", "Questions ouvertes"],
    coreNote: "Aucune certification n’est délivrée, et aucune prise en charge financière n’est présumée.",
    afterTitle: "L’adoption de l’IA continue après la formation",
    afterTitleAccents: ["adoption de l’IA continue"],
    afterText: "Les nouveaux usages ne s’installent pas pendant une seule séance : ils se construisent dans les semaines suivantes, au contact des situations réelles. Nous proposons un suivi des équipes, un appui aux référents internes et une mise à jour régulière des exemples et supports.",
    after: [
      { title: "Point de suivi", text: "Une séance ultérieure pour traiter les blocages rencontrés sur le terrain.", status: "suivi en cours" },
      { title: "Appui aux référents", text: "Les personnes qui diffusent les usages en interne restent accompagnées.", status: "appui en cours" },
      { title: "Mise à jour des contenus", text: "Les outils évoluent vite : les supports et les exemples sont revus.", status: "mise à jour en cours" },
      { title: "Nouveaux usages", text: "De nouvelles tâches sont examinées à mesure que l’équipe progresse.", status: "examen en cours" },
    ],
    ctaTitle: "Construisons une formation IA adaptée à vos équipes",
    ctaTitleAccents: ["formation IA adaptée"],
    ctaText: "Expliquez-nous comment vos collaborateurs utilisent aujourd’hui l’intelligence artificielle. Le premier échange permet de définir des objectifs concrets, un format réaliste et des exercices directement liés à vos métiers et à vos règles de confidentialité.",
    faqTitle: "Questions fréquentes sur\nla formation IA",
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
    kicker: "Business process automation",
    h1: "Automate your business processes with artificial intelligence",
    h1Accents: ["Automate your business processes"],
    whatKicker: "Understanding process automation",
    whatTitle: "What is intelligent automation?",
    whatTitleAccents: ["intelligent automation?"],
    whatText:
      "Intelligent automation connects your business software, rules and data to run repetitive process steps automatically. Artificial intelligence is used only when the workflow must understand text, classify a request or extract information, while straightforward rules remain deterministic and under control.",
    whatVisual: "automation",
    usesTitle: "Which business processes can you automate,\nand with which solutions?",
    usesTitleAccents: ["business processes", "solutions?"],
    usesKicker: "Intelligent automation use cases",
    usesCards: true,
    mergeForms: true,
    usesText: "Business process automation is useful wherever teams repeat the same task under the same rules. These are the most common starting points for an intelligent automation project.",
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
    coreKicker: "Integration with your business tools",
    coreTitle: "Automate without replacing your software",
    coreText: "Business process automation does not require you to change tools. It connects the software you already use and handles the repetitive steps between them, while your teams keep control of exceptions.",
    coreVisual: "automation",
    coreCentre: "Automated flow",
    coreChips: ["Mailbox", "Documents", "CRM", "Accounting tool", "ERP", "Spreadsheet", "E-signature", "Team chat"],
    coreNote: "Original files are kept, and every run leaves a record you can consult.",
    afterTitle: "Your automations evolve with your processes",
    afterTitleAccents: ["evolve"],
    afterText: "An automated workflow must evolve when your business rules or connected software change. We monitor runs, handle exceptions and adapt integrations after go-live.",
    after: [
      { title: "Run monitoring", text: "Failures, blockages and unusual queues are detected.", status: "monitoring in progress" },
      { title: "Exception handling", text: "Cases that left the flow are reviewed, then folded into the rules if useful.", status: "handling in progress" },
      { title: "Keeping up with tools", text: "An update to a connected system can require adjusting the flow.", status: "adaptation in progress" },
      { title: "Volume tracking", text: "Processed volumes and platform costs stay visible.", status: "measurement in progress" },
    ],
    ctaTitle: "Identify the business process to automate",
    ctaTitleAccents: ["process to automate"],
    ctaText: "Describe a repetitive task your team performs every week. We assess whether it can be automated reliably, which tools must be connected and which exceptions require human review.",
    faqTitle: "Frequently asked questions about\nprocess automation",
    faqTitleAccents: ["process automation"],
    faqExtra: [
      { q: "Do we have to change software to automate?", a: "No. An automation builds on your existing tools and their access. We check what is available before proposing a scope, and we only replace a tool when that is genuinely justified." },
      { q: "What happens to edge cases?", a: "They are never guessed. A case that does not match the agreed rules leaves the flow and is flagged to a person. That is an important part of scoping." },
      { q: "How long does it take to automate a process?", a: "A simple flow between two well-documented tools is quick. A process with many exceptions takes more scoping than development. The time is estimated after analysis." },
    ],
  },

  "logiciels-applications-ia": {
    kicker: "Custom business software development",
    h1: "Custom business software and AI applications",
    h1Accents: ["Custom business software", "AI applications"],
    whatKicker: "Understanding custom business software",
    whatTitle: "What is custom business software?",
    whatTitleAccents: ["custom business software?"],
    whatText:
      "Custom business software is designed around the way your company actually works: your roles, data, rules and the screens your teams need. It can replace hard-to-maintain files, extend an existing application or provide a new service to your customers. AI is added only where it creates a concrete operational benefit.",
    whatVisual: "software",
    usesTitle: "Which needs can custom software address,\nand which applications should you build?",
    usesTitleAccents: ["custom software", "applications"],
    usesKicker: "Custom software and AI application use cases",
    usesCards: true,
    mergeForms: true,
    usesText: "Custom software development becomes relevant when a spreadsheet or off-the-shelf product no longer fits your processes. These are the most common business application use cases.",
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
    coreKicker: "Software designed for your processes",
    coreTitle: "A business application built around your work",
    coreText: "Custom business software follows your organisation rather than imposing a new one. Screens reflect each process, access rights match your roles and your business data remains under your control.",
    coreVisual: "software",
    coreCentre: "Your application",
    coreChips: ["Roles and rights", "Business rules", "Your data", "Dedicated screens", "History", "Exports", "Connections", "AI assistance"],
    coreNote: "Hosting, backups and access conditions are agreed with you before development starts.",
    afterTitle: "Your custom software grows with your business",
    afterTitleAccents: ["grows"],
    afterText: "A business application must evolve with your teams, processes and customer needs. We handle maintenance, support and new features after go-live.",
    after: [
      { title: "Technical maintenance", text: "Updates, fixes and availability monitoring.", status: "maintenance in progress" },
      { title: "New features", text: "Requests are prioritised, estimated, then built in stages.", status: "review in progress" },
      { title: "User support", text: "Onboarding for newcomers and feedback from real use.", status: "support in progress" },
      { title: "Cost tracking", text: "Hosting, storage and external services stay costed and visible.", status: "estimate in progress" },
    ],
    ctaTitle: "Assess your custom software project",
    ctaTitleAccents: ["custom software"],
    ctaText: "Tell us how your team works today and where existing tools fall short. We assess whether custom development is justified or whether an existing product can meet the need.",
    faqTitle: "Frequently asked questions about\ncustom business software",
    faqTitleAccents: ["custom business software"],
    faqExtra: [
      { q: "Why build rather than buy?", a: "In many cases an off-the-shelf product is enough, and we say so. Custom work is justified when your way of working is specific, when several tools should be connected, or when no product covers the core path of your activity." },
      { q: "Can we start small?", a: "That is the approach we recommend. A first version covers the most useful path, is tested by its users, then extended. It limits risk and makes trade-offs concrete." },
      { q: "Who owns the application's code?", a: "Ownership, hosting and exit conditions are written into the proposal before work starts, along with the scope and each party's responsibilities." },
    ],
  },

  "integrations-systemes-connectes": {
    kicker: "Software & API integration",
    h1: "Connect your software, APIs and business data",
    h1Accents: ["Connect your software"],
    whatKicker: "Understanding software integration",
    whatTitle: "What is an integration between your systems?",
    whatTitleAccents: ["integration", "?"],
    whatText:
      "Software integration allows two business applications to exchange data such as a contact, status, order or document. It eliminates duplicate entry and keeps information consistent. Automation organises the steps of a process, while an integration moves data between tools. The two often work together but serve different purposes.",
    whatVisual: "integration",
    usesTitle: "Which software should you connect,\nand which data should you synchronise?",
    usesTitleAccents: ["software", "data"],
    usesKicker: "Software integration and data synchronisation use cases",
    usesCards: true,
    mergeForms: true,
    usesText: "A software integration is useful whenever the same business information exists in several tools. These are the most common connections between websites, CRM, ERP, APIs and databases.",
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
    coreKicker: "Connected business systems",
    coreTitle: "Connect the software your teams already use",
    coreText: "The goal is not to add another tool, but to synchronise data between your existing business systems. Your teams keep working in their usual software with reliable, up-to-date information.",
    coreVisual: "integration",
    coreCentre: "Integration layer",
    coreChips: ["CRM", "ERP", "API", "Database", "Website", "SaaS tools", "Documents", "Reporting"],
    coreNote: "Each exchange is limited to the data required, and logged so it can be checked.",
    afterTitle: "Your software integrations remain reliable",
    afterTitleAccents: ["remain reliable"],
    afterText: "An integration depends on APIs and software that evolve over time. We monitor exchanges, follow vendor changes and control data consistency after go-live.",
    after: [
      { title: "Exchange monitoring", text: "Transfer errors and outages are detected quickly.", status: "monitoring in progress" },
      { title: "Following API changes", text: "A change on the vendor's side can require adapting the connection.", status: "check in progress" },
      { title: "Consistency checks", text: "Differences between two systems are spotted and corrected.", status: "check in progress" },
      { title: "Usage limits", text: "Volumes, quotas and the cost of connected services stay visible.", status: "measurement in progress" },
    ],
    ctaTitle: "Identify the software and data to connect",
    ctaTitleAccents: ["software and data"],
    ctaText: "Tell us which information your teams copy from one tool to another. We assess the available APIs, access rights and the most reliable integration approach.",
    faqTitle: "Frequently asked questions about\nintegrations and connected systems",
    faqTitleAccents: ["integrations and connected systems"],
    faqExtra: [
      { q: "Do we need an extra subscription to connect our tools?", a: "Sometimes. Some vendors reserve API access for certain plans, or charge by volume. We identify those conditions during scoping, so they are not discovered mid-project." },
      { q: "What happens if a tool is unavailable?", a: "The transfer is queued rather than lost, then replayed under the agreed rules. Failures stay visible, and duplicates are checked on retry." },
      { q: "Can an old or in-house system be connected?", a: "Often yes, through its database, an export or a dedicated gateway. The approach depends on what the system actually exposes and on the permissions available." },
    ],
  },

  "data-intelligence": {
    kicker: "Data analysis & dashboards",
    h1: "Turn your business data into useful decisions",
    h1Accents: ["business data"],
    whatKicker: "Understanding business data analysis",
    whatTitle: "How does data intelligence support your business?",
    whatTitleAccents: ["data intelligence", "business?"],
    whatText:
      "Business data analysis turns scattered information into reliable decision-making tools. Sources are connected, inconsistencies corrected and performance indicators defined with your teams before being displayed in clear dashboards. When the available history supports it, forecasting, scoring or recommendations can be added without confusing estimates with recorded facts.",
    whatVisual: "data",
    usesTitle: "How can you use your business data,\nand which tools should you implement?",
    usesTitleAccents: ["business data", "tools"],
    usesKicker: "Data analysis and dashboard use cases",
    usesCards: true,
    mergeForms: true,
    usesText: "The goal of data intelligence is not to produce more charts, but to answer concrete business questions with reliable indicators. These are the most common data analysis use cases.",
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
    coreKicker: "From business data to decision-making",
    coreTitle: "Centralise your data in useful dashboards",
    coreText: "Your business data already exists across management software, spreadsheets and online tools. We centralise it, verify its quality and turn it into dashboards your teams can use to make decisions.",
    coreVisual: "data",
    coreCentre: "Your indicators",
    coreChips: ["Sales", "Stock", "Production", "Clients", "Finance", "Support", "Website", "Internal files"],
    coreNote: "The quality of the available data decides what can be claimed. We say so before delivering a figure.",
    afterTitle: "Your dashboards stay reliable over time",
    afterTitleAccents: ["stay reliable"],
    afterText: "Business data changes continuously as sources, formats and definitions evolve. We monitor feeds, data quality, models and key performance indicators after go-live.",
    after: [
      { title: "Feed monitoring", text: "An interrupted or incomplete source is detected before it is read.", status: "monitoring in progress" },
      { title: "Quality control", text: "Gaps and outliers are tracked over time.", status: "check in progress" },
      { title: "Model review", text: "An estimate is re-evaluated regularly, and corrected if it drifts.", status: "review in progress" },
      { title: "Indicator changes", text: "Definitions are adjusted when your activity changes.", status: "adjustment in progress" },
    ],
    ctaTitle: "Find out what your business data can reveal",
    ctaTitleAccents: ["business data"],
    ctaText: "Tell us which business decision you currently make without a reliable figure. We assess the available data, its quality and the dashboard or analysis it can support.",
    faqTitle: "Frequently asked questions about\nworking with data",
    faqTitleAccents: ["working with data"],
    faqExtra: [
      { q: "Do we need a lot of data to start?", a: "Not for a dashboard: your existing data simply has to be accessible and consistent. For a forecast or a score, volume, quality and depth of history matter, and we examine them before committing." },
      { q: "Is our data used to train models?", a: "Not outside the scope agreed with you. Usage conditions, access and the technical services involved are written into the proposal before work starts." },
      { q: "Can a forecast be trusted?", a: "A forecast is an estimate, evaluated on past data and presented with its limits. It can support a decision but does not replace it, and we never present it as a certainty." },
    ],
  },

  "formation-adoption-ia": {
    kicker: "AI training for business",
    h1: "Train your teams in AI and build lasting practices",
    h1Accents: ["Train your teams in AI", "lasting practices"],
    whatKicker: "Understanding AI adoption in business",
    whatTitle: "How do you successfully adopt AI in your company?",
    whatTitleAccents: ["adopt AI", "company?"],
    whatText:
      "Discovering an AI tool and using it effectively at work are two different things. Successful AI adoption means choosing relevant business use cases, practising with real situations and setting shared rules for verification, human control and confidential information. This applies to existing tools as well as custom AI solutions.",
    whatVisual: "adoption",
    usesTitle: "What should business AI training achieve,\nand which support format should you choose?",
    usesTitleAccents: ["AI training", "support format"],
    usesKicker: "AI training and adoption objectives",
    usesCards: true,
    mergeForms: true,
    usesText: "Effective AI training starts from your teams' real work rather than a generic tour of tools. These are the most common objectives for building useful, responsible and lasting practices.",
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
    coreKicker: "From AI training to adoption",
    coreTitle: "Build responsible AI practices in your teams",
    coreText: "A well-trained team is not one that knows the most tools, but one that uses AI on the right tasks, checks every important answer and follows clear rules for sensitive information.",
    coreVisual: "adoption",
    coreCentre: "Your teams",
    coreChips: ["Practical cases", "Business exercises", "Verification methods", "Sharing rules", "Internal champions", "Written material", "Adoption follow-up", "Open questions"],
    coreNote: "No certification is issued, and no funding scheme is assumed.",
    afterTitle: "AI adoption continues after the training",
    afterTitleAccents: ["continues"],
    afterText: "New working habits develop in the weeks after an AI training session. Follow-up, internal champions and updated learning materials help teams turn knowledge into lasting practice.",
    after: [
      { title: "Follow-up session", text: "A later meeting to work through what blocked people in practice.", status: "follow-up in progress" },
      { title: "Support for champions", text: "The people spreading the practice internally keep their support.", status: "support in progress" },
      { title: "Updated material", text: "Tools move fast: material and examples are reviewed.", status: "update in progress" },
      { title: "New uses", text: "Further tasks are examined as the team progresses.", status: "review in progress" },
    ],
    ctaTitle: "Define the right AI training for your teams",
    ctaTitleAccents: ["AI training"],
    ctaText: "Tell us how your teams currently use AI. We define a realistic training and adoption programme based on their level, your business needs and your confidentiality requirements.",
    faqTitle: "Frequently asked questions about\nAI training",
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
