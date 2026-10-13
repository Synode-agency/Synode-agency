import type { Locale } from "@/lib/content";

/**
 * LES DONNÉES DU TABLEAU DE BORD NEXUS.
 *
 * ⚠ Ce sont les chiffres et les entreprises de la DÉMONSTRATION de Nexus,
 * l'outil interne de Synode. Aucune n'est un client, aucun chiffre n'est un
 * résultat commercial, et rien ici ne doit être repris ailleurs comme tel.
 * Les deux leads qui arrivent pendant l'animation sont illustratifs eux
 * aussi.
 */

/** La scène est dessinée sur cette base, puis mise à l'échelle. */
export const W = 1600;
export const H = 900;

/** Les instants de la boucle, en millisecondes. */
export const AT = {
  countTo: 1500,
  pulseFrom: 1400,
  pulseTo: 2300,
  pressFrom: 2150,
  press: 2300,
  runTo: 13000,
  jobsTo: 2800,
  discoFrom: 2600,
  discoTo: 11600,
  cardLeft: 3200,
  cardRight: 3700,
  scrollDownFrom: 4000,
  scrollDownTo: 6200,
  lead1: 6000,
  lead2: 8000,
  leadMs: 600,
  holdMs: 1200,
  scrollUpFrom: 10600,
  scrollUpTo: 13000,
  mail1: 4400,
  mail2: 8300,
  typeMs: 2600,
  validatePress: 11600,
  validated: 11800,
  exitFrom: 14800,
  exitTo: 15500,
  loop: 16000,
  /** L'état figé sous `prefers-reduced-motion`. */
  still: 8800,
} as const;

export const SCROLL_Y = 470;
export const ROW_H = 70;

export type Kpi = { value: number; bg: string; border: string; icon: string; tone: "blue" | "green" | "warm" | "plain" };

/** Les quatre chiffres clés, dans l'ordre de la maquette. */
export const KPIS: Kpi[] = [
  { value: 278, bg: "linear-gradient(135deg, #1d2b3a, #161f2e)", border: "#2b3a4e", icon: "#9db8f2", tone: "plain" },
  { value: 24, bg: "linear-gradient(135deg, #1b3468, #152546)", border: "#30508f", icon: "#9db8f2", tone: "blue" },
  { value: 17, bg: "linear-gradient(135deg, #1c3428, #16221f)", border: "#2c4a36", icon: "#86efac", tone: "green" },
  { value: 0, bg: "linear-gradient(135deg, #352a19, #201c18)", border: "#4a3b26", icon: "#f5c451", tone: "warm" },
];

/** Les douze statuts de la répartition, et leur valeur de départ. */
export const SPLIT: number[] = [168, 11, 4, 7, 3, 4, 31, 15, 14, 1, 3, 17];

type Row = { initials: string; icp: string; status: number; date: string };

/** Les cinq lignes du tableau, puis les deux leads qui arrivent. */
export const ROWS: Row[] = [
  { initials: "BU", icp: "—", status: 0, date: "29/09/26 13:57" },
  { initials: "SE", icp: "27", status: 1, date: "29/09/26 13:56" },
  { initials: "N.", icp: "16", status: 1, date: "29/09/26 13:56" },
  { initials: "TR", icp: "26", status: 1, date: "29/09/26 13:56" },
  { initials: "CO", icp: "—", status: 0, date: "29/09/26 12:15" },
];
export const NEW_ROWS: Row[] = [
  { initials: "AR", icp: "64", status: 2, date: "" },
  { initials: "DB", icp: "78", status: 3, date: "" },
];

export const COPY = {
  fr: {
    brand: "by Synode · Prospection B2B",
    workspace: "ESPACE DE TRAVAIL",
    menus: ["Vue d’ensemble", "Discovery", "Leads", "Outreach", "Erreurs"],
    safe: "Espace privé et sécurisé",
    admin: "Administrateur",
    email: "lb.antonino7@gmail.com",
    crumb: "Nexus workspace › Vue d’ensemble",
    launch: "Lancer la prospection",
    running: "Prospection en cours…",
    testMode: "MODE TEST EMAIL",
    kicker: "PILOTAGE",
    title: "Vue d’ensemble",
    lede: "Votre activité de prospection, de la découverte au premier contact.",
    kpis: [
      { title: "Total leads", sub: "Dans votre base de prospection" },
      { title: "Leads qualifiés", sub: "Score ICP supérieur ou égal à 70" },
      { title: "Leads contactés", sub: "Statut contacté" },
      { title: "Jobs en cours", sub: "En cours de traitement" },
    ],
    splitTitle: "Répartition des leads",
    splitSub: "Accéder aux entreprises par statut",
    splitCount: (n: number) => `${n} LEADS`,
    splitLabels: ["Nouveau", "Site introuvable", "Analysé", "Qualifié", "À revoir", "Revue approfondie", "Faible priorité", "Contact non trouvé", "Téléphone uniquement", "Réseaux sociaux", "Aucun contact", "Contacté"],
    discoTitle: "Progression Discovery",
    discoSub: "De la recherche à la qualification",
    discoLink: "Voir le détail →",
    discoJobs: (n: number) => `${n} / 570 jobs traités`,
    discoFails: "0 échecs",
    leadsTitle: "Derniers leads",
    leadsSub: "Les dernières entreprises mises à jour",
    leadsLink: "Tous les leads ↗",
    cols: ["Entreprise", "ICP", "Statut", "Dernière activité"],
    names: ["Bura Construct", "Setip Gcube", "N.M.C", "Trepalla Sprl", "Construction ELPA"],
    sectors: ["Entreprise de construction · Ganshoren", "Entreprise de construction · Ganshoren", "Entrepreneur · Forest", "Entreprise de construction · Bruxelles", "Entreprise de construction · Etterbeek"],
    sites: ["Site non renseigné", "setip.be", "nmc-construction.be", "trendstop.levif.be", "Site non renseigné"],
    statuses: ["Téléphone uniquement", "Faible priorité", "Nouveau", "Qualifié"],
    open: "Consulter ↗",
    icpOf: (v: string) => `${v} /100`,
    now: "à l’instant",
    newNames: ["Atelier Renova", "Delta Bâti"],
    newSectors: ["Rénovation intérieure · Uccle", "Entreprise de construction · Anderlecht"],
    newSites: ["atelier-renova.be", "deltabati.be"],
    /* ---- La fiche lead ---- */
    sheetTitle: "Fiche lead",
    fresh: "nouveau lead",
    scoreOf: "/100 ICP",
    statusLabel: "Statut",
    aiLabel: "Analyse IA",
    ai: ["site analysé · 3 services", "contact décideur trouvé"],
    checks: ["Site web analysé", "Activité et taille vérifiées", "Score ICP calculé"],
    /* ---- L'aperçu Outreach ---- */
    outTitle: "Aperçu Outreach",
    outLink: "Aller à l’Outreach",
    ready: "Prêts à envoyer",
    review: "En revue",
    to: "À : contact@domaine",
    generating: "En génération…",
    draft: "Brouillon prêt",
    sendable: "Prêt à envoyer",
    subjectLabel: "Objet :",
    subjects: ["Votre prochain chantier, sans ressaisie", "Gagner du temps sur vos devis"],
    bodies: [
      "Bonjour, nous avons vu qu’Atelier Renova intervient sur des rénovations à Uccle. Nous aidons les entreprises du secteur à préparer leurs devis plus vite. Seriez-vous ouvert à un échange de 15 minutes ?",
      "Bonjour, Delta Bâti mène plusieurs chantiers à Anderlecht. Nous aidons les entreprises de construction à automatiser le suivi de leurs devis. Un court échange vous intéresserait-il ?",
    ],
    humanCheck: "validation humaine requise",
    validate: "Valider l’envoi",
    validatedLabel: "✓ Validé",
  },
  en: {
    brand: "by Synode · B2B prospecting",
    workspace: "WORKSPACE",
    menus: ["Overview", "Discovery", "Leads", "Outreach", "Errors"],
    safe: "Private, secured workspace",
    admin: "Administrator",
    email: "lb.antonino7@gmail.com",
    crumb: "Nexus workspace › Overview",
    launch: "Start prospecting",
    running: "Prospecting…",
    testMode: "EMAIL TEST MODE",
    kicker: "CONTROL",
    title: "Overview",
    lede: "Your prospecting activity, from discovery to first contact.",
    kpis: [
      { title: "Total leads", sub: "In your prospecting base" },
      { title: "Qualified leads", sub: "ICP score of 70 or above" },
      { title: "Leads contacted", sub: "Contacted status" },
      { title: "Jobs running", sub: "Being processed" },
    ],
    splitTitle: "Leads by status",
    splitSub: "Open companies by status",
    splitCount: (n: number) => `${n} LEADS`,
    splitLabels: ["New", "Website not found", "Analysed", "Qualified", "To review", "In-depth review", "Low priority", "No contact found", "Phone only", "Social media", "No contact", "Contacted"],
    discoTitle: "Discovery progress",
    discoSub: "From search to qualification",
    discoLink: "See the detail →",
    discoJobs: (n: number) => `${n} / 570 jobs processed`,
    discoFails: "0 failures",
    leadsTitle: "Latest leads",
    leadsSub: "The companies updated most recently",
    leadsLink: "All leads ↗",
    cols: ["Company", "ICP", "Status", "Last activity"],
    names: ["Bura Construct", "Setip Gcube", "N.M.C", "Trepalla Sprl", "Construction ELPA"],
    sectors: ["Construction company · Ganshoren", "Construction company · Ganshoren", "Contractor · Forest", "Construction company · Brussels", "Construction company · Etterbeek"],
    sites: ["No website on file", "setip.be", "nmc-construction.be", "trendstop.levif.be", "No website on file"],
    statuses: ["Phone only", "Low priority", "New", "Qualified"],
    open: "Open ↗",
    icpOf: (v: string) => `${v} /100`,
    now: "just now",
    newNames: ["Atelier Renova", "Delta Bâti"],
    newSectors: ["Interior renovation · Uccle", "Construction company · Anderlecht"],
    newSites: ["atelier-renova.be", "deltabati.be"],
    sheetTitle: "Lead sheet",
    fresh: "new lead",
    scoreOf: "/100 ICP",
    statusLabel: "Status",
    aiLabel: "AI analysis",
    ai: ["website analysed · 3 services", "decision-maker found"],
    checks: ["Website analysed", "Activity and size checked", "ICP score calculated"],
    outTitle: "Outreach preview",
    outLink: "Go to Outreach",
    ready: "Ready to send",
    review: "In review",
    to: "To: contact@domain",
    generating: "Drafting…",
    draft: "Draft ready",
    sendable: "Ready to send",
    subjectLabel: "Subject:",
    subjects: ["Your next project, without the retyping", "Save time on your quotes"],
    bodies: [
      "Hello, we noticed that Atelier Renova works on renovations in Uccle. We help firms in your trade put their quotes together faster. Would fifteen minutes suit you?",
      "Hello, Delta Bâti has several projects running in Anderlecht. We help construction firms keep track of their quotes automatically. Would a short call be of interest?",
    ],
    humanCheck: "human approval required",
    validate: "Approve and send",
    validatedLabel: "✓ Approved",
  },
} as const;

export const copyFor = (locale: Locale) => COPY[locale === "fr" ? "fr" : "en"];

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from), 0, 1);
/** Ralenti en fin de course. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** Ralenti au départ et à l'arrivée. */
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
/** Un léger dépassement, pour l'arrivée des cartes. */
export const easeOutBack = (t: number) => {
  const c = 1.7;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
