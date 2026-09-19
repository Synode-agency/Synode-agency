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
    langLabel: "Français",
    tagline: "Automatisation, agents IA et solutions sur mesure pour les PME.",
  },
  hero: {
    titleLead: "Gérez votre entreprise",
    titleAccent: "sans le superflu",
    subtitle:
      "Automatisation des processus, agents IA branchés sur vos données, logiciels et outils métier sur mesure. Nous mesurons le gain avant d'écrire une ligne de code.",
    primaryCta: "Demander un audit",
    secondaryCta: "Voir nos réalisations",
    pillars: [
      { icon: "Zap", title: "Automatisation", text: "Vos outils connectés bout à bout, zéro double encodage." },
      { icon: "Bot", title: "Agents IA", text: "Ils lisent, qualifient et agissent sur vos données, 24/7." },
      { icon: "AppWindow", title: "Logiciels sur mesure", text: "Applications web, outils internes, portails, dashboards." },
      { icon: "ArrowLeftRight", title: "Outils métier & CRM", text: "Configurés, connectés, enfin exploités à leur potentiel." },
    ],
  },
  problem: {
    eyebrow: "01 / Le constat",
    title: "L'automatisation avance vite. Les entreprises, pas toujours.",
    intro:
      "Beaucoup de PME savent qu'il existe mieux, sans savoir ce qui peut réellement être automatisé, quels outils choisir, ni s'il faut acheter un logiciel ou en développer un.",
    items: [
      { title: "Trop de tâches manuelles", text: "Des heures perdues chaque semaine sur des tâches répétitives qui pourraient être automatisées." },
      { title: "Des outils et données dispersés", text: "Informations éclatées, doubles encodages et logiciels qui ne communiquent pas." },
      { title: "Un suivi encore trop manuel", text: "Relances oubliées, dossiers qui stagnent et opportunités perdues." },
      { title: "Difficile de savoir quoi automatiser", text: "Vous savez que vous pourriez être plus efficace, mais vous ne savez pas par où commencer." },
    ],
  },
  offer: {
    eyebrow: "02 / Notre offre",
    title: "Deux offres. Séparément ou combinées.",
    subtitle: "La solution adaptée à votre problème, définie ensemble.",
    subtitleNote: "Tarifs sur devis.",
    resultLabel: "Résultat",
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
    ],
  },
  method: {
    eyebrow: "03 / Méthode & qui nous aidons",
    title: "La même démarche sur les deux offres.",
    steps: [
      { title: "Audit & analyse", text: "Comprendre votre fonctionnement, vos outils et vos points de friction. Première heure offerte." },
      { title: "Recommandations", text: "Ce qui vaut la peine d'être automatisé, développé, connecté — ou laissé tel quel. Priorisé et chiffré." },
      { title: "Implémentation", text: "Nous construisons, intégrons et testons sur vos vraies données, avec démonstration à vos équipes." },
      { title: "Suivi & amélioration", text: "Nous vérifions que ça tient dans la durée, mesurons l'utilité réelle et faisons évoluer la solution." },
    ],
  },
  realisations: {
    eyebrow: "Réalisations & démonstrateurs",
    title: "Des systèmes qui tournent, pas des promesses.",
    stats: [
      { label: "Nombre", value: "4 systèmes" },
      { label: "Statut", value: "Fonctionnels" },
      { label: "Démonstration", value: "En visio, sur demande" },
      { label: "Données", value: "Jeux de test" },
    ],
    filterCta: "Parler du vôtre",
    body: "Synode démarre son activité : plutôt que d'afficher des logos que nous n'avons pas encore le droit de montrer, voici quatre systèmes construits en interne — deux par offre — pour démontrer précisément ce que nous livrons.",
    badge: "Démo",
    items: [
      { code: "D/01", short: "Boîte partagée", domain: "Automatisation & Agents IA", title: "Boîte partagée triée, qualifiée et répondue", desc: "Un agent lit les mails entrants d'une adresse info@, les classe, crée la fiche dans le CRM et rédige une réponse mise en attente de validation humaine.", stack: ["n8n", "API LLM", "Gmail API", "CRM"], result: "−3 h de tri par semaine · première réponse en 2 min" },
      { code: "D/02", short: "Assistant documentaire", domain: "Automatisation & Agents IA", title: "Assistant interne sur 400 documents", desc: "Procédures, contrats et fiches techniques indexés. L'équipe pose sa question en langage naturel et reçoit une réponse sourcée, avec le passage exact.", stack: ["Python", "embeddings", "RAG", "Next.js"], result: "Aucune réponse sans source affichée" },
      { code: "D/03", short: "Tableau de bord", domain: "Solutions sur mesure", title: "Tableau de bord d'activité temps réel", desc: "Dossiers, échéances et marges agrégés depuis trois sources, rafraîchis en continu, avec alertes sur seuil, rôles par utilisateur et export comptable.", stack: ["Next.js", "PostgreSQL", "webhooks"], result: "Remplace une consolidation Excel hebdomadaire" },
      { code: "D/04", short: "Devis automatisé", domain: "Outils métier & CRM", title: "Du formulaire web au devis signé", desc: "Une demande arrive, est qualifiée, chiffrée selon vos règles, transformée en PDF, envoyée pour signature et poussée dans le CRM. Relance automatique à J+3.", stack: ["Make", "génération PDF", "HubSpot"], result: "Devis envoyé en minutes, plus en jours" },
    ],
    cta: {
      title: "Votre projet peut devenir notre premier cas publié.",
      body: "Les projets de lancement bénéficient d'un tarif préférentiel, en échange du droit de les présenter ici une fois livrés.",
      button: "En discuter",
    },
  },
  team: {
    eyebrow: "04 / L'équipe",
    title: "Deux personnes, pas un standard téléphonique.",
    body: "Vous parlez directement à ceux qui conçoivent et développent votre solution.",
    photoPending: "Photo à venir",
    members: [
      {
        name: "Antonino",
        photo: "/equipe/anto.png",
        roles: ["Expert IA & Développement"],
        text: "Conception des workflows et des agents : il cartographie vos processus, choisit ce qui vaut la peine d'être automatisé et le met en production.",
      },
      {
        name: "Killian",
        photo: "/equipe/kiki.png",
        roles: ["Expert IA & Développement"],
        text: "Développement des applications, outils internes et intégrations : il construit ce qui n'existe pas encore et connecte ce que vous avez déjà.",
      },
    ],
  },
  audience: {
    eyebrow: "04 / Qui nous aidons",
    title: "Les entreprises qui n'ont pas d'équipe IT.",
    body: "PME et indépendants qui jonglent avec trop d'administratif,\ndes outils mal connectés et un suivi compliqué,\nsans savoir quoi automatiser en premier.",
    sectors: [
      "Immobilier", "Recrutement", "Construction & services techniques",
      "Cabinets & bureaux de services", "Agences", "B2B", "Indépendants à fort volume",
    ],
    rulesTitle: "Nos règles",
    rules: [
      "Comprendre le métier avant de proposer une technologie.",
      "Pas de sur-mesure quand un outil existant suffit.",
      "Périmètre écrit, prix fixe, aucune facturation surprise.",
      "Le code et les données vous appartiennent.",
    ],
  },
  ctaBand: {
    title: "Une heure pour voir ce qui peut changer.",
    body: "Nous chiffrons après l'audit, quand le périmètre est clair et le gain estimé.",
    button: "Réserver l'audit gratuit",
    stats: [
      { label: "Durée", value: "1 heure" },
      { label: "Prix", value: "Gratuit" },
      { label: "Livrable", value: "Premier avis écrit" },
      { label: "Engagement", value: "Aucun" },
    ],
  },
  faq: {
    eyebrow: "05 / Questions fréquentes",
    title: "Ce qu'on nous demande avant de signer.",
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
    title: "Dites-nous ce qui vous fait perdre du temps.",
    stats: [
      { label: "E-mail", value: "contact@synode-agency.com" },
      { label: "Zone", value: "Belgique — sur place ou à distance" },
      { label: "Premier échange", value: "Audit gratuit, 1 h" },
    ],
    body: "Réponse sous 24 h ouvrées, avec un premier avis honnête : si votre besoin ne justifie pas un développement, nous vous le dirons.",
    info: [
      { label: "E-mail", value: "contact@synode-agency.com", href: "mailto:contact@synode-agency.com" },
      { label: "Téléphone", value: "+32 493 99 31 63", href: "tel:+32493993163" },
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
    langLabel: "English",
    tagline: "Automation, AI agents and custom solutions for SMEs.",
  },
  hero: {
    titleLead: "Run your business",
    titleAccent: "without the busywork",
    subtitle:
      "Process automation, AI agents plugged into your data, and custom software and business tools. We measure the payoff before writing a line of code.",
    primaryCta: "Request an audit",
    secondaryCta: "See our work",
    pillars: [
      { icon: "Zap", title: "Automation", text: "Your tools wired end to end, zero double entry." },
      { icon: "Bot", title: "AI agents", text: "They read, qualify and act on your data, 24/7." },
      { icon: "AppWindow", title: "Custom software", text: "Web apps, internal tools, portals, dashboards." },
      { icon: "ArrowLeftRight", title: "Business tools & CRM", text: "Configured, connected, finally used to their full potential." },
    ],
  },
  problem: {
    eyebrow: "01 / The situation",
    title: "Automation moves fast. Companies, not always.",
    intro:
      "Plenty of SMEs know there's a better way, without knowing what can actually be automated, which tools to pick, or whether to buy software or build it.",
    items: [
      { title: "Too many manual tasks", text: "Hours lost every week on repetitive tasks that could be automated." },
      { title: "Scattered tools and data", text: "Information split across systems, double entry, and software that doesn't talk to each other." },
      { title: "Follow-up still too manual", text: "Forgotten reminders, stalled files and lost opportunities." },
      { title: "Hard to know what to automate", text: "You know you could be more efficient, but you don't know where to start." },
    ],
  },
  offer: {
    eyebrow: "02 / What we offer",
    title: "Two offers. On their own or combined.",
    subtitle: "The right solution for your problem, defined together.",
    subtitleNote: "Priced on quote.",
    resultLabel: "Outcome",
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
    ],
  },
  method: {
    eyebrow: "03 / Method & who we help",
    title: "The same approach on both offers.",
    steps: [
      { title: "Audit & analysis", text: "Understand how you work, your tools and your friction points. First hour on us." },
      { title: "Recommendations", text: "What's worth automating, building, connecting — or leaving as is. Prioritised and quoted." },
      { title: "Implementation", text: "We build, integrate and test on your real data, with a walkthrough for your teams." },
      { title: "Follow-up & improvement", text: "We check it holds up over time, measure real usefulness and evolve the solution." },
    ],
  },
  realisations: {
    eyebrow: "Work & demonstrators",
    title: "Systems that run, not promises.",
    stats: [
      { label: "Count", value: "4 systems" },
      { label: "Status", value: "Working" },
      { label: "Walkthrough", value: "Over video, on request" },
      { label: "Data", value: "Test sets" },
    ],
    filterCta: "Talk about yours",
    body: "Synode is just getting started: rather than showing logos we're not yet allowed to display, here are four systems built in-house — two per offer — to show exactly what we deliver.",
    badge: "Demo",
    items: [
      { code: "D/01", short: "Shared inbox", domain: "Automation & AI agents", title: "Shared inbox sorted, qualified and answered", desc: "An agent reads incoming mail from an info@ address, classifies it, creates the CRM record and drafts a reply held for human approval.", stack: ["n8n", "LLM API", "Gmail API", "CRM"], result: "−3 h of sorting per week · first reply in 2 min" },
      { code: "D/02", short: "Document assistant", domain: "Automation & AI agents", title: "Internal assistant over 400 documents", desc: "Procedures, contracts and spec sheets indexed. The team asks in plain language and gets a sourced answer, with the exact passage.", stack: ["Python", "embeddings", "RAG", "Next.js"], result: "No answer without a shown source" },
      { code: "D/03", short: "Activity dashboard", domain: "Custom software", title: "Real-time activity dashboard", desc: "Cases, deadlines and margins aggregated from three sources, refreshed continuously, with threshold alerts, per-user roles and accounting export.", stack: ["Next.js", "PostgreSQL", "webhooks"], result: "Replaces a weekly Excel consolidation" },
      { code: "D/04", short: "Automated quote", domain: "Business tools & CRM", title: "From web form to signed quote", desc: "A request comes in, gets qualified, priced against your rules, turned into a PDF, sent for signature and pushed to the CRM. Automatic follow-up at D+3.", stack: ["Make", "PDF generation", "HubSpot"], result: "Quote sent in minutes, not days" },
    ],
    cta: {
      title: "Your project could become our first published case.",
      body: "Launch projects get preferential pricing, in exchange for the right to feature them here once delivered.",
      button: "Let's talk",
    },
  },
  team: {
    eyebrow: "04 / The team",
    title: "Two people, not a call centre.",
    body: "You talk straight to the people who design and build your solution.",
    photoPending: "Photo coming",
    members: [
      {
        name: "Antonino",
        photo: "/equipe/anto.png",
        roles: ["AI & Development expert"],
        text: "Workflow and agent design: he maps your processes, picks what is worth automating and ships it to production.",
      },
      {
        name: "Killian",
        photo: "/equipe/kiki.png",
        roles: ["AI & Development expert"],
        text: "Application, internal tool and integration development: he builds what doesn't exist yet and connects what you already have.",
      },
    ],
  },
  audience: {
    eyebrow: "04 / Who we help",
    title: "Companies with no IT team.",
    body: "SMEs and independents juggling too much admin,\npoorly connected tools and messy follow-up,\nwith no idea what to automate first.",
    sectors: [
      "Real estate", "Recruitment", "Construction & technical services",
      "Firms & service offices", "Agencies", "B2B", "Independents with high volume",
    ],
    rulesTitle: "Our rules",
    rules: [
      "Understand the business before proposing a technology.",
      "No custom build when an existing tool will do.",
      "Scope in writing, fixed price, no surprise invoicing.",
      "The code and the data belong to you.",
    ],
  },
  ctaBand: {
    title: "One hour to see what could change.",
    body: "We quote after the audit, once the scope is clear and the gain estimated.",
    button: "Book the free audit",
    stats: [
      { label: "Length", value: "1 hour" },
      { label: "Price", value: "Free" },
      { label: "Deliverable", value: "First written take" },
      { label: "Commitment", value: "None" },
    ],
  },
  faq: {
    eyebrow: "05 / Frequently asked",
    title: "What people ask us before signing.",
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
    title: "Tell us what's eating your time.",
    stats: [
      { label: "E-mail", value: "contact@synode-agency.com" },
      { label: "Area", value: "Belgium — on site or remote" },
      { label: "First call", value: "Free audit, 1 h" },
    ],
    body: "Reply within one business day, with an honest first take: if your need doesn't warrant a build, we'll say so.",
    info: [
      { label: "E-mail", value: "contact@synode-agency.com", href: "mailto:contact@synode-agency.com" },
      { label: "Phone", value: "+32 493 99 31 63", href: "tel:+32493993163" },
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
