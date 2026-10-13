import type { Locale } from "@/lib/content";

/**
 * Les réalisations.
 *
 * La page présente uniquement les projets dont l'état et le fonctionnement
 * peuvent être décrits honnêtement. Nexus est un outil interne opérationnel ;
 * les futurs projets clients ne seront publiés qu'avec leur autorisation.
 *
 * Pour ajouter une vraie réalisation : compléter l'entrée, poser `todo` à
 * `false`, puis la relier à un cas d'usage lorsqu'elle l'illustre.
 */

export type WorkKind = "internal" | "demo" | "client";

export type WorkItem = {
  slug: string;
  /** Real project capture, when supplied. Otherwise show an explicit placeholder. */
  image?: { src: string; alt: string };
  kind: WorkKind;
  title: string;
  /** L'état réel, affiché tel quel. Jamais « bientôt disponible ». */
  status: string;
  /** Le problème métier, en une phrase. */
  problem: string;
  /** Parcours fonctionnel présenté sans le confondre avec un résultat livré. */
  journey: readonly string[];
  /** Le contexte, sur la fiche détaillée. */
  context: string;
  /** Ce que la solution fait réellement aujourd'hui. */
  does: readonly string[];
  /** Le rôle de l'IA, dit explicitement. */
  aiRole: string;
  /** Ce qu'on vise, PAS ce qu'on a mesuré. */
  goals: readonly string[];
  /** Les limites, et ce qui reste validé par un humain. */
  limits: readonly string[];
  /** `true` tant que la fiche attend captures, vidéo ou contenu réel. */
  todo: boolean;
};

const fr = {
  kinds: {
    internal: "Outil interne",
    demo: "Démonstration",
    client: "Projet client",
  },
  intro: {
    kicker: "Réalisations",
    title: "Ce que nous construisons,\n^et où nous en sommes",
    text: "Découvrez les projets IA de Synode : outils internes et logiciels métier conçus autour de processus d’entreprise concrets. Chaque projet présente son état réel, sans résultat inventé ni référence client non autorisée.",
  },
  empty: {
    title: "D’autres projets sont en préparation",
    text: "Les prochains projets rejoindront cette page lorsqu’ils seront suffisamment avancés pour être présentés avec un statut et un contenu fidèles à leur état réel.",
  },
  clientsEmpty: {
    title: "Pas encore de projet client publié",
    text: "Un projet n’apparaît ici qu’après sa livraison et avec l’accord écrit du client. Rien n’est publié avant ces deux conditions.",
  },
  detail: {
    contextTitle: "Le contexte de\nnotre prospection B2B",
    doesTitle: "Ce que Nexus fait aujourd’hui",
    aiTitle: "Comment l’IA assiste la recherche et la qualification",
    goalsTitle: "Ce que nous cherchons à obtenir avec Nexus",
    goalsNote: "Ce sont des objectifs, pas des résultats mesurés. Aucun chiffre ne sera publié ici avant d’avoir été mesuré en conditions réelles.",
    limitsTitle: "Limites et validation humaine",
    backLabel: "Toutes les réalisations",
    cta: "Un besoin similaire ?",
    ctaText:
      "Nous concevons des solutions IA sur mesure à partir de vos processus, de vos outils et de vos données. Décrivez-nous le besoin que vous voulez traiter.",
  },
  cta: {
    title: "Construisons une solution IA\nadaptée à votre activité",
    text: "Votre solution IA sur mesure partira de vos processus, de vos outils et de vos données. Présentez-nous le besoin métier que vous souhaitez améliorer.",
  },
  todoLabel: "À compléter avant mise en ligne",
  todoText:
    "Cette fiche attend ses captures réelles et la description de son parcours. Tant qu’elles n’existent pas, elle décrit l’intention du projet et son état, sans prétendre montrer un produit fini.",
  items: [
    {
      slug: "nexus",
      kind: "internal" as WorkKind,
      title: "Nexus -\nLogiciel de prospection\nB2B assisté par IA",
      status: "Outil interne · opérationnel",
      problem:
        "Identifier rapidement les entreprises à Bruxelles et en Belgique susceptibles d’avoir besoin de solutions IA sur mesure, trouver les contacts professionnels pertinents et préparer une prise de contact ciblée sans y passer la semaine.",
      journey: ["Recherche d’entreprises", "Analyse IA", "Qualification", "Préparation de la prise de contact", "Suivi commercial"],
      context:
        "Nexus a été conçu pour notre prospection B2B à Bruxelles et en Belgique. L’objectif est de rechercher plus rapidement les entreprises susceptibles d’avoir besoin de solutions IA sur mesure, de rassembler les informations professionnelles utiles, d’identifier les contacts pertinents et de préparer une prise de contact adaptée. Nexus reste un outil interne et n’est pas vendu comme un produit. En revanche, une solution similaire peut être conçue sur mesure pour une entreprise qui souhaite structurer, accélérer et mieux cibler sa propre prospection.",
      does: [
        "Rechercher des entreprises à Bruxelles et en Belgique à partir de sources professionnelles publiques.",
        "Rassembler les informations utiles sur leur activité, leurs outils et leurs besoins potentiels.",
        "Aider à qualifier les entreprises pour concentrer la prospection sur les contacts les plus pertinents.",
        "Préparer les éléments nécessaires à une prise de contact personnalisée et organiser le suivi commercial.",
      ],
      aiRole:
        "L’IA analyse et synthétise les informations professionnelles publiques recueillies sur chaque entreprise. Elle aide à comprendre son activité, à repérer des besoins potentiels, à évaluer la pertinence d’une prise de contact et à préparer les informations utiles au message. La décision de contacter une entreprise et l’envoi restent toujours validés par une personne.",
      goals: [
        "Réduire le temps passé à préparer une prise de contact.",
        "Identifier plus rapidement les entreprises et les contacts professionnels pertinents à Bruxelles et en Belgique.",
        "Éviter de contacter des entreprises pour qui notre travail n’a pas de sens.",
      ],
      limits: [
        "Aucune donnée personnelle n’est exposée publiquement, et cet outil n’est pas accessible depuis le site.",
        "Toute prise de contact reste écrite et envoyée par un humain.",
      ],
      todo: false,
    },
  ] as readonly WorkItem[],
};

const en = {
  kinds: {
    internal: "Internal tool",
    demo: "Demo",
    client: "Client project",
  },
  intro: {
    kicker: "Work",
    title: "What we are building,\n^and where we stand",
    text: "Explore Synode’s AI projects: internal tools and business software designed around concrete business processes. Every project shows its actual status, with no invented results or unauthorised client references.",
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
    contextTitle: "The context of\nour B2B prospecting",
    doesTitle: "What Nexus does today",
    aiTitle: "How AI supports research and qualification",
    goalsTitle: "What we aim to achieve with Nexus",
    goalsNote: "These are goals, not measured results. No figure will be published here before it has been measured in real conditions.",
    limitsTitle: "Limits and human approval",
    backLabel: "All work",
    cta: "Something similar in mind?",
    ctaText:
      "We build custom AI solutions from your processes, your tools and your data. Tell us about the need you want to tackle.",
  },
  cta: {
    title: "Let’s build an AI solution\nthat fits your business",
    text: "Your custom AI solution will start from your processes, tools and data. Tell us about the business need you want to improve.",
  },
  todoLabel: "To complete before launch",
  todoText:
    "This entry is waiting for its real screenshots and a description of the journey. Until they exist, it describes the intent and the current state, without pretending to show a finished product.",
  items: [
    {
      slug: "nexus",
      kind: "internal" as WorkKind,
      title: "Nexus — AI-assisted B2B prospecting software",
      status: "Internal tool · operational",
      problem:
        "Quickly identifying companies in Brussels and Belgium that may need custom AI solutions, finding the relevant professional contacts and preparing a targeted approach without spending the week on it.",
      journey: ["Company research", "AI analysis", "Qualification", "Approach preparation", "Sales follow-up"],
      context:
        "Nexus was designed for our B2B prospecting in Brussels and Belgium. Its purpose is to find companies that may need custom AI solutions more quickly, gather useful professional information, identify relevant contacts and prepare a suitable approach. Nexus remains an internal tool and is not sold as a product. However, a similar solution can be designed for a company that wants to structure, accelerate and better target its own prospecting.",
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
        "No personal data is exposed publicly, and this tool is not reachable from the website.",
        "Every approach is still written and sent by a person.",
      ],
      todo: false,
    },
  ] as readonly WorkItem[],
};

export function work(locale: Locale) {
  return locale === "fr" ? fr : en;
}

export function workItems(locale: Locale) {
  return work(locale).items;
}

/** Contenu du second projet, partagé entre ses cartes et les données
 * structurées de la page Réalisations. */
export function projectTwoCardCopy(locale: Locale) {
  const fr = locale === "fr";
  return {
    title: fr ? "Projet 2" : "Project 2",
    text: fr
      ? "De la demande reçue à l’action validée, sur des données fictives identifiées comme telles. Elle sera publiée ici quand elle fonctionnera réellement."
      : "From the incoming request to the approved action, on clearly fictional data. It will be published here once it genuinely runs.",
    tags: fr
      ? ["Agent IA", "Automatisation", "Validation humaine"]
      : ["AI agent", "Automation", "Human approval"],
    status: fr ? "En préparation" : "In preparation",
    publication: fr ? "Publication à venir" : "Publication to come",
    soon: fr ? "bientôt" : "soon",
  };
}

export function findWork(locale: Locale, slug: string) {
  return workItems(locale).find((w) => w.slug === slug);
}
