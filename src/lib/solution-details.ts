import { getContent, type Locale } from "./content";

export type SolutionDetail = {
  /** ⚠ CE N'EST PAS UNE DÉFINITION, et il ne faut pas en remettre une ici.
   *  C'est le paragraphe du HERO, et il dit ce que le service APPORTE. La
   *  définition du service vit dans `whatText` de `service-pages.ts`, sous
   *  le titre « Qu'est-ce que… », avec son visuel. Les deux champs ont
   *  longtemps défini la même chose en d'autres mots, et la page le disait
   *  donc deux fois à deux écrans d'intervalle. */
  heroLead: string;
  audience: string;
  possibilities: string[];
  scenario: { title: string; before: string; tools: string[]; steps: [string, string][]; outcome: string };
  examples: [string, string][];
  /** ⚠ PLUS AUCUNE PAGE NE LIT CE CHAMP. Il alimentait la section « Ce qu'il
   *  faut cadrer ensemble » des six pages services, retirée du gabarit. Le
   *  texte est conservé tel quel au cas où la section revienne sous une
   *  autre forme ; ne pas s'appuyer dessus sans vérifier qu'elle existe. */
  requirements: string[];
  integration: string;
  related: number[];
  faq: { q: string; a: string }[];
};

const fr: SolutionDetail[] = [
  {
    heroLead: "Vos équipes passent moins de temps à chercher l’information et à préparer les réponses. Un agent IA travaille dans vos outils, dans un périmètre que vous définissez, et vous gardez la main sur ce qui compte.",
    audience: "Pour les équipes de support, les commerciaux et les collaborateurs qui passent du temps à retrouver une information ou à préparer une réponse.",
    possibilities: ["Agent documentaire avec sources et droits d’accès.", "Copilote métier pour préparer un dossier ou un rendez-vous.", "Agent vocal pour qualifier une demande, avec transfert à une personne.", "Agent capable de créer une tâche ou de préparer une action encadrée."],
    scenario: { title: "Une question client, une réponse à vérifier", before: "Une PME reçoit une question sur un service. La réponse existe, mais elle est dispersée dans plusieurs documents et échanges.", tools: ["Email", "Documents autorisés", "CRM", "Collaborateur"], steps: [["Retrouver", "L’agent IA recherche dans les sources autorisées et signale les informations manquantes."], ["Préparer", "Il propose une réponse avec les références utilisées, et peut préparer une tâche de suivi dans le CRM."], ["Valider", "Le collaborateur vérifie les sources, corrige le brouillon et autorise l’envoi ou les actions sensibles."]], outcome: "Une réponse préparée et traçable, à relire plutôt qu’à reconstruire. Son utilité se vérifie sur vos questions réelles." },
    examples: [["Avant un rendez-vous", "Un copilote rassemble les notes CRM et les échanges autorisés dans une fiche de préparation."], ["À l’accueil téléphonique", "Un agent vocal recueille le motif d’un appel et transmet les cas hors périmètre à l’équipe."]],
    requirements: ["Une documentation fiable, accessible et tenue à jour.", "Des droits d’accès respectés et des actions autorisées définies à l’avance.", "Des tests sur les réponses et une possibilité de dire « je ne sais pas » : une IA peut se tromper."],
    integration: "Nous partons des outils déjà utilisés. Une connexion au CRM peut alimenter le suivi ; une automatisation peut organiser la circulation du brouillon et sa validation.", related: [1, 3],
    faq: [{ q: "L’agent agit-il sans nous demander ?", a: "Seulement pour les actions explicitement autorisées dans le périmètre convenu. Les actions sensibles peuvent nécessiter votre accord avant exécution. Le niveau de contrôle se définit avec vous." }, { q: "Peut-il répondre uniquement à partir de nos documents ?", a: "Nous pouvons limiter les sources consultées et afficher les références. Cela ne supprime pas le risque d’erreur : nous prévoyons des tests, une réponse d’incertitude et une relecture adaptée au contexte." }],
  },
  {
    heroLead: "L’automatisation des processus métier réduit les tâches répétitives qui mobilisent vos équipes. Les demandes, documents et validations circulent automatiquement entre vos logiciels selon vos propres règles, tandis que les cas ambigus restent soumis à un contrôle humain.",
    audience: "Pour les équipes administratives, les opérations et les responsables qui suivent encore des tâches répétitives par email ou tableur.",
    possibilities: ["Tri des emails et orientation vers le bon interlocuteur.", "Extraction de factures, formulaires ou pièces reçues.", "Circuits de validation avec traitement des exceptions.", "Préparation de documents et relances selon des règles convenues."],
    scenario: { title: "De la facture reçue aux données vérifiées", before: "Une équipe recopie les factures reçues par email dans son outil comptable, puis vérifie les montants à la main.", tools: ["Boîte email", "Facture PDF", "Contrôles", "Outil comptable"], steps: [["Déclencher", "L’arrivée d’une pièce jointe identifiée comme facture démarre le flux. Le fichier original est conservé."], ["Contrôler", "Les champs sont extraits, les montants et les doublons sont contrôlés. Une donnée ambiguë est signalée à une personne."], ["Transmettre", "Les données validées rejoignent l’outil comptable si son accès le permet. Les erreurs de transfert sont visibles et peuvent être reprises."]], outcome: "Un traitement suivi, avec moins de ressaisie recherchée et des exceptions identifiées. La personne garde la validation des éléments incertains." },
    examples: [["Demandes entrantes", "Un email est classé, attribué et accompagné des informations utiles au traitement."], ["Validation d’un document", "Le bon responsable reçoit une demande d’accord avant que le flux ne poursuive ses étapes."]],
    requirements: ["Des règles métier explicites et des exemples de cas habituels et exceptionnels.", "Des accès compatibles aux boîtes mail et aux logiciels concernés.", "Une gestion des échecs, des doublons et des reprises ; les cas ambigus ne doivent pas passer silencieusement."],
    integration: "Le flux organise le travail entre les outils. Les intégrations transportent les données ; un agent IA peut aider à préparer les éléments que vous devez valider.", related: [3, 0],
    faq: [{ q: "Faut-il mettre de l’IA à chaque étape ?", a: "Non. Une règle déterministe est souvent préférable pour un calcul ou un transfert. L’IA est utilisée là où comprendre ou classer une information apporte une utilité vérifiable." }, { q: "Que se passe-t-il si une étape échoue ?", a: "Nous définissons les notifications, les possibilités de reprise et les contrôles contre les doublons. Le suivi et les interventions incluses sont précisés au contrat." }],
  },
  {
    heroLead: "Un logiciel métier sur mesure adapte les écrans, les droits et les fonctionnalités aux processus réels de votre entreprise. Vos équipes travaillent dans une application conçue pour leurs besoins, avec des fonctions d’intelligence artificielle uniquement là où elles apportent un gain concret.",
    audience: "Pour les entreprises dont les fichiers et logiciels ne couvrent plus le fonctionnement, ou qui souhaitent enrichir un service destiné à leurs clients.",
    possibilities: ["Application interne de suivi des demandes ou interventions.", "Portail adapté aux rôles de vos collaborateurs ou clients.", "Copilote intégré à un logiciel existant.", "Produit ou fonctionnalité IA conçu pour les clients de votre entreprise."],
    scenario: { title: "Les interventions, dans un même espace", before: "Une société de services suit ses demandes par email et ses interventions dans plusieurs fichiers. Le compte rendu est rédigé après chaque visite.", tools: ["Demandes", "Interface métier", "Notes terrain", "Validation"], steps: [["Rassembler", "Les demandes et informations nécessaires sont réunies dans une interface accessible selon les rôles."], ["Travailler", "Le collaborateur suit l’intervention et ajoute ses notes. L’IA prépare un compte rendu à partir de ces éléments."], ["Relire", "Le collaborateur corrige le document avant de l’envoyer. L’état du dossier est visible pour les personnes autorisées."]], outcome: "Un parcours cohérent, du dossier au compte rendu, avec une information plus facile à suivre. Le fonctionnement est testé avec les utilisateurs concernés." },
    examples: [["Un portail client", "Votre client retrouve ses demandes et reçoit une synthèse validée de leur avancement."], ["Un copilote produit", "Une fonctionnalité aide les utilisateurs de votre logiciel à analyser un dossier ou à préparer un document."]],
    requirements: ["Des utilisateurs disponibles pour décrire leur travail et tester les parcours.", "Un périmètre priorisé, des rôles et des données clairement définis.", "Des critères de test, des conditions d’hébergement et une maintenance adaptés à l’usage réel."],
    integration: "L’application peut s’appuyer sur vos systèmes existants et accueillir un agent IA spécialisé. Nous vérifions les connexions possibles avant de reconstruire une fonction déjà disponible.", related: [3, 0],
    faq: [{ q: "Faut-il remplacer tous nos logiciels ?", a: "Non. Nous vérifions d’abord ce qui peut être conservé ou connecté. Le sur-mesure intervient sur les parcours qui justifient réellement un développement." }, { q: "Pouvez-vous construire une fonction pour nos clients ?", a: "Oui, selon la faisabilité. Cela demande de cadrer aussi les droits d’accès, les volumes, les coûts d’usage, le support et les responsabilités envers les utilisateurs finaux." }],
  },
  {
    heroLead: "L’intégration de vos logiciels évite la double saisie et maintient vos données à jour entre votre CRM, votre ERP, votre site web, vos API et vos bases de données. Chaque système connecté conserve un rôle clair, avec une source de référence définie.",
    audience: "Pour les équipes qui recopient la même information dans plusieurs outils ou travaillent avec des versions différentes d’un dossier.",
    possibilities: ["Connexion du site au CRM et à l’outil de gestion.", "Synchronisation de contacts, dossiers ou statuts.", "Échanges entre API, ERP et bases de données.", "Rapprochement et contrôle des données transférées."],
    scenario: { title: "Une demande validée, des outils à jour", before: "Une demande reçue sur le site doit être recopiée dans le CRM puis dans l’outil de gestion. Un changement peut être oublié dans l’un des deux.", tools: ["Site web", "CRM", "Outil de gestion", "Journal de suivi"], steps: [["Identifier", "La demande validée est rapprochée d’un contact existant à l’aide d’un identifiant défini."], ["Synchroniser", "Le CRM est créé ou mis à jour ; seules les informations utiles sont transmises à l’outil de gestion."], ["Vérifier", "Le résultat du transfert est enregistré. Un conflit ou un échec est signalé pour contrôle et reprise."]], outcome: "Une information partagée avec des règles explicites sur la source de référence, les conflits et les erreurs, pour limiter la double saisie." },
    examples: [["Une commande suivie", "Le statut confirmé dans l’ERP peut être transmis au portail client."], ["Un reporting alimenté", "Les données autorisées de plusieurs outils rejoignent un espace d’analyse commun."]],
    requirements: ["Des API ou moyens d’échange réellement disponibles et autorisés.", "Des identifiants communs et des règles sur la source de référence.", "Des limites de fréquence, de volume et de droits vérifiées auprès des outils concernés."],
    integration: "Nous établissons une carte des échanges avant de connecter les outils. Les données synchronisées peuvent alimenter un workflow ou un tableau de bord, sans imposer un logiciel supplémentaire aux équipes.", related: [1, 4],
    faq: [{ q: "Tous les logiciels peuvent-ils être connectés ?", a: "Non. Certains n’offrent pas d’accès adapté ou imposent un abonnement et des limites. Nous vérifions ces possibilités avant de confirmer le périmètre." }, { q: "Les données seront-elles toujours synchronisées en temps réel ?", a: "Pas nécessairement. La fréquence dépend du besoin et des capacités des outils. Elle est définie avec les règles de reprise en cas d’interruption." }],
  },
  {
    heroLead: "L’analyse de données et les tableaux de bord transforment vos informations dispersées en indicateurs fiables pour piloter votre entreprise. Vos données sont centralisées, contrôlées et rendues lisibles, sans jamais présenter une prévision comme un chiffre réellement constaté.",
    audience: "Pour les dirigeants et équipes qui décident à partir de chiffres dispersés, ou veulent mieux exploiter leurs données opérationnelles.",
    possibilities: ["Centralisation des données et tableaux de bord métier.", "Analyse d’activité et détection d’anomalies à vérifier.", "Recherche sémantique dans des informations autorisées.", "Prévision, scoring et recommandation selon les données et la faisabilité."],
    scenario: { title: "Ventes et stocks, une lecture commune", before: "Un commerce consulte séparément ses ventes et ses stocks. Il doit reconstituer l’historique pour préparer ses achats.", tools: ["Ventes", "Stocks", "Tableau de bord", "Responsable achats"], steps: [["Consolider", "Les données sont rapprochées et contrôlées : dates, références produits, retours et valeurs manquantes."], ["Comprendre", "Le tableau de bord présente les indicateurs observés et signale les variations qui méritent une vérification."], ["Estimer", "Si l’historique est suffisant, une estimation des besoins est testée. Le responsable compare cette aide au contexte avant de commander."]], outcome: "Des chiffres plus faciles à lire et, lorsque cela est pertinent, une aide à la décision évaluée sur l’historique. Aucune prévision n’est une certitude." },
    examples: [["Repérer une anomalie", "Une variation inhabituelle dans les demandes ou les ventes attire l’attention de l’équipe."], ["Prioriser une revue", "Un scoring explicable propose un ordre d’examen des dossiers, que le responsable peut corriger."]],
    requirements: ["Des données accessibles, un historique pertinent et une qualité mesurable.", "Des indicateurs définis avec le métier, plutôt que des chiffres sans contexte.", "Des estimations évaluées sur des données distinctes et revues dans le temps ; la performance n’est pas garantie."],
    integration: "Les intégrations alimentent les données et une application peut rendre les analyses accessibles aux utilisateurs. Nous commençons par les indicateurs utiles avant d’envisager un modèle prédictif.", related: [3, 2],
    faq: [{ q: "Peut-on prévoir avec peu de données ?", a: "Pas toujours de manière utile. Nous examinons le volume, la qualité et la représentativité. Un tableau de bord fiable ou une meilleure collecte peut être la première étape recommandée." }, { q: "Un score prend-il la décision à notre place ?", a: "Non par défaut. Son rôle, ses critères et ses limites doivent être compris. Il peut aider à prioriser une revue humaine ; tout usage plus engageant demande un cadrage spécifique." }],
  },
  {
    heroLead: "Une formation IA adaptée à votre entreprise aide vos équipes à choisir les bons usages, vérifier les réponses et protéger les informations sensibles. Les exercices partent de situations métier réelles afin d’installer des pratiques utiles et durables.",
    audience: "Pour les indépendants, dirigeants et équipes qui veulent dépasser la découverte des outils et construire des pratiques adaptées à leur métier.",
    possibilities: ["Ateliers de découverte des usages et de leurs limites.", "Exercices métier sur vos situations de travail.", "Méthodes de rédaction, de vérification et de protection des informations.", "Prise en main d’une solution Synode et accompagnement des référents."],
    scenario: { title: "Des essais individuels à une pratique partagée", before: "Une petite équipe utilise l’IA de manière occasionnelle. Chacun improvise ses demandes et ne sait pas toujours quelles informations il peut partager.", tools: ["Situations métier", "Outil autorisé", "Exercices", "Guide de relecture"], steps: [["Choisir", "L’équipe sélectionne des usages concrets, comme préparer un compte rendu ou une réponse client, avec des exemples adaptés."], ["Pratiquer", "Les participants formulent une demande, comparent les réponses et apprennent à repérer les oublis et les erreurs."], ["Adopter", "Une méthode de relecture et des règles de partage des informations sont convenues. Les points à suivre sont identifiés avec l’équipe."]], outcome: "Des repères communs et des exercices réutilisables dans le travail quotidien. L’adoption se construit avec la pratique, pas par une promesse de productivité immédiate." },
    examples: [["Un dirigeant indépendant", "Un atelier aide à sélectionner quelques tâches adaptées et à vérifier les réponses obtenues."], ["Une solution livrée", "Les utilisateurs s’entraînent sur les parcours réels et savent à qui signaler un problème."]],
    requirements: ["Des situations métier représentatives et du temps pour pratiquer.", "Des outils autorisés et des règles claires sur les données partageables.", "Un format adapté au niveau des participants ; aucune certification ou prise en charge n’est présumée."],
    integration: "L’accompagnement peut être autonome ou faire partie d’un projet. Les retours des utilisateurs aident à ajuster un agent IA ou une application, et à définir les habitudes de contrôle utiles.", related: [0, 2],
    faq: [{ q: "Faut-il acheter une solution Synode pour se former ?", a: "Non. Les ateliers peuvent porter sur les usages généraux de l’IA et les outils autorisés dans votre entreprise, indépendamment d’un développement." }, { q: "Le contenu est-il le même pour toutes les équipes ?", a: "Nous adaptons les exercices, le vocabulaire et la progression aux participants. Les objectifs, la durée et les supports inclus sont précisés dans la proposition." }],
  },
];

const en: SolutionDetail[] = [
  {
    heroLead: "Your teams spend less time looking for information and drafting replies. An AI agent works inside your tools, within a scope you define, and you keep control of what matters.",
    audience: "For support teams, salespeople and colleagues who spend time finding information or preparing replies.",
    possibilities: ["Document agents with sources and access permissions.", "Specialist copilots for case or meeting preparation.", "Voice agents that qualify requests and hand over to a person.", "Agents that create tasks or prepare actions within agreed limits."],
    scenario: { title: "A customer question, a reply to review", before: "A small business receives a service question. The answer exists, but is scattered across documents and previous conversations.", tools: ["Email", "Authorised documents", "CRM", "Team member"], steps: [["Find", "The AI agent searches approved sources and flags missing information."], ["Prepare", "It drafts a reply with references, and can also prepare a follow-up task in the CRM."], ["Approve", "A colleague checks the sources, edits the draft and approves sending or other sensitive actions."]], outcome: "A traceable draft to review instead of starting from scratch. Its usefulness is evaluated against your actual questions." },
    examples: [["Before a meeting", "A copilot gathers CRM notes and authorised conversations into a preparation brief."], ["On the phone", "A voice agent records the reason for a call and hands requests outside its scope to the team."]],
    requirements: ["Reliable, accessible documentation that stays up to date.", "Respected access permissions and actions authorised in advance.", "Answer testing and the ability to say ‘I don’t know’: AI can make mistakes."],
    integration: "We start with your existing tools. A CRM connection can support follow-up; an automation can organise draft routing and approval.", related: [1, 3],
    faq: [{ q: "Does an agent act without asking us?", a: "Only for actions explicitly authorised in the agreed scope. Sensitive actions can require approval before execution. We define the level of control together." }, { q: "Can it answer only from our documents?", a: "We can restrict the sources and show references. This does not eliminate errors: testing, uncertainty responses and appropriate review remain necessary." }],
  },
  {
    heroLead: "Business process automation reduces the repetitive tasks that take up your teams' time. Requests, documents and approvals move automatically between your software according to your own rules, while ambiguous cases remain subject to human review.",
    audience: "For administration, operations and managers who still coordinate repetitive tasks through email or spreadsheets.",
    possibilities: ["Email classification and routing.", "Extraction from invoices, forms and attachments.", "Approval workflows with exception handling.", "Document preparation and reminders based on agreed rules."],
    scenario: { title: "From an incoming invoice to checked data", before: "A team copies emailed invoices into accounting software, then checks the amounts manually.", tools: ["Inbox", "PDF invoice", "Checks", "Accounting software"], steps: [["Trigger", "An attachment identified as an invoice starts the workflow. The original file is retained."], ["Check", "Fields are extracted and amounts and duplicates checked. Ambiguous data goes to a person."], ["Transfer", "Approved data reaches the accounting tool if access permits. Transfer failures remain visible and can be retried."]], outcome: "A traceable process designed to reduce retyping and identify exceptions. People retain control of uncertain items." },
    examples: [["Incoming requests", "An email is classified, assigned and accompanied by the details needed to process it."], ["Document approval", "The appropriate manager receives an approval request before the workflow continues."]],
    requirements: ["Explicit business rules and examples of both routine and exceptional cases.", "Compatible access to the relevant inboxes and software.", "Failure, duplicate and retry handling so ambiguous cases do not silently pass through."],
    integration: "The workflow organises work between tools. Integrations move the data; an AI agent can help draft the items that need your approval.", related: [3, 0],
    faq: [{ q: "Does every step need AI?", a: "No. A deterministic rule is often preferable for a calculation or transfer. AI is used where understanding or classifying information provides verifiable value." }, { q: "What happens if a step fails?", a: "We define notifications, retry options and duplicate checks. Monitoring and included interventions are specified in the contract." }],
  },
  {
    heroLead: "Custom business software adapts its screens, access rights and features to your company's actual processes. Your teams work in an application designed for their needs, with artificial intelligence only where it delivers a concrete benefit.",
    audience: "For businesses whose files and software no longer support their workflow, or those adding AI to a customer-facing service.",
    possibilities: ["Internal request or service-job tracking applications.", "Portals tailored to staff or customer roles.", "Copilots embedded in existing software.", "AI products or features for your company’s customers."],
    scenario: { title: "Service jobs in one place", before: "A service company tracks requests by email and jobs in separate files. A report is written after each visit.", tools: ["Requests", "Business interface", "Field notes", "Approval"], steps: [["Gather", "Requests and relevant information are brought into one interface with role-based access."], ["Work", "A colleague tracks the job and adds notes. AI prepares a report from those notes."], ["Review", "The colleague edits the report before sending. Authorised users can see the case status."]], outcome: "A coherent journey from case to report, with information that is easier to follow. The workflow is tested with its intended users." },
    examples: [["A customer portal", "Customers find their requests and receive an approved progress summary."], ["A product copilot", "A feature helps your software users analyse a case or prepare a document."]],
    requirements: ["Available users to explain their work and test the journeys.", "A prioritised scope with clearly defined roles and data.", "Testing criteria, hosting and maintenance suited to actual use."],
    integration: "The application can use existing systems and include a specialist AI agent. We check possible connections before rebuilding a feature you already have.", related: [3, 0],
    faq: [{ q: "Do we need to replace all our software?", a: "No. We first check what can be retained or connected. Custom development focuses on workflows that justify it." }, { q: "Can you build a feature for our customers?", a: "Yes, subject to feasibility. We also need to define access rights, volumes, usage costs, support and responsibilities towards end users." }],
  },
  {
    heroLead: "Software integration eliminates duplicate entry and keeps data up to date across your CRM, ERP, website, APIs and databases. Each connected system retains a clear role, with an agreed source of record.",
    audience: "For teams that copy the same information into several systems or work with different versions of a case.",
    possibilities: ["Website connections to CRM and management software.", "Contact, case or status synchronisation.", "Exchanges between APIs, ERP systems and databases.", "Matching and checking transferred data."],
    scenario: { title: "An approved request, updated tools", before: "A website request is retyped in the CRM and management system. A change can be missed in either one.", tools: ["Website", "CRM", "Management software", "Transfer log"], steps: [["Identify", "The approved request is matched to an existing contact using an agreed identifier."], ["Synchronise", "The CRM record is created or updated; only necessary information reaches the management tool."], ["Verify", "The transfer result is recorded. Conflicts or failures are flagged for review and retry."]], outcome: "Shared information with explicit rules for the source of truth, conflicts and errors, designed to limit double entry." },
    examples: [["Order tracking", "A status confirmed in the ERP can be passed to the customer portal."], ["Reporting inputs", "Authorised data from several systems feeds a common analysis space."]],
    requirements: ["Available and authorised APIs or exchange mechanisms.", "Common identifiers and rules for the source of truth.", "Verified frequency, volume and permission limits for each tool."],
    integration: "We map the exchanges before connecting systems. Synchronised data can feed a workflow or dashboard without requiring another tool for the team.", related: [1, 4],
    faq: [{ q: "Can every system be connected?", a: "No. Some offer no suitable access or require a subscription with limits. We check these conditions before confirming scope." }, { q: "Will data always synchronise in real time?", a: "Not necessarily. Frequency depends on the need and the tools’ capabilities. It is defined alongside recovery rules for interruptions." }],
  },
  {
    heroLead: "Data analysis and dashboards turn scattered information into reliable indicators for managing your business. Your data is centralised, checked and made readable, while forecasts are always distinguished from recorded figures.",
    audience: "For leaders and teams making decisions from scattered figures or seeking more value from operational data.",
    possibilities: ["Data centralisation and business dashboards.", "Activity analysis and anomaly detection for review.", "Semantic search across authorised information.", "Forecasting, scoring and recommendations subject to data and feasibility."],
    scenario: { title: "Sales and stock, one shared view", before: "A retailer checks sales and stock separately and reconstructs historical figures to prepare purchases.", tools: ["Sales", "Stock", "Dashboard", "Purchasing manager"], steps: [["Consolidate", "Data is matched and checked: dates, product references, returns and missing values."], ["Understand", "The dashboard shows observed metrics and flags changes worth investigating."], ["Estimate", "If enough history exists, demand estimates are tested. The manager considers context before ordering."]], outcome: "Figures that are easier to read and, where appropriate, decision support evaluated against historical data. A forecast is never a certainty." },
    examples: [["Spot an anomaly", "An unusual change in requests or sales draws the team’s attention."], ["Prioritise review", "An explainable score suggests an order for reviewing cases, which a manager can correct."]],
    requirements: ["Accessible data, relevant history and measurable quality.", "Metrics defined with the business, rather than figures without context.", "Estimates evaluated on separate data and reviewed over time; performance is not guaranteed."],
    integration: "Integrations supply the data and an application can make analysis available to users. We start with useful metrics before considering a predictive model.", related: [3, 2],
    faq: [{ q: "Can we forecast with little data?", a: "Not always usefully. We examine volume, quality and representativeness. A reliable dashboard or improved collection may be the recommended first step." }, { q: "Does a score decide for us?", a: "Not by default. Its role, criteria and limits must be understood. It can prioritise human review; more consequential uses need specific scoping." }],
  },
  {
    heroLead: "AI training tailored to your business helps teams choose the right use cases, verify answers and protect sensitive information. Exercises use real work situations to build useful and lasting practices.",
    audience: "For freelancers, leaders and teams who want to move beyond discovering tools and establish practices suited to their work.",
    possibilities: ["Workshops on use cases and limitations.", "Practical exercises based on real work situations.", "Methods for drafting, checking and protecting information.", "Onboarding for a Synode solution and support for team champions."],
    scenario: { title: "From individual trials to shared practice", before: "A small team uses AI occasionally. Everyone improvises prompts and is unsure which information can be shared.", tools: ["Work situations", "Approved tool", "Exercises", "Review guide"], steps: [["Choose", "The team selects practical uses such as meeting notes or customer replies, with suitable examples."], ["Practise", "Participants write requests, compare answers and learn to spot omissions and errors."], ["Adopt", "A review method and information-sharing rules are agreed. Follow-up points are identified with the team."]], outcome: "Shared reference points and reusable exercises for daily work. Adoption develops through practice, not a promise of instant productivity." },
    examples: [["An independent business owner", "A workshop helps select suitable tasks and check the answers received."], ["A delivered solution", "Users practise real workflows and know whom to contact if something goes wrong."]],
    requirements: ["Representative work situations and time to practise.", "Approved tools and clear rules for shareable information.", "A format suited to participants’ experience; no certification or funding is assumed."],
    integration: "Support can stand alone or form part of a project. User feedback helps refine an AI agent or application and establish useful review habits.", related: [0, 2],
    faq: [{ q: "Do we need to buy a Synode solution to get training?", a: "No. Workshops can cover general AI uses and tools approved in your company, independently of a development project." }, { q: "Is the content the same for every team?", a: "We adapt exercises, vocabulary and progression to participants. Objectives, duration and included materials are specified in the proposal." }],
  },
];

/**
 * La question des coûts récurrents, posée à l'identique sur les six
 * familles.
 *
 * Écrite une seule fois et ajoutée à chaque FAQ plutôt que recopiée six
 * fois : c'est un engagement contractuel, il ne doit pas se mettre à
 * diverger d'une page à l'autre au fil des retouches.
 *
 * Elle dit trois choses, et les trois comptent. Qu'un coût récurrent
 * EXISTE, parce qu'une solution consomme des services payants tant qu'elle
 * tourne. Que Synode ne l'absorbe jamais. Et que le service de suivi est
 * un CHOIX, pas une obligation : sans lui, la solution est livrée et le
 * client paie directement ses fournisseurs.
 */
const RECURRING_FAQ = {
  fr: {
    q: "Y a-t-il des coûts récurrents après la mise en service ?",
    a: "Oui. Une solution IA s’appuie sur des services payants — modèles IA, hébergement, plateformes d’automatisation, connexions aux logiciels — qui fonctionnent par abonnement tant qu’elle tourne. Ces coûts ne sont jamais absorbés par Synode. Vous choisissez : soit vous prenez notre suivi et nous assurons l’exploitation, le monitoring et la maintenance contre un paiement récurrent défini au contrat ; soit vous ne le prenez pas, la solution est livrée et déployée, et vous souscrivez puis payez ces services directement auprès des fournisseurs. Dans les deux cas, les montants sont estimés avant le démarrage.",
  },
  en: {
    q: "Are there recurring costs after go-live?",
    a: "Yes. An AI solution relies on paid services — AI models, hosting, automation platforms, software connections — billed by subscription for as long as it runs. Synode never absorbs these costs. You choose: either you take our support service and we handle running, monitoring and maintenance for a recurring payment set out in the contract; or you do not, the solution is delivered and deployed, and you subscribe to and pay those services directly with the providers. In both cases the amounts are estimated before work starts.",
  },
} as const;

export function solutionFamilies(locale: Locale) {
  const details = locale === "fr" ? fr : en;
  const recurring = RECURRING_FAQ[locale];
  return getContent(locale).solutions.bricks.map((summary, index) => ({
    ...summary,
    detail: { ...details[index], faq: [...details[index].faq, recurring] },
  }));
}
export function findSolution(locale: Locale, slug: string) {
  return solutionFamilies(locale).find(family => family.slug === slug);
}
