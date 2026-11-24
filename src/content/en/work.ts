import type { WorkContent, WorkItem, WorkKind } from "../types";

/** La page Réalisations et ses fiches (Nexus, Coory). Réécrite à l'étape 6 de la refonte. */
export const work = {
  kinds: {
    internal: "Internal tool",
    beta: "Beta",
    demo: "Demo",
    client: "Client project",
    software: "Business software",
  },
  intro: {
    kicker: "Work",
    title: "What we are building\n^and where we stand",
    text: "Synode’s projects: business software we design and build ourselves, with AI built in where it brings a real gain. Our first two products are shown as they are; client projects will be added here, with each client’s agreement.",
  },
  empty: {
    title: "More projects are in preparation",
    text: "Future projects will join this page once they are advanced enough to be presented with a status and content that accurately reflect their current state.",
  },
  clientsEmpty: {
    title: "No client project published yet",
    text: "A project appears here only after delivery and with the client’s written agreement. Nothing is published before both.",
  },
  detail: {
    contextTitle: "Why we\nbuilt Nexus",
    doesTitle: "What Nexus does today",
    aiTitle: "How AI supports research and qualification",
    goalsTitle: "What we aim to achieve with Nexus",
    goalsNote: "These are goals, not measured results. The data shown on the Nexus screens is sample data: no result will be published here before it has been measured in real conditions.",
    limitsTitle: "Limits and human approval",
    backLabel: "All work",
    cta: "Something similar in mind?",
    ctaText:
      "We build custom solutions with built-in AI from your processes, your tools and your data. Tell us about the need you want to tackle.",
  },
  cta: {
    title: "Let’s build a solution\nthat fits your business",
    text: "Your custom solution, with built-in AI, will start from your processes, tools and data. Tell us about the business need you want to improve.",
  },
  todoLabel: "To complete before launch",
  todoText:
    "This entry is waiting for its real screenshots and a description of the journey. Until they exist, it describes the intent and the current state, without pretending to show a finished product.",
  items: [
    {
      slug: "nexus",
      kind: "internal" as WorkKind,
      title: "Nexus - Sales prospecting software",
      accent: "sales prospecting",
      status: "Internal tool · operational",
      problem:
        "A sales team spends hours searching for companies, understanding what they do and deciding who to contact. Nexus does this intelligence and qualification work for us, in Brussels and Belgium, and prepares a relevant first approach.",
      journey: ["Company monitoring", "AI analysis", "Qualification", "First approach preparation", "Sales follow-up"],
      context:
        "We designed Nexus for our own prospecting in Brussels and Belgium: it is the software we actually use. It handles sales intelligence: finding companies whose business matches our solutions, gathering useful professional information, qualifying them and preparing a suitable first approach. Nexus remains an internal tool and is not sold as a product. However, a similar solution can be designed for any sales team, around its own criteria, sources and CRM.",
      does: [
        "Research companies in Brussels and Belgium using public professional sources.",
        "Gather useful information about their activity, tools and potential needs.",
        "Help qualify companies so prospecting focuses on the most relevant contacts.",
        "Prepare the information needed for a personalised approach and organise sales follow-up.",
      ],
      aiRole:
        "AI analyses and summarises the public professional information gathered about each company. It helps understand the business, identify potential needs, assess whether an approach is relevant and prepare the information needed for the message. The decision to contact a company and the sending of every message remain subject to human approval.",
      goals: [
        "Cut the time spent preparing an approach.",
        "Identify relevant companies and professional contacts in Brussels and Belgium more quickly.",
        "Avoid contacting companies our work makes no sense for.",
      ],
      limits: [
        "Nexus is our own prospecting software, for our use only and not reachable from the website: the data it handles is never published. The data shown on these screens is sample data.",
        "Each first message is prepared by the tool, then reviewed and sent by a person.",
      ],
      todo: false,
    },
    {
      slug: "coory",
      kind: "beta" as WorkKind,
      title: "Coory - Sports coaching platform",
      accent: "Sports coaching",
      status: "Coach workspace operational · athlete workspace in preparation",
      problem:
        "Bringing together in one tool what a sports coach currently juggles across spreadsheets, PDFs and messages: athletes, training programmes, schedule and payment tracking, so less time goes into admin and more into coaching.",
      journey: ["Athlete profile", "Tailored programme", "Session schedule", "Programme PDF", "Activity tracking"],
      context:
        "Coory comes from a concrete need: a sports coach in Brussels was building every programme in spreadsheets, copying exercises, dates, paces and loads by hand, then exporting each one as a PDF. Sessions, athletes and payments lived in separate tools. Coory brings this work into a single application, designed for strength training, running, Hyrox and hybrid training. Coory is designed and tested with a working coach. On the same principle, a similar platform can be designed for a gym, a club or a coaching business that wants to centralise its activity.",
      does: [
        "Centralise athlete profiles: goals, availability, pace and load benchmarks, history.",
        "Build strength, running, Hyrox or hybrid programmes from templates, and deliver them as PDFs.",
        "Organise the coach’s schedule: one-to-one sessions, group sessions and appointments, several a day when needed.",
        "Track payments received, amounts to collect, expenses and day-to-day tasks.",
      ],
      aiRole:
        "A built-in AI assistant helps the coach with everyday tasks: adding a session to the schedule, creating a task, finding information or preparing a draft programme from a simple request. It suggests, it does not decide. Every action prepared by the assistant is reviewed and approved by the coach before it is saved.",
      goals: [
        "Cut the time spent preparing and laying out each programme.",
        "Find sessions, athletes and payments instantly, in one place.",
        "Remove the retyping between spreadsheets, PDF documents and payment tracking.",
      ],
      limits: [
        "Athlete data stays private: it is hosted in the European Union and kept separate from one coach to another.",
        "The AI never prescribes training: every programme, session and message remains the coach’s decision.",
      ],
      todo: false,
    },
  ] as readonly WorkItem[],
  cooryCard: {
    title: "Coory - Sports coaching platform",
    text: "An application that brings together a sports coach’s athletes, training programmes, schedule and payment tracking, with an AI assistant whose every action the coach approves. Coory is currently in beta, and available in French only.",
    tags: ["Scheduling", "Programmes", "Accounting", "AI assistant"],
  },
} satisfies WorkContent;
