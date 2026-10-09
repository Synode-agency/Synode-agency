import type { Locale } from "@/lib/content";

export type BusinessUseCaseIcon =
  | "workflow"
  | "knowledge"
  | "support"
  | "data"
  | "finance"
  | "purchasing"
  | "sales"
  | "contracts"
  | "onboarding"
  | "incidents"
  | "planning"
  | "copilot";

export type BusinessUseCase = {
  slug: string;
  homeAnchor?: string;
  icon: BusinessUseCaseIcon;
  domain: string;
  title: string;
  description: string;
  tags: readonly string[];
  example: string;
};

const fr: readonly BusinessUseCase[] = [
  {
    slug: "orchestration-processus-metier",
    homeAnchor: "operations",
    icon: "workflow",
    domain: "Automatisation & orchestration",
    title: "Orchestrer un processus métier de bout en bout",
    description: "Lorsqu’un processus traverse plusieurs équipes, logiciels et validations, Synode peut concevoir un système qui coordonne les différentes étapes sans multiplier les interventions manuelles.",
    tags: ["CRM", "ERP", "Email", "Documents", "Validation humaine"],
    example: "Une demande entre dans l’entreprise, l’IA l’analyse, récupère les données nécessaires, déclenche les bonnes actions dans les outils concernés et transmet uniquement les exceptions à un collaborateur.",
  },
  {
    slug: "connaissance-entreprise",
    homeAnchor: "outils-metier",
    icon: "knowledge",
    domain: "Connaissance & documentation",
    title: "Exploiter les connaissances de toute l’entreprise",
    description: "Les informations importantes sont souvent dispersées entre contrats, procédures, emails, dossiers clients et outils internes.",
    tags: ["Contrats", "Procédures", "Drive", "SharePoint", "CRM"],
    example: "Un assistant connecté aux sources autorisées retrouve les informations pertinentes, les croise, cite leurs sources et aide les équipes à répondre ou à prendre une décision.",
  },
  {
    slug: "demandes-complexes",
    homeAnchor: "service-client",
    icon: "support",
    domain: "Service client & opérations",
    title: "Traiter des demandes complexes sur plusieurs systèmes",
    description: "Certaines demandes nécessitent de comprendre le contexte, consulter plusieurs logiciels, vérifier des règles métier et exécuter différentes actions.",
    tags: ["Email", "Support", "CRM", "ERP", "Base de connaissances"],
    example: "Un agent analyse la demande, identifie le client, récupère son historique, consulte les règles métier, prépare ou déclenche les actions nécessaires et sollicite une validation humaine lorsque le cas l’exige.",
  },
  {
    slug: "detection-priorites",
    homeAnchor: "ventes",
    icon: "data",
    domain: "Data & pilotage",
    title: "Détecter ce qui mérite réellement votre attention",
    description: "Lorsque les données sont réparties entre plusieurs systèmes, il devient difficile d’identifier rapidement les anomalies, priorités ou évolutions importantes.",
    tags: ["CRM", "Finance", "Ventes", "Opérations", "Reporting"],
    example: "Synode centralise les données utiles, détecte des anomalies ou tendances importantes et présente aux équipes les informations et actions qui nécessitent réellement leur attention.",
  },
  {
    slug: "commande-paiement",
    icon: "finance",
    domain: "Finance & encaissement",
    title: "Automatiser le cycle de la commande au paiement",
    description: "Entre la commande, la facturation, les relances et le suivi du paiement, de nombreuses étapes restent encore dispersées entre plusieurs outils.",
    tags: ["Commandes", "Factures", "ERP", "CRM", "Paiements"],
    example: "Le système suit le cycle complet, génère ou prépare les documents nécessaires, détecte les retards, déclenche les relances appropriées et alerte l’équipe lorsqu’une situation nécessite une intervention.",
  },
  {
    slug: "achats-fournisseurs",
    icon: "purchasing",
    domain: "Achats & fournisseurs",
    title: "Orchestrer les achats et les validations fournisseurs",
    description: "Les demandes d’achat impliquent souvent plusieurs validations, documents, contrôles budgétaires et échanges avec les fournisseurs.",
    tags: ["Achats", "Fournisseurs", "Bons de commande", "Factures", "Validation"],
    example: "Une demande d’achat est analysée, contrôlée selon les règles internes, envoyée aux personnes compétentes pour validation puis suivie jusqu’à la réception et au rapprochement avec la facture.",
  },
  {
    slug: "opportunites-commerciales",
    icon: "sales",
    domain: "Ventes & prospection",
    title: "Qualifier et prioriser les opportunités commerciales",
    description: "Toutes les opportunités ne nécessitent pas la même attention. Les équipes commerciales doivent souvent rechercher manuellement des informations avant de savoir où concentrer leurs efforts.",
    tags: ["Prospects", "CRM", "Enrichissement", "Scoring", "Rendez-vous"],
    example: "Le système enrichit les informations disponibles, analyse les signaux pertinents, qualifie les opportunités et prépare les éléments utiles avant l’intervention d’un commercial.",
  },
  {
    slug: "contrats-obligations",
    icon: "contracts",
    domain: "Contrats & obligations",
    title: "Analyser des contrats et suivre les points importants",
    description: "Les contrats contiennent des échéances, obligations et conditions qui peuvent être difficiles à suivre lorsqu’ils sont nombreux ou dispersés.",
    tags: ["Contrats", "Clauses", "Échéances", "Documents", "Alertes"],
    example: "Le système extrait les informations clés, identifie les échéances et obligations importantes, compare certains éléments et les centralise pour faciliter leur suivi par les équipes compétentes.",
  },
  {
    slug: "onboarding-client",
    icon: "onboarding",
    domain: "Onboarding client",
    title: "Automatiser l’entrée d’un nouveau client",
    description: "L’arrivée d’un nouveau client peut nécessiter des documents, plusieurs validations, la création de comptes et des actions réparties entre plusieurs équipes.",
    tags: ["Formulaires", "Documents", "CRM", "Comptes", "Notifications"],
    example: "Le système collecte les informations nécessaires, vérifie les éléments attendus, crée les dossiers dans les bons outils et orchestre les différentes étapes jusqu’à la finalisation de l’onboarding.",
  },
  {
    slug: "support-incidents",
    icon: "incidents",
    domain: "Support & incidents",
    title: "Qualifier et traiter plus rapidement les incidents",
    description: "Les demandes de support doivent souvent être comprises, enrichies avec le contexte disponible puis orientées vers la bonne équipe.",
    tags: ["Tickets", "Historique", "Documentation", "Priorités", "Équipes"],
    example: "L’IA analyse l’incident, recherche des informations dans l’historique et la documentation, estime sa priorité et prépare les éléments nécessaires avant de l’assigner au bon interlocuteur.",
  },
  {
    slug: "prevision-planification",
    icon: "planning",
    domain: "Prévision & planification",
    title: "Anticiper la demande plutôt que simplement constater les résultats",
    description: "Certaines entreprises disposent de suffisamment de données pour anticiper une partie de leur activité et mieux planifier leurs ressources.",
    tags: ["Ventes", "Stocks", "Charge", "Historique", "Saisonnalité"],
    example: "Le système analyse les données historiques et les signaux disponibles pour produire des prévisions, identifier les écarts et aider les équipes à ajuster leur planification.",
  },
  {
    slug: "copilote-metier",
    icon: "copilot",
    domain: "Copilote métier",
    title: "Intégrer l’IA directement dans l’outil de travail",
    description: "L’IA peut devenir une fonctionnalité du logiciel utilisé quotidiennement par les équipes plutôt qu’un outil séparé.",
    tags: ["CRM", "ERP", "Application interne", "Documents", "Données"],
    example: "Un copilote intégré au logiciel métier comprend le contexte de l’utilisateur, recherche les informations utiles, prépare des actions ou des documents et l’assiste sans l’obliger à changer d’environnement.",
  },
];

const en: readonly BusinessUseCase[] = [
  {
    slug: "end-to-end-process-orchestration",
    homeAnchor: "operations",
    icon: "workflow",
    domain: "Automation & orchestration",
    title: "Orchestrate an end-to-end business process",
    description: "When a process crosses several teams, software tools and approval steps, Synode can design a system that coordinates the workflow without multiplying manual interventions.",
    tags: ["CRM", "ERP", "Email", "Documents", "Human approval"],
    example: "A request enters the business, AI analyses it, retrieves the required data, triggers the right actions in the relevant tools and sends only the exceptions to a team member.",
  },
  {
    slug: "company-knowledge",
    homeAnchor: "outils-metier",
    icon: "knowledge",
    domain: "Knowledge & documentation",
    title: "Use knowledge from across the business",
    description: "Important information is often scattered across contracts, procedures, emails, customer files and internal tools.",
    tags: ["Contracts", "Procedures", "Drive", "SharePoint", "CRM"],
    example: "An assistant connected to authorised sources finds and cross-checks relevant information, cites its sources and helps teams respond or make a decision.",
  },
  {
    slug: "complex-requests",
    homeAnchor: "service-client",
    icon: "support",
    domain: "Customer service & operations",
    title: "Handle complex requests across several systems",
    description: "Some requests require teams to understand the context, consult several applications, check business rules and perform different actions.",
    tags: ["Email", "Support", "CRM", "ERP", "Knowledge base"],
    example: "An agent analyses the request, identifies the customer, retrieves their history, checks business rules, prepares or triggers the required actions and asks for human approval when the case requires it.",
  },
  {
    slug: "attention-priorities",
    homeAnchor: "ventes",
    icon: "data",
    domain: "Data & management",
    title: "Detect what genuinely needs your attention",
    description: "When data is spread across several systems, identifying important anomalies, priorities or changes quickly becomes difficult.",
    tags: ["CRM", "Finance", "Sales", "Operations", "Reporting"],
    example: "Synode centralises useful data, detects significant anomalies or trends and shows teams the information and actions that genuinely require their attention.",
  },
  {
    slug: "order-to-payment",
    icon: "finance",
    domain: "Finance & collections",
    title: "Automate the cycle from order to payment",
    description: "From the order and invoicing to reminders and payment tracking, many steps are still scattered across different tools.",
    tags: ["Orders", "Invoices", "ERP", "CRM", "Payments"],
    example: "The system follows the full cycle, generates or prepares the required documents, detects delays, triggers suitable reminders and alerts the team whenever a situation needs intervention.",
  },
  {
    slug: "purchasing-suppliers",
    icon: "purchasing",
    domain: "Purchasing & suppliers",
    title: "Orchestrate purchasing and supplier approvals",
    description: "Purchase requests often involve several approvals, documents, budget checks and exchanges with suppliers.",
    tags: ["Purchasing", "Suppliers", "Purchase orders", "Invoices", "Approval"],
    example: "A purchase request is analysed, checked against internal rules, sent to the relevant people for approval and then tracked through delivery and invoice reconciliation.",
  },
  {
    slug: "sales-opportunities",
    icon: "sales",
    domain: "Sales & prospecting",
    title: "Qualify and prioritise sales opportunities",
    description: "Not every opportunity deserves the same attention. Sales teams often have to research information manually before they know where to focus their efforts.",
    tags: ["Prospects", "CRM", "Enrichment", "Scoring", "Meetings"],
    example: "The system enriches available information, analyses relevant signals, qualifies opportunities and prepares useful context before a sales representative steps in.",
  },
  {
    slug: "contracts-obligations",
    icon: "contracts",
    domain: "Contracts & obligations",
    title: "Analyse contracts and track important points",
    description: "Contracts contain deadlines, obligations and conditions that can be difficult to monitor when they are numerous or scattered.",
    tags: ["Contracts", "Clauses", "Deadlines", "Documents", "Alerts"],
    example: "The system extracts key information, identifies important deadlines and obligations, compares selected elements and centralises them for the relevant teams to monitor.",
  },
  {
    slug: "customer-onboarding",
    icon: "onboarding",
    domain: "Customer onboarding",
    title: "Automate the onboarding of a new customer",
    description: "Bringing in a new customer may require documents, several approvals, account creation and actions spread across multiple teams.",
    tags: ["Forms", "Documents", "CRM", "Accounts", "Notifications"],
    example: "The system collects the required information, checks the expected elements, creates records in the right tools and orchestrates each step until onboarding is complete.",
  },
  {
    slug: "support-incidents",
    icon: "incidents",
    domain: "Support & incidents",
    title: "Qualify and handle incidents more quickly",
    description: "Support requests often need to be understood, enriched with available context and then routed to the right team.",
    tags: ["Tickets", "History", "Documentation", "Priorities", "Teams"],
    example: "AI analyses the incident, searches the history and documentation, estimates its priority and prepares the necessary information before assigning it to the right person.",
  },
  {
    slug: "forecasting-planning",
    icon: "planning",
    domain: "Forecasting & planning",
    title: "Anticipate demand instead of only reviewing results",
    description: "Some businesses have enough data to anticipate part of their activity and plan resources more effectively.",
    tags: ["Sales", "Stock", "Workload", "History", "Seasonality"],
    example: "The system analyses historical data and available signals to produce forecasts, identify gaps and help teams adjust their planning.",
  },
  {
    slug: "business-copilot",
    icon: "copilot",
    domain: "Business copilot",
    title: "Integrate AI directly into the working tool",
    description: "AI can become a feature of the software teams use every day rather than a separate tool.",
    tags: ["CRM", "ERP", "Internal application", "Documents", "Data"],
    example: "A copilot embedded in business software understands the user’s context, finds useful information, prepares actions or documents and assists them without forcing them to change environment.",
  },
];

export function businessUseCases(locale: Locale) {
  return locale === "fr" ? fr : en;
}

export function featuredBusinessUseCases(locale: Locale) {
  return businessUseCases(locale).slice(0, 4);
}

export function assertBusinessUseCases() {
  if (fr.length !== 12 || en.length !== 12) {
    throw new Error("The business use-case catalogue must contain 12 items in both languages.");
  }
}
