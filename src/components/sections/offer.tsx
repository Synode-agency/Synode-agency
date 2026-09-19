import { SectionHeading } from "@/components/site/section-heading";
import { OfferCard } from "@/components/site/offer-card";
import { getContent, type Locale } from "@/lib/content";

export function Offer({ locale }: { locale: Locale }) {
  const { offer } = getContent(locale);

  return (
    <section id="offre" className="section-screen relative border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={offer.eyebrow}
          title={offer.title}
          subtitle={offer.subtitle}
          subtitleNote={offer.subtitleNote}
        />

        <div className="mt-[calc(var(--ss)*clamp(2rem,1.6rem+2vw,3.75rem))] grid gap-[clamp(1.25rem,1rem+1.5vw,2.5rem)] lg:grid-cols-2">
          {offer.cards.map((card, i) => (
            <OfferCard
              key={card.number}
              delay={i * 90}
              icon={card.icon}
              number={card.number}
              title={card.title}
              forWho={card.forWho}
              includes={card.includes}
              result={card.result}
              resultLabel={offer.resultLabel}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
