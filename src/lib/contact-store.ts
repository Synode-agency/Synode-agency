import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * L'ENREGISTREMENT DES DEMANDES, ET LES DEUX EMAILS QUI SUIVENT.
 *
 * Règle qui commande tout ce fichier : une demande est confirmée au visiteur
 * SEULEMENT si elle a été enregistrée quelque part de durable. Un email de
 * notification n'est pas un enregistrement — s'il se perd, la demande est
 * perdue avec lui, et le visiteur croit avoir été entendu.
 *
 * Deux dépôts, choisis par `SYNODE_STORE` :
 *
 *   brevo  LE DÉPÔT DE PRODUCTION (décidé le 11/11/2026). Le prospect est
 *          enregistré comme contact dans une liste Brevo dédiée
 *          (`BREVO_LIST_ID`), avec sa demande. Même si les emails se
 *          perdent, la demande reste dans Brevo.
 *
 *   file   Un fichier JSON Lines sur le disque, pour le développement.
 *          ⚠ NE FONCTIONNE PAS chez un hébergeur comme Vercel ou Netlify :
 *          le disque y est en lecture seule ou effacé à chaque instance.
 *
 *   (vide) Aucun dépôt. L'API refuse alors d'enregistrer et le site le dit
 *          au visiteur, au lieu d'afficher un faux succès. C'est la valeur
 *          par défaut, délibérément : une configuration oubliée doit se
 *          voir, pas se taire.
 *
 * Une fois la demande enregistrée, deux emails partent par Brevo : la
 * notification à l'équipe (`CONTACT_TO`) et l'accusé de réception au
 * prospect. Leur échec ne fait jamais échouer une demande enregistrée.
 *
 * ⚠ Ce fichier lit `BREVO_API_KEY`, qui donne accès au compte Brevo. Il ne
 * doit jamais être importé depuis un composant client.
 */

const BREVO_API = "https://api.brevo.com/v3";

export type ContactRequest = {
  receivedAt: string;
  name: string;
  email: string;
  need: string;
  company?: string;
  phone?: string;
  website?: string;
  timeline?: string;
  budget?: string;
  useCase?: string;
  locale: string;
};

export type StoreResult =
  | { ok: true; backend: string }
  | { ok: false; reason: "not_configured" | "failed" };

/** Le dépôt configuré, ou `null` si aucun ne l'est. */
export function storeBackend(): string | null {
  const raw = (process.env.SYNODE_STORE ?? "").trim().toLowerCase();
  return raw === "" ? null : raw;
}

/**
 * Le formulaire peut-il vraiment enregistrer ? Lu par la page au chargement.
 * Avec `brevo`, il faut AUSSI la clé et la liste : sans elles, le formulaire
 * s'affichait actif alors que chaque envoi échouait.
 */
export function storeReady(): boolean {
  const backend = storeBackend();
  if (!backend) return false;
  if (backend === "brevo") return brevoConfig() !== null;
  return backend === "file";
}

/* ---- Brevo ---- */

function brevoConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) return null;
  return { apiKey, listId };
}

function brevoFetch(apiKey: string, endpoint: string, body: unknown) {
  return fetch(`${BREVO_API}${endpoint}`, {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

/**
 * Les champs de la demande, posés sur le contact Brevo.
 *
 * Ce sont des ATTRIBUTS DE CONTACT, à créer une fois dans Brevo (Contacts ›
 * Paramètres › Attributs de contact, type Texte) avec exactement ces noms.
 * S'il en manque, Brevo refuse le contact : on réessaie alors avec l'adresse
 * seule, pour ne jamais perdre la demande, et le serveur le signale.
 */
function brevoAttributes(req: ContactRequest) {
  const attributes: Record<string, string> = {
    NOM: req.name,
    DEMANDE: req.need,
    DATE_DEMANDE: req.receivedAt.slice(0, 10),
    LANGUE: req.locale,
  };
  if (req.company) attributes.ENTREPRISE = req.company;
  if (req.phone) attributes.TELEPHONE_DEMANDE = req.phone;
  if (req.website) attributes.SITE_WEB = req.website;
  if (req.timeline) attributes.ECHEANCE = req.timeline;
  if (req.budget) attributes.BUDGET = req.budget;
  if (req.useCase) attributes.CAS_USAGE = req.useCase;
  return attributes;
}

async function saveToBrevo(req: ContactRequest): Promise<StoreResult> {
  const config = brevoConfig();
  if (!config) {
    console.error("[contact] SYNODE_STORE=brevo, mais BREVO_API_KEY ou BREVO_LIST_ID manque.");
    return { ok: false, reason: "not_configured" };
  }
  const contact = {
    email: req.email.toLowerCase(),
    listIds: [config.listId],
    /* Un prospect qui revient met sa fiche à jour au lieu d'être refusé. */
    updateEnabled: true,
  };
  try {
    const res = await brevoFetch(config.apiKey, "/contacts", { ...contact, attributes: brevoAttributes(req) });
    if (res.ok) return { ok: true, backend: "brevo" };

    const detail = await res.text();
    /* Un attribut absent du compte Brevo ne doit pas coûter la demande :
       l'adresse seule, dans la bonne liste, suffit à recontacter la
       personne, et la notification porte le texte complet. */
    if (res.status === 400 && /attribut/i.test(detail)) {
      console.error("[contact] Attribut Brevo manquant, contact enregistré SANS sa demande :", detail);
      const retry = await brevoFetch(config.apiKey, "/contacts", contact);
      if (retry.ok) return { ok: true, backend: "brevo" };
      console.error("[contact] Brevo refuse aussi le contact seul :", retry.status, await retry.text());
      return { ok: false, reason: "failed" };
    }
    console.error("[contact] Brevo a refusé le contact :", res.status, detail);
    return { ok: false, reason: "failed" };
  } catch (error) {
    console.error("[contact] Brevo injoignable :", error);
    return { ok: false, reason: "failed" };
  }
}

export async function saveRequest(req: ContactRequest): Promise<StoreResult> {
  const backend = storeBackend();
  if (!backend) return { ok: false, reason: "not_configured" };

  if (backend === "brevo") return saveToBrevo(req);

  if (backend === "file") {
    try {
      const dir = process.env.SYNODE_STORE_DIR ?? path.join(process.cwd(), ".data");
      await fs.mkdir(dir, { recursive: true });
      /* JSON Lines : chaque demande est une ligne complète. Une écriture
         interrompue abîme au pire la dernière ligne, jamais le fichier. */
      await fs.appendFile(
        path.join(dir, "contact-requests.jsonl"),
        JSON.stringify(req) + "\n",
        "utf8",
      );
      return { ok: true, backend };
    } catch (error) {
      /* On journalise côté serveur uniquement. Le contenu de la demande ne
         doit jamais atteindre les journaux publics ni le navigateur. */
      console.error("[contact] échec d'enregistrement :", error);
      return { ok: false, reason: "failed" };
    }
  }

  console.error(`[contact] SYNODE_STORE="${backend}" n'est pas un dépôt connu.`);
  return { ok: false, reason: "not_configured" };
}

/* ---- Les emails ---- */

function mailConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to) return null;
  return { apiKey, from, to };
}

async function sendEmail(apiKey: string, message: Record<string, unknown>, label: string) {
  try {
    const res = await brevoFetch(apiKey, "/smtp/email", message);
    if (res.ok) return true;
    console.error(`[contact] Brevo a refusé ${label} :`, res.status, await res.text());
    return false;
  } catch (error) {
    console.error(`[contact] Brevo injoignable pour ${label} :`, error);
    return false;
  }
}

/**
 * La notification à l'équipe.
 *
 * Elle arrive APRÈS l'enregistrement, et son échec ne doit jamais effacer
 * une demande enregistrée : on renvoie `false`, le serveur le journalise, et
 * le visiteur reçoit quand même sa confirmation, parce que sa demande est
 * bien là. Elle sera lue dans Brevo.
 */
export async function notifyByEmail(req: ContactRequest): Promise<boolean> {
  const config = mailConfig();
  if (!config) return false;

  const lines = [
    `Nom       : ${req.name}`,
    `Email     : ${req.email}`,
    req.company && `Entreprise: ${req.company}`,
    req.phone && `Téléphone : ${req.phone}`,
    req.website && `Site      : ${req.website}`,
    req.timeline && `Échéance  : ${req.timeline}`,
    req.budget && `Budget    : ${req.budget}`,
    req.useCase && `Cas       : ${req.useCase}`,
    `Langue    : ${req.locale}`,
    "",
    req.need,
  ].filter(Boolean);

  return sendEmail(config.apiKey, {
    sender: { name: "Site Synode", email: config.from },
    to: [{ email: config.to }],
    /* L'adresse du visiteur en réponse : répondre depuis la boîte suffit,
       sans avoir à recopier son email. */
    replyTo: { email: req.email, name: req.name },
    subject: `Nouvelle demande de ${req.name}`,
    textContent: lines.join("\n"),
  }, "la notification");
}

const ACK = {
  fr: {
    subject: "Nous avons bien reçu votre demande",
    text: [
      "Bonjour,",
      "",
      "Merci pour votre message. Il nous est bien parvenu et nous revenons vers vous.",
      "",
      "Si votre demande est urgente, vous pouvez réserver directement un échange de 30 minutes :",
      "https://synode-agency.com/contact#reservation",
      "",
      "Pour compléter votre demande, répondez simplement à cet email.",
      "",
      "L’équipe Synode",
      "Agence IA · Bruxelles",
    ],
  },
  en: {
    subject: "We have received your request",
    text: [
      "Hello,",
      "",
      "Thank you for your message. It has reached us and we will get back to you.",
      "",
      "If your request is urgent, you can book a 30-minute call directly:",
      "https://synode-agency.com/en/contact#reservation",
      "",
      "To add anything to your request, simply reply to this email.",
      "",
      "The Synode team",
      "AI agency · Brussels",
    ],
  },
} as const;

/**
 * L'accusé de réception au prospect.
 *
 * ⚠ IL NE REPREND RIEN DE CE QUE LE VISITEUR A TAPÉ, pas même son nom. Le
 * formulaire est public : n'importe qui peut y saisir l'adresse d'un tiers.
 * Si l'email recopiait le message ou le nom, il deviendrait un relais pour
 * envoyer, depuis notre domaine, un texte choisi par un inconnu à une
 * adresse choisie par lui. Un texte fixe ne sert à rien à un spammeur.
 *
 * Pas de délai promis : le site n'en promet aucun (voir `thanks` dans
 * `content.ts`), l'email non plus.
 */
export async function sendAcknowledgement(req: ContactRequest): Promise<boolean> {
  const config = mailConfig();
  if (!config) return false;
  const ack = ACK[req.locale === "en" ? "en" : "fr"];

  return sendEmail(config.apiKey, {
    sender: { name: "Synode", email: config.from },
    to: [{ email: req.email }],
    replyTo: { email: config.to, name: "Synode" },
    subject: ack.subject,
    textContent: ack.text.join("\n"),
  }, "l'accusé de réception");
}
