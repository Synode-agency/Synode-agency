import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { getContent, type Locale } from "@/lib/content";

/** Closing FAQ, sharing its screen with the footer. */
export function Faq({ locale }: { locale: Locale }) {
  const { faq } = getContent(locale);

  return (
    <section
      id="faq"
      className="section-screen section-screen-with-footer relative border-t border-hairline"
    >
      <div className="container-page">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <Reveal className="mt-[calc(var(--ss)*clamp(1.75rem,1.4rem+1.8vw,2.75rem))]">
          <FaqAccordion items={faq.items} />
        </Reveal>
      </div>
    </section>
  );
}
