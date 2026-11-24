import type { SiteContent } from "../types";

export const services = {
  metaTitle: "Services · Integrations, AI & custom software · Synode",
  metaDescription: "Connect your tools, put AI to work, build your custom software. Examples, pricing and security.",

  hero: {
    eyebrow: "Services",
    title: "Three ways to give your team time back",
    accents: ["time back"],
    subtitle: "Every project starts from your tools, your data and your rules. We don’t sell off-the-shelf solutions.",
  },

  labels: { problem: "The problem", does: "What we do", examples: "For example", result: "The result" },

  blocks: [
    {
      key: "connect",
      title: "Connect your tools",
      problem: "Your tools don’t talk to each other. Your team re-types, exports and checks by hand.",
      does: "We link your existing tools (CRM, ERP, invoicing, website, email, databases) and automate the repetitive steps between them.",
      examples: [
        { strong: "A request that moves on its own", rest: ": from the website form to the CRM to the right team, with no re-typing." },
        { strong: "New clients onboarded without gaps", rest: ": documents requested, file created, team notified." },
        { strong: "Invoices chased at the right time", rest: ", with a payment link, and an alert when a call is needed." },
      ],
      result: "Less re-typing, fewer errors, up-to-date information everywhere.",
    },
    {
      key: "ai",
      title: "Put AI to work",
      problem: "Quotes, emails, documents, repeat questions: your team spends its days preparing instead of deciding.",
      does: "We set up AI assistants connected to your tools and documents. They act on their own or run each action past you: you set the rule.",
      examples: [
        { strong: "Quotes and follow-ups", rest: ": the request is summarised, a draft quote is ready to review, follow-ups go out automatically." },
        { strong: "Customer service in FR, NL and EN", rest: ": common questions get answered, complex cases go to your team." },
        { strong: "Searchable internal knowledge", rest: ": an assistant answers from your documents, cites its sources and respects access rights." },
      ],
      result: "Faster answers, and a team focused on work that needs judgement.",
    },
    {
      key: "software",
      title: "Build your custom software",
      problem: "You juggle Excel, email and tools that don’t fit your business.",
      does: "We build the application you need, whatever it is: web or mobile app, internal tool, customer portal, business platform. With AI where it’s useful.",
      examples: [
        { strong: "A business tool", rest: " that centralises your jobs and their history, and whose AI drafts the reports." },
        { strong: "An app for your customers", rest: ", on the web or on mobile: bookings, case tracking, a personal space." },
        { strong: "A dashboard", rest: " (Power BI, Excel or web) that updates itself: sales, margins, cash." },
      ],
      result: "A tool built around how you work, not the other way round.",
    },
  ] as const,

  included: {
    title: "Included in every project",
    items: ["Setup", "Team training on the delivered tool", "Documentation", "Support until your team is up and running"],
    option: "Optional, added to the project: AI training for your teams, plus monitoring, maintenance and improvements on a recurring contract.",
  },

  pricing: {
    title: "How we price your project",
    items: [
      { strong: "Free first call", rest: " (30 min)." },
      { strong: "Paid scoping, deducted from the project", rest: ": you get a written, agreed scope." },
      { strong: "A three-line quote", rest: ": development, running costs (hosting, AI, maintenance), future changes." },
    ],
    from: "",
    aids: "",
  },

  security: {
    title: "Your data stays under control",
    items: [
      { strong: "Limited access", rest: ": each tool only reaches the data it needs." },
      { strong: "Human approval", rest: ": you choose which actions need your sign-off." },
      { strong: "Traceability", rest: ": every action is logged." },
      { strong: "Your data stays yours", rest: ": EU hosting when required." },
    ],
  },

  faq: {
    title: "Common questions",
    items: [
      {
        q: "How long does a project take?",
        a: "It depends on the scope, the number of tools to connect, how available your data is and the testing needed. The schedule is agreed in writing before work starts.",
      },
      {
        q: "Who pays for AI and hosting?",
        a: "You choose: we manage them for you, or you subscribe to the providers directly.",
      },
      {
        q: "Can the solution evolve?",
        a: "Yes. Every change is scoped and agreed in writing before we build it.",
      },
      {
        q: "What if the AI gets it wrong?",
        a: "You choose the level of control: approve every action, only sensitive ones, or let the AI handle it.",
      },
      {
        q: "Who do we sign with?",
        a: "Contracts and invoices are issued by Productions Associées ASBL (Smart), which hosts Synode’s activity in Belgium. Day to day, you work directly with us.",
      },
    ],
  },
} as const satisfies SiteContent["services"];
