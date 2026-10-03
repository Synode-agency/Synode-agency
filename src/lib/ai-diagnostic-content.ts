import type { Locale } from "@/lib/content";
import type { ApproachId, DiagnosticResult, ObservationId, PotentialLevel } from "@/lib/ai-diagnostic-score";
import type { DimensionKey } from "@/lib/ai-diagnostic-questions";

/** Tous les textes du diagnostic, hors énoncés des questions. */
const fr = {
  metaTitle: "Diagnostic du potentiel IA de votre entreprise",
  metaDescription:
    "Analysez un processus métier et identifiez son potentiel d’automatisation, d’intégration, d’agents IA et d’exploitation des données avec le diagnostic Synode.",
  kicker: "Outils & Diagnostics IA",
  h1: "Diagnostic du potentiel IA de votre entreprise",
  intro:
    "Analysez un processus métier et identifiez les possibilités d’automatisation, d’intégration, d’exploitation des données ou d’assistance par l’intelligence artificielle.",
  lead:
    "Dix questions sur le fonctionnement réel d’un processus, puis un résultat détaillé par famille de solutions. Aucune inscription, aucune adresse email, aucune réponse enregistrée sur nos serveurs.",
  processLabel: "Quel processus souhaitez-vous analyser ?",
  processPlaceholder: "Ex. traitement des demandes clients",
  processHelp: "Un processus précis donne un résultat plus utile qu’une activité entière.",
  start: "Commencer le diagnostic",
  previous: "Précédent",
  next: "Continuer",
  finish: "Voir le résultat",
  restart: "Recommencer le diagnostic",
  progress: (current: number, total: number) => `Question ${current} sur ${total}`,
  stepOf: "Processus analysé",
  required: "Sélectionnez une réponse pour continuer.",
  requiredMultiple: "Sélectionnez au moins une réponse pour continuer.",
  resultTitle: "Potentiel d’intégration IA",
  observationsTitle: "Votre processus présente",
  approachesTitle: "Approches potentielles",
  profileTitle: "Profil du processus",
  profileNote: "Ces valeurs comparent les familles de solutions entre elles pour ce processus. Elles ne mesurent ni un gain ni une performance.",
  humanNote: "Niveau de validation humaine à conserver",
  disclaimer:
    "Ce diagnostic est indicatif. La pertinence d’une solution IA dépend également de la qualité des données, des contraintes techniques, des outils utilisés, des risques et des règles métier propres à votre entreprise.",
  ctaKicker: "Votre processus mérite une analyse plus précise ?",
  ctaTitle: "Transformons ce diagnostic en solution concrète.",
  ctaText:
    "Nous pouvons analyser plus précisément votre processus, vos outils, vos données et vos contraintes afin de déterminer quelle combinaison de technologies serait réellement pertinente.",
  ctaPrimary: "Cadrer votre projet IA",
  ctaSecondary: "Découvrir nos solutions",
  levels: {
    limited: "Potentiel limité",
    moderate: "Potentiel modéré",
    high: "Potentiel élevé",
    veryHigh: "Potentiel très élevé",
  } satisfies Record<PotentialLevel, string>,
  dimensions: {
    automation: "Automatisation",
    integration: "Intégration",
    agents: "Agents IA",
    data: "Data",
    human: "Contrôle humain",
  } satisfies Record<DimensionKey, string>,
  observations: {
    manyTools: "Plusieurs outils utilisés dans le même processus",
    reentry: "Ressaisie manuelle entre différents systèmes",
    searching: "Recherche fréquente d’informations avant de pouvoir agir",
    documents: "Volume important de documents ou d’échanges écrits",
    rules: "Règles métier clairement identifiables",
    data: "Données historiques disponibles",
    approvals: "Validations humaines nécessaires sur certaines étapes",
    repetition: "Étapes répétées plusieurs fois par jour",
    reporting: "Besoin de pilotage, de priorisation ou de reporting",
    handovers: "Nombreux passages entre personnes ou équipes",
  } satisfies Record<ObservationId, string>,
  approaches: {
    automation: {
      title: "Automatisation intelligente",
      text: "Automatiser certaines étapes répétitives et orchestrer le passage d’une action à l’autre.",
    },
    agents: {
      title: "Assistants & Agents IA",
      text: "Analyser, rechercher, contextualiser ou préparer les informations nécessaires à vos équipes.",
    },
    integration: {
      title: "Intégrations & systèmes connectés",
      text: "Relier les logiciels impliqués afin de faire circuler les informations et réduire les ressaisies.",
    },
    data: {
      title: "Data & Intelligence",
      text: "Centraliser et exploiter les données disponibles pour améliorer le pilotage, la détection d’anomalies ou la priorisation.",
    },
    software: {
      title: "Logiciel métier sur mesure",
      text: "Réunir plusieurs briques du processus dans une interface métier adaptée à votre fonctionnement.",
    },
    human: {
      title: "Contrôle humain",
      text: "Conserver une validation humaine avant certaines décisions ou actions sensibles.",
    },
  } satisfies Record<ApproachId, { title: string; text: string }>,
};

const en: typeof fr = {
  metaTitle: "AI potential diagnostic for your business",
  metaDescription:
    "Analyse a business process and identify its potential for automation, integration, AI agents and data use with the Synode diagnostic.",
  kicker: "AI tools & diagnostics",
  h1: "AI potential diagnostic for your business",
  intro:
    "Analyse a business process and identify the opportunities for automation, integration, data use or support from artificial intelligence.",
  lead:
    "Ten questions about how a process actually runs, then a detailed result for each family of solutions. No sign-up, no email address, and no answers stored on our servers.",
  processLabel: "Which process would you like to analyse?",
  processPlaceholder: "e.g. handling customer requests",
  processHelp: "A specific process gives a more useful result than an entire activity.",
  start: "Start the diagnostic",
  previous: "Back",
  next: "Continue",
  finish: "See the result",
  restart: "Start the diagnostic again",
  progress: (current: number, total: number) => `Question ${current} of ${total}`,
  stepOf: "Process analysed",
  required: "Select an answer to continue.",
  requiredMultiple: "Select at least one answer to continue.",
  resultTitle: "AI integration potential",
  observationsTitle: "Your process shows",
  approachesTitle: "Possible approaches",
  profileTitle: "Process profile",
  profileNote: "These values compare the families of solutions against each other for this process. They measure neither a gain nor a performance.",
  humanNote: "Level of human approval to keep",
  disclaimer:
    "This diagnostic is indicative. Whether an AI solution is relevant also depends on data quality, technical constraints, the tools in use, the risks and the business rules specific to your company.",
  ctaKicker: "Does your process deserve a closer look?",
  ctaTitle: "Let’s turn this diagnostic into a concrete solution.",
  ctaText:
    "We can look more precisely at your process, your tools, your data and your constraints to determine which combination of technologies would genuinely be relevant.",
  ctaPrimary: "Scope your AI project",
  ctaSecondary: "Explore our solutions",
  levels: {
    limited: "Limited potential",
    moderate: "Moderate potential",
    high: "High potential",
    veryHigh: "Very high potential",
  },
  dimensions: {
    automation: "Automation",
    integration: "Integration",
    agents: "AI agents",
    data: "Data",
    human: "Human control",
  },
  observations: {
    manyTools: "Several tools used within the same process",
    reentry: "Manual re-entry between different systems",
    searching: "Frequent information searches before anyone can act",
    documents: "A large volume of documents or written exchanges",
    rules: "Business rules that can be clearly identified",
    data: "Historical data available",
    approvals: "Human approval needed on some steps",
    repetition: "Steps repeated several times a day",
    reporting: "A need for oversight, prioritisation or reporting",
    handovers: "Many handovers between people or teams",
  },
  approaches: {
    automation: {
      title: "Intelligent automation",
      text: "Automate repetitive steps and orchestrate the move from one action to the next.",
    },
    agents: {
      title: "AI assistants & agents",
      text: "Analyse, search, contextualise or prepare the information your teams need.",
    },
    integration: {
      title: "Integrations & connected systems",
      text: "Connect the software involved so information circulates and re-entry is reduced.",
    },
    data: {
      title: "Data & Intelligence",
      text: "Centralise and use the available data to improve oversight, anomaly detection or prioritisation.",
    },
    software: {
      title: "Custom business software",
      text: "Bring several parts of the process together in an interface shaped around how you work.",
    },
    human: {
      title: "Human control",
      text: "Keep a human approval step before certain sensitive decisions or actions.",
    },
  },
};

export function diagnosticContent(locale: Locale) {
  return locale === "fr" ? fr : en;
}

/**
 * La phrase de synthèse.
 *
 * Elle est COMPOSÉE à partir des dimensions réellement fortes, et non
 * choisie dans une liste de quatre textes selon le niveau : deux processus
 * de même score mais de nature différente ne doivent pas lire la même
 * conclusion.
 */
export function diagnosticSummary(locale: Locale, result: DiagnosticResult): string {
  const c = diagnosticContent(locale);
  const fr = locale === "fr";
  const strong = (["automation", "integration", "agents", "data"] as const)
    .filter((k) => result.scores[k] >= 50)
    .map((k) => c.dimensions[k].toLowerCase());

  const list = strong.length === 0
    ? ""
    : strong.length === 1
      ? strong[0]
      : `${strong.slice(0, -1).join(", ")} ${fr ? "et" : "and"} ${strong[strong.length - 1]}`;

  const head = strong.length === 0
    ? fr
      ? "Les réponses décrivent un processus peu répétitif, peu outillé et peu documenté."
      : "Your answers describe a process that is neither repetitive, tool-heavy nor document-heavy."
    : fr
      ? `Les réponses font ressortir ${list} comme pistes principales.`
      : `Your answers point to ${list} as the main directions.`;

  const body = result.level === "limited"
    ? fr
      ? " Un projet IA n’y apporterait probablement pas assez pour justifier son coût aujourd’hui ; un autre processus de votre activité serait sans doute plus pertinent."
      : " An AI project would probably not bring enough here to justify its cost today; another process in your business is likely a better candidate."
    : result.level === "moderate"
      ? fr
        ? " Une amélioration ciblée sur une étape précise est envisageable, plutôt qu’une refonte complète du processus."
        : " A targeted improvement on one specific step looks realistic, rather than a full redesign of the process."
      : result.level === "high"
        ? fr
          ? " Une partie du fonctionnement semble pouvoir être automatisée ou assistée, à condition de cadrer les accès, les données et les règles métier."
          : " Part of how it runs looks like it could be automated or assisted, provided access, data and business rules are properly scoped."
        : fr
          ? " Le processus réunit plusieurs conditions favorables à la fois : il relève davantage d’un système combinant plusieurs familles que d’une brique isolée."
          : " The process meets several favourable conditions at once: it calls for a system combining several families rather than a single building block.";

  const human = result.scores.human >= 40
    ? fr
      ? " Les décisions importantes resteraient soumises à une validation humaine."
      : " Important decisions would remain subject to human approval."
    : "";

  return head + body + human;
}
