import { Check } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
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
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {offer.cards.map((card, i) => (
            <Reveal
              key={card.number}
              delay={i * 90}
              className="glow-hover relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-8 sm:p-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
              />

              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-hairline bg-background text-brand">
                  <Icon name={card.icon} className="size-5" />
                </span>
                <span className="num-ghost tnum text-[3.25rem]">
                  {card.number}
                </span>
              </div>

              <h3 className="mt-6 text-[1.35rem] font-semibold leading-snug tracking-tight">
                {card.title}
              </h3>
              <p className="mt-2.5 text-[0.9rem] leading-[1.7] text-muted-foreground">
                {card.forWho}
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
                {card.includes.map((ex) => (
                  <li
                    key={ex}
                    className="flex items-start gap-3 text-[0.875rem] text-foreground/85"
                  >
                    <span className="mt-0.5 grid size-[1.1rem] shrink-0 place-items-center rounded-[5px] bg-brand/12 text-brand">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex gap-3 pt-7">
                <span
                  aria-hidden
                  className="mt-0.5 w-0.5 shrink-0 rounded-full bg-brand/60"
                />
                <p className="text-[0.85rem] leading-[1.6] text-foreground/75">
                  <span className="eyebrow mr-2 text-brand">
                    {offer.resultLabel}
                  </span>
                  {card.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
