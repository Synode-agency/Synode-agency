import type { Locale } from "@/lib/content";

/**
 * Les réalisations.
 *
 * ⚠ CE FICHIER EST VOLONTAIREMENT PRESQUE VIDE, et c'est la seule chose
 * honnête à faire aujourd'hui.
 *
 * Synode démarre. Il n'existe à ce jour aucun projet client livré, aucune
 * démonstration fonctionnelle, aucune capture réelle. Remplir cette page
 * d'exemples inventés serait exactement ce que les références interdisent,
 * et c'est aussi ce qui se repère le plus vite chez un prestataire.
 *
 * La page liste donc une seule entrée, Synode Prospect, avec son état réel,
 * et elle dit clairement que les démonstrations arrivent. Chaque zone qui
 * attend de la matière porte un `todo` affiché en clair sur le site : un
 * emplacement réservé qu'on ne voit pas est un emplacement qu'on oublie de
 * remplir avant la mise en ligne.
 *
 * Pour ajouter une vraie réalisation : compléter l'entrée, poser `todo` à
 * `false`, et renseigner `demo` dans `use-cases.ts` si elle illustre un cas.
 */

export type WorkKind = "internal" | "demo" | "client";

export type WorkItem = {
  slug: string;
  kind: WorkKind;
  title: string;
  /** L'état réel, affiché tel quel. Jamais « bientôt disponible ». */
  status: string;
  /** Le problème métier, en une phrase. */
  problem: string;
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
    title: "Ce que nous construisons,\n^et où nous en sommes.",
    text: "Nous démarrons, et nous préférons le dire. Cette page ne montre que ce qui existe réellement : pas de logo client que nous n’avons pas, pas de capture reconstituée.",
  },
  empty: {
    title: "Les démonstrations arrivent",
    text: "Nous préparons une à deux démonstrations avec des données fictives, identifiées comme telles, pour montrer un parcours complet de bout en bout. Elles seront publiées ici quand elles fonctionneront réellement.",
  },
  clientsEmpty: {
    title: "Pas encore de projet client publié",
    text: "Un projet n’apparaît ici qu’après sa livraison et avec l’accord écrit du client. Rien n’est publié avant ces deux conditions.",
  },
  detail: {
    contextTitle: "Le contexte",
    doesTitle: "Ce que l’outil fait aujourd’hui",
    aiTitle: "Le rôle de l’IA",
    goalsTitle: "Ce que nous cherchons à obtenir",
    goalsNote: "Ce sont des objectifs, pas des résultats mesurés. Aucun chiffre ne sera publié ici avant d’avoir été mesuré en conditions réelles.",
    limitsTitle: "Limites et validation humaine",
    backLabel: "Toutes les réalisations",
    cta: "Un besoin similaire ? Parlons-en",
  },
  cta: {
    title: "Construisons une solution\n^adaptée à votre activité.",
    text: "Votre projet ne ressemblera à aucun de ceux-ci, et c’est normal : chacun part d’un contexte différent.",
  },
  todoLabel: "À compléter avant mise en ligne",
  todoText:
    "Cette fiche attend ses captures réelles et la description de son parcours. Tant qu’elles n’existent pas, elle décrit l’intention du projet et son état, sans prétendre montrer un produit fini.",
  items: [
    {
      slug: "synode-prospect",
      kind: "internal" as WorkKind,
      title: "Synode Prospect",
      status: "Outil interne · en construction",
      problem:
        "Identifier les entreprises à qui notre travail serait réellement utile, et préparer la prise de contact sans y passer la semaine.",
      context:
        "C’est notre propre outil, construit pour notre propre prospection. Nous le citons ici pour une raison simple : c’est ce que nous savons montrer aujourd’hui avec certitude, parce que nous l’utilisons nous-mêmes. Il n’est pas un produit, il n’est pas à vendre, et il n’est pas terminé.",
      does: [],
      aiRole:
        "L’outil s’appuie sur l’IA pour rassembler et résumer des informations publiques. Le détail de son fonctionnement sera décrit ici quand la version en cours sera stabilisée.",
      goals: [
        "Réduire le temps passé à préparer une prise de contact.",
        "Éviter de contacter des entreprises pour qui notre travail n’a pas de sens.",
      ],
      limits: [
        "Aucune donnée personnelle n’est exposée publiquement, et cet outil n’est pas accessible depuis le site.",
        "Toute prise de contact reste écrite et envoyée par un humain.",
      ],
      todo: true,
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
    title: "What we are building,\n^and where we stand.",
    text: "We are starting out, and we would rather say so. This page only shows what genuinely exists: no client logos we do not have, no reconstructed screenshots.",
  },
  empty: {
    title: "Demos are on the way",
    text: "We are preparing one or two demos with fictional data, labelled as such, to show a full journey end to end. They will be published here once they actually work.",
  },
  clientsEmpty: {
    title: "No client project published yet",
    text: "A project appears here only after delivery and with the client’s written agreement. Nothing is published before both.",
  },
  detail: {
    contextTitle: "The context",
    doesTitle: "What the tool does today",
    aiTitle: "What the AI does",
    goalsTitle: "What we are aiming for",
    goalsNote: "These are goals, not measured results. No figure will be published here before it has been measured in real conditions.",
    limitsTitle: "Limits and human approval",
    backLabel: "All work",
    cta: "Something similar in mind? Let’s talk",
  },
  cta: {
    title: "Let’s build something\n^that fits your business.",
    text: "Your project will look like none of these, and that is normal: each one starts from a different context.",
  },
  todoLabel: "To complete before launch",
  todoText:
    "This entry is waiting for its real screenshots and a description of the journey. Until they exist, it describes the intent and the current state, without pretending to show a finished product.",
  items: [
    {
      slug: "synode-prospect",
      kind: "internal" as WorkKind,
      title: "Synode Prospect",
      status: "Internal tool · in progress",
      problem:
        "Finding the companies our work would genuinely help, and preparing the approach without spending the week on it.",
      context:
        "This is our own tool, built for our own prospecting. We mention it for a simple reason: it is what we can honestly show today, because we use it ourselves. It is not a product, it is not for sale, and it is not finished.",
      does: [],
      aiRole:
        "The tool uses AI to gather and summarise public information. How it works in detail will be described here once the current version is stable.",
      goals: [
        "Cut the time spent preparing an approach.",
        "Avoid contacting companies our work makes no sense for.",
      ],
      limits: [
        "No personal data is exposed publicly, and this tool is not reachable from the website.",
        "Every approach is still written and sent by a person.",
      ],
      todo: true,
    },
  ] as readonly WorkItem[],
};

export function work(locale: Locale) {
  return locale === "fr" ? fr : en;
}

export function workItems(locale: Locale) {
  return work(locale).items;
}

export function findWork(locale: Locale, slug: string) {
  return workItems(locale).find((w) => w.slug === slug);
}
