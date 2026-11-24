import { promises as fs } from "node:fs";
import path from "node:path";
import { after } from "next/server";
import { ACK } from "./ack-email";

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
  locale: string;
};

export type StoreResult =
  | { ok: true; backend: string }
  | { ok: false; reason: "not_configured" | "failed" | "invalid_email" };

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
    /* 4 s au plus : sans délai, un Brevo qui ne répond pas laissait
       l'hébergeur couper la fonction, le visiteur voyait une erreur alors
       que sa demande était peut-être enregistrée, et il la renvoyait. */
    signal: AbortSignal.timeout(4000),
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
/* ⚠ TOUS les attributs partent à chaque demande. Avec `updateEnabled`, une
   deuxième demande de la même adresse met la fiche à jour : si les champs
   facultatifs vides étaient omis, ceux de la demande précédente restaient,
   et la fiche mélangeait deux demandes.

   ⚠ JAMAIS UNE CHAÎNE VIDE : Brevo la refuse avec une erreur 500, et le
   formulaire échouait (testé le 23/11/2026 avec deux envois de la même
   adresse). Un champ laissé vide part donc en « Non renseigné ». */
const NOT_GIVEN = "Non renseigné";

function brevoAttributes(req: ContactRequest) {
  return {
    NOM: req.name,
    DEMANDE: req.need,
    DATE_DEMANDE: req.receivedAt.slice(0, 10),
    LANGUE: req.locale,
    ENTREPRISE: req.company || NOT_GIVEN,
    TELEPHONE_DEMANDE: req.phone || NOT_GIVEN,
    SITE_WEB: req.website || NOT_GIVEN,
    ECHEANCE: req.timeline || NOT_GIVEN,
    BUDGET: req.budget || NOT_GIVEN,
  };
}

/* ---- L'historique des demandes (constat K7 de l'audit du 23/11/2026).

   La fiche du contact ne garde que la DERNIÈRE demande : `updateEnabled`
   réécrit ses attributs à chaque envoi. Si la notification de la première
   s'était perdue, cette demande disparaissait, et un tiers qui connaît
   l'adresse d'un prospect pouvait remplacer sa demande par la sienne.

   Chaque demande devient donc AUSSI une note datée sur le contact (Brevo ›
   Contacts › la fiche › Notes). Les notes s'ajoutent, elles ne s'écrasent
   pas.

   Elle part APRÈS la réponse au visiteur (`after`), pour ne pas le faire
   attendre, et son échec ne touche jamais la demande, déjà enregistrée :
   il est seulement journalisé. ---- */

const escapeHtml = (value: string) =>
  value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[c] ?? c);

function brevoNoteText(req: ContactRequest) {
  const line = (label: string, value?: string) => `${label} : ${escapeHtml(value || NOT_GIVEN)}`;
  return [
    `<p><b>Demande du formulaire, ${escapeHtml(req.receivedAt.slice(0, 16).replace("T", " à "))} UTC (${escapeHtml(req.locale)})</b></p>`,
    `<p>${escapeHtml(req.need).replace(/\r?\n/g, "<br />")}</p>`,
    `<p>${[line("Nom", req.name), line("Entreprise", req.company), line("Téléphone", req.phone), line("Site", req.website), line("Échéance", req.timeline), line("Budget", req.budget)].join("<br />")}</p>`,
  ].join("");
}

async function addBrevoNote(apiKey: string, email: string, req: ContactRequest, knownId?: number) {
  try {
    let contactId = knownId;
    if (!contactId) {
      /* La création renvoie l'identifiant ; une mise à jour, non : on le lit. */
      const res = await fetch(`${BREVO_API}/contacts/${encodeURIComponent(email)}`, {
        headers: { "api-key": apiKey, accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) {
        console.error("[contact] Note Brevo : contact introuvable :", res.status);
        return;
      }
      contactId = ((await res.json()) as { id?: number }).id;
    }
    if (!contactId) return;
    const res = await brevoFetch(apiKey, "/crm/notes", { text: brevoNoteText(req), contactIds: [contactId] });
    if (!res.ok) console.error("[contact] Note Brevo refusée :", res.status, await res.text());
  } catch (error) {
    console.error("[contact] Note Brevo impossible :", error);
  }
}

/** L'identifiant renvoyé par Brevo quand il CRÉE le contact (201). */
async function createdContactId(res: Response) {
  if (res.status !== 201) return undefined;
  try {
    return ((await res.json()) as { id?: number }).id;
  } catch {
    return undefined;
  }
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
    const body = { ...contact, attributes: brevoAttributes(req) };
    let res = await brevoFetch(config.apiKey, "/contacts", body);
    /* Brevo répond parfois 500 « Internal Server Error » à une demande
       valide, puis l'accepte quelques secondes plus tard (constaté le
       23/11/2026 : deux échecs de suite, puis la même demande acceptée). Un
       second essai évite au visiteur une erreur qui n'est pas la sienne. */
    if (res.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      res = await brevoFetch(config.apiKey, "/contacts", body);
    }
    if (res.ok) {
      const id = await createdContactId(res);
      after(() => addBrevoNote(config.apiKey, contact.email, req, id));
      return { ok: true, backend: "brevo" };
    }

    const detail = await res.text();
    /* Un attribut absent du compte Brevo ne doit pas coûter la demande :
       l'adresse seule, dans la bonne liste, suffit à recontacter la
       personne, et la notification porte le texte complet. */
    if (res.status === 400 && /attribut/i.test(detail)) {
      console.error("[contact] Attribut Brevo manquant, contact enregistré SANS sa demande :", detail);
      const retry = await brevoFetch(config.apiKey, "/contacts", contact);
      if (retry.ok) {
        /* Sans ses attributs, la fiche n'a pas la demande : la note la garde. */
        const id = await createdContactId(retry);
        after(() => addBrevoNote(config.apiKey, contact.email, req, id));
        return { ok: true, backend: "brevo" };
      }
      console.error("[contact] Brevo refuse aussi le contact seul :", retry.status, await retry.text());
      return { ok: false, reason: "failed" };
    }
    /* Une adresse que Brevo juge invalide est une erreur du visiteur, pas un
       incident : la route la renvoie comme erreur du champ (K8). */
    if (res.status === 400 && /email/i.test(detail) && /invalid|not valid/i.test(detail)) {
      console.warn("[contact] Brevo refuse l'adresse e-mail :", detail);
      return { ok: false, reason: "invalid_email" };
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
      /* `||` et non `??` : une variable présente mais vide doit aussi prendre
         le dossier par défaut (C64). */
      const dir = process.env.SYNODE_STORE_DIR || path.join(process.cwd(), ".data");
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

/**
 * L'accusé de réception au prospect. Son texte est dans `ack-email.ts` (sans
 * signature pour l'instant), en version texte ET HTML : la version texte sert de secours
 * aux messageries qui n'affichent pas le HTML.
 *
 * ⚠ IL NE REPREND RIEN DE CE QUE LE VISITEUR A TAPÉ, pas même son nom. Le
 * formulaire est public : n'importe qui peut y saisir l'adresse d'un tiers.
 * Si l'email recopiait le message ou le nom, il deviendrait un relais pour
 * envoyer, depuis notre domaine, un texte choisi par un inconnu à une
 * adresse choisie par lui. Un texte fixe ne sert à rien à un spammeur.
 *
 * Pas de délai promis : le site n'en promet aucun (voir `thanks` dans
 * `src/content/`), l'email non plus.
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
    htmlContent: ack.html,
    textContent: ack.text,
  }, "l'accusé de réception");
}
