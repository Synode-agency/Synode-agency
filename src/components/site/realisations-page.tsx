import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { WorksProvider } from "@/components/site/works-context";
import { WorksTabs } from "@/components/site/works-tabs";
import { WorksList } from "@/components/site/works-list";
import { PublishFlow } from "@/components/site/publish-flow";
import { getContent, path, type Locale } from "@/lib/content";

/** Standalone Réalisations page — scrollable, no 100vh constraint. */
export function RealisationsPage({ locale }: { locale: Locale }) {
  const { realisations } = getContent(locale);
  const contactHref = path(locale, "/contact");

  /* How many projects each domain holds, counted once here rather than in
     the client component that draws the track. */
  const counts = realisations.categories.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.id] = realisations.items.filter((i) => i.category === c.id).length;
      return acc;
    },
    {},
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <WorksProvider initial={realisations.categories[0].id}>
      <main className="flex-1">
        {/* Same card as the home hero: it fills the screen and the fixed
            navbar sits inside it, over the spacer that reserves its height. */}
        <section className="page-shell relative px-[var(--page-gutter)] pt-[var(--page-gutter-top)] pb-[var(--page-gutter)]">
          <div className="hero-card relative flex min-h-[calc(100dvh-var(--page-gutter-top)-var(--page-gutter))] flex-col overflow-hidden rounded-[clamp(1.25rem,1vw+1rem,2rem)] border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
            <div
              aria-hidden
              className="h-[calc(var(--header-h)+var(--page-gutter-top)+var(--header-drop))]"
            />

            {/* Two columns, like every other section: the pitch on the left,
                and on the right the three domains as a track the visitor can
                pick from. The headline no longer holds on one line in half a
                column, so its break is written into the copy. */}
            <div className="container-page relative z-10 flex flex-1 items-center py-[clamp(2rem,3vw,4.5rem)]">
              <div className="works-hero-grid">
                <PageHero
                  eyebrow={realisations.eyebrow}
                  title={realisations.title}
                  titleAccent={realisations.titleAccent}
                  body={realisations.body}
                  align="left"
                  action={
                    <Link
                      href="#projets"
                      className="group brand-gradient inline-flex w-fit items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground brand-glow"
                    >
                      {realisations.scrollCta}
                      <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                    </Link>
                  }
                />

                <WorksTabs
                  categories={realisations.categories}
                  counts={counts}
                  countLabel={realisations.worksCount}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="projets" className="pb-[var(--space-section)] pt-[clamp(2.5rem,2rem+2.5vw,4.5rem)] lg:pb-[var(--space-between)]">
          <div className="container-page">
            <WorksList
              items={realisations.items}
              categories={realisations.categories}
              emptyCategory={realisations.emptyCategory}
              videoPending={realisations.videoPending}
              countLabel={realisations.worksCount}
              prevLabel={realisations.worksPrev}
              nextLabel={realisations.worksNext}
              filterCta={realisations.filterCta}
              contactHref={contactHref}
            />
          </div>
        </section>

        {/* Closing band, not a card: the deep blue runs the full width of the
            window, the same way the Offre does on the landing page, and its
            contents take the ordinary page column so they land on the same
            left edge as the projects above. */}
        <section className="relative">
          <div className="offer-panel section-screen overflow-hidden">
            <div className="container-page">
              <div className="relative grid gap-[clamp(2rem,1.5rem+2.5vw,4rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
                <Reveal className="works-cta-copy reveal-left flex flex-col items-start gap-5 text-left">
                  <h2 className="text-[clamp(1.05rem,6.4vw,2.5rem)] font-semibold leading-[1.12] sm:text-[2.25rem] lg:text-[length:var(--fs-h2)]">
                    {realisations.cta.title}
                  </h2>
                  <p className="max-w-xl text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground">
                    {realisations.cta.body}
                  </p>
                  <Link
                    href={contactHref}
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[length:var(--fs-button)] font-medium text-[#0b1220] transition-colors hover:bg-white/90"
                  >
                    {realisations.cta.button}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Reveal>

                {/* No reveal on the wrapper: each step brings itself in, and
                    a fade on the list would flatten the sequence. */}
                <PublishFlow steps={realisations.cta.steps} />
              </div>
            </div>
          </div>
        </section>
      </main>
      </WorksProvider>
      <SiteFooter locale={locale} />
    </>
  );
}
