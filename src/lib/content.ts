/**
 * Le contenu du site, en français et en anglais.
 *
 * L'anglais n'est PAS une traduction mot à mot : c'est la même substance
 * écrite dans le registre d'un lecteur anglophone. Le positionnement, l'offre
 * et les cibles sont identiques, parce qu'inventer une stratégie anglophone
 * dont personne n'a décidé serait du contenu fabriqué.
 *
 * Règle de fond, tenue partout dans ce fichier : aucun client, témoignage,
 * chiffre de performance, certification, délai garanti, adresse ni numéro
 * légal n'est inventé. Ce qui manque est marqué par un emplacement réservé
 * visible.
 *
 * Les cas d'usage et les réalisations vivent dans leurs propres fichiers :
 * ils sont volumineux et ils changeront à un autre rythme que le reste.
 */

/* Les langues et les adresses vivent dans `routes.ts`, que les composants
   interactifs importent sans tirer tous les textes du site (K9). */
import { ROUTES, type Locale } from "./routes";
export { ANCHORS, ROUTES, homePath, localePrefix, locales, path } from "./routes";
export type { Locale } from "./routes";

const nav = {
  fr: [
    { href: ROUTES.home, label: "Accueil" },
    { href: ROUTES.solutions, label: "Solutions" },
    { href: ROUTES.useCases, label: "Cas d’usage" },
    { href: ROUTES.work, label: "Réalisations" },
    { href: ROUTES.team, label: "Équipe" },
    { href: ROUTES.contact, label: "Contact" },
  ],
  en: [
    { href: ROUTES.home, label: "Home" },
    { href: ROUTES.solutions, label: "Solutions" },
    { href: ROUTES.useCases, label: "Use cases" },
    { href: ROUTES.work, label: "Work" },
    { href: ROUTES.team, label: "Team" },
    { href: ROUTES.contact, label: "Contact" },
  ],
} as const;

/* ==========================================================================
   FRANÇAIS
   ========================================================================== */
const fr = {
  locale: "fr" as Locale,

  site: {
    name: "Synode",
    email: "contact@synode-agency.com",
    location: "Bruxelles, Belgique",
    tagline:
      "Solutions sur mesure, avec l’IA intégrée : systèmes connectés et logiciels métier, conçus autour de votre activité.",
    nav: nav.fr,
    cta: "Réserver un échange gratuit",
    ctaShort: "Réserver un échange",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    homeLabel: "Synode, retour à l’accueil",
    skip: "Aller au contenu",
    langLabel: "Langue",
    footerNav: "Navigation",
    footerLegal: "Informations légales",
    copyright: "Synode agency",
  },

  home: {
    metaTitle: "IA, intégration et logiciels à Bruxelles",
    metaDescription: "Synode, agence technologique à Bruxelles : agents IA, intégration de vos logiciels (CRM, ERP, API), automatisations et logiciels métier sur mesure.",
    faq: {
      kicker: "Questions fréquentes",
      title: "Questions fréquentes sur nos solutions sur mesure",
      items: [
        {
          q: "Dois-je changer mes logiciels pour travailler avec vous ?",
          a: "Pas nécessairement. Nous cherchons d’abord à intégrer la solution à vos logiciels existants. Selon leurs possibilités techniques et votre besoin, nous pouvons les connecter, les compléter ou développer un outil métier plus adapté.",
        },
        {
          q: "Développez-vous aussi des logiciels sans IA ?",
          a: "Oui. Une intégration ou un logiciel métier peut très bien fonctionner sans IA. Nous ne l’ajoutons que si elle apporte un gain concret, et nous vous le disons dans la proposition.",
        },
        {
          q: "Combien coûte une solution sur mesure ?",
          a: "Le prix d’un agent IA, d’une automatisation ou d’un logiciel sur mesure dépend du périmètre, des intégrations et de la complexité. Un premier échange gratuit nous permet de comprendre votre besoin avant de préparer un devis personnalisé, avec les éventuels frais récurrents.",
        },
        {
          q: "Y a-t-il des coûts récurrents après la mise en service ?",
          a: "Oui, dès que votre solution s’appuie sur des services payants (modèles d’IA, hébergement, plateformes d’automatisation), qui fonctionnent par abonnement tant qu’elle tourne. Ces coûts ne sont jamais absorbés par Synode. Soit vous nous confiez le suivi et la maintenance, et nous assurons l’exploitation, le monitoring et la maintenance contre un paiement récurrent défini au contrat ; soit vous souscrivez et payez ces services directement auprès des fournisseurs. Les montants sont estimés avant le démarrage.",
        },
        {
          q: "Comment se déroule un projet avec Synode ?",
          a: "En six étapes : cadrage du besoin, conception et architecture, développement, intégration et déploiement, documentation et formation, puis maintenance et évolution si vous nous les confiez. Chaque étape est validée avec vous avant la suivante.",
        },
        {
          q: "Mes données restent-elles confidentielles ?",
          a: "Oui. Les accès sont limités aux données nécessaires et définis dans la proposition. Vous les accordez au démarrage, et ils sont retirés à la fin si vous le souhaitez. Les actions sensibles restent soumises à votre validation.",
        },
        {
          q: "Assurez-vous la maintenance après le déploiement ?",
          a: "Oui, si vous nous la confiez : Synode assure alors l’exploitation, le monitoring et la maintenance de votre solution selon les modalités prévues au contrat. Sinon, la solution vous est livrée et vous la reprenez en interne. Les coûts techniques et les évolutions importantes sont définis séparément.",
        },
      ],
    },

  },

  /* ---------------------------------------------------------------- Solutions */
  solutions: {
    metaTitle: "Solutions sur mesure, avec l’IA intégrée",
    metaDescription:
      "Les solutions sur mesure de Synode à Bruxelles, avec l’IA intégrée : agents IA, intégrations, automatisations, logiciels métier, data et formation.",
    kicker: "Notre offre",
    title: "Une solution construite\n^à partir de votre besoin",
    text: "De l’amélioration d’une tâche à une application complète ou à la formation de votre équipe, nous construisons la réponse autour de votre activité.",

    bricks: [
      {
            "slug": "agents-ia",
            "title": "Agents IA",
            "text": "Des agents IA pour rechercher, rédiger et analyser vos informations, capables d’enchaîner plusieurs étapes et d’exécuter des actions dans un cadre défini.",
            "benefit": "Accéder plus vite à l’information et accélérer les tâches quotidiennes.",
            "example": "Un agent IA prépare une réponse client à partir de vos documents, cite ses sources et demande votre validation avant envoi.",
            "visual": 0
      },
      {
            "slug": "integrations-systemes-connectes",
            "title": "Intégrations & systèmes connectés",
            "text": "Nous connectons les outils que vous utilisez déjà, CRM, ERP, site web ou bases de données, pour que vos données circulent sans ressaisie et que l’IA travaille sur des informations fiables.",
            "benefit": "Faire circuler les données entre vos outils sans double saisie.",
            "example": "Une demande validée sur votre site crée ou met à jour la fiche correspondante dans le CRM et l’outil de gestion.",
            "visual": 2
      },
      {
            "slug": "automatisations-intelligentes",
            "title": "Automatisations intelligentes",
            "text": "Des automatisations intelligentes pour relier les étapes répétitives de vos processus métier et traiter les informations qui circulent entre vos outils.",
            "benefit": "Réduire les saisies manuelles, les oublis et les tâches répétitives.",
            "example": "Une demande de devis reçue sur votre site est analysée, le devis est préparé pour relecture, puis relancé automatiquement jusqu’à sa signature.",
            "visual": 1
      },
      {
            "slug": "logiciels-applications-ia",
            "title": "Logiciels & applications sur mesure",
            "text": "Des logiciels métier et des applications sur mesure, conçus autour de vos processus, de vos utilisateurs et de vos règles, avec l’IA intégrée là où elle apporte un gain.",
            "benefit": "Disposer d’un outil métier adapté au travail réel de vos équipes.",
            "example": "Vos interventions sont centralisées dans une interface métier avec suivi, historique et comptes rendus assistés par IA.",
            "visual": 3
      },
      {
            "slug": "data-intelligence",
            "title": "Data & intelligence",
            "text": "Centralisation et analyse de données, tableaux de bord, détection d’anomalies, prévisions et recommandations lorsque les données le permettent.",
            "benefit": "Transformer vos données métier en indicateurs utiles à la décision.",
            "example": "Vos chiffres de ventes, de marge et de trésorerie sont réunis dans un tableau de bord Power BI ou Excel, à jour sans export manuel, avec les écarts à vérifier signalés.",
            "visual": 4
      },
      {
            "slug": "formation-adoption-ia",
            "title": "Formation & adoption IA",
            "text": "La prise en main de chaque solution livrée est incluse dans le projet. Cette offre forme aussi vos équipes à l’IA sans projet : ateliers pratiques, bons réflexes et règles d’usage.",
            "benefit": "Rendre vos équipes autonomes et responsables dans leurs usages de l’IA.",
            "example": "À partir de situations réelles, votre équipe apprend à utiliser l’IA pour préparer, vérifier et améliorer ses réponses clients.",
            "visual": 5
      }
],

    operations: {
      kicker: "Après la mise en service",
      title: "Votre solution évolue.\n^Nous restons à vos côtés",
      text: "Pour chaque solution mise en service, notre proposition distingue le coût de création et le paiement récurrent lié à son exploitation. Son montant dépend de la complexité, des volumes et des services nécessaires, avec des conditions définies avant le démarrage.",
      recurringLabel: "Paiement récurrent · défini au contrat",
      familyNote: "Ce suivi est proposé en option pour chacune de nos six solutions.",
      /* Décision du 14/11/2026 : la formation fait partie de chaque projet.
         Affiché sur les six pages solutions (`IncludedStrip`). */
      included: {
        title: "Inclus dans chaque projet",
        items: ["Installation et mise en service", "Formation de vos utilisateurs", "Documentation remise", "Accompagnement jusqu’à la prise en main"],
        more: "Former toute votre équipe à l’IA, même sans projet",
      },
      cycle: ["Conception", "Déploiement", "Surveillance", "Amélioration"],
      items: [
        { title: "Surveillance & maintenance", text: "Nous suivons le fonctionnement de la solution et intervenons dans le périmètre convenu en cas de problème." },
        { title: "Optimisation continue", text: "Nous ajustons les comportements et adaptons la solution lorsque les usages ou les technologies évoluent." },
        { title: "Suivi des coûts techniques", text: "Nous rendons visibles les coûts d’hébergement, de modèles IA, de stockage et de services externes." },
        { title: "Assistance & évolutions", text: "Le support prévu est précisé au contrat. Les nouvelles fonctionnalités importantes font l’objet d’un devis séparé." },
      ],
    },





    faqTitle: "Questions fréquentes sur nos solutions sur mesure",
    faq: [
      { q: "Dois-je remplacer mes logiciels actuels ?", a: "Pas nécessairement. La solution s’intègre à vos logiciels lorsqu’ils proposent des API, des exports ou d’autres possibilités de connexion. Nous étudions d’abord votre CRM, ERP, messagerie, bases de données et logiciels métier afin de définir une intégration réaliste avant le devis." },
      { q: "Combien coûte une solution sur mesure ?", a: "Il n’y a pas de grille tarifaire publique : le prix dépend du périmètre, des fonctionnalités, des volumes, des données et des logiciels à connecter. Vous recevez un devis personnalisé avant tout démarrage, qui distingue le développement, les coûts techniques récurrents, la maintenance si vous la choisissez et les services tiers." },
      { q: "Comment se déroule un projet avec Synode ?", a: "Le projet suit six étapes : cadrage du besoin métier, conception et architecture, développement sur mesure, intégration et déploiement, documentation et formation, puis maintenance et évolution si vous nous les confiez. Chaque étape est validée avec vous." },
      { q: "Mes données restent-elles confidentielles ?", a: "Les accès sont limités aux données nécessaires et définis dans la proposition. Vous les accordez au démarrage, et ils sont retirés à la fin si vous le souhaitez. Les actions sensibles restent soumises à votre validation." },
      { q: "Proposez-vous la maintenance et le monitoring après le déploiement ?", a: "Oui, si vous nous confiez le suivi et la maintenance : Synode assure le monitoring, la maintenance et les interventions prévues, contre un paiement récurrent fixé au contrat. Sinon, la solution vous est livrée et déployée, et vous souscrivez directement les services nécessaires auprès des fournisseurs. Dans les deux cas, Synode ne prend jamais ces coûts à sa charge." },
      { q: "Combien de temps faut-il pour développer une solution sur mesure ?", a: "La durée dépend du périmètre, du nombre d’intégrations, de la disponibilité des données et des tests nécessaires. Les étapes, les livrables et le calendrier sont définis dans le devis avant le démarrage." },
      { q: "Une solution sur mesure peut-elle évoluer ?", a: "Oui. Une solution peut évoluer avec vos usages, vos outils et vos volumes. Les nouvelles fonctionnalités importantes font l’objet d’un cadrage, d’un chiffrage et d’un accord écrit avant leur développement." },
    ],

  },

  /* ------------------------------------------------------------------ Méthode */
  method: {
    metaTitle: "Notre méthode : du premier échange au suivi",
    metaDescription:
      "Six étapes, ce que fait Synode, ce que vous apportez et ce qui sort de chacune. Aucun délai universel annoncé : il dépend du périmètre.",
    kicker: "Méthode",
    title: "Ce qui se passe,\n^étape par étape",
    text: "Chaque étape a une sortie visible. Vous savez à tout moment où en est le projet et ce qui vous est demandé.",
    steps: [
      {
        title: "Premier échange",
        work: "Comprendre votre besoin, vos outils, vos contraintes et la priorité du projet.",
        client: "Partir d’un cas concret, récent de préférence.",
        output: "Un résumé du besoin et la prochaine étape proposée.", brief: "On cadre votre besoin en 30 minutes, gratuit et sans engagement", accents: ["besoin", "30 minutes", "sans engagement"],
      },
      {
        title: "Analyse et proposition",
        work: "Évaluer la faisabilité, définir le périmètre du projet et préciser les critères de réussite.",
        client: "Confirmer les données disponibles, les contraintes et les personnes impliquées dans la décision.",
        output: "Une proposition, un devis et des critères de réussite.", brief: "Vos données et contraintes donnent la faisabilité, le périmètre et le devis", accents: ["données", "contraintes", "faisabilité", "périmètre", "devis"],
      },
      {
        title: "Conception",
        work: "Définir le fonctionnement de la solution, les accès nécessaires et les étapes qui nécessitent une validation humaine.",
        client: "Valider le périmètre, les règles métier et les exemples qui serviront de référence.",
        output: "Un plan de réalisation partagé.", brief: "Vos règles métier deviennent le plan\nde réalisation", accents: ["règles métier", "plan", "de réalisation"],
      },
      {
        title: "Construction",
        work: "Développer la solution et la confronter progressivement à vos processus et à vos cas réels.",
        client: "Tester les parcours, valider les premiers résultats et nous transmettre vos retours.",
        output: "Une version prête pour la recette.", brief: "On développe sur vos cas réels, guidés par vos retours", accents: ["cas réels", "retours"],
      },
      {
        title: "Recette et déploiement",
        work: "Tester, corriger, documenter et mettre la solution en service dans votre environnement.",
        client: "Valider les critères de réussite définis au début du projet avant la mise en production.",
        output: "La solution en service, et sa documentation transmise.", brief: "Votre validation ouvre la mise en service et la documentation", accents: ["validation", "mise en service", "documentation"],
      },
      {
        title: "Suivi",
        work: "Surveiller le fonctionnement de la solution, assurer sa maintenance et cadrer les évolutions nécessaires.",
        client: "Signaler les incidents, les nouveaux besoins et les évolutions de vos processus métier.",
        output: "Une maintenance suivie, et les évolutions chiffrées.", brief: "Vos retours d’usage orientent la maintenance\net les évolutions", accents: ["retours d’usage", "maintenance", "évolutions"],
      },
    ],
    notes: [
      { title: "Un changement de périmètre se chiffre", text: "Ajouter un cas non prévu en cours de route est possible, mais cela se discute et se chiffre. Nous ne l’absorbons pas en silence, et nous ne le découvrons pas non plus à la facture." },
      { title: "Le projet dépend de vos accès", text: "Une donnée indisponible ou un accès qui tarde décale la suite. C’est la cause de retard la plus fréquente, et la plus facile à éviter en la nommant tôt." },
      { title: "Vos données restent les vôtres", text: "Nous travaillons sur le strict nécessaire, et les conditions de traitement sont écrites avant le démarrage." },
      { title: "Maintenance et nouveauté ne sont pas la même chose", text: "Corriger ce qui ne fonctionne plus comme convenu relève de la maintenance. Ajouter une fonction qui n’existait pas relève d’un nouveau devis." },
    ],
    cta: "Commençons par votre situation actuelle",
  },

  /* ------------------------------------------------------------------- Équipe */
  team: {
    metaTitle: "L’équipe de Synode : Antonino et Killian",
    metaDescription:
      "L’équipe de Synode, agence technologique à Bruxelles : Antonino (IA, agents et automatisations) et Killian (logiciels et intégrations).",
    kicker: "L’équipe",
    title: "Pourquoi nous\n^construisons Synode",
    vision:
      "Synode est une agence technologique bruxelloise fondée par Antonino et Killian. Nous intégrons l’IA dans les organisations, connectons leurs logiciels et développons des logiciels métier sur mesure, à partir de leurs processus, de leurs outils et de leurs données.",
    peopleTitle: "Deux développeurs,\ndes expertises complémentaires",
    people: [
      {
        first: "Antonino", photo: "/equipe/AntoEquipe.webp", headline: "Automatiser et faire grandir", role: "Cofondateur · IA, agents & automatisations",
        text: "Antonino analyse vos processus métier, conçoit les workflows et développe les agents IA. Il identifie les tâches qui méritent d’être automatisées et prépare leur intégration dans votre environnement.",
      },
      {
        first: "Killian", photo: "/equipe/KillianEquipe.webp", headline: "Concevoir des idées durables", role: "Cofondateur · Logiciels & intégrations",
        text: "Killian développe les applications IA, les logiciels métier et les intégrations entre vos outils. Il transforme le besoin cadré en une solution utilisable, testée et adaptée à votre activité.",
      },
    ],
    complementTitle: "Complémentaires,\nde l’IA au logiciel",
    complementText:
      "Notre équipe réunit l’analyse des processus, la conception d’agents IA, l’automatisation, le développement d’applications et l’intégration de logiciels. Ces compétences se combinent pour construire une solution cohérente avec votre organisation.",
    workingTitle: "Comment nous accompagnons votre projet",
    working: [
      "Un interlocuteur identifié pour votre projet, du cadrage initial à la mise en service.",
      "Une analyse de vos processus, de vos données et des logiciels à connecter avant le développement.",
      "Des étapes visibles, des tests sur vos cas réels et des validations humaines définies avec vous.",
      "Une documentation claire et des modalités de maintenance précisées avant le déploiement.",
    ],
    cta: "Parlons de votre projet",
    ctaText:
      "Antonino cartographie vos processus et conçoit les workflows et les agents ; Killian développe les applications et les intégrations. Nous avons construit ce site nous-mêmes, et nous concevons vos solutions sur mesure de la même façon : un interlocuteur identifié pour votre projet, du cadrage à la mise en service.",
  },

  /* ------------------------------------------------------------------ Contact */
  contact: {
    metaTitle: "Parlons de votre projet",
    metaDescription:
      "Réservez un échange gratuit de 30 minutes avec Synode, agence technologique à Bruxelles, ou décrivez votre besoin par écrit. Sans engagement.",
    kicker: "Contact",
    title: "Parlons de\n^votre projet",
    text: "Un premier échange gratuit et sans engagement. Nous cherchons à comprendre votre situation et à identifier une première piste. Ce n’est pas un audit technique complet.",

    booking: {
      title: "Réserver un échange de 30 minutes",
      text: "Un premier échange gratuit et sans engagement. Nous cherchons à comprendre votre situation et à identifier une première piste. Ce n’est pas un audit technique complet.",
      openLabel: "Ouvrir le calendrier",
      closedTitle: "Choisissez votre créneau",
      closedText: "30 minutes en visio, gratuit et sans engagement.",
      /* La phrase qui fait du clic un choix éclairé : voir `Booking`. */
      closedNote: "L’agenda est fourni par Cal.com. Il n’est chargé qu’à l’ouverture et peut alors utiliser ses propres cookies.",
      closedNoteLink: "En savoir plus",
    },

    form: {
      title: "Décrire votre besoin par écrit",
      text: "Si vous préférez écrire, ou si aucun créneau ne vous convient.",
      fields: {
        name: { label: "Nom", placeholder: "Votre nom" },
        email: { label: "Email de contact", placeholder: "vous@exemple.com", hint: "Une adresse personnelle convient : nous travaillons aussi avec des indépendants." },
        company: { label: "Entreprise ou activité", placeholder: "Facultatif", optional: "Facultatif" },
        need: { label: "Que souhaitez-vous améliorer aujourd’hui ?", placeholder: "Décrivez la tâche qui vous coûte le plus de temps, ou les logiciels que vous aimeriez relier.", hint: "Un exemple concret vaut mieux qu’une description générale." },
        phone: { label: "Téléphone", placeholder: "Facultatif", optional: "Facultatif" },
        website: { label: "Site internet", placeholder: "Facultatif", optional: "Facultatif" },
        timeline: { label: "Échéance envisagée", optional: "Facultatif" },
        budget: { label: "Budget envisagé", optional: "Facultatif" },
      },
      timelineOptions: ["À définir", "Dès que possible", "Dans 1 à 3 mois", "Dans 3 à 6 mois", "Plus tard"],
      budgetOptions: ["À définir", "Moins de 5 000 €", "5 000 à 15 000 €", "15 000 à 40 000 €", "Plus de 40 000 €"],
      submit: "Envoyer mon message",
      sending: "Envoi en cours…",
      privacyNote: "Vos informations servent uniquement à traiter votre demande. Pas de newsletter, pas de revente.",
      privacyLink: "Comment nous traitons vos données",
      errors: {
        name: "Indiquez votre nom.",
        email: "Indiquez une adresse email.",
        emailInvalid: "Cette adresse email semble incorrecte.",
        need: "Décrivez votre besoin en quelques mots (10 caractères minimum).",
        website: "Cette adresse de site semble incorrecte.",
        tooLong: "Ce champ est trop long.",
        rateLimited: "Vous venez d’envoyer une demande. Patientez un instant avant de recommencer.",
        server: "Nous n’avons pas pu enregistrer votre demande. Votre texte est conservé : réessayez dans un instant.",
        notConfigured:
          "L’envoi de messages n’est pas encore activé sur cette version du site. Votre texte est conservé ci-dessous ; écrivez-nous directement à contact@synode-agency.com en attendant.",
      },
    },

  },

  thanks: {
    metaTitle: "Message bien reçu",
    title: "Votre message\n^a bien été reçu",
    text: "Nous l’avons enregistré et nous revenons vers vous. Si votre demande est urgente, réservez directement un créneau : c’est le chemin le plus rapide.",
    /* On ne promet pas de délai : la référence l'interdit tant qu'il n'est
       pas tenable. */
    notBooked: "Ce message n’est pas un rendez-vous. Pour en fixer un, passez par le calendrier.",
    bookCta: "Réserver un échange gratuit",
    homeCta: "Revenir à l’accueil",
  },

  notFound: {
    title: "Cette page\n^n’existe pas",
    text: "Le lien est peut-être ancien, ou l’adresse comporte une faute. Voici les pages les plus consultées.",
    homeCta: "Revenir à l’accueil",
  },

  /* ------------------------------------------------------------------- Légal */
  legal: {
    noticeTitle: "Mentions légales",
    noticeDescription: "Mentions légales du site de Synode : responsables du site, cadre juridique et facturation via Smart, hébergement et propriété intellectuelle.",
    privacyTitle: "Politique de confidentialité",
    privacyDescription: "Quelles données personnelles Synode traite, pour quelles finalités, avec quels prestataires, pendant combien de temps, et comment exercer vos droits.",
    updated: "Dernière mise à jour",
  },
} as const;

/* ==========================================================================
   ENGLISH

   Written for an English-speaking reader, not translated word for word. The
   offer, the targets and the claims are identical: only the register moves.
   ========================================================================== */
const en = {
  locale: "en" as Locale,

  site: {
    name: "Synode",
    email: "contact@synode-agency.com",
    location: "Brussels, Belgium",
    tagline:
      "Custom solutions, with built-in AI: connected systems and business software, built around how you work.",
    nav: nav.en,
    cta: "Book a free call",
    ctaShort: "Book a call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    homeLabel: "Synode, back to home",
    skip: "Skip to content",
    langLabel: "Language",
    footerNav: "Navigation",
    footerLegal: "Legal",
    copyright: "Synode agency",
  },

  home: {
    metaTitle: "AI, integration and software in Brussels",
    metaDescription: "Synode, a technology agency in Brussels: AI agents, integration of your software (CRM, ERP, API), automations and custom business software.",
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
          a: "The price of an AI agent, an automation or custom software depends on the scope, the integrations and the complexity. A free first call lets us understand your needs before we prepare a tailored quote, including any recurring costs.",
        },
        {
          q: "Are there recurring costs after go-live?",
          a: "Yes, as soon as your solution relies on paid services (AI models, hosting, automation platforms), billed by subscription for as long as it runs. Synode never absorbs these costs. Either you entrust support and maintenance to us and we handle running, monitoring and maintenance for a recurring payment set out in the contract; or you subscribe to and pay those services directly with the providers. Amounts are estimated before work starts.",
        },
        {
          q: "How does a project with Synode work?",
          a: "In six steps: scoping the need, design and architecture, development, integration and go-live, documentation and training, then maintenance and changes if you entrust them to us. Each step is agreed with you before the next one.",
        },
        {
          q: "Will my data remain confidential?",
          a: "Yes. Access is limited to what is strictly required and listed in the proposal. You grant it at kick-off, and it is revoked at the end if you want it to be. Sensitive actions stay subject to your approval.",
        },
        {
          q: "Do you provide maintenance after deployment?",
          a: "Yes, if you entrust it to us: Synode then runs, monitors and maintains your solution under the terms set out in the contract. Otherwise, the solution is handed over and you run it in-house. Technical costs and significant changes are defined separately.",
        },
      ],
    },

  },

  solutions: {
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
      { q: "Do I have to replace my current software?", a: "Not necessarily. The solution integrates with your software when it offers APIs, exports or other ways to connect. We first study your CRM, ERP, email, databases and business software to define a realistic integration before quoting." },
      { q: "How much does a custom solution cost?", a: "There is no public price list: the price depends on the scope, the features, the volumes, the data and the software to connect. You receive a tailored quote before anything starts, separating development, recurring technical costs, maintenance if you choose it, and third-party services." },
      { q: "How does a project with Synode run?", a: "In six steps: scoping the business need, design and architecture, custom development, integration and go-live, documentation and training, then maintenance and changes if you entrust them to us. Each step is agreed with you." },
      { q: "Does my data stay confidential?", a: "Access is limited to what is strictly required and listed in the proposal. You grant it at kick-off, and it is revoked at the end if you want it to be. Sensitive actions stay subject to your approval." },
      { q: "Do you handle maintenance after deployment?", a: "Yes, if you entrust support and maintenance to us: we handle running, monitoring and maintenance for a recurring payment set out in the contract. If you do not, the solution is delivered and deployed, and you subscribe to the required services directly with the providers. Either way, Synode never absorbs those costs." },
      { q: "How long does it take to build a solution?", a: "It depends on the scope and the integrations. The schedule, its steps and its deadlines are set in the quote, before work starts." },
      { q: "Can the solution evolve later on?", a: "Yes. Significant changes or new features go through a fresh scoping exercise, a new quote and a written agreement before any work begins." },
    ],

  },

  method: {
    metaTitle: "Our method: from the first call to ongoing support",
    metaDescription:
      "Six stages, what Synode does, what you bring and what comes out of each. No universal delivery time: it depends on the scope.",
    kicker: "Method",
    title: "What happens,\n^stage by stage",
    text: "Every stage has a visible output. You always know where the project stands and what is being asked of you.",
    steps: [
      { title: "First call", work: "Understand your need, your tools, your constraints and the priority of the project.", client: "Start from a concrete example, ideally a recent one.", output: "A summary of the need and a proposed next step.", brief: "We frame your need in 30 minutes, free and with no commitment", accents: ["need", "30 minutes", "no commitment"], },
      { title: "Analysis and proposal", work: "Assess feasibility, define the scope of the project and set the success criteria.", client: "Confirm the data available, the constraints and the people involved in the decision.", output: "A proposal, a quote and success criteria.", brief: "Your data and constraints give the feasibility, scope and quote", accents: ["data", "constraints", "feasibility", "scope", "quote"], },
      { title: "Design", work: "Define how the solution works, the access it needs and the steps that require human approval.", client: "Sign off the scope, the business rules and the examples that will serve as reference.", output: "A shared build plan.", brief: "Your business rules become the build plan", accents: ["business rules", "build plan"], },
      { title: "Build", work: "Develop the solution and test it progressively against your processes and your real cases.", client: "Test the flows, review the first results and send us your feedback.", output: "A version ready for acceptance.", brief: "We build on your real cases, guided by your feedback", accents: ["real cases", "feedback"], },
      { title: "Acceptance and go-live", work: "Test, fix, document and put the solution into service in your environment.", client: "Sign off the success criteria set at the start of the project before going live.", output: "The solution live, with its documentation handed over.", brief: "Your sign-off opens go-live and documentation", accents: ["sign-off", "go-live", "documentation"], },
      { title: "Support", work: "Watch how the solution runs, maintain it and scope the changes it needs.", client: "Report incidents, new needs and changes in your business processes.", output: "Maintenance tracked, and changes quoted.", brief: "Your usage feedback drives maintenance and changes", accents: ["usage feedback", "maintenance", "changes"], },
    ],
    notes: [
      { title: "A change of scope gets quoted", text: "Adding an unplanned case mid-project is possible, but it gets discussed and priced. We do not absorb it silently, and you do not discover it on the invoice." },
      { title: "The project depends on your access", text: "Data that is not available, or an access that takes weeks, pushes everything back. It is the most common cause of delay and the easiest to avoid by naming it early." },
      { title: "Your data stays yours", text: "We work on strictly what is needed, and the processing terms are written down before anything starts." },
      { title: "Maintenance and new features are different things", text: "Fixing something that stopped working as agreed is maintenance. Adding a capability that did not exist is a new quote." },
    ],
    cta: "Let’s start with where you are",
  },

  team: {
    metaTitle: "The Synode team: Antonino and Killian",
    metaDescription:
      "The Synode team, a technology agency in Brussels: Antonino (AI, agents and automation) and Killian (software and integrations).",
    kicker: "The team",
    title: "Why we are\n^building Synode",
    vision:
      "Synode is a Brussels-based technology agency founded by Antonino and Killian. We bring AI into organisations, connect their software and build custom business software, based on their processes, tools and data.",
    peopleTitle: "Two developers with complementary expertise",
    people: [
      {
        first: "Antonino", photo: "/equipe/AntoEquipe.webp", headline: "Automate and grow", role: "Co-founder · AI, agents & automation",
        text: "Antonino analyses business processes, designs workflows and develops AI agents. He identifies the tasks worth automating and prepares their integration into your environment.",
      },
      {
        first: "Killian", photo: "/equipe/KillianEquipe.webp", headline: "Build ideas that last", role: "Co-founder · Software & integrations",
        text: "Killian develops AI applications, business software and integrations between your tools. He turns the scoped need into a usable, tested solution suited to your business.",
      },
    ],
    complementTitle: "A complementary team,\nfrom AI to software",
    complementText: "Our team combines process analysis, AI agent design, automation, application development and software integration. These capabilities come together in a solution aligned with your organisation.",
    workingTitle: "How we support\nyour project",
    working: [
      "One named contact for your project, from initial scoping to go-live.",
      "An analysis of your processes, data and software connections before development starts.",
      "Visible stages, tests on real cases and human approvals defined with you.",
      "Clear documentation and maintenance terms agreed before deployment.",
    ],
    cta: "Let’s talk about your project",
    ctaText:
      "Antonino maps your processes and designs the workflows and agents; Killian builds the applications and integrations. We built this site ourselves, and we design your custom solutions the same way: one named contact for your project, from scoping to go-live.",
  },

  contact: {
    metaTitle: "Let’s talk about your project",
    metaDescription: "Book a free 30-minute call with Synode, a technology agency in Brussels, or tell us what you need in writing. No commitment.",
    kicker: "Contact",
    title: "Let’s talk about\n^your project",
    text: "A free first call, with no commitment. We use it to understand your situation and identify a first direction. It is not a full technical audit.",

    booking: {
      title: "Book a 30-minute call",
      text: "A free first call, with no commitment. We use it to understand your situation and identify a first direction. It is not a full technical audit.",
      openLabel: "Open the calendar",
      closedTitle: "Choose your slot",
      closedText: "30 minutes by video call, free and with no commitment.",
      closedNote: "The calendar is provided by Cal.com. It only loads when you open it, and may then use its own cookies.",
      closedNoteLink: "Learn more",
    },

    form: {
      title: "Tell us what you need in writing",
      text: "If you would rather write, or if none of the slots suit you.",
      fields: {
        name: { label: "Name", placeholder: "Your name" },
        email: { label: "Contact email", placeholder: "you@example.com", hint: "A personal address is fine: we work with freelancers too." },
        company: { label: "Company or activity", placeholder: "Optional", optional: "Optional" },
        need: { label: "What would you like to improve?", placeholder: "Describe the task that costs you the most time, or the software you would like to connect.", hint: "One concrete example beats a general description." },
        phone: { label: "Phone", placeholder: "Optional", optional: "Optional" },
        website: { label: "Website", placeholder: "Optional", optional: "Optional" },
        timeline: { label: "Timeline in mind", optional: "Optional" },
        budget: { label: "Budget in mind", optional: "Optional" },
      },
      timelineOptions: ["To be defined", "As soon as possible", "In 1 to 3 months", "In 3 to 6 months", "Later"],
      budgetOptions: ["To be defined", "Under €5,000", "€5,000 to €15,000", "€15,000 to €40,000", "Over €40,000"],
      submit: "Send my message",
      sending: "Sending…",
      privacyNote: "Your details are used only to handle your request. No newsletter, no reselling.",
      privacyLink: "How we handle your data",
      errors: {
        name: "Please enter your name.",
        email: "Please enter an email address.",
        emailInvalid: "That email address looks wrong.",
        need: "Tell us what you need in a few words (10 characters minimum).",
        website: "That website address looks wrong.",
        tooLong: "This field is too long.",
        rateLimited: "You have just sent a request. Give it a moment before trying again.",
        server: "We could not save your request. Your text is still here: try again in a moment.",
        notConfigured:
          "Sending messages is not switched on in this version of the site. Your text is kept below; write to us directly at contact@synode-agency.com in the meantime.",
      },
    },

  },

  thanks: {
    metaTitle: "Message received",
    title: "Your message\n^has been received",
    text: "We have saved it and we will get back to you. If it is urgent, book a slot directly: that is the fastest route.",
    notBooked: "This message is not a meeting. To set one up, use the calendar.",
    bookCta: "Book a free call",
    homeCta: "Back to home",
  },

  notFound: {
    title: "This page\n^does not exist",
    text: "The link may be old, or the address has a typo. Here are the pages people visit most.",
    homeCta: "Back to home",
  },

  legal: {
    noticeTitle: "Legal notice",
    noticeDescription: "Legal notice for the Synode website: people responsible for the site, legal framework and invoicing through Smart, hosting and intellectual property.",
    privacyTitle: "Privacy policy",
    privacyDescription: "What personal data Synode processes, for what purposes, with which providers, for how long, and how you can exercise your rights.",
    updated: "Last updated",
  },
} as const;

export const content = { fr, en };
export type Content = typeof fr;

export function getContent(locale: Locale): Content {
  return content[locale] as Content;
}

/**
 * Les seuls textes dont la barre et les deux menus ont besoin. `Shell`, un
 * composant serveur, les calcule et les passe en props : les composants
 * interactifs n'importent jamais ce fichier (K9).
 */
export function headerCopy(locale: Locale) {
  const c = getContent(locale);
  return {
    site: c.site,
    bricks: c.solutions.bricks.map(({ slug, title, benefit, visual }) => ({ slug, title, benefit, visual })),
  };
}
export type HeaderCopy = ReturnType<typeof headerCopy>;
export type BookingCopy = Content["contact"]["booking"];
export type ContactFormCopy = Content["contact"]["form"];
