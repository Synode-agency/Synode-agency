export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

/** Route prefix per locale — FR is the default and lives at the root. */
export const localePrefix = (locale: Locale) => (locale === "fr" ? "" : "/en");

/** Build a locale-aware path: path("en", "/contact") -> "/en/contact". */
export const path = (locale: Locale, sub = "/") => {
  const prefix = localePrefix(locale);
  if (sub === "/") return prefix || "/";
  return `${prefix}${sub}`;
};

/* La navigation. « Services » porte un menu déroulant dont les entrées sont
   construites à partir de `services.families` : une seule source pour le menu
   et pour les pages, donc un service ajouté à la liste apparaît partout. */
const nav = {
  fr: [
    { href: "/", label: "Accueil" },
    { href: "/#services", label: "Services", menu: "services" },
    { href: "/realisations", label: "Réalisations" },
    { href: "/faq", label: "FAQ" },
    { href: "/equipe", label: "La team" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en#services", label: "Services", menu: "services" },
    { href: "/en/realisations", label: "Work" },
    { href: "/en/faq", label: "FAQ" },
    { href: "/en/equipe", label: "The team" },
  ],
} as const;

const fr = {
  locale: "fr" as Locale,
  htmlLang: "fr",
  site: {
    name: "Synode",
    email: "contact@synode-agency.com",
    location: "Bruxelles, Belgique",
    vat: "BE 0000.000.000",
    nav: nav.fr,
    ctaLabel: "Réserver un audit",
    homeLabel: "Synode, accueil",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    tagline: "Automatisation, agents IA et solutions sur mesure pour les PME.",
  },

  /* ------------------------------------------------------------------
     Les services.

     Deux familles, huit prestations chacune. Les seize sont listées dans la
     section « Nos services » de l'accueil ; il n'y a pas de page qui les
     rassemble, elles y sont déjà. Chaque prestation a en revanche sa page,
     `/services/<slug>`, et le slug est le même en français et en anglais :
     le sélecteur de langue ne fait que remplacer le préfixe `/en`, une
     traduction des URL le casserait.

     `lead` est la phrase du menu déroulant et de la carte. Le contenu
     détaillé de chaque page arrive à l'étape suivante, une fois le gabarit
     validé sur une prestation.
     ------------------------------------------------------------------ */
  services: {
    eyebrow: "Services",
    title: "Des solutions d’automatisation & agents IA pour connecter, simplifier et accélérer vos processus métier",
    titleAccent: "d’automatisation & agents IA",
    body: "De l’automatisation de processus aux agents IA, en passant par les intégrations et les outils métier sur mesure, nos services s’adaptent aux différentes étapes du fonctionnement de votre entreprise.",
    countLabel: "services",
    familyLabel: "Famille",
    detailEyebrow: "Service",
    backLabel: "Tous les services",
    ctaLabel: "Réserver un audit",
    families: [
      {
        slug: "automatisation",
        title: "Automatisation",
        lead: "Vos outils se parlent, et le travail répétitif disparaît.",
        items: [
          { slug: "workflows-integrations", title: "Automatisation des processus & intégrations", lead: "Connectez vos logiciels et automatisez vos processus métier pour éviter les doubles saisies et faire circuler les données automatiquement entre vos outils.", summary: "Connectez vos logiciels et automatisez les étapes répétitives de vos processus. Les informations circulent automatiquement entre vos outils, sans ressaisie inutile.", description: "Nous relions vos logiciels pour déclencher les bonnes actions à chaque étape de votre activité : création d’un client, transmission d’une commande ou mise à jour d’un dossier. Les intégrations utilisent les API disponibles et vos règles métier, avec des contrôles pour repérer les erreurs de synchronisation. Vous réduisez les doubles saisies tout en gardant la maîtrise du processus." },
          { slug: "traitement-documents", title: "Documents, devis & facturation", lead: "Automatisez le traitement de documents, devis et factures : extraction des données, génération, classement et envoi selon vos règles métier.", summary: "Automatisez la création, le traitement et le classement de vos documents. Devis, factures et données suivent automatiquement le bon circuit.", description: "Le traitement de documents automatise les étapes répétitives autour des devis, factures et pièces justificatives. Les données utiles sont extraites, vérifiées puis transmises à vos outils de gestion ; les fichiers peuvent être générés, classés et envoyés selon vos règles. Une validation humaine peut être conservée avant un envoi ou lorsqu’une information doit être confirmée." },
          { slug: "emails-demandes", title: "Emails, demandes & communication", lead: "L’automatisation des emails, formulaires et demandes clients permet de les trier, de les transmettre et de déclencher les bonnes actions.", summary: "Automatisez le tri et le traitement de vos emails, formulaires et demandes clients. Chaque message peut déclencher automatiquement la bonne action.", description: "L’automatisation des emails et des demandes centralise les messages reçus via vos boîtes mail et formulaires. Selon leur objet, leur origine ou les informations renseignées, ils sont classés, transmis au bon interlocuteur et associés à une action de suivi. Vous structurez le traitement des demandes clients sans devoir déplacer chaque information à la main." },
          { slug: "relances-suivis", title: "Relances, rendez-vous & suivis", lead: "Automatisez vos relances, rappels et suivis pour les devis, factures, paiements, rendez-vous et dossiers en attente.", summary: "Automatisez vos rappels, relances et suivis pour les devis, paiements, rendez-vous ou dossiers en attente. Rien ne passe à la trappe.", description: "Nous construisons des scénarios de relance adaptés aux devis sans réponse, aux factures en attente et aux rendez-vous à confirmer. Le calendrier, le canal et les conditions d’arrêt sont définis avec vous : une réponse ou un paiement peut interrompre la séquence. Les équipes retrouvent l’historique du suivi et interviennent lorsque le dossier le nécessite." },
          { slug: "synchronisation-crm", title: "Automatisation commerciale & CRM", lead: "L’automatisation CRM simplifie la gestion des prospects, opportunités et données clients pour fluidifier votre suivi commercial et garder vos informations à jour.", summary: "Automatisez la gestion de vos prospects, opportunités et données CRM. Vos équipes disposent d’informations toujours à jour pour mieux suivre leurs clients.", description: "L’automatisation commerciale et l’automatisation CRM relient vos formulaires, échanges clients et outils de vente. Elles permettent de créer ou mettre à jour les fiches prospects, d’attribuer les opportunités et de déclencher les tâches de suivi. Les règles de synchronisation et de détection des doublons sont adaptées à votre organisation pour conserver des données commerciales exploitables." },
          { slug: "administration-operations", title: "Administration & opérations internes", lead: "Automatisez les tâches administratives, validations, créations de dossiers et processus internes qui ralentissent vos équipes au quotidien.", summary: "Automatisez les tâches administratives qui ralentissent vos équipes. Création de dossiers, validations et processus internes peuvent suivre automatiquement vos règles.", description: "Nous automatisons les circuits administratifs qui passent aujourd’hui par des emails, fichiers et ressaisies : création de dossiers, demandes de validation, attribution de tâches ou notifications internes. Chaque étape suit les responsabilités et conditions propres à votre entreprise. Les exceptions restent visibles et les décisions qui nécessitent une approbation demeurent sous contrôle humain." },
          { slug: "tableaux-de-bord", title: "Données, rapports & tableaux de bord", lead: "Centralisez vos données et automatisez la mise à jour de vos tableaux de bord, indicateurs et rapports à partir de vos différents outils.", summary: "Centralisez vos données et automatisez la mise à jour de vos indicateurs. Vos rapports et tableaux de bord restent à jour sans compilation manuelle.", description: "Vos données sont regroupées depuis les outils pertinents pour alimenter des tableaux de bord et rapports métier. Nous définissons avec vous les indicateurs, les sources et la fréquence de mise à jour, puis automatisons la collecte et les calculs. Vos équipes consultent une vue cohérente de l’activité et peuvent repérer les écarts sans reconstruire leurs fichiers de reporting." },
          { slug: "portails-outils-internes", title: "Portails & outils métier automatisés", lead: "Créez des portails clients, outils internes et interfaces métier sur mesure pour centraliser vos données, automatisations et processus dans un seul environnement.", summary: "Créez des portails clients et outils internes adaptés à votre manière de travailler. Centralisez vos données, vos processus et vos automatisations dans un seul environnement.", description: "Un portail client ou un outil métier sur mesure rassemble les informations et actions utiles à un processus précis. Consultation de dossiers, dépôt de documents, suivi de demandes ou validations : l’interface est reliée à vos outils et automatisations. Les accès sont définis par rôle afin que chaque utilisateur dispose des informations nécessaires à son travail." },
        ],
      },
      {
        slug: "agents-ia",
        title: "Agents IA",
        lead: "Des assistants qui lisent, répondent et agissent sur vos données.",
        items: [
          { slug: "agent-telephonique", title: "Agent téléphonique IA", lead: "Un agent IA capable de répondre aux appels, comprendre les demandes, qualifier les prospects et prendre des rendez-vous automatiquement.", summary: "Accueillez les appels, qualifiez les demandes et préparez la prise de rendez-vous.", description: "Un agent téléphonique IA peut accueillir les appels, identifier le motif de la demande et recueillir les informations utiles avant un transfert ou une prise de rendez-vous. Les scénarios sont définis selon vos horaires, votre activité et les connexions possibles à votre agenda ou CRM. Les demandes complexes sont orientées vers un interlocuteur humain selon les règles convenues." },
          { slug: "agent-conversationnel", title: "Agent conversationnel IA", lead: "Un agent d’intelligence artificielle disponible sur votre site, WhatsApp ou par email pour répondre aux questions, guider vos clients et faciliter le support client.", summary: "Répondez aux questions clients sur votre site ou vos canaux de messagerie avec un agent IA.", description: "Un agent conversationnel IA accompagne vos visiteurs et clients sur les canaux retenus, comme votre site, WhatsApp ou l’email. Il répond à partir des informations que vous validez, guide vers les ressources utiles et peut déclencher des actions autorisées dans vos outils. Le périmètre des réponses et le passage au support client humain sont définis dès la conception." },
          { slug: "qualification-prospects", title: "Agent de qualification de prospects", lead: "Analysez automatiquement les demandes entrantes afin d’identifier les besoins, qualifier les prospects et aider vos équipes commerciales à prioriser les opportunités.", summary: "Analysez les demandes entrantes et aidez vos commerciaux à prioriser les prospects pertinents.", description: "Cet agent de qualification de prospects analyse les demandes entrantes et structure les informations utiles : besoin exprimé, contexte, délai et critères de votre équipe commerciale. Il aide à prioriser les opportunités et à préparer une réponse pertinente. Les critères sont explicites et ajustables ; vos équipes gardent la décision finale sur le traitement des prospects." },
          { slug: "assistant-documentaire", title: "Assistant documentaire IA", lead: "Interrogez vos documents, procédures et bases de connaissances grâce à un assistant IA capable de rechercher et synthétiser les informations utiles.", summary: "Retrouvez et synthétisez les informations de vos documents grâce à un assistant IA.", description: "Un assistant documentaire IA permet de rechercher une réponse dans vos documents, procédures et bases de connaissances en langage naturel. Il retrouve les passages pertinents et synthétise les informations, avec des références aux sources lorsque le contenu le permet. Le périmètre documentaire et les droits d’accès sont définis pour que les réponses restent adaptées aux utilisateurs autorisés." },
          { slug: "support-interne", title: "Agent de support interne IA", lead: "Aidez vos équipes à retrouver rapidement des procédures, informations métier et réponses internes à partir de votre documentation.", summary: "Aidez vos équipes à trouver les procédures et réponses utiles dans votre documentation interne.", description: "L’agent de support interne IA aide vos collaborateurs à retrouver les procédures, consignes et informations métier déjà présentes dans votre documentation. Il oriente vers la bonne ressource et peut préparer une demande pour l’équipe compétente lorsque la réponse manque. Cette assistance réduit les recherches répétitives tout en laissant les cas particuliers aux personnes responsables." },
          { slug: "agent-prospection", title: "Agent de prospection IA", lead: "Identifiez, analysez et qualifiez des entreprises ou prospects grâce à un agent IA conçu pour préparer et structurer votre prospection commerciale.", summary: "Identifiez des entreprises cibles et préparez votre prospection commerciale avec un agent IA.", description: "Un agent de prospection IA aide à repérer des entreprises correspondant à vos critères et à structurer les informations utiles à votre démarche commerciale. Il peut analyser les sources autorisées, préparer des fiches de qualification et proposer des angles de prise de contact. Les résultats sont soumis à vos contrôles ; les envois et décisions commerciales restent encadrés par vos règles." },
          { slug: "agent-email-demandes", title: "Agent email & demandes IA", lead: "Analysez automatiquement vos emails et demandes entrantes pour les classer, extraire les informations importantes et préparer les actions adaptées.", summary: "Classez les emails, extrayez les informations utiles et préparez des réponses à valider.", description: "Cet agent IA analyse le sens des emails et demandes entrantes pour en extraire les éléments utiles, proposer une catégorie et préparer la suite du traitement. Il peut résumer un échange, suggérer une réponse ou alimenter un dossier dans vos outils. Les messages sensibles ou incertains sont orientés vers une validation humaine selon les conditions définies avec votre équipe." },
          { slug: "agent-commercial", title: "Agent commercial IA", lead: "Un assistant IA pour résumer les échanges clients, préparer les rendez-vous, enrichir le CRM et suggérer les prochaines actions commerciales.", summary: "Résumez les échanges clients, préparez les rendez-vous et suggérez les prochaines actions commerciales.", description: "L’agent commercial IA accompagne vos équipes dans la préparation et le suivi des échanges clients. À partir des données autorisées, il peut résumer une conversation, préparer un rendez-vous, suggérer une mise à jour du CRM et proposer les prochaines actions. Les recommandations restent vérifiables et les engagements envers vos clients sont validés par vos commerciaux." },
        ],
      },
    ],
    /* Ce que chaque page de service dira. Rédigé à l'étape suivante, une
       prestation d'abord, puis les autres sur le même gabarit. */
    detailPlaceholder: "Le détail de cette prestation est en cours de rédaction.",
  },

  /* ------------------------------------------------------------------
     Les deux sections de la landing dont nous n'avons pas encore la
     matière. Leur place est réservée et leur intention écrite ; le contenu
     arrive quand il existe. Rien n'est inventé.

     ⚠ Ces blocs s'affichent en clair sur le site. Ils doivent être remplis
     ou retirés avant la mise en ligne — c'est un point bloquant du README.
     ------------------------------------------------------------------ */
  landing: {
    results: {
      eyebrow: "Résultats",
      title: "Ce que ça change,\n^en chiffres.",
      text: "Ici : des chiffres mesurés chez de vrais clients, chacun rattaché à un projet et à une date.",
      note: "Aucun chiffre tant qu'il n'est pas mesuré.",
    },
    tools: {
      eyebrow: "Outils gratuits",
      title: "Des outils à utiliser\n^sans nous parler.",
      text: "Ici : un ou deux outils libres d'accès, sans inscription. Un calculateur de temps administratif, une checklist de conformité.",
      note: "À construire. C'est ce qui fait trouver le site sans acheter de publicité.",
    },
  },
  hero: {
    titleLead: "Des processus plus intelligents",
    titleAccent: "grâce à l’automatisation et aux agents IA",
    subtitle:
      "Synode conçoit des solutions d’automatisation, des agents IA et des outils métier sur mesure pour connecter vos outils, automatiser les tâches répétitives et faire gagner du temps à vos équipes.",
    primaryCta: "Demander un audit",
    secondaryCta: "Voir nos réalisations",
    pillars: [
      { icon: "Zap", title: "Automatisation", text: "Vos outils connectés bout à bout, zéro double encodage." },
      { icon: "Bot", title: "Agents IA", text: "Ils lisent, qualifient et agissent sur vos données, 24/7." },
      { icon: "AppWindow", title: "Logiciels sur mesure", text: "Applications web, outils internes, portails, dashboards." },
      { icon: "ArrowLeftRight", title: "Site web & applications", text: "Une présence digitale sur mesure pour votre activité." },
    ],
    /* Decorative interface mock in the hero. It is hidden from screen
       readers, so none of this copy is ever read aloud: it exists to be
       looked at, and to show the shape of what the agency delivers. */
    /* ------------------------------------------------------------------
       Les trois systèmes du hero. Même structure, trois contenus : la barre
       latérale, le titre, le badge, trois étapes, deux cartes. Ils se jouent
       l'un après l'autre, puis la pile s'arrête sur le dernier.

       ⚠ Les trois valeurs `gainValue` sont des PLACEHOLDERS. Aucune n'est
       mesurée, et « +6 h / semaine » est le chiffre qu'affiche atta-ai.com.
       À remplacer par des valeurs constatées chez de vrais clients, ou à
       retirer, avant toute mise en ligne. Point bloquant n° 0 du README.
       ------------------------------------------------------------------ */
    systems: [
      {
        id: "demandes",
        appName: "Synode",
        badge: "Automatisé",
        nav: ["Demandes clients", "Devis & factures", "Planning", "Documents"],
        title: "Votre activité,\nplus simple avec Synode",
        steps: ["Demande reçue", "Devis envoyé", "Relance automatique"],
        caseLabel: "Exemple concret",
        caseText: "Un client demande un devis. Synode classe la demande, prépare le devis et relance automatiquement.",
        caseEmphasis: ["devis", "relance"],
        docLabel: "Devis",
        gainLabel: "Temps gagné",
        gainValue: "+6 h / semaine",
      },
      {
        id: "impayes",
        appName: "Synode",
        badge: "Suivi actif",
        nav: ["Factures en retard", "Relances", "Paiements", "Clients"],
        title: "Vos impayés,\nmieux suivis avec Synode",
        steps: ["Facture échue", "Relance envoyée", "Paiement suivi"],
        caseLabel: "Exemple concret",
        caseText: "Une facture dépasse l'échéance. Synode détecte le retard, envoie une relance et suit le paiement automatiquement.",
        caseEmphasis: ["relance", "suit le paiement"],
        docLabel: "Facture",
        gainLabel: "Temps gagné",
        gainValue: "+4 h / semaine",
      },
      {
        id: "planning",
        appName: "Synode",
        badge: "Organisé",
        nav: ["Rendez-vous", "Confirmations", "Disponibilités", "Notifications"],
        title: "Votre planning,\nplus fluide avec Synode",
        steps: ["Créneau choisi", "Rendez-vous confirmé", "Rappel envoyé"],
        caseLabel: "Exemple concret",
        caseText: "Un prospect choisit un créneau. Synode vérifie les disponibilités, confirme le rendez-vous et envoie le rappel automatiquement.",
        caseEmphasis: ["disponibilités", "rappel"],
        docLabel: "Agenda",
        gainLabel: "Temps gagné",
        gainValue: "+5 h / semaine",
      },
    ],
  },
  problem: {
    eyebrow: "Le constat",
    answerLabel: "Ce qu'on y répond",
    title: "L'automatisation et le digital avancent vite. ^Les entreprises, pas toujours.",
    intro:
      "Beaucoup de PME savent qu'il existe mieux, sans savoir ce qui peut réellement être automatisé,\nquels outils choisir, ni s'il faut acheter un logiciel ou en développer un.",
    /* Four columns, matching the design. The figures are illustrative and
       carry no source: see `stat.value`. */
    /* Trois constats, et chacun renvoie à la prestation précise qui le règle
       plutôt qu'à une famille entière. C'est ce qui fait la différence entre
       « on fait de l'automatisation » et « voici ce qu'on fait de votre
       problème ». Les `slug` pointent vers `/services/<slug>`. */
    items: [
      {
        title: "Trop de tâches manuelles",
        text: "Des heures perdues chaque semaine sur des tâches répétitives qui pourraient être automatisées.",
        answer: "Workflows & intégrations",
        slug: "workflows-integrations",
      },
      {
        title: "Des outils et données dispersés",
        text: "Informations éclatées, doubles encodages et logiciels qui ne communiquent pas.",
        answer: "Synchronisation CRM & données",
        slug: "synchronisation-crm",
      },
      {
        title: "Un suivi encore trop manuel",
        text: "Relances oubliées, dossiers qui stagnent et opportunités perdues.",
        answer: "Relances & suivis automatiques",
        slug: "relances-suivis",
      },
      {
        title: "Des demandes qui attendent",
        text: "Appels manqués, messages sans réponse et devis qui traînent : le client, lui, ne rappelle pas.",
        answer: "Agent téléphonique",
        slug: "agent-telephonique",
      },
    ],
  },
  offer: {
    eyebrow: "Notre offre",
    title: "Deux offres au cœur. ^Une troisième au besoin.",
    /** Set back in the title: it is not what we lead with. */
    titleSoft: "Une troisième au besoin.",
    subtitle: "La solution adaptée à votre problème, définie ensemble.",
    subtitleNote: "Tarifs sur devis.",
    resultLabel: "Résultat",
    secondaryLabel: "En complément",
    ctaPrimary: "Réserver un audit",
    ctaSecondary: "Discuter de votre projet",
    cards: [
      {
        icon: "Workflow",
        number: "01",
        title: "Automatisation & Agents IA",
        forWho: "Pour les entreprises qui perdent du temps dans des tâches manuelles et répétitives.",
        includes: [
          "Workflows & intégrations",
          "Agents & assistants IA",
          "Traitement de documents",
          "E-mails automatiques",
        ],
        result: "Moins de travail manuel, moins d'erreurs, plus de temps pour ce qui compte.",
      },
      {
        icon: "Blocks",
        number: "02",
        title: "Solutions sur mesure & Outils métier",
        forWho: "Pour les entreprises dont le besoin ne rentre dans aucun logiciel existant.",
        includes: [
          "Application web sur mesure",
          "Outil interne & portail client",
          "Tableau de bord",
          "Mise en place de CRM",
        ],
        result: "Un environnement de travail adapté à votre fonctionnement, plutôt que l'inverse.",
      },
      {
        icon: "Globe",
        number: "03",
        title: "Sites web & applications mobiles",
        forWho: "Pour celles dont la vitrine en ligne ne reflète plus le niveau de service.",
        includes: [
          "Site vitrine",
          "Application mobile",
          "Refonte & performance",
          "E-commerce",
        ],
        result: "Une présence en ligne à la hauteur de ce que vous livrez vraiment.",
      },
    ],
  },
  method: {
    eyebrow: "Méthode & qui nous aidons",
    title: "Nous aidons les entreprises à simplifier\nce qui les ralentit.",
    steps: [
      { title: "Audit & analyse", text: "Comprendre votre fonctionnement, vos outils et vos points de friction. Première heure offerte." },
      { title: "Recommandations", text: "Ce qui vaut la peine d'être automatisé, développé, connecté — ou laissé tel quel. Priorisé et chiffré." },
      { title: "Implémentation", text: "Nous construisons, intégrons et testons sur vos vraies données, avec démonstration à vos équipes." },
      { title: "Suivi & amélioration", text: "Nous vérifions que ça tient dans la durée, mesurons l'utilité réelle et faisons évoluer la solution." },
    ],
  },
  realisations: {
    eyebrow: "Réalisations & démonstrateurs",
    title: "Des systèmes qui tournent, ^pas des promesses.",
    titleAccent: "systèmes",
    filterCta: "Parler du vôtre",
    scrollCta: "Voir nos réalisations",
    videoPending: "Démo vidéo à venir",
    worksCount: "projets",
    worksPrev: "Projet précédent",
    worksNext: "Projet suivant",
    emptyCategory: "Les premières réalisations de cette catégorie arrivent bientôt. Parlez-nous de la vôtre, elle pourrait être la première publiée ici.",
    categories: [
      { id: "automation", label: "Automatisation & Agents IA", short: "Automatisation", icon: "Bot", note: "Les tâches répétitives passent à des agents qui travaillent seuls, sous votre contrôle." },
      { id: "software", label: "Logiciels sur mesure & Outils métier", short: "Logiciels", icon: "Code2", note: "Un outil taillé pour votre métier, là où les logiciels du marché ne suivent plus." },
      { id: "web", label: "Site web & applications mobiles", short: "Web & mobile", icon: "Smartphone", note: "Un site ou une application mobile qui tient la route et grandit avec vous." },
    ],
    body: "Des réalisations concrètes qui illustrent notre savoir-faire\nen automatisation, agents IA et développement sur mesure.",
    items: [
      { code: "D/01", category: "automation", short: "Boîte partagée", tag: "Tri, CRM et réponse IA", domain: "Automatisation & Agents IA", title: "Boîte partagée triée, qualifiée et répondue", desc: "Un agent lit les mails entrants d'une adresse info@, les classe, crée la fiche dans le CRM et rédige une réponse mise en attente de validation humaine.", result: "−3 h de tri par semaine · première réponse en 2 min" , video: "/demos/demo-inbox.mp4", poster: "/demos/poster-inbox.jpg" },
      { code: "D/02", category: "automation", short: "Assistant documentaire", tag: "Recherche sourcée", domain: "Automatisation & Agents IA", title: "Assistant interne sur 400 documents", desc: "Procédures, contrats et fiches techniques indexés. L'équipe pose sa question en langage naturel et reçoit une réponse sourcée, avec le passage exact.", result: "Aucune réponse sans source affichée" , video: "/demos/demo-assistant.mp4", poster: "/demos/poster-assistant.jpg" },
      { code: "D/07", category: "automation", short: "Relances d'impayés", tag: "Rappels automatiques", domain: "Automatisation & Agents IA", title: "Relances d'impayés, du rappel à l'encaissement", desc: "Les factures émises sont rapprochées des paiements reçus. Passée l'échéance, le rappel part seul, avec la bonne pièce jointe et le bon ton ; l'équipe n'intervient que sur les cas litigieux.", result: "Plus d'échéance oubliée, relance au bon moment" , video: "/demos/demo-dunning.mp4", poster: "/demos/poster-dunning.jpg" },
      { code: "D/03", category: "software", short: "Tableau de bord", tag: "Chiffres en direct", domain: "Solutions sur mesure", title: "Tableau de bord d'activité temps réel", desc: "Dossiers, échéances et marges agrégés depuis trois sources, rafraîchis en continu, avec alertes sur seuil, rôles par utilisateur et export comptable.", result: "Remplace une consolidation Excel hebdomadaire" , video: "/demos/demo-dashboard.mp4", poster: "/demos/poster-dashboard.jpg" },
      { code: "D/04", category: "software", short: "Devis automatisé", tag: "Du formulaire à la signature", domain: "Outils métier & CRM", title: "Du formulaire web au devis signé", desc: "Une demande arrive, est qualifiée, chiffrée selon vos règles, transformée en PDF, envoyée pour signature et poussée dans le CRM. Relance automatique à J+3.", result: "Devis envoyé en minutes, plus en jours" , video: "/demos/demo-quote.mp4", poster: "/demos/poster-quote.jpg" },
      { code: "D/05", category: "web", short: "Site vitrine", tag: "Vitrine sur mesure", domain: "Site web & applications", title: "Site vitrine rapide et évolutif", desc: "Un site construit page par page avec le client : contenu structuré, formulaire connecté à la boîte mail et au CRM, et des pages qui se chargent en moins d'une seconde sur mobile.", result: "Chargé en moins d'une seconde sur mobile" , video: "/demos/demo-site.mp4", poster: "/demos/poster-site.jpg" },
      { code: "D/06", category: "web", short: "Application mobile", tag: "Terrain, même hors ligne", domain: "Site web & applications", title: "Application mobile pour équipe terrain", desc: "Les interventions, photos et signatures sont saisies sur le téléphone, même sans réseau, puis synchronisées dès le retour de connexion et visées depuis le bureau.", result: "Saisie hors ligne, synchronisée au retour du réseau" , video: "/demos/demo-mobile.mp4", poster: "/demos/poster-mobile.jpg" },
    ],
    cta: {
      title: "Le prochain système montré ici sera peut-être le vôtre.",
      body: "Les projets de lancement bénéficient d'un tarif préférentiel, en échange du droit de les présenter ici une fois livrés.",
      button: "En discuter",
      steps: [
        { label: "Votre projet", sub: "cadré avec vous" },
        { label: "Tarif préférentiel", sub: "en échange de la vitrine" },
        { label: "Présenté ici", sub: "une fois livré, si vous l'acceptez" },
      ],
    },
  },
  team: {
    eyebrow: "L'équipe",
    /* Le second retour n'est rendu que sous 768px (voir team.tsx) : sur
       téléphone le titre tient sur trois lignes, sur desktop sur deux.
       L'espace avant « un » est ce qui recolle la ligne quand le <br>
       est masqué. */
    title: "La team Synode. ^Deux expertises, un même objectif.",
    /** The word the title turns brand blue. */
    titleAccent: "Synode",
    body: "Deux profils complémentaires pour transformer vos besoins en automatisations, outils et solutions digitales sur mesure.",
    position: "Co-fondateur",
    members: [
      {
        name: "Killian",
        photo: "/equipe/KillianEquipe.webp",
        photoSize: { width: 1100, height: 971 },
        role: "Développeur & Expert IA",
        badge: { label: "Concevoir", sub: "des idées durables" },
        text: "Développement des applications, outils internes et intégrations : il construit ce qui n'existe pas encore et connecte ce que vous avez déjà.",
      },
      {
        name: "Antonino",
        photo: "/equipe/AntoEquipe.webp",
        photoSize: { width: 1100, height: 1100 },
        role: "Développeur & Expert IA",
        badge: { label: "Automatiser", sub: "et faire grandir" },
        text: "Conception des workflows et des agents : il cartographie vos processus, choisit ce qui vaut la peine d'être automatisé et le met en production.",
      },
    ],
    values: [
      { label: "Esprit", strong: "collaboratif" },
      { label: "Vision", strong: "long terme" },
      { label: "Solutions", strong: "concrètes" },
      { label: "Passion", strong: "du développement" },
    ],
  },
  audience: {
    eyebrow: "Qui nous aidons",
    title: "Les entreprises qui n'ont pas d'équipe IT.",
    body: "Synode accompagne les entreprises et les indépendants qui perdent du temps dans l'administratif, jonglent avec plusieurs outils et ne savent pas toujours quoi automatiser, connecter ou développer en priorité.",
    rulesTitle: "Nos règles",
    rules: [
      "Comprendre le métier avant de proposer une technologie.",
      "Pas de sur-mesure quand un outil existant suffit.",
      "Périmètre écrit, prix fixe, aucune facturation surprise.",
      "Le code et les données vous appartiennent.",
    ],
  },
  ctaBand: {
    title: "Une heure pour voir ce qui\npeut changer.",
    titleAccent: "changer.",
    body: "Nous chiffrons après l'audit, quand le périmètre est clair\net le gain estimé.",
    button: "Réserver l'audit gratuit",
    note: "Un échange d'une heure, gratuit et sans engagement,\ndont vous repartez avec un premier avis écrit.",
    diagram: {
      call: "Un échange d'une heure",
      slot: "Choisissez un créneau",
      result: "Des pistes concrètes",
      markAlt: "Synode",
    },
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Ce qu'on nous demande avant de signer.",
    body: "Les mêmes questions reviennent toujours.\nVoici l'essentiel avant notre premier échange.",
    items: [
      {
        q: "Combien de temps avant que ça tourne vraiment ?",
        a: "L'audit dure une heure. Ensuite, comptez quatre semaines minimum avant une première mise en production. Un outil sur mesure demande plus : le périmètre et le délai sont écrits avant de commencer, pas découverts en route.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Nous ne chiffrons pas avant l'audit : tant que le périmètre n'est pas clair, un prix serait inventé. Ensuite c'est un devis à prix fixe sur un périmètre écrit, pas une facturation à l'heure qui dérive.",
      },
      {
        q: "Faut-il changer nos outils actuels ?",
        a: "Non, et c'est rarement souhaitable. Nous nous connectons à ce que vous utilisez déjà. Le sur-mesure n'arrive que quand aucun outil existant ne fait le travail.",
      },
      {
        q: "Où vont nos données, et servent-elles à entraîner une IA ?",
        a: "Vos données restent les vôtres, le code livré aussi. Quand un modèle d'IA est nécessaire, nous passons par des offres professionnelles qui n'entraînent pas leurs modèles sur vos contenus, et nous vous disons précisément ce qui sort de chez vous.",
      },
      {
        q: "Vous démarrez votre activité : pourquoi vous confier un projet ?",
        a: "Vous parlez directement aux deux personnes qui conçoivent et développent, sans couche commerciale entre vous et le travail. Nos démonstrateurs sont fonctionnels et se montrent en visio. Et les projets de lancement bénéficient d'un tarif préférentiel.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Dites-nous ce qui vous fait\nperdre du temps.",
    titleAccent: "perdre du temps.",
    stats: [
      { label: "E-mail", value: "contact@synode-agency.com" },
    ],
    body: "Réponse sous 24 h ouvrées,\navec un avis honnête sur votre besoin.",
    info: [
      { label: "E-mail", value: "contact@synode-agency.com", href: "mailto:contact@synode-agency.com" },
      { label: "Téléphone", value: "+32 487 30 18 90", href: "tel:+32487301890" },
      { label: "Premier échange", value: "Audit d'une heure, gratuit", href: "" },
    ],
    timelines: ["Urgent — 1 mois", "Sous 3 mois", "Sous 6 mois", "Pas encore de date"],
    form: {
      lastName: "Nom",
      firstName: "Prénom",
      email: "E-mail professionnel",
      phone: "Numéro de téléphone",
      timeline: "Délai souhaité",
      message: "Le problème à résoudre",
      messagePlaceholder: "Décrivez brièvement votre fonctionnement actuel et ce qui pourrait être amélioré.",
      sending: "Envoi…",
      sentTitle: "Demande envoyée",
      errLastName: "Indiquez votre nom.",
      errFirstName: "Indiquez votre prénom.",
      errEmail: "Indiquez votre e-mail.",
      errEmailInvalid: "Cet e-mail semble invalide.",
      errPhone: "Indiquez un numéro de téléphone.",
      errMessage: "Décrivez le problème en quelques mots (10 caractères min.).",
    },
    submit: "Envoyer la demande",
    note: "Vos informations servent uniquement à traiter votre demande : aucune newsletter,\naucune revente, aucune conservation en base de données.",
    success: "Merci, votre demande est bien reçue. Nous revenons vers vous sous 24 h ouvrées.",
    error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
  },
} as const;

const en = {
  locale: "en" as Locale,
  htmlLang: "en",
  site: {
    name: "Synode",
    email: "contact@synode-agency.com",
    location: "Brussels, Belgium",
    vat: "BE 0000.000.000",
    nav: nav.en,
    ctaLabel: "Book an audit",
    homeLabel: "Synode, home",
    menuOpen: "Open the menu",
    menuClose: "Close the menu",
    tagline: "Automation, AI agents and custom solutions for SMEs.",
  },

  /* See the French block above for how this is structured. Slugs are shared
     between both languages on purpose. */
  services: {
    eyebrow: "Our services",
    title: "Sixteen ways to give you your time back.",
    titleAccent: "give you your time back",
    body: "Two families, sixteen services. Each one solves a specific kind of wasted time, and each one has its own page.",
    countLabel: "services",
    familyLabel: "Family",
    detailEyebrow: "Service",
    backLabel: "All services",
    ctaLabel: "Book an audit",
    families: [
      {
        slug: "automatisation",
        title: "Automation",
        lead: "Your tools talk to each other, and the repetitive work disappears.",
        items: [
          { slug: "workflows-integrations", title: "Process automation & integrations", lead: "Connect your software and automate business processes to eliminate duplicate entry and move data automatically between your tools.", summary: "Connect your software and automate business processes to eliminate duplicate entry.", description: "Connect your software around real business events: a new customer, an order or a case update. Integrations use available APIs and your business rules, with checks to detect synchronisation errors. Reduce duplicate entry while keeping control over the workflow." },
          { slug: "traitement-documents", title: "Documents, quotes & invoicing", lead: "Automate document, quote and invoice processing: extract data, generate files, organise them and send them according to your business rules.", summary: "Automate document processing, quote creation and invoicing workflows.", description: "Automate repetitive work around quotes, invoices and supporting documents. Extract and check key data before sending it to your management tools, and generate, file or send documents according to your rules. Keep human approval before sending or when information needs confirmation." },
          { slug: "emails-demandes", title: "Emails, requests & communication", lead: "Automate the sorting and routing of emails, forms and customer requests, and trigger the right actions.", summary: "Sort emails and customer requests, then trigger the right actions in your tools.", description: "Centralise requests from email inboxes and forms. Sort and route messages by topic, source or submitted information, then create the appropriate follow-up task. Structure customer communication without manually moving every piece of information between tools." },
          { slug: "relances-suivis", title: "Follow-ups, appointments & reminders", lead: "Automate reminders and follow-ups for quotes, invoices, payments, appointments and pending cases.", summary: "Schedule quote follow-ups, payment reminders and appointment notifications.", description: "Build follow-up sequences for unanswered quotes, pending invoices and appointments. Define timing, channels and stop conditions together: a reply or payment can end a sequence. Your team keeps access to the history and handles cases that need personal attention." },
          { slug: "synchronisation-crm", title: "Sales & CRM automation", lead: "Automate lead, opportunity and CRM data management to simplify sales follow-up and keep your records current.", summary: "Connect sales tools to your CRM to keep leads and opportunities up to date.", description: "Connect forms, customer conversations and sales tools to create or update CRM records, assign opportunities and trigger follow-up tasks. Synchronisation and duplicate detection follow your organisation’s rules. Keep useful sales data available without repetitive manual updates." },
          { slug: "administration-operations", title: "Administration & internal operations", lead: "Automate administrative tasks, approvals, case creation and internal processes that slow your teams down.", summary: "Automate approvals, case creation and repetitive administrative tasks.", description: "Automate administrative workflows such as case creation, approval requests, task assignment and internal notifications. Each step follows your responsibilities and business conditions. Exceptions remain visible, and decisions requiring approval stay under human control." },
          { slug: "tableaux-de-bord", title: "Data, reports & dashboards", lead: "Centralise your data and automatically update dashboards, metrics and reports from your different tools.", summary: "Centralise data and automatically refresh metrics, reports and dashboards.", description: "Bring relevant data sources together to populate business dashboards and reports. Define metrics, sources and refresh schedules, then automate collection and calculations. Teams get a consistent view of activity without rebuilding reporting spreadsheets." },
          { slug: "portails-outils-internes", title: "Automated portals & business tools", lead: "Build custom client portals, internal tools and business interfaces to bring data, automation and processes together.", summary: "Bring data and processes together in a custom client portal or business tool.", description: "Create a custom client portal or business tool around a specific workflow. Case tracking, document uploads, requests and approvals connect to your existing software and automations. Role-based access gives each user the information needed for their work." },
        ],
      },
      {
        slug: "agents-ia",
        title: "AI agents",
        lead: "Assistants that read, answer and act on your data.",
        items: [
          { slug: "agent-telephonique", title: "AI voice agent", lead: "An AI agent that answers calls, understands requests, qualifies leads and books appointments automatically.", summary: "Answer calls, qualify requests and help customers book appointments.", description: "An AI voice agent can answer calls, identify the request and collect useful information before transferring the caller or booking an appointment. Scenarios reflect your hours, business and available calendar or CRM integrations. Complex requests go to a human under agreed rules." },
          { slug: "agent-conversationnel", title: "AI conversational agent", lead: "An AI agent on your website, WhatsApp or email to answer questions, guide customers and support customer service.", summary: "Answer customer questions on your website or messaging channels with an AI agent.", description: "An AI conversational agent guides customers on selected channels such as your website, WhatsApp or email. It uses approved information, points to useful resources and can trigger authorised actions in your tools. Define answer boundaries and handover to human customer support from the start." },
          { slug: "qualification-prospects", title: "Lead qualification agent", lead: "Analyse incoming requests to identify needs, qualify leads and help your sales team prioritise opportunities.", summary: "Analyse incoming enquiries and help sales teams prioritise relevant leads.", description: "Analyse incoming enquiries and organise the information your sales team needs: requirements, context, timing and qualification criteria. Help prioritise opportunities and prepare relevant responses. Criteria remain explicit and adjustable, with final decisions made by your team." },
          { slug: "assistant-documentaire", title: "AI document assistant", lead: "Search your documents, procedures and knowledge bases with an AI assistant that finds and summarises useful information.", summary: "Find and summarise information in your documents with an AI assistant.", description: "Search documents, procedures and knowledge bases using natural language. The assistant retrieves relevant passages and summarises information with source references where the content allows. Define the document scope and access rights for authorised users." },
          { slug: "support-interne", title: "AI internal support agent", lead: "Help your teams quickly find procedures, business information and internal answers in your documentation.", summary: "Help teams find procedures and answers in your internal documentation.", description: "Help employees find procedures, guidance and business information in your internal documentation. The agent points to the right resource and can prepare a request for the relevant team when an answer is missing. Specific cases remain with the responsible people." },
          { slug: "agent-prospection", title: "AI prospecting agent", lead: "Identify, analyse and qualify companies or leads with an AI agent that prepares and structures your sales prospecting.", summary: "Identify target companies and prepare sales prospecting with an AI agent.", description: "Identify companies matching your criteria and organise information for sales prospecting. The agent can analyse authorised sources, prepare qualification records and suggest contact angles. Your team reviews results, with outreach and sales decisions governed by your rules." },
          { slug: "agent-email-demandes", title: "AI email & request agent", lead: "Automatically analyse incoming emails and requests to categorise them, extract key information and prepare the right actions.", summary: "Sort emails, extract key information and prepare replies for review.", description: "Analyse the meaning of incoming emails and requests to extract key information, suggest a category and prepare next steps. Summarise conversations, draft replies or populate records in your tools. Sensitive or uncertain messages go through human review under agreed conditions." },
          { slug: "agent-commercial", title: "AI sales agent", lead: "An AI assistant to summarise customer conversations, prepare meetings, enrich your CRM and suggest next sales actions.", summary: "Summarise customer conversations, prepare meetings and suggest next sales actions.", description: "Help sales teams prepare and follow up on customer conversations. Using authorised data, the assistant can summarise exchanges, prepare meetings, suggest CRM updates and propose next actions. Recommendations remain reviewable, and customer commitments are approved by your team." },
        ],
      },
    ],
    detailPlaceholder: "The detail of this service is being written.",
  },

  /* See the French block. Same three reserved sections. */
  landing: {
    results: {
      eyebrow: "Results",
      title: "What it changes,\n^in numbers.",
      text: "Here: figures measured at real clients, each tied to a project and a date.",
      note: "No figure until it is measured.",
    },
    tools: {
      eyebrow: "Free tools",
      title: "Tools you can use\n^without talking to us.",
      text: "Here: one or two openly available tools, no sign-up. An admin-time calculator, a compliance checklist.",
      note: "To be built. This is what gets the site found without buying ads.",
    },
  },
  hero: {
    titleLead: "The agency that puts AI to work",
    titleAccent: "for your business.",
    subtitle:
      "Process automation, AI agents plugged into your data, and custom software and business tools. We measure the payoff before writing a line of code.",
    primaryCta: "Request an audit",
    secondaryCta: "See our work",
    pillars: [
      { icon: "Zap", title: "Automation", text: "Your tools wired end to end, zero double entry." },
      { icon: "Bot", title: "AI agents", text: "They read, qualify and act on your data, 24/7." },
      { icon: "AppWindow", title: "Custom software", text: "Web apps, internal tools, portals, dashboards." },
      { icon: "ArrowLeftRight", title: "Websites & applications", text: "A digital presence tailored to your business." },
    ],
    /* See the French block for how this is structured, and for the warning
       on the three `gainValue` placeholders. */
    systems: [
      {
        id: "demandes",
        appName: "Synode",
        badge: "Automated",
        nav: ["Client requests", "Quotes & invoices", "Schedule", "Documents"],
        title: "Your business,\nsimpler with Synode",
        steps: ["Request received", "Quote sent", "Automatic follow-up"],
        caseLabel: "A concrete example",
        caseText: "A client asks for a quote. Synode files the request, drafts the quote and follows up on its own.",
        caseEmphasis: ["quote", "follows up"],
        docLabel: "Quote",
        gainLabel: "Time saved",
        gainValue: "+6 h / week",
      },
      {
        id: "impayes",
        appName: "Synode",
        badge: "Tracking on",
        nav: ["Overdue invoices", "Reminders", "Payments", "Clients"],
        title: "Your unpaid invoices,\ntracked with Synode",
        steps: ["Invoice overdue", "Reminder sent", "Payment tracked"],
        caseLabel: "A concrete example",
        caseText: "An invoice goes past its due date. Synode spots the delay, sends a reminder and tracks the payment on its own.",
        caseEmphasis: ["reminder", "tracks the payment"],
        docLabel: "Invoice",
        gainLabel: "Time saved",
        gainValue: "+4 h / week",
      },
      {
        id: "planning",
        appName: "Synode",
        badge: "Organised",
        nav: ["Appointments", "Confirmations", "Availability", "Notifications"],
        title: "Your schedule,\nsmoother with Synode",
        steps: ["Slot picked", "Appointment confirmed", "Reminder sent"],
        caseLabel: "A concrete example",
        caseText: "A prospect picks a slot. Synode checks availability, confirms the appointment and sends the reminder on its own.",
        caseEmphasis: ["availability", "reminder"],
        docLabel: "Calendar",
        gainLabel: "Time saved",
        gainValue: "+5 h / week",
      },
    ],
  },
  problem: {
    eyebrow: "The situation",
    answerLabel: "What we answer with",
    title: "Automation and digital technology move fast. Companies, not always.",
    intro:
      "Plenty of SMEs know there's a better way, without knowing what can actually be automated, which tools to pick, or whether to buy software or build it.",
    items: [
      {
        title: "Too many manual tasks",
        text: "Hours lost every week on repetitive tasks that could be automated.",
        answer: "Workflows & integrations",
        slug: "workflows-integrations",
      },
      {
        title: "Scattered tools and data",
        text: "Information split across systems, double entry, and software that doesn't talk to each other.",
        answer: "CRM & data sync",
        slug: "synchronisation-crm",
      },
      {
        title: "Follow-up still too manual",
        text: "Forgotten reminders, stalled files and lost opportunities.",
        answer: "Automatic follow-ups",
        slug: "relances-suivis",
      },
      {
        title: "Requests left waiting",
        text: "Missed calls, unanswered messages and quotes that drag on. The client does not call back.",
        answer: "Voice agent",
        slug: "agent-telephonique",
      },
    ],
  },
  offer: {
    eyebrow: "What we offer",
    title: "Two core offers. A third when you need it.",
    titleSoft: "A third when you need it.",
    subtitle: "The right solution for your problem, defined together.",
    subtitleNote: "Priced on quote.",
    resultLabel: "Outcome",
    secondaryLabel: "On the side",
    ctaPrimary: "Book an audit",
    ctaSecondary: "Talk about your project",
    cards: [
      {
        icon: "Workflow",
        number: "01",
        title: "Automation & AI agents",
        forWho: "For companies losing time on manual, repetitive tasks.",
        includes: [
          "Workflows & integrations",
          "AI agents & assistants",
          "Document processing",
          "Automated e-mails",
        ],
        result: "Less manual work, fewer errors, more time for what matters.",
      },
      {
        icon: "Blocks",
        number: "02",
        title: "Custom solutions & business tools",
        forWho: "For companies whose needs don't fit any existing software.",
        includes: [
          "Custom web application",
          "Internal tool & client portal",
          "Dashboard",
          "CRM setup",
        ],
        result: "A work environment that fits how you operate, instead of the other way around.",
      },
      {
        icon: "Globe",
        number: "03",
        title: "Websites & mobile apps",
        forWho: "For those whose online presence no longer matches the level of service.",
        includes: [
          "Marketing site",
          "Mobile application",
          "Rebuild & performance",
          "E-commerce",
        ],
        result: "An online presence that matches what you actually deliver.",
      },
    ],
  },
  method: {
    eyebrow: "Method & who we help",
    title: "We help companies simplify\nwhat slows them down.",
    steps: [
      { title: "Audit & analysis", text: "Understand how you work, your tools and your friction points. First hour on us." },
      { title: "Recommendations", text: "What's worth automating, building, connecting — or leaving as is. Prioritised and quoted." },
      { title: "Implementation", text: "We build, integrate and test on your real data, with a walkthrough for your teams." },
      { title: "Follow-up & improvement", text: "We check it holds up over time, measure real usefulness and evolve the solution." },
    ],
  },
  realisations: {
    eyebrow: "Work & demonstrators",
    title: "Systems that run,\nnot promises.",
    titleAccent: "Systems",
    filterCta: "Talk about yours",
    scrollCta: "See our work",
    videoPending: "Demo video coming",
    worksCount: "projects",
    worksPrev: "Previous project",
    worksNext: "Next project",
    emptyCategory: "The first projects in this category are on their way. Tell us about yours — it could be the first one published here.",
    categories: [
      { id: "automation", label: "Automation & AI agents", short: "Automation", icon: "Bot", note: "Repetitive work handed to agents that run on their own, under your control." },
      { id: "software", label: "Custom software & business tools", short: "Software", icon: "Code2", note: "A tool cut for your trade, where off-the-shelf software stops following." },
      { id: "web", label: "Websites & mobile apps", short: "Web & mobile", icon: "Smartphone", note: "A site or a mobile app that holds up and grows with you." },
    ],
    body: "Concrete projects that show what we do\nin automation, AI agents and custom development.",
    items: [
      { code: "D/01", category: "automation", short: "Shared inbox", tag: "Sorting, CRM and AI reply", domain: "Automation & AI agents", title: "Shared inbox sorted, qualified and answered", desc: "An agent reads incoming mail from an info@ address, classifies it, creates the CRM record and drafts a reply held for human approval.", result: "−3 h of sorting per week · first reply in 2 min" , video: "/demos/demo-inbox.mp4", poster: "/demos/poster-inbox.jpg" },
      { code: "D/02", category: "automation", short: "Document assistant", tag: "Sourced search", domain: "Automation & AI agents", title: "Internal assistant over 400 documents", desc: "Procedures, contracts and spec sheets indexed. The team asks in plain language and gets a sourced answer, with the exact passage.", result: "No answer without a shown source" , video: "/demos/demo-assistant.mp4", poster: "/demos/poster-assistant.jpg" },
      { code: "D/07", category: "automation", short: "Payment chasing", tag: "Automatic reminders", domain: "Automation & AI agents", title: "Unpaid invoices, from reminder to payment", desc: "Issued invoices are matched against incoming payments. Past the due date the reminder goes out on its own, with the right attachment and the right tone; the team only steps in on disputed cases.", result: "No missed due date, chased at the right time" , video: "/demos/demo-dunning.mp4", poster: "/demos/poster-dunning.jpg" },
      { code: "D/03", category: "software", short: "Activity dashboard", tag: "Live figures", domain: "Custom software", title: "Real-time activity dashboard", desc: "Cases, deadlines and margins aggregated from three sources, refreshed continuously, with threshold alerts, per-user roles and accounting export.", result: "Replaces a weekly Excel consolidation" , video: "/demos/demo-dashboard.mp4", poster: "/demos/poster-dashboard.jpg" },
      { code: "D/04", category: "software", short: "Automated quote", tag: "From form to signature", domain: "Business tools & CRM", title: "From web form to signed quote", desc: "A request comes in, gets qualified, priced against your rules, turned into a PDF, sent for signature and pushed to the CRM. Automatic follow-up at D+3.", result: "Quote sent in minutes, not days" , video: "/demos/demo-quote.mp4", poster: "/demos/poster-quote.jpg" },
      { code: "D/05", category: "web", short: "Marketing site", tag: "Custom marketing site", domain: "Websites & apps", title: "A fast, scalable marketing site", desc: "A site built page by page with the client: structured content, a form wired to the inbox and the CRM, and pages that load in under a second on mobile.", result: "Loads in under a second on mobile" , video: "/demos/demo-site.mp4", poster: "/demos/poster-site.jpg" },
      { code: "D/06", category: "web", short: "Mobile app", tag: "Field work, even offline", domain: "Websites & apps", title: "Mobile app for field teams", desc: "Jobs, photos and signatures are captured on the phone, offline if needed, then synced as soon as the connection is back and signed off from the office.", result: "Offline capture, synced when the network returns" , video: "/demos/demo-mobile.mp4", poster: "/demos/poster-mobile.jpg" },
    ],
    cta: {
      title: "The next system shown here could be yours.",
      body: "Launch projects get preferential pricing, in exchange for the right to feature them here once delivered.",
      button: "Let's talk",
      steps: [
        { label: "Your project", sub: "scoped with you" },
        { label: "Preferential pricing", sub: "in exchange for the showcase" },
        { label: "Shown here", sub: "once delivered, if you agree" },
      ],
    },
  },
  team: {
    eyebrow: "The team",
    title: "The Synode team.\nTwo skill sets, one goal.",
    titleAccent: "Synode",
    body: "Two complementary profiles to turn your needs into automations, tools and custom digital solutions.",
    position: "Co-founder",
    members: [
      {
        name: "Killian",
        photo: "/equipe/KillianEquipe.webp",
        photoSize: { width: 1100, height: 971 },
        role: "Developer & AI expert",
        badge: { label: "Design", sub: "things that last" },
        text: "Application, internal tool and integration development: he builds what doesn't exist yet and connects what you already have.",
      },
      {
        name: "Antonino",
        photo: "/equipe/AntoEquipe.webp",
        photoSize: { width: 1100, height: 1100 },
        role: "Developer & AI expert",
        badge: { label: "Automate", sub: "and scale up" },
        text: "Workflow and agent design: he maps your processes, picks what is worth automating and ships it to production.",
      },
    ],
    values: [
      { label: "Collaborative", strong: "mindset" },
      { label: "Long-term", strong: "vision" },
      { label: "Concrete", strong: "solutions" },
      { label: "Passion for", strong: "development" },
    ],
  },
  audience: {
    eyebrow: "Who we help",
    title: "Companies with no IT team.",
    body: "Synode works with companies and independents who lose time on admin, juggle several tools and don't always know what to automate, connect or build first.",
    rulesTitle: "Our rules",
    rules: [
      "Understand the business before proposing a technology.",
      "No custom build when an existing tool will do.",
      "Scope in writing, fixed price, no surprise invoicing.",
      "The code and the data belong to you.",
    ],
  },
  ctaBand: {
    title: "One hour to see\nwhat could change.",
    titleAccent: "change.",
    body: "We quote after the audit, once the scope is clear\nand the gain estimated.",
    button: "Book the free audit",
    note: "A one-hour conversation, free and with no commitment,\nthat you leave with a first written take.",
    diagram: {
      call: "A one-hour conversation",
      slot: "Pick a slot",
      result: "Concrete leads",
      markAlt: "Synode",
    },
  },
  faq: {
    eyebrow: "Frequently asked",
    title: "What people ask us before signing.",
    body: "The same questions always come up.\nHere is what matters before we first talk.",
    items: [
      {
        q: "How long before it actually runs?",
        a: "The audit takes one hour. After that, count four weeks minimum before a first system goes live. A custom tool takes longer: the scope and the deadline are written down before we start, not discovered along the way.",
      },
      {
        q: "What does it cost?",
        a: "We don't quote before the audit: as long as the scope is unclear, any price would be made up. After that it's a fixed-price quote on a written scope, not hourly billing that drifts.",
      },
      {
        q: "Do we have to replace our current tools?",
        a: "No, and it's rarely a good idea. We connect to what you already use. Custom work only happens when no existing tool does the job.",
      },
      {
        q: "Where does our data go, and is it used to train an AI?",
        a: "Your data stays yours, and so does the code we deliver. When an AI model is needed, we use professional tiers that don't train their models on your content, and we tell you exactly what leaves your systems.",
      },
      {
        q: "You're just starting out: why trust you with a project?",
        a: "You talk straight to the two people who design and build it, with no sales layer between you and the work. Our demos are working systems and we walk you through them on a call. And launch projects get preferential pricing.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what's\neating your time.",
    titleAccent: "eating your time.",
    stats: [
      { label: "E-mail", value: "contact@synode-agency.com" },
    ],
    body: "Reply within one business day, with an honest first take:\nif your need doesn't warrant a build, we'll say so.",
    info: [
      { label: "E-mail", value: "contact@synode-agency.com", href: "mailto:contact@synode-agency.com" },
      { label: "Phone", value: "+32 487 30 18 90", href: "tel:+32487301890" },
      { label: "First call", value: "One-hour audit, free", href: "" },
    ],
    timelines: ["Urgent — 1 month", "Within 3 months", "Within 6 months", "No date yet"],
    form: {
      lastName: "Last name",
      firstName: "First name",
      email: "Work e-mail",
      phone: "Phone number",
      timeline: "Timeline",
      message: "The problem to solve",
      messagePlaceholder: "Briefly describe your current setup and what could be improved.",
      sending: "Sending…",
      sentTitle: "Request sent",
      errLastName: "Please enter your last name.",
      errFirstName: "Please enter your first name.",
      errEmail: "Please enter your e-mail.",
      errEmailInvalid: "That e-mail looks invalid.",
      errPhone: "Please enter a phone number.",
      errMessage: "Describe the problem in a few words (10 characters min.).",
    },
    submit: "Send request",
    note: "Your information is only used to handle your request: no newsletter,\nno resale, nothing stored in a database.",
    success: "Thanks, your request is in. We'll get back to you within one business day.",
    error: "Something went wrong. Try again or e-mail us directly.",
  },
} as const;

export const content = { fr, en };
export type Content = typeof fr;

export function getContent(locale: Locale): Content {
  return content[locale] as Content;
}

export const homePath = (locale: Locale) => (locale === "fr" ? "/" : "/en");
