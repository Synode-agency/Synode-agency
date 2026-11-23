import type { Locale } from "@/lib/content";

/**
 * Les réalisations.
 *
 * La page présente uniquement les projets dont l'état et le fonctionnement
 * peuvent être décrits honnêtement. Nexus est un outil interne opérationnel ;
 * Coory est une plateforme de coaching sportif dont l'espace coach est
 * terminé ; les futurs projets clients ne seront publiés qu'avec leur
 * autorisation.
 *
 * Pour ajouter une vraie réalisation : compléter l'entrée, poser `todo` à
 * `false`, puis la relier à un cas d'usage lorsqu'elle l'illustre.
 */

export type WorkKind = "internal" | "beta" | "demo" | "client" | "software";

export type WorkItem = {
  slug: string;
  /** Real project capture, when supplied. Otherwise show an explicit placeholder. */
  image?: { src: string; alt: string };
  kind: WorkKind;
  title: string;
  /** La partie du titre peinte en bleu. Doit figurer telle quelle dans `title`. */
  accent?: string;
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
    beta: "Bêta",
    demo: "Démonstration",
    client: "Projet client",
    software: "Logiciel métier",
  },
  intro: {
    kicker: "Réalisations",
    title: "Ce que nous construisons,\n^et où nous en sommes",
    text: "Les projets de Synode : des logiciels métier que nous concevons et développons nous-mêmes, avec l’IA intégrée là où elle apporte un vrai gain. Nos deux premiers logiciels sont présentés tels qu’ils sont ; les projets clients s’ajouteront ici, avec l’accord de chaque client.",
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
    contextTitle: "Pourquoi nous avons\nconstruit Nexus",
    doesTitle: "Ce que Nexus fait aujourd’hui",
    aiTitle: "Comment l’IA assiste la recherche et la qualification",
    goalsTitle: "Ce que nous cherchons à obtenir avec Nexus",
    goalsNote: "Ce sont des objectifs, pas des résultats mesurés. Les données affichées sur les écrans de Nexus sont des exemples : aucun résultat ne sera publié ici avant d’avoir été mesuré en conditions réelles.",
    limitsTitle: "Limites et validation humaine",
    backLabel: "Toutes les réalisations",
    cta: "Un besoin similaire ?",
    ctaText:
      "Nous concevons des solutions sur mesure, avec l’IA intégrée, à partir de vos processus, de vos outils et de vos données. Décrivez-nous le besoin que vous voulez traiter.",
  },
  cta: {
    title: "Construisons une solution adaptée à votre activité",
    text: "Votre solution sur mesure, avec l’IA intégrée, partira de vos processus, de vos outils et de vos données. Présentez-nous le besoin métier que vous souhaitez améliorer.",
  },
  todoLabel: "À compléter avant mise en ligne",
  todoText:
    "Cette fiche attend ses captures réelles et la description de son parcours. Tant qu’elles n’existent pas, elle décrit l’intention du projet et son état, sans prétendre montrer un produit fini.",
  items: [
    {
      slug: "nexus",
      kind: "internal" as WorkKind,
      title: "Nexus - Logiciel de prospection commerciale",
      accent: "prospection commerciale",
      status: "Outil interne · opérationnel",
      problem:
        "Une équipe commerciale passe des heures à chercher des entreprises, à comprendre leur activité et à décider qui contacter. Nexus fait ce travail de veille et de qualification pour nous, à Bruxelles et en Belgique, et prépare un premier contact pertinent.",
      journey: ["Veille des entreprises", "Analyse IA", "Qualification", "Préparation du premier contact", "Suivi commercial"],
      context:
        "Nous avons conçu Nexus pour notre propre prospection à Bruxelles et en Belgique : c’est le logiciel que nous utilisons réellement. Il fait le travail de veille commerciale : rechercher les entreprises dont l’activité correspond à nos solutions, rassembler les informations professionnelles utiles, les qualifier et préparer un premier contact adapté. Nexus reste un outil interne et n’est pas vendu comme un produit. En revanche, une solution similaire peut être conçue sur mesure pour toute équipe commerciale, autour de ses critères, de ses sources et de son CRM.",
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
        "Nexus est notre vrai logiciel de prospection, réservé à notre usage et inaccessible depuis le site : les données qu’il traite ne sont jamais publiées. Les données affichées sur ces écrans sont des exemples.",
        "Chaque premier message est préparé par l’outil, puis relu et envoyé par un humain.",
      ],
      todo: false,
    },
    {
      slug: "coory",
      kind: "beta" as WorkKind,
      title: "Coory - Plateforme de coaching sportif",
      accent: "coaching sportif",
      status: "Espace coach opérationnel · espace sportif en préparation",
      problem:
        "Réunir dans un seul outil ce qu’un coach sportif gère aujourd’hui entre tableurs, PDF et messages : ses sportifs, ses programmes d’entraînement, son agenda et le suivi de ses paiements, pour passer moins de temps sur l’administratif et plus sur le coaching.",
      journey: ["Fiche du sportif", "Programme sur mesure", "Agenda des séances", "PDF du programme", "Suivi de l’activité"],
      context:
        "Coory est né d’un besoin concret : un coach sportif à Bruxelles préparait ses programmes dans des tableurs, recopiait à la main les exercices, les dates, les allures et les charges, puis exportait chaque programme en PDF. Ses séances, ses sportifs et ses paiements vivaient dans des outils séparés. Coory rassemble ce travail dans une seule application, pensée pour la musculation, le running, Hyrox et l’entraînement hybride. Coory est conçu et testé avec un coach en activité, et son espace coach est déjà complet. Sur le même principe, une plateforme similaire peut être conçue sur mesure pour une salle de sport, un club ou une structure de coaching qui veut centraliser son activité.",
      does: [
        "Centraliser les fiches des sportifs : objectifs, disponibilités, repères d’allure et de charge, historique.",
        "Construire des programmes de musculation, de running, d’Hyrox ou hybrides à partir de modèles, et les remettre en PDF.",
        "Organiser l’agenda du coach : séances individuelles, séances de groupe et rendez-vous, plusieurs par jour si besoin.",
        "Suivre les paiements reçus, les sommes à encaisser, les dépenses et les tâches du quotidien.",
      ],
      aiRole:
        "Un assistant IA intégré aide le coach dans ses tâches courantes : ajouter une séance à l’agenda, créer une tâche, retrouver une information ou préparer un brouillon de programme à partir d’une simple demande. Il propose, il ne décide pas. Chaque action préparée par l’assistant est relue et validée par le coach avant d’être enregistrée.",
      goals: [
        "Réduire le temps passé à préparer et à mettre en page chaque programme.",
        "Retrouver en un instant les séances, les sportifs et les paiements, au même endroit.",
        "Supprimer les ressaisies entre tableurs, documents PDF et suivi des paiements.",
      ],
      limits: [
        "Les données des sportifs restent privées : elles sont hébergées dans l’Union européenne et séparées d’un coach à l’autre.",
        "L’IA ne prescrit aucun entraînement : chaque programme, chaque séance et chaque envoi restent décidés par le coach.",
      ],
      todo: false,
    },
  ] as readonly WorkItem[],
};

const en = {
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
        "Coory comes from a concrete need: a sports coach in Brussels was building every programme in spreadsheets, copying exercises, dates, paces and loads by hand, then exporting each one as a PDF. Sessions, athletes and payments lived in separate tools. Coory brings this work into a single application, designed for strength training, running, Hyrox and hybrid training. Coory is designed and tested with a working coach, and its coach workspace is already complete. On the same principle, a similar platform can be designed for a gym, a club or a coaching business that wants to centralise its activity.",
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
};

export function work(locale: Locale) {
  return locale === "fr" ? fr : en;
}

export function workItems(locale: Locale) {
  return work(locale).items;
}

/** La carte de Coory, partagée entre l'accueil, la page Réalisations et
 * les données structurées de cette page. */
export function cooryCardCopy(locale: Locale) {
  const fr = locale === "fr";
  return {
    title: fr ? "Coory - Plateforme de coaching sportif" : "Coory - Sports coaching platform",
    /* Le statut est écrit dans la description : il n'y a plus de pastille
       en haut des cartes (demande d'Antonino du 14/11). */
    text: fr
      ? "Une application qui réunit les sportifs, les programmes d’entraînement, l’agenda et le suivi des paiements d’un coach sportif, avec un assistant IA dont chaque action est validée par le coach. Coory est actuellement en bêta."
      : "An application that brings together a sports coach’s athletes, training programmes, schedule and payment tracking, with an AI assistant whose every action the coach approves. Coory is currently in beta, and available in French only.",
    tags: fr
      ? ["Agenda", "Programmes", "Comptabilité", "Assistant IA"]
      : ["Scheduling", "Programmes", "Accounting", "AI assistant"],
  };
}

/**
 * L'accès de démonstration de Coory (compte partagé, données fictives remises
 * à zéro chaque nuit, Assistant IA inclus), décidé le 14/11/2026.
 *
 * Les valeurs viennent des variables Netlify, JAMAIS du code : on change le
 * mot de passe ou le code d'accès sans toucher au site.
 *   NEXT_PUBLIC_COORY_DEMO_URL       adresse de connexion (…/login)
 *   NEXT_PUBLIC_COORY_DEMO_EMAIL     adresse du compte de démo
 *   NEXT_PUBLIC_COORY_DEMO_PASSWORD  son mot de passe, public par nature
 *
 * Le code d'accès de la bêta (inscription libre) n'est PLUS affiché depuis le
 * 15/11/2026 : les visiteurs de Synode n'essaient Coory que par ce compte.
 *
 * ⚠ Sans adresse, le bouton « Essayer la démo » s'affiche désactivé, sans lien,
 * et l'encadré des accès n'apparaît pas.
 */
export const COORY_DEMO = {
  url: process.env.NEXT_PUBLIC_COORY_DEMO_URL ?? "",
  email: process.env.NEXT_PUBLIC_COORY_DEMO_EMAIL ?? "",
  password: process.env.NEXT_PUBLIC_COORY_DEMO_PASSWORD ?? "",
};
export const COORY_DEMO_URL = COORY_DEMO.url;

export function findWork(locale: Locale, slug: string) {
  return workItems(locale).find((w) => w.slug === slug);
}
