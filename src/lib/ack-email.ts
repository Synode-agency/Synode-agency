/**
 * L'ACCUSÉ DE RÉCEPTION ENVOYÉ AU PROSPECT, EN TEXTE ET EN HTML.
 *
 * ⚠ RÈGLE ABSOLUE : CE FICHIER NE CONTIENT QUE DU TEXTE FIXE. Rien de ce que
 * le visiteur a tapé (nom, message, entreprise…) ne doit jamais y entrer. Le
 * formulaire est public : n'importe qui peut y saisir l'adresse d'un tiers.
 * Si l'email reprenait le nom ou le message, il deviendrait un relais pour
 * envoyer, depuis notre domaine, un texte choisi par un inconnu. Voir
 * `sendAcknowledgement` dans `contact-store.ts`.
 *
 * Le HTML suit les règles des messageries, très en retard sur les
 * navigateurs : mise en page en tableaux, styles en ligne, polices système,
 * images en adresse complète. La signature reprend la maquette d'Antonino du
 * 12/11/2026.
 *
 * ⚠ Les images sont servies par le site en ligne (`public/email/`) : elles ne
 * s'affichent qu'une fois déployées. Changer un texte ici demande un
 * déploiement, donc 15 crédits Netlify.
 */

const SITE = "https://synode-agency.com";

/* Couleurs relevées sur la maquette de la signature. */
const BLUE = "#2F69DE";
const INK = "#2E2E2E";
const GREY = "#8B8F97";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const PHONE_LABEL = "+32 (0) 487 30 18 90";
const PHONE_HREF = "tel:+32487301890";
const EMAIL = "contact@synode-agency.com";

type Copy = {
  lang: "fr" | "en";
  subject: string;
  hello: string;
  received: string;
  urgent: string;
  button: string;
  bookingUrl: string;
  reply: string;
  closing: string;
  team: string;
  /* Le slogan, en deux lignes, avec un mot en bleu et un en gras. */
  tagline: [before: string, blue: string, after: string, before2: string, bold: string, after2: string];
  agency: string;
  siteUrl: string;
};

const COPY: Record<"fr" | "en", Copy> = {
  fr: {
    lang: "fr",
    subject: "Nous avons bien reçu votre demande",
    hello: "Bonjour,",
    received: "Merci pour votre message. Il nous est bien parvenu et nous revenons vers vous.",
    urgent: "Si votre demande est urgente, vous pouvez réserver directement un échange de 30 minutes :",
    button: "Réserver un créneau",
    bookingUrl: `${SITE}/contact#reservation`,
    reply: "Pour compléter votre demande, répondez simplement à cet email.",
    closing: "Cordialement,",
    team: "L’équipe Synode",
    tagline: ["Des solutions IA ", "sur mesure", ",", "pensées pour ", "votre activité", "."],
    agency: "Agence IA · Belgique",
    siteUrl: SITE,
  },
  en: {
    lang: "en",
    subject: "We have received your request",
    hello: "Hello,",
    received: "Thank you for your message. It has reached us and we will get back to you.",
    urgent: "If your request is urgent, you can book a 30-minute call directly:",
    button: "Book a call",
    bookingUrl: `${SITE}/en/contact#reservation`,
    reply: "To add anything to your request, simply reply to this email.",
    closing: "Best regards,",
    team: "The Synode team",
    tagline: ["", "Custom", " AI solutions,", "built around ", "your business", "."],
    agency: "AI agency · Belgium",
    siteUrl: `${SITE}/en`,
  },
};

function text(c: Copy): string {
  const [b1, blue, a1, b2, bold, a2] = c.tagline;
  return [
    c.hello,
    "",
    c.received,
    "",
    c.urgent,
    c.bookingUrl,
    "",
    c.reply,
    "",
    c.closing,
    c.team,
    "",
    "--",
    `${b1}${blue}${a1} ${b2}${bold}${a2}`,
    `Synode · ${c.agency}`,
    `${PHONE_LABEL} · ${EMAIL} · synode-agency.com`,
  ].join("\n");
}

function paragraph(content: string, bottom = 16): string {
  return `<p style="margin:0 0 ${bottom}px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${INK};">${content}</p>`;
}

function signature(c: Copy): string {
  const [b1, blue, a1, b2, bold, a2] = c.tagline;
  const dot = `<span class="sig-dot" style="color:#C5C8CE;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>`;
  const link = (href: string, label: string, style: string) =>
    `<a href="${href}" style="${style}text-decoration:none;">${label}</a>`;

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td valign="middle" style="padding:0;">
      <img class="sig-mark" src="${SITE}/email/synode-mark.png" width="46" height="60" alt="Synode" style="display:block;border:0;outline:none;width:46px;height:60px;">
    </td>
    <td class="sig-gap" width="26" style="width:26px;font-size:0;line-height:0;">&nbsp;</td>
    <td width="3" style="width:3px;background:${BLUE};font-size:0;line-height:0;">&nbsp;</td>
    <td class="sig-gap" width="28" style="width:28px;font-size:0;line-height:0;">&nbsp;</td>
    <td valign="middle" style="padding:0;">
      <p class="sig-tag" style="margin:0;font-family:${FONT};font-size:19px;line-height:27px;font-weight:300;color:${INK};">${b1}<strong style="font-weight:700;color:${BLUE};">${blue}</strong>${a1}<br>${b2}<strong style="font-weight:700;color:${INK};">${bold}</strong>${a2}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:14px;">
        <tr>
          <td valign="middle" style="padding:0 12px 0 0;">
            <img src="${SITE}/email/synode-wordmark.png" width="58" height="17" alt="Synode" style="display:block;border:0;outline:none;width:58px;height:17px;">
          </td>
          <td valign="middle" style="padding:0;font-family:${FONT};font-size:11px;line-height:17px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${GREY};">${c.agency}</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="4" style="font-size:0;line-height:0;">&nbsp;</td>
    <td style="padding:16px 0 0 0;font-family:${FONT};font-size:14px;line-height:22px;color:${INK};">
      <span class="sig-item">${link(PHONE_HREF, PHONE_LABEL, `color:${INK};`)}</span>${dot}<span class="sig-item">${link(`mailto:${EMAIL}`, EMAIL, `color:${INK};`)}</span>${dot}<span class="sig-item">${link(c.siteUrl, "synode-agency.com", `color:${BLUE};font-weight:700;`)}</span>
    </td>
  </tr>
</table>`;
}

function html(c: Copy): string {
  const button = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin:0 0 20px 0;">
  <tr>
    <td bgcolor="${BLUE}" style="background:${BLUE};border-radius:6px;">
      <a href="${c.bookingUrl}" style="display:inline-block;padding:11px 20px;font-family:${FONT};font-size:15px;line-height:20px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:6px;">${c.button}</a>
    </td>
  </tr>
</table>`;

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${c.subject}</title>
<style>
  @media (max-width: 480px) {
    .sig-gap { width: 14px !important; }
    .sig-mark { width: 36px !important; height: 47px !important; }
    .sig-tag { font-size: 16px !important; line-height: 23px !important; }
    .sig-item { display: block !important; }
    .sig-dot { display: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#FFFFFF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#FFFFFF;">
  <tr>
    <td align="center" style="padding:28px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:600px;">
        <tr>
          <td style="padding:0;">
            ${paragraph(c.hello)}
            ${paragraph(c.received)}
            ${paragraph(c.urgent, 14)}
            ${button}
            ${paragraph(c.reply, 24)}
            ${paragraph(`${c.closing}<br>${c.team}`, 36)}
            ${signature(c)}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export const ACK = {
  fr: { subject: COPY.fr.subject, text: text(COPY.fr), html: html(COPY.fr) },
  en: { subject: COPY.en.subject, text: text(COPY.en), html: html(COPY.en) },
} as const;
