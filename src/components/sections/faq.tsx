import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { getContent, type Locale } from "@/lib/content";

/** Closing FAQ, sharing its screen with the footer. */
export function Faq({ locale }: { locale: Locale }) {
  const { faq } = getContent(locale);

  return (
    <section id="faq" className="section-screen relative">
      <div className="section-panel section-panel--surface">
        <div className="container-page grid gap-x-[clamp(2rem,1.5rem+3vw,6rem)] gap-y-[calc(var(--ss)*2rem)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

          <Reveal className="lg:pt-[calc(var(--ss)*1rem)]">
            <FaqAccordion items={faq.items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
