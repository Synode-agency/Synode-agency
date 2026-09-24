import { renderLines } from "@/lib/lines";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { getContent, type Locale } from "@/lib/content";

/**
 * Closing FAQ, sharing its screen with the footer.
 *
 * A band running the full width of the window, like the Offre's, but painted
 * in a barely-there blue rather than the deep one: the night blue is the
 * Offre's alone, so the two sections can no longer read as the same screen
 * seen twice. The palette stays light inside, so the questions are dark ink
 * on a tinted ground rather than white on blue.
 */
export function Faq({ locale }: { locale: Locale }) {
  const { faq } = getContent(locale);

  return (
    <section id="faq" className="relative">
      <div className="faq-panel section-screen section-screen-with-footer overflow-hidden">
        <ChapterMark n={5} side="left" />

        <div className="container-page">
          <SectionHeading
            eyebrow={faq.eyebrow}
            title={renderLines(faq.title)}
            subtitle={faq.body}
            align="left"
            className="faq-heading reveal-left"
          />

          {/* Not a Reveal: each question brings itself in, one after the
              other, which a fade on the wrapper would flatten. */}
          <div className="mt-[calc(var(--ss)*clamp(1.75rem,1.4rem+1.8vw,2.75rem)+30px)]">
            <FaqAccordion items={faq.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
