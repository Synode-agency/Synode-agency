import { InnerPage } from "@/components/site/inner-page";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { getContent, type Locale } from "@/lib/content";

/** La FAQ, sortie de la landing : elle se consulte, elle ne se parcourt pas. */
export function FaqPage({ locale }: { locale: Locale }) {
  const { faq } = getContent(locale);

  return (
    <InnerPage
      locale={locale}
      eyebrow={faq.eyebrow}
      title={faq.title}
      body={faq.body}
    >
      <div className="container-page pb-[var(--space-section)]">
        <FaqAccordion items={faq.items} />
      </div>
    </InnerPage>
  );
}
