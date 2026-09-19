import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { AuditForm } from "@/components/sections/audit-form";
import { getContent, type Locale } from "@/lib/content";

/** Standalone contact page — scrollable, the form is the whole point. */
export function ContactPage({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1 pt-[4.6rem]">
        <section className="section-panel">
          <div className="container-page">
            <PageHero
              eyebrow={contact.eyebrow}
              title={contact.title}
              body={contact.body}
              stats={contact.stats}
            />
          </div>
        </section>

        {/* The form gets its own white band, so it reads as the step to take
            rather than as more page. */}
        <section className="section-panel section-panel--surface">
          <div className="container-page">
            <Reveal className="mx-auto w-full max-w-2xl">
              <AuditForm locale={locale} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
