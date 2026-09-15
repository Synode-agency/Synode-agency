export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

const nav = {
  fr: [
    { href: "#top", label: "Accueil" },
    { href: "#offre", label: "Offre" },
    { href: "#realisations", label: "Réalisations" },
  ],
  en: [
    { href: "#top", label: "Home" },
    { href: "#offre", label: "Offer" },
    { href: "#realisations", label: "Work" },
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
    footerNote: "Site en cours de finalisation — coordonnées à confirmer.",
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
      { title: "Les mêmes données encodées plusieurs fois", text: "Formulaire, e-mail, CRM, facturation : une seule saisie doit suffire." },
      { title: "Des outils qui ne se parlent pas", text: "Nous les connectons plutôt que d'en ajouter un de plus." },
      { title: "Excel comme colonne vertébrale", text: "Fragile, non traçable, impossible à faire grandir." },
      { title: "Un suivi client fait à la main", text: "Relances oubliées, informations dispersées, opportunités perdues." },
    ],
  },
  offer: {
    eyebrow: "02 / Notre offre",
    title: "Deux offres. Séparément ou combinées.",
    subtitle:
      "Nous ne vendons pas une technologie : nous choisissons la solution la plus adaptée à votre problème. Tarifs sur devis, périmètre écrit, prix fixe.",
    resultLabel: "Résultat",
    cards: [
      {
        icon: "Workflow",
        number: "01",
        title: "Automatisation & Agents IA",
        forWho: "Pour celles qui perdent du temps dans des tâches répétitives et traitent encore à la main leurs e-mails, documents et demandes clients.",
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
        forWho: "Pour celles dont le besoin ne rentre dans aucun logiciel existant, ou qui sous-exploitent les outils qu'elles ont déjà.",
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
    eyebrow: "Réalisations & démos",
    title: "Des systèmes qui tournent, pas des promesses.",
    body: "Synode démarre son activité : plutôt que d'afficher des logos que nous n'avons pas encore le droit de montrer, voici quatre systèmes construits en interne — deux par offre — pour démontrer précisément ce que nous livrons.",
    badge: "Démo",
    items: [
      { code: "D/01", domain: "Automatisation & Agents IA", title: "Boîte partagée triée, qualifiée et répondue", desc: "Un agent lit les mails entrants d'une adresse info@, les classe, crée la fiche dans le CRM et rédige une réponse mise en attente de validation humaine.", stack: ["n8n", "API LLM", "Gmail API", "CRM"], result: "−3 h de tri par semaine · première réponse en 2 min" },
      { code: "D/02", domain: "Automatisation & Agents IA", title: "Assistant interne sur 400 documents", desc: "Procédures, contrats et fiches techniques indexés. L'équipe pose sa question en langage naturel et reçoit une réponse sourcée, avec le passage exact.", stack: ["Python", "embeddings", "RAG", "Next.js"], result: "Aucune réponse sans source affichée" },
      { code: "D/03", domain: "Solutions sur mesure", title: "Tableau de bord d'activité temps réel", desc: "Dossiers, échéances et marges agrégés depuis trois sources, rafraîchis en continu, avec alertes sur seuil, rôles par utilisateur et export comptable.", stack: ["Next.js", "PostgreSQL", "webhooks"], result: "Remplace une consolidation Excel hebdomadaire" },
      { code: "D/04", domain: "Outils métier & CRM", title: "Du formulaire web au devis signé", desc: "Une demande arrive, est qualifiée, chiffrée selon vos règles, transformée en PDF, envoyée pour signature et poussée dans le CRM. Relance automatique à J+3.", stack: ["Make", "génération PDF", "HubSpot"], result: "Devis envoyé en minutes, plus en jours" },
    ],
    cta: {
      title: "Votre projet peut devenir notre premier cas publié.",
      body: "Les projets de lancement bénéficient d'un tarif préférentiel, en échange du droit de les présenter ici une fois livrés.",
      button: "En discuter",
    },
  },
  audience: {
    eyebrow: "04 / Qui nous aidons",
    title: "Les entreprises qui n'ont pas d'équipe IT.",
    body: "PME et indépendants qui ne sont pas des entreprises technologiques : beaucoup d'administratif, plusieurs outils mal connectés, un suivi difficile, et l'envie d'automatiser sans savoir par où commencer.",
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
  },
  contact: {
    eyebrow: "Contact",
    title: "Dites-nous ce qui vous fait perdre du temps.",
    body: "Réponse sous 24 h ouvrées, avec un premier avis honnête : si votre besoin ne justifie pas un développement, nous vous le dirons.",
    info: [
      { label: "E-mail", value: "contact@synode-agency.com", href: "mailto:contact@synode-agency.com" },
      { label: "Téléphone", value: "+32 493 99 31 63", href: "tel:+32493993163" },
      { label: "Premier échange", value: "Audit d'une heure, gratuit", href: "" },
    ],
    timelines: ["Sous 1 mois", "Sous 3 mois", "Sous 6 mois", "Pas encore de date"],
    form: {
      name: "Nom",
      company: "Société",
      email: "E-mail professionnel",
      phone: "Numéro de téléphone",
      timeline: "Délai souhaité",
      message: "Le problème à résoudre",
      messagePlaceholder: "Décrivez brièvement votre fonctionnement actuel et ce qui pourrait être amélioré.",
      sending: "Envoi…",
      sentTitle: "Demande envoyée",
      errName: "Indiquez votre nom.",
      errEmail: "Indiquez votre e-mail.",
      errEmailInvalid: "Cet e-mail semble invalide.",
      errPhone: "Indiquez votre numéro de téléphone.",
      errMessage: "Décrivez le problème en quelques mots (10 caractères min.).",
    },
    submit: "Envoyer la demande",
    note: "Vos informations servent uniquement à traiter votre demande.",
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
    footerNote: "Site being finalised — contact details to be confirmed.",
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
      { title: "The same data entered several times", text: "Form, e-mail, CRM, invoicing: one entry should be enough." },
      { title: "Tools that don't talk to each other", text: "We connect them rather than adding one more." },
      { title: "Excel as the backbone", text: "Fragile, untraceable, impossible to scale." },
      { title: "Client follow-up done by hand", text: "Missed reminders, scattered information, lost opportunities." },
    ],
  },
  offer: {
    eyebrow: "02 / What we offer",
    title: "Two offers. On their own or combined.",
    subtitle:
      "We don't sell a technology: we pick the solution that best fits your problem. Priced on quote, scope in writing, fixed price.",
    resultLabel: "Outcome",
    cards: [
      {
        icon: "Workflow",
        number: "01",
        title: "Automation & AI agents",
        forWho: "For teams losing time on repetitive tasks, still handling e-mails, documents and client requests by hand.",
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
        forWho: "For teams whose needs don't fit any off-the-shelf software, or who are underusing the tools they already have.",
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
    body: "Synode is just getting started: rather than showing logos we're not yet allowed to display, here are four systems built in-house — two per offer — to show exactly what we deliver.",
    badge: "Demo",
    items: [
      { code: "D/01", domain: "Automation & AI agents", title: "Shared inbox sorted, qualified and answered", desc: "An agent reads incoming mail from an info@ address, classifies it, creates the CRM record and drafts a reply held for human approval.", stack: ["n8n", "LLM API", "Gmail API", "CRM"], result: "−3 h of sorting per week · first reply in 2 min" },
      { code: "D/02", domain: "Automation & AI agents", title: "Internal assistant over 400 documents", desc: "Procedures, contracts and spec sheets indexed. The team asks in plain language and gets a sourced answer, with the exact passage.", stack: ["Python", "embeddings", "RAG", "Next.js"], result: "No answer without a shown source" },
      { code: "D/03", domain: "Custom software", title: "Real-time activity dashboard", desc: "Cases, deadlines and margins aggregated from three sources, refreshed continuously, with threshold alerts, per-user roles and accounting export.", stack: ["Next.js", "PostgreSQL", "webhooks"], result: "Replaces a weekly Excel consolidation" },
      { code: "D/04", domain: "Business tools & CRM", title: "From web form to signed quote", desc: "A request comes in, gets qualified, priced against your rules, turned into a PDF, sent for signature and pushed to the CRM. Automatic follow-up at D+3.", stack: ["Make", "PDF generation", "HubSpot"], result: "Quote sent in minutes, not days" },
    ],
    cta: {
      title: "Your project could become our first published case.",
      body: "Launch projects get preferential pricing, in exchange for the right to feature them here once delivered.",
      button: "Let's talk",
    },
  },
  audience: {
    eyebrow: "04 / Who we help",
    title: "Companies with no IT team.",
    body: "SMEs and independents that aren't tech companies: lots of admin, several poorly connected tools, follow-up that's hard to keep up, and the will to automate without knowing where to start.",
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
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us what's eating your time.",
    body: "Reply within one business day, with an honest first take: if your need doesn't warrant a build, we'll say so.",
    info: [
      { label: "E-mail", value: "contact@synode-agency.com", href: "mailto:contact@synode-agency.com" },
      { label: "Phone", value: "+32 493 99 31 63", href: "tel:+32493993163" },
      { label: "First call", value: "One-hour audit, free", href: "" },
    ],
    timelines: ["Within 1 month", "Within 3 months", "Within 6 months", "No date yet"],
    form: {
      name: "Name",
      company: "Company",
      email: "Work e-mail",
      phone: "Phone number",
      timeline: "Timeline",
      message: "The problem to solve",
      messagePlaceholder: "Briefly describe your current setup and what could be improved.",
      sending: "Sending…",
      sentTitle: "Request sent",
      errName: "Please enter your name.",
      errEmail: "Please enter your e-mail.",
      errEmailInvalid: "That e-mail looks invalid.",
      errPhone: "Please enter your phone number.",
      errMessage: "Describe the problem in a few words (10 characters min.).",
    },
    submit: "Send request",
    note: "Your information is only used to handle your request.",
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
