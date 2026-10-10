import { Suspense } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { Booking } from "@/components/site/booking";
import { ContactForm } from "@/components/site/contact-form";
import { ANCHORS, getContent, type Locale } from "@/lib/content";

/**
 * La page Contact.
 *
 * Les deux chemins restent INDÉPENDANTS et de même rang : réserver un
 * créneau, ou écrire. Rien n'oblige à remplir le formulaire pour accéder au
 * calendrier, et l'architecture y tient parce que c'est exactement la
 * friction qui fait partir un visiteur pressé.
 *
 * Le calendrier est maintenant DANS le hero, à droite du texte : c'est le
 * premier chemin, et il n'a plus besoin d'une section à lui.
 *
 * ⚠ L'ancre `#reservation` est citée depuis TOUT le site — les CTA des six
 * pages services, l'accueil, Solutions, Réalisations, Équipe. Elle a suivi
 * le calendrier dans le hero : la retirer casserait une vingtaine de liens.
 */
export function ContactPage({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);

  return (
    <Shell locale={locale}>
      <PageHero
        title={locale === "fr" ? <>Parlons de votre <span>projet IA</span></> : <>Let’s discuss your <span>AI project</span></>}
        aside={
          /* Le calendrier porte l'ancre : les liens du site arrivent donc
             directement sur lui. `cta-booking-calendar` lui donne sa marge
             de défilement sous l'en-tête fixe. */
          <div id={ANCHORS.booking} className="cta-booking-calendar">
            <Booking locale={locale} variant="card" />
          </div>
        }
      >
        <p>{contact.text}</p>
        <div className="btn-row">
          {/* Une seule action : le calendrier est déjà à côté, un bouton qui
              y mène ne mènerait nulle part. La flèche descend parce que le
              formulaire est plus bas sur la même page. */}
          <Link href={`#${ANCHORS.form}`} className="btn btn--ghost">{locale === "fr" ? "Écrire à l’équipe" : "Write to the team"}<ArrowDown aria-hidden /></Link>
        </div>
      </PageHero>

      {/* ⚠ Le ton est explicite : le thème peint les bandes selon leur RANG,
          et cette bande est la deuxième, donc elle serait blanche. Une carte
          blanche sur fond blanc ne se verrait pas. */}
      <Band id={ANCHORS.form} tone="base" className="tint-band">
        <Lede title={contact.form.title} text={contact.form.text} />
        <div className="section-gap contact-form-card">
          {/* `useSearchParams` impose une frontière de Suspense : sans elle,
              toute la page basculerait en rendu dynamique. */}
          <Suspense fallback={<div className="form-skeleton" aria-hidden />}>
            <ContactForm locale={locale} />
          </Suspense>
        </div>
      </Band>
    </Shell>
  );
}
