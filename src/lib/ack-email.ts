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
 * images en adresse complète.
 *
 * LA SIGNATURE EST EN TEXTE (décision d'Antonino du 14/11/2026), et non plus
 * une seule image comme avant : elle reste lisible quand une messagerie
 * bloque les images, chaque coordonnée est cliquable, et un changement de
 * texte ne demande plus de refaire une image. Seul le petit symbole de Synode
 * est une image, purement décorative. La MÊME signature sert dans Gmail : elle
 * est exportée (`SIGNATURE`) pour produire la page à copier-coller.
 *
 * ⚠ Le symbole est servi par le site en ligne (`/synode-mark.png`, déjà
 * déployé). Toute retouche de ce fichier coûte un déploiement, soit 15
 * crédits Netlify. Les anciennes images `public/email/signature-*.png` ne sont
 * plus utilisées ici : elles sont gardées tant que la signature Gmail n'a pas
 * été remplacée, au cas où elle pointerait encore vers elles.
 */

const SITE = "https://synode-agency.com";

const BLUE = "#2F69DE";
const INK = "#2E2E2E";
/* Le gris de la mention, repris de l'ancienne image de signature. */
const MUTED = "#8A8F98";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/* Le symbole fait 320 × 320 avec un fond transparent : affiché à 44px, il
   reste net sur les écrans haute densité. */
const MARK = `${SITE}/synode-mark.png`;
const MARK_SIZE = 44;

const PHONE = "+32 (0) 487 30 18 90";
const PHONE_LINK = "tel:+32487301890";
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
  /* Le slogan de la signature : en clair pour la version texte, avec ses
     mots en gras pour la version HTML. */
  tagline: string;
  taglineHtml: string;
  agency: string;
  siteUrl: string;
};

const COPY: Record<"fr" | "en", Copy> = {
  fr: {
    lang: "fr",
    subject: "Nous avons bien reçu votre demande",
    hello: "Bonjour,",
    received: "Merci pour votre message. Il nous est bien parvenu et nous revenons vers vous.",
    urgent: "Si votre demande est urgente, vous pouvez réserver directement un échange de 30 minutes :",
    button: "Réserver un créneau",
    bookingUrl: `${SITE}/contact#reservation`,
    reply: "Pour compléter votre demande, répondez simplement à cet email.",
    closing: "Cordialement,",
    team: "L’équipe Synode",
    tagline: "Des solutions sur mesure, avec l’IA intégrée.",
    taglineHtml: `Des solutions <b style="font-weight:700;color:${BLUE};">sur mesure</b>,<br>avec <b style="font-weight:700;">l’IA intégrée</b>.`,
    agency: "Entreprise technologique · Belgique",
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
    tagline: "Custom solutions, with built-in AI.",
    taglineHtml: `<b style="font-weight:700;color:${BLUE};">Custom</b> solutions,<br>with <b style="font-weight:700;">built-in AI</b>.`,
    agency: "Technology company · Belgium",
    siteUrl: `${SITE}/en`,
  },
};

function text(c: Copy): string {
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
    c.tagline,
    `Synode · ${c.agency}`,
    `${PHONE} · ${EMAIL} · synode-agency.com`,
  ].join("\n");
}

function paragraph(content: string, bottom = 16): string {
  return `<p style="margin:0 0 ${bottom}px 0;font-family:${FONT};font-size:15px;line-height:24px;color:${INK};">${content}</p>`;
}

/* Même composition que l'ancienne image : le symbole, un filet bleu, puis le
   slogan, « Synode » et sa mention, et les coordonnées. En tableau et en
   styles en ligne, la seule forme que Gmail et Outlook rendent fidèlement. */
function signature(c: Copy): string {
  /* Sur un téléphone, la ligne ne se coupe qu'ENTRE deux éléments, jamais
     au milieu d'un : sans ce verrou, l'adresse e-mail se coupait à son
     tiret (« contact@synode- » puis « agency.com »). La seule espace
     sécable est celle qui suit le point de séparation. */
  const nowrap = (s: string) => `<span style="white-space:nowrap;">${s}</span>`;
  const dot = `<span style="color:${MUTED};">&nbsp;&nbsp;·&nbsp;</span> `;
  const link = (href: string, label: string, color = INK, weight = 400) =>
    nowrap(`<a href="${href}" style="color:${color};font-weight:${weight};text-decoration:none;">${label}</a>`);
  const agency = c.agency.toUpperCase().split(" · ").map(nowrap).join(" · ");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td valign="middle" style="padding:0 16px 0 0;">
      <a href="${c.siteUrl}" style="text-decoration:none;"><img src="${MARK}" width="${MARK_SIZE}" height="${MARK_SIZE}" alt="" style="display:block;border:0;outline:none;width:${MARK_SIZE}px;height:${MARK_SIZE}px;"></a>
    </td>
    <td valign="middle" style="padding:2px 0 2px 16px;border-left:3px solid ${BLUE};">
      <p style="margin:0 0 10px 0;font-family:${FONT};font-size:17px;line-height:23px;color:${INK};">${c.taglineHtml}</p>
      <p style="margin:0 0 6px 0;font-family:${FONT};font-size:15px;line-height:20px;color:${INK};"><b style="font-weight:700;">Synode</b>&nbsp;&nbsp; <span style="font-size:11px;letter-spacing:2px;color:${MUTED};">${agency}</span></p>
      <p style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;color:${INK};">${link(PHONE_LINK, PHONE)}${dot}${link(`mailto:${EMAIL}`, EMAIL)}${dot}${link(c.siteUrl, "synode-agency.com", BLUE, 700)}</p>
    </td>
  </tr>
</table>`;
}

/* La signature seule, pour produire la page à copier-coller dans Gmail. */
export const SIGNATURE = { fr: signature(COPY.fr), en: signature(COPY.en) } as const;

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
            ${paragraph(`${c.closing}<br>${c.team}`, 24)}
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
