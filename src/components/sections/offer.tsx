import { SectionHeading } from "@/components/site/section-heading";
import { OfferCard } from "@/components/site/offer-card";
import { getContent, type Locale } from "@/lib/content";

export function Offer({ locale }: { locale: Locale }) {
  const { offer } = getContent(locale);

  return (
    <section id="offre" className="section-y border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={offer.eyebrow}
          title={offer.title}
          subtitle={offer.subtitle}
        />

        <div className="mt-[clamp(2.5rem,2rem+2vw,4.5rem)] grid gap-[clamp(1.25rem,1rem+1.5vw,2.5rem)] lg:grid-cols-2">
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
