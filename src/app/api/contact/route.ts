import { NextResponse } from "next/server";
import { notifyByEmail, saveRequest, storeBackend, type ContactRequest } from "@/lib/contact-store";

/**
 * La réception d'une demande.
 *
 * L'ORDRE EST LA PARTIE IMPORTANTE :
 *   1. valider ;
 *   2. limiter les abus ;
 *   3. ENREGISTRER — si ça échoue, on renvoie une erreur et le visiteur
 *      garde son texte ;
 *   4. notifier par email — si ça échoue, la demande est déjà en sécurité,
 *      donc on confirme quand même et le serveur journalise.
 *
 * Aucun faux succès : sans dépôt configuré, la route répond 503 avec un code
 * que l'interface traduit en message honnête. Le site reste consultable.
 */

export const runtime = "nodejs";

/* Les bornes de taille sont doublées côté serveur : le navigateur peut
   mentir, `maxLength` sur un champ n'est qu'un confort. */
const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  website: 300,
  timeline: 60,
  budget: 60,
  useCase: 60,
  need: 4000,
} as const;

/* Une limitation en mémoire, par adresse IP. Elle suffit à arrêter un envoi
   répété depuis un navigateur, et c'est tout ce qu'elle prétend faire :
   plusieurs instances ne la partagent pas. Pour une protection réelle il
   faudra un compteur partagé ou le pare-feu de l'hébergeur. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  /* Sans ce nettoyage, la table grossit indéfiniment sur un serveur de
     longue durée. */
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "inconnu";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  /* Un pot de miel : un champ invisible que seul un robot remplit. On répond
     200 sans rien enregistrer, pour ne pas lui apprendre qu'il a été vu. */
  if (clean(body.company_url, 200) !== "") {
    return NextResponse.json({ ok: true, notified: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const need = clean(body.need, LIMITS.need);

  const errors: string[] = [];
  if (!name) errors.push("name");
  if (!email) errors.push("email");
  else if (!EMAIL_RE.test(email)) errors.push("emailInvalid");
  if (need.length < 10) errors.push("need");

  const website = clean(body.website, LIMITS.website);
  if (website && !/^https?:\/\/\S+\.\S+/.test(website) && !/^\S+\.\S{2,}/.test(website)) {
    errors.push("website");
  }

  if (errors.length) {
    return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });
  }

  const req: ContactRequest = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    need,
    company: clean(body.company, LIMITS.company) || undefined,
    phone: clean(body.phone, LIMITS.phone) || undefined,
    website: website || undefined,
    timeline: clean(body.timeline, LIMITS.timeline) || undefined,
    budget: clean(body.budget, LIMITS.budget) || undefined,
    useCase: clean(body.useCase, LIMITS.useCase) || undefined,
    locale: clean(body.locale, 5) || "fr",
  };

  const stored = await saveRequest(req);
  if (!stored.ok) {
    /* On distingue « pas configuré » de « a échoué » : le premier est un
       oubli de déploiement, le second un incident. Le visiteur reçoit un
       message différent, et dans les deux cas son texte est conservé. */
    return NextResponse.json(
      { error: stored.reason },
      { status: stored.reason === "not_configured" ? 503 : 500 },
    );
  }

  /* La demande est en sécurité. Ce qui suit ne peut plus la faire échouer. */
  const notified = await notifyByEmail(req);
  if (!notified) {
    console.error(
      `[contact] Demande ENREGISTRÉE (${stored.backend}) mais NON notifiée. À relire dans le dépôt : ${req.receivedAt} ${req.email}`,
    );
  }

  return NextResponse.json({ ok: true, notified });
}

/** Permet à la page de savoir, au chargement, si l'envoi est possible. */
export async function GET() {
  return NextResponse.json({ configured: storeBackend() !== null });
}
