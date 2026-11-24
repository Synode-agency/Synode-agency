import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Hero } from "@/components/site/hero";
import { Booking } from "@/components/site/booking";
import { ContactForm } from "@/components/site/contact-form";
import { renderLines } from "@/lib/lines";
import { ANCHORS, bookingAnchor, getContent, type Locale } from "@/content";

/**
 * LA PAGE CONTACT (brief de la refonte, 6.5).
 *
 * Le calendrier d'abord, dans le hero : c'est la seule action du site, et
 * c'est la seule page où Cal.com existe (il n'est chargé qu'au clic). Puis,
 * pour qui préfère écrire, l'adresse et un formulaire à trois champs. Puis
 * ce qui se passe ensuite.
 *
 * ⚠ L'ancre du calendrier (`#reserver`, `#book` en anglais) est citée par
 * le bouton principal de TOUTES les pages : elle reste sur le calendrier.
 */
export function ContactPage({ locale }: { locale: Locale }) {
  const { contact, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Hero
        locale={locale}
        className="contact-hero"
        eyebrow={contact.hero.eyebrow}
        title={renderLines(contact.hero.title, contact.hero.accents, "title-accent")}
        subtitle={contact.hero.text}
        aside={
          <div id={bookingAnchor(locale)} className="cta-booking-calendar">
            <Booking locale={locale} copy={contact.booking} variant="card" />
          </div>
        }
      />

      <Band id={ANCHORS.form} className="rf-section">
        <div className="rf-split contact-write">
          <div>
            <Lede title={contact.write.title} />
            <p className="contact-write-text">
              {contact.write.text}{" "}
              <a className="contact-mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              {contact.write.or}
            </p>
            {/* Vide tant que Synode n'a pas fixé un délai tenable. */}
            {contact.write.replyDelay && <p className="rf-note">{contact.write.replyDelay}</p>}
          </div>
          <div className="contact-form-card">
            <ContactForm locale={locale} form={contact.form} />
          </div>
        </div>
      </Band>

      <Band id="ensuite" className="rf-section">
        <Lede title={contact.next.title} />
        <ol className="steps-list section-gap-sm">
          {contact.next.items.map((item, i) => (
            <li key={item}>
              <span className="steps-rank" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>
                <strong>{item}</strong>
              </p>
            </li>
          ))}
        </ol>
      </Band>
    </Shell>
  );
}
