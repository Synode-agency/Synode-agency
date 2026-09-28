import { Suspense } from "react";
import { Panel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Booking } from "@/components/site/booking";
import { ContactForm } from "@/components/site/contact-form";
import { ANCHORS, getContent, type Locale } from "@/lib/content";

/**
 * La page Contact.
 *
 * Les deux chemins sont INDÉPENDANTS et de même rang : réserver un créneau,
 * ou écrire. Rien n'oblige à remplir le formulaire pour accéder au
 * calendrier, et l'architecture y tient parce que c'est exactement la
 * friction qui fait partir un visiteur pressé.
 *
 * Chacun a son ancre, citée depuis toute la navigation du site.
 */
export function ContactPage({ locale }: { locale: Locale }) {
  const { contact, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Panel id="top">
        <Lede as="h1" kicker={contact.kicker} title={contact.title} text={contact.text} />
      </Panel>

      <Panel id={ANCHORS.booking} tone="quiet">
        <Lede title={contact.booking.title} text={contact.booking.text} />
        <div className="section-gap">
          <Booking locale={locale} />
        </div>
      </Panel>

      <Panel id={ANCHORS.form}>
        <Lede title={contact.form.title} text={contact.form.text} />
        <div className="section-gap">
          {/* `useSearchParams` impose une frontière de Suspense : sans elle,
              toute la page basculerait en rendu dynamique. */}
          <Suspense fallback={<div className="form-skeleton" aria-hidden />}>
            <ContactForm locale={locale} />
          </Suspense>
        </div>
      </Panel>

      <Panel id="direct" tone="quiet">
        <Lede title={contact.direct.title} />
        <p className="prose-body section-gap-sm">
          {contact.direct.emailLabel} :{" "}
          <a href={`mailto:${site.email}`} className="go">
            {site.email}
          </a>
        </p>
      </Panel>
    </Shell>
  );
}
