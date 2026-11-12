import type { Locale } from "./content";

/**
 * LE TEXTE DES PAGES LÉGALES, EN FRANÇAIS ET EN ANGLAIS.
 *
 * ⚠ RIEN ICI N'EST VALIDÉ JURIDIQUEMENT. Tout ce qui doit encore être
 * confirmé, notamment par Smart, est écrit ENTRE CROCHETS : la page les
 * affiche en évidence, pour qu'aucun visiteur ne les lise comme des
 * informations vérifiées. Ne jamais remplacer un crochet par une valeur
 * supposée. La liste de ce qui manque, et où le trouver, est dans
 * `LEGAL_TODO.md`, à la racine du projet.
 *
 * Responsables du site et du traitement : Killian Schoebben et Antonino Lo
 * Bianco, rue des Alcyons 86, 1082 Bruxelles (donnés par Antonino le
 * 12/11/2026). Seule l'entité Smart reste à confirmer.
 *
 * Écriture des paragraphes (lue par `LegalText`, dans `simple-pages.tsx`) :
 *   **texte**            texte en gras
 *   [TEXTE]              élément à confirmer, affiché en évidence
 *   {email}              l'adresse de contact du site, en lien mailto
 *   <<libellé|https://>> lien externe
 *   <<libellé|@privacy>> lien vers la page Confidentialité de la langue
 *   <<libellé|@notice>>  lien vers la page Mentions légales de la langue
 *
 * Sources vérifiées le 12/11/2026 : SPF Économie (informations obligatoires
 * sur un site web, art. XII.6 et III.74 CDE), RGPD, politiques de Netlify et
 * de Cal.com, page « Entités » de smartbe.be. Le détail est dans
 * `LEGAL_TODO.md`.
 *
 * ⚠ Les prestataires cités doivent TOUJOURS correspondre à ceux réellement
 * branchés : un changement d'hébergeur, de boîte e-mail ou d'agenda change
 * ce fichier.
 */

export type LegalBlock = string | { list: string[] };
export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalTexts = {
  updated: string;
  notice: LegalSection[];
  privacy: LegalSection[];
};

const fr: LegalTexts = {
  updated: "12 novembre 2026",

  /* --------------------------------------------------- Mentions légales */
  notice: [
    {
      title: "Présentation de Synode",
      blocks: [
        "Synode est le nom commercial d’une activité de services aux entreprises (B2B) : conception et développement de solutions d’intelligence artificielle, d’agents IA, d’automatisations et de logiciels sur mesure.",
        {
          list: [
            "**Nom commercial :** Synode",
            "**Responsables du site :** Killian Schoebben et Antonino Lo Bianco",
            "**Adresse professionnelle :** rue des Alcyons 86, 1082 Bruxelles, Belgique",
            "**E-mail :** {email}",
          ],
        },
        "Synode n’est pas une société : ce n’est ni une SRL, ni une ASBL, ni une entreprise disposant de son propre numéro d’entreprise. C’est le nom sous lequel deux personnes physiques établies à Bruxelles présentent leur activité. Elles gèrent elles-mêmes ce site.",
      ],
    },
    {
      title: "Cadre juridique et Smart",
      blocks: [
        "Les prestations proposées sous le nom Synode seront contractualisées et facturées dans le cadre de Smart, entreprise partagée belge (<<smartbe.be|https://smartbe.be/>>). L’inscription de l’activité est en cours. [FORMULATION À VALIDER PAR SMART]",
        {
          list: [
            "**Entité juridique contractante :** [À CONFIRMER AUPRÈS DE SMART]",
            "**Dénomination légale :** [À CONFIRMER]",
            "**Adresse du siège :** [À CONFIRMER]",
            "**Numéro d’entreprise (BCE) :** [À CONFIRMER]",
            "**Numéro de TVA :** [À CONFIRMER]",
          ],
        },
      ],
    },
    {
      title: "Hébergement",
      blocks: [
        "Le site est hébergé par Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis (<<netlify.com|https://www.netlify.com/>>).",
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        "Sauf mention contraire, les textes, les illustrations, les éléments graphiques et le logo de ce site ont été créés pour Synode et sont protégés par le droit d’auteur. Leur reproduction ou leur réutilisation, totale ou partielle, demande une autorisation écrite préalable. Titulaire des droits : [À CONFIRMER, NOTAMMENT AU REGARD DU CONTRAT SMART].",
        "Les noms de logiciels, de services et de marques de tiers cités sur ce site appartiennent à leurs titulaires. Les citer n’implique aucun partenariat.",
      ],
    },
    {
      title: "Prestations",
      blocks: [
        "Ce site présente une activité. Il ne permet ni commande ni paiement en ligne.",
        "Chaque prestation fait l’objet d’une proposition écrite. Les conditions contractuelles qui s’y appliquent (devis, facturation, paiement) sont celles validées avec Smart : [À CONFIRMER AVEC SMART].",
      ],
    },
    {
      title: "Données personnelles",
      blocks: ["Le traitement de vos données est décrit dans notre <<politique de confidentialité|@privacy>>."],
    },
  ],

  /* --------------------------------------- Politique de confidentialité */
  privacy: [
    {
      title: "Qui traite vos données",
      blocks: [
        {
          list: [
            "**Responsables conjoints du traitement :** Killian Schoebben et Antonino Lo Bianco, qui exercent sous le nom commercial Synode",
            "**Adresse :** rue des Alcyons 86, 1082 Bruxelles, Belgique",
            "**Contact pour toute question sur vos données :** {email}",
          ],
        },
        "Ils décident ensemble pourquoi et comment vos données sont traitées sur ce site (art. 26 du RGPD). Vous pouvez exercer vos droits auprès de l’un ou de l’autre, à l’adresse e-mail ci-dessus.",
        "Les prestations de Synode seront contractualisées et facturées dans le cadre de Smart (voir les <<mentions légales|@notice>>). Si votre demande aboutit à une proposition ou à un contrat, Smart traite les données nécessaires à la contractualisation et à la facturation : [RÔLE DE SMART À CONFIRMER AUPRÈS DE SMART].",
      ],
    },
    {
      title: "Les données que nous traitons",
      blocks: [
        "**Par le formulaire de contact.** Obligatoires : votre nom, votre adresse e-mail et la description de votre besoin. Facultatifs : entreprise ou activité, téléphone, site internet, échéance et budget envisagés. S’y ajoutent automatiquement la date de la demande, la langue de la page et, si vous écrivez depuis un cas d’usage, le nom de ce cas.",
        "**Par la réservation d’un échange.** Les informations que Cal.com vous demande pour réserver (au minimum votre nom, votre adresse e-mail et le créneau choisi).",
        "**Par e-mail.** Les messages que vous nous envoyez et nos échanges qui suivent.",
        "**Données techniques.** Pour afficher le site, notre hébergeur Netlify traite des données de connexion, dont votre adresse IP, votre navigateur et les pages demandées. Notre serveur utilise aussi votre adresse IP, temporairement et en mémoire seulement, pour limiter les envois répétés du formulaire. Il ne l’enregistre pas.",
        "**Les outils de l’accueil.** Le diagnostic et la préparation d’un brief fonctionnent dans votre navigateur. Rien ne nous est transmis tant que vous n’envoyez pas le formulaire.",
      ],
    },
    {
      title: "Pourquoi, et sur quelle base",
      blocks: [
        {
          list: [
            "**Recevoir votre demande, y répondre et préparer un premier échange.** Base : les mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD), lorsque vous envisagez un contrat pour vous-même, par exemple comme indépendant ; dans les autres cas, notamment si vous écrivez pour une entreprise, notre intérêt légitime (art. 6.1.f).",
            "**Organiser le rendez-vous que vous réservez.** Même base.",
            "**Vous envoyer un accusé de réception.** Base : notre intérêt légitime à vous confirmer que votre demande est bien arrivée.",
            "**Assurer le suivi que vous avez demandé** : réponse, proposition, relance liée à votre demande. Base : mesures précontractuelles ou intérêt légitime, comme ci-dessus.",
            "**Protéger le site et le formulaire contre les abus, et assurer leur fonctionnement.** Base : notre intérêt légitime.",
          ],
        },
        "Notre intérêt légitime consiste à répondre aux demandes professionnelles qui nous sont adressées, à en assurer le suivi et à protéger le site contre les envois abusifs. Il ne va jamais au-delà de votre demande : pas de newsletter, pas de revente, pas de réutilisation de vos coordonnées pour des campagnes marketing. Vous pouvez vous opposer à ces traitements à tout moment (voir « Vos droits »).",
      ],
    },
    {
      title: "Champs obligatoires",
      blocks: [
        "Le nom, l’adresse e-mail et la description du besoin sont nécessaires pour vous répondre : sans eux, le formulaire ne peut pas être envoyé. Les autres champs sont facultatifs, et les laisser vides ne change rien au traitement de votre demande.",
      ],
    },
    {
      title: "Qui reçoit vos données",
      blocks: [
        "Les deux personnes qui développent Synode, et les prestataires suivants, qui agissent pour notre compte :",
        {
          list: [
            "**Brevo** (Sendinblue SAS, France) : enregistre votre demande dans une liste réservée aux demandes de contact, nous envoie la notification et vous envoie l’accusé de réception. <<Politique de Brevo|https://www.brevo.com/fr/legal/privacypolicy/>>",
            "**Netlify, Inc.** (États-Unis) : héberge le site et exécute l’envoi du formulaire. <<Politique de Netlify|https://www.netlify.com/privacy/>>",
            "**Cal.com, Inc.** (États-Unis) : gère la réservation des échanges. <<Politique de Cal.com|https://cal.com/privacy>>",
            "**Hostinger International Ltd** (Chypre) : héberge notre boîte e-mail. <<Politique d’Hostinger|https://www.hostinger.com/fr/legal/politique-de-confidentialite>>",
            "**Google** (Google Ireland Limited, Irlande) : l’agenda Google de Synode, relié à Cal.com, qui reçoit les rendez-vous réservés, et la boîte Gmail dans laquelle nous lisons les e-mails reçus sur notre adresse de contact. <<Politique de Google|https://policies.google.com/privacy?hl=fr>>",
            "**Smart** : si votre demande aboutit à une proposition ou à une facture. [À CONFIRMER AVEC SMART]",
          ],
        },
        "Chacun de ces prestataires fait appel à ses propres sous-traitants, listés dans sa documentation. Nous ne vendons ni ne cédons vos données à personne.",
      ],
    },
    {
      title: "Transferts hors de l’Union européenne",
      blocks: [
        "Vos données ne restent pas toutes dans l’Union européenne. Netlify et Cal.com sont établis aux États-Unis, et Google y transfère une partie des données qu’il traite. Netlify, Cal.com et Google LLC déclarent participer au EU-U.S. Data Privacy Framework, reconnu par la décision d’adéquation de la Commission européenne du 10 juillet 2023 (art. 45 du RGPD). Google utilise en outre les clauses contractuelles types de la Commission lorsque c’est nécessaire.",
        "Brevo est établi en France et Hostinger à Chypre. Lorsqu’un de leurs sous-traitants traite des données hors de l’Union européenne, leurs contrats de traitement prévoient les clauses contractuelles types de la Commission européenne (art. 46 du RGPD).",
      ],
    },
    {
      title: "Combien de temps",
      blocks: [
        {
          list: [
            "**Vos demandes, vos réservations et nos échanges :** 12 mois après notre dernier échange relatif à votre demande, puis suppression dans Brevo, Cal.com, l’agenda et notre boîte e-mail.",
            "**Si la demande aboutit à une prestation :** les documents contractuels et comptables sont conservés pendant les durées imposées par la loi. [À CONFIRMER AVEC SMART]",
            "**Données techniques de connexion :** selon les durées de Netlify, décrites dans sa politique.",
          ],
        },
      ],
    },
    {
      title: "Les e-mails que nous envoyons",
      blocks: [
        "L’accusé de réception est envoyé par Brevo. Brevo mesure l’ouverture de ses e-mails, au moyen d’une petite image invisible, et les clics sur leurs liens. Nous avons activé l’anonymisation de cette mesure : elle n’est pas rattachée à votre adresse e-mail et ne nous donne que des statistiques globales d’envoi.",
      ],
    },
    {
      title: "Décisions automatisées",
      blocks: [
        "Aucune décision fondée exclusivement sur un traitement automatisé, profilage compris, n’est prise à votre égard au sens de l’article 22 du RGPD. Chaque demande est lue et traitée par une personne.",
      ],
    },
    {
      title: "Sécurité",
      blocks: [
        "Le site est servi en HTTPS : ce que vous envoyez par le formulaire est transmis chiffré. L’accès aux comptes qui contiennent vos données est réservé aux deux personnes de Synode.",
      ],
    },
    {
      title: "Vos droits",
      blocks: [
        "Vous pouvez à tout moment demander :",
        {
          list: [
            "l’accès aux données que nous détenons sur vous (art. 15 du RGPD) ;",
            "leur rectification (art. 16) ;",
            "leur effacement (art. 17) ;",
            "la limitation de leur traitement (art. 18) ;",
            "leur portabilité, pour les données que vous nous avez fournies dans le cadre de mesures précontractuelles (art. 20).",
          ],
        },
        "Vous pouvez aussi vous opposer aux traitements fondés sur notre intérêt légitime (art. 21). Aucun traitement décrit ici ne repose sur votre consentement ; si cela changeait, vous pourriez le retirer à tout moment.",
        "Pour exercer ces droits, écrivez-nous à {email}. Nous répondons dans un délai d’un mois (art. 12) et pouvons vous demander de confirmer votre identité en cas de doute.",
        "Vous pouvez également introduire une plainte auprès de l’Autorité de protection des données, rue de la Presse 35, 1000 Bruxelles : <<autoriteprotectiondonnees.be|https://www.autoriteprotectiondonnees.be/>>.",
      ],
    },
    {
      title: "Cookies et traceurs",
      blocks: [
        "Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience, de publicité ou de réseau social. C’est pourquoi il n’affiche pas de bandeau de cookies.",
        "**Stockage dans votre navigateur.** Quand vous envoyez vers le formulaire un brief préparé sur l’accueil, il est gardé dans le stockage de session de votre navigateur, puis effacé dès que le formulaire le reprend, ou à la fermeture de l’onglet. Ce stockage sert uniquement au service que vous demandez.",
        "**Le calendrier Cal.com.** Il n’est chargé que lorsque vous cliquez sur « Ouvrir le calendrier », jamais avant. Ce clic active un service externe, Cal.com, qui dépose alors un cookie technique de sécurité (« __cf_bm », valable 30 minutes) et fonctionne selon sa propre politique de confidentialité. Ce clic sert uniquement à ouvrir le calendrier : il ne vaut pas consentement à des cookies publicitaires ou de mesure d’audience.",
        "**Dans nos e-mails.** Voir « Les e-mails que nous envoyons ».",
      ],
    },
    {
      title: "Mises à jour",
      blocks: [
        "Cette politique change quand nos prestataires ou nos traitements changent. La date de la dernière mise à jour figure en bas de page.",
      ],
    },
  ],
};

const en: LegalTexts = {
  updated: "12 November 2026",

  /* ------------------------------------------------------- Legal notice */
  notice: [
    {
      title: "About Synode",
      blocks: [
        "Synode is the trading name of a business-to-business (B2B) service activity: designing and building artificial intelligence solutions, AI agents, automations and custom software.",
        {
          list: [
            "**Trading name:** Synode",
            "**People responsible for the website:** Killian Schoebben and Antonino Lo Bianco",
            "**Business address:** Rue des Alcyons 86, 1082 Brussels, Belgium",
            "**Email:** {email}",
          ],
        },
        "Synode is not a company: it is not an SRL, not a non-profit (ASBL) and not a business with its own company number. It is the name under which two individuals based in Brussels present their activity. They run this website themselves.",
      ],
    },
    {
      title: "Legal framework and Smart",
      blocks: [
        "Services offered under the Synode name will be contracted and invoiced within the framework of Smart, a Belgian shared enterprise (<<smartbe.be|https://smartbe.be/>>). Registration of the activity is in progress. [WORDING TO BE APPROVED BY SMART]",
        {
          list: [
            "**Contracting legal entity:** [TO BE CONFIRMED WITH SMART]",
            "**Legal name:** [TO BE CONFIRMED]",
            "**Registered office:** [TO BE CONFIRMED]",
            "**Company number (BCE/KBO):** [TO BE CONFIRMED]",
            "**VAT number:** [TO BE CONFIRMED]",
          ],
        },
      ],
    },
    {
      title: "Hosting",
      blocks: [
        "This website is hosted by Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, United States (<<netlify.com|https://www.netlify.com/>>).",
      ],
    },
    {
      title: "Intellectual property",
      blocks: [
        "Unless stated otherwise, the text, illustrations, graphic elements and logo on this website were created for Synode and are protected by copyright. Reproducing or reusing them, in whole or in part, requires prior written permission. Rights holder: [TO BE CONFIRMED, IN PARTICULAR UNDER THE SMART CONTRACT].",
        "Names of third-party software, services and brands mentioned on this website belong to their owners. Mentioning them does not imply any partnership.",
      ],
    },
    {
      title: "Services",
      blocks: [
        "This website presents an activity. It does not allow ordering or paying online.",
        "Every engagement is based on a written proposal. The contractual terms that apply to it (quote, invoicing, payment) are those agreed with Smart: [TO BE CONFIRMED WITH SMART].",
      ],
    },
    {
      title: "Personal data",
      blocks: ["How we handle your data is described in our <<privacy policy|@privacy>>."],
    },
  ],

  /* ----------------------------------------------------- Privacy policy */
  privacy: [
    {
      title: "Who handles your data",
      blocks: [
        {
          list: [
            "**Joint data controllers:** Killian Schoebben and Antonino Lo Bianco, trading as Synode",
            "**Address:** Rue des Alcyons 86, 1082 Brussels, Belgium",
            "**Contact for any question about your data:** {email}",
          ],
        },
        "They decide together why and how your data is processed on this website (Art. 26 GDPR). You can exercise your rights with either of them, at the email address above.",
        "Synode’s services will be contracted and invoiced within the framework of Smart (see the <<legal notice|@notice>>). If your request leads to a proposal or a contract, Smart processes the data needed for contracting and invoicing: [SMART’S ROLE TO BE CONFIRMED WITH SMART].",
      ],
    },
    {
      title: "The data we process",
      blocks: [
        "**Through the contact form.** Required: your name, your email address and a description of your need. Optional: company or activity, phone, website, timeline and budget in mind. We also record the date of the request, the language of the page and, if you write from a use case, the name of that use case.",
        "**When you book a call.** The details Cal.com asks for to make the booking (at least your name, your email address and the slot you choose).",
        "**By email.** The messages you send us and the exchanges that follow.",
        "**Technical data.** To display the website, our host Netlify processes connection data, including your IP address, your browser and the pages requested. Our server also uses your IP address, temporarily and in memory only, to limit repeated form submissions. It does not record it.",
        "**The tools on the home page.** The diagnostic and the brief builder run in your browser. Nothing reaches us until you send the form.",
      ],
    },
    {
      title: "Why, and on what legal basis",
      blocks: [
        {
          list: [
            "**Receiving your request, answering it and preparing a first call.** Basis: steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR), when you are considering a contract for yourself, for example as a freelancer; otherwise, in particular when you write on behalf of a company, our legitimate interest (Art. 6(1)(f)).",
            "**Organising the call you book.** Same basis.",
            "**Sending you an acknowledgement.** Basis: our legitimate interest in confirming that your request has arrived.",
            "**Following up as you asked:** answer, proposal, reminder about your request. Basis: pre-contractual steps or legitimate interest, as above.",
            "**Protecting the website and the form against abuse, and keeping them running.** Basis: our legitimate interest.",
          ],
        },
        "Our legitimate interest is to answer the business requests sent to us, to follow them up and to protect the website against abusive submissions. It never goes beyond your request: no newsletter, no reselling, no reuse of your details for marketing campaigns. You can object to this processing at any time (see “Your rights”).",
      ],
    },
    {
      title: "Required fields",
      blocks: [
        "Your name, email address and a description of your need are required for us to answer: without them, the form cannot be sent. The other fields are optional, and leaving them empty makes no difference to how your request is handled.",
      ],
    },
    {
      title: "Who receives your data",
      blocks: [
        "The two people who run Synode, and the following providers, acting on our behalf:",
        {
          list: [
            "**Brevo** (Sendinblue SAS, France): records your request in a list kept for contact requests only, sends us the notification and sends you the acknowledgement. <<Brevo’s policy|https://www.brevo.com/legal/privacypolicy/>>",
            "**Netlify, Inc.** (United States): hosts the website and runs the form submission. <<Netlify’s policy|https://www.netlify.com/privacy/>>",
            "**Cal.com, Inc.** (United States): handles call bookings. <<Cal.com’s policy|https://cal.com/privacy>>",
            "**Hostinger International Ltd** (Cyprus): hosts our mailbox. <<Hostinger’s policy|https://www.hostinger.com/legal/privacy-policy>>",
            "**Google** (Google Ireland Limited, Ireland): Synode’s Google calendar, connected to Cal.com, which receives booked calls, and the Gmail inbox where we read the emails sent to our contact address. <<Google’s policy|https://policies.google.com/privacy?hl=en>>",
            "**Smart**: if your request leads to a proposal or an invoice. [TO BE CONFIRMED WITH SMART]",
          ],
        },
        "Each of these providers relies on its own sub-processors, listed in its documentation. We do not sell or hand over your data to anyone.",
      ],
    },
    {
      title: "Transfers outside the European Union",
      blocks: [
        "Not all of your data stays in the European Union. Netlify and Cal.com are based in the United States, and Google transfers part of the data it processes there. Netlify, Cal.com and Google LLC state that they take part in the EU-U.S. Data Privacy Framework, recognised by the European Commission’s adequacy decision of 10 July 2023 (Art. 45 GDPR). Google also relies on the Commission’s standard contractual clauses where needed.",
        "Brevo is based in France and Hostinger in Cyprus. When one of their sub-processors handles data outside the European Union, their data processing agreements provide for the European Commission’s standard contractual clauses (Art. 46 GDPR).",
      ],
    },
    {
      title: "How long",
      blocks: [
        {
          list: [
            "**Your requests, bookings and our exchanges:** 12 months after our last exchange about your request, then deleted from Brevo, Cal.com, the calendar and our mailbox.",
            "**If the request leads to an engagement:** contractual and accounting records are kept for the periods required by law. [TO BE CONFIRMED WITH SMART]",
            "**Technical connection data:** for the periods set by Netlify, described in its policy.",
          ],
        },
      ],
    },
    {
      title: "The emails we send",
      blocks: [
        "The acknowledgement is sent by Brevo. By default, Brevo measures whether its emails are opened, using a small invisible image, and whether their links are clicked. We have turned on anonymisation of this measurement: it is not linked to your email address and only gives us overall sending statistics.",
      ],
    },
    {
      title: "Automated decisions",
      blocks: [
        "No decision based solely on automated processing, including profiling, is made about you within the meaning of Article 22 GDPR. Every request is read and handled by a person.",
      ],
    },
    {
      title: "Security",
      blocks: [
        "The website is served over HTTPS: what you send through the form is encrypted in transit. Access to the accounts holding your data is limited to the two people who run Synode.",
      ],
    },
    {
      title: "Your rights",
      blocks: [
        "At any time, you can ask for:",
        {
          list: [
            "access to the data we hold about you (Art. 15 GDPR);",
            "its correction (Art. 16);",
            "its deletion (Art. 17);",
            "restriction of its processing (Art. 18);",
            "its portability, for the data you gave us as part of pre-contractual steps (Art. 20).",
          ],
        },
        "You can also object to processing based on our legitimate interest (Art. 21). None of the processing described here relies on your consent; if that changed, you could withdraw it at any time.",
        "To exercise these rights, write to us at {email}. We answer within one month (Art. 12) and may ask you to confirm your identity if in doubt.",
        "You can also lodge a complaint with the Belgian Data Protection Authority, Rue de la Presse 35, 1000 Brussels: <<dataprotectionauthority.be|https://www.dataprotectionauthority.be/>>.",
      ],
    },
    {
      title: "Cookies and trackers",
      blocks: [
        "This website sets no cookies and uses no audience measurement, advertising or social media tools. That is why it shows no cookie banner.",
        "**Storage in your browser.** When you send a brief prepared on the home page to the form, it is kept in your browser’s session storage, then deleted as soon as the form picks it up, or when you close the tab. This storage only serves the service you asked for.",
        "**The Cal.com calendar.** It only loads when you click “Open the calendar”, never before. That click turns on an external service, Cal.com, which then sets a technical security cookie (“__cf_bm”, valid for 30 minutes) and works under its own privacy policy. The click only opens the calendar: it is not consent to advertising or audience measurement cookies.",
        "**In our emails.** See “The emails we send”.",
      ],
    },
    {
      title: "Updates",
      blocks: [
        "This policy changes when our providers or our processing change. The date of the last update is shown at the bottom of the page.",
      ],
    },
  ],
};

export const LEGAL: Record<Locale, LegalTexts> = { fr, en };
