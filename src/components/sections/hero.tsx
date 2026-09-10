import { ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SynapseField } from "@/components/site/synapse-field";
import { Magnetic } from "@/components/site/magnetic";
import { Icon } from "@/components/site/icon";
import { getContent, type Locale } from "@/lib/content";

export function Hero({ locale }: { locale: Locale }) {
  const { hero, site } = getContent(locale);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24"
    >
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
        <div className="absolute left-1/2 top-[-16rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-brand-dim/30 blur-[160px]" />
        <SynapseField className="opacity-60 [mask-image:radial-gradient(115%_115%_at_50%_28%,black_2%,transparent_72%)]" />
        <div className="absolute inset-0 grain opacity-[0.35]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container-page">
        <Reveal className="flex max-w-4xl flex-col gap-7">
          {/* Spacer keeps the previous kicker's vertical rhythm above the title */}
          <span aria-hidden className="block h-[33px]" />

          <div className="relative isolate w-fit">
            <div
              aria-hidden
              className="title-aura pointer-events-none absolute -inset-x-28 -inset-y-20 -z-10"
            />
            <h1 className="max-w-[16ch] text-balance text-[2.7rem] leading-[1.02] font-semibold sm:text-[3.75rem] lg:text-[4.75rem]">
              <span className="text-gradient-brand">{hero.titleLead}</span>{" "}
              <span className="text-brand">{hero.titleAccent}</span>
            </h1>
          </div>

          <p className="max-w-xl text-[1.05rem] leading-[1.7] text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-brand-foreground transition-colors hover:bg-brand-bright brand-glow"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <a
              href="#realisations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-6 py-3.5 text-[0.95rem] font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-surface-2"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
        >
          {hero.pillars.map((p, i) => (
            <div
              key={p.title}
              className="group flex flex-col gap-4 bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg border border-hairline bg-background text-brand transition-colors group-hover:border-brand/40">
                  <Icon name={p.icon} className="size-[1.05rem]" />
                </span>
                <span className="eyebrow tnum text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-[0.95rem] font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.65] text-muted-foreground">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal
          delay={220}
          className="mt-14 flex items-center gap-3 text-muted-foreground/50"
        >
          <ArrowDown className="size-4 animate-bounce [animation-duration:2s]" />
          <span className="eyebrow">
            {locale === "fr" ? "Faites défiler" : "Scroll"}
          </span>
          <span className="h-px flex-1 bg-hairline" />
          <span className="eyebrow tnum">{site.location}</span>
        </Reveal>
      </div>
    </section>
  );
}
