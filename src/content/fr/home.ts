/**
 * L'ACCUEIL (brief de la refonte, 6.1) : un hero, la preuve, le problème,
 * les trois services, les réalisations, les trois étapes, les fondateurs,
 * une FAQ courte et l'appel final. Les étapes et l'appel final sont
 * communs à plusieurs pages : ils vivent dans `common.ts`.
 */
export const home = {
  /* Titre et description pour Google (brief, section 10, avec les
     décisions du 24/11/2026 : « agence de développement logiciel & IA »,
     et pour toutes les tailles d'entreprise). */
  metaTitle: "Synode · Agence de développement logiciel & IA à Bruxelles",
  metaDescription: "Nous connectons vos outils, intégrons l’IA et construisons vos logiciels sur mesure, des indépendants aux grandes entreprises. Appel gratuit de 30 min.",

  /* Le hero de la maquette d'Antonino (24/11/2026) : le métier et la ville
     dans le titre, comme Iterates ; centré, sans photo ni surtitre. */
  hero: {
    title: "Nous construisons la technologie\nqui fait avancer les entreprises.",
    accents: ["technologie", "avancer"],
    /* Le titre parle du bénéfice ; la description dit ce qu'est Synode, avec
       les mots du référencement (demande d'Antonino, 24/11/2026). */
    subtitle:
      "Synode, agence de développement logiciel & IA à Bruxelles, conçoit et développe des logiciels adaptés aux besoins de votre entreprise. Nous intégrons l’intelligence artificielle, connectons vos outils et automatisons vos processus pour accompagner votre croissance.",
    /* Le passage de la description en gras (sans italique). */
    emphasis: "agence de développement logiciel & IA à Bruxelles",
    note: "Gratuit et sans engagement · un seul processus suffit pour commencer",
  },

  /* LA PREUVE, au bas du hero : le bandeau défilant des logos des clients
     (24/11/2026 ; la ligne « Basés à Bruxelles… » a été retirée). Rien n'est inventé : un
     logo n'apparaît que s'il est dans cette liste, avec l'accord du client.
     [À COMPLÉTER] note Google ou Sortlist, citation d'un client. */
  proof: {
    logosLabel: "Ils nous font confiance",
    /* Le mot mis en avant de la phrase (Instrument Serif italique). */
    logosAccent: "confiance",
    /* Les logos en silhouettes blanches sur fond transparent
       (`public/clients/`), affichés en gris foncé sur le bandeau blanc.
       `display` est la hauteur affichée, réglée à l'œil pour que tous
       aient le même poids visuel. */
    logos: [
      { src: "/clients/behybrid.png", alt: "BEHYBRID", width: 900, height: 90, display: 16 },
      { src: "/clients/betapro.png", alt: "Betapro, construction et rénovation", width: 198, height: 160, display: 48 },
      { src: "/clients/baert.png", alt: "Baert", width: 434, height: 88, display: 24 },
      { src: "/clients/picarle.png", alt: "Picarle Rénovation", width: 155, height: 160, display: 48 },
      { src: "/clients/group-cleaning.png", alt: "Group Cleaning & Services", width: 133, height: 160, display: 48 },
      { src: "/clients/glb-coaching.png", alt: "GLB Coaching", width: 437, height: 160, display: 32 },
      { src: "/clients/batisseurs-espoir.png", alt: "Bâtisseurs d’espoir ASBL", width: 460, height: 160, display: 36 },
    ] as readonly { src: string; alt: string; width: number; height: number; display: number }[],
    rating: "",
    quote: { text: "", author: "" },
  },

  problems: {
    title: "Ça vous parle ?",
    items: [
      { strong: "Vous recopiez les mêmes informations", rest: " dans trois logiciels différents." },
      { strong: "Vos devis, relances et réponses clients", rest: " prennent des heures chaque semaine." },
      { strong: "Vos chiffres sont éparpillés", rest: ", et vous les compilez à la main dans Excel." },
    ],
  },

  services: {
    title: "Ce que nous faisons",
    /* Pour tout le monde, dit une fois (décision d'Antonino du 24/11/2026). */
    audience: "Pour les indépendants, les PME et les grandes entreprises.",
    more: "En savoir plus",
    items: [
      {
        key: "connect",
        title: "Connecter vos outils",
        text: "Gestion clients, facturation, site, e-mails : on les relie pour que l’information circule toute seule.",
      },
      {
        key: "ai",
        title: "Mettre l’IA au travail",
        text: "L’IA prépare les devis, trie les demandes, répond aux questions fréquentes. Vous choisissez ce qu’elle fait seule et ce qu’elle vous soumet.",
      },
      {
        key: "software",
        title: "Créer votre logiciel sur mesure",
        text: "Application web ou mobile, outil interne, portail client : quand aucun outil du marché ne convient, on construit celui qui correspond à votre façon de travailler.",
      },
    ] as const,
  },

  work: {
    title: "Ce que nous avons construit",
    link: "Toutes nos réalisations",
  },

  founders: {
    title: "Vous parlez directement à ceux qui construisent",
    link: "Qui sommes-nous",
  },

  faq: {
    title: "Questions fréquentes",
    /* Une question sans réponse ne s'affiche pas. */
    items: [
      {
        q: "Faut-il changer nos logiciels ?",
        a: "Non. On part de vos outils actuels et on les connecte. On ne remplace que ce qui bloque vraiment.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Le premier appel est gratuit. Le cadrage est payant, puis déduit du prix du projet. Le devis sépare le développement, les frais de fonctionnement et les évolutions.",
      },
      {
        /* La réponse du site actuel, sans délai inventé. [À COMPLÉTER] une
           fourchette réaliste, par exemple « 2 à 6 semaines pour un premier
           projet », quand Synode en aura une. */
        q: "Combien de temps faut-il ?",
        a: "La durée dépend du périmètre, du nombre d’outils à relier, de la disponibilité des données et des tests nécessaires. Le calendrier est fixé par écrit avant le démarrage.",
      },
      {
        q: "Proposez-vous des solutions sans IA ?",
        a: "Oui. On ajoute de l’IA uniquement quand elle apporte quelque chose.",
      },
    ],
  },
} as const;
