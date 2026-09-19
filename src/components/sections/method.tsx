import { SectionHeading } from "@/components/site/section-heading";
import { TimelineRow } from "@/components/site/timeline-row";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Method({ locale }: { locale: Locale }) {
  const { method, audience } = getContent(locale);

  return (
    <section id="methode" className="section-screen relative border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={method.eyebrow}
          title={method.title}
          subtitle={audience.body}
        />

        <Reveal
          delay={80}
          className="mt-[calc(var(--ss)*1.5rem)] flex flex-wrap gap-2"
        >
          {audience.sectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-[0.8rem] text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
            >
              {sector}
            </span>
          ))}
        </Reveal>

        <TimelineRow
          items={method.steps}
          variant="track"
          className="mt-[calc(var(--ss)*clamp(2.5rem,2rem+2.5vw,5rem))] w-full"
        />
      </div>

    </section>
  );
}
