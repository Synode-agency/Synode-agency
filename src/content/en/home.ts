import type { SiteContent } from "../types";

export const home = {
  metaTitle: "Synode · Software development & AI agency in Brussels",
  metaDescription: "We connect your tools, add AI and build custom software, from freelancers to large companies. Free 30-min call.",

  hero: {
    /* « | » : a line break on phones only, a space on desktop (see
       fr/home.ts). */
    eyebrow: "Software development|& AI agency · Brussels",
    title: "We build your|software.\nAI makes|it intelligent.",
    accents: ["software", "AI"],
    subtitle:
      "Synode, a software development & AI agency in Brussels, designs and builds software, websites and mobile apps. We integrate artificial intelligence, connect your systems and automate your processes to support your company’s growth.",
    emphasis: "software development & AI agency in Brussels",
  },

  proof: {
    logosLabel: "They trust us",
    logos: [
      { src: "/clients/behybrid.png", alt: "BEHYBRID", width: 900, height: 90, display: 16 },
      { src: "/clients/betapro.png", alt: "Betapro, construction and renovation", width: 198, height: 160, display: 48 },
      { src: "/clients/baert.png", alt: "Baert", width: 434, height: 88, display: 24 },
      { src: "/clients/picarle.png", alt: "Picarle Rénovation", width: 155, height: 160, display: 48 },
      { src: "/clients/group-cleaning.png", alt: "Group Cleaning & Services", width: 133, height: 160, display: 48 },
      { src: "/clients/glb-coaching.png", alt: "GLB Coaching", width: 437, height: 160, display: 32 },
      { src: "/clients/batisseurs-espoir.png", alt: "Bâtisseurs d’espoir (non-profit)", width: 460, height: 160, display: 36 },
    ] as readonly { src: string; alt: string; width: number; height: number; display: number }[],
    rating: "",
    quote: { text: "", author: "" },
  },

  approach: {
    label: "Our approach",
    text: "Every company has its own ambitions, needs and way of working. From custom software development to websites and mobile apps, we design tools suited to your business, integrate artificial intelligence and connect your systems to simplify your processes and support your growth.",
    accents: ["software", "artificial", "intelligence"],
    photos: ["/images/approche-equipe.png", "/images/approche-tableau.png", "/images/approche-ecran.png"],
  },

  services: {
    /* À droite du titre, un simple mot, sans lien ni flèche (26/11/2026). */
    etiquette: "Our services",
    prefix: "Built for",
    rotating: ["businesses.", "freelancers."],
    full: "Built for businesses and freelancers.",
    fullEnd: "businesses and freelancers.",
    more: "Learn more",
    items: [
      {
        key: "software",
        title: "Software development",
        text: "Desktop, web and SaaS software",
        image: "/images/services/service-logiciel.webp",
        focus: "50% 55%",
      },
      {
        key: "ai",
        title: "Artificial intelligence & automation",
        text: "Automations, AI assistants",
        image: "/images/services/service-ia.webp",
        focus: "55% 38%",
      },
      {
        key: "connect",
        title: "Integration & connected systems",
        text: "CRM, ERP, invoicing, APIs",
        image: "/images/services/service-integration.webp",
        focus: "62% 52%",
      },
      {
        key: "web",
        title: "Websites & mobile apps",
        text: "Websites, iPhone and Android",
        image: "/images/services/service-web.webp",
        focus: "45% 42%",
      },
    ] as const,
  },

  work: {
    prefix: "What we’ve",
    rotating: ["developed.", "connected.", "integrated.", "automated."],
    full: "What we’ve developed, connected, integrated and automated.",
    fullEnd: "developed, connected, integrated and automated.",
    link: "All our work",
  },

  methode: {
    label: "Our method",
    title: {
      prefix: "Let’s build what’s next,",
      rotating: ["together.", "for your business.", "step by step."],
      full: "Let’s build what’s next, together, for your business and step by step.",
      fullEnd: "together, for your business and step by step.",
    },
    etapes: [
      { debut: "A", cle: "30-min call.", description: "You tell us about your business and what you’d like to improve." },
      { debut: "A", cle: "written scope.", description: "What we build, how long it takes, what it costs." },
      { debut: "Delivery and", cle: "support.", description: "We set it up, train your team and stay available." },
    ],
  },

  /* ⚠ Invented texts, shown only locally while `valide` is false: see the
     French content. */
  temoignages: {
    title: "What our clients say",
    accent: "clients",
    precedent: "Previous testimonial",
    suivant: "Next testimonial",
    items: [
      {
        texte:
          "Synode took the time to understand our trade before proposing anything. Our quotes and our job sites are finally tracked in a single place.",
        cle: "in a single place",
        nom: "Salvatore B.",
        poste: "Entrepreneur",
        entreprise: "BetaPro",
        logo: { src: "/clients/betapro.png", width: 198, height: 160, hauteur: 36 },
        valide: false,
      },
      {
        texte:
          "From the website to the newsletter, everything is built for our members. Synode got the spirit of the club and turned it into tools we use every week.",
        cle: "the spirit of the club",
        nom: "Clara C.",
        poste: "Manager",
        entreprise: "BEHYBRID",
        logo: { src: "/clients/behybrid.png", width: 900, height: 90, hauteur: 13 },
        valide: false,
      },
      {
        texte:
          "For a non-profit like ours, every hour counts. Synode helped us automate what was eating our time, without ever making things complicated.",
        cle: "every hour counts",
        nom: "Paolo L.",
        poste: "Founder",
        entreprise: "Bâtisseurs d’espoir",
        logo: { src: "/clients/batisseurs-espoir.png", width: 460, height: 160, hauteur: 28 },
        valide: false,
      },
    ],
  },

  appel: {
    titreAvant: "What would you like to",
    accent: "build",
    titreApres: "?",
    texte:
      "Software, a website, an app, an AI agent or tools that finally work together: describe your project in one sentence and we’ll talk it through in 30 minutes.",
    label: "Your project in one sentence",
    attente: "Describe your project in one sentence",
    exemples: [
      "Software to manage our quotes",
      "A website that brings in clients",
      "An app for our members",
      "An AI agent that answers clients",
      "Connect our CRM and our invoices",
      "Automate our payment reminders",
    ],
  },

  faq: {
    title: "Common questions",
    accent: "Common",
    more: "Another question?",
    items: [
      {
        q: "Do we need to change our software?",
        a: "No. We start from the tools you already use and connect them. We only replace what truly gets in the way.",
      },
      {
        q: "How much does it cost?",
        a: "The first call is free. Scoping is paid, then deducted from the project price. The quote separates development, running costs and future changes.",
      },
      {
        q: "How long does it take?",
        a: "It depends on the scope, the number of tools to connect, how available your data is and the testing needed. The schedule is agreed in writing before work starts.",
      },
      {
        q: "Do you build solutions without AI?",
        a: "Yes. We only add AI when it actually helps.",
      },
    ],
  },
} as const satisfies SiteContent["home"];
