import type { Locale } from "@/lib/content";

/**
 * LES CAS D'USAGE DE LA PAGE « CAS D'USAGE » (et les quatre premiers, repris
 * sur l'accueil).
 *
 * Réécrits le 14/11/2026 :
 *  - un langage simple, la situation telle qu'un dirigeant la vit, sans
 *    « orchestration » ni « processus de bout en bout » ;
 *  - douze cas du quotidien des équipes (devis, questions de clients,
 *    mémoire de l'entreprise…), puis dix cas qui parlent aux grandes
 *    organisations : documentation interne avec droits d'accès, appels
 *    d'offres, service client en français, néerlandais et anglais, support
 *    interne, documents en volume, intégration au système d'information,
 *    sécurité et gouvernance, conformité RGPD et AI Act, pilotage de
 *    direction, contrôles financiers.
 *
 * ⚠ AUCUNE étiquette de taille d'entreprise (TPE, PME…) : décision
 * d'Antonino du 14/11/2026, Synode ne veut pas être associée à une taille
 * de client, et vise aussi les grandes entreprises.
 *
 * L'ordre compte : les quatre premiers sont ceux de l'accueil, deux cas du
 * quotidien et deux de grande organisation ; ensuite les deux familles
 * alternent. Aucun chiffre, aucun client : `example` décrit ce qu'une
 * solution PEUT faire, jamais un résultat obtenu.
 */

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
    slug: "demandes-de-devis",
    icon: "sales",
    domain: "Devis & relances",
    title: "Répondre plus vite aux demandes de devis, et relancer ceux qui dorment",
    description: "Les demandes arrivent par le site, par email ou par téléphone. Le devis se prépare le soir, et celui qui reste sans réponse est souvent oublié.",
    tags: ["Formulaire", "Email", "Modèle de devis", "Relance", "Signature"],
    example: "La demande est lue et résumée, un brouillon de devis est préparé à partir de vos tarifs pour que vous le relisiez, puis une relance part automatiquement si le client ne répond pas.",
  },
  {
    slug: "assistant-connaissance-interne",
    icon: "knowledge",
    domain: "Documentation interne",
    title: "Interroger toute la documentation interne, en respectant les droits de chacun",
    description: "Procédures, notes, contrats et présentations sont répartis entre SharePoint, Teams, Confluence ou des dossiers partagés. Les collaborateurs perdent du temps à chercher, et tout le monde ne doit pas voir tous les documents.",
    tags: ["SharePoint", "Teams", "Confluence", "Droits d’accès", "Sources citées"],
    example: "Un assistant interne répond aux questions à partir des sources autorisées, cite les documents utilisés et ne montre à chacun que ce qu’il a le droit de consulter.",
  },
  {
    slug: "questions-frequentes",
    icon: "support",
    domain: "Service client",
    title: "Répondre aux questions qui reviennent sans cesse",
    description: "Horaires, délais, prix, documents à fournir : les mêmes questions arrivent chaque jour par email, sur le site ou sur WhatsApp, et coupent le travail.",
    tags: ["Site web", "Email", "WhatsApp", "Questions fréquentes"],
    example: "Un assistant répond aux questions courantes à partir de vos informations, à toute heure, et vous transmet les demandes qui méritent une vraie réponse.",
  },
  {
    slug: "appels-d-offres",
    icon: "contracts",
    domain: "Appels d’offres",
    title: "Préparer plus vite les réponses aux appels d’offres",
    description: "Chaque appel d’offres demande de relire un cahier des charges, de retrouver les bonnes références et de réécrire des réponses déjà rédigées ailleurs, souvent dans des délais serrés.",
    tags: ["Cahier des charges", "Marchés publics", "Références", "Bibliothèque de réponses"],
    example: "Le cahier des charges est analysé, les exigences sont listées, et un premier jet de réponse est préparé à partir de vos réponses passées et de vos documents, pour être relu et complété par vos équipes.",
  },
  {
    slug: "memoire-entreprise",
    icon: "knowledge",
    domain: "Savoir-faire & documentation",
    title: "Garder la mémoire de l’entreprise",
    description: "Un problème a déjà été résolu, mais la solution est dans la tête d’un collègue, dans un vieil email ou dans un dossier introuvable. Quand cette personne part, le savoir-faire part avec elle.",
    tags: ["Problèmes", "Solutions", "Procédures", "Documents", "Recherche"],
    example: "Chaque problème rencontré et sa solution sont notés dans une base partagée. L’équipe les retrouve en posant sa question avec ses propres mots, et la réponse cite la fiche d’origine.",
  },
  {
    slug: "service-client-multilingue",
    icon: "support",
    domain: "Service client multilingue",
    title: "Répondre aux clients en français, en néerlandais et en anglais",
    description: "En Belgique, les demandes arrivent dans plusieurs langues. Les équipes jonglent entre traductions, modèles de réponse et collègues capables de répondre dans la bonne langue.",
    tags: ["Français", "Néerlandais", "Anglais", "Email", "Tickets"],
    example: "Chaque demande est comprise quelle que soit sa langue, classée et orientée, et une réponse est préparée dans la langue du client à partir de vos informations, avant d’être validée.",
  },
  {
    slug: "orchestration-processus-metier",
    icon: "workflow",
    domain: "Circulation des demandes",
    title: "Faire suivre une demande d’une étape à l’autre, sans ressaisie",
    description: "Une demande passe par plusieurs personnes et plusieurs logiciels. À chaque étape, quelqu’un recopie les informations, et il suffit d’un oubli pour que tout s’arrête.",
    tags: ["Email", "CRM", "Outil de gestion", "Validation"],
    example: "Les informations de la demande sont reprises automatiquement dans vos outils, chaque étape prévient la bonne personne, et seuls les cas particuliers vous sont transmis.",
  },
  {
    slug: "support-interne-it-rh",
    icon: "incidents",
    domain: "Support interne IT & RH",
    title: "Désengorger le support informatique et RH interne",
    description: "Mots de passe, accès, congés, notes de frais, procédures : les mêmes demandes internes reviennent sans cesse et occupent les équipes de support.",
    tags: ["ServiceNow", "Jira", "Teams", "Procédures", "Tickets"],
    example: "Les demandes courantes reçoivent une réponse à partir de vos procédures, les tickets sont classés et complétés, et seuls les cas qui le demandent sont transmis à la bonne équipe.",
  },
  {
    slug: "rendez-vous",
    icon: "planning",
    domain: "Agenda & rendez-vous",
    title: "Confirmer et rappeler les rendez-vous pour limiter les absences",
    description: "Les rendez-vous se prennent par téléphone ou par message, les rappels se font à la main, et un client qui oublie laisse un trou dans la journée.",
    tags: ["Agenda", "SMS", "Email", "Rappels"],
    example: "Le rendez-vous est confirmé automatiquement, un rappel part la veille, et une annulation libère le créneau pour un autre client.",
  },
  {
    slug: "documents-en-volume",
    icon: "workflow",
    domain: "Documents en volume",
    title: "Traiter de grands volumes de documents, avec une trace de chaque décision",
    description: "Réclamations, dossiers, formulaires ou pièces justificatives arrivent par centaines. Les lire, en extraire les informations et les contrôler à la main ralentit tout le service.",
    tags: ["Réclamations", "Dossiers", "Extraction", "Contrôle", "Traçabilité"],
    example: "Chaque document est lu, ses informations sont extraites et contrôlées selon vos règles, les cas douteux sont mis de côté pour une personne, et chaque étape reste consignée.",
  },
  {
    slug: "factures-impayees",
    icon: "finance",
    domain: "Encaissements",
    title: "Suivre les factures impayées et relancer au bon moment",
    description: "Relancer un client prend du temps et met mal à l’aise. Les relances se font quand on y pense, et les retards de paiement pèsent sur la trésorerie.",
    tags: ["Factures", "Échéances", "Relances", "Paiements"],
    example: "Les échéances sont suivies, une relance polie part au bon moment avec le lien de paiement, et vous êtes prévenu quand un retard demande un appel.",
  },
  {
    slug: "integration-systeme-information",
    icon: "workflow",
    domain: "Système d’information",
    title: "Connecter l’IA à votre système d’information, sans le remplacer",
    description: "Une grande organisation tourne déjà sur des systèmes établis : ERP, CRM, gestion documentaire, outils de tickets. Un outil d’IA isolé, sans accès à ces données, reste un gadget.",
    tags: ["SAP", "Salesforce", "Microsoft 365", "ServiceNow", "API"],
    example: "L’IA est branchée sur vos systèmes existants, comme SAP, Salesforce, Microsoft 365 ou ServiceNow, par leurs API et avec des accès limités au nécessaire, pour travailler sur vos vraies données.",
  },
  {
    slug: "onboarding-client",
    icon: "onboarding",
    domain: "Démarrage client",
    title: "Accueillir un nouveau client sans oublier d’étape",
    description: "Pour démarrer avec un client, il faut réunir des documents, créer son dossier, prévenir l’équipe et envoyer les bonnes informations, souvent de mémoire.",
    tags: ["Formulaire", "Documents", "Dossier client", "Notifications"],
    example: "Le client remplit un formulaire, les documents manquants lui sont demandés, son dossier est créé dans vos outils et l’équipe est prévenue.",
  },
  {
    slug: "securite-gouvernance-ia",
    icon: "data",
    domain: "Sécurité & gouvernance",
    title: "Déployer l’IA dans un cadre que votre service informatique peut valider",
    description: "Avant d’ouvrir un outil d’IA aux équipes, il faut savoir qui accède à quoi, où vont les données et ce que l’outil a fait. Sans ces réponses, le projet reste bloqué.",
    tags: ["Connexion avec les comptes de l’entreprise", "Droits d’accès", "Journal d’activité", "Hébergement UE"],
    example: "La solution s’appuie sur la connexion avec les comptes de l’entreprise, respecte les droits existants, consigne chaque action dans un journal et garde les données dans l’Union européenne lorsque c’est requis.",
  },
  {
    slug: "opportunites-commerciales",
    icon: "sales",
    domain: "Ventes & prospection",
    title: "Savoir quels prospects contacter en premier",
    description: "Les commerciaux passent du temps à chercher des informations avant de savoir si un prospect vaut un appel, et les meilleures pistes attendent.",
    tags: ["Prospects", "CRM", "Informations publiques", "Priorités"],
    example: "Les informations utiles sur chaque prospect sont rassemblées, un score explicable propose un ordre de contact, et le premier message est préparé pour être relu.",
  },
  {
    slug: "conformite-rgpd-ai-act",
    icon: "contracts",
    domain: "Conformité RGPD & AI Act",
    title: "Encadrer les usages de l’IA face au RGPD et à l’AI Act",
    description: "Le règlement européen sur l’IA demande notamment aux organisations de soutenir la maîtrise de l’IA par les personnes qui l’utilisent, et le RGPD encadre déjà les données personnelles. Beaucoup d’équipes utilisent pourtant l’IA sans règles écrites.",
    tags: ["AI Act", "RGPD", "Règles d’usage", "Formation", "Registre"],
    example: "Les usages existants sont recensés, des règles d’usage claires sont rédigées, les équipes sont formées et les outils sont réglés pour limiter les données partagées, en lien avec votre délégué à la protection des données.",
  },
  {
    slug: "detection-priorites",
    icon: "data",
    domain: "Pilotage",
    title: "Voir tout de suite ce qui demande votre attention",
    description: "Les chiffres sont répartis entre plusieurs logiciels et fichiers. Un écart important se remarque trop tard, quand il a déjà coûté.",
    tags: ["Ventes", "Marge", "Trésorerie", "Alertes"],
    example: "Vos chiffres sont réunis dans un tableau de bord, dans un outil que vous connaissez, et un écart inhabituel vous est signalé pour que vous le vérifiiez.",
  },
  {
    slug: "tableau-de-bord-direction",
    icon: "data",
    domain: "Pilotage de direction",
    title: "Réunir les chiffres de plusieurs services ou filiales dans un seul tableau de bord",
    description: "Chaque service ou filiale suit ses propres chiffres dans ses propres outils. Consolider le reporting mensuel prend des jours, et les définitions ne sont pas toujours les mêmes.",
    tags: ["Power BI", "Consolidation", "Filiales", "Indicateurs", "Qualité des données"],
    example: "Les données des différentes sources sont réunies et contrôlées, les indicateurs reçoivent une définition commune, et la direction dispose d’un tableau de bord à jour, dans un outil standard comme Power BI.",
  },
  {
    slug: "support-incidents",
    icon: "incidents",
    domain: "Support & SAV",
    title: "Traiter plus vite les pannes et les réclamations",
    description: "Une réclamation arrive sans les bonnes informations. Il faut rappeler le client, chercher l’historique, puis trouver la bonne personne.",
    tags: ["Tickets", "Historique", "Documentation", "Priorités"],
    example: "La demande est comprise, l’historique du client et les solutions déjà connues sont rassemblés, puis elle est transmise à la bonne personne avec sa priorité.",
  },
  {
    slug: "controles-financiers",
    icon: "finance",
    domain: "Contrôles financiers",
    title: "Repérer les écarts et les anomalies dans les flux financiers",
    description: "Rapprochements, notes de frais, factures fournisseurs : les contrôles se font souvent par échantillon, et les écarts se découvrent tard.",
    tags: ["Rapprochements", "Notes de frais", "Doublons", "Écarts", "ERP"],
    example: "Les flux sont comparés automatiquement à vos règles et à vos référentiels, les écarts et les doublons sont signalés à la bonne équipe, qui garde la décision finale.",
  },
  {
    slug: "contrats-obligations",
    icon: "contracts",
    domain: "Contrats & échéances",
    title: "Ne plus rater une échéance de contrat",
    description: "Reconductions, préavis, révisions de prix : les dates importantes sont écrites dans les contrats, mais personne ne les relit à temps.",
    tags: ["Contrats", "Échéances", "Préavis", "Alertes"],
    example: "Les dates et obligations clés sont relevées dans vos contrats, réunies au même endroit, et un rappel vous prévient avant chaque échéance.",
  },
  {
    slug: "copilote-metier",
    icon: "copilot",
    domain: "Outil métier",
    title: "Avoir l’IA directement dans votre logiciel de travail",
    description: "Ouvrir un outil d’IA à part, y copier des informations puis recopier la réponse fait perdre le gain promis.",
    tags: ["Logiciel métier", "Documents", "Données", "Assistant"],
    example: "Un assistant intégré à votre logiciel prépare un compte rendu, un courrier ou une recherche à partir des informations déjà à l’écran, sans changer d’outil.",
  },
];

const en: readonly BusinessUseCase[] = [
  {
    slug: "quote-requests",
    icon: "sales",
    domain: "Quotes & follow-ups",
    title: "Answer quote requests faster, and follow up the ones that go quiet",
    description: "Requests come in through the website, by email or by phone. Quotes get written in the evening, and the ones left unanswered are often forgotten.",
    tags: ["Form", "Email", "Quote template", "Follow-up", "Signature"],
    example: "The request is read and summarised, a draft quote is prepared from your prices for you to review, then a follow-up goes out automatically if the client does not reply.",
  },
  {
    slug: "internal-knowledge-assistant",
    icon: "knowledge",
    domain: "Internal documentation",
    title: "Search all internal documentation, while respecting everyone’s access rights",
    description: "Procedures, notes, contracts and presentations are spread across SharePoint, Teams, Confluence or shared folders. Staff lose time searching, and not everyone should see every document.",
    tags: ["SharePoint", "Teams", "Confluence", "Access rights", "Cited sources"],
    example: "An internal assistant answers questions from authorised sources, cites the documents it used and only shows each person what they are allowed to see.",
  },
  {
    slug: "frequent-questions",
    icon: "support",
    domain: "Customer service",
    title: "Answer the questions that keep coming back",
    description: "Opening hours, lead times, prices, documents to provide: the same questions arrive every day by email, on the website or on WhatsApp, and interrupt the work.",
    tags: ["Website", "Email", "WhatsApp", "FAQ"],
    example: "An assistant answers common questions from your own information, at any time, and passes on the requests that deserve a real reply.",
  },
  {
    slug: "tender-responses",
    icon: "contracts",
    domain: "Tenders",
    title: "Prepare tender responses faster",
    description: "Every tender means reading specifications, finding the right references and rewriting answers already written elsewhere, often against tight deadlines.",
    tags: ["Specifications", "Public procurement", "References", "Answer library"],
    example: "The specifications are analysed, the requirements are listed, and a first draft is prepared from your past answers and documents, to be reviewed and completed by your teams.",
  },
  {
    slug: "company-memory",
    icon: "knowledge",
    domain: "Know-how & documentation",
    title: "Keep the company’s memory",
    description: "A problem has already been solved, but the solution lives in a colleague’s head, an old email or a folder nobody can find. When that person leaves, the know-how leaves with them.",
    tags: ["Problems", "Solutions", "Procedures", "Documents", "Search"],
    example: "Every problem met and its solution are recorded in a shared base. The team finds them by asking in their own words, and the answer cites the original entry.",
  },
  {
    slug: "multilingual-customer-service",
    icon: "support",
    domain: "Multilingual customer service",
    title: "Answer clients in French, Dutch and English",
    description: "In Belgium, requests arrive in several languages. Teams juggle translations, reply templates and colleagues who can answer in the right language.",
    tags: ["French", "Dutch", "English", "Email", "Tickets"],
    example: "Each request is understood whatever its language, classified and routed, and a reply is drafted in the client’s language from your information, before being approved.",
  },
  {
    slug: "end-to-end-process-orchestration",
    icon: "workflow",
    domain: "Request flow",
    title: "Move a request from one step to the next, without retyping",
    description: "A request goes through several people and several tools. At every step someone retypes the information, and one slip is enough for everything to stall.",
    tags: ["Email", "CRM", "Management software", "Approval"],
    example: "The request details are carried into your tools automatically, each step notifies the right person, and only the special cases are passed to you.",
  },
  {
    slug: "internal-it-hr-support",
    icon: "incidents",
    domain: "Internal IT & HR support",
    title: "Take the pressure off internal IT and HR support",
    description: "Passwords, access, leave, expense claims, procedures: the same internal requests keep coming back and keep support teams busy.",
    tags: ["ServiceNow", "Jira", "Teams", "Procedures", "Tickets"],
    example: "Common requests are answered from your procedures, tickets are classified and completed, and only the cases that need it reach the right team.",
  },
  {
    slug: "appointments",
    icon: "planning",
    domain: "Calendar & appointments",
    title: "Confirm and remind appointments to cut no-shows",
    description: "Appointments are booked by phone or message, reminders are sent by hand, and a client who forgets leaves a gap in the day.",
    tags: ["Calendar", "SMS", "Email", "Reminders"],
    example: "The appointment is confirmed automatically, a reminder goes out the day before, and a cancellation frees the slot for another client.",
  },
  {
    slug: "high-volume-documents",
    icon: "workflow",
    domain: "High-volume documents",
    title: "Process large volumes of documents, with a record of every decision",
    description: "Complaints, files, forms or supporting documents arrive by the hundred. Reading them, extracting the information and checking it by hand slows the whole department down.",
    tags: ["Complaints", "Files", "Extraction", "Checks", "Traceability"],
    example: "Each document is read, its information extracted and checked against your rules, doubtful cases are set aside for a person, and every step is logged.",
  },
  {
    slug: "unpaid-invoices",
    icon: "finance",
    domain: "Getting paid",
    title: "Track unpaid invoices and chase them at the right time",
    description: "Chasing a client takes time and feels awkward. Reminders go out when someone thinks of it, and late payments weigh on cash flow.",
    tags: ["Invoices", "Due dates", "Reminders", "Payments"],
    example: "Due dates are tracked, a polite reminder goes out at the right time with the payment link, and you are alerted when a delay calls for a phone call.",
  },
  {
    slug: "information-system-integration",
    icon: "workflow",
    domain: "Information system",
    title: "Connect AI to your information system, without replacing it",
    description: "A large organisation already runs on established systems: ERP, CRM, document management, ticketing tools. An isolated AI tool with no access to that data remains a gadget.",
    tags: ["SAP", "Salesforce", "Microsoft 365", "ServiceNow", "API"],
    example: "AI is plugged into your existing systems, such as SAP, Salesforce, Microsoft 365 or ServiceNow, through their APIs and with access limited to what is needed, to work on your real data.",
  },
  {
    slug: "customer-onboarding",
    icon: "onboarding",
    domain: "New clients",
    title: "Welcome a new client without missing a step",
    description: "Starting with a client means gathering documents, creating their file, telling the team and sending the right information, often from memory.",
    tags: ["Form", "Documents", "Client file", "Notifications"],
    example: "The client fills in a form, missing documents are requested, their file is created in your tools and the team is notified.",
  },
  {
    slug: "ai-security-governance",
    icon: "data",
    domain: "Security & governance",
    title: "Deploy AI within a framework your IT department can approve",
    description: "Before opening an AI tool to teams, you need to know who accesses what, where the data goes and what the tool did. Without those answers, the project stays blocked.",
    tags: ["Company single sign-on", "Access rights", "Activity log", "EU hosting"],
    example: "The solution relies on company single sign-on, respects existing access rights, logs every action and keeps data in the European Union when required.",
  },
  {
    slug: "sales-opportunities",
    icon: "sales",
    domain: "Sales & prospecting",
    title: "Know which prospects to contact first",
    description: "Salespeople spend time looking for information before they know whether a prospect is worth a call, and the best leads wait.",
    tags: ["Prospects", "CRM", "Public information", "Priorities"],
    example: "The useful information on each prospect is gathered, an explainable score suggests a contact order, and the first message is drafted for review.",
  },
  {
    slug: "gdpr-ai-act-compliance",
    icon: "contracts",
    domain: "GDPR & AI Act compliance",
    title: "Frame AI use under the GDPR and the AI Act",
    description: "The European AI Act notably requires organisations to support AI literacy among the people who use it, and the GDPR already governs personal data. Yet many teams use AI with no written rules.",
    tags: ["AI Act", "GDPR", "Usage rules", "Training", "Register"],
    example: "Existing uses are mapped, clear usage rules are written, teams are trained and tools are set up to limit the data shared, together with your data protection officer.",
  },
  {
    slug: "attention-priorities",
    icon: "data",
    domain: "Steering",
    title: "See straight away what needs your attention",
    description: "The figures are spread across several tools and files. A significant gap is noticed too late, once it has already cost money.",
    tags: ["Sales", "Margin", "Cash", "Alerts"],
    example: "Your figures are brought together in a dashboard, in a tool you already know, and an unusual gap is flagged for you to check.",
  },
  {
    slug: "executive-dashboard",
    icon: "data",
    domain: "Executive steering",
    title: "Bring the figures of several departments or subsidiaries into one dashboard",
    description: "Each department or subsidiary tracks its own figures in its own tools. Consolidating the monthly reporting takes days, and definitions are not always the same.",
    tags: ["Power BI", "Consolidation", "Subsidiaries", "Indicators", "Data quality"],
    example: "Data from the different sources is brought together and checked, indicators get a shared definition, and management has an up-to-date dashboard in a standard tool such as Power BI.",
  },
  {
    slug: "support-incidents",
    icon: "incidents",
    domain: "Support & after-sales",
    title: "Handle breakdowns and complaints faster",
    description: "A complaint arrives without the right information. Someone has to call the client back, find the history, then find the right person.",
    tags: ["Tickets", "History", "Documentation", "Priorities"],
    example: "The request is understood, the client’s history and known solutions are gathered, then it is passed to the right person with its priority.",
  },
  {
    slug: "financial-controls",
    icon: "finance",
    domain: "Financial controls",
    title: "Spot gaps and anomalies in financial flows",
    description: "Reconciliations, expense claims, supplier invoices: checks are often done by sampling, and gaps are discovered late.",
    tags: ["Reconciliations", "Expense claims", "Duplicates", "Gaps", "ERP"],
    example: "Flows are automatically compared with your rules and reference data, gaps and duplicates are flagged to the right team, which keeps the final decision.",
  },
  {
    slug: "contracts-obligations",
    icon: "contracts",
    domain: "Contracts & deadlines",
    title: "Never miss a contract deadline again",
    description: "Renewals, notice periods, price reviews: the key dates are written in the contracts, but nobody rereads them in time.",
    tags: ["Contracts", "Deadlines", "Notice", "Alerts"],
    example: "Key dates and obligations are picked out of your contracts, kept in one place, and a reminder warns you before each deadline.",
  },
  {
    slug: "business-copilot",
    icon: "copilot",
    domain: "Business software",
    title: "Have AI right inside the software you work in",
    description: "Opening a separate AI tool, pasting information into it and copying the answer back cancels out the promised gain.",
    tags: ["Business software", "Documents", "Data", "Assistant"],
    example: "An assistant built into your software drafts a report, a letter or a search from the information already on screen, without switching tools.",
  },
];

/** Le nombre de cas du catalogue, contrôlé à la construction du sitemap. */
export const BUSINESS_USE_CASE_COUNT = 22;

export function businessUseCases(locale: Locale) {
  return locale === "fr" ? fr : en;
}

export function featuredBusinessUseCases(locale: Locale) {
  return businessUseCases(locale).slice(0, 4);
}

export function assertBusinessUseCases() {
  if (fr.length !== BUSINESS_USE_CASE_COUNT || en.length !== BUSINESS_USE_CASE_COUNT) {
    throw new Error(`The business use-case catalogue must contain ${BUSINESS_USE_CASE_COUNT} items in both languages.`);
  }
  const slugs = new Set(fr.map(c => c.slug));
  if (slugs.size !== fr.length) throw new Error("Duplicate French use-case slug.");
}
