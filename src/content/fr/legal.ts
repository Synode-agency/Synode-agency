import { activityFr, SMART_POLICY, type LegalTexts } from "../legal-shared";

/** Titres et descriptions des deux pages légales. */
export const legal = {
  noticeTitle: "Mentions légales",
  noticeDescription: "Mentions légales du site de Synode : responsables du site, cadre juridique et facturation via Smart, hébergement et propriété intellectuelle.",
  privacyTitle: "Politique de confidentialité",
  privacyDescription: "Quelles données personnelles Synode traite, pour quelles finalités, avec quels prestataires, pendant combien de temps, et comment exercer vos droits.",
  updated: "Dernière mise à jour",
} as const;

/**
 * Le texte des pages légales en français, validé par Antonino le 23/11/2026.
 * Voir `../legal-shared.ts` pour les règles d'écriture.
 */
export const legalTexts: LegalTexts = {
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
