import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  offer?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const offer = (body.offer ?? "").trim();
  const budget = (body.budget ?? "").trim();
  const timeline = (body.timeline ?? "").trim();
  const message = (body.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "required";
  if (!email) fieldErrors.email = "required";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "invalid";
  if (message.length < 10) fieldErrors.message = "too_short";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: "validation", fieldErrors }, { status: 422 });
  }

  // TODO(Synode): brancher l'envoi réel ici.
  // Options : e-mail transactionnel (Resend), création d'un lead dans le CRM,
  // notification Slack/Telegram, ou insertion en base.
  // Pour l'instant on se contente de logger côté serveur.
  console.info("[audit] nouvelle demande", {
    name,
    email,
    company: company || "—",
    offer: offer || "—",
    budget: budget || "—",
    timeline: timeline || "—",
    locale: (body.locale ?? "fr").trim() || "fr",
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
