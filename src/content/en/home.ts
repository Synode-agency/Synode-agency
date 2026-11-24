import type { SiteContent } from "../types";

/** L'accueil : titre Google, description et FAQ. Le corps de la page est encore écrit dans `home-page.tsx` : il est réécrit à l'étape 4 de la refonte. */
export const home = {
  metaTitle: "Integration, software and AI in Brussels",
  metaDescription: "Synode, a technology agency in Brussels: connected systems (CRM, ERP, API), intelligent business software and automated processes, with built-in AI.",
  faq: {
    kicker: "FAQ",
    title: "Common questions about our custom solutions",
    items: [
      {
        q: "Do I need to change my software to work with you?",
        a: "Not necessarily. We first look at how to work with your existing tools. Depending on their integration options and your needs, we can connect them, extend them or build a business tool that fits better.",
      },
      {
        q: "Do you also build software without AI?",
        a: "Yes. An integration or a business application can work perfectly well without AI. We only add it where it brings a concrete gain, and we say so in our proposal.",
      },
      {
        q: "How much does a custom solution cost?",
        a: "There is no public price list: every project is priced on its real scope (features, data, software to connect, volumes). The first call is free. Scoping is paid: it produces the written scope and the firm quote, and its fee is deducted from the project price when development starts. The quote separates development, recurring technical costs, maintenance if you choose it and third-party services.",
      },
      {
        q: "Are there recurring costs after go-live?",
        a: "Yes, as soon as your solution relies on paid services (AI models, hosting, automation platforms), billed by subscription for as long as it runs. Synode never absorbs these costs. Either you entrust support and maintenance to us and we handle running, monitoring and maintenance for a recurring payment set out in the contract; or you subscribe to and pay those services directly with the providers. Amounts are estimated before work starts.",
      },
      {
        q: "Will my data remain confidential?",
        a: "Yes. Access is limited to what is strictly required and listed in the proposal. You grant it at kick-off, and it is revoked at the end if you want it to be. You choose what a person approves: every action, or only sensitive ones.",
      },
    ],
  },
} as const satisfies SiteContent["home"];
