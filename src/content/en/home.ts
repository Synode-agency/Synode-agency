import type { SiteContent } from "../types";

export const home = {
  metaTitle: "Synode · Software development & AI agency in Brussels",
  metaDescription: "We connect your tools, add AI and build custom software, from freelancers to large companies. Free 30-min call.",

  hero: {
    title: "Software development,\nAI & connected systems.",
    accents: ["Software", "AI"],
    subtitle:
      "Synode, a software development & AI agency in Brussels, designs and builds software tailored to your company’s needs. We integrate artificial intelligence, connect your tools and automate your processes to support your growth.",
    emphasis: "software development & AI agency in Brussels",
    note: "Free, no commitment · one process is enough to start",
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
    text: "Every company has its own tools, habits and tasks that take too much time. We don't sell off\u2011the\u2011shelf software: we start from how you actually work to build what saves you time, with AI only where it truly helps.",
    accents: ["software", "AI"],
    photos: ["/images/approche-equipe.png", "/images/approche-tableau.png", "/images/approche-ecran.png"],
  },

  services: {
    eyebrow: "Our services",
    prefix: "Built for",
    rotating: ["freelancers.", "SMEs.", "large companies."],
    full: "Built for freelancers, SMEs and large companies.",
    fullEnd: "freelancers, SMEs and large companies.",
    more: "Learn more",
    items: [
      {
        key: "software",
        title: "Software development",
        text: "We design and build business software, platforms and internal tools tailored to your company’s specific needs.",
        image: "",
      },
      {
        key: "ai",
        title: "Artificial intelligence & automation",
        text: "We build AI agents and automate your business processes to simplify your operations and boost your teams’ productivity.",
        image: "",
      },
      {
        key: "connect",
        title: "Integration & connected systems",
        text: "We connect your software, sync your data and integrate your systems into a coherent, scalable technology environment.",
        image: "",
      },
      {
        key: "web",
        title: "Websites & mobile apps",
        text: "We design and build modern, high-performance websites and mobile apps focused on user experience.",
        image: "",
      },
    ] as const,
  },

  work: {
    eyebrow: "Our work",
    prefix: "What we’ve",
    rotating: ["developed.", "connected.", "integrated.", "automated."],
    full: "What we’ve developed, connected, integrated and automated.",
    fullEnd: "developed, connected, integrated and automated.",
    link: "All our work",
  },

  founders: {
    title: "You talk directly to the people who build",
    link: "About us",
  },

  faq: {
    title: "Common questions",
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
