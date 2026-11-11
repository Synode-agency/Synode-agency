import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, homePath, path, type Locale } from "@/lib/content";

/**
 * La confirmation d'envoi.
 *
 * Elle n'est atteinte qu'APRÈS un enregistrement réussi : le formulaire n'y
 * redirige que sur une réponse `ok` du serveur. Elle dit aussi, explicitement,
 * qu'un message n'est pas un rendez-vous — c'est la confusion la plus
 * fréquente sur ce genre de page.
 *
 * Aucun délai de réponse n'est promis : la référence l'interdit tant qu'il
 * n'est pas tenable.
 */
export function ThanksPage({ locale }: { locale: Locale }) {
  const { thanks } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;

  return (
    <Shell locale={locale}>
      {/* ⚠ La bande est bleu nuit parce qu'elle est la PREMIÈRE section de la
          page, pas à cause de son `tone` : le thème peint par rang. D'où
          `thanks-band`, qui lui donne le bleu clair des mots peints des
          heros — le bleu de marque n'y tiendrait que 2,9:1. */}
      <Band id="top" tone="blue" className="thanks-band">
        <Lede as="h1" title={thanks.title} accents={["message"]} text={thanks.text} align="center" />
        <p className="thanks-note">{thanks.notBooked}</p>
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary">
            {thanks.bookCta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={homePath(locale)} className="btn btn--ghost">
            {thanks.homeCta}
          </Link>
        </div>
      </Band>
    </Shell>
  );
}

/**
 * Les pages légales.
 *
 * Elles sont des BROUILLONS, et elles le disent en haut de page. Publier des
 * mentions légales incomplètes sans le signaler est pire que ne pas les
 * publier : un visiteur les lit comme des informations vérifiées.
 *
 * ⚠ Rien ici n'est inventé : ni numéro d'entreprise, ni adresse, ni forme
 * juridique. Le montage passe par SmartBE et les mentions exactes doivent
 * être confirmées avec eux. Voir `docs/SITE_A_COMPLETER.md`.
 */
export function LegalPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "notice" | "privacy";
}) {
  const { legal, site } = getContent(locale);
  const fr = locale === "fr";
  const notice = kind === "notice";

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" title={notice ? legal.noticeTitle : legal.privacyTitle} />

        <div className="todo section-gap">
          <span className="todo-label">{legal.draftLabel}</span>
          <p>{legal.draftText}</p>
        </div>
      </Band>

      <Band tone="white">
        {notice ? <NoticeBody locale={locale} email={site.email} /> : <PrivacyBody locale={locale} email={site.email} />}
        <p className="legal-updated section-gap">
          {legal.updated} : {fr ? "28 septembre 2026" : "28 September 2026"}
        </p>
      </Band>
    </Shell>
  );
}

function NoticeBody({ locale, email }: { locale: Locale; email: string }) {
  const fr = locale === "fr";
  return (
    <div className="legal-body">
      <h2>{fr ? "Éditeur du site" : "Site publisher"}</h2>
      <p>
        {fr
          ? "Synode est le nom commercial utilisé pour présenter cette activité. Les documents contractuels et de facturation reprennent les identités et mentions validées avec SmartBE."
          : "Synode is the trading name used to present this activity. Contracts and invoices carry the identities and details agreed with SmartBE."}
      </p>
      <p className="legal-gap">
        <strong>{fr ? "À compléter :" : "To complete:"}</strong>{" "}
        {fr
          ? "identité juridique exacte, adresse du siège, numéro d’entreprise et numéro de TVA, tels que confirmés avec SmartBE. Aucune de ces informations n’est reprise ici tant qu’elle n’est pas vérifiée."
          : "exact legal identity, registered address, company number and VAT number, as confirmed with SmartBE. None of it appears here until it is verified."}
      </p>

      <h2>{fr ? "Contact" : "Contact"}</h2>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>

      <h2>{fr ? "Hébergement" : "Hosting"}</h2>
      <p>
        {fr ? "Le site est hébergé par " : "This website is hosted by "}
        Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, {fr ? "États-Unis" : "United States"}.{" "}
        <a href="https://www.netlify.com" rel="noopener noreferrer">netlify.com</a>
      </p>

      <h2>{fr ? "Propriété intellectuelle" : "Intellectual property"}</h2>
      <p>
        {fr
          ? "Les textes, visuels et éléments d’interface de ce site sont la propriété de leurs auteurs. Toute reproduction sans autorisation est interdite."
          : "The text, images and interface elements on this site belong to their authors. Reproduction without permission is not allowed."}
      </p>
    </div>
  );
}

function PrivacyBody({ locale, email }: { locale: Locale; email: string }) {
  const fr = locale === "fr";
  return (
    <div className="legal-body">
      <h2>{fr ? "Ce que nous collectons" : "What we collect"}</h2>
      <p>
        {fr
          ? "Uniquement ce que vous nous transmettez volontairement par le formulaire de contact : votre nom, votre email et la description de votre besoin, ainsi que les champs facultatifs que vous choisissez de remplir."
          : "Only what you send us through the contact form: your name, your email and the description of your need, plus any optional fields you choose to fill in."}
      </p>

      <h2>{fr ? "Pourquoi" : "Why"}</h2>
      <p>
        {fr
          ? "Pour répondre à votre demande et préparer un premier échange. Rien d’autre. Nous n’envoyons pas de newsletter, nous ne revendons aucune donnée et nous ne faisons pas de prospection automatisée à partir de ces informations."
          : "To answer your request and prepare a first call. Nothing else. We send no newsletter, we resell nothing, and we run no automated prospecting from this information."}
      </p>

      <h2>{fr ? "Qui les traite" : "Who processes it"}</h2>
      <p>
        {fr
          ? "Votre demande est enregistrée dans notre compte Brevo, un prestataire européen, dans une liste réservée aux demandes de contact. Brevo nous envoie la notification de votre demande et vous envoie l’accusé de réception. Vous n’êtes inscrit à aucune newsletter. Si vous réservez un créneau, la réservation est traitée par Cal.com, qui vous demandera ses propres informations."
          : "Your request is recorded in our Brevo account, a European provider, in a list kept for contact requests only. Brevo sends us the notification of your request and sends you the acknowledgement. You are not subscribed to any newsletter. If you book a slot, the booking is handled by Cal.com, which will ask for its own details."}
      </p>
      {/* ⚠ Cette liste doit toujours correspondre aux prestataires
          réellement branchés : un changement d'hébergeur change ce
          paragraphe. */}
      <p>
        {fr
          ? "Le site est hébergé par Netlify, Inc., aux États-Unis. Pour servir les pages et transmettre votre demande, Netlify traite les données techniques de connexion, dont votre adresse IP. Netlify adhère au Data Privacy Framework UE–États-Unis, qui encadre ce transfert."
          : "This website is hosted by Netlify, Inc., in the United States. To serve the pages and pass on your request, Netlify processes technical connection data, including your IP address. Netlify takes part in the EU–U.S. Data Privacy Framework, which governs this transfer."}
      </p>

      <h2>{fr ? "Combien de temps" : "How long"}</h2>
      {/* ⚠ Une durée publiée doit être APPLIQUÉE : les contacts de la liste
          « Demandes Synode » sont à supprimer dans Brevo 12 mois après le
          dernier échange. Décidé avec Antonino le 11/11/2026. */}
      <p>
        {fr
          ? "Votre demande est conservée 12 mois après notre dernier échange, puis supprimée."
          : "Your request is kept for 12 months after our last exchange, then deleted."}
      </p>

      <h2>{fr ? "Vos droits" : "Your rights"}</h2>
      <p>
        {fr
          ? "Vous pouvez demander à consulter, corriger ou supprimer les informations que vous nous avez transmises. Écrivez-nous à "
          : "You can ask to see, correct or delete the information you sent us. Write to us at "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>{fr ? "Cookies" : "Cookies"}</h2>
      <p>
        {fr
          ? "Ce site ne dépose aucun cookie. Le calendrier de réservation est fourni par Cal.com : il n’est chargé qu’au moment où vous cliquez pour l’ouvrir, et jamais avant. Une fois ouvert, Cal.com peut utiliser ses propres cookies, régis par sa politique de confidentialité."
          : "This site sets no cookies. The booking calendar is provided by Cal.com: it is only loaded when you click to open it, never before. Once open, Cal.com may use its own cookies, governed by its privacy policy."}
      </p>
    </div>
  );
}

/** La page 404. Elle propose une sortie plutôt que de constater l'échec. */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" title={notFound.title} text={notFound.text} />
        <ul className="rows section-gap">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={path(locale, item.href)} className="row">
                <span className="row-title">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={homePath(locale)} className="go section-gap-sm">
          {notFound.homeCta}
          <ArrowRight aria-hidden />
        </Link>
      </Band>
    </Shell>
  );
}
