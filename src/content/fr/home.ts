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
    /* Titre du 24/11/2026 (Antonino) : les métiers de Synode. Une ligne
       par `\n` ; « logiciel » et « IA » en Castoro italique bleu
       (25/11/2026).
       Espaces insécables dans « IA & » et « systèmes connectés » : sur
       téléphone, le titre tient en trois lignes équilibrées
       (« Développement / logiciel, IA & / systèmes connectés. »). */
    title: "Développement logiciel,\nIA & systèmes connectés.",
    accents: ["logiciel", "IA"],
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

  /* NOTRE APPROCHE (24/11/2026), à la place de « Ça vous parle ? ». Le
     texte est celui d'Antonino, mot pour mot ; seule l'espace avant « : »
     est insécable, pour que le deux-points ne parte pas seul à la ligne.
     Un seul paragraphe, en deux temps (`ApproachScroll`) : la première
     phrase (`lead`) s'écrit à l'arrivée de la section, la suite (`rest`)
     par-dessus la photo. */
  approach: {
    /* Pas affiché : nomme la section pour les lecteurs d'écran. */
    label: "Notre approche",
    /* Un seul paragraphe, qui se remplit au défilement (25/11/2026), à
       côté des trois photos de l'équipe en escalier (`ApproachScroll`). */
    text: "Chaque entreprise a ses outils, ses habitudes et ses tâches qui prennent trop de temps. Nous ne vendons pas de logiciel standard\u00a0: nous partons de votre fonctionnement réel pour construire ce qui vous fait gagner du temps, avec de l'IA seulement là où elle sert vraiment.",
    /* Les seuls mots en valeur : en Castoro italique bleu (25/11/2026).
       Dans « l'IA », seul « IA » change de style. */
    accents: ["logiciel", "IA"],
    /* Les trois photos de l'équipe, de haut en bas de l'escalier
       (décoratives : pas de texte alternatif). */
    photos: ["/images/approche-equipe.png", "/images/approche-tableau.png", "/images/approche-ecran.png"],
  },

  services: {
    /* L'EN-TÊTE ANIMÉ (25/11/2026, fiche d'Antonino, `ServicesIntro`) :
       l'étiquette, puis « Conçus pour les » suivi d'un mot qui change en
       boucle (`rotating`, dans cet ordre). `full` : la phrase entière, lue
       par les lecteurs d'écran et affichée telle quelle sans mouvement.
       Pour tout le monde, dit une fois (décision du 24/11/2026). */
    eyebrow: "Nos services",
    prefix: "Conçus pour les",
    rotating: ["indépendants.", "PME.", "grandes entreprises."],
    full: "Conçus pour les indépendants, les PME et les grandes entreprises.",
    /* La fin de `full`, en serif italique bleu sans mouvement. */
    fullEnd: "indépendants, les PME et les grandes entreprises.",
    more: "En savoir plus",
    /* L'ACCORDÉON DES QUATRE SERVICES (24/11/2026, textes d'Antonino mot
       pour mot). `key` mène au bloc du service sur la page Services ;
       « web » n'en a pas encore : son panneau pointe vers « # ».
       `image` : une photo pour le panneau ouvert, dans
       `public/images/services/`. Vide : le fond bleu nuit, avec sa lueur
       et sa trame de points, la remplace. */
    items: [
      {
        key: "software",
        title: "Développement logiciel",
        text: "Nous concevons et développons des logiciels métier, des plateformes et des outils internes adaptés aux besoins spécifiques de votre entreprise.",
        image: "",
      },
      {
        key: "ai",
        title: "Intelligence artificielle & automatisation",
        text: "Nous développons des agents IA et automatisons vos processus métier pour simplifier vos opérations et améliorer la productivité de vos équipes.",
        image: "",
      },
      {
        key: "connect",
        title: "Intégration & systèmes connectés",
        text: "Nous connectons vos logiciels, synchronisons vos données et intégrons vos systèmes pour construire un environnement technologique cohérent et évolutif.",
        image: "",
      },
      {
        key: "web",
        title: "Sites web & applications mobiles",
        text: "Nous concevons et développons des sites web et des applications mobiles modernes, performants et centrés sur l'expérience utilisateur.",
        image: "",
      },
    ] as const,
  },

  work: {
    /* L'EN-TÊTE ANIMÉ, comme celui des services (25/11/2026, demande
       d'Antonino) : l'étiquette, puis « Ce que nous avons » suivi d'un mot
       qui change en boucle (`rotating`, dans cet ordre). `full` : la phrase
       entière, lue par les lecteurs d'écran et affichée telle quelle sans
       mouvement ; `fullEnd` : sa fin, en serif italique bleu. */
    eyebrow: "Nos réalisations",
    prefix: "Ce que nous avons",
    rotating: ["développé.", "connecté.", "intégré.", "automatisé."],
    full: "Ce que nous avons développé, connecté, intégré et automatisé.",
    fullEnd: "développé, connecté, intégré et automatisé.",
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
