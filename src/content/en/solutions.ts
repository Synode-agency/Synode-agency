import type { SiteContent } from "../types";

/** L'ancienne page Solutions et ses six familles. Elle disparaît à l'étape 5 de la refonte, fusionnée dans Services. */
export const solutions = {
  metaTitle: "Custom solutions, with built-in AI",
  metaDescription:
    "Custom solutions with built-in AI from Synode in Brussels: AI agents, integrations, automations, business software, data and team training.",
  kicker: "What we offer",
  title: "A solution built\n^around your needs",
  text: "From improving a task to building a full application or training your team, we shape the solution around your business.",

  bricks: [
    {
          "slug": "agents-ia",
          "title": "AI Agents",
          "text": "AI agents that search, draft or analyse information, and carry out a sequence of actions within an agreed scope.",
          "benefit": "Get to information faster and speed up everyday tasks.",
          "example": "An AI agent drafts a customer reply from your documents, cites its sources and asks for your approval before sending.",
          "visual": 0
    },
    {
          "slug": "integrations-systemes-connectes",
          "title": "Integrations & Connected Systems",
          "text": "We connect the tools you already use, CRM, ERP, website or databases, so your data flows without retyping and AI works on reliable information.",
          "benefit": "Move data between your tools without entering it twice.",
          "example": "An approved request on your website creates or updates the matching record in your CRM and your management software.",
          "visual": 2
    },
    {
          "slug": "automatisations-intelligentes",
          "title": "Intelligent Automations",
          "text": "Intelligent automations that connect the repetitive steps of your business processes and handle the information that flows between your tools.",
          "benefit": "Cut manual data entry, oversights and repetitive tasks.",
          "example": "A quote request from your website is analysed, the quote is drafted for review, then followed up automatically until it is signed.",
          "visual": 1
    },
    {
          "slug": "logiciels-applications-ia",
          "title": "Custom Software & Applications",
          "text": "Custom business software and applications, designed around your processes, your users and your rules, with AI built in where it brings a real gain.",
          "benefit": "A business tool that fits how your teams actually work.",
          "example": "Your service jobs are centralised in one business interface, with tracking, history and AI-assisted reports.",
          "visual": 3
    },
    {
          "slug": "data-intelligence",
          "title": "Data & Intelligence",
          "text": "Data centralisation and analysis, dashboards, anomaly detection, forecasts and recommendations when the data allows it.",
          "benefit": "Turn your business data into indicators that support decisions.",
          "example": "Your sales, margin and cash figures in one Power BI or Excel dashboard, updated without manual exports, with gaps to check flagged.",
          "visual": 4
    },
    {
          "slug": "formation-adoption-ia",
          "title": "AI Training & Adoption",
          "text": "Getting to grips with every solution we deliver is included in the project. This offer also trains your teams in AI without a project: practical workshops, good habits and usage rules.",
          "benefit": "Help your teams use AI independently and responsibly.",
          "example": "Using real situations, your team learns to use AI to draft, check and improve its customer replies.",
          "visual": 5
    }
],

  operations: {
    kicker: "After go-live",
    title: "Your solution evolves.\n^We keep it running",
    text: "For every solution that goes live, our proposal separates the build cost from the recurring payment required to run it. The amount depends on complexity, usage volumes and the services involved, with the terms agreed before work begins.",
    recurringLabel: "Recurring payment · defined in the contract",
    familyNote: "This support is available as an option for each of our six solutions.",
    included: {
      title: "Included in every project",
      items: ["Installation and go-live", "Training for your users", "Documentation handed over", "Support until your team is up to speed"],
      more: "Train your whole team in AI, even without a project",
    },
    cycle: ["Design", "Deployment", "Monitoring", "Improvement"],
    items: [
      { title: "Monitoring & maintenance", text: "We watch how the solution runs and step in, within the agreed scope, when something goes wrong." },
      { title: "Continuous optimisation", text: "We adjust behaviours and adapt the solution as usage patterns or technologies change." },
      { title: "Technical cost tracking", text: "We make hosting, AI model, storage and external service costs visible." },
      { title: "Support & changes", text: "The included support is stated in the contract. Significant new features receive a separate quote." },
    ],
  },





  faqTitle: "Common questions about our custom solutions",
  faq: [
    { q: "How does a project with Synode run?", a: "In six steps: scoping the business need, design and architecture, custom development, integration and go-live, documentation and training, then maintenance and changes if you entrust them to us. Each step is agreed with you." },
    { q: "Do you handle maintenance after deployment?", a: "Yes, if you entrust support and maintenance to us: we handle running, monitoring and maintenance for a recurring payment set out in the contract. If you do not, the solution is delivered and deployed, and you subscribe to the required services directly with the providers. Either way, Synode never absorbs those costs." },
    { q: "How long does it take to build a solution?", a: "It depends on the scope and the integrations. The schedule, its steps and its deadlines are set in the quote, before work starts." },
    { q: "Can the solution evolve later on?", a: "Yes. Significant changes or new features go through a fresh scoping exercise, a new quote and a written agreement before any work begins." },
    { q: "Who do we sign with?", a: "The contract and the invoices are issued by Productions Associées ASBL (Smart), which hosts Synode’s activity: a written contract, VAT invoices and a contracting party established in Belgium. Day to day, you work directly with us." },
  ],
} as const satisfies SiteContent["solutions"];
