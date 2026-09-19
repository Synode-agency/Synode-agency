import { SectionHeading } from "@/components/site/section-heading";
import { TimelineRow } from "@/components/site/timeline-row";
import { getContent, type Locale } from "@/lib/content";

export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-screen relative border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          subtitle={problem.intro}
          className="mx-auto"
        />

        <TimelineRow
          items={problem.items}
          variant="chain"
          className="mt-[calc(var(--ss)*clamp(2.5rem,2rem+2.5vw,5rem))]"
        />
      </div>

    </section>
  );
}
