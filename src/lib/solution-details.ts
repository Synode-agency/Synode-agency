import { getContent, type Locale } from "@/content";

/* Seuls les champs que les pages lisent : six autres (public, possibilités,
   scénario, exemples, prérequis, intégration), jamais affichés, ont été
   retirés le 23/11/2026 (C64 de l'audit). */
export type SolutionDetail = {
  /** ⚠ CE N'EST PAS UNE DÉFINITION, et il ne faut pas en remettre une ici.
   *  C'est le paragraphe du HERO, et il dit ce que le service APPORTE. La
   *  définition du service vit dans `whatText` de `service-pages.ts`, sous
   *  le titre « Qu'est-ce que… », avec son visuel. Les deux champs ont
   *  longtemps défini la même chose en d'autres mots, et la page le disait
   *  donc deux fois à deux écrans d'intervalle. */
  heroLead: string;
  related: number[];
  faq: { q: string; a: string }[];
};

const fr: SolutionDetail[] = [
  {
    heroLead: "Vos équipes passent moins de temps à chercher l’information et à préparer les réponses. Un agent IA travaille dans vos outils, dans un périmètre que vous définissez, et vous gardez la main sur ce qui compte.",
    related: [2, 1],
    faq: [{ q: "L’agent agit-il sans nous demander ?", a: "C’est vous qui décidez. Soit chaque action de l’agent attend votre accord, soit seulement les actions sensibles : les actions de routine sont alors autorisées une à une, par écrit, dans le périmètre convenu." }, { q: "Peut-il répondre uniquement à partir de nos documents ?", a: "Nous pouvons limiter les sources consultées et afficher les références. Cela ne supprime pas le risque d’erreur : nous prévoyons des tests, une réponse d’incertitude et une relecture adaptée au contexte." }],
  },
  {
    heroLead: "L’intégration de vos logiciels évite la double saisie et maintient vos données à jour entre votre CRM, votre ERP, votre site web, vos API et vos bases de données. Chaque système connecté conserve un rôle clair, avec une source de référence définie.",
    related: [2, 4],
    faq: [{ q: "Tous les logiciels peuvent-ils être connectés ?", a: "Non. Certains n’offrent pas d’accès adapté ou imposent un abonnement et des limites. Nous vérifions ces possibilités avant de confirmer le périmètre." }, { q: "Les données seront-elles toujours synchronisées en temps réel ?", a: "Pas nécessairement. La fréquence dépend du besoin et des capacités des outils. Elle est définie avec les règles de reprise en cas d’interruption." }],
  },
  {
    heroLead: "L’automatisation des processus métier réduit les tâches répétitives qui mobilisent vos équipes. Les demandes, documents et validations circulent automatiquement entre vos logiciels selon vos propres règles, tandis que les cas ambigus restent soumis à un contrôle humain.",
    related: [1, 0],
    faq: [{ q: "Faut-il mettre de l’IA à chaque étape ?", a: "Non. Une règle déterministe est souvent préférable pour un calcul ou un transfert. L’IA est utilisée là où comprendre ou classer une information apporte une utilité vérifiable." }, { q: "Que se passe-t-il si une étape échoue ?", a: "Nous définissons les notifications, les possibilités de reprise et les contrôles contre les doublons. Le suivi et les interventions incluses sont précisés au contrat." }],
  },
  {
    heroLead: "Un logiciel métier sur mesure adapte les écrans, les droits et les fonctionnalités aux processus réels de votre entreprise. Vos équipes travaillent dans une application conçue pour leurs besoins, avec des fonctions d’intelligence artificielle uniquement là où elles apportent un gain concret.",
    related: [1, 0],
    faq: [{ q: "Faut-il remplacer tous nos logiciels ?", a: "Non. Nous vérifions d’abord ce qui peut être conservé ou connecté. Le sur-mesure intervient sur les parcours qui justifient réellement un développement." }, { q: "Pouvez-vous construire une fonction pour nos clients ?", a: "Oui, selon la faisabilité. Cela demande de cadrer aussi les droits d’accès, les volumes, les coûts d’usage, le support et les responsabilités envers les utilisateurs finaux." }],
  },
  {
    heroLead: "L’analyse de données et les tableaux de bord transforment vos informations dispersées en indicateurs fiables pour piloter votre entreprise. Vos données sont centralisées, contrôlées et rendues lisibles, sans jamais présenter une prévision comme un chiffre réellement constaté.",
    related: [1, 3],
    faq: [{ q: "Peut-on prévoir avec peu de données ?", a: "Pas toujours de manière utile. Nous examinons le volume, la qualité et la représentativité. Un tableau de bord fiable ou une meilleure collecte peut être la première étape recommandée." }, { q: "Un score prend-il la décision à notre place ?", a: "Non par défaut. Son rôle, ses critères et ses limites doivent être compris. Il peut aider à prioriser une revue humaine ; tout usage plus engageant demande un cadrage spécifique." }],
  },
  {
    heroLead: "Une formation IA adaptée à votre entreprise aide vos équipes à choisir les bons usages, vérifier les réponses et protéger les informations sensibles. Les exercices partent de situations métier réelles afin d’installer des pratiques utiles et durables.",
    related: [0, 3],
    faq: [{ q: "Faut-il acheter une solution Synode pour se former ?", a: "Non. Les ateliers peuvent porter sur les usages généraux de l’IA et les outils autorisés dans votre entreprise, indépendamment d’un développement." }, { q: "Le contenu est-il le même pour toutes les équipes ?", a: "Nous adaptons les exercices, le vocabulaire et la progression aux participants. Les objectifs, la durée et les supports inclus sont précisés dans la proposition." }],
  },
];

const en: SolutionDetail[] = [
  {
    heroLead: "Your teams spend less time looking for information and drafting replies. An AI agent works inside your tools, within a scope you define, and you keep control of what matters.",
    related: [2, 1],
    faq: [{ q: "Does an agent act without asking us?", a: "You decide. Either every action the agent takes waits for your approval, or only sensitive ones do: routine actions are then authorised one by one, in writing, within the agreed scope." }, { q: "Can it answer only from our documents?", a: "We can restrict the sources and show references. This does not eliminate errors: testing, uncertainty responses and appropriate review remain necessary." }],
  },
  {
    heroLead: "Software integration eliminates duplicate entry and keeps data up to date across your CRM, ERP, website, APIs and databases. Each connected system retains a clear role, with an agreed source of record.",
    related: [2, 4],
    faq: [{ q: "Can every system be connected?", a: "No. Some offer no suitable access or require a subscription with limits. We check these conditions before confirming scope." }, { q: "Will data always synchronise in real time?", a: "Not necessarily. Frequency depends on the need and the tools’ capabilities. It is defined alongside recovery rules for interruptions." }],
  },
  {
    heroLead: "Business process automation reduces the repetitive tasks that take up your teams' time. Requests, documents and approvals move automatically between your software according to your own rules, while ambiguous cases remain subject to human review.",
    related: [1, 0],
    faq: [{ q: "Does every step need AI?", a: "No. A deterministic rule is often preferable for a calculation or transfer. AI is used where understanding or classifying information provides verifiable value." }, { q: "What happens if a step fails?", a: "We define notifications, retry options and duplicate checks. Monitoring and included interventions are specified in the contract." }],
  },
  {
    heroLead: "Custom business software adapts its screens, access rights and features to your company’s actual processes. Your teams work in an application designed for their needs, with artificial intelligence only where it delivers a concrete benefit.",
    related: [1, 0],
    faq: [{ q: "Do we need to replace all our software?", a: "No. We first check what can be retained or connected. Custom development focuses on workflows that justify it." }, { q: "Can you build a feature for our customers?", a: "Yes, subject to feasibility. We also need to define access rights, volumes, usage costs, support and responsibilities towards end users." }],
  },
  {
    heroLead: "Data analysis and dashboards turn scattered information into reliable indicators for managing your business. Your data is centralised, checked and made readable, while forecasts are always distinguished from recorded figures.",
    related: [1, 3],
    faq: [{ q: "Can we forecast with little data?", a: "Not always usefully. We examine volume, quality and representativeness. A reliable dashboard or improved collection may be the recommended first step." }, { q: "Does a score decide for us?", a: "Not by default. Its role, criteria and limits must be understood. It can prioritise human review; more consequential uses need specific scoping." }],
  },
  {
    heroLead: "AI training tailored to your business helps teams choose the right use cases, verify answers and protect sensitive information. Exercises use real work situations to build useful and lasting practices.",
    related: [0, 3],
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
    q: "Y a-t-il des coûts récurrents après la mise en service ?",
    a: "Oui, dès que votre solution s’appuie sur des services payants (modèles d’IA, hébergement, plateformes d’automatisation, connexions aux logiciels), qui fonctionnent par abonnement tant qu’elle tourne. Ces coûts ne sont jamais absorbés par Synode. Vous choisissez : soit vous nous confiez le suivi et la maintenance, et nous assurons l’exploitation, le monitoring et la maintenance contre un paiement récurrent défini au contrat ; soit vous ne nous les confiez pas, la solution est livrée et déployée, et vous souscrivez puis payez ces services directement auprès des fournisseurs. Dans les deux cas, les montants sont estimés avant le démarrage.",
  },
  en: {
    q: "Are there recurring costs after go-live?",
    a: "Yes, whenever your solution relies on paid services (AI models, hosting, automation platforms, software connections), billed by subscription for as long as it runs. Synode never absorbs these costs. You choose: either you entrust support and maintenance to us and we handle running, monitoring and maintenance for a recurring payment set out in the contract; or you do not, and the solution is delivered and deployed, and you subscribe to and pay those services directly with the providers. In both cases the amounts are estimated before work starts.",
  },
} as const;

export function solutionFamilies(locale: Locale) {
  const details = locale === "fr" ? fr : en;
  const recurring = RECURRING_FAQ[locale];
  return getContent(locale).solutions.bricks.map((summary, index) => ({
    ...summary,
    /* Pas de question « coûts récurrents » sur la Formation : une formation
       n'a ni hébergement, ni modèle, ni plateforme qui tourne après elle. */
    detail: {
      ...details[index],
      faq: summary.slug === "formation-adoption-ia" ? details[index].faq : [...details[index].faq, recurring],
    },
  }));
}
export function findSolution(locale: Locale, slug: string) {
  return solutionFamilies(locale).find(family => family.slug === slug);
}
