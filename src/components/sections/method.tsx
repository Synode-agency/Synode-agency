import { SectionHeading } from "@/components/site/section-heading";
import { TimelineRow } from "@/components/site/timeline-row";
import { getContent, type Locale } from "@/lib/content";

export function Method({ locale }: { locale: Locale }) {
  const { method, audience } = getContent(locale);

  return (
    <section id="methode" className="section-screen relative border-t border-hairline">
      <div className="container-page flex flex-col items-center">
        <SectionHeading
          eyebrow={method.eyebrow}
          title={method.title}
          subtitle={audience.body}
        />

        <TimelineRow
          items={method.steps}
          variant="track"
          className="mt-[calc(var(--ss)*clamp(2.5rem,2rem+2.5vw,5rem))] w-full"
        />
      </div>

    </section>
  );
}
