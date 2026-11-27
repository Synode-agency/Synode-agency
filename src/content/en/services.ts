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
    labels: { problem: "The problem", does: "What we do", result: "The result" },
    button: "Explore this service",
  },

  items: [
    {
      key: "software",
      name: ["Software", "development"],
      line: "Business tools, portals, platforms",
      image: "/images/services/service-logiciel.webp",
      heading: ["Software built for ", "the way you work."],
      problem:
        "Your business runs on an Excel file that has become critical: shared by several people, full of client data and formulas nobody dares to touch anymore. The day it breaks or leaks, everything stops.",
      does: "We turn that process into real software: a reliable database, accounts and role-based permissions, backups, a change history, and an architecture that holds up as your team or your client base grows.",
      result: "A solid, secure tool that grows with your business.",
    },
    {
      key: "ai",
      name: ["Artificial intelligence", "& automation"],
      line: "AI agents, automations",
      image: "/images/services/service-ia.webp",
      heading: ["AI at work on ", "your real files."],
      problem:
        "A chatbot takes an evening to set up. An assistant that reads your real documents, respects who may see what, never leaks client data and never tells your clients just anything is a different job.",
      does: "We design AI agents plugged into your tools and your data, with access limits, human approval rules, tests on your real cases and ongoing monitoring of answer quality.",
      result: "AI you can hand real work to, with no risk to your clients.",
    },
    {
      key: "connect",
      name: ["Integrations &", "connected systems"],
      line: "CRM, ERP, invoicing, APIs",
      image: "/images/services/service-integration.webp",
      heading: ["Tools that finally ", "talk to each other."],
      problem:
        "Your CRM, your accounting, your online shop and your calendar exchange data through fragile connections. A duplicate, a vendor update, a sync that fails silently, and your numbers can no longer be trusted.",
      does: "We build robust integrations: a clear source of truth, error and duplicate handling, alerts when a flow gets stuck, and documentation so you know what goes where.",
      result: "Accurate data everywhere, and flows that never break without warning.",
    },
    {
      key: "web",
      name: ["Websites &", "mobile apps"],
      line: "Websites, iPhone and Android",
      image: "/images/services/service-web.webp",
      heading: ["An online presence ", "that reflects you."],
      problem:
        "A pretty storefront takes a weekend. A website or an app that handles bookings, payments, client accounts and several languages, fast, well ranked, GDPR-compliant and secure, takes a real team.",
      does: "We design and build websites and iPhone and Android apps connected to your tools: payments, client areas, app store publishing, performance, accessibility and security.",
      result: "A reliable website or app your clients actually use.",
    },
  ],

  included: {
    title: "Included in",
    accent: "every project.",
    text: "Whatever the service, we don’t stop at launch: your team walks away with a tool it knows how to use.",
    items: [
      {
        title: "Installation",
        text: "We put the tool into service in your environment, with your data.",
        image: "/images/services/inclus-installation.webp",
      },
      {
        title: "Training",
        text: "Your team learns to use the delivered tool, on its own cases.",
        image: "/images/services/inclus-formation.webp",
      },
      {
        title: "Documentation",
        text: "A clear guide to find every setting and every procedure.",
        image: "/images/services/inclus-documentation.webp",
      },
      {
        title: "Support",
        text: "We stay available until your team is fully up to speed.",
        image: "/images/services/inclus-accompagnement.webp",
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
