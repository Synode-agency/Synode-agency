import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Audience({ locale }: { locale: Locale }) {
  const { audience } = getContent(locale);

  return (
    <section id="pour-qui" className="border-t border-border py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={audience.eyebrow}
            title={audience.title}
            subtitle={audience.body}
          />
          <Reveal className="flex flex-wrap gap-2.5" delay={80}>
            {audience.sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/85"
              >
                {sector}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={120}
          className="flex flex-col gap-5 self-start rounded-2xl border border-border bg-card p-7 sm:p-8"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {audience.rulesTitle}
          </span>
          <ul className="flex flex-col divide-y divide-border">
            {audience.rules.map((rule, i) => (
              <li
                key={rule}
                className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span className="font-mono text-sm text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-foreground/90">
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
