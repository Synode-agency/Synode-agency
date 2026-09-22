import { ClipboardList, LineChart, Search, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { TimelineRow } from "@/components/site/timeline-row";
import { getContent, type Locale } from "@/lib/content";

/** One glyph per step, in the order the track reads. */
const STEP_ICONS = [Search, ClipboardList, Wrench, LineChart];

/** The one word the title turns on, per locale. */
const TITLE_ACCENT: Record<Locale, string> = {
  fr: "simplifier",
  en: "simplify",
};

export function Method({ locale }: { locale: Locale }) {
  const { method, audience } = getContent(locale);
  const accent = TITLE_ACCENT[locale];

  return (
    <section id="methode" className="section-screen relative">
      <div className="method-content">
        <SectionHeading
          eyebrow={method.eyebrow}
          title={method.title
            .split(new RegExp(`(${accent}|\n)`))
            .map((part, index) =>
              part === accent ? (
                <span key={index} className="text-brand">
                  {part}
                </span>
              ) : part === "\n" ? (
                <br key={index} />
              ) : (
                part
              ),
            )}
          subtitle={audience.body}
          align="left"
          className="method-heading reveal-left"
        />

        <TimelineRow
          items={method.steps}
          icons={STEP_ICONS}
          variant="track"
          className="mt-[calc(var(--ss)*clamp(2.5rem,2rem+2.5vw,5rem))] w-full"
        />
      </div>
    </section>
  );
}
