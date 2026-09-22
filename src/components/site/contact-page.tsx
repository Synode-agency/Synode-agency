import { Mail, Phone } from "lucide-react";
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
      <main className="flex-1">
        {/* Same card as the home hero, with the fixed navbar inside it. It
            grows with the form rather than being pinned to one screen: the
            page is meant to scroll here. */}
        <section className="relative px-[var(--page-gutter)] pt-[var(--page-gutter-top)] pb-[var(--page-gutter)]">
          <div className="hero-card relative flex min-h-[calc(100dvh-var(--page-gutter-top)-var(--page-gutter))] flex-col overflow-hidden rounded-[clamp(1.25rem,1vw+1rem,2rem)] border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
            <div
              aria-hidden
              className="h-[calc(var(--header-h)+var(--page-gutter-top)+var(--header-drop))]"
            />

            <div className="container-page relative z-10 flex flex-1 items-center pt-[clamp(1.5rem,2.5vw,3.5rem)] pb-[clamp(3rem,5vw,6rem)]">
              <div className="grid w-full items-center gap-[clamp(2rem,1.5rem+3vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
                <PageHero
                  eyebrow={contact.eyebrow}
                  title={contact.title}
                  titleAccent={contact.titleAccent}
                  body={contact.body}
                  align="left"
                  stagger
                  action={
                    <div className="contact-facts">
                      {contact.info.slice(0, 2).map((item, i) => {
                        const Glyph = i === 0 ? Mail : Phone;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            className="contact-fact"
                          >
                            <span className="contact-fact-tile" aria-hidden>
                              <Glyph />
                            </span>
                            <span className="contact-fact-copy">
                              <i>{item.label}</i>
                              <b>{item.value}</b>
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  }
                />

                <Reveal
                  delay={520}
                  className="offer-panel reveal-right w-full max-w-xl justify-self-end overflow-hidden rounded-3xl px-[clamp(1.25rem,1rem+1.4vw,2.25rem)] py-[clamp(1.85rem,1.4rem+2vw,3.25rem)]"
                >
                  <AuditForm locale={locale} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
