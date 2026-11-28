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

  /* Le hero : un surtitre (le métier et la ville), le titre, la
     description ; sans photo. */
  hero: {
    /* Le surtitre (27/11/2026, Antonino). Le « | » : une espace sur
       ordinateur (une ligne), un retour à la ligne sur téléphone, en deux
       lignes équilibrées (« Agence de développement / logiciel & IA ·
       Bruxelles ») plutôt que « Bruxelles » seul (demande d'Antonino). */
    eyebrow: "Agence de développement|logiciel & IA · Bruxelles",
    /* Le titre du 27/11/2026 (Antonino ; « Développement logiciel, IA &
       systèmes connectés. » avant). Une ligne par `\n` ; « logiciels » et
       « IA » dans la police des mots en couleur. Chaque « | » : une espace
       sur ordinateur, un retour à la ligne sur téléphone, où le titre tient
       en trois lignes alignées à gauche, la seconde phrase à la suite de la
       première, sans mot seul en dernière ligne (« On développe vos /
       logiciels. L’IA les / rend intelligents. », demande d'Antonino du
       27/11/2026 ; quatre lignes avant). */
    title: "On développe vos|logiciels.\nL’IA les|rend intelligents.",
    accents: ["logiciels", "IA"],
    /* Le titre parle du bénéfice ; la description dit ce qu'est Synode, avec
       les mots du référencement (demande d'Antonino, 24/11/2026). */
    subtitle:
      "Synode, agence de développement logiciel & IA à Bruxelles, conçoit et développe des logiciels, des sites web et des applications mobiles. Nous intégrons l’intelligence artificielle, connectons vos systèmes et automatisons vos processus pour accompagner la croissance de votre entreprise.",
    /* Le passage de la description en gras (sans italique). */
    emphasis: "agence de développement logiciel & IA à Bruxelles",
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
    /* Texte d'Antonino du 25/11/2026. */
    text: "Chaque entreprise a ses ambitions, ses besoins et sa manière de fonctionner. Du développement de logiciels sur mesure à la création de sites web et d’applications mobiles, nous concevons des outils adaptés à votre activité, intégrons l’intelligence artificielle et connectons vos systèmes pour simplifier vos processus et accompagner votre croissance.",
    /* Les seuls mots en valeur, en Castoro italique bleu : « logiciels » et
       « intelligence artificielle » (comme « logiciel » et « IA » dans le
       texte d'avant). Dans « l’intelligence », seul « intelligence » change
       de style. */
    accents: ["logiciels", "intelligence", "artificielle"],
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
    /* À droite du titre, un simple mot, sans lien ni flèche (demande
       d'Antonino du 26/11/2026 : les quatre services sont déjà là). */
    etiquette: "Nos services",
    prefix: "Conçus pour les",
    /* Deux mots seulement (demande d'Antonino du 26/11/2026) : « Conçus
       pour les entreprises » et « Conçus pour les indépendants ». */
    rotating: ["entreprises.", "indépendants."],
    full: "Conçus pour les entreprises et les indépendants.",
    /* La fin de `full`, en serif italique bleu sans mouvement. */
    fullEnd: "entreprises et les indépendants.",
    more: "En savoir plus",
    /* LES QUATRE SERVICES : `key` mène au bloc du service sur la page
       Services ; `image` : la photo de la carte (25/11/2026, photos
       fournies par Antonino, en version bleutée), dans
       `public/images/services/` ; `focus` : le point de la photo gardé au
       milieu quand elle est recadrée. `text` : la LIGNE COURTE posée sur la
       photo avec le titre (28/11/2026, maquette « C » choisie par
       Antonino ; une phrase sous la photo avant), la même que sur la page
       Services et dans le menu « Services ». */
    items: [
      {
        key: "software",
        title: "Développement logiciel",
        text: "Logiciels de bureau, web et SaaS",
        image: "/images/services/service-logiciel.webp",
        focus: "50% 55%",
      },
      {
        key: "ai",
        title: "Intelligence artificielle & automatisation",
        text: "Automatisations, assistants IA",
        image: "/images/services/service-ia.webp",
        focus: "55% 38%",
      },
      {
        key: "connect",
        title: "Intégration & systèmes connectés",
        text: "CRM, ERP, facturation, API",
        image: "/images/services/service-integration.webp",
        focus: "62% 52%",
      },
      {
        key: "web",
        title: "Sites web & applications mobiles",
        text: "Sites, iPhone et Android",
        image: "/images/services/service-web.webp",
        focus: "45% 42%",
      },
    ] as const,
  },

  work: {
    /* L'EN-TÊTE ANIMÉ, comme celui des services (25/11/2026, demande
       d'Antonino) : l'étiquette, puis « Ce que nous avons » suivi d'un mot
       qui change en boucle (`rotating`, dans cet ordre). `full` : la phrase
       entière, lue par les lecteurs d'écran et affichée telle quelle sans
       mouvement ; `fullEnd` : sa fin, en serif italique bleu. */
    prefix: "Ce que nous avons",
    rotating: ["développé.", "connecté.", "intégré.", "automatisé."],
    full: "Ce que nous avons développé, connecté, intégré et automatisé.",
    fullEnd: "développé, connecté, intégré et automatisé.",
    link: "Toutes nos réalisations",
  },

  /* « Notre méthode », la section « Comment ça marche » (25/11/2026, fiche
     « 4a · Une seule phrase » d'Antonino) : les trois étapes en un seul
     paragraphe, dont les mots s'éclairent au défilement. Chaque étape : un
     début de titre, un mot clé (en italique) et une description. */
  methode: {
    /* À droite du titre, comme « Tous nos services », sans lien. */
    label: "Notre méthode",
    /* Le titre animé, comme ceux des services et des réalisations : la fin
       change en boucle (demande d'Antonino du 25/11/2026). */
    title: {
      prefix: "Construisons la suite,",
      rotating: ["ensemble.", "pour votre entreprise.", "pas à pas."],
      full: "Construisons la suite, ensemble, pour votre entreprise et pas à pas.",
      fullEnd: "ensemble, pour votre entreprise et pas à pas.",
    },
    etapes: [
      { debut: "Un appel de", cle: "30 min.", description: "Vous nous présentez votre activité et ce que vous aimeriez améliorer." },
      { debut: "Un cadrage", cle: "écrit.", description: "Ce qu’on construit, en combien de temps, pour quel prix." },
      { debut: "Livraison et", cle: "suivi.", description: "On installe, on forme votre équipe, on reste disponibles." },
    ],
  },

  /* LES TÉMOIGNAGES (25/11/2026, maquette « T1 · Une grande citation »
     choisie par Antonino), sous « Notre méthode » : une grande citation à
     la fois, qui glisse de droite à gauche après 3,5 s d'arrêt, comme un
     slider (26/11/2026). Le logo de l'entreprise est à côté du nom : celui
     du bandeau des logos (`public/clients/`) ; `hauteur` est sa hauteur
     affichée, réglée à l'œil pour que les quatre aient le même poids.
     ⚠ CHAQUE TEXTE TIENT SUR 4 LIGNES (demande d'Antonino du 26/11/2026) :
     un nouveau texte doit avoir à peu près la longueur des autres (140 à
     155 signes), puis se vérifier à l'écran.
     ⚠ TEXTES INVENTÉS (26/11/2026), à la demande d'Antonino, pour la mise
     en page : ils seront remplacés par les vrais mots de chaque client.
     Tant que `valide` est `false`, l'avis ne s'affiche qu'en local
     (`npm run dev`), jamais en ligne : on ne publie pas un avis inventé.
     Avec le vrai texte et l'accord écrit du client (nom, fonction,
     entreprise, logo), passer `valide` à `true`.
     `cle` : le passage en Castoro italique bleu, à la place du guillemet
     (choix « B » d'Antonino sur maquettes, le 26/11/2026) ; il doit figurer
     tel quel dans le texte. */
  temoignages: {
    title: "Ce qu’en disent nos clients",
    /* En Castoro italique bleu, comme les mots en couleur des autres titres. */
    accent: "clients",
    precedent: "Témoignage précédent",
    suivant: "Témoignage suivant",
    items: [
      {
        texte:
          "Synode a pris le temps de comprendre notre métier avant de proposer quoi que ce soit. Nos devis et nos chantiers sont enfin suivis au même endroit.",
        cle: "au même endroit",
        nom: "Salvatore B.",
        poste: "Entrepreneur",
        entreprise: "BetaPro",
        logo: { src: "/clients/betapro.png", width: 198, height: 160, hauteur: 36 },
        valide: false,
      },
      {
        texte:
          "Du site à la newsletter, tout est pensé pour nos membres. Synode a compris l’esprit du club et l’a traduit en outils simples, qu’on utilise chaque semaine.",
        cle: "l’esprit du club",
        nom: "Clara C.",
        poste: "Manager",
        entreprise: "BEHYBRID",
        logo: { src: "/clients/behybrid.png", width: 900, height: 90, hauteur: 13 },
        valide: false,
      },
      {
        texte:
          "Pour une ASBL comme la nôtre, chaque heure compte. Synode nous a aidés à automatiser ce qui nous prenait du temps, sans jamais nous compliquer la vie.",
        cle: "chaque heure compte",
        nom: "Paolo L.",
        poste: "Fondateur",
        entreprise: "Bâtisseurs d’espoir",
        logo: { src: "/clients/batisseurs-espoir.png", width: 460, height: 160, hauteur: 28 },
        valide: false,
      },
    ] as readonly {
      texte: string;
      cle: string;
      nom: string;
      poste: string;
      entreprise: string;
      logo: { src: string; width: number; height: number; hauteur: number };
      valide: boolean;
    }[],
  },

  /* L'APPEL FINAL DE L'ACCUEIL (26/11/2026, maquette « 4A » choisie par
     Antonino) : une question ouverte à tous les métiers de Synode, et un champ
     où des exemples s'écrivent tout seuls. La phrase du visiteur suit sa
     réservation jusqu'à Cal.com (`@/lib/projet`). Exemples courts (34 signes
     au plus) : ils doivent tenir en entier dans le champ sur téléphone. */
  appel: {
    titreAvant: "Qu’aimeriez-vous",
    accent: "construire",
    titreApres: "\u00a0?",
    texte:
      "Un logiciel, un site, une application, un agent IA ou des outils enfin reliés\u00a0: décrivez votre projet en une phrase, on en parle pendant 30\u00a0minutes.",
    label: "Votre projet en une phrase",
    attente: "Décrivez votre projet en une phrase",
    exemples: [
      "Un logiciel pour gérer nos devis",
      "Un site qui nous amène des clients",
      "Une application pour nos membres",
      "Un agent IA qui répond aux clients",
      "Relier notre CRM et nos factures",
      "Automatiser nos relances",
    ],
  },

  faq: {
    title: "Questions fréquentes",
    /* En Castoro italique bleu (26/11/2026, demande d'Antonino). */
    accent: "fréquentes",
    /* Sous la FAQ, devant le bouton unique du site en lien discret. */
    more: "Une autre question ?",
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
