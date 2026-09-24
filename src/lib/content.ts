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

const nav = {
  fr: [
    { href: "/", label: "Accueil" },
    { href: "/#offre", label: "Offre" },
    { href: "/realisations", label: "Réalisations" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en#offre", label: "Offer" },
    { href: "/en/realisations", label: "Work" },
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
    ctaLabel: "Nous contacter",
    homeLabel: "Synode, accueil",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    tagline: "Automatisation, agents IA et solutions sur mesure pour les PME.",
  },
  hero: {
    titleLead: "L'agence qui fait travailler l'IA",
    titleAccent: "pour votre business.",
    subtitle:
      "L'agence Synode automatise vos processus, les agents IA branchés sur vos données, développe vos logiciels et outils métier sur mesure. Nous simplifions votre quotidien.",
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
    mock: {
      appName: "Synode",
      nav: ["Accueil", "Projets", "Automatisations", "Agents IA", "Applications", "CRM", "Analyses"],
      status: "Projet en cours",
      title: "Votre projet, de l'idée aux résultats",
      steps: [
        "Besoin\nmétier",
        "Automatisation\ndes processus",
        "Agents IA\nsur vos données",
        "Logiciel /\nApplication",
        "Résultats\nmesurables",
      ],
      caseLabel: "Exemple de projet type",
      caseQuote: "\u201C80 % de tâches administratives automatisées en 3 mois.\u201D",
      caseTags: ["Automatisation", "Agents IA", "CRM"],
      chartLabel: "Productivité",
      chartValue: "+80 %",
    },
  },
  problem: {
    eyebrow: "Le constat",
    answerLabel: "Ce qu'on y répond",
    title: "L'automatisation et le digital avancent vite. ^Les entreprises, pas toujours.",
    intro:
      "Beaucoup de PME savent qu'il existe mieux, sans savoir ce qui peut réellement être automatisé,\nquels outils choisir, ni s'il faut acheter un logiciel ou en développer un.",
    /* Four columns, matching the design. The figures are illustrative and
       carry no source: see `stat.value`. */
    items: [
      {
        title: "Trop de tâches manuelles",
        text: "Des heures perdues chaque semaine sur des tâches répétitives qui pourraient être automatisées.",
        answer: "Automatisation & Agents IA",
      },
      {
        title: "Des outils et données dispersés",
        text: "Informations éclatées, doubles encodages et logiciels qui ne communiquent pas.",
        answer: "Solutions sur mesure",
      },
      {
        title: "Un suivi encore trop manuel",
        text: "Relances oubliées, dossiers qui stagnent et opportunités perdues.",
        answer: "Automatisation & Agents IA",
      },
      {
        title: "Une présence digitale en retrait",
        text: "Un site vieillissant ou des services en ligne limités ne reflètent plus votre savoir-faire.",
        answer: "Sites web & applications",
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
    ctaLabel: "Get in touch",
    homeLabel: "Synode, home",
    menuOpen: "Open the menu",
    menuClose: "Close the menu",
    tagline: "Automation, AI agents and custom solutions for SMEs.",
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
    mock: {
      appName: "Synode",
      nav: ["Home", "Projects", "Automations", "AI agents", "Applications", "CRM", "Analytics"],
      status: "Project running",
      title: "Your project, from idea to results",
      steps: [
        "Business\nneed",
        "Process\nautomation",
        "AI agents\non your data",
        "Software /\nApplication",
        "Measurable\nresults",
      ],
      caseLabel: "Example of a typical project",
      caseQuote: "\u201C80% of admin tasks automated in 3 months.\u201D",
      caseTags: ["Automation", "AI agents", "CRM"],
      chartLabel: "Productivity",
      chartValue: "+80%",
    },
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
        answer: "Automation & AI agents",
      },
      {
        title: "Scattered tools and data",
        text: "Information split across systems, double entry, and software that doesn't talk to each other.",
        answer: "Custom solutions",
      },
      {
        title: "Follow-up still too manual",
        text: "Forgotten reminders, stalled files and lost opportunities.",
        answer: "Automation & AI agents",
      },
      {
        title: "A digital presence falling behind",
        text: "An outdated website or limited online services no longer reflect your expertise.",
        answer: "Websites & apps",
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
