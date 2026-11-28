import type { SiteContent } from "../types";

/* The Services page, redone on 27/11/2026 (see fr/services.ts). */
export const services = {
  metaTitle: "Services · Software, AI, integrations, websites & apps · Synode",
  metaDescription:
    "Custom software, AI and automation, integrations, websites and mobile apps: four services, from freelancers to large companies.",

  hero: {
    /* « | » : a line break on phones only, a space on desktop (see
       fr/home.ts). */
    title: "Four services|to move\nyour|business forward.",
    accents: ["forward"],
    subtitle:
      "For companies and freelancers alike: we build what’s missing, connect what already exists and add AI when it genuinely helps.",
    tilesLabel: "The four services",
  },

  approach: {
    label: "Our approach",
    text: "Company or freelancer, everyone has their own tools, data and rules. We don’t sell off-the-shelf solutions: we build custom software, connect what already exists and add artificial intelligence only when it genuinely helps.",
    accents: ["software", "artificial", "intelligence"],
  },

  list: {
    etiquette: "Our services",
    prefix: "Four services to",
    rotating: ["build.", "automate.", "connect.", "launch."],
    full: "Four services to build, automate, connect and launch.",
    fullEnd: "build, automate, connect and launch.",
    button: "Explore this service",
  },

  items: [
    {
      key: "software",
      name: ["Software", "development"],
      line: "Desktop, web and SaaS software",
      image: "/images/services/service-logiciel.webp",
      heading: ["Software built for ", "the people who use it."],
      sentence:
        "For your team, your clients or an entire market: desktop software, web app or SaaS platform, we build the software you have in mind, solid and secure.",
      deliverables: [
        "Desktop software, web apps, SaaS platforms",
        "Internal tools, client portals, MVPs",
        "Accounts, role-based access, backups, change history",
      ],
    },
    {
      key: "ai",
      name: ["Artificial intelligence", "& automation"],
      line: "Automations, AI assistants",
      image: "/images/services/service-ia.webp",
      heading: ["AI at work on ", "your real files."],
      sentence:
        "We automate repetitive tasks and put AI to work on your tools and documents: time saved, without exposing your data or your clients.",
      deliverables: [
        "Repetitive tasks automated: follow-ups, quotes, data entry",
        "AI assistants that sort, draft, reply and act in your tools",
        "Limited access, human approval, tested on your real cases",
      ],
    },
    {
      key: "connect",
      name: ["Integrations &", "connected systems"],
      line: "CRM, ERP, invoicing, APIs",
      image: "/images/services/service-integration.webp",
      heading: ["Tools that finally ", "talk to each other."],
      sentence:
        "CRM, accounting, online shop, calendar: we connect your tools so your data is accurate everywhere, with no re-typing.",
      deliverables: [
        "API, CRM, ERP and invoicing connections",
        "Duplicates and errors handled, alerts when a flow gets stuck",
        "Every flow documented",
      ],
    },
    {
      key: "web",
      name: ["Websites &", "mobile apps"],
      line: "Websites, iPhone and Android",
      image: "/images/services/service-web.webp",
      heading: ["An online presence ", "that reflects you."],
      sentence: "Fast websites and iPhone and Android apps,\npolished and connected to your tools.",
      deliverables: [
        "Showcase sites, online shops, online booking and payments",
        "Client areas and admin dashboards",
        "iPhone and Android apps, published on the stores",
        "Performance, accessibility, GDPR",
      ],
    },
  ],

  included: {
    title: "Included in",
    accent: "every project.",
    more: "See more",
    less: "See less",
    text: "Software, AI, integrations, website or app: we don’t stop at delivery. You walk away with a project that is live, understood and documented.",
    items: [
      {
        title: "Installation",
        text: "Website launched, app published, software or AI assistant up and running, with your data.",
        image: "/images/services/inclus-installation.webp",
        detail:
          "We handle the launch: hosting and domain name, publishing on the App Store and Google Play, setup on your servers or in the cloud. Everything is tested before going live.",
      },
      {
        title: "Training",
        text: "Depending on the project, your team learns to use it: app, software or AI assistant.",
        image: "/images/services/inclus-formation.webp",
        detail:
          "We show your team how to use it day to day: editing the website’s content, using the app, the software or the AI assistant. On your own cases, so everyone can work independently.",
      },
      {
        title: "Documentation",
        text: "A clear guide to what was delivered: access, settings, procedures.",
        image: "/images/services/inclus-documentation.webp",
        detail:
          "You get a clear guide: access, settings, procedures and, for an integration, what flows between your tools. Your team, or another provider, can pick everything up.",
      },
      {
        title: "Support",
        text: "After launch, we stay available until everything is fully in hand.",
        image: "/images/services/inclus-accompagnement.webp",
        detail:
          "After launch, we answer your questions, fix what needs fixing and fine-tune the settings. You’re not on your own until everything is fully in hand.",
      },
    ],
    recurring: {
      before:
        "Some projects live on after delivery: security updates, hosting, evolving AI models, new features. For those, we offer a ",
      accent: "monthly subscription",
      after: " for maintenance and follow-up, priced from the quote.",
    },
  },

  pricing: {
    label: "How we price your project",
    title: {
      prefix: "How we price",
      rotating: ["your project.", "every step.", "with no surprises."],
      full: "How we price your project, every step, with no surprises.",
      fullEnd: "your project, every step, with no surprises.",
    },
    etapes: [
      { debut: "A first", cle: "free call.", description: "30 minutes to understand your business and what you’d like to improve." },
      { debut: "A written", cle: "scope.", description: "Paid, then deducted from the project: what we build, how long it takes, what it costs." },
      { debut: "A quote in", cle: "three lines.", description: "Development, running costs and future changes, clearly separated." },
    ],
  },

  appel: {
    titreAvant: "Which service to",
    accent: "start with",
    titreApres: "?",
    texte:
      "Software, AI, tools to connect, a website or an app: describe your project in one sentence and we’ll help you choose during a 30-minute call.",
  },

  faq: {
    title: "Common questions",
    accent: "Common",
    more: "Another question?",
    items: [
      {
        q: "How long does a project take?",
        a: "It depends on the scope, the number of tools to connect, the availability of your data and the testing required. The schedule is set in writing before we start.",
      },
      {
        q: "Who pays for AI and hosting costs?",
        a: "Your choice: we manage them for you, or you subscribe directly with the providers.",
      },
      {
        q: "What happens to our data?",
        a: "Each tool only accesses the data it needs, every action is logged, and you choose which actions need your approval. Your data stays yours, hosted in Europe when required.",
      },
      {
        q: "What if the AI gets it wrong?",
        a: "You choose the level of control: approve every action, only sensitive ones, or let the AI handle it.",
      },
      {
        q: "Can the solution evolve?",
        a: "Yes. Every change is scoped and approved in writing before it’s built.",
      },
      {
        q: "Who do we sign with?",
        a: "Contracts and invoices are issued by Productions Associées ASBL (Smart), which hosts Synode’s activity in Belgium. Day to day, you work directly with us.",
      },
    ],
  },
} as const satisfies SiteContent["services"];
