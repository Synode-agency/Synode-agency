import type { Locale } from "@/lib/content";

/**
 * LE CONTENU DES QUATRE ÉCRANS DE NEXUS.
 *
 * ⚠ Ce sont les données de la DÉMONSTRATION de Nexus, l'outil interne de
 * Synode : des entreprises réellement présentes dans des sources
 * professionnelles publiques, et les chiffres de l'outil. Aucune n'est un
 * client, aucun chiffre n'est un résultat commercial, et rien ici ne doit
 * être repris ailleurs comme tel.
 *
 * Tout est en props dans les composants : ce fichier ne sert qu'à Nexus, et
 * un autre projet apporte le sien.
 */

export type LeadRow = { initials: string; name: string; where: string; icp: string; status: string };
export type MailRow = { initials: string; name: string; who: string; mail: string; subject: string };

/** La forme du contenu d'un jeu d'écrans. Un autre projet fournit le sien. */
export type WindowsContent = {
  brandWord: string;
  by: string;
  menus: readonly string[];
  badge: string;
  /** ⚠ Un gabarit, pas une fonction : une fonction ne traverse pas la
   *  frontière serveur → client. `{page}` est remplacé à l'affichage. */
  crumbTemplate: string;
  leads: {
    kicker: string; title: string; lede: string; results: string;
    cols: readonly string[]; rows: readonly LeadRow[];
    cardTitle: string; synth: readonly string[]; tags: readonly (readonly string[])[];
  };
  discovery: {
    kicker: string; title: string; lede: string;
    manualTitle: string; manualText: string; launch: string; running: string; rhythm: string;
    queueKicker: string; queueTitle: string; jobs: string;
    counters: readonly string[]; sectorsTitle: string; sectors: readonly string[]; sectorCount: string;
  };
  overview: {
    kicker: string; title: string; lede: string; kpis: readonly string[];
    splitTitle: string; splitCount: string; splits: readonly (readonly [string, string])[];
  };
  outreach: {
    kicker: string; title: string; lede: string;
    selected: string; send: string;
    cols: readonly string[]; rows: readonly MailRow[]; states: readonly string[];
    cardTitle: string; waiting: string; doneLabel: string; edit: string; approve: string; approved: string;
  };
};

export const NEXUS_WINDOWS: Record<"fr" | "en", WindowsContent> = {
  fr: {
    brandWord: "Nexus",
    by: "by Synode · Prospection B2B",
    menus: ["Vue d’ensemble", "Discovery", "Leads", "Outreach", "Erreurs"],
    badge: "MODE TEST EMAIL",
    crumbTemplate: "Nexus workspace › {page}",

    leads: {
      kicker: "INTELLIGENCE",
      title: "Leads",
      lede: "Identifiez les bonnes entreprises. Retrouvez les contacts qui comptent.",
      results: "278 résultats",
      cols: ["Entreprise", "ICP", "Statut"],
      rows: [
        { initials: "BU", name: "Bura Construct", where: "Entreprise de construction · Ganshoren", icp: "—", status: "Téléphone uniquement" },
        { initials: "SE", name: "Setip Gcube", where: "Entreprise de construction · Ganshoren", icp: "27", status: "Faible priorité" },
        { initials: "N.", name: "N.M.C", where: "Entrepreneur · Forest", icp: "16", status: "Faible priorité" },
        { initials: "TR", name: "Trepalla Sprl", where: "Entreprise de construction · Bruxelles", icp: "26", status: "Faible priorité" },
        { initials: "CO", name: "Construction ELPA", where: "Entreprise de construction · Etterbeek", icp: "—", status: "Téléphone uniquement" },
        { initials: "CA", name: "Carlos AAK", where: "Travaux généraux · Evere", icp: "24", status: "Faible priorité" },
      ] as LeadRow[],
      cardTitle: "Analyse IA",
      synth: [
        "Entreprise de construction active à Ganshoren. Aucun site trouvé : contact par téléphone uniquement.",
        "Activité de construction à Ganshoren. Site disponible, peu d’indices d’un besoin immédiat.",
        "Entrepreneur indépendant à Forest. Besoin potentiel faible, à recontacter plus tard.",
        "Construction à Bruxelles. Informations publiques limitées, priorité faible.",
      ],
      tags: [
        ["Activité vérifiée", "Site introuvable", "Téléphone"],
        ["Activité vérifiée", "Site analysé", "ICP 27"],
        ["Activité vérifiée", "Site analysé", "ICP 16"],
        ["Activité vérifiée", "Sources limitées", "ICP 26"],
      ],
    },

    discovery: {
      kicker: "EXÉCUTION",
      title: "Discovery",
      lede: "Orchestrez les recherches et suivez leur traitement.",
      manualTitle: "Lancement manuel",
      manualText: "Traite les prochains jobs disponibles dans la file.",
      launch: "Lancer maintenant",
      running: "Traitement en cours…",
      rhythm: "3 jobs par lancement · intervalle 720 min",
      queueKicker: "SUIVI OPÉRATIONNEL",
      queueTitle: "Progression de la file",
      jobs: "{n} / 570 jobs traités",
      counters: ["En attente", "En cours", "Terminé", "Échec"],
      sectorsTitle: "Secteurs et communes",
      sectors: ["Agence immobilière", "Agence intérim", "Agence marketing", "Agence web"],
      sectorCount: "19/19",
    },

    overview: {
      kicker: "PILOTAGE",
      title: "Vue d’ensemble",
      lede: "Votre activité de prospection, de la découverte au premier contact.",
      kpis: ["Total leads", "Leads qualifiés", "Leads contactés", "Jobs en cours"],
      splitTitle: "Répartition des leads",
      splitCount: "278 LEADS",
      splits: [
        ["Nouveau", "168"], ["Site introuvable", "11"], ["Analysé", "4"],
        ["Qualifié", "7"], ["À revoir", "3"], ["Revue approfondie", "4"],
        ["Faible priorité", "31"], ["Contact non trouvé", "15"], ["Contacté", "17"],
      ] as [string, string][],
    },

    outreach: {
      kicker: "PRISE DE CONTACT",
      title: "Outreach",
      lede: "Des messages préparés. Des envois maîtrisés. Un suivi précis.",
      selected: "{n} sélectionné",
      send: "Envoyer la sélection",
      cols: ["Entreprise", "Email", "État"],
      rows: [
        { initials: "CO", name: "Cofiges Vdm Fiduciaire", who: "Nicole Vandermeuter · Gérante", mail: "contact@cofigesvdm.be", subject: "Mise en place Peppol" },
        { initials: "TH", name: "The Syndic.be", who: "John de Troyer · Fondateur", mail: "hello@thesyndic.be", subject: "Suivi des demandes" },
        { initials: "EX", name: "Expertym", who: "Contact non renseigné", mail: "info@expertym.be", subject: "Suivi des baux" },
        { initials: "VI", name: "Viabilis Immo", who: "Agent immobilier", mail: "martin@viabilis.be", subject: "Documents de mise en vente" },
        { initials: "WE", name: "We Invest Ixelles", who: "Directrice d’agence", mail: "ixelles@weinvest.be", subject: "Documents de dossier" },
      ] as MailRow[],
      states: ["Contacté", "À valider", "Brouillon"],
      cardTitle: "Validation humaine",
      waiting: "en attente",
      doneLabel: "validé",
      edit: "Modifier",
      approve: "Valider l’envoi",
      approved: "✓ Validé",
    },
  },

  en: {
    brandWord: "Nexus",
    by: "by Synode · B2B prospecting",
    menus: ["Overview", "Discovery", "Leads", "Outreach", "Errors"],
    badge: "EMAIL TEST MODE",
    crumbTemplate: "Nexus workspace › {page}",

    leads: {
      kicker: "INTELLIGENCE",
      title: "Leads",
      lede: "Find the right companies. Track down the contacts that matter.",
      results: "278 results",
      cols: ["Company", "ICP", "Status"],
      rows: [
        { initials: "BU", name: "Bura Construct", where: "Construction company · Ganshoren", icp: "—", status: "Phone only" },
        { initials: "SE", name: "Setip Gcube", where: "Construction company · Ganshoren", icp: "27", status: "Low priority" },
        { initials: "N.", name: "N.M.C", where: "Contractor · Forest", icp: "16", status: "Low priority" },
        { initials: "TR", name: "Trepalla Sprl", where: "Construction company · Brussels", icp: "26", status: "Low priority" },
        { initials: "CO", name: "Construction ELPA", where: "Construction company · Etterbeek", icp: "—", status: "Phone only" },
        { initials: "CA", name: "Carlos AAK", where: "General works · Evere", icp: "24", status: "Low priority" },
      ] as LeadRow[],
      cardTitle: "AI analysis",
      synth: [
        "Construction company working in Ganshoren. No website found, so phone is the only way in.",
        "Construction work in Ganshoren. Website available, little sign of an immediate need.",
        "Self-employed contractor in Forest. Low potential need, worth revisiting later.",
        "Construction in Brussels. Public information is thin, so priority stays low.",
      ],
      tags: [
        ["Activity checked", "No website", "Phone"],
        ["Activity checked", "Website analysed", "ICP 27"],
        ["Activity checked", "Website analysed", "ICP 16"],
        ["Activity checked", "Thin sources", "ICP 26"],
      ],
    },

    discovery: {
      kicker: "EXECUTION",
      title: "Discovery",
      lede: "Run the searches and follow how they are processed.",
      manualTitle: "Manual run",
      manualText: "Processes the next jobs waiting in the queue.",
      launch: "Run now",
      running: "Processing…",
      rhythm: "3 jobs per run · every 720 min",
      queueKicker: "OPERATIONS",
      queueTitle: "Queue progress",
      jobs: "{n} / 570 jobs processed",
      counters: ["Waiting", "Running", "Done", "Failed"],
      sectorsTitle: "Sectors and municipalities",
      sectors: ["Estate agency", "Staffing agency", "Marketing agency", "Web agency"],
      sectorCount: "19/19",
    },

    overview: {
      kicker: "CONTROL",
      title: "Overview",
      lede: "Your prospecting activity, from discovery to first contact.",
      kpis: ["Total leads", "Qualified leads", "Leads contacted", "Jobs running"],
      splitTitle: "Leads by status",
      splitCount: "278 LEADS",
      splits: [
        ["New", "168"], ["Website not found", "11"], ["Analysed", "4"],
        ["Qualified", "7"], ["To review", "3"], ["In-depth review", "4"],
        ["Low priority", "31"], ["No contact found", "15"], ["Contacted", "17"],
      ] as [string, string][],
    },

    outreach: {
      kicker: "FIRST CONTACT",
      title: "Outreach",
      lede: "Messages prepared. Sending kept under control. Follow-up you can trust.",
      selected: "{n} selected",
      send: "Send selection",
      cols: ["Company", "Email", "State"],
      rows: [
        { initials: "CO", name: "Cofiges Vdm Fiduciaire", who: "Nicole Vandermeuter · Manager", mail: "contact@cofigesvdm.be", subject: "Setting up Peppol" },
        { initials: "TH", name: "The Syndic.be", who: "John de Troyer · Founder", mail: "hello@thesyndic.be", subject: "Tracking requests" },
        { initials: "EX", name: "Expertym", who: "No contact on file", mail: "info@expertym.be", subject: "Tracking leases" },
        { initials: "VI", name: "Viabilis Immo", who: "Estate agent", mail: "martin@viabilis.be", subject: "Listing documents" },
        { initials: "WE", name: "We Invest Ixelles", who: "Branch manager", mail: "ixelles@weinvest.be", subject: "Case documents" },
      ] as MailRow[],
      states: ["Contacted", "To approve", "Draft"],
      cardTitle: "Human approval",
      waiting: "waiting",
      doneLabel: "approved",
      edit: "Edit",
      approve: "Approve and send",
      approved: "✓ Approved",
    },
  },
};

export const windowsFor = (locale: Locale) => NEXUS_WINDOWS[locale === "fr" ? "fr" : "en"];
