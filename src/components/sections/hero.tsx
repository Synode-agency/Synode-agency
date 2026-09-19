import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { AgentDiagram } from "@/components/site/agent-diagram";
import { PillarsBand } from "@/components/sections/pillars-band";
import { getContent, path, type Locale } from "@/lib/content";

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      id="top"
      className="relative grid min-h-dvh grid-rows-[auto_1fr_auto] overflow-hidden"
    >
      {/* row 1 — reserves the space the fixed navbar sits over */}
      <div aria-hidden className="h-[4.6rem]" />

      {/* row 2 — main hero content, centered in the space left between navbar and services band */}
      <div className="container-page self-center py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center sm:gap-7 lg:gap-[calc(var(--hs)*1.75rem)]">
          <Reveal className="w-full">
            <AgentDiagram />
          </Reveal>

          <Reveal delay={100} className="flex flex-col items-center gap-7 lg:gap-[calc(var(--hs)*1.75rem)]">
            <div className="relative isolate w-fit">
              <div
                aria-hidden
                className="title-aura pointer-events-none absolute -inset-x-28 -inset-y-20 -z-10"
              />
              <h1 className="max-w-[16ch] text-balance text-[2.7rem] leading-[1.02] font-semibold sm:text-[3.75rem] lg:text-[calc(var(--hs)*clamp(4.75rem,3.14rem+1.79vw,6rem))]">
                <span className="text-gradient-brand">{hero.titleLead}</span>{" "}
                <span className="text-gradient-accent">{hero.titleAccent}</span>
              </h1>
            </div>

            <p className="mx-auto max-w-xl text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground">
              {hero.subtitle}
            </p>

            <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href={path(locale, "/contact")}
                className="group brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[length:var(--fs-button)] font-medium text-brand-foreground brand-glow"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={path(locale, "/realisations")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-6 py-3.5 text-[length:var(--fs-button)] font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-surface-2"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* row 3 — services cards, always the last thing inside the 100dvh hero */}
      <PillarsBand locale={locale} />

    </section>
  );
}
