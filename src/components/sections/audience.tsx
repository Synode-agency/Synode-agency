import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Audience({ locale }: { locale: Locale }) {
  const { audience } = getContent(locale);

  return (
    <section id="pour-qui" className="section-y border-t border-hairline">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-9">
          <SectionHeading
            eyebrow={audience.eyebrow}
            title={audience.title}
            subtitle={audience.body}
          />
          <Reveal className="flex flex-wrap gap-2" delay={80}>
            {audience.sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[0.8rem] text-foreground/80 transition-colors hover:border-brand/40 hover:text-foreground"
              >
                {sector}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="relative flex flex-col gap-6 self-start overflow-hidden rounded-2xl border border-hairline bg-surface p-8 sm:p-9"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
          />
          <span className="eyebrow text-muted-foreground">
            {audience.rulesTitle}
          </span>
          <ul className="flex flex-col">
            {audience.rules.map((rule, i) => (
              <li
                key={rule}
                className="group flex items-baseline gap-5 border-t border-hairline py-5 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="eyebrow tnum text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9rem] leading-[1.6] text-foreground/90 transition-colors group-hover:text-foreground">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
