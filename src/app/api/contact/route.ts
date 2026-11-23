import { NextResponse } from "next/server";
import { notifyByEmail, saveRequest, sendAcknowledgement, storeReady, type ContactRequest } from "@/lib/contact-store";
import { siteUrl } from "@/lib/site-url";
import { isValidEmail, isValidWebsite } from "@/lib/form-rules";

/**
 * La réception d'une demande.
 *
 * L'ORDRE EST LA PARTIE IMPORTANTE :
 *   1. valider ;
 *   2. limiter les abus, sur les seules demandes valides ;
 *   3. ENREGISTRER — si ça échoue, on renvoie une erreur et le visiteur
 *      garde son texte ;
 *   4. notifier l'équipe et envoyer l'accusé de réception au prospect — si
 *      ça échoue, la demande est déjà en sécurité, donc on confirme quand
 *      même et le serveur journalise.
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
  need: 4000,
} as const;

/* Une limitation en mémoire, par adresse IP : 3 demandes par minute et 10
   par jour. Elle suffit à arrêter un envoi répété depuis un navigateur, et
   c'est tout ce qu'elle prétend faire : plusieurs instances ne la partagent
   pas, et un démarrage à froid la remet à zéro. Pour une protection réelle
   il faudra un compteur partagé, le pare-feu de l'hébergeur ou une
   vérification anti-robot. */
const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * 60_000;
const MAX_PER_MINUTE = 3;
const MAX_PER_DAY = 10;
const hits = new Map<string, number[]>();

/* La clé de comptage. Une adresse IPv6 est comptée par bloc /64 : chez un
   fournisseur, un seul abonné dispose de tout le bloc, et compter l'adresse
   entière laissait un robot en changer à chaque envoi. Une IPv4, y compris
   écrite en IPv6 (`::ffff:1.2.3.4`), reste comptée seule. */
function rateKey(ip: string) {
  const ipv4 = ip.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (ipv4) return ipv4[1];
  if (!ip.includes(":")) return ip;
  const [head, tail] = ip.split("::");
  const a = head ? head.split(":") : [];
  const b = tail ? tail.split(":") : [];
  const groups = tail === undefined ? a : [...a, ...Array(Math.max(0, 8 - a.length - b.length)).fill("0"), ...b];
  return `${groups.slice(0, 4).join(":")}::/64`;
}

function rateLimited(ip: string) {
  const now = Date.now();
  const key = rateKey(ip);
  const recent = (hits.get(key) ?? []).filter((t) => now - t < DAY_MS);
  recent.push(now);
  hits.set(key, recent);
  /* Sans ce nettoyage, la table grossit indéfiniment sur un serveur de
     longue durée. */
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= DAY_MS)) hits.delete(k);
  }
  const lastMinute = recent.filter((t) => now - t < MINUTE_MS).length;
  return lastMinute > MAX_PER_MINUTE || recent.length > MAX_PER_DAY;
}

/* Un accusé de réception par adresse et par 24 h, au plus. La demande, elle,
   est toujours enregistrée et notifiée : seul l'accusé est retenu. Sans
   cette limite, un robot pouvait faire partir des accusés en série vers
   l'adresse d'un tiers, et épuiser le quota d'envoi de Brevo (300 par jour)
   au point de couper les notifications des vraies demandes. Même réserve
   que la limite par IP : en mémoire, par instance. */
const ackSentAt = new Map<string, number>();

function ackAllowed(email: string) {
  const now = Date.now();
  const key = email.toLowerCase();
  const last = ackSentAt.get(key);
  if (last !== undefined && now - last < DAY_MS) return false;
  ackSentAt.set(key, now);
  if (ackSentAt.size > 5000) {
    for (const [k, t] of ackSentAt) if (now - t >= DAY_MS) ackSentAt.delete(k);
  }
  return true;
}

/* L'appel vient-il du site lui-même ? Le navigateur le dit, et une page
   tierce ne peut pas le masquer : `Sec-Fetch-Site` vaut « same-origin »
   pour le formulaire du site, et `Origin` porte l'adresse de la page qui
   appelle. Sans en-tête du tout (un outil en ligne de commande), on laisse
   passer : ce n'est pas le navigateur d'un visiteur détourné, et la limite
   par IP s'applique. Les hôtes admis couvrent le domaine, l'adresse servie
   par l'hébergeur et le développement local (localhost, IP du réseau). */
function fromThisSite(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set(
    [
      request.headers.get("host"),
      request.headers.get("x-forwarded-host"),
      new URL(request.url).host,
      new URL(siteUrl).host,
    ].filter((h): h is string => Boolean(h)),
  );
  return allowed.has(originHost);
}


function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  /* Chez Netlify, `x-nf-client-connection-ip` est posé par Netlify à partir
     de la connexion elle-même. Le premier élément de `x-forwarded-for`, lui,
     peut venir du client : un robot qui l'invente à chaque envoi passerait
     sous la limite. Les deux suivants restent en repli hors Netlify. */
  const ip =
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "inconnu";

  if (!fromThisSite(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  /* Seul le formulaire du site envoie du JSON. Un formulaire HTML posé sur un
     autre site ne peut envoyer que du texte ou un formulaire classique, sans
     passer par une vérification du navigateur. ⚠ Le type est comparé EN
     ENTIER, avant le « ; » : un simple `includes` acceptait
     « text/plain; x=application/json », qu'une page tierce peut envoyer
     sans aucun contrôle du navigateur. */
  const contentType = (request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json({ error: "bad_request" }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    /* `null`, un nombre ou un tableau sont du JSON valide, mais pas une
       demande : sans ce contrôle, la lecture des champs plantait en 500. */
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("pas un objet");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  /* Un pot de miel : un champ invisible que seul un robot remplit. On répond
     200 sans rien enregistrer, pour ne pas lui apprendre qu'il a été vu.
     Son nom est NEUTRE (`hp_ref`) : l'ancien, `company_url`, pouvait être
     rempli par le remplissage automatique d'un navigateur, et la demande
     d'un vrai prospect disparaissait sans trace. La ligne de journal, sans
     aucune donnée personnelle, permet de repérer ces faux positifs. */
  if (clean(body.hp_ref, 200) !== "") {
    console.warn("[contact] Pot de miel déclenché : demande ignorée.");
    return NextResponse.json({ ok: true, notified: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const need = clean(body.need, LIMITS.need);

  const errors: string[] = [];
  if (!name) errors.push("name");
  if (!email) errors.push("email");
  /* ⚠ « email » et NON « emailInvalid » : le formulaire marque ses champs
     par leur `name`, et un nom qui n'en est pas un ne marquait rien du tout.
     L'erreur revenait du serveur et ne s'affichait nulle part. Le message
     montré, lui, s'appelle bien `errors.emailInvalid` dans les textes : ce
     sont deux choses différentes, un champ et un libellé. */
  else if (!isValidEmail(email)) errors.push("email");
  if (need.length < 10) errors.push("need");

  const website = clean(body.website, LIMITS.website);
  if (website && !isValidWebsite(website)) {
    errors.push("website");
  }

  if (errors.length) {
    return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });
  }

  /* La limite ne compte que les demandes VALIDES. Comptées dès l'arrivée,
     les envois refusés pour une faute de saisie mangeaient le quota : un
     prospect qui se trompait trois fois d'adresse recevait « trop de
     tentatives » au quatrième envoi, le bon. Un envoi invalide ne coûte
     rien, il n'est ni enregistré ni notifié. */
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
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
    locale: clean(body.locale, 5) || "fr",
  };

  const stored = await saveRequest(req);
  /* Brevo a refusé l'adresse : c'est une erreur du champ, pas du serveur.
     Le visiteur corrige son adresse au lieu de lire « erreur serveur ». */
  if (!stored.ok && stored.reason === "invalid_email") {
    return NextResponse.json({ error: "invalid", fields: ["email"] }, { status: 400 });
  }
  if (!stored.ok) {
    /* On distingue « pas configuré » de « a échoué » : le premier est un
       oubli de déploiement, le second un incident. Le visiteur reçoit un
       message différent, et dans les deux cas son texte est conservé. */
    return NextResponse.json(
      { error: stored.reason },
      { status: stored.reason === "not_configured" ? 503 : 500 },
    );
  }

  /* La demande est en sécurité. Ce qui suit ne peut plus la faire échouer.
     La notification et l'accusé de réception partent ensemble. */
  const sendAck = ackAllowed(email);
  const [notified, acknowledged] = await Promise.all([
    notifyByEmail(req),
    sendAck ? sendAcknowledgement(req) : Promise.resolve(true),
  ]);
  if (!sendAck) {
    console.warn(`[contact] Accusé déjà envoyé à cette adresse dans les 24 h, non renvoyé : ${req.receivedAt}`);
  } else if (!acknowledged) {
    console.error(`[contact] Accusé de réception NON envoyé : ${req.receivedAt}`);
  }
  if (!notified) {
    console.error(
      `[contact] Demande ENREGISTRÉE (${stored.backend}) mais NON notifiée. À relire dans le dépôt : ${req.receivedAt}`,
    );
  }

  return NextResponse.json({ ok: true, notified });
}

/** Permet à la page de savoir, au chargement, si l'envoi est possible. */
export async function GET() {
  return NextResponse.json({ configured: storeReady() });
}
