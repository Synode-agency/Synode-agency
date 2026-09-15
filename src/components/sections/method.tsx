import { SectionHeading } from "@/components/site/section-heading";
import { TimelineRow } from "@/components/site/timeline-row";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Method({ locale }: { locale: Locale }) {
  const { method, audience } = getContent(locale);

  return (
    <section id="methode" className="section-y border-t border-hairline">
      <div className="container-page flex flex-col items-center">
        <SectionHeading
          eyebrow={method.eyebrow}
          title={method.title}
          subtitle={audience.body}
        />

        <Reveal delay={80} className="mt-7 flex flex-wrap justify-center gap-2">
          {audience.sectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[0.8rem] text-foreground/80 transition-colors hover:border-brand/40 hover:text-foreground"
            >
              {sector}
            </span>
          ))}
        </Reveal>

        <TimelineRow items={method.steps} variant="track" className="mt-20 w-full" />
      </div>
    </section>
  );
}
