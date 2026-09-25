import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScreenIcon } from "@/components/site/icons";
import { HeroStage } from "@/components/site/hero-stage";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Hero, built as one card inset from the viewport and sitting on the page's
 * darker ground: `--page-gutter` on the sides and below, the smaller
 * `--page-gutter-top` above, because the navbar occupies that row.
 *
 * The card holds everything down to the four services: the fixed navbar is
 * transparent at the top of the page, so at rest it reads as the card's own
 * top row rather than as a separate bar. The card therefore reserves
 * `--header-h + --page-gutter-top + --header-drop` before its content
 * starts, which is exactly where the navbar ends while it is still inside
 * the card.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section id="top" className="page-shell relative px-[var(--page-gutter)] pt-[var(--page-gutter-top)] pb-[var(--page-gutter)]">
      <div className="relative flex min-h-[calc(100dvh-var(--page-gutter-top)-var(--page-gutter))] flex-col overflow-hidden hero-card rounded-[var(--r-lg)] border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
        {/* Reserves the row the fixed navbar sits over */}
        <div aria-hidden className="h-[calc(var(--header-h)+var(--page-gutter-top)+var(--header-drop))]" />

        <div className="container-page relative z-10 flex flex-1 items-center py-[clamp(2rem,3vw,4.5rem)] lg:py-[clamp(1.25rem,1.6vw,2.5rem)]">
          <div className="hero-composition mx-auto grid w-full max-w-[104rem] items-center gap-10">
            {/* Left column — the pitch. Pas de Reveal : c'est la première
                chose à l'écran. Un titre qui apparaît en fondu retarde le
                message et fait passer le site pour lent. */}
            <div className="hero-copy flex flex-col items-start gap-6 text-left lg:gap-[calc(var(--hs)*1.6rem)]">
              <div className="relative isolate w-fit">
                <h1 className="hero-heading text-[length:var(--fs-display)] leading-[1.04] font-semibold lg:text-[calc(var(--hs)*var(--fs-display))]">
                  <span className="block text-gradient-brand">{hero.titleLead}</span>
                  <span className="block text-gradient-accent">{hero.titleAccent}</span>
                </h1>
              </div>

              <p className="max-w-[56ch] text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground">
                {hero.subtitle}
              </p>

              <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href={path(locale, "/contact")}
                  className="group brand-gradient inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] px-6 py-3.5 text-[length:var(--fs-button)] font-medium text-brand-foreground"
                >
                  {hero.primaryCta}
                  {/* La flèche avance : le bouton mène ailleurs. */}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href={path(locale, "/realisations")}
                  className="group inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] border border-hairline px-6 py-3.5 text-[length:var(--fs-button)] font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-surface-2"
                >
                  {/* L'écran plutôt qu'une flèche : ce bouton ne fait pas
                      avancer dans un parcours, il ouvre des démonstrations
                      qui se regardent. L'icône est posée avant le texte pour
                      que les deux boutons ne se répondent pas en miroir. */}
                  <ScreenIcon
                    aria-hidden
                    className="size-4 text-brand transition-transform group-hover:-translate-y-px"
                  />
                  {hero.secondaryCta}
                </Link>
              </div>
            </div>

            {/* Product mock framed by the four service cards. Not a Reveal:
                the mock and the four cards come in one by one on load, from
                CSS, after the copy on the left has started moving. */}
            <div className="hero-visual">
              <HeroStage locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
