import { SectionHeading } from "@/components/site/section-heading";
import { TimelineRow } from "@/components/site/timeline-row";
import { getContent, type Locale } from "@/lib/content";

export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-y border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          subtitle={problem.intro}
          className="mx-auto"
        />

        <TimelineRow items={problem.items} variant="chain" className="mt-20" />
      </div>
    </section>
  );
}
