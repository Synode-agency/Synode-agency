import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { PillarsBand } from "@/components/sections/pillars-band";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Hero. Left-aligned and typographic: the headline is the whole visual.
 *
 * The node diagram that used to sit above it is gone. It showed the tools
 * (Claude, OpenAI, Gmail) on the very first screen, which contradicts the
 * positioning — we sell the outcome, not the technology — and implied
 * partnerships we do not have.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      id="top"
      className="relative grid min-h-dvh grid-rows-[auto_1fr_auto]"
    >
      {/* reserves the space the fixed navbar sits over */}
      <div aria-hidden className="h-[4.6rem]" />

      <div className="container-page self-center py-8">
        <div className="grid gap-x-[clamp(2rem,1.5rem+3vw,6rem)] gap-y-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
          <Reveal>
            <h1 className="max-w-[14ch] text-[length:var(--fs-display)] leading-[0.95] font-extrabold tracking-[-0.04em]">
              {hero.titleLead}{" "}
              <span className="text-brand">{hero.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={90} className="flex flex-col items-start gap-7">
            {/* The rule ties the column to the headline baseline. */}
            <span aria-hidden className="h-px w-full bg-hairline" />

            <p className="max-w-[46ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
              {hero.subtitle}
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href={path(locale, "/contact")}
                className="btn-ink group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[length:var(--fs-button)] font-medium"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={path(locale, "/realisations")}
                className="btn-line inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[length:var(--fs-button)] font-medium"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <PillarsBand locale={locale} />
    </section>
  );
}
