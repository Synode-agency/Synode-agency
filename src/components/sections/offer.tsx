import { Check } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { getContent, type Locale } from "@/lib/content";

export function Offer({ locale }: { locale: Locale }) {
  const { offer } = getContent(locale);

  return (
    <section id="offre" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={offer.eyebrow}
          title={offer.title}
          subtitle={offer.subtitle}
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {offer.cards.map((card, i) => (
            <Reveal
              key={card.number}
              delay={i * 80}
              className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-brand/40 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background text-brand transition-colors group-hover:bg-brand-dim/40">
                  <Icon name={card.icon} className="size-5" />
                </span>
                <span className="font-mono text-sm text-muted-foreground/60">
                  {card.number}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.forWho}
                </p>
              </div>

              <ul className="flex flex-col gap-2.5 border-t border-border pt-5">
                {card.includes.map((ex) => (
                  <li
                    key={ex}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto rounded-lg bg-secondary/60 px-4 py-3 text-sm text-foreground/80">
                <span className="font-medium text-brand">
                  {offer.resultLabel} —{" "}
                </span>
                {card.result}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
