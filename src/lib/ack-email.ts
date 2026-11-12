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
 * LA SIGNATURE EST UNE SEULE IMAGE, comme dans le Gmail de Synode (décision
 * d'Antonino du 12/11/2026) : `public/email/signature-fr.png` est son image
 * telle quelle, `signature-en.png` la même avec le slogan et « AI agency ·
 * Belgium » en anglais. Pour la changer : remplacer ces deux fichiers (même
 * format, 1178 × 316), puis déployer. Revers assumé : une messagerie qui
 * bloque les images affiche à la place le texte de `alt`, et seul le site est
 * cliquable. La version texte de l'email garde la signature complète.
 *
 * ⚠ Les images sont servies par le site en ligne : elles ne s'affichent
 * qu'une fois déployées. Toute retouche ici coûte un déploiement, soit 15
 * crédits Netlify.
 */

const SITE = "https://synode-agency.com";

const BLUE = "#2F69DE";
const INK = "#2E2E2E";
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/* Taille d'affichage de l'image de signature, proche de « Grande » dans
   Gmail. L'image fait 1178 × 316 : on peut l'afficher plus petite sans flou,
   pas beaucoup plus grande. */
const SIG_WIDTH = 440;
const SIG_HEIGHT = Math.round((SIG_WIDTH * 316) / 1178);

const PHONE = "+32 (0) 487 30 18 90";
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
  /* Le texte de l'image de signature, pour la version texte et pour `alt`. */
  tagline: string;
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
    tagline: "Des solutions IA sur mesure, pensées pour votre activité.",
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
    tagline: "Custom AI solutions, built around your business.",
    agency: "AI agency · Belgium",
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

function signature(c: Copy): string {
  const alt = `Synode · ${c.agency} · ${PHONE} · ${EMAIL}`;
  return `<a href="${c.siteUrl}" style="text-decoration:none;"><img src="${SITE}/email/signature-${c.lang}.png" width="${SIG_WIDTH}" height="${SIG_HEIGHT}" alt="${alt}" style="display:block;border:0;outline:none;width:${SIG_WIDTH}px;max-width:100%;height:auto;font-family:${FONT};font-size:13px;color:${INK};"></a>`;
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
