import type { Locale } from "@/lib/content";

/**
 * Legal pages.
 *
 * These are a working skeleton covering what a Belgian B2B agency site with a
 * contact form needs: company identification, GDPR privacy notice, cookies,
 * and general terms. Anything that depends on real company data is marked
 * `TODO` in the copy so it is impossible to ship by accident.
 *
 * This is not legal advice — have it reviewed before going live.
 */

export interface LegalSection {
  heading: string;
  body: readonly string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: readonly LegalSection[];
}

/** Slugs are shared across locales so the FR/EN switch stays on the same page. */
export const legalSlugs = [
  "mentions-legales",
  "confidentialite",
  "cookies",
  "conditions",
] as const;

export type LegalSlug = (typeof legalSlugs)[number];

const UPDATED = "18 septembre 2026";
const UPDATED_EN = "18 September 2026";

const fr: Record<LegalSlug, LegalDoc> = {
  "mentions-legales": {
    slug: "mentions-legales",
    title: "Mentions légales",
    updated: UPDATED,
    intro:
      "Informations légales relatives à l'éditeur du site et aux conditions de son utilisation.",
    sections: [
      {
        heading: "Éditeur du site",
        body: [
          "Synode — TODO : forme juridique (SRL, société simple, indépendant…).",
          "Siège : TODO : adresse complète, Bruxelles, Belgique.",
          "Numéro d'entreprise (BCE) : TODO.",
          "Numéro de TVA : TODO.",
          "E-mail : contact@synode-agency.com",
        ],
      },
      {
        heading: "Responsable de la publication",
        body: ["TODO : nom du responsable de la publication."],
      },
      {
        heading: "Hébergement",
        body: [
          "Le site est hébergé par TODO : nom de l'hébergeur, adresse et pays d'hébergement.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        body: [
          "L'ensemble des contenus présents sur ce site (textes, visuels, logo, code, maquettes et démonstrateurs) est protégé par le droit d'auteur et reste la propriété de Synode ou de ses partenaires, sauf mention contraire.",
          "Toute reproduction, représentation ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.",
          "Les marques et logos de tiers cités à titre d'illustration restent la propriété de leurs titulaires respectifs.",
        ],
      },
      {
        heading: "Responsabilité",
        body: [
          "Les informations publiées sur ce site sont fournies à titre indicatif. Synode s'efforce de les tenir exactes et à jour, sans garantir qu'elles soient exemptes d'erreur ou d'omission.",
          "Les démonstrateurs présentés dans la section Réalisations fonctionnent sur des jeux de données de test et illustrent des capacités techniques ; ils ne constituent pas un engagement de résultat.",
          "Synode ne saurait être tenue responsable des dommages résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.",
        ],
      },
      {
        heading: "Liens externes",
        body: [
          "Ce site peut contenir des liens vers des sites tiers. Synode n'exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.",
        ],
      },
      {
        heading: "Droit applicable",
        body: [
          "Le présent site est soumis au droit belge. Tout litige relève de la compétence des tribunaux de l'arrondissement judiciaire de Bruxelles.",
        ],
      },
    ],
  },

  confidentialite: {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    updated: UPDATED,
    intro:
      "Comment nous traitons les données personnelles que vous nous transmettez, conformément au Règlement général sur la protection des données (RGPD).",
    sections: [
      {
        heading: "Responsable du traitement",
        body: [
          "Synode — TODO : forme juridique, adresse du siège, numéro d'entreprise.",
          "Pour toute question relative à vos données : contact@synode-agency.com",
        ],
      },
      {
        heading: "Données collectées",
        body: [
          "Via le formulaire de contact : nom, société (facultatif), adresse e-mail professionnelle, offre concernée, budget envisagé, délai souhaité et la description du besoin que vous rédigez.",
          "Via les échanges qui suivent : les informations que vous nous communiquez spontanément par e-mail ou pendant l'audit.",
          "Nous ne collectons aucune donnée sensible au sens de l'article 9 du RGPD et ne vous en demandons jamais.",
        ],
      },
      {
        heading: "Finalités et bases légales",
        body: [
          "Répondre à votre demande et préparer l'audit : exécution de mesures précontractuelles à votre demande (art. 6.1.b).",
          "Assurer le suivi de la relation commerciale et contractuelle : exécution du contrat (art. 6.1.b).",
          "Répondre à nos obligations légales, notamment comptables : obligation légale (art. 6.1.c).",
          "Nous n'utilisons pas vos données pour de la prospection non sollicitée.",
        ],
      },
      {
        heading: "Durée de conservation",
        body: [
          "Demandes n'ayant pas donné suite : 12 mois à compter du dernier échange, puis suppression.",
          "Clients : durée de la relation contractuelle, puis la durée de conservation légale applicable aux pièces comptables (10 ans en Belgique).",
        ],
      },
      {
        heading: "Destinataires",
        body: [
          "Vos données sont accessibles aux seuls membres de Synode qui en ont besoin pour traiter votre demande.",
          "Elles peuvent être traitées par nos sous-traitants techniques : TODO : lister l'hébergeur, le service d'envoi d'e-mails et, le cas échéant, le CRM utilisé.",
          "Aucune donnée n'est vendue ni cédée à des tiers à des fins commerciales.",
        ],
      },
      {
        heading: "Transferts hors Union européenne",
        body: [
          "TODO : à compléter une fois les prestataires choisis. Si un prestataire traite des données hors UE, préciser le mécanisme de transfert (décision d'adéquation ou clauses contractuelles types).",
        ],
      },
      {
        heading: "Vos droits",
        body: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition au traitement, ainsi que d'un droit à la portabilité de vos données.",
          "Pour les exercer, écrivez à contact@synode-agency.com. Nous répondons dans un délai d'un mois.",
          "Vous pouvez introduire une réclamation auprès de l'Autorité de protection des données (Rue de la Presse 35, 1000 Bruxelles — autoriteprotectiondonnees.be).",
        ],
      },
      {
        heading: "Sécurité",
        body: [
          "Le site est servi en HTTPS. L'accès aux demandes reçues est restreint aux personnes habilitées et protégé par authentification.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Politique cookies",
    updated: UPDATED,
    intro:
      "Quels traceurs sont déposés lors de votre visite, et comment les contrôler.",
    sections: [
      {
        heading: "État actuel",
        body: [
          "Ce site ne dépose aucun cookie publicitaire ni aucun traceur de mesure d'audience.",
          "Seuls les cookies strictement nécessaires au fonctionnement et à la sécurité du site peuvent être utilisés. Ils sont dispensés de consentement au titre de l'article 129 de la loi belge du 13 juin 2005.",
        ],
      },
      {
        heading: "Cookies strictement nécessaires",
        body: [
          "Ils assurent l'affichage correct des pages, la sécurité de la navigation et, le cas échéant, la protection du formulaire contre les envois automatisés.",
          "Ils ne servent ni à vous identifier, ni à vous suivre d'un site à l'autre.",
        ],
      },
      {
        heading: "En cas d'évolution",
        body: [
          "TODO : si un outil de mesure d'audience ou de marketing est ajouté (analytics, pixel, chat, vidéo intégrée), il faudra mettre en place une bannière de consentement préalable et compléter cette page avec le nom de chaque traceur, sa finalité et sa durée de vie.",
        ],
      },
      {
        heading: "Contrôler les cookies",
        body: [
          "Vous pouvez à tout moment supprimer les cookies déjà déposés et bloquer les prochains depuis les réglages de votre navigateur.",
          "Bloquer les cookies strictement nécessaires peut dégrader le fonctionnement du site.",
        ],
      },
    ],
  },

  conditions: {
    slug: "conditions",
    title: "Conditions générales",
    updated: UPDATED,
    intro:
      "Cadre général de nos prestations d'automatisation, d'agents IA et de développement sur mesure.",
    sections: [
      {
        heading: "Champ d'application",
        body: [
          "Les présentes conditions s'appliquent à toute prestation fournie par Synode, sauf conditions particulières convenues par écrit dans une offre signée, qui priment en cas de divergence.",
          "Nos prestations s'adressent à des professionnels. Elles ne relèvent pas du droit de la consommation.",
        ],
      },
      {
        heading: "Devis et périmètre",
        body: [
          "L'audit initial d'une heure est gratuit et sans engagement.",
          "Toute mission fait l'objet d'une offre écrite précisant le périmètre, les livrables, le calendrier et le prix. Le prix est fixe pour le périmètre décrit.",
          "Toute demande hors périmètre fait l'objet d'un avenant chiffré avant exécution.",
        ],
      },
      {
        heading: "Obligations du client",
        body: [
          "Le client fournit en temps utile les accès, données et interlocuteurs nécessaires à la mission.",
          "Le client est responsable de la licéité des données qu'il nous confie et des droits qu'il détient sur celles-ci.",
        ],
      },
      {
        heading: "Propriété du code et des données",
        body: [
          "À complet paiement, le code produit spécifiquement pour la mission est cédé au client.",
          "Les données du client restent sa propriété exclusive. Elles lui sont restituées sur demande et supprimées de nos environnements à l'issue de la mission.",
          "Synode conserve la propriété de ses outils, briques réutilisables et savoir-faire antérieurs, et concède au client une licence d'utilisation pour l'usage prévu.",
        ],
      },
      {
        heading: "Recours à l'intelligence artificielle",
        body: [
          "Certaines prestations s'appuient sur des modèles de langage fournis par des tiers. Le choix du fournisseur et le traitement des données associées sont précisés dans l'offre.",
          "Les systèmes livrés peuvent produire des résultats erronés. Les points de validation humaine nécessaires sont définis avec le client et documentés à la livraison.",
        ],
      },
      {
        heading: "Facturation et paiement",
        body: [
          "TODO : préciser l'échéancier (acompte, jalons, solde) et le délai de paiement retenu.",
          "En cas de retard de paiement, un intérêt au taux légal applicable aux transactions commerciales est dû de plein droit, conformément à la loi du 2 août 2002.",
        ],
      },
      {
        heading: "Responsabilité",
        body: [
          "Synode est tenue à une obligation de moyens. Sa responsabilité est limitée au montant effectivement payé au titre de la mission concernée.",
          "Synode ne répond pas des dommages indirects, notamment perte de chiffre d'affaires, de données ou de clientèle.",
        ],
      },
      {
        heading: "Confidentialité",
        body: [
          "Chaque partie s'engage à ne pas divulguer les informations confidentielles de l'autre, pendant la mission et pendant trois ans après son terme.",
        ],
      },
      {
        heading: "Droit applicable",
        body: [
          "Droit belge. Tout litige relève de la compétence exclusive des tribunaux de l'arrondissement judiciaire de Bruxelles.",
        ],
      },
    ],
  },
};

const en: Record<LegalSlug, LegalDoc> = {
  "mentions-legales": {
    slug: "mentions-legales",
    title: "Legal notice",
    updated: UPDATED_EN,
    intro:
      "Legal information about the site's publisher and the terms under which it is made available.",
    sections: [
      {
        heading: "Publisher",
        body: [
          "Synode — TODO: legal form (SRL, partnership, sole trader…).",
          "Registered office: TODO: full address, Brussels, Belgium.",
          "Company number (BCE/KBO): TODO.",
          "VAT number: TODO.",
          "E-mail: contact@synode-agency.com",
        ],
      },
      {
        heading: "Editorial responsibility",
        body: ["TODO: name of the person responsible for publication."],
      },
      {
        heading: "Hosting",
        body: ["This site is hosted by TODO: host name, address and country."],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this site (copy, visuals, logo, code, mockups and demonstrators) is protected by copyright and remains the property of Synode or its partners unless stated otherwise.",
          "Reproduction, display or reuse, in whole or in part, without prior written permission is prohibited.",
          "Third-party trademarks and logos shown for illustration remain the property of their respective owners.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Information on this site is provided for guidance. Synode works to keep it accurate and current but does not warrant it free of error or omission.",
          "The demonstrators shown under Work run on test data and illustrate technical capability; they are not a guarantee of results.",
          "Synode is not liable for damage arising from use of this site or from being unable to reach it.",
        ],
      },
      {
        heading: "External links",
        body: [
          "This site may link to third-party sites. Synode has no control over their content and accepts no responsibility for it.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "This site is governed by Belgian law. Any dispute falls under the jurisdiction of the courts of the Brussels judicial district.",
        ],
      },
    ],
  },

  confidentialite: {
    slug: "confidentialite",
    title: "Privacy policy",
    updated: UPDATED_EN,
    intro:
      "How we handle the personal data you send us, under the General Data Protection Regulation (GDPR).",
    sections: [
      {
        heading: "Data controller",
        body: [
          "Synode — TODO: legal form, registered office, company number.",
          "For any question about your data: contact@synode-agency.com",
        ],
      },
      {
        heading: "Data we collect",
        body: [
          "Through the contact form: name, company (optional), work e-mail, which offer you are interested in, budget, timeline and the description of your need.",
          "Through the exchanges that follow: whatever you choose to share by e-mail or during the audit.",
          "We collect no special category data under Article 9 GDPR and never ask for any.",
        ],
      },
      {
        heading: "Purposes and legal bases",
        body: [
          "Answering your request and preparing the audit: steps taken at your request prior to entering a contract (Art. 6(1)(b)).",
          "Managing the commercial and contractual relationship: performance of a contract (Art. 6(1)(b)).",
          "Meeting our legal obligations, accounting in particular: legal obligation (Art. 6(1)(c)).",
          "We do not use your data for unsolicited marketing.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "Requests that lead nowhere: 12 months from the last exchange, then deleted.",
          "Clients: for the duration of the contract, then the statutory retention period for accounting records (10 years in Belgium).",
        ],
      },
      {
        heading: "Recipients",
        body: [
          "Your data is accessible only to the people at Synode who need it to handle your request.",
          "It may be processed by our technical sub-processors: TODO: list the host, the e-mail sending service and, where applicable, the CRM in use.",
          "No data is sold or passed to third parties for commercial purposes.",
        ],
      },
      {
        heading: "Transfers outside the EU",
        body: [
          "TODO: to complete once providers are chosen. If a provider processes data outside the EU, state the transfer mechanism (adequacy decision or standard contractual clauses).",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You have the right to access, rectify, erase, restrict and object to processing, and the right to data portability.",
          "To exercise them, write to contact@synode-agency.com. We reply within one month.",
          "You may lodge a complaint with the Belgian Data Protection Authority (Rue de la Presse 35, 1000 Brussels — autoriteprotectiondonnees.be).",
        ],
      },
      {
        heading: "Security",
        body: [
          "The site is served over HTTPS. Access to incoming requests is restricted to authorised people and protected by authentication.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookie policy",
    updated: UPDATED_EN,
    intro: "Which trackers your visit sets, and how to control them.",
    sections: [
      {
        heading: "Where things stand",
        body: [
          "This site sets no advertising cookies and no analytics trackers.",
          "Only cookies strictly necessary to run and secure the site may be used. These are exempt from consent under Article 129 of the Belgian Act of 13 June 2005.",
        ],
      },
      {
        heading: "Strictly necessary cookies",
        body: [
          "They make pages render correctly, keep browsing secure and, where needed, protect the form against automated submissions.",
          "They do not identify you and do not follow you across sites.",
        ],
      },
      {
        heading: "If this changes",
        body: [
          "TODO: if an analytics or marketing tool is added (analytics, pixel, chat, embedded video), a prior consent banner becomes mandatory and this page must list each tracker, its purpose and its lifetime.",
        ],
      },
      {
        heading: "Controlling cookies",
        body: [
          "You can delete cookies already set and block new ones at any time from your browser settings.",
          "Blocking strictly necessary cookies may degrade how the site works.",
        ],
      },
    ],
  },

  conditions: {
    slug: "conditions",
    title: "Terms and conditions",
    updated: UPDATED_EN,
    intro:
      "The general framework for our automation, AI agent and custom development work.",
    sections: [
      {
        heading: "Scope",
        body: [
          "These terms apply to all work carried out by Synode, unless specific terms are agreed in writing in a signed proposal, which prevail in case of conflict.",
          "Our services are aimed at professionals and do not fall under consumer law.",
        ],
      },
      {
        heading: "Quotes and scope of work",
        body: [
          "The initial one-hour audit is free and carries no obligation.",
          "Every engagement is covered by a written proposal setting out scope, deliverables, schedule and price. The price is fixed for the scope described.",
          "Anything outside that scope is quoted as an addendum before work starts.",
        ],
      },
      {
        heading: "Client obligations",
        body: [
          "The client provides the access, data and contacts needed for the work, in good time.",
          "The client is responsible for the lawfulness of the data it entrusts to us and for holding the necessary rights over it.",
        ],
      },
      {
        heading: "Ownership of code and data",
        body: [
          "On full payment, code produced specifically for the engagement is assigned to the client.",
          "Client data remains the client's exclusive property. It is returned on request and deleted from our environments at the end of the engagement.",
          "Synode retains ownership of its own tooling, reusable components and pre-existing know-how, and grants the client a licence to use them for the intended purpose.",
        ],
      },
      {
        heading: "Use of artificial intelligence",
        body: [
          "Some work relies on language models supplied by third parties. The provider and the associated data handling are set out in the proposal.",
          "Delivered systems can produce incorrect output. The human validation points required are agreed with the client and documented at handover.",
        ],
      },
      {
        heading: "Invoicing and payment",
        body: [
          "TODO: state the payment schedule (deposit, milestones, balance) and the payment term.",
          "Late payment carries interest at the statutory rate for commercial transactions, by operation of law, under the Belgian Act of 2 August 2002.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Synode owes an obligation of means. Its liability is capped at the amount actually paid for the engagement concerned.",
          "Synode is not liable for indirect loss, in particular loss of revenue, data or customers.",
        ],
      },
      {
        heading: "Confidentiality",
        body: [
          "Each party undertakes not to disclose the other's confidential information, during the engagement and for three years after it ends.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "Belgian law. Any dispute falls under the exclusive jurisdiction of the courts of the Brussels judicial district.",
        ],
      },
    ],
  },
};

const docs = { fr, en };

export function getLegalDoc(locale: Locale, slug: LegalSlug): LegalDoc {
  return docs[locale][slug];
}

/**
 * Short footer labels. The full titles put the four links on two lines on a
 * phone; these keep them on one. Pages themselves keep their full titles.
 */
const shortLabels = {
  fr: {
    "mentions-legales": "Mentions",
    confidentialite: "Vie privée",
    cookies: "Cookies",
    conditions: "Conditions",
  },
  en: {
    "mentions-legales": "Legal",
    confidentialite: "Privacy",
    cookies: "Cookies",
    conditions: "Terms",
  },
} as const;

/** Footer links, in the order they should appear. */
export function legalLinks(locale: Locale) {
  return legalSlugs.map((slug) => ({
    slug,
    label: docs[locale][slug].title,
    short: shortLabels[locale][slug],
    href: locale === "fr" ? `/legal/${slug}` : `/en/legal/${slug}`,
  }));
}
