import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Panel, Shell } from "@/components/site/shell";
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
      <Panel id="top" tone="brand">
        <Lede as="h1" title={thanks.title} text={thanks.text} align="center" />
        <p className="thanks-note">{thanks.notBooked}</p>
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary cta-primary">
            {thanks.bookCta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={homePath(locale)} className="btn btn--ghost">
            {thanks.homeCta}
          </Link>
        </div>
      </Panel>
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
      <Panel id="top">
        <Lede as="h1" title={notice ? legal.noticeTitle : legal.privacyTitle} />

        <div className="todo section-gap">
          <span className="todo-label">{legal.draftLabel}</span>
          <p>{legal.draftText}</p>
        </div>
      </Panel>

      <Panel tone="quiet">
        {notice ? <NoticeBody locale={locale} email={site.email} /> : <PrivacyBody locale={locale} email={site.email} />}
        <p className="legal-updated section-gap">
          {legal.updated} : {fr ? "28 septembre 2026" : "28 September 2026"}
        </p>
      </Panel>
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
      <p className="legal-gap">
        <strong>{fr ? "À compléter :" : "To complete:"}</strong>{" "}
        {fr
          ? "nom et adresse de l’hébergeur retenu, une fois le déploiement décidé."
          : "name and address of the chosen host, once deployment is decided."}
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
          ? "Les demandes sont enregistrées par le site, puis une notification nous est envoyée par email. Le service d’envoi utilisé est Resend. Si vous réservez un créneau, la réservation est traitée par Cal.com, qui vous demandera ses propres informations."
          : "Requests are recorded by the site, then an email notification is sent to us. The sending service is Resend. If you book a slot, the booking is handled by Cal.com, which will ask for its own details."}
      </p>
      <p className="legal-gap">
        <strong>{fr ? "À compléter :" : "To complete:"}</strong>{" "}
        {fr
          ? "cette liste doit correspondre exactement aux prestataires réellement branchés au moment de la mise en ligne. Si le dépôt des demandes change, cette page change avec."
          : "this list must match exactly the providers actually connected at launch. If the request store changes, this page changes with it."}
      </p>

      <h2>{fr ? "Combien de temps" : "How long"}</h2>
      <p className="legal-gap">
        <strong>{fr ? "À compléter :" : "To complete:"}</strong>{" "}
        {fr
          ? "durée de conservation à décider, puis à annoncer ici. Ne pas publier de durée qui ne serait pas réellement appliquée."
          : "a retention period to decide, then state here. Do not publish a period that is not actually applied."}
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
          ? "Ce site ne dépose aucun cookie de mesure ni de publicité. Le calendrier de réservation est un service tiers : il n’est chargé qu’au moment où vous cliquez pour l’ouvrir, et jamais avant."
          : "This site sets no analytics or advertising cookies. The booking calendar is a third-party service: it is only loaded when you click to open it, never before."}
      </p>
    </div>
  );
}

/** La page 404. Elle propose une sortie plutôt que de constater l'échec. */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Panel id="top">
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
      </Panel>
    </Shell>
  );
}
