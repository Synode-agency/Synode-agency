import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SynapseField } from "@/components/site/synapse-field";
import { Magnetic } from "@/components/site/magnetic";
import { Icon } from "@/components/site/icon";
import { getContent, type Locale } from "@/lib/content";

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-14rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-dim/35 blur-[150px]" />
        <SynapseField className="opacity-70 [mask-image:radial-gradient(125%_120%_at_50%_30%,black_5%,transparent_75%)]" />
        <div className="absolute inset-0 grain opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container-page">
        <Reveal className="flex max-w-3xl flex-col gap-6">
          <div className="relative isolate w-fit">
            <div
              aria-hidden
              className="title-aura pointer-events-none absolute -inset-x-24 -inset-y-16 -z-10"
            />
            <h1 className="text-balance text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]">
              {hero.titleLead}{" "}
              <span className="text-brand">{hero.titleAccent}</span>
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-brand-foreground transition-colors hover:bg-brand-bright brand-glow"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <a
              href="#realisations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {hero.pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-brand">
                <Icon name={p.icon} className="size-5" />
              </span>
              <h3 className="text-[0.95rem] font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
