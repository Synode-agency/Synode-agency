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
        <section className="section-y">
          <div className="container-page">
            <PageHero
              eyebrow={contact.eyebrow}
              title={contact.title}
              body={contact.body}
              stats={contact.stats}
            />

            <Reveal
              delay={80}
              className="surface-card mt-[clamp(2.5rem,2rem+2.5vw,4.5rem)] w-full max-w-3xl p-[clamp(1.5rem,1.25rem+2vw,3rem)]"
            >
              <AuditForm locale={locale} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
