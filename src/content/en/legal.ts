import { activityEn, SMART_POLICY, type LegalTexts } from "../legal-shared";
import type { SiteContent } from "../types";

/** Titres et descriptions des deux pages légales. */
export const legal = {
  noticeTitle: "Legal notice",
  noticeDescription: "Legal notice for the Synode website: people responsible for the site, legal framework and invoicing through Smart, hosting and intellectual property.",
  privacyTitle: "Privacy policy",
  privacyDescription: "What personal data Synode processes, for what purposes, with which providers, for how long, and how you can exercise your rights.",
  updated: "Last updated",
} as const satisfies SiteContent["legal"];

/**
 * Le texte des pages légales en anglais, traduction fidèle du français.
 * Voir `../legal-shared.ts` pour les règles d'écriture.
 */
export const legalTexts: LegalTexts = {
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
