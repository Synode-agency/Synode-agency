import { ArrowUpRight, Mail } from "lucide-react";
import {
  PencilLineIcon,
  PhoneLinearIcon,
  TimeLineIcon,
} from "@/components/site/icons";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { AuditForm } from "@/components/sections/audit-form";
import { getContent, type Locale } from "@/lib/content";
import styles from "./contact-page.module.css";

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

            <div className={`container-page relative z-10 ${styles.content}`}>
              <div className={styles.grid}>
                <div className={styles.intro}>
                <PageHero
                  eyebrow={contact.eyebrow}
                  title={contact.title}
                  titleAccent={contact.titleAccent}
                  body={contact.body}
                  align="left"
                  stagger
                  action={
                    <div className={styles.facts}>
                      {contact.info.slice(0, 2).map((item, i) => {
                        const Glyph = i === 0 ? Mail : PhoneLinearIcon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            className={styles.fact}
                          >
                            <span className="contact-fact-tile" aria-hidden>
                              <Glyph />
                            </span>
                            <span className="contact-fact-copy">
                              <i>{item.label}</i>
                              <b>{item.value}</b>
                            </span>
                            <ArrowUpRight className={styles.linkArrow} aria-hidden />
                          </a>
                        );
                      })}
                    </div>
                  }
                />
                <div className={styles.promise}>
                  <TimeLineIcon aria-hidden />
                  <span>{locale === "fr" ? "Un premier échange pour y voir clair." : "A first conversation to find clarity."}</span>
                </div>
                </div>

                <Reveal
                  delay={520}
                  className={`reveal-right ${styles.panel}`}
                >
                  <PencilLineIcon aria-hidden className={styles.panelMark} />

                  <div className={styles.formHeading}>
                    <span className={styles.formEyebrow}>{locale === "fr" ? "FAISONS LE PREMIER PAS" : "LET’S TAKE THE FIRST STEP"}</span>
                    <h2>{locale === "fr" ? "Parlons de votre besoin." : "Tell us what you need."}</h2>
                    <p>{locale === "fr" ? "Quelques mots suffisent pour commencer." : "A few words are all it takes to start."}</p>
                  </div>
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
