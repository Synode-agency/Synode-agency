import { renderLines } from "@/lib/lines";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { MethodTrack } from "@/components/site/method-track";
import { getContent, type Locale } from "@/lib/content";

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
        <ChapterMark n={3} side="left" />

        <SectionHeading
          eyebrow={method.eyebrow}
          title={renderLines(method.title, [accent])}
          subtitle={audience.body}
          align="left"
          className="method-heading reveal-left"
        />

        <MethodTrack
          steps={method.steps}
          className="mt-[calc(var(--ss)*clamp(2.5rem,2rem+2.5vw,5rem))] w-full"
        />
      </div>
    </section>
  );
}
