import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { ContactHeroDoors } from "@/components/site/hero-asides";
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
      <PageHero
        title={locale === "fr" ? <>Parlons de votre <span>projet IA</span></> : <>Let’s discuss your <span>AI project</span></>}
        aside={<ContactHeroDoors locale={locale} />}
      >
        <p>{contact.text}</p>
        <div className="btn-row">
          {/* Les libellés restent courts : les titres complets sont déjà les
              H2 des deux sections visées, et les répéter trois fois sur la
              page n'aide ni le lecteur ni l'indexation. */}
          <Link href={`#${ANCHORS.booking}`} className="btn btn--primary">{site.ctaShort}<ArrowRight aria-hidden /></Link>
          <Link href={`#${ANCHORS.form}`} className="btn btn--ghost">{locale === "fr" ? "Écrire à l’équipe" : "Write to the team"}</Link>
        </div>
      </PageHero>

      <Band id={ANCHORS.booking} tone="white">
        <Lede title={contact.booking.title} text={contact.booking.text} />
        <div className="section-gap">
          <Booking locale={locale} />
        </div>
      </Band>

      <Band id={ANCHORS.form} tone="base">
        <Lede title={contact.form.title} text={contact.form.text} />
        <div className="section-gap">
          {/* `useSearchParams` impose une frontière de Suspense : sans elle,
              toute la page basculerait en rendu dynamique. */}
          <Suspense fallback={<div className="form-skeleton" aria-hidden />}>
            <ContactForm locale={locale} />
          </Suspense>
        </div>
      </Band>

      <Band id="direct" tone="white">
        <Lede title={contact.direct.title} />
        <p className="prose-body section-gap-sm">
          {contact.direct.emailLabel} :{" "}
          <a href={`mailto:${site.email}`} className="go">
            {site.email}
          </a>
        </p>
      </Band>
    </Shell>
  );
}
