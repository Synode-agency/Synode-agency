import type { SiteContent } from "../types";

export const home = {
  metaTitle: "Synode · Software development & AI agency in Brussels",
  metaDescription: "We connect your tools, add AI and build custom software, from freelancers to large companies. Free 30-min call.",

  hero: {
    title: "We connect your tools and automate the repetitive work.",
    accents: ["your tools", "the repetitive work"],
    subtitle:
      "Synode links your existing software, adds AI where it helps and builds the tools you’re missing. Your team spends less time re-typing, chasing and searching.",
    secondaryLink: "See our work",
  },

  proof: {
    logos: [] as readonly { src: string; alt: string }[],
    rating: "",
    quote: { text: "", author: "" },
    fallback: ["Based in Brussels", "Two founding developers", "One point of contact"],
  },

  problems: {
    title: "Sound familiar?",
    items: [
      { strong: "You re-type the same information", rest: " into three different tools." },
      { strong: "Quotes, follow-ups and customer replies", rest: " eat hours every week." },
      { strong: "Your numbers are scattered", rest: ", and you compile them by hand in Excel." },
    ],
  },

  services: {
    title: "What we do",
    audience: "For freelancers, SMEs and large companies.",
    more: "Learn more",
    items: [
      {
        key: "connect",
        title: "Connect your tools",
        text: "Customer management, invoicing, website, email: we link them so information flows on its own.",
      },
      {
        key: "ai",
        title: "Put AI to work",
        text: "AI drafts quotes, sorts requests and answers common questions. You choose what it handles on its own and what it runs past you.",
      },
      {
        key: "software",
        title: "Build your custom software",
        text: "Web or mobile app, internal tool, customer portal: when no off-the-shelf tool fits, we build the one that matches how you work.",
      },
    ] as const,
  },

  work: {
    title: "What we’ve built",
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
