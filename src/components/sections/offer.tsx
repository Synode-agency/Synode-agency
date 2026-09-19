import { SectionHeading } from "@/components/site/section-heading";
import { OfferCard } from "@/components/site/offer-card";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Offer section, wrapped in a deep-blue card the same shape as the hero's.
 *
 * The site is otherwise almost entirely white; this panel is what breaks it
 * up. `.offer-panel` re-declares the palette tokens for everything inside,
 * so the heading and the body text turn white without a single per-element
 * override, and `.offer-paper` on each card puts the light palette back.
 *
 * The first two cards are the agency's core, side by side. The third, web
 * and mobile, runs full width underneath in a quieter format: it is a
 * service taken on when a client asks, not one of the two we lead with.
 */
export function Offer({ locale }: { locale: Locale }) {
  const { offer } = getContent(locale);
  const [...leadCards] = offer.cards.slice(0, 2);
  const supportCard = offer.cards[2];
  const contactHref = path(locale, "/contact");

  return (
    <section
      id="offre"
      className="relative px-[var(--page-gutter)] py-[var(--page-gutter)]"
    >
      <div className="offer-panel section-screen overflow-hidden rounded-[clamp(1.25rem,1vw+1rem,2rem)]">
        <div className="container-page">
          <SectionHeading
            eyebrow={offer.eyebrow}
            title={offer.title}
            subtitle={offer.subtitle}
            subtitleNote={offer.subtitleNote}
          />

          <div className="mt-[calc(var(--ss)*clamp(2rem,1.6rem+2vw,3.75rem))] grid gap-[clamp(1.25rem,1rem+1.5vw,2.5rem)] lg:grid-cols-2">
            {leadCards.map((card, i) => (
              <OfferCard
                key={card.number}
                delay={i * 90}
                number={card.number}
                title={card.title}
                forWho={card.forWho}
                includes={card.includes}
                result={card.result}
                resultLabel={offer.resultLabel}
                ctaPrimary={offer.ctaPrimary}
                ctaSecondary={offer.ctaSecondary}
                contactHref={contactHref}
              />
            ))}
          </div>

          {supportCard && (
            <div className="mt-[clamp(1rem,0.8rem+1vw,1.75rem)]">
              <OfferCard
                emphasis="support"
                supportLabel={offer.secondaryLabel}
                delay={220}
                number={supportCard.number}
                title={supportCard.title}
                forWho={supportCard.forWho}
                includes={supportCard.includes}
                result={supportCard.result}
                resultLabel={offer.resultLabel}
                ctaPrimary={offer.ctaPrimary}
                ctaSecondary={offer.ctaSecondary}
                contactHref={contactHref}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
