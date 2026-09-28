import type { Locale } from "@/lib/content";

/**
 * Les huit cas d'usage, rangés en quatre territoires.
 *
 * Chaque cas suit la même structure, et elle n'est pas décorative : elle
 * force à dire ce qu'on tait d'habitude. Un `benefit` est ce qu'on cherche
 * à obtenir, jamais un résultat mesuré ; un `metric` est ce qu'on mesurera
 * AVEC le client, pas un chiffre déjà connu ; `needs` et `limit` existent
 * pour qu'un prospect puisse se disqualifier lui-même avant de nous écrire.
 *
 * ⚠ Aucun de ces cas n'a encore de démonstration. `demo` reste donc à
 * `null` partout, et l'interface affiche « exemple de solution possible »
 * plutôt qu'un lien mort. Le jour où une démo existe, on pose son slug ici
 * et la carte devient cliquable, sans toucher au composant.
 */

export const DOMAINS = ["ventes", "operations", "service-client", "outils-metier"] as const;
export type DomainSlug = (typeof DOMAINS)[number];

export type UseCase = {
  slug: string;
  domain: DomainSlug;
  title: string;
  /** La situation de départ, en langage client. */
  situation: string;
  /** Le fonctionnement en trois temps. Trois, jamais quatre. */
  steps: readonly [string, string, string];
  benefit: string;
  /** Ce qu'on mesurera ensemble. Pas un chiffre : une unité de mesure. */
  metric: string;
  needs: readonly string[];
  limit: string;
  /** Slug d'une fiche de réalisation, ou `null` tant qu'aucune n'existe. */
  demo: string | null;
};

type Domain = { slug: DomainSlug; title: string; text: string };

const frDomains: readonly Domain[] = [
  { slug: "ventes", title: "Ventes et prospection", text: "Trouver, qualifier et suivre, sans que le suivi devienne un second métier." },
  { slug: "operations", title: "Opérations et administratif", text: "Le travail qui traverse tous les outils et que personne ne revendique." },
  { slug: "service-client", title: "Service client", text: "Répondre vite, sans perdre les cas qui méritent une vraie attention." },
  { slug: "outils-metier", title: "Outils métier et connaissance interne", text: "Retrouver l’information, relier les outils, voir l’activité au même endroit." },
];

const enDomains: readonly Domain[] = [
  { slug: "ventes", title: "Sales and prospecting", text: "Finding, qualifying and following up, without follow-up becoming a second job." },
  { slug: "operations", title: "Operations and admin", text: "The work that crosses every tool and that nobody owns." },
  { slug: "service-client", title: "Customer service", text: "Answering fast, without losing the cases that deserve real attention." },
  { slug: "outils-metier", title: "Internal tools and knowledge", text: "Finding information, connecting tools, seeing the business in one place." },
];

const frCases: readonly UseCase[] = [
  {
    slug: "preparer-rendez-vous",
    domain: "ventes",
    title: "Préparer un rendez-vous prend trop de temps",
    situation:
      "Avant chaque rendez-vous, quelqu’un ouvre le CRM, relit les derniers échanges, regarde le site du prospect et rassemble le tout à la main. Une demi-heure par rendez-vous, plusieurs fois par semaine, et la qualité dépend du temps qui restait.",
    steps: [
      "Le rendez-vous est créé dans l’agenda.",
      "L’assistant rassemble ce qui existe déjà : historique, échanges, informations publiques sur l’entreprise.",
      "Une fiche de préparation arrive avant le rendez-vous, avec les sources citées.",
    ],
    benefit: "Arriver préparé sans y passer la demi-heure, et avec le même niveau de préparation pour tous les rendez-vous.",
    metric: "Le temps de préparation par rendez-vous, mesuré avant et après sur vos propres agendas.",
    needs: ["Un agenda accessible", "Un CRM ou un historique des échanges", "Une personne qui valide le format utile de la fiche"],
    limit: "La fiche vaut ce que valent vos données. Un CRM peu rempli donne une fiche peu remplie : l’assistant ne devine pas ce qui n’a jamais été écrit.",
    demo: null,
  },
  {
    slug: "qualifier-prospects",
    domain: "ventes",
    title: "Les informations commerciales sont dispersées",
    situation:
      "Une demande arrive par le site, une autre par email, une troisième par téléphone. Chacune finit dans un endroit différent, et au moment de faire le point personne ne sait vraiment combien il y a d’opportunités ouvertes.",
    steps: [
      "Une demande arrive, quel que soit son canal.",
      "L’assistant identifie l’activité, le besoin exprimé et ce qui manque pour décider.",
      "La fiche est créée dans votre outil de suivi, avec les manques signalés plutôt que devinés.",
    ],
    benefit: "Avoir une seule liste d’opportunités, alimentée automatiquement, dans laquelle on peut faire confiance.",
    metric: "La part de fiches complètes et validées par un humain, sur un échantillon que vous choisissez.",
    needs: ["Un outil de suivi commercial, même simple", "Les canaux d’entrée identifiés", "Vos critères de qualification, écrits"],
    limit: "La qualification automatique se trompe sur les cas ambigus. C’est pour ça qu’elle signale ce qui manque au lieu de combler les trous toute seule.",
    demo: null,
  },
  {
    slug: "trier-emails",
    domain: "operations",
    title: "Les emails entrants sont difficiles à trier",
    situation:
      "Une boîte partagée reçoit des demandes de nature très différente. Il faut ouvrir chaque message pour savoir de quoi il s’agit, et les urgents se retrouvent derrière les autres parce qu’on les lit dans l’ordre d’arrivée.",
    steps: [
      "Le message arrive dans la boîte partagée.",
      "L’assistant identifie le sujet, extrait les informations utiles et évalue l’urgence.",
      "Le message est classé et transmis ; les cas ambigus sont mis de côté pour une validation humaine.",
    ],
    benefit: "Traiter d’abord ce qui est urgent, et ne plus lire vingt messages pour en trouver un.",
    metric: "Le temps de traitement moyen, et le nombre d’erreurs de routage relevées sur une période convenue.",
    needs: ["Une boîte partagée accessible", "Les catégories de demandes que vous voulez distinguer", "Quelqu’un pour trancher les cas mis de côté"],
    limit: "Un message mal écrit reste un message mal écrit. Le tri automatique réduit le travail, il ne supprime pas la lecture humaine sur les cas limites.",
    demo: null,
  },
  {
    slug: "extraire-documents",
    domain: "operations",
    title: "Des données recopiées depuis des documents",
    situation:
      "Les factures, bons de commande ou formulaires arrivent en PDF. Quelqu’un les ouvre un par un et recopie les mêmes champs dans le logiciel de gestion. C’est long, et c’est là que se créent les fautes de frappe.",
    steps: [
      "Le document arrive, par email ou dans un dossier surveillé.",
      "Les champs utiles sont extraits, puis contrôlés : cohérence des montants, dates, références.",
      "Les données partent dans votre outil, et tout ce qui a échoué au contrôle attend une validation.",
    ],
    benefit: "Supprimer la ressaisie sur les documents réguliers, et détecter les incohérences avant qu’elles n’entrent dans vos comptes.",
    metric: "Le taux de données correctes sur un échantillon que vous vérifiez vous-même.",
    needs: ["Des documents de format à peu près stable", "Un outil de gestion qui accepte des données de l’extérieur", "Vos règles de contrôle"],
    limit: "Un document inhabituel ou de mauvaise qualité passe en validation humaine. C’est voulu : une extraction silencieuse qui se trompe coûte plus cher que la ressaisie.",
    demo: null,
  },
  {
    slug: "reponses-frequentes",
    domain: "service-client",
    title: "Les mêmes questions reviennent en permanence",
    situation:
      "Une part importante des messages reçus appelle une réponse qui existe déjà quelque part : dans un ancien email, dans une procédure, sur le site. On la réécrit à chaque fois, avec des formulations légèrement différentes.",
    steps: [
      "La question arrive.",
      "L’assistant cherche dans votre documentation validée et prépare une réponse, avec les sources.",
      "Votre équipe relit, ajuste si besoin, et envoie.",
    ],
    benefit: "Répondre plus vite et de façon cohérente, sans que la réponse dépende de qui était disponible.",
    metric: "Le temps de réponse, et la part de réponses envoyées sans correction.",
    needs: ["Une documentation à jour et validée", "Les canaux à couvrir", "Une relecture humaine avant envoi, au moins au début"],
    limit: "L’assistant ne répond bien que sur ce qui est documenté. Sur une question hors périmètre, il doit dire qu’il ne sait pas, et c’est ainsi qu’il est réglé.",
    demo: null,
  },
  {
    slug: "orienter-demandes",
    domain: "service-client",
    title: "Les demandes arrivent chez la mauvaise personne",
    situation:
      "Un message part chez quelqu’un qui n’est pas concerné, qui le transfère, parfois deux fois. Le client attend pendant ce temps, et personne ne sait à quel moment sa demande a réellement commencé à être traitée.",
    steps: [
      "La demande arrive.",
      "L’assistant identifie le sujet réel et le rapproche de votre organisation interne.",
      "Elle est transmise au bon interlocuteur, avec un résumé de ce qui est demandé.",
    ],
    benefit: "Réduire les allers-retours internes, et pouvoir dire quand une demande a été prise en charge.",
    metric: "Le délai d’affectation, et le nombre de réaffectations sur une période convenue.",
    needs: ["Une organisation interne claire", "Les canaux d’entrée identifiés", "Un interlocuteur par sujet"],
    limit: "Si l’organisation interne est floue, l’orientation automatique le sera aussi. Cette étape révèle souvent un problème d’organisation avant d’être un problème d’outil.",
    demo: null,
  },
  {
    slug: "recherche-documents",
    domain: "outils-metier",
    title: "Chercher dans les documents internes prend trop longtemps",
    situation:
      "La réponse existe : dans une procédure, un compte rendu, un contrat. Mais il faut savoir où chercher, et souvent demander à la personne qui s’en souvient. Quand elle est absente, on refait le travail.",
    steps: [
      "La question est posée en langage courant.",
      "L’assistant cherche dans les documents auxquels la personne a droit.",
      "Il répond avec les extraits et les sources, ou dit qu’il n’a pas trouvé.",
    ],
    benefit: "Rendre la connaissance interne utilisable sans dépendre de la mémoire d’une personne.",
    metric: "La part de réponses jugées utiles et correctement sourcées, sur une liste de questions réelles que vous fournissez.",
    needs: ["Des documents accessibles et à jour", "Des droits d’accès définis", "Une liste de questions réelles pour régler le système"],
    limit: "Une documentation contradictoire produit des réponses contradictoires. L’assistant cite ses sources justement pour que ce soit visible plutôt que masqué.",
    demo: null,
  },
  {
    slug: "vue-commune",
    domain: "outils-metier",
    title: "Plusieurs outils, aucune vue commune",
    situation:
      "Les devis sont dans un outil, les projets dans un autre, la facturation ailleurs. Pour savoir où en est un dossier, il faut ouvrir trois écrans et faire le rapprochement de tête.",
    steps: [
      "Les outils existants sont connectés, sans être remplacés.",
      "Une interface rassemble ce qui concerne un même dossier.",
      "Une synthèse signale ce qui attend une décision ou ce qui a dérivé.",
    ],
    benefit: "Voir l’état réel de l’activité au même endroit, sans recopier d’un outil à l’autre.",
    metric: "Le nombre de doubles saisies supprimées, et le temps passé à consolider l’information.",
    needs: ["Des outils qui exposent leurs données", "Un dossier pivot identifié : client, projet, commande", "Les personnes qui utiliseront l’interface"],
    limit: "Certains logiciels n’exposent rien. C’est vérifié avant le devis, et si le verrou ne peut pas être levé nous le disons plutôt que de contourner.",
    demo: null,
  },
];

const enCases: readonly UseCase[] = [
  {
    slug: "preparer-rendez-vous",
    domain: "ventes",
    title: "Preparing for a meeting takes too long",
    situation:
      "Before every meeting, somebody opens the CRM, rereads the last exchanges, looks at the prospect’s website and pulls it together by hand. Half an hour a meeting, several times a week, and the quality depends on how much time was left.",
    steps: [
      "The meeting is created in the calendar.",
      "The assistant gathers what already exists: history, past exchanges, public information about the company.",
      "A prep sheet arrives before the meeting, with its sources cited.",
    ],
    benefit: "Turning up prepared without spending the half hour, and with the same preparation for every meeting rather than the important ones only.",
    metric: "Preparation time per meeting, measured before and after on your own calendars.",
    needs: ["A calendar we can read", "A CRM or a history of exchanges", "Someone to say what makes a prep sheet useful"],
    limit: "The sheet is only as good as your data. A thin CRM gives a thin sheet: the assistant does not invent what was never written down.",
    demo: null,
  },
  {
    slug: "qualifier-prospects",
    domain: "ventes",
    title: "Sales information is scattered",
    situation:
      "One enquiry arrives through the website, another by email, a third by phone. Each ends up somewhere different, and when it is time to review the pipeline nobody really knows how many open opportunities there are.",
    steps: [
      "An enquiry arrives, whatever the channel.",
      "The assistant identifies the business, the stated need and what is missing to decide.",
      "The record is created in your tracker, with the gaps flagged rather than guessed.",
    ],
    benefit: "One list of opportunities, filled automatically, that you can actually trust.",
    metric: "The share of records that are complete and human-approved, on a sample you pick.",
    needs: ["A sales tracker, even a simple one", "The incoming channels identified", "Your qualification criteria, written down"],
    limit: "Automatic qualification gets ambiguous cases wrong. That is why it flags what is missing instead of filling the gaps on its own.",
    demo: null,
  },
  {
    slug: "trier-emails",
    domain: "operations",
    title: "Incoming email is hard to sort",
    situation:
      "A shared inbox receives requests of very different kinds. You have to open each message to know what it is about, and the urgent ones end up behind the rest because people read in the order they arrived.",
    steps: [
      "The message lands in the shared inbox.",
      "The assistant identifies the subject, pulls out the useful details and judges urgency.",
      "The message is filed and routed; ambiguous cases are set aside for a person to decide.",
    ],
    benefit: "Handling what is urgent first, and no longer reading twenty messages to find one.",
    metric: "Average handling time, and the number of routing errors counted over an agreed period.",
    needs: ["A shared inbox we can access", "The categories you want to tell apart", "Someone to settle the cases set aside"],
    limit: "A badly written message is still a badly written message. Sorting reduces the work; it does not remove human reading on edge cases.",
    demo: null,
  },
  {
    slug: "extraire-documents",
    domain: "operations",
    title: "Data retyped from documents",
    situation:
      "Invoices, purchase orders and forms arrive as PDFs. Somebody opens them one by one and retypes the same fields into the management system. It is slow, and it is where the typos come from.",
    steps: [
      "The document arrives, by email or in a watched folder.",
      "The useful fields are extracted, then checked: totals, dates, references.",
      "The data goes into your system, and anything that failed a check waits for approval.",
    ],
    benefit: "Removing retyping on regular documents, and catching inconsistencies before they reach your accounts.",
    metric: "The share of correct data on a sample you check yourself.",
    needs: ["Documents in a reasonably stable format", "A system that accepts data from outside", "Your checking rules"],
    limit: "An unusual or poor-quality document goes to a person. That is deliberate: a silent extraction that gets it wrong costs more than retyping.",
    demo: null,
  },
  {
    slug: "reponses-frequentes",
    domain: "service-client",
    title: "The same questions keep coming back",
    situation:
      "A good share of incoming messages have an answer that already exists somewhere: in an old email, a procedure, the website. It gets rewritten every time, worded slightly differently each time.",
    steps: [
      "The question arrives.",
      "The assistant searches your approved documentation and drafts a reply, with sources.",
      "Your team reads it, adjusts if needed, and sends.",
    ],
    benefit: "Replying faster and more consistently, without the answer depending on who happened to be free.",
    metric: "Response time, and the share of replies sent without edits.",
    needs: ["Documentation that is current and approved", "The channels to cover", "A human read before sending, at least at first"],
    limit: "The assistant only answers well on what is documented. On anything outside that, it has to say it does not know, and that is how it is set up.",
    demo: null,
  },
  {
    slug: "orienter-demandes",
    domain: "service-client",
    title: "Requests reach the wrong person",
    situation:
      "A message goes to somebody it does not concern, who forwards it, sometimes twice. The customer waits through all of it, and nobody can say when their request actually started being handled.",
    steps: [
      "The request arrives.",
      "The assistant works out the real subject and matches it to how you are organised.",
      "It goes to the right person, with a summary of what is being asked.",
    ],
    benefit: "Fewer internal hand-offs, and being able to say when a request was picked up.",
    metric: "Time to assignment, and the number of reassignments over an agreed period.",
    needs: ["A clear internal structure", "The incoming channels identified", "One owner per subject"],
    limit: "If the internal structure is vague, the routing will be too. This step often exposes an organisational problem before it is a tooling problem.",
    demo: null,
  },
  {
    slug: "recherche-documents",
    domain: "outils-metier",
    title: "Searching internal documents takes too long",
    situation:
      "The answer exists: in a procedure, a meeting note, a contract. But you have to know where to look, and often ask the person who remembers. When they are away, the work gets redone.",
    steps: [
      "The question is asked in plain language.",
      "The assistant searches the documents that person is allowed to see.",
      "It answers with extracts and sources, or says it did not find anything.",
    ],
    benefit: "Making internal knowledge usable without depending on one person’s memory.",
    metric: "The share of answers judged useful and correctly sourced, against a list of real questions you supply.",
    needs: ["Documents that are accessible and current", "Access rights defined", "A list of real questions to tune the system"],
    limit: "Contradictory documentation produces contradictory answers. The assistant cites its sources precisely so that this is visible rather than hidden.",
    demo: null,
  },
  {
    slug: "vue-commune",
    domain: "outils-metier",
    title: "Several tools, no shared view",
    situation:
      "Quotes live in one tool, projects in another, invoicing somewhere else. To know where a file stands you open three screens and do the matching in your head.",
    steps: [
      "The existing tools are connected, not replaced.",
      "One interface brings together everything about the same file.",
      "A summary flags what is waiting on a decision or what has drifted.",
    ],
    benefit: "Seeing the real state of the business in one place, without copying between tools.",
    metric: "The number of double entries removed, and the time spent consolidating information.",
    needs: ["Tools that expose their data", "One pivot record identified: client, project or order", "The people who will use the interface"],
    limit: "Some software exposes nothing. We check that before quoting, and if the lock cannot be opened we say so rather than working around it.",
    demo: null,
  },
];

export function domains(locale: Locale) {
  return locale === "fr" ? frDomains : enDomains;
}

export function listCases(locale: Locale) {
  return locale === "fr" ? frCases : enCases;
}

export function findUseCase(locale: Locale, slug: string) {
  return listCases(locale).find((c) => c.slug === slug);
}

export function casesOfDomain(locale: Locale, domain: DomainSlug) {
  return listCases(locale).filter((c) => c.domain === domain);
}

/**
 * Vérifie que les deux langues décrivent le même catalogue et que chaque cas
 * est rangé dans un territoire connu. Appelée au build depuis le sitemap :
 * un slug ajouté d'un seul côté casse la compilation au lieu de produire une
 * page anglaise vide.
 */
export function assertUseCases() {
  const frSlugs = frCases.map((c) => c.slug);
  const enSlugs = enCases.map((c) => c.slug);
  if (frSlugs.join("|") !== enSlugs.join("|")) {
    throw new Error("Cas d’usage : les deux langues ne décrivent pas la même liste, ou pas dans le même ordre.");
  }
  if (new Set(frSlugs).size !== frSlugs.length) {
    throw new Error("Cas d’usage : deux cas portent le même slug.");
  }
  for (const c of [...frCases, ...enCases]) {
    if (!DOMAINS.includes(c.domain)) {
      throw new Error(`Cas d’usage : « ${c.slug} » est rangé dans un territoire inconnu (${c.domain}).`);
    }
  }
}
