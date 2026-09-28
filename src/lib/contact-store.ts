import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * L'ENREGISTREMENT DES DEMANDES.
 *
 * Règle qui commande tout ce fichier : une demande est confirmée au visiteur
 * SEULEMENT si elle a été enregistrée quelque part de durable. Un email de
 * notification n'est pas un enregistrement — s'il se perd, la demande est
 * perdue avec lui, et le visiteur croit avoir été entendu.
 *
 * Deux dépôts, choisis par `SYNODE_STORE` :
 *
 *   file   Un fichier JSON Lines sur le disque. Convient au développement
 *          et à un hébergement où le disque est persistant.
 *          ⚠ NE FONCTIONNE PAS SUR VERCEL : le système de fichiers y est en
 *          lecture seule, et ce qui est écrit dans /tmp disparaît avec
 *          l'instance. Ne pas s'en servir en production sur Vercel.
 *
 *   (vide) Aucun dépôt. L'API refuse alors d'enregistrer et le site le dit
 *          au visiteur, au lieu d'afficher un faux succès. C'est la valeur
 *          par défaut, délibérément : une configuration oubliée doit se
 *          voir, pas se taire.
 *
 * Pour la mise en ligne, brancher un vrai dépôt (base de données, table
 * externe, CRM) en ajoutant un cas dans `saveRequest`. Voir
 * `docs/SITE_A_COMPLETER.md`.
 */

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

export async function saveRequest(req: ContactRequest): Promise<StoreResult> {
  const backend = storeBackend();
  if (!backend) return { ok: false, reason: "not_configured" };

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

/**
 * La notification par email.
 *
 * Elle arrive APRÈS l'enregistrement, et son échec ne doit jamais effacer
 * une demande enregistrée : on renvoie `false`, le serveur le journalise, et
 * le visiteur reçoit quand même sa confirmation, parce que sa demande est
 * bien là. Elle sera lue dans le dépôt.
 */
export async function notifyByEmail(req: ContactRequest): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!key || !from || !to) return false;

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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        /* L'adresse du visiteur en réponse : répondre depuis la boîte suffit,
           sans avoir à recopier son email. */
        reply_to: req.email,
        subject: `Synode — demande de ${req.name}`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend a refusé l'envoi :", res.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Resend injoignable :", error);
    return false;
  }
}
