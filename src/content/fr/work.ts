import type { WorkItem, WorkKind } from "../types";

/** La page Réalisations et ses fiches (Nexus, Coory). Réécrite à l'étape 6 de la refonte. */
export const work = {
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
    text: "Les projets de Synode : des logiciels métier que nous concevons et développons nous-mêmes, avec l’IA intégrée là où elle apporte un vrai gain. Nos deux premiers logiciels sont présentés tels qu’ils sont ; les projets clients s’ajouteront ici, avec l’accord de chaque client.",
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
    goalsNote: "Ce sont des objectifs, pas des résultats mesurés. Les données affichées sur les écrans de Nexus sont des exemples : aucun résultat ne sera publié ici avant d’avoir été mesuré en conditions réelles.",
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
        "Nous avons conçu Nexus pour notre propre prospection à Bruxelles et en Belgique : c’est le logiciel que nous utilisons réellement. Il fait le travail de veille commerciale : rechercher les entreprises dont l’activité correspond à nos solutions, rassembler les informations professionnelles utiles, les qualifier et préparer un premier contact adapté. Nexus reste un outil interne et n’est pas vendu comme un produit. En revanche, une solution similaire peut être conçue sur mesure pour toute équipe commerciale, autour de ses critères, de ses sources et de son CRM.",
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
        "Réunir dans un seul outil ce qu’un coach sportif gère aujourd’hui entre tableurs, PDF et messages : ses sportifs, ses programmes d’entraînement, son agenda et le suivi de ses paiements, pour passer moins de temps sur l’administratif et plus sur le coaching.",
      journey: ["Fiche du sportif", "Programme sur mesure", "Agenda des séances", "PDF du programme", "Suivi de l’activité"],
      context:
        "Coory est né d’un besoin concret : un coach sportif à Bruxelles préparait ses programmes dans des tableurs, recopiait à la main les exercices, les dates, les allures et les charges, puis exportait chaque programme en PDF. Ses séances, ses sportifs et ses paiements vivaient dans des outils séparés. Coory rassemble ce travail dans une seule application, pensée pour la musculation, le running, Hyrox et l’entraînement hybride. Coory est conçu et testé avec un coach en activité. Sur le même principe, une plateforme similaire peut être conçue sur mesure pour une salle de sport, un club ou une structure de coaching qui veut centraliser son activité.",
      does: [
        "Centraliser les fiches des sportifs : objectifs, disponibilités, repères d’allure et de charge, historique.",
        "Construire des programmes de musculation, de running, d’Hyrox ou hybrides à partir de modèles, et les remettre en PDF.",
        "Organiser l’agenda du coach : séances individuelles, séances de groupe et rendez-vous, plusieurs par jour si besoin.",
        "Suivre les paiements reçus, les sommes à encaisser, les dépenses et les tâches du quotidien.",
      ],
      aiRole:
        "Un assistant IA intégré aide le coach dans ses tâches courantes : ajouter une séance à l’agenda, créer une tâche, retrouver une information ou préparer un brouillon de programme à partir d’une simple demande. Il propose, il ne décide pas. Chaque action préparée par l’assistant est relue et validée par le coach avant d’être enregistrée.",
      goals: [
        "Réduire le temps passé à préparer et à mettre en page chaque programme.",
        "Retrouver en un instant les séances, les sportifs et les paiements, au même endroit.",
        "Supprimer les ressaisies entre tableurs, documents PDF et suivi des paiements.",
      ],
      limits: [
        "Les données des sportifs restent privées : elles sont hébergées dans l’Union européenne et séparées d’un coach à l’autre.",
        "L’IA ne prescrit aucun entraînement : chaque programme, chaque séance et chaque envoi restent décidés par le coach.",
      ],
      todo: false,
    },
  ] as readonly WorkItem[],
  /* La carte de Coory, partagée entre l'accueil, la page Réalisations et
     les données structurées de cette page. Le statut est écrit dans la
     description : il n'y a plus de pastille en haut des cartes (demande
     d'Antonino du 14/11). */
  cooryCard: {
    title: "Coory - Plateforme de coaching sportif",
    text: "Une application qui réunit les sportifs, les programmes d’entraînement, l’agenda et le suivi des paiements d’un coach sportif, avec un assistant IA dont chaque action est validée par le coach. Coory est actuellement en bêta.",
    tags: ["Agenda", "Programmes", "Comptabilité", "Assistant IA"],
  },
};
