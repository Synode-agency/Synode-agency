import type { Locale } from "./content";

/**
 * LE TEXTE DES PAGES LÉGALES, EN FRANÇAIS ET EN ANGLAIS.
 *
 * Texte validé par Antonino le 23/11/2026, une fois le cadre Smart connu :
 * Synode n'est pas une société, c'est le nom commercial d'une activité
 * hébergée au sein de Productions Associées ASBL (Smart), qui émet les
 * devis, les contrats et les factures. L'anglais en est la traduction
 * fidèle : les noms propres, les adresses, les numéros et les articles du
 * RGPD ne sont pas traduits.
 *
 * Écriture des paragraphes (lue par `LegalText`, dans `simple-pages.tsx`) :
 *   **texte**            texte en gras
 *   {email}              l'adresse de contact du site, en lien mailto
 *   <<libellé|https://>> lien externe (ou mailto:)
 *   <<libellé|@privacy>> lien vers la page Confidentialité de la langue
 *   <<libellé|@notice>>  lien vers la page Mentions légales de la langue
 *   un retour à la ligne (\n) devient un saut de ligne dans le paragraphe
 *
 * ⚠ Les prestataires cités doivent TOUJOURS correspondre à ceux réellement
 * branchés : un changement d'hébergeur, de boîte e-mail ou d'agenda change
 * ce fichier.
 */

/**
 * LE NUMÉRO D'ACTIVITÉ SMART DE SYNODE.
 *
 * Vide tant qu'Antonino ne l'a pas reçu : les mentions légales n'affichent
 * alors pas « activité n° … ». Il suffit de le saisir ici, par exemple
 * "12345", pour qu'il apparaisse dans les deux langues.
 */
export const SMART_ACTIVITY_NUMBER = "";

const activityFr = SMART_ACTIVITY_NUMBER ? `, activité n° ${SMART_ACTIVITY_NUMBER}` : "";
const activityEn = SMART_ACTIVITY_NUMBER ? `, activity no. ${SMART_ACTIVITY_NUMBER}` : "";

const SMART_POLICY = "https://smartbe.be/fr/smart-politique-de-protection-des-donnees-personnelles/";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalTexts = {
  updated: string;
  notice: LegalSection[];
  privacy: LegalSection[];
};

const fr: LegalTexts = {
  updated: "23 novembre 2026",

  /* --------------------------------------------------- Mentions légales */
  notice: [
    {
      title: "1. Éditeur du site et statut juridique",
      blocks: [
        `**Synode** est le nom commercial d’une activité hébergée au sein de **Productions Associées ASBL** (Smart)${activityFr}. L’activité est portée par **Killian Schoebben** et **Antonino Lo Bianco**.`,
        "Synode n’est pas une société distincte et ne dispose pas d’un numéro d’entreprise propre. Les informations légales sont celles de la structure qui héberge l’activité :",
        "**Productions Associées ASBL (Smart)**\nRue Coenraets 72, 1060 Saint-Gilles, Belgique\nN° d’entreprise : 0896.755.397\nN° de TVA : BE 0896.755.397",
        "**Contact Synode**\nRue des Alcyons 86, 1082 Bruxelles, Belgique\nE-mail : {email}",
        "**Responsables du contenu du site :** Killian Schoebben et Antonino Lo Bianco.",
      ],
    },
    {
      title: "2. Activité",
      blocks: [
        "Synode conçoit des solutions d’intelligence artificielle, intègre des systèmes et développe des logiciels sur mesure pour les entreprises (B2B).",
      ],
    },
    {
      title: "3. Contrats et facturation",
      blocks: [
        "Les devis, contrats et factures sont émis par Productions Associées ASBL, qui est le cocontractant des clients de Synode et en assure la facturation et le recouvrement.",
        "Les conditions générales de Productions Associées ASBL (Smart) s’appliquent à la conclusion du contrat, à la facturation, aux délais de paiement et au recouvrement. Le devis signé précise l’objet, le prix et les conditions particulières de chaque mission ; il prime en cas de divergence.",
        "Le site présente l’activité de Synode. Il ne permet ni commande ni paiement en ligne.",
      ],
    },
    {
      title: "4. Hébergement",
      blocks: [
        "Le site est hébergé par **Netlify, Inc.**, 101 2nd Street, San Francisco, CA 94105, États-Unis.",
      ],
    },
    {
      title: "5. Propriété intellectuelle",
      blocks: [
        "Les textes, illustrations, éléments graphiques et le logo présents sur ce site sont protégés par le droit d’auteur. Toute reproduction ou réutilisation, totale ou partielle, nécessite l’autorisation écrite préalable de Synode.",
        "Les droits sur les livrables réalisés pour un client (code, logiciels, documents) et leur éventuelle cession sont définis dans le devis signé.",
        "Les marques, logos et logiciels de tiers cités sur le site appartiennent à leurs titulaires respectifs. Leur mention n’implique aucun partenariat.",
      ],
    },
    {
      title: "6. Responsabilité et liens externes",
      blocks: [
        "Les informations du site sont fournies à titre indicatif et peuvent évoluer. Synode s’efforce de les tenir à jour, sans pouvoir garantir leur exhaustivité. Les liens vers des sites tiers sont fournis pour information ; Synode n’est pas responsable de leur contenu.",
      ],
    },
    {
      title: "7. Données personnelles",
      blocks: ["Le traitement des données personnelles est décrit dans notre <<politique de confidentialité|@privacy>>."],
    },
    {
      title: "8. Droit applicable",
      blocks: ["Le présent site et les présentes mentions légales sont soumis au droit belge."],
    },
  ],

  /* --------------------------------------- Politique de confidentialité */
  privacy: [
    {
      title: "1. Qui est responsable de vos données ?",
      blocks: [
        "**Pour les données collectées par ce site** (formulaire de contact, réservation d’un échange, e-mails) **et pour notre prospection** : Killian Schoebben et Antonino Lo Bianco, qui exercent sous le nom commercial **Synode**, sont responsables conjoints du traitement.\nContact : {email}, rue des Alcyons 86, 1082 Bruxelles, Belgique. Vous pouvez exercer vos droits auprès de l’un ou l’autre.",
        `**Pour les données de contrat et de facturation** : Synode est une activité hébergée au sein de **Productions Associées ASBL** (Smart), rue Coenraets 72, 1060 Saint-Gilles, Belgique, n° d’entreprise et TVA BE 0896.755.397. Lorsqu’une demande aboutit à un devis, les données nécessaires (identité et coordonnées de facturation du client, de la personne de contact) sont transmises à Productions Associées ASBL, qui les traite en tant que responsable du traitement distinct pour l’établissement des devis, contrats et factures, le recouvrement et la comptabilité. Ce traitement est régi par la <<politique de protection des données de Smart|${SMART_POLICY}>>. Son délégué à la protection des données est joignable à <<dpo@smart.coop|mailto:dpo@smart.coop>>.`,
        "Aucune autre donnée n’est transmise à Productions Associées ASBL.",
      ],
    },
    {
      title: "2. Données collectées",
      blocks: [
        {
          list: [
            "**Formulaire de contact** : nom, e-mail et description du besoin (obligatoires) ; entreprise, téléphone, site, échéance et budget (facultatifs). S’y ajoutent la date de la demande et la langue de la page.",
            "**Réservation d’un échange (Cal.com)** : au minimum nom, e-mail et créneau choisi.",
            "**E-mails** que vous échangez avec nous.",
            "**Données techniques** : notre hébergeur Netlify traite les données de connexion, dont l’adresse IP. Notre serveur utilise l’adresse IP temporairement, en mémoire, pour limiter les envois répétés du formulaire, sans l’enregistrer. Il garde de la même façon l’adresse e-mail, pour n’envoyer qu’un accusé de réception par jour.",
            "**Outils de la page d’accueil** (diagnostic, recherche de processus, brief) : ils fonctionnent dans votre navigateur. Rien ne nous est transmis tant que vous n’envoyez pas le formulaire.",
            "**Prospection** : si votre entreprise figure dans nos recherches, nous enregistrons les informations publiques de sa fiche Google Maps (nom, adresse, téléphone, site, catégorie), le nom et la fonction de la personne à contacter lorsqu’ils y figurent, nos notes de qualification et l’historique de nos échanges.",
          ],
        },
      ],
    },
    {
      title: "3. Finalités et bases légales",
      blocks: [
        {
          list: [
            "**Traiter et suivre votre demande, organiser un rendez-vous** : mesures précontractuelles (art. 6.1.b) si vous envisagez un contrat pour vous-même ; sinon intérêt légitime (art. 6.1.f), par exemple si vous écrivez pour une entreprise.",
            "**Envoyer un accusé de réception** : intérêt légitime (art. 6.1.f).",
            "**Protéger le site et le formulaire contre les abus** : intérêt légitime (art. 6.1.f).",
            "**Prospecter des entreprises susceptibles d’avoir besoin de nos services** : intérêt légitime (art. 6.1.f), celui de faire connaître notre activité aux entreprises. Notre premier message dit qui nous sommes, d’où viennent vos coordonnées et comment refuser la suite. Vous pouvez vous y opposer à tout moment, sans justification (art. 21.2) : répondez simplement à notre message ou écrivez à {email}.",
          ],
        },
        "Nous n’envoyons pas de newsletter et ne revendons pas vos données. Notre prospection reste individuelle : par e-mail ou par téléphone, chaque message est relu et envoyé par une personne, jamais en envoi de masse. Aucun traitement ne repose sur le consentement.",
      ],
    },
    {
      title: "4. Sous-traitants",
      blocks: [
        "Nous faisons appel aux prestataires suivants, qui traitent les données pour notre compte :",
        {
          list: [
            "**Brevo** (France) : enregistrement des demandes, notifications et accusé de réception ;",
            "**Netlify** (États-Unis) : hébergement du site et réception du formulaire ;",
            "**Cal.com** (États-Unis) : gestion des réservations ;",
            "**Hostinger** (Chypre) : hébergement de la boîte e-mail ;",
            "**Google Ireland** (Irlande) : agenda relié à Cal.com et boîte Gmail de contact ;",
            "**Anthropic** (États-Unis) : analyse, par l’IA Claude, des informations publiques des entreprises que nous prospectons ;",
            "**Supabase** (Singapour) : base de données de notre outil de prospection.",
          ],
        },
        "Vos données ne sont ni vendues ni cédées.",
      ],
    },
    {
      title: "5. Transferts hors de l’Union européenne",
      blocks: [
        "Netlify, Cal.com et Google LLC déclarent participer au EU-U.S. Data Privacy Framework, couvert par la décision d’adéquation de la Commission européenne du 10 juillet 2023. Google peut également recourir aux clauses contractuelles types. Brevo et Hostinger recourent aux clauses contractuelles types pour leurs éventuels sous-traitants situés hors de l’Union européenne. Anthropic et Supabase recourent aux clauses contractuelles types prévues par leur contrat de traitement.",
      ],
    },
    {
      title: "6. Durées de conservation",
      blocks: [
        {
          list: [
            "**Demandes, réservations et échanges** : 12 mois après le dernier échange, puis suppression dans Brevo, Cal.com, l’agenda et la boîte e-mail.",
            "**Prospection** : 12 mois après le dernier contact resté sans suite, puis suppression. Si vous vous opposez, vos données sont supprimées ; nous gardons seulement votre adresse e-mail ou votre numéro dans une liste d’opposition, pour ne plus vous contacter.",
            "**Si un contrat est conclu** : les documents contractuels et comptables sont conservés par Productions Associées ASBL selon ses obligations légales et sa propre politique de protection des données.",
            "**Données de connexion** : selon la politique de Netlify.",
          ],
        },
      ],
    },
    {
      title: "7. Cookies et traceurs",
      blocks: [
        "Le site ne dépose aucun cookie et n’utilise ni mesure d’audience, ni publicité, ni module de réseau social. Il n’affiche donc pas de bandeau cookies.",
        {
          list: [
            "**Stockage de session** : le brief préparé sur la page d’accueil est conservé dans votre navigateur, puis effacé dès que le formulaire de contact le reprend, ou à la fermeture de l’onglet.",
            "**Cal.com** : chargé uniquement lorsque vous cliquez sur « Ouvrir le calendrier ». Cal.com dépose alors notamment un cookie technique de sécurité (« __cf_bm », 30 minutes).",
            "**E-mails** : Brevo mesure l’ouverture et les clics de manière anonymisée, sans lien avec votre adresse.",
          ],
        },
      ],
    },
    {
      title: "8. Vos droits",
      blocks: [
        "Vous pouvez demander l’accès à vos données (art. 15), leur rectification (art. 16), leur effacement (art. 17), la limitation du traitement (art. 18), la portabilité des données fournies dans le cadre de mesures précontractuelles (art. 20), et vous opposer aux traitements fondés sur l’intérêt légitime (art. 21).",
        "Écrivez-nous à {email}. Nous répondons dans un délai d’un mois (art. 12) et pouvons demander une vérification d’identité en cas de doute. Pour les données de contrat et de facturation, vous pouvez aussi vous adresser directement à Smart (<<dpo@smart.coop|mailto:dpo@smart.coop>>).",
      ],
    },
    {
      title: "9. Décisions automatisées",
      blocks: [
        "Aucune décision exclusivement automatisée, profilage compris (art. 22), n’est prise. Chaque demande est lue et traitée par une personne. Dans notre prospection, l’IA aide à évaluer la pertinence d’une entreprise, mais la décision de la contacter est toujours prise par une personne.",
      ],
    },
    {
      title: "10. Sécurité",
      blocks: [
        "Le site est servi en HTTPS et l’accès aux comptes des outils utilisés est réservé aux deux fondateurs.",
      ],
    },
    {
      title: "11. Réclamation",
      blocks: [
        "Vous pouvez introduire une réclamation auprès de l’**Autorité de protection des données**, rue de la Presse 35, 1000 Bruxelles (<<autoriteprotectiondonnees.be|https://www.autoriteprotectiondonnees.be>>).",
      ],
    },
  ],
};

const en: LegalTexts = {
  updated: "23 November 2026",

  /* ------------------------------------------------------- Legal notice */
  notice: [
    {
      title: "1. Website publisher and legal status",
      blocks: [
        `**Synode** is the trading name of an activity hosted within **Productions Associées ASBL** (Smart)${activityEn}. The activity is run by **Killian Schoebben** and **Antonino Lo Bianco**.`,
        "Synode is not a separate company and does not have its own company number. The legal information is that of the organisation hosting the activity:",
        "**Productions Associées ASBL (Smart)**\nRue Coenraets 72, 1060 Saint-Gilles, Belgium\nCompany number: 0896.755.397\nVAT number: BE 0896.755.397",
        "**Synode contact**\nRue des Alcyons 86, 1082 Bruxelles, Belgium\nEmail: {email}",
        "**People responsible for the website content:** Killian Schoebben and Antonino Lo Bianco.",
      ],
    },
    {
      title: "2. Activity",
      blocks: [
        "Synode designs artificial intelligence solutions, integrates systems and develops custom software for businesses (B2B).",
      ],
    },
    {
      title: "3. Contracts and invoicing",
      blocks: [
        "Quotes, contracts and invoices are issued by Productions Associées ASBL, which is the contracting party for Synode’s clients and handles invoicing and debt collection.",
        "The general terms and conditions of Productions Associées ASBL (Smart) apply to the conclusion of the contract, invoicing, payment terms and debt collection. The signed quote sets out the subject, the price and the specific terms of each assignment; it prevails in the event of any discrepancy.",
        "This website presents Synode’s activity. It does not allow ordering or paying online.",
      ],
    },
    {
      title: "4. Hosting",
      blocks: [
        "This website is hosted by **Netlify, Inc.**, 101 2nd Street, San Francisco, CA 94105, United States.",
      ],
    },
    {
      title: "5. Intellectual property",
      blocks: [
        "The text, illustrations, graphic elements and logo on this website are protected by copyright. Any reproduction or reuse, in whole or in part, requires Synode’s prior written permission.",
        "Rights to the deliverables produced for a client (code, software, documents) and any transfer of those rights are defined in the signed quote.",
        "Third-party trademarks, logos and software mentioned on this website belong to their respective owners. Mentioning them does not imply any partnership.",
      ],
    },
    {
      title: "6. Liability and external links",
      blocks: [
        "The information on this website is provided for guidance only and may change. Synode makes every effort to keep it up to date, without being able to guarantee that it is complete. Links to third-party websites are provided for information; Synode is not responsible for their content.",
      ],
    },
    {
      title: "7. Personal data",
      blocks: ["The processing of personal data is described in our <<privacy policy|@privacy>>."],
    },
    {
      title: "8. Governing law",
      blocks: ["This website and this legal notice are governed by Belgian law."],
    },
  ],

  /* ----------------------------------------------------- Privacy policy */
  privacy: [
    {
      title: "1. Who is responsible for your data?",
      blocks: [
        "**For data collected by this website** (contact form, call booking, emails) **and for our prospecting**: Killian Schoebben and Antonino Lo Bianco, trading as **Synode**, are joint controllers.\nContact: {email}, rue des Alcyons 86, 1082 Bruxelles, Belgium. You can exercise your rights with either of them.",
        `**For contract and invoicing data**: Synode is an activity hosted within **Productions Associées ASBL** (Smart), rue Coenraets 72, 1060 Saint-Gilles, Belgium, company and VAT number BE 0896.755.397. When a request leads to a quote, the necessary data (identity and billing details of the client and of the contact person) are passed to Productions Associées ASBL, which processes them as a separate controller to prepare quotes, contracts and invoices, for debt collection and for accounting. This processing is governed by <<Smart’s data protection policy|${SMART_POLICY}>> (in French). Its data protection officer can be reached at <<dpo@smart.coop|mailto:dpo@smart.coop>>.`,
        "No other data is passed to Productions Associées ASBL.",
      ],
    },
    {
      title: "2. Data collected",
      blocks: [
        {
          list: [
            "**Contact form**: name, email and description of your needs (required); company, phone, website, timeline and budget (optional). The date of the request and the language of the page are added.",
            "**Booking a call (Cal.com)**: at least your name, email and the slot you choose.",
            "**Emails** you exchange with us.",
            "**Technical data**: our host Netlify processes connection data, including the IP address. Our server uses the IP address temporarily, in memory, to limit repeated form submissions, without recording it. It keeps the email address in the same way, so that only one acknowledgement is sent per day.",
            "**Home page tools** (diagnostic, process finder, brief): they run in your browser. Nothing is sent to us until you submit the form.",
            "**Prospecting**: if your company appears in our searches, we record the public information from its Google Maps listing (name, address, phone, website, category), the name and role of the person to contact where they appear there, our qualification notes and the history of our exchanges.",
          ],
        },
      ],
    },
    {
      title: "3. Purposes and legal bases",
      blocks: [
        {
          list: [
            "**Handling and following up your request, arranging a meeting**: pre-contractual steps (art. 6.1.b) if you are considering a contract for yourself; otherwise legitimate interest (art. 6.1.f), for example if you are writing on behalf of a company.",
            "**Sending an acknowledgement of receipt**: legitimate interest (art. 6.1.f).",
            "**Protecting the website and the form against abuse**: legitimate interest (art. 6.1.f).",
            "**Prospecting companies that may need our services**: legitimate interest (art. 6.1.f), that of making our activity known to businesses. Our first message says who we are, where your contact details come from and how to opt out. You can object at any time, without giving a reason (art. 21.2): simply reply to our message or write to {email}.",
          ],
        },
        "We do not send newsletters and do not sell your data. Our prospecting stays individual: by email or by phone, every message is reviewed and sent by a person, never as a bulk mailing. No processing relies on consent.",
      ],
    },
    {
      title: "4. Processors",
      blocks: [
        "We use the following providers, who process data on our behalf:",
        {
          list: [
            "**Brevo** (France): recording requests, notifications and acknowledgements of receipt;",
            "**Netlify** (United States): hosting the website and receiving the form;",
            "**Cal.com** (United States): managing bookings;",
            "**Hostinger** (Cyprus): hosting the mailbox;",
            "**Google Ireland** (Ireland): calendar connected to Cal.com and the Gmail contact inbox;",
            "**Anthropic** (United States): analysis, by the Claude AI, of the public information about the companies we prospect;",
            "**Supabase** (Singapore): database of our prospecting tool.",
          ],
        },
        "Your data is neither sold nor handed over.",
      ],
    },
    {
      title: "5. Transfers outside the European Union",
      blocks: [
        "Netlify, Cal.com and Google LLC state that they participate in the EU-U.S. Data Privacy Framework, covered by the European Commission’s adequacy decision of 10 July 2023. Google may also rely on standard contractual clauses. Brevo and Hostinger rely on standard contractual clauses for any of their sub-processors located outside the European Union. Anthropic and Supabase rely on the standard contractual clauses set out in their data processing agreement.",
      ],
    },
    {
      title: "6. Retention periods",
      blocks: [
        {
          list: [
            "**Requests, bookings and exchanges**: 12 months after the last exchange, then deleted from Brevo, Cal.com, the calendar and the mailbox.",
            "**Prospecting**: 12 months after the last contact that led nowhere, then deleted. If you object, your data is deleted; we keep only your email address or phone number in an opt-out list, so that we do not contact you again.",
            "**If a contract is concluded**: contractual and accounting documents are kept by Productions Associées ASBL in line with its legal obligations and its own data protection policy.",
            "**Connection data**: according to Netlify’s policy.",
          ],
        },
      ],
    },
    {
      title: "7. Cookies and trackers",
      blocks: [
        "This website sets no cookies and uses no audience measurement, no advertising and no social media plugins. It therefore shows no cookie banner.",
        {
          list: [
            "**Session storage**: the brief prepared on the home page is kept in your browser, then deleted as soon as the contact form picks it up, or when you close the tab.",
            "**Cal.com**: only loaded when you click “Open the calendar”. Cal.com then sets cookies, including a technical security cookie (“__cf_bm”, 30 minutes).",
            "**Emails**: Brevo measures opens and clicks anonymously, without any link to your address.",
          ],
        },
      ],
    },
    {
      title: "8. Your rights",
      blocks: [
        "You can request access to your data (art. 15), its rectification (art. 16), its erasure (art. 17), the restriction of processing (art. 18), the portability of the data provided as part of pre-contractual steps (art. 20), and object to processing based on legitimate interest (art. 21).",
        "Write to us at {email}. We reply within one month (art. 12) and may ask you to verify your identity if in doubt. For contract and invoicing data, you can also contact Smart directly (<<dpo@smart.coop|mailto:dpo@smart.coop>>).",
      ],
    },
    {
      title: "9. Automated decisions",
      blocks: [
        "No decision based solely on automated processing, including profiling (art. 22), is made. Every request is read and handled by a person. In our prospecting, AI helps assess whether a company is relevant, but the decision to contact it is always made by a person.",
      ],
    },
    {
      title: "10. Security",
      blocks: [
        "The website is served over HTTPS, and access to the accounts of the tools used is restricted to the two founders.",
      ],
    },
    {
      title: "11. Complaints",
      blocks: [
        "You can lodge a complaint with the **Autorité de protection des données** (the Belgian Data Protection Authority), rue de la Presse 35, 1000 Bruxelles (<<dataprotectionauthority.be|https://www.dataprotectionauthority.be>>).",
      ],
    },
  ],
};

export const LEGAL: Record<Locale, LegalTexts> = { fr, en };
