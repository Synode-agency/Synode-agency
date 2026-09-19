import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { RealisationsList } from "@/components/site/realisations-list";
import { getContent, path, type Locale } from "@/lib/content";

/** Standalone Réalisations page — scrollable, no 100vh constraint. */
export function RealisationsPage({ locale }: { locale: Locale }) {
  const { realisations } = getContent(locale);
  const contactHref = path(locale, "/contact");

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1 pt-[var(--header-h)]">
        <section className="section-panel">
          <div className="container-page">
            <PageHero
              eyebrow={realisations.eyebrow}
              title={realisations.title}
              body={realisations.body}
              stats={realisations.stats}
            />
          </div>
        </section>

        <RealisationsList
          items={realisations.items}
          badge={realisations.badge}
          filterCta={realisations.filterCta}
          contactHref={contactHref}
        />

        <section className="section-panel">
          <div className="container-page">
            <Reveal className="surface-card mx-auto flex max-w-3xl flex-col items-center gap-5 p-[clamp(2rem,1.5rem+2.5vw,4rem)] text-center">
              <h2 className="text-balance text-[length:var(--fs-h2)] leading-[1] font-extrabold tracking-[-0.035em]">
                {realisations.cta.title}
              </h2>
              <p className="max-w-xl text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
                {realisations.cta.body}
              </p>
              <Link
                href={contactHref}
                className="btn-ink group mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium"
              >
                {realisations.cta.button}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
