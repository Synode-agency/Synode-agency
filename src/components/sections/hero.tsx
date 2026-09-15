import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { AgentDiagram } from "@/components/site/agent-diagram";
import { PillarCard } from "@/components/site/pillar-card";
import Ferrofluid from "@/components/Ferrofluid";
import { getContent, type Locale } from "@/lib/content";

export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24"
    >
      {/* background — fixed so it stays put and shows through the whole page as content scrolls over it */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <Ferrofluid
          colors={["#00A8F8", "#00A8F8", "#00A8F8"]}
          speed={0.1}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={4}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={0.1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>

      <div className="container-page">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 xl:gap-16">
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
                <span className="text-gradient-accent">{hero.titleAccent}</span>
              </h1>
            </div>

            <p className="max-w-xl text-[1.05rem] leading-[1.7] text-muted-foreground">
              {hero.subtitle}
            </p>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-medium text-brand-foreground brand-glow"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#realisations"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-6 py-3.5 text-[0.95rem] font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-surface-2"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="hidden lg:flex lg:justify-end">
            <AgentDiagram />
          </Reveal>
        </div>

        <Reveal
          delay={140}
          className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
        >
          {hero.pillars.map((p) => (
            <PillarCard key={p.title} icon={p.icon} title={p.title} text={p.text} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
