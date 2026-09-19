import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { RealisationsCarousel } from "@/components/site/realisations-carousel";
import { getContent, path, type Locale } from "@/lib/content";

/** Standalone Réalisations page — scrollable, no 100vh constraint. */
export function RealisationsPage({ locale }: { locale: Locale }) {
  const { realisations } = getContent(locale);
  const contactHref = path(locale, "/contact");

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1 pt-[4.6rem]">
        <section>
          <div className="container-page section-y">
            <PageHero
              eyebrow={realisations.eyebrow}
              title={realisations.title}
              body={realisations.body}
              stats={realisations.stats}
            />
          </div>
        </section>

        <section className="border-t border-hairline pb-[var(--space-section)] pt-[clamp(2.5rem,2rem+2.5vw,4.5rem)]">
          <div className="container-page">
            <RealisationsCarousel
              items={realisations.items}
              badge={realisations.badge}
              filterCta={realisations.filterCta}
              contactHref={contactHref}
            />
          </div>
        </section>

        <section className="pb-[var(--space-section)]">
          <div className="container-page">
            <Reveal className="rounded-lg bg-foreground px-[clamp(1.5rem,1.25rem+2vw,4rem)] py-[clamp(3rem,2.5rem+2.5vw,5rem)] text-center text-background">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
                <h2 className="text-balance text-[length:var(--fs-h2)] leading-[1] font-extrabold tracking-[-0.035em]">
                  {realisations.cta.title}
                </h2>
                <p className="max-w-xl text-[length:var(--fs-body)] leading-[1.65] text-background/70">
                  {realisations.cta.body}
                </p>
                <Link
                  href={contactHref}
                  className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-[length:var(--fs-button)] font-medium text-foreground transition-opacity hover:opacity-90"
                >
                  {realisations.cta.button}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
